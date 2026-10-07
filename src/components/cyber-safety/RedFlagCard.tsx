'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from 'lucide-react';

export interface ThreatRedFlag {
  number: number;
  title: string;
  summary: string;
  whySuspicious: string;
  whatToDoInstead: string;
  illustration: React.ReactNode;
}

interface RedFlagCardProps {
  flag: ThreatRedFlag;
}

export const RedFlagCard: React.FC<RedFlagCardProps> = ({ flag }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group cyber-focus-ring ${
        isExpanded
          ? 'bg-slate-900 border-amber-500/80 shadow-xl shadow-amber-500/10'
          : isHovered
          ? 'bg-slate-900/90 border-slate-700 shadow-md translate-y-[-2px]'
          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
      }`}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsExpanded(!isExpanded);
        }
      }}
    >
      <div className="p-5 sm:p-6">
        {/* Header with Number Badge & Custom Vector Illustration */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-800/80 text-amber-400 font-mono text-xs font-bold">
              #{flag.number < 10 ? `0${flag.number}` : flag.number}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 font-mono">
              Threat Red Flag
            </span>
          </div>

          <div className="p-1 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-amber-500/40 transition-colors">
            {flag.illustration}
          </div>
        </div>

        {/* Title & Summary */}
        <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-amber-300 transition-colors">
          {flag.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {flag.summary}
        </p>

        {/* Detailed Breakdown: Why this is suspicious & What to do instead */}
        {(isExpanded || isHovered) && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3 text-xs leading-relaxed animate-in fade-in duration-200">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1">
                <HelpCircle className="w-3.5 h-3.5" />
                Why this is suspicious:
              </span>
              <p className="text-slate-300 pl-5 border-l border-amber-800/60">
                {flag.whySuspicious}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/60 text-emerald-300">
              <span className="font-semibold flex items-center gap-1.5 mb-1 text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                What to do instead:
              </span>
              <p className="text-slate-300 pl-5 border-l border-emerald-800/60">
                {flag.whatToDoInstead}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Card Action Toggle */}
      <div className="px-5 pb-5 pt-0">
        <div className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs font-medium text-slate-300 bg-slate-950/60 group-hover:bg-slate-800 border border-slate-800/80 transition-colors">
          <span>{isExpanded ? 'Hide threat guidance' : 'View suspicion & safe response'}</span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
          )}
        </div>
      </div>
    </div>
  );
};
