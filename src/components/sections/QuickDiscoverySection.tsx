import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Flame,
  Terminal,
  Wrench,
  AlertTriangle,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface DiscoveryItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  actionText: string;
  icon: React.ReactNode;
  borderHover: string;
  badgeText?: string;
  badgeColor?: string;
  accentBg: string;
  accentText: string;
}

const DISCOVERY_ITEMS: DiscoveryItem[] = [
  {
    id: 'start-learning',
    title: 'Start Learning',
    subtitle: 'Step-by-step beginner curriculum, CIA triad, and 9-level cybersecurity roadmap.',
    href: '/learn',
    actionText: 'Explore Learning Paths',
    icon: <GraduationCap className="w-5 h-5 text-cyan-400" aria-hidden="true" />,
    borderHover: 'hover:border-cyan-500/50',
    accentBg: 'bg-cyan-950/40 border-cyan-800/60',
    accentText: 'text-cyan-300',
    badgeText: 'Core Curriculum',
    badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
  },
  {
    id: 'daily-challenge',
    title: 'Daily Cyber Challenge',
    subtitle: 'One real-world scenario every 24 hours. Build defensive reflexes and track your streak.',
    href: '#daily-challenge',
    actionText: "Take Today's Challenge",
    icon: <Flame className="w-5 h-5 text-amber-400" aria-hidden="true" />,
    borderHover: 'hover:border-amber-500/50',
    accentBg: 'bg-amber-950/40 border-amber-800/60',
    accentText: 'text-amber-300',
    badgeText: 'Daily 60s Test',
    badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
  },
  {
    id: 'cybersecurity-labs',
    title: 'Cybersecurity Labs',
    subtitle: 'Hands-on interactive terminal sandboxes, attack-path visualization, and defense simulations.',
    href: '/scam-awareness/simulator',
    actionText: 'Launch Interactive Lab',
    icon: <Terminal className="w-5 h-5 text-purple-400" aria-hidden="true" />,
    borderHover: 'hover:border-purple-500/50',
    accentBg: 'bg-purple-950/40 border-purple-800/60',
    accentText: 'text-purple-300',
    badgeText: 'Interactive',
    badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
  },
  {
    id: 'security-tools',
    title: 'Security Tools',
    subtitle: 'Web-crypto password generator, entropy analyzer, and HTTP security headers inspector.',
    href: '/tools',
    actionText: 'Explore 6 Defense Tools',
    icon: <Wrench className="w-5 h-5 text-sky-400" aria-hidden="true" />,
    borderHover: 'hover:border-sky-500/50',
    accentBg: 'bg-sky-950/40 border-sky-800/60',
    accentText: 'text-sky-300',
    badgeText: '100% Client-Side',
    badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
  },
  {
    id: 'scam-awareness',
    title: 'Scam Awareness',
    subtitle: 'Spot phishing emails, fake delivery SMS, investment fraud, and deepfake impersonation.',
    href: '/scam-awareness',
    actionText: 'Identify Red Flags',
    icon: <AlertTriangle className="w-5 h-5 text-rose-400" aria-hidden="true" />,
    borderHover: 'hover:border-rose-500/50',
    accentBg: 'bg-rose-950/40 border-rose-800/60',
    accentText: 'text-rose-300',
    badgeText: 'Fraud Defense',
    badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
  },
  {
    id: 'learning-guides',
    title: 'Latest Learning Guides',
    subtitle: '14 technical articles on passkeys, AI voice cloning, browser hardening, and zero-trust.',
    href: '/blog',
    actionText: 'Read Full Articles',
    icon: <BookOpen className="w-5 h-5 text-emerald-400" aria-hidden="true" />,
    borderHover: 'hover:border-emerald-500/50',
    accentBg: 'bg-emerald-950/40 border-emerald-800/60',
    accentText: 'text-emerald-300',
    badgeText: '14 Guides',
    badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
  },
];

export const QuickDiscoverySection: React.FC = () => {
  return (
    <section
      aria-label="Platform Learning and Tool Discovery"
      className="relative -mt-6 sm:-mt-10 mb-12 sm:mb-16 z-20"
    >
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Subtle heading for screen readers & structural semantic hierarchy */}
        <h2 className="sr-only">Explore CyberAntigravity Learning Hubs</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {DISCOVERY_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`group p-5 sm:p-6 rounded-2xl border border-slate-800/90 bg-slate-900/80 hover:bg-slate-900 backdrop-blur-md transition-all duration-200 flex flex-col justify-between space-y-4 shadow-lg shadow-black/30 hover:shadow-cyan-950/20 cyber-focus-ring ${item.borderHover}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border ${item.accentBg}`}
                  >
                    {item.icon}
                  </div>

                  {item.badgeText && (
                    <span
                      className={`text-[11px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                    >
                      {item.badgeText}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                <span className={item.accentText}>{item.actionText}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
