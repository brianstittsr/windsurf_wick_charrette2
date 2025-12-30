import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  LinearProgress,
  Alert
} from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import TimerIcon from '@mui/icons-material/Timer';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

const BreakoutRoomCoordinator = ({
  breakoutRooms,
  currentRoom,
  onJoinRoom,
  onCreateRooms,
  onStartTimer,
  onStopTimer,
  timerActive,
  timeRemaining,
  userRole,
  userName
}) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [roomCount, setRoomCount] = useState(3);
  const [questions, setQuestions] = useState(['']);
  const [timerDuration, setTimerDuration] = useState(15);

  const handleCreateRooms = () => {
    const validQuestions = questions.filter(q => q.trim());
    onCreateRooms(roomCount, validQuestions.length > 0 ? validQuestions : ['Discuss the topic']);
    setShowCreateDialog(false);
    setQuestions(['']);
  };

  const addQuestion = () => {
    setQuestions([...questions, '']);
  };

  const updateQuestion = (index, value) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercent = () => {
    if (!timerActive || timerDuration === 0) return 0;
    return ((timerDuration * 60 - timeRemaining) / (timerDuration * 60)) * 100;
  };

  return (
    <Box>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GroupsIcon /> Breakout Room Coordinator
          </Typography>
          {userRole === 'analyst' && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowCreateDialog(true)}
              size="small"
            >
              Create Rooms
            </Button>
          )}
        </Box>

        {/* Timer Control */}
        {breakoutRooms.length > 0 && (
          <Box sx={{ mb: 3 }}>
            {timerActive ? (
              <Alert
                severity="warning"
                icon={<TimerIcon />}
                action={
                  userRole === 'analyst' && (
                    <IconButton
                      color="inherit"
                      size="small"
                      onClick={onStopTimer}
                    >
                      <StopIcon />
                    </IconButton>
                  )
                }
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Time Remaining: {formatTime(timeRemaining)}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={getProgressPercent()}
                  sx={{ mt: 1, height: 8, borderRadius: 1 }}
                />
              </Alert>
            ) : (
              userRole === 'analyst' && (
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    type="number"
                    label="Duration (minutes)"
                    value={timerDuration}
                    onChange={(e) => setTimerDuration(parseInt(e.target.value) || 15)}
                    size="small"
                    inputProps={{ min: 1, max: 60 }}
                    sx={{ width: 150 }}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => onStartTimer(timerDuration)}
                  >
                    Start Timer
                  </Button>
                </Box>
              )
            )}
          </Box>
        )}

        {/* Main Room Card */}
        <Card
          sx={{
            mb: 2,
            border: currentRoom === 'main' ? 2 : 1,
            borderColor: currentRoom === 'main' ? 'primary.main' : 'divider',
            cursor: 'pointer',
            '&:hover': { boxShadow: 3 }
          }}
          onClick={() => onJoinRoom('main')}
        >
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GroupsIcon color="primary" />
                  Main Room
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Full group discussion
                </Typography>
              </Box>
              {currentRoom === 'main' && (
                <Chip label="You are here" color="primary" />
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Breakout Rooms Grid */}
        {breakoutRooms.length > 0 ? (
          <Grid container spacing={2}>
            {breakoutRooms.map((room) => (
              <Grid item xs={12} sm={6} md={4} key={room.id}>
                <Card
                  sx={{
                    height: '100%',
                    border: currentRoom === room.id ? 2 : 1,
                    borderColor: currentRoom === room.id ? 'primary.main' : 'divider',
                    cursor: 'pointer',
                    '&:hover': { boxShadow: 3 }
                  }}
                  onClick={() => onJoinRoom(room.id)}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {room.name}
                    </Typography>
                    
                    {currentRoom === room.id && (
                      <Chip label="You are here" color="primary" size="small" sx={{ mb: 1 }} />
                    )}

                    {/* Participants */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Participants ({room.participants.length})
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {room.participants.slice(0, 3).map((participant, idx) => (
                          <Chip
                            key={idx}
                            avatar={<Avatar sx={{ width: 24, height: 24 }}>{participant.charAt(0)}</Avatar>}
                            label={participant}
                            size="small"
                            variant={participant === userName ? 'filled' : 'outlined'}
                          />
                        ))}
                        {room.participants.length > 3 && (
                          <Chip label={`+${room.participants.length - 3} more`} size="small" />
                        )}
                      </Box>
                    </Box>

                    {/* Questions */}
                    {room.questions && room.questions.length > 0 && (
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Discussion Questions:
                        </Typography>
                        <List dense disablePadding>
                          {room.questions.slice(0, 2).map((question, idx) => (
                            <ListItem key={idx} disablePadding>
                              <ListItemText
                                primary={`${idx + 1}. ${question}`}
                                primaryTypographyProps={{ variant: 'body2' }}
                              />
                            </ListItem>
                          ))}
                          {room.questions.length > 2 && (
                            <Typography variant="caption" color="text.secondary">
                              +{room.questions.length - 2} more questions
                            </Typography>
                          )}
                        </List>
                      </Box>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      fullWidth
                      variant={currentRoom === room.id ? 'contained' : 'outlined'}
                    >
                      {currentRoom === room.id ? 'Current Room' : 'Join Room'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="info">
            No breakout rooms created yet. {userRole === 'analyst' ? 'Click "Create Rooms" to set up breakout sessions.' : 'The facilitator will create breakout rooms when ready.'}
          </Alert>
        )}
      </Paper>

      {/* Create Rooms Dialog */}
      <Dialog open={showCreateDialog} onClose={() => setShowCreateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Breakout Rooms</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Number of rooms"
            type="number"
            fullWidth
            inputProps={{ min: 2, max: 6 }}
            value={roomCount}
            onChange={(e) => setRoomCount(parseInt(e.target.value) || 2)}
            helperText="Participants will be automatically distributed across rooms"
          />
          
          <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
            Discussion Questions:
          </Typography>
          
          {questions.map((question, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <TextField
                fullWidth
                size="small"
                value={question}
                onChange={(e) => updateQuestion(index, e.target.value)}
                placeholder={`Question ${index + 1}`}
              />
              {questions.length > 1 && (
                <IconButton onClick={() => removeQuestion(index)} size="small">
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}
          
          <Button
            startIcon={<AddIcon />}
            onClick={addQuestion}
            sx={{ mt: 1 }}
            size="small"
          >
            Add Question
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCreateDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateRooms} variant="contained">
            Create Rooms
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BreakoutRoomCoordinator;
