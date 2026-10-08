'use client';

import React from 'react';
import {
  UserCheck,
  Zap,
  Building2,
  Globe2,
  KeyRound,
  AlertOctagon,
  ShieldCheck,
  ArrowDown,
  Clock,
  Sparkles,
} from 'lucide-react';

interface SummaryCardItem {
  id: string;
  title: string;
  definition: string;
  defense: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const SUMMARY_CARDS: SummaryCardItem[] = [
  {
    id: 'impersonation',
    title: 'IMPERSONATION',
    definition: 'Attackers disguise sender names and display profiles to mimic trusted organizations.',
    defense: 'Cross-examine sender details and verify via official contacts.',
    icon: UserCheck,
    accentColor: 'text-cyan-400 border-cyan-800/80 bg-cyan-950/40',
  },
  {
    id: 'urgency',
    title: 'URGENCY',
    definition: 'Attackers create synthetic time pressure to reduce verification and critical thinking time.',
    defense: 'Pause and verify independently before taking action.',
    icon: Zap,
    accentColor: 'text-rose-400 border-rose-800/80 bg-rose-950/40',
  },
  {
    id: 'authority',
    title: 'AUTHORITY',
    definition: 'Threat actors invoke corporate, banking, or legal authority to demand instant compliance.',
    defense: 'Question unverified claims; demand out-of-band validation.',
    icon: Building2,
    accentColor: 'text-purple-400 border-purple-800/80 bg-purple-950/40',
  },
  {
    id: 'domain',
    title: 'SUSPICIOUS DOMAIN',
    definition: 'Look-alike or altered web addresses deceive users into entering credentials on fake pages.',
    defense: 'Check the real registered domain before clicking or submitting data.',
    icon: Globe2,
    accentColor: 'text-amber-400 border-amber-800/80 bg-amber-950/40',
  },
  {
    id: 'info-request',
    title: 'INFORMATION REQUEST',
    definition: 'Unexpected forms or SMS prompts asking for passwords, card PINs, or one-time verification codes.',
    defense: 'Never disclose passwords or authentication codes via links.',
    icon: KeyRound,
    accentColor: 'text-emerald-400 border-emerald-800/80 bg-emerald-950/40',
  },
  {
    id: 'threat',
    title: 'THREAT / CONSEQUENCE',
    definition: 'Threatening account suspension, legal penalties, or frozen funds to trigger acute fear.',
    defense: 'Treat extreme penalty warnings as social engineering red flags.',
    icon: AlertOctagon,
    accentColor: 'text-rose-500 border-rose-900/80 bg-rose-950/50',
  },
];

const TEN_SECOND_CHECK_STEPS = [
  { step: '01', title: 'STOP', desc: 'Pause before reacting.' },
  { step: '02', title: 'CHECK THE SENDER', desc: 'Inspect email headers or phone numbers.' },
  { step: '03', title: 'INSPECT THE DOMAIN', desc: 'Verify the full address and root domain.' },
  { step: '04', title: 'VERIFY INDEPENDENTLY', desc: 'Use official apps or known numbers.' },
  { step: '05', title: 'THEN ACT', desc: 'Decide with confidence and security.' },
];

export const PhishingLearningSummary: React.FC = () => {
  return (
    <section id="summary-section" className="py-16 sm:py-20 bg-[#07090e] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* SECTION 10: WHAT YOU JUST LEARNED */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-800/80 bg-cyan-950/40 text-cyan-300 text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              KEY CONCEPTS DECONSTRUCTED
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              WHAT YOU JUST LEARNED
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Six core principles behind every deceptive phishing campaign and how to counter them instinctively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUMMARY_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 sm:p-6 backdrop-blur-sm space-y-4 hover:border-slate-700 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                        {card.title}
                      </h3>
                      <div className={`p-2 rounded-xl border ${card.accentColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {card.definition}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      DEFENSE:
                    </span>
                    <p className="text-xs font-semibold text-emerald-300 leading-relaxed">
                      {card.defense}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 11: THE 10-SECOND PHISHING CHECK */}
        <div className="rounded-3xl border-2 border-cyan-500/50 bg-gradient-to-b from-slate-950 via-[#070d19] to-slate-950 p-6 sm:p-10 backdrop-blur-md shadow-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-800 bg-cyan-950/60 text-cyan-300 text-xs font-mono uppercase">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              MEMORABLE DEFENSIVE HABIT
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              THE 10-SECOND PHISHING CHECK
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Run this 5-step rapid reflex whenever an urgent, unexpected alert lands in your messages.
            </p>
          </div>

          {/* Connected Flow Diagram */}
          <div className="max-w-2xl mx-auto space-y-3">
            {TEN_SECOND_CHECK_STEPS.map((step, idx) => (
              <React.Fragment key={step.step}>
                <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-cyan-500/60 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center font-mono font-bold text-xs text-cyan-300 shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-sm font-bold text-white tracking-wide">
                      {step.title}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {step.desc}
                    </span>
                  </div>
                </div>

                {/* Arrow down between cards */}
                {idx < TEN_SECOND_CHECK_STEPS.length - 1 && (
                  <div className="flex justify-center text-cyan-500/70 py-0.5" aria-hidden="true">
                    <ArrowDown className="w-4 h-4 animate-bounce" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
