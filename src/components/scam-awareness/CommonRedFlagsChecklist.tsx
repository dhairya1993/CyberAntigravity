'use client';

import React, { useState } from 'react';
import {
  Clock,
  AlertTriangle,
  CreditCard,
  Key,
  Lock,
  Link2,
  Gift,
  Building2,
  EyeOff,
  PhoneCall,
  RotateCcw,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface RedFlagItem {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  explanation: string;
  scammerTactic: string;
  safeHabit: string;
}

const RED_FLAGS: RedFlagItem[] = [
  {
    id: 1,
    title: 'Unexpected Contact',
    icon: PhoneCall,
    tag: 'Initiation',
    explanation: 'Unsolicited communication from unknown numbers, email handles, or social messaging profiles claiming to represent trusted entities.',
    scammerTactic: 'Catching you off-guard so you do not have time to cross-reference their identity.',
    safeHabit: 'Always initiate communication yourself through official numbers or verified web portals.',
  },
  {
    id: 2,
    title: 'Urgency',
    icon: Clock,
    tag: 'Psychological Pressure',
    explanation: 'Arbitrary deadlines ("Act in 15 minutes!", "Offer expires tonight!") designed to force impulsive, unverified actions.',
    scammerTactic: 'Overwhelming rational evaluation with immediate artificial consequences.',
    safeHabit: 'Legitimate organizations rarely impose panic deadlines for routine matters. Slow down and pause.',
  },
  {
    id: 3,
    title: 'Threats',
    icon: AlertTriangle,
    tag: 'Fear Tactic',
    explanation: 'Intimidation involving arrest warrants, legal prosecution, account termination, or immediate service blackout.',
    scammerTactic: 'Using fear of authority or consequences to paralyze critical thinking.',
    safeHabit: 'Government agencies and law enforcement never demand immediate payment over phone or chat.',
  },
  {
    id: 4,
    title: 'Unusual Payment Method',
    icon: CreditCard,
    tag: 'Financial Extraction',
    explanation: 'Demands for payment via cryptocurrency, peer-to-peer apps (Zelle, CashApp), wire transfers, or physical gift cards.',
    scammerTactic: 'Leveraging untraceable and non-reversible settlement rails with zero chargeback protections.',
    safeHabit: 'Never pay any organization using gift cards, unverified crypto wallets, or peer-to-peer transfers.',
  },
  {
    id: 5,
    title: 'Requests for OTP',
    icon: Key,
    tag: 'Credential Theft',
    explanation: 'Asking you to read back, forward, or enter a One-Time Password sent to your phone or authenticator app.',
    scammerTactic: 'Using your live OTP to bypass 2-Factor Authentication and drain or hijack your account.',
    safeHabit: 'Never share OTP codes with anyone. Banks and genuine support teams will NEVER ask for your OTP.',
  },
  {
    id: 6,
    title: 'Requests for Password',
    icon: Lock,
    tag: 'Authentication Bypass',
    explanation: 'Direct or indirect solicitation of account passwords, PINs, or master security recovery keys.',
    scammerTactic: 'Direct credential harvesting to grant permanent administrative takeover of your digital life.',
    safeHabit: 'True support staff have backend tools to reset accounts; they never need to know your plaintext password.',
  },
  {
    id: 7,
    title: 'Suspicious Link',
    icon: Link2,
    tag: 'Technical Deception',
    explanation: 'URLs containing misspellings, excessive hyphens, unusual top-level domains (.biz, .top, .xyz), or link shorteners.',
    scammerTactic: 'Directing your browser to counterfeit web clones that replicate official look and feel.',
    safeHabit: 'Inspect the address bar domain carefully. Bookmark official banking and login portals instead of tapping links.',
  },
  {
    id: 8,
    title: 'Too-Good-To-Be-True Offer',
    icon: Gift,
    tag: 'Greed / Lure',
    explanation: 'Unrealistic work-from-home earnings, guaranteed 50% crypto returns, or winning lotteries you never entered.',
    scammerTactic: 'Dopamine-driven temptation clouding judgment and suppressing healthy skepticism.',
    safeHabit: 'If an opportunity sounds too easy, effortlessly lucrative, or risk-free, it is almost certainly fraudulent.',
  },
  {
    id: 9,
    title: 'Fake Authority',
    icon: Building2,
    tag: 'Impersonation',
    explanation: 'Impersonating police officers, tax inspectors, bank fraud analysts, or senior corporate executives.',
    scammerTactic: 'Exploiting human social conditioning to obey perceived hierarchy and formal rank.',
    safeHabit: 'Demand badge numbers, hang up, look up the official switchboard number yourself, and ask to speak with that department.',
  },
  {
    id: 10,
    title: 'Pressure to Keep It Secret',
    icon: EyeOff,
    tag: 'Isolation Technique',
    explanation: 'Telling you "do not discuss this with family, bank tellers, or colleagues" under the pretext of an internal investigation.',
    scammerTactic: 'Isolating the victim to prevent second opinions from breaking the psychological spell.',
    safeHabit: 'If anyone orders you to keep financial or security transactions secret from trusted family or bank staff, stop immediately.',
  },
];

export function CommonRedFlagsChecklist() {
  const [checkedFlags, setCheckedFlags] = useState<number[]>([]);
  const [activeFlagId, setActiveFlagId] = useState<number>(1);

  const toggleCheck = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckedFlags((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectFlag = (id: number) => {
    setActiveFlagId(id);
  };

  const resetChecklist = () => {
    setCheckedFlags([]);
  };

  const activeFlag = RED_FLAGS.find((f) => f.id === activeFlagId) || RED_FLAGS[0];
  const ActiveIcon = activeFlag.icon;

  return (
    <section id="common-red-flags" className="py-16 md:py-24 bg-slate-950/60 border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-medium tracking-wide uppercase mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            Threat Indicators
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            10 Common Scam Red Flags: <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">Self-Audit Checklist</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Familiarize yourself with the 10 hallmark signs of fraudulent outreach. Click any item to inspect the underlying tactic and defensive counter-habit.
          </p>
        </div>

        {/* Audit Progress Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Interactive Red Flag Self-Test</h4>
                <p className="text-xs text-slate-400">
                  Check flags you feel confident recognizing in real communications.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-right">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">Mastery Score</span>
                <span className="text-sm font-bold text-cyan-300">
                  {checkedFlags.length} of {RED_FLAGS.length} Recognized
                </span>
              </div>
              {checkedFlags.length > 0 && (
                <button
                  onClick={resetChecklist}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar Visual */}
          <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${(checkedFlags.length / RED_FLAGS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Two-Column Explorer: List of 10 Red Flags + Active Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: 10 Flags List */}
          <div className="lg:col-span-7 space-y-2.5">
            {RED_FLAGS.map((flag) => {
              const FlagIcon = flag.icon;
              const isChecked = checkedFlags.includes(flag.id);
              const isActive = flag.id === activeFlagId;

              return (
                <div
                  key={flag.id}
                  onClick={() => handleSelectFlag(flag.id)}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isActive
                      ? 'bg-slate-900 border-cyan-500/70 shadow-lg ring-1 ring-cyan-500/30'
                      : 'bg-slate-950/70 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Checkbox button */}
                    <button
                      type="button"
                      onClick={(e) => toggleCheck(flag.id, e)}
                      className={`w-6 h-6 rounded-md flex items-center justify-center transition-all flex-shrink-0 ${
                        isChecked
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                          : 'border border-slate-700 bg-slate-900 text-transparent hover:border-emerald-500'
                      }`}
                      aria-label={`Mark ${flag.title} as recognized`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>

                    <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-300 flex-shrink-0">
                      <FlagIcon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white truncate">
                          {flag.id}. {flag.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 hidden sm:inline">
                          {flag.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {flag.explanation}
                      </p>
                    </div>
                  </div>

                  <span className={`text-xs font-mono flex-shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                    {isActive ? 'Inspecting' : 'Details →'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Card for Active Red Flag */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <ActiveIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 block">
                      Red Flag #{activeFlag.id}
                    </span>
                    <h3 className="text-lg font-bold text-white">{activeFlag.title}</h3>
                  </div>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {activeFlag.tag}
                </span>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                    What It Looks Like:
                  </h4>
                  <p className="text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                    {activeFlag.explanation}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
                    Why Scammers Use It:
                  </h4>
                  <p className="text-slate-300 leading-relaxed bg-amber-500/5 p-3 rounded-lg border border-amber-500/20">
                    {activeFlag.scammerTactic}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
                    Safer Defensive Habit:
                  </h4>
                  <p className="text-slate-200 leading-relaxed bg-cyan-950/20 p-3 rounded-lg border border-cyan-500/30">
                    {activeFlag.safeHabit}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Mastery status:{' '}
                  <strong className={checkedFlags.includes(activeFlag.id) ? 'text-emerald-400' : 'text-slate-400'}>
                    {checkedFlags.includes(activeFlag.id) ? 'Recognized ✓' : 'Not marked yet'}
                  </strong>
                </span>
                <button
                  type="button"
                  onClick={(e) => toggleCheck(activeFlag.id, e)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    checkedFlags.includes(activeFlag.id)
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-semibold'
                  }`}
                >
                  {checkedFlags.includes(activeFlag.id) ? 'Unmark flag' : 'Mark as recognized'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
