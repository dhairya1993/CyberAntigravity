'use client';

import React from 'react';
import Link from 'next/link';
import { ToolItem } from '@/types';
import { ALL_TOOLS } from '@/data/toolsHubData';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { ToolDisclaimer } from './ToolDisclaimer';
import {
  ShieldCheck,
  Lock,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface ToolShellProps {
  tool: ToolItem;
  children: React.ReactNode;
}

export const ToolShell: React.FC<ToolShellProps> = ({ tool, children }) => {
  // Find related tools
  const relatedTools = (tool.relatedToolSlugs || [])
    .map((slug) => ALL_TOOLS.find((t) => t.slug === slug))
    .filter((t): t is ToolItem => !!t);

  return (
    <div className="relative pt-24 pb-20 md:pt-28 md:pb-28">
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 bg-[#07090e] -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[22rem] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: tool.category, href: '/tools#tools-directory' },
            { label: tool.name },
          ]}
        />

        {/* 2. Tool Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
              {tool.category}
            </span>
            <Badge variant="cyan" size="sm">
              {tool.difficulty}
            </Badge>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase border border-emerald-500/40 bg-emerald-950/40 text-emerald-300">
              {tool.status}
            </span>
            <span className="text-xs text-slate-400 font-mono ml-auto flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{tool.isClientSideOnly ? '100% Client-Side' : 'Cloud Service'}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {tool.name}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {tool.purpose}
          </p>
        </div>

        {/* 3. Main Interactive Tool Slot */}
        <section aria-label="Interactive Tool Interface">
          {children}
        </section>

        {/* 4. How It Works Section */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 backdrop-blur-sm space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Operational Mechanics</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            How This Tool Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {tool.howItWorks.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs sm:text-sm text-slate-300"
              >
                <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 text-xs font-bold flex items-center justify-center font-mono shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Privacy Information & Limitations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Privacy */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Privacy Standard</span>
            </div>
            <h3 className="text-base font-bold text-white">Data Handling & Privacy</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {tool.privacyNotes}
            </p>
          </div>

          {/* Limitations */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Scope & Limitations</span>
            </div>
            <h3 className="text-base font-bold text-white">Tool Limitations</h3>
            <div className="space-y-1.5">
              {tool.limitations.map((lim, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{lim}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. Educational Guidance */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Defensive Guidance</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Security Best Practices
          </h2>

          <div className="space-y-2.5 pt-1">
            {tool.educationalGuidance.map((guide, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{guide}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Reusable Standard Tool Disclaimer */}
        <ToolDisclaimer />

        {/* 8. Related Tools, Learning Content & Blog Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Related Utilities:
              </span>
              <div className="space-y-2">
                {relatedTools.map((rel) => (
                  <Link
                    key={rel.id}
                    href={rel.href}
                    className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 flex items-center justify-between text-xs text-slate-200 transition-colors group"
                  >
                    <span className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {rel.name}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Learning Content */}
          {tool.relatedLearningLink && (
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Related Curriculum:
              </span>
              <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-950/20 space-y-2 h-full flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono text-purple-400 uppercase">
                    Learning Track
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">
                    {tool.relatedLearningLink.title}
                  </h4>
                </div>
                <Link
                  href={tool.relatedLearningLink.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors pt-2"
                >
                  <span>Explore Learning Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Related Educational Blog Guide */}
          {tool.relatedArticleLink && (
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                In-Depth Guide:
              </span>
              <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 space-y-2 h-full flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 uppercase">
                    CyberAntigravity Guide
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">
                    {tool.relatedArticleLink.title}
                  </h4>
                </div>
                <Link
                  href={tool.relatedArticleLink.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors pt-2"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
