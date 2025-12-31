import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import AITextEnhancer from './AITextEnhancer';

const NeedReportForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    domain: '',
    constraintType: '',
    description: '',
    impact: '',
    location: '',
    affectedPopulation: '',
    supportType: '',
    tags: [],
    isAnonymous: false
  });

  const domains = [
    { value: 'school', label: 'School', icon: '🏫' },
    { value: 'housing', label: 'Housing', icon: '🏠' },
    { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
    { value: 'benefits', label: 'Benefits & Social Services', icon: '💳' },
    { value: 'justice', label: 'Justice System', icon: '⚖️' },
    { value: 'employment', label: 'Employment', icon: '💼' },
    { value: 'transportation', label: 'Transportation', icon: '🚌' },
    { value: 'other', label: 'Other', icon: '📋' }
  ];

  const constraintTypes = [
    { value: 'policy_rule', label: 'Policy or Rule' },
    { value: 'lack_of_service', label: 'Lack of Service' },
    { value: 'wait_times', label: 'Long Wait Times' },
    { value: 'access', label: 'Access/Location Issues' },
    { value: 'communication', label: 'Communication Barriers' },
    { value: 'eligibility', label: 'Eligibility Requirements' },
    { value: 'funding', label: 'Lack of Funding' }
  ];

  const supportTypes = [
    { value: 'peer_support', label: 'Can be addressed by peer support' },
    { value: 'institutional_advocacy', label: 'Requires institutional/policy change' },
    { value: 'both', label: 'Both peer support and advocacy needed' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const canSubmit = formData.domain && formData.constraintType && formData.description && formData.supportType;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Button variant="ghost" onClick={onCancel} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <CardTitle>Report a Community Need</CardTitle>
          <CardDescription>
            Help us understand where people are being left out or facing unfair constraints
          </CardDescription>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What's not fair?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block font-semibold mb-3">Which area does this affect?</label>
              <div className="grid md:grid-cols-2 gap-3">
                {domains.map(domain => (
                  <button
                    key={domain.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, domain: domain.value })}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      formData.domain === domain.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50 hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{domain.icon}</span>
                      <span className="font-medium">{domain.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-3">What type of constraint is this?</label>
              <div className="space-y-2">
                {constraintTypes.map(type => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, constraintType: type.value })}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                      formData.constraintType === type.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50 hover:bg-muted'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block font-semibold">Describe the need or problem</label>
                <AITextEnhancer
                  text={formData.description}
                  onEnhanced={(enhanced) => setFormData({ ...formData, description: enhanced })}
                  context="need-description"
                />
              </div>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="What's happening? Who is affected? Why is this a problem?"
                className="w-full min-h-[120px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block font-semibold">What's the impact?</label>
                <AITextEnhancer
                  text={formData.impact}
                  onEnhanced={(enhanced) => setFormData({ ...formData, impact: enhanced })}
                  context="impact"
                />
              </div>
              <textarea
                value={formData.impact}
                onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                placeholder="How does this affect people's lives?"
                className="w-full min-h-[80px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Location (optional)</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, neighborhood, or specific location"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Who is affected?</label>
              <input
                type="text"
                value={formData.affectedPopulation}
                onChange={(e) => setFormData({ ...formData, affectedPopulation: e.target.value })}
                placeholder="e.g., youth, families, seniors, specific community"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block font-semibold mb-3">What kind of support is needed?</label>
              <div className="space-y-2">
                {supportTypes.map(type => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, supportType: type.value })}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                      formData.supportType === type.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50 hover:bg-muted'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="anonymous" className="text-sm">
                Submit this report anonymously
              </label>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-3">
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" disabled={!canSubmit} className="flex-1">
            <Send className="h-4 w-4 mr-2" />
            Submit Report
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NeedReportForm;
