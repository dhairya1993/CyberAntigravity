'use client';

import React, { useState } from 'react';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Smartphone,
  Laptop,
  Cloud,
  Globe,
  Mail,
  Server,
  Key,
  Eye,
  AlertTriangle,
  Fingerprint,
  Info
} from 'lucide-react';

type NodeType = 'infrastructure' | 'threat' | 'defense';

interface NetworkNode {
  id: string;
  label: string;
  type: NodeType;
  category: string;
  level: string; // e.g., 'Critical', 'High', 'Essential', 'Strong'
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number; // percentage
  y: number; // percentage
}

const NODES: NetworkNode[] = [
  // Infrastructure Nodes
  {
    id: 'user-device',
    label: 'User Device',
    type: 'infrastructure',
    category: 'End Target',
    level: 'Core Asset',
    description: 'Endpoint workstations, personal laptops, and home devices holding local files and active sessions.',
    icon: Laptop,
    x: 50,
    y: 84,
  },
  {
    id: 'cloud',
    label: 'Cloud Infrastructure',
    type: 'infrastructure',
    category: 'Service Host',
    level: 'Central Host',
    description: 'Cloud storage, identity providers, and synchronized backup repositories.',
    icon: Cloud,
    x: 82,
    y: 28,
  },
  {
    id: 'web',
    label: 'Web Traffic',
    type: 'infrastructure',
    category: 'Transport',
    level: 'Public Layer',
    description: 'External websites, search engines, and browser-facing web connections.',
    icon: Globe,
    x: 50,
    y: 12,
  },
  {
    id: 'email',
    label: 'Email Gateway',
    type: 'infrastructure',
    category: 'Messaging',
    level: 'High Exposure',
    description: 'Inbound communications, calendar invites, and direct messaging channels.',
    icon: Mail,
    x: 18,
    y: 28,
  },
  {
    id: 'mobile',
    label: 'Mobile Device',
    type: 'infrastructure',
    category: 'Mobile Node',
    level: 'Hybrid Asset',
    description: 'Personal smartphones receiving SMS tokens, push notifications, and authenticator codes.',
    icon: Smartphone,
    x: 18,
    y: 68,
  },
  {
    id: 'server',
    label: 'Auth Server',
    type: 'infrastructure',
    category: 'Backend',
    level: 'Protected Core',
    description: 'Central credential stores, SSO directories, and session validation backends.',
    icon: Server,
    x: 82,
    y: 68,
  },

  // Threat Nodes
  {
    id: 'phishing',
    label: 'Phishing',
    type: 'threat',
    category: 'Social Deception',
    level: 'Critical Risk',
    description: 'Fraudulent messages crafted to trick users into divulging passwords or session tokens.',
    icon: ShieldAlert,
    x: 28,
    y: 16,
  },
  {
    id: 'malware',
    label: 'Malware',
    type: 'threat',
    category: 'Code Execution',
    level: 'High Risk',
    description: 'Malicious scripts, illicit downloads, or spyware attempting to compromise system memory.',
    icon: AlertTriangle,
    x: 72,
    y: 16,
  },
  {
    id: 'credential-theft',
    label: 'Credential Theft',
    type: 'threat',
    category: 'Account Attack',
    level: 'Critical Risk',
    description: 'Brute-force, credential stuffing, and keylogging designed to hijack user identities.',
    icon: Key,
    x: 90,
    y: 48,
  },
  {
    id: 'scam',
    label: 'Online Scams',
    type: 'threat',
    category: 'Financial Fraud',
    level: 'High Risk',
    description: 'Urgent payment requests, impersonation schemes, and fraudulent customer support alerts.',
    icon: AlertTriangle,
    x: 10,
    y: 48,
  },

  // Defense Nodes
  {
    id: 'mfa',
    label: 'Multi-Factor Auth',
    type: 'defense',
    category: 'Identity Guard',
    level: 'Essential Shield',
    description: 'Requires an independent physical token or app code, stopping unauthorized logins even if passwords leak.',
    icon: Fingerprint,
    x: 36,
    y: 50,
  },
  {
    id: 'passwords',
    label: 'Password Hygiene',
    type: 'defense',
    category: 'Credential Defense',
    level: 'Strong Defense',
    description: 'Long, unique passphrases managed in encrypted vaults eliminate credential reuse cascades.',
    icon: Lock,
    x: 64,
    y: 50,
  },
  {
    id: 'awareness',
    label: 'User Awareness',
    type: 'defense',
    category: 'Human Firewall',
    level: 'Continuous Shield',
    description: 'Trained skepticism against urgent pretexts, unfamiliar senders, and suspicious attachments.',
    icon: Eye,
    x: 50,
    y: 36,
  },
  {
    id: 'privacy',
    label: 'Privacy Controls',
    type: 'defense',
    category: 'Data Protection',
    level: 'Active Defense',
    description: 'Granular permissions, tracker blocking, and minimal data exposure across public channels.',
    icon: ShieldCheck,
    x: 50,
    y: 66,
  },
];

export const CyberDefenseCenter: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<NetworkNode>(
    NODES.find((n) => n.id === 'mfa') || NODES[0]
  );
  const [filterType, setFilterType] = useState<'all' | 'threat' | 'defense'>('all');

  const filteredNodes = filterType === 'all' ? NODES : NODES.filter((n) => n.type === filterType || n.type === 'infrastructure');

  return (
    <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800/90 backdrop-blur-xl p-4 sm:p-6 shadow-2xl shadow-black/80 flex flex-col justify-between overflow-hidden">
      {/* Visual Accent Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
            <Shield className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 block">
              Cyber Defense Command Center
            </span>
            <span className="text-[11px] text-cyan-400 font-mono">
              Interactive Threat & Defense Architecture
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800 text-[11px]">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-2 py-0.5 rounded transition-colors ${
              filterType === 'all' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Nodes
          </button>
          <button
            type="button"
            onClick={() => setFilterType('threat')}
            className={`px-2 py-0.5 rounded transition-colors ${
              filterType === 'threat' ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Threats
          </button>
          <button
            type="button"
            onClick={() => setFilterType('defense')}
            className={`px-2 py-0.5 rounded transition-colors ${
              filterType === 'defense' ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Defenses
          </button>
        </div>
      </div>

      {/* Main Interactive Radar Stage (Desktop / Tablet) */}
      <div className="relative w-full h-[290px] sm:h-[320px] my-3 rounded-xl bg-slate-950/70 border border-slate-800/80 overflow-hidden">
        {/* Radar Rings & Grid */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[85%] h-[85%] rounded-full border border-cyan-500/10" />
          <div className="w-[60%] h-[60%] rounded-full border border-cyan-500/15" />
          <div className="w-[35%] h-[35%] rounded-full border border-cyan-500/20" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-500/10" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-500/10" />
        </div>

        {/* Dynamic Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          <defs>
            <linearGradient id="cyber-line-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="cyber-line-rose" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Infrastructure backbone */}
          <line x1="50%" y1="12%" x2="18%" y2="28%" stroke="url(#cyber-line-cyan)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50%" y1="12%" x2="82%" y2="28%" stroke="url(#cyber-line-cyan)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="18%" y1="28%" x2="18%" y2="68%" stroke="url(#cyber-line-cyan)" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="82%" y1="28%" x2="82%" y2="68%" stroke="url(#cyber-line-cyan)" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="18%" y1="68%" x2="50%" y2="84%" stroke="url(#cyber-line-cyan)" strokeWidth="1.5" />
          <line x1="82%" y1="68%" x2="50%" y2="84%" stroke="url(#cyber-line-cyan)" strokeWidth="1.5" />

          {/* Defense Shielding to User Device */}
          <line x1="36%" y1="50%" x2="50%" y2="84%" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="64%" y1="50%" x2="50%" y2="84%" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="50%" y1="66%" x2="50%" y2="84%" stroke="#00f0ff" strokeWidth="2" strokeOpacity="0.6" />

          {/* Threat interception lines */}
          <line x1="28%" y1="16%" x2="50%" y2="36%" stroke="url(#cyber-line-rose)" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="72%" y1="16%" x2="50%" y2="36%" stroke="url(#cyber-line-rose)" strokeWidth="1" strokeDasharray="2 2" />
        </svg>

        {/* Nodes Layer */}
        {filteredNodes.map((node) => {
          const isSelected = selectedNode.id === node.id;
          const Icon = node.icon;

          let badgeStyles = 'bg-slate-900 border-slate-700 text-slate-300 hover:border-cyan-400';
          if (node.type === 'threat') {
            badgeStyles = isSelected
              ? 'bg-rose-950 border-rose-500 text-rose-300 ring-2 ring-rose-500/50 scale-110'
              : 'bg-rose-950/70 border-rose-700/60 text-rose-300 hover:border-rose-400 hover:scale-105';
          } else if (node.type === 'defense') {
            badgeStyles = isSelected
              ? 'bg-emerald-950 border-emerald-400 text-emerald-300 ring-2 ring-emerald-500/50 scale-110'
              : 'bg-emerald-950/70 border-emerald-700/60 text-emerald-300 hover:border-emerald-400 hover:scale-105';
          } else if (isSelected) {
            badgeStyles = 'bg-cyan-950 border-cyan-400 text-cyan-200 ring-2 ring-cyan-500/50 scale-110';
          }

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedNode(node)}
              onMouseEnter={() => setSelectedNode(node)}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className={`absolute p-2 rounded-xl border transition-all duration-300 shadow-lg z-10 flex items-center justify-center group ${badgeStyles}`}
              title={`${node.label} (${node.category})`}
              aria-label={`${node.label} node - ${node.level}`}
            >
              <Icon className="w-4 h-4" />
              {/* Optional tiny indicator dot */}
              {node.type === 'threat' && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping opacity-75" />
              )}
              {node.type === 'defense' && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
              )}
            </button>
          );
        })}

        {/* Center Target User Label */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/90 px-2 py-0.5 rounded-full border border-slate-800 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Protected User Core
        </div>
      </div>

      {/* Selected Node Details Card (Educational Inspection Panel) */}
      <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-3.5 space-y-2 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                selectedNode.type === 'threat'
                  ? 'bg-rose-500'
                  : selectedNode.type === 'defense'
                  ? 'bg-emerald-400'
                  : 'bg-cyan-400'
              }`}
            />
            <span className="text-xs font-bold text-white tracking-wide">
              {selectedNode.label}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
              {selectedNode.category}
            </span>
          </div>

          <span
            className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
              selectedNode.type === 'threat'
                ? 'bg-rose-950/60 text-rose-300 border border-rose-800/60'
                : selectedNode.type === 'defense'
                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                : 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/60'
            }`}
          >
            {selectedNode.level}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {selectedNode.description}
        </p>

        <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <Info className="w-3 h-3 text-cyan-400" />
            Hover / tap nodes to inspect
          </span>
          <span className="text-slate-400">
            {selectedNode.type === 'threat' ? 'Threat Vector' : selectedNode.type === 'defense' ? 'Active Defense' : 'System Node'}
          </span>
        </div>
      </div>
    </div>
  );
};
