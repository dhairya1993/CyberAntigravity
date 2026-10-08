'use client';

import React from 'react';
import {
  PauseCircle,
  Search,
  CheckCircle,
  Globe2,
  ShieldAlert,
  Flag,
  ShieldCheck,
} from 'lucide-react';

interface ChecklistCardItem {
  number: string;
  action: string;
  tagline: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
  accentBorder: string;
  accentBg: string;
  accentText: string;
}

const CHECKLIST_ITEMS: ChecklistCardItem[] = [
  {
    number: '01',
    action: 'STOP',
    tagline: 'Pause before acting.',
    detail:
      'Resist artificial urgency. Take 60 seconds to step back and evaluate whether an unexpected warning or offer makes rational sense.',
    icon: PauseCircle,
    accentBorder: 'border-rose-500/50 hover:border-rose-400',
    accentBg: 'bg-rose-950/30',
    accentText: 'text-rose-400',
  },
  {
    number: '02',
    action: 'CHECK',
    tagline: 'Inspect sender and message context.',
    detail:
      'Examine the sender address, grammatical abnormalities, generic greetings, and whether you initiated this transaction.',
    icon: Search,
    accentBorder: 'border-amber-500/50 hover:border-amber-400',
    accentBg: 'bg-amber-950/30',
    accentText: 'text-amber-400',
  },
  {
    number: '03',
    action: 'VERIFY',
    tagline: 'Use an independent official channel.',
    detail:
      'Never call phone numbers or tap links embedded in suspicious messages. Navigate directly through official apps or verified phone directories.',
    icon: CheckCircle,
    accentBorder: 'border-cyan-500/50 hover:border-cyan-400',
    accentBg: 'bg-cyan-950/30',
    accentText: 'text-cyan-400',
  },
  {
    number: '04',
    action: 'INSPECT',
    tagline: 'Check the real domain.',
    detail:
      'Look closely at the root domain before entering any credentials. Look-alike spellings, hyphen tricks, and unusual TLDs reveal fraudulent pages.',
    icon: Globe2,
    accentBorder: 'border-blue-500/50 hover:border-blue-400',
    accentBg: 'bg-blue-950/30',
    accentText: 'text-blue-400',
  },
  {
    number: '05',
    action: "DON'T SHARE",
    tagline: 'Never disclose passwords or OTPs.',
    detail:
      'Legitimate organizations and IT support staff will never ask you for one-time verification codes, temporary passwords, or PINs.',
    icon: ShieldAlert,
    accentBorder: 'border-purple-500/50 hover:border-purple-400',
    accentBg: 'bg-purple-950/30',
    accentText: 'text-purple-400',
  },
  {
    number: '06',
    action: 'REPORT',
    tagline: 'Use platform reporting mechanisms.',
    detail:
      'Flag the message as junk or phishing in your email client or SMS messenger. Alert your organization\'s security operations team if it occurred at work.',
    icon: Flag,
    accentBorder: 'border-emerald-500/50 hover:border-emerald-400',
    accentBg: 'bg-emerald-950/30',
    accentText: 'text-emerald-400',
  },
];

export const PhishingChecklistCards: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#07090e] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-800/80 bg-emerald-950/40 text-emerald-300 text-xs font-mono uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden={true} />
            DEFENSIVE PLAYBOOK
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Before You Click
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Internalize these six instinctive defensive habits whenever an unsolicited notification requests your attention.
          </p>
        </div>

        {/* 6 Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHECKLIST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className={`rounded-2xl border ${item.accentBorder} bg-slate-950/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-4 group`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                    STEP {item.number}
                  </span>
                  <div className={`p-2.5 rounded-xl ${item.accentBg} ${item.accentText}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {item.action}
                  </h3>
                  <div className={`text-xs font-mono font-semibold ${item.accentText}`}>
                    {item.tagline}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
