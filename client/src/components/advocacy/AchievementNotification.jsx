import React, { useEffect, useState } from 'react';
import { X, Sparkles, Trophy } from 'lucide-react';
import { Badge } from '../ui/badge';

const AchievementNotification = ({ achievement, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Fade in
    setTimeout(() => setIsVisible(true), 100);

    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!achievement) return null;

  const { type, data } = achievement;

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isVisible && !isExiting
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      }`}
    >
      <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 p-1 rounded-lg shadow-2xl">
        <div className="bg-card rounded-lg p-4 min-w-[320px] max-w-[400px]">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse" />
              <span className="font-bold text-lg">Achievement Unlocked!</span>
            </div>
            <button
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {type === 'badge' && (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="text-5xl">{data.icon}</div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">{data.name}</div>
                  <div className="text-sm text-muted-foreground">{data.description}</div>
                  <Badge className="mt-1" variant={
                    data.tier === 'gold' ? 'default' :
                    data.tier === 'silver' ? 'secondary' :
                    data.tier === 'special' ? 'destructive' : 'outline'
                  }>
                    {data.tier.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {type === 'points' && (
            <div className="flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-primary">+{data.points} Points</div>
                <div className="text-sm text-muted-foreground">{data.action}</div>
              </div>
            </div>
          )}

          {type === 'level' && (
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="text-5xl">{data.icon}</div>
                <div>
                  <div className="text-xl font-bold">Level Up!</div>
                  <div className="text-lg text-primary">
                    Level {data.level} - {data.name}
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                You've reached a new milestone in your advocacy journey!
              </div>
            </div>
          )}

          {type === 'streak' && (
            <div className="flex items-center space-x-3">
              <div className="text-4xl">🔥</div>
              <div>
                <div className="text-xl font-bold">{data.days} Day Streak!</div>
                <div className="text-sm text-muted-foreground">
                  Keep up the amazing consistency!
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Achievement Queue Manager
export const AchievementQueue = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    // Listen for achievement events
    const handleAchievement = (event) => {
      setQueue(prev => [...prev, event.detail]);
    };

    window.addEventListener('achievement', handleAchievement);
    return () => window.removeEventListener('achievement', handleAchievement);
  }, []);

  useEffect(() => {
    // Show next achievement when current is cleared
    if (!current && queue.length > 0) {
      setCurrent(queue[0]);
      setQueue(prev => prev.slice(1));
    }
  }, [current, queue]);

  const handleClose = () => {
    setCurrent(null);
  };

  return (
    <>
      {children}
      {current && (
        <AchievementNotification achievement={current} onClose={handleClose} />
      )}
    </>
  );
};

// Helper function to trigger achievements
export const triggerAchievement = (type, data) => {
  const event = new CustomEvent('achievement', { detail: { type, data } });
  window.dispatchEvent(event);
};

export default AchievementNotification;
