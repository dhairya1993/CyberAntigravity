'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Smartphone,
  Eye,
} from 'lucide-react';
import { RED_FLAG_SCENARIO } from '@/data/scamAwarenessData';

export const RedFlagAnalyzer: React.FC = () => {
  const [selectedFlagId, setSelectedFlagId] = useState<string>('rf-urgency');
  const [discoveredFlags, setDiscoveredFlags] = useState<Set<string>>(new Set(['rf-urgency']));

  const handleSelectFlag = (flagId: string) => {
    setSelectedFlagId(flagId);
    setDiscoveredFlags((prev) => new Set([...prev, flagId]));
  };

  const selectedFlag = RED_FLAG_SCENARIO.redFlags.find((f) => f.id === selectedFlagId) || RED_FLAG_SCENARIO.redFlags[0];

  const allDiscovered = discoveredFlags.size === RED_FLAG_SCENARIO.redFlags.length;

  return (
    <section id="red-flag-analyzer" className="py-16 sm:py-20 relative bg-[#06080e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-xs font-mono text-cyan-400 font-semibold mb-3">
            <Eye className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Spot the Red Flags: Interactive Message Analyzer
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Click on any highlighted phrase inside the simulated SMS alert below to understand how attackers manipulate language and design deception vectors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Simulated Message Card (Left Column - 6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Required Safety Disclaimer Badge */}
            <div className="p-3 rounded-xl border border-amber-800/80 bg-amber-950/40 text-amber-300 text-xs flex items-center gap-2.5 font-semibold font-mono shadow-sm">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{RED_FLAG_SCENARIO.label}</span>
            </div>

            {/* Simulated Phone Message Interface */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl p-6 sm:p-7 relative overflow-hidden">
              {/* Phone Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80 text-xs text-slate-400">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white font-semibold block">{RED_FLAG_SCENARIO.senderDisplay}</span>
                    <span className="text-[10px] text-slate-500">{RED_FLAG_SCENARIO.channel}</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-500">{RED_FLAG_SCENARIO.timestamp}</span>
              </div>

              {/* Message Bubble with Interactive Highlights */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-sm leading-relaxed text-slate-200 space-y-3">
                <p>
                  URGENT NOTICE: Your National Security Bank checking account has been{' '}
                  <button
                    type="button"
                    onClick={() => handleSelectFlag('rf-threat')}
                    className={`font-semibold underline decoration-wavy transition-all px-1 py-0.5 rounded ${
                      selectedFlagId === 'rf-threat'
                        ? 'bg-rose-500/30 text-rose-200 decoration-rose-400'
                        : 'decoration-rose-500/60 text-rose-300/90 hover:bg-rose-950/40'
                    }`}
                  >
                    scheduled for suspension
                  </button>{' '}
                  <button
                    type="button"
                    onClick={() => handleSelectFlag('rf-urgency')}
                    className={`font-semibold underline decoration-wavy transition-all px-1 py-0.5 rounded ${
                      selectedFlagId === 'rf-urgency'
                        ? 'bg-amber-500/30 text-amber-200 decoration-amber-400'
                        : 'decoration-amber-500/60 text-amber-300/90 hover:bg-amber-950/40'
                    }`}
                  >
                    in 30 minutes
                  </button>{' '}
                  <button
                    type="button"
                    onClick={() => handleSelectFlag('rf-unexpected')}
                    className={`font-semibold underline decoration-wavy transition-all px-1 py-0.5 rounded ${
                      selectedFlagId === 'rf-unexpected'
                        ? 'bg-blue-500/30 text-blue-200 decoration-blue-400'
                        : 'decoration-blue-500/60 text-blue-300/90 hover:bg-blue-950/40'
                    }`}
                  >
                    due to unverified activity
                  </button>
                  .{' '}
                  <button
                    type="button"
                    onClick={() => handleSelectFlag('rf-credential-demand')}
                    className={`font-semibold underline decoration-wavy transition-all px-1 py-0.5 rounded ${
                      selectedFlagId === 'rf-credential-demand'
                        ? 'bg-purple-500/30 text-purple-200 decoration-purple-400'
                        : 'decoration-purple-500/60 text-purple-300/90 hover:bg-purple-950/40'
                    }`}
                  >
                    Verify your identity immediately
                  </button>{' '}
                  using{' '}
                  <button
                    type="button"
                    onClick={() => handleSelectFlag('rf-url')}
                    className={`font-mono text-xs break-all underline decoration-wavy transition-all px-1 py-0.5 rounded ${
                      selectedFlagId === 'rf-url'
                        ? 'bg-cyan-500/30 text-cyan-200 decoration-cyan-400'
                        : 'decoration-cyan-500/60 text-cyan-300/90 hover:bg-cyan-950/40'
                    }`}
                  >
                    https://secure-bank-login-verify492.com
                  </button>{' '}
                  or your access will be permanently locked.
                </p>
              </div>

              {/* Progress Tracker */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Explored:{' '}
                  <strong className="text-cyan-400 font-semibold font-mono">
                    {discoveredFlags.size} of {RED_FLAG_SCENARIO.redFlags.length}
                  </strong>{' '}
                  red flags
                </span>
                {allDiscovered ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> All Red Flags Discovered!
                  </span>
                ) : (
                  <span className="text-slate-500 text-[11px]">Click phrases above or buttons below</span>
                )}
              </div>
            </div>

            {/* Red Flag Selector Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {RED_FLAG_SCENARIO.redFlags.map((flag) => {
                const isSelected = selectedFlagId === flag.id;
                const isDiscovered = discoveredFlags.has(flag.id);
                return (
                  <button
                    key={flag.id}
                    type="button"
                    onClick={() => handleSelectFlag(flag.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/60 shadow-sm'
                        : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {isDiscovered ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    )}
                    <span>{flag.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deep Dive Analysis Panel (Right Column - 6 cols) */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-7 shadow-xl space-y-6">
              {/* Active Flag Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-amber-800 bg-amber-950/60 text-amber-300 uppercase font-semibold">
                    Red Flag Identified
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Target Quote: &quot;{selectedFlag.highlightText}&quot;
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {selectedFlag.title}
                </h3>
              </div>

              {/* 1. Why it Matters */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-1.5">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Why It Matters
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedFlag.whyItMatters}
                </p>
              </div>

              {/* 2. Attacker Objective */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-1.5">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" /> Attacker Objective
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedFlag.attackerObjective}
                </p>
              </div>

              {/* 3. Defensive Action */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-1.5">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> What to Do Instead
                </span>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
                  {selectedFlag.defensiveAction}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
