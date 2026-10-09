'use client';

import React from 'react';
import {
  BookOpen,
  Search,
  FlaskConical,
  Target,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';

interface JourneyStep {
  step: string;
  number: string;
  title: string;
  sentence: string;
  icon: React.ReactNode;
  accent: string;
  badgeBg: string;
  dotColor: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    step: '01',
    number: 'PHASE 01',
    title: 'LEARN',
    sentence: 'Study how threat actors weaponize trust, fear, and authority across common scam vectors.',
    icon: <BookOpen className="w-5 h-5" aria-hidden="true" />,
    accent: 'text-cyan-400',
    badgeBg: 'bg-cyan-950/60 border-cyan-800/80 text-cyan-300',
    dotColor: 'bg-cyan-400',
  },
  {
    step: '02',
    number: 'PHASE 02',
    title: 'IDENTIFY',
    sentence: 'Recognize deceptive domains, urgent phrasing, spoofed senders, and abnormal requests.',
    icon: <Search className="w-5 h-5" aria-hidden="true" />,
    accent: 'text-amber-400',
    badgeBg: 'bg-amber-950/60 border-amber-800/80 text-amber-300',
    dotColor: 'bg-amber-400',
  },
  {
    step: '03',
    number: 'PHASE 03',
    title: 'PRACTICE',
    sentence: 'Inspect simulated messages and examine authentic scam anatomy without real-world risk.',
    icon: <FlaskConical className="w-5 h-5" aria-hidden="true" />,
    accent: 'text-teal-400',
    badgeBg: 'bg-teal-950/60 border-teal-800/80 text-teal-300',
    dotColor: 'bg-teal-400',
  },
  {
    step: '04',
    number: 'PHASE 04',
    title: 'CHALLENGE',
    sentence: 'Test your threat-detection judgment against increasingly sophisticated interactive scenarios.',
    icon: <Target className="w-5 h-5" aria-hidden="true" />,
    accent: 'text-orange-400',
    badgeBg: 'bg-orange-950/60 border-orange-800/80 text-orange-300',
    dotColor: 'bg-orange-400',
  },
  {
    step: '05',
    number: 'PHASE 05',
    title: 'MASTER',
    sentence: 'Build dependable verification routines and swift emergency containment habits.',
    icon: <ShieldCheck className="w-5 h-5" aria-hidden="true" />,
    accent: 'text-emerald-400',
    badgeBg: 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300',
    dotColor: 'bg-emerald-400',
  },
];

export const ScamHubLearningJourney: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#07090e]" aria-labelledby="learning-flow-heading">
      <div className="cyber-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/60 text-slate-300 text-xs font-mono uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
            STRUCTURED METHODOLOGY
          </div>
          <h2 id="learning-flow-heading" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            How You Build Defensive Instincts
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            CyberAntigravity is an active learning platform designed to build automatic verification reflexes through deliberate practice.
          </p>
        </div>

        {/* 5-Step Visual Flow */}
        <div className="relative">
          {/* Desktop Flow Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
            {JOURNEY_STEPS.map((step, idx) => (
              <div
                key={step.title}
                className="relative flex flex-col justify-between rounded-xl border border-slate-800/90 bg-slate-950/70 p-5 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/80 group"
              >
                {/* Step Top Bar */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 ${step.badgeBg}`}
                  >
                    {step.icon}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                    {step.step}
                  </span>
                </div>

                {/* Step Content */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${step.dotColor}`} aria-hidden="true" />
                    <h3 className="text-base font-bold text-white tracking-wide font-mono">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {step.sentence}
                  </p>
                </div>

                {/* Indicator Connector arrow (on desktop between items, except the last) */}
                {idx < JOURNEY_STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-slate-900 border border-slate-700/80 items-center justify-center text-slate-400">
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                  </div>
                )}

                {/* Indicator Connector arrow for mobile/tablet */}
                {idx < JOURNEY_STEPS.length - 1 && (
                  <div className="flex lg:hidden justify-center pt-3 text-slate-600">
                    <ChevronDown className="w-4 h-4 text-cyan-500/70" aria-hidden="true" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
