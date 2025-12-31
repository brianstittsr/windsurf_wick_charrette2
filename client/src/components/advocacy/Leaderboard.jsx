import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, TrendingUp, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import gamificationService from '../../services/gamificationService';

const Leaderboard = ({ advocacyUser }) => {
  const [timeframe, setTimeframe] = useState('all');
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, [timeframe]);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const data = await gamificationService.getLeaderboard(timeframe, 50);
      setLeaderboard(data);
      
      // Find user's rank
      const rank = data.findIndex(u => u.userId === advocacyUser.userId);
      if (rank !== -1) {
        setUserRank(rank + 1);
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const timeframes = [
    { value: 'all', label: 'All Time', icon: Trophy },
    { value: 'month', label: 'This Month', icon: Calendar },
    { value: 'week', label: 'This Week', icon: TrendingUp }
  ];

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankColor = (rank) => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-orange-600';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <div>
                <CardTitle className="text-2xl">Leaderboard</CardTitle>
                <CardDescription>See how you rank among advocates</CardDescription>
              </div>
            </div>
            {userRank && (
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{getRankIcon(userRank)}</div>
                <div className="text-sm text-muted-foreground">Your Rank</div>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-6">
            {timeframes.map(tf => {
              const Icon = tf.icon;
              return (
                <Button
                  key={tf.value}
                  variant={timeframe === tf.value ? 'default' : 'outline'}
                  onClick={() => setTimeframe(tf.value)}
                  className="flex-1"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tf.label}
                </Button>
              );
            })}
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-4">Loading leaderboard...</p>
            </div>
          ) : (
            <div className="space-y-2">
              {leaderboard.map((user, index) => {
                const rank = index + 1;
                const isCurrentUser = user.userId === advocacyUser.userId;
                const level = gamificationService.getUserLevel(user.totalPoints);

                return (
                  <div
                    key={user.userId}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isCurrentUser
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50 hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className={`text-2xl font-bold w-12 text-center ${getRankColor(rank)}`}>
                          {getRankIcon(rank)}
                        </div>
                        
                        <div className="text-3xl">{user.avatar}</div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-lg">{user.userName}</span>
                            {isCurrentUser && (
                              <Badge variant="secondary">You</Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Level {level.level} {level.icon}
                            </span>
                            <span className="flex items-center">
                              <Award className="h-3 w-3 mr-1" />
                              {user.badges} badges
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {user.totalPoints.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Community Stats</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-primary">{leaderboard.length}</div>
              <div className="text-sm text-muted-foreground">Active Advocates</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-primary">
                {leaderboard.reduce((sum, u) => sum + u.totalPoints, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Points Earned</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-primary">
                {leaderboard.reduce((sum, u) => sum + u.badges, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Badges Awarded</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
