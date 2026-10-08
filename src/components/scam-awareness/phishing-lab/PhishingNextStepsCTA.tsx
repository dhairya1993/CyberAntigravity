'use client';

import React from 'react';
import { ArrowRight, Compass, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const PhishingNextStepsCTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#07090e] via-[#090e1c] to-[#06080e] relative overflow-hidden">
      {/* Decorative Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-800/80 bg-cyan-950/40 text-cyan-300 text-xs font-mono uppercase tracking-wider">
          <Award className="w-3.5 h-3.5 text-cyan-400" aria-hidden={true} />
          DEFENSIVE MASTERY UNLOCKED
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            You&apos;ve Learned the Pattern.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Ready to test yourself against more deceptive scenarios? Put your detection skills to the test with randomized simulations or dive into other threat categories.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button
            asLink
            href="/scam-awareness/challenge"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-5 h-5 text-slate-950" aria-hidden={true} />}
            iconPosition="right"
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-bold shadow-lg shadow-cyan-950/50 cyber-focus-ring"
          >
            Start Scam Challenge &rarr;
          </Button>

          <Button
            asLink
            href="/scam-awareness/types"
            variant="outline"
            size="lg"
            icon={<Compass className="w-5 h-5 text-cyan-400" aria-hidden={true} />}
            iconPosition="left"
            className="w-full sm:w-auto text-slate-200 border-slate-700 hover:border-cyan-400 hover:bg-slate-900/60 cyber-focus-ring"
          >
            Explore Other Scam Types &rarr;
          </Button>
        </div>
      </div>
    </section>
  );
};
