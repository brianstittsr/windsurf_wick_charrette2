import React, { useState } from 'react';
import { Heart, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const AccountabilityCoach = ({ advocacyUser }) => {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [draftMessage, setDraftMessage] = useState('');
  const [feedback, setFeedback] = useState(null);

  const scenarios = [
    {
      id: 'missed-commitment',
      title: 'Missed Commitment',
      situation: 'Your friend agreed to help with a community project but didn\'t show up and didn\'t call. This is the second time this has happened.',
      harmfulPhrases: ['you always', 'you never', 'irresponsible', 'can\'t count on you', 'disappointed in you'],
      gentleHonestyPhrases: ['I noticed', 'I\'m wondering', 'I care about', 'I believe in', 'help me understand'],
      beliefInCapacity: ['I know you care', 'I\'ve seen you follow through before', 'I believe you can', 'you\'re capable']
    },
    {
      id: 'harmful-behavior',
      title: 'Harmful Behavior',
      situation: 'A peer made a hurtful comment about someone\'s appearance. Others laughed, but you could see it hurt the person.',
      harmfulPhrases: ['you\'re mean', 'that was stupid', 'you should be ashamed', 'what\'s wrong with you'],
      gentleHonestyPhrases: ['that comment hurt', 'I saw the impact', 'I care about both of you', 'help me understand what you meant'],
      beliefInCapacity: ['I know you\'re better than that', 'I\'ve seen you be kind', 'you can make this right', 'I believe in your ability to grow']
    },
    {
      id: 'breaking-trust',
      title: 'Breaking Trust',
      situation: 'Someone shared something you told them in confidence. You feel betrayed and hurt.',
      harmfulPhrases: ['I can\'t trust you', 'you\'re a terrible friend', 'you betrayed me', 'I hate you'],
      gentleHonestyPhrases: ['I\'m hurt that', 'I trusted you with', 'I need to understand', 'this affected me'],
      beliefInCapacity: ['I want to repair this', 'I believe we can work through this', 'our friendship matters', 'I know you didn\'t mean to hurt me']
    },
    {
      id: 'group-exclusion',
      title: 'Group Exclusion',
      situation: 'You notice your friend group is consistently leaving someone out of plans and conversations.',
      harmfulPhrases: ['you\'re being cliquey', 'you\'re mean girls/guys', 'you should feel bad', 'that\'s bullying'],
      gentleHonestyPhrases: ['I\'ve noticed', 'I\'m concerned about', 'how would we feel if', 'I wonder if we realize'],
      beliefInCapacity: ['we can do better', 'I know we care about inclusion', 'we have the power to change this', 'I believe in us']
    }
  ];

  const analyzeMessage = (message) => {
    const lowerMessage = message.toLowerCase();
    const scenario = scenarios.find(s => s.id === selectedScenario);
    
    const hasHarmfulPhrases = scenario.harmfulPhrases.some(phrase => 
      lowerMessage.includes(phrase.toLowerCase())
    );
    
    const hasGentleHonesty = scenario.gentleHonestyPhrases.some(phrase => 
      lowerMessage.includes(phrase.toLowerCase())
    );
    
    const hasBeliefInCapacity = scenario.beliefInCapacity.some(phrase => 
      lowerMessage.includes(phrase.toLowerCase())
    );

    let score = 0;
    let strengths = [];
    let improvements = [];

    if (hasGentleHonesty) {
      score += 50;
      strengths.push('Uses gentle, honest language');
    } else {
      improvements.push('Try starting with "I noticed..." or "I\'m wondering..." to be less accusatory');
    }

    if (hasBeliefInCapacity) {
      score += 50;
      strengths.push('Expresses belief in their capacity to do better');
    } else {
      improvements.push('Add a statement that shows you believe they can grow or change');
    }

    if (hasHarmfulPhrases) {
      score -= 30;
      improvements.push('Avoid shaming language like "you always" or "you never"');
    }

    if (message.length < 20) {
      improvements.push('Your message could be more specific about the behavior and its impact');
    }

    return {
      score: Math.max(0, Math.min(100, score)),
      strengths,
      improvements,
      isGood: score >= 70
    };
  };

  const handleAnalyze = () => {
    const analysis = analyzeMessage(draftMessage);
    setFeedback(analysis);
  };

  const handleReset = () => {
    setDraftMessage('');
    setFeedback(null);
  };

  const handleNewScenario = () => {
    setSelectedScenario(null);
    setDraftMessage('');
    setFeedback(null);
  };

  if (!selectedScenario) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary" />
              <span>Accountability with Kindness Coach</span>
            </CardTitle>
            <CardDescription>
              Practice holding peers accountable while showing compassion and belief in their capacity
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-6">
          {scenarios.map(scenario => (
            <Card key={scenario.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedScenario(scenario.id)}>
              <CardHeader>
                <CardTitle className="text-lg">{scenario.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{scenario.situation}</p>
                <Button className="w-full">
                  Practice This Scenario
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const scenario = scenarios.find(s => s.id === selectedScenario);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Button variant="ghost" onClick={handleNewScenario} className="mb-4">
            ← Back to Scenarios
          </Button>
          <CardTitle>{scenario.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-base">{scenario.situation}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Draft Your Accountability Message</CardTitle>
          <CardDescription>
            Write a message that holds them accountable while showing kindness and belief in their capacity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            value={draftMessage}
            onChange={(e) => setDraftMessage(e.target.value)}
            placeholder="Write your message here..."
            className="w-full min-h-[150px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
          
          <div className="flex space-x-3">
            <Button
              onClick={handleAnalyze}
              disabled={!draftMessage.trim()}
              className="flex-1"
            >
              Get Feedback
            </Button>
            {feedback && (
              <Button variant="outline" onClick={handleReset}>
                Try Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {feedback && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {feedback.isGood ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              )}
              <span>Feedback on Your Message</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <span className="font-semibold">Accountability Score</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-background rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      feedback.score >= 70 ? 'bg-green-600' : 'bg-yellow-600'
                    }`}
                    style={{ width: `${feedback.score}%` }}
                  />
                </div>
                <span className="font-bold">{feedback.score}%</span>
              </div>
            </div>

            {feedback.strengths.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center space-x-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  <span>Strengths</span>
                </h4>
                <ul className="space-y-2">
                  {feedback.strengths.map((strength, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {feedback.improvements.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center space-x-2 text-blue-700">
                  <Lightbulb className="h-5 w-5" />
                  <span>Suggestions for Improvement</span>
                </h4>
                <ul className="space-y-2">
                  {feedback.improvements.map((improvement, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold mb-2">Key Principles</h4>
              <ul className="text-sm space-y-1">
                <li>• Use "I" statements to express your feelings and observations</li>
                <li>• Avoid "you always" or "you never" - they trigger defensiveness</li>
                <li>• Name the specific behavior, not the person's character</li>
                <li>• Express belief in their capacity to do better</li>
                <li>• Invite conversation rather than lecturing</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AccountabilityCoach;
