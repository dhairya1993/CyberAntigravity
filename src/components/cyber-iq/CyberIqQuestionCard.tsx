'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  ChevronRight,
  Clock,
  HelpCircle,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { CyberIqQuestion } from '@/types/cyberIq';

interface CyberIqQuestionCardProps {
  question: CyberIqQuestion;
  categoryTitle: string;
  questionIndex: number;
  totalQuestions: number;
  elapsedSeconds: number;
  currentScore: number;
  onAnswer: (optionId: 'A' | 'B' | 'C' | 'D', isCorrect: boolean) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

export const CyberIqQuestionCard: React.FC<CyberIqQuestionCardProps> = ({
  question,
  categoryTitle,
  questionIndex,
  totalQuestions,
  elapsedSeconds,
  currentScore,
  onAnswer,
  onNext,
  isLastQuestion,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  const handleNextClick = () => {
    setSelectedOptionId(null);
    setHasAnswered(false);
    onNext();
  };

  // Format elapsed time (MM:SS)
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const progressPercent = Math.round(((questionIndex + 1) / totalQuestions) * 100);

  const handleSelect = (optionId: 'A' | 'B' | 'C' | 'D') => {
    if (hasAnswered) return; // Prevent multiple submissions
    setSelectedOptionId(optionId);
    setHasAnswered(true);

    const chosen = question.options.find((o) => o.id === optionId);
    onAnswer(optionId, !!chosen?.isCorrect);
  };

  const selectedOption = question.options.find((o) => o.id === selectedOptionId);
  const correctOption = question.options.find((o) => o.isCorrect);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* =========================================================================
          1. HEADER BAR: PROGRESS, TIMER & SCORE
          ========================================================================= */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 font-bold border border-cyan-800">
              {categoryTitle}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full border text-[11px] ${
                question.difficulty === 'Beginner'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                  : question.difficulty === 'Intermediate'
                  ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                  : 'bg-rose-950/80 text-rose-300 border-rose-800'
              }`}
            >
              {question.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-1.5" title="Elapsed Time">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{timeFormatted}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Current Score">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-white font-bold">{currentScore} pts</span>
            </div>
            <div className="text-cyan-400 font-bold">
              {questionIndex + 1} / {totalQuestions}
            </div>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-500 to-teal-400 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* =========================================================================
          2. QUESTION PROMPT & SCENARIO CARD
          ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-slate-800/90 shadow-2xl space-y-6">
        {/* Scenario Callout (if available) */}
        {question.scenario && (
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs sm:text-sm text-cyan-100 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Real-World Scenario:
              </span>
              <p className="leading-relaxed">{question.scenario}</p>
            </div>
          </div>
        )}

        {/* Main Question Heading */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug tracking-tight">
          {question.question}
        </h3>

        {/* =========================================================================
            3. FOUR ANSWER OPTIONS
            ========================================================================= */}
        <div
          role="radiogroup"
          aria-label="Answer options"
          className="grid grid-cols-1 gap-3.5"
        >
          {question.options.map((opt) => {
            const isChosen = selectedOptionId === opt.id;
            const showCorrect = hasAnswered && opt.isCorrect;
            const showIncorrect = hasAnswered && isChosen && !opt.isCorrect;
            const isMuted = hasAnswered && !isChosen && !opt.isCorrect;

            let buttonStyles =
              'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 text-slate-200';
            let pillStyles = 'bg-slate-800 text-slate-300 border-slate-700';

            if (showCorrect) {
              buttonStyles =
                'bg-emerald-950/60 border-emerald-500/80 text-emerald-100 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500';
              pillStyles = 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold';
            } else if (showIncorrect) {
              buttonStyles =
                'bg-rose-950/60 border-rose-500/80 text-rose-100 shadow-lg shadow-rose-950/30 ring-1 ring-rose-500';
              pillStyles = 'bg-rose-500 text-white border-rose-400 font-bold';
            } else if (isMuted) {
              buttonStyles = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
              pillStyles = 'bg-slate-900 text-slate-600 border-slate-800';
            }

            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={isChosen}
                disabled={hasAnswered}
                onClick={() => handleSelect(opt.id)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 group cursor-pointer min-h-[56px] cyber-focus-ring ${buttonStyles}`}
              >
                {/* Option Letter Pill */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl border flex items-center justify-center text-xs font-mono shrink-0 transition-colors ${pillStyles}`}
                >
                  {opt.id}
                </div>

                {/* Option Text */}
                <div className="flex-1 text-sm sm:text-base leading-relaxed pt-0.5 font-medium">
                  {opt.text}
                </div>

                {/* Status Indicator Icon (Accessibility: Not color alone) */}
                <div className="shrink-0 mt-0.5">
                  {showCorrect && (
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-bold">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span className="hidden sm:inline">Correct</span>
                    </div>
                  )}
                  {showIncorrect && (
                    <div className="flex items-center gap-1.5 text-rose-400 text-xs font-mono font-bold">
                      <XCircle className="w-5 h-5 text-rose-400" />
                      <span className="hidden sm:inline">Incorrect</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            4. EDUCATIONAL FEEDBACK CONTAINER (Displays immediately upon choice)
            ========================================================================= */}
        {hasAnswered && selectedOption && (
          <div
            className={`p-6 rounded-2xl border animate-in fade-in duration-300 space-y-4 ${
              selectedOption.isCorrect
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100'
                : 'bg-amber-950/40 border-amber-500/50 text-amber-100'
            }`}
          >
            {/* Feedback Banner Header */}
            <div className="flex items-start gap-3">
              {selectedOption.isCorrect ? (
                <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1 flex-1">
                <div className="text-base font-bold flex items-center gap-2">
                  <span>{selectedOption.isCorrect ? 'Correct Decision!' : 'Security Analysis'}</span>
                  {!selectedOption.isCorrect && correctOption && (
                    <span className="text-xs font-mono font-normal opacity-90 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700">
                      Best Choice: Option {correctOption.id}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {correctOption?.explanation}
                </p>
              </div>
            </div>

            {/* Why other options are traps (if available) */}
            {question.whyOthersWrong && (
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                <div className="font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5 text-[10px]">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Why other options are pitfalls:</span>
                </div>
                <p className="leading-relaxed text-slate-300">{question.whyOthersWrong}</p>
              </div>
            )}

            {/* Core Security Principle */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
              <BookOpen className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono text-cyan-300 uppercase font-bold tracking-wider block">
                  Core Security Takeaway:
                </span>
                <p className="leading-relaxed text-slate-200 font-medium">
                  {question.securityPrinciple}
                </p>
              </div>
            </div>

            {/* Continue / Next Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleNextClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-bold shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.02] cursor-pointer cyber-focus-ring"
              >
                <span>{isLastQuestion ? 'View Challenge Results →' : 'Continue to Next Prompt'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
