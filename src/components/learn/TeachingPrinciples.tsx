'use client';

import React from 'react';
import { TEACHING_PRINCIPLES } from '@/data/learningHubData';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export const TeachingPrinciples: React.FC = () => {
  return (
    <section className="py-16 md:py-24 border-b border-slate-800/80 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Methodology"
          badgeVariant="cyan"
          title="How CyberAntigravity Teaches"
          description="Cybersecurity is not about memorizing commands or running obscure tools—it is an evolving defensive mindset built on continuous learning, structured understanding, and ethical practice."
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 mt-12">
          {TEACHING_PRINCIPLES.map((principle, index) => (
            <div
              key={principle.title}
              className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-5 lg:p-6 backdrop-blur-sm flex flex-col justify-between hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 group"
            >
              {/* Connector line for large screens */}
              {index < TEACHING_PRINCIPLES.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-700">
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black font-mono text-cyan-500/40 group-hover:text-cyan-400 transition-colors">
                    {principle.step}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-cyan-400/50 group-hover:bg-cyan-400 group-hover:scale-125 transition-all" />
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight mb-1 group-hover:text-cyan-300 transition-colors">
                  {principle.title}
                </h3>
                <p className="text-xs font-medium text-cyan-400/80 mb-2.5 font-mono">
                  {principle.subtitle}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Responsible Practice Summary */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-3 text-xs text-slate-400 max-w-3xl mx-auto text-center justify-center">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Cybersecurity requires lifelong curiosity and constant refinement. Every skill learned here is dedicated to defending users and safeguarding digital infrastructure.
          </span>
        </div>
      </div>
    </section>
  );
};
