import React from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  GraduationCap,
  Wrench,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export const CyberSafetyCrossLinks: React.FC = () => {
  const links = [
    {
      title: 'Scam Awareness Hub',
      badge: 'Threat Intelligence',
      badgeColor: 'border-amber-800 text-amber-300 bg-amber-950/60',
      description:
        'Explore comprehensive dissections of imposter fraud, fake job postings, cryptocurrency investment schemes, and wire fraud mechanics.',
      href: '/scam-awareness',
      ctaText: 'Examine Scam Categories & Deception Patterns',
      icon: <ShieldAlert className="w-6 h-6 text-amber-400" />,
    },
    {
      title: 'Structured Cybersecurity Learning',
      badge: 'Modular Tracks',
      badgeColor: 'border-cyan-800 text-cyan-300 bg-cyan-950/60',
      description:
        'Advance beyond fundamental safety with comprehensive curriculums covering network defense, web security, and system architecture.',
      href: '/learn',
      ctaText: 'Explore Cybersecurity Learning Hub',
      icon: <GraduationCap className="w-6 h-6 text-cyan-400" />,
    },
    {
      title: 'Client-Side Security Tools',
      badge: 'Browser-Based',
      badgeColor: 'border-emerald-800 text-emerald-300 bg-emerald-950/60',
      description:
        'Calculate password entropy, inspect email headers, and test URL patterns directly inside your local browser memory.',
      href: '/tools',
      ctaText: 'Launch Browser-Based Security Utilities',
      icon: <Wrench className="w-6 h-6 text-emerald-400" />,
    },
    {
      title: 'Cybersecurity Research & Blog',
      badge: 'Editorials & Guides',
      badgeColor: 'border-blue-800 text-blue-300 bg-blue-950/60',
      description:
        'Read timely investigative reports, passkey implementation guides, browser hardening blueprints, and threat analyses.',
      href: '/blog',
      ctaText: 'Read Latest Cybersecurity Articles & Guides',
      icon: <BookOpen className="w-6 h-6 text-blue-400" />,
    },
  ];

  return (
    <section className="py-16 md:py-20 relative border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 block mb-2">
            Continue Your Journey Across CyberAntigravity
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Explore Related Security Centers
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Connect cyber safety fundamentals with real-world threat awareness, hands-on learning, and privacy-preserving tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {links.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800/90 bg-slate-900/60 p-6 sm:p-7 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${item.badgeColor} font-semibold uppercase tracking-wider`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors"
                >
                  <span>{item.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
