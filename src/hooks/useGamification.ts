'use client';

import { useSyncExternalStore, useMemo, useCallback } from 'react';
import {
  StudentGamificationProfile,
  XpAwardResult,
  AchievementBadge,
  CompletedActivityRecord,
  LevelInfo,
  StreakData,
  GamificationNotificationEvent,
} from '@/types/gamification';
import { UserQuizAttempt, CyberIqCategoryId } from '@/types/cyberIq';
import {
  calculateQuizXp,
  getLevelInfo,
  calculateStreak,
  getLocalDateString,
  ACHIEVEMENT_BADGES,
  XP_RULES,
} from '@/data/gamification';

export const GAMIFICATION_STORAGE_KEY = 'cyberantigravity_cyber_iq_profile_v1';
export const GAMIFICATION_UPDATE_EVENT = 'cyber_gamification_updated';
export const GAMIFICATION_NOTIFY_EVENT = 'cyber_xp_notification';

const DEFAULT_PROFILE: StudentGamificationProfile = {
  totalXp: 0,
  totalQuizzes: 0,
  totalModulesCompleted: 0,
  totalAnswered: 0,
  totalCorrect: 0,
  unlockedBadgeIds: [],
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  activityDates: [],
  completedActivityIds: [],
  completedActivities: [],
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
  createdAt: 0,
};

function subscribeStorage(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener(GAMIFICATION_UPDATE_EVENT, callback);
  window.addEventListener('cyber_iq_profile_updated', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(GAMIFICATION_UPDATE_EVENT, callback);
    window.removeEventListener('cyber_iq_profile_updated', callback);
  };
}

function getStorageSnapshot(): string {
  if (typeof window === 'undefined') return '';
  try {
    return localStorage.getItem(GAMIFICATION_STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

function getServerSnapshot(): string {
  return '';
}

export function dispatchGamificationNotification(event: GamificationNotificationEvent) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(GAMIFICATION_NOTIFY_EVENT, { detail: event }));
}

export function useGamification() {
  const snapshot = useSyncExternalStore(subscribeStorage, getStorageSnapshot, getServerSnapshot);

  const profile: StudentGamificationProfile = useMemo(() => {
    if (!snapshot) return DEFAULT_PROFILE;
    try {
      const parsed = JSON.parse(snapshot) as Partial<StudentGamificationProfile>;
      const existingHistory: UserQuizAttempt[] = Array.isArray(parsed.history) ? parsed.history : [];

      // Extract existing activity dates from history if activityDates is empty (backward compatibility)
      let initialActivityDates: string[] = Array.isArray(parsed.activityDates)
        ? parsed.activityDates
        : [];

      if (initialActivityDates.length === 0 && existingHistory.length > 0) {
        initialActivityDates = Array.from(
          new Set(existingHistory.map((h) => getLocalDateString(h.timestamp)))
        );
      }

      // Re-calculate streak from actual activity dates
      const streakInfo = calculateStreak(initialActivityDates);

      return {
        ...DEFAULT_PROFILE,
        ...parsed,
        currentStreak: streakInfo.currentStreak,
        longestStreak: Math.max(parsed.longestStreak || 0, streakInfo.longestStreak),
        lastActiveDate: streakInfo.lastActiveDate,
        activityDates: streakInfo.activityDates,
        completedActivityIds: Array.isArray(parsed.completedActivityIds)
          ? parsed.completedActivityIds
          : [],
        completedActivities: Array.isArray(parsed.completedActivities)
          ? parsed.completedActivities
          : [],
        categoryStats: {
          ...DEFAULT_PROFILE.categoryStats,
          ...(parsed.categoryStats || {}),
        },
        history: existingHistory,
      };
    } catch {
      return DEFAULT_PROFILE;
    }
  }, [snapshot]);

  // Persist profile helper
  const saveProfile = useCallback((newProfile: StudentGamificationProfile) => {
    try {
      localStorage.setItem(GAMIFICATION_STORAGE_KEY, JSON.stringify(newProfile));
      window.dispatchEvent(new Event(GAMIFICATION_UPDATE_EVENT));
      window.dispatchEvent(new Event('cyber_iq_profile_updated'));
    } catch {
      // Ignore storage errors (private browsing quotas, etc.)
    }
  }, []);

  // Level info memo
  const levelInfo: LevelInfo = useMemo(() => {
    return getLevelInfo(profile.totalXp);
  }, [profile.totalXp]);

  // Streak data memo
  const streakData: StreakData = useMemo(() => {
    return calculateStreak(profile.activityDates);
  }, [profile.activityDates]);

  // Badges status memo
  const badgesWithStatus = useMemo(() => {
    const unlockedSet = new Set(profile.unlockedBadgeIds);
    return ACHIEVEMENT_BADGES.map((badge) => {
      const isUnlocked = unlockedSet.has(badge.id) || badge.checkUnlocked(profile);
      return {
        ...badge,
        isUnlocked,
      };
    });
  }, [profile]);

  // Check if a specific module is completed
  const hasCompletedModule = useCallback(
    (moduleId: string) => {
      const key = `module:${moduleId}`;
      return profile.completedActivityIds.includes(key);
    },
    [profile.completedActivityIds]
  );

  // 1. RECORD QUIZ COMPLETION (With strict idempotency & deduplication)
  const recordQuizCompletion = useCallback(
    (
      attempt: Omit<UserQuizAttempt, 'quizId' | 'timestamp'> & {
        sessionToken?: string; // Optional unique session token to block duplicate submissions
      }
    ): XpAwardResult => {
      const now = Date.now();
      const todayStr = getLocalDateString(now);

      // Generate a session key for deduplication
      const sessionKey = attempt.sessionToken || `quiz_att_${now}`;

      // Check if this exact session was already processed
      if (profile.completedActivityIds.includes(sessionKey)) {
        return {
          xpAwarded: 0,
          xpBreakdown: ['Quiz already recorded (No duplicate XP awarded)'],
          newlyUnlockedBadges: [],
          levelUp: null,
          isDuplicate: true,
        };
      }

      // Calculate XP according to transparent starting rules
      const xpCalc = calculateQuizXp(attempt.scorePercentage);
      const xpEarned = xpCalc.totalXp;

      const fullAttempt: UserQuizAttempt = {
        quizId: sessionKey,
        categoryId: attempt.categoryId,
        categoryTitle: attempt.categoryTitle,
        difficulty: attempt.difficulty,
        timestamp: now,
        totalQuestions: attempt.totalQuestions,
        correctAnswers: attempt.correctAnswers,
        scorePercentage: attempt.scorePercentage,
        xpEarned,
        timeSpentSeconds: attempt.timeSpentSeconds,
      };

      const updatedHistory = [fullAttempt, ...profile.history].slice(0, 20);
      const newTotalQuizzes = profile.totalQuizzes + 1;
      const newTotalXp = profile.totalXp + xpEarned;
      const newTotalAnswered = profile.totalAnswered + attempt.totalQuestions;
      const newTotalCorrect = profile.totalCorrect + attempt.correctAnswers;

      // Update Category Stats
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

      // Update Dates and Recalculate Streak
      const updatedDatesSet = new Set(profile.activityDates);
      updatedDatesSet.add(todayStr);
      const updatedDates = Array.from(updatedDatesSet).sort();
      const newStreakInfo = calculateStreak(updatedDates, now);

      // Activity record
      const activityRecord: CompletedActivityRecord = {
        id: sessionKey,
        type: 'quiz',
        title: `${attempt.categoryTitle} (${attempt.difficulty})`,
        category: attempt.categoryId,
        difficulty: attempt.difficulty,
        xpEarned,
        completedAt: now,
        dateStr: todayStr,
        scorePercentage: attempt.scorePercentage,
      };
      const updatedCompletedActivities = [activityRecord, ...profile.completedActivities].slice(0, 30);
      const updatedCompletedActivityIds = [...profile.completedActivityIds, sessionKey];

      // Temporary profile to evaluate badges
      const tempProfile: StudentGamificationProfile = {
        ...profile,
        totalQuizzes: newTotalQuizzes,
        totalXp: newTotalXp,
        totalAnswered: newTotalAnswered,
        totalCorrect: newTotalCorrect,
        categoryStats: updatedCategoryStats,
        history: updatedHistory,
        activityDates: updatedDates,
        currentStreak: newStreakInfo.currentStreak,
        longestStreak: Math.max(profile.longestStreak, newStreakInfo.longestStreak),
      };

      // Check Badge Unlocks
      const currentBadgeSet = new Set(profile.unlockedBadgeIds);
      const newlyUnlocked: AchievementBadge[] = [];

      ACHIEVEMENT_BADGES.forEach((badge) => {
        if (!currentBadgeSet.has(badge.id)) {
          if (badge.checkUnlocked(tempProfile)) {
            currentBadgeSet.add(badge.id);
            newlyUnlocked.push(badge);
          }
        }
      });

      // Check Level Up
      const oldLevel = getLevelInfo(profile.totalXp).currentLevel;
      const newLevelInfo = getLevelInfo(newTotalXp);
      const levelUp =
        newLevelInfo.currentLevel > oldLevel
          ? {
              from: oldLevel,
              to: newLevelInfo.currentLevel,
              newTitle: newLevelInfo.title,
            }
          : null;

      const finalProfile: StudentGamificationProfile = {
        ...tempProfile,
        unlockedBadgeIds: Array.from(currentBadgeSet),
        completedActivityIds: updatedCompletedActivityIds,
        completedActivities: updatedCompletedActivities,
        lastActiveTimestamp: now,
        lastActiveDate: todayStr,
      };

      saveProfile(finalProfile);

      // Trigger compact notification
      dispatchGamificationNotification({
        id: `notify-${now}`,
        type: levelUp ? 'level_up' : newlyUnlocked.length > 0 ? 'badge' : 'xp',
        title: levelUp
          ? `Level Up! Level ${newLevelInfo.currentLevel}: ${newLevelInfo.title}`
          : `+${xpEarned} XP Earned!`,
        message: newlyUnlocked.length > 0
          ? `Achievement unlocked: ${newlyUnlocked.map((b) => b.name).join(', ')}`
          : `${attempt.categoryTitle} challenge completed with ${attempt.scorePercentage}% score.`,
        xpEarned,
        badgeName: newlyUnlocked[0]?.name,
        levelNumber: newLevelInfo.currentLevel,
      });

      return {
        xpAwarded: xpEarned,
        xpBreakdown: xpCalc.breakdown,
        newlyUnlockedBadges: newlyUnlocked,
        levelUp,
        isDuplicate: false,
      };
    },
    [profile, saveProfile]
  );

  // 2. RECORD MODULE COMPLETION (With strict idempotency & deduplication)
  const recordModuleCompletion = useCallback(
    (moduleInfo: { moduleId: string; title: string; topicSlug?: string }): XpAwardResult => {
      const moduleKey = `module:${moduleInfo.moduleId}`;

      // Check if already completed (Prevents duplicate rewards!)
      if (profile.completedActivityIds.includes(moduleKey)) {
        return {
          xpAwarded: 0,
          xpBreakdown: ['Module already completed (XP claimed previously)'],
          newlyUnlockedBadges: [],
          levelUp: null,
          isDuplicate: true,
          alreadyCompleted: true,
        };
      }

      const now = Date.now();
      const todayStr = getLocalDateString(now);
      const xpEarned = XP_RULES.MODULE_COMPLETION;

      const newTotalModules = profile.totalModulesCompleted + 1;
      const newTotalXp = profile.totalXp + xpEarned;

      // Update Dates and Recalculate Streak
      const updatedDatesSet = new Set(profile.activityDates);
      updatedDatesSet.add(todayStr);
      const updatedDates = Array.from(updatedDatesSet).sort();
      const newStreakInfo = calculateStreak(updatedDates, now);

      const activityRecord: CompletedActivityRecord = {
        id: moduleKey,
        type: 'module',
        title: moduleInfo.title,
        xpEarned,
        completedAt: now,
        dateStr: todayStr,
      };

      const updatedCompletedActivities = [activityRecord, ...profile.completedActivities].slice(0, 30);
      const updatedCompletedActivityIds = [...profile.completedActivityIds, moduleKey];

      // Temporary profile to evaluate badges
      const tempProfile: StudentGamificationProfile = {
        ...profile,
        totalModulesCompleted: newTotalModules,
        totalXp: newTotalXp,
        activityDates: updatedDates,
        currentStreak: newStreakInfo.currentStreak,
        longestStreak: Math.max(profile.longestStreak, newStreakInfo.longestStreak),
      };

      // Check Badge Unlocks
      const currentBadgeSet = new Set(profile.unlockedBadgeIds);
      const newlyUnlocked: AchievementBadge[] = [];

      ACHIEVEMENT_BADGES.forEach((badge) => {
        if (!currentBadgeSet.has(badge.id)) {
          if (badge.checkUnlocked(tempProfile)) {
            currentBadgeSet.add(badge.id);
            newlyUnlocked.push(badge);
          }
        }
      });

      // Check Level Up
      const oldLevel = getLevelInfo(profile.totalXp).currentLevel;
      const newLevelInfo = getLevelInfo(newTotalXp);
      const levelUp =
        newLevelInfo.currentLevel > oldLevel
          ? {
              from: oldLevel,
              to: newLevelInfo.currentLevel,
              newTitle: newLevelInfo.title,
            }
          : null;

      const finalProfile: StudentGamificationProfile = {
        ...tempProfile,
        unlockedBadgeIds: Array.from(currentBadgeSet),
        completedActivityIds: updatedCompletedActivityIds,
        completedActivities: updatedCompletedActivities,
        lastActiveTimestamp: now,
        lastActiveDate: todayStr,
      };

      saveProfile(finalProfile);

      // Trigger compact notification
      dispatchGamificationNotification({
        id: `notify-${now}`,
        type: levelUp ? 'level_up' : newlyUnlocked.length > 0 ? 'badge' : 'xp',
        title: levelUp
          ? `Level Up! Level ${newLevelInfo.currentLevel}: ${newLevelInfo.title}`
          : `+${xpEarned} XP Earned!`,
        message: newlyUnlocked.length > 0
          ? `Achievement unlocked: ${newlyUnlocked.map((b) => b.name).join(', ')}`
          : `Learning module "${moduleInfo.title}" completed!`,
        xpEarned,
        badgeName: newlyUnlocked[0]?.name,
        levelNumber: newLevelInfo.currentLevel,
      });

      return {
        xpAwarded: xpEarned,
        xpBreakdown: [`+${xpEarned} XP: Learning Module Completed`],
        newlyUnlockedBadges: newlyUnlocked,
        levelUp,
        isDuplicate: false,
        alreadyCompleted: false,
      };
    },
    [profile, saveProfile]
  );

  // 3. RESET PROGRESS
  const resetProgress = useCallback(() => {
    try {
      localStorage.removeItem(GAMIFICATION_STORAGE_KEY);
      window.dispatchEvent(new Event(GAMIFICATION_UPDATE_EVENT));
      window.dispatchEvent(new Event('cyber_iq_profile_updated'));
    } catch {
      // Ignore
    }
  }, []);

  const overallAccuracy =
    profile.totalAnswered > 0
      ? Math.round((profile.totalCorrect / profile.totalAnswered) * 100)
      : 0;

  return {
    profile,
    levelInfo,
    streakData,
    badges: badgesWithStatus,
    overallAccuracy,
    hasCompletedModule,
    recordQuizCompletion,
    recordModuleCompletion,
    resetProgress,
  };
}
