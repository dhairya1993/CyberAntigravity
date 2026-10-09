'use client';

import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { DigitalDefenseMap } from '@/components/visuals/DigitalDefenseMap';
import { Button } from '@/components/ui/Button';

export const DigitalDefenseSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative border-t border-slate-800/80 bg-slate-950/60">
      <div className="cyber-container space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/80 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            Defensive Architecture & Mapping
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Build Your Digital Defense
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Every digital account, device, and connection forms a linked personal perimeter. Explore how layered habits safeguard what matters most.
          </p>
        </div>

        {/* Interactive Digital Defense Map Visual */}
        <DigitalDefenseMap />

        {/* Quick Link to Hub */}
        <div className="text-center pt-2">
          <Button
            asLink
            href="/cyber-safety"
            variant="outline"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Explore Complete Cyber Safety Framework
          </Button>
        </div>
      </div>
    </section>
  );
};
