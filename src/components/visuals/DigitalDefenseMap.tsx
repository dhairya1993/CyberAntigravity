'use client';

import React, { useState } from 'react';
import {
  Smartphone,
  Key,
  Eye,
  RefreshCw,
  Database,
  Globe,
  Laptop,
  Brain,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { CyberAntigravityLogo } from '@/components/ui/CyberAntigravityLogo';

interface DefenseLayer {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  whyItMatters: string;
  practicalAction: string;
}

const DEFENSE_LAYERS: DefenseLayer[] = [
  {
    id: 'mfa',
    name: 'MFA',
    icon: Smartphone,
    tag: 'Identity Protection',
    whyItMatters: 'Passwords alone can be compromised through credential breaches or brute force.',
    practicalAction: 'Enable multi-factor authentication (authenticator app or passkey) on important accounts.',
  },
  {
    id: 'passwords',
    name: 'Strong Passwords',
    icon: Key,
    tag: 'Credential Hygiene',
    whyItMatters: 'Short, reused passwords allow automated bots to breach multiple services simultaneously.',
    practicalAction: 'Use a trusted password manager to generate unique 16+ character passphrases for every login.',
  },
  {
    id: 'privacy',
    name: 'Privacy',
    icon: Eye,
    tag: 'Data Minimization',
    whyItMatters: 'Exposed personal information fuels targeted spear-phishing and identity theft.',
    practicalAction: 'Audit app permissions, decline non-essential trackers, and minimize public personal footprints.',
  },
  {
    id: 'updates',
    name: 'Software Updates',
    icon: RefreshCw,
    tag: 'Vulnerability Patching',
    whyItMatters: 'Attackers reverse-engineer released security patches to exploit unpatched machines.',
    practicalAction: 'Enable automatic updates on your operating system, web browsers, and core software.',
  },
  {
    id: 'backups',
    name: 'Backups',
    icon: Database,
    tag: 'Data Resilience',
    whyItMatters: 'Hardware failures, accidental deletions, and ransomware can permanently erase critical files.',
    practicalAction: 'Implement a 3-2-1 backup strategy with at least one encrypted offline or cloud copy.',
  },
  {
    id: 'safe-browsing',
    name: 'Safe Browsing',
    icon: Globe,
    tag: 'Web Hygiene',
    whyItMatters: 'Lookalike domains and malicious redirects harvest login tokens in fraudulent forms.',
    practicalAction: 'Inspect address bar domains before typing credentials and avoid downloading unverified files.',
  },
  {
    id: 'device-security',
    name: 'Device Security',
    icon: Laptop,
    tag: 'Endpoint Defense',
    whyItMatters: 'Physical theft or unattended workstations expose private session tokens without encryption.',
    practicalAction: 'Turn on full-disk encryption (BitLocker / FileVault) and enforce short screen lock timeouts.',
  },
  {
    id: 'awareness',
    name: 'Security Awareness',
    icon: Brain,
    tag: 'Human Firewall',
    whyItMatters: 'Human psychology—urgency, authority, and curiosity—is the primary attack vector used by hackers.',
    practicalAction: 'Practice a deliberate pause when encountering urgent messages, and verify through official channels.',
  },
];

export const DigitalDefenseMap: React.FC = () => {
  const [activeLayerId, setActiveLayerId] = useState<string>('mfa');

  const activeLayer = DEFENSE_LAYERS.find((l) => l.id === activeLayerId) || DEFENSE_LAYERS[0];
  const ActiveIcon = activeLayer.icon;

  return (
    <div className="relative rounded-3xl bg-slate-950/90 border border-slate-800 p-6 sm:p-10 shadow-2xl overflow-hidden space-y-10">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-25 pointer-events-none" />

      {/* Top Advisory Pill */}
      <div className="relative z-10 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interactive 8-Layer Defense Architecture • Hover or Tap Any Layer</span>
        </div>
      </div>

      {/* CENTER SHIELD & CONNECTING LINES ARCHITECTURE */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* SVG Decorative Connecting Lines Diagram */}
        <div className="relative w-full max-w-3xl flex items-center justify-center py-4">
          {/* Subtle Outer Orbital Rings */}
          <div
            className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-cyan-500/20 animate-spin pointer-events-none"
            style={{ animationDuration: '45s' }}
          />
          <div className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full border border-dashed border-emerald-500/20 pointer-events-none" />

          {/* LARGE CENTRAL GRAPHICAL SHIELD: CYBER DEFENSE */}
          <div className="relative z-20 w-48 h-56 sm:w-60 sm:h-72 flex flex-col items-center justify-center p-4">
            {/* Vector Shield Frame */}
            <svg
              viewBox="0 0 200 240"
              className="absolute inset-0 w-full h-full drop-shadow-[0_0_35px_rgba(0,240,255,0.35)] select-none pointer-events-none"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="cyber_shield_grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#083344" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#021c27" stopOpacity="0.98" />
                </linearGradient>
              </defs>
              {/* Outer Shield Outline */}
              <path
                d="M 100 12 L 180 38 V 112 C 180 172 100 230 100 230 C 100 230 20 172 20 112 V 38 L 100 12 Z"
                fill="url(#cyber_shield_grad)"
                stroke="#00f0ff"
                strokeWidth="2.8"
                className="transition-all duration-300"
              />
              {/* Inner Defensive Border */}
              <path
                d="M 100 26 L 166 48 V 108 C 166 156 100 208 100 208 C 100 208 34 156 34 108 V 48 L 100 26 Z"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeOpacity="0.7"
                strokeDasharray="4 4"
              />
            </svg>

            {/* Shield Center Graphic with Brand Symbol & Labels */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-cyan-950/90 border border-cyan-400/60 p-1.5 flex items-center justify-center shadow-lg shadow-cyan-400/40">
                <CyberAntigravityLogo variant="symbol" size="md" />
              </div>

              {/* Explicit CYBER DEFENSE typography */}
              <div className="space-y-0.5 pt-1">
                <span className="text-sm sm:text-base font-mono font-black uppercase tracking-widest text-white block drop-shadow-md">
                  CYBER
                </span>
                <span className="text-xs sm:text-sm font-mono font-black uppercase tracking-wider text-cyan-400 block drop-shadow-md">
                  DEFENSE
                </span>
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block pt-0.5">
                  Multi-Layered Shield
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 8 INTERACTIVE DEFENSE LAYERS GRID */}
        <div className="w-full max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4">
          {DEFENSE_LAYERS.map((layer) => {
            const Icon = layer.icon;
            const isActive = activeLayerId === layer.id;

            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveLayerId(layer.id)}
                onMouseEnter={() => setActiveLayerId(layer.id)}
                className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all duration-200 cursor-pointer cyber-focus-ring ${
                  isActive
                    ? 'bg-cyan-950 border-cyan-400 text-white shadow-xl shadow-cyan-950/80 scale-[1.03] ring-1 ring-cyan-400/50'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
                aria-pressed={isActive}
                aria-label={`Inspect ${layer.name} defense layer`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/30'
                      : 'bg-slate-950 text-cyan-400 border border-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 truncate">
                    {layer.tag}
                  </div>
                  <div className="text-xs sm:text-sm font-bold truncate">
                    {layer.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE DETAIL CALLOUT: WHY IT MATTERS + ONE PRACTICAL ACTION */}
      <div className="w-full max-w-4xl mx-auto p-6 rounded-2xl bg-cyan-950/40 border border-cyan-500/50 backdrop-blur-md transition-all duration-300 space-y-4 shadow-xl shadow-cyan-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-900/60 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <ActiveIcon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                Layer Focus • {activeLayer.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400 ml-2">
                ({activeLayer.tag})
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Core Defense Metric
          </span>
        </div>

        {/* 2 Educational Callout Pillars: WHY IT MATTERS & ONE PRACTICAL ACTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* WHY IT MATTERS */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
              <span>WHY IT MATTERS</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              &ldquo;{activeLayer.whyItMatters}&rdquo;
            </p>
          </div>

          {/* ONE PRACTICAL ACTION */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ONE PRACTICAL ACTION</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              &ldquo;{activeLayer.practicalAction}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
