'use client';

import React, { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Flame,
  Calendar,
  Lock,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import {
  getDailyChallengeForDate,
} from '@/data/dailyChallengeBank';
import {
  recordChallengeSubmission,
  subscribeDailyChallengeState,
  getDailyChallengeSnapshot,
  getDailyChallengeServerSnapshot,
} from '@/lib/dailyChallengeStorage';

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export const DailyCyberChallenge: React.FC = () => {
  const isMounted = useIsMounted();
  const [dailyData] = useState(() => getDailyChallengeForDate(new Date()));
  const { challenge, dateString, dayNumber } = dailyData;

  const storageState = useSyncExternalStore(
    subscribeDailyChallengeState,
    getDailyChallengeSnapshot,
    getDailyChallengeServerSnapshot
  );

  const pastSubmission = storageState.history[dateString];
  const [localSelection, setLocalSelection] = useState<'A' | 'B' | 'C' | 'D' | null>(null);

  const selectedOptionId = pastSubmission ? pastSubmission.selectedOptionId : localSelection;
  const isSubmitted = Boolean(pastSubmission);

  const handleSelectOption = (id: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return; // Prevent altering already submitted answer
    setLocalSelection(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOptionId || isSubmitted) return;

    const chosenOption = challenge.options.find((o) => o.id === selectedOptionId);
    const isCorrect = Boolean(chosenOption?.isCorrect);

    recordChallengeSubmission(
      dateString,
      challenge.id,
      selectedOptionId,
      isCorrect
    );
  };

  const chosenOption = challenge.options.find((o) => o.id === selectedOptionId);
  const correctOption = challenge.options.find((o) => o.isCorrect);
  const isCorrectAnswer = chosenOption?.isCorrect ?? false;
  const streakCount = storageState.currentStreak;

  // Format date nicely (e.g. "October 28, 2026")
  const dateFormatted = new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <div className="w-full rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-5 sm:p-7 md:p-8 shadow-xl shadow-cyan-950/20 backdrop-blur-md">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <Badge variant="cyan" size="sm">
            <span className="font-mono uppercase tracking-wider">{challenge.category}</span>
          </Badge>
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
            <span>{dateFormatted}</span>
          </span>
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            • Day #{dayNumber}
          </span>
        </div>

        {/* Streak Indicator */}
        <div
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-amber-500/30 text-xs font-mono text-amber-300"
          title="Daily Challenge Streak (stored locally in browser)"
          suppressHydrationWarning
        >
          <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" aria-hidden="true" />
          <span>
            {isMounted
              ? streakCount > 0
                ? `${streakCount} Day Streak`
                : 'Start Your Streak'
              : 'Daily Streak'}
          </span>
        </div>
      </div>

      {/* Scenario Presentation */}
      <div className="pt-6 space-y-4">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 block font-semibold">
            {challenge.topic}
          </span>
          <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
            {challenge.scenario}
          </p>
        </div>

        {/* Question Prompt */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-200 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
          <span className="font-semibold text-slate-100">{challenge.question}</span>
        </div>

        {/* Answer Options Form */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-2">
          <fieldset className="space-y-3" disabled={isSubmitted}>
            <legend className="sr-only">Answer Options</legend>
            <div className="grid grid-cols-1 gap-3" role="radiogroup" aria-label="Challenge answers">
              {challenge.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                let optionStyle =
                  'border-slate-800/80 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-950 text-slate-300';

                if (isSubmitted) {
                  if (option.isCorrect) {
                    optionStyle = 'border-emerald-500/60 bg-emerald-950/30 text-emerald-200';
                  } else if (isSelected && !option.isCorrect) {
                    optionStyle = 'border-amber-500/60 bg-amber-950/30 text-amber-200';
                  } else {
                    optionStyle = 'border-slate-800/40 bg-slate-950/40 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyle =
                    'border-cyan-500/80 bg-cyan-950/40 text-white shadow-sm shadow-cyan-500/20';
                }

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(option.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 cyber-focus-ring ${optionStyle}`}
                    role="radio"
                    aria-checked={isSelected}
                    aria-disabled={isSubmitted}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSubmitted && option.isCorrect
                          ? 'bg-emerald-500 text-slate-950'
                          : isSubmitted && isSelected && !option.isCorrect
                          ? 'bg-amber-500 text-slate-950'
                          : isSelected
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {option.id}
                    </div>

                    <div className="flex-1 text-sm sm:text-base leading-snug">
                      <span>{option.text}</span>
                    </div>

                    {isSubmitted && option.isCorrect && (
                      <CheckCircle2
                        className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 ml-auto"
                        aria-hidden="true"
                      />
                    )}
                    {isSubmitted && isSelected && !option.isCorrect && (
                      <AlertTriangle
                        className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 ml-auto"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Submit Action Button (if not yet submitted) */}
          {!isSubmitted && (
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-mono text-slate-400">
                {selectedOptionId
                  ? 'Ready to verify defensive response.'
                  : 'Select an option to evaluate defense.'}
              </span>

              <button
                type="submit"
                disabled={!selectedOptionId}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-cyan-500/20 active:translate-y-0.5"
              >
                Submit Defensive Action
              </button>
            </div>
          )}
        </form>

        {/* Immediate Detailed Feedback Panel */}
        {isSubmitted && chosenOption && (
          <div
            className={`mt-6 p-5 sm:p-6 rounded-xl border space-y-4 animate-in fade-in duration-300 ${
              isCorrectAnswer
                ? 'border-emerald-500/40 bg-emerald-950/20'
                : 'border-amber-500/40 bg-amber-950/20'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isCorrectAnswer ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span className="font-bold text-emerald-300 text-base sm:text-lg">
                    Defensive Reflex Confirmed (+1 Day Streak)
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span className="font-bold text-amber-300 text-base sm:text-lg">
                    Defensive Risk Identified
                  </span>
                </>
              )}
            </div>

            {/* In-Depth Explanation */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {chosenOption.explanation}
            </p>

            {/* If wrong, also show the correct option reasoning */}
            {!isCorrectAnswer && correctOption && (
              <div className="p-3.5 rounded-lg bg-slate-950/80 border border-emerald-500/30 text-xs sm:text-sm text-slate-300 space-y-1">
                <span className="font-mono text-emerald-400 uppercase font-bold text-xs block">
                  Recommended Defense: Option {correctOption.id}
                </span>
                <p>{correctOption.explanation}</p>
              </div>
            )}

            {/* Practical Defensive Recommendation Rule */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1 text-xs sm:text-sm text-slate-300">
              <span className="font-mono text-cyan-400 uppercase font-bold text-xs flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                Security Rule:
              </span>
              <p className="text-slate-200">{challenge.defenseRecommendation}</p>
            </div>

            {/* Action Bar: Next Guide Link & Completion Notice */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-xs font-mono text-slate-400">
                Completed today • Streak recorded locally.
              </span>

              <Link
                href={challenge.relatedLink}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:text-cyan-200 font-bold text-xs sm:text-sm transition-colors group"
              >
                <span>{challenge.relatedLinkText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
