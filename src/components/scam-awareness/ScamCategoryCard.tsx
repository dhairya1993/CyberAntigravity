'use client';

import React, { useState } from 'react';
import {
  Mail,
  Smartphone,
  PhoneCall,
  Briefcase,
  TrendingUp,
  Coins,
  ShoppingBag,
  HeartHandshake,
  Monitor,
  Landmark,
  Share2,
  ShieldAlert,
  UserX,
  Award,
  Sparkles,
  Package,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Target,
  ShieldCheck,
} from 'lucide-react';
import { ScamAwarenessCategory } from '@/types';

interface ScamCategoryCardProps {
  category: ScamAwarenessCategory;
}

export const ScamCategoryCard: React.FC<ScamCategoryCardProps> = ({ category }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Dynamic Icon resolver
  const renderIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5 text-amber-400' };
    switch (iconName) {
      case 'Mail':
        return <Mail {...props} />;
      case 'Smartphone':
        return <Smartphone {...props} />;
      case 'PhoneCall':
        return <PhoneCall {...props} />;
      case 'Briefcase':
        return <Briefcase {...props} />;
      case 'TrendingUp':
        return <TrendingUp {...props} />;
      case 'Coins':
        return <Coins {...props} />;
      case 'ShoppingBag':
        return <ShoppingBag {...props} />;
      case 'HeartHandshake':
        return <HeartHandshake {...props} />;
      case 'Monitor':
        return <Monitor {...props} />;
      case 'Landmark':
        return <Landmark {...props} />;
      case 'Share2':
        return <Share2 {...props} />;
      case 'ShieldAlert':
        return <ShieldAlert {...props} />;
      case 'UserX':
        return <UserX {...props} />;
      case 'Award':
        return <Award {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Package':
        return <Package {...props} />;
      default:
        return <AlertTriangle {...props} />;
    }
  };

  const getRiskBadge = (level: ScamAwarenessCategory['riskLevel']) => {
    switch (level) {
      case 'Critical':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-rose-800/80 bg-rose-950/60 text-rose-300 font-semibold uppercase">
            Critical Risk
          </span>
        );
      case 'High':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-amber-800/80 bg-amber-950/60 text-amber-300 font-semibold uppercase">
            High Prevalence
          </span>
        );
      case 'Moderate':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-blue-800/80 bg-blue-950/60 text-blue-300 font-semibold uppercase">
            Moderate
          </span>
        );
    }
  };

  return (
    <article
      id={category.id}
      className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
        isExpanded
          ? 'border-amber-500/60 bg-slate-900 shadow-xl shadow-amber-950/20'
          : 'border-slate-800/90 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/90'
      }`}
    >
      <div className="p-6">
        {/* Top Header: Icon & Badges */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner">
            {renderIcon(category.iconName)}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded border border-slate-800 bg-slate-950">
              {category.categoryGroup}
            </span>
            {getRiskBadge(category.riskLevel)}
          </div>
        </div>

        {/* Scam Name */}
        <h3 className="text-lg font-bold text-white tracking-tight hover:text-cyan-300 transition-colors">
          {category.name}
        </h3>

        {/* One-Line Explanation */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
          {category.oneLiner}
        </p>

        {/* Target & Main Warning Signal */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2.5 text-xs">
          <div className="flex items-start gap-2">
            <Target className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
            <div className="leading-tight">
              <span className="text-slate-400 font-medium">Common Target: </span>
              <span className="text-slate-300">{category.commonTarget}</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
            <div className="leading-tight">
              <span className="text-amber-400 font-medium">Main Warning: </span>
              <span className="text-amber-200/90">{category.mainWarning}</span>
            </div>
          </div>
        </div>

        {/* Expanded Educational Drawer */}
        {isExpanded && (
          <div className="mt-5 pt-5 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-200 text-xs">
            {/* Attacker Tactics */}
            <div>
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Attacker Tactics
              </h4>
              <ul className="space-y-1.5 text-slate-300">
                {category.attackerTactics.map((tactic, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-rose-400 font-mono text-[10px] mt-0.5">&bull;</span>
                    <span>{tactic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Red Flags */}
            <div>
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Warning Signals & Red Flags
              </h4>
              <ul className="space-y-1.5 text-slate-300">
                {category.redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-amber-400 font-mono text-[10px] mt-0.5">&bull;</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verification Steps */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <h4 className="font-semibold text-cyan-300 text-[11px] mb-2 flex items-center gap-1.5 font-mono uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> How to Independently Verify
              </h4>
              <ul className="space-y-1.5 text-slate-300">
                {category.verificationSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-cyan-400 font-mono text-[10px] mt-0.5">&check;</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Immediate Defensive Action */}
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-900/50">
              <h4 className="font-semibold text-emerald-300 text-[11px] mb-2 flex items-center gap-1.5 font-mono uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Immediate Defensive Action
              </h4>
              <ul className="space-y-1.5 text-slate-300">
                {category.whatToDo.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-emerald-400 font-mono text-[10px] mt-0.5">&rsaquo;</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="px-6 py-3.5 border-t border-slate-800/80 bg-slate-950/40 rounded-b-2xl flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full inline-flex items-center justify-center gap-2 py-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? 'Collapse Details' : 'Learn More & Defense Tactics'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
    </article>
  );
};
