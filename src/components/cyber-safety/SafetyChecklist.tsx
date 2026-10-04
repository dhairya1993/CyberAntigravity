'use client';

import React, { useState } from 'react';
import {
  KeyRound,
  ShieldCheck,
  RefreshCw,
  MailWarning,
  Lock,
  Laptop,
  Sliders,
  FileText,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { QUICK_SAFETY_CHECKLIST } from '@/data/cyberSafetyHubData';
import { SafetyChecklistItem } from '@/types';

export const SafetyChecklist: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5 text-cyan-400 shrink-0' };
    switch (iconName) {
      case 'KeyRound':
        return <KeyRound {...props} />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      case 'RefreshCw':
        return <RefreshCw {...props} />;
      case 'MailWarning':
        return <MailWarning {...props} />;
      case 'Lock':
        return <Lock {...props} />;
      case 'Laptop':
        return <Laptop {...props} />;
      case 'Sliders':
        return <Sliders {...props} />;
      case 'FileText':
        return <FileText {...props} />;
      default:
        return <ShieldCheck {...props} />;
    }
  };

  return (
    <section id="safety-checklist" className="py-16 md:py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Essential Baseline Hygiene</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Quick Safety Checklist
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            These 8 fundamental security habits block over 90% of automated credential attacks, ransomware infections, and opportunistic social engineering.
          </p>
        </div>

        {/* 8-Item Checklist Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {QUICK_SAFETY_CHECKLIST.map((item: SafetyChecklistItem, index: number) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isExpanded
                    ? 'bg-slate-900 border-cyan-500/80 shadow-xl shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div className="p-5 sm:p-6">
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-950 border border-slate-800">
                      {getIcon(item.iconName)}
                    </div>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800/90 text-slate-400 border border-slate-700/60">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title & Short Explanation */}
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.shortExplanation}
                  </p>

                  {/* Expanded Detailed Action Drawer */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-1.5 font-semibold text-cyan-300 mb-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>How to implement:</span>
                      </div>
                      <p>{item.detailedAction}</p>
                      {item.topicAnchor && (
                        <a
                          href={`#${item.topicAnchor}`}
                          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold mt-3 text-xs"
                        >
                          <span>Deep dive into this topic</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Footer Toggle Button */}
                <div className="px-5 pb-5 pt-0">
                  <button
                    type="button"
                    onClick={() => toggleExpand(item.id)}
                    aria-expanded={isExpanded}
                    className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs font-medium text-slate-300 bg-slate-950/60 hover:bg-slate-800 hover:text-white border border-slate-800/80 transition-colors cyber-focus-ring"
                  >
                    <span>{isExpanded ? 'Hide details' : 'Learn more'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
