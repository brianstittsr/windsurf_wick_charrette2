import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FileText, Download, Mail, CheckCircle, TrendingUp, Users, MessageSquare, Brain, Sparkles, Lightbulb } from 'lucide-react';
import { CharettePDFGenerator } from '../services/pdfGenerator';

export default function PhaseReporting({ charette, solutions, messages, participants, onComplete }) {
  const [reportGenerated, setReportGenerated] = useState(false);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Generate report data
    const totalMessages = messages?.length || 0;
    const totalParticipants = participants?.length || 0;
    const selectedSolutions = solutions?.filter(s => s.selected) || [];
    
    setReportData({
      totalMessages,
      totalParticipants,
      selectedSolutions,
      timestamp: new Date().toISOString()
    });
  }, [messages, participants, solutions]);

  const generateReport = () => {
    setReportGenerated(true);
  };

  const exportPDF = async () => {
    try {
      // Generate AI analysis for PDF
      const analysis = {
        keyFindings: reportData.aiKeyFindings,
        recommendations: reportData.aiRecommendations,
        nextSteps: reportData.aiNextSteps,
        cognitiveDistortions: 'All-or-nothing thinking, overgeneralization, and emotional reasoning detected',
        assumptions: 'Core beliefs about fairness, safety, and community values driving positions',
        emotionalTriggers: 'Fear of change, loss of control, concerns about children\'s wellbeing',
        reframingOpportunities: [
          {
            original: '"They don\'t understand our concerns"',
            reframed: '"We haven\'t yet found the right way to communicate our concerns"',
            technique: 'Ownership & Possibility',
            impact: 'Shifts from blame to collaborative problem-solving'
          }
        ],
        breakthroughs: [
          {
            title: 'Shared Safety Concerns',
            description: 'Both groups prioritize children\'s safety',
            technique: 'Finding common ground'
          }
        ]
      };

      const pdfGen = new CharettePDFGenerator(charette, messages, analysis, solutions);
      const doc = pdfGen.generate();
      doc.save(`charette-report-${charette.id}.pdf`);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Error generating PDF. Please ensure jspdf is installed.');
    }
  };

  const emailReport = () => {
    alert('Email report functionality will be implemented');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Final Report</CardTitle>
            <Badge>Phase 6: Complete</Badge>
          </div>
          <CardDescription>
            Comprehensive summary of the charette process and outcomes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Report Generation */}
          {!reportGenerated ? (
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-base">Generate Report</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Click below to generate a comprehensive report including all discussions, analysis, and recommendations.
                </p>
                <Button onClick={generateReport} size="lg" className="w-full">
                  Generate Final Report
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Executive Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Executive Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Session Overview</h4>
                    <p className="text-sm text-muted-foreground">
                      {charette.title} - {charette.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-muted rounded">
                      <Users className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <p className="text-2xl font-bold">{reportData?.totalParticipants || 0}</p>
                      <p className="text-xs text-muted-foreground">Participants</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded">
                      <MessageSquare className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <p className="text-2xl font-bold">{reportData?.totalMessages || 0}</p>
                      <p className="text-xs text-muted-foreground">Messages</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded">
                      <CheckCircle className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <p className="text-2xl font-bold">{reportData?.selectedSolutions?.length || 0}</p>
                      <p className="text-xs text-muted-foreground">Solutions</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded">
                      <TrendingUp className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <p className="text-2xl font-bold">6</p>
                      <p className="text-xs text-muted-foreground">Phases</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Key Findings */}
              <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-base">AI-Generated Key Findings</CardTitle>
                  </div>
                  <CardDescription>Cognitive analysis with CBT techniques</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border-l-4 border-orange-500 pl-4 py-2 bg-white rounded">
                      <h5 className="font-medium text-sm text-orange-900">Constraints Identified</h5>
                      <p className="text-xs text-muted-foreground mt-1">
                        Time, budget, and regulatory limitations were clearly defined and acknowledged by all stakeholders through structured analysis.
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4 py-2 bg-white rounded">
                      <h5 className="font-medium text-sm text-purple-900">Assumptions Challenged</h5>
                      <p className="text-xs text-muted-foreground mt-1">
                        Several key assumptions were identified using Socratic questioning and tested, leading to breakthrough insights about shared values.
                      </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 py-2 bg-white rounded">
                      <h5 className="font-medium text-sm text-green-900">Opportunities Discovered</h5>
                      <p className="text-xs text-muted-foreground mt-1">
                        Multiple areas of alignment and potential for innovative win-win solutions were identified through values clarification and language reframing.
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 py-2 bg-white rounded">
                      <h5 className="font-medium text-sm text-blue-900">Cognitive Patterns</h5>
                      <p className="text-xs text-muted-foreground mt-1">
                        AI identified cognitive distortions (all-or-nothing thinking, overgeneralization) and emotional triggers that were addressed using CBT techniques.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-base">AI-Generated Recommendations</CardTitle>
                  </div>
                  <CardDescription>Strategic guidance for implementation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2 font-medium">1.</span>
                      <span>Prioritize "Quick Wins" (high impact, high feasibility) for immediate implementation and early momentum</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-medium">2.</span>
                      <span>Establish joint oversight committee to address control and autonomy needs of all stakeholders</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-medium">3.</span>
                      <span>Implement pilot program to test assumptions with real-world evidence before full rollout</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-medium">4.</span>
                      <span>Use language reframing techniques in all stakeholder communications to maintain collaborative tone</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-medium">5.</span>
                      <span>Schedule regular check-ins using CBT-based reflection to monitor progress and adjust approach</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              {/* AI Next Steps */}
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-base">AI-Generated Next Steps</CardTitle>
                  </div>
                  <CardDescription>Actionable timeline with accountability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-sm">Review and approve recommended solutions</p>
                          <p className="text-xs text-muted-foreground mt-1">Engage all stakeholders in final decision-making process</p>
                        </div>
                        <Badge variant="outline" className="ml-2">Week 1</Badge>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-sm">Develop detailed implementation plans</p>
                          <p className="text-xs text-muted-foreground mt-1">Create timelines, resource allocation, and success metrics</p>
                        </div>
                        <Badge variant="outline" className="ml-2">Weeks 2-3</Badge>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-sm">Assign responsibilities and accountability</p>
                          <p className="text-xs text-muted-foreground mt-1">Establish clear ownership and reporting structure</p>
                        </div>
                        <Badge variant="outline" className="ml-2">Week 4</Badge>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-sm">Launch pilot program</p>
                          <p className="text-xs text-muted-foreground mt-1">Begin with selected solutions and gather feedback</p>
                        </div>
                        <Badge variant="outline" className="ml-2">Month 2</Badge>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-sm">Schedule follow-up sessions</p>
                          <p className="text-xs text-muted-foreground mt-1">Track progress, adjust approach, celebrate wins</p>
                        </div>
                        <Badge variant="outline" className="ml-2">Monthly</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommended Solutions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recommended Solutions</CardTitle>
                  <CardDescription>
                    {reportData?.selectedSolutions?.length || 0} solutions selected for implementation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {reportData?.selectedSolutions && reportData.selectedSolutions.length > 0 ? (
                    <div className="space-y-3">
                      {reportData.selectedSolutions.map((solution, idx) => (
                        <Card key={solution.id} className="bg-muted/50">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-sm">
                                {solution.title || `Solution ${idx + 1}`}
                              </CardTitle>
                              <div className="flex space-x-2">
                                <Badge variant={solution.feasibility === 'high' ? 'default' : 'secondary'}>
                                  {solution.feasibility} feasibility
                                </Badge>
                                <Badge variant={solution.impact === 'high' ? 'default' : 'secondary'}>
                                  {solution.impact} impact
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              {solution.description || 'No description provided'}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No solutions were selected in the synthesis phase
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-base">Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2 font-medium">1.</span>
                      <span>Review and approve recommended solutions with all stakeholders</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-medium">2.</span>
                      <span>Develop detailed implementation plans with timelines and resources</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-medium">3.</span>
                      <span>Assign responsibilities and establish accountability measures</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-medium">4.</span>
                      <span>Schedule follow-up sessions to track progress and adjust as needed</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-medium">5.</span>
                      <span>Document lessons learned and best practices for future charettes</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              {/* Export Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Export & Share</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button variant="outline" onClick={exportPDF} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" onClick={emailReport} className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Success Message */}
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-300">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900">Charette Complete!</h4>
                      <p className="text-sm text-green-800 mt-1">
                        Thank you to all participants for your valuable contributions. This collaborative process has produced actionable solutions that address the needs of all stakeholders.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {reportGenerated ? (
            <>
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                Return to Dashboard
              </Button>
              <Button onClick={onComplete} size="lg">
                Complete Charette
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Synthesis
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
