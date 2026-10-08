'use client';

import React from 'react';
import {
  Zap,
  ShieldAlert,
  Landmark,
  Coins,
  Eye,
  HeartHandshake,
} from 'lucide-react';
import { WARNING_PATTERN_NODES, WarningPatternNode } from '@/data/scamTypesExplorerData';

const getNodeIcon = (iconName: string) => {
  const iconProps = { className: 'w-6 h-6', 'aria-hidden': true };
  switch (iconName) {
    case 'Zap':
      return <Zap {...iconProps} />;
    case 'ShieldAlert':
      return <ShieldAlert {...iconProps} />;
    case 'Landmark':
      return <Landmark {...iconProps} />;
    case 'Coins':
      return <Coins {...iconProps} />;
    case 'Eye':
      return <Eye {...iconProps} />;
    case 'HeartHandshake':
      return <HeartHandshake {...iconProps} />;
    default:
      return <Zap {...iconProps} />;
  }
};

const getNodeColorStyle = (color: string) => {
  switch (color) {
    case 'amber':
      return {
        border: 'border-amber-900/50 hover:border-amber-500/80',
        badge: 'bg-amber-950/60 border-amber-800/80 text-amber-300',
        iconBg: 'bg-amber-950/40 text-amber-400 border-amber-800/60',
        glow: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]',
        indicator: 'bg-amber-400',
      };
    case 'rose':
      return {
        border: 'border-rose-900/50 hover:border-rose-500/80',
        badge: 'bg-rose-950/60 border-rose-800/80 text-rose-300',
        iconBg: 'bg-rose-950/40 text-rose-400 border-rose-800/60',
        glow: 'hover:shadow-[0_0_25px_rgba(244,63,94,0.2)]',
        indicator: 'bg-rose-400',
      };
    case 'blue':
      return {
        border: 'border-blue-900/50 hover:border-blue-500/80',
        badge: 'bg-blue-950/60 border-blue-800/80 text-blue-300',
        iconBg: 'bg-blue-950/40 text-blue-400 border-blue-800/60',
        glow: 'hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]',
        indicator: 'bg-blue-400',
      };
    case 'emerald':
      return {
        border: 'border-emerald-900/50 hover:border-emerald-500/80',
        badge: 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300',
        iconBg: 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60',
        glow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]',
        indicator: 'bg-emerald-400',
      };
    case 'purple':
      return {
        border: 'border-purple-900/50 hover:border-purple-500/80',
        badge: 'bg-purple-950/60 border-purple-800/80 text-purple-300',
        iconBg: 'bg-purple-950/40 text-purple-400 border-purple-800/60',
        glow: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]',
        indicator: 'bg-purple-400',
      };
    case 'cyan':
    default:
      return {
        border: 'border-cyan-900/50 hover:border-cyan-500/80',
        badge: 'bg-cyan-950/60 border-cyan-800/80 text-cyan-300',
        iconBg: 'bg-cyan-950/40 text-cyan-400 border-cyan-800/60',
        glow: 'hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]',
        indicator: 'bg-cyan-400',
      };
  }
};

export const ScamWarningPatterns: React.FC = () => {
  return (
    <section
      className="py-16 sm:py-24 bg-gradient-to-b from-[#07090e] via-[#0a0e19] to-[#07090e] border-y border-slate-800/80 relative overflow-hidden"
      aria-labelledby="warning-patterns-heading"
    >
      {/* Background Cyber Grid & Glow */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"
        aria-hidden={true}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-cyan-500/5 blur-[120px] pointer-events-none"
        aria-hidden={true}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-800/80 bg-cyan-950/60 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" aria-hidden={true} />
            THE COMMON PATTERN
          </div>
          <h2
            id="warning-patterns-heading"
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Different Scams. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-cyan-400">
              Same Psychological Tricks.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            No matter how realistic the pretext, cybercriminals universally manipulate the same human behavioral vulnerabilities to bypass rational skepticism.
          </p>
        </div>

        {/* Graphical Circular / Network Visualization Diagram */}
        <div className="max-w-2xl mx-auto rounded-2xl border border-slate-800/90 bg-slate-950/90 p-4 sm:p-6 shadow-2xl relative">
          <div className="text-center mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
              PSYCHOLOGICAL EXPLOITATION TOPOLOGY
            </span>
          </div>

          <svg
            viewBox="0 0 400 300"
            className="w-full h-auto max-h-72 mx-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Network diagram with central SCAMMER node surrounded by Urgency, Fear, Authority, Greed, Curiosity, and Trust"
          >
            <defs>
              <filter id="patCenterGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Radar Rings */}
            <circle cx="200" cy="150" r="115" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            <circle cx="200" cy="150" r="75" stroke="#334155" strokeWidth="1" opacity="0.4" />

            {/* Animated Connecting Vector Lines (Center cx=200, cy=150 to 6 nodes) */}
            {/* 1. Urgency (200, 38) */}
            <line x1="200" y1="150" x2="200" y2="40" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.8" />
            {/* 2. Fear (305, 88) */}
            <line x1="200" y1="150" x2="305" y2="88" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.8" />
            {/* 3. Authority (305, 212) */}
            <line x1="200" y1="150" x2="305" y2="212" stroke="#3b82f6" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.8" />
            {/* 4. Greed (200, 260) */}
            <line x1="200" y1="150" x2="200" y2="260" stroke="#10b981" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.8" />
            {/* 5. Curiosity (95, 212) */}
            <line x1="200" y1="150" x2="95" y2="212" stroke="#a855f7" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.8" />
            {/* 6. Trust (95, 88) */}
            <line x1="200" y1="150" x2="95" y2="88" stroke="#06b6d4" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.8" />

            {/* Moving Pulses on vectors */}
            <circle cx="200" cy="88" r="2.5" fill="#f59e0b" />
            <circle cx="258" cy="115" r="2.5" fill="#f43f5e" />
            <circle cx="258" cy="185" r="2.5" fill="#3b82f6" />
            <circle cx="200" cy="212" r="2.5" fill="#10b981" />
            <circle cx="142" cy="185" r="2.5" fill="#a855f7" />
            <circle cx="142" cy="115" r="2.5" fill="#06b6d4" />

            {/* Central Node: "SCAMMER" */}
            <g transform="translate(200, 150)">
              <circle cx="0" cy="0" r="34" fill="#18070b" stroke="#f43f5e" strokeWidth="2.5" filter="url(#patCenterGlow)" />
              <text x="0" y="-3" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="monospace" letterSpacing="1.5">
                SCAMMER
              </text>
              <text x="0" y="9" fill="#fecdd3" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                ORIGIN LEVER
              </text>
            </g>

            {/* Radiating Nodes */}
            {/* Node 1: URGENCY (200, 38) */}
            <g transform="translate(200, 38)">
              <circle cx="0" cy="0" r="20" fill="#2d1604" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="0" y="3" fill="#fef08a" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                URGENCY
              </text>
            </g>

            {/* Node 2: FEAR (305, 88) */}
            <g transform="translate(305, 88)">
              <circle cx="0" cy="0" r="20" fill="#310914" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="0" y="3" fill="#fecdd3" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                FEAR
              </text>
            </g>

            {/* Node 3: AUTHORITY (305, 212) */}
            <g transform="translate(305, 212)">
              <circle cx="0" cy="0" r="20" fill="#071b3b" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="0" y="3" fill="#bfdbfe" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                AUTHORITY
              </text>
            </g>

            {/* Node 4: GREED (200, 260) */}
            <g transform="translate(200, 260)">
              <circle cx="0" cy="0" r="20" fill="#062e22" stroke="#10b981" strokeWidth="1.5" />
              <text x="0" y="3" fill="#a7f3d0" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                GREED
              </text>
            </g>

            {/* Node 5: CURIOSITY (95, 212) */}
            <g transform="translate(95, 212)">
              <circle cx="0" cy="0" r="20" fill="#25093e" stroke="#a855f7" strokeWidth="1.5" />
              <text x="0" y="3" fill="#e9d5ff" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                CURIOSITY
              </text>
            </g>

            {/* Node 6: TRUST (95, 88) */}
            <g transform="translate(95, 88)">
              <circle cx="0" cy="0" r="20" fill="#052636" stroke="#06b6d4" strokeWidth="1.5" />
              <text x="0" y="3" fill="#a5f3fc" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                TRUST
              </text>
            </g>
          </svg>
        </div>

        {/* Explanations Grid: 6 Detailed Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {WARNING_PATTERN_NODES.map((node: WarningPatternNode, idx: number) => {
            const style = getNodeColorStyle(node.color);
            return (
              <div
                key={node.id}
                className={`group relative rounded-2xl border bg-slate-950/85 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${style.border} ${style.glow}`}
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${style.iconBg}`}
                  >
                    {getNodeIcon(node.iconName)}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    VECTOR 0{idx + 1}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${style.indicator}`} aria-hidden={true} />
                  <h3 className="text-lg font-bold text-white tracking-wide font-mono">
                    {node.title}
                  </h3>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {node.explanation}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
