'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ArrowRight,
  GraduationCap,
} from 'lucide-react';

interface LearningStage {
  step: string;
  title: string;
  role: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
}

const STAGES: LearningStage[] = [
  {
    step: '01',
    title: 'BOOK',
    role: 'Learning',
    badge: 'Foundations',
    description: 'Read plain-language explanations of cybersecurity principles without dense jargon or fear-mongering.',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" aria-hidden="true">
        <rect x="6" y="8" width="28" height="24" rx="3" fill="#090d16" stroke="#00f0ff" strokeWidth="1.5" />
        <line x1="20" y1="8" x2="20" y2="32" stroke="#00f0ff" strokeWidth="1.2" strokeDasharray="2 2" />
        <line x1="10" y1="14" x2="16" y2="14" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1="20" x2="16" y2="20" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="14" x2="30" y2="14" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="20" x2="28" y2="20" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'CYBER CONCEPT',
    role: 'Concept',
    badge: 'Architecture',
    description: 'Understand the mechanics: how data packets travel, how attackers intercept logins, and how encryption protects transit.',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" aria-hidden="true">
        <circle cx="20" cy="12" r="4" fill="#090d16" stroke="#00f0ff" strokeWidth="1.5" />
        <circle cx="10" cy="28" r="4" fill="#090d16" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="30" cy="28" r="4" fill="#090d16" stroke="#38bdf8" strokeWidth="1.5" />
        <path d="M 18 15 L 12 25" stroke="#00f0ff" strokeWidth="1.2" strokeDasharray="2 2" />
        <path d="M 22 15 L 28 25" stroke="#00f0ff" strokeWidth="1.2" strokeDasharray="2 2" />
        <path d="M 14 28 L 26 28" stroke="#38bdf8" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'INTERACTIVE SCENARIO',
    role: 'Practice',
    badge: 'Sandbox',
    description: 'Step into real-world simulations: inspect deceptive email headers, dissect spoofed links, and test password resilience.',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" aria-hidden="true">
        <rect x="6" y="10" width="28" height="20" rx="4" fill="#090d16" stroke="#f59e0b" strokeWidth="1.5" />
        <line x1="11" y1="16" x2="17" y2="16" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="13" x2="14" y2="19" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <circle cx="27" cy="18" r="1.5" fill="#f59e0b" />
        <circle cx="23" cy="22" r="1.5" fill="#f59e0b" />
        <line x1="14" y1="30" x2="26" y2="30" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: '04',
    title: 'QUIZ',
    role: 'Knowledge',
    badge: 'Verification',
    description: 'Assess your defensive intuition against realistic fraud scenarios with instant educational feedback and answer explanations.',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" aria-hidden="true">
        <rect x="8" y="8" width="24" height="24" rx="4" fill="#090d16" stroke="#a855f7" strokeWidth="1.5" />
        <circle cx="14" cy="15" r="2" fill="#c084fc" />
        <line x1="18" y1="15" x2="26" y2="15" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="14" cy="21" r="2" fill="#10b981" />
        <path d="M 18 21 L 21 24 L 27 18" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    step: '05',
    title: 'SKILL',
    role: 'Skill',
    badge: 'Defense Habit',
    description: 'Walk away with verified digital defense habits: hardware passkeys configured, automated updates active, and private browsing enabled.',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" aria-hidden="true">
        <path d="M 20 6 L 31 10 V 22 C 31 29 20 34 20 34 C 20 34 9 29 9 22 V 10 L 20 6 Z" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.8" />
        <path d="M 16 20 L 19 23 L 25 17" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export const StudentExperienceSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative border-t border-slate-800/80 bg-slate-900/30">
      <div className="cyber-container space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/80 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>The Student Learning Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Learn Cybersecurity by <span className="text-cyan-400">Understanding It.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Real cybersecurity capability doesn&apos;t come from memorizing fear-driven rules—it grows through progressive conceptual understanding, safe scenario practice, and verified defensive habits.
          </p>
        </div>

        {/* 5 Progression Steps Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {STAGES.map((stage, idx) => (
            <div
              key={stage.step}
              className="relative rounded-2xl border border-slate-800 bg-slate-950/80 p-5 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-xl group"
            >
              <div className="space-y-4">
                {/* Step Pill & Role */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-cyan-400 transition-colors">
                    STAGE {stage.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-cyan-300">
                    {stage.role}
                  </span>
                </div>

                {/* Illustrated Vector Graphic */}
                <div className="h-14 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center group-hover:border-slate-700 transition-colors">
                  {stage.icon}
                </div>

                {/* Titles */}
                <div>
                  <h3 className="text-sm font-mono font-bold tracking-wider uppercase text-white group-hover:text-cyan-300 transition-colors">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">
                    {stage.description}
                  </p>
                </div>
              </div>

              {/* Bottom decorative arrow / indicator */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{stage.badge}</span>
                {idx < STAGES.length - 1 ? (
                  <span className="text-cyan-400 hidden md:inline font-bold">→</span>
                ) : (
                  <span className="text-emerald-400 font-bold">✓</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to start exploring */}
        <div className="text-center pt-2">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-bold shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore Complete Learning Curriculum</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
