const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Import phases with error handling
let PHASES = [];
let REASONING_ALGORITHMS = {};
try {
  const phasesModule = require('../phases');
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
  // Clear require cache to ensure fresh load
  const demoPath = require('path').resolve(__dirname, '../durham-1971-demo-data.js');
  delete require.cache[demoPath];
  
  demoData = require('../durham-1971-demo-data.js');
  console.log('🎬 Demo data loaded successfully');
  console.log('🔍 Demo data keys:', Object.keys(demoData || {}));
  console.log('🔍 Has charette?', !!demoData?.charette);
  console.log('🔍 Has messages?', !!demoData?.messages);
  console.log('🔍 Has report?', !!demoData?.report);
  if (demoData && demoData.charette) {
    console.log('📋 Charette ID:', demoData.charette.id);
    console.log('📋 Charette title:', demoData.charette.title);
    const charetteMessages = demoData.messages?.[demoData.charette.id];
    if (charetteMessages) {
      const roomCount = Object.keys(charetteMessages).length;
      console.log('💬 Messages: Charette has', roomCount, 'rooms');
      console.log('💬 Room IDs:', Object.keys(charetteMessages));
    } else {
      console.log('💬 Messages: No messages found for charette');
    }
  }
} catch (error) {
  console.log('⚠️  No demo data found - starting with empty database');
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);
}

// In-memory data storage (replace with database in production)
let charettes = (demoData && demoData.charette && demoData.charette.id) 
  ? { [demoData.charette.id]: demoData.charette } 
  : {};
let messages = (demoData && demoData.messages) ? demoData.messages : {};
let reports = (demoData && demoData.report && demoData.charette && demoData.charette.id) 
  ? { [demoData.charette.id]: demoData.report } 
  : {};

console.log('📊 Loaded charettes:', Object.keys(charettes).length);
console.log('📊 Charette IDs:', Object.keys(charettes));
if (Object.keys(charettes).length > 0) {
  console.log('📊 First charette:', Object.values(charettes)[0].title);
}

const app = express();

// Configure CORS for both development and production
const corsOptions = {
  origin: process.env.APP_URL 
    ? [process.env.APP_URL, /\.digitalocean\.app$/, /\.vercel\.app$/]
    : (process.env.NODE_ENV === 'production'
      ? ['https://charette-system.vercel.app', /\.vercel\.app$/]
      : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002']),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the React app build in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../client/build');
  app.use(express.static(buildPath));
}

// In-memory storage for demo purposes (now loaded above)
if (!demoData) {
  // Only initialize empty if no demo data
  charettes = {};
  messages = {};
  reports = {};
}

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

  return analysis;
}

// API routes
app.get('/api/charettes', (req, res) => {
  res.json(Object.values(charettes));
});

app.post('/api/charettes', (req, res) => {
  const { title, description, scope, stakeholders, objectives, constraints, timeframe, desiredOutcomes } = req.body;
  const charetteId = uuidv4();
  charettes[charetteId] = {
    id: charetteId,
    title,
    description,
    scope,
    stakeholders,
    objectives,
    constraints,
    timeframe,
    desiredOutcomes,
    currentPhase: 0,
    createdAt: new Date().toISOString(),
    phases: PHASES,
    analysis: [],
    participants: [],
    breakoutRooms: []
  };
  res.json(charettes[charetteId]);
});

app.put('/api/charettes/:id', (req, res) => {
  const charette = charettes[req.params.id];
  if (!charette) {
    return res.status(404).json({ error: 'Charette not found' });
  }

  const { title, description, scope, stakeholders, objectives, constraints, timeframe, desiredOutcomes } = req.body;
  
  // Update charette fields
  charettes[req.params.id] = {
    ...charette,
    title: title || charette.title,
    description: description || charette.description,
    scope: scope !== undefined ? scope : charette.scope,
    stakeholders: stakeholders !== undefined ? stakeholders : charette.stakeholders,
    objectives: objectives !== undefined ? objectives : charette.objectives,
    constraints: constraints !== undefined ? constraints : charette.constraints,
    timeframe: timeframe !== undefined ? timeframe : charette.timeframe,
    desiredOutcomes: desiredOutcomes !== undefined ? desiredOutcomes : charette.desiredOutcomes,
    updatedAt: new Date().toISOString()
  };

  res.json(charettes[req.params.id]);
});

app.delete('/api/charettes/:id', (req, res) => {
  const charette = charettes[req.params.id];
  if (!charette) {
    return res.status(404).json({ error: 'Charette not found' });
  }

  // Delete associated messages
  if (messages[req.params.id]) {
    delete messages[req.params.id];
  }

  // Delete charette
  delete charettes[req.params.id];

  res.json({ success: true, message: 'Charette deleted successfully' });
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

// POST message endpoint for polling-based chat
app.post('/api/charettes/:id/messages', (req, res) => {
  const { message, userName, role, roomId } = req.body;
  const charetteId = req.params.id;
  const charette = charettes[charetteId];
  
  if (!charette) {
    return res.status(404).json({ error: 'Charette not found' });
  }

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

  // Trigger AI analysis if in analysis phase
  if (charette.currentPhase === 2 && (!roomId || roomId === 'main')) {
    const analysis = analyzeMessage(charetteId, messageData);
    messageData.aiAnalysis = analysis;
  }

  res.json(messageData);
});

// GET messages endpoint with polling support (returns messages after a timestamp)
app.get('/api/charettes/:id/messages', (req, res) => {
  const charetteMessages = messages[req.params.id] || {};
  const roomId = req.query.roomId;
  const after = req.query.after; // ISO timestamp for polling

  if (roomId) {
    let roomMessages = charetteMessages[roomId] || [];
    if (after) {
      roomMessages = roomMessages.filter(m => m.timestamp > after);
    }
    res.json(roomMessages);
  } else {
    // Return all messages from all rooms
    let allMessages = Object.values(charetteMessages).flat();
    if (after) {
      allMessages = allMessages.filter(m => m.timestamp > after);
    }
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

// AI Helper Functions
function detectPrimaryIntent(text) {
  const lower = text.toLowerCase();
  if (lower.match(/\b(concern|worry|problem|issue|risk)\b/)) return 'concern';
  if (lower.match(/\b(suggest|propose|recommend|should|could)\b/)) return 'proposal';
  if (lower.match(/\b(question|wonder|curious|clarify|understand)\b/)) return 'inquiry';
  if (lower.match(/\b(agree|support|endorse|favor)\b/)) return 'agreement';
  if (lower.match(/\b(disagree|oppose|against|however)\b/)) return 'disagreement';
  return 'statement';
}

function extractMotivations(text) {
  const motivations = [];
  const lower = text.toLowerCase();
  
  if (lower.match(/\b(efficient|faster|quick|save time)\b/)) motivations.push('efficiency');
  if (lower.match(/\b(cost|budget|expensive|affordable)\b/)) motivations.push('cost-effectiveness');
  if (lower.match(/\b(quality|excellence|best|superior)\b/)) motivations.push('quality');
  if (lower.match(/\b(user|customer|client|people)\b/)) motivations.push('user-focus');
  if (lower.match(/\b(innovat|new|novel|creative)\b/)) motivations.push('innovation');
  
  return motivations;
}

function detectEmotionalTone(text) {
  const lower = text.toLowerCase();
  if (lower.match(/\b(excited|great|excellent|wonderful|amazing)\b/)) return 'positive';
  if (lower.match(/\b(concerned|worried|anxious|afraid|uncertain)\b/)) return 'concerned';
  if (lower.match(/\b(frustrated|annoyed|disappointed|upset)\b/)) return 'negative';
  return 'neutral';
}

function extractAssumptions(text) {
  const assumptions = [];
  const lower = text.toLowerCase();
  
  // Pattern: "assume", "assuming", "presume"
  const assumptionPatterns = [
    /assum(?:e|ing|ed)\s+(?:that\s+)?([^.!?]+)/gi,
    /presume(?:d)?\s+(?:that\s+)?([^.!?]+)/gi,
    /(?:it's|its)\s+(?:clear|obvious)\s+(?:that\s+)?([^.!?]+)/gi,
    /(?:everyone|we all)\s+(?:know|agree)\s+(?:that\s+)?([^.!?]+)/gi
  ];
  
  assumptionPatterns.forEach(pattern => {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      if (match[1]) assumptions.push(match[1].trim());
    }
  });
  
  return assumptions.length > 0 ? assumptions : ['No explicit assumptions detected'];
}

function generateChallengeQuestions(assumptions) {
  return assumptions.map(assumption => {
    return {
      assumption,
      questions: [
        `What evidence supports this assumption?`,
        `What would happen if this assumption were false?`,
        `Are there alternative perspectives on this?`
      ]
    };
  });
}

function detectBiases(text) {
  const biases = [];
  const lower = text.toLowerCase();
  
  if (lower.match(/\b(always|never|everyone|no one|all|none)\b/)) {
    biases.push({ type: 'absolutism', indicator: 'absolute language detected' });
  }
  if (lower.match(/\b(obviously|clearly|certainly|definitely)\b/)) {
    biases.push({ type: 'certainty-bias', indicator: 'overconfidence markers' });
  }
  
  return biases;
}

function detectAmbiguity(text) {
  const ambiguous = [];
  const vagueTerms = ['thing', 'stuff', 'it', 'that', 'this', 'they', 'some', 'many', 'few'];
  
  vagueTerms.forEach(term => {
    if (text.toLowerCase().includes(term)) {
      ambiguous.push({ term, suggestion: `Clarify what "${term}" refers to` });
    }
  });
  
  return ambiguous;
}

function generateFollowUpQuestions(text, context) {
  const questions = [];
  const lower = text.toLowerCase();
  
  if (lower.match(/\b(should|could|might|may)\b/)) {
    questions.push('What are the specific criteria for making this decision?');
  }
  if (lower.match(/\b(problem|issue|challenge)\b/)) {
    questions.push('Can you describe the root cause of this problem?');
    questions.push('What have you tried so far to address this?');
  }
  if (lower.match(/\b(solution|approach|method)\b/)) {
    questions.push('What are the potential drawbacks of this approach?');
    questions.push('How would you measure success?');
  }
  
  return questions.length > 0 ? questions : ['Can you elaborate on your main point?'];
}

function identifyGaps(text, context) {
  const gaps = [];
  
  if (!text.match(/\b(because|since|due to|reason)\b/i)) {
    gaps.push('Missing rationale or reasoning');
  }
  if (!text.match(/\b(data|evidence|example|case)\b/i)) {
    gaps.push('Lacking supporting evidence');
  }
  if (!text.match(/\b(impact|effect|result|outcome)\b/i)) {
    gaps.push('Unclear about expected outcomes');
  }
  
  return gaps;
}

function generateProbes(text) {
  return [
    'Can you provide a specific example?',
    'How does this relate to the overall goal?',
    'What assumptions underlie this statement?',
    'What would success look like?'
  ];
}

function buildPositionMap(messages, charette) {
  const positions = {};
  
  messages.forEach(msg => {
    if (!positions[msg.userName]) {
      positions[msg.userName] = {
        userName: msg.userName,
        role: msg.role,
        stances: [],
        keyThemes: [],
        agreementsWith: [],
        disagreementsWith: []
      };
    }
    
    const intent = detectPrimaryIntent(msg.text);
    positions[msg.userName].stances.push({
      text: msg.text,
      intent,
      timestamp: msg.timestamp
    });
  });
  
  return Object.values(positions);
}

function identifyConsensus(charette) {
  const analysis = charette.intentAnalysis || [];
  const agreements = analysis.filter(a => a.intent?.primary === 'agreement');
  
  return agreements.slice(0, 5).map(a => ({
    topic: 'General agreement',
    participants: [a.userName],
    strength: 'moderate'
  }));
}

function identifyDivergence(charette) {
  const analysis = charette.intentAnalysis || [];
  const disagreements = analysis.filter(a => a.intent?.primary === 'disagreement');
  
  return disagreements.slice(0, 5).map(a => ({
    topic: 'Point of contention',
    participants: [a.userName],
    severity: 'moderate'
  }));
}

function generateNextSteps(charette) {
  const steps = [];
  
  if (charette.assumptionAnalysis?.length > 0) {
    steps.push('Review and validate identified assumptions');
  }
  if (charette.intentAnalysis?.length > 5) {
    steps.push('Synthesize diverse perspectives into common themes');
  }
  steps.push('Generate follow-up questions for areas needing clarification');
  
  return steps;
}

// Phase progression endpoint
app.post('/api/charettes/:id/phase', (req, res) => {
  const charette = charettes[req.params.id];
  if (!charette) {
    return res.status(404).json({ error: 'Charette not found' });
  }

  const { action } = req.body; // 'next' or 'previous'
  if (action === 'next' && charette.currentPhase < charette.phases.length - 1) {
    charette.currentPhase++;
  } else if (action === 'previous' && charette.currentPhase > 0) {
    charette.currentPhase--;
  }

  res.json({ currentPhase: charette.currentPhase, phase: charette.phases[charette.currentPhase] });
});

// Breakout room management
app.post('/api/charettes/:id/breakout-rooms', (req, res) => {
  const { roomCount, questions } = req.body;
  const charette = charettes[req.params.id];
  if (!charette) {
    return res.status(404).json({ error: 'Charette not found' });
  }

  charette.breakoutRooms = [];

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

  // Auto-assign participants
  const participants = charette.participants || [];
  participants.forEach((participant, index) => {
    const roomIndex = index % roomCount;
    charette.breakoutRooms[roomIndex].participants.push(participant.userName);
  });

  res.json(charette.breakoutRooms);
});

app.post('/api/charettes/:id/breakout-rooms/:roomId/join', (req, res) => {
  const { userName } = req.body;
  const charette = charettes[req.params.id];
  if (!charette) {
    return res.status(404).json({ error: 'Charette not found' });
  }

  const room = charette.breakoutRooms.find(r => r.id === req.params.roomId);
  if (room && !room.participants.includes(userName)) {
    room.participants.push(userName);
  }

  res.json(room);
});

app.post('/api/charettes/:id/breakout-rooms/:roomId/leave', (req, res) => {
  const { userName } = req.body;
  const charette = charettes[req.params.id];
  if (!charette) {
    return res.status(404).json({ error: 'Charette not found' });
  }

  const room = charette.breakoutRooms.find(r => r.id === req.params.roomId);
  if (room) {
    room.participants = room.participants.filter(p => p !== userName);
  }

  res.json(room);
});

// AI Continuous Questioning - Intent Analysis
app.post('/api/ai/analyze-intent', (req, res) => {
  const { text, charetteId, userName } = req.body;
  
  // Analyze intent using keyword patterns (can be enhanced with OpenAI)
  const intent = {
    primary: detectPrimaryIntent(text),
    confidence: 0.75,
    underlyingMotivations: extractMotivations(text),
    emotionalTone: detectEmotionalTone(text),
    timestamp: new Date().toISOString()
  };

  // Store in charette
  if (charetteId && charettes[charetteId]) {
    if (!charettes[charetteId].intentAnalysis) {
      charettes[charetteId].intentAnalysis = [];
    }
    charettes[charetteId].intentAnalysis.push({
      userName,
      text,
      intent,
      timestamp: new Date().toISOString()
    });
  }

  res.json(intent);
});

// AI Continuous Questioning - Assumption Extraction
app.post('/api/ai/extract-assumptions', (req, res) => {
  const { text, charetteId, userName } = req.body;
  
  const assumptions = extractAssumptions(text);
  const challengingQuestions = generateChallengeQuestions(assumptions);

  const result = {
    assumptions,
    challengingQuestions,
    hiddenBiases: detectBiases(text),
    timestamp: new Date().toISOString()
  };

  // Store in charette
  if (charetteId && charettes[charetteId]) {
    if (!charettes[charetteId].assumptionAnalysis) {
      charettes[charetteId].assumptionAnalysis = [];
    }
    charettes[charetteId].assumptionAnalysis.push({
      userName,
      text,
      result,
      timestamp: new Date().toISOString()
    });
  }

  res.json(result);
});

// AI Continuous Questioning - Clarification Generator
app.post('/api/ai/generate-clarifications', (req, res) => {
  const { text, context, charetteId } = req.body;
  
  const clarifications = {
    ambiguousTerms: detectAmbiguity(text),
    followUpQuestions: generateFollowUpQuestions(text, context),
    missingInformation: identifyGaps(text, context),
    suggestedProbes: generateProbes(text),
    timestamp: new Date().toISOString()
  };

  res.json(clarifications);
});

// AI Continuous Questioning - Position Mapping
app.post('/api/ai/map-positions', (req, res) => {
  const { charetteId } = req.body;
  const charette = charettes[charetteId];
  
  if (!charette) {
    return res.status(404).json({ error: 'Charette not found' });
  }

  const charetteMessages = messages[charetteId] || {};
  const allMessages = Object.values(charetteMessages).flat();

  // Build position map from all messages
  const positionMap = buildPositionMap(allMessages, charette);

  res.json(positionMap);
});

// Get AI insights for a charette
app.get('/api/charettes/:id/ai-insights', (req, res) => {
  const charette = charettes[req.params.id];
  if (!charette) {
    return res.status(404).json({ error: 'Charette not found' });
  }

  const insights = {
    intentAnalysis: charette.intentAnalysis || [],
    assumptionAnalysis: charette.assumptionAnalysis || [],
    consensusAreas: identifyConsensus(charette),
    divergencePoints: identifyDivergence(charette),
    suggestedNextSteps: generateNextSteps(charette),
    timestamp: new Date().toISOString()
  };

  res.json(insights);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve React app for all non-API routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    // Exclude API routes
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    }
  });
}

// Start server if run directly (not imported as module)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 API Server running on http://localhost:${PORT}`);
    console.log(`📡 Polling-based architecture (Vercel-compatible)`);
    console.log(`🤖 AI features enabled`);
  });
}

module.exports = app;
