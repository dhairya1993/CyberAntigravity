'use client';

import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Eye,
  Globe,
  Globe2,
  Sparkles,
  BookOpen,
  Compass,
  KeyRound
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden cyber-grid-bg">
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
                href="#scam-awareness"
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

          {/* Right Column: Cyber Safety Snapshot Panel */}
          <div className="lg:col-span-5 relative">
            {/* Decorative Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-teal-500/20 rounded-3xl blur-xl opacity-75 transition duration-1000 -z-10" />

            <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800/90 backdrop-blur-xl p-6 sm:p-7 shadow-2xl shadow-black/80 space-y-5">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                    Cyber Safety Snapshot
                  </span>
                </div>
                <Badge variant="cyan" size="sm">
                  Educational Guide
                </Badge>
              </div>

              {/* Educational Snapshot Items */}
              <div className="space-y-3">
                <a
                  href="#cyber-safety"
                  className="block p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                      <Compass className="w-3.5 h-3.5 text-cyan-400" />
                      Phishing Awareness
                    </span>
                    <span className="text-[10px] text-cyan-400 font-mono">Guide</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Learn how attackers use deceptive emails, urgent pretexts, and fake websites to harvest credentials.
                  </p>
                </a>

                <a
                  href="#cyber-safety"
                  className="block p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                      <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                      Account Protection
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">Guide</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Use unique passphrases, audited password managers, and multi-factor authentication (MFA).
                  </p>
                </a>

                <a
                  href="#scam-awareness"
                  className="block p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-purple-400" />
                      Safe Browsing
                    </span>
                    <span className="text-[10px] text-purple-400 font-mono">Guide</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Identify deceptive lookalike domains, typosquatting traps, and fraudulent search results.
                  </p>
                </a>

                <a
                  href="#cyber-safety"
                  className="block p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      Privacy Basics
                    </span>
                    <span className="text-[10px] text-amber-400 font-mono">Guide</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Reduce unnecessary personal data exposure and manage digital footprints responsibly.
                  </p>
                </a>
              </div>

              {/* Architecture Placeholder for Future Feeds */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-950 via-slate-950 to-cyan-950/20 border border-slate-800/90 text-xs">
                <div className="flex items-center justify-between text-slate-300 font-medium mb-1">
                  <span className="flex items-center gap-1.5 text-cyan-300 font-semibold text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Live Threat Intelligence Feeds
                  </span>
                  <Badge variant="outline" size="sm">
                    Coming Soon
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Real-time threat feeds will be integrated with verified cybersecurity sources in a future release.
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>CyberAntigravity Education</span>
                <span className="text-cyan-400">Defensive Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
