'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Smartphone,
  Laptop,
  Globe,
  Mail,
  Wifi,
  Cloud,
  Share2,
  Landmark,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

interface SurfaceItem {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  primaryThreat: string;
  coreDefense: string;
  recommendedAction: string;
  targetLink: string;
  linkText: string;
  accentColor: string;
}

const DEFENSE_SURFACE_ITEMS: SurfaceItem[] = [
  {
    id: 'phone',
    name: 'Smartphones & Mobile',
    category: 'Mobile Security',
    icon: Smartphone,
    primaryThreat: 'Smishing (SMS phishing), malicious side-loaded apps, and unencrypted public Wi-Fi intercepts.',
    coreDefense: 'Biometric lockouts, official app store curation, and automated OS security updates.',
    recommendedAction: 'Enable automatic security patches and review app permissions quarterly.',
    targetLink: '/blog/mobile-security-guide',
    linkText: 'Explore Mobile Security Guide',
    accentColor: 'from-blue-500/20 border-blue-500/40 text-blue-400',
  },
  {
    id: 'laptop',
    name: 'Laptops & Workstations',
    category: 'Endpoint Security',
    icon: Laptop,
    primaryThreat: 'Drive-by downloads, unpatched software vulnerabilities, and unauthorized physical access.',
    coreDefense: 'Full-disk encryption (BitLocker/FileVault), local firewalls, and non-admin day-to-day accounts.',
    recommendedAction: 'Enable full disk encryption and set 3-minute automatic display lockouts.',
    targetLink: '/cyber-safety#passwords',
    linkText: 'Review Endpoint Protection Steps',
    accentColor: 'from-cyan-500/20 border-cyan-500/40 text-cyan-400',
  },
  {
    id: 'browser',
    name: 'Web Browsers',
    category: 'Browsing Safety',
    icon: Globe,
    primaryThreat: 'Cross-site scripting (XSS), deceptive lookalike domains, and rogue browser extensions.',
    coreDefense: 'Strict privacy settings, HTTPS-only enforcement, and script/tracker blocking.',
    recommendedAction: 'Audit installed extensions and enforce HTTPS-Only Mode.',
    targetLink: '/blog/browser-privacy-settings',
    linkText: 'Explore Browser Privacy Guide',
    accentColor: 'from-teal-500/20 border-teal-500/40 text-teal-400',
  },
  {
    id: 'email',
    name: 'Email & Inboxes',
    category: 'Email Security',
    icon: Mail,
    primaryThreat: 'Spear phishing, invoice fraud, spoofed sender headers, and malicious payloads.',
    coreDefense: 'DKIM/SPF verification, trained link skepticism, and separate communication verification.',
    recommendedAction: 'Verify sender email headers and never open unexpected attachments.',
    targetLink: '/blog/what-is-phishing',
    linkText: 'Read Phishing Defense Guide',
    accentColor: 'from-rose-500/20 border-rose-500/40 text-rose-400',
  },
  {
    id: 'wifi',
    name: 'Wi-Fi & Home Routers',
    category: 'Network Security',
    icon: Wifi,
    primaryThreat: 'Default router admin passwords, DNS poisoning, and unencrypted guest networks.',
    coreDefense: 'WPA3 encryption, isolated IoT guest VLANs, and disabled remote management.',
    recommendedAction: 'Change default router admin credentials and disable WPS/UPnP.',
    targetLink: '/blog/home-network-security',
    linkText: 'Inspect Router Security Checklist',
    accentColor: 'from-amber-500/20 border-amber-500/40 text-amber-400',
  },
  {
    id: 'cloud',
    name: 'Cloud Storage & Sync',
    category: 'Cloud Protection',
    icon: Cloud,
    primaryThreat: 'Accidental public file shares, compromised session tokens, and sync ransomware.',
    coreDefense: 'Hardware-backed MFA, zero-trust sharing link expiries, and versioned backups.',
    recommendedAction: 'Review external share links and enforce MFA on primary cloud accounts.',
    targetLink: '/tools/password-strength',
    linkText: 'Check Password Strength',
    accentColor: 'from-purple-500/20 border-purple-500/40 text-purple-400',
  },
  {
    id: 'social',
    name: 'Social Media & Identity',
    category: 'Social Engineering',
    icon: Share2,
    primaryThreat: 'Account impersonation, credential harvesting quizzes, and OSINT oversharing.',
    coreDefense: 'Private profile audits, burner contact emails, and vigilant privacy controls.',
    recommendedAction: 'Restrict profile visibility to trusted connections and remove personal phone numbers.',
    targetLink: '/blog/recognize-social-engineering',
    linkText: 'Learn Social Engineering Defense',
    accentColor: 'from-pink-500/20 border-pink-500/40 text-pink-400',
  },
  {
    id: 'banking',
    name: 'Banking & Financials',
    category: 'Financial Protection',
    icon: Landmark,
    primaryThreat: 'Fake fraud alerts, OTP bypass interception, and urgent wire-transfer coercion.',
    coreDefense: 'Dedicated authenticator apps, instant transaction alerts, and verbal callback verification.',
    recommendedAction: 'Use direct official bank apps instead of clicking SMS alert links.',
    targetLink: '/scam-awareness',
    linkText: 'Explore Scam Awareness Hub',
    accentColor: 'from-emerald-500/20 border-emerald-500/40 text-emerald-400',
  },
];

export const DigitalDefenseSurface: React.FC = () => {
  const [activeItem, setActiveItem] = useState<SurfaceItem>(DEFENSE_SURFACE_ITEMS[0]);

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header with Live Telemetry Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
            Interactive Defense Topology
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Your Digital Defense Surface
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Every device, account, and connection you use represents part of your total attack surface. Select an asset below to explore its specific threat vectors and defensive countermeasures.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-700/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            PERIMETER MONITORED (8/8 NODES LIVE)
          </span>
        </div>
      </div>

      {/* LIVE TOPOLOGY GRAPH CANVAS */}
      <div className="relative w-full aspect-[640/220] sm:aspect-[640/200] rounded-2xl bg-slate-950/90 border border-slate-800/90 mb-6 overflow-hidden flex items-center justify-center shadow-inner">
        {/* Subtle grid background */}
        <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />

        {/* Dynamic SVG Live Flow Graph */}
        <svg viewBox="0 0 640 220" className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-visible">
          <defs>
            <radialGradient id="surf_center_glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Central Protected Core Aura */}
          <circle cx="320" cy="110" r="32" fill="url(#surf_center_glow)" />
          <circle cx="320" cy="110" r="22" fill="none" stroke="#00f0ff" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" className="animate-spin" style={{ animationDuration: '24s' }} />

          {/* Connection Lines from 8 perimeter nodes to Center Core (320, 110) */}
          {DEFENSE_SURFACE_ITEMS.map((item, idx) => {
            // Distribute across 8 coordinates:
            // x from 50 to 590, curved above and below center
            const xCoords = [60, 130, 210, 280, 360, 430, 510, 580];
            const yCoords = [60, 160, 55, 165, 55, 165, 60, 160];
            const x = xCoords[idx];
            const y = yCoords[idx];
            const isActive = activeItem.id === item.id;

            return (
              <g key={item.id}>
                {/* Background base stream */}
                <line
                  x1={x}
                  y1={y}
                  x2="320"
                  y2="110"
                  stroke={isActive ? '#00f0ff' : '#334155'}
                  strokeWidth={isActive ? 2.2 : 1}
                  strokeOpacity={isActive ? 0.9 : 0.3}
                  strokeDasharray={isActive ? '6 4' : '2 4'}
                  className={isActive ? 'animate-cyber-flow' : ''}
                />

                {/* Traveling Packets */}
                <circle r={isActive ? 3.2 : 1.8} fill={isActive ? '#00f0ff' : '#0891b2'} opacity={isActive ? 1 : 0.5}>
                  <animateMotion
                    dur={isActive ? '1.5s' : '3.6s'}
                    repeatCount="indefinite"
                    path={`M ${x} ${y} L 320 110`}
                  />
                </circle>
                <circle r={isActive ? 2.5 : 1.2} fill={isActive ? '#10b981' : '#047857'} opacity={isActive ? 0.9 : 0.4}>
                  <animateMotion
                    dur={isActive ? '1.8s' : '4.2s'}
                    repeatCount="indefinite"
                    path={`M 320 110 L ${x} ${y}`}
                  />
                </circle>

                {/* Small indicator node dot */}
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 6 : 4}
                  fill={isActive ? '#00f0ff' : '#090d16'}
                  stroke={isActive ? '#00f0ff' : '#475569'}
                  strokeWidth={isActive ? 2 : 1}
                />
                {isActive && (
                  <circle
                    cx={x}
                    cy={y}
                    r={14}
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="1.2"
                    strokeDasharray="2 3"
                    className="animate-spin"
                    style={{ animationDuration: '3s' }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Central Core Graphical Hub Node */}
        <div className="relative z-10 flex flex-col items-center justify-center p-2 rounded-2xl bg-cyan-950/90 border border-cyan-400/80 shadow-lg shadow-cyan-400/40 text-center">
          <ShieldCheck className="w-6 h-6 text-cyan-400 animate-pulse" />
          <span className="text-[9px] font-mono font-black uppercase text-white tracking-wider block mt-0.5">
            IDENTITY CORE
          </span>
          <span className="text-[8px] font-mono text-emerald-400 tracking-tight block">
            PROTECTED
          </span>
        </div>
      </div>

      {/* Ecosystem Interactive Nodes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
        {DEFENSE_SURFACE_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem.id === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveItem(item)}
              className={`p-3.5 rounded-xl border flex flex-col items-center text-center transition-all duration-300 group cursor-pointer relative overflow-hidden ${
                isActive
                  ? 'bg-slate-800/90 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105 ring-1 ring-cyan-400/50'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-cyan-400" />
              )}
              <div
                className={`p-2.5 rounded-lg mb-2 transition-transform group-hover:scale-110 ${
                  isActive ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/50' : 'bg-slate-900 text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-bold leading-tight ${isActive ? 'text-white' : 'text-slate-300'}`}>
                {item.name.split(' ')[0]}
              </span>
              <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                {item.category.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail Spotlight Card */}
      <div className="rounded-xl bg-slate-950/90 border border-slate-800 p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Asset Info & Icon */}
        <div className="md:col-span-4 space-y-3 border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 md:pr-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
              <activeItem.icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                {activeItem.category}
              </span>
              <h4 className="text-lg font-bold text-white">
                {activeItem.name}
              </h4>
            </div>
          </div>
          <div className="text-xs text-slate-300">
            <span className="font-semibold text-slate-200">Recommended Action:</span> {activeItem.recommendedAction}
          </div>
          <div className="pt-2">
            <Link
              href={activeItem.targetLink}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              <span>{activeItem.linkText}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right Column: Threat vs Defense breakdown */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Threat Card */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1.5">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold font-mono">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>PRIMARY THREAT VECTOR</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeItem.primaryThreat}
            </p>
          </div>

          {/* Defense Card */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>CORE DEFENSIVE MEASURE</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeItem.coreDefense}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
