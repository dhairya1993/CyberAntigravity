'use client';

import React from 'react';
import { ArrowRight, Search, Target } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ScamTypesCTA: React.FC = () => {
  return (
    <section
      className="py-16 sm:py-24 bg-gradient-to-b from-[#07090e] via-[#090e1b] to-[#07090e] border-t border-slate-800/80 relative overflow-hidden"
      aria-labelledby="types-cta-heading"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-gradient-to-r from-cyan-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none"
        aria-hidden={true}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-800/80 bg-cyan-950/40 text-cyan-300 text-xs font-mono uppercase tracking-wider">
          <Target className="w-3.5 h-3.5 text-cyan-400" aria-hidden={true} />
          PRACTICE & VALIDATION
        </div>

        <h2
          id="types-cta-heading"
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Think You Can Spot a Scam?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Put your knowledge to the test with simulated scam scenarios designed for safe cybersecurity learning.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <Button
            asLink
            href="/scam-awareness/challenge"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-5 h-5 text-slate-950" aria-hidden={true} />}
            iconPosition="right"
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-bold shadow-lg shadow-cyan-950/40 cyber-focus-ring"
          >
            Start Scam Challenge &rarr;
          </Button>
          <Button
            asLink
            href="/scam-awareness/red-flags"
            variant="secondary"
            size="lg"
            icon={<Search className="w-4 h-4 text-slate-300" aria-hidden={true} />}
            iconPosition="left"
            className="w-full sm:w-auto border-slate-700 bg-slate-900/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600 cyber-focus-ring"
          >
            Analyze Red Flags &rarr;
          </Button>
        </div>
      </div>
    </section>
  );
};
