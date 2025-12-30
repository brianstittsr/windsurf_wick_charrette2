import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  signInWithGoogle,
  logout,
  onAuthStateChange
} from './firebase';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Chip,
  Avatar,
  IconButton,
  Fab,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Switch,
  Tabs,
  Tab,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import GoogleIcon from '@mui/icons-material/Google';
import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import CharetteWizard from './CharetteWizard';
import DocumentUpload from './DocumentUpload';
import CharetteWizardStepper from './components/CharetteWizardStepper';
import BreakoutRoomCoordinator from './components/BreakoutRoomCoordinator';
import apiService from './services/api';
import { usePolling } from './hooks/usePolling';
import { POLLING_INTERVAL } from './config';

// API URL for development/production
const API_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '');

console.log('Using polling-based architecture - Vercel compatible');

// Create a modern Material UI theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  const [charettes, setCharettes] = useState([]);
  const [currentCharette, setCurrentCharette] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('participant');
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [analysisResults] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [report, setReport] = useState(null);
  const [breakoutRooms, setBreakoutRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState('main');
  const [breakoutTimeRemaining, setBreakoutTimeRemaining] = useState(0);
  const [breakoutTimerActive, setBreakoutTimerActive] = useState(false);
  const [mainRoomWelcomeSent, setMainRoomWelcomeSent] = useState(false);
  const [showRoomCreator, setShowRoomCreator] = useState(false);
  const [roomCount, setRoomCount] = useState(3);
  const [roomQuestions, setRoomQuestions] = useState(['']);
  const [showLogin, setShowLogin] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [sessionIssues] = useState([]);
  const [sessionSolutions] = useState([]);
  const [issueDiscussionActive, setIssueDiscussionActive] = useState(false);
  const [aiInsights, setAiInsights] = useState(null);
  const [showAiInsights, setShowAiInsights] = useState(false);
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchCharettes();
  }, []);

  // Polling for new messages when in a charette
  const pollMessages = useCallback(async () => {
    if (!currentCharette?.id) return;
    
    try {
      const newMessages = await apiService.getMessages(
        currentCharette.id,
        currentRoom,
        lastMessageTimestamp
      );
      
      if (newMessages.length > 0) {
        setMessages(prev => [...prev, ...newMessages]);
        setLastMessageTimestamp(newMessages[newMessages.length - 1].timestamp);
      }
    } catch (error) {
      console.error('Error polling messages:', error);
    }
  }, [currentCharette?.id, currentRoom, lastMessageTimestamp]);

  // Polling for charette updates (phase changes, breakout rooms, etc.)
  const pollCharetteUpdates = useCallback(async () => {
    if (!currentCharette?.id) return;
    
    try {
      const updatedCharette = await apiService.getCharette(currentCharette.id);
      
      // Update phase if changed
      if (updatedCharette.currentPhase !== currentPhase) {
        setCurrentPhase(updatedCharette.currentPhase);
      }
      
      // Update breakout rooms if changed
      if (JSON.stringify(updatedCharette.breakoutRooms) !== JSON.stringify(breakoutRooms)) {
        setBreakoutRooms(updatedCharette.breakoutRooms || []);
      }
    } catch (error) {
      console.error('Error polling charette updates:', error);
    }
  }, [currentCharette?.id, currentPhase, breakoutRooms]);

  // Enable polling when in a charette
  usePolling(pollMessages, POLLING_INTERVAL, !!currentCharette?.id);
  usePolling(pollCharetteUpdates, POLLING_INTERVAL * 2, !!currentCharette?.id);
  // Authentication state listener
  useEffect(() => {
    if (isDemoMode) {
      // Demo mode - set mock user immediately
      setUser({
        displayName: 'Demo User',
        email: 'demo@example.com',
        uid: 'demo-user-id'
      });
      setUserName('Demo User');
      setLoading(false);
    } else {
      // Firebase authentication
      const unsubscribe = onAuthStateChange((user) => {
        setUser(user);
        setLoading(false);
        if (user) {
          setUserName(user.displayName || user.email.split('@')[0]);
        }
      });
      return () => unsubscribe();
    }
  }, [isDemoMode]);

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const fetchCharettes = async () => {
    const response = await fetch(`${API_URL}/api/charettes`);
    const data = await response.json();
    setCharettes(data);
  };

  const createCharette = async (charetteData) => {
    const response = await fetch(`${API_URL}/api/charettes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(charetteData)
    });
    const newCharette = await response.json();
    setCharettes(prev => [...prev, newCharette]);
  };

  const joinCharette = async (charette) => {
    setCurrentCharette(charette);
    setCurrentPhase(charette.currentPhase);
    setMainRoomWelcomeSent(false);
    setCurrentRoom('main');

    // Register participant
    if (userName) {
      await apiService.addParticipant(charette.id, userName, userRole);
    }

    // Load messages for main room initially
    const charetteMessages = await apiService.getMessages(charette.id, 'main');
    setMessages(charetteMessages);
    if (charetteMessages.length > 0) {
      setLastMessageTimestamp(charetteMessages[charetteMessages.length - 1].timestamp);
    }

    // Load current charette data including breakout rooms
    const updatedCharette = await apiService.getCharette(charette.id);
    setBreakoutRooms(updatedCharette.breakoutRooms || []);

    // Send welcome message from Bill Riddick when joining charette
    if (userName && charette?.metadata) {
      setTimeout(async () => {
        const welcomeMessage = generateSessionWelcomeMessage(charette.metadata, userName, charette.title);
        await sendAnalystMessage(welcomeMessage, 'main');
      }, 1500);
    }
  };

  const handleLogin = async () => {
    if (isDemoMode) {
      // Demo mode - just set user
      setUser({
        displayName: 'Demo User',
        email: 'demo@example.com',
        uid: 'demo-user-id'
      });
      setUserName('Demo User');
      setShowLogin(false);
      setLoginError('');
    } else {
      // Firebase authentication
      try {
        await signInWithGoogle();
        setShowLogin(false);
        setLoginError('');
      } catch (error) {
        console.error('Login error:', error);
        setLoginError('Failed to sign in with Google. Please try again.');
      }
    }
  };

  const handleLogout = async () => {
    try {
      if (!isDemoMode) {
        await logout();
      }
      setUser(null);
      setUserName('');
      setCurrentCharette(null);
      setMessages([]);
      setBreakoutRooms([]);
      setCurrentRoom('main');
      setMainRoomWelcomeSent(false);
      setShowLogin(true);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleDemoMode = () => {
    setIsDemoMode(!isDemoMode);
    setLoginError('');
    if (!isDemoMode) {
      // Switching to demo mode - set demo user immediately
      setUser({
        displayName: 'Demo User',
        email: 'demo@example.com',
        uid: 'demo-user-id'
      });
    } else {
      // Switching to Firebase mode - clear user and show login
      setUser(null);
      setUserName('');
      setMainRoomWelcomeSent(false);
      setShowLogin(true);
    }
  };

  const nextPhase = async () => {
    try {
      const result = await apiService.changePhase(currentCharette.id, 'next');
      setCurrentPhase(result.currentPhase);
    } catch (error) {
      console.error('Error changing phase:', error);
    }
  };

  const generateReport = async () => {
    const response = await fetch(`${API_URL}/api/charettes/${currentCharette.id}/report`);
    const reportData = await response.json();
    setReport(reportData);
    setShowReport(true);
  };

  const sendAnalystMessage = useCallback(async (message, roomId = currentRoom) => {
    if (!currentCharette?.id) return;
    try {
      const messageData = await apiService.sendMessage(
        currentCharette.id,
        message,
        'Bill Riddick',
        'analyst',
        roomId
      );
      setMessages(prev => [...prev, messageData]);
      setLastMessageTimestamp(messageData.timestamp);
    } catch (error) {
      console.error('Error sending analyst message:', error);
    }
  }, [currentCharette?.id, currentRoom]);

  const joinRoom = useCallback(async (roomId) => {
    if (currentRoom !== roomId) {
      // Leave current room if not main
      if (currentRoom !== 'main') {
        await apiService.leaveBreakoutRoom(currentCharette.id, currentRoom, userName);
      }

      // Join new room
      if (roomId !== 'main') {
        await apiService.joinBreakoutRoom(currentCharette.id, roomId, userName);
      }

      setCurrentRoom(roomId);

      // Load messages for the new room
      const roomMessages = await apiService.getMessages(currentCharette.id, roomId);
      setMessages(roomMessages);
      if (roomMessages.length > 0) {
        setLastMessageTimestamp(roomMessages[roomMessages.length - 1].timestamp);
      } else {
        setLastMessageTimestamp(null);
      }

      // Send welcome message from Bill Riddick when joining main room
      if (roomId === 'main' && userName && currentCharette?.metadata && !mainRoomWelcomeSent) {
        setMainRoomWelcomeSent(true);
        setTimeout(async () => {
          const welcomeMessage = generateWelcomeMessage(currentCharette.metadata, userName);
          await sendAnalystMessage(welcomeMessage, 'main');
        }, 1000);
      }
    }
  }, [currentRoom, currentCharette?.id, userName, currentCharette?.metadata, mainRoomWelcomeSent, sendAnalystMessage]);

  const createBreakoutRooms = async () => {
    // Filter out empty questions
    const validQuestions = roomQuestions.filter(q => q.trim());
    if (validQuestions.length === 0) {
      validQuestions.push('Discuss the topic');
    }

    try {
      const rooms = await apiService.createBreakoutRooms(
        currentCharette.id,
        roomCount,
        validQuestions
      );
      setBreakoutRooms(rooms);
      setShowRoomCreator(false);
    } catch (error) {
      console.error('Error creating breakout rooms:', error);
    }
  };

  const addQuestion = () => {
    setRoomQuestions([...roomQuestions, '']);
  };

  const updateQuestion = (index, value) => {
    const updated = [...roomQuestions];
    updated[index] = value;
    setRoomQuestions(updated);
  };

  const removeQuestion = (index) => {
    if (roomQuestions.length > 1) {
      setRoomQuestions(roomQuestions.filter((_, i) => i !== index));
    }
  };

  const addRoomQuestion = (roomId, question) => {
    // Room questions are now managed through breakout room updates
    console.log('Add room question:', roomId, question);
  };

  const removeRoomQuestion = (roomId, questionIndex) => {
    // Room questions are now managed through breakout room updates
    console.log('Remove room question:', roomId, questionIndex);
  };

  const generateSessionWelcomeMessage = (metadata, participantName, sessionTitle) => {
    const {
      title = sessionTitle || 'our discussion',
      scope = '',
      stakeholders = '',
      objectives = '',
      constraints = '',
      timeframe = '',
      desiredOutcomes = ''
    } = metadata || {};

    const welcomeMessage = `🎉 **Welcome to "${title}", ${participantName}!**

Hello! I'm **Bill Riddick**, your dedicated BMad Analyst for this collaborative charette session. I'm here to facilitate productive dialogue and help us explore this important topic together.

**📋 Session Summary:**
${scope ? `📍 **Context & Scope:** ${scope}` : ''}
${stakeholders ? `👥 **Key Stakeholders:** ${stakeholders}` : ''}
${objectives ? `🎯 **Our Objectives:** ${objectives}` : ''}
${constraints ? `⚠️ **Important Constraints:** ${constraints}` : ''}
${timeframe ? `⏰ **Timeframe:** ${timeframe}` : ''}
${desiredOutcomes ? `✨ **What We Hope to Achieve:** ${desiredOutcomes}` : ''}

**🚀 Getting Started:**
As participants join, we'll begin with introductions in the Main Room. This helps everyone understand the diverse perspectives and expertise in our group.

**💡 Pro Tip:** Feel free to select your role (Participant, Analyst, or Project Manager) from the dropdown in the message input area. This helps others understand your perspective during our discussions.

I'm excited to work with you all to explore this topic thoughtfully and reach meaningful outcomes. Let's create something valuable together!

*This session follows structured charette methodology to ensure inclusive, productive dialogue.*`;

    return welcomeMessage;
  };

  const generateWelcomeMessage = (metadata, participantName) => {
    const {
      title = 'our discussion',
      scope = '',
      stakeholders = '',
      objectives = '',
      constraints = '',
      desiredOutcomes = ''
    } = metadata || {};

    const welcomeMessage = `👋 Welcome to the Main Room, ${participantName}!

I'm Bill Riddick, your Charette Facilitator for this session. I'm grateful you're here to collaborate on **${title}**.

**Session Snapshot:**
${scope ? `📍 **Context:** ${scope}` : ''}
${stakeholders ? `👥 **Stakeholders:** ${stakeholders}` : ''}
${objectives ? `🎯 **Objectives:** ${objectives}` : ''}
${constraints ? `⚠️ **Constraints:** ${constraints}` : ''}
${desiredOutcomes ? `✨ **Desired Outcomes:** ${desiredOutcomes}` : ''}

To kick things off, please introduce yourself and share:
• What perspective or experience you bring to this session
• What problems or challenges you already know about in this space
• One solution, resource, or idea you could offer to help address those problems

Your insights set the tone for a solutions-focused conversation, and I'm here to support you every step of the way.`;

    return welcomeMessage;
  };

  const sendMessage = async () => {
    if (newMessage.trim() && userName.trim()) {
      try {
        const messageData = await apiService.sendMessage(
          currentCharette.id,
          newMessage,
          userName,
          userRole,
          currentRoom
        );
        setMessages(prev => [...prev, messageData]);
        setLastMessageTimestamp(messageData.timestamp);
        setNewMessage('');
        
        // Trigger AI analysis for the message
        if (messageData.aiAnalysis) {
          console.log('AI Analysis:', messageData.aiAnalysis);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDocumentsChange = (newDocuments) => {
    setDocuments(newDocuments);
    // Documents are now stored locally and can be synced via API if needed
  };

  const startIssueDiscussion = () => {
    setIssueDiscussionActive(true);

    const issuePrompt = `🎯 **Let's Begin the Issue Identification Phase**

Based on the documents we've uploaded and our session objectives, I want to understand what you see as the key **issues** and **challenges** we're facing.

Please share your thoughts on:
• **What are the main problems or obstacles?**
• **What issues need to be addressed?**
• **What challenges do you foresee?**

After we've discussed the issues, we'll explore potential solutions together. Feel free to reference the uploaded documents or share your expertise.

Who would like to start by sharing an issue they've identified?`;

    setTimeout(async () => {
      await sendAnalystMessage(issuePrompt, 'main');
    }, 1000);
  };

  const analyzeForBreakoutRooms = async () => {
    if (documents.length === 0 && sessionIssues.length === 0) {
      await sendAnalystMessage("I need some documents and participant input before I can generate breakout room topics. Please upload documents and discuss issues first.", 'main');
      return;
    }

    // AI-powered breakout room topic generation
    const analysisMessage = "🤖 Analyzing discussion patterns and generating optimal breakout room topics...";
    await sendAnalystMessage(analysisMessage, 'main');
  };

  const startBreakoutTimer = useCallback((durationMinutes) => {
    setBreakoutTimerActive(true);
    setBreakoutTimeRemaining(durationMinutes * 60);
    
    // Local timer countdown
    const interval = setInterval(() => {
      setBreakoutTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setBreakoutTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const stopBreakoutTimer = useCallback(() => {
    setBreakoutTimerActive(false);
    setBreakoutTimeRemaining(0);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const phases = [
    { name: 'Introduction', description: 'Welcome and overview' },
    { name: 'Data Collection', description: 'Gather initial information' },
    { name: 'Analysis', description: 'Explore constraints and assumptions' },
    { name: 'Ideation', description: 'Generate ideas' },
    { name: 'Synthesis', description: 'Combine findings' },
    { name: 'Reporting', description: 'Generate final report' }
  ];

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <Typography variant="h6">Loading...</Typography>
        </Box>
      </ThemeProvider>
    );
  }

  if (!user || showLogin) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            backgroundColor: 'background.default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1489599651941-b7b9b4c2c5b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Container maxWidth="sm">
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                Charette System
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 3 }}>
                Collaborative facilitation platform for structured group discussions
              </Typography>

              <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  "The Best of Enemies" - Inspired by the power of civil discourse and structured dialogue
                </Typography>
              </Box>

              <Box sx={{ my: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isDemoMode}
                      onChange={toggleDemoMode}
                      color="primary"
                    />
                  }
                  label="Demo Mode"
                />
              </Box>

              {loginError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {loginError}
                </Alert>
              )}

              <Button
                variant="contained"
                size="large"
                startIcon={isDemoMode ? <PlayArrowIcon /> : <GoogleIcon />}
                onClick={handleLogin}
                sx={{ mt: 2, px: 4, py: 1.5 }}
              >
                {isDemoMode ? 'Start Demo' : 'Sign in with Google'}
              </Button>

              {!isDemoMode && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Sign in with your Google account to access the full Charette System
                </Typography>
              )}
            </Paper>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: 'background.default' }}>
        <AppBar position="static" elevation={1}>
          <Toolbar>
            <GroupIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Charette System
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={isDemoMode ? "Demo Mode" : "Firebase Mode"}
                variant="outlined"
                color={isDemoMode ? "primary" : "secondary"}
                size="small"
              />
              <Button
                color="inherit"
                onClick={handleLogout}
                startIcon={<ArrowBackIcon />}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {!currentCharette ? (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Charette Sessions
                </Typography>
                <Fab color="primary" aria-label="add" onClick={() => setShowCreateForm(true)}>
                  <AddIcon />
                </Fab>
              </Box>

              <CharetteWizard
                open={showCreateForm}
                onClose={() => setShowCreateForm(false)}
                onCreate={createCharette}
              />

              <Grid container spacing={3}>
                {charettes.map(charette => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={charette.id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" component="div" gutterBottom>
                          {charette.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {charette.description}
                        </Typography>
                        <Chip
                          label={`Phase: ${charette.phases[charette.currentPhase]?.name}`}
                          color="primary"
                          variant="outlined"
                        />
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary" onClick={() => joinCharette(charette)}>
                          Join Session
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Box>
              {/* Header */}
              <Paper sx={{ p: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => setCurrentCharette(null)} sx={{ mr: 2 }}>
                      <ArrowBackIcon />
                    </IconButton>
                    <Box>
                      <Typography variant="h5" component="h1">
                        {currentCharette.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {currentCharette.description}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip 
                      label={`Phase ${currentPhase + 1}/${phases.length}`} 
                      color="primary" 
                      variant="outlined"
                    />
                    {currentPhase >= 5 && (
                      <Button 
                        variant="contained" 
                        startIcon={<AssessmentIcon />} 
                        onClick={generateReport}
                        size="small"
                      >
                        Generate Report
                      </Button>
                    )}
                  </Box>
                </Box>
              </Paper>

              {/* Tabs Navigation */}
              <Paper sx={{ mb: 3 }}>
                <Tabs 
                  value={currentTab} 
                  onChange={(e, newValue) => setCurrentTab(newValue)}
                  variant="fullWidth"
                >
                  <Tab label="Process Guide" />
                  <Tab label="Discussion" />
                  <Tab label="Breakout Rooms" />
                  <Tab label="Documents & Analysis" />
                </Tabs>
              </Paper>

              {/* Tab Content */}
              <Box sx={{ minHeight: 'calc(100vh - 300px)' }}>
                {/* Tab 0: Process Guide */}
                {currentTab === 0 && (
                  <CharetteWizardStepper
                    currentPhase={currentPhase}
                    phases={phases}
                    onPhaseChange={async (action) => {
                      try {
                        const result = await apiService.changePhase(currentCharette.id, action);
                        setCurrentPhase(result.currentPhase);
                      } catch (error) {
                        console.error('Error changing phase:', error);
                      }
                    }}
                    userRole={userRole}
                  />
                )}

                {/* Tab 1: Discussion */}
                {currentTab === 1 && (
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Paper sx={{ p: 2, height: '600px', overflow: 'auto' }}>
                        <Typography variant="h6" gutterBottom>
                          Rooms
                        </Typography>
                        <List>
                          <ListItem 
                            button 
                            selected={currentRoom === 'main'}
                            onClick={() => joinRoom('main')}
                          >
                            <ListItemText
                              primary="Main Room"
                              secondary={`${messages.filter(m => m.roomId === 'main' || !m.roomId).length} messages`}
                            />
                          </ListItem>
                          {breakoutRooms.map(room => (
                            <ListItem 
                              button 
                              key={room.id} 
                              selected={currentRoom === room.id}
                              onClick={() => joinRoom(room.id)}
                            >
                              <ListItemText
                                primary={room.name}
                                secondary={`${room.participants.length} participants`}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                      <Paper sx={{ p: 2, height: '600px', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                          <ChatIcon sx={{ mr: 1 }} />
                          {currentRoom === 'main' ? 'Main Room' :
                           breakoutRooms.find(r => r.id === currentRoom)?.name || 'Unknown Room'}
                        </Typography>

                        {/* Messages */}
                        <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 2, p: 1 }}>
                          {messages.map(message => (
                            <Box key={message.id} sx={{ mb: 1 }}>
                              <Paper variant="outlined" sx={{ p: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                  <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                                    {message.userName.charAt(0).toUpperCase()}
                                  </Avatar>
                                  <Typography variant="subtitle2" sx={{ mr: 1 }}>
                                    {message.userName}
                                  </Typography>
                                  <Chip
                                    label={message.role}
                                    size="small"
                                    color={message.role === 'analyst' ? 'primary' : message.role === 'project_manager' ? 'secondary' : 'default'}
                                  />
                                </Box>
                                <Typography variant="body1">{message.text}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {new Date(message.timestamp).toLocaleTimeString()}
                                </Typography>
                              </Paper>
                            </Box>
                          ))}
                          <div ref={messagesEndRef} />
                        </Box>

                        {/* Message Input */}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            disabled={!userName}
                          />
                          <Button
                            variant="contained"
                            endIcon={<SendIcon />}
                            onClick={sendMessage}
                            disabled={!userName || !newMessage.trim()}
                          >
                            Send
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                )}

                {/* Tab 2: Breakout Rooms */}
                {currentTab === 2 && (
                  <BreakoutRoomCoordinator
                    breakoutRooms={breakoutRooms}
                    currentRoom={currentRoom}
                    onJoinRoom={joinRoom}
                    onCreateRooms={createBreakoutRooms}
                    onStartTimer={startBreakoutTimer}
                    onStopTimer={stopBreakoutTimer}
                    timerActive={breakoutTimerActive}
                    timeRemaining={breakoutTimeRemaining}
                    userRole={userRole}
                    userName={userName}
                  />
                )}

                {/* Tab 3: Documents & Analysis */}
                {currentTab === 3 && (
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                          Session Documents
                        </Typography>
                        <DocumentUpload
                          charetteId={currentCharette.id}
                          onDocumentsChange={handleDocumentsChange}
                        />
                        
                        {userRole === 'analyst' && (
                          <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" gutterBottom>
                              Session Management
                            </Typography>
                            {!issueDiscussionActive && (
                              <Button
                                variant="outlined"
                                fullWidth
                                onClick={startIssueDiscussion}
                                sx={{ mb: 1 }}
                              >
                                Start Issue Discussion
                              </Button>
                            )}
                            <Button
                              variant="outlined"
                              fullWidth
                              onClick={analyzeForBreakoutRooms}
                              disabled={!issueDiscussionActive}
                            >
                              AI-Generate Breakout Topics
                            </Button>
                          </Box>
                        )}
                      </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                          AI Analysis Results
                        </Typography>
                        {currentPhase === 2 && analysisResults.length > 0 ? (
                          <List dense>
                            {analysisResults.slice(-5).map((result, index) => (
                              <ListItem key={index}>
                                <ListItemText
                                  primary={`Analysis ${index + 1}`}
                                  secondary={
                                    <Box>
                                      {result && result.constraints && result.constraints.length > 0 && (
                                        <Chip size="small" label={`Constraints: ${result.constraints.length}`} sx={{ mr: 1, mb: 1 }} />
                                      )}
                                      {result && result.assumptions && result.assumptions.length > 0 && (
                                        <Chip size="small" label={`Assumptions: ${result.assumptions.length}`} sx={{ mr: 1, mb: 1 }} />
                                      )}
                                      {result && result.opportunities && result.opportunities.length > 0 && (
                                        <Chip size="small" label={`Opportunities: ${result.opportunities.length}`} sx={{ mr: 1, mb: 1 }} />
                                      )}
                                    </Box>
                                  }
                                />
                              </ListItem>
                            ))}
                          </List>
                        ) : (
                          <Alert severity="info">
                            AI analysis will appear here during the Analysis phase.
                          </Alert>
                        )}
                      </Paper>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </Box>

          )}

          {/* Report Modal */}
          {showReport && report && (
            <Dialog open={showReport} onClose={() => setShowReport(false)} maxWidth="md" fullWidth>
              <DialogTitle>
                <Typography variant="h5">Charette Report: {report.title}</Typography>
              </DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2 }}>
                  {/* Breakout Rooms Summary */}
                  <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">Breakout Rooms Summary</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography paragraph>Total Rooms: {report.summary.totalBreakoutRooms}</Typography>
                      {report.breakoutRooms.map((room, index) => (
                        <Card key={index} sx={{ mb: 2 }}>
                          <CardContent>
                            <Typography variant="h6">{room.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Participants: {room.participants.join(', ')}
                            </Typography>
                            <Typography variant="caption">
                              Created: {new Date(room.createdAt).toLocaleString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </AccordionDetails>
                  </Accordion>

                  {/* Summary */}
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">Summary</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Total Messages: {report.summary.totalMessages}</Typography>
                      <Typography>Total Participants: {report.summary.totalParticipants}</Typography>
                      <Typography>Final Phase: {report.phases[report.finalPhase]?.name}</Typography>
                    </AccordionDetails>
                  </Accordion>

                  {/* Key Findings */}
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">Key Findings</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {report.keyFindings.map((finding, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                          <Typography variant="h6" color="primary">{finding.category}</Typography>
                          <List dense>
                            {finding.items.map((item, i) => (
                              <ListItem key={i}>
                                <ListItemText primary={typeof item === 'string' ? item : item && item.keyword ? `${item.keyword} - ${item.user}` : 'Invalid item'} />
                              </ListItem>
                            ))}
                          </List>
                          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                            Impact: {finding.impact}
                          </Typography>
                        </Box>
                      ))}
                    </AccordionDetails>
                  </Accordion>

                  {/* Recommendations */}
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">Recommendations</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        {report.recommendations.map((rec, index) => (
                          <ListItem key={index}>
                            <ListItemText
                              primary={`${rec.priority}: ${rec.action}`}
                              secondary={rec.rationale}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>

                  {/* Next Steps */}
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">Next Steps</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        {report.nextSteps.map((step, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={`${index + 1}. ${step}`} />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowReport(false)}>Close</Button>
              </DialogActions>
            </Dialog>
          )}

        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
