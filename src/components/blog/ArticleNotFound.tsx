'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ShieldCheck, GraduationCap, Wrench, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ArticleNotFound: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
      <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
        <BookOpen className="w-8 h-8" />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
          404 — Article Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          The Security Guide You Requested Could Not Be Found
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          The article may have been moved, renamed, or is currently being updated. Explore our active research directory or other core defensive pillars below.
        </p>
      </div>

      {/* Suggested Core Hub Destinations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4 text-left">
        <Link
          href="/blog#blog-search"
          className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900 transition-all flex items-start gap-3 group"
        >
          <Search className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
              Search Articles
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Locate guides by keyword, phrase, or security topic.
            </p>
          </div>
        </Link>

        <Link
          href="/blog#blog-directory"
          className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900 transition-all flex items-start gap-3 group"
        >
          <BookOpen className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
              Browse Categories
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Filter guides across all 12 cybersecurity disciplines.
            </p>
          </div>
        </Link>

        <Link
          href="/cyber-safety"
          className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900 transition-all flex items-start gap-3 group"
        >
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
              Explore Cyber Safety
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive personal defense pillars and self-assessments.
            </p>
          </div>
        </Link>

        <Link
          href="/learn"
          className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900 transition-all flex items-start gap-3 group"
        >
          <GraduationCap className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
              Explore Learning
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Follow structured roadmaps from fundamentals to advanced defense.
            </p>
          </div>
        </Link>

        <Link
          href="/tools"
          className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900 transition-all flex items-start gap-3 group sm:col-span-2 lg:col-span-1"
        >
          <Wrench className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
              Explore Tools
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Interactive client-side utilities for passwords, URLs, and headers.
            </p>
          </div>
        </Link>
      </div>

      <div className="pt-4">
        <Button
          asLink
          href="/"
          variant="outline"
          size="md"
          icon={<Home className="w-4 h-4" />}
          iconPosition="left"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};
