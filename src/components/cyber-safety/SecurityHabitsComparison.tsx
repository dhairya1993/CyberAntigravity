'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  KeyRound,
  ShieldCheck,
  RefreshCw,
  Database,
  Search,
  Key,
  Clock,
  ExternalLink,
  Lock,
  Flame,
  ArrowRightLeft,
} from 'lucide-react';

interface HabitPair {
  id: string;
  good: {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  risky: {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  };
}

const HABIT_PAIRS: HabitPair[] = [
  {
    id: 'passwords',
    good: {
      title: 'Unique passwords',
      description: 'Generates distinct passphrases for every single website via a secure password manager.',
      icon: KeyRound,
    },
    risky: {
      title: 'Password reuse',
      description: 'Reusing a favorite password across multiple personal, work, and banking services.',
      icon: Key,
    },
  },
  {
    id: 'mfa-otp',
    good: {
      title: 'MFA',
      description: 'Enforces mobile authenticator apps or physical passkeys on all vital accounts.',
      icon: ShieldCheck,
    },
    risky: {
      title: 'Sharing OTPs',
      description: 'Disclosing temporary SMS or authenticator passcodes to unexpected callers or chats.',
      icon: Lock,
    },
  },
  {
    id: 'updates',
    good: {
      title: 'Updates',
      description: 'Applies system, browser, and firmware patches automatically as soon as released.',
      icon: RefreshCw,
    },
    risky: {
      title: 'Ignoring updates',
      description: 'Postponing operating system patches for weeks, leaving known CVE exploits unpatched.',
      icon: Clock,
    },
  },
  {
    id: 'backups',
    good: {
      title: 'Backups',
      description: 'Maintains redundant offline snapshots and encrypted cloud backups (3-2-1 rule).',
      icon: Database,
    },
    risky: {
      title: 'Clicking unknown links',
      description: 'Opening unverified links in unexpected emails or SMS without inspecting the root domain.',
      icon: ExternalLink,
    },
  },
  {
    id: 'verification',
    good: {
      title: 'Independent verification',
      description: 'Pauses urgent messages to contact organizations independently using verified numbers.',
      icon: Search,
    },
    risky: {
      title: 'Trusting urgency',
      description: 'Reacting hastily to artificial deadlines claiming impending arrest or immediate fees.',
      icon: Flame,
    },
  },
];

export const SecurityHabitsComparison: React.FC = () => {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  return (
    <section id="security-habits-comparison" className="py-16 md:py-24 relative scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-400" />
            <span>Habit Matrix Contrast</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Good Habits vs Risky Habits
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Personal cybersecurity is not an all-or-nothing technology; it is a mindset composed of daily micro-habits. Compare defensive behaviors directly against common everyday vulnerabilities.
          </p>
        </div>

        {/* Dual-Column Visual Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* GOOD HABITS COLUMN (Green & Cyan Palette) */}
          <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 via-slate-900/80 to-slate-950 p-6 sm:p-7 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-emerald-900/60">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700/80 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">GOOD HABITS</h3>
                  <p className="text-[11px] text-emerald-300 font-mono">High-Assurance Baseline</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Recommended
              </span>
            </div>

            <div className="space-y-3.5">
              {HABIT_PAIRS.map((pair) => {
                const GoodIcon = pair.good.icon;
                const isPairHighlighted = highlightedId === pair.id;

                return (
                  <div
                    key={`good-${pair.id}`}
                    onMouseEnter={() => setHighlightedId(pair.id)}
                    onMouseLeave={() => setHighlightedId(null)}
                    className={`p-4 rounded-xl border transition-all duration-200 ${
                      isPairHighlighted
                        ? 'bg-emerald-950/60 border-emerald-400 shadow-md scale-[1.02]'
                        : 'bg-slate-950/70 border-slate-800/80 hover:border-emerald-600/60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <GoodIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-0.5">
                          {pair.good.title}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {pair.good.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RISKY HABITS COLUMN (Warm Amber Palette - Avoid Excessive Red) */}
          <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-950/20 via-slate-900/80 to-slate-950 p-6 sm:p-7 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-amber-900/60">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-700/80 flex items-center justify-center text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">RISKY HABITS</h3>
                  <p className="text-[11px] text-amber-300 font-mono">Common Attack Vectors</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                Vulnerable
              </span>
            </div>

            <div className="space-y-3.5">
              {HABIT_PAIRS.map((pair) => {
                const RiskyIcon = pair.risky.icon;
                const isPairHighlighted = highlightedId === pair.id;

                return (
                  <div
                    key={`risky-${pair.id}`}
                    onMouseEnter={() => setHighlightedId(pair.id)}
                    onMouseLeave={() => setHighlightedId(null)}
                    className={`p-4 rounded-xl border transition-all duration-200 ${
                      isPairHighlighted
                        ? 'bg-amber-950/60 border-amber-400 shadow-md scale-[1.02]'
                        : 'bg-slate-950/70 border-slate-800/80 hover:border-amber-600/60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-800/80 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                        <RiskyIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-0.5">
                          {pair.risky.title}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {pair.risky.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
