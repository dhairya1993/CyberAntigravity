'use client';

import React from 'react';
import { FUTURE_LABS } from '@/data/learningHubData';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import {
  FlaskConical,
  Code2,
  Network,
  Terminal,
  Activity,
  FileSearch,
  Sparkles,
  Lock,
  CheckCircle2,
} from 'lucide-react';

export const FutureLabsTeaser: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className="w-5 h-5 text-cyan-400" />,
    Network: <Network className="w-5 h-5 text-blue-400" />,
    Terminal: <Terminal className="w-5 h-5 text-purple-400" />,
    Activity: <Activity className="w-5 h-5 text-emerald-400" />,
    FileSearch: <FileSearch className="w-5 h-5 text-amber-400" />,
    Sparkles: <Sparkles className="w-5 h-5 text-cyan-400" />,
  };

  return (
    <section id="future-labs" className="py-16 md:py-24 border-b border-slate-800/80 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Hands-On Cyber Labs"
          badgeVariant="cyan"
          title="Safe, Controlled Security Labs"
          description="Practice cybersecurity concepts in controlled, authorized environments. Learn how to configure defenses, examine packet captures, and audit system configurations without setting up complex physical infrastructure."
        />

        {/* Status Callout Banner */}
        <div className="mt-8 max-w-2xl mx-auto p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-cyan-300">
            <FlaskConical className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Lab Sandbox Roadmap:</strong> All virtual training sandboxes operate strictly within browser client containers and mock environments.
            </span>
          </div>
          <Badge variant="cyan" size="sm" dot className="shrink-0">
            Coming Soon
          </Badge>
        </div>

        {/* Future Lab Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {FUTURE_LABS.map((lab) => (
            <div
              key={lab.id}
              className="rounded-2xl border border-slate-800/90 bg-slate-900/60 p-6 backdrop-blur-sm flex flex-col justify-between hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-300 relative group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase bg-slate-800/80 text-slate-300 border border-slate-700/80">
                    {lab.category}
                  </span>
                  <Badge variant="outline" size="sm">
                    {lab.status}
                  </Badge>
                </div>

                <div className="flex items-start gap-3.5 mb-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 shrink-0 group-hover:border-cyan-500/30 transition-colors">
                    {iconMap[lab.iconName] || <FlaskConical className="w-5 h-5 text-cyan-400" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {lab.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {lab.description}
                </p>

                {/* Core Focus Areas */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Planned Focus Topics:
                  </span>
                  <div className="space-y-1">
                    {lab.coreFocus.map((focus, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400/70 shrink-0" />
                        <span>{focus}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Phase 2 Architecture</span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Sandbox Isolated
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
