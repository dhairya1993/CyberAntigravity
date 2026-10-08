'use client';

import React from 'react';
import { Layers, Terminal, GraduationCap, ShieldCheck } from 'lucide-react';

interface StatIndicator {
  title: string;
  metricLabel: string;
  statusText: string;
  icon: React.ReactNode;
  accentColor: string;
  borderColor: string;
  dotColor: string;
}

const INDICATORS: StatIndicator[] = [
  {
    title: '12+ Scam Types',
    metricLabel: 'DEFENSIVE CATALOG',
    statusText: 'ACTIVE COVERAGE',
    icon: <Layers className="w-4 h-4 text-cyan-400" aria-hidden="true" />,
    accentColor: 'text-cyan-300',
    borderColor: 'group-hover:border-cyan-500/40',
    dotColor: 'bg-cyan-400',
  },
  {
    title: 'Interactive Scenarios',
    metricLabel: 'SIMULATOR LAB',
    statusText: 'REAL-WORLD SIGNALS',
    icon: <Terminal className="w-4 h-4 text-amber-400" aria-hidden="true" />,
    accentColor: 'text-amber-300',
    borderColor: 'group-hover:border-amber-500/40',
    dotColor: 'bg-amber-400',
  },
  {
    title: 'Beginner Friendly',
    metricLabel: 'LEARNING CURVE',
    statusText: 'ZERO PREREQUISITES',
    icon: <GraduationCap className="w-4 h-4 text-teal-400" aria-hidden="true" />,
    accentColor: 'text-teal-300',
    borderColor: 'group-hover:border-teal-500/40',
    dotColor: 'bg-teal-400',
  },
  {
    title: 'Privacy First',
    metricLabel: 'TELEMETRY POLICY',
    statusText: 'CLIENT-SIDE RUNTIME',
    icon: <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />,
    accentColor: 'text-emerald-300',
    borderColor: 'group-hover:border-emerald-500/40',
    dotColor: 'bg-emerald-400',
  },
];

export const ScamHubStatsStrip: React.FC = () => {
  return (
    <section className="relative py-6 sm:py-8 border-b border-slate-800/60 bg-[#06080e]" aria-label="Key Platform Indicators">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {INDICATORS.map((indicator) => (
            <div
              key={indicator.title}
              className={`group relative rounded-xl border border-slate-800/90 bg-slate-950/70 p-3.5 sm:p-4 backdrop-blur-sm transition-all duration-300 hover:bg-slate-900/80 hover:-translate-y-0.5 ${indicator.borderColor}`}
            >
              {/* Telemetry Header Bar */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-medium tracking-wider text-slate-400 uppercase">
                  {indicator.metricLabel}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${indicator.dotColor} animate-pulse`} aria-hidden="true" />
                  <span className="text-[9px] font-mono text-slate-400 uppercase hidden sm:inline">
                    {indicator.statusText}
                  </span>
                </div>
              </div>

              {/* Indicator Body */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {indicator.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                    {indicator.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
