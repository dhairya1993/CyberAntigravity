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
    name: 'Phishing',
    category: 'threat',
    badge: 'Risk: High',
    headline: 'Deceptive Digital Lures',
    description:
      'Deceptive messages designed to trick users into revealing credentials, downloading malicious attachments, or taking urgent unsafe actions.',
    takeaway: 'Verify sender domains independently. Never trust unsolicited urgency or forged links.',
  },
  scams: {
    id: 'scams',
    name: 'Scams & Impersonation',
    category: 'threat',
    badge: 'Risk: High',
    headline: 'Psychological Manipulation',
    description:
      'Learn to recognize social manipulation, fake authority figures, artificial panic, and fraudulent wire or payment requests.',
    takeaway: 'Pause and verify through an independent channel before sending money or private info.',
  },
  malware: {
    id: 'malware',
    name: 'Malware Defense',
    category: 'threat',
    badge: 'Risk: Critical',
    headline: 'Malicious Software Payloads',
    description:
      'Ransomware, keyloggers, and spyware designed to infect workstations or compromise confidential system data.',
    takeaway: 'Keep operating systems patched and avoid opening unverified email attachments.',
  },
  mfa: {
    id: 'mfa',
    name: 'Multi-Factor Authentication',
    category: 'defense',
    badge: 'Protection: Essential',
    headline: 'Defense Beyond Passwords',
    description:
      'Adds an essential verification step (authenticator app or hardware passkey) so stolen passwords alone cannot breach your accounts.',
    takeaway: 'Enable authenticator apps or FIDO2 passkeys on every email, financial, and cloud account.',
  },
  passwords: {
    id: 'passwords',
    name: 'Password Security',
    category: 'defense',
    badge: 'Protection: Fundamental',
    headline: 'High-Entropy Passphrases',
    description:
      'Learn why unique, long multi-word passphrases stored in a password manager stop credential stuffing and brute-force cracking.',
    takeaway: 'Never reuse credentials across sites. Aim for 16+ characters or 4 random words.',
  },
  awareness: {
    id: 'awareness',
    name: 'Security Awareness',
    category: 'defense',
    badge: 'Protection: Core Habit',
    headline: 'The Human Firewall',
    description:
      'Critical thinking and defensive skepticism. Developing the habit of inspecting web addresses, verifying sources, and pausing under pressure.',
    takeaway: 'Your analytical judgment is the ultimate barrier against social engineering attacks.',
  },
  central: {
    id: 'central',
    name: 'Cyber Defense Active',
    category: 'core',
    badge: 'Status: Operational',
    headline: 'Layered Defensive Shield',
    description:
      'Proactive security architecture that intercepts incoming threats through multi-layered authentication, habit-based verification, and zero-trust controls.',
    takeaway: 'Defensive security is not a single product—it is a continuous layered habit.',
  },
};

export const CyberDefenseCommandCenter: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('central');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'inspector' | 'snapshot'>('inspector');

  const activeId = hoveredNode || selectedNode;
  const currentDetail = NODE_DETAILS[activeId] || NODE_DETAILS.central;

  return (
    <div className="relative w-full max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto rounded-3xl bg-slate-950/85 border border-slate-800/90 shadow-2xl shadow-cyan-950/30 overflow-hidden backdrop-blur-xl transition-all">
      {/* Top Header Strip with Radar Status */}
      <div className="px-4 sm:px-5 py-3 border-b border-slate-800/80 bg-slate-900/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </div>
          <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            Cyber Defense Command Center
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/80">
            <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-400" />
            SIMULATION ACTIVE
          </span>
        </div>
      </div>

      {/* Main Interactive Diagram Canvas (Streamlined vertical height) */}
      <div className="p-3 sm:p-4 relative">
        {/* Subtle Ambient Background Grids */}
        <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

        {/* SVG Flow Connections */}
        <div className="relative w-full aspect-[4/2.6] sm:aspect-[4/2.5] flex items-center justify-center">
          <svg
            viewBox="0 0 460 270"
            className="w-full h-full overflow-visible select-none"
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
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ingress from Top Internet to Threat Nodes */}
            <path
              d="M 230 16 L 90 52"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="1.6"
              strokeOpacity="0.6"
              className="animate-cyber-flow"
            />
            <path
              d="M 230 16 L 230 52"
              fill="none"
              stroke="#f97316"
              strokeWidth="1.6"
              strokeOpacity="0.6"
              className="animate-cyber-flow"
            />
            <path
              d="M 230 16 L 370 52"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="1.6"
              strokeOpacity="0.6"
              className="animate-cyber-flow"
            />

            {/* Threats down to Threat Radar Hub */}
            <path
              d="M 90 78 L 210 108"
              fill="none"
              stroke="#f97316"
              strokeWidth="1.3"
              strokeOpacity="0.5"
              strokeDasharray="4 3"
            />
            <path
              d="M 230 78 L 230 108"
              fill="none"
              stroke="#f97316"
              strokeWidth="1.3"
              strokeOpacity="0.5"
              strokeDasharray="4 3"
            />
            <path
              d="M 370 78 L 250 108"
              fill="none"
              stroke="#f97316"
              strokeWidth="1.3"
              strokeOpacity="0.5"
              strokeDasharray="4 3"
            />

            {/* Radar Hub to Central Defense Core */}
            <line
              x1="230"
              y1="120"
              x2="230"
              y2="145"
              stroke="#00f0ff"
              strokeWidth="2"
              strokeOpacity="0.8"
              className="animate-cyber-flow"
            />

            {/* Central Defense Core down to Defensive Nodes */}
            <path
              d="M 210 168 L 90 198"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="1.6"
              strokeOpacity="0.7"
              className="animate-cyber-flow"
            />
            <path
              d="M 230 176 L 230 198"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.6"
              strokeOpacity="0.7"
              className="animate-cyber-flow"
            />
            <path
              d="M 250 168 L 370 198"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="1.6"
              strokeOpacity="0.7"
              className="animate-cyber-flow"
            />

            {/* Defensive Nodes down to Protected User Endpoint */}
            <path
              d="M 90 224 L 210 248"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.4"
              strokeOpacity="0.6"
              strokeDasharray="3 3"
            />
            <path
              d="M 230 224 L 230 248"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.4"
              strokeOpacity="0.6"
              strokeDasharray="3 3"
            />
            <path
              d="M 370 224 L 250 248"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.4"
              strokeOpacity="0.6"
              strokeDasharray="3 3"
            />

            {/* Radar Sweep Arc Ring */}
            <circle
              cx="230"
              cy="114"
              r="14"
              fill="none"
              stroke="#f97316"
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <circle
              cx="230"
              cy="114"
              r="7"
              fill="#f97316"
              fillOpacity="0.15"
            />
          </svg>

          {/* TOP INGRESS NODE: INTERNET */}
          <div className="absolute top-[0%] left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-900 border border-slate-700/80 text-[10px] font-mono text-slate-300 shadow">
            <Globe className="w-3 h-3 text-cyan-400" />
            <span>INTERNET INGRESS</span>
          </div>

          {/* ROW 1: THREAT NODES */}
          <div className="absolute top-[16%] left-[6%]">
            <button
              onClick={() => setSelectedNode('phishing')}
              onMouseEnter={() => setHoveredNode('phishing')}
              onMouseLeave={() => setHoveredNode(null)}
              type="button"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold tracking-wider transition-all duration-200 border cursor-pointer ${
                activeId === 'phishing'
                  ? 'bg-rose-950/90 border-rose-400 text-rose-100 shadow-md shadow-rose-950/60 scale-105'
                  : 'bg-slate-900/90 border-rose-500/40 text-rose-300 hover:border-rose-400'
              }`}
              aria-label="Inspect Phishing Threat Node"
            >
              <AlertTriangle className="w-3 h-3 text-rose-400 animate-pulse" />
              <span>PHISHING</span>
            </button>
          </div>

          <div className="absolute top-[16%] left-1/2 -translate-x-1/2">
            <button
              onClick={() => setSelectedNode('scams')}
              onMouseEnter={() => setHoveredNode('scams')}
              onMouseLeave={() => setHoveredNode(null)}
              type="button"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold tracking-wider transition-all duration-200 border cursor-pointer ${
                activeId === 'scams'
                  ? 'bg-amber-950/90 border-amber-400 text-amber-100 shadow-md shadow-amber-950/60 scale-105'
                  : 'bg-slate-900/90 border-amber-500/40 text-amber-300 hover:border-amber-400'
              }`}
              aria-label="Inspect Online Scams Threat Node"
            >
              <ShieldAlert className="w-3 h-3 text-amber-400 animate-pulse" />
              <span>SCAMS</span>
            </button>
          </div>

          <div className="absolute top-[16%] right-[6%]">
            <button
              onClick={() => setSelectedNode('malware')}
              onMouseEnter={() => setHoveredNode('malware')}
              onMouseLeave={() => setHoveredNode(null)}
              type="button"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold tracking-wider transition-all duration-200 border cursor-pointer ${
                activeId === 'malware'
                  ? 'bg-rose-950/90 border-rose-400 text-rose-100 shadow-md shadow-rose-950/60 scale-105'
                  : 'bg-slate-900/90 border-rose-500/40 text-rose-300 hover:border-rose-400'
              }`}
              aria-label="Inspect Malware Threat Node"
            >
              <AlertTriangle className="w-3 h-3 text-rose-400 animate-pulse" />
              <span>MALWARE</span>
            </button>
          </div>

          {/* ROW 2: THREAT RADAR */}
          <div className="absolute top-[38%] left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-[9px] font-mono uppercase font-bold text-amber-300 shadow">
            <Radio className="w-2.5 h-2.5 text-amber-400 animate-spin" />
            <span>THREAT RADAR</span>
          </div>

          {/* ROW 3: CENTRAL CYBER DEFENSE NODE */}
          <div className="absolute top-[54%] left-1/2 -translate-x-1/2">
            <button
              onClick={() => setSelectedNode('central')}
              onMouseEnter={() => setHoveredNode('central')}
              onMouseLeave={() => setHoveredNode(null)}
              type="button"
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-2xl text-[11px] font-mono font-extrabold tracking-wider transition-all duration-300 border cursor-pointer ${
                activeId === 'central'
                  ? 'bg-cyan-950 border-cyan-400 text-white shadow-xl shadow-cyan-500/30 scale-105'
                  : 'bg-slate-900/95 border-cyan-500/50 text-cyan-300 hover:border-cyan-300'
              }`}
              aria-label="Inspect Cyber Defense Core Node"
            >
              <div className="w-5 h-5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-300 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-left">
                <div className="leading-none text-[10px] text-cyan-400 font-normal">DEFENSE ACTIVE</div>
                <div className="leading-tight">CYBER DEFENSE</div>
              </div>
            </button>
          </div>

          {/* ROW 4: DEFENSE NODES */}
          <div className="absolute top-[72%] left-[6%]">
            <button
              onClick={() => setSelectedNode('mfa')}
              onMouseEnter={() => setHoveredNode('mfa')}
              onMouseLeave={() => setHoveredNode(null)}
              type="button"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold tracking-wider transition-all duration-200 border cursor-pointer ${
                activeId === 'mfa'
                  ? 'bg-cyan-950/90 border-cyan-400 text-cyan-100 shadow-md shadow-cyan-950/60 scale-105'
                  : 'bg-slate-900/90 border-cyan-500/40 text-cyan-300 hover:border-cyan-400'
              }`}
              aria-label="Inspect MFA Defense Node"
            >
              <Smartphone className="w-3 h-3 text-cyan-400" />
              <span>MFA</span>
            </button>
          </div>

          <div className="absolute top-[72%] left-1/2 -translate-x-1/2">
            <button
              onClick={() => setSelectedNode('passwords')}
              onMouseEnter={() => setHoveredNode('passwords')}
              onMouseLeave={() => setHoveredNode(null)}
              type="button"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold tracking-wider transition-all duration-200 border cursor-pointer ${
                activeId === 'passwords'
                  ? 'bg-cyan-950/90 border-cyan-400 text-cyan-100 shadow-md shadow-cyan-950/60 scale-105'
                  : 'bg-slate-900/90 border-cyan-500/40 text-cyan-300 hover:border-cyan-400'
              }`}
              aria-label="Inspect Password Security Node"
            >
              <Key className="w-3 h-3 text-cyan-400" />
              <span>PASSWORDS</span>
            </button>
          </div>

          <div className="absolute top-[72%] right-[6%]">
            <button
              onClick={() => setSelectedNode('awareness')}
              onMouseEnter={() => setHoveredNode('awareness')}
              onMouseLeave={() => setHoveredNode(null)}
              type="button"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold tracking-wider transition-all duration-200 border cursor-pointer ${
                activeId === 'awareness'
                  ? 'bg-emerald-950/90 border-emerald-400 text-emerald-100 shadow-md shadow-emerald-950/60 scale-105'
                  : 'bg-slate-900/90 border-emerald-500/40 text-emerald-300 hover:border-emerald-400'
              }`}
              aria-label="Inspect Security Awareness Node"
            >
              <Shield className="w-3 h-3 text-emerald-400" />
              <span>AWARENESS</span>
            </button>
          </div>

          {/* BOTTOM ENDPOINT NODE: PROTECTED USER */}
          <div className="absolute bottom-[0%] left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-900 border border-emerald-500/50 text-[10px] font-mono uppercase font-bold text-emerald-300 shadow">
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            <span>PROTECTED USER & ASSETS</span>
          </div>
        </div>

        {/* =========================================================================
            STREAMLINED BOTTOM PANEL (Tabbed Inspector vs Snapshot for height reduction)
            ========================================================================= */}
        <div className="mt-3 rounded-2xl bg-slate-900/90 border border-slate-800 p-3 space-y-2.5">
          {/* Tab buttons */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveTab('inspector')}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all ${
                  activeTab === 'inspector'
                    ? 'bg-cyan-950 border border-cyan-500/50 text-cyan-300'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Node Inspector
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('snapshot')}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all flex items-center gap-1 ${
                  activeTab === 'snapshot'
                    ? 'bg-cyan-950 border border-cyan-500/50 text-cyan-300'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3 h-3" />
                Snapshot
              </button>
            </div>

            <span
              className={`text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${
                currentDetail.category === 'threat'
                  ? 'bg-rose-950 text-rose-300 border-rose-800'
                  : currentDetail.category === 'defense'
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                  : 'bg-emerald-950 text-emerald-300 border-emerald-800'
              }`}
            >
              {currentDetail.badge}
            </span>
          </div>

          {/* Tab 1: Educational Node Inspector */}
          {activeTab === 'inspector' ? (
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white tracking-tight">
                  {currentDetail.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {currentDetail.headline}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {currentDetail.description}
              </p>
              <div className="pt-1.5 border-t border-slate-800 flex items-start gap-1 text-[10px] text-cyan-300">
                <span className="font-bold text-slate-400 shrink-0">Defense Rule:</span>
                <span>{currentDetail.takeaway}</span>
              </div>
            </div>
          ) : (
            /* Tab 2: Cyber Defense Snapshot Dashboard (Specification 7) */
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-300">
                    <span>Threat Awareness</span>
                    <span className="text-cyan-400 font-bold">80%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-cyan-400 rounded-full w-[80%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-300">
                    <span>Password Hygiene</span>
                    <span className="text-cyan-400 font-bold">70%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-cyan-400 rounded-full w-[70%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-300">
                    <span>MFA Awareness</span>
                    <span className="text-emerald-400 font-bold">90%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-emerald-400 rounded-full w-[90%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-300">
                    <span>Privacy Awareness</span>
                    <span className="text-purple-400 font-bold">60%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-purple-400 rounded-full w-[60%]" />
                  </div>
                </div>
              </div>

              <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Info className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                  Educational indicators • Zero telemetry
                </span>
                <span>Client Sandbox</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
