import React, { useState } from 'react';
import { Search, BookOpen, TestTube, TrendingUp, FileText, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import researchService from '../../services/researchService';

const ResearchDashboard = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [hypothesis, setHypothesis] = useState('');
  const [hypothesisTest, setHypothesisTest] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const results = await researchService.searchAcademicArticles(searchQuery, {
        yearFrom: 2020,
        limit: 20
      });
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleTestHypothesis = async () => {
    if (!hypothesis.trim()) return;
    
    setIsTesting(true);
    try {
      const result = await researchService.testHypothesis(hypothesis);
      setHypothesisTest(result);
    } catch (error) {
      console.error('Hypothesis test error:', error);
    } finally {
      setIsTesting(false);
    }
  };

  const getSupportLevelColor = (level) => {
    switch (level) {
      case 'strong': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'weak': return 'bg-orange-500';
      case 'insufficient': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">Research Dashboard</CardTitle>
              <CardDescription>
                Access academic research and test hypotheses with evidence-based analysis
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="search">
            <Search className="h-4 w-4 mr-2" />
            Search Research
          </TabsTrigger>
          <TabsTrigger value="hypothesis">
            <TestTube className="h-4 w-4 mr-2" />
            Test Hypothesis
          </TabsTrigger>
          <TabsTrigger value="synthesis">
            <TrendingUp className="h-4 w-4 mr-2" />
            Research Synthesis
          </TabsTrigger>
        </TabsList>

        {/* Search Tab */}
        <TabsContent value="search" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Academic Article Search</CardTitle>
              <CardDescription>
                Search across PubMed, Google Scholar, Semantic Scholar, and other academic databases
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Enter research topic or keywords..."
                  className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button onClick={handleSearch} disabled={isSearching}>
                  <Search className="h-4 w-4 mr-2" />
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </div>

              {searchResults && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Found {searchResults.totalResults} articles
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Showing {searchResults.articles.length} results
                    </div>
                  </div>

                  {searchResults.articles.map((article) => (
                    <Card key={article.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                              <div className="text-sm text-muted-foreground mb-2">
                                {article.authors.join(', ')} ({article.year})
                              </div>
                              <div className="text-sm font-medium text-primary mb-2">
                                {article.journal}
                              </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                              <Badge className={`${article.relevanceScore > 0.8 ? 'bg-green-500' : 'bg-blue-500'}`}>
                                {Math.round(article.relevanceScore * 100)}% relevant
                              </Badge>
                              <Badge variant="outline">{article.citations} citations</Badge>
                            </div>
                          </div>

                          <p className="text-sm">{article.abstract}</p>

                          {article.keyFindings && article.keyFindings.length > 0 && (
                            <div>
                              <div className="text-sm font-semibold mb-2">Key Findings:</div>
                              <ul className="list-disc list-inside space-y-1">
                                {article.keyFindings.map((finding, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground">{finding}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="flex items-center space-x-4 pt-2">
                            <Button variant="outline" size="sm" asChild>
                              <a href={article.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                View Article
                              </a>
                            </Button>
                            <span className="text-xs text-muted-foreground">DOI: {article.doi}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hypothesis Testing Tab */}
        <TabsContent value="hypothesis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hypothesis Testing</CardTitle>
              <CardDescription>
                Test your hypothesis against current research evidence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Enter Your Hypothesis</label>
                <textarea
                  value={hypothesis}
                  onChange={(e) => setHypothesis(e.target.value)}
                  placeholder="Example: Peer support interventions improve mental health outcomes in youth populations"
                  className="w-full min-h-[100px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button onClick={handleTestHypothesis} disabled={isTesting} className="w-full">
                <TestTube className="h-4 w-4 mr-2" />
                {isTesting ? 'Analyzing Research...' : 'Test Hypothesis'}
              </Button>

              {hypothesisTest && (
                <div className="space-y-4 mt-6">
                  <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm font-semibold mb-2">Research Support Level</div>
                          <div className="flex items-center space-x-3">
                            <Badge className={`${getSupportLevelColor(hypothesisTest.supportLevel)} text-white text-lg px-4 py-2`}>
                              {hypothesisTest.supportLevel.toUpperCase()}
                            </Badge>
                            <div className="text-2xl font-bold">
                              {Math.round(hypothesisTest.confidence * 100)}% Confidence
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-semibold mb-2">Your Hypothesis:</div>
                          <p className="text-sm italic">{hypothesisTest.hypothesis}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Supporting Evidence</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {hypothesisTest.supportingEvidence.map((evidence, idx) => (
                          <div key={idx} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <Badge variant="outline" className="bg-green-100">
                                {evidence.type.replace('_', ' ')}
                              </Badge>
                              <Badge className="bg-green-500">
                                {Math.round(evidence.relevance * 100)}% relevant
                              </Badge>
                            </div>
                            <div className="text-sm font-semibold mb-1">{evidence.citation}</div>
                            <div className="text-sm text-muted-foreground">{evidence.finding}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {hypothesisTest.contradictingEvidence && hypothesisTest.contradictingEvidence.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Contradicting Evidence</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {hypothesisTest.contradictingEvidence.map((evidence, idx) => (
                            <div key={idx} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <Badge variant="outline" className="bg-orange-100">
                                  {evidence.type.replace('_', ' ')}
                                </Badge>
                                <Badge className="bg-orange-500">
                                  {Math.round(evidence.relevance * 100)}% relevant
                                </Badge>
                              </div>
                              <div className="text-sm font-semibold mb-1">{evidence.citation}</div>
                              <div className="text-sm text-muted-foreground mb-1">{evidence.finding}</div>
                              {evidence.note && (
                                <div className="text-xs text-muted-foreground italic">Note: {evidence.note}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {hypothesisTest.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Research Synthesis Tab */}
        <TabsContent value="synthesis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Research Synthesis</CardTitle>
              <CardDescription>
                Get comprehensive summaries of research on specific topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Research synthesis feature coming soon</p>
                <p className="text-sm mt-2">This will provide comprehensive literature reviews on demand</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResearchDashboard;
