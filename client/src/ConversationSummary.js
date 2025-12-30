import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Group as GroupIcon,
  Timeline as TimelineIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import {
  analyzeMessagesForConsensus,
  extractTopicsFromMessages,
  identifyConsensusAreas,
} from './analystUtils';

const ConversationSummary = ({
  messages = [],
  participants = [],
  currentPhase = 0,
  analysisResults = [],
  onGenerateReport,
  onExportSummary,
  facilitatorName = 'Facilitator'
}) => {
  const [summary, setSummary] = useState(null);
  const [showPresentationDialog, setShowPresentationDialog] = useState(false);
  const [presentationNotes, setPresentationNotes] = useState('');

  useEffect(() => {
    if (messages.length > 0) {
      generateSummary();
    }
  }, [messages, participants, analysisResults]);

  const generateSummary = () => {
    const insights = analyzeMessagesForConsensus(messages);
    const topics = extractTopicsFromMessages(messages);
    const consensusAreas = identifyConsensusAreas(messages);

    // Analyze participant contributions
    const participantStats = analyzeParticipantContributions(messages, participants);

    // Identify key decisions and agreements
    const agreements = extractAgreements(messages);
    const disagreements = extractDisagreements(messages);
    const actionItems = extractActionItems(messages);

    // Generate overall session assessment
    const sessionAssessment = assessSessionProgress(messages, currentPhase, analysisResults);

    const newSummary = {
      sessionOverview: {
        totalMessages: messages.length,
        totalParticipants: participants.length,
        duration: calculateSessionDuration(messages),
        currentPhase,
        topicsDiscussed: topics,
      },
      keyFindings: {
        consensusAreas,
        agreements,
        disagreements,
        insights,
      },
      participantContributions: participantStats,
      actionItems,
      sessionAssessment,
      generatedAt: new Date().toISOString(),
      facilitator: facilitatorName,
    };

    setSummary(newSummary);
  };

  const analyzeParticipantContributions = (messages, participants) => {
    const stats = {};

    participants.forEach(participant => {
      const userMessages = messages.filter(m => m.userName === participant.userName);
      stats[participant.userName] = {
        messageCount: userMessages.length,
        role: participant.role,
        keyContributions: extractKeyContributions(userMessages),
        engagement: calculateEngagement(userMessages, messages.length),
      };
    });

    return stats;
  };

  const extractKeyContributions = (userMessages) => {
    const contributions = [];

    userMessages.forEach(message => {
      const text = message.text.toLowerCase();

      // Identify important contributions
      if (text.includes('propose') || text.includes('suggest') || text.includes('recommend')) {
        contributions.push({ type: 'proposal', text: message.text, timestamp: message.timestamp });
      } else if (text.includes('concern') || text.includes('issue') || text.includes('problem')) {
        contributions.push({ type: 'concern', text: message.text, timestamp: message.timestamp });
      } else if (text.includes('agree') || text.includes('support') || text.includes('yes')) {
        contributions.push({ type: 'agreement', text: message.text, timestamp: message.timestamp });
      } else if (text.includes('?') || text.includes('what') || text.includes('how') || text.includes('why')) {
        contributions.push({ type: 'question', text: message.text, timestamp: message.timestamp });
      }
    });

    return contributions.slice(0, 5); // Limit to top 5 contributions
  };

  const calculateEngagement = (userMessages, totalMessages) => {
    if (totalMessages === 0) return 'Low';

    const userPercentage = (userMessages.length / totalMessages) * 100;

    if (userPercentage > 20) return 'High';
    if (userPercentage > 10) return 'Medium';
    return 'Low';
  };

  const extractAgreements = (messages) => {
    return messages.filter(message => {
      const text = message.text.toLowerCase();
      return text.includes('agree') || text.includes('support') || text.includes('yes') ||
             text.includes('good point') || text.includes('I think so too');
    }).map(message => ({
      text: message.text,
      participant: message.userName,
      timestamp: message.timestamp,
    }));
  };

  const extractDisagreements = (messages) => {
    return messages.filter(message => {
      const text = message.text.toLowerCase();
      return text.includes('disagree') || text.includes('concern') || text.includes('issue') ||
             text.includes('problem') || text.includes('challenge');
    }).map(message => ({
      text: message.text,
      participant: message.userName,
      timestamp: message.timestamp,
    }));
  };

  const extractActionItems = (messages) => {
    const actionKeywords = ['need to', 'should', 'will', 'action', 'next step', 'follow up', 'implement'];
    const items = [];

    messages.forEach(message => {
      const text = message.text.toLowerCase();
      const hasActionKeyword = actionKeywords.some(keyword => text.includes(keyword));

      if (hasActionKeyword && (text.includes('?') === false)) { // Avoid questions
        items.push({
          text: message.text,
          participant: message.userName,
          timestamp: message.timestamp,
          priority: text.includes('important') || text.includes('critical') ? 'High' : 'Medium',
        });
      }
    });

    return items.slice(0, 10); // Limit to top 10 action items
  };

  const assessSessionProgress = (messages, currentPhase, analysisResults) => {
    const assessment = {
      progressLevel: 'Unknown',
      strengths: [],
      areasForImprovement: [],
      recommendations: [],
    };

    // Assess based on message count and diversity
    if (messages.length > 50) {
      assessment.progressLevel = 'Excellent';
      assessment.strengths.push('High level of participation and discussion');
    } else if (messages.length > 20) {
      assessment.progressLevel = 'Good';
      assessment.strengths.push('Moderate participation with good discussion flow');
    } else {
      assessment.progressLevel = 'Developing';
      assessment.areasForImprovement.push('Limited participation - consider encouraging more voices');
    }

    // Assess consensus building
    const agreements = extractAgreements(messages).length;
    const disagreements = extractDisagreements(messages).length;

    if (agreements > disagreements * 2) {
      assessment.strengths.push('Strong consensus building with multiple agreements');
      assessment.recommendations.push('Document agreements to build momentum');
    } else if (disagreements > agreements) {
      assessment.areasForImprovement.push('Several areas of disagreement identified');
      assessment.recommendations.push('Consider breakout discussions for conflicting viewpoints');
    }

    // Phase-specific assessment
    if (currentPhase >= 5) {
      assessment.strengths.push('Session progressed through all major phases');
      assessment.recommendations.push('Ready for final report generation');
    } else {
      assessment.areasForImprovement.push(`Session is in Phase ${currentPhase} - consider progressing further`);
    }

    return assessment;
  };

  const calculateSessionDuration = (messages) => {
    if (messages.length < 2) return 'Unknown';

    const firstMessage = messages[0];
    const lastMessage = messages[messages.length - 1];

    if (firstMessage.timestamp && lastMessage.timestamp) {
      const duration = new Date(lastMessage.timestamp) - new Date(firstMessage.timestamp);
      const hours = Math.floor(duration / (1000 * 60 * 60));
      const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

      return `${hours}h ${minutes}m`;
    }

    return 'Unknown';
  };

  const generatePresentationScript = () => {
    if (!summary) return '';

    const script = `
SESSION SUMMARY PRESENTATION

Good [morning/afternoon], everyone. Thank you for participating in today's charette session.

SESSION OVERVIEW:
- Duration: ${summary.sessionOverview.duration}
- Total Participants: ${summary.sessionOverview.totalParticipants}
- Messages Exchanged: ${summary.sessionOverview.totalMessages}
- Topics Discussed: ${summary.sessionOverview.topicsDiscussed.join(', ')}

KEY CONSENSUS AREAS:
${summary.keyFindings.consensusAreas.map(area => `- ${area}`).join('\n')}

MAJOR AGREEMENTS:
${summary.keyFindings.agreements.slice(0, 5).map(agreement =>
  `- ${agreement.participant}: "${agreement.text}"`
).join('\n')}

AREAS OF CONCERN:
${summary.keyFindings.disagreements.slice(0, 3).map(disagreement =>
  `- ${disagreement.participant}: "${disagreement.text}"`
).join('\n')}

ACTION ITEMS IDENTIFIED:
${summary.actionItems.slice(0, 5).map(item =>
  `- ${item.priority}: ${item.text} (${item.participant})`
).join('\n')}

SESSION ASSESSMENT:
Progress Level: ${summary.sessionAssessment.progressLevel}
Strengths: ${summary.sessionAssessment.strengths.join(', ')}
Recommendations: ${summary.sessionAssessment.recommendations.join(', ')}

Thank you all for your valuable contributions. This summary represents our collective thinking and will guide our next steps.

${presentationNotes}
    `.trim();

    return script;
  };

  const handleExportSummary = () => {
    const data = {
      summary,
      presentationScript: generatePresentationScript(),
      rawMessages: messages,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `charette-summary-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (onExportSummary) {
      onExportSummary(data);
    }
  };

  if (!summary) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">Generating Session Summary...</Typography>
        <Typography variant="body2" color="text.secondary">
          Analyzing {messages.length} messages from {participants.length} participants
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TimelineIcon sx={{ mr: 2, fontSize: 40 }} />
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Charette Session Summary
              </Typography>
              <Typography variant="subtitle1">
                Facilitated by {summary.facilitator} • Generated {new Date(summary.generatedAt).toLocaleString()}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowPresentationDialog(true)}
              startIcon={<AssignmentIcon />}
            >
              Presentation Mode
            </Button>
            <Button
              variant="outlined"
              sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}
              onClick={handleExportSummary}
              startIcon={<CheckCircleIcon />}
            >
              Export Summary
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Session Overview */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <GroupIcon sx={{ mr: 1 }} />
                Session Overview
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <Chip label={`${summary.sessionOverview.totalMessages} Messages`} variant="outlined" />
                <Chip label={`${summary.sessionOverview.totalParticipants} Participants`} variant="outlined" />
                <Chip label={`Duration: ${summary.sessionOverview.duration}`} variant="outlined" />
                <Chip label={`Phase ${summary.sessionOverview.currentPhase}`} color="primary" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Topics Discussed: {summary.sessionOverview.topicsDiscussed.join(', ') || 'None identified'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon sx={{ mr: 1, color: 'success.main' }} />
                Session Assessment
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                Progress Level: {summary.sessionAssessment.progressLevel}
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Strengths:</strong> {summary.sessionAssessment.strengths.join(', ') || 'None identified'}
              </Typography>
              <Typography variant="body2">
                <strong>Areas for Improvement:</strong> {summary.sessionAssessment.areasForImprovement.join(', ') || 'None identified'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Detailed Summary */}
      <Box sx={{ mt: 3 }}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Consensus Areas & Key Findings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {summary.keyFindings.consensusAreas.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" color="success.main" gutterBottom>
                  Areas of Consensus
                </Typography>
                <List dense>
                  {summary.keyFindings.consensusAreas.map((area, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={area} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {summary.keyFindings.agreements.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Key Agreements ({summary.keyFindings.agreements.length})
                </Typography>
                <List dense>
                  {summary.keyFindings.agreements.slice(0, 10).map((agreement, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={agreement.text}
                        secondary={`${agreement.participant} • ${new Date(agreement.timestamp).toLocaleTimeString()}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {summary.keyFindings.disagreements.length > 0 && (
              <Box>
                <Typography variant="subtitle1" color="warning.main" gutterBottom>
                  Areas of Concern ({summary.keyFindings.disagreements.length})
                </Typography>
                <List dense>
                  {summary.keyFindings.disagreements.slice(0, 10).map((disagreement, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={disagreement.text}
                        secondary={`${disagreement.participant} • ${new Date(disagreement.timestamp).toLocaleTimeString()}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Participant Contributions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {Object.entries(summary.participantContributions).map(([userName, stats]) => (
                <Grid item xs={12} sm={6} md={4} key={userName}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar sx={{ mr: 1, width: 32, height: 32 }}>
                          {userName.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">{userName}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {stats.role} • {stats.engagement} Engagement
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {stats.messageCount} messages • {stats.keyContributions.length} key contributions
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Action Items & Next Steps</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {summary.actionItems.length > 0 ? (
              <List>
                {summary.actionItems.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Chip
                            label={item.priority}
                            color={item.priority === 'High' ? 'error' : 'warning'}
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          {item.text}
                        </Box>
                      }
                      secondary={`${item.participant} • ${new Date(item.timestamp).toLocaleTimeString()}`}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No specific action items identified from the discussion.
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Facilitator Recommendations</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              Based on the session analysis, here are recommendations for moving forward:
            </Typography>
            <List>
              {summary.sessionAssessment.recommendations.map((rec, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`💡 ${rec}`} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Presentation Dialog */}
      <Dialog
        open={showPresentationDialog}
        onClose={() => setShowPresentationDialog(false)}
        maxWidth="md"
        fullWidth
        maxHeight="80vh"
      >
        <DialogTitle>
          <Typography variant="h5">Presentation Script</Typography>
          <Typography variant="body2" color="text.secondary">
            Use this script to present the session summary back to the group
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            multiline
            fullWidth
            rows={20}
            value={generatePresentationScript()}
            InputProps={{
              readOnly: true,
            }}
            sx={{ mt: 1 }}
          />
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" gutterBottom>
            Additional Notes for Presentation:
          </Typography>
          <TextField
            multiline
            fullWidth
            rows={4}
            placeholder="Add any additional notes or context for your presentation..."
            value={presentationNotes}
            onChange={(e) => setPresentationNotes(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPresentationDialog(false)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              navigator.clipboard.writeText(generatePresentationScript());
              // Could add a toast notification here
            }}
          >
            Copy to Clipboard
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConversationSummary;
