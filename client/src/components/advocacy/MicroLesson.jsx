import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const MicroLesson = ({ module, path, onComplete, onBack }) => {
  const [step, setStep] = useState('content');
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [reflection, setReflection] = useState('');
  const [completedReflections, setCompletedReflections] = useState([]);

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    setShowFeedback(true);
  };

  const handleNextFromScenario = () => {
    if (module.reflectionPrompts && module.reflectionPrompts.length > 0) {
      setStep('reflection');
    } else {
      handleComplete();
    }
  };

  const handleReflectionSubmit = () => {
    if (reflection.trim()) {
      setCompletedReflections([...completedReflections, reflection]);
      setReflection('');
      
      if (completedReflections.length + 1 >= module.reflectionPrompts.length) {
        setStep('summary');
      }
    }
  };

  const handleComplete = () => {
    onComplete({
      selectedOptions: selectedOption ? [selectedOption] : [],
      reflections: completedReflections,
      completedAt: new Date().toISOString(),
      timeSpent: 5
    });
  };

  const currentReflectionIndex = completedReflections.length;
  const currentReflectionPrompt = module.reflectionPrompts?.[currentReflectionIndex];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Paths
            </Button>
            <Badge>{path.title}</Badge>
          </div>
          <CardTitle className="text-2xl">{module.title}</CardTitle>
          <CardDescription>
            {step === 'content' && 'Learn the key concepts'}
            {step === 'scenario' && 'Apply what you learned'}
            {step === 'reflection' && 'Reflect on your learning'}
            {step === 'summary' && 'Review key takeaways'}
          </CardDescription>
        </CardHeader>
      </Card>

      {step === 'content' && (
        <Card>
          <CardContent className="pt-6">
            <div className="prose max-w-none mb-6">
              <div className="text-base leading-relaxed whitespace-pre-wrap">
                {module.content}
              </div>
            </div>
            <Button 
              onClick={() => module.scenario ? setStep('scenario') : setStep('reflection')}
              className="w-full"
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 'scenario' && module.scenario && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Practice Scenario</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-base">{module.scenario.situation}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">What would you do?</h4>
              <div className="space-y-3">
                {module.scenario.options.map((option, idx) => {
                  const isSelected = selectedOption === option.id;
                  const feedback = module.scenario.feedback[option.id];

                  return (
                    <div key={option.id}>
                      <button
                        onClick={() => handleOptionSelect(option.id)}
                        disabled={showFeedback && !isSelected}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/10'
                            : showFeedback
                            ? 'border-muted bg-muted/50 opacity-50'
                            : 'border-border hover:border-primary/50 hover:bg-muted'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="font-semibold text-primary">{String.fromCharCode(65 + idx)}.</span>
                          <span className="flex-1">{option.text}</span>
                        </div>
                      </button>

                      {showFeedback && isSelected && feedback && (
                        <div className={`mt-2 p-4 rounded-lg ${
                          feedback.alignment === 'positive_support' 
                            ? 'bg-green-50 border border-green-200' 
                            : feedback.alignment === 'constrained'
                            ? 'bg-yellow-50 border border-yellow-200'
                            : 'bg-red-50 border border-red-200'
                        }`}>
                          <div className="flex items-start space-x-2">
                            <Lightbulb className={`h-5 w-5 mt-0.5 ${
                              feedback.alignment === 'positive_support' 
                                ? 'text-green-600' 
                                : feedback.alignment === 'constrained'
                                ? 'text-yellow-600'
                                : 'text-red-600'
                            }`} />
                            <div className="flex-1">
                              <p className="font-semibold mb-1">
                                {feedback.alignment === 'positive_support' && 'Great choice!'}
                                {feedback.alignment === 'constrained' && 'Constrained by policy'}
                                {feedback.alignment === 'harmful' && 'Consider this'}
                              </p>
                              <p className="text-sm">{feedback.explanation}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {showFeedback && (
              <Button onClick={handleNextFromScenario} className="w-full">
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {step === 'reflection' && currentReflectionPrompt && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Reflection</span>
            </CardTitle>
            <CardDescription>
              Question {currentReflectionIndex + 1} of {module.reflectionPrompts.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium">{currentReflectionPrompt}</p>
            </div>

            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full min-h-[120px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  if (currentReflectionIndex === 0) {
                    setStep('scenario');
                  } else {
                    setCompletedReflections(completedReflections.slice(0, -1));
                  }
                }}
              >
                Back
              </Button>
              <Button
                onClick={handleReflectionSubmit}
                disabled={!reflection.trim()}
                className="flex-1"
              >
                {currentReflectionIndex < module.reflectionPrompts.length - 1 ? 'Next Question' : 'Continue'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'summary' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span>Module Complete!</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {module.keyTakeaways && module.keyTakeaways.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <span>Key Takeaways</span>
                </h4>
                <ul className="space-y-2">
                  {module.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button onClick={handleComplete} className="w-full" size="lg">
              Complete Module
              <CheckCircle className="h-5 w-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MicroLesson;
