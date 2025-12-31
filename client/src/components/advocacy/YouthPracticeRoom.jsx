import React, { useState } from 'react';
import { Users, Star, HelpCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const YouthPracticeRoom = ({ advocacyUser }) => {
  const [currentScenario, setCurrentScenario] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenarios = [
    {
      id: 'stand-up',
      title: '🛡️ Standing Up for a Friend',
      emoji: '🛡️',
      situation: 'You see some kids making fun of your friend because they wear glasses. Your friend looks sad.',
      choices: [
        {
          id: 'join',
          text: 'Join in the teasing so the other kids like me',
          feedback: 'This would hurt your friend even more. Real friends stand up for each other, even when it\'s hard.',
          isGood: false
        },
        {
          id: 'ignore',
          text: 'Walk away and pretend I didn\'t see it',
          feedback: 'Walking away doesn\'t help your friend. They need to know you care.',
          isGood: false
        },
        {
          id: 'speak-up',
          text: 'Say "That\'s not cool. Glasses are awesome!"',
          feedback: '⭐ Great choice! You stood up for your friend and showed the other kids that teasing isn\'t okay.',
          isGood: true
        },
        {
          id: 'comfort',
          text: 'Go to my friend and say "I think your glasses look great"',
          feedback: '⭐ Wonderful! You showed your friend you care and that you support them.',
          isGood: true
        }
      ]
    },
    {
      id: 'include',
      title: '🤝 Including Someone New',
      emoji: '🤝',
      situation: 'There\'s a new kid in class sitting alone at lunch. They look lonely.',
      choices: [
        {
          id: 'ignore-new',
          text: 'Stay with my usual friends and ignore the new kid',
          feedback: 'Everyone feels lonely sometimes. You could help them feel welcome!',
          isGood: false
        },
        {
          id: 'invite',
          text: 'Go over and say "Want to sit with us?"',
          feedback: '⭐ Amazing! You made someone feel welcome. That takes courage and kindness.',
          isGood: true
        },
        {
          id: 'smile',
          text: 'Smile and wave at them from my table',
          feedback: 'That\'s nice! Even better would be inviting them to join you.',
          isGood: true
        },
        {
          id: 'introduce',
          text: 'Bring my friends over and introduce everyone',
          feedback: '⭐ Excellent! You helped them make multiple friends at once. That\'s real leadership!',
          isGood: true
        }
      ]
    },
    {
      id: 'ask-help',
      title: '🆘 Asking for Help',
      emoji: '🆘',
      situation: 'You see a bigger kid pushing a younger student on the playground. You feel scared.',
      choices: [
        {
          id: 'fight',
          text: 'Try to fight the bigger kid',
          feedback: 'That could get you hurt. It\'s brave to ask an adult for help instead.',
          isGood: false
        },
        {
          id: 'ignore-bully',
          text: 'Look away and hope someone else helps',
          feedback: 'The younger student needs help. You can be the one to get an adult.',
          isGood: false
        },
        {
          id: 'get-adult',
          text: 'Run and get a teacher or playground monitor',
          feedback: '⭐ Perfect! Getting help from an adult is the smart and brave thing to do.',
          isGood: true
        },
        {
          id: 'yell-stop',
          text: 'Yell "Stop!" and tell them a teacher is coming',
          feedback: '⭐ Good thinking! Sometimes just knowing an adult will find out makes bullies stop.',
          isGood: true
        }
      ]
    },
    {
      id: 'share-feelings',
      title: '💭 Sharing Your Feelings',
      emoji: '💭',
      situation: 'Your best friend forgot about plans you made together. You feel hurt and left out.',
      choices: [
        {
          id: 'silent',
          text: 'Don\'t say anything and just feel sad',
          feedback: 'Your feelings matter! It\'s okay to tell your friend how you feel.',
          isGood: false
        },
        {
          id: 'mean',
          text: 'Say "You\'re a terrible friend!" and stop talking to them',
          feedback: 'That might hurt their feelings. Try telling them how YOU feel instead.',
          isGood: false
        },
        {
          id: 'express',
          text: 'Say "I felt sad when you forgot our plans"',
          feedback: '⭐ Excellent! You shared your feelings in a kind way. That\'s really mature.',
          isGood: true
        },
        {
          id: 'ask-why',
          text: 'Ask "What happened? Did you forget?"',
          feedback: '⭐ Good! You\'re giving them a chance to explain. Maybe something important came up.',
          isGood: true
        }
      ]
    },
    {
      id: 'peer-trouble',
      title: '🤔 When a Friend Needs Help',
      emoji: '🤔',
      situation: 'Your friend tells you they\'re being hurt at home and asks you not to tell anyone.',
      choices: [
        {
          id: 'keep-secret',
          text: 'Keep it a secret like they asked',
          feedback: 'Some secrets aren\'t safe to keep. When someone is being hurt, they need help from an adult.',
          isGood: false
        },
        {
          id: 'tell-everyone',
          text: 'Tell all my other friends about it',
          feedback: 'That wouldn\'t help and might make your friend feel worse. Tell a trusted adult instead.',
          isGood: false
        },
        {
          id: 'tell-adult',
          text: 'Tell a trusted adult like a teacher or counselor',
          feedback: '⭐ Perfect! This is the right thing to do. Your friend needs help from an adult who can protect them.',
          isGood: true
        },
        {
          id: 'explain-help',
          text: 'Say "I care about you. We need to tell an adult who can help"',
          feedback: '⭐ Wonderful! You\'re being a true friend by getting them the help they need.',
          isGood: true
        }
      ]
    }
  ];

  const handleChoiceSelect = (choice) => {
    setSelectedChoice(choice);
    setShowFeedback(true);
  };

  const handleNextScenario = () => {
    const currentIndex = scenarios.findIndex(s => s.id === currentScenario.id);
    if (currentIndex < scenarios.length - 1) {
      setCurrentScenario(scenarios[currentIndex + 1]);
    } else {
      setCurrentScenario(null);
    }
    setSelectedChoice(null);
    setShowFeedback(false);
  };

  const handleTryAgain = () => {
    setSelectedChoice(null);
    setShowFeedback(false);
  };

  if (!currentScenario) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-primary" />
              <span>Youth Practice Room</span>
            </CardTitle>
            <CardDescription>
              Practice being a good friend and helping others in kid-friendly scenarios
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {scenarios.map(scenario => (
            <Card 
              key={scenario.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setCurrentScenario(scenario)}
            >
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <span className="text-3xl">{scenario.emoji}</span>
                  <span>{scenario.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{scenario.situation}</p>
                <Button className="w-full">
                  Practice This
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Button variant="ghost" onClick={() => setCurrentScenario(null)} className="mb-4">
            ← Back to Scenarios
          </Button>
          <CardTitle className="text-2xl flex items-center space-x-2">
            <span className="text-4xl">{currentScenario.emoji}</span>
            <span>{currentScenario.title}</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What's Happening?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-lg leading-relaxed">{currentScenario.situation}</p>
          </div>
        </CardContent>
      </Card>

      {!showFeedback ? (
        <Card>
          <CardHeader>
            <CardTitle>What would you do?</CardTitle>
            <CardDescription>Choose the best response</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentScenario.choices.map((choice, idx) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceSelect(choice)}
                  className="w-full p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-muted text-left transition-all"
                >
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 pt-1">{choice.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {selectedChoice.isGood ? (
                  <>
                    <Star className="h-6 w-6 text-yellow-500" />
                    <span>Great Job!</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="h-6 w-6 text-blue-500" />
                    <span>Let's Think About This</span>
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg ${
                selectedChoice.isGood 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-blue-50 border border-blue-200'
              }`}>
                <p className="text-base leading-relaxed">{selectedChoice.feedback}</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-3">
            {!selectedChoice.isGood && (
              <Button variant="outline" onClick={handleTryAgain} className="flex-1">
                Try a Different Choice
              </Button>
            )}
            <Button onClick={handleNextScenario} className="flex-1">
              {scenarios.findIndex(s => s.id === currentScenario.id) < scenarios.length - 1 
                ? 'Next Scenario' 
                : 'Finish Practice'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default YouthPracticeRoom;
