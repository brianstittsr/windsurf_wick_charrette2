// Gamification Service for Advocacy Module
// Manages points, badges, levels, and achievements

const gamificationService = {
  // Points system
  POINTS: {
    COMPLETE_ONBOARDING: 50,
    COMPLETE_LEARNING_PATH: 100,
    COMPLETE_MODULE: 25,
    CREATE_AFFIRMATION: 15,
    SAVE_CUSTOM_AFFIRMATION: 20,
    COMPLETE_SCENARIO: 30,
    PERFECT_SCENARIO: 50,
    REPORT_COMMUNITY_NEED: 40,
    CREATE_ADVOCACY_BRIEF: 60,
    COMPLETE_ASSESSMENT: 35,
    MAKE_COMMITMENT: 25,
    COMPLETE_COMMITMENT: 50,
    REFLECT_ON_COMMITMENT: 15,
    HELP_PEER: 20,
    RECEIVE_HELPFUL_VOTE: 10,
    DAILY_LOGIN: 5,
    WEEKLY_STREAK: 25,
    SHARE_RESOURCE: 15,
    PROVIDE_FEEDBACK: 20,
    UPVOTE_NEED: 5
  },

  // Badge definitions (Boy Scout style merit badges)
  BADGES: {
    // Beginner badges
    FIRST_STEPS: {
      id: 'first_steps',
      name: 'First Steps',
      description: 'Complete your first action in the Advocacy Module',
      icon: '🌱',
      tier: 'bronze',
      requirement: 1,
      category: 'getting_started'
    },
    ONBOARDING_COMPLETE: {
      id: 'onboarding_complete',
      name: 'Ready to Advocate',
      description: 'Complete the onboarding process',
      icon: '🎯',
      tier: 'bronze',
      requirement: 1,
      category: 'getting_started'
    },

    // Learning badges
    EAGER_LEARNER: {
      id: 'eager_learner',
      name: 'Eager Learner',
      description: 'Complete your first learning path',
      icon: '📚',
      tier: 'bronze',
      requirement: 1,
      category: 'learning'
    },
    KNOWLEDGE_SEEKER: {
      id: 'knowledge_seeker',
      name: 'Knowledge Seeker',
      description: 'Complete 5 learning paths',
      icon: '🎓',
      tier: 'silver',
      requirement: 5,
      category: 'learning'
    },
    MASTER_SCHOLAR: {
      id: 'master_scholar',
      name: 'Master Scholar',
      description: 'Complete all available learning paths',
      icon: '👨‍🎓',
      tier: 'gold',
      requirement: 10,
      category: 'learning'
    },

    // Peer Support badges
    SUPPORTIVE_FRIEND: {
      id: 'supportive_friend',
      name: 'Supportive Friend',
      description: 'Create 10 affirmations for peers',
      icon: '💙',
      tier: 'bronze',
      requirement: 10,
      category: 'peer_support'
    },
    ENCOURAGEMENT_CHAMPION: {
      id: 'encouragement_champion',
      name: 'Encouragement Champion',
      description: 'Create 50 affirmations',
      icon: '💖',
      tier: 'silver',
      requirement: 50,
      category: 'peer_support'
    },
    BEACON_OF_HOPE: {
      id: 'beacon_of_hope',
      name: 'Beacon of Hope',
      description: 'Your affirmations have helped 100+ peers',
      icon: '✨',
      tier: 'gold',
      requirement: 100,
      category: 'peer_support'
    },

    // Scenario Practice badges
    SCENARIO_NOVICE: {
      id: 'scenario_novice',
      name: 'Scenario Novice',
      description: 'Complete 5 practice scenarios',
      icon: '🎭',
      tier: 'bronze',
      requirement: 5,
      category: 'practice'
    },
    SKILLED_RESPONDER: {
      id: 'skilled_responder',
      name: 'Skilled Responder',
      description: 'Complete 20 scenarios with good outcomes',
      icon: '🎪',
      tier: 'silver',
      requirement: 20,
      category: 'practice'
    },
    MASTER_ADVOCATE: {
      id: 'master_advocate',
      name: 'Master Advocate',
      description: 'Achieve perfect scores on 10 difficult scenarios',
      icon: '🏆',
      tier: 'gold',
      requirement: 10,
      category: 'practice'
    },

    // Community Advocacy badges
    VOICE_FOR_CHANGE: {
      id: 'voice_for_change',
      name: 'Voice for Change',
      description: 'Report your first community need',
      icon: '📢',
      tier: 'bronze',
      requirement: 1,
      category: 'advocacy'
    },
    COMMUNITY_CHAMPION: {
      id: 'community_champion',
      name: 'Community Champion',
      description: 'Report 10 community needs',
      icon: '🌟',
      tier: 'silver',
      requirement: 10,
      category: 'advocacy'
    },
    POLICY_WARRIOR: {
      id: 'policy_warrior',
      name: 'Policy Warrior',
      description: 'Create 5 advocacy briefs for institutional change',
      icon: '⚔️',
      tier: 'gold',
      requirement: 5,
      category: 'advocacy'
    },

    // Leadership badges
    EMERGING_LEADER: {
      id: 'emerging_leader',
      name: 'Emerging Leader',
      description: 'Complete your first leadership assessment',
      icon: '🌅',
      tier: 'bronze',
      requirement: 1,
      category: 'leadership'
    },
    SERVANT_LEADER: {
      id: 'servant_leader',
      name: 'Servant Leader',
      description: 'Show consistent growth in all leadership dimensions',
      icon: '🕊️',
      tier: 'silver',
      requirement: 3,
      category: 'leadership'
    },
    TRANSFORMATIVE_LEADER: {
      id: 'transformative_leader',
      name: 'Transformative Leader',
      description: 'Achieve excellence in servant leadership',
      icon: '👑',
      tier: 'gold',
      requirement: 5,
      category: 'leadership'
    },

    // Commitment badges
    PROMISE_KEEPER: {
      id: 'promise_keeper',
      name: 'Promise Keeper',
      description: 'Complete 5 practice commitments',
      icon: '🤝',
      tier: 'bronze',
      requirement: 5,
      category: 'commitment'
    },
    DEDICATED_PRACTITIONER: {
      id: 'dedicated_practitioner',
      name: 'Dedicated Practitioner',
      description: 'Maintain a 30-day commitment streak',
      icon: '🔥',
      tier: 'silver',
      requirement: 30,
      category: 'commitment'
    },
    UNWAVERING_COMMITMENT: {
      id: 'unwavering_commitment',
      name: 'Unwavering Commitment',
      description: 'Complete 50 commitments with reflections',
      icon: '💎',
      tier: 'gold',
      requirement: 50,
      category: 'commitment'
    },

    // Special achievement badges
    EARLY_ADOPTER: {
      id: 'early_adopter',
      name: 'Early Adopter',
      description: 'One of the first 100 users',
      icon: '🚀',
      tier: 'special',
      requirement: 1,
      category: 'special'
    },
    FEEDBACK_HERO: {
      id: 'feedback_hero',
      name: 'Feedback Hero',
      description: 'Provide 10 helpful feedback submissions',
      icon: '💡',
      tier: 'special',
      requirement: 10,
      category: 'special'
    },
    COMMUNITY_BUILDER: {
      id: 'community_builder',
      name: 'Community Builder',
      description: 'Help 25 different peers',
      icon: '🏘️',
      tier: 'special',
      requirement: 25,
      category: 'special'
    },
    PERFECT_WEEK: {
      id: 'perfect_week',
      name: 'Perfect Week',
      description: 'Complete activities every day for 7 days',
      icon: '⭐',
      tier: 'special',
      requirement: 7,
      category: 'special'
    }
  },

  // Level system
  LEVELS: [
    { level: 1, name: 'Newcomer', minPoints: 0, maxPoints: 99, icon: '🌱' },
    { level: 2, name: 'Learner', minPoints: 100, maxPoints: 249, icon: '📖' },
    { level: 3, name: 'Supporter', minPoints: 250, maxPoints: 499, icon: '🤝' },
    { level: 4, name: 'Advocate', minPoints: 500, maxPoints: 999, icon: '📢' },
    { level: 5, name: 'Champion', minPoints: 1000, maxPoints: 1999, icon: '🌟' },
    { level: 6, name: 'Leader', minPoints: 2000, maxPoints: 3999, icon: '👑' },
    { level: 7, name: 'Mentor', minPoints: 4000, maxPoints: 7999, icon: '🎓' },
    { level: 8, name: 'Hero', minPoints: 8000, maxPoints: 15999, icon: '🦸' },
    { level: 9, name: 'Legend', minPoints: 16000, maxPoints: 31999, icon: '⚡' },
    { level: 10, name: 'Icon', minPoints: 32000, maxPoints: Infinity, icon: '💫' }
  ],

  // Get user's current level
  getUserLevel(totalPoints) {
    for (let i = this.LEVELS.length - 1; i >= 0; i--) {
      if (totalPoints >= this.LEVELS[i].minPoints) {
        return this.LEVELS[i];
      }
    }
    return this.LEVELS[0];
  },

  // Calculate progress to next level
  getLevelProgress(totalPoints) {
    const currentLevel = this.getUserLevel(totalPoints);
    const nextLevel = this.LEVELS.find(l => l.level === currentLevel.level + 1);
    
    if (!nextLevel) {
      return { percentage: 100, pointsToNext: 0, currentLevel, nextLevel: null };
    }

    const pointsInCurrentLevel = totalPoints - currentLevel.minPoints;
    const pointsNeededForNextLevel = nextLevel.minPoints - currentLevel.minPoints;
    const percentage = Math.floor((pointsInCurrentLevel / pointsNeededForNextLevel) * 100);
    const pointsToNext = nextLevel.minPoints - totalPoints;

    return { percentage, pointsToNext, currentLevel, nextLevel };
  },

  // Award points
  async awardPoints(userId, action, amount = null) {
    const points = amount || this.POINTS[action] || 0;
    
    try {
      // In production, save to backend
      const userStats = this.getUserStats(userId);
      userStats.totalPoints += points;
      userStats.recentActions.unshift({
        action,
        points,
        timestamp: new Date().toISOString()
      });
      
      // Keep only last 50 actions
      if (userStats.recentActions.length > 50) {
        userStats.recentActions = userStats.recentActions.slice(0, 50);
      }

      this.saveUserStats(userId, userStats);
      
      return { points, newTotal: userStats.totalPoints };
    } catch (error) {
      console.error('Error awarding points:', error);
      throw error;
    }
  },

  // Check and award badges
  async checkBadges(userId, action, count = 1) {
    const userStats = this.getUserStats(userId);
    const newBadges = [];

    Object.values(this.BADGES).forEach(badge => {
      // Skip if already earned
      if (userStats.badges.includes(badge.id)) return;

      // Check if user meets requirement
      const userCount = userStats.actionCounts[action] || 0;
      if (userCount >= badge.requirement) {
        userStats.badges.push(badge.id);
        newBadges.push(badge);
      }
    });

    if (newBadges.length > 0) {
      this.saveUserStats(userId, userStats);
    }

    return newBadges;
  },

  // Get user statistics
  getUserStats(userId) {
    const saved = localStorage.getItem(`gamification_${userId}`);
    if (saved) {
      return JSON.parse(saved);
    }

    return {
      userId,
      totalPoints: 0,
      badges: [],
      actionCounts: {},
      recentActions: [],
      streaks: {
        current: 0,
        longest: 0,
        lastActivity: null
      },
      createdAt: new Date().toISOString()
    };
  },

  // Save user statistics
  saveUserStats(userId, stats) {
    localStorage.setItem(`gamification_${userId}`, JSON.stringify(stats));
  },

  // Get leaderboard
  async getLeaderboard(timeframe = 'all', limit = 10) {
    try {
      // In production, fetch from backend
      // For now, return mock data
      return [
        { userId: 'user1', userName: 'Alex Chen', totalPoints: 5420, level: 6, badges: 15, avatar: '👨' },
        { userId: 'user2', userName: 'Maria Garcia', totalPoints: 4890, level: 6, badges: 14, avatar: '👩' },
        { userId: 'user3', userName: 'Jordan Smith', totalPoints: 3750, level: 5, badges: 12, avatar: '🧑' },
        { userId: 'user4', userName: 'Taylor Brown', totalPoints: 2980, level: 5, badges: 10, avatar: '👤' },
        { userId: 'user5', userName: 'Casey Johnson', totalPoints: 2450, level: 5, badges: 9, avatar: '👥' }
      ];
    // eslint-disable-next-line no-unreachable
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  },

  // Track action
  async trackAction(userId, action, metadata = {}) {
    try {
      const userStats = this.getUserStats(userId);
      
      // Increment action count
      userStats.actionCounts[action] = (userStats.actionCounts[action] || 0) + 1;
      
      // Award points
      const pointsResult = await this.awardPoints(userId, action);
      
      // Check for new badges
      const newBadges = await this.checkBadges(userId, action, userStats.actionCounts[action]);
      
      // Update streak
      this.updateStreak(userId, userStats);
      
      return {
        points: pointsResult,
        newBadges,
        level: this.getUserLevel(userStats.totalPoints),
        streak: userStats.streaks.current
      };
    } catch (error) {
      console.error('Error tracking action:', error);
      throw error;
    }
  },

  // Update streak
  updateStreak(userId, userStats) {
    const today = new Date().toDateString();
    const lastActivity = userStats.streaks.lastActivity;

    if (!lastActivity) {
      userStats.streaks.current = 1;
      userStats.streaks.lastActivity = today;
    } else if (lastActivity !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastActivity === yesterday.toDateString()) {
        userStats.streaks.current += 1;
      } else {
        userStats.streaks.current = 1;
      }
      
      userStats.streaks.lastActivity = today;
      
      if (userStats.streaks.current > userStats.streaks.longest) {
        userStats.streaks.longest = userStats.streaks.current;
      }
    }

    this.saveUserStats(userId, userStats);
  }
};

export default gamificationService;
