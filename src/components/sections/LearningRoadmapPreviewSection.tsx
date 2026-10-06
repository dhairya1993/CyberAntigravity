'use client';

import React from 'react';
import Link from 'next/link';
import {
  Shield,
  Network,
  Globe,
  TerminalSquare,
  SearchCode,
  Radar,
  Users2,
  Cpu,
  ArrowRight,
  GraduationCap,
} from 'lucide-react';

interface RoadmapStage {
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  shortDescription: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'available' | 'upcoming';
  href: string;
}

const ROADMAP_STAGES: RoadmapStage[] = [
  {
    number: '01',
    title: 'Cybersecurity Fundamentals',
    icon: Shield,
    shortDescription: 'Core terminology, CIA triad, threat modeling, and defensive mindset.',
    difficulty: 'Beginner',
    status: 'available',
    href: '/learn/cybersecurity-fundamentals',
  },
  {
    number: '02',
    title: 'Networking Basics',
    icon: Network,
    shortDescription: 'IP/MAC addressing, TCP/UDP packets, ports, DNS resolution, and routing.',
    difficulty: 'Beginner',
    status: 'available',
    href: '/learn',
  },
  {
    number: '03',
    title: 'Web Security',
    icon: Globe,
    shortDescription: 'HTTP methods, TLS handshakes, OWASP vulnerabilities, and input validation.',
    difficulty: 'Intermediate',
    status: 'available',
    href: '/learn',
  },
  {
    number: '04',
    title: 'Ethical Hacking Concepts',
    icon: TerminalSquare,
    shortDescription: 'Authorized vulnerability exploration, defense verification, and security boundaries.',
    difficulty: 'Intermediate',
    status: 'available',
    href: '/learn',
  },
  {
    number: '05',
    title: 'Digital Forensics',
    icon: SearchCode,
    shortDescription: 'Log analysis, artifact recovery, timeline reconstruction, and evidence integrity.',
    difficulty: 'Intermediate',
    status: 'upcoming',
    href: '/learn',
  },
  {
    number: '06',
    title: 'Threat Detection',
    icon: Radar,
    shortDescription: 'Behavioral anomalies, signature matching, alert triage, and intrusion indicators.',
    difficulty: 'Advanced',
    status: 'upcoming',
    href: '/learn',
  },
  {
    number: '07',
    title: 'SOC & Blue Team',
    icon: Users2,
    shortDescription: 'Incident containment, defensive playbooks, telemetry correlation, and response.',
    difficulty: 'Advanced',
    status: 'upcoming',
    href: '/learn',
  },
  {
    number: '08',
    title: 'Advanced Cyber Defense',
    icon: Cpu,
    shortDescription: 'Zero Trust architecture, cryptographic defenses, and resilient system hardening.',
    difficulty: 'Advanced',
    status: 'upcoming',
    href: '/learn',
  },
];

export const LearningRoadmapPreviewSection: React.FC = () => {
  return (
    <section id="roadmap" className="py-20 md:py-28 relative border-t border-slate-800/80 bg-slate-950/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              <span>CYBERSECURITY LEARNING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              From Beginner to <span className="text-cyan-400">Security Mindset.</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Build lasting defensive instincts through a structured progression from fundamental principles to deep defensive analysis.
            </p>
          </div>

          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group shrink-0"
          >
            <span>Explore Complete Learning Modules</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* =========================================================================
            DESKTOP: Horizontal Roadmap with Glowing Connecting Path
            ========================================================================= */}
        <div className="hidden lg:block relative pt-6 pb-2">
          {/* Glowing connecting line behind stages */}
          <div className="absolute top-[48px] left-10 right-10 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 via-50% to-slate-800 rounded-full pointer-events-none drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]" />

          {/* Horizontal Stages Grid */}
          <div className="grid grid-cols-4 gap-6">
            {ROADMAP_STAGES.map((stage) => {
              const Icon = stage.icon;
              const isAvailable = stage.status === 'available';

              return (
                <div
                  key={stage.number}
                  className={`group relative rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 ${
                    isAvailable
                      ? 'bg-slate-900/80 border-cyan-500/30 hover:border-cyan-400 hover:bg-slate-900 shadow-lg shadow-cyan-950/20 hover:-translate-y-1'
                      : 'bg-slate-950/50 border-slate-800/80 opacity-75 hover:opacity-95'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header: Stage Number & Status Pill */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs border ${
                            isAvailable
                              ? 'bg-cyan-500/10 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-400/20'
                              : 'bg-slate-900 border-slate-800 text-slate-500'
                          }`}
                        >
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <span className="text-xs font-mono font-bold tracking-wider text-slate-400">
                          STAGE {stage.number}
                        </span>
                      </div>

                      <span
                        className={`text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${
                          isAvailable
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        {isAvailable ? 'Available' : 'Upcoming'}
                      </span>
                    </div>

                    {/* Stage Title & Short Description */}
                    <div>
                      <h3
                        className={`text-base font-bold tracking-tight transition-colors ${
                          isAvailable ? 'text-white group-hover:text-cyan-300' : 'text-slate-400'
                        }`}
                      >
                        {stage.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed mt-2">
                        {stage.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Difficulty & Link */}
                  <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span
                      className={`font-mono text-[11px] font-medium ${
                        stage.difficulty === 'Beginner'
                          ? 'text-cyan-400'
                          : stage.difficulty === 'Intermediate'
                          ? 'text-amber-400'
                          : 'text-purple-400'
                      }`}
                    >
                      {stage.difficulty}
                    </span>

                    <Link
                      href={stage.href}
                      className={`inline-flex items-center gap-1 font-semibold text-xs transition-colors ${
                        isAvailable ? 'text-cyan-400 hover:text-cyan-300' : 'text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            MOBILE / TABLET: Vertical Timeline Flow
            ========================================================================= */}
        <div className="lg:hidden relative pl-6 space-y-6">
          {/* Vertical connecting line */}
          <div className="absolute left-[18px] top-4 bottom-4 w-1 bg-gradient-to-b from-cyan-400 via-emerald-400 to-slate-800 rounded-full pointer-events-none" />

          {ROADMAP_STAGES.map((stage) => {
            const Icon = stage.icon;
            const isAvailable = stage.status === 'available';

            return (
              <div key={stage.number} className="relative flex items-start gap-4">
                {/* Node Milestone Dot */}
                <div
                  className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-mono font-bold text-xs border -ml-4 z-10 ${
                    isAvailable
                      ? 'bg-slate-950 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-400/40'
                      : 'bg-slate-950 border-slate-700 text-slate-500'
                  }`}
                >
                  {stage.number}
                </div>

                {/* Card Container */}
                <div
                  className={`flex-1 rounded-2xl border p-4.5 space-y-3 ${
                    isAvailable
                      ? 'bg-slate-900/80 border-cyan-500/30'
                      : 'bg-slate-950/60 border-slate-800/80 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${isAvailable ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <h3 className="text-sm font-bold text-white">{stage.title}</h3>
                    </div>
                    <span
                      className={`text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${
                        isAvailable
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {isAvailable ? 'Available' : 'Upcoming'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {stage.shortDescription}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-cyan-400">
                      Difficulty: {stage.difficulty}
                    </span>
                    <Link
                      href={stage.href}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1 text-xs"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Legend */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5 text-cyan-300">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            Available Curriculum (Cyan / Green)
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            Upcoming Curriculum (Dark Neutral Styling)
          </span>
        </div>
      </div>
    </section>
  );
};
