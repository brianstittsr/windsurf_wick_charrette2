import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, ArrowRight, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import advocacyService from '../../services/advocacyService';

const ScenarioEngine = ({ advocacyUser }) => {
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [filters, setFilters] = useState({
    constraintType: 'all',
    difficulty: 'all'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScenarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advocacyUser]);

  const loadScenarios = async () => {
    try {
      const allScenarios = await advocacyService.getScenarios({
        ageGroup: advocacyUser.ageGroup,
        role: advocacyUser.role,
        ...filters
      });
      setScenarios(allScenarios);
    } catch (error) {
      console.error('Error loading scenarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleActionSelect = (action) => {
    setSelectedAction(action);
    setShowOutcome(true);
  };

  const handleReset = () => {
    setSelectedAction(null);
    setShowOutcome(false);
  };

  const handleNextScenario = () => {
    setSelectedScenario(null);
    setSelectedAction(null);
    setShowOutcome(false);
  };

  if (selectedScenario) {
    return (
      <ScenarioDetail
        scenario={selectedScenario}
        selectedAction={selectedAction}
        showOutcome={showOutcome}
        onActionSelect={handleActionSelect}
        onReset={handleReset}
        onBack={handleNextScenario}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Interactive Scenarios</CardTitle>
          <CardDescription>
            Practice responding to real-world situations with policy constraints and advocacy opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <select
              value={filters.constraintType}
              onChange={(e) => setFilters({ ...filters, constraintType: e.target.value })}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Constraint Types</option>
              <option value="school_policy">School Policy</option>
              <option value="benefits_rule">Benefits Rules</option>
              <option value="housing_regulation">Housing Regulations</option>
              <option value="justice_system">Justice System</option>
              <option value="healthcare_access">Healthcare Access</option>
            </select>

            <select
              value={filters.difficulty}
              onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Difficulty Levels</option>
              <option value="1">Beginner</option>
              <option value="2">Intermediate</option>
              <option value="3">Advanced</option>
              <option value="4">Expert</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading scenarios...</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {scenarios.map((scenario) => (
            <Card key={scenario.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{scenario.title}</CardTitle>
                    <CardDescription>{scenario.description}</CardDescription>
                  </div>
                  <Badge variant="outline">
                    Level {scenario.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      {scenario.constraintType.replace('_', ' ')}
                    </Badge>
                    {scenario.tags?.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {scenario.context}
                  </p>

                  <Button
                    onClick={() => setSelectedScenario(scenario)}
                    className="w-full"
                  >
                    Start Scenario
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

const ScenarioDetail = ({ scenario, selectedAction, showOutcome, onActionSelect, onReset, onBack }) => {
  const outcome = selectedAction ? scenario.outcomes[selectedAction.id] : null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
            Back to Scenarios
          </Button>
          <CardTitle className="text-2xl">{scenario.title}</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>{scenario.constraintType.replace('_', ' ')}</Badge>
            <Badge variant="outline">Level {scenario.difficulty}</Badge>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Context</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed">{scenario.context}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>The Situation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-base leading-relaxed">{scenario.situation}</p>
          </div>
        </CardContent>
      </Card>

      {!showOutcome ? (
        <Card>
          <CardHeader>
            <CardTitle>What would you do?</CardTitle>
            <CardDescription>Choose an action to see the outcome</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scenario.actions.map((action, idx) => (
                <button
                  key={action.id}
                  onClick={() => onActionSelect(action)}
                  className="w-full p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-muted text-left transition-all"
                >
                  <div className="flex items-start space-x-3">
                    <span className="font-semibold text-primary">{String.fromCharCode(65 + idx)}.</span>
                    <span className="flex-1">{action.text}</span>
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
                {selectedAction.alignment === 'positive_support' && (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                )}
                {selectedAction.alignment === 'constrained' && (
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                )}
                {selectedAction.alignment === 'harmful' && (
                  <AlertCircle className="h-6 w-6 text-red-600" />
                )}
                <span>Your Choice</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium mb-2">{selectedAction.text}</p>
                <p className="text-sm text-muted-foreground">{selectedAction.explanation}</p>
              </div>

              {outcome && (
                <div className={`p-4 rounded-lg ${
                  selectedAction.alignment === 'positive_support' 
                    ? 'bg-green-50 border border-green-200' 
                    : selectedAction.alignment === 'constrained'
                    ? 'bg-yellow-50 border border-yellow-200'
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <h4 className="font-semibold mb-2">Outcome</h4>
                  <p className="text-sm">{outcome}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {scenario.whatInControl && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="h-5 w-5" />
                  <span>What's in Your Control?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scenario.whatInControl.individual?.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-green-700">Actions I Can Take</h4>
                      <ul className="space-y-1">
                        {scenario.whatInControl.individual.map((action, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {scenario.whatInControl.peer?.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-blue-700">Actions Peers Can Take Together</h4>
                      <ul className="space-y-1">
                        {scenario.whatInControl.peer.map((action, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {scenario.whatInControl.policyChange?.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-purple-700">Actions Requiring Policy Change</h4>
                      <ul className="space-y-1">
                        {scenario.whatInControl.policyChange.map((action, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <AlertCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {scenario.advocacySteps?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Concrete Advocacy Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {scenario.advocacySteps.map((step, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                        {idx + 1}
                      </span>
                      <span className="flex-1 pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          )}

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onReset} className="flex-1">
              Try Different Action
            </Button>
            <Button onClick={onBack} className="flex-1">
              Next Scenario
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ScenarioEngine;
