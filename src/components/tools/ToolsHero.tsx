'use client';

import React from 'react';
import {
  Wrench,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Lock,
  Globe,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ToolsHero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-slate-800/80">
      {/* Background Cyber Glow & Grid */}
      <div className="absolute inset-0 bg-[#07090e] -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[22rem] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[24rem] h-[18rem] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="cyber-container relative">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium tracking-wide">
            <Wrench className="w-3.5 h-3.5 text-cyan-400" />
            <span>CYBERSECURITY TOOLS</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
            Practical Tools for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-300">
              Safer Digital Decisions.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Explore lightweight cybersecurity utilities designed to help you understand, inspect, and improve your digital security habits.
          </p>

          {/* Factual Notice */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 max-w-xl text-left sm:text-center">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              Some tools run entirely in your browser. Advanced analysis features will require verified security services in future releases.
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              asLink
              href="#tools-directory"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="w-full sm:w-auto shadow-lg shadow-cyan-500/20"
            >
              Explore Tools
            </Button>

            <Button
              asLink
              href="/learn"
              variant="outline"
              size="lg"
              icon={<GraduationCap className="w-4 h-4" />}
              iconPosition="left"
              className="w-full sm:w-auto border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/60"
            >
              Learn Cybersecurity
            </Button>
          </div>

          {/* Micro Trust Pills */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-400">
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Client-Side Execution</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero Credential Logging</span>
            </div>
            <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>No Accounts Required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
