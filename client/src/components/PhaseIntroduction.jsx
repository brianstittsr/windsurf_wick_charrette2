import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Users, Target, Clock, FileText } from 'lucide-react';

export default function PhaseIntroduction({ charette, onComplete }) {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Welcome to the Charette</CardTitle>
            <Badge>Phase 1: Introduction</Badge>
          </div>
          <CardDescription>
            Let's establish the foundation for our collaborative session
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-3">Session Overview</h3>
            <p className="text-muted-foreground">
              {charette.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-muted/50">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Objectives</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {charette.metadata?.objectives || 'Define clear goals and desired outcomes for this session'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Stakeholders</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {charette.metadata?.stakeholders || 'All relevant parties and perspectives represented'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Timeframe</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {charette.metadata?.timeframe || 'Structured timeline for completion'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Scope</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {charette.metadata?.scope || 'Defined boundaries and focus areas'}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-base">Ground Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Respect all perspectives and voices</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Focus on understanding before judging</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Challenge ideas, not people</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Seek common ground and shared goals</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Stay engaged and contribute actively</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="acknowledge"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="acknowledge" className="text-sm">
              I understand the objectives and agree to the ground rules
            </label>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={onComplete} 
            disabled={!acknowledged}
            className="w-full"
            size="lg"
          >
            Begin Data Collection Phase
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
