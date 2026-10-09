'use client';

import { useMemo, useCallback } from 'react';
import {
  UserCyberIqProfile,
  UserQuizAttempt,
  CyberIqBadge,
} from '@/types/cyberIq';
import { CYBER_IQ_BADGES } from '@/data/cyberIqQuestions';
import { useGamification } from './useGamification';
import { STUDENT_LEVELS } from '@/data/gamification';

export interface CyberSkillRank {
  levelNumber: number;
  title: string;
  minXp: number;
  maxXp: number;
  badgeColor: string;
  textColor: string;
  description: string;
}

export const CYBER_SKILL_RANKS: CyberSkillRank[] = STUDENT_LEVELS.map((lvl) => ({
  levelNumber: lvl.levelNumber,
  title: lvl.title,
  minXp: lvl.minXp,
  maxXp: lvl.maxXp,
  badgeColor: `${lvl.badgeColor} ${lvl.borderColor}`,
  textColor: lvl.textColor,
  description: lvl.description,
}));

export function getRankForXp(xp: number): CyberSkillRank {
  for (let i = CYBER_SKILL_RANKS.length - 1; i >= 0; i--) {
    if (xp >= CYBER_SKILL_RANKS[i].minXp) {
      return CYBER_SKILL_RANKS[i];
    }
  }
  return CYBER_SKILL_RANKS[0];
}

export function useCyberIqStorage() {
  const {
    profile: gamificationProfile,
    levelInfo,
    overallAccuracy,
    recordQuizCompletion,
    resetProgress,
  } = useGamification();

  // Backward-compatible profile view
  const profile: UserCyberIqProfile = useMemo(() => {
    return {
      totalQuizzes: gamificationProfile.totalQuizzes,
      totalXp: gamificationProfile.totalXp,
      totalAnswered: gamificationProfile.totalAnswered,
      totalCorrect: gamificationProfile.totalCorrect,
      unlockedBadgeIds: gamificationProfile.unlockedBadgeIds,
      categoryStats: gamificationProfile.categoryStats,
      history: gamificationProfile.history,
      lastActiveTimestamp: gamificationProfile.lastActiveTimestamp,
    };
  }, [gamificationProfile]);

  const currentRank: CyberSkillRank = useMemo(() => {
    return {
      levelNumber: levelInfo.currentLevel,
      title: levelInfo.title,
      minXp: levelInfo.minXp,
      maxXp: levelInfo.maxXp,
      badgeColor: `${levelInfo.badgeColor} ${levelInfo.borderColor}`,
      textColor: levelInfo.textColor,
      description: levelInfo.description,
    };
  }, [levelInfo]);

  // Record a completed quiz using unified gamification rules
  const recordQuizResult = useCallback(
    (attempt: Omit<UserQuizAttempt, 'quizId' | 'timestamp'>): { newlyUnlocked: CyberIqBadge[] } => {
      const result = recordQuizCompletion(attempt);

      // Map newly unlocked badges to CyberIqBadge type
      const newlyUnlocked: CyberIqBadge[] = CYBER_IQ_BADGES.filter((b) =>
        result.newlyUnlockedBadges.some((nb) => nb.id === b.id)
      );

      return { newlyUnlocked };
    },
    [recordQuizCompletion]
  );

  return {
    profile,
    overallAccuracy,
    currentRank,
    recordQuizResult,
    resetProfile: resetProgress,
  };
}
