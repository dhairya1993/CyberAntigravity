'use client';

import React from 'react';
import Link from 'next/link';
import { RECOMMENDED_START_STEPS } from '@/data/learningHubData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Compass,
  ArrowRight,
  Lock,
} from 'lucide-react';

export const BeginnerStartPath: React.FC = () => {
  return (
    <section className="py-16 md:py-24 border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>GUIDED ONRAMP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Not Sure Where to Start?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              If you are new to cybersecurity, avoid jumping directly into complex tools or exploitation.
              Follow this battle-tested, 9-stage sequence to build durable defensive intuition.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              asLink
              href="/learn/cybersecurity-fundamentals"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="shadow-lg shadow-cyan-500/20"
            >
              Start Learning →
            </Button>
          </div>
        </div>

        {/* 9-Step Sequence Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RECOMMENDED_START_STEPS.map((stepItem) => {
            const isFirst = stepItem.ready;
            return (
              <div
                key={stepItem.step}
                className={`rounded-xl border p-5 transition-all duration-200 flex flex-col justify-between ${
                  isFirst
                    ? 'bg-slate-900 border-cyan-500/60 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                        isFirst
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      Step {stepItem.step}
                    </span>

                    {isFirst ? (
                      <Badge variant="cyan" size="sm" dot>
                        Available Now
                      </Badge>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-slate-400" /> Planned
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight mb-1.5 flex items-center gap-2">
                    {stepItem.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-slate-400">
                    {stepItem.level}
                  </span>

                  {isFirst ? (
                    <Link
                      href={`/learn/${stepItem.slug}`}
                      className="font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
                    >
                      <span>Begin Lesson</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ) : (
                    <span className="text-slate-400 text-[11px]">Self-paced roadmap</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
