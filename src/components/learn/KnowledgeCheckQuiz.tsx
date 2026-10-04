'use client';

import React, { useState } from 'react';
import { LearningQuizQuestion } from '@/types';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface KnowledgeCheckQuizProps {
  questions: LearningQuizQuestion[];
  topicTitle?: string;
}

export const KnowledgeCheckQuiz: React.FC<KnowledgeCheckQuizProps> = ({
  questions,
  topicTitle,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState(false);

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (revealed) return; // Prevent changing answers after revealing
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionId) {
        score += 1;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setRevealed(false);
  };

  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <section id="knowledge-check" className="rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden space-y-8 scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>KNOWLEDGE CHECK</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Check Your Understanding {topicTitle ? `— ${topicTitle}` : ''}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            5 scenario-based questions covering the CIA Triad, AuthN vs AuthZ, Phishing, and Least Privilege.
          </p>
        </div>

        {/* Factual Disclaimer: No Certification & No Server Collection */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 max-w-xs">
          <span className="font-semibold text-slate-300">Client-Side Only:</span> Educational self-check. No answers or personal data are stored or submitted. Not a professional certification.
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const userAnswer = selectedAnswers[q.id];
          const isCorrect = userAnswer === q.correctOptionId;

          return (
            <div
              key={q.id}
              className={`rounded-xl border p-5 transition-all ${
                revealed
                  ? isCorrect
                    ? 'border-emerald-500/40 bg-emerald-950/10'
                    : 'border-red-500/40 bg-red-950/10'
                  : 'border-slate-800 bg-slate-950/60'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-800 text-cyan-400 border border-slate-700">
                    Question {qIndex + 1} of {totalQuestions}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{q.topic}</span>
                </div>

                {revealed && (
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    {isCorrect ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Correct
                      </span>
                    ) : (
                      <span className="text-red-400 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Review
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Question Prompt */}
              <p className="text-sm sm:text-base font-semibold text-white mb-4 leading-snug">
                {q.question}
              </p>

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((opt) => {
                  const isSelected = userAnswer === opt.id;
                  const isAnswerKey = opt.id === q.correctOptionId;

                  let optionStyle =
                    'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900';

                  if (isSelected && !revealed) {
                    optionStyle =
                      'border-cyan-500 bg-cyan-950/30 text-white ring-1 ring-cyan-500/40';
                  }

                  if (revealed) {
                    if (isAnswerKey) {
                      optionStyle =
                        'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold';
                    } else if (isSelected && !isAnswerKey) {
                      optionStyle =
                        'border-red-500/60 bg-red-950/30 text-red-200 line-through';
                    } else {
                      optionStyle = 'border-slate-800/60 bg-slate-950/40 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={revealed}
                      onClick={() => handleSelectOption(q.id, opt.id)}
                      className={`w-full p-3 rounded-lg border text-left text-xs sm:text-sm transition-all flex items-start gap-3 cyber-focus-ring ${optionStyle}`}
                    >
                      <span className="font-mono font-bold w-5 h-5 rounded bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 text-xs">
                        {opt.id}
                      </span>
                      <span className="flex-1">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation (Shown when revealed) */}
              {revealed && (
                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300">
                    <span className="font-bold text-white block mb-1">
                      Why this is correct:
                    </span>
                    {q.explanation}
                  </div>

                  <div className="text-slate-400 flex items-start gap-1.5 italic">
                    <AlertCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Defensive Takeaway:</strong> {q.whyItMatters}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quiz Controls & Results */}
      <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400 font-mono">
          {!revealed ? (
            <span>
              {answeredCount} of {totalQuestions} answered
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" />
              <span className="text-white font-bold text-sm">
                Score: {score}/{totalQuestions} ({percentage}%)
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-cyan-400">
                {score === 5
                  ? 'Outstanding foundational grasp!'
                  : score >= 3
                  ? 'Solid understanding of core principles.'
                  : 'Good review opportunity—re-read the lesson sections above.'}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {!revealed ? (
            <Button
              type="button"
              variant="primary"
              size="md"
              disabled={answeredCount < totalQuestions}
              onClick={() => setRevealed(true)}
              className="w-full sm:w-auto"
            >
              Check Answers ({answeredCount}/{totalQuestions})
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="md"
              icon={<RotateCcw className="w-4 h-4" />}
              iconPosition="left"
              onClick={resetQuiz}
              className="w-full sm:w-auto"
            >
              Try Again
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
