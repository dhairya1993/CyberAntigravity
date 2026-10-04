'use client';

import React from 'react';
import Link from 'next/link';
import {
  Wrench,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

export const LearningCrossLinks: React.FC = () => {
  const hubs = [
    {
      title: 'Browser Security Tools',
      description:
        'Explore client-side security analyzers including URL parsing, password entropy meters, and email header analysis.',
      href: '/tools',
      icon: <Wrench className="w-5 h-5 text-cyan-400" />,
      cta: 'Explore Security Tools',
    },
    {
      title: 'Scam Awareness Hub',
      description:
        'Practice identifying deceptive messages with our interactive Red Flag simulator, Scam IQ quiz, and recovery checklist.',
      href: '/scam-awareness',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
      cta: 'Visit Scam Hub',
    },
    {
      title: 'Cyber Safety Foundation',
      description:
        'Read core security guides covering multi-factor authentication, smartphone hardening, and personal device protection.',
      href: '/cyber-safety',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      cta: 'Review Safety Guide',
    },
    {
      title: 'Cyber Threat Analysis Blog',
      description:
        'In-depth investigative reports on modern phishing evasion tactics, deepfake business compromise, and passkeys.',
      href: '/blog',
      icon: <BookOpen className="w-5 h-5 text-purple-400" />,
      cta: 'Read Threat Articles',
    },
  ];

  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-800/80 pt-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              CyberAntigravity Ecosystem
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1.5">
              Continue Your Defensive Security Journey
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Connect theoretical security knowledge with interactive tools, scam defense simulations, and practical guides.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hubs.map((hub) => (
              <div
                key={hub.title}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-900/80 transition-all group"
              >
                <div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 w-fit mb-3.5 group-hover:border-cyan-500/30 transition-colors">
                    {hub.icon}
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight mb-2 group-hover:text-cyan-300 transition-colors">
                    {hub.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {hub.description}
                  </p>
                </div>

                <Link
                  href={hub.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 pt-2 border-t border-slate-800/60 transition-colors"
                >
                  <span>{hub.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
