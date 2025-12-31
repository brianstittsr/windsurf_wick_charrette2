import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const OnboardingQuiz = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    ageGroup: '',
    role: '',
    primaryConcerns: [],
    currentLevel: 1,
    completedPaths: [],
    affirmations: [],
    practiceCommitments: []
  });

  const questions = [
    {
      id: 'ageGroup',
      title: 'Which age group best describes you?',
      description: 'This helps us tailor content to your needs',
      type: 'single',
      options: [
        { value: 'youth', label: 'Youth (under 18)', description: 'Student, young person' },
        { value: 'adult', label: 'Adult (18+)', description: 'Parent, professional, community member' }
      ]
    },
    {
      id: 'role',
      title: 'What is your primary role?',
      description: 'Select the role that best fits your situation',
      type: 'single',
      options: [
        { value: 'student', label: 'Student', icon: '🎓' },
        { value: 'parent', label: 'Parent/Guardian', icon: '👨‍👩‍👧' },
        { value: 'faith_leader', label: 'Faith Leader', icon: '⛪' },
        { value: 'nonprofit_staff', label: 'Nonprofit Staff', icon: '🤝' },
        { value: 'educator', label: 'Educator', icon: '👩‍🏫' },
        { value: 'social_worker', label: 'Social Worker', icon: '💼' },
        { value: 'community_organizer', label: 'Community Organizer', icon: '📢' },
        { value: 'other', label: 'Other', icon: '👤' }
      ]
    },
    {
      id: 'primaryConcerns',
      title: 'What are your primary areas of concern?',
      description: 'Select all that apply - we\'ll prioritize content for these areas',
      type: 'multiple',
      options: [
        { value: 'housing', label: 'Housing & Homelessness', icon: '🏠' },
        { value: 'education', label: 'Education & Schools', icon: '📚' },
        { value: 'mental_health', label: 'Mental Health', icon: '🧠' },
        { value: 'benefits', label: 'Benefits & Social Services', icon: '💳' },
        { value: 'justice', label: 'Justice System', icon: '⚖️' },
        { value: 'healthcare', label: 'Healthcare Access', icon: '🏥' },
        { value: 'employment', label: 'Employment', icon: '💼' },
        { value: 'food_security', label: 'Food Security', icon: '🍎' },
        { value: 'youth_development', label: 'Youth Development', icon: '🌱' },
        { value: 'family_support', label: 'Family Support', icon: '👨‍👩‍👧‍👦' }
      ]
    }
  ];

  const currentQuestion = questions[step];

  const handleSelect = (value) => {
    if (currentQuestion.type === 'single') {
      setFormData({ ...formData, [currentQuestion.id]: value });
    } else {
      const current = formData[currentQuestion.id] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      setFormData({ ...formData, [currentQuestion.id]: updated });
    }
  };

  const canProceed = () => {
    if (currentQuestion.type === 'single') {
      return formData[currentQuestion.id] !== '';
    } else {
      return (formData[currentQuestion.id] || []).length > 0;
    }
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline">Step {step + 1} of {questions.length}</Badge>
            <div className="flex space-x-1">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 w-8 rounded-full transition-colors ${
                    idx <= step ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
          <CardTitle className="text-2xl">{currentQuestion.title}</CardTitle>
          <CardDescription>{currentQuestion.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option) => {
              const isSelected = currentQuestion.type === 'single'
                ? formData[currentQuestion.id] === option.value
                : (formData[currentQuestion.id] || []).includes(option.value);

              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 hover:bg-muted'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {option.icon && <span className="text-2xl">{option.icon}</span>}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{option.label}</span>
                        {isSelected && <CheckCircle className="h-5 w-5 text-primary" />}
                      </div>
                      {option.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {option.description}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {step < questions.length - 1 ? (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Complete Setup
                  <CheckCircle className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingQuiz;
