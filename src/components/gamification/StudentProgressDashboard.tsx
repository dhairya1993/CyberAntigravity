'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Flame,
  Award,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Clock,
  Compass,
  KeyRound,
  AlertTriangle,
  EyeOff,
  Wifi,
  Terminal,
  Zap,
  ShieldCheck,
  MailCheck,
  Calendar,
  Info,
  Lock,
  Cloud,
  Database,
  RefreshCw,
} from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { getLocalDateString, ACHIEVEMENT_BADGES } from '@/data/gamification';
import type { LevelInfo } from '@/types/gamification';
import { CYBER_IQ_CATEGORIES } from '@/data/cyberIqQuestions';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';

// Map icon name string to Lucide component
const BADGE_ICONS: Record<string, React.ElementType> = {
  Sparkles,
  MailCheck,
  CheckCircle2,
  Compass,
  Flame,
  BookOpen,
  KeyRound,
  AlertTriangle,
  EyeOff,
  Wifi,
  Terminal,
  Award,
  Zap,
  ShieldCheck,
};

interface AuthenticatedServerProfile {
  studentId: string;
  email: string;
  displayName: string;
  totalXp: number;
  currentLevel: number;
  levelInfo: LevelInfo;
  currentStreak: number;
  longestStreak: number;
  streakInfo: {
    currentStreak: number;
    longestStreak: number;
    isActiveToday: boolean;
    isMaintainedFromYesterday: boolean;
    lastActiveDate: string | null;
    activityDates: string[];
  };
  totalQuizzes: number;
  totalModulesCompleted: number;
  completedModuleIds: string[];
  completedModules?: Array<{
    id: string;
    module_id: string;
    xp_earned: number;
    completed_at: string;
  }>;
  quizHistory?: Array<{
    id: string;
    quiz_id: string;
    category: string;
    score: number;
    total_questions: number;
    score_percentage: number;
    xp_earned: number;
    completed_at: string;
  }>;
  unlockedBadges: string[];
  categoryStats: Record<string, { quizzesTaken: number; bestScorePercentage: number }>;
  recentActivities: Array<{
    id: string;
    activity_type: string;
    title: string;
    xp_earned: number;
    details?: Record<string, unknown>;
    timestamp: string;
  }>;
}

export const StudentProgressDashboard: React.FC = () => {
  const { user, openAuthModal } = useAuth();
  const { profile: localProfile } = useGamification();

  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationMessage, setMigrationMessage] = useState<string | null>(null);

  // Authenticated server-side state
  const [serverProfile, setServerProfile] = useState<AuthenticatedServerProfile | null>(null);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [progressError, setProgressError] = useState<string | null>(null);

  const fetchServerProgress = useCallback(async (showLoading = false) => {
    if (!user) {
      setServerProfile(null);
      setIsLoadingProgress(false);
      return;
    }

    if (showLoading) {
      setIsLoadingProgress(true);
    }
    setProgressError(null);

    try {
      const res = await fetch('/api/gamification/progress', { cache: 'no-store' });
      if (!res.ok) {
        if (res.status === 401) {
          setServerProfile(null);
          return;
        }
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      if (data.success && data.profile) {
        setServerProfile(data.profile);
      } else {
        throw new Error(data.error || 'Failed to parse progress data.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch student progress.';
      setProgressError(msg);
    } finally {
      setIsLoadingProgress(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    let ignore = false;

    async function load() {
      try {
        const res = await fetch('/api/gamification/progress', { cache: 'no-store' });
        if (!res.ok) {
          if (res.status === 401) {
            if (!ignore) {
              setServerProfile(null);
            }
            return;
          }
          throw new Error(`Server returned status ${res.status}`);
        }

        const data = await res.json();
        if (!ignore) {
          if (data.success && data.profile) {
            setServerProfile(data.profile);
            setProgressError(null);
          } else {
            throw new Error(data.error || 'Failed to parse progress data.');
          }
        }
      } catch (err: unknown) {
        if (!ignore) {
          const msg = err instanceof Error ? err.message : 'Failed to fetch student progress.';
          setProgressError(msg);
        }
      } finally {
        if (!ignore) {
          setIsLoadingProgress(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [user]);

  // Migration handler
  const handleMigrateLegacy = async () => {
    setIsMigrating(true);
    setMigrationMessage(null);
    try {
      const res = await fetch('/api/gamification/migrate-legacy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ legacyData: localProfile }),
      });
      const data = await res.json();
      if (res.ok) {
        setMigrationMessage(data.message || 'Progress verified and migrated successfully!');
        // Refresh server profile to reflect new XP and modules
        await fetchServerProgress();
      } else {
        setMigrationMessage(data.error || 'Migration failed.');
      }
    } catch {
      setMigrationMessage('Failed to communicate with migration server.');
    } finally {
      setIsMigrating(false);
    }
  };

  // ---------------------------------------------------------------------------
  // 1. VISITOR / UNAUTHENTICATED GATEWAY VIEW
  // ---------------------------------------------------------------------------
  if (!user) {
    return (
      <div className="space-y-10 animate-in fade-in duration-300">
        <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden text-center max-w-4xl mx-auto">
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-96 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-950/50">
            <Lock className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AUTHENTICATED STUDENT DASHBOARD</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Track Your Defense Mastery &amp; Badges
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Visitors are welcome to freely explore all learning guides, cybersecurity tools, and Cyber IQ challenges without signing up.
            To unlock persistent XP, build daily learning streaks, and save your verified ranks permanently across all devices, please sign in or create an account.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              variant="primary"
              size="lg"
              onClick={() => openAuthModal('login')}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              Sign In to Your Account
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => openAuthModal('register')}
              className="w-full sm:w-auto text-cyan-300 border-cyan-800 hover:bg-cyan-950/50"
            >
              Create Free Account
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-800/80 text-left">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <Cloud className="w-5 h-5 text-cyan-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Cross-Device Sync</h4>
              <p className="text-xs text-slate-400">Your score history, badges, and level rank follow you across every computer and mobile device.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Server-Verified XP</h4>
              <p className="text-xs text-slate-400">Server-validated scores prevent manipulation and certify real defensive comprehension.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <Award className="w-5 h-5 text-emerald-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Verifiable Badges</h4>
              <p className="text-xs text-slate-400">Earn recognition for phishing detection, password entropy, and streak consistency.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/cyber-iq"
            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            <span>Or try a practice quiz in the Cyber IQ Arena without saving</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. LOADING STATE (SKELETON SHIMMER)
  // ---------------------------------------------------------------------------
  if (isLoadingProgress) {
    return (
      <div className="space-y-8 animate-pulse">
        {/* Banner Skeleton */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="h-6 w-48 bg-slate-800 rounded-full" />
          <div className="h-10 w-96 bg-slate-800 rounded-xl" />
          <div className="h-4 w-72 bg-slate-800/80 rounded" />
          <div className="h-3 w-full bg-slate-800/60 rounded-full mt-6" />
        </div>

        {/* KPI Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 h-28 space-y-2">
              <div className="h-4 w-24 bg-slate-800 rounded" />
              <div className="h-8 w-16 bg-slate-800 rounded" />
            </div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 h-64 flex items-center justify-center text-slate-500 font-mono text-xs">
          Loading authenticated progress from secure database...
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 3. ERROR STATE
  // ---------------------------------------------------------------------------
  if (progressError || !serverProfile) {
    return (
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-rose-950/40 border border-rose-800/80 text-rose-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-rose-400 shrink-0" />
            <div>
              <h3 className="text-base font-bold text-white">Connection Error</h3>
              <p className="text-xs text-rose-200 mt-0.5">
                {progressError || 'Could not load your persistent progress from the server.'}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchServerProgress(true)}
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            className="text-rose-300 border-rose-800 hover:bg-rose-950"
          >
            Retry Connection
          </Button>
        </div>
      </div>
    );
  }

  // Derive active data from authoritative server profile
  const {
    totalXp,
    currentLevel,
    levelInfo,
    currentStreak,
    longestStreak,
    streakInfo,
    totalQuizzes,
    totalModulesCompleted,
    completedModuleIds = [],
    completedModules = [],
    quizHistory = [],
    unlockedBadges = [],
    categoryStats = {},
    recentActivities = [],
  } = serverProfile;

  // Compute 7-day streak calendar strip
  const today = new Date();
  const past7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today.getTime() - (6 - i) * 86400000);
    const dateStr = getLocalDateString(d.getTime());
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
    const isToday = i === 6;
    const hasActivity = streakInfo.activityDates.includes(dateStr);
    return { dateStr, dayLabel, isToday, hasActivity };
  });

  // Badges calculation
  const unlockedSet = new Set(unlockedBadges);
  const badgesWithStatus = ACHIEVEMENT_BADGES.map((b) => ({
    ...b,
    isUnlocked: unlockedSet.has(b.id),
  }));

  const filteredBadges = badgesWithStatus.filter((b) => {
    if (badgeFilter === 'unlocked') return b.isUnlocked;
    if (badgeFilter === 'locked') return !b.isUnlocked;
    return true;
  });

  const unlockedCount = badgesWithStatus.filter((b) => b.isUnlocked).length;
  const totalBadges = badgesWithStatus.length;

  // Smart "Continue Learning" recommendation
  const unplayedCategory = CYBER_IQ_CATEGORIES.find(
    (c) => (categoryStats[c.id]?.quizzesTaken || 0) === 0
  );
  const recommendedCategory = unplayedCategory || CYBER_IQ_CATEGORIES[0];

  // Overall accuracy
  let totalScoreSum = 0;
  let totalMaxScoreSum = 0;
  for (const q of quizHistory) {
    totalScoreSum += q.score;
    totalMaxScoreSum += q.total_questions;
  }
  const overallAccuracy =
    totalMaxScoreSum > 0 ? Math.round((totalScoreSum / totalMaxScoreSum) * 100) : 0;

  // Check if student has legacy local data that isn't in DB yet
  const hasUnmigratedLocalData =
    localProfile.totalModulesCompleted > 0 &&
    localProfile.completedActivityIds.some(
      (id) => id.startsWith('module:') && !completedModuleIds.includes(id.replace('module:', ''))
    );

  // ---------------------------------------------------------------------------
  // 4. ONBOARDING EMPTY STATE (FOR BRAND NEW ACCOUNTS WITH 0 ACTIVITIES)
  // ---------------------------------------------------------------------------
  const isBrandNewAccount = totalQuizzes === 0 && totalModulesCompleted === 0;

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Local Legacy Migration Alert if applicable */}
      {hasUnmigratedLocalData && (
        <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/40 border border-cyan-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Cloud className="w-6 h-6 text-cyan-400 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">Unmigrated Local Progress Detected</h4>
              <p className="text-xs text-slate-300">
                Found unmigrated learning activities in this browser. You can safely verify and link them to your persistent account.
              </p>
              {migrationMessage && (
                <p className="text-xs text-emerald-300 font-semibold mt-1">{migrationMessage}</p>
              )}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={isMigrating}
            onClick={handleMigrateLegacy}
            className="shrink-0 text-cyan-300 border-cyan-800 hover:bg-cyan-950"
          >
            {isMigrating ? 'Verifying...' : 'Verify & Migrate to Account'}
          </Button>
        </div>
      )}

      {/* =========================================================================
          HERO BANNER: LEVEL, XP, AND CLOUD STATUS
          ========================================================================= */}
      <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            {/* Level Tag & User Status */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${levelInfo.badgeColor}`}>
                Level {currentLevel} of 9 • {levelInfo.title}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-xs font-mono font-bold flex items-center gap-1.5">
                <Database className="w-3 h-3" />
                <span>Cloud Synced</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {user.displayName}&apos;s Command Center
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              Signed in as: {user.email}
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {levelInfo.description}
            </p>

            {/* Progress to next level bar */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">
                  Total XP:{' '}
                  <strong className="text-amber-400 font-bold">
                    {totalXp.toLocaleString()} XP
                  </strong>
                </span>
                <span className="text-slate-400">
                  {levelInfo.isMaxLevel ? (
                    <span className="text-emerald-400 font-bold">Max Level Achieved</span>
                  ) : (
                    <span>
                      {levelInfo.xpRemaining} XP to Level {currentLevel + 1}
                    </span>
                  )}
                </span>
              </div>

              <div className="w-full bg-slate-800/80 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-amber-400 transition-all duration-700 ease-out"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{levelInfo.minXp} XP (Lvl {currentLevel})</span>
                <span>{levelInfo.progressPercent}% Complete</span>
                <span>{levelInfo.isMaxLevel ? 'MAX' : `${levelInfo.maxXp + 1} XP (Lvl ${currentLevel + 1})`}</span>
              </div>
            </div>
          </div>

          {/* Quick Continue Action Button Card */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between gap-4 shrink-0 lg:w-80">
            <div className="space-y-1">
              <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                Recommended Action
              </div>
              <h3 className="text-base font-bold text-white">
                {totalQuizzes === 0
                  ? 'Start First Quiz'
                  : `Next: ${recommendedCategory.title}`}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2">
                {totalQuizzes === 0
                  ? 'Complete your first quiz in the Arena to unlock 50 XP and your First Steps badge.'
                  : recommendedCategory.shortDesc}
              </p>
            </div>

            <Link
              href={
                totalQuizzes === 0
                  ? '/cyber-iq'
                  : `/cyber-iq?category=${recommendedCategory.id}`
              }
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold text-xs sm:text-sm font-mono flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] cyber-focus-ring"
            >
              <span>Continue Learning</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CORE METRICS KPI GRID (4 Compact Cards)
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total XP */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Total XP Earned
            </span>
            <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-800/80 text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {totalXp.toLocaleString()}{' '}
            <span className="text-xs font-mono text-amber-400 font-normal">XP</span>
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-1 font-mono">
            <span>Level {currentLevel}:</span>
            <span className={`font-bold ${levelInfo.textColor}`}>{levelInfo.title}</span>
          </div>
        </div>

        {/* Card 2: Learning Streak */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Daily Streak
            </span>
            <div
              className={`p-2 rounded-xl border ${
                currentStreak > 0
                  ? 'bg-rose-950/60 border-rose-800/80 text-rose-400'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white flex items-baseline gap-1.5">
            <span>{currentStreak}</span>
            <span className="text-xs font-mono text-slate-400 font-normal">
              {currentStreak === 1 ? 'day' : 'days'}
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            {streakInfo.isActiveToday ? (
              <span className="text-emerald-400 font-semibold">Active today ✓</span>
            ) : streakInfo.isMaintainedFromYesterday ? (
              <span className="text-amber-400 font-semibold">Pending today (keep alive!)</span>
            ) : (
              <span>Longest streak: {longestStreak} days</span>
            )}
          </div>
        </div>

        {/* Card 3: Completed Learning Activities */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Completed Activities
            </span>
            <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-800/80 text-cyan-400">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {totalQuizzes + totalModulesCompleted}
          </div>
          <div className="text-xs text-slate-400 font-mono">
            <span>{totalQuizzes} quizzes</span>
            <span className="mx-1">•</span>
            <span>{totalModulesCompleted} modules</span>
            {overallAccuracy > 0 && (
              <span className="ml-1 text-emerald-400 font-semibold">({overallAccuracy}% accuracy)</span>
            )}
          </div>
        </div>

        {/* Card 4: Badges Progress */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Achievements
            </span>
            <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-800/80 text-purple-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {unlockedCount}{' '}
            <span className="text-sm font-normal text-slate-400">/ {totalBadges}</span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            {totalBadges - unlockedCount === 0
              ? 'All badges unlocked!'
              : `${totalBadges - unlockedCount} locked milestones remaining`}
          </div>
        </div>
      </div>

      {/* =========================================================================
          ONBOARDING EMPTY STATE (Shown only if 0 activities recorded)
          ========================================================================= */}
      {isBrandNewAccount && (
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-950/90 border border-cyan-500/30 text-center space-y-6 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto shadow-xl shadow-cyan-950/50">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Begin Your Defensive Training
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
              Your account is successfully linked to persistent cloud storage. Complete your first quiz or learning module to earn XP, start your daily streak, and unlock your first achievement badges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto">
            <Link
              href="/cyber-iq"
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all group block"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Step 1: Quiz Arena</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Phishing Detection Quiz</h4>
              <p className="text-xs text-slate-400">Earn up to 95 XP and unlock the &quot;First Steps&quot; badge.</p>
            </Link>

            <Link
              href="/learn/cybersecurity-fundamentals"
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all group block"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Step 2: Core Guide</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Cybersecurity Fundamentals</h4>
              <p className="text-xs text-slate-400">Complete this guide to earn +30 XP and the Theory badge.</p>
            </Link>
          </div>
        </div>
      )}

      {/* =========================================================================
          7-DAY STREAK CALENDAR ACTIVITY STRIP
          ========================================================================= */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              7-Day Activity Calendar
            </h3>
          </div>
          <div className="text-xs font-mono text-slate-400">
            {streakInfo.isActiveToday
              ? 'You completed a qualifying activity today!'
              : 'Complete a quiz or module today to maintain your streak.'}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {past7Days.map((day) => (
            <div
              key={day.dateStr}
              className={`p-3 rounded-xl border text-center transition-all ${
                day.hasActivity
                  ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
                  : day.isToday
                  ? 'bg-slate-900 border-amber-500/40 text-slate-300'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400'
              }`}
            >
              <div className="text-[11px] font-mono uppercase font-bold">{day.dayLabel}</div>
              <div className="my-1.5 flex items-center justify-center">
                {day.hasActivity ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <div
                    className={`w-2 h-2 rounded-full ${
                      day.isToday ? 'bg-amber-400 animate-pulse' : 'bg-slate-700'
                    }`}
                  />
                )}
              </div>
              <div className="text-[10px] font-mono text-slate-400 truncate">
                {day.dateStr.slice(5)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          ACHIEVEMENT BADGES SHOWCASE (Filterable, Unlocked vs Locked)
          ========================================================================= */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Achievement Badges</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Unlock badges by completing quizzes, perfecting defense scores, maintaining streaks, and studying modules.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <button
              type="button"
              onClick={() => setBadgeFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                badgeFilter === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({totalBadges})
            </button>
            <button
              type="button"
              onClick={() => setBadgeFilter('unlocked')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                badgeFilter === 'unlocked'
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Unlocked ({unlockedCount})
            </button>
            <button
              type="button"
              onClick={() => setBadgeFilter('locked')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                badgeFilter === 'locked'
                  ? 'bg-slate-800 text-slate-200 font-bold border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Locked ({totalBadges - unlockedCount})
            </button>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBadges.map((badge) => {
            const IconComp = BADGE_ICONS[badge.iconName] || Award;

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 relative overflow-hidden ${
                  badge.isUnlocked
                    ? 'bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950 border-amber-500/30 shadow-lg shadow-amber-950/10'
                    : 'bg-slate-950/60 border-slate-800/80 opacity-80'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`p-3 rounded-xl border ${
                        badge.isUnlocked
                          ? 'bg-amber-950/70 border-amber-600/60 text-amber-300 shadow-md shadow-amber-900/20'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                        badge.isUnlocked
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800 font-bold'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {badge.isUnlocked ? 'UNLOCKED ✓' : 'LOCKED'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {badge.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                </div>

                {/* Footer condition / Action link */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="text-[11px] font-mono text-slate-400">
                    <span className="text-slate-400">Condition:</span>{' '}
                    <span>{badge.conditionDescription}</span>
                  </div>

                  {!badge.isUnlocked ? (
                    <Link
                      href={badge.actionLink}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 font-semibold pt-1"
                    >
                      <span>{badge.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 pt-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Criteria Satisfied</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          COMPLETED MODULES & CURRICULUM PROGRESS
          ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Completed Learning Modules</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {completedModules.length} verified modules
          </span>
        </div>

        {completedModules.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-slate-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">No Modules Completed Yet</h4>
                <p className="text-xs text-slate-400">
                  Study educational guides in the Learning Hub to verify your knowledge and claim +30 XP per module.
                </p>
              </div>
            </div>
            <Link
              href="/learn/cybersecurity-fundamentals"
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shrink-0 transition-colors"
            >
              Start Fundamentals
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {completedModules.map((m) => (
              <div
                key={m.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/30 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-white capitalize">
                      {m.module_id.replace(/-/g, ' ')}
                    </h4>
                    <p className="text-[10px] font-mono text-slate-400">
                      Completed: {m.completed_at ? String(m.completed_at).split('T')[0] : 'Verified'}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded">
                  +{m.xp_earned} XP
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =========================================================================
          QUIZ HISTORY & ACCURACY LOG
          ========================================================================= */}
      {quizHistory.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <h2 className="text-lg font-bold text-white">Verified Quiz History</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {quizHistory.length} quiz records
            </span>
          </div>

          <div className="space-y-2">
            {quizHistory.slice(0, 10).map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg border shrink-0 ${
                      q.score_percentage === 100
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : q.score_percentage >= 80
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-bold text-white text-sm capitalize">
                      {q.category} Quiz Challenge
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      Score: {q.score}/{q.total_questions} ({q.score_percentage}%) • Date:{' '}
                      {q.completed_at ? String(q.completed_at).split('T')[0] : 'Recent'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:text-right pl-11 sm:pl-0">
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold border ${
                      q.score_percentage === 100
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : q.score_percentage >= 80
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {q.score_percentage === 100
                      ? 'FLAWLESS'
                      : q.score_percentage >= 80
                      ? 'HIGH SCORE'
                      : 'PASSED'}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800 font-mono font-bold">
                    +{q.xp_earned} XP
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          RECENT ACTIVITY TIMELINE
          ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Recent Learning Stream</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {recentActivities.length} recorded events
          </span>
        </div>

        {recentActivities.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-950/80 border border-slate-800 text-center text-xs text-slate-400 font-mono">
            No recent stream events recorded yet. Complete quizzes or modules to populate your activity log.
          </div>
        ) : (
          <div className="space-y-2">
            {recentActivities.slice(0, 10).map((act) => (
              <div
                key={act.id}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg border shrink-0 ${
                      act.activity_type === 'badge_unlocked'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : act.activity_type === 'module_completed'
                        ? 'bg-teal-950 text-teal-300 border-teal-800'
                        : 'bg-cyan-950 text-cyan-300 border-cyan-800'
                    }`}
                  >
                    {act.activity_type === 'badge_unlocked' ? (
                      <Award className="w-3.5 h-3.5" />
                    ) : act.activity_type === 'module_completed' ? (
                      <BookOpen className="w-3.5 h-3.5" />
                    ) : (
                      <Trophy className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">{act.title}</div>
                    <div className="text-[10px] font-mono text-slate-400">
                      {act.timestamp ? act.timestamp.replace('T', ' ').slice(0, 16) : 'Recently'}
                    </div>
                  </div>
                </div>

                {act.xp_earned > 0 && (
                  <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800 font-mono font-bold text-[11px]">
                    +{act.xp_earned} XP
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =========================================================================
          PERSISTENCE NOTICE & SECURITY DETAILS
          ========================================================================= */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              Secure Cloud Persistence Architecture
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your learning XP, completed quizzes, badges, and streaks are securely validated on the server and persisted to the application database. Session tokens are digitally signed with HMAC-SHA256 and stored in HTTP-only cookies to ensure your credentials and progress remain safe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
