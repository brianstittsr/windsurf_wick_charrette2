import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Psychology as AnalystIcon,
  Lightbulb as LightbulbIcon,
  QuestionAnswer as QuestionIcon,
  CheckCircle as ConsensusIcon,
} from '@mui/icons-material';
import {
  analyzeMessagesForConsensus,
  generateFacilitationSuggestions,
  identifyConsensusAreas,
  generateClarifyingQuestion,
  extractTopicsFromMessages
} from './analystUtils';

const AnalystPanel = ({
  messages = [],
  currentPhase = 0,
  analysisResults = [],
  userRole,
  onSendAnalystMessage
}) => {
  const [insights, setInsights] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [consensusAreas, setConsensusAreas] = useState([]);
  const [showClarifyingDialog, setShowClarifyingDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  useEffect(() => {
    if (messages.length >= 3) {
      // Analyze messages for consensus
      const newInsights = analyzeMessagesForConsensus(messages);
      setInsights(newInsights);

      // Generate facilitation suggestions
      const messageTexts = messages.map(m => m.text.toLowerCase());
      const agreements = messageTexts.filter(text =>
        ['agree', 'yes', 'good point', 'I support'].some(word => text.includes(word))
      ).length;
      const disagreements = messageTexts.filter(text =>
        ['disagree', 'no', 'concern', 'issue'].some(word => text.includes(word))
      ).length;

      const newSuggestions = generateFacilitationSuggestions(messages, agreements, disagreements, currentPhase, analysisResults);
      setSuggestions(newSuggestions);

      // Identify consensus areas
      const newConsensus = identifyConsensusAreas(messages);
      setConsensusAreas(newConsensus);
    }
  }, [messages, currentPhase, analysisResults]);

  const handleAnalyzeMessages = () => {
    const newInsights = analyzeMessagesForConsensus(messages);
    setInsights(newInsights);
  };

  const handleAskClarifyingQuestion = () => {
    if (selectedUser && selectedTopic) {
      const question = generateClarifyingQuestion(selectedUser, selectedTopic);
      onSendAnalystMessage(question);
      setShowClarifyingDialog(false);
      setSelectedUser('');
      setSelectedTopic('');
    }
  };

  // Get unique users from messages
  const uniqueUsers = [...new Set(messages.map(m => m.userName).filter(name => name !== 'BMad Analyst'))];

  // Get topics from messages
  const topics = extractTopicsFromMessages(messages);

  if (userRole !== 'analyst') {
    return null;
  }

  return (
    <Paper sx={{ p: 2, mb: 2, backgroundColor: 'primary.light', color: 'primary.contrastText' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <AnalystIcon sx={{ mr: 1 }} />
        <Typography variant="h6">BMad Analyst Panel</Typography>
      </Box>

      <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.3)' }} />

      {/* Analysis Actions */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAnalyzeMessages}
          startIcon={<AnalystIcon />}
          sx={{ mr: 1, mb: 1 }}
        >
          Analyze Discussion
        </Button>
        <Button
          variant="outlined"
          sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}
          onClick={() => setShowClarifyingDialog(true)}
          startIcon={<QuestionIcon />}
        >
          Ask Clarifying Question
        </Button>
      </Box>

      {/* Insights */}
      {insights.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LightbulbIcon sx={{ mr: 1 }} />
            Analysis Insights
          </Typography>
          <List dense>
            {insights.map((insight, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemText primary={insight} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Facilitation Suggestions */}
      {suggestions.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LightbulbIcon sx={{ mr: 1 }} />
            Facilitation Suggestions
          </Typography>
          <List dense>
            {suggestions.map((suggestion, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemText primary={suggestion} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Consensus Areas */}
      {consensusAreas.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <ConsensusIcon sx={{ mr: 1 }} />
            Consensus Areas
          </Typography>
          {consensusAreas.map((area, index) => (
            <Chip
              key={index}
              label={area}
              variant="outlined"
              sx={{ mr: 1, mb: 1, color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}
            />
          ))}
        </Box>
      )}

      {/* Clarifying Question Dialog */}
      <Dialog open={showClarifyingDialog} onClose={() => setShowClarifyingDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Ask Clarifying Question</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Select Participant</InputLabel>
            <Select
              value={selectedUser}
              label="Select Participant"
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              {uniqueUsers.map(user => (
                <MenuItem key={user} value={user}>{user}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Select Topic</InputLabel>
            <Select
              value={selectedTopic}
              label="Select Topic"
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              {topics.map(topic => (
                <MenuItem key={topic} value={topic}>{topic}</MenuItem>
              ))}
              <MenuItem value="default">General Clarification</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowClarifyingDialog(false)}>Cancel</Button>
          <Button onClick={handleAskClarifyingQuestion} variant="contained">
            Send Question
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AnalystPanel;
