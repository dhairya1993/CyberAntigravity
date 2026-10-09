'use client';

import React, { useState } from 'react';
import {
  Trophy,
  Target,
  Flame,
  Award,
  ArrowRight,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Layers,
} from 'lucide-react';
import { UserCyberIqProfile, CyberIqCategoryId } from '@/types/cyberIq';
import { CYBER_IQ_CATEGORIES, CYBER_IQ_BADGES } from '@/data/cyberIqQuestions';
import { CyberSkillRank } from '@/hooks/useCyberIqStorage';

interface CyberIqDashboardProps {
  profile: UserCyberIqProfile;
  currentRank: CyberSkillRank;
  overallAccuracy: number;
  onStartQuiz: (categoryId?: CyberIqCategoryId) => void;
  onOpenBadges: () => void;
  onResetProgress: () => void;
}

export const CyberIqDashboard: React.FC<CyberIqDashboardProps> = ({
  profile,
  currentRank,
  overallAccuracy,
  onStartQuiz,
  onOpenBadges,
  onResetProgress,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Calculate XP progress to next rank
  const xpCurrent = profile.totalXp;
  const xpMin = currentRank.minXp;
  const xpMax = currentRank.maxXp === 99999 ? 2000 : currentRank.maxXp;
  const rankProgressPercent = Math.min(
    100,
    Math.max(0, Math.round(((xpCurrent - xpMin) / (xpMax - xpMin)) * 100))
  );

  // Find suggested next topic: prioritize category with 0 attempts, or lowest accuracy
  const unplayedCategory = CYBER_IQ_CATEGORIES.find(
    (c) => (profile.categoryStats[c.id]?.quizzesTaken || 0) === 0
  );
  const suggestedCategory = unplayedCategory || CYBER_IQ_CATEGORIES[0];

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Link to Full Student Progress & Streak Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-slate-950 border border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Full Student Progress &amp; Streaks</div>
            <div className="text-xs text-slate-400">View 9-level roadmap progression, 7-day activity streaks, and achievement badges.</div>
          </div>
        </div>
        <a
          href="/learn/progress"
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white border border-slate-700 hover:border-cyan-500/50 font-mono text-xs font-bold transition-all inline-flex items-center justify-center gap-1.5 shrink-0"
        >
          <span>Open Student Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* =========================================================================
          1. STATS BANNER: 4 KPI CARDS
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total XP & Skill Rank */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Total Score & XP</span>
            <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-800/80 text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">{profile.totalXp.toLocaleString()} <span className="text-xs font-mono text-amber-400">XP</span></div>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <span>Rank:</span>
              <span className={`font-bold ${currentRank.textColor}`}>{currentRank.title}</span>
            </div>
          </div>
          {/* Progress bar to next rank */}
          <div className="space-y-1 pt-1">
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${rankProgressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Level {currentRank.levelNumber}</span>
              <span>{rankProgressPercent}% to next</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Quizzes Completed */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Quizzes Completed</span>
            <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-800/80 text-cyan-400">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">{profile.totalQuizzes}</div>
            <p className="text-xs text-slate-400 mt-1">
              {profile.totalAnswered} questions answered
            </p>
          </div>
          <div className="pt-2 text-[11px] font-mono text-cyan-400">
            {profile.totalQuizzes === 0 ? 'No quizzes taken yet' : `${profile.totalCorrect} correct choices`}
          </div>
        </div>

        {/* KPI 3: Overall Accuracy */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Defensive Accuracy</span>
            <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">{overallAccuracy}%</div>
            <p className="text-xs text-slate-400 mt-1">
              Based on {profile.totalAnswered} total prompts
            </p>
          </div>
          <div className="pt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{profile.totalCorrect} correct answers</span>
          </div>
        </div>

        {/* KPI 4: Badges Unlocked */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Badges Unlocked</span>
            <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-800/80 text-purple-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {profile.unlockedBadgeIds.length} <span className="text-sm font-normal text-slate-400">/ {CYBER_IQ_BADGES.length}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Achievement milestones
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenBadges}
            className="pt-2 text-[11px] font-mono text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View All Badges</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. SUGGESTED NEXT TOPIC & QUICK LAUNCH BANNER
          ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Suggested Next Arena Challenge</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {suggestedCategory.title}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {suggestedCategory.shortDesc}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onStartQuiz(suggestedCategory.id)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 text-sm font-bold shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] cursor-pointer cyber-focus-ring shrink-0"
        >
          <span>Launch Challenge</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* =========================================================================
          3. CATEGORY MASTERY & RECENT QUIZZES
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Category Masteries (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Category Knowledge Mastery</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">7 Core Arenas</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CYBER_IQ_CATEGORIES.map((cat) => {
              const stat = profile.categoryStats[cat.id] || {
                quizzesTaken: 0,
                correctAnswers: 0,
                totalAnswered: 0,
                bestScorePercentage: 0,
              };
              const accuracy =
                stat.totalAnswered > 0
                  ? Math.round((stat.correctAnswers / stat.totalAnswered) * 100)
                  : 0;

              return (
                <div
                  key={cat.id}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white leading-tight">
                        {cat.title}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {stat.quizzesTaken > 0
                          ? `${stat.quizzesTaken} completed • High: ${stat.bestScorePercentage}%`
                          : 'Not attempted yet'}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${cat.badgeColor}`}
                    >
                      {accuracy > 0 ? `${accuracy}%` : '0%'}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${stat.bestScorePercentage}%` }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => onStartQuiz(cat.id)}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer pt-1"
                    >
                      <span>Play Arena</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity & Local Memory Notice (1 Col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Recent Activity</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Last 5 runs</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4">
            {profile.history.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <HelpCircle className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">No quizzes taken in this browser session.</p>
                <p className="text-[11px] text-slate-400">
                  Select a category above to record your first defense score!
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {profile.history.slice(0, 5).map((att) => (
                  <div
                    key={att.quizId}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-200">{att.categoryTitle}</div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {att.difficulty} • {att.correctAnswers}/{att.totalQuestions} correct
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-cyan-400 font-mono text-xs">
                        {att.scorePercentage}%
                      </span>
                      <div className="text-[10px] font-mono text-amber-400">
                        +{att.xpEarned} XP
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Local Storage Disclaimer & Reset Button */}
            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Progress is securely stored in this device&apos;s browser memory. No tracking cookies or cloud telemetry are transmitted.
              </p>

              {profile.totalQuizzes > 0 && (
                <div>
                  {showResetConfirm ? (
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 space-y-2 text-xs">
                      <div className="flex items-center gap-1.5 text-rose-300 font-bold">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Reset all local progress?</span>
                      </div>
                      <p className="text-[11px] text-rose-200/80">
                        This will clear your local XP, badge unlocks, and quiz history.
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            onResetProgress();
                            setShowResetConfirm(false);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold cursor-pointer transition-colors"
                        >
                          Confirm Reset
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowResetConfirm(false)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowResetConfirm(true)}
                      className="text-[11px] font-mono text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Browser Progress</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
