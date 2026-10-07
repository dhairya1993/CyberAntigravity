'use client';

import React from 'react';
import {
  GraduationCap,
  BookOpen,
  Search,
  CheckSquare,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const LEARNING_STEPS = [
  {
    step: '01',
    title: 'Read',
    icon: BookOpen,
    desc: 'Review realistic, simulated communications without any real-world risk or credential exposure.',
  },
  {
    step: '02',
    title: 'Inspect',
    icon: Search,
    desc: 'Audit the sender handle, emotional tone, fake deadlines, and disguised web destinations.',
  },
  {
    step: '03',
    title: 'Choose',
    icon: CheckSquare,
    desc: 'Classify as Scam, Safe, or practice the powerful defensive pause: "Not Sure".',
  },
  {
    step: '04',
    title: 'Get Feedback',
    icon: MessageSquare,
    desc: 'Receive instant educational rationales explaining the exact social engineering techniques used.',
  },
  {
    step: '05',
    title: 'Improve',
    icon: TrendingUp,
    desc: 'Build lasting reflexive muscle memory that protects you across email, SMS, and messaging apps.',
  },
];

export function StudentModeSection() {
  const scrollToSimulator = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('scam-detection-lab');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="student-mode" className="py-16 md:py-20 bg-[#080d1a] border-b border-slate-800/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.06),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium tracking-wide uppercase mb-4">
                <GraduationCap className="w-4 h-4" />
                Student & Learner Mode
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Learn Through Practice: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-300">Safe Hands-On Simulation</span>
              </h2>
              <p className="mt-3 text-base text-slate-300 leading-relaxed">
                Reading about cybersecurity theory is not enough. The best way to build scam immunity is through interactive sandbox practice where failure carries zero penalty and every mistake teaches a permanent lesson.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
              <a
                href="#scam-detection-lab"
                onClick={scrollToSimulator}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25 transition-all text-sm group"
              >
                <span>Try a Scenario</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Risk • 100% Fictional Data</span>
              </div>
            </div>
          </div>

          {/* 5-Step Pipeline Cards */}
          <div className="mt-10 pt-10 border-t border-slate-800/80">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {LEARNING_STEPS.map((item, index) => {
                const StepIcon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 relative flex flex-col justify-between group hover:border-cyan-500/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono text-cyan-400 font-bold">
                          STEP {item.step}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 transition-colors">
                          <StepIcon className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>

                    {index < LEARNING_STEPS.length - 1 && (
                      <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-slate-700 z-10 pointer-events-none">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
