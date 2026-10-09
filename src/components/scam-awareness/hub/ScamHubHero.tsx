'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ScamAnalysisHeroIllustration } from '../ScamAnalysisHeroIllustration';

export const ScamHubHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-18 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-[#070b14] to-[#05080e]">
      {/* Background cyber grid & glow effects */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a15_1px,transparent_1px),linear-gradient(to_bottom,#0f172a15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1720px] h-80 bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none opacity-60" 
        aria-hidden="true" 
      />

      <div className="cyber-container relative">
        {/* 1. TOP BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 sm:mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-cyan-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
          <span className="text-cyan-400 font-medium" aria-current="page">
            Scam Awareness
          </span>
        </nav>

        {/* 2-Column Hero Grid on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Hero Copy (Left Column) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-800/80 bg-cyan-950/40 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
              <span className="text-xs font-semibold text-cyan-300 tracking-wider uppercase font-mono">
                SCAM AWARENESS LEARNING HUB
              </span>
            </div>

            {/* Main Heading: Strong two-line headline with cyan/teal gradient */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Spot the Scam. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-200">
                Protect Yourself.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
              Learn how modern scams manipulate trust, urgency, and emotion — then practice identifying them through interactive scenarios.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Button
                asLink
                href="/scam-awareness/challenge"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5 text-slate-950" aria-hidden="true" />}
                iconPosition="right"
                className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-bold shadow-lg shadow-cyan-950/40 cyber-focus-ring"
              >
                Start Scam Challenge &rarr;
              </Button>
              <Button
                asLink
                href="/scam-awareness/types"
                variant="secondary"
                size="lg"
                icon={<Layers className="w-4 h-4 text-slate-300" aria-hidden="true" />}
                iconPosition="left"
                className="border-slate-700 bg-slate-900/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600 cyber-focus-ring"
              >
                Explore Scam Types
              </Button>
            </div>
          </div>

          {/* Hero Illustration (Right Column) */}
          <div className="lg:col-span-5 w-full">
            <ScamAnalysisHeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
};
