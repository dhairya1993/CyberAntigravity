'use client';

import React from 'react';
import { Flame } from 'lucide-react';
import { DailyCyberChallenge } from '@/components/challenge/DailyCyberChallenge';

export const DailyChallengeSection: React.FC = () => {
  return (
    <section
      id="daily-challenge"
      className="py-16 md:py-24 relative border-t border-slate-800/80 bg-slate-950/60 scroll-mt-20 overflow-hidden"
      aria-labelledby="daily-challenge-title"
    >
      {/* Background ambient subtle accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-950/20 blur-[140px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
              <span>DAILY DEFENSIVE PRACTICE</span>
            </div>

            <h2
              id="daily-challenge-title"
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            >
              Build Your Daily <span className="text-cyan-400">Security Reflexes.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              One real-world scenario every day. Test your decision-making, understand the attacker&apos;s psychological motive, and build durable digital defense habits.
            </p>
          </div>

          {/* Interactive Challenge Card */}
          <DailyCyberChallenge />
        </div>
      </div>
    </section>
  );
};
