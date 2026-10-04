'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  TrendingUp,
  PhoneCall,
  ShieldAlert,
  Package,
  HeartHandshake,
  BookOpen,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { SCAM_STORIES_DATA } from '@/data/scamAwarenessData';
import { ScamCaseStudy } from '@/types';

interface CaseStudyCardProps {
  story: ScamCaseStudy;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ story }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderIcon = (name: string) => {
    const props = { className: 'w-5 h-5 text-amber-400' };
    switch (name) {
      case 'Briefcase':
        return <Briefcase {...props} />;
      case 'TrendingUp':
        return <TrendingUp {...props} />;
      case 'PhoneCall':
        return <PhoneCall {...props} />;
      case 'ShieldAlert':
        return <ShieldAlert {...props} />;
      case 'Package':
        return <Package {...props} />;
      case 'HeartHandshake':
        return <HeartHandshake {...props} />;
      default:
        return <BookOpen {...props} />;
    }
  };

  return (
    <article className="rounded-2xl border border-slate-800/90 bg-slate-900/60 p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 transition-colors">
      <div>
        {/* Header: Category Badge & Educational Label */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
            {renderIcon(story.iconName)}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-slate-800 bg-slate-950 text-slate-400">
              {story.category}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-amber-800/80 bg-amber-950/60 text-amber-300 font-semibold uppercase">
              Educational Scenario
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
          {story.title}
        </h3>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
          {story.summary}
        </p>

        {/* Expanded Educational Analysis */}
        {isExpanded && (
          <div className="mt-5 pt-5 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-200 text-xs">
            {/* 1. The Hook */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
              <strong className="text-amber-400 uppercase tracking-wider text-[10px] font-mono block">
                The Initial Hook:
              </strong>
              <p className="text-slate-300 leading-relaxed">{story.hook}</p>
            </div>

            {/* 2. Attacker Tactic */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
              <strong className="text-rose-400 uppercase tracking-wider text-[10px] font-mono block">
                The Attacker Tactic:
              </strong>
              <p className="text-slate-300 leading-relaxed">{story.tactic}</p>
            </div>

            {/* 3. The Turning Point */}
            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/50 space-y-1">
              <strong className="text-cyan-300 uppercase tracking-wider text-[10px] font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> The Defensive Turning Point:
              </strong>
              <p className="text-slate-200 leading-relaxed">{story.turningPoint}</p>
            </div>

            {/* 4. Lesson Learned */}
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-1">
              <strong className="text-emerald-300 uppercase tracking-wider text-[10px] font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Key Educational Takeaway:
              </strong>
              <p className="text-emerald-100/90 leading-relaxed">{story.lessonLearned}</p>
            </div>
          </div>
        )}
      </div>

      {/* Card Action */}
      <div className="mt-5 pt-4 border-t border-slate-800/80">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full inline-flex items-center justify-center gap-2 py-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? 'Hide Case Analysis' : 'Read Full Educational Breakdown'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
    </article>
  );
};

export const ScamStoriesSection: React.FC = () => {
  return (
    <section id="scam-stories" className="py-16 sm:py-20 relative bg-[#07090e] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-xs font-mono text-cyan-400 font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Case Study Templates</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Deconstructed Scam Scenarios
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Real-world social engineering relies on consistent scripts. Inspect these educational scenario breakdowns to examine the hook, escalation tactic, and exact moment defensive skepticism saves the day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCAM_STORIES_DATA.map((story) => (
            <CaseStudyCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
};
