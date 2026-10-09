'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  UserX,
  Zap,
  MousePointer,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

type RedFlagKey = 'urgency' | 'sender' | 'action';

const RED_FLAG_EXPLANATIONS: Record<RedFlagKey, { title: string; explanation: string }> = {
  urgency: {
    title: 'Urgent Language Exploit',
    explanation:
      'Urgency is a common social-engineering tactic designed to reduce careful decision-making, spike anxiety, and force impulsive compliance before you can analyze the facts.',
  },
  sender: {
    title: 'Unknown / Unverified Sender',
    explanation:
      'Threat actors frequently use generic handles, throwaway addresses, or spoofed contact names. Legitimate platforms never threaten permanent suspension via unsolicited SMS or random addresses.',
  },
  action: {
    title: 'Suspicious External Action',
    explanation:
      'Demanding you follow an embedded hyperlink under threat directs you to an adversary-controlled credential harvester designed to steal login secrets.',
  },
};

export const ScamSpotterPreviewSection: React.FC = () => {
  const [userChoice, setUserChoice] = useState<'likely' | 'notsure' | null>(null);
  const [activeFlag, setActiveFlag] = useState<RedFlagKey | null>(null);

  const handleDecision = (choice: 'likely' | 'notsure') => {
    setUserChoice(choice);
  };

  const handleReset = () => {
    setUserChoice(null);
    setActiveFlag(null);
  };

  return (
    <section className="py-20 md:py-28 relative border-t border-slate-800/80 bg-slate-900/40">
      <div className="cyber-container space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/80 text-amber-300 text-xs font-mono uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            Interactive Scam Spotter
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Can You Spot the Scam?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Test your instinctive verification habits against a realistic simulated message. Use the magnifying glass to inspect red flags.
          </p>
        </div>

        {/* Main Interactive Simulation Card */}
        <div className="max-w-3xl mx-auto rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Simulated Messaging Window */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-lg">
            {/* Window bar */}
            <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-slate-400">Inbound Message Preview</span>
              </div>
              <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-900">
                Simulation Sandbox
              </span>
            </div>

            {/* Fictional Message Header: UNKNOWN CONTACT */}
            <div className="p-4 sm:p-5 border-b border-slate-800/80 space-y-2 text-xs text-slate-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-slate-800 text-amber-400">
                    <UserX className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold">From: </span>
                    <span className="text-amber-300 font-bold font-mono">UNKNOWN CONTACT (+1-888-555-ALERT)</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Received 2m ago
                </span>
              </div>
            </div>

            {/* Simulated Body Content with Highlightable Red Flags */}
            <div className="p-5 sm:p-7 space-y-4 text-sm text-slate-200">
              <p className="leading-relaxed">
                Your account has been selected for verification.
              </p>
              <p className="leading-relaxed">
                Complete the process within <span className="bg-amber-950/80 text-amber-300 border-b-2 border-amber-500 px-1 font-bold">30 minutes</span> to avoid suspension.
              </p>

              {/* Suspicious Action Link Box */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 my-4 text-center space-y-2">
                <span className="inline-block px-5 py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs tracking-wide">
                  Verify Your Account Now →
                </span>
                <div className="text-[11px] font-mono text-slate-400 truncate">
                  Target Destination: <span className="text-amber-300">https://account-verify-30min.xyz/auth</span>
                </div>
              </div>

              {/* Magnifying Glass Interactive Buttons Bar (Specification 9) */}
              <div className="pt-2 border-t border-slate-800/80">
                <div className="text-xs font-mono text-slate-400 mb-2 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Inspect Red Flags (Tap with Magnifying Glass):</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveFlag('urgency')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      activeFlag === 'urgency'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'bg-slate-950 text-amber-300 border border-amber-800/80 hover:border-amber-500'
                    }`}
                  >
                    <Search className="w-3 h-3" />
                    <span>URGENT LANGUAGE</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveFlag('sender')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      activeFlag === 'sender'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'bg-slate-950 text-amber-300 border border-amber-800/80 hover:border-amber-500'
                    }`}
                  >
                    <Search className="w-3 h-3" />
                    <span>UNKNOWN SENDER</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveFlag('action')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      activeFlag === 'action'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'bg-slate-950 text-amber-300 border border-amber-800/80 hover:border-amber-500'
                    }`}
                  >
                    <Search className="w-3 h-3" />
                    <span>SUSPICIOUS ACTION</span>
                  </button>
                </div>
              </div>

              {/* Magnifying Glass Educational Feedback Box */}
              {activeFlag && (
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/50 space-y-1 animate-in fade-in duration-200">
                  <div className="text-xs font-mono font-bold uppercase text-amber-300 flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5 text-amber-400" />
                    <span>{RED_FLAG_EXPLANATIONS[activeFlag].title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {RED_FLAG_EXPLANATIONS[activeFlag].explanation}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Interactive User Decision Buttons */}
          {!userChoice ? (
            <div className="space-y-4 text-center">
              <p className="text-sm font-semibold text-white">
                How would you categorize this notification?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => handleDecision('likely')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-rose-950/50 flex items-center justify-center gap-2 cyber-focus-ring cursor-pointer"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Likely Scam</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDecision('notsure')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all duration-200 border border-slate-700 flex items-center justify-center gap-2 cyber-focus-ring cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  <span>Not Sure</span>
                </button>
              </div>
            </div>
          ) : (
            /* Educational Feedback and Red Flag Breakdown */
            <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-5 animate-in fade-in duration-300">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-base">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Good catch!</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    This simulated communication contains the three classic hallmarks of modern social engineering deception.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-mono text-slate-400 hover:text-white underline shrink-0 cursor-pointer"
                >
                  Reset Test
                </button>
              </div>

              {/* 3 Red Flag Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-900/60 space-y-1">
                  <div className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>1. 30m Urgency Timer</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Artificial deadlines bypass analytical skepticism.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-900/60 space-y-1">
                  <div className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                    <UserX className="w-3.5 h-3.5" />
                    <span>2. Unknown Sender</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Unsolicited contact using an unverified telephone prefix.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-900/60 space-y-1">
                  <div className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                    <MousePointer className="w-3.5 h-3.5" />
                    <span>3. Deceptive Action</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Urging an external web visit to verify credentials.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer Call to Action */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
              Practice recognizing scams before you encounter them online.
            </span>

            <Button
              asLink
              href="/scam-awareness"
              variant="outline"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Explore Scam Awareness Hub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
