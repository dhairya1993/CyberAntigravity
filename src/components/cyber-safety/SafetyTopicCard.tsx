'use client';

import React, { useState } from 'react';
import {
  KeyRound,
  MailWarning,
  ShieldCheck,
  Smartphone,
  Laptop,
  UserCheck,
  ShoppingCart,
  CreditCard,
  EyeOff,
  Wifi,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SafetyTopicDetail } from '@/types';

interface SafetyTopicCardProps {
  topic: SafetyTopicDetail;
  initiallyExpanded?: boolean;
}

export const SafetyTopicCard: React.FC<SafetyTopicCardProps> = ({
  topic,
  initiallyExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  const renderIcon = (name: string) => {
    const props = { className: 'w-6 h-6 text-cyan-400' };
    switch (name) {
      case 'KeyRound':
        return <KeyRound {...props} />;
      case 'MailWarning':
        return <MailWarning {...props} />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      case 'Smartphone':
        return <Smartphone {...props} />;
      case 'Laptop':
        return <Laptop {...props} />;
      case 'UserCheck':
        return <UserCheck {...props} />;
      case 'ShoppingCart':
        return <ShoppingCart {...props} />;
      case 'CreditCard':
        return <CreditCard {...props} />;
      case 'EyeOff':
        return <EyeOff {...props} />;
      case 'Wifi':
        return <Wifi {...props} />;
      default:
        return <ShieldCheck {...props} />;
    }
  };

  return (
    <article
      id={topic.id}
      className={`rounded-2xl border transition-all duration-300 scroll-mt-24 ${
        isExpanded
          ? 'bg-slate-900/90 border-cyan-500/60 shadow-xl shadow-cyan-500/10'
          : 'bg-slate-900/50 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/80'
      }`}
    >
      <div className="p-6 sm:p-7">
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 shadow-sm">
              {renderIcon(topic.iconName)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-cyan-950 text-cyan-300 text-xs font-mono font-bold border border-cyan-800/80">
                  {topic.letter}
                </span>
                <span className="text-xs text-slate-400 font-medium">{topic.category}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1 leading-snug">
                {topic.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              <Clock className="w-3 h-3 text-cyan-400" />
              {topic.readTime}
            </span>
          </div>
        </div>

        {/* High-level Summary */}
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          {topic.summary}
        </p>

        {/* Toggle Details CTA */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 py-1.5 px-3 rounded-lg bg-cyan-950/40 hover:bg-cyan-950/80 border border-cyan-800/60 transition-colors cyber-focus-ring"
          >
            <span>{isExpanded ? 'Collapse Detailed Breakdown' : 'Read Educational Breakdown & Actions'}</span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Expanded Educational Details */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-6">
            {/* Core Concepts */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Key Concepts & Threat Mechanics:</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topic.coreConcepts.map((concept, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <h5 className="text-sm font-semibold text-white">
                        {concept.title}
                      </h5>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {concept.description}
                      </p>
                    </div>
                    {concept.keyTip && (
                      <div className="pt-2 border-t border-slate-800/60 text-[11px] text-cyan-300 font-medium">
                        💡 <span className="text-slate-300 font-normal">{concept.keyTip}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Defensive Actions */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-emerald-950/80 space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Immediate Defensive Actions:</span>
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                {topic.practicalActions.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span className="leading-relaxed">{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Misconception Callout */}
            {topic.commonMisconceptions && topic.commonMisconceptions.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-900/40 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold uppercase tracking-wider text-[11px]">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Common Misconception Debunked:</span>
                </div>
                {topic.commonMisconceptions.map((misc, idx) => (
                  <p key={idx} className="text-slate-300 leading-relaxed">
                    {misc}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
