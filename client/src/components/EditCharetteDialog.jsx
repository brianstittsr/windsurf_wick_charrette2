import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { X, Save } from 'lucide-react';

export default function EditCharetteDialog({ charette, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scope: '',
    stakeholders: '',
    objectives: '',
    constraints: '',
    timeframe: '',
    desiredOutcomes: ''
  });

  useEffect(() => {
    if (charette) {
      setFormData({
        title: charette.title || '',
        description: charette.description || '',
        scope: charette.scope || '',
        stakeholders: charette.stakeholders || '',
        objectives: charette.objectives || '',
        constraints: charette.constraints || '',
        timeframe: charette.timeframe || '',
        desiredOutcomes: charette.desiredOutcomes || ''
      });
    }
  }, [charette]);

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSave = () => {
    if (onSave) {
      onSave({ ...charette, ...formData });
    }
  };

  const isValid = formData.title.trim() !== '' && formData.description.trim() !== '';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Edit Charette</CardTitle>
              <CardDescription>Update charette information</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Basic Information</h3>
            <div>
              <label className="block text-sm font-medium mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                placeholder="Charette title"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                placeholder="Brief overview of the charette purpose and goals"
                rows={3}
                className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Scope & Context */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-semibold text-primary">Scope & Context</h3>
            <div>
              <label className="block text-sm font-medium mb-2">Scope</label>
              <textarea
                value={formData.scope}
                onChange={(e) => handleFieldChange('scope', e.target.value)}
                placeholder="What is included and excluded from this charette?"
                rows={3}
                className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Timeframe</label>
              <input
                type="text"
                value={formData.timeframe}
                onChange={(e) => handleFieldChange('timeframe', e.target.value)}
                placeholder="e.g., 6-month implementation, 2-year planning horizon"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Stakeholders & Objectives */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-semibold text-primary">Stakeholders & Objectives</h3>
            <div>
              <label className="block text-sm font-medium mb-2">Key Stakeholders</label>
              <textarea
                value={formData.stakeholders}
                onChange={(e) => handleFieldChange('stakeholders', e.target.value)}
                placeholder="Who needs to be involved?"
                rows={3}
                className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Primary Objectives</label>
              <textarea
                value={formData.objectives}
                onChange={(e) => handleFieldChange('objectives', e.target.value)}
                placeholder="What are the main goals we want to achieve?"
                rows={3}
                className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Constraints & Outcomes */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-semibold text-primary">Constraints & Outcomes</h3>
            <div>
              <label className="block text-sm font-medium mb-2">Known Constraints</label>
              <textarea
                value={formData.constraints}
                onChange={(e) => handleFieldChange('constraints', e.target.value)}
                placeholder="Budget, time, regulatory, or other limitations"
                rows={3}
                className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Desired Outcomes</label>
              <textarea
                value={formData.desiredOutcomes}
                onChange={(e) => handleFieldChange('desiredOutcomes', e.target.value)}
                placeholder="What does success look like?"
                rows={3}
                className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-2 border-t pt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isValid} className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
