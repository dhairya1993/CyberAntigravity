import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { CyberAntigravityLogo } from '@/components/ui/CyberAntigravityLogo';

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden border-t border-slate-800/80 bg-gradient-to-b from-slate-950/40 via-slate-950 to-[#07090e]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-600/15 via-blue-600/10 to-purple-600/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center space-y-8 relative">
        {/* Subtle Shield Symbol & Tagline */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-3 rounded-2xl bg-cyan-950/50 border border-cyan-500/30 shadow-lg shadow-cyan-950/30">
            <CyberAntigravityLogo variant="symbol" size="md" />
          </div>
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-400">
            RISE ABOVE CYBER THREATS.
          </span>
        </div>

        {/* Main Heading & Supporting Text */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Ready to Rise Above <span className="text-cyan-400">Cyber Threats?</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Start building better cybersecurity habits today.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/learn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base shadow-xl shadow-cyan-500/25 transition-all duration-200 hover:scale-[1.02]"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/cyber-safety"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-base transition-all duration-200 hover:border-cyan-500/50"
          >
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span>Explore Cyber Safety</span>
          </Link>
        </div>

        {/* Quick Micro Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            100% Free & Open Access
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Zero Account Required
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Interactive Defensive Simulations
          </span>
        </div>
      </div>
    </section>
  );
};
