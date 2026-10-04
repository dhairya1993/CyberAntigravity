'use client';
import React, { useState } from 'react';
import { Info, RotateCcw } from 'lucide-react';

interface QuestionItem {
  id: string;
  prompt: string;
  subtext: string;
  riskWeight: number; // 1 to 3
}

const QUESTIONS: QuestionItem[] = [
  {
    id: 'q1',
    prompt: 'Do you use the exact same password on more than one website or service?',
    subtext: 'Reusing a single credential across multiple sites creates a shared failure point.',
    riskWeight: 3,
  },
  {
    id: 'q2',
    prompt: 'Do you use the same password for your primary email account and online banking?',
    subtext: 'Email is the master key to your digital identity; if breached, an attacker can reset all other passwords.',
    riskWeight: 3,
  },
  {
    id: 'q3',
    prompt: 'Do you reuse old passwords that you have used for years on newly created accounts?',
    subtext: 'Older passwords are far more likely to appear in historical compromised credential databases.',
    riskWeight: 2,
  },
  {
    id: 'q4',
    prompt: 'Do you create "variations" of the same root password (e.g. Password1, Password2, Password!)?',
    subtext: 'Automated brute-force tools automatically test predictable numeric and symbol alterations.',
    riskWeight: 2,
  },
  {
    id: 'q5',
    prompt: 'Have you ever received a data breach notification for an account that shared your current password?',
    subtext: 'If a compromised site shared your password, automated bots likely tested it across other popular platforms.',
    riskWeight: 3,
  },
];

export const PasswordReuseTool: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});

  const handleSelect = (id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === QUESTIONS.length;

  const calculateRisk = () => {
    let riskScore = 0;
    QUESTIONS.forEach((q) => {
      if (answers[q.id] === true) {
        riskScore += q.riskWeight;
      }
    });

    if (riskScore === 0) {
      return {
        level: 'Minimal Reuse Risk',
        color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20',
        summary: 'Excellent security hygiene. You maintain strong credential isolation.',
        recommendation: 'Continue using unique credentials and secure them with a reputable password manager.',
      };
    } else if (riskScore <= 4) {
      return {
        level: 'Moderate Credential Exposure',
        color: 'text-amber-400 border-amber-500/40 bg-amber-950/20',
        summary: 'Some shared passwords expose you to cascading credential-stuffing risks.',
        recommendation: 'Isolate your primary email and banking passwords immediately. Ensure those two services have unique, dedicated credentials.',
      };
    } else {
      return {
        level: 'High Credential Stuffing Risk',
        color: 'text-red-400 border-red-500/40 bg-red-950/20',
        summary: 'Significant exposure to automated credential stuffing and account takeover.',
        recommendation: 'When any single service suffers a breach, your other accounts are immediately vulnerable. Adopt a password manager to systematically generate unique credentials.',
      };
    }
  };

  const riskResult = isComplete ? calculateRisk() : null;

  const resetQuiz = () => {
    setAnswers({});
  };

  return (
    <div className="space-y-6">
      {/* Privacy Notice */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white">Zero Password or Account Data Collection:</strong> This tool is an educational behavioral self-check. You do not enter actual passwords, usernames, or email addresses. All answers remain entirely in your local browser session.
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-md space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Educational Password Reuse Risk Assessment
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Answer 5 quick questions about how you manage passwords across your personal and work accounts.
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {QUESTIONS.map((q, idx) => {
            const currentVal = answers[q.id];
            return (
              <div
                key={q.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono text-cyan-400 font-bold block mb-1">
                      Question {idx + 1} of {QUESTIONS.length}
                    </span>
                    <h4 className="text-sm font-semibold text-white leading-snug">
                      {q.prompt}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">{q.subtext}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleSelect(q.id, true)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        currentVal === true
                          ? 'bg-red-500 text-white shadow-sm'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelect(q.id, false)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        currentVal === false
                          ? 'bg-emerald-500 text-slate-950 shadow-sm'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Results Area */}
        {isComplete && riskResult && (
          <div className={`p-5 rounded-xl border space-y-3 ${riskResult.color}`} role="region" aria-live="polite">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider font-bold">
                Assessment Outcome
              </span>
              <span className="text-xs font-mono">
                {QUESTIONS.length} of {QUESTIONS.length} evaluated
              </span>
            </div>

            <h4 className="text-lg font-bold text-white">{riskResult.level}</h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {riskResult.summary}
            </p>

            <div className="pt-2 border-t border-slate-800/60 text-xs text-slate-300">
              <strong className="text-white block mb-1">Recommended Action:</strong>
              {riskResult.recommendation}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={resetQuiz}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-mono underline"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Self-Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
