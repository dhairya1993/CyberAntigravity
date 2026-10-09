'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Globe2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CyberDefenseCommandCenter } from '@/components/visuals/CyberDefenseCommandCenter';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-6 pb-20 md:pt-10 md:pb-32 overflow-hidden cyber-grid-bg">
      {/* Top Threat Alert Advisory Strip */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mb-6">
        <div className="py-2.5 px-4 sm:px-5 rounded-xl bg-slate-900/80 border border-amber-500/30 flex items-center justify-between text-xs sm:text-sm text-slate-300 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-mono text-amber-400 font-bold uppercase text-[11px] sm:text-xs">
              Defensive Advisory:
            </span>
            <span className="line-clamp-1 text-slate-300">
              Impersonation scams and fake parcel delivery alerts are prevalent. Always verify communications through independent bookmarks.
            </span>
          </div>
          <Link
            href="/scam-awareness"
            className="text-[11px] sm:text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 shrink-0 ml-3 hidden sm:inline transition-colors"
          >
            Review Scam Red Flags →
          </Link>
        </div>
      </div>

      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1720px] h-[550px] cyber-radial-glow pointer-events-none -z-10" />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          {/* Left Column: Headline, Messaging, and Actions */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 text-center lg:text-left">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2.5">
              <div className="relative shrink-0 w-8 h-8 rounded-lg overflow-hidden border border-cyan-500/40 bg-slate-900/90 shadow-sm shadow-cyan-500/20 p-0.5 flex items-center justify-center">
                <Image
                  src="/brand/cyberantigravity-symbol.png"
                  alt="CyberAntigravity Shield"
                  width={32}
                  height={32}
                  priority
                  className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
                />
              </div>
              <Badge variant="cyan" dot size="md">
                GLOBAL CYBERSECURITY LEARNING PLATFORM
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Rise Above <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400">
                Cyber Threats.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl xl:max-w-3xl mx-auto lg:mx-0">
              Learn cybersecurity, recognize online scams, build safer digital habits, and develop practical security awareness through interactive learning.
            </p>

            {/* Call To Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                asLink
                href="/learn"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                Start Learning
              </Button>

              <Button
                asLink
                href="/cyber-safety"
                variant="outline"
                size="lg"
                icon={<ShieldCheck className="w-5 h-5" />}
                className="w-full sm:w-auto"
              >
                Explore Cyber Safety
              </Button>

              <Link
                href="/cyber-iq"
                className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5 px-3 py-2"
              >
                Test Your Cyber IQ →
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Defensive Security Education</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Free & Open • Zero Commercial Trackers</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Accessible for Students & Families</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cyber Defense Command Center Interactive Centerpiece */}
          <div className="lg:col-span-5 relative">
            <CyberDefenseCommandCenter />
          </div>
        </div>
      </div>
    </section>
  );
};
