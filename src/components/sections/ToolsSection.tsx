'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Key,
  Link2,
  FileSearch,
  MessageSquareCheck,
  Globe2,
  CheckCircle2,
  ArrowRight,
  Info,
  Wrench,
} from 'lucide-react';
import { CYBER_TOOLS } from '@/data/toolsData';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { PasswordEntropyTool } from '@/components/tools/PasswordEntropyTool';
import { UrlSafetyPreview } from '@/components/tools/UrlSafetyPreview';

export const ToolsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'password' | 'url' | 'all'>('password');

  const iconMap: Record<string, React.ReactNode> = {
    Key: <Key className="w-5 h-5 text-cyan-400" />,
    Link2: <Link2 className="w-5 h-5 text-cyan-400" />,
    FileSearch: <FileSearch className="w-5 h-5 text-cyan-400" />,
    MessageSquareCheck: <MessageSquareCheck className="w-5 h-5 text-cyan-400" />,
    Globe2: <Globe2 className="w-5 h-5 text-cyan-400" />,
  };

  return (
    <section id="tools" className="py-20 md:py-28 relative scroll-mt-20 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Educational Utilities & Roadmaps"
          badgeVariant="emerald"
          title="Cyber Safety Utilities & Architecture Roadmaps"
          description="Interactive client-side calculators and conceptual architecture previews for future defensive tools. Designed to help learners understand the mechanics of password entropy, deceptive link structures, and email authentication."
        />

        {/* Transparent Capability Status Note */}
        <div className="mb-10 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-white">Educational Scope & Transparency Notice:</span>
            {' '}Interactive utilities on this page execute 100% locally in your browser memory for educational demonstration. They do not monitor your device or access live external threat feeds. Future intelligence utilities will be connected to verified security feeds in subsequent releases.
          </div>
        </div>

        {/* Tool Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('password')}
            type="button"
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cyber-focus-ring ${
              activeTab === 'password'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            Password Entropy Calculator (Interactive)
          </button>
          <button
            onClick={() => setActiveTab('url')}
            type="button"
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cyber-focus-ring ${
              activeTab === 'url'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            Deceptive URL Pattern Simulator (Sandbox)
          </button>
          <button
            onClick={() => setActiveTab('all')}
            type="button"
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cyber-focus-ring ${
              activeTab === 'all'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            Future Tool Architecture Roadmaps
          </button>
          <Link
            href="/tools"
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/50 transition-all flex items-center gap-1.5"
          >
            <Wrench className="w-3.5 h-3.5 text-cyan-400" />
            <span>Full Tools Hub (6 Available) →</span>
          </Link>
        </div>

        {/* Tab Content */}
        {activeTab === 'password' && <PasswordEntropyTool />}
        {activeTab === 'url' && <UrlSafetyPreview />}

        {activeTab === 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CYBER_TOOLS.map((tool) => (
              <div
                key={tool.id}
                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      {iconMap[tool.iconName]}
                    </div>
                    <Badge
                      variant={tool.status === 'Interactive Preview' ? 'emerald' : 'cyan'}
                      size="sm"
                    >
                      {tool.status}
                    </Badge>
                  </div>

                  <span className="text-[11px] font-mono text-cyan-400 block mb-1">
                    {tool.category}
                  </span>
                  <h4 className="text-base font-bold text-white mb-2">{tool.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {tool.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-800/80 pt-4">
                    <span className="text-[11px] font-semibold text-slate-300 block">
                      Target Capabilities:
                    </span>
                    {tool.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">
                    {tool.status === 'Interactive Preview' ? 'Live Browser Mode' : 'Phase 2 Architecture'}
                  </span>
                  {tool.isInteractive && (
                    <button
                      onClick={() => setActiveTab(tool.id === 'password-analyzer' ? 'password' : 'url')}
                      className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      Launch Preview <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
