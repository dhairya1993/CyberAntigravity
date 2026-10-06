import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { AttackDefensePath } from '@/components/visuals/AttackDefensePath';

export const AttackPathSection: React.FC = () => {
  return (
    <section id="attack-simulator" className="py-20 md:py-28 relative border-t border-slate-800/80 bg-slate-950/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase">
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            <span>Educational Attack Simulation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            See How a Cyber Attack <span className="text-cyan-400">Unfolds</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Follow a simulated attack path and discover where a safer decision can stop the chain.
          </p>
        </div>

        {/* The Interactive Attack -> Defense Simulator */}
        <AttackDefensePath />
      </div>
    </section>
  );
};
