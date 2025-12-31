import React, { useState, useEffect } from 'react';
import { Map, Plus, AlertCircle, FileText, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import NeedReportForm from './NeedReportForm';
import NeedsHeatmap from './NeedsHeatmap';
import AdvocacyBriefBuilder from './AdvocacyBriefBuilder';
import advocacyService from '../../services/advocacyService';

const CommunityNeeds = ({ advocacyUser }) => {
  const [activeTab, setActiveTab] = useState('browse');
  const [needs, setNeeds] = useState([]);
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCommunityNeeds();
  }, []);

  const loadCommunityNeeds = async () => {
    try {
      const allNeeds = await advocacyService.getCommunityNeeds();
      setNeeds(allNeeds);
    } catch (error) {
      console.error('Error loading community needs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async (needId) => {
    try {
      await advocacyService.upvoteNeed(needId);
      loadCommunityNeeds();
    } catch (error) {
      console.error('Error upvoting need:', error);
    }
  };

  const handleReportSubmit = async (reportData) => {
    try {
      await advocacyService.createNeedReport({
        ...reportData,
        reportedBy: advocacyUser.userId,
        reporterRole: advocacyUser.role
      });
      setShowReportForm(false);
      loadCommunityNeeds();
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  if (showReportForm) {
    return (
      <NeedReportForm
        onSubmit={handleReportSubmit}
        onCancel={() => setShowReportForm(false)}
      />
    );
  }

  if (selectedNeed) {
    return (
      <AdvocacyBriefBuilder
        need={selectedNeed}
        advocacyUser={advocacyUser}
        onBack={() => setSelectedNeed(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Community Needs & Constraints</CardTitle>
              <CardDescription>
                Report needs, map constraints, and create advocacy briefs for change
              </CardDescription>
            </div>
            <Button onClick={() => setShowReportForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Report a Need
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Needs</TabsTrigger>
          <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
          <TabsTrigger value="briefs">Advocacy Briefs</TabsTrigger>
        </TabsList>

        <TabsContent value="browse">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading community needs...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {needs.map(need => (
                <Card key={need.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge>{need.domain}</Badge>
                          <Badge variant="outline">{need.constraintType.replace('_', ' ')}</Badge>
                          <Badge variant={
                            need.status === 'resolved' ? 'default' :
                            need.status === 'being_addressed' ? 'secondary' :
                            'outline'
                          }>
                            {need.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg mb-2">{need.description}</CardTitle>
                        {need.impact && (
                          <p className="text-sm text-muted-foreground">{need.impact}</p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleUpvote(need.id)}
                          className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{need.upvotes || 0}</span>
                        </button>
                        {need.tags && (
                          <div className="flex flex-wrap gap-1">
                            {need.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => setSelectedNeed(need)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Create Brief
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="heatmap">
          <NeedsHeatmap needs={needs} />
        </TabsContent>

        <TabsContent value="briefs">
          <AdvocacyBriefsTab advocacyUser={advocacyUser} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const AdvocacyBriefsTab = ({ advocacyUser }) => {
  const [briefs, setBriefs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBriefs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advocacyUser]);

  const loadBriefs = async () => {
    try {
      const userBriefs = await advocacyService.getAdvocacyBriefs(advocacyUser.userId);
      setBriefs(userBriefs);
    } catch (error) {
      console.error('Error loading briefs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading advocacy briefs...</p>
        </div>
      </div>
    );
  }

  if (briefs.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Advocacy Briefs Yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first advocacy brief from a community need
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {briefs.map(brief => (
        <Card key={brief.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant={
                    brief.status === 'implemented' ? 'default' :
                    brief.status === 'submitted' ? 'secondary' :
                    'outline'
                  }>
                    {brief.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{brief.issue}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold">Impact:</span> {brief.impact}
              </div>
              <div>
                <span className="font-semibold">Requested Change:</span> {brief.requestedChange}
              </div>
              {brief.targetAudience && (
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Target:</span>
                  {brief.targetAudience.map(audience => (
                    <Badge key={audience} variant="outline">
                      {audience.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CommunityNeeds;
