import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import LeadershipAssessment from './LeadershipAssessment';
import PracticeCommitments from './PracticeCommitments';
import TeamTrainings from './TeamTrainings';
import advocacyService from '../../services/advocacyService';

const ServantLeadership = ({ advocacyUser }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [latestAssessment, setLatestAssessment] = useState(null);
  const [activeCommitments, setActiveCommitments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeadershipData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advocacyUser]);

  const loadLeadershipData = async () => {
    try {
      const assessment = await advocacyService.getLatestAssessment(advocacyUser.userId);
      const commitments = await advocacyService.getActiveCommitments(advocacyUser.userId);
      setLatestAssessment(assessment);
      setActiveCommitments(commitments);
    } catch (error) {
      console.error('Error loading leadership data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Servant Leadership Development</CardTitle>
          <CardDescription>
            Develop leadership skills rooted in humility, empathy, and service to others
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assessment">Self-Assessment</TabsTrigger>
          <TabsTrigger value="commitments">Practice Commitments</TabsTrigger>
          <TabsTrigger value="trainings">Team Trainings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab 
            latestAssessment={latestAssessment}
            activeCommitments={activeCommitments}
            onNavigate={setActiveTab}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="assessment">
          <LeadershipAssessment 
            advocacyUser={advocacyUser}
            onComplete={loadLeadershipData}
          />
        </TabsContent>

        <TabsContent value="commitments">
          <PracticeCommitments 
            advocacyUser={advocacyUser}
            activeCommitments={activeCommitments}
            onUpdate={loadLeadershipData}
          />
        </TabsContent>

        <TabsContent value="trainings">
          <TeamTrainings advocacyUser={advocacyUser} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const OverviewTab = ({ latestAssessment, activeCommitments, onNavigate, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading leadership data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('assessment')}>
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="h-8 w-8 text-primary" />
              <CardTitle>Self-Assessment</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Evaluate your servant leadership traits and identify growth areas
            </p>
            <Button className="w-full">
              {latestAssessment ? 'Retake Assessment' : 'Start Assessment'}
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('commitments')}>
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <Target className="h-8 w-8 text-primary" />
              <CardTitle>Practice Commitments</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Weekly behaviors to practice and reflect on your growth
            </p>
            <Button className="w-full">
              {activeCommitments.length > 0 ? 'View Commitments' : 'Create Commitment'}
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('trainings')}>
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="h-8 w-8 text-primary" />
              <CardTitle>Team Trainings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Structured lessons for groups with discussion prompts
            </p>
            <Button className="w-full">
              Browse Trainings
            </Button>
          </CardContent>
        </Card>
      </div>

      {latestAssessment && (
        <Card>
          <CardHeader>
            <CardTitle>Your Latest Assessment</CardTitle>
            <CardDescription>
              Completed {new Date(latestAssessment.assessmentDate).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Trait Scores</h4>
                <div className="space-y-2">
                  {Object.entries(latestAssessment.scores).map(([trait, score]) => (
                    <div key={trait} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{trait.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${(score / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold w-8">{score}/5</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {latestAssessment.strengths && latestAssessment.strengths.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Your Strengths</h4>
                  <div className="flex flex-wrap gap-2">
                    {latestAssessment.strengths.map(strength => (
                      <span key={strength} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {latestAssessment.growthAreas && latestAssessment.growthAreas.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Growth Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {latestAssessment.growthAreas.map(area => (
                      <span key={area} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {activeCommitments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active Practice Commitments</CardTitle>
            <CardDescription>
              {activeCommitments.length} commitment{activeCommitments.length !== 1 ? 's' : ''} in progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeCommitments.map(commitment => (
                <div key={commitment.id} className="p-3 bg-muted rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-semibold capitalize">{commitment.trait}</span>
                    <span className="text-sm text-muted-foreground">
                      Week of {new Date(commitment.weekStarting).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{commitment.commitment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServantLeadership;
