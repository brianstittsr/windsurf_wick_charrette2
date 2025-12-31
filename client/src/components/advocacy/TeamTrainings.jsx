import React, { useState } from 'react';
import { Users, Calendar, BookOpen, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const TeamTrainings = ({ advocacyUser }) => {
  const [selectedTraining, setSelectedTraining] = useState(null);

  const trainings = [
    {
      id: 'intro-servant-leadership',
      title: 'Introduction to Servant Leadership',
      duration: '45 minutes',
      participants: '5-15 people',
      description: 'Learn the foundations of servant leadership and how it differs from traditional leadership models',
      objectives: [
        'Understand the core principles of servant leadership',
        'Identify servant leadership traits in action',
        'Discuss how to apply servant leadership in your context'
      ],
      activities: [
        {
          title: 'Opening Discussion',
          duration: '10 min',
          prompt: 'What does leadership mean to you? Share an example of a leader who inspired you.'
        },
        {
          title: 'Core Concepts',
          duration: '15 min',
          prompt: 'Review the seven traits of servant leadership. Which traits do you see in your community?'
        },
        {
          title: 'Real-World Scenarios',
          duration: '15 min',
          prompt: 'How would a servant leader respond to: A community member asking for help? A policy that creates barriers? A conflict between team members?'
        },
        {
          title: 'Personal Reflection',
          duration: '5 min',
          prompt: 'Which servant leadership trait do you want to develop? What\'s one action you can take this week?'
        }
      ]
    },
    {
      id: 'navigating-constraints',
      title: 'Navigating Governmental Constraints with Grace',
      duration: '60 minutes',
      participants: '5-20 people',
      description: 'Learn how to stay servant-hearted when facing policy barriers and institutional limits',
      objectives: [
        'Understand the difference between individual, peer, and policy-level actions',
        'Practice responding to denials with dignity',
        'Develop advocacy strategies within constraints'
      ],
      activities: [
        {
          title: 'Constraint Mapping',
          duration: '15 min',
          prompt: 'What rules or policies create barriers in your work? List them and identify which level of change is needed.'
        },
        {
          title: 'Role Play: Denied Requests',
          duration: '20 min',
          prompt: 'Practice responding when a request is denied. How do you stay compassionate while advocating for change?'
        },
        {
          title: 'Strategy Session',
          duration: '20 min',
          prompt: 'Choose one constraint. What can we do individually? As peers? What requires policy change?'
        },
        {
          title: 'Commitment Circle',
          duration: '5 min',
          prompt: 'Share one action you\'ll take to address a constraint while staying servant-hearted.'
        }
      ]
    },
    {
      id: 'peer-support-skills',
      title: 'Building Peer Support Skills',
      duration: '45 minutes',
      participants: '6-12 people',
      description: 'Practice affirmation, accountability with kindness, and positive peer support',
      objectives: [
        'Learn to give affirmations that recognize strengths',
        'Practice accountability without shaming',
        'Build peer support scripts for common situations'
      ],
      activities: [
        {
          title: 'Affirmation Practice',
          duration: '15 min',
          prompt: 'Partner up. Share a challenge you\'re facing. Partner responds with an affirmation that recognizes your strength.'
        },
        {
          title: 'Accountability with Kindness',
          duration: '20 min',
          prompt: 'Review scenarios where peers need accountability. Practice giving feedback that holds people responsible while believing in their capacity.'
        },
        {
          title: 'Script Building',
          duration: '10 min',
          prompt: 'Create peer support scripts for situations you commonly face. Share and refine together.'
        }
      ]
    },
    {
      id: 'active-advocacy',
      title: 'From Observation to Active Advocacy',
      duration: '60 minutes',
      participants: '8-20 people',
      description: 'Move from noticing problems to taking action for systemic change',
      objectives: [
        'Distinguish between passive observation and active advocacy',
        'Learn to create advocacy briefs',
        'Practice speaking up in different contexts'
      ],
      activities: [
        {
          title: 'Story Sharing',
          duration: '15 min',
          prompt: 'Share a time you noticed something unfair. What did you do? What do you wish you had done?'
        },
        {
          title: 'Advocacy Brief Workshop',
          duration: '25 min',
          prompt: 'Choose a community need. Work in small groups to create an advocacy brief: Issue, Impact, Relevant Policy, Requested Change.'
        },
        {
          title: 'Practice Speaking Up',
          duration: '15 min',
          prompt: 'Role play presenting your advocacy brief to: A school board, A city council, An agency director. Practice staying clear and respectful.'
        },
        {
          title: 'Action Planning',
          duration: '5 min',
          prompt: 'What\'s one advocacy action you\'ll take this month?'
        }
      ]
    }
  ];

  if (selectedTraining) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Button variant="ghost" onClick={() => setSelectedTraining(null)} className="mb-4">
              ← Back to Trainings
            </Button>
            <div className="flex items-center space-x-2 mb-2">
              <Badge>{selectedTraining.duration}</Badge>
              <Badge variant="outline">{selectedTraining.participants}</Badge>
            </div>
            <CardTitle className="text-2xl">{selectedTraining.title}</CardTitle>
            <CardDescription>{selectedTraining.description}</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Learning Objectives</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {selectedTraining.objectives.map((objective, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-primary font-bold">•</span>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Training Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedTraining.activities.map((activity, idx) => (
                <div key={idx} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{activity.title}</h4>
                    <Badge variant="outline">{activity.duration}</Badge>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-1">Discussion Prompt:</p>
                    <p className="text-sm">{activity.prompt}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Facilitation Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold">•</span>
                <span>Create a safe space where all voices are heard and respected</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold">•</span>
                <span>Encourage participants to share real experiences, not hypotheticals</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold">•</span>
                <span>Connect discussions back to servant leadership principles</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold">•</span>
                <span>End with concrete commitments, not just good intentions</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold">•</span>
                <span>Follow up after the training to support continued growth</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Training Modules</CardTitle>
          <CardDescription>
            Structured lessons for groups with discussion prompts and activities
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {trainings.map(training => (
          <Card key={training.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{training.title}</CardTitle>
                  <CardDescription>{training.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{training.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{training.participants}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{training.activities.length} activities</span>
                  </div>
                </div>

                <Button
                  onClick={() => setSelectedTraining(training)}
                  className="w-full"
                >
                  View Training Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamTrainings;
