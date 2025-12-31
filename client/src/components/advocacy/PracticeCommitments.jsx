import React, { useState } from 'react';
import { Target, Plus, CheckCircle, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import advocacyService from '../../services/advocacyService';

const PracticeCommitments = ({ advocacyUser, activeCommitments, onUpdate }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTrait, setSelectedTrait] = useState('');
  const [commitmentText, setCommitmentText] = useState('');
  const [reflectionText, setReflectionText] = useState('');
  const [reflectingOnId, setReflectingOnId] = useState(null);

  const traits = [
    { value: 'humility', label: 'Humility', behaviors: [
      'Schedule one listening conversation with no agenda',
      'Ask for feedback from one peer',
      'Acknowledge a mistake publicly and share what I learned'
    ]},
    { value: 'activeListening', label: 'Active Listening', behaviors: [
      'Practice listening without interrupting in 3 conversations',
      'Ask clarifying questions before responding',
      'Summarize what I heard before sharing my thoughts'
    ]},
    { value: 'empathy', label: 'Empathy', behaviors: [
      'Ask someone "How are you really doing?" and truly listen',
      'Try to understand a perspective I disagree with',
      'Respond with compassion to someone struggling'
    ]},
    { value: 'emotionalIntelligence', label: 'Emotional Intelligence', behaviors: [
      'Pause and name my emotions before responding',
      'Help someone work through a difficult emotion',
      'Practice staying calm in a stressful situation'
    ]},
    { value: 'bigPictureThinking', label: 'Big Picture Thinking', behaviors: [
      'Connect one individual need to a larger systemic issue',
      'Consider long-term impacts before making a decision',
      'Ask "How does this affect the whole community?"'
    ]},
    { value: 'opennessToFeedback', label: 'Openness to Feedback', behaviors: [
      'Ask three people for honest feedback',
      'Receive criticism without defending myself',
      'Make one change based on feedback received'
    ]},
    { value: 'balancingGoals', label: 'Balancing Goals', behaviors: [
      'Adjust a plan based on community input',
      'Prioritize community wellbeing over a personal goal',
      'Involve others in setting a goal'
    ]}
  ];

  const handleCreateCommitment = async () => {
    if (!selectedTrait || !commitmentText.trim()) return;

    try {
      const weekStarting = new Date();
      weekStarting.setHours(0, 0, 0, 0);
      
      await advocacyService.createCommitment({
        userId: advocacyUser.userId,
        trait: selectedTrait,
        commitment: commitmentText,
        weekStarting: weekStarting.toISOString()
      });
      
      setShowCreateForm(false);
      setSelectedTrait('');
      setCommitmentText('');
      onUpdate();
    } catch (error) {
      console.error('Error creating commitment:', error);
    }
  };

  const handleAddReflection = async (commitmentId) => {
    if (!reflectionText.trim()) return;

    try {
      const commitment = activeCommitments.find(c => c.id === commitmentId);
      const updatedReflections = [...(commitment.reflections || []), {
        date: new Date().toISOString(),
        text: reflectionText
      }];

      await advocacyService.updateCommitment(commitmentId, {
        reflections: updatedReflections
      });

      setReflectionText('');
      setReflectingOnId(null);
      onUpdate();
    } catch (error) {
      console.error('Error adding reflection:', error);
    }
  };

  const handleCompleteCommitment = async (commitmentId, impact) => {
    try {
      await advocacyService.updateCommitment(commitmentId, {
        completed: true,
        impact: impact
      });
      onUpdate();
    } catch (error) {
      console.error('Error completing commitment:', error);
    }
  };

  if (showCreateForm) {
    const selectedTraitData = traits.find(t => t.value === selectedTrait);

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Button variant="ghost" onClick={() => setShowCreateForm(false)} className="mb-4">
              ← Back
            </Button>
            <CardTitle>Create Practice Commitment</CardTitle>
            <CardDescription>
              Choose a trait to practice this week
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select a Trait</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {traits.map(trait => (
                <button
                  key={trait.value}
                  onClick={() => setSelectedTrait(trait.value)}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                    selectedTrait === trait.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 hover:bg-muted'
                  }`}
                >
                  {trait.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedTraitData && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Choose or Create Your Commitment</CardTitle>
              <CardDescription>
                What specific behavior will you practice this week?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold">Suggested behaviors:</p>
                {selectedTraitData.behaviors.map((behavior, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCommitmentText(behavior)}
                    className={`w-full p-3 rounded-lg border text-left text-sm transition-all ${
                      commitmentText === behavior
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50 hover:bg-muted'
                    }`}
                  >
                    {behavior}
                  </button>
                ))}
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Or write your own:</p>
                <textarea
                  value={commitmentText}
                  onChange={(e) => setCommitmentText(e.target.value)}
                  placeholder="Describe what you'll practice..."
                  className="w-full min-h-[80px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button
                onClick={handleCreateCommitment}
                disabled={!commitmentText.trim()}
                className="w-full"
              >
                Create Commitment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Practice Commitments</CardTitle>
              <CardDescription>
                Weekly behaviors to practice and reflect on
              </CardDescription>
            </div>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Commitment
            </Button>
          </div>
        </CardHeader>
      </Card>

      {activeCommitments.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Active Commitments</h3>
            <p className="text-muted-foreground mb-4">
              Create your first practice commitment to start growing as a servant leader
            </p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Commitment
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {activeCommitments.map(commitment => (
            <Card key={commitment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="capitalize">{commitment.trait}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        Week of {new Date(commitment.weekStarting).toLocaleDateString()}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{commitment.commitment}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {commitment.reflections && commitment.reflections.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Reflections</h4>
                    <div className="space-y-2">
                      {commitment.reflections.map((reflection, idx) => (
                        <div key={idx} className="p-3 bg-muted rounded-lg">
                          <p className="text-sm mb-1">{reflection.text}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(reflection.date).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {reflectingOnId === commitment.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={reflectionText}
                      onChange={(e) => setReflectionText(e.target.value)}
                      placeholder="What did you try? What changed?"
                      className="w-full min-h-[80px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleAddReflection(commitment.id)}
                        disabled={!reflectionText.trim()}
                      >
                        Save Reflection
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setReflectingOnId(null);
                          setReflectionText('');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setReflectingOnId(commitment.id)}
                    >
                      Add Reflection
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        const impact = prompt('What impact did this practice have?');
                        if (impact) {
                          handleCompleteCommitment(commitment.id, impact);
                        }
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Complete
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PracticeCommitments;
