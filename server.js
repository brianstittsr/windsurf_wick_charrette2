const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
// Import phases with error handling
let PHASES = [];
let REASONING_ALGORITHMS = {};
try {
  const phasesModule = require('./phases');
  PHASES = phasesModule.PHASES;
  REASONING_ALGORITHMS = phasesModule.REASONING_ALGORITHMS;
  console.log('Phases module loaded successfully');
} catch (error) {
  console.error('Error loading phases module:', error);
  // Provide default phases if the file is missing
  PHASES = [
    { id: 'introduction', name: 'Introduction', description: 'Welcome and overview' },
    { id: 'data_collection', name: 'Data Collection', description: 'Gather initial information' },
    { id: 'analysis', name: 'Analysis', description: 'Explore constraints and assumptions' },
    { id: 'ideation', name: 'Ideation', description: 'Generate ideas' },
    { id: 'synthesis', name: 'Synthesis', description: 'Combine findings' },
    { id: 'reporting', name: 'Reporting', description: 'Generate final report' }
  ];
  REASONING_ALGORITHMS = {
    constraintAnalysis: { name: 'Constraint Analysis' },
    assumptionTesting: { name: 'Assumption Testing' },
    patternRecognition: { name: 'Pattern Recognition' }
  };
}

// Load demo data if available
let demoData = null;
try {
  demoData = require('./demo-loader.js');
  console.log(' Demo data loaded successfully');
} catch (error) {
  console.log('  No demo data found - starting with empty database');
}

// In-memory data storage (replace with database in production)
let charettes = demoData ? { [demoData.charette.id]: demoData.charette } : {};
let messages = demoData ? demoData.messages : {};
let reports = demoData ? { [demoData.charette.id]: demoData.report } : {};
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.APP_URL 
      ? [process.env.APP_URL, "https://*.digitalocean.app"] 
      : (process.env.NODE_ENV === 'production'
        ? ["https://charette-system.vercel.app", "https://*.vercel.app"]
        : ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"]),
    methods: ["GET", "POST"]
  }
});

// Configure CORS for both development and production
const corsOptions = {
  origin: process.env.APP_URL 
    ? [process.env.APP_URL, /\.digitalocean\.app$/]
    : (process.env.NODE_ENV === 'production'
      ? ['https://charette-system.vercel.app', /\.vercel\.app$/]
      : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002']),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// In-memory storage for demo purposes (now loaded above)
if (!demoData) {
  // Only initialize empty if no demo data
  charettes = {};
  messages = {};
  reports = {};
}

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join charette room
  socket.on('join-charette', (charetteId) => {
    socket.join(charetteId);
    console.log(`User ${socket.id} joined charette ${charetteId}`);
  });

  // Handle chat messages
  socket.on('chat-message', (data) => {
    const { charetteId, message, userName, role, roomId } = data;
    const messageId = uuidv4();
    const timestamp = new Date().toISOString();

    const messageData = {
      id: messageId,
      text: message,
      userName,
      role: role || 'participant',
      roomId: roomId || 'main',
      timestamp,
      type: 'chat'
    };

    if (!messages[charetteId]) {
      messages[charetteId] = {};
    }
    if (!messages[charetteId][roomId || 'main']) {
      messages[charetteId][roomId || 'main'] = [];
    }
    messages[charetteId][roomId || 'main'].push(messageData);

    // Emit to all users in the specific room
    if (roomId && roomId !== 'main') {
      socket.to(`${charetteId}-${roomId}`).emit('chat-message', messageData);
    } else {
      io.to(charetteId).emit('chat-message', messageData);
    }

    // Trigger reasoning analysis if in analysis phase and main room
    if (charettes[charetteId] && charettes[charetteId].currentPhase === 2 && (!roomId || roomId === 'main')) {
      analyzeMessage(charetteId, messageData);
    }
  });

  // Handle phase progression
  socket.on('next-phase', (charetteId) => {
    if (charettes[charetteId]) {
      charettes[charetteId].currentPhase++;
      io.to(charetteId).emit('phase-changed', charettes[charetteId].currentPhase);
    }
  });

  // Breakout room management
  socket.on('join-breakout-room', (data) => {
    const { charetteId, roomId, userName } = data;
    socket.join(`${charetteId}-${roomId}`);
    console.log(`${userName} joined breakout room ${roomId} in charette ${charetteId}`);

    // Update room participants
    const charette = charettes[charetteId];
    if (charette) {
      const room = charette.breakoutRooms.find(r => r.id === roomId);
      if (room && !room.participants.includes(userName)) {
        room.participants.push(userName);
        io.to(charetteId).emit('room-updated', room);
      }
    }
  });

  socket.on('leave-breakout-room', (data) => {
    const { charetteId, roomId, userName } = data;
    socket.leave(`${charetteId}-${roomId}`);
    console.log(`${userName} left breakout room ${roomId} in charette ${charetteId}`);

    // Update room participants
    const charette = charettes[charetteId];
    if (charette) {
      const room = charette.breakoutRooms.find(r => r.id === roomId);
      if (room) {
        room.participants = room.participants.filter(p => p !== userName);
        io.to(charetteId).emit('room-updated', room);
      }
    }
  });

  socket.on('create-breakout-rooms', (data) => {
    const { charetteId, roomCount, questions } = data;
    const charette = charettes[charetteId];
    if (!charette) return;

    // Clear existing rooms
    charette.breakoutRooms = [];

    // Create new rooms
    for (let i = 1; i <= roomCount; i++) {
      const room = {
        id: `room-${i}`,
        name: `Breakout Room ${i}`,
        questions: questions || ['Discuss the topic'],
        participants: [],
        createdAt: new Date().toISOString()
      };
      charette.breakoutRooms.push(room);
    }

    // Auto-assign participants to rooms
    const participants = charette.participants || [];
    participants.forEach((participant, index) => {
      const roomIndex = index % roomCount;
      charette.breakoutRooms[roomIndex].participants.push(participant.userName);
    });

    io.to(charetteId).emit('breakout-rooms-created', charette.breakoutRooms);
  });

  socket.on('add-room-question', (data) => {
    const { charetteId, roomId, question } = data;
    const charette = charettes[charetteId];
    if (!charette) return;

    const room = charette.breakoutRooms.find(r => r.id === roomId);
    if (room && question.trim()) {
      room.questions.push(question.trim());
      io.to(charetteId).emit('room-updated', room);
    }
  });

  socket.on('remove-room-question', (data) => {
    const { charetteId, roomId, questionIndex } = data;
    const charette = charettes[charetteId];
    if (!charette) return;

    const room = charette.breakoutRooms.find(r => r.id === roomId);
    if (room && room.questions[questionIndex]) {
      room.questions.splice(questionIndex, 1);
      io.to(charetteId).emit('room-updated', room);
    }
  });
});

// Reasoning analysis function
function analyzeMessage(charetteId, message) {
  const text = message.text.toLowerCase();

  // Simple keyword-based analysis (could be enhanced with NLP)
  const analysis = {
    constraints: [],
    assumptions: [],
    opportunities: [],
    timestamp: new Date().toISOString()
  };

  // Constraint detection
  const constraintKeywords = ['constraint', 'limitation', 'cannot', 'must not', 'blocked by', 'limited to', 'restricted'];
  constraintKeywords.forEach(keyword => {
    if (text.includes(keyword)) {
      analysis.constraints.push({
        keyword,
        context: message.text,
        user: message.userName
      });
    }
  });

  // Assumption detection
  const assumptionKeywords = ['assume', 'suppose', 'believe', 'think', 'expect', 'presume', 'likely'];
  assumptionKeywords.forEach(keyword => {
    if (text.includes(keyword)) {
      analysis.assumptions.push({
        keyword,
        context: message.text,
        user: message.userName
      });
    }
  });

  // Opportunity detection
  const opportunityKeywords = ['could', 'might', 'potential', 'opportunity', 'possibility', 'option'];
  opportunityKeywords.forEach(keyword => {
    if (text.includes(keyword)) {
      analysis.opportunities.push({
        keyword,
        context: message.text,
        user: message.userName
      });
    }
  });

  // Store analysis results
  if (!charettes[charetteId].analysis) {
    charettes[charetteId].analysis = [];
  }
  charettes[charetteId].analysis.push(analysis);

  // Emit analysis results to analyst and project manager
  io.to(charetteId).emit('analysis-update', analysis);
}

// API routes
app.get('/api/charettes', (req, res) => {
  res.json(Object.values(charettes));
});

app.post('/api/charettes', (req, res) => {
  const { title, description } = req.body;
  const charetteId = uuidv4();
  charettes[charetteId] = {
    id: charetteId,
    title,
    description,
    currentPhase: 0,
    createdAt: new Date().toISOString(),
    phases: PHASES,
    analysis: [],
    participants: [],
    breakoutRooms: []
  };
  res.json(charettes[charetteId]);
});

app.post('/api/charettes/:id/participants', (req, res) => {
  const { userName, role } = req.body;
  const charette = charettes[req.params.id];
  if (!charette) {
    return res.status(404).json({ error: 'Charette not found' });
  }

  const participant = {
    userName,
    role: role || 'participant',
    joinedAt: new Date().toISOString()
  };

  // Check if participant already exists
  const existingIndex = charette.participants.findIndex(p => p.userName === userName);
  if (existingIndex === -1) {
    charette.participants.push(participant);
  } else {
    charette.participants[existingIndex] = participant;
  }

  res.json(participant);
});

app.get('/api/charettes/:id', (req, res) => {
  const charette = charettes[req.params.id];
  if (charette) {
    res.json(charette);
  } else {
    res.status(404).json({ error: 'Charette not found' });
  }
});

app.get('/api/charettes/:id/messages', (req, res) => {
  const charetteMessages = messages[req.params.id] || {};
  const roomId = req.query.roomId;

  if (roomId) {
    res.json(charetteMessages[roomId] || []);
  } else {
    // Return all messages from all rooms
    const allMessages = Object.values(charetteMessages).flat();
    res.json(allMessages);
  }
});

// Enhanced reasoning algorithm endpoint
app.post('/api/reasoning/analyze', (req, res) => {
  const { text, type, charetteId } = req.body;

  let analysis = {};

  switch (type) {
    case 'constraint':
      analysis = REASONING_ALGORITHMS.constraintAnalysis;
      break;
    case 'assumption':
      analysis = REASONING_ALGORITHMS.assumptionTesting;
      break;
    case 'pattern':
      analysis = REASONING_ALGORITHMS.patternRecognition;
      break;
    default:
      analysis = {
        constraints: text.match(/constraint|limitation|cannot|must not/gi) || [],
        assumptions: text.match(/assume|suppose|believe|think/gi) || [],
        opportunities: text.match(/could|might|potential|opportunity/gi) || []
      };
  }

  // Store analysis in charette if provided
  if (charetteId && charettes[charetteId]) {
    if (!charettes[charetteId].reasoningResults) {
      charettes[charetteId].reasoningResults = [];
    }
    charettes[charetteId].reasoningResults.push({
      type,
      text,
      analysis,
      timestamp: new Date().toISOString()
    });
  }

  res.json(analysis);
});

// Generate final report
app.get('/api/charettes/:id/report', (req, res) => {
  const charette = charettes[req.params.id];
  if (!charette) {
    return res.status(404).json({ error: 'Charette not found' });
  }

  const charetteMessages = messages[req.params.id] || {};
  const allMessages = Object.values(charetteMessages).flat();

  const report = {
    charetteId: charette.id,
    title: charette.title,
    generatedAt: new Date().toISOString(),
    phases: charette.phases,
    finalPhase: charette.currentPhase,
    summary: {
      totalMessages: allMessages.length,
      totalParticipants: [...new Set(allMessages.map(m => m.userName))].length,
      totalBreakoutRooms: charette.breakoutRooms.length,
      analysisResults: charette.analysis || [],
      reasoningResults: charette.reasoningResults || []
    },
    breakoutRooms: charette.breakoutRooms,
    keyFindings: generateKeyFindings(charette, allMessages),
    recommendations: generateRecommendations(charette, allMessages),
    nextSteps: [
      'Review and validate findings',
      'Develop implementation plan',
      'Assign responsibilities',
      'Schedule follow-up sessions'
    ]
  };

  res.json(report);
});

// Helper functions for report generation
function generateKeyFindings(charette, messages) {
  const findings = [];

  // Analyze constraints
  const constraints = charette.analysis?.flatMap(a => a.constraints) || [];
  if (constraints.length > 0) {
    findings.push({
      category: 'Constraints',
      items: constraints.slice(0, 5), // Top 5
      impact: 'High'
    });
  }

  // Analyze patterns in messages
  const messageTexts = messages.map(m => m.text.toLowerCase());
  const themes = identifyThemes(messageTexts);

  if (themes.length > 0) {
    findings.push({
      category: 'Emerging Themes',
      items: themes,
      impact: 'Medium'
    });
  }

  return findings;
}

function generateRecommendations(charette, messages) {
  const recommendations = [];

  // Based on analysis phase results
  if (charette.currentPhase >= 2) {
    recommendations.push({
      priority: 'High',
      action: 'Address identified constraints',
      rationale: 'Constraints analysis revealed critical blockers'
    });
  }

  if (charette.currentPhase >= 3) {
    recommendations.push({
      priority: 'High',
      action: 'Implement top-ranked solutions',
      rationale: 'Ideation phase generated actionable solutions'
    });
  }

  return recommendations;
}

function identifyThemes(messageTexts) {
  const themes = [];
  const commonWords = ['project', 'team', 'time', 'resources', 'process', 'system'];

  commonWords.forEach(word => {
    const count = messageTexts.filter(text => text.includes(word)).length;
    if (count > messageTexts.length * 0.1) { // If word appears in >10% of messages
      themes.push(`${word} (${count} mentions)`);
    }
  });

  return themes;
}

// Add a health check endpoint for Docker/Coolify
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Catch-all route to serve the React app in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    // Exclude API routes
    if (!req.path.startsWith('/api') && !req.path.startsWith('/socket.io')) {
      res.sendFile(path.join(__dirname, 'client/build/index.html'));
    }
  });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
