import React, { useState } from 'react';
import { 
  MessageSquare, Users, Brain, FileText, Heart, TrendingUp, 
  CheckCircle, ArrowRight, Zap, Shield, Globe, Award,
  ChevronRight, Play, Star, BarChart3, Clock, Target,
  Lightbulb, Network, Database, Settings, ArrowLeft,
  Download, Video, BookOpen, Workflow
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import DemoRequestModal from './DemoRequestModal';

const ProductsPage = ({ onBack, onRequestDemo }) => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeProduct, setActiveProduct] = useState('charette');

  const products = {
    charette: {
      id: 'charette-system',
      name: 'Charette Collaboration Platform',
      tagline: 'Transform group decision-making with structured facilitation',
      icon: MessageSquare,
      color: 'from-blue-500 to-indigo-600',
      description: 'A comprehensive platform for guiding groups through structured decision-making processes with real-time collaboration, AI-powered analysis, and automated reporting.',
      
      problemStatement: {
        title: 'The Challenge',
        description: 'Traditional group decision-making is inefficient, time-consuming, and often fails to capture all stakeholder perspectives. Meetings drag on, quieter voices get lost, and documentation is a nightmare.',
        painPoints: [
          'Endless meetings that accomplish little',
          'Dominant voices overshadow important perspectives',
          'Poor documentation and follow-through',
          'Difficulty managing complex stakeholder groups',
          'No clear process for moving from discussion to decision'
        ]
      },

      solution: {
        title: 'Our Solution',
        description: 'The Charette Platform provides a structured, AI-enhanced framework that guides groups through six proven phases of collaborative decision-making, ensuring every voice is heard and every decision is documented.',
        benefits: [
          'Reduce meeting time by 60% with asynchronous collaboration',
          'Increase participant engagement with parallel breakout discussions',
          'Make better decisions with AI-powered constraint identification',
          'Save hours on report writing with automated documentation',
          'Ensure all voices are heard with structured participation'
        ]
      },

      userJourney: [
        {
          phase: 'Setup & Introduction',
          icon: Users,
          duration: '15 minutes',
          description: 'Create your charette session, define objectives, and invite stakeholders',
          steps: [
            'Use our guided wizard to set up your session in minutes',
            'Define scope, objectives, and desired outcomes',
            'Invite participants via email with role assignments',
            'System automatically creates structured workspace'
          ],
          outcome: 'Everyone knows the goals and their role'
        },
        {
          phase: 'Data Collection',
          icon: Database,
          duration: '1-2 days',
          description: 'Gather information, upload documents, and share context asynchronously',
          steps: [
            'Participants upload relevant documents and data',
            'AI analyzes documents for key themes and constraints',
            'Stakeholders share perspectives in structured prompts',
            'System organizes information by topic and relevance'
          ],
          outcome: 'Comprehensive information base ready for analysis'
        },
        {
          phase: 'Parallel Ideation',
          icon: Lightbulb,
          duration: '2-3 hours',
          description: 'Generate ideas simultaneously in focused breakout rooms',
          steps: [
            'System creates breakout rooms based on key questions',
            'Participants join rooms aligned with their expertise',
            'Real-time brainstorming with AI-powered prompts',
            'Ideas automatically tagged and categorized'
          ],
          outcome: 'Diverse ideas from all stakeholder perspectives'
        },
        {
          phase: 'AI Analysis',
          icon: Brain,
          duration: '5 minutes',
          description: 'Automated analysis identifies patterns, constraints, and opportunities',
          steps: [
            'AI analyzes all discussions for common themes',
            'Identifies constraints vs. opportunities',
            'Detects cognitive biases and reframes issues',
            'Generates synthesis report with recommendations'
          ],
          outcome: 'Clear understanding of options and trade-offs'
        },
        {
          phase: 'Synthesis & Decision',
          icon: Target,
          duration: '1-2 hours',
          description: 'Review findings, discuss trade-offs, and make informed decisions',
          steps: [
            'Review AI-generated synthesis report together',
            'Discuss identified constraints and opportunities',
            'Vote on options with weighted preferences',
            'Document final decisions with rationale'
          ],
          outcome: 'Consensus decision with clear rationale'
        },
        {
          phase: 'Reporting & Action',
          icon: FileText,
          duration: '10 minutes',
          description: 'Generate comprehensive reports and action plans automatically',
          steps: [
            'System generates detailed session report',
            'Creates presentation-ready summary slides',
            'Produces action items with assignments',
            'Exports in multiple formats (PDF, DOCX, slides)'
          ],
          outcome: 'Professional documentation ready to share'
        }
      ],

      keyFeatures: [
        {
          title: 'Real-Time Collaboration',
          icon: MessageSquare,
          description: 'Chat-based interface with breakout rooms for parallel discussions',
          screenshot: 'charette-chat.png',
          benefits: ['Engage multiple groups simultaneously', 'Reduce meeting time', 'Capture all perspectives']
        },
        {
          title: 'AI-Powered Analysis',
          icon: Brain,
          description: 'Advanced reasoning algorithms identify constraints, patterns, and opportunities',
          screenshot: 'charette-ai.png',
          benefits: ['Automatic theme detection', 'Bias identification', 'Constraint mapping']
        },
        {
          title: 'Structured Workflow',
          icon: Workflow,
          description: 'Six-phase process guides groups from problem to solution',
          screenshot: 'charette-workflow.png',
          benefits: ['Clear process', 'Progress tracking', 'Phase-based facilitation']
        },
        {
          title: 'Automated Reporting',
          icon: FileText,
          description: 'Generate comprehensive reports and presentations automatically',
          screenshot: 'charette-reports.png',
          benefits: ['Save hours of work', 'Professional output', 'Multiple formats']
        }
      ],

      useCases: [
        {
          title: 'Urban Planning',
          description: 'Engage community stakeholders in development decisions',
          results: '60% faster consensus, 85% stakeholder satisfaction'
        },
        {
          title: 'Strategic Planning',
          description: 'Guide leadership teams through organizational strategy',
          results: 'Reduced planning time from weeks to days'
        },
        {
          title: 'Policy Development',
          description: 'Facilitate multi-stakeholder policy creation',
          results: 'Comprehensive documentation, all voices heard'
        }
      ],

      pricing: {
        starter: { price: '$99', period: 'month', users: '10', sessions: '5' },
        professional: { price: '$299', period: 'month', users: '50', sessions: 'Unlimited' },
        enterprise: { price: 'Custom', period: '', users: 'Unlimited', sessions: 'Unlimited' }
      }
    },

    advocacy: {
      id: 'advocacy-module',
      name: 'Servant Advocacy & Peer Support',
      tagline: 'Empower communities with strength-based advocacy tools',
      icon: Heart,
      color: 'from-pink-500 to-purple-600',
      description: 'A comprehensive module designed to teach, coach, and respond to community needs in real-time, while surfacing where governmental and institutional constraints create gaps.',

      problemStatement: {
        title: 'The Challenge',
        description: 'Community advocates and support workers often lack structured tools to develop skills, practice scenarios, and distinguish between individual support and systemic advocacy needs.',
        painPoints: [
          'Limited training resources for advocacy skills',
          'Difficulty identifying systemic vs. individual issues',
          'Burnout from trying to solve unsolvable problems',
          'No clear pathway from story to strategy',
          'Isolated workers without peer support'
        ]
      },

      solution: {
        title: 'Our Solution',
        description: 'The Advocacy Module provides interactive learning paths, practice scenarios, and tools that help advocates build skills, support peers, and create data-driven advocacy briefs that drive policy change.',
        benefits: [
          'Build advocacy skills through interactive practice',
          'Identify systemic barriers vs. individual actions',
          'Create data-driven advocacy briefs in minutes',
          'Develop servant leadership competencies',
          'Connect community needs to actionable solutions',
          'Practice peer support with real-time feedback'
        ]
      },

      userJourney: [
        {
          phase: 'Learning & Development',
          icon: BookOpen,
          duration: 'Ongoing',
          description: 'Build advocacy skills through interactive micro-lessons',
          steps: [
            'Complete self-paced learning journeys',
            'Practice active listening and reframing',
            'Learn constraint-based thinking',
            'Earn badges for skill development'
          ],
          outcome: 'Strong foundation in advocacy principles'
        },
        {
          phase: 'Scenario Practice',
          icon: Zap,
          duration: '15-30 minutes',
          description: 'Practice real-world scenarios in a safe environment',
          steps: [
            'Choose scenarios matching your work context',
            'Interact with AI-powered scenario engine',
            'Receive real-time feedback on responses',
            'Learn to distinguish individual vs. systemic issues'
          ],
          outcome: 'Confidence in handling complex situations'
        },
        {
          phase: 'Peer Support',
          icon: Users,
          duration: 'As needed',
          description: 'Give and receive support from fellow advocates',
          steps: [
            'Use Affirmation Builder to encourage peers',
            'Set accountability goals with Accountability Coach',
            'Share challenges and solutions',
            'Build supportive community network'
          ],
          outcome: 'Strong peer support network'
        },
        {
          phase: 'Community Mapping',
          icon: Globe,
          duration: '1-2 hours',
          description: 'Identify and map community needs and gaps',
          steps: [
            'Document community needs as they arise',
            'System maps needs to constraint categories',
            'Visualize patterns with heatmaps',
            'Identify systemic gaps requiring advocacy'
          ],
          outcome: 'Clear picture of community needs'
        },
        {
          phase: 'Advocacy Brief Creation',
          icon: FileText,
          duration: '30 minutes',
          description: 'Transform stories into strategic advocacy documents',
          steps: [
            'Input community stories and data',
            'AI identifies systemic patterns',
            'Generate professional advocacy brief',
            'Include data, stories, and recommendations'
          ],
          outcome: 'Compelling advocacy brief ready to share'
        },
        {
          phase: 'Leadership Development',
          icon: Award,
          duration: 'Ongoing',
          description: 'Grow servant leadership capabilities',
          steps: [
            'Complete leadership assessments',
            'Track growth in key competencies',
            'Access curated resources and tools',
            'Reflect on leadership journey'
          ],
          outcome: 'Developed servant leadership skills'
        }
      ],

      keyFeatures: [
        {
          title: 'Interactive Learning Paths',
          icon: BookOpen,
          description: '20+ micro-lessons teaching advocacy and servant leadership',
          screenshot: 'advocacy-learning.png',
          benefits: ['Self-paced learning', 'Practical skills', 'Immediate application']
        },
        {
          title: 'Scenario Practice Engine',
          icon: Zap,
          description: '50+ realistic scenarios with AI-powered feedback',
          screenshot: 'advocacy-scenarios.png',
          benefits: ['Safe practice space', 'Real-time feedback', 'Skill building']
        },
        {
          title: 'Advocacy Brief Builder',
          icon: FileText,
          description: 'Transform stories into strategic advocacy documents',
          screenshot: 'advocacy-briefs.png',
          benefits: ['Story to strategy', 'Data-driven', 'Professional output']
        },
        {
          title: 'Community Needs Mapping',
          icon: Globe,
          description: 'Visualize patterns and identify systemic gaps',
          screenshot: 'advocacy-mapping.png',
          benefits: ['Pattern recognition', 'Gap identification', 'Strategic focus']
        }
      ],

      useCases: [
        {
          title: 'Nonprofit Training',
          description: 'Develop staff advocacy and leadership skills',
          results: '4.9/5 user satisfaction, measurable skill growth'
        },
        {
          title: 'Community Organizing',
          description: 'Build grassroots advocacy campaigns',
          results: 'Data-driven briefs leading to policy changes'
        },
        {
          title: 'Faith-Based Support',
          description: 'Equip faith leaders with advocacy tools',
          results: 'Stronger community connections, reduced burnout'
        }
      ],

      pricing: {
        starter: { price: '$49', period: 'month', users: '5', features: 'Core' },
        professional: { price: '$149', period: 'month', users: '25', features: 'Full' },
        enterprise: { price: 'Custom', period: '', users: 'Unlimited', features: 'Custom' }
      }
    }
  };

  const currentProduct = products[activeProduct];

  const handleRequestDemo = (product) => {
    setSelectedProduct(product);
    setShowDemoModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      {onBack && (
        <header className="border-b bg-card sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <Button onClick={() => handleRequestDemo(currentProduct)}>
                Request Demo
              </Button>
            </div>
          </div>
        </header>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-b">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 text-lg px-4 py-2">
              <Star className="h-4 w-4 mr-2 inline" />
              Our Products
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Powerful Tools for Collaboration & Advocacy
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Explore our comprehensive platforms designed to transform how you work with communities and stakeholders
            </p>
          </div>
        </div>
      </section>

      {/* Product Selector */}
      <section className="py-8 bg-background border-b sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              variant={activeProduct === 'charette' ? 'default' : 'outline'}
              onClick={() => setActiveProduct('charette')}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              Charette Platform
            </Button>
            <Button
              size="lg"
              variant={activeProduct === 'advocacy' ? 'default' : 'outline'}
              onClick={() => setActiveProduct('advocacy')}
              className="flex items-center gap-2"
            >
              <Heart className="h-5 w-5" />
              Advocacy Module
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="border-2 border-red-200 bg-red-50/50">
                <CardHeader>
                  <CardTitle className="text-3xl text-red-900">
                    {currentProduct.problemStatement.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-6 text-red-800">
                    {currentProduct.problemStatement.description}
                  </p>
                  <h4 className="font-semibold mb-3 text-red-900">Common Pain Points:</h4>
                  <ul className="space-y-2">
                    {currentProduct.problemStatement.painPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-red-800">
                        <span className="text-red-500 mt-1">✗</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-green-50/50">
                <CardHeader>
                  <CardTitle className="text-3xl text-green-900">
                    {currentProduct.solution.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-6 text-green-800">
                    {currentProduct.solution.description}
                  </p>
                  <h4 className="font-semibold mb-3 text-green-900">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {currentProduct.solution.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-green-800">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* User Journey */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Your Journey to Success</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how {currentProduct.name} guides you from challenge to solution
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {currentProduct.userJourney.map((phase, idx) => {
              const Icon = phase.icon;
              return (
                <Card key={idx} className="overflow-hidden hover:shadow-xl transition-all">
                  <div className={`h-2 bg-gradient-to-r ${currentProduct.color}`}></div>
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-shrink-0">
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${currentProduct.color} flex items-center justify-center text-white font-bold text-2xl`}>
                          {idx + 1}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold mb-2">{phase.phase}</h3>
                            <p className="text-muted-foreground text-lg mb-4">{phase.description}</p>
                          </div>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {phase.duration}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <Icon className="h-5 w-5 text-primary" />
                              What Happens
                            </h4>
                            <ul className="space-y-2">
                              {phase.steps.map((step, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-primary/5 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Target className="h-5 w-5 text-primary" />
                              Outcome
                            </h4>
                            <p className="text-sm font-medium text-primary">{phase.outcome}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Features with Screenshots */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to succeed, built into one platform
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-16">
            {currentProduct.keyFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              const isEven = idx % 2 === 0;
              
              return (
                <div key={idx} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 bg-gradient-to-br ${currentProduct.color} rounded-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold">{feature.title}</h3>
                    </div>
                    <p className="text-lg text-muted-foreground mb-6">{feature.description}</p>
                    
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1">
                    <Card className="overflow-hidden shadow-2xl">
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-center p-8">
                          <Icon className="h-24 w-24 mx-auto mb-4 text-gray-400" />
                          <p className="text-gray-500 font-medium">Feature Screenshot</p>
                          <p className="text-sm text-gray-400">{feature.screenshot}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Real-World Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how organizations like yours are achieving results
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {currentProduct.useCases.map((useCase, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{useCase.description}</p>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <p className="font-semibold text-primary text-sm">Results:</p>
                    <p className="text-sm">{useCase.results}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Work?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Start your free trial today and see how {currentProduct.name} can revolutionize your approach to {activeProduct === 'charette' ? 'collaborative decision-making' : 'community advocacy'}.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-6"
              onClick={() => handleRequestDemo(currentProduct)}
            >
              <Play className="h-5 w-5 mr-2" />
              Request a Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 bg-white/10 hover:bg-white/20 text-white border-white"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <CheckCircle className="h-12 w-12 mb-3" />
              <p className="font-semibold">No Credit Card Required</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-12 w-12 mb-3" />
              <p className="font-semibold">Setup in Minutes</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 mb-3" />
              <p className="font-semibold">Full Support Included</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Learn More</h2>
            <p className="text-xl text-muted-foreground">
              Explore additional resources to help you get started
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Video className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Video Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Watch step-by-step guides to master the platform
                </p>
                <Button variant="outline" className="w-full">
                  Watch Now
                  <Play className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Download className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Product Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Download comprehensive documentation
                </p>
                <Button variant="outline" className="w-full">
                  Download PDF
                  <Download className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <BookOpen className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Case Studies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Read detailed success stories
                </p>
                <Button variant="outline" className="w-full">
                  Read More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Request Modal */}
      {showDemoModal && (
        <DemoRequestModal
          product={selectedProduct}
          onClose={() => {
            setShowDemoModal(false);
            setSelectedProduct(null);
          }}
          onSubmit={onRequestDemo}
        />
      )}
    </div>
  );
};

export default ProductsPage;
