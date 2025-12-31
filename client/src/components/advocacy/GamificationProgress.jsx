import React, { useState, useEffect } from 'react';
import { Award, Zap, Target } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import gamificationService from '../../services/gamificationService';

const GamificationProgress = ({ advocacyUser, compact = false }) => {
  const [userStats, setUserStats] = useState(null);
  const [levelProgress, setLevelProgress] = useState(null);

  useEffect(() => {
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advocacyUser]);

  const loadStats = () => {
    const stats = gamificationService.getUserStats(advocacyUser.userId);
    const progress = gamificationService.getLevelProgress(stats.totalPoints);
    setUserStats(stats);
    setLevelProgress(progress);
  };

  if (!userStats || !levelProgress) return null;

  if (compact) {
    return (
      <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg border">
        <div className="flex items-center space-x-2">
          <div className="text-2xl">{levelProgress.currentLevel.icon}</div>
          <div>
            <div className="text-sm font-semibold">
              Level {levelProgress.currentLevel.level}
            </div>
            <div className="text-xs text-muted-foreground">
              {levelProgress.currentLevel.name}
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-medium">{userStats.totalPoints.toLocaleString()} XP</span>
            {levelProgress.nextLevel && (
              <span className="text-muted-foreground">
                {levelProgress.pointsToNext} to Level {levelProgress.nextLevel.level}
              </span>
            )}
          </div>
          <div className="h-2 bg-background rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-500"
              style={{ width: `${levelProgress.percentage}%` }}
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{userStats.badges.length}</div>
            <div className="text-xs text-muted-foreground">Badges</div>
          </div>
          {userStats.streaks.current > 0 && (
            <div className="text-center">
              <div className="text-lg font-bold text-orange-500 flex items-center">
                🔥 {userStats.streaks.current}
              </div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5">
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Level Progress */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="text-5xl">{levelProgress.currentLevel.icon}</div>
                <div>
                  <div className="text-2xl font-bold">
                    Level {levelProgress.currentLevel.level}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    {levelProgress.currentLevel.name}
                  </div>
                </div>
              </div>
              
              {levelProgress.nextLevel && (
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Next Level</div>
                  <div className="text-xl font-bold flex items-center space-x-2">
                    <span>{levelProgress.nextLevel.icon}</span>
                    <span>{levelProgress.nextLevel.name}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">
                  {userStats.totalPoints.toLocaleString()} XP
                </span>
                {levelProgress.nextLevel && (
                  <span className="text-muted-foreground">
                    {levelProgress.pointsToNext.toLocaleString()} XP to next level
                  </span>
                )}
              </div>
              <div className="h-3 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${levelProgress.percentage}%` }}
                />
              </div>
              <div className="text-xs text-center text-muted-foreground">
                {levelProgress.percentage}% Complete
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-background rounded-lg">
              <Award className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold text-primary">
                {userStats.badges.length}
              </div>
              <div className="text-xs text-muted-foreground">Badges Earned</div>
            </div>

            <div className="text-center p-4 bg-background rounded-lg">
              <Zap className="h-6 w-6 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold text-orange-500">
                {userStats.streaks.current}
              </div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>

            <div className="text-center p-4 bg-background rounded-lg">
              <Target className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold text-green-500">
                {Object.keys(userStats.actionCounts).length}
              </div>
              <div className="text-xs text-muted-foreground">Activities</div>
            </div>
          </div>

          {/* Recent Actions */}
          {userStats.recentActions.length > 0 && (
            <div>
              <div className="text-sm font-semibold mb-2">Recent Activity</div>
              <div className="space-y-1">
                {userStats.recentActions.slice(0, 3).map((action, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs p-2 bg-background rounded"
                  >
                    <span className="text-muted-foreground">
                      {action.action.replace(/_/g, ' ').toLowerCase()}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      +{action.points} XP
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Streak Info */}
          {userStats.streaks.current >= 3 && (
            <div className="p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
              <div className="flex items-center space-x-2">
                <div className="text-2xl">🔥</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">
                    {userStats.streaks.current} Day Streak!
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Keep it up! Your longest streak is {userStats.streaks.longest} days.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GamificationProgress;
