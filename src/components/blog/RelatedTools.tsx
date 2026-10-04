'use client';

import React from 'react';
import Link from 'next/link';
import { ALL_TOOLS } from '@/data/toolsHubData';
import { Wrench, ArrowRight } from 'lucide-react';

interface RelatedToolsProps {
  toolSlugs?: string[];
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({ toolSlugs }) => {
  if (!toolSlugs || toolSlugs.length === 0) return null;

  // Resolve matching tools from ALL_TOOLS that are currently AVAILABLE or have real pages
  const tools = toolSlugs
    .map((slug) => ALL_TOOLS.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => !!t && t.status === 'AVAILABLE');

  if (tools.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm space-y-4">
      <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
        <Wrench className="w-4 h-4 text-cyan-400" />
        <span>Interactive Defense Utilities</span>
      </div>

      <div className="space-y-3">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:border-cyan-500/40 transition-colors space-y-2 group"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                {tool.name}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 uppercase">
                Available
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
              {tool.shortDescription}
            </p>
            <div className="pt-1">
              <Link
                href={tool.href}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300"
              >
                <span>Launch Tool</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-1 border-t border-slate-800/80">
        <Link
          href="/tools"
          className="text-xs font-mono text-slate-400 hover:text-cyan-300 flex items-center justify-between"
        >
          <span>View All 6 Available Tools</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
