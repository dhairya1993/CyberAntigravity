'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, ArrowRight } from 'lucide-react';

interface RelatedLearningProps {
  relatedLearning?: {
    title: string;
    href: string;
  }[];
}

export const RelatedLearning: React.FC<RelatedLearningProps> = ({ relatedLearning }) => {
  if (!relatedLearning || relatedLearning.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm space-y-4">
      <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
        <GraduationCap className="w-4 h-4 text-cyan-400" />
        <span>Structured Learning Tracks</span>
      </div>

      <div className="space-y-2.5">
        {relatedLearning.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="p-3 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:border-cyan-500/40 hover:bg-slate-950 transition-all flex items-center justify-between gap-3 group"
          >
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono text-cyan-400 block">Learning Path</span>
              <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                {item.title}
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>
        ))}
      </div>

      <div className="pt-1 border-t border-slate-800/80">
        <Link
          href="/learn"
          className="text-xs font-mono text-slate-400 hover:text-cyan-300 flex items-center justify-between"
        >
          <span>Explore Cybersecurity Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
