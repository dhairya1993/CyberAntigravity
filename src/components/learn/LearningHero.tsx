'use client';

import React from 'react';
import {
  ShieldCheck,
  Compass,
  ArrowRight,
  Sparkles,
  BookOpen,
  Lock,
  Layers,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const LearningHero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-slate-800/80">
      {/* Background Cyber Glow & Grid */}
      <div className="absolute inset-0 bg-[#07090e] -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[22rem] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[24rem] h-[18rem] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>CYBERSECURITY LEARNING</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
            Learn Cybersecurity.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-200">
              Build Real-World Awareness.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Follow a structured path from cybersecurity fundamentals to advanced defensive security concepts and ethical hacking.
          </p>

          {/* Factual Educational Note (No Certification Claim) */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              Designed for defensive education and responsible security learning.
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              asLink
              href="/learn/cybersecurity-fundamentals"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="w-full sm:w-auto shadow-lg shadow-cyan-500/20"
            >
              Start With the Basics
            </Button>

            <Button
              asLink
              href="#roadmap"
              variant="outline"
              size="lg"
              icon={<Compass className="w-4 h-4" />}
              iconPosition="left"
              className="w-full sm:w-auto border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/60"
            >
              View Learning Roadmap
            </Button>

            <Button
              asLink
              href="/learn/progress"
              variant="outline"
              size="lg"
              icon={<Award className="w-4 h-4 text-amber-400" />}
              iconPosition="left"
              className="w-full sm:w-auto border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-950/20 text-amber-300"
            >
              My Progress &amp; Badges
            </Button>
          </div>

          {/* Micro Trust & Educational Badges */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-400">
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Self-Paced Architecture</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Defensive Focus</span>
            </div>
            <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>9 Comprehensive Levels</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
