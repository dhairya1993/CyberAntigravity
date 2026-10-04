'use client';

import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Globe2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CyberDefenseCenter } from '@/components/visuals/CyberDefenseCenter';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-6 pb-20 md:pt-10 md:pb-32 overflow-hidden cyber-grid-bg">
      {/* Top Threat Alert Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="py-2 px-3.5 rounded-xl bg-slate-900/80 border border-amber-500/30 flex items-center justify-between text-xs text-slate-300 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-mono text-amber-400 font-bold uppercase text-[11px]">
              Defensive Advisory:
            </span>
            <span className="line-clamp-1 text-slate-300">
              Impersonation scams and fake parcel delivery texts are prevalent. Verify communications using official bookmarks.
            </span>
          </div>
          <a
            href="/scam-awareness"
            className="text-[11px] font-mono font-bold text-cyan-400 hover:text-cyan-300 shrink-0 ml-2 hidden sm:inline"
          >
            Review Scam Red Flags →
          </a>
        </div>
      </div>
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] cyber-radial-glow pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Messaging */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2">
              <Badge variant="cyan" dot size="md">
                Global Cybersecurity Education Platform
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Rise Above <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
                Cyber Threats
              </span>{' '}
              in an Interconnected World.
            </h1>

            {/* Tagline & Subtitle */}
            <p className="text-lg sm:text-xl font-medium text-cyan-300/90 tracking-wide">
              CyberAntigravity — Rise Above Cyber Threats.
            </p>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Actionable digital safety, scam awareness, and ethical cybersecurity education designed for real people, families, and forward-thinking organizations. Free, transparent, and grounded in defensive reality.
            </p>

            {/* Call To Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                asLink
                href="#cyber-safety"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                Explore Cyber Safety
              </Button>

              <Button
                asLink
                href="/scam-awareness"
                variant="outline"
                size="lg"
                icon={<ShieldCheck className="w-5 h-5" />}
                className="w-full sm:w-auto"
              >
                Identify Online Scams
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Built for defensive security education</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Free educational platform • No commercial ads</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Designed for global digital safety</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cyber Defense Command Center Interactive Visual */}
          <div className="lg:col-span-5 relative">
            <CyberDefenseCenter />
          </div>
        </div>
      </div>
    </section>
  );
};
