'use client';

import React, { useState } from 'react';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Key,
  Smartphone,
  AlertTriangle,
  Globe,
  Radio,
  CheckCircle,
  Info,
  Layers,
  Sparkles,
} from 'lucide-react';

interface NodeDetail {
  id: string;
  name: string;
  category: 'threat' | 'defense' | 'core';
  badge: string;
  headline: string;
  description: string;
  takeaway: string;
}

const NODE_DETAILS: Record<string, NodeDetail> = {
  phishing: {
    id: 'phishing',
    name: 'Phishing Attacks',
    category: 'threat',
    badge: 'Risk: High',
    headline: 'Deceptive Messages & Fake Login Pages',
    description:
      'Scammers send fake emails, SMS, or direct messages that look exactly like your school, bank, or gaming account to trick you into typing your password or clicking dangerous links.',
    takeaway: 'Never click urgent verification links. Check the real domain name carefully before typing passwords.',
  },
  scams: {
    id: 'scams',
    name: 'Online Scams & Impersonation',
    category: 'threat',
    badge: 'Risk: High',
    headline: 'Psychological Manipulation & Social Engineering',
    description:
      'Fraudsters create fake job offers, giveaway contests, or impersonate police/officials using artificial urgency or panic to pressure you into sending money, gift cards, or private documents.',
    takeaway: 'Always pause and independently verify with a family member, teacher, or official bookmark.',
  },
  malware: {
    id: 'malware',
    name: 'Malware & Trojan Viruses',
    category: 'threat',
    badge: 'Risk: Critical',
    headline: 'Dangerous Software & Stealth Payloads',
    description:
      'Harmful software like spyware, keyloggers, and ransomware hidden inside pirated games, unofficial cheats, or strange attachments designed to steal files and spy on your system.',
    takeaway: 'Only download apps from verified official sources, and keep your operating system updated.',
  },
  mfa: {
    id: 'mfa',
    name: 'Multi-Factor Authentication (2FA)',
    category: 'defense',
    badge: 'Defense: Essential',
    headline: 'Double-Layer Login Protection',
    description:
      'MFA requires both your password and an instant verification code (authenticator app or security key). Even if an attacker steals your password, they cannot breach your account.',
    takeaway: 'Enable Authenticator Apps (like Google or Microsoft Authenticator) on all email and social accounts.',
  },
  passwords: {
    id: 'passwords',
    name: 'Password & Passphrase Hygiene',
    category: 'defense',
    badge: 'Defense: Fundamental',
    headline: 'High-Entropy Passphrases & Password Vaults',
    description:
      'Short passwords can be cracked in seconds by automated computers. Using unique 4-word random passphrases stored in a password manager stops credential stuffing dead in its tracks.',
    takeaway: 'Never reuse passwords across websites. Aim for 16+ characters or 4 random memorable words.',
  },
  awareness: {
    id: 'awareness',
    name: 'Security Awareness & Habits',
    category: 'defense',
    badge: 'Defense: Core Habit',
    headline: 'The Human Firewall (Critical Thinking)',
    description:
      'Your skepticism is the strongest digital shield. Spotting suspicious sender addresses, pausing during urgent requests, and questioning unusual links blocks 95% of cyber attacks.',
    takeaway: 'Be curious but cautious: if an unexpected offer or prize feels too good to be true, it is a scam.',
  },
  central: {
    id: 'central',
    name: 'Cyber Defense Active Hub',
    category: 'core',
    badge: 'Status: Operational',
    headline: 'Multi-Layered Defensive Security Architecture',
    description:
      'An interconnected defensive shield that combines live threat telemetry, multi-factor authentication gates, and verified human awareness habits to prevent security breaches.',
    takeaway: 'True cybersecurity is layered: if one barrier is tested, other defensive layers protect your data.',
  },
  ingress: {
    id: 'ingress',
    name: 'Internet Ingress Gateway',
    category: 'threat',
    badge: 'Entrypoint: Global',
    headline: 'Untrusted Public Network Traffic',
    description:
      'The open Internet where all incoming web traffic, messages, game files, and email downloads enter your device from global servers and external networks.',
    takeaway: 'Treat all incoming unsolicited internet communication with zero-trust defensive skepticism.',
  },
  radar: {
    id: 'radar',
    name: 'Threat Radar Telemetry',
    category: 'threat',
    badge: 'Status: Scanning',
    headline: 'Real-Time Heuristic Attack Detection',
    description:
      'Proactive monitoring that scans newly registered deceptive domains, suspicious download signatures, and known social engineering campaigns in real time.',
    takeaway: 'Early detection alerts you to emerging digital threats before they ever compromise endpoints.',
  },
  protected: {
    id: 'protected',
    name: 'Protected User & Digital Assets',
    category: 'core',
    badge: 'Status: Secure',
    headline: 'Hardened Security Perimeter',
    description:
      'The ultimate goal of defensive cybersecurity: safeguarding your digital identity, personal accounts, study documents, devices, and peace of mind.',
    takeaway: 'Proactive digital habits protect you, your family, and your devices across the entire internet.',
  },
};

interface NodeCoordinate {
  x: number;
  y: number;
  svgX: number;
  svgY: number;
}

const NODE_COORDINATES: Record<string, NodeCoordinate> = {
  ingress: { x: 50, y: 7.8, svgX: 250, svgY: 26 },
  phishing: { x: 18, y: 24.2, svgX: 90, svgY: 80 },
  scams: { x: 50, y: 24.2, svgX: 250, svgY: 80 },
  malware: { x: 82, y: 24.2, svgX: 410, svgY: 80 },
  radar: { x: 50, y: 40.6, svgX: 250, svgY: 134 },
  central: { x: 50, y: 57.0, svgX: 250, svgY: 188 },
  mfa: { x: 18, y: 75.2, svgX: 90, svgY: 248 },
  passwords: { x: 50, y: 75.2, svgX: 250, svgY: 248 },
  awareness: { x: 82, y: 75.2, svgX: 410, svgY: 248 },
  protected: { x: 50, y: 92.1, svgX: 250, svgY: 304 },
};

export const CyberDefenseCommandCenter: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('central');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'inspector' | 'snapshot'>('inspector');

  const activeId = hoveredNode || selectedNode;
  const currentDetail = NODE_DETAILS[activeId] || NODE_DETAILS.central;

  return (
    <div className="relative w-full max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto rounded-3xl bg-slate-950/90 border border-slate-800/90 shadow-2xl shadow-cyan-950/40 overflow-hidden backdrop-blur-xl transition-all">
      {/* Top Header Strip with Radar Status */}
      <div className="px-4 sm:px-6 py-3.5 border-b border-slate-800/90 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
          </div>
          <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-100">
            Cyber Defense Command Center
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-700/80">
            <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
            SIMULATION ACTIVE
          </span>
        </div>
      </div>

      {/* Main Interactive Diagram Canvas */}
      <div className="p-3 sm:p-5 relative">
        {/* Subtle Ambient Background Grids */}
        <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

        {/* Student Interactive Guidance Tip */}
        <div className="mb-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 flex items-center justify-between text-xs text-slate-300">
          <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Interactive Defense Map</span>
          </span>
          <span className="text-[11px] sm:text-xs font-mono text-slate-400">
            Click any node below to inspect concepts & rules 👆
          </span>
        </div>

        {/* SVG Flow Connections */}
        <div className="relative w-full aspect-[500/330] flex items-center justify-center select-none">
          <svg
            viewBox="0 0 500 330"
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none select-none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="cmd_threatGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.4" />
              </linearGradient>

              <linearGradient id="cmd_defenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
              </linearGradient>

              <radialGradient id="cmd_centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Central Defensive Core Aura Background */}
            <circle
              cx="250"
              cy="188"
              r="34"
              fill="url(#cmd_centerGlow)"
            />
            <circle
              cx="250"
              cy="188"
              r="26"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="0.8"
              strokeDasharray="2 3"
              strokeOpacity="0.4"
            />

            {/* Radar Sweep Arc Ring behind Threat Radar */}
            <circle
              cx="250"
              cy="134"
              r="18"
              fill="none"
              stroke="#f97316"
              strokeWidth="0.9"
              strokeOpacity="0.45"
              strokeDasharray="3 3"
            />
            <circle
              cx="250"
              cy="134"
              r="8"
              fill="#f97316"
              fillOpacity="0.12"
            />

            {/* 1. Ingress (250, 26) to Threats (90, 80 | 250, 80 | 410, 80) */}
            <line x1="250" y1="26" x2="90" y2="80" stroke="#f43f5e" strokeWidth="1.2" strokeOpacity="0.25" strokeLinecap="round" />
            <line x1="250" y1="26" x2="250" y2="80" stroke="#f97316" strokeWidth="1.2" strokeOpacity="0.25" strokeLinecap="round" />
            <line x1="250" y1="26" x2="410" y2="80" stroke="#f43f5e" strokeWidth="1.2" strokeOpacity="0.25" strokeLinecap="round" />

            {/* Live Flow Streams */}
            <line
              x1="250"
              y1="26"
              x2="90"
              y2="80"
              stroke="#f43f5e"
              strokeWidth={activeId === 'phishing' ? 2.4 : 1.6}
              strokeOpacity={activeId === 'phishing' ? 0.95 : 0.65}
              className="animate-cyber-flow"
              strokeLinecap="round"
            />
            <line
              x1="250"
              y1="26"
              x2="250"
              y2="80"
              stroke="#f97316"
              strokeWidth={activeId === 'scams' ? 2.4 : 1.6}
              strokeOpacity={activeId === 'scams' ? 0.95 : 0.65}
              className="animate-cyber-flow"
              strokeLinecap="round"
            />
            <line
              x1="250"
              y1="26"
              x2="410"
              y2="80"
              stroke="#f43f5e"
              strokeWidth={activeId === 'malware' ? 2.4 : 1.6}
              strokeOpacity={activeId === 'malware' ? 0.95 : 0.65}
              className="animate-cyber-flow"
              strokeLinecap="round"
            />

            {/* Flow Packets */}
            <circle r="2.2" fill="#f43f5e" opacity="0.9">
              <animateMotion dur="2.4s" repeatCount="indefinite" path="M 250 26 L 90 80" />
            </circle>
            <circle r="2.2" fill="#f97316" opacity="0.9">
              <animateMotion dur="2.1s" repeatCount="indefinite" path="M 250 26 L 250 80" />
            </circle>
            <circle r="2.2" fill="#f43f5e" opacity="0.9">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 250 26 L 410 80" />
            </circle>

            {/* 2. Threats (90, 80 | 250, 80 | 410, 80) down to Threat Radar Hub (250, 134) */}
            <line x1="90" y1="80" x2="250" y2="134" stroke="#f97316" strokeWidth="1.2" strokeOpacity="0.25" strokeLinecap="round" />
            <line x1="250" y1="80" x2="250" y2="134" stroke="#f97316" strokeWidth="1.2" strokeOpacity="0.25" strokeLinecap="round" />
            <line x1="410" y1="80" x2="250" y2="134" stroke="#f97316" strokeWidth="1.2" strokeOpacity="0.25" strokeLinecap="round" />

            {/* Live Flow Streams */}
            <line
              x1="90"
              y1="80"
              x2="250"
              y2="134"
              stroke="#f97316"
              strokeWidth={activeId === 'phishing' ? 2.4 : 1.5}
              strokeOpacity={activeId === 'phishing' ? 0.95 : 0.6}
              className="animate-cyber-flow"
              strokeLinecap="round"
            />
            <line
              x1="250"
              y1="80"
              x2="250"
              y2="134"
              stroke="#f97316"
              strokeWidth={activeId === 'scams' ? 2.4 : 1.5}
              strokeOpacity={activeId === 'scams' ? 0.95 : 0.6}
              className="animate-cyber-flow"
              strokeLinecap="round"
            />
            <line
              x1="410"
              y1="80"
              x2="250"
              y2="134"
              stroke="#f97316"
              strokeWidth={activeId === 'malware' ? 2.4 : 1.5}
              strokeOpacity={activeId === 'malware' ? 0.95 : 0.6}
              className="animate-cyber-flow"
              strokeLinecap="round"
            />

            {/* Flow Packets */}
            <circle r="2" fill="#f97316" opacity="0.85">
              <animateMotion dur="2.3s" repeatCount="indefinite" path="M 90 80 L 250 134" />
            </circle>
            <circle r="2" fill="#f97316" opacity="0.85">
              <animateMotion dur="2.0s" repeatCount="indefinite" path="M 250 80 L 250 134" />
            </circle>
            <circle r="2" fill="#f97316" opacity="0.85">
              <animateMotion dur="2.4s" repeatCount="indefinite" path="M 410 80 L 250 134" />
            </circle>

            {/* 3. Threat Radar Hub (250, 134) to Central Defense Core (250, 188) */}
            <line x1="250" y1="134" x2="250" y2="188" stroke="#00f0ff" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round" />
            <line
              x1="250"
              y1="134"
              x2="250"
              y2="188"
              stroke="#00f0ff"
              strokeWidth={activeId === 'central' ? 2.6 : 2}
              strokeOpacity={activeId === 'central' ? 1 : 0.8}
              className="animate-cyber-flow"
              strokeLinecap="round"
            />
            <circle r="2.5" fill="#00f0ff" opacity="0.95">
              <animateMotion dur="1.6s" repeatCount="indefinite" path="M 250 134 L 250 188" />
            </circle>

            {/* 4. Central Defense Core (250, 188) down to Defensive Nodes (90, 248 | 250, 248 | 410, 248) */}
            <line x1="250" y1="188" x2="90" y2="248" stroke="#00f0ff" strokeWidth="1.2" strokeOpacity="0.25" strokeLinecap="round" />
            <line x1="250" y1="188" x2="250" y2="248" stroke="#10b981" strokeWidth="1.2" strokeOpacity="0.25" strokeLinecap="round" />
            <line x1="250" y1="188" x2="410" y2="248" stroke="#00f0ff" strokeWidth="1.2" strokeOpacity="0.25" strokeLinecap="round" />

            {/* Live Flow Streams */}
            <line
              x1="250"
              y1="188"
              x2="90"
              y2="248"
              stroke="#00f0ff"
              strokeWidth={activeId === 'mfa' ? 2.4 : 1.6}
              strokeOpacity={activeId === 'mfa' ? 0.95 : 0.7}
              className="animate-cyber-flow"
              strokeLinecap="round"
            />
            <line
              x1="250"
              y1="188"
              x2="250"
              y2="248"
              stroke="#10b981"
              strokeWidth={activeId === 'passwords' ? 2.4 : 1.6}
              strokeOpacity={activeId === 'passwords' ? 0.95 : 0.7}
              className="animate-cyber-flow"
              strokeLinecap="round"
            />
            <line
              x1="250"
              y1="188"
              x2="410"
              y2="248"
              stroke="#00f0ff"
              strokeWidth={activeId === 'awareness' ? 2.4 : 1.6}
              strokeOpacity={activeId === 'awareness' ? 0.95 : 0.7}
              className="animate-cyber-flow"
              strokeLinecap="round"
            />

            {/* Flow Packets */}
            <circle r="2.2" fill="#00f0ff" opacity="0.9">
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M 250 188 L 90 248" />
            </circle>
            <circle r="2.2" fill="#10b981" opacity="0.9">
              <animateMotion dur="1.9s" repeatCount="indefinite" path="M 250 188 L 250 248" />
            </circle>
            <circle r="2.2" fill="#00f0ff" opacity="0.9">
              <animateMotion dur="2.3s" repeatCount="indefinite" path="M 250 188 L 410 248" />
            </circle>

            {/* 5. Defensive Nodes (90, 248 | 250, 248 | 410, 248) down to Protected User (250, 304) */}
            <line x1="90" y1="248" x2="250" y2="304" stroke="#10b981" strokeWidth="1.2" strokeOpacity="0.25" strokeLinecap="round" />
            <line x1="250" y1="248" x2="250" y2="304" stroke="#10b981" strokeWidth="1.2" strokeOpacity="0.25" strokeLinecap="round" />
            <line x1="410" y1="248" x2="250" y2="304" stroke="#10b981" strokeWidth="1.2" strokeOpacity="0.25" strokeLinecap="round" />

            {/* Live Flow Streams */}
            <line
              x1="90"
              y1="248"
              x2="250"
              y2="304"
              stroke="#10b981"
              strokeWidth={activeId === 'mfa' ? 2.2 : 1.5}
              strokeOpacity={activeId === 'mfa' ? 0.95 : 0.65}
              className="animate-cyber-flow"
              strokeLinecap="round"
            />
            <line
              x1="250"
              y1="248"
              x2="250"
              y2="304"
              stroke="#10b981"
              strokeWidth={activeId === 'passwords' ? 2.2 : 1.5}
              strokeOpacity={activeId === 'passwords' ? 0.95 : 0.65}
              className="animate-cyber-flow"
              strokeLinecap="round"
            />
            <line
              x1="410"
              y1="248"
              x2="250"
              y2="304"
              stroke="#10b981"
              strokeWidth={activeId === 'awareness' ? 2.2 : 1.5}
              strokeOpacity={activeId === 'awareness' ? 0.95 : 0.65}
              className="animate-cyber-flow"
              strokeLinecap="round"
            />

            {/* Flow Packets */}
            <circle r="2.2" fill="#10b981" opacity="0.9">
              <animateMotion dur="2.3s" repeatCount="indefinite" path="M 90 248 L 250 304" />
            </circle>
            <circle r="2.2" fill="#10b981" opacity="0.9">
              <animateMotion dur="1.8s" repeatCount="indefinite" path="M 250 248 L 250 304" />
            </circle>
            <circle r="2.2" fill="#10b981" opacity="0.9">
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M 410 248 L 250 304" />
            </circle>

            {/* Glowing Anchor Junction Ports */}
            {[
              { cx: 250, cy: 26, color: '#f43f5e' },
              { cx: 90, cy: 80, color: '#f43f5e' },
              { cx: 250, cy: 80, color: '#f97316' },
              { cx: 410, cy: 80, color: '#f43f5e' },
              { cx: 250, cy: 134, color: '#f97316' },
              { cx: 250, cy: 188, color: '#00f0ff' },
              { cx: 90, cy: 248, color: '#00f0ff' },
              { cx: 250, cy: 248, color: '#10b981' },
              { cx: 410, cy: 248, color: '#00f0ff' },
              { cx: 250, cy: 304, color: '#10b981' },
            ].map((port, idx) => (
              <circle
                key={idx}
                cx={port.cx}
                cy={port.cy}
                r="3"
                fill={port.color}
                fillOpacity="0.85"
                stroke="#020617"
                strokeWidth="1.2"
              />
            ))}
          </svg>

          {/* TOP INGRESS NODE: INTERNET */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${NODE_COORDINATES.ingress.x}%`, top: `${NODE_COORDINATES.ingress.y}%` }}
          >
            <button
              type="button"
              onClick={() => setSelectedNode('ingress')}
              onMouseEnter={() => setHoveredNode('ingress')}
              onMouseLeave={() => setHoveredNode(null)}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-slate-900/95 border border-slate-600/90 text-xs sm:text-[13px] font-mono font-bold text-slate-200 shadow-md hover:border-cyan-400 hover:text-white transition-all cursor-pointer whitespace-nowrap"
              aria-label="Inspect Internet Ingress Node"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>INTERNET INGRESS</span>
            </button>
          </div>

          {/* ROW 1: THREAT NODES */}
          {/* PHISHING */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${NODE_COORDINATES.phishing.x}%`, top: `${NODE_COORDINATES.phishing.y}%` }}
          >
            <button
              onClick={() => setSelectedNode('phishing')}
              onMouseEnter={() => setHoveredNode('phishing')}
              onMouseLeave={() => setHoveredNode(null)}
              type="button"
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-[13px] font-mono font-black tracking-wider transition-all duration-200 border cursor-pointer whitespace-nowrap ${
                activeId === 'phishing'
                  ? 'bg-rose-950 border-rose-400 text-white shadow-xl shadow-rose-950/80 scale-105'
                  : 'bg-slate-900/95 border-rose-500/50 text-rose-200 hover:border-rose-400 hover:text-white'
              }`}
              aria-label="Inspect Phishing Threat Node"
            >
              <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 animate-pulse" />
              <span>PHISHING</span>
            </button>
          </div>

          {/* SCAMS */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${NODE_COORDINATES.scams.x}%`, top: `${NODE_COORDINATES.scams.y}%` }}
          >
            <button
              onClick={() => setSelectedNode('scams')}
              onMouseEnter={() => setHoveredNode('scams')}
              onMouseLeave={() => setHoveredNode(null)}
              type="button"
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-[13px] font-mono font-black tracking-wider transition-all duration-200 border cursor-pointer whitespace-nowrap ${
                activeId === 'scams'
                  ? 'bg-amber-950 border-amber-400 text-white shadow-xl shadow-amber-950/80 scale-105'
                  : 'bg-slate-900/95 border-amber-500/50 text-amber-200 hover:border-amber-400 hover:text-white'
              }`}
              aria-label="Inspect Online Scams Threat Node"
            >
              <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 animate-pulse" />
              <span>SCAMS</span>
            </button>
          </div>

          {/* MALWARE */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${NODE_COORDINATES.malware.x}%`, top: `${NODE_COORDINATES.malware.y}%` }}
          >
            <button
              onClick={() => setSelectedNode('malware')}
              onMouseEnter={() => setHoveredNode('malware')}
              onMouseLeave={() => setHoveredNode(null)}
              type="button"
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-[13px] font-mono font-black tracking-wider transition-all duration-200 border cursor-pointer whitespace-nowrap ${
                activeId === 'malware'
                  ? 'bg-rose-950 border-rose-400 text-white shadow-xl shadow-rose-950/80 scale-105'
                  : 'bg-slate-900/95 border-rose-500/50 text-rose-200 hover:border-rose-400 hover:text-white'
              }`}
              aria-label="Inspect Malware Threat Node"
            >
              <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 animate-pulse" />
              <span>MALWARE</span>
            </button>
          </div>

          {/* ROW 2: THREAT RADAR */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${NODE_COORDINATES.radar.x}%`, top: `${NODE_COORDINATES.radar.y}%` }}
          >
            <button
              type="button"
              onClick={() => setSelectedNode('radar')}
              onMouseEnter={() => setHoveredNode('radar')}
              onMouseLeave={() => setHoveredNode(null)}
              className={`flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-mono uppercase font-bold transition-all border shadow-md cursor-pointer whitespace-nowrap ${
                activeId === 'radar'
                  ? 'bg-amber-950 border-amber-400 text-white scale-105 shadow-amber-900/60'
                  : 'bg-slate-900/95 border-amber-500/60 text-amber-300 hover:border-amber-400 hover:text-white'
              }`}
              aria-label="Inspect Threat Radar Node"
            >
              <Radio className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>THREAT RADAR</span>
            </button>
          </div>

          {/* ROW 3: CENTRAL CYBER DEFENSE NODE */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${NODE_COORDINATES.central.x}%`, top: `${NODE_COORDINATES.central.y}%` }}
          >
            <button
              onClick={() => setSelectedNode('central')}
              onMouseEnter={() => setHoveredNode('central')}
              onMouseLeave={() => setHoveredNode(null)}
              type="button"
              className={`group flex items-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-mono font-black tracking-wider transition-all duration-300 border cursor-pointer whitespace-nowrap ${
                activeId === 'central'
                  ? 'bg-cyan-950 border-cyan-400 text-white shadow-2xl shadow-cyan-500/40 scale-105'
                  : 'bg-slate-900/95 border-cyan-500/60 text-cyan-200 hover:border-cyan-300 hover:text-white'
              }`}
              aria-label="Inspect Cyber Defense Core Node"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-cyan-300 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-left">
                <div className="leading-none text-[10px] sm:text-[11px] text-cyan-300 font-semibold tracking-wider">DEFENSE ACTIVE</div>
                <div className="leading-tight text-white font-extrabold mt-0.5">CYBER DEFENSE</div>
              </div>
            </button>
          </div>

          {/* ROW 4: DEFENSE NODES */}
          {/* MFA */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${NODE_COORDINATES.mfa.x}%`, top: `${NODE_COORDINATES.mfa.y}%` }}
          >
            <button
              onClick={() => setSelectedNode('mfa')}
              onMouseEnter={() => setHoveredNode('mfa')}
              onMouseLeave={() => setHoveredNode(null)}
              type="button"
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-[13px] font-mono font-black tracking-wider transition-all duration-200 border cursor-pointer whitespace-nowrap ${
                activeId === 'mfa'
                  ? 'bg-cyan-950 border-cyan-400 text-white shadow-xl shadow-cyan-950/80 scale-105'
                  : 'bg-slate-900/95 border-cyan-500/50 text-cyan-200 hover:border-cyan-400 hover:text-white'
              }`}
              aria-label="Inspect MFA Defense Node"
            >
              <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              <span>MFA</span>
            </button>
          </div>

          {/* PASSWORDS */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${NODE_COORDINATES.passwords.x}%`, top: `${NODE_COORDINATES.passwords.y}%` }}
          >
            <button
              onClick={() => setSelectedNode('passwords')}
              onMouseEnter={() => setHoveredNode('passwords')}
              onMouseLeave={() => setHoveredNode(null)}
              type="button"
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-[13px] font-mono font-black tracking-wider transition-all duration-200 border cursor-pointer whitespace-nowrap ${
                activeId === 'passwords'
                  ? 'bg-cyan-950 border-cyan-400 text-white shadow-xl shadow-cyan-950/80 scale-105'
                  : 'bg-slate-900/95 border-cyan-500/50 text-cyan-200 hover:border-cyan-400 hover:text-white'
              }`}
              aria-label="Inspect Password Security Node"
            >
              <Key className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              <span>PASSWORDS</span>
            </button>
          </div>

          {/* AWARENESS */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${NODE_COORDINATES.awareness.x}%`, top: `${NODE_COORDINATES.awareness.y}%` }}
          >
            <button
              onClick={() => setSelectedNode('awareness')}
              onMouseEnter={() => setHoveredNode('awareness')}
              onMouseLeave={() => setHoveredNode(null)}
              type="button"
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-[13px] font-mono font-black tracking-wider transition-all duration-200 border cursor-pointer whitespace-nowrap ${
                activeId === 'awareness'
                  ? 'bg-emerald-950 border-emerald-400 text-white shadow-xl shadow-emerald-950/80 scale-105'
                  : 'bg-slate-900/95 border-emerald-500/50 text-emerald-200 hover:border-emerald-400 hover:text-white'
              }`}
              aria-label="Inspect Security Awareness Node"
            >
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span>AWARENESS</span>
            </button>
          </div>

          {/* BOTTOM ENDPOINT NODE: PROTECTED USER */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${NODE_COORDINATES.protected.x}%`, top: `${NODE_COORDINATES.protected.y}%` }}
          >
            <button
              type="button"
              onClick={() => setSelectedNode('protected')}
              onMouseEnter={() => setHoveredNode('protected')}
              onMouseLeave={() => setHoveredNode(null)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/95 border border-emerald-500/70 text-xs sm:text-[13px] font-mono uppercase font-bold text-emerald-300 shadow-lg hover:border-emerald-400 hover:text-white transition-all cursor-pointer whitespace-nowrap"
              aria-label="Inspect Protected User & Assets Node"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>PROTECTED USER & ASSETS</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            STUDENT-CENTERED EDUCATIONAL INSPECTOR PANEL (High Legibility & Contrast)
            ========================================================================= */}
        <div className="mt-4 rounded-2xl bg-slate-900/95 border border-slate-800 p-4 sm:p-5 space-y-3 shadow-lg">
          {/* Tab buttons & Category Badge */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('inspector')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase transition-all ${
                  activeTab === 'inspector'
                    ? 'bg-cyan-950 border border-cyan-500/60 text-cyan-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Defense Inspector
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('snapshot')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase transition-all flex items-center gap-1.5 ${
                  activeTab === 'snapshot'
                    ? 'bg-cyan-950 border border-cyan-500/60 text-cyan-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Snapshot
              </button>
            </div>

            <span
              className={`text-[11px] sm:text-xs font-mono uppercase font-bold px-3 py-1 rounded-full border shadow-sm ${
                currentDetail.category === 'threat'
                  ? 'bg-rose-950/90 text-rose-200 border-rose-800'
                  : currentDetail.category === 'defense'
                  ? 'bg-cyan-950/90 text-cyan-200 border-cyan-800'
                  : 'bg-emerald-950/90 text-emerald-200 border-emerald-800'
              }`}
            >
              {currentDetail.badge}
            </span>
          </div>

          {/* Tab 1: Educational Node Inspector */}
          {activeTab === 'inspector' ? (
            <div className="space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-extrabold text-base sm:text-lg text-white tracking-tight">
                  {currentDetail.name}
                </span>
                <span className="text-xs sm:text-sm font-mono font-medium text-cyan-300">
                  {currentDetail.headline}
                </span>
              </div>
              <p className="text-xs sm:text-[13.5px] text-slate-200 leading-relaxed font-normal">
                {currentDetail.description}
              </p>

              {/* Highlighted Student Security Rule Box */}
              <div className="mt-3 p-3 sm:p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="font-bold text-cyan-300 block font-mono text-xs tracking-wider uppercase">
                    Student Security Habit
                  </span>
                  <span className="text-slate-100 text-xs sm:text-[13.5px] font-medium leading-relaxed block mt-0.5">
                    {currentDetail.takeaway}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Tab 2: Cyber Defense Snapshot Dashboard */
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-[13px] font-mono text-slate-200">
                    <span className="font-medium">Threat Awareness</span>
                    <span className="text-cyan-400 font-extrabold">85%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-cyan-400 rounded-full w-[85%]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-[13px] font-mono text-slate-200">
                    <span className="font-medium">Password Hygiene</span>
                    <span className="text-cyan-400 font-extrabold">75%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-cyan-400 rounded-full w-[75%]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-[13px] font-mono text-slate-200">
                    <span className="font-medium">MFA Defense Gate</span>
                    <span className="text-emerald-400 font-extrabold">95%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-emerald-400 rounded-full w-[95%]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-[13px] font-mono text-slate-200">
                    <span className="font-medium">Phishing Skepticism</span>
                    <span className="text-purple-400 font-extrabold">80%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-purple-400 rounded-full w-[80%]" />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] sm:text-xs text-slate-300 font-mono">
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  Practical student readiness indicators • Zero tracking
                </span>
                <span className="text-cyan-400 font-semibold">Interactive Sandbox</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
