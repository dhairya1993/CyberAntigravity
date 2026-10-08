'use client';

import React from 'react';
import Link from 'next/link';
import {
  Search,
  Layers,
  Brain,
  FlaskConical,
  Target,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

interface LearningCardItem {
  id: string;
  label: 'LEARN' | 'PRACTICE' | 'CHALLENGE' | 'GUIDE';
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  route: string;
  cardStyle: {
    border: string;
    hoverBorder: string;
    hoverGlow: string;
    iconBg: string;
    iconColor: string;
    badgeStyle: string;
    btnHover: string;
  };
}

const LEARNING_CARDS: LearningCardItem[] = [
  {
    id: 'red-flags',
    label: 'LEARN',
    icon: <Search className="w-6 h-6" aria-hidden="true" />,
    title: 'Spot the Red Flags',
    description:
      'Learn how to identify suspicious messages, links, requests, and social-engineering signals.',
    buttonText: 'Inspect Scams →',
    route: '/scam-awareness/red-flags',
    cardStyle: {
      border: 'border-amber-900/40',
      hoverBorder: 'group-hover:border-amber-500/60',
      hoverGlow: 'group-hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]',
      iconBg: 'bg-amber-950/60 border-amber-800/60',
      iconColor: 'text-amber-400',
      badgeStyle: 'border-amber-800/60 bg-amber-950/50 text-amber-300',
      btnHover: 'group-hover:text-amber-300',
    },
  },
  {
    id: 'types',
    label: 'LEARN',
    icon: <Layers className="w-6 h-6" aria-hidden="true" />,
    title: 'Explore Scam Types',
    description:
      'Understand phishing, banking scams, job scams, investment scams, delivery scams, and more.',
    buttonText: 'Explore Types →',
    route: '/scam-awareness/types',
    cardStyle: {
      border: 'border-cyan-900/40',
      hoverBorder: 'group-hover:border-cyan-500/60',
      hoverGlow: 'group-hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]',
      iconBg: 'bg-cyan-950/60 border-cyan-800/60',
      iconColor: 'text-cyan-400',
      badgeStyle: 'border-cyan-800/60 bg-cyan-950/50 text-cyan-300',
      btnHover: 'group-hover:text-cyan-300',
    },
  },
  {
    id: 'how-scams-work',
    label: 'LEARN',
    icon: <Brain className="w-6 h-6" aria-hidden="true" />,
    title: 'How Scams Work',
    description:
      'Understand the psychology behind urgency, fear, authority, greed, curiosity, and trust.',
    buttonText: 'Learn the Psychology →',
    route: '/scam-awareness/how-scams-work',
    cardStyle: {
      border: 'border-purple-900/40',
      hoverBorder: 'group-hover:border-purple-500/60',
      hoverGlow: 'group-hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]',
      iconBg: 'bg-purple-950/60 border-purple-800/60',
      iconColor: 'text-purple-400',
      badgeStyle: 'border-purple-800/60 bg-purple-950/50 text-purple-300',
      btnHover: 'group-hover:text-purple-300',
    },
  },
  {
    id: 'simulator',
    label: 'PRACTICE',
    icon: <FlaskConical className="w-6 h-6" aria-hidden="true" />,
    title: 'Scam Simulator',
    description:
      'Practice making safe decisions through realistic but fictional scam scenarios.',
    buttonText: 'Enter Simulator →',
    route: '/scam-awareness/simulator',
    cardStyle: {
      border: 'border-teal-900/40',
      hoverBorder: 'group-hover:border-teal-500/60',
      hoverGlow: 'group-hover:shadow-[0_0_25px_rgba(20,184,166,0.15)]',
      iconBg: 'bg-teal-950/60 border-teal-800/60',
      iconColor: 'text-teal-400',
      badgeStyle: 'border-teal-800/60 bg-teal-950/50 text-teal-300',
      btnHover: 'group-hover:text-teal-300',
    },
  },
  {
    id: 'challenge',
    label: 'CHALLENGE',
    icon: <Target className="w-6 h-6" aria-hidden="true" />,
    title: 'Scam Challenge',
    description:
      'Test your scam-detection skills through progressively harder scenarios.',
    buttonText: 'Start Challenge →',
    route: '/scam-awareness/challenge',
    cardStyle: {
      border: 'border-orange-900/40',
      hoverBorder: 'group-hover:border-orange-500/60',
      hoverGlow: 'group-hover:shadow-[0_0_25px_rgba(249,115,22,0.15)]',
      iconBg: 'bg-orange-950/60 border-orange-800/60',
      iconColor: 'text-orange-400',
      badgeStyle: 'border-orange-800/60 bg-orange-950/50 text-orange-300',
      btnHover: 'group-hover:text-orange-300',
    },
  },
  {
    id: 'response',
    label: 'GUIDE',
    icon: <ShieldCheck className="w-6 h-6" aria-hidden="true" />,
    title: 'What To Do If Scammed',
    description:
      'Follow a practical response guide if you suspect that you have been targeted.',
    buttonText: 'View Response Guide →',
    route: '/scam-awareness/response',
    cardStyle: {
      border: 'border-emerald-900/40',
      hoverBorder: 'group-hover:border-emerald-500/60',
      hoverGlow: 'group-hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]',
      iconBg: 'bg-emerald-950/60 border-emerald-800/60',
      iconColor: 'text-emerald-400',
      badgeStyle: 'border-emerald-800/60 bg-emerald-950/50 text-emerald-300',
      btnHover: 'group-hover:text-emerald-300',
    },
  },
];

export const ScamHubLearningPath: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#07090e]" aria-labelledby="learning-path-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/60 text-slate-300 text-xs font-mono uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
            CURATED MODULES
          </div>
          <h2 id="learning-path-heading" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Choose Your Learning Path
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Learn the warning signs, understand the psychology, then test your judgment.
          </p>
        </div>

        {/* 6 Interactive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {LEARNING_CARDS.map((card) => (
            <Link
              key={card.id}
              href={card.route}
              className={`group relative flex flex-col justify-between rounded-2xl border bg-slate-950/80 p-6 sm:p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:bg-slate-900/90 ${card.cardStyle.border} ${card.cardStyle.hoverBorder} ${card.cardStyle.hoverGlow} cyber-focus-ring`}
            >
              {/* Card Header: Icon & Category Label */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${card.cardStyle.iconBg} ${card.cardStyle.iconColor}`}
                  >
                    {card.icon}
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-md border uppercase ${card.cardStyle.badgeStyle}`}
                  >
                    {card.label}
                  </span>
                </div>

                {/* Card Title & Description */}
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2.5 group-hover:text-white">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>

              {/* Card Action Link / Button Footer */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <span
                  className={`text-sm font-semibold text-slate-300 transition-colors flex items-center gap-1.5 ${card.cardStyle.btnHover}`}
                >
                  {card.buttonText}
                </span>
                <span
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-slate-800 group-hover:border-slate-700 transition-all shrink-0"
                  aria-hidden="true"
                >
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
