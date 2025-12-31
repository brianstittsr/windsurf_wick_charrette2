import React, { useState } from 'react';
import { FileText, ArrowLeft, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import advocacyService from '../../services/advocacyService';

const AdvocacyBriefBuilder = ({ need, advocacyUser, onBack }) => {
  const [briefData, setBriefData] = useState({
    issue: need.description || '',
    impact: need.impact || '',
    relevantPolicy: '',
    requestedChange: '',
    supportingData: [],
    targetAudience: []
  });
  const [newDataPoint, setNewDataPoint] = useState('');

  const audienceOptions = [
    { value: 'school_board', label: 'School Board' },
    { value: 'city_council', label: 'City Council' },
    { value: 'agency_director', label: 'Agency Director' },
    { value: 'state_legislature', label: 'State Legislature' },
    { value: 'nonprofit_board', label: 'Nonprofit Board' },
    { value: 'community_leaders', label: 'Community Leaders' }
  ];

  const handleAudienceToggle = (value) => {
    const current = briefData.targetAudience || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setBriefData({ ...briefData, targetAudience: updated });
  };

  const handleAddDataPoint = () => {
    if (newDataPoint.trim()) {
      setBriefData({
        ...briefData,
        supportingData: [...(briefData.supportingData || []), newDataPoint]
      });
      setNewDataPoint('');
    }
  };

  const handleRemoveDataPoint = (index) => {
    const updated = briefData.supportingData.filter((_, idx) => idx !== index);
    setBriefData({ ...briefData, supportingData: updated });
  };

  const handleSave = async () => {
    try {
      await advocacyService.createAdvocacyBrief({
        ...briefData,
        needId: need.id,
        createdBy: advocacyUser.userId
      });
      onBack();
    } catch (error) {
      console.error('Error saving advocacy brief:', error);
    }
  };

  const canSave = briefData.issue && briefData.impact && briefData.requestedChange && briefData.targetAudience.length > 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <span>Create Advocacy Brief</span>
          </CardTitle>
          <CardDescription>
            Turn this community need into a structured advocacy document
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Original Need Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge>{need.domain}</Badge>
              <Badge variant="outline">{need.constraintType.replace('_', ' ')}</Badge>
            </div>
            <p className="text-sm">{need.description}</p>
            {need.impact && (
              <p className="text-sm text-muted-foreground">Impact: {need.impact}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Issue Statement</CardTitle>
          <CardDescription>Clear, concise description of the problem</CardDescription>
        </CardHeader>
        <CardContent>
          <textarea
            value={briefData.issue}
            onChange={(e) => setBriefData({ ...briefData, issue: e.target.value })}
            placeholder="What is the specific issue that needs to be addressed?"
            className="w-full min-h-[100px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Impact</CardTitle>
          <CardDescription>Who is affected and how?</CardDescription>
        </CardHeader>
        <CardContent>
          <textarea
            value={briefData.impact}
            onChange={(e) => setBriefData({ ...briefData, impact: e.target.value })}
            placeholder="Describe the impact on individuals, families, or the community..."
            className="w-full min-h-[100px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Relevant Policy or Rule</CardTitle>
          <CardDescription>What policy, rule, or practice needs to change?</CardDescription>
        </CardHeader>
        <CardContent>
          <textarea
            value={briefData.relevantPolicy}
            onChange={(e) => setBriefData({ ...briefData, relevantPolicy: e.target.value })}
            placeholder="Name the specific policy, regulation, or practice..."
            className="w-full min-h-[80px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Requested Change</CardTitle>
          <CardDescription>What specific action do you want decision-makers to take?</CardDescription>
        </CardHeader>
        <CardContent>
          <textarea
            value={briefData.requestedChange}
            onChange={(e) => setBriefData({ ...briefData, requestedChange: e.target.value })}
            placeholder="Be specific about what you're asking for..."
            className="w-full min-h-[100px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Supporting Data</CardTitle>
          <CardDescription>Facts, statistics, or examples that support your case</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {briefData.supportingData && briefData.supportingData.length > 0 && (
            <div className="space-y-2">
              {briefData.supportingData.map((data, idx) => (
                <div key={idx} className="flex items-start space-x-2 p-3 bg-muted rounded-lg">
                  <span className="flex-1 text-sm">{data}</span>
                  <button
                    onClick={() => handleRemoveDataPoint(idx)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={newDataPoint}
              onChange={(e) => setNewDataPoint(e.target.value)}
              placeholder="Add a data point or example..."
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              onKeyPress={(e) => e.key === 'Enter' && handleAddDataPoint()}
            />
            <Button onClick={handleAddDataPoint} disabled={!newDataPoint.trim()}>
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Target Audience</CardTitle>
          <CardDescription>Who should receive this advocacy brief?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {audienceOptions.map(option => {
              const isSelected = briefData.targetAudience?.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => handleAudienceToggle(option.value)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 hover:bg-muted'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!canSave} className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          Save Advocacy Brief
        </Button>
      </div>
    </div>
  );
};

export default AdvocacyBriefBuilder;
