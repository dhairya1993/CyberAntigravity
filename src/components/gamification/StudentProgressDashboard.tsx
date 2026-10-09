'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Flame,
  Award,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
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
} from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { getLocalDateString } from '@/data/gamification';
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

export const StudentProgressDashboard: React.FC = () => {
  const { user, openAuthModal } = useAuth();
  const {
    profile,
    levelInfo,
    streakData,
    badges,
    overallAccuracy,
    resetProgress,
  } = useGamification();

  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [showResetModal, setShowResetModal] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationMessage, setMigrationMessage] = useState<string | null>(null);

  // Compute 7-day streak calendar strip
  const today = new Date();
  const past7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today.getTime() - (6 - i) * 86400000);
    const dateStr = getLocalDateString(d.getTime());
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
    const isToday = i === 6;
    const hasActivity = streakData.activityDates.includes(dateStr);
    return { dateStr, dayLabel, isToday, hasActivity };
  });

  // Filtered Badges
  const filteredBadges = badges.filter((b) => {
    if (badgeFilter === 'unlocked') return b.isUnlocked;
    if (badgeFilter === 'locked') return !b.isUnlocked;
    return true;
  });

  const unlockedCount = badges.filter((b) => b.isUnlocked).length;
  const totalBadges = badges.length;

  // Smart "Continue Learning" recommendation
  const unplayedCategory = CYBER_IQ_CATEGORIES.find(
    (c) => (profile.categoryStats[c.id]?.quizzesTaken || 0) === 0
  );
  const recommendedCategory = unplayedCategory || CYBER_IQ_CATEGORIES[0];

  const handleMigrateLegacy = async () => {
    setIsMigrating(true);
    try {
      const res = await fetch('/api/gamification/migrate-legacy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ legacyData: profile }),
      });
      const data = await res.json();
      if (res.ok) {
        setMigrationMessage(data.message || 'Progress verified and migrated successfully!');
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
  // VISITOR / UNAUTHENTICATED GATEWAY VIEW
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
            Visitors are welcome to freely explore all learning guides, cybersecurity tools, and Cyber IQ challenges.
            To unlock persistent XP, build learning streaks, and save your verified ranks across all devices, please sign in or create an account.
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
              <p className="text-xs text-slate-400">Your score history and level rank follow you across every computer and mobile device.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Verified XP &amp; Ranks</h4>
              <p className="text-xs text-slate-400">Server-validated scores prevent manipulation and certify real defensive comprehension.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <Award className="w-5 h-5 text-emerald-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">14 Verifiable Badges</h4>
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
  // AUTHENTICATED STUDENT DASHBOARD
  // ---------------------------------------------------------------------------
  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Legacy Data Migration Alert if applicable */}
      {(profile.totalQuizzes > 0 || profile.totalModulesCompleted > 0) && (
        <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/40 border border-cyan-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Cloud className="w-6 h-6 text-cyan-400 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">Local Activity Detected on This Device</h4>
              <p className="text-xs text-slate-300">
                Found {profile.totalQuizzes} quiz completions and {profile.totalModulesCompleted} completed modules from your offline visits.
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
          1. STUDENT LEVEL HERO BANNER
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
                Level {levelInfo.currentLevel} of 9 • {levelInfo.title}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-xs font-mono font-bold flex items-center gap-1.5">
                <Database className="w-3 h-3" />
                <span>Cloud Synced</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {user.displayName}&apos;s Progress
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              Account: {user.email}
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
                    {profile.totalXp.toLocaleString()} XP
                  </strong>
                </span>
                <span className="text-slate-400">
                  {levelInfo.isMaxLevel ? (
                    <span className="text-emerald-400 font-bold">Max Level Achieved</span>
                  ) : (
                    <span>
                      {levelInfo.xpRemaining} XP to Level {levelInfo.currentLevel + 1}
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
                <span>{levelInfo.minXp} XP (Lvl {levelInfo.currentLevel})</span>
                <span>{levelInfo.progressPercent}% Complete</span>
                <span>{levelInfo.isMaxLevel ? 'MAX' : `${levelInfo.maxXp + 1} XP (Lvl ${levelInfo.currentLevel + 1})`}</span>
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
                {profile.totalQuizzes === 0
                  ? 'Start First Quiz'
                  : `Next: ${recommendedCategory.title}`}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2">
                {profile.totalQuizzes === 0
                  ? 'Complete your first quiz in the Arena to unlock 50 XP and your First Steps badge.'
                  : recommendedCategory.shortDesc}
              </p>
            </div>

            <Link
              href={
                profile.totalQuizzes === 0
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
          2. CORE METRICS KPI GRID (4 Compact Cards)
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
            {profile.totalXp.toLocaleString()}{' '}
            <span className="text-xs font-mono text-amber-400 font-normal">XP</span>
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-1 font-mono">
            <span>Level {levelInfo.currentLevel}:</span>
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
                streakData.currentStreak > 0
                  ? 'bg-rose-950/60 border-rose-800/80 text-rose-400'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white flex items-baseline gap-1.5">
            <span>{streakData.currentStreak}</span>
            <span className="text-xs font-mono text-slate-400 font-normal">
              {streakData.currentStreak === 1 ? 'day' : 'days'}
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            {streakData.isActiveToday ? (
              <span className="text-emerald-400 font-semibold">Active today ✓</span>
            ) : streakData.isMaintainedFromYesterday ? (
              <span className="text-amber-400 font-semibold">Pending today (keep alive!)</span>
            ) : (
              <span>Longest streak: {streakData.longestStreak} days</span>
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
            {profile.totalQuizzes + profile.totalModulesCompleted}
          </div>
          <div className="text-xs text-slate-400 font-mono">
            <span>{profile.totalQuizzes} quizzes</span>
            <span className="mx-1">•</span>
            <span>{profile.totalModulesCompleted} modules</span>
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
          3. 7-DAY STREAK CALENDAR ACTIVITY STRIP
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
            {streakData.isActiveToday
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
          4. ACHIEVEMENT BADGES SHOWCASE (With Locked Action Links)
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
          5. RECENT ACTIVITY TIMELINE & EMPTY STATE
          ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Recent Learning Activity</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {profile.completedActivities.length} recorded events
          </span>
        </div>

        {profile.completedActivities.length === 0 ? (
          <div className="p-8 sm:p-12 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-4 max-w-xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-800/60 text-cyan-400 w-fit mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Your Defensive Journey Starts Here</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                You haven&apos;t completed any quizzes or learning modules yet in this browser. Complete your first challenge to earn 50 XP, begin your daily streak, and unlock the &quot;First Steps&quot; badge!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/cyber-iq"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-md shadow-cyan-500/20 transition-all"
              >
                Launch Cyber IQ Arena
              </Link>
              <Link
                href="/learn/cybersecurity-fundamentals"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs font-mono transition-all"
              >
                Study Cybersecurity Fundamentals
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {profile.completedActivities.slice(0, 10).map((act) => (
              <div
                key={act.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg border shrink-0 ${
                      act.type === 'module'
                        ? 'bg-teal-950 text-teal-300 border-teal-800'
                        : 'bg-cyan-950 text-cyan-300 border-cyan-800'
                    }`}
                  >
                    {act.type === 'module' ? (
                      <BookOpen className="w-4 h-4" />
                    ) : (
                      <Trophy className="w-4 h-4" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-bold text-white text-sm">{act.title}</div>
                    <div className="text-[11px] font-mono text-slate-400">
                      {act.type === 'module' ? 'Learning Module' : 'Cyber IQ Quiz'} • {act.dateStr}
                      {act.scorePercentage !== undefined && ` • Score: ${act.scorePercentage}%`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:text-right pl-11 sm:pl-0">
                  <span className="px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800 font-mono font-bold">
                    +{act.xpEarned} XP
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =========================================================================
          6. STORAGE DISCLAIMER & RESET CONTROLS
          ========================================================================= */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              Client-Side Local Progress Architecture
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Progress, XP, badges, and learning streaks are securely stored inside this browser&apos;s local storage. In accordance with CyberAntigravity&apos;s privacy-first design, no passwords, personal identifiers, or remote tracking telemetry are collected. Progress does not synchronize across separate devices or incognito sessions.
            </p>
          </div>
        </div>

        {profile.totalXp > 0 && (
          <div className="pt-2 border-t border-slate-800 flex justify-end">
            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="text-xs font-mono text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5 cursor-pointer cyber-focus-ring px-2 py-1 rounded"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Local Progress</span>
            </button>
          </div>
        )}
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="p-6 rounded-2xl bg-slate-950 border border-rose-800/60 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <AlertCircle className="w-5 h-5" />
              <span>Reset All Progress?</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              This will clear your local XP, level advancement, streak records, and badge unlocks in this browser. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  resetProgress();
                  setShowResetModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold cursor-pointer transition-colors"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
