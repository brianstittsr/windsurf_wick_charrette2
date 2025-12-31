import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Check, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const GuidedTour = ({ isActive, onClose, tourSteps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [spotlightPosition, setSpotlightPosition] = useState(null);

  useEffect(() => {
    if (isActive && tourSteps[currentStep]) {
      const step = tourSteps[currentStep];
      if (step.targetSelector) {
        const element = document.querySelector(step.targetSelector);
        if (element) {
          const rect = element.getBoundingClientRect();
          setSpotlightPosition({
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            height: rect.height
          });
          
          // Scroll element into view
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        setSpotlightPosition(null);
      }
    }
  }, [currentStep, isActive, tourSteps]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isActive) return null;

  const step = tourSteps[currentStep];
  const isLastStep = currentStep === tourSteps.length - 1;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleSkip} />

      {/* Spotlight effect */}
      {spotlightPosition && (
        <>
          {/* Highlight box */}
          <div
            className="absolute border-4 border-primary rounded-lg shadow-2xl transition-all duration-300 pointer-events-none"
            style={{
              top: `${spotlightPosition.top - 8}px`,
              left: `${spotlightPosition.left - 8}px`,
              width: `${spotlightPosition.width + 16}px`,
              height: `${spotlightPosition.height + 16}px`,
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 40px rgba(59, 130, 246, 0.5)'
            }}
          />
          
          {/* Clear area for the element */}
          <div
            className="absolute bg-transparent pointer-events-none transition-all duration-300"
            style={{
              top: `${spotlightPosition.top}px`,
              left: `${spotlightPosition.left}px`,
              width: `${spotlightPosition.width}px`,
              height: `${spotlightPosition.height}px`,
              zIndex: 10000
            }}
          />
        </>
      )}

      {/* Callout Card */}
      <div
        className="absolute transition-all duration-300"
        style={{
          top: spotlightPosition 
            ? `${spotlightPosition.top + spotlightPosition.height + 20}px`
            : '50%',
          left: spotlightPosition 
            ? `${Math.max(20, Math.min(spotlightPosition.left, window.innerWidth - 420))}px`
            : '50%',
          transform: spotlightPosition ? 'none' : 'translate(-50%, -50%)',
          maxWidth: '400px',
          zIndex: 10001
        }}
      >
        <Card className="shadow-2xl border-2 border-primary">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">
                    Step {currentStep + 1} of {tourSteps.length}
                  </Badge>
                  {step.category && (
                    <Badge variant="outline">{step.category}</Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSkip}
                className="h-8 w-8 -mt-2 -mr-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {step.description}
            </p>

            {step.benefits && step.benefits.length > 0 && (
              <div className="bg-primary/5 p-3 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                  <Check className="h-4 w-4 text-green-600" />
                  Key Benefits:
                </h4>
                <ul className="space-y-1">
                  {step.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {step.tip && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">💡 Tip: </span>
                  {step.tip}
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              <div className="flex gap-1">
                {tourSteps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 w-2 rounded-full transition-all ${
                      idx === currentStep
                        ? 'bg-primary w-6'
                        : idx < currentStep
                        ? 'bg-primary/50'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <Button
                size="sm"
                onClick={handleNext}
              >
                {isLastStep ? (
                  <>
                    Finish
                    <Check className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="w-full text-muted-foreground"
            >
              Skip Tour
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuidedTour;
