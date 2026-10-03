'use client';

import React, { useState } from 'react';
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
  CheckCircle2
} from 'lucide-react';
import { SCAM_CATEGORIES } from '@/data/scamCategories';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';

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

        {/* Anatomy of a Phishing/Scam Message Interactive Breakdown */}
        <div className="mb-16 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2">
              <Badge variant="rose" dot size="sm">Deconstruction</Badge>
              <h3 className="text-lg font-bold text-white">Anatomy of a Suspicious Delivery Scam</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Simulated Threat Vector</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Message Display */}
            <div className="lg:col-span-6 p-5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-400">
                <span>Sender: +1 (832) 592-0194</span>
                <span className="text-rose-400 font-semibold">SMS Alert</span>
              </div>
              <p className="leading-relaxed">
                <span className="bg-rose-950/60 text-rose-300 px-1 py-0.5 rounded border border-rose-800/80">
                  [USPS Urgent Alert]
                </span>{' '}
                Your package #9400-1118-9844 could not be delivered due to an incomplete house number.
              </p>
              <p className="leading-relaxed">
                Please update your address immediately within 12 hours or package will be returned to sender:{' '}
                <span className="text-cyan-400 underline break-all bg-cyan-950/50 px-1 py-0.5 rounded border border-cyan-800/50">
                  https://usps.package-redelivery-update89.com/confirm
                </span>
              </p>
              <div className="pt-2 text-[10px] text-slate-500">
                Note: Fee of $0.35 required for redelivery dispatch.
              </div>
            </div>

            {/* Red Flag Callouts */}
            <div className="lg:col-span-6 space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-rose-950 text-rose-400 border border-rose-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Artificial Urgency Pressure</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Claims the parcel will be discarded or returned in &ldquo;12 hours&rdquo; to force panic and bypass logical scrutiny.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Deceptive Subdomain / Cloned Domain</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    The actual domain is <code className="text-cyan-300">package-redelivery-update89.com</code>, NOT the canonical <code className="text-emerald-300">usps.com</code>.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Credit Card Harvesting Micro-Payment</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    The &ldquo;$0.35 fee&rdquo; is a pretext to harvest full credit card details, CVV numbers, and phone verification codes.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
      </div>
    </section>
  );
};
