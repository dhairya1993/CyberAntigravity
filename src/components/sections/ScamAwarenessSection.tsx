'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Globe,
  MessageSquareWarning,
  Briefcase,
  TrendingUp,
  Share2,
  CreditCard,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { SCAM_CATEGORIES } from '@/data/scamCategories';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { ScamAnatomyDiagram } from '@/components/visuals/ScamAnatomyDiagram';

export const ScamAwarenessSection: React.FC = () => {
  const [selectedScamId, setSelectedScamId] = useState(SCAM_CATEGORIES[0].id);

  const iconMap: Record<string, React.ReactNode> = {
    ShoppingBag: <ShoppingBag className="w-5 h-5 text-amber-400" />,
    Globe: <Globe className="w-5 h-5 text-rose-400" />,
    MessageSquareWarning: <MessageSquareWarning className="w-5 h-5 text-rose-400" />,
    Briefcase: <Briefcase className="w-5 h-5 text-amber-400" />,
    TrendingUp: <TrendingUp className="w-5 h-5 text-rose-400" />,
    Share2: <Share2 className="w-5 h-5 text-amber-400" />,
    CreditCard: <CreditCard className="w-5 h-5 text-rose-400" />,
  };

  const activeScam = SCAM_CATEGORIES.find((s) => s.id === selectedScamId) || SCAM_CATEGORIES[0];

  return (
    <section id="scam-awareness" className="py-20 md:py-28 relative scroll-mt-20 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Fraud Prevention Intelligence"
          badgeVariant="amber"
          title="Recognize and Dismantle Online Scams"
          description="Modern cyber criminals exploit behavioral psychology and artificial urgency rather than technical flaws. Master the hallmarks, deceptive tactics, and red flags of today's most prevalent scams."
        />

        {/* Visual Scam Anatomy & Archetype Explorer */}
        <div className="mb-16">
          <ScamAnatomyDiagram />
        </div>

        {/* 7 Scam Categories Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {SCAM_CATEGORIES.map((scam) => {
            const isSelected = scam.id === selectedScamId;
            return (
              <button
                key={scam.id}
                type="button"
                onClick={() => setSelectedScamId(scam.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 cyber-focus-ring ${
                  isSelected
                    ? 'bg-slate-900 border-amber-400 shadow-md shadow-amber-400/10'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    {iconMap[scam.iconName]}
                  </div>
                  <Badge
                    variant={scam.riskLevel === 'Critical' ? 'rose' : 'amber'}
                    size="sm"
                  >
                    {scam.riskLevel}
                  </Badge>
                </div>
                <h4 className="text-sm font-bold text-white line-clamp-1">{scam.title}</h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{scam.summary}</p>
              </button>
            );
          })}
        </div>

        {/* Active Scam Deep-Dive View */}
        <div className="rounded-2xl border border-amber-500/30 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge
                  variant={activeScam.riskLevel === 'Critical' ? 'rose' : 'amber'}
                  dot
                  size="sm"
                >
                  {activeScam.riskLevel} Risk Classification
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {activeScam.title}
              </h3>
              <p className="text-sm text-slate-300 mt-1">{activeScam.summary}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {/* Common Tactics */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Common Exploitation Tactics:
              </h4>
              <ul className="space-y-2.5">
                {activeScam.commonTactics.map((tactic, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2.5 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span>{tactic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Red Flags & Prevention */}
            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> Critical Red Flags:
                </h4>
                <ul className="space-y-2">
                  {activeScam.redFlags.map((flag, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-rose-400 font-bold">&times;</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Protective Action Recommendation */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/50">
                <h4 className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Protective Action Rule:
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeScam.protectionTip}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hub Callout Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-amber-900/50 bg-gradient-to-r from-amber-950/40 via-slate-900/80 to-slate-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-amber-700 bg-amber-950/60 text-amber-300 font-semibold uppercase">
                Content Pillar 2
              </span>
              <span className="text-xs text-slate-400">Interactive Learning Hub</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Test Your Scam IQ in the Dedicated Hub
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore 16 in-depth scam breakdowns, practice on our interactive Red Flag SMS Simulator, test your judgment with the Scam IQ Quiz, and download the 8-point checklist.
            </p>
          </div>
          <Link
            href="/scam-awareness"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-950/40 shrink-0"
          >
            <span>Launch Scam Awareness Hub</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
