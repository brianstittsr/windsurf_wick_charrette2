import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sparkles, MessageSquare, ThumbsUp, Star } from 'lucide-react';

export default function PhaseIdeation({ charette, breakoutRooms, onComplete }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [newIdea, setNewIdea] = useState('');

  const addIdea = () => {
    if (newIdea.trim()) {
      setIdeas([...ideas, { id: Date.now(), text: newIdea, votes: 0, starred: false }]);
      setNewIdea('');
    }
  };

  const voteIdea = (id) => {
    setIdeas(ideas.map(i => i.id === id ? { ...i, votes: i.votes + 1 } : i));
  };

  const starIdea = (id) => {
    setIdeas(ideas.map(i => i.id === id ? { ...i, starred: !i.starred } : i));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Ideation Phase</CardTitle>
            <Badge>Phase 4</Badge>
          </div>
          <CardDescription>
            Generate creative solutions and explore possibilities without constraints
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Ideation Guidelines */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-base">Ideation Guidelines</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">💡</span>
                  <span><strong>Quantity over quality:</strong> Generate as many ideas as possible</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🚫</span>
                  <span><strong>No criticism:</strong> Defer judgment and evaluation</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🎨</span>
                  <span><strong>Wild ideas welcome:</strong> Encourage unusual and creative thinking</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔗</span>
                  <span><strong>Build on others:</strong> Combine and improve existing ideas</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Breakout Room Summaries */}
          {breakoutRooms && breakoutRooms.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Breakout Room Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {breakoutRooms.map((room) => (
                  <Card 
                    key={room.id}
                    className={`cursor-pointer transition-all ${selectedRoom === room.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
                    onClick={() => setSelectedRoom(room.id)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">{room.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {room.participants?.length || 0} participants
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Key themes and insights from this discussion group
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Idea Generation */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Generate Ideas</CardTitle>
              </div>
              <CardDescription>
                Propose solutions, approaches, or innovations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newIdea}
                  onChange={(e) => setNewIdea(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addIdea()}
                  placeholder="Share your idea..."
                  className="flex-1 px-3 py-2 border rounded-md"
                />
                <Button onClick={addIdea}>Add Idea</Button>
              </div>

              {ideas.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">{ideas.length} Ideas Generated</p>
                  {ideas.sort((a, b) => b.votes - a.votes).map((idea) => (
                    <Card key={idea.id} className={`${idea.starred ? 'border-yellow-400 bg-yellow-50' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <p className="text-sm flex-1">{idea.text}</p>
                          <div className="flex items-center space-x-2 ml-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => starIdea(idea.id)}
                              className={idea.starred ? 'text-yellow-600' : ''}
                            >
                              <Star className={`h-4 w-4 ${idea.starred ? 'fill-current' : ''}`} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => voteIdea(idea.id)}
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {idea.votes}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Idea Categories */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">Idea Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center p-3 bg-background rounded border">
                  <p className="text-2xl font-bold text-primary">
                    {ideas.filter(i => i.starred).length}
                  </p>
                  <p className="text-xs text-muted-foreground">Starred</p>
                </div>
                <div className="text-center p-3 bg-background rounded border">
                  <p className="text-2xl font-bold text-primary">
                    {ideas.filter(i => i.votes >= 3).length}
                  </p>
                  <p className="text-xs text-muted-foreground">High Votes</p>
                </div>
                <div className="text-center p-3 bg-background rounded border">
                  <p className="text-2xl font-bold text-primary">
                    {ideas.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Ideas</p>
                </div>
                <div className="text-center p-3 bg-background rounded border">
                  <p className="text-2xl font-bold text-primary">
                    {breakoutRooms?.length || 0}
                  </p>
                  <p className="text-xs text-muted-foreground">Discussion Groups</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-900">
              <strong>Next Step:</strong> In the synthesis phase, we'll evaluate and combine the best ideas into actionable solutions.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back to Analysis
          </Button>
          <Button onClick={onComplete} size="lg">
            Proceed to Synthesis Phase
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
