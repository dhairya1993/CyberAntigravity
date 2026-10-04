'use client';

import React, { useState } from 'react';
import {
  Bell,
  Clock,
  ShieldCheck,
  MousePointerClick,
  AlertTriangle,
  Lock,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { HOW_A_SCAM_WORKS_STAGES } from '@/data/scamAwarenessData';

export const ScamFlow: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const activeStage = HOW_A_SCAM_WORKS_STAGES[activeStageIndex];

  const renderStageIcon = (name: string, isActive: boolean) => {
    const className = `w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`;
    switch (name) {
      case 'Bell':
        return <Bell className={className} />;
      case 'Clock':
        return <Clock className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'MousePointerClick':
        return <MousePointerClick className={className} />;
      case 'AlertTriangle':
        return <AlertTriangle className={className} />;
      case 'Lock':
        return <Lock className={className} />;
      default:
        return <Info className={className} />;
    }
  };

  return (
    <section id="how-it-works" className="py-16 sm:py-20 relative bg-slate-950/70 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-xs font-mono text-cyan-400 font-semibold mb-3">
            <Info className="w-3.5 h-3.5" />
            <span>The Social Engineering Pipeline</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            How a Scam Works: The Deception Funnel
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Contrary to popular belief, most scams do not rely on complex technical exploits or Hollywood-style hacking. They exploit predictable human cognitive heuristics: curiosity, compliance with authority, and manufactured panic.
          </p>
        </div>

        {/* Interactive 6-Stage Stepper Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {HOW_A_SCAM_WORKS_STAGES.map((stage, idx) => {
            const isActive = activeStageIndex === idx;
            return (
              <button
                key={stage.step}
                type="button"
                onClick={() => setActiveStageIndex(idx)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between relative group ${
                  isActive
                    ? 'border-amber-500/80 bg-slate-900 shadow-lg shadow-amber-950/30'
                    : 'border-slate-800/90 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
                aria-pressed={isActive}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold border ${
                      isActive
                        ? 'bg-amber-950 border-amber-600 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {stage.step}
                  </span>
                  {renderStageIcon(stage.iconName, isActive)}
                </div>

                <div>
                  <h3 className={`text-sm font-bold tracking-tight ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {stage.name}
                  </h3>
                  <span className="text-[11px] text-slate-400 block truncate mt-0.5">
                    {stage.tagline}
                  </span>
                </div>

                {/* Active arrow indicator */}
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-2 bg-amber-500 clip-triangle hidden lg:block" />
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Breakdown Card */}
        <div className="rounded-2xl border border-amber-900/40 bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-slate-950 p-6 sm:p-8 backdrop-blur-md shadow-xl">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-700 flex items-center justify-center shrink-0">
                {renderStageIcon(activeStage.iconName, true)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    Stage {activeStage.step} of 6
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {activeStage.tagline}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {activeStage.name}
                </h3>
              </div>
            </div>

            {/* Quick Next/Prev Controls */}
            <div className="flex items-center gap-2 self-end lg:self-center">
              <button
                type="button"
                disabled={activeStageIndex === 0}
                onClick={() => setActiveStageIndex((prev) => Math.max(0, prev - 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-medium text-slate-300 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                Previous Stage
              </button>
              <button
                type="button"
                disabled={activeStageIndex === HOW_A_SCAM_WORKS_STAGES.length - 1}
                onClick={() => setActiveStageIndex((prev) => Math.min(HOW_A_SCAM_WORKS_STAGES.length - 1, prev + 1))}
                className="px-3 py-1.5 rounded-lg border border-cyan-800/80 bg-cyan-950/60 text-xs font-medium text-cyan-300 hover:bg-cyan-900/60 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                Next Stage &rarr;
              </button>
            </div>
          </div>

          {/* Core Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {/* 1. Attacker Tactic */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/90 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-semibold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>The Attacker Tactic</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeStage.attackerTactic}
              </p>
            </div>

            {/* 2. Psychological Hook */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/90 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
                <Info className="w-4 h-4" />
                <span>The Psychological Hook</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeStage.psychologicalHook}
              </p>
            </div>

            {/* 3. Defender Countermeasure */}
            <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-900/60 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Defensive Counter-Habit</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {activeStage.defenderCountermeasure}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
