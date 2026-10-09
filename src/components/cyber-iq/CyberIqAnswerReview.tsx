'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  RotateCcw,
} from 'lucide-react';
import { CyberIqQuestion } from '@/types/cyberIq';

export interface AnsweredQuestionState {
  question: CyberIqQuestion;
  selectedOptionId: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
}

interface CyberIqAnswerReviewProps {
  answeredQuestions: AnsweredQuestionState[];
  onBackToResults: () => void;
  onRetake: () => void;
}

export const CyberIqAnswerReview: React.FC<CyberIqAnswerReviewProps> = ({
  answeredQuestions,
  onBackToResults,
  onRetake,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'incorrect' | 'correct'>('all');

  const filteredList = answeredQuestions.filter((item) => {
    if (filterMode === 'incorrect') return !item.isCorrect;
    if (filterMode === 'correct') return item.isCorrect;
    return true;
  });

  const totalCorrect = answeredQuestions.filter((item) => item.isCorrect).length;
  const totalIncorrect = answeredQuestions.length - totalCorrect;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Navigation & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-xl">
        <button
          type="button"
          onClick={onBackToResults}
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Results Summary</span>
        </button>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterMode === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({answeredQuestions.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('incorrect')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterMode === 'incorrect'
                ? 'bg-rose-500/20 text-rose-300 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Review ({totalIncorrect})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('correct')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterMode === 'correct'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Correct ({totalCorrect})
          </button>
        </div>
      </div>

      {/* Questions Review List */}
      <div className="space-y-6">
        {filteredList.map((item, idx) => {
          const { question, selectedOptionId, isCorrect } = item;
          const correctOpt = question.options.find((o) => o.isCorrect);

          return (
            <div
              key={question.id}
              className={`p-6 sm:p-8 rounded-3xl border transition-all space-y-6 ${
                isCorrect
                  ? 'bg-slate-950/80 border-slate-800'
                  : 'bg-slate-950/90 border-rose-900/40 shadow-xl shadow-rose-950/10'
              }`}
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold">#{idx + 1}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                    {question.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-bold">
                  {isCorrect ? (
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Answered Correctly</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-rose-400">
                      <XCircle className="w-4 h-4" />
                      <span>Incorrect Choice</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Scenario */}
              {question.scenario && (
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-cyan-400 uppercase text-[10px] font-bold block mb-0.5">
                      Scenario:
                    </span>
                    <p className="leading-relaxed">{question.scenario}</p>
                  </div>
                </div>
              )}

              {/* Question Prompt */}
              <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                {question.question}
              </h4>

              {/* Options breakdown */}
              <div className="space-y-2.5">
                {question.options.map((opt) => {
                  const wasChosen = selectedOptionId === opt.id;
                  const isRight = opt.isCorrect;

                  let borderClass = 'border-slate-800/80 bg-slate-900/40 text-slate-300';
                  let badge = null;

                  if (isRight) {
                    borderClass =
                      'border-emerald-500/80 bg-emerald-950/30 text-emerald-100 font-medium';
                    badge = (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Correct Answer</span>
                      </span>
                    );
                  } else if (wasChosen && !isRight) {
                    borderClass =
                      'border-rose-500/80 bg-rose-950/30 text-rose-100 font-medium';
                    badge = (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-800 font-bold flex items-center gap-1 shrink-0">
                        <XCircle className="w-3 h-3" />
                        <span>Your Choice</span>
                      </span>
                    );
                  }

                  return (
                    <div
                      key={opt.id}
                      className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs sm:text-sm ${borderClass}`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {opt.id}
                        </span>
                        <span>{opt.text}</span>
                      </div>
                      {badge}
                    </div>
                  );
                })}
              </div>

              {/* Educational Explanation Box */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs leading-relaxed">
                <div>
                  <span className="font-mono text-emerald-400 uppercase text-[10px] font-bold block mb-1">
                    Explanation:
                  </span>
                  <p className="text-slate-200">{correctOpt?.explanation}</p>
                </div>

                {question.whyOthersWrong && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="font-mono text-cyan-400 uppercase text-[10px] font-bold block mb-1">
                      Trap Analysis:
                    </span>
                    <p className="text-slate-300">{question.whyOthersWrong}</p>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-800/80 flex items-start gap-2 text-slate-300">
                  <BookOpen className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-cyan-300 uppercase text-[10px] font-bold">
                      Key Principle:
                    </span>{' '}
                    <span>{question.securityPrinciple}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToResults}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs font-mono transition-colors cursor-pointer"
        >
          ← Back to Results
        </button>

        <button
          type="button"
          onClick={onRetake}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retake Challenge</span>
        </button>
      </div>
    </div>
  );
};
