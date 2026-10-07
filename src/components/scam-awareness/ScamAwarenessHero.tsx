'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Layers,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ScamAnalysisHeroIllustration } from './ScamAnalysisHeroIllustration';

export const ScamAwarenessHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-[#070b14] to-[#05080e]">
      {/* Background cyber grid & glow effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a15_1px,transparent_1px),linear-gradient(to_bottom,#0f172a15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-br from-amber-500/10 via-cyan-500/10 to-transparent blur-3xl pointer-events-none opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-cyan-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 font-medium">Scam Awareness Hub</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Hero Copy (Left Column) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-800/80 bg-amber-950/50 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-semibold text-amber-300 tracking-wider uppercase font-mono">
                INTERACTIVE SCAM AWARENESS
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Spot the Scam <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-cyan-400">
                Before It Tricks You.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Learn how scammers use urgency, authority, fear and social engineering to influence everyday decisions.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button
                asLink
                href="#scam-detection-lab"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5 text-slate-950" />}
                iconPosition="right"
                className="bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400 hover:from-amber-300 hover:to-cyan-300 text-slate-950 font-bold shadow-lg shadow-amber-950/40 cyber-focus-ring"
              >
                Start Scam Challenge &rarr;
              </Button>
              <Button
                asLink
                href="#scam-types"
                variant="secondary"
                size="lg"
                icon={<Layers className="w-4 h-4 text-slate-300" />}
                iconPosition="left"
                className="border-slate-700 bg-slate-900/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600 cyber-focus-ring"
              >
                Explore Scam Types
              </Button>
            </div>

            {/* Trust and Defensive Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No Personal Data Required</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Runs in Your Browser</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Simulated Scenarios Only</span>
              </div>
            </div>
          </div>

          {/* Hero Interactive Graphical Scam-Analysis Illustration (Right Column) */}
          <div className="lg:col-span-5">
            <ScamAnalysisHeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
};
