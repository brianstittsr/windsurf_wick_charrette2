import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Brain, Sparkles, MessageCircle, Layers, RefreshCw, BookOpen } from 'lucide-react';

export default function AdvancedReframingMethods({ messages }) {
  const [selectedMethod, setSelectedMethod] = useState('cognitive-restructuring');

  const methods = {
    'cognitive-restructuring': {
      name: 'Cognitive Restructuring (CBT)',
      icon: Brain,
      color: 'purple',
      description: 'Systematic approach to identifying and changing distorted thought patterns',
      steps: [
        'Identify the automatic negative thought',
        'Examine the evidence for and against the thought',
        'Generate alternative, more balanced thoughts',
        'Evaluate the emotional impact of the new thought',
        'Practice and reinforce the new thinking pattern'
      ],
      examples: [
        {
          situation: 'Resistance to school integration plan',
          automaticThought: 'This change will destroy our community and harm our children',
          evidence: {
            for: ['Fear of unknown', 'Past experiences with change', 'Concerns about safety'],
            against: ['No evidence of harm yet', 'Other communities have succeeded', 'Children are resilient']
          },
          balancedThought: 'This change brings uncertainty, but with proper planning and support, we can create a better educational environment for all children',
          emotionalShift: 'From fear and resistance → to cautious optimism and engagement'
        },
        {
          situation: 'Conflict over resource allocation',
          automaticThought: 'They are taking away what rightfully belongs to us',
          evidence: {
            for: ['Historical inequities', 'Limited resources', 'Sense of loss'],
            against: ['Resources are being redistributed fairly', 'Everyone benefits from equity', 'New opportunities created']
          },
          balancedThought: 'While the distribution is changing, the goal is to ensure all children have access to quality education',
          emotionalShift: 'From anger and defensiveness → to understanding and cooperation'
        }
      ]
    },
    'socratic-questioning': {
      name: 'Socratic Questioning',
      icon: MessageCircle,
      color: 'blue',
      description: 'Disciplined questioning to examine assumptions and uncover deeper understanding',
      categories: [
        {
          type: 'Clarification Questions',
          purpose: 'Understand the exact meaning and reasoning',
          examples: [
            'What exactly do you mean by "our way of life"?',
            'Can you give me a specific example of what concerns you?',
            'How would you define "quality education" in this context?'
          ]
        },
        {
          type: 'Probing Assumptions',
          purpose: 'Examine underlying beliefs',
          examples: [
            'What are you assuming about how children from different backgrounds will interact?',
            'Is this assumption based on direct experience or what you\'ve heard?',
            'What would need to be true for your assumption to be valid?'
          ]
        },
        {
          type: 'Probing Reasons & Evidence',
          purpose: 'Evaluate the basis for beliefs',
          examples: [
            'What evidence do you have that supports this view?',
            'How do you know this information is reliable?',
            'Are there examples that contradict this belief?'
          ]
        },
        {
          type: 'Exploring Implications',
          purpose: 'Consider consequences',
          examples: [
            'If we follow this path, what are the likely outcomes?',
            'What are the implications for children who are currently underserved?',
            'How might this decision affect the community in 10 years?'
          ]
        },
        {
          type: 'Questioning the Question',
          purpose: 'Examine the framing itself',
          examples: [
            'Why is this question important to you?',
            'Are we asking the right question?',
            'What assumptions does this question contain?'
          ]
        },
        {
          type: 'Alternative Perspectives',
          purpose: 'Consider other viewpoints',
          examples: [
            'How might someone with a different background view this?',
            'What would a child say about this decision?',
            'How would this look from the perspective of future generations?'
          ]
        }
      ]
    },
    'nlp-reframing': {
      name: 'NLP Reframing Techniques',
      icon: RefreshCw,
      color: 'green',
      description: 'Neuro-Linguistic Programming methods to shift perception through context and content changes',
      techniques: [
        {
          name: 'Context Reframing',
          description: 'Change the context in which a behavior or event is perceived',
          principle: 'Every behavior is useful in some context',
          examples: [
            {
              original: 'Parents are being stubborn and resistant to change',
              context: 'In the context of protecting their children',
              reframed: 'Parents are demonstrating strong advocacy and protective instincts - valuable qualities we can channel toward collaborative solutions',
              shift: 'From obstacle → to asset'
            },
            {
              original: 'This community is divided and can\'t agree on anything',
              context: 'In the context of passionate engagement',
              reframed: 'This community cares deeply about education and is actively engaged - we have the energy needed for meaningful change',
              shift: 'From weakness → to strength'
            }
          ]
        },
        {
          name: 'Content Reframing',
          description: 'Change the meaning by focusing on different aspects',
          principle: 'The meaning of any event depends on the frame in which we perceive it',
          examples: [
            {
              original: 'We\'re losing our neighborhood schools',
              focus: 'From loss to gain',
              reframed: 'We\'re gaining access to enhanced resources and diverse learning environments for all children',
              shift: 'Loss frame → Gain frame'
            },
            {
              original: 'This is happening too fast',
              focus: 'From speed to readiness',
              reframed: 'We have an opportunity to be thoughtful and deliberate in our implementation',
              shift: 'Threat frame → Opportunity frame'
            }
          ]
        },
        {
          name: 'Outcome Reframing',
          description: 'Focus on desired outcomes rather than problems',
          examples: [
            {
              problem: 'We don\'t want forced integration',
              outcome: 'We want quality education and safe environments for all children',
              reframed: 'Let\'s design an integration plan that ensures quality education and safety for every child',
              shift: 'Away from → Toward'
            }
          ]
        },
        {
          name: 'Presupposition Reframing',
          description: 'Change underlying assumptions in the language',
          examples: [
            {
              original: 'If we integrate, will our children be safe?',
              presupposition: 'Integration threatens safety',
              reframed: 'How can we ensure all children are safe as we create integrated learning environments?',
              newPresupposition: 'Integration is happening, safety is achievable'
            }
          ]
        }
      ]
    },
    'six-step-reframing': {
      name: 'Six-Step Reframing',
      icon: Layers,
      color: 'orange',
      description: 'NLP technique for resolving internal conflicts and finding alternative behaviors',
      steps: [
        {
          step: 1,
          name: 'Identify the Behavior/Conflict',
          description: 'Clearly define the problematic behavior or internal conflict',
          example: 'Internal conflict: "I want to support integration (value of equality) but I\'m afraid of change (need for security)"'
        },
        {
          step: 2,
          name: 'Establish Communication',
          description: 'Acknowledge the positive intention behind the behavior',
          example: 'The fear is trying to protect my family and preserve what I value. The support for integration reflects my belief in fairness.',
          question: 'What is this part of me trying to accomplish? What positive purpose does it serve?'
        },
        {
          step: 3,
          name: 'Separate Behavior from Intention',
          description: 'Recognize that the intention is positive even if the behavior isn\'t optimal',
          example: 'The intention (protecting family, ensuring fairness) is good. The behavior (resistance vs. support) creates internal conflict.',
          insight: 'I can honor both intentions - security AND equality'
        },
        {
          step: 4,
          name: 'Generate Alternative Behaviors',
          description: 'Create new ways to achieve the positive intention',
          alternatives: [
            'Actively participate in planning to ensure safety measures are included',
            'Join parent committees to shape the integration process',
            'Advocate for resources that support both quality and equity',
            'Build relationships across communities to reduce fear of unknown'
          ]
        },
        {
          step: 5,
          name: 'Evaluate and Select',
          description: 'Choose alternatives that honor all positive intentions',
          evaluation: 'Which alternatives allow me to protect my family AND support fairness?',
          selected: 'Active participation in planning committees - gives me agency (security) while advancing equity (values)'
        },
        {
          step: 6,
          name: 'Ecological Check',
          description: 'Ensure the new behavior doesn\'t create other problems',
          questions: [
            'Does this solution respect all parts of myself?',
            'Will this work in my daily life?',
            'Does this align with my long-term values?',
            'How will this affect my relationships?'
          ],
          result: 'Yes - active participation honors both security needs and equality values, is practical, and builds community'
        }
      ],
      application: {
        title: 'Applying Six-Step Reframing in Group Settings',
        process: [
          'Identify the group\'s internal conflict (e.g., change vs. stability)',
          'Acknowledge positive intentions on all sides',
          'Separate positions (what people say they want) from intentions (why they want it)',
          'Collaboratively generate alternatives that honor all intentions',
          'Evaluate options against all stakeholder needs',
          'Check for unintended consequences before implementing'
        ]
      }
    },
    'discourse-analysis': {
      name: 'Discourse & Narrative Analysis',
      icon: BookOpen,
      color: 'indigo',
      description: 'Analyzing underlying structures, power dynamics, and narratives that shape meaning',
      dimensions: [
        {
          name: 'Narrative Structure Analysis',
          description: 'Examining the stories people tell and how they frame events',
          elements: [
            {
              element: 'Hero/Villain Narrative',
              original: '"We are the victims of an unjust system forcing change upon us"',
              analysis: 'Positions speaker as victim, system as villain, change as threat',
              reframe: '"We are advocates shaping a system to serve all children better"',
              newNarrative: 'Positions speaker as hero, system as tool, change as opportunity'
            },
            {
              element: 'Tragedy vs. Triumph',
              original: '"This is the end of our community as we know it"',
              analysis: 'Tragedy narrative - loss, endings, decline',
              reframe: '"This is the evolution of our community into something more inclusive"',
              newNarrative: 'Transformation narrative - growth, beginnings, progress'
            },
            {
              element: 'Conflict vs. Collaboration',
              original: '"It\'s a battle between those who care about quality and those who don\'t"',
              analysis: 'Zero-sum conflict narrative',
              reframe: '"It\'s a collaboration between people who all care about quality, working to define it together"',
              newNarrative: 'Positive-sum collaboration narrative'
            }
          ]
        },
        {
          name: 'Power & Identity Analysis',
          description: 'Understanding how language constructs power relationships and identities',
          aspects: [
            {
              aspect: 'Identity Construction',
              original: '"We are the taxpayers who built these schools"',
              analysis: 'Identity based on ownership and historical contribution',
              powerDynamic: 'Establishes hierarchy - "we" have more right than "they"',
              reframe: '"We are all stakeholders invested in our children\'s future"',
              newIdentity: 'Shared identity based on common interest and future orientation',
              newPower: 'Equalizes stakeholders, shifts from past to future'
            },
            {
              aspect: 'Agency & Responsibility',
              original: '"They are forcing this on us" (passive voice)',
              analysis: 'Speaker positioned as passive recipient without agency',
              reframe: '"We are choosing how to implement this" (active voice)',
              newAgency: 'Speaker positioned as active decision-maker with power'
            }
          ]
        },
        {
          name: 'Metaphor & Frame Analysis',
          description: 'Identifying conceptual metaphors that structure understanding',
          metaphors: [
            {
              metaphor: 'CHANGE IS A THREAT',
              language: '"invasion," "attack," "defend," "protect"',
              implications: 'Activates fear, resistance, defensive postures',
              alternative: 'CHANGE IS GROWTH',
              newLanguage: '"evolve," "develop," "expand," "flourish"',
              newImplications: 'Activates curiosity, openness, developmental mindset'
            },
            {
              metaphor: 'COMMUNITY IS A CONTAINER',
              language: '"our boundaries," "outsiders," "letting them in"',
              implications: 'Creates in-group/out-group divisions',
              alternative: 'COMMUNITY IS A NETWORK',
              newLanguage: '"connections," "relationships," "expanding our circle"',
              newImplications: 'Emphasizes relationships over boundaries'
            },
            {
              metaphor: 'EDUCATION IS A COMMODITY',
              language: '"getting my share," "taking from us," "limited resources"',
              implications: 'Zero-sum thinking, competition',
              alternative: 'EDUCATION IS A GARDEN',
              newLanguage: '"cultivating potential," "nurturing growth," "enriching soil"',
              newImplications: 'Abundance thinking, collaboration'
            }
          ]
        },
        {
          name: 'Temporal Framing',
          description: 'How past, present, and future are constructed in discourse',
          frames: [
            {
              orientation: 'Past-Focused',
              language: '"We\'ve always done it this way," "Back when things were better"',
              effect: 'Nostalgia, resistance to change, idealization of past',
              reframe: 'Future-Focused',
              newLanguage: '"What do we want for our children\'s future?" "How can we build on our strengths?"',
              newEffect: 'Hope, openness to change, forward momentum'
            }
          ]
        }
      ]
    }
  };

  const currentMethod = methods[selectedMethod];
  const Icon = currentMethod.icon;

  return (
    <div className="space-y-6">
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <CardTitle>Advanced Reframing Methods</CardTitle>
          </div>
          <CardDescription>
            Beyond basic reframing: Cognitive Restructuring, Socratic Questioning, NLP, Discourse Analysis, and Six-Step Reframing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(methods).map(([key, method]) => {
              const MethodIcon = method.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedMethod(key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                    selectedMethod === key
                      ? `border-${method.color}-500 bg-${method.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <MethodIcon className={`h-4 w-4 text-${method.color}-600`} />
                  <span className="text-sm font-medium">{method.name}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Method Details */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Icon className={`h-5 w-5 text-${currentMethod.color}-600`} />
            <CardTitle>{currentMethod.name}</CardTitle>
          </div>
          <CardDescription>{currentMethod.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Cognitive Restructuring */}
          {selectedMethod === 'cognitive-restructuring' && (
            <>
              <div>
                <h4 className="font-semibold mb-3">Five-Step Process:</h4>
                <ol className="space-y-2">
                  {currentMethod.steps.map((step, i) => (
                    <li key={i} className="flex items-start">
                      <Badge variant="outline" className="mr-2 mt-0.5">{i + 1}</Badge>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Applied Examples:</h4>
                {currentMethod.examples.map((ex, i) => (
                  <Card key={i} className="mb-4 bg-purple-50 border-purple-200">
                    <CardContent className="pt-4 space-y-3">
                      <div>
                        <p className="text-xs font-medium text-purple-900">Situation:</p>
                        <p className="text-sm">{ex.situation}</p>
                      </div>
                      <div className="bg-red-50 p-3 rounded border border-red-200">
                        <p className="text-xs font-medium text-red-900">Automatic Thought:</p>
                        <p className="text-sm italic">"{ex.automaticThought}"</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-2 rounded border">
                          <p className="text-xs font-medium">Evidence FOR:</p>
                          <ul className="text-xs space-y-1 mt-1">
                            {ex.evidence.for.map((e, j) => (
                              <li key={j}>• {e}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-white p-2 rounded border">
                          <p className="text-xs font-medium">Evidence AGAINST:</p>
                          <ul className="text-xs space-y-1 mt-1">
                            {ex.evidence.against.map((e, j) => (
                              <li key={j}>• {e}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="bg-green-50 p-3 rounded border border-green-200">
                        <p className="text-xs font-medium text-green-900">Balanced Thought:</p>
                        <p className="text-sm italic">"{ex.balancedThought}"</p>
                      </div>
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="text-xs"><strong>Emotional Shift:</strong> {ex.emotionalShift}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Socratic Questioning */}
          {selectedMethod === 'socratic-questioning' && (
            <div className="space-y-4">
              {currentMethod.categories.map((cat, i) => (
                <Card key={i} className="bg-blue-50 border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{cat.type}</CardTitle>
                    <CardDescription className="text-xs">{cat.purpose}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {cat.examples.map((ex, j) => (
                        <li key={j} className="text-sm bg-white p-2 rounded border">
                          "{ex}"
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* NLP Reframing */}
          {selectedMethod === 'nlp-reframing' && (
            <div className="space-y-4">
              {currentMethod.techniques.map((tech, i) => (
                <Card key={i} className="bg-green-50 border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{tech.name}</CardTitle>
                    <CardDescription className="text-xs">{tech.description}</CardDescription>
                    {tech.principle && (
                      <Badge variant="outline" className="mt-2 text-xs">
                        Principle: {tech.principle}
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {tech.examples.map((ex, j) => (
                      <div key={j} className="bg-white p-3 rounded border space-y-2">
                        <div>
                          <p className="text-xs font-medium text-red-700">Original:</p>
                          <p className="text-sm italic">"{ex.original}"</p>
                        </div>
                        {ex.context && (
                          <div>
                            <p className="text-xs font-medium text-blue-700">Context:</p>
                            <p className="text-sm">{ex.context}</p>
                          </div>
                        )}
                        {ex.focus && (
                          <div>
                            <p className="text-xs font-medium text-blue-700">Focus Shift:</p>
                            <p className="text-sm">{ex.focus}</p>
                          </div>
                        )}
                        {ex.problem && (
                          <div>
                            <p className="text-xs font-medium text-red-700">Problem Focus:</p>
                            <p className="text-sm">"{ex.problem}"</p>
                          </div>
                        )}
                        {ex.outcome && (
                          <div>
                            <p className="text-xs font-medium text-blue-700">Outcome Focus:</p>
                            <p className="text-sm">"{ex.outcome}"</p>
                          </div>
                        )}
                        {ex.presupposition && (
                          <div>
                            <p className="text-xs font-medium text-orange-700">Old Presupposition:</p>
                            <p className="text-sm">{ex.presupposition}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-medium text-green-700">Reframed:</p>
                          <p className="text-sm italic font-medium">"{ex.reframed}"</p>
                        </div>
                        {ex.newPresupposition && (
                          <div>
                            <p className="text-xs font-medium text-green-700">New Presupposition:</p>
                            <p className="text-sm">{ex.newPresupposition}</p>
                          </div>
                        )}
                        <div className="pt-2 border-t">
                          <p className="text-xs text-muted-foreground">
                            <strong>Shift:</strong> {ex.shift}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Six-Step Reframing */}
          {selectedMethod === 'six-step-reframing' && (
            <>
              <div className="space-y-3">
                {currentMethod.steps.map((step) => (
                  <Card key={step.step} className="bg-orange-50 border-orange-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-orange-600">{step.step}</Badge>
                        <CardTitle className="text-base">{step.name}</CardTitle>
                      </div>
                      <CardDescription className="text-xs">{step.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {step.example && (
                        <div className="bg-white p-2 rounded border text-sm">
                          <strong>Example:</strong> {step.example}
                        </div>
                      )}
                      {step.question && (
                        <div className="bg-blue-50 p-2 rounded text-sm italic">
                          "{step.question}"
                        </div>
                      )}
                      {step.insight && (
                        <div className="bg-green-50 p-2 rounded text-sm">
                          <strong>Insight:</strong> {step.insight}
                        </div>
                      )}
                      {step.alternatives && (
                        <div>
                          <p className="text-xs font-medium mb-1">Alternative Behaviors:</p>
                          <ul className="text-xs space-y-1">
                            {step.alternatives.map((alt, i) => (
                              <li key={i} className="bg-white p-2 rounded border">• {alt}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {step.evaluation && (
                        <div className="bg-purple-50 p-2 rounded text-sm">
                          <strong>Evaluation:</strong> {step.evaluation}
                        </div>
                      )}
                      {step.selected && (
                        <div className="bg-green-100 p-2 rounded text-sm font-medium">
                          ✓ Selected: {step.selected}
                        </div>
                      )}
                      {step.questions && (
                        <div>
                          <p className="text-xs font-medium mb-1">Check Questions:</p>
                          <ul className="text-xs space-y-1">
                            {step.questions.map((q, i) => (
                              <li key={i} className="bg-white p-2 rounded border">• {q}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {step.result && (
                        <div className="bg-green-50 p-2 rounded text-sm">
                          <strong>Result:</strong> {step.result}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-300">
                <CardHeader>
                  <CardTitle className="text-base">{currentMethod.application.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2">
                    {currentMethod.application.process.map((step, i) => (
                      <li key={i} className="flex items-start">
                        <Badge variant="outline" className="mr-2 mt-0.5">{i + 1}</Badge>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </>
          )}

          {/* Discourse Analysis */}
          {selectedMethod === 'discourse-analysis' && (
            <div className="space-y-4">
              {currentMethod.dimensions.map((dim, i) => (
                <Card key={i} className="bg-indigo-50 border-indigo-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{dim.name}</CardTitle>
                    <CardDescription className="text-xs">{dim.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {dim.elements && dim.elements.map((el, j) => (
                      <div key={j} className="bg-white p-3 rounded border space-y-2">
                        <Badge variant="outline">{el.element}</Badge>
                        <div className="space-y-2 text-sm">
                          <div className="bg-red-50 p-2 rounded">
                            <p className="text-xs font-medium text-red-900">Original:</p>
                            <p className="italic">"{el.original}"</p>
                            <p className="text-xs text-red-700 mt-1">Analysis: {el.analysis}</p>
                          </div>
                          <div className="bg-green-50 p-2 rounded">
                            <p className="text-xs font-medium text-green-900">Reframed:</p>
                            <p className="italic font-medium">"{el.reframe}"</p>
                            <p className="text-xs text-green-700 mt-1">New Narrative: {el.newNarrative}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {dim.aspects && dim.aspects.map((asp, j) => (
                      <div key={j} className="bg-white p-3 rounded border space-y-2">
                        <Badge variant="outline">{asp.aspect}</Badge>
                        <div className="space-y-2 text-sm">
                          <div className="bg-red-50 p-2 rounded">
                            <p className="text-xs font-medium">Original: "{asp.original}"</p>
                            <p className="text-xs mt-1">Analysis: {asp.analysis}</p>
                            <p className="text-xs mt-1">Power Dynamic: {asp.powerDynamic}</p>
                          </div>
                          <div className="bg-green-50 p-2 rounded">
                            <p className="text-xs font-medium">Reframed: "{asp.reframe}"</p>
                            <p className="text-xs mt-1">New Identity: {asp.newIdentity}</p>
                            <p className="text-xs mt-1">New Power: {asp.newPower}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {dim.metaphors && dim.metaphors.map((met, j) => (
                      <div key={j} className="bg-white p-3 rounded border space-y-2">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-red-50 p-2 rounded">
                            <Badge variant="destructive" className="mb-2">{met.metaphor}</Badge>
                            <p className="text-xs"><strong>Language:</strong> {met.language}</p>
                            <p className="text-xs mt-1"><strong>Implications:</strong> {met.implications}</p>
                          </div>
                          <div className="bg-green-50 p-2 rounded">
                            <Badge className="mb-2 bg-green-600">{met.alternative}</Badge>
                            <p className="text-xs"><strong>Language:</strong> {met.newLanguage}</p>
                            <p className="text-xs mt-1"><strong>Implications:</strong> {met.newImplications}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {dim.frames && dim.frames.map((frame, j) => (
                      <div key={j} className="bg-white p-3 rounded border space-y-2">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-50 p-2 rounded">
                            <p className="text-xs font-medium">{frame.orientation}</p>
                            <p className="text-xs italic mt-1">"{frame.language}"</p>
                            <p className="text-xs mt-1"><strong>Effect:</strong> {frame.effect}</p>
                          </div>
                          <div className="bg-blue-50 p-2 rounded">
                            <p className="text-xs font-medium">{frame.reframe}</p>
                            <p className="text-xs italic mt-1">"{frame.newLanguage}"</p>
                            <p className="text-xs mt-1"><strong>Effect:</strong> {frame.newEffect}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
