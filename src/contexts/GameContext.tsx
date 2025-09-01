import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GameStats {
  xp: number;
  level: number;
  streak: number;
  badges: Badge[];
  certificates: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
}

interface GameContextType {
  stats: GameStats;
  addXP: (amount: number, action: string) => void;
  updateStreak: () => void;
  awardBadge: (badgeId: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<GameStats>({
    xp: 1250,
    level: 4,
    streak: 7,
    badges: [
      { id: 'first-course', name: 'First Course', description: 'Completed your first course', icon: '🎓', earned: true, earnedAt: new Date() },
      { id: 'streak-7', name: 'Week Warrior', description: '7-day learning streak', icon: '🔥', earned: true, earnedAt: new Date() },
      { id: 'top-scorer', name: 'Top Scorer', description: 'Scored 100% on a quiz', icon: '⭐', earned: false },
    ],
    certificates: 3,
  });

  const addXP = (amount: number, action: string) => {
    setStats(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 300) + 1;
      
      // Show XP gain notification (could integrate with toast system)
      console.log(`+${amount} XP for ${action}`);
      
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
      };
    });
  };

  const updateStreak = () => {
    setStats(prev => ({
      ...prev,
      streak: prev.streak + 1,
    }));
  };

  const awardBadge = (badgeId: string) => {
    setStats(prev => ({
      ...prev,
      badges: prev.badges.map(badge =>
        badge.id === badgeId
          ? { ...badge, earned: true, earnedAt: new Date() }
          : badge
      ),
    }));
  };

  return (
    <GameContext.Provider value={{ stats, addXP, updateStreak, awardBadge }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}