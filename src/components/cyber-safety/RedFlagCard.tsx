'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { RedFlagItem } from '@/types';

interface RedFlagCardProps {
  flag: RedFlagItem;
}

export const RedFlagCard: React.FC<RedFlagCardProps> = ({ flag }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
        isExpanded
          ? 'bg-slate-900 border-amber-500/80 shadow-lg shadow-amber-500/10'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
      }`}
    >
      <div className="p-5 sm:p-6">
        {/* Header with Number Badge & Flag Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-800/80 text-amber-400 font-mono text-xs font-bold">
              #{flag.number < 10 ? `0${flag.number}` : flag.number}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
              Scam Indicator
            </span>
          </div>
          <AlertTriangle className="w-4 h-4 text-amber-400" />
        </div>

        {/* Title & Summary */}
        <h3 className="text-base font-bold text-white mb-2 leading-snug">
          {flag.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {flag.summary}
        </p>

        {/* Real-World Scenario Snippet */}
        <div className="mt-3.5 p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 text-xs">
          <span className="font-semibold text-slate-300 block mb-1">Common Pretext:</span>
          <p className="text-slate-400 italic">&ldquo;{flag.realWorldScenario}&rdquo;</p>
        </div>

        {/* Detailed Breakdown */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3 text-xs leading-relaxed">
            <div>
              <span className="font-semibold text-slate-200 block mb-0.5">Why Attackers Use This:</span>
              <p className="text-slate-400">{flag.tacticExplanation}</p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/60 text-emerald-300">
              <span className="font-semibold block mb-0.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Immediate Defense Action:
              </span>
              <p className="text-slate-300">{flag.defensiveAction}</p>
            </div>
          </div>
        )}
      </div>

      {/* Card Action Toggle */}
      <div className="px-5 pb-5 pt-0">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs font-medium text-slate-300 bg-slate-950/60 hover:bg-slate-800 hover:text-white border border-slate-800/80 transition-colors cyber-focus-ring"
        >
          <span>{isExpanded ? 'Hide explanation' : 'Examine scam mechanics'}</span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          )}
        </button>
      </div>
    </div>
  );
};
