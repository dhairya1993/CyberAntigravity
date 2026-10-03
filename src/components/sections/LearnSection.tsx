'use client';

import React, { useState } from 'react';
import {
  Shield,
  Network,
  Terminal,
  Code2,
  SearchCode,
  Cpu,
  Sparkles,
  BookOpen,
  Clock,
  Layers,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { LEARN_TRACKS } from '@/data/learnCourses';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const LearnSection: React.FC = () => {
  const [activeTrackId, setActiveTrackId] = useState(LEARN_TRACKS[0].id);

  const iconMap: Record<string, React.ReactNode> = {
    Shield: <Shield className="w-5 h-5 text-cyan-400" />,
    Network: <Network className="w-5 h-5 text-cyan-400" />,
    Terminal: <Terminal className="w-5 h-5 text-cyan-400" />,
    Code2: <Code2 className="w-5 h-5 text-cyan-400" />,
    SearchCode: <SearchCode className="w-5 h-5 text-cyan-400" />,
    Cpu: <Cpu className="w-5 h-5 text-cyan-400" />,
    Sparkles: <Sparkles className="w-5 h-5 text-cyan-400" />,
  };

  const activeTrack = LEARN_TRACKS.find((t) => t.id === activeTrackId) || LEARN_TRACKS[0];

  return (
    <section id="learn" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Education & Skill Pathways"
          badgeVariant="purple"
          title="Defensive Cybersecurity & Ethical Hacking Curriculum"
          description="A structured, beginner-to-advanced learning roadmap designed to teach the foundations of defensive architecture, vulnerability research, and modern threat response."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Tracks List */}
          <div className="lg:col-span-5 space-y-3">
            {LEARN_TRACKS.map((track) => {
              const isSelected = track.id === activeTrackId;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => setActiveTrackId(track.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-start justify-between gap-3 cyber-focus-ring ${
                    isSelected
                      ? 'bg-slate-900 border-purple-500/80 shadow-md shadow-purple-500/10'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 shrink-0 mt-0.5">
                      {iconMap[track.iconName]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider">
                          {track.level}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-[11px] text-slate-400">{track.modulesCount} Modules</span>
                      </div>
                      <h4 className="text-sm font-bold text-white tracking-tight">{track.title}</h4>
                    </div>
                  </div>

                  <Badge variant={isSelected ? 'purple' : 'outline'} size="sm" className="shrink-0 mt-1">
                    {track.estHours}
                  </Badge>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Track Preview */}
          <div className="lg:col-span-7 rounded-2xl border border-purple-500/30 bg-slate-900/90 backdrop-blur-md p-6 sm:p-8 cyber-card-glow space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="purple" dot size="sm">
                    {activeTrack.level} Track
                  </Badge>
                  <Badge variant="outline" size="sm">
                    {activeTrack.status}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {activeTrack.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-purple-400" /> {activeTrack.modulesCount} modules
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> {activeTrack.estHours}
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {activeTrack.description}
            </p>

            {/* Modules / Topics Covered */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-purple-400" /> Core Modules & Learning Objectives:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeTrack.topicsCovered.map((topic, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs text-slate-200 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase 1 Notice & Phase 2 Enlist */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="text-slate-400">
                <span className="font-semibold text-slate-300">Phase 1 Foundation:</span> Full interactive video lectures, safe browser labs, and CTF challenges will unlock in Phase 2.
              </div>

              <Button
                asLink
                href="#about"
                variant="outline"
                size="sm"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="shrink-0"
              >
                Join Track Waitlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
