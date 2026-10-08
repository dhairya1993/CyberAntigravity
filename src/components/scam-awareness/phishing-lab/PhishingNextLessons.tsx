'use client';

import React from 'react';
import Link from 'next/link';
import {
  Smartphone,
  CreditCard,
  Package,
  Briefcase,
  TrendingUp,
  Gift,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface NextLessonCard {
  id: string;
  title: string;
  category: string;
  desc: string;
  route: string;
  icon: React.ComponentType<{ className?: string }>;
  accentBorder: string;
  accentBg: string;
}

const NEXT_LESSONS: NextLessonCard[] = [
  {
    id: 'sms',
    title: 'SMS Scam (Smishing)',
    category: 'MESSAGING',
    desc: 'Fake parcel alerts and package delivery SMS messages prompting click-throughs.',
    route: '/scam-awareness/types/delivery',
    icon: Smartphone,
    accentBorder: 'border-cyan-500/40 hover:border-cyan-400',
    accentBg: 'bg-cyan-950/40 text-cyan-300',
  },
  {
    id: 'banking',
    title: 'Banking Scam',
    category: 'FINANCIAL',
    desc: 'Fraud attempts involving fake payment requests, card errors, and account blocks.',
    route: '/scam-awareness/types/banking-payment',
    icon: CreditCard,
    accentBorder: 'border-blue-500/40 hover:border-blue-400',
    accentBg: 'bg-blue-950/40 text-blue-300',
  },
  {
    id: 'delivery',
    title: 'Delivery Scam',
    category: 'SHOPPING',
    desc: 'Deceptive courier notices demanding immediate small customs or handling fees.',
    route: '/scam-awareness/types/delivery',
    icon: Package,
    accentBorder: 'border-orange-500/40 hover:border-orange-400',
    accentBg: 'bg-orange-950/40 text-orange-300',
  },
  {
    id: 'job',
    title: 'Job Scam',
    category: 'EMPLOYMENT',
    desc: 'Fraudulent work-from-home offers demanding upfront application deposits.',
    route: '/scam-awareness/types/job',
    icon: Briefcase,
    accentBorder: 'border-purple-500/40 hover:border-purple-400',
    accentBg: 'bg-purple-950/40 text-purple-300',
  },
  {
    id: 'investment',
    title: 'Investment Scam',
    category: 'FINANCIAL',
    desc: 'Guaranteed high-yield cryptocurrency or algorithmic trading fraud platforms.',
    route: '/scam-awareness/types/investment',
    icon: TrendingUp,
    accentBorder: 'border-emerald-500/40 hover:border-emerald-400',
    accentBg: 'bg-emerald-950/40 text-emerald-300',
  },
  {
    id: 'prize',
    title: 'Prize Scam',
    category: 'REWARDS',
    desc: 'Fake winnings, gift vouchers, and giveaways demanding fee transfers.',
    route: '/scam-awareness/types/lottery',
    icon: Gift,
    accentBorder: 'border-amber-500/40 hover:border-amber-400',
    accentBg: 'bg-amber-950/40 text-amber-300',
  },
];

export const PhishingNextLessons: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#07090e] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-800/80 bg-cyan-950/40 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            EXPAND YOUR DEFENSIVE EXPERTISE
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready for another scenario?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Choose a new threat category to analyze real-world patterns and practice independent verification.
          </p>
        </div>

        {/* 6 Scenario Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEXT_LESSONS.map((lesson) => {
            const Icon = lesson.icon;
            return (
              <Link
                key={lesson.id}
                href={lesson.route}
                className={`rounded-2xl border ${lesson.accentBorder} bg-slate-950/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between space-y-4 group cyber-focus-ring`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      {lesson.category}
                    </span>
                    <div className={`p-2.5 rounded-xl ${lesson.accentBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {lesson.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                    {lesson.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:text-cyan-300">
                  <span>Explore Scenario</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Challenge or Full Explorer CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            asLink
            href="/scam-awareness/challenge"
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4 text-slate-950" />}
            iconPosition="right"
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 font-bold"
          >
            Start Scam Challenge &rarr;
          </Button>

          <Button
            asLink
            href="/scam-awareness/types"
            variant="outline"
            size="md"
            className="w-full sm:w-auto text-slate-200 border-slate-700 hover:border-cyan-400"
          >
            Browse All 12 Scam Types &rarr;
          </Button>
        </div>
      </div>
    </section>
  );
};
