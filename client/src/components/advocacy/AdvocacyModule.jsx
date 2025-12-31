import React, { useState, useEffect } from 'react';
import { Heart, BookOpen, Users, Map, Award, Library, MessageCircle, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import OnboardingQuiz from './OnboardingQuiz';
import LearningJourneys from './LearningJourneys';
import ScenarioEngine from './ScenarioEngine';
import PeerSupportTools from './PeerSupportTools';
import CommunityNeeds from './CommunityNeeds';
import ServantLeadership from './ServantLeadership';
import ResourceNavigator from './ResourceNavigator';
import FeedbackHub from './FeedbackHub';
import advocacyService from '../../services/advocacyService';

const AdvocacyModule = ({ user }) => {
  const [advocacyUser, setAdvocacyUser] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdvocacyUser();
  }, [user]);

  const loadAdvocacyUser = async () => {
    if (!user) return;
    
    try {
      // Check if we're in demo mode
      const isDemoMode = process.env.REACT_APP_DEMO_MODE === 'true' || user.uid === 'demo-user-id';
      
      if (isDemoMode) {
        // Create a demo advocacy user profile
        setAdvocacyUser({
          userId: user.uid,
          role: 'Community Organizer',
          ageGroup: 'adult',
          primaryConcerns: ['Housing', 'Education', 'Healthcare'],
          currentLevel: 2,
          completedPaths: ['intro-peer-support'],
          affirmations: [],
          practiceCommitments: [],
          createdAt: new Date()
        });
        setLoading(false);
        return;
      }
      
      const profile = await advocacyService.getAdvocacyUser(user.uid);
      
      if (!profile) {
        setShowOnboarding(true);
      } else {
        setAdvocacyUser(profile);
      }
    } catch (error) {
      console.error('Error loading advocacy user:', error);
      // In case of error, show onboarding
      setShowOnboarding(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardingComplete = async (profileData) => {
    try {
      // Check if we're in demo mode
      const isDemoMode = process.env.REACT_APP_DEMO_MODE === 'true' || user.uid === 'demo-user-id';
      
      if (isDemoMode) {
        // Create demo profile without Firebase
        const newProfile = {
          userId: user.uid,
          ...profileData,
          currentLevel: 1,
          completedPaths: [],
          affirmations: [],
          practiceCommitments: [],
          createdAt: new Date()
        };
        setAdvocacyUser(newProfile);
        setShowOnboarding(false);
        return;
      }
      
      const newProfile = await advocacyService.createAdvocacyUser({
        userId: user.uid,
        ...profileData
      });
      setAdvocacyUser(newProfile);
      setShowOnboarding(false);
    } catch (error) {
      console.error('Error creating advocacy profile:', error);
      // Fallback to demo profile on error
      const fallbackProfile = {
        userId: user.uid,
        ...profileData,
        currentLevel: 1,
        completedPaths: [],
        affirmations: [],
        practiceCommitments: [],
        createdAt: new Date()
      };
      setAdvocacyUser(fallbackProfile);
      setShowOnboarding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Advocacy Module...</p>
        </div>
      </div>
    );
  }

  if (showOnboarding) {
    return <OnboardingQuiz onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Servant Advocacy & Peer Support</h1>
          </div>
          <p className="text-muted-foreground">
            Learn, practice, and advocate for positive change in your community
          </p>
        </div>

        {/* User Progress Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Journey</CardTitle>
            <CardDescription>
              Level {advocacyUser?.currentLevel || 1} • {advocacyUser?.role || 'Community Member'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {advocacyUser?.completedPaths?.length || 0}
                </div>
                <div className="text-sm text-muted-foreground">Paths Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {advocacyUser?.affirmations?.length || 0}
                </div>
                <div className="text-sm text-muted-foreground">Affirmations Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {advocacyUser?.practiceCommitments?.filter(c => c.completed).length || 0}
                </div>
                <div className="text-sm text-muted-foreground">Commitments Kept</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {advocacyUser?.primaryConcerns?.length || 0}
                </div>
                <div className="text-sm text-muted-foreground">Focus Areas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Learn</span>
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Scenarios</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Practice</span>
            </TabsTrigger>
            <TabsTrigger value="needs" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Needs</span>
            </TabsTrigger>
            <TabsTrigger value="leadership" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Leadership</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Library className="h-4 w-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Feedback</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab advocacyUser={advocacyUser} onNavigate={setActiveTab} />
          </TabsContent>

          <TabsContent value="learning">
            <LearningJourneys advocacyUser={advocacyUser} />
          </TabsContent>

          <TabsContent value="scenarios">
            <ScenarioEngine advocacyUser={advocacyUser} />
          </TabsContent>

          <TabsContent value="practice">
            <PeerSupportTools advocacyUser={advocacyUser} />
          </TabsContent>

          <TabsContent value="needs">
            <CommunityNeeds advocacyUser={advocacyUser} />
          </TabsContent>

          <TabsContent value="leadership">
            <ServantLeadership advocacyUser={advocacyUser} />
          </TabsContent>

          <TabsContent value="resources">
            <ResourceNavigator advocacyUser={advocacyUser} />
          </TabsContent>

          <TabsContent value="feedback">
            <FeedbackHub advocacyUser={advocacyUser} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const OverviewTab = ({ advocacyUser, onNavigate }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Servant Advocacy</CardTitle>
          <CardDescription>
            This module helps you learn, practice, and advocate for positive change while understanding
            the constraints and opportunities in your community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('learning')}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg">Learning Journeys</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Interactive paths teaching positive peer support, active advocacy, and servant leadership
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('scenarios')}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Map className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg">Real-World Scenarios</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Practice responding to realistic situations with policy constraints and advocacy opportunities
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('practice')}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg">Peer Support Tools</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Build affirmations, practice accountability with kindness, and develop peer support skills
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('needs')}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg">Community Needs</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Report needs, map constraints, and create advocacy briefs for institutional change
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {advocacyUser?.completedPaths?.length === 0 && (
              <div className="p-4 bg-primary/10 rounded-lg">
                <h4 className="font-semibold mb-1">Start Your First Learning Path</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Begin with "Introduction to Positive Peer Support" to understand the foundations
                </p>
                <button 
                  onClick={() => onNavigate('learning')}
                  className="text-sm text-primary hover:underline"
                >
                  Get Started →
                </button>
              </div>
            )}
            
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-1">Practice a Scenario</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Apply what you've learned in realistic situations
              </p>
              <button 
                onClick={() => onNavigate('scenarios')}
                className="text-sm text-primary hover:underline"
              >
                Explore Scenarios →
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvocacyModule;
