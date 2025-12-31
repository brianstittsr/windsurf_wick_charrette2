import React, { useState } from 'react';
import { Award, Lock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import gamificationService from '../../services/gamificationService';

const BadgeCollection = ({ advocacyUser }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBadge, setSelectedBadge] = useState(null);

  const userStats = gamificationService.getUserStats(advocacyUser.userId);
  const allBadges = Object.values(gamificationService.BADGES);

  const categories = [
    { value: 'all', label: 'All Badges', icon: Award },
    { value: 'getting_started', label: 'Getting Started', icon: '🌱' },
    { value: 'learning', label: 'Learning', icon: '📚' },
    { value: 'peer_support', label: 'Peer Support', icon: '💙' },
    { value: 'practice', label: 'Practice', icon: '🎭' },
    { value: 'advocacy', label: 'Advocacy', icon: '📢' },
    { value: 'leadership', label: 'Leadership', icon: '👑' },
    { value: 'commitment', label: 'Commitment', icon: '🤝' },
    { value: 'special', label: 'Special', icon: '⭐' }
  ];

  const filteredBadges = selectedCategory === 'all'
    ? allBadges
    : allBadges.filter(b => b.category === selectedCategory);

  const earnedCount = filteredBadges.filter(b => userStats.badges.includes(b.id)).length;
  const totalCount = filteredBadges.length;

  const getTierColor = (tier) => {
    switch (tier) {
      case 'gold': return 'border-yellow-500 bg-yellow-50';
      case 'silver': return 'border-gray-400 bg-gray-50';
      case 'bronze': return 'border-orange-600 bg-orange-50';
      case 'special': return 'border-purple-500 bg-purple-50';
      default: return 'border-border bg-muted';
    }
  };

  const getTierBadgeColor = (tier) => {
    switch (tier) {
      case 'gold': return 'bg-yellow-500';
      case 'silver': return 'bg-gray-400';
      case 'bronze': return 'bg-orange-600';
      case 'special': return 'bg-purple-500';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center space-x-2">
                <Award className="h-6 w-6 text-primary" />
                <span>Badge Collection</span>
              </CardTitle>
              <CardDescription>
                Earn merit badges by completing activities and helping others
              </CardDescription>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {userStats.badges.length}/{allBadges.length}
              </div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(cat => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.value)}
              >
                {typeof cat.icon === 'string' ? cat.icon : <cat.icon className="h-4 w-4 mr-1" />}
                {cat.label}
              </Button>
            ))}
          </div>

          <div className="mb-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Progress: {earnedCount}/{totalCount}</span>
              <span className="text-muted-foreground">
                {Math.round((earnedCount / totalCount) * 100)}% Complete
              </span>
            </div>
            <div className="mt-2 h-2 bg-background rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${(earnedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredBadges.map(badge => {
              const isEarned = userStats.badges.includes(badge.id);
              
              return (
                <button
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isEarned
                      ? getTierColor(badge.tier)
                      : 'border-border bg-muted opacity-50 grayscale'
                  } hover:scale-105 hover:shadow-lg`}
                >
                  <div className="text-center space-y-2">
                    <div className="text-5xl relative">
                      {badge.icon}
                      {isEarned && (
                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                      {!isEarned && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="font-semibold text-sm">{badge.name}</div>
                    <Badge className={getTierBadgeColor(badge.tier)} variant="secondary">
                      {badge.tier}
                    </Badge>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {selectedBadge && (
        <Card className={getTierColor(selectedBadge.tier)}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-6xl">{selectedBadge.icon}</div>
                <div>
                  <CardTitle className="text-xl">{selectedBadge.name}</CardTitle>
                  <CardDescription className="mt-1">{selectedBadge.description}</CardDescription>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={getTierBadgeColor(selectedBadge.tier)}>
                      {selectedBadge.tier.toUpperCase()}
                    </Badge>
                    {userStats.badges.includes(selectedBadge.id) && (
                      <Badge className="bg-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Earned
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedBadge(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <span className="font-semibold">Requirement: </span>
                <span className="text-muted-foreground">
                  {selectedBadge.requirement} {selectedBadge.category.replace('_', ' ')} action(s)
                </span>
              </div>
              <div>
                <span className="font-semibold">Category: </span>
                <span className="text-muted-foreground capitalize">
                  {selectedBadge.category.replace('_', ' ')}
                </span>
              </div>
              {!userStats.badges.includes(selectedBadge.id) && (
                <div className="p-3 bg-background rounded-lg border">
                  <div className="text-sm font-semibold mb-1">How to Earn:</div>
                  <div className="text-sm text-muted-foreground">
                    Complete {selectedBadge.requirement} {selectedBadge.category.replace('_', ' ')} activities to unlock this badge.
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BadgeCollection;
