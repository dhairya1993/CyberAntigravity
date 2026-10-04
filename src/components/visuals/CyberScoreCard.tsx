'use client';

import React from 'react';
import {
  Compass,
  KeyRound,
  Fingerprint,
  Eye,
  Info,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

interface ScoreDimension {
  id: string;
  name: string;
  score: number; // percentage
  status: 'Needs Review' | 'Moderate' | 'Strong' | 'Optimal';
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DIMENSIONS: ScoreDimension[] = [
  {
    id: 'phishing',
    name: 'Phishing Awareness',
    score: 85,
    status: 'Strong',
    color: 'bg-cyan-400',
    icon: Compass,
  },
  {
    id: 'passwords',
    name: 'Password Hygiene',
    score: 72,
    status: 'Moderate',
    color: 'bg-emerald-400',
    icon: KeyRound,
  },
  {
    id: 'mfa',
    name: 'MFA Protection',
    score: 90,
    status: 'Optimal',
    color: 'bg-purple-400',
    icon: Fingerprint,
  },
  {
    id: 'privacy',
    name: 'Privacy Posture',
    score: 65,
    status: 'Moderate',
    color: 'bg-amber-400',
    icon: Eye,
  },
];

export const CyberScoreCard: React.FC = () => {
  const overallScore = 78;

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 backdrop-blur-xl relative overflow-hidden shadow-2xl text-left space-y-6">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
            Self-Assessment Visualizer
          </span>
          <h4 className="text-lg sm:text-xl font-extrabold text-white">
            Educational Cyber Awareness Score
          </h4>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400">
          Client-Side Model
        </span>
      </div>

      {/* Main Score Display & Dimension Bars */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Overall Circular Metric */}
        <div className="md:col-span-4 p-5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center text-center space-y-2">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* SVG Radial Gauge */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#00f0ff"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - overallScore / 100)}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-white font-mono leading-none">
                {overallScore}
              </span>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5">out of 100</span>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-400 font-mono">
            Defensive Awareness: Proficient
          </span>
        </div>

        {/* 4 Dimension Bars */}
        <div className="md:col-span-8 space-y-3">
          {DIMENSIONS.map((dim) => {
            const Icon = dim.icon;
            return (
              <div key={dim.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                    <span>{dim.name}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-400 text-[11px]">{dim.status}</span>
                    <span className="text-white font-bold">{dim.score}%</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${dim.score}%` }}
                    className={`h-full rounded-full transition-all duration-700 ${dim.color}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer & Action */}
      <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2 text-slate-400">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            Educational score for personal reflection and training. Does not constitute a formal penetration test or security audit.
          </p>
        </div>

        <Link
          href="/cyber-safety"
          className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-bold shrink-0 transition-colors"
        >
          <span>Take Self-Assessment</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
