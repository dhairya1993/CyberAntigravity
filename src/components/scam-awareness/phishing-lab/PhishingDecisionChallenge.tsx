'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PhishingDecisionChallengeProps {
  onDecisionSubmit: (choice: 'A' | 'B' | 'C', isCorrect: boolean) => void;
  onProceedToSummary: () => void;
  selectedChoice: 'A' | 'B' | 'C' | null;
}

export const PhishingDecisionChallenge: React.FC<PhishingDecisionChallengeProps> = ({
  onDecisionSubmit,
  onProceedToSummary,
  selectedChoice,
}) => {
  const [currentSelection, setCurrentSelection] = useState<'A' | 'B' | 'C' | null>(
    selectedChoice
  );

  const handleSelect = (choice: 'A' | 'B' | 'C') => {
    setCurrentSelection(choice);
    onDecisionSubmit(choice, choice === 'B');
  };

  return (
    <section
      id="decision-challenge-section"
      className="py-16 bg-[#07090e] border-b border-slate-800/80"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-800/80 bg-purple-950/40 text-purple-300 text-xs font-mono uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            STAGE 02 • DEFENSIVE ACTION
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            WHAT WOULD YOU DO?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            You have identified the warning signs. What is the safest next step?
          </p>
        </div>

        {/* 3 Decision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Option A */}
          <button
            type="button"
            onClick={() => handleSelect('A')}
            className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-4 cyber-focus-ring ${
              currentSelection === 'A'
                ? 'border-amber-500 bg-amber-950/40 text-amber-100 shadow-lg shadow-amber-950/40'
                : 'border-slate-800 bg-slate-950/80 hover:border-slate-700 text-slate-200'
            }`}
          >
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                OPTION A
              </span>
              <p className="text-sm font-semibold text-white leading-relaxed">
                Click the verification link immediately.
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
              Select Response &rarr;
            </span>
          </button>

          {/* Option B (Safest) */}
          <button
            type="button"
            onClick={() => handleSelect('B')}
            className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-4 cyber-focus-ring ${
              currentSelection === 'B'
                ? 'border-emerald-500 bg-emerald-950/40 text-emerald-100 shadow-lg shadow-emerald-950/40'
                : 'border-slate-800 bg-slate-950/80 hover:border-slate-700 text-slate-200'
            }`}
          >
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                OPTION B
              </span>
              <p className="text-sm font-semibold text-white leading-relaxed">
                Open the organization&apos;s official app or website independently and verify the alert.
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
              Select Response &rarr;
            </span>
          </button>

          {/* Option C */}
          <button
            type="button"
            onClick={() => handleSelect('C')}
            className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-4 cyber-focus-ring ${
              currentSelection === 'C'
                ? 'border-amber-500 bg-amber-950/40 text-amber-100 shadow-lg shadow-amber-950/40'
                : 'border-slate-800 bg-slate-950/80 hover:border-slate-700 text-slate-200'
            }`}
          >
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                OPTION C
              </span>
              <p className="text-sm font-semibold text-white leading-relaxed">
                Reply to the message and ask whether it is real.
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
              Select Response &rarr;
            </span>
          </button>
        </div>

        {/* State Feedback Card */}
        {currentSelection && (
          <div
            className={`p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 space-y-4 ${
              currentSelection === 'B'
                ? 'border-emerald-500/80 bg-emerald-950/40 text-emerald-100'
                : 'border-amber-500/80 bg-amber-950/40 text-amber-100'
            }`}
          >
            <div className="flex items-start gap-3">
              {currentSelection === 'B' ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1.5">
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {currentSelection === 'B'
                    ? 'Excellent defensive decision.'
                    : 'Not the safest option.'}
                </h4>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  {currentSelection === 'B' &&
                    "Independent verification breaks the attacker's control over the communication channel. Always use a known verified app, website, or contact number from the back of your card."}
                  {currentSelection === 'A' &&
                    'Clicking the unverified link loads an attacker-controlled login replica designed to harvest your credentials or install tracking artifacts.'}
                  {currentSelection === 'C' &&
                    'Replying only connects you directly to the fraudster, who will eagerly reassure you that the message is legitimate and urge you to comply.'}
                </p>
              </div>
            </div>

            {/* Proceed to Learning Summary */}
            <div className="pt-2 flex justify-end">
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={onProceedToSummary}
                icon={<ArrowRight className="w-4 h-4 text-slate-950" />}
                iconPosition="right"
                className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold cyber-focus-ring"
              >
                Continue to Learning Summary &rarr;
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
