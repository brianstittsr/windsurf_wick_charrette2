import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Layers, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function PhaseSynthesis({ charette, ideas, onComplete }) {
  const [solutions, setSolutions] = useState([
    { id: 1, title: '', description: '', feasibility: 'medium', impact: 'medium', selected: false }
  ]);

  const addSolution = () => {
    setSolutions([...solutions, {
      id: Date.now(),
      title: '',
      description: '',
      feasibility: 'medium',
      impact: 'medium',
      selected: false
    }]);
  };

  const updateSolution = (id, field, value) => {
    setSolutions(solutions.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const toggleSelection = (id) => {
    setSolutions(solutions.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
  };

  const selectedCount = solutions.filter(s => s.selected).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Synthesis Phase</CardTitle>
            <Badge>Phase 5</Badge>
          </div>
          <CardDescription>
            Combine insights and ideas into actionable, feasible solutions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Synthesis Overview */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Layers className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-base">Synthesis Process</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Consolidate</p>
                    <p className="text-xs text-muted-foreground">Combine similar ideas and remove duplicates</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Evaluate</p>
                    <p className="text-xs text-muted-foreground">Assess feasibility, impact, and alignment with goals</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Prioritize</p>
                    <p className="text-xs text-muted-foreground">Select the most promising solutions for implementation</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Solution Development */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Proposed Solutions</h3>
              <Badge variant="secondary">{selectedCount} Selected</Badge>
            </div>

            <div className="space-y-4">
              {solutions.map((solution, idx) => (
                <Card key={solution.id} className={`${solution.selected ? 'border-primary bg-primary/5' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">Solution {idx + 1}</CardTitle>
                      <input
                        type="checkbox"
                        checked={solution.selected}
                        onChange={() => toggleSelection(solution.id)}
                        className="h-4 w-4 rounded"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-xs font-medium">Title</label>
                      <input
                        type="text"
                        value={solution.title}
                        onChange={(e) => updateSolution(solution.id, 'title', e.target.value)}
                        placeholder="Brief, descriptive title"
                        className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Description</label>
                      <textarea
                        value={solution.description}
                        onChange={(e) => updateSolution(solution.id, 'description', e.target.value)}
                        placeholder="Detailed description of the solution and how it addresses the problem"
                        className="w-full mt-1 px-3 py-2 border rounded-md text-sm resize-none"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium">Feasibility</label>
                        <select
                          value={solution.feasibility}
                          onChange={(e) => updateSolution(solution.id, 'feasibility', e.target.value)}
                          className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                        >
                          <option value="high">High - Easy to implement</option>
                          <option value="medium">Medium - Moderate effort</option>
                          <option value="low">Low - Significant challenges</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium">Impact</label>
                        <select
                          value={solution.impact}
                          onChange={(e) => updateSolution(solution.id, 'impact', e.target.value)}
                          className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                        >
                          <option value="high">High - Major improvement</option>
                          <option value="medium">Medium - Notable benefit</option>
                          <option value="low">Low - Minor improvement</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button variant="outline" onClick={addSolution} className="w-full mt-4">
              + Add Another Solution
            </Button>
          </div>

          {/* Evaluation Matrix */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">Evaluation Matrix</CardTitle>
              <CardDescription>Solutions by feasibility and impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center font-medium p-2">Impact</div>
                <div className="text-center font-medium p-2">High Feasibility</div>
                <div className="text-center font-medium p-2">Low Feasibility</div>
                
                <div className="text-center font-medium p-2">High</div>
                <div className="p-3 bg-green-100 border border-green-300 rounded">
                  <p className="font-medium text-green-800">Quick Wins</p>
                  <p className="text-xs text-green-700 mt-1">
                    {solutions.filter(s => s.feasibility === 'high' && s.impact === 'high').length} solutions
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 border border-yellow-300 rounded">
                  <p className="font-medium text-yellow-800">Major Projects</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    {solutions.filter(s => s.feasibility === 'low' && s.impact === 'high').length} solutions
                  </p>
                </div>

                <div className="text-center font-medium p-2">Low</div>
                <div className="p-3 bg-blue-100 border border-blue-300 rounded">
                  <p className="font-medium text-blue-800">Fill-ins</p>
                  <p className="text-xs text-blue-700 mt-1">
                    {solutions.filter(s => s.feasibility === 'high' && s.impact === 'low').length} solutions
                  </p>
                </div>
                <div className="p-3 bg-gray-100 border border-gray-300 rounded">
                  <p className="font-medium text-gray-800">Reconsider</p>
                  <p className="text-xs text-gray-700 mt-1">
                    {solutions.filter(s => s.feasibility === 'low' && s.impact === 'low').length} solutions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="border-primary/50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <CardTitle className="text-base">Recommendations</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Prioritize "Quick Wins" for immediate implementation</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Plan "Major Projects" with adequate resources and timeline</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Consider combining solutions for greater impact</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Ensure selected solutions address all stakeholder concerns</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {selectedCount === 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm text-orange-900">
                <strong>Note:</strong> Select at least one solution to proceed to the reporting phase.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back to Ideation
          </Button>
          <Button onClick={onComplete} size="lg" disabled={selectedCount === 0}>
            Generate Final Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
