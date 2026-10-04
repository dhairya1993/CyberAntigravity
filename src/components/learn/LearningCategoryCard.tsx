'use client';

import React from 'react';
import Link from 'next/link';
import { LearningLevelItem } from '@/types';
import { Badge } from '@/components/ui/Badge';
import {
  Shield,
  Smartphone,
  Network,
  Terminal,
  Code2,
  SearchCode,
  Activity,
  FileSearch,
  Sparkles,
  ArrowRight,
  BookOpen,
  Layers,
  Lock,
} from 'lucide-react';

interface LearningCategoryCardProps {
  levelItem: LearningLevelItem;
}

export const LearningCategoryCard: React.FC<LearningCategoryCardProps> = ({ levelItem }) => {
  const iconMap: Record<string, React.ReactNode> = {
    Shield: <Shield className="w-5 h-5 text-cyan-400" />,
    Smartphone: <Smartphone className="w-5 h-5 text-emerald-400" />,
    Network: <Network className="w-5 h-5 text-blue-400" />,
    Terminal: <Terminal className="w-5 h-5 text-purple-400" />,
    Code2: <Code2 className="w-5 h-5 text-cyan-400" />,
    SearchCode: <SearchCode className="w-5 h-5 text-amber-400" />,
    Activity: <Activity className="w-5 h-5 text-purple-400" />,
    FileSearch: <FileSearch className="w-5 h-5 text-blue-400" />,
    Sparkles: <Sparkles className="w-5 h-5 text-cyan-400" />,
  };

  const difficultyVariant: Record<string, 'cyan' | 'purple' | 'amber'> = {
    Beginner: 'cyan',
    Intermediate: 'purple',
    Advanced: 'amber',
  };

  const isAvailable = levelItem.status === 'Available';

  return (
    <div
      className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 backdrop-blur-md relative overflow-hidden group ${
        isAvailable
          ? 'bg-slate-900/90 border-cyan-500/40 hover:border-cyan-500/80 shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/10'
          : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70'
      }`}
    >
      <div>
        {/* Header Badge Row */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
              Level {levelItem.level}
            </span>
            <Badge
              variant={difficultyVariant[levelItem.difficulty] || 'outline'}
              size="sm"
            >
              {levelItem.difficulty}
            </Badge>
          </div>

          {/* Progress Indicator Placeholder - STRICTLY Self-Paced (No Fake Percentages) */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
            <span>Self-paced</span>
          </div>
        </div>

        {/* Title & Icon */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 shrink-0 group-hover:border-cyan-500/30 transition-colors">
            {iconMap[levelItem.iconName] || <Shield className="w-5 h-5 text-cyan-400" />}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
              {levelItem.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-cyan-400" /> {levelItem.topicsCount} Topics
              </span>
              <span>•</span>
              <span>{levelItem.estimatedHours}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          {levelItem.shortDescription}
        </p>

        {/* Topics List Preview */}
        <div className="space-y-1.5 mb-6">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1">
            <BookOpen className="w-3 h-3 text-cyan-400" /> Topics Covered:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {levelItem.topics.slice(0, 5).map((topic, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300"
              >
                {topic}
              </span>
            ))}
            {levelItem.topics.length > 5 && (
              <span className="px-2 py-0.5 rounded bg-slate-950/40 text-[11px] text-slate-400 font-mono">
                +{levelItem.topics.length - 5} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-xs text-slate-400 font-mono">
          {isAvailable ? 'Curriculum Ready' : 'In Curriculum Planning'}
        </span>

        {isAvailable ? (
          <Link
            href={`/learn/${levelItem.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/10 group-hover:shadow-cyan-500/25"
          >
            <span>Start Level</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-400 text-xs font-mono">
            <Lock className="w-3 h-3 text-slate-400" />
            <span>Planned Level</span>
          </span>
        )}
      </div>
    </div>
  );
};
