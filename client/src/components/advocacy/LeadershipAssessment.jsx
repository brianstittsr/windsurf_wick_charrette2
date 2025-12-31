import React, { useState } from 'react';
import { Award, TrendingUp, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import advocacyService from '../../services/advocacyService';

const LeadershipAssessment = ({ advocacyUser, onComplete }) => {
  const [currentTrait, setCurrentTrait] = useState(0);
  const [scores, setScores] = useState({});
  const [showResults, setShowResults] = useState(false);

  const traits = [
    {
      id: 'humility',
      name: 'Humility',
      description: 'Recognizing that leadership is about serving others, not personal glory',
      questions: [
        'I actively seek input from others before making decisions',
        'I acknowledge my mistakes and learn from them',
        'I give credit to others for their contributions'
      ]
    },
    {
      id: 'activeListening',
      name: 'Active Listening',
      description: 'Truly hearing and understanding others without judgment',
      questions: [
        'I listen to understand, not just to respond',
        'I ask clarifying questions to ensure I understand',
        'I make others feel heard and valued'
      ]
    },
    {
      id: 'empathy',
      name: 'Empathy',
      description: 'Understanding and sharing the feelings of others',
      questions: [
        'I try to see situations from others\' perspectives',
        'I respond with compassion when others are struggling',
        'I recognize the emotions behind people\'s words'
      ]
    },
    {
      id: 'emotionalIntelligence',
      name: 'Emotional Intelligence',
      description: 'Managing your own emotions and understanding others\' emotions',
      questions: [
        'I stay calm under pressure',
        'I recognize how my emotions affect my decisions',
        'I help others work through difficult emotions'
      ]
    },
    {
      id: 'bigPictureThinking',
      name: 'Big Picture Thinking',
      description: 'Seeing beyond immediate problems to long-term community needs',
      questions: [
        'I consider long-term impacts of decisions',
        'I connect individual needs to systemic issues',
        'I think about how actions affect the whole community'
      ]
    },
    {
      id: 'opennessToFeedback',
      name: 'Openness to Feedback',
      description: 'Welcoming constructive criticism and using it to grow',
      questions: [
        'I actively ask for feedback on my leadership',
        'I receive criticism without becoming defensive',
        'I make changes based on feedback I receive'
      ]
    },
    {
      id: 'balancingGoals',
      name: 'Balancing Goals with Community Needs',
      description: 'Pursuing objectives while staying responsive to what the community needs',
      questions: [
        'I adjust plans when community needs change',
        'I prioritize community wellbeing over personal goals',
        'I involve the community in setting goals'
      ]
    }
  ];

  const currentTraitData = traits[currentTrait];

  const handleScoreSelect = (score) => {
    const newScores = { ...scores, [currentTraitData.id]: score };
    setScores(newScores);

    if (currentTrait < traits.length - 1) {
      setCurrentTrait(currentTrait + 1);
    } else {
      calculateResults(newScores);
    }
  };

  const calculateResults = async (finalScores) => {
    const strengths = [];
    const growthAreas = [];

    Object.entries(finalScores).forEach(([trait, score]) => {
      const traitData = traits.find(t => t.id === trait);
      if (score >= 4) {
        strengths.push(traitData.name);
      } else if (score <= 2) {
        growthAreas.push(traitData.name);
      }
    });

    try {
      await advocacyService.saveAssessment({
        userId: advocacyUser.userId,
        scores: finalScores,
        strengths,
        growthAreas
      });
      setShowResults(true);
      if (onComplete) onComplete();
    } catch (error) {
      console.error('Error saving assessment:', error);
    }
  };

  const handleBack = () => {
    if (currentTrait > 0) {
      setCurrentTrait(currentTrait - 1);
    }
  };

  if (showResults) {
    const strengths = Object.entries(scores)
      .filter(([_, score]) => score >= 4)
      .map(([trait, _]) => traits.find(t => t.id === trait).name);
    
    const growthAreas = Object.entries(scores)
      .filter(([_, score]) => score <= 2)
      .map(([trait, _]) => traits.find(t => t.id === trait).name);

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span>Assessment Complete!</span>
            </CardTitle>
            <CardDescription>Here's your servant leadership profile</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {traits.map(trait => {
                const score = scores[trait.id] || 0;
                return (
                  <div key={trait.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{trait.name}</span>
                      <span className="text-sm font-semibold">{score}/5</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          score >= 4 ? 'bg-green-600' : score >= 3 ? 'bg-blue-600' : 'bg-yellow-600'
                        }`}
                        style={{ width: `${(score / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {strengths.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Your Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {strengths.map(strength => (
                  <span key={strength} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {strength}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {growthAreas.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-700">Growth Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {growthAreas.map(area => (
                  <span key={area} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {area}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Button onClick={() => window.location.reload()} className="w-full">
          Return to Leadership Hub
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline">
              Question {currentTrait + 1} of {traits.length}
            </Badge>
            <div className="flex space-x-1">
              {traits.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 w-8 rounded-full transition-colors ${
                    idx < currentTrait ? 'bg-green-600' :
                    idx === currentTrait ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
          <CardTitle className="text-2xl">{currentTraitData.name}</CardTitle>
          <CardDescription>{currentTraitData.description}</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rate Yourself</CardTitle>
          <CardDescription>Consider these statements about your leadership</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-6">
            {currentTraitData.questions.map((question, idx) => (
              <div key={idx} className="p-3 bg-muted rounded-lg">
                <p className="text-sm">{question}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-center mb-4">
              How well do these statements describe you?
            </p>
            {[
              { score: 5, label: 'Very True', color: 'bg-green-600 hover:bg-green-700' },
              { score: 4, label: 'Mostly True', color: 'bg-blue-600 hover:bg-blue-700' },
              { score: 3, label: 'Sometimes True', color: 'bg-yellow-600 hover:bg-yellow-700' },
              { score: 2, label: 'Rarely True', color: 'bg-orange-600 hover:bg-orange-700' },
              { score: 1, label: 'Not True', color: 'bg-red-600 hover:bg-red-700' }
            ].map(option => (
              <button
                key={option.score}
                onClick={() => handleScoreSelect(option.score)}
                className={`w-full p-4 rounded-lg text-white font-medium transition-all ${option.color}`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {currentTrait > 0 && (
            <Button variant="outline" onClick={handleBack} className="w-full mt-4">
              Back
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadershipAssessment;
