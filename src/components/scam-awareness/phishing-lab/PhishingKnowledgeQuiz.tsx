'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Award,
  RefreshCw,
  ArrowRight,
  Sparkles,
  Lightbulb,
  MousePointer,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; text: string; isCorrect: boolean }[];
  explanation: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which is the strongest warning sign?',
    options: [
      { label: 'A', text: 'The message contains a logo.', isCorrect: false },
      { label: 'B', text: 'The message creates an urgent deadline.', isCorrect: true },
      { label: 'C', text: 'The message uses professional language.', isCorrect: false },
      { label: 'D', text: 'The message contains a greeting.', isCorrect: false },
    ],
    explanation:
      'Urgency deadlines are designed to induce psychological panic, forcing victims into immediate action without independent verification.',
  },
  {
    id: 2,
    question: 'What should you do with a suspicious login link?',
    options: [
      {
        label: 'A',
        text: 'Do not use the link. Independently navigate to the official service.',
        isCorrect: true,
      },
      {
        label: 'B',
        text: 'Click it to inspect whether the browser address bar shows a padlock.',
        isCorrect: false,
      },
      {
        label: 'C',
        text: 'Forward the message to your coworkers to see if they can log in.',
        isCorrect: false,
      },
      {
        label: 'D',
        text: 'Reply with "UNSUBSCRIBE" or "STOP" to prompt an automatic cancellation.',
        isCorrect: false,
      },
    ],
    explanation:
      'Always ignore the provided link. Open a clean browser tab and type in the official domain address yourself.',
  },
  {
    id: 3,
    question: 'Does HTTPS guarantee that a website is legitimate?',
    options: [
      {
        label: 'A',
        text: 'No.',
        isCorrect: true,
      },
      {
        label: 'B',
        text: 'Yes, HTTPS proves the organization has been certified by law enforcement.',
        isCorrect: false,
      },
      {
        label: 'C',
        text: 'Yes, as long as the certificate has not expired.',
        isCorrect: false,
      },
      {
        label: 'D',
        text: 'Yes, browsers automatically prevent fake domains from enabling SSL.',
        isCorrect: false,
      },
    ],
    explanation:
      'HTTPS only encrypts the connection between the user and the server. Threat actors can easily set up SSL certificates on malicious websites.',
  },
  {
    id: 4,
    question: 'Why do scammers create urgency?',
    options: [
      {
        label: 'A',
        text: 'To reduce the victim\'s time to think and verify.',
        isCorrect: true,
      },
      {
        label: 'B',
        text: 'Because bank security servers purge pending notifications every 30 minutes.',
        isCorrect: false,
      },
      {
        label: 'C',
        text: 'To comply with emergency telecommunications laws.',
        isCorrect: false,
      },
      {
        label: 'D',
        text: 'To prevent network bandwidth saturation on regional cellular towers.',
        isCorrect: false,
      },
    ],
    explanation:
      'Artificial time constraints short-circuit rational skepticism, compelling victims to rush through verification before discovering inconsistencies.',
  },
  {
    id: 5,
    question: 'What is the safest way to verify an unexpected account warning?',
    options: [
      {
        label: 'A',
        text: 'Use an independently verified official channel.',
        isCorrect: true,
      },
      {
        label: 'B',
        text: 'Call the phone number listed inside the SMS body.',
        isCorrect: false,
      },
      {
        label: 'C',
        text: 'Click the link and inspect the footer copyright notice.',
        isCorrect: false,
      },
      {
        label: 'D',
        text: 'Reply to the sender requesting badge or corporate credentials.',
        isCorrect: false,
      },
    ],
    explanation:
      'Use contact details from the back of your physical payment card, official account statements, or a previously bookmarked official app.',
  },
];

interface PhishingKnowledgeQuizProps {
  onQuizComplete?: (score: number, total: number) => void;
  redFlagsCount?: number;
  hintsUsed?: number;
  unnecessaryClicks?: number;
  decisionWrong?: boolean;
}

export const PhishingKnowledgeQuiz: React.FC<PhishingKnowledgeQuizProps> = ({
  onQuizComplete,
  redFlagsCount = 6,
  hintsUsed = 0,
  unnecessaryClicks = 0,
  decisionWrong = false,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const currentQ = QUESTIONS[currentIdx];
  const totalQuestions = QUESTIONS.length;

  const handleSelectOption = (optionLabel: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionLabel,
    }));
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsSubmitted(true);
      const score = calculateQuizScore();
      if (onQuizComplete) {
        onQuizComplete(score, totalQuestions);
      }
    }
  };

  const handlePrevious = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const calculateQuizScore = (): number => {
    let count = 0;
    QUESTIONS.forEach((q) => {
      const selected = answers[q.id];
      const correct = q.options.find((opt) => opt.isCorrect)?.label;
      if (selected === correct) {
        count += 1;
      }
    });
    return count;
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentIdx(0);
    setIsSubmitted(false);
  };

  const quizScore = calculateQuizScore();

  // Defense Score Calculation according to Section 8:
  // Base score: 100
  // Wrong decision: -10
  // Each hint: -5
  // Each unnecessary click: -1 maximum 5 deductions
  // Correct red flag discovery: No deduction
  // Quiz incorrect question: -2 (keeps total balanced)
  const decisionDeduction = decisionWrong ? 10 : 0;
  const hintDeduction = hintsUsed * 5;
  const unnecessaryDeduction = Math.min(unnecessaryClicks, 5);
  const quizDeduction = (totalQuestions - quizScore) * 2;

  const rawFinalScore =
    100 - decisionDeduction - hintDeduction - unnecessaryDeduction - quizDeduction;
  const finalDefenseScore = Math.max(Math.min(rawFinalScore, 100), 0);

  // Defense Level Mapping
  const getDefenseLevel = (scoreVal: number): string => {
    if (scoreVal >= 90) return 'EXCELLENT DEFENSE';
    if (scoreVal >= 75) return 'STRONG AWARENESS';
    if (scoreVal >= 60) return 'DEVELOPING AWARENESS';
    return 'KEEP PRACTICING';
  };

  return (
    <section id="quiz-section" className="py-16 sm:py-20 bg-[#07090e] border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-800/80 bg-cyan-950/40 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            STAGE 04 • EVALUATION & BENCHMARK
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Knowledge Check
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Validate your ability to identify and respond to deceptive messaging patterns in this 5-question defensive quiz.
          </p>
        </div>

        {!isSubmitted ? (
          /* Active Question Card */
          <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 sm:p-8 backdrop-blur-sm space-y-6">
            {/* Progress Top Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
              <span>
                QUESTION {currentIdx + 1} OF {totalQuestions}
              </span>
              <span className="text-cyan-400">
                {Object.keys(answers).length} of {totalQuestions} Answered
              </span>
            </div>

            {/* Question Heading */}
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {currentQ.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="grid grid-cols-1 gap-3">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.id] === opt.label;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleSelectOption(opt.label)}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-start gap-3 cyber-focus-ring ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/70 text-cyan-200 shadow-md shadow-cyan-950/50'
                        : 'border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:bg-slate-900/80'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-cyan-400 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="text-sm font-medium leading-relaxed">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Question Controls */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                disabled={currentIdx === 0}
                className="text-slate-400 disabled:opacity-30"
              >
                &larr; Previous
              </Button>

              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleNext}
                disabled={!answers[currentQ.id]}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400"
              >
                {currentIdx === totalQuestions - 1 ? 'Finish & View Score' : 'Next Question'}
              </Button>
            </div>
          </div>
        ) : (
          /* SECTION 8: PHISHING DEFENSE SCORE SYSTEM */
          <div className="rounded-3xl border-2 border-cyan-500/50 bg-slate-950/95 p-6 sm:p-10 backdrop-blur-md space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-800 bg-cyan-950/60 text-cyan-300 text-xs font-mono uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                SIMULATION BENCHMARK CALCULATED
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                PHISHING DEFENSE SCORE
              </h3>
            </div>

            {/* Circular Gauge and Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left: Circular SVG Score Meter (5 cols on MD) */}
              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="48"
                      strokeWidth="10"
                      className="text-slate-800"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="48"
                      strokeWidth="10"
                      strokeDasharray={301.6}
                      strokeDashoffset={301.6 - (301.6 * finalDefenseScore) / 100}
                      strokeLinecap="round"
                      className="text-cyan-400 transition-all duration-1000 ease-out"
                      stroke="currentColor"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono">
                      {finalDefenseScore}
                    </span>
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest pt-1">
                      / 100
                    </span>
                  </div>
                </div>

                {/* Defense Level Badge */}
                <div className="mt-4 px-4 py-1.5 rounded-lg border border-cyan-500/60 bg-cyan-950/70 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider text-center">
                  DEFENSE LEVEL: {getDefenseLevel(finalDefenseScore)}
                </div>
              </div>

              {/* Right: Telemetry Scoring Audit Breakdown (7 cols on MD) */}
              <div className="md:col-span-7 space-y-3">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Audit Telemetry Breakdown:
                </div>

                <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-300">Base Defensive Assessment</span>
                  <span className="font-mono font-bold text-white">100 pts</span>
                </div>

                <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-300">Red Flags Identified</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {redFlagsCount} / 6 (0 deduction)
                  </span>
                </div>

                {hintsUsed > 0 && (
                  <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      Hints Requested ({hintsUsed})
                    </span>
                    <span className="font-mono font-bold text-amber-400">
                      -{hintDeduction} pts
                    </span>
                  </div>
                )}

                {unnecessaryClicks > 0 && (
                  <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <MousePointer className="w-3.5 h-3.5 text-slate-400" />
                      Neutral clicks ({unnecessaryClicks})
                    </span>
                    <span className="font-mono font-bold text-slate-300">
                      -{unnecessaryDeduction} pts
                    </span>
                  </div>
                )}

                {decisionWrong && (
                  <div className="p-3 rounded-xl border border-rose-900/50 bg-rose-950/20 flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-rose-300">Non-optimal action choice</span>
                    <span className="font-mono font-bold text-rose-400">-10 pts</span>
                  </div>
                )}

                <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-300">Quiz Accuracy</span>
                  <span className="font-mono font-bold text-cyan-300">
                    {quizScore} / {totalQuestions}
                  </span>
                </div>

                {/* Important Educational Disclaimer */}
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 text-[11px] text-slate-400 leading-relaxed font-mono">
                  * Important: This score is educational only. Do not represent it as a professional cybersecurity certification or real security assessment.
                </div>
              </div>
            </div>

            {/* Questions Review List */}
            <div className="space-y-3 pt-6 border-t border-slate-800">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Question Review & Rationales:
              </div>
              <div className="space-y-3">
                {QUESTIONS.map((q) => {
                  const userAnswer = answers[q.id];
                  const correctOption = q.options.find((opt) => opt.isCorrect);
                  const isUserCorrect = userAnswer === correctOption?.label;

                  return (
                    <div
                      key={q.id}
                      className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/40 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">
                          {q.id}. {q.question}
                        </span>
                        {isUserCorrect ? (
                          <span className="text-emerald-400 flex items-center gap-1 font-mono font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : (
                          <span className="text-rose-400 flex items-center gap-1 font-mono font-bold">
                            <XCircle className="w-3.5 h-3.5" /> Review
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 leading-relaxed font-sans">
                        {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Retake Button */}
            <div className="flex justify-center pt-2">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handleRetake}
                icon={<RefreshCw className="w-4 h-4" />}
                className="text-slate-300 border-slate-700 hover:border-cyan-400"
              >
                Retake Knowledge Check
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
