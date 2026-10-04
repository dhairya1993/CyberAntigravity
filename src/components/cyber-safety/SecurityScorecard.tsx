'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Info,
} from 'lucide-react';
import { SCORECARD_QUESTIONS } from '@/data/cyberSafetyHubData';
import { ScorecardQuestion } from '@/types';

export const SecurityScorecard: React.FC = () => {
  // Store answered state: null = unanswered, true = yes, false = no
  const [answers, setAnswers] = useState<Record<string, boolean | null>>(() => {
    const initial: Record<string, boolean | null> = {};
    SCORECARD_QUESTIONS.forEach((q) => {
      initial[q.id] = null;
    });
    return initial;
  });

  const handleAnswer = (id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    const resetState: Record<string, boolean | null> = {};
    SCORECARD_QUESTIONS.forEach((q) => {
      resetState[q.id] = null;
    });
    setAnswers(resetState);
  };

  const answeredCount = Object.values(answers).filter((val) => val !== null).length;
  const yesCount = Object.values(answers).filter((val) => val === true).length;
  const totalQuestions = SCORECARD_QUESTIONS.length;
  const scorePercentage = Math.round((yesCount / totalQuestions) * 100);

  const getScoreTier = () => {
    if (answeredCount < 4) return { label: 'In Progress', color: 'text-slate-400', desc: 'Answer more questions to reveal your posture breakdown.' };
    if (scorePercentage >= 85) return { label: 'High-Assurance Habits', color: 'text-emerald-400', desc: 'Outstanding defensive habits. You maintain an exemplary personal cybersecurity baseline.' };
    if (scorePercentage >= 60) return { label: 'Solid Digital Hygiene', color: 'text-cyan-400', desc: 'Good baseline defenses in place. Addressing the remaining items will significantly reduce risk.' };
    if (scorePercentage >= 40) return { label: 'Emerging Defense', color: 'text-amber-400', desc: 'You have some habits, but several critical gaps leave key accounts vulnerable.' };
    return { label: 'Vulnerable Baseline', color: 'text-rose-400', desc: 'Immediate action recommended. Start with unique passwords and multi-factor authentication.' };
  };

  const tier = getScoreTier();

  return (
    <section id="security-scorecard" className="py-16 md:py-24 relative scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Self-Assessment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            How Strong Are Your Cyber Safety Habits?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Answer these 8 straightforward questions to assess your current defensive posture and receive a tailored checklist of habits to fortify.
          </p>

          {/* Privacy & Educational Disclaimer */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              No Personal Data Required: Educational self-assessment only, not a formal security audit. Runs in your browser; no answers are collected or transmitted to any server.
            </span>
          </div>
        </div>

        {/* Main Grid: Questions Left, Score Summary Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Questions Column */}
          <div className="lg:col-span-7 space-y-4">
            {SCORECARD_QUESTIONS.map((q: ScorecardQuestion, idx: number) => {
              const currentAnswer = answers[q.id];
              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all duration-200 ${
                    currentAnswer === true
                      ? 'bg-slate-900/90 border-emerald-500/40'
                      : currentAnswer === false
                      ? 'bg-slate-900/90 border-amber-500/40'
                      : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                          0{idx + 1}
                        </span>
                        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                          {q.category}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {q.question}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed pt-1">
                        {q.whyItMatters}
                      </p>
                    </div>
                  </div>

                  {/* Yes / No Toggle Controls */}
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-800/60">
                    <button
                      type="button"
                      onClick={() => handleAnswer(q.id, true)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                        currentAnswer === true
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                          : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Yes, I do this</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAnswer(q.id, false)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                        currentAnswer === false
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>No / Not yet</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Real-Time Assessment Sidebar */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur-md p-6 sm:p-7 shadow-xl shadow-black/40 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white">Assessment Score</h3>
                  <p className="text-xs text-slate-400">
                    {answeredCount} of {totalQuestions} answered
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-400 transition-colors py-1 px-2.5 rounded-lg bg-slate-950 border border-slate-800"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Progress Ring / Percentage */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-2">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Hygiene Score
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-cyan-400">
                  {scorePercentage}%
                </div>
                <div className={`text-sm font-bold ${tier.color}`}>
                  {tier.label}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                  {tier.desc}
                </p>
              </div>

              {/* Your Cyber Safety Checklist: Completed vs Uncompleted */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Your Cyber Safety Checklist
                </h4>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {SCORECARD_QUESTIONS.map((q) => {
                    const status = answers[q.id];
                    if (status === null) {
                      return (
                        <div
                          key={q.id}
                          className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 text-xs text-slate-500 flex items-center justify-between"
                        >
                          <span className="truncate mr-2">{q.category}</span>
                          <span className="text-[10px] italic shrink-0">Unanswered</span>
                        </div>
                      );
                    }
                    if (status === true) {
                      return (
                        <div
                          key={q.id}
                          className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-900/60 text-xs text-emerald-300 flex items-center justify-between"
                        >
                          <span className="truncate mr-2">{q.category}</span>
                          <span className="flex items-center gap-1 text-[11px] font-semibold shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                          </span>
                        </div>
                      );
                    }
                    return (
                      <div
                        key={q.id}
                        className="p-3 rounded-lg bg-amber-950/40 border border-amber-900/60 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-amber-300 font-semibold">
                          <span>{q.category}</span>
                          <span className="flex items-center gap-1 text-[11px]">
                            <XCircle className="w-3.5 h-3.5" /> Action Needed
                          </span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          💡 {q.adviceIfNo}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
