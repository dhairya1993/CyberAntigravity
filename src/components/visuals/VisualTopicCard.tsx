'use client';

import React from 'react';
import Link from 'next/link';
import {
  Key,
  ShieldAlert,
  Fingerprint,
  Eye,
  Laptop,
  Wifi,
  Users,
  Globe,
  Database,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export interface VisualTopic {
  id: string;
  name: string;
  category: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progressPercent: number;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  route: string;
}

export const VISUAL_SECURITY_TOPICS: VisualTopic[] = [
  {
    id: 'password-security',
    name: 'Password Security',
    category: 'Credential Defense',
    description: 'Build stronger credentials, avoid reuse cascades, and master modern password manager workflows.',
    difficulty: 'Beginner',
    progressPercent: 75,
    icon: Key,
    accentColor: 'from-cyan-500/20 border-cyan-500/40 text-cyan-400',
    route: '/blog/strong-passwords',
  },
  {
    id: 'phishing',
    name: 'Phishing Defense',
    category: 'Social Deception',
    description: 'Recognize deceptive senders, manufactured panic, spoofed domains, and credential harvesting traps.',
    difficulty: 'Beginner',
    progressPercent: 60,
    icon: ShieldAlert,
    accentColor: 'from-rose-500/20 border-rose-500/40 text-rose-400',
    route: '/blog/what-is-phishing',
  },
  {
    id: 'mfa',
    name: 'Multi-Factor Auth (MFA)',
    category: 'Identity Guard',
    description: 'Protect accounts beyond passwords using authenticator apps, security keys, and modern passkeys.',
    difficulty: 'Beginner',
    progressPercent: 90,
    icon: Fingerprint,
    accentColor: 'from-emerald-500/20 border-emerald-500/40 text-emerald-400',
    route: '/blog/multi-factor-authentication',
  },
  {
    id: 'privacy',
    name: 'Privacy & Footprint',
    category: 'Data Protection',
    description: 'Minimize telemetry, manage permissions, reduce exposed personal data, and guard digital footprints.',
    difficulty: 'Beginner',
    progressPercent: 50,
    icon: Eye,
    accentColor: 'from-amber-500/20 border-amber-500/40 text-amber-400',
    route: '/blog/browser-privacy-settings',
  },
  {
    id: 'device-security',
    name: 'Device & OS Security',
    category: 'Endpoint Hardening',
    description: 'Configure full-disk encryption, automated patch hygiene, and safe biometric device lockouts.',
    difficulty: 'Intermediate',
    progressPercent: 40,
    icon: Laptop,
    accentColor: 'from-blue-500/20 border-blue-500/40 text-blue-400',
    route: '/blog/mobile-security-guide',
  },
  {
    id: 'wifi-security',
    name: 'Wi-Fi & Network Security',
    category: 'Network Boundary',
    description: 'Harden home routers, disable unsafe UPnP services, and protect traffic over public Wi-Fi networks.',
    difficulty: 'Intermediate',
    progressPercent: 55,
    icon: Wifi,
    accentColor: 'from-purple-500/20 border-purple-500/40 text-purple-400',
    route: '/blog/home-network-security',
  },
  {
    id: 'social-engineering',
    name: 'Social Engineering',
    category: 'Human Firewall',
    description: 'Identify psychological manipulation, pretexting, urgency pressure, and pretext authority claims.',
    difficulty: 'Intermediate',
    progressPercent: 70,
    icon: Users,
    accentColor: 'from-pink-500/20 border-pink-500/40 text-pink-400',
    route: '/blog/recognize-social-engineering',
  },
  {
    id: 'safe-browsing',
    name: 'Safe Browsing Habits',
    category: 'Web Safety',
    description: 'Dissect deceptive URLs, detect lookalike domains, manage cookies, and browse securely.',
    difficulty: 'Beginner',
    progressPercent: 65,
    icon: Globe,
    accentColor: 'from-teal-500/20 border-teal-500/40 text-teal-400',
    route: '/tools/url-explainer',
  },
  {
    id: 'data-protection',
    name: 'Data Protection & Breaches',
    category: 'Data Governance',
    description: 'Understand how credential dumps occur, encrypt sensitive backups, and respond to breaches.',
    difficulty: 'Advanced',
    progressPercent: 30,
    icon: Database,
    accentColor: 'from-indigo-500/20 border-indigo-500/40 text-indigo-400',
    route: '/blog/understanding-data-breaches',
  },
  {
    id: 'scam-awareness',
    name: 'Scam Awareness',
    category: 'Fraud Prevention',
    description: 'Spot delivery impostors, fake banking hotlines, tech support traps, and urgency coercion schemes.',
    difficulty: 'Beginner',
    progressPercent: 85,
    icon: AlertTriangle,
    accentColor: 'from-red-500/20 border-red-500/40 text-red-400',
    route: '/scam-awareness',
  },
];

export const VisualTopicCard: React.FC<{ topic: VisualTopic }> = ({ topic }) => {
  const Icon = topic.icon;

  const difficultyColors = {
    Beginner: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    Intermediate: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    Advanced: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  };

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 flex flex-col justify-between hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300 shadow-xl group hover:shadow-cyan-500/10">
      <div className="space-y-4">
        {/* Top bar with Illustration & Difficulty badge */}
        <div className="flex items-start justify-between">
          <div className="relative">
            <div className={`w-12 h-12 rounded-xl bg-slate-950 border flex items-center justify-center transition-transform group-hover:scale-110 ${topic.accentColor}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>

          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${difficultyColors[topic.difficulty]}`}>
            {topic.difficulty}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-1.5 text-left">
          <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
            {topic.category}
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
            {topic.name}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {topic.description}
          </p>
        </div>
      </div>

      {/* Progress & Explore CTA */}
      <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>Guide Completion</span>
            <span className="text-cyan-400 font-bold">{topic.progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden">
            <div
              style={{ width: `${topic.progressPercent}%` }}
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
            />
          </div>
        </div>

        <Link
          href={topic.route}
          className="w-full inline-flex items-center justify-between px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-950/30 transition-all group-hover:border-cyan-500/30"
        >
          <span>Explore Topic</span>
          <ArrowRight className="w-4 h-4 text-cyan-400 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
