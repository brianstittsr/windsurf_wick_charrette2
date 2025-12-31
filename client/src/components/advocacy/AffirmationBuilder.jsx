import React, { useState, useEffect } from 'react';
import { Sparkles, Save, Copy, CheckCircle, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import AITextEnhancer from './AITextEnhancer';
import advocacyService from '../../services/advocacyService';

const AffirmationBuilder = ({ advocacyUser }) => {
  const [selectedStatements, setSelectedStatements] = useState([]);
  const [generatedResponses, setGeneratedResponses] = useState([]);
  const [customResponse, setCustomResponse] = useState('');
  const [savedAffirmations, setSavedAffirmations] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const iAmStatements = [
    { id: 'strength', text: 'I am strength in action', category: 'power' },
    { id: 'resilient', text: 'I am resilient', category: 'power' },
    { id: 'capable', text: 'I am capable of growth', category: 'growth' },
    { id: 'worthy', text: 'I am worthy of support', category: 'worth' },
    { id: 'brave', text: 'I am brave enough to ask for help', category: 'courage' },
    { id: 'learning', text: 'I am learning from my mistakes', category: 'growth' },
    { id: 'valuable', text: 'I am valuable to my community', category: 'worth' },
    { id: 'changing', text: 'I am capable of change', category: 'growth' },
    { id: 'heard', text: 'I am worthy of being heard', category: 'worth' },
    { id: 'supported', text: 'I am supported by my peers', category: 'connection' }
  ];

  const responseTemplates = {
    strength: [
      'I see your resilience; I hear your courage.',
      'Your strength inspires others to keep going.',
      'You show up even when it\'s hard - that\'s real strength.'
    ],
    resilient: [
      'You\'ve faced challenges before and made it through.',
      'Your ability to bounce back is remarkable.',
      'I witness your resilience every day.'
    ],
    capable: [
      'I believe in your capacity to grow.',
      'You\'re learning and evolving - I see it.',
      'Your growth journey matters and I\'m here for it.'
    ],
    worthy: [
      'You deserve support, no questions asked.',
      'Your worth isn\'t determined by what you can do for others.',
      'You belong here, just as you are.'
    ],
    brave: [
      'Asking for help takes real courage.',
      'Your vulnerability is a sign of strength.',
      'It\'s brave to admit when you need support.'
    ],
    learning: [
      'Mistakes are proof you\'re trying and growing.',
      'I see you learning and that takes courage.',
      'Your willingness to learn shows real character.'
    ],
    valuable: [
      'Your presence makes our community stronger.',
      'You bring unique gifts that matter.',
      'We\'re better because you\'re here.'
    ],
    changing: [
      'Change is possible and you\'re proving it.',
      'I see the changes you\'re making.',
      'Your commitment to growth is inspiring.'
    ],
    heard: [
      'Your voice matters and deserves to be heard.',
      'What you have to say is important.',
      'I\'m listening and your words have value.'
    ],
    supported: [
      'We\'ve got your back, always.',
      'You\'re not alone in this journey.',
      'This community stands with you.'
    ]
  };

  useEffect(() => {
    loadSavedAffirmations();
  }, [advocacyUser]);

  const loadSavedAffirmations = async () => {
    try {
      const affirmations = await advocacyService.getUserAffirmations(advocacyUser.userId);
      setSavedAffirmations(affirmations);
    } catch (error) {
      console.error('Error loading affirmations:', error);
    }
  };

  const handleStatementToggle = (statement) => {
    const isSelected = selectedStatements.find(s => s.id === statement.id);
    if (isSelected) {
      setSelectedStatements(selectedStatements.filter(s => s.id !== statement.id));
    } else {
      setSelectedStatements([...selectedStatements, statement]);
    }
  };

  const handleGenerateResponses = () => {
    const responses = selectedStatements.flatMap(statement => {
      const templates = responseTemplates[statement.id] || [];
      return templates.map(template => ({
        statementId: statement.id,
        statement: statement.text,
        response: template
      }));
    });
    setGeneratedResponses(responses);
  };

  const handleSaveAffirmation = async (response) => {
    try {
      await advocacyService.saveAffirmation({
        userId: advocacyUser.userId,
        type: 'affirmation',
        situation: response.statement,
        script: response.response,
        tags: ['peer-support', 'affirmation'],
        isPublic: false
      });
      loadSavedAffirmations();
    } catch (error) {
      console.error('Error saving affirmation:', error);
    }
  };

  const handleSaveCustom = async () => {
    if (!customResponse.trim()) return;
    
    try {
      await advocacyService.saveAffirmation({
        userId: advocacyUser.userId,
        type: 'affirmation',
        situation: 'Custom affirmation',
        script: customResponse,
        tags: ['peer-support', 'affirmation', 'custom'],
        isPublic: false
      });
      setCustomResponse('');
      loadSavedAffirmations();
    } catch (error) {
      console.error('Error saving custom affirmation:', error);
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span>Affirmation Builder</span>
          </CardTitle>
          <CardDescription>
            Select "I am..." statements to generate supportive peer responses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Select Affirmation Statements</h4>
            <div className="grid md:grid-cols-2 gap-3">
              {iAmStatements.map(statement => {
                const isSelected = selectedStatements.find(s => s.id === statement.id);
                return (
                  <button
                    key={statement.id}
                    onClick={() => handleStatementToggle(statement)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50 hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{statement.text}</span>
                      {isSelected && <CheckCircle className="h-5 w-5 text-primary" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedStatements.length > 0 && (
            <Button onClick={handleGenerateResponses} className="w-full">
              Generate Peer Responses
              <Sparkles className="h-4 w-4 ml-2" />
            </Button>
          )}
        </CardContent>
      </Card>

      {generatedResponses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Suggested Peer Responses</CardTitle>
            <CardDescription>
              Use these responses to support peers who share these affirmations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generatedResponses.map((response, idx) => (
                <div key={idx} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline">{response.statement}</Badge>
                  </div>
                  <p className="text-base mb-3">{response.response}</p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopy(response.response, `response-${idx}`)}
                    >
                      {copiedId === `response-${idx}` ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleSaveAffirmation(response)}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Create Custom Affirmation</CardTitle>
              <CardDescription>
                Write your own peer support response
              </CardDescription>
            </div>
            <AITextEnhancer
              text={customResponse}
              onEnhanced={(enhanced) => setCustomResponse(enhanced)}
              context="affirmation"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            value={customResponse}
            onChange={(e) => setCustomResponse(e.target.value)}
            placeholder="Write a supportive message to a peer..."
            className="w-full min-h-[100px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            onClick={handleSaveCustom}
            disabled={!customResponse.trim()}
            className="w-full"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Custom Affirmation
          </Button>
        </CardContent>
      </Card>

      {savedAffirmations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Saved Affirmations</CardTitle>
            <CardDescription>
              {savedAffirmations.length} affirmation{savedAffirmations.length !== 1 ? 's' : ''} saved
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {savedAffirmations.map((affirmation, idx) => (
                <div key={affirmation.id} className="p-3 bg-muted rounded-lg">
                  <p className="text-sm mb-2">{affirmation.script}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(affirmation.script, `saved-${idx}`)}
                  >
                    {copiedId === `saved-${idx}` ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AffirmationBuilder;
