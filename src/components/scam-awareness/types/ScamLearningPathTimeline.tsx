'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface TimelineStep {
  step: string;
  title: string;
  subtitle: string;
  accent: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    step: '01',
    title: 'Recognize',
    subtitle: 'Spot deceptive formatting, urgent demands, and abnormal sender addresses.',
    accent: 'text-cyan-400 border-cyan-500/50 bg-cyan-950/40',
  },
  {
    step: '02',
    title: 'Understand',
    subtitle: 'Learn the underlying manipulation psychology and threat actor objectives.',
    accent: 'text-blue-400 border-blue-500/50 bg-blue-950/40',
  },
  {
    step: '03',
    title: 'Analyze',
    subtitle: 'Dissect simulated message structures, spoofed domains, and fake links.',
    accent: 'text-amber-400 border-amber-500/50 bg-amber-950/40',
  },
  {
    step: '04',
    title: 'Practice',
    subtitle: 'Test your scam-detection reflexes against realistic browser-based sandboxes.',
    accent: 'text-purple-400 border-purple-500/50 bg-purple-950/40',
  },
  {
    step: '05',
    title: 'Verify',
    subtitle: 'Master independent out-of-band verification routines before taking any action.',
    accent: 'text-emerald-400 border-emerald-500/50 bg-emerald-950/40',
  },
];

export const ScamLearningPathTimeline: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#07090e]" aria-labelledby="timeline-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-800/80 bg-cyan-950/40 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" aria-hidden={true} />
            STRUCTURED CURRICULUM
          </div>
          <h2 id="timeline-heading" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Recommended Learning Path
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Move step-by-step from foundational threat recognition to instinctive verification reflexes.
          </p>
        </div>

        {/* Connected Timeline Cards (Desktop horizontal / Tablet & Mobile responsive) */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
            {TIMELINE_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="relative flex flex-col justify-between rounded-xl border border-slate-800/90 bg-slate-950/80 p-5 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/90 group"
              >
                {/* Step Marker */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${step.accent}`}
                  >
                    {step.step}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" aria-hidden={true} />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white tracking-wide">
                    {`${step.step} — ${step.title}`}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {step.subtitle}
                  </p>
                </div>

                {/* Connecting Arrow for Desktop */}
                {idx < TIMELINE_STEPS.length - 1 && (
                  <div
                    className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-slate-900 border border-slate-700 items-center justify-center text-slate-400"
                    aria-hidden={true}
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA: Start With Phishing */}
        <div className="flex justify-center pt-2">
          <Button
            asLink
            href="/scam-awareness/types/phishing"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-5 h-5 text-slate-950" aria-hidden={true} />}
            iconPosition="right"
            className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-bold shadow-lg shadow-cyan-950/40 cyber-focus-ring"
          >
            Start With Phishing &rarr;
          </Button>
        </div>
      </div>
    </section>
  );
};
