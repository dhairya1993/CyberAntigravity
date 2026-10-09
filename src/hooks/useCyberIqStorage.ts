'use client';

import { useSyncExternalStore, useMemo, useCallback } from 'react';
import {
  UserCyberIqProfile,
  UserQuizAttempt,
  CyberIqCategoryId,
  CyberIqBadge,
} from '@/types/cyberIq';
import { CYBER_IQ_BADGES } from '@/data/cyberIqQuestions';

const STORAGE_KEY = 'cyberantigravity_cyber_iq_profile_v1';
const UPDATE_EVENT = 'cyber_iq_profile_updated';

const DEFAULT_PROFILE: UserCyberIqProfile = {
  totalQuizzes: 0,
  totalXp: 0,
  totalAnswered: 0,
  totalCorrect: 0,
  unlockedBadgeIds: [],
  categoryStats: {
    fundamentals: { quizzesTaken: 0, correctAnswers: 0, totalAnswered: 0, bestScorePercentage: 0 },
    phishing: { quizzesTaken: 0, correctAnswers: 0, totalAnswered: 0, bestScorePercentage: 0 },
    passwords: { quizzesTaken: 0, correctAnswers: 0, totalAnswered: 0, bestScorePercentage: 0 },
    scams: { quizzesTaken: 0, correctAnswers: 0, totalAnswered: 0, bestScorePercentage: 0 },
    privacy: { quizzesTaken: 0, correctAnswers: 0, totalAnswered: 0, bestScorePercentage: 0 },
    networking: { quizzesTaken: 0, correctAnswers: 0, totalAnswered: 0, bestScorePercentage: 0 },
    'ethical-hacking': { quizzesTaken: 0, correctAnswers: 0, totalAnswered: 0, bestScorePercentage: 0 },
  },
  history: [],
  lastActiveTimestamp: 0,
};

export interface CyberSkillRank {
  levelNumber: number;
  title: string;
  minXp: number;
  maxXp: number;
  badgeColor: string;
  textColor: string;
  description: string;
}

export const CYBER_SKILL_RANKS: CyberSkillRank[] = [
  {
    levelNumber: 1,
    title: 'Cyber Curious',
    minXp: 0,
    maxXp: 150,
    badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
    textColor: 'text-slate-300',
    description: 'Beginning to explore digital safety principles and question unsolicited communications.',
  },
  {
    levelNumber: 2,
    title: 'Cyber Aware',
    minXp: 151,
    maxXp: 400,
    badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-800',
    textColor: 'text-amber-400',
    description: 'Spots artificial urgency, inspects sender headers, and avoids obvious deception lures.',
  },
  {
    levelNumber: 3,
    title: 'Cyber Smart',
    minXp: 401,
    maxXp: 800,
    badgeColor: 'bg-cyan-950/80 text-cyan-300 border-cyan-800',
    textColor: 'text-cyan-400',
    description: 'Practices multi-factor authentication, employs password vaults, and verifies domains out-of-band.',
  },
  {
    levelNumber: 4,
    title: 'Defensive Thinker',
    minXp: 801,
    maxXp: 1400,
    badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
    textColor: 'text-emerald-400',
    description: 'Understands multi-stage attack chains, least privilege, and blast radius containment.',
  },
  {
    levelNumber: 5,
    title: 'Security Mindset',
    minXp: 1401,
    maxXp: 99999,
    badgeColor: 'bg-purple-950/80 text-purple-300 border-purple-800',
    textColor: 'text-purple-400',
    description: 'Instinctively practices zero-trust principles, cryptographic awareness, and continuous defense.',
  },
];

export function getRankForXp(xp: number): CyberSkillRank {
  for (let i = CYBER_SKILL_RANKS.length - 1; i >= 0; i--) {
    if (xp >= CYBER_SKILL_RANKS[i].minXp) {
      return CYBER_SKILL_RANKS[i];
    }
  }
  return CYBER_SKILL_RANKS[0];
}

function subscribeStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(UPDATE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(UPDATE_EVENT, callback);
  };
}

function getStorageSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

function getServerSnapshot(): string {
  return '';
}

export function useCyberIqStorage() {
  const snapshot = useSyncExternalStore(subscribeStorage, getStorageSnapshot, getServerSnapshot);

  const profile: UserCyberIqProfile = useMemo(() => {
    if (!snapshot) return DEFAULT_PROFILE;
    try {
      const parsed = JSON.parse(snapshot) as Partial<UserCyberIqProfile>;
      return {
        ...DEFAULT_PROFILE,
        ...parsed,
        categoryStats: {
          ...DEFAULT_PROFILE.categoryStats,
          ...(parsed.categoryStats || {}),
        },
      };
    } catch {
      return DEFAULT_PROFILE;
    }
  }, [snapshot]);

  // Save to localStorage helper
  const saveProfile = useCallback((newProfile: UserCyberIqProfile) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
      window.dispatchEvent(new Event(UPDATE_EVENT));
    } catch {
      // Ignore localStorage exceptions
    }
  }, []);

  // Record a completed quiz
  const recordQuizResult = useCallback(
    (attempt: Omit<UserQuizAttempt, 'quizId' | 'timestamp'>): { newlyUnlocked: CyberIqBadge[] } => {
      const fullAttempt: UserQuizAttempt = {
        ...attempt,
        quizId: `attempt-${Date.now()}`,
        timestamp: Date.now(),
      };

      const updatedHistory = [fullAttempt, ...profile.history].slice(0, 10);
      const newTotalQuizzes = profile.totalQuizzes + 1;
      const newTotalXp = profile.totalXp + attempt.xpEarned;
      const newTotalAnswered = profile.totalAnswered + attempt.totalQuestions;
      const newTotalCorrect = profile.totalCorrect + attempt.correctAnswers;

      // Update category stats if not mixed
      const updatedCategoryStats = { ...profile.categoryStats };
      if (attempt.categoryId !== 'mixed') {
        const catKey = attempt.categoryId as CyberIqCategoryId;
        const currentCat = updatedCategoryStats[catKey] || {
          quizzesTaken: 0,
          correctAnswers: 0,
          totalAnswered: 0,
          bestScorePercentage: 0,
        };
        updatedCategoryStats[catKey] = {
          quizzesTaken: currentCat.quizzesTaken + 1,
          correctAnswers: currentCat.correctAnswers + attempt.correctAnswers,
          totalAnswered: currentCat.totalAnswered + attempt.totalQuestions,
          bestScorePercentage: Math.max(currentCat.bestScorePercentage, attempt.scorePercentage),
        };
      }

      // Check badge unlocks
      const newlyUnlocked: CyberIqBadge[] = [];
      const currentBadgeSet = new Set(profile.unlockedBadgeIds);

      CYBER_IQ_BADGES.forEach((badge) => {
        if (currentBadgeSet.has(badge.id)) return;

        let shouldUnlock = false;

        if (badge.id === 'badge-first-quiz' && newTotalQuizzes >= 1) {
          shouldUnlock = true;
        } else if (badge.id === 'badge-flawless' && attempt.scorePercentage === 100) {
          shouldUnlock = true;
        } else if (badge.id === 'badge-xp-500' && newTotalXp >= 500) {
          shouldUnlock = true;
        } else if (badge.categoryRequirement && badge.categoryRequirement === attempt.categoryId) {
          if (attempt.scorePercentage >= 80) {
            shouldUnlock = true;
          }
        }

        if (shouldUnlock) {
          currentBadgeSet.add(badge.id);
          newlyUnlocked.push(badge);
        }
      });

      const updatedProfile: UserCyberIqProfile = {
        totalQuizzes: newTotalQuizzes,
        totalXp: newTotalXp,
        totalAnswered: newTotalAnswered,
        totalCorrect: newTotalCorrect,
        unlockedBadgeIds: Array.from(currentBadgeSet),
        categoryStats: updatedCategoryStats,
        history: updatedHistory,
        lastActiveTimestamp: Date.now(),
      };

      saveProfile(updatedProfile);
      return { newlyUnlocked };
    },
    [profile, saveProfile]
  );

  // Reset progress
  const resetProfile = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event(UPDATE_EVENT));
    } catch {
      // Ignore
    }
  }, []);

  const overallAccuracy =
    profile.totalAnswered > 0
      ? Math.round((profile.totalCorrect / profile.totalAnswered) * 100)
      : 0;

  const currentRank = getRankForXp(profile.totalXp);

  return {
    profile,
    overallAccuracy,
    currentRank,
    recordQuizResult,
    resetProfile,
  };
}
