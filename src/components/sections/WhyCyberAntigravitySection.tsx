import React from 'react';
import {
  ShieldCheck,
  Compass,
  Lock,
  Users,
  Sparkles,
} from 'lucide-react';

interface Pillar {
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  graphic: React.ReactNode;
  accentColor: string;
}

const PILLARS: Pillar[] = [
  {
    number: '01',
    title: 'DEFENSIVE FIRST',
    tagline: 'Learn to protect, not attack.',
    description:
      'We focus exclusively on defensive posture, risk reduction, and recognizing deception. Our curriculum teaches how to safeguard yourself and others rather than offensive exploitation techniques.',
    accentColor: 'from-cyan-500/20 to-blue-500/5',
    icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
    graphic: (
      <svg viewBox="0 0 100 60" fill="none" className="w-full h-16" aria-hidden="true">
        {/* Shield outline with defensive deflection waves */}
        <path
          d="M50 8L74 16V30C74 44 50 54 50 54C50 54 26 44 26 30V16L50 8Z"
          fill="rgba(6, 182, 212, 0.1)"
          stroke="#06b6d4"
          strokeWidth="2"
        />
        <path d="M50 18V44" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Deflected threat beam */}
        <path d="M12 28L34 26" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2 2" />
        <path d="M34 26L18 14" stroke="#06b6d4" strokeWidth="1.5" />
        <circle cx="34" cy="26" r="2.5" fill="#38bdf8" />
        {/* Protective glow point */}
        <circle cx="50" cy="30" r="4" fill="#22d3ee" fillOpacity="0.4" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'PRACTICAL',
    tagline: 'Realistic scenarios and useful security habits.',
    description:
      'Move beyond abstract textbook definitions. Experience real-world phishing anatomy, analyze deceptive URL tricks, and build hands-on security hygiene you can apply today.',
    accentColor: 'from-emerald-500/20 to-cyan-500/5',
    icon: <Compass className="w-6 h-6 text-emerald-400" />,
    graphic: (
      <svg viewBox="0 0 100 60" fill="none" className="w-full h-16" aria-hidden="true">
        {/* Practical checklist with active check */}
        <rect x="18" y="10" width="64" height="40" rx="4" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" strokeWidth="1.5" />
        <line x1="26" y1="20" x2="32" y2="20" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
        <line x1="38" y1="20" x2="74" y2="20" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="26" y1="30" x2="32" y2="30" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
        <line x1="38" y1="30" x2="68" y2="30" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M26 40L29 43L35 37" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="38" y1="40" x2="62" y2="40" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'PRIVACY MINDED',
    tagline: 'Avoid unnecessary collection of personal information.',
    description:
      'We practice what we preach. Our interactive utilities and assessments run 100% locally in your browser memory. We never sell data, store passwords, or profile learners.',
    accentColor: 'from-purple-500/20 to-pink-500/5',
    icon: <Lock className="w-6 h-6 text-purple-400" />,
    graphic: (
      <svg viewBox="0 0 100 60" fill="none" className="w-full h-16" aria-hidden="true">
        {/* Zero telemetry privacy vault */}
        <circle cx="50" cy="30" r="22" fill="rgba(168, 85, 247, 0.08)" stroke="#a855f7" strokeWidth="1.5" />
        <circle cx="50" cy="30" r="14" stroke="#c084fc" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M44 26V23C44 19.68 46.68 17 50 17C53.32 17 56 19.68 56 23V26" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="42" y="26" width="16" height="13" rx="2.5" fill="#a855f7" />
        <circle cx="50" cy="32.5" r="1.5" fill="#07090e" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'BUILT FOR EVERYONE',
    tagline: 'From beginners to security learners.',
    description:
      'Whether you are a student exploring tech, a teacher guiding a classroom, a parent protecting a home network, or a developer hardening APIs, our lessons scale to meet your needs.',
    accentColor: 'from-amber-500/20 to-orange-500/5',
    icon: <Users className="w-6 h-6 text-amber-400" />,
    graphic: (
      <svg viewBox="0 0 100 60" fill="none" className="w-full h-16" aria-hidden="true">
        {/* Connected community nodes */}
        <circle cx="28" cy="34" r="7" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="50" cy="22" r="9" fill="rgba(245, 158, 11, 0.25)" stroke="#fbbf24" strokeWidth="2" />
        <circle cx="72" cy="34" r="7" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1.5" />
        <path d="M35 32L43 26" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
        <path d="M65 32L57 26" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
        <path d="M35 36C40 38 60 38 65 36" stroke="#78350f" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export const WhyCyberAntigravitySection: React.FC = () => {
  return (
    <section id="principles" className="py-20 md:py-28 relative scroll-mt-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-950/20 via-purple-950/15 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="cyber-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Guiding Principles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why Learn With <span className="text-cyan-400">CyberAntigravity?</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Our mission is to democratize defensive cybersecurity education through ethical guidance, interactive clarity, and zero-compromise learner privacy.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Header with Number and Icon */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-slate-700 group-hover:text-cyan-500/60 transition-colors">
                    {pillar.number}
                  </span>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-slate-700 transition-colors">
                    {pillar.icon}
                  </div>
                </div>

                {/* Custom SVG Schematic Graphic */}
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/60 flex items-center justify-center">
                  {pillar.graphic}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide uppercase font-mono">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-cyan-400 mt-1">
                    {pillar.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
                    {pillar.description}
                  </p>
                </div>
              </div>

              {/* Bottom decorative border line */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Core Pillar {pillar.number}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
