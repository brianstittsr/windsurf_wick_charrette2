import React, { useState, useEffect } from 'react';
import { MapPin, Users, DollarSign, Building, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import communityIntelligenceService from '../../services/communityIntelligenceService';

const CommunityIntelligence = ({ location = 'Durham, NC' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState(null);
  const [policyLandscape, setPolicyLandscape] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCommunityData();
  }, [location]);

  const loadCommunityData = async () => {
    setLoading(true);
    try {
      const [profileData, policyData] = await Promise.all([
        communityIntelligenceService.getCommunityProfile(location),
        communityIntelligenceService.getPolicyLandscape(location, 'housing')
      ]);
      setProfile(profileData);
      setPolicyLandscape(policyData);
    } catch (error) {
      console.error('Error loading community data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading community intelligence...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-2xl">{profile.location}</CardTitle>
                <CardDescription>Community Intelligence Profile</CardDescription>
              </div>
            </div>
            <Button variant="outline" onClick={loadCommunityData}>
              Refresh Data
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="economics">Economics</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Population
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{profile.demographics.population.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Median Age: {profile.demographics.medianAge}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-primary" />
                  Median Income
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${profile.demographics.medianIncome.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Poverty Rate: {profile.demographics.povertyRate}%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Building className="h-5 w-5 mr-2 text-primary" />
                  Unemployment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{profile.economics.unemploymentRate}%</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Below national average
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.challenges.map((challenge, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                    <AlertCircle className={`h-5 w-5 mt-0.5 ${
                      challenge.severity === 'high' ? 'text-red-500' : 
                      challenge.severity === 'medium' ? 'text-yellow-500' : 
                      'text-blue-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold">{challenge.issue}</span>
                        <Badge variant={challenge.severity === 'high' ? 'destructive' : 'secondary'}>
                          {challenge.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Affects ~{challenge.affectedPopulation.toLocaleString()} residents
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.opportunities.map((opp, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 mt-0.5 text-green-500" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold">{opp.area}</span>
                        <Badge className="bg-green-500">{opp.potential}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{opp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Demographics Tab */}
        <TabsContent value="demographics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Demographic Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Racial Composition</h4>
                <div className="space-y-2">
                  {Object.entries(profile.demographics.racialComposition).map(([race, percentage]) => (
                    <div key={race}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="capitalize">{race}</span>
                        <span className="font-semibold">{percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Education Levels</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {profile.demographics.educationLevel.highSchool}%
                    </div>
                    <div className="text-sm text-muted-foreground">High School+</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {profile.demographics.educationLevel.bachelors}%
                    </div>
                    <div className="text-sm text-muted-foreground">Bachelor's+</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {profile.demographics.educationLevel.graduate}%
                    </div>
                    <div className="text-sm text-muted-foreground">Graduate+</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Economics Tab */}
        <TabsContent value="economics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Economic Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Major Employers</h4>
                <div className="space-y-2">
                  {profile.economics.majorEmployers.map((employer, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-semibold">{employer.name}</div>
                        <div className="text-sm text-muted-foreground">{employer.sector}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{employer.employees.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">employees</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Industry Distribution</h4>
                <div className="space-y-2">
                  {profile.economics.industries.map((industry, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>{industry.sector}</span>
                        <span className="font-semibold">{industry.percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${industry.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Housing Costs</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      ${profile.economics.housingCosts.medianHomeValue.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Median Home Value</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      ${profile.economics.housingCosts.medianRent.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Median Rent</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {profile.economics.housingCosts.homeownershipRate}%
                    </div>
                    <div className="text-sm text-muted-foreground">Homeownership Rate</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Policies Tab */}
        <TabsContent value="policies" className="space-y-6">
          {policyLandscape && (
            <>
              {Object.entries(policyLandscape.levels).map(([level, data]) => (
                <Card key={level}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="capitalize">{level} Level</CardTitle>
                      {data.budget && (
                        <Badge variant="outline">
                          Budget: ${(data.budget / 1000000).toFixed(1)}M
                        </Badge>
                      )}
                    </div>
                    {data.authority && (
                      <CardDescription>Authority: {data.authority}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {data.policies.map((policy, idx) => (
                        <div key={idx} className="p-4 bg-muted rounded-lg">
                          <div className="font-semibold mb-2">{policy.name}</div>
                          <p className="text-sm text-muted-foreground mb-3">{policy.description}</p>
                          
                          {policy.constraints && policy.constraints.length > 0 && (
                            <div className="mb-2">
                              <div className="text-xs font-semibold mb-1">Constraints:</div>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                {policy.constraints.map((constraint, i) => (
                                  <li key={i}>• {constraint}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {policy.opportunities && policy.opportunities.length > 0 && (
                            <div>
                              <div className="text-xs font-semibold mb-1">Opportunities:</div>
                              <ul className="text-xs text-green-600 space-y-1">
                                {policy.opportunities.map((opp, i) => (
                                  <li key={i}>• {opp}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </TabsContent>

        {/* Challenges Tab */}
        <TabsContent value="challenges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Challenges & Solutions</CardTitle>
              <CardDescription>
                Realistic constraints and opportunities for community problem-solving
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {profile.challenges.map((challenge, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{challenge.issue}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                      </div>
                      <Badge variant={challenge.severity === 'high' ? 'destructive' : 'secondary'}>
                        {challenge.severity} severity
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="p-3 bg-red-50 border border-red-200 rounded">
                        <div className="text-sm font-semibold mb-2">Impact</div>
                        <div className="text-sm">
                          Affects approximately {challenge.affectedPopulation.toLocaleString()} residents
                        </div>
                      </div>
                      
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                        <div className="text-sm font-semibold mb-2">Potential Solutions</div>
                        <div className="text-sm text-muted-foreground">
                          Requires multi-level policy coordination and community engagement
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityIntelligence;
