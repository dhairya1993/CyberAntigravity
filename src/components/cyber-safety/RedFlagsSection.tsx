import React from 'react';
import { ArrowRight, ShieldAlert } from 'lucide-react';
import { SCAM_RED_FLAGS } from '@/data/cyberSafetyHubData';
import { RedFlagCard } from './RedFlagCard';

export const RedFlagsSection: React.FC = () => {
  return (
    <section id="red-flags" className="py-16 md:py-24 relative scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/80 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Deception Recognition</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              10 Red Flags of a Potential Online Scam
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Scammers rarely invent new technology—they manipulate human psychology. Learn to recognize these 10 ubiquitous indicators of online deception before engaging.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="#emergency-steps"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-300 hover:text-white hover:bg-rose-900 text-xs font-semibold transition-colors"
            >
              <span>Being targeted right now? View Emergency Steps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 10 Red Flags Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SCAM_RED_FLAGS.map((flag) => (
            <RedFlagCard key={flag.number} flag={flag} />
          ))}
        </div>
      </div>
    </section>
  );
};
