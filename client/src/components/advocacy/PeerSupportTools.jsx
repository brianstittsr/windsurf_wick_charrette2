import React, { useState } from 'react';
import { Heart, Users, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import AffirmationBuilder from './AffirmationBuilder';
import AccountabilityCoach from './AccountabilityCoach';
import YouthPracticeRoom from './YouthPracticeRoom';

const PeerSupportTools = ({ advocacyUser }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Peer Support Practice Tools</CardTitle>
          <CardDescription>
            Build skills in affirmation, accountability with kindness, and positive peer support
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="affirmation">Affirmation Builder</TabsTrigger>
          <TabsTrigger value="accountability">Accountability Coach</TabsTrigger>
          <TabsTrigger value="youth">Youth Practice Room</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('affirmation')}>
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <Sparkles className="h-8 w-8 text-primary" />
                  <CardTitle>Affirmation Builder</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Create powerful affirmations and peer support responses that recognize strengths and build resilience
                </p>
                <Button className="w-full">
                  Start Building
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('accountability')}>
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <Heart className="h-8 w-8 text-primary" />
                  <CardTitle>Accountability Coach</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Practice accountability with kindness - holding peers responsible while believing in their capacity
                </p>
                <Button className="w-full">
                  Practice Now
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('youth')}>
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <Users className="h-8 w-8 text-primary" />
                  <CardTitle>Youth Practice Room</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Kid-friendly practice scenarios for standing up for peers, including others, and asking for help
                </p>
                <Button className="w-full">
                  Enter Room
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="affirmation">
          <AffirmationBuilder advocacyUser={advocacyUser} />
        </TabsContent>

        <TabsContent value="accountability">
          <AccountabilityCoach advocacyUser={advocacyUser} />
        </TabsContent>

        <TabsContent value="youth">
          <YouthPracticeRoom advocacyUser={advocacyUser} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PeerSupportTools;
