import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
  Paper,
  Chip,
  Alert
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const CharetteWizardStepper = ({ currentPhase, phases, onPhaseChange, userRole }) => {
  const [activeStep, setActiveStep] = useState(currentPhase);

  const handleNext = () => {
    if (activeStep < phases.length - 1) {
      onPhaseChange('next');
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      onPhaseChange('previous');
      setActiveStep(activeStep - 1);
    }
  };

  const getPhaseInstructions = (phaseIndex) => {
    const instructions = {
      0: {
        title: 'Introduction Phase',
        description: 'Welcome participants and set the stage for the charette session.',
        tasks: [
          'Review session objectives and scope',
          'Introduce all participants and their roles',
          'Establish ground rules for discussion',
          'Upload relevant documents and materials'
        ],
        facilitatorNotes: 'Ensure everyone understands the purpose and process.'
      },
      1: {
        title: 'Data Collection Phase',
        description: 'Gather information, perspectives, and initial thoughts.',
        tasks: [
          'Participants share their expertise and perspectives',
          'Document key issues and challenges',
          'Identify stakeholder concerns',
          'Collect relevant data and evidence'
        ],
        facilitatorNotes: 'Encourage open sharing without judgment.'
      },
      2: {
        title: 'Analysis Phase',
        description: 'Deep dive into constraints, assumptions, and patterns.',
        tasks: [
          'AI analyzes messages for intent and assumptions',
          'Identify constraints and limitations',
          'Challenge underlying assumptions',
          'Explore root causes of identified issues'
        ],
        facilitatorNotes: 'Use AI insights to guide deeper questioning.'
      },
      3: {
        title: 'Ideation Phase',
        description: 'Generate creative solutions and alternatives.',
        tasks: [
          'Create breakout rooms for focused discussions',
          'Brainstorm potential solutions',
          'Explore alternative approaches',
          'Build on each other\'s ideas'
        ],
        facilitatorNotes: 'Encourage divergent thinking and creativity.'
      },
      4: {
        title: 'Synthesis Phase',
        description: 'Combine findings and converge on recommendations.',
        tasks: [
          'Review breakout room outputs',
          'Identify common themes and patterns',
          'Prioritize solutions and recommendations',
          'Build consensus on next steps'
        ],
        facilitatorNotes: 'Focus on convergence and actionable outcomes.'
      },
      5: {
        title: 'Reporting Phase',
        description: 'Document findings and create final deliverables.',
        tasks: [
          'Generate comprehensive report',
          'Review key findings and recommendations',
          'Assign action items and responsibilities',
          'Schedule follow-up sessions'
        ],
        facilitatorNotes: 'Ensure clear documentation and next steps.'
      }
    };

    return instructions[phaseIndex] || instructions[0];
  };

  React.useEffect(() => {
    setActiveStep(currentPhase);
  }, [currentPhase]);

  return (
    <Paper elevation={2} sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Charette Process Guide
      </Typography>

      <Stepper activeStep={activeStep} orientation="vertical">
        {phases.map((phase, index) => {
          const phaseInfo = getPhaseInstructions(index);
          const isCompleted = index < currentPhase;
          const isCurrent = index === currentPhase;

          return (
            <Step key={phase.id} completed={isCompleted}>
              <StepLabel
                StepIconComponent={() => (
                  isCompleted ? (
                    <CheckCircleIcon color="success" />
                  ) : isCurrent ? (
                    <RadioButtonUncheckedIcon color="primary" />
                  ) : (
                    <RadioButtonUncheckedIcon color="disabled" />
                  )
                )}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6">{phase.name}</Typography>
                  {isCurrent && (
                    <Chip label="Current" color="primary" size="small" />
                  )}
                  {isCompleted && (
                    <Chip label="Completed" color="success" size="small" />
                  )}
                </Box>
              </StepLabel>
              <StepContent>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {phaseInfo.description}
                </Typography>

                {isCurrent && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                      Key Tasks:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                      {phaseInfo.tasks.map((task, idx) => (
                        <Typography component="li" variant="body2" key={idx} sx={{ mb: 0.5 }}>
                          {task}
                        </Typography>
                      ))}
                    </Box>

                    {userRole === 'analyst' && (
                      <Alert severity="info" sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Facilitator Notes:
                        </Typography>
                        <Typography variant="body2">
                          {phaseInfo.facilitatorNotes}
                        </Typography>
                      </Alert>
                    )}
                  </Box>
                )}

                {isCurrent && userRole === 'analyst' && (
                  <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleBack}
                      disabled={activeStep === 0}
                    >
                      Previous Phase
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleNext}
                      disabled={activeStep === phases.length - 1}
                    >
                      {activeStep === phases.length - 1 ? 'Finish' : 'Next Phase'}
                    </Button>
                  </Box>
                )}
              </StepContent>
            </Step>
          );
        })}
      </Stepper>

      {currentPhase === phases.length - 1 && (
        <Box sx={{ mt: 3 }}>
          <Alert severity="success">
            <Typography variant="subtitle2" gutterBottom>
              Charette Complete!
            </Typography>
            <Typography variant="body2">
              All phases have been completed. Generate the final report to document findings and recommendations.
            </Typography>
          </Alert>
        </Box>
      )}
    </Paper>
  );
};

export default CharetteWizardStepper;
