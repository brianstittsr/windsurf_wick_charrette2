import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Brain, Sparkles, TrendingUp, AlertCircle, Lightbulb, MessageSquare, Loader2 } from 'lucide-react';
import AdvancedReframingMethods from './AdvancedReframingMethods';

export default function AIAnalysisPanel({ charette, messages, breakoutRooms, onAnalyze }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState('all');

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const result = await onAnalyze(selectedRoom);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  // Room messages filtering handled in parent component

  return (
    <div className="space-y-6">
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-purple-600" />
              <CardTitle>AI-Powered Analysis</CardTitle>
            </div>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              <Sparkles className="h-3 w-3 mr-1" />
              Enhanced with CBT Techniques
            </Badge>
          </div>
          <CardDescription>
            Cognitive analysis of discussions to identify patterns, assumptions, and breakthrough opportunities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Room Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Select Room for Analysis</label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedRoom === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedRoom('all')}
              >
                All Rooms ({messages?.length || 0} messages)
              </Button>
              {breakoutRooms?.map((room) => (
                <Button
                  key={room.id}
                  variant={selectedRoom === room.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedRoom(room.id)}
                >
                  {room.name} ({messages?.filter(m => m.roomId === room.id).length || 0})
                </Button>
              ))}
            </div>
          </div>

          {/* Analyze Button */}
          <Button 
            onClick={handleAnalyze} 
            disabled={analyzing || !messages?.length}
            className="w-full"
            size="lg"
          >
            {analyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Run AI Analysis
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <>
          {/* Room Summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-base">Discussion Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {analysis.summary || 'Comprehensive summary of key points, themes, and participant contributions across all discussion rooms.'}
              </p>
            </CardContent>
          </Card>

          {/* Cognitive Patterns */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-base">Cognitive Patterns Identified</CardTitle>
              </div>
              <CardDescription>CBT-based analysis of thinking patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50">
                <h5 className="font-medium text-sm text-orange-900">Cognitive Distortions</h5>
                <p className="text-xs text-orange-800 mt-1">
                  {analysis.cognitiveDistortions || 'All-or-nothing thinking, overgeneralization, and emotional reasoning detected in discussions'}
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                <h5 className="font-medium text-sm text-blue-900">Underlying Assumptions</h5>
                <p className="text-xs text-blue-800 mt-1">
                  {analysis.assumptions || 'Core beliefs about fairness, safety, and community values driving positions'}
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50">
                <h5 className="font-medium text-sm text-green-900">Emotional Triggers</h5>
                <p className="text-xs text-green-800 mt-1">
                  {analysis.emotionalTriggers || 'Fear of change, loss of control, and concerns about children\'s wellbeing'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Language Reframing */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                <CardTitle className="text-base">Language Reframing Opportunities</CardTitle>
              </div>
              <CardDescription>How changing language can create breakthroughs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {(analysis.reframingOpportunities || [
                {
                  original: '"They don\'t understand our concerns"',
                  reframed: '"We haven\'t yet found the right way to communicate our concerns"',
                  impact: 'Shifts from blame to collaborative problem-solving'
                },
                {
                  original: '"This will never work"',
                  reframed: '"What would need to be true for this to work?"',
                  impact: 'Opens possibility thinking instead of closing down options'
                },
                {
                  original: '"It\'s us versus them"',
                  reframed: '"We all want what\'s best for our children"',
                  impact: 'Identifies shared values and common ground'
                }
              ]).map((item, idx) => (
                <div key={idx} className="bg-white p-3 rounded border border-yellow-200">
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-red-700">Original Language:</p>
                      <p className="text-sm italic text-gray-700">{item.original}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-green-700">Reframed Language:</p>
                      <p className="text-sm italic text-gray-700">{item.reframed}</p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        <strong>Impact:</strong> {item.impact}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Breakthrough Opportunities */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <CardTitle className="text-base">Breakthrough Opportunities</CardTitle>
              </div>
              <CardDescription>Win-win solutions identified through AI + CBT analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {(analysis.breakthroughs || [
                {
                  title: 'Shared Safety Concerns',
                  description: 'Both groups prioritize children\'s safety - can unite around comprehensive safety protocols',
                  technique: 'Finding common ground through values clarification'
                },
                {
                  title: 'Gradual Implementation',
                  description: 'Pilot program addresses fear of rapid change while demonstrating feasibility',
                  technique: 'Breaking down all-or-nothing thinking'
                },
                {
                  title: 'Community Involvement',
                  description: 'Joint oversight committee gives all stakeholders voice and control',
                  technique: 'Addressing control and autonomy needs'
                }
              ]).map((item, idx) => (
                <div key={idx} className="bg-white p-3 rounded border border-green-200">
                  <h5 className="font-medium text-sm text-green-900">{item.title}</h5>
                  <p className="text-xs text-gray-700 mt-1">{item.description}</p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    CBT Technique: {item.technique}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Stalemate Resolution */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-base">Stalemate Resolution Strategies</CardTitle>
              </div>
              <CardDescription>CBT + AI techniques for breaking deadlocks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <h5 className="font-medium text-sm">1. Socratic Questioning</h5>
                  <p className="text-xs text-muted-foreground mt-1">
                    Use guided questions to help participants examine their assumptions: "What evidence supports this belief?" "What are alternative explanations?"
                  </p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <h5 className="font-medium text-sm">2. Cognitive Restructuring</h5>
                  <p className="text-xs text-muted-foreground mt-1">
                    Help participants identify and challenge unhelpful thought patterns, replacing them with more balanced perspectives
                  </p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <h5 className="font-medium text-sm">3. Values Alignment</h5>
                  <p className="text-xs text-muted-foreground mt-1">
                    Focus on shared values rather than positions - all parties want quality education and safe communities
                  </p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <h5 className="font-medium text-sm">4. Behavioral Experiments</h5>
                  <p className="text-xs text-muted-foreground mt-1">
                    Propose small pilot programs to test assumptions and gather real-world evidence
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Advanced Reframing Methods - Always visible */}
      <AdvancedReframingMethods messages={messages} />

      {/* No Analysis Yet */}
      {!analysis && !analyzing && (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Click "Run AI Analysis" to generate insights, identify cognitive patterns, and discover breakthrough opportunities
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
