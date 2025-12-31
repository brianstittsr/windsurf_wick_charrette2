import React, { useState, useEffect } from 'react';
import { Library, Search, MapPin, Phone, Mail, Globe, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import advocacyService from '../../services/advocacyService';

const ResourceNavigator = ({ advocacyUser }) => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedResource, setSelectedResource] = useState(null);
  const [loading, setLoading] = useState(true);

  const resourceTypes = [
    { value: 'all', label: 'All Resources' },
    { value: 'agency', label: 'Agencies' },
    { value: 'program', label: 'Programs' },
    { value: 'legal_aid', label: 'Legal Aid' },
    { value: 'housing', label: 'Housing' },
    { value: 'education', label: 'Education' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'mental_health', label: 'Mental Health' }
  ];

  useEffect(() => {
    loadResources();
  }, []);

  useEffect(() => {
    filterResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType, searchQuery]);

  const loadResources = async () => {
    try {
      const allResources = await advocacyService.getResources();
      setResources(allResources);
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterResources = () => {
    let filtered = resources;

    if (selectedType !== 'all') {
      filtered = filtered.filter(r => r.type === selectedType);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredResources(filtered);
  };

  if (selectedResource) {
    return (
      <ResourceDetail
        resource={selectedResource}
        onBack={() => setSelectedResource(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Library className="h-6 w-6 text-primary" />
            <span>Resource Navigator</span>
          </CardTitle>
          <CardDescription>
            Find local resources with clear information about what they can and cannot do
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {resourceTypes.map(type => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedType === type.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading resources...</p>
          </div>
        </div>
      ) : filteredResources.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Library className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Resources Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredResources.map(resource => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-xl">{resource.name}</CardTitle>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge>{resource.type.replace('_', ' ')}</Badge>
                      {resource.tags?.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                    <CardDescription>{resource.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {resource.contactInfo && (
                    <div className="flex flex-wrap gap-4 text-sm">
                      {resource.contactInfo.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{resource.contactInfo.phone}</span>
                        </div>
                      )}
                      {resource.contactInfo.website && (
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <a href={resource.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Website
                          </a>
                        </div>
                      )}
                      {resource.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{resource.location}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <Button
                    onClick={() => setSelectedResource(resource)}
                    className="w-full"
                  >
                    View Full Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

const ResourceDetail = ({ resource, onBack }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Button variant="ghost" onClick={onBack} className="mb-4">
            ← Back to Resources
          </Button>
          <CardTitle className="text-2xl">{resource.name}</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>{resource.type.replace('_', ' ')}</Badge>
            {resource.tags?.map(tag => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed mb-6">{resource.description}</p>

          {resource.canDo && resource.canDo.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3 flex items-center space-x-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <span>What They Can Help With</span>
              </h3>
              <ul className="space-y-2">
                {resource.canDo.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {resource.cannotDo && resource.cannotDo.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3 flex items-center space-x-2 text-red-700">
                <XCircle className="h-5 w-5" />
                <span>Limitations Under Current Rules</span>
              </h3>
              <ul className="space-y-2">
                {resource.cannotDo.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {resource.eligibility && (
            <div className="mb-6 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Eligibility Requirements</h4>
              <p className="text-sm">{resource.eligibility}</p>
            </div>
          )}

          {resource.contactInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {resource.contactInfo.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Phone</div>
                        <a href={`tel:${resource.contactInfo.phone}`} className="font-medium hover:text-primary">
                          {resource.contactInfo.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {resource.contactInfo.email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Email</div>
                        <a href={`mailto:${resource.contactInfo.email}`} className="font-medium hover:text-primary">
                          {resource.contactInfo.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {resource.contactInfo.website && (
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Website</div>
                        <a href={resource.contactInfo.website} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary">
                          Visit Website
                        </a>
                      </div>
                    </div>
                  )}

                  {resource.contactInfo.address && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Address</div>
                        <p className="font-medium">{resource.contactInfo.address}</p>
                      </div>
                    </div>
                  )}

                  {resource.hours && (
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Hours</div>
                      <p className="font-medium">{resource.hours}</p>
                    </div>
                  )}

                  {resource.languages && resource.languages.length > 0 && (
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Languages</div>
                      <p className="font-medium">{resource.languages.join(', ')}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceNavigator;
