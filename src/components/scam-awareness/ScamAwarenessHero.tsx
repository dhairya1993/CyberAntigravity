import React from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ArrowRight,
  Brain,
  Layers,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

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
            {/* Educational Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-800/80 bg-amber-950/50 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-semibold text-amber-300 tracking-wide uppercase font-mono">
                Interactive Scam Awareness
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
              Learn how modern scams work, recognize their warning signs, and practice safer decisions before money or personal information is at risk.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button
                asLink
                href="#scam-quiz"
                variant="primary"
                size="lg"
                icon={<Brain className="w-5 h-5 text-cyan-300" />}
                iconPosition="left"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-900/30"
              >
                Test Your Scam IQ
              </Button>
              <Button
                asLink
                href="#scam-categories"
                variant="secondary"
                size="lg"
                icon={<Layers className="w-4 h-4 text-slate-300" />}
                iconPosition="left"
                className="border-slate-700 bg-slate-900/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600"
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

          {/* Hero Interactive Card Graphic (Right Column) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-slate-950 p-6 shadow-2xl shadow-black/60 backdrop-blur-md">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-950/70 border border-amber-800 flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Social Engineering Anatomy</h3>
                    <p className="text-[11px] text-slate-400">Why scams bypass technical firewalls</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-cyan-800 bg-cyan-950/60 text-cyan-300 font-semibold">
                  Defensive Mindset
                </span>
              </div>

              {/* Anatomy stages visualization */}
              <div className="space-y-3 py-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-white block font-medium">Emotion Over Analysis</strong>
                    <span className="text-slate-400 text-[11px] leading-tight block mt-0.5">
                      Scammers target fear, greed, or urgency to bypass your normal analytical skepticism.
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-950 border border-amber-700 text-amber-300 flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-white block font-medium">Borrowed Authority</strong>
                    <span className="text-slate-400 text-[11px] leading-tight block mt-0.5">
                      Logos, caller IDs, and badges are spoofed to make fake demands feel legitimate.
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-white block font-medium">The Defensive Counter-Habit</strong>
                    <span className="text-slate-400 text-[11px] leading-tight block mt-0.5">
                      Pause. Hang up or close the message. Verify out-of-band using an official, known channel.
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">16 common scam variants covered</span>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  See 6-Stage Flow <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
