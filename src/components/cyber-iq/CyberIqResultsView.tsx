import React, { useState } from 'react';
import {
  Trophy,
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  BookOpen,
  Layers,
  ShieldCheck,
  Lock,
  Cloud,
  User,
} from 'lucide-react';
import { CyberIqBadge, UserQuizAttempt } from '@/types/cyberIq';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';

interface CyberIqResultsViewProps {
  attempt: UserQuizAttempt;
  newlyUnlockedBadges: CyberIqBadge[];
  onReviewAnswers: () => void;
  onRetake: () => void;
  onChooseNewCategory: () => void;
  answersMap?: Record<string, string>;
  isPersisted?: boolean;
  onPersistedSuccess?: () => void;
}

export const CyberIqResultsView: React.FC<CyberIqResultsViewProps> = ({
  attempt,
  newlyUnlockedBadges,
  onReviewAnswers,
  onRetake,
  onChooseNewCategory,
  answersMap,
  isPersisted: initialPersisted = false,
  onPersistedSuccess,
}) => {
  const { user, openAuthModal } = useAuth();
  const [persisted, setPersisted] = useState(initialPersisted);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // If user logs in while viewing results and answersMap is present, save immediately
  React.useEffect(() => {
    if (user && !persisted && answersMap && !isSaving) {
      const persistScore = async () => {
        setIsSaving(true);
        try {
          const res = await fetch('/api/gamification/complete-quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              quizId: attempt.quizId,
              category: attempt.categoryId,
              answers: answersMap,
              sessionToken: attempt.quizId,
            }),
          });
          const data = await res.json();
          if (res.ok) {
            setPersisted(true);
            setSaveMessage(data.message || 'Verified & saved to cloud database!');
            if (onPersistedSuccess) onPersistedSuccess();
          }
        } catch {
          // ignore
        } finally {
          setIsSaving(false);
        }
      };
      persistScore();
    }
  }, [user, persisted, answersMap, attempt, isSaving, onPersistedSuccess]);
  const {
    categoryTitle,
    difficulty,
    totalQuestions,
    correctAnswers,
    scorePercentage,
    xpEarned,
    timeSpentSeconds,
  } = attempt;

  const incorrectAnswers = totalQuestions - correctAnswers;
  const minutes = Math.floor(timeSpentSeconds / 60);
  const seconds = timeSpentSeconds % 60;
  const timeFormatted = `${minutes}m ${seconds}s`;

  // Performance Tier Assessment
  let performanceTitle = 'Cyber Curious';
  let performanceDesc = 'Great start! Review your missed questions below to sharpen your defensive awareness.';
  let performanceBadge = 'bg-slate-800 text-slate-300 border-slate-700';

  if (scorePercentage === 100) {
    performanceTitle = 'Flawless Security Mindset';
    performanceDesc = 'Perfection! You identified every trap, social engineering cue, and deceptive vector flawlessly.';
    performanceBadge = 'bg-emerald-950/80 text-emerald-300 border-emerald-500';
  } else if (scorePercentage >= 80) {
    performanceTitle = 'Defensive Thinker';
    performanceDesc = 'Exceptional instincts. You demonstrated strong skepticism and command over core security principles.';
    performanceBadge = 'bg-cyan-950/80 text-cyan-300 border-cyan-500';
  } else if (scorePercentage >= 60) {
    performanceTitle = 'Cyber Smart';
    performanceDesc = 'Solid foundation! A few deceptive traps caught your judgment, but your defensive reasoning is strong.';
    performanceBadge = 'bg-amber-950/80 text-amber-300 border-amber-500';
  } else if (scorePercentage >= 40) {
    performanceTitle = 'Cyber Aware';
    performanceDesc = 'You recognize basic red flags. Take time to study the detailed answer explanations below.';
    performanceBadge = 'bg-purple-950/80 text-purple-300 border-purple-500';
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-300">
      {/* =========================================================================
          1. MAIN RESULTS HERO CARD
          ========================================================================= */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-800 shadow-2xl text-center space-y-6 relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-cyan-500/10 blur-3xl pointer-events-none -z-10" />

        {/* Category & Difficulty Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400">
          <span className="text-cyan-400 font-bold">{categoryTitle}</span>
          <span>•</span>
          <span>{difficulty} Challenge</span>
        </div>

        {/* Big Score Gauge Display */}
        <div className="space-y-2">
          <div className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 tracking-tight">
            {scorePercentage}%
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${performanceBadge}`}>
              {performanceTitle}
            </span>
          </div>
        </div>

        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          {performanceDesc}
        </p>

        {/* Database Persistence Status Card */}
        {persisted ? (
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 max-w-2xl mx-auto flex items-center justify-between text-xs text-emerald-300">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold">{saveMessage || 'Verified & Persisted to Database (+XP Awarded)'}</span>
            </div>
            <span className="font-mono text-[11px] bg-emerald-900/60 text-emerald-200 px-2 py-0.5 rounded border border-emerald-700">
              Account Synced
            </span>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/80 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2.5 text-left">
              <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Unsaved Learning Activity</span>
                <span className="text-slate-400">
                  Sign in or create an account to permanently save this {scorePercentage}% score and claim your +{xpEarned} verified XP!
                </span>
              </div>
            </div>
            <Button
              variant="primary"
              size="sm"
              className="shrink-0"
              onClick={() => openAuthModal('login')}
            >
              <User className="w-3.5 h-3.5 mr-1" />
              Save Progress
            </Button>
          </div>
        )}

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 max-w-2xl mx-auto">
          {/* XP Earned */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase">XP Awarded</div>
            <div className="text-xl font-bold text-amber-400 flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4" />
              <span>+{xpEarned}</span>
            </div>
          </div>

          {/* Correct Answers */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Correct</div>
            <div className="text-xl font-bold text-emerald-400 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>{correctAnswers}</span>
            </div>
          </div>

          {/* Incorrect Answers */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Review Needed</div>
            <div className="text-xl font-bold text-rose-400 flex items-center justify-center gap-1">
              <XCircle className="w-4 h-4" />
              <span>{incorrectAnswers}</span>
            </div>
          </div>

          {/* Time Taken */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Duration</div>
            <div className="text-xl font-bold text-cyan-400 flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{timeFormatted}</span>
            </div>
          </div>
        </div>

        {/* XP Rules Breakdown Bar */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400">
          <span className="text-slate-300 font-bold">XP Breakdown:</span>
          <span className="text-amber-400">+50 Base Completion</span>
          {scorePercentage >= 80 && (
            <span className="text-teal-400">+25 High Score (80%+)</span>
          )}
          {scorePercentage === 100 && (
            <span className="text-emerald-400">+20 Flawless Bonus (100%)</span>
          )}
        </div>
      </div>

      {/* =========================================================================
          2. NEW BADGES CELEBRATION (If unlocked in this session)
          ========================================================================= */}
      {newlyUnlockedBadges.length > 0 && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-slate-950 border border-amber-500/40 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Achievement Unlocked! ({newlyUnlockedBadges.length})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {newlyUnlockedBadges.map((badge) => (
              <div
                key={badge.id}
                className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30 flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-amber-950 text-amber-300 border border-amber-800 shrink-0">
                  <Trophy className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="font-bold text-white text-xs">{badge.title}</div>
                  <div className="text-[11px] text-slate-300">{badge.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          3. ACTION BUTTONS: REVIEW, RETAKE, NEW CATEGORY, DASHBOARD
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {/* Button 1: Review All Answers */}
        <button
          type="button"
          onClick={onReviewAnswers}
          className="p-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/10 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer cyber-focus-ring"
        >
          <BookOpen className="w-4 h-4" />
          <span>Review Answers</span>
        </button>

        {/* Button 2: Retake Quiz */}
        <button
          type="button"
          onClick={onRetake}
          className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 font-bold text-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer cyber-focus-ring"
        >
          <RotateCcw className="w-4 h-4 text-cyan-400" />
          <span>Retake Challenge</span>
        </button>

        {/* Button 3: Choose Another Category */}
        <button
          type="button"
          onClick={onChooseNewCategory}
          className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 font-bold text-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer cyber-focus-ring"
        >
          <Layers className="w-4 h-4 text-teal-400" />
          <span>Switch Category</span>
        </button>

        {/* Button 4: Student Progress Dashboard */}
        <a
          href="/learn/progress"
          className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 text-amber-300 font-bold text-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer cyber-focus-ring text-center"
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>My Progress</span>
        </a>
      </div>

      {/* Defensive Tip Callout */}
      <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-3.5 text-xs text-slate-400 leading-relaxed">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="text-white font-bold block mb-0.5">Educational Purpose:</span>
          CyberAntigravity quizzes reinforce defensive skepticism and factual threat recognition. Use the &quot;Review All Answers&quot; tool above to inspect why each scenario distractor creates a potential vulnerability.
        </div>
      </div>
    </div>
  );
};
