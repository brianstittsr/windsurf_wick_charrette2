import React, { useState } from 'react';
import { X, Send, Building2, Mail, Phone, User, Briefcase, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const DemoRequestModal = ({ product, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    organizationType: '',
    teamSize: '',
    primaryInterest: product?.id || 'both',
    useCases: '',
    timeline: '',
    additionalInfo: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const organizationTypes = [
    'Nonprofit Organization',
    'Government Agency',
    'Educational Institution',
    'Faith-Based Organization',
    'Community Group',
    'Consulting Firm',
    'Corporate/Business',
    'Other'
  ];

  const teamSizes = [
    '1-10 people',
    '11-50 people',
    '51-200 people',
    '201-500 people',
    '500+ people'
  ];

  const timelines = [
    'Immediate (within 2 weeks)',
    'Short-term (1-3 months)',
    'Medium-term (3-6 months)',
    'Long-term (6+ months)',
    'Just exploring'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // In production, this would send to your backend/CRM
    console.log('Demo request submitted:', formData);
    
    if (onSubmit) {
      await onSubmit(formData);
    }
    
    setSubmitted(true);
    
    // Auto-close after 3 seconds
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const canSubmit = formData.firstName && formData.lastName && formData.email && 
                    formData.organization && formData.role && formData.primaryInterest;

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for your interest in {product?.name || 'Wick Enterprises'}. 
              Our team will contact you within 24 hours to schedule your personalized demo.
            </p>
            <p className="text-sm text-muted-foreground">
              Check your email for confirmation details.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-3xl my-8">
        <CardHeader className="border-b">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">Request a Demo</CardTitle>
              <CardDescription className="text-base">
                {product ? (
                  <>See <span className="font-semibold">{product.name}</span> in action</>
                ) : (
                  'Discover how Wick Enterprises can transform your organization'
                )}
              </CardDescription>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="pt-6 space-y-6">
            {/* Contact Information */}
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-primary" />
                Contact Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone (optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Organization Information */}
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-primary" />
                Organization Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Organization Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => handleChange('organization', e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Role <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => handleChange('role', e.target.value)}
                      placeholder="e.g., Executive Director, Program Manager"
                      className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Organization Type
                  </label>
                  <select
                    value={formData.organizationType}
                    onChange={(e) => handleChange('organizationType', e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select type...</option>
                    {organizationTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Team Size
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => handleChange('teamSize', e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select size...</option>
                    {teamSizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Product Interest */}
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                What are you interested in?
              </h3>
              <div className="space-y-3">
                <label className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                  <input
                    type="radio"
                    name="primaryInterest"
                    value="charette-system"
                    checked={formData.primaryInterest === 'charette-system'}
                    onChange={(e) => handleChange('primaryInterest', e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-semibold">Charette Collaboration Platform</div>
                    <div className="text-sm text-muted-foreground">
                      Structured decision-making with AI-powered analysis
                    </div>
                  </div>
                </label>
                <label className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                  <input
                    type="radio"
                    name="primaryInterest"
                    value="advocacy-module"
                    checked={formData.primaryInterest === 'advocacy-module'}
                    onChange={(e) => handleChange('primaryInterest', e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-semibold">Servant Advocacy & Peer Support</div>
                    <div className="text-sm text-muted-foreground">
                      Community advocacy and leadership development tools
                    </div>
                  </div>
                </label>
                <label className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                  <input
                    type="radio"
                    name="primaryInterest"
                    value="both"
                    checked={formData.primaryInterest === 'both'}
                    onChange={(e) => handleChange('primaryInterest', e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-semibold">Both Platforms</div>
                    <div className="text-sm text-muted-foreground">
                      Integrated solution for collaboration and advocacy
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <label className="block text-sm font-medium mb-2">
                What are your primary use cases?
              </label>
              <textarea
                value={formData.useCases}
                onChange={(e) => handleChange('useCases', e.target.value)}
                placeholder="e.g., Strategic planning sessions, community engagement, policy advocacy..."
                className="w-full min-h-[100px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Implementation Timeline
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => handleChange('timeline', e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select timeline...</option>
                {timelines.map(timeline => (
                  <option key={timeline} value={timeline}>{timeline}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Additional Information
              </label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => handleChange('additionalInfo', e.target.value)}
                placeholder="Any specific questions or requirements?"
                className="w-full min-h-[80px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Privacy Notice */}
            <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground">
              By submitting this form, you agree to be contacted by Wick Enterprises regarding your demo request. 
              We respect your privacy and will never share your information with third parties.
            </div>
          </CardContent>

          <div className="border-t p-6 flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!canSubmit} size="lg">
              <Send className="h-4 w-4 mr-2" />
              Request Demo
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default DemoRequestModal;
