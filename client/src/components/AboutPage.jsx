import React from 'react';
import { Heart, Users, Target, Award, Mail, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const AboutPage = ({ onBack }) => {
  const teamMembers = [
    {
      name: 'Thea Monet',
      role: 'Founder & CEO',
      image: '/thea-monet.jpg',
      bio: 'Thea founded Wick Enterprises with a vision to transform how communities collaborate and advocate for change. With over 15 years of experience in community organizing and technology, she brings a unique perspective on building tools that empower people.',
      expertise: ['Community Organizing', 'Strategic Leadership', 'Social Innovation'],
      isFounder: true
    },
    {
      name: 'Brian Stitt',
      role: 'Chief Technology Officer',
      image: '/brian-stitt.jpg',
      bio: 'Brian leads the technical vision and development of our platforms. His expertise in AI and collaborative systems has been instrumental in creating our innovative decision-making tools.',
      expertise: ['AI & Machine Learning', 'System Architecture', 'Product Development']
    },
    {
      name: 'George Hill',
      role: 'Director of Community Engagement',
      image: '/george-hill.jpg',
      bio: 'George brings deep experience in community development and stakeholder engagement. He ensures our platforms truly serve the needs of the communities we work with.',
      expertise: ['Community Development', 'Stakeholder Engagement', 'Program Design']
    },
    {
      name: 'Malaika McKee-Culpepper',
      role: 'Director of Advocacy & Impact',
      image: '/malaika-mckee-culpepper.jpg',
      bio: 'Malaika leads our advocacy initiatives and impact measurement. Her background in social work and policy advocacy shapes our strength-based approach to community support.',
      expertise: ['Policy Advocacy', 'Impact Measurement', 'Social Work']
    },
    {
      name: 'Michael McKee',
      role: 'Director of Strategic Partnerships',
      image: '/michael-mckee.jpg',
      bio: 'Michael builds and nurtures partnerships with organizations that share our mission. His experience in nonprofit management and collaboration drives our growth.',
      expertise: ['Partnership Development', 'Nonprofit Management', 'Strategic Planning']
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Servant Leadership',
      description: 'We believe in leading by serving others, putting community needs first in everything we build.'
    },
    {
      icon: Users,
      title: 'Inclusive Collaboration',
      description: 'Every voice matters. We create tools that ensure all stakeholders can participate meaningfully.'
    },
    {
      icon: Target,
      title: 'Impact-Driven',
      description: 'We measure success by the positive change we enable in communities, not just metrics.'
    },
    {
      icon: Award,
      title: 'Excellence & Innovation',
      description: 'We combine cutting-edge technology with proven methodologies to deliver exceptional results.'
    }
  ];

  const milestones = [
    { year: '2020', event: 'Wick Enterprises Founded', description: 'Thea Monet establishes the company with a vision for collaborative decision-making' },
    { year: '2021', event: 'Charette Platform Launch', description: 'First version of our structured decision-making platform goes live' },
    { year: '2022', event: 'Advocacy Module Release', description: 'Launch of servant advocacy and peer support tools' },
    { year: '2023', event: 'AI Integration', description: 'Advanced reasoning algorithms enhance platform capabilities' },
    { year: '2024', event: 'Community Impact', description: 'Supporting 100+ organizations across multiple sectors' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      {onBack && (
        <header className="border-b bg-card sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </header>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-b">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 text-lg px-4 py-2">
              <Heart className="h-4 w-4 mr-2 inline" />
              About Wick Enterprises
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Building Tools for Community Change
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              We're a team of technologists, community organizers, and advocates dedicated to creating platforms that empower collaborative decision-making and strength-based advocacy.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-3xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To empower communities and organizations with innovative tools that facilitate meaningful collaboration, 
                  strengthen advocacy efforts, and drive sustainable social change through technology and servant leadership.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-3xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A world where every community has access to the tools and support they need to make informed decisions, 
                  advocate effectively for change, and build stronger, more resilient societies together.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These principles guide everything we do, from product development to community partnerships
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A diverse group of passionate individuals committed to making a difference
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {teamMembers.map((member, idx) => (
              <Card 
                key={idx} 
                className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  member.isFounder ? 'border-2 border-primary' : ''
                }`}
              >
                {member.isFounder && (
                  <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600"></div>
                )}
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-48 h-48 rounded-lg object-cover shadow-lg"
                        />
                        {member.isFounder && (
                          <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600">
                            Founder
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                        <p className="text-lg text-primary font-semibold">{member.role}</p>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {member.bio}
                      </p>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                          Areas of Expertise
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {member.expertise.map((skill, i) => (
                            <Badge key={i} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Key milestones in our mission to transform collaboration and advocacy
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20"></div>
              
              <div className="space-y-8">
                {milestones.map((milestone, idx) => (
                  <div key={idx} className="relative pl-20">
                    <div className="absolute left-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {milestone.year}
                    </div>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-xl">{milestone.event}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Whether you're looking to partner with us, join our team, or learn more about our platforms, 
            we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-6"
              onClick={() => window.location.href = 'mailto:info@wickenterprises.com'}
            >
              <Mail className="h-5 w-5 mr-2" />
              Contact Us
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 bg-white/10 hover:bg-white/20 text-white border-white"
            >
              View Careers
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
