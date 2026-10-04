import React from 'react';
import Link from 'next/link';
import {
  Compass,
  KeyRound,
  MailWarning,
  Laptop,
  EyeOff,
  Terminal,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { SAFETY_ROADMAP_LEVELS } from '@/data/cyberSafetyHubData';
import { RoadmapLevelItem } from '@/types';

export const SafetyRoadmap: React.FC = () => {
  const getIcon = (name: string) => {
    const props = { className: 'w-5 h-5 text-cyan-400' };
    switch (name) {
      case 'KeyRound':
        return <KeyRound {...props} />;
      case 'MailWarning':
        return <MailWarning {...props} />;
      case 'Laptop':
        return <Laptop {...props} />;
      case 'EyeOff':
        return <EyeOff {...props} />;
      case 'Compass':
        return <Compass {...props} />;
      case 'Terminal':
        return <Terminal {...props} />;
      default:
        return <Compass {...props} />;
    }
  };

  const getStatusBadge = (status: RoadmapLevelItem['status']) => {
    switch (status) {
      case 'Current Guide':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-bold">
            Active Guide
          </span>
        );
      case 'Scam Hub':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/80 font-bold">
            Section Focus
          </span>
        );
      case 'Available':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/80 font-bold">
            Live Track
          </span>
        );
      case 'Coming Soon':
      default:
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-medium">
            Coming Soon
          </span>
        );
    }
  };

  return (
    <section id="safety-roadmap" className="py-16 md:py-24 relative scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Progressive Skill Progression</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Your Cyber Safety Journey
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            From basic credential hygiene to understanding advanced ethical defense architectures—progress step-by-step through our structured curriculum.
          </p>
        </div>

        {/* 6-Level Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAFETY_ROADMAP_LEVELS.map((item: RoadmapLevelItem) => {
            const isClickable = item.status !== 'Coming Soon' && item.href !== '#';
            return (
              <div
                key={item.level}
                className="rounded-2xl border border-slate-800/90 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all duration-200 group shadow-lg"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                        {getIcon(item.iconName)}
                      </div>
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        LEVEL 0{item.level}
                      </span>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>

                  {/* Level Title & Subtitle */}
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium block mt-0.5 mb-2">
                    {item.subtitle}
                  </span>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Milestones */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                      Core Competencies:
                    </span>
                    {item.milestones.map((m, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span className="truncate">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Link / Action */}
                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  {isClickable ? (
                    item.href.startsWith('/') ? (
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <span>Explore this level</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <span>Jump to section</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    )
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Phase 2 Track • In Development</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
