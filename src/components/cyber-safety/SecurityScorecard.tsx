'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Info,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  ArrowRight,
  Lock,
  KeyRound,
  RefreshCw,
  HelpCircle,
  Database,
} from 'lucide-react';

interface HygieneQuestion {
  id: string;
  number: number;
  question: string;
  category: string;
  whyItMatters: string;
  recommendedAction: string;
  icon: React.ComponentType<{ className?: string }>;
}

const HYGIENE_QUESTIONS: HygieneQuestion[] = [
  {
    id: 'mfa',
    number: 1,
    question: 'Do you use MFA on important accounts?',
    category: 'Authentication',
    whyItMatters: 'Multi-Factor Authentication (MFA) protects you even if your password is leaked in a third-party corporate data breach.',
    recommendedAction: 'Enable an authenticator app (TOTP) or passkey on your primary email, cloud storage, and banking logins today.',
    icon: Lock,
  },
  {
    id: 'passwords',
    number: 2,
    question: 'Do you use unique passwords?',
    category: 'Credentials',
    whyItMatters: 'Reusing passwords enables credential-stuffing bots to unlock your personal email and finances from a single breached hobby forum.',
    recommendedAction: 'Install an encrypted password manager and generate distinct 16+ character passphrases for every single website.',
    icon: KeyRound,
  },
  {
    id: 'updates',
    number: 3,
    question: 'Do you install security updates promptly?',
    category: 'Device Integrity',
    whyItMatters: 'Operating systems and browser updates patch publicly known security vulnerabilities that malicious actors automate exploits for.',
    recommendedAction: 'Switch on automatic updates in your phone, tablet, and PC settings to receive security patches without delay.',
    icon: RefreshCw,
  },
  {
    id: 'verify',
    number: 4,
    question: 'Do you verify unexpected requests?',
    category: 'Social Engineering',
    whyItMatters: 'Scammers frequently impersonate trusted banks, bosses, or tech support to pressure targets into hasty, unverified actions.',
    recommendedAction: 'Never use the contact details provided in an urgent message. Reach out independently through an official website or phone directory.',
    icon: HelpCircle,
  },
  {
    id: 'backups',
    number: 5,
    question: 'Do you maintain backups of important data?',
    category: 'Data Resilience',
    whyItMatters: 'Hardware failures, accidental file erasures, and ransomware can permanently erase memories and crucial records without backup.',
    recommendedAction: 'Keep regular copies of irreplaceable files on an encrypted offline drive or secure automated cloud backup.',
    icon: Database,
  },
];

export const SecurityScorecard: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({
    mfa: null,
    passwords: null,
    updates: null,
    verify: null,
    backups: null,
  });

  const handleAnswer = (id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    setAnswers({
      mfa: null,
      passwords: null,
      updates: null,
      verify: null,
      backups: null,
    });
  };

  const answeredCount = Object.values(answers).filter((val) => val !== null).length;
  const yesCount = Object.values(answers).filter((val) => val === true).length;
  const totalQuestions = HYGIENE_QUESTIONS.length;
  const isComplete = answeredCount === totalQuestions;

  // Educational Levels per Prompt Requirement:
  // - Needs Attention
  // - Getting Safer
  // - Cyber Aware
  // - Strong Security Habits
  const getScoreLevel = () => {
    if (!isComplete && answeredCount === 0) {
      return {
        level: 'Ready to Assess',
        color: 'text-slate-400',
        bgColor: 'bg-slate-900',
        borderColor: 'border-slate-800',
        badge: 'bg-slate-800 text-slate-300',
        description: 'Answer all 5 questions to reveal your digital hygiene level and targeted habit advice.',
        icon: ShieldCheck,
      };
    }
    if (yesCount === 5) {
      return {
        level: 'Strong Security Habits',
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-950/30',
        borderColor: 'border-emerald-500/50',
        badge: 'bg-emerald-950 text-emerald-300 border-emerald-700/80',
        description: 'Exemplary cyber hygiene! You consistently practice the core layers that prevent the vast majority of consumer cyber attacks.',
        icon: ShieldCheck,
      };
    }
    if (yesCount === 4) {
      return {
        level: 'Cyber Aware',
        color: 'text-cyan-400',
        bgColor: 'bg-cyan-950/30',
        borderColor: 'border-cyan-500/50',
        badge: 'bg-cyan-950 text-cyan-300 border-cyan-700/80',
        description: 'Great defensive awareness. Solid habits are established, with just one key gap remaining to achieve complete baseline defense.',
        icon: ShieldCheck,
      };
    }
    if (yesCount === 3) {
      return {
        level: 'Getting Safer',
        color: 'text-amber-400',
        bgColor: 'bg-amber-950/30',
        borderColor: 'border-amber-500/50',
        badge: 'bg-amber-950 text-amber-300 border-amber-700/80',
        description: 'You are on the right track, but critical exposure areas remain that threat actors commonly exploit.',
        icon: AlertTriangle,
      };
    }
    return {
      level: 'Needs Attention',
      color: 'text-rose-400',
      bgColor: 'bg-rose-950/30',
      borderColor: 'border-rose-500/50',
      badge: 'bg-rose-950 text-rose-300 border-rose-700/80',
      description: 'Significant defensive gaps detected. Prioritize unique passwords and MFA first to protect your most sensitive accounts.',
      icon: ShieldAlert,
    };
  };

  const levelInfo = getScoreLevel();
  const LevelIcon = levelInfo.icon;
  const scorePercent = Math.round((yesCount / totalQuestions) * 100);

  return (
    <section id="security-scorecard" className="py-16 md:py-24 relative scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Self-Assessment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            How Strong Is Your Cyber Hygiene?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Answer these 5 essential questions to measure your daily security practices and uncover simple actions to elevate your defensive posture.
          </p>

          {/* Explicit Privacy & Educational Disclaimer */}
          <div className="mt-4 inline-flex items-start sm:items-center gap-2 p-3 sm:px-4 sm:py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 text-left sm:text-center max-w-2xl">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong className="text-slate-300">Notice:</strong> This is an educational self-assessment, not a professional security audit. No personal information is collected. All evaluation runs locally in your browser.
            </span>
          </div>
        </div>

        {/* Assessment Grid: Questions Left, Score Meter Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Questions Column */}
          <div className="lg:col-span-7 space-y-4">
            {HYGIENE_QUESTIONS.map((q) => {
              const currentAnswer = answers[q.id];
              const QuestionIcon = q.icon;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all duration-200 ${
                    currentAnswer === true
                      ? 'bg-slate-900/90 border-emerald-500/40 shadow-sm'
                      : currentAnswer === false
                      ? 'bg-slate-900/90 border-amber-500/40 shadow-sm'
                      : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        currentAnswer === true
                          ? 'bg-emerald-950/80 border-emerald-800 text-emerald-400'
                          : currentAnswer === false
                          ? 'bg-amber-950/80 border-amber-800 text-amber-400'
                          : 'bg-slate-950 border-slate-800 text-cyan-400'
                      }`}
                    >
                      <QuestionIcon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                          0{q.number}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
                          {q.category}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {q.question}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed pt-0.5">
                        {q.whyItMatters}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Controls */}
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-800/60 pl-12">
                    <button
                      type="button"
                      onClick={() => handleAnswer(q.id, true)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all cyber-focus-ring ${
                        currentAnswer === true
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                          : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Yes, I do</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAnswer(q.id, false)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all cyber-focus-ring ${
                        currentAnswer === false
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Not yet</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Educational Score Panel (Sticky on Desktop) */}
          <div className="lg:col-span-5 sticky top-24">
            <div
              className={`rounded-2xl border p-6 backdrop-blur-md shadow-xl transition-all duration-300 ${levelInfo.borderColor} ${levelInfo.bgColor}`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  Hygiene Result
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-cyan-300 transition-colors cyber-focus-ring"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Score Gauge & Tier Badge */}
              <div className="py-6 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-950 border-2 border-slate-800 relative shadow-inner mb-4">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-extrabold text-white font-mono leading-none">
                      {yesCount}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {yesCount} of {totalQuestions} YES ({scorePercent}%)
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${levelInfo.badge}`}>
                    <LevelIcon className="w-3.5 h-3.5" />
                    <span>{levelInfo.level}</span>
                  </span>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed pt-2">
                    {levelInfo.description}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Questions Answered:</span>
                  <span>{answeredCount} / {totalQuestions}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 transition-all duration-300 rounded-full"
                    style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Dynamic Action Checklist for Unchecked Items */}
              {answeredCount > 0 && (
                <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2.5">
                  <span className="text-xs font-bold text-white block">
                    Recommended Next Steps:
                  </span>
                  <div className="space-y-2">
                    {HYGIENE_QUESTIONS.filter((q) => answers[q.id] === false).map((q) => (
                      <div
                        key={q.id}
                        className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2"
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white block font-medium">{q.category}:</strong>
                          <span>{q.recommendedAction}</span>
                        </div>
                      </div>
                    ))}
                    {yesCount === totalQuestions && (
                      <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/80 text-xs text-emerald-300 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                        <span>All 5 foundational habits practiced! Share these best practices with family and colleagues.</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
