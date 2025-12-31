import React, { useMemo } from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const NeedsHeatmap = ({ needs }) => {
  const analytics = useMemo(() => {
    const domainCounts = {};
    const constraintCounts = {};
    const supportTypeCounts = { peer_support: 0, institutional_advocacy: 0, both: 0 };
    const statusCounts = { reported: 0, being_addressed: 0, requires_policy_change: 0, resolved: 0 };

    needs.forEach(need => {
      domainCounts[need.domain] = (domainCounts[need.domain] || 0) + 1;
      constraintCounts[need.constraintType] = (constraintCounts[need.constraintType] || 0) + 1;
      supportTypeCounts[need.supportType] = (supportTypeCounts[need.supportType] || 0) + 1;
      statusCounts[need.status] = (statusCounts[need.status] || 0) + 1;
    });

    const sortedDomains = Object.entries(domainCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const sortedConstraints = Object.entries(constraintCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      total: needs.length,
      domainCounts: sortedDomains,
      constraintCounts: sortedConstraints,
      supportTypeCounts,
      statusCounts,
      maxDomainCount: sortedDomains[0]?.[1] || 1,
      maxConstraintCount: sortedConstraints[0]?.[1] || 1
    };
  }, [needs]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span>Community Needs Heatmap</span>
          </CardTitle>
          <CardDescription>
            Visual summary of reported needs and constraints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-primary">{analytics.total}</div>
              <div className="text-sm text-muted-foreground">Total Reports</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-yellow-600">{analytics.statusCounts.reported || 0}</div>
              <div className="text-sm text-muted-foreground">Newly Reported</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{analytics.statusCounts.being_addressed || 0}</div>
              <div className="text-sm text-muted-foreground">Being Addressed</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-green-600">{analytics.statusCounts.resolved || 0}</div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Most Common Domains</CardTitle>
            <CardDescription>Where needs are most frequently reported</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.domainCounts.map(([domain, count]) => (
                <div key={domain}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium capitalize">{domain.replace('_', ' ')}</span>
                    <span className="text-sm text-muted-foreground">{count} reports</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(count / analytics.maxDomainCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Most Common Constraints</CardTitle>
            <CardDescription>Types of barriers people face</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.constraintCounts.map(([constraint, count]) => (
                <div key={constraint}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium capitalize">{constraint.replace('_', ' ')}</span>
                    <span className="text-sm text-muted-foreground">{count} reports</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(count / analytics.maxConstraintCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Support Type Distribution</CardTitle>
          <CardDescription>How needs can be addressed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-2xl font-bold text-green-700 mb-1">
                {analytics.supportTypeCounts.peer_support}
              </div>
              <div className="text-sm font-medium text-green-800">Peer Support</div>
              <p className="text-xs text-green-700 mt-1">
                Can be addressed by community support
              </p>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="text-2xl font-bold text-purple-700 mb-1">
                {analytics.supportTypeCounts.institutional_advocacy}
              </div>
              <div className="text-sm font-medium text-purple-800">Policy Change</div>
              <p className="text-xs text-purple-700 mt-1">
                Requires institutional advocacy
              </p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-2xl font-bold text-blue-700 mb-1">
                {analytics.supportTypeCounts.both}
              </div>
              <div className="text-sm font-medium text-blue-800">Both Needed</div>
              <p className="text-xs text-blue-700 mt-1">
                Requires both approaches
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            <span>Key Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.domainCounts.length > 0 && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  <span className="font-semibold">Top concern:</span> {analytics.domainCounts[0][0].replace('_', ' ')} 
                  {' '}with {analytics.domainCounts[0][1]} reports
                </p>
              </div>
            )}
            {analytics.statusCounts.requires_policy_change > 0 && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">{analytics.statusCounts.requires_policy_change} needs</span> have been 
                  identified as requiring policy or institutional change
                </p>
              </div>
            )}
            {analytics.supportTypeCounts.peer_support > analytics.supportTypeCounts.institutional_advocacy && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  Many reported needs can be addressed through peer support and community action
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NeedsHeatmap;
