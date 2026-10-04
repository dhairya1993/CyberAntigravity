import React from 'react';
import { HelpCircle } from 'lucide-react';
import { CYBER_MYTHS } from '@/data/cyberSafetyHubData';
import { CyberMythCard } from './CyberMythCard';

export const CyberMythsSection: React.FC = () => {
  return (
    <section id="myths" className="py-16 md:py-24 relative scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Fact vs. Fiction</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Cyber Safety Myths
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            False senses of security are as hazardous as technical exploits. We dismantle four widespread misconceptions about digital defense.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CYBER_MYTHS.map((item) => (
            <CyberMythCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
