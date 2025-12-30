import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Avatar,
  Chip,
  LinearProgress,
  Fade,
  Grow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Psychology as AnalystIcon,
  QuestionAnswer as QuestionIcon,
  CheckCircle as CheckIcon,
  ArrowForward as ArrowForwardIcon,
  Timer as TimerIcon,
} from '@mui/icons-material';

const CharetteWizard = ({ open, onClose, onCreate }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [responses, setResponses] = useState({
    title: '',
    description: '',
    scope: '',
    stakeholders: '',
    objectives: '',
    constraints: '',
    timeframe: '',
    desiredOutcomes: '',
    breakoutRoomTime: 15, // Default 15 minutes
  });

  const [currentResponse, setCurrentResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const steps = [
    {
      label: 'Topic Definition',
      question: "Hello! I'm Bill Riddick, your Charette Facilitator. To create an effective charette session, let's start by clearly defining the topic or issue you want to explore. What is the main topic or problem you'd like to address?",
      field: 'title',
      placeholder: 'e.g., "Urban redevelopment of downtown area", "Sustainable energy transition", "Community healthcare access"',
      required: true,
    },
    {
      label: 'Context & Scope',
      question: "Great! Now let's understand the scope. What is the current situation or context around this topic? Who or what is affected, and what are the boundaries of what we're exploring?",
      field: 'scope',
      placeholder: 'e.g., "Affects 50,000 residents, budget of $25M, timeline of 2 years"',
      required: true,
    },
    {
      label: 'Key Stakeholders',
      question: "Who are the primary stakeholders involved? This includes people, groups, or organizations that have an interest in or will be affected by the outcomes.",
      field: 'stakeholders',
      placeholder: 'e.g., "Local residents, city government, developers, environmental groups, business owners"',
      required: true,
    },
    {
      label: 'Objectives',
      question: "What are the main objectives or goals for this charette session? What do you hope to achieve through this collaborative process?",
      field: 'objectives',
      placeholder: 'e.g., "Develop consensus on priorities, identify feasible solutions, create implementation roadmap"',
      required: true,
    },
    {
      label: 'Constraints',
      question: "What are the key constraints or limitations we need to consider? This might include budget, time, legal requirements, or other factors.",
      field: 'constraints',
      placeholder: 'e.g., "Budget limit of $10M, must comply with zoning laws, timeline of 18 months"',
      required: false,
    },
    {
      label: 'Timeframe',
      question: "What is the timeframe for this initiative? When do decisions need to be made, and what are the key milestones?",
      field: 'timeframe',
      placeholder: 'e.g., "Decision by Q2 2025, implementation starting Q3 2025, completion by end of 2026"',
      required: false,
    },
    {
      label: 'Breakout Room Settings',
      question: "How long should participants spend in breakout rooms for focused discussions? This timer will automatically move all participants back to the main room when time expires.",
      field: 'breakoutRoomTime',
      type: 'select',
      options: [
        { value: 10, label: '10 minutes' },
        { value: 15, label: '15 minutes' },
        { value: 20, label: '20 minutes' },
        { value: 25, label: '25 minutes' },
        { value: 30, label: '30 minutes' },
        { value: 45, label: '45 minutes' },
        { value: 60, label: '60 minutes' },
      ],
      required: true,
    },
    {
      label: 'Desired Outcomes',
      question: "Finally, what are the specific outcomes or deliverables you want from this charette process?",
      field: 'desiredOutcomes',
      placeholder: 'e.g., "Prioritized action plan, detailed implementation strategy, stakeholder agreement document"',
      required: true,
    },
  ];

  const handleNext = () => {
    const currentStep = steps[activeStep];
    let isValid = false;

    if (currentStep.type === 'select') {
      // For select fields, use the responses state directly
      isValid = responses[currentStep.field] !== undefined && responses[currentStep.field] !== '';
    } else {
      // For text fields, check currentResponse
      isValid = currentResponse.trim() !== '';
    }

    if (isValid) {
      if (currentStep.type !== 'select') {
        setResponses(prev => ({
          ...prev,
          [steps[activeStep].field]: currentResponse.trim()
        }));
        setCurrentResponse('');
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    const prevStep = steps[activeStep - 1];
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

    if (prevStep.type === 'select') {
      // For select fields, no need to set currentResponse
      setCurrentResponse('');
    } else {
      // For text fields, restore the previous response
      setCurrentResponse(responses[prevStep.field] || '');
    }
  };

  const handleFinish = () => {
    const currentStep = steps[activeStep];
    let isValid = false;

    if (currentStep.type === 'select') {
      isValid = responses[currentStep.field] !== undefined && responses[currentStep.field] !== '';
    } else {
      isValid = currentResponse.trim() !== '';
    }

    if (isValid) {
      const finalResponses = { ...responses };

      if (currentStep.type !== 'select') {
        finalResponses[currentStep.field] = currentResponse.trim();
      }

      // Generate comprehensive description
      const description = generateDescription(finalResponses);

      onCreate({
        title: finalResponses.title,
        description: description,
        metadata: finalResponses,
        createdBy: 'Bill Riddick -Charette Facilitator',
      });

      handleClose();
    }
  };

  const handleClose = () => {
    setActiveStep(0);
    setResponses({
      title: '',
      description: '',
      scope: '',
      stakeholders: '',
      objectives: '',
      constraints: '',
      timeframe: '',
      desiredOutcomes: '',
      breakoutRoomTime: 15, // Default 15 minutes
    });
    setCurrentResponse('');
    onClose();
  };

  const handleSelectChange = (field, value) => {
    setResponses(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateDescription = (data) => {
    return `Charette Session: ${data.title}

Context: ${data.scope}
Stakeholders: ${data.stakeholders}
Objectives: ${data.objectives}
${data.constraints ? `Constraints: ${data.constraints}` : ''}
${data.timeframe ? `Timeframe: ${data.timeframe}` : ''}
Desired Outcomes: ${data.desiredOutcomes}

Facilitated with Charette Facilitator support for structured collaborative decision-making.`;
  };

  const currentStep = steps[activeStep];
  const progress = ((activeStep + 1) / steps.length) * 100;

  useEffect(() => {
    if (open) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [activeStep, open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: '600px',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <AnalystIcon />
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Bill Riddick -Charette Facilitator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Charette Session Setup Wizard
            </Typography>
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: 'rgba(0,0,0,0.1)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 4,
            }
          }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
          Step {activeStep + 1} of {steps.length}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pb: 2 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel
                StepIconComponent={() => (
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: index < activeStep ? 'success.main' : index === activeStep ? 'primary.main' : 'grey.300',
                      color: index <= activeStep ? 'white' : 'grey.600',
                    }}
                  >
                    {index < activeStep ? <CheckIcon fontSize="small" /> : index + 1}
                  </Avatar>
                )}
              >
                <Typography variant="caption" sx={{ mt: 1, display: { xs: 'none', sm: 'block' } }}>
                  {step.label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grow in={true} timeout={500}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              mb: 3,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
              <Avatar sx={{ bgcolor: 'secondary.main', mt: 0.5 }}>
                <QuestionIcon />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                  {currentStep.label}
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6, mb: 2 }}>
                  {currentStep.question}
                </Typography>
                {currentStep.required && (
                  <Chip
                    label="Required"
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                )}
              </Box>
            </Box>

            <Fade in={!isTyping} timeout={300}>
              {currentStep.type === 'select' ? (
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Breakout Room Discussion Time</InputLabel>
                  <Select
                    value={responses[currentStep.field] || ''}
                    onChange={(e) => handleSelectChange(currentStep.field, e.target.value)}
                    label="Breakout Room Discussion Time"
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {currentStep.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <TimerIcon fontSize="small" />
                          {option.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder={currentStep.placeholder}
                  value={currentResponse}
                  onChange={(e) => setCurrentResponse(e.target.value)}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }
                  }}
                />
              )}
            </Fade>

            {isTyping && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Bill is thinking...
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Box sx={{ width: 4, height: 4, bgcolor: 'secondary.main', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both' }} />
                  <Box sx={{ width: 4, height: 4, bgcolor: 'secondary.main', borderRadius: '50%', animation: 'bounce 1.4s -0.16s infinite ease-in-out both' }} />
                  <Box sx={{ width: 4, height: 4, bgcolor: 'secondary.main', borderRadius: '50%', animation: 'bounce 1.4s -0.32s infinite ease-in-out both' }} />
                </Box>
              </Box>
            )}
          </Paper>
        </Grow>

        {/* Progress Summary */}
        <Paper sx={{ p: 2, background: 'rgba(255, 255, 255, 0.7)' }}>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Session Summary (so far):
          </Typography>
          {Object.entries(responses).map(([key, value]) => {
            if (value && key !== 'description' && key !== 'breakoutRoomTime') {
              const stepInfo = steps.find(s => s.field === key);
              return (
                <Typography key={key} variant="body2" sx={{ mb: 0.5 }}>
                  <strong>{stepInfo?.label}:</strong> {value.length > 50 ? `${value.substring(0, 50)}...` : value}
                </Typography>
              );
            } else if (key === 'breakoutRoomTime' && value) {
              const stepInfo = steps.find(s => s.field === key);
              const timeOption = stepInfo?.options?.find(opt => opt.value === value);
              return (
                <Typography key={key} variant="body2" sx={{ mb: 0.5 }}>
                  <strong>{stepInfo?.label}:</strong> {timeOption?.label || `${value} minutes`}
                </Typography>
              );
            }
            return null;
          })}
        </Paper>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'space-between' }}>
        <Button
          onClick={handleClose}
          color="inherit"
        >
          Cancel
        </Button>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleFinish}
              disabled={(() => {
                const currentStep = steps[activeStep];
                if (currentStep.type === 'select') {
                  return responses[currentStep.field] === undefined || responses[currentStep.field] === '';
                } else {
                  return !currentResponse.trim();
                }
              })()}
              endIcon={<CheckIcon />}
              sx={{ px: 4 }}
            >
              Create Charette
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={(() => {
                const currentStep = steps[activeStep];
                if (currentStep.type === 'select') {
                  return responses[currentStep.field] === undefined || responses[currentStep.field] === '';
                } else {
                  return !currentResponse.trim();
                }
              })()}
              endIcon={<ArrowForwardIcon />}
            >
              Next
            </Button>
          )}
        </Box>
      </DialogActions>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </Dialog>
  );
};

export default CharetteWizard;
