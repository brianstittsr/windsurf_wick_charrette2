import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Upload, FileText, MessageSquare, CheckCircle } from 'lucide-react';

export default function PhaseDataCollection({ charette, onComplete, onUploadDocument }) {
  const [documents, setDocuments] = useState([]);
  const [notes, setNotes] = useState('');

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setDocuments([...documents, ...files.map(f => ({ name: f.name, size: f.size, uploaded: true }))]);
    if (onUploadDocument) {
      onUploadDocument(files);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Data Collection</CardTitle>
            <Badge>Phase 2</Badge>
          </div>
          <CardDescription>
            Gather all relevant information, documents, and initial perspectives
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Document Upload */}
            <Card className="border-dashed">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Upload className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Upload Documents</CardTitle>
                </div>
                <CardDescription>
                  Add relevant files, reports, or background materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, DOC, TXT, or images
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                  />
                </label>

                {documents.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">Uploaded Files:</p>
                    {documents.map((doc, i) => (
                      <div key={i} className="flex items-center justify-between text-sm p-2 bg-muted rounded">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4" />
                          <span>{doc.name}</span>
                        </div>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Initial Notes */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Initial Observations</CardTitle>
                </div>
                <CardDescription>
                  Record key facts, concerns, or questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="What are the key issues? What information is missing? What concerns have been raised?"
                  className="w-full h-32 px-3 py-2 border rounded-md resize-none"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  These notes will be shared with all participants
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Data Collection Checklist */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">Collection Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="stakeholders" className="h-4 w-4 rounded" />
                  <label htmlFor="stakeholders" className="text-sm">
                    All stakeholder perspectives identified
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="constraints" className="h-4 w-4 rounded" />
                  <label htmlFor="constraints" className="text-sm">
                    Key constraints and limitations documented
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="background" className="h-4 w-4 rounded" />
                  <label htmlFor="background" className="text-sm">
                    Background information gathered
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="goals" className="h-4 w-4 rounded" />
                  <label htmlFor="goals" className="text-sm">
                    Success criteria defined
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Tip:</strong> The more comprehensive your data collection, the more effective the analysis phase will be. Don't rush this step.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back to Introduction
          </Button>
          <Button onClick={onComplete} size="lg">
            Proceed to Analysis Phase
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
