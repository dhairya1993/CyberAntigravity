'use client';

import React from 'react';
import Link from 'next/link';
import { BrainCircuit, ShieldCheck, ChevronRight, Zap } from 'lucide-react';

interface CyberIqHeaderProps {
  currentView: 'dashboard' | 'select' | 'quiz' | 'results' | 'review';
  onNavigateHome?: () => void;
  onOpenBadges?: () => void;
  unlockedBadgeCount: number;
  totalBadgeCount: number;
}

export const CyberIqHeader: React.FC<CyberIqHeaderProps> = ({
  currentView,
  onNavigateHome,
  onOpenBadges,
  unlockedBadgeCount,
  totalBadgeCount,
}) => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link href="/" className="hover:text-cyan-400 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        {currentView === 'select' || currentView === 'dashboard' ? (
          <span className="text-cyan-400 font-bold">Cyber IQ Arena</span>
        ) : (
          <>
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Cyber IQ Arena
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-cyan-400 font-bold uppercase">
              {currentView === 'quiz' && 'Active Challenge'}
              {currentView === 'results' && 'Challenge Results'}
              {currentView === 'review' && 'Answer Review'}
            </span>
          </>
        )}
      </nav>

      {/* Main Hero Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Cyber IQ Arena • Phase 2</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Cyber IQ <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Quiz Arena</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Test and elevate your defensive judgment through real-world cybersecurity scenarios, tactical red-flag analysis, and interactive skill progression.
          </p>
        </div>

        {/* Badges Quick-Trigger & Zero Telemetry Badge */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
          {onOpenBadges && (
            <button
              type="button"
              onClick={onOpenBadges}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-200 text-xs font-mono transition-all cursor-pointer group shadow-lg"
            >
              <Zap className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Badges:</span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-bold border border-cyan-800">
                {unlockedBadgeCount} / {totalBadgeCount}
              </span>
            </button>
          )}

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/90 border border-slate-800 text-[11px] font-mono text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>100% Client-Side • Local Memory • No Account Needed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
