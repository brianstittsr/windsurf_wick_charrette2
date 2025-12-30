import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle, Circle, ArrowRight, ArrowLeft, X, Sparkles, Loader2 } from 'lucide-react';

export default function CharetteCreationWizard({ onClose, onCreate }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scope: '',
    stakeholders: '',
    objectives: '',
    constraints: '',
    timeframe: '',
    desiredOutcomes: '',
    breakoutRoomTime: 15
  });
  const [enhancingField, setEnhancingField] = useState(null);

  const steps = [
    {
      id: 0,
      title: 'Topic Definition',
      description: "Hello! I'm Bill Riddick, your Charette Facilitator. Let's start by clearly defining the topic.",
      fields: [
        {
          name: 'title',
          label: 'Charette Title',
          placeholder: 'e.g., "Urban redevelopment of downtown area", "Sustainable energy transition"',
          required: true,
          type: 'text'
        },
        {
          name: 'description',
          label: 'Brief Description',
          placeholder: 'Brief overview of the charette purpose and goals',
          required: true,
          type: 'textarea',
          rows: 3
        }
      ]
    },
    {
      id: 1,
      title: 'Context & Scope',
      description: "Let's understand the scope and current situation around this topic.",
      fields: [
        {
          name: 'scope',
          label: 'Scope & Context',
          placeholder: 'e.g., "Affects 50,000 residents, budget of $25M, timeline of 2 years"',
          required: true,
          type: 'textarea',
          rows: 3
        },
        {
          name: 'timeframe',
          label: 'Timeframe',
          placeholder: 'e.g., "Decision by Q2 2025, implementation starting Q3 2025"',
          required: false,
          type: 'text'
        }
      ]
    },
    {
      id: 2,
      title: 'Key Stakeholders',
      description: 'Who are the primary stakeholders involved in this charette?',
      fields: [
        {
          name: 'stakeholders',
          label: 'Stakeholders',
          placeholder: 'e.g., "Local residents, city government, developers, environmental groups"',
          required: true,
          type: 'textarea',
          rows: 3
        }
      ]
    },
    {
      id: 3,
      title: 'Objectives',
      description: 'What are the main objectives for this charette session?',
      fields: [
        {
          name: 'objectives',
          label: 'Primary Objectives',
          placeholder: 'e.g., "Develop consensus on priorities, identify feasible solutions"',
          required: true,
          type: 'textarea',
          rows: 3
        }
      ]
    },
    {
      id: 4,
      title: 'Constraints',
      description: 'What are the key constraints or limitations to consider?',
      fields: [
        {
          name: 'constraints',
          label: 'Known Constraints',
          placeholder: 'e.g., "Budget limit of $10M, must comply with zoning laws"',
          required: false,
          type: 'textarea',
          rows: 3
        }
      ]
    },
    {
      id: 5,
      title: 'Breakout Settings',
      description: 'Configure the breakout room discussion time.',
      fields: [
        {
          name: 'breakoutRoomTime',
          label: 'Breakout Room Discussion Time',
          placeholder: 'Select duration',
          required: true,
          type: 'select',
          options: [
            { value: 10, label: '10 minutes' },
            { value: 15, label: '15 minutes' },
            { value: 20, label: '20 minutes' },
            { value: 25, label: '25 minutes' },
            { value: 30, label: '30 minutes' },
            { value: 45, label: '45 minutes' },
            { value: 60, label: '60 minutes' }
          ]
        }
      ]
    },
    {
      id: 6,
      title: 'Desired Outcomes',
      description: 'What specific outcomes do you want from this charette?',
      fields: [
        {
          name: 'desiredOutcomes',
          label: 'Desired Outcomes',
          placeholder: 'e.g., "Prioritized action plan, detailed implementation strategy"',
          required: true,
          type: 'textarea',
          rows: 3
        }
      ]
    }
  ];

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleEnhanceWithAI = async (fieldName, fieldLabel) => {
    setEnhancingField(fieldName);
    try {
      const currentValue = formData[fieldName];
      const context = {
        fieldName,
        fieldLabel,
        currentValue,
        allData: formData
      };

      // Call AI enhancement API
      const response = await fetch('/api/ai/enhance-field', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(context)
      });

      if (response.ok) {
        const result = await response.json();
        handleFieldChange(fieldName, result.enhancedValue);
      } else {
        // Fallback to mock enhancement
        const enhanced = await mockEnhanceField(fieldName, fieldLabel, currentValue);
        handleFieldChange(fieldName, enhanced);
      }
    } catch (error) {
      console.error('AI enhancement error:', error);
      // Use mock enhancement as fallback
      const enhanced = await mockEnhanceField(fieldName, fieldLabel, formData[fieldName]);
      handleFieldChange(fieldName, enhanced);
    } finally {
      setEnhancingField(null);
    }
  };

  const mockEnhanceField = async (fieldName, fieldLabel, currentValue) => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const enhancements = {
      title: currentValue || 'Collaborative Planning Session for [Topic]',
      description: currentValue || 'A structured collaborative session bringing together diverse stakeholders to address [challenge/opportunity]. Through facilitated dialogue and evidence-based analysis, participants will work together to develop actionable solutions that serve the needs of all stakeholders.',
      scope: currentValue || 'This charette will focus on [primary topic area], including [key aspects]. Out of scope: [excluded items]. Geographic focus: [location/region]. Timeline: [duration].',
      stakeholders: currentValue || 'Key stakeholders include:\n• Community members and residents\n• Local government representatives\n• Subject matter experts\n• Affected organizations\n• Implementation partners\n• Advisory board members',
      objectives: currentValue || 'Primary objectives:\n1. Build shared understanding of the challenge and opportunities\n2. Identify constraints and assumptions that need addressing\n3. Generate innovative, evidence-based solutions\n4. Develop actionable implementation roadmap\n5. Establish accountability and next steps',
      constraints: currentValue || 'Known constraints:\n• Budget: [amount/limitations]\n• Timeline: [deadlines/milestones]\n• Regulatory: [compliance requirements]\n• Resources: [available capacity]\n• Political/Social: [stakeholder considerations]',
      timeframe: currentValue || '6-month planning and implementation cycle with quarterly milestones',
      desiredOutcomes: currentValue || 'Success will be measured by:\n• Stakeholder alignment and buy-in (>80% satisfaction)\n• Actionable solutions with clear ownership\n• Implementation plan with defined milestones\n• Sustainable framework for ongoing collaboration\n• Measurable progress toward stated objectives'
    };

    return enhancements[fieldName] || currentValue;
  };

  const isStepValid = () => {
    const currentStepFields = steps[currentStep].fields;
    return currentStepFields.every(field => {
      if (field.required) {
        return formData[field.name] && formData[field.name].trim() !== '';
      }
      return true;
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreate = () => {
    if (onCreate) {
      onCreate(formData);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle className="text-2xl">Create New Charette</CardTitle>
              <CardDescription>Step-by-step setup for your collaborative session</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-between mt-6">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      index < currentStep
                        ? 'bg-green-500 border-green-500 text-white'
                        : index === currentStep
                        ? 'bg-primary border-primary text-white'
                        : 'bg-muted border-muted-foreground/30 text-muted-foreground'
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </div>
                  <div className="mt-2 text-center max-w-[100px]">
                    <p
                      className={`text-xs font-medium ${
                        index === currentStep ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-all ${
                      index < currentStep ? 'bg-green-500' : 'bg-muted-foreground/30'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Step Header */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900">{currentStepData.title}</h3>
            <p className="text-sm text-blue-700 mt-1">{currentStepData.description}</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {currentStepData.fields.map((field) => (
              <div key={field.name}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {field.type !== 'select' && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleEnhanceWithAI(field.name, field.label)}
                      disabled={enhancingField === field.name}
                      className="text-purple-600 border-purple-300 hover:bg-purple-50"
                    >
                      {enhancingField === field.name ? (
                        <>
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          Enhancing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3 w-3 mr-1" />
                          Enhance with AI
                        </>
                      )}
                    </Button>
                  )}
                </div>
                {field.type === 'select' ? (
                  <select
                    value={formData[field.name]}
                    onChange={(e) => handleFieldChange(field.name, parseInt(e.target.value))}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required={field.required}
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.name]}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    rows={field.rows || 3}
                    className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    required={field.required}
                  />
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.name]}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Help Text */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-900">
              <strong>💡 Tip:</strong>{' '}
              {currentStep === 0 && 'Give your charette a clear, descriptive title that captures the main topic.'}
              {currentStep === 1 && 'Define what is in scope and out of scope to keep discussions focused.'}
              {currentStep === 2 && 'Identify all key stakeholders early to ensure comprehensive representation.'}
              {currentStep === 3 && 'Be realistic about constraints and specific about what success looks like.'}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-6">
          <div>
            {currentStep > 0 && (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext} disabled={!isStepValid()}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleCreate} disabled={!isStepValid()} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Create Charette
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
