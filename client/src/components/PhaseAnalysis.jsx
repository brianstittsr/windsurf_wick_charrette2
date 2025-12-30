import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Brain, AlertCircle, Lightbulb, TrendingUp } from 'lucide-react';

export default function PhaseAnalysis({ charette, messages, onComplete, onCreateBreakoutRooms }) {
  const [analysisType, setAnalysisType] = useState('constraints');
  const [breakoutTopics, setBreakoutTopics] = useState([
    { id: 1, topic: '', questions: [''] }
  ]);

  const addBreakoutTopic = () => {
    setBreakoutTopics([...breakoutTopics, { id: Date.now(), topic: '', questions: [''] }]);
  };

  const updateTopic = (id, field, value) => {
    setBreakoutTopics(breakoutTopics.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  const addQuestion = (topicId) => {
    setBreakoutTopics(breakoutTopics.map(t =>
      t.id === topicId ? { ...t, questions: [...t.questions, ''] } : t
    ));
  };

  const updateQuestion = (topicId, index, value) => {
    setBreakoutTopics(breakoutTopics.map(t =>
      t.id === topicId ? {
        ...t,
        questions: t.questions.map((q, i) => i === index ? value : q)
      } : t
    ));
  };

  const handleCreateRooms = () => {
    const validTopics = breakoutTopics.filter(t => t.topic && t.questions.some(q => q));
    if (onCreateBreakoutRooms) {
      onCreateBreakoutRooms(validTopics);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Analysis Phase</CardTitle>
            <Badge>Phase 3</Badge>
          </div>
          <CardDescription>
            Identify constraints, assumptions, and opportunities for breakthrough thinking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Analysis Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card 
              className={`cursor-pointer transition-all ${analysisType === 'constraints' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
              onClick={() => setAnalysisType('constraints')}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  <CardTitle className="text-base">Constraints</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Identify limitations, boundaries, and fixed requirements
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all ${analysisType === 'assumptions' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
              onClick={() => setAnalysisType('assumptions')}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  <CardTitle className="text-base">Assumptions</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Uncover hidden beliefs and untested hypotheses
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all ${analysisType === 'opportunities' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
              onClick={() => setAnalysisType('opportunities')}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  <CardTitle className="text-base">Opportunities</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Find areas for innovation and breakthrough solutions
                </p>
              </CardContent>
            </Card>
          </div>

          {/* AI Analysis Results */}
          <Card className="bg-muted/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">AI Analysis Results</CardTitle>
                </div>
                <Button variant="outline" size="sm">
                  Run Analysis
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysisType === 'constraints' && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Detected Constraints:</p>
                    <ul className="space-y-2">
                      <li className="text-sm p-2 bg-background rounded border">
                        <strong>Time:</strong> Limited timeframe for implementation
                      </li>
                      <li className="text-sm p-2 bg-background rounded border">
                        <strong>Budget:</strong> Resource limitations mentioned
                      </li>
                      <li className="text-sm p-2 bg-background rounded border">
                        <strong>Regulatory:</strong> Compliance requirements identified
                      </li>
                    </ul>
                  </div>
                )}
                {analysisType === 'assumptions' && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Key Assumptions:</p>
                    <ul className="space-y-2">
                      <li className="text-sm p-2 bg-background rounded border">
                        Assumption about stakeholder priorities
                      </li>
                      <li className="text-sm p-2 bg-background rounded border">
                        Beliefs about feasibility and timeline
                      </li>
                      <li className="text-sm p-2 bg-background rounded border">
                        Expectations about resource availability
                      </li>
                    </ul>
                  </div>
                )}
                {analysisType === 'opportunities' && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Identified Opportunities:</p>
                    <ul className="space-y-2">
                      <li className="text-sm p-2 bg-background rounded border">
                        Common ground between stakeholder positions
                      </li>
                      <li className="text-sm p-2 bg-background rounded border">
                        Potential for innovative solutions
                      </li>
                      <li className="text-sm p-2 bg-background rounded border">
                        Areas of alignment and shared goals
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Breakout Room Setup */}
          <Card className="border-primary/50">
            <CardHeader>
              <CardTitle className="text-base">Setup Breakout Rooms</CardTitle>
              <CardDescription>
                Create focused discussion groups to explore specific topics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {breakoutTopics.map((topic, idx) => (
                <Card key={topic.id} className="bg-muted/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Room {idx + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-xs font-medium">Topic</label>
                      <input
                        type="text"
                        value={topic.topic}
                        onChange={(e) => updateTopic(topic.id, 'topic', e.target.value)}
                        placeholder="e.g., Transportation & Safety"
                        className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Discussion Questions</label>
                      {topic.questions.map((q, qIdx) => (
                        <input
                          key={qIdx}
                          type="text"
                          value={q}
                          onChange={(e) => updateQuestion(topic.id, qIdx, e.target.value)}
                          placeholder={`Question ${qIdx + 1}`}
                          className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                        />
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addQuestion(topic.id)}
                        className="mt-2"
                      >
                        + Add Question
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" onClick={addBreakoutTopic} className="w-full">
                + Add Another Room
              </Button>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCreateRooms} className="w-full">
                Create Breakout Rooms
              </Button>
            </CardFooter>
          </Card>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back to Data Collection
          </Button>
          <Button onClick={onComplete} size="lg">
            Proceed to Ideation Phase
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
