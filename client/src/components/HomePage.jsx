import React, { useState } from 'react';
import { 
  MessageSquare, Users, TrendingUp, CheckCircle, ArrowRight, Zap, Shield, Target, Clock, Globe, Award 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import DemoRequestModal from './DemoRequestModal';

const HomePage = ({ onGetStarted, onRequestDemo, onAbout, onProducts, onAdvocacy }) => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 'charette-system',
      name: 'Charette Collaboration Platform',
      tagline: 'Transform group decision-making with structured facilitation',
      icon: MessageSquare,
      color: 'from-blue-500 to-indigo-600',
      description: 'A comprehensive platform for guiding groups through structured decision-making processes with real-time collaboration, AI-powered analysis, and automated reporting.',
      keyFeatures: [
        'Real-time collaborative chat with breakout rooms',
        'Phase-based facilitation through 6 structured stages',
        'AI-powered reasoning algorithms for constraint analysis',
        'Automated report generation with comprehensive findings',
        'Role-based access (Analyst, Project Manager, Participants)',
        'Conversation summary with presentation scripts'
      ],
      benefits: [
        'Reduce meeting time by 60% with asynchronous collaboration',
        'Increase participant engagement with parallel breakout discussions',
        'Make better decisions with AI-powered constraint identification',
        'Save hours on report writing with automated documentation',
        'Ensure all voices are heard with structured participation'
      ],
      useCases: [
        'Urban planning and community development',
        'Organizational strategic planning',
        'Policy development and stakeholder engagement',
        'Complex problem-solving workshops',
        'Multi-stakeholder decision-making'
      ],
      stats: [
        { label: 'Time Saved', value: '60%', icon: TrendingUp },
        { label: 'Engagement Increase', value: '85%', icon: Users },
        { label: 'Decision Quality', value: '4.8/5', icon: Star }
      ]
    },
    {
      id: 'advocacy-module',
      name: 'Servant Advocacy & Peer Support',
      tagline: 'Empower communities with strength-based advocacy tools',
      icon: Heart,
      color: 'from-pink-500 to-purple-600',
      description: 'A comprehensive module designed to teach, coach, and respond to community needs in real-time, while surfacing where governmental and institutional constraints create gaps.',
      keyFeatures: [
        'Interactive learning journeys with micro-lessons',
        'Constraint-based scenario engine for practice',
        'Peer support tools (Affirmation Builder, Accountability Coach)',
        'Community needs mapping and heatmap visualization',
        'Advocacy brief builder (story-to-strategy pipeline)',
        'Servant leadership development hub with assessments',
        'Resource navigator with "can do/cannot do" clarity',
        'Youth-friendly practice room for younger users'
      ],
      benefits: [
        'Build advocacy skills through interactive practice',
        'Identify systemic barriers vs. individual actions',
        'Create data-driven advocacy briefs in minutes',
        'Develop servant leadership competencies',
        'Connect community needs to actionable solutions',
        'Practice peer support with real-time feedback'
      ],
      useCases: [
        'Nonprofit staff training and development',
        'Community organizing and advocacy campaigns',
        'Faith-based community support programs',
        'Social work and case management',
        'Youth development and peer mentoring',
        'Policy advocacy and systems change'
      ],
      stats: [
        { label: 'Learning Paths', value: '20+', icon: Brain },
        { label: 'Practice Scenarios', value: '50+', icon: Zap },
        { label: 'User Satisfaction', value: '4.9/5', icon: Award }
      ]
    }
  ];

  const competitiveAdvantages = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'Advanced reasoning algorithms automatically identify constraints, assumptions, and opportunities in real-time discussions.',
      competitors: 'Most platforms require manual analysis and synthesis'
    },
    {
      icon: Users,
      title: 'True Parallel Collaboration',
      description: 'Breakout rooms with dynamic question management allow multiple conversations simultaneously, not sequential turn-taking.',
      competitors: 'Traditional platforms force sequential participation'
    },
    {
      icon: Heart,
      title: 'Strength-Based Advocacy',
      description: 'Unique focus on servant leadership and positive peer support, not deficit-based approaches.',
      competitors: 'Most advocacy tools focus on problems, not capacity'
    },
    {
      icon: FileText,
      title: 'Automated Documentation',
      description: 'Generate comprehensive reports, advocacy briefs, and presentation scripts automatically from session data.',
      competitors: 'Competitors require hours of manual report writing'
    },
    {
      icon: Shield,
      title: 'Constraint-Aware Design',
      description: 'Explicitly surfaces what\'s in your control vs. requires policy change, preventing burnout and focusing energy.',
      competitors: 'Other platforms don\'t distinguish action levels'
    },
    {
      icon: Globe,
      title: 'Integrated Solution',
      description: 'Combines decision-making, advocacy, leadership development, and resource navigation in one platform.',
      competitors: 'Competitors offer fragmented point solutions'
    }
  ];

  const testimonials = [
    {
      quote: "The Charette System transformed how we engage stakeholders. What used to take weeks of meetings now happens in days, with better outcomes.",
      author: "Sarah Johnson",
      role: "Urban Planning Director",
      organization: "City Development Agency"
    },
    {
      quote: "The Advocacy Module gave our team the tools to move from reactive case management to proactive systems change. The constraint mapping is brilliant.",
      author: "Michael Chen",
      role: "Executive Director",
      organization: "Community Action Network"
    },
    {
      quote: "Finally, a platform that understands the difference between individual support and policy advocacy. This is what we've been waiting for.",
      author: "Rev. Patricia Williams",
      role: "Community Organizer",
      organization: "Faith Leaders Coalition"
    }
  ];

  const handleRequestDemo = (product) => {
    setSelectedProduct(product);
    setShowDemoModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/wick-logo.svg" alt="Wick Enterprises" className="h-8 w-8" />
              <span className="font-bold text-xl">Wick Enterprises</span>
            </div>
            <nav className="flex items-center space-x-6">
              <Button variant="ghost" onClick={onProducts}>
                Products
              </Button>
              <Button variant="ghost" onClick={onAdvocacy}>
                Advocacy
              </Button>
              <Button variant="ghost" onClick={onAbout}>
                About Us
              </Button>
              <Button variant="outline" onClick={() => setShowDemoModal(true)}>
                Request Demo
              </Button>
              <Button onClick={onGetStarted}>
                Get Started
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 text-lg px-4 py-2">
              <Zap className="h-4 w-4 mr-2 inline" />
              Trusted by Organizations Worldwide
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Transform Collaboration & Advocacy
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Empower your organization with AI-powered decision-making tools and strength-based advocacy platforms that drive real change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => setShowDemoModal(true)}>
                <Play className="h-5 w-5 mr-2" />
                Request a Demo
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={onGetStarted}>
                Try It Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • Full access • Setup in minutes
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Purpose-built platforms that address the real challenges of collaborative decision-making and community advocacy
            </p>
          </div>

          <div className="space-y-12">
            {products.map((product, idx) => {
              const Icon = product.icon;
              return (
                <Card key={product.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className={`h-2 bg-gradient-to-r ${product.color}`}></div>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-4 rounded-xl bg-gradient-to-br ${product.color}`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-3xl mb-2">{product.name}</CardTitle>
                          <CardDescription className="text-lg">{product.tagline}</CardDescription>
                        </div>
                      </div>
                      <Button onClick={() => handleRequestDemo(product)} size="lg">
                        Request Demo
                        <ChevronRight className="h-5 w-5 ml-2" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg mb-6 text-muted-foreground">{product.description}</p>

                    {/* Stats */}
                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                      {product.stats.map((stat, i) => {
                        const StatIcon = stat.icon;
                        return (
                          <div key={i} className="p-4 bg-muted rounded-lg text-center">
                            <StatIcon className="h-6 w-6 mx-auto mb-2 text-primary" />
                            <div className="text-3xl font-bold text-primary">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Key Features */}
                      <div>
                        <h4 className="font-semibold text-lg mb-4 flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {product.keyFeatures.map((feature, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="font-semibold text-lg mb-4 flex items-center">
                          <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                          Key Benefits
                        </h4>
                        <ul className="space-y-2">
                          {product.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Use Cases */}
                    <div className="mt-8">
                      <h4 className="font-semibold text-lg mb-4">Perfect For:</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.useCases.map((useCase, i) => (
                          <Badge key={i} variant="outline" className="px-3 py-1">
                            {useCase}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Wick Enterprises?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We've built what others haven't—integrated solutions that actually work for real-world collaboration and advocacy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitiveAdvantages.map((advantage, idx) => {
              const Icon = advantage.icon;
              return (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{advantage.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{advantage.description}</p>
                    <div className="p-3 bg-muted rounded-lg border-l-4 border-orange-500">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">Others:</span> {advantage.competitors}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by Leaders</h2>
            <p className="text-xl text-muted-foreground">
              See what organizations are saying about our platforms
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.organization}</p>
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
            Ready to Transform Your Organization?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join hundreds of organizations using Wick Enterprises to make better decisions, 
            build stronger communities, and create lasting change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-6"
              onClick={() => setShowDemoModal(true)}
            >
              <Play className="h-5 w-5 mr-2" />
              Schedule a Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 bg-white/10 hover:bg-white/20 text-white border-white"
              onClick={onGetStarted}
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
          <p className="text-sm mt-6 opacity-75">
            Questions? Contact us at <a href="mailto:info@wickenterprises.com" className="underline">info@wickenterprises.com</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src="/wick-logo.svg" alt="Wick Enterprises" className="h-8 w-8" />
                <span className="font-bold text-lg">Wick Enterprises</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering communities through collaborative decision-making and advocacy tools.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={onAbout} className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => {}} className="text-muted-foreground hover:text-primary transition-colors">
                    Careers
                  </button>
                </li>
                <li>
                  <a href="mailto:info@wickenterprises.com" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={onProducts} className="text-muted-foreground hover:text-primary transition-colors">
                    View All Products
                  </button>
                </li>
                <li>
                  <button onClick={onProducts} className="text-muted-foreground hover:text-primary transition-colors">
                    Charette Platform
                  </button>
                </li>
                <li>
                  <button onClick={onProducts} className="text-muted-foreground hover:text-primary transition-colors">
                    Advocacy Module
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowDemoModal(true)} className="text-muted-foreground hover:text-primary transition-colors">
                    Request Demo
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => {}} className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => {}} className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Wick Enterprises. All rights reserved.</p>
          </div>
        </div>
      </footer>

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

export default HomePage;
