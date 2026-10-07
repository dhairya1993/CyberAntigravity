'use client';

import React, { useState } from 'react';
import { ShieldCheck, User, Smartphone, Wifi, KeyRound, Database, AlertTriangle, ShieldAlert } from 'lucide-react';

type DefenseMode = 'protected' | 'warning' | 'threat';

interface DefenseNode {
  id: string;
  label: string;
  role: string;
  icon: React.ComponentType<{ className?: string }>;
  protectedState: string;
  warningState: string;
  threatState: string;
  x: number;
  y: number;
}

const NODES: DefenseNode[] = [
  {
    id: 'user',
    label: 'USER',
    role: 'Human Awareness',
    icon: User,
    protectedState: 'Skeptical of urgent unverified requests & deliberate verification.',
    warningState: 'Distracted browsing; clicking links without domain checks.',
    threatState: 'Social engineering and targeted spear-phishing attack incoming.',
    x: 50,
    y: 12,
  },
  {
    id: 'device',
    label: 'DEVICE',
    role: 'Endpoint Hardware',
    icon: Smartphone,
    protectedState: 'OS auto-updates enabled; screen locked; full-disk encryption active.',
    warningState: 'Unpatched OS updates pending for 30+ days; sideloaded software.',
    threatState: 'Malicious payload / infostealer trojan attempting execution.',
    x: 18,
    y: 42,
  },
  {
    id: 'network',
    label: 'NETWORK',
    role: 'Transport Layer',
    icon: Wifi,
    protectedState: 'WPA3 encrypted home Wi-Fi; strict HTTPS; DNS filtering.',
    warningState: 'Open public Wi-Fi without VPN or encrypted DNS routing.',
    threatState: 'Man-in-the-middle interception or rogue Wi-Fi access point.',
    x: 82,
    y: 42,
  },
  {
    id: 'account',
    label: 'ACCOUNT',
    role: 'Identity & Access',
    icon: KeyRound,
    protectedState: 'Hardware passkey or authenticator app (MFA) + long unique passphrase.',
    warningState: 'Password reused across two services; SMS MFA used as sole second factor.',
    threatState: 'Credential stuffing attack testing breached database passwords.',
    x: 30,
    y: 84,
  },
  {
    id: 'data',
    label: 'DATA',
    role: 'Records & Privacy',
    icon: Database,
    protectedState: '3-2-1 backup strategy with immutable offline snapshot + client-side encryption.',
    warningState: 'Single backup drive plugged in continuously; unencrypted export files.',
    threatState: 'Ransomware extortion attempting to encrypt local documents.',
    x: 70,
    y: 84,
  },
];

export const HeroDefenseEcosystemVisual: React.FC = () => {
  const [activeMode, setActiveMode] = useState<DefenseMode>('protected');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('user');

  const selectedNode = NODES.find((n) => n.id === selectedNodeId) || NODES[0];
  const SelectedIcon = selectedNode.icon;

  const modeColors = {
    protected: {
      text: 'text-cyan-400',
      border: 'border-cyan-500/50',
      bg: 'bg-cyan-950/40',
      badge: 'bg-cyan-950 text-cyan-300 border-cyan-800/80',
      stroke: '#00f0ff',
      glow: 'rgba(0, 240, 255, 0.25)',
      label: 'Protected (Cyan)',
    },
    warning: {
      text: 'text-amber-400',
      border: 'border-amber-500/50',
      bg: 'bg-amber-950/40',
      badge: 'bg-amber-950 text-amber-300 border-amber-800/80',
      stroke: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.25)',
      label: 'Warning (Amber)',
    },
    threat: {
      text: 'text-rose-400',
      border: 'border-rose-500/50',
      bg: 'bg-rose-950/40',
      badge: 'bg-rose-950 text-rose-300 border-rose-800/80',
      stroke: '#f43f5e',
      glow: 'rgba(244, 63, 94, 0.25)',
      label: 'Threat (Red)',
    },
  };

  const currentTheme = modeColors[activeMode];

  return (
    <div className="w-full rounded-2xl border border-slate-800/90 bg-slate-950/80 p-4 sm:p-5 text-left relative overflow-hidden backdrop-blur-md">
      {/* Visual Header with Mode Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block font-semibold">
            Interactive Ecosystem Vector
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
            <span>Defense Surface Flow</span>
            <span className="text-[10px] text-slate-400 font-mono">USER &rarr; DEVICE &rarr; NETWORK &rarr; ACCOUNT &rarr; DATA</span>
          </h3>
        </div>

        {/* Status Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-[11px] self-start sm:self-auto" role="group" aria-label="Defense Mode Filter">
          <button
            type="button"
            onClick={() => setActiveMode('protected')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              activeMode === 'protected'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Protected
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('warning')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              activeMode === 'warning'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Warning
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('threat')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              activeMode === 'threat'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Threat
          </button>
        </div>
      </div>

      {/* Vector Illustration Canvas */}
      <div className="relative my-3 aspect-[16/10] sm:aspect-[16/9] w-full max-w-full rounded-xl bg-slate-900/40 border border-slate-800/60 overflow-hidden flex items-center justify-center">
        {/* Subtle SVG Grid & Vector Lines */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="shieldAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={currentTheme.stroke} stopOpacity="0.3" />
              <stop offset="100%" stopColor={currentTheme.stroke} stopOpacity="0" />
            </radialGradient>
            <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Central Shield Protection Aura */}
          <circle cx="50" cy="50" r="28" fill="url(#shieldAura)" />
          <circle
            cx="50"
            cy="50"
            r="24"
            fill="none"
            stroke={currentTheme.stroke}
            strokeWidth="0.5"
            strokeDasharray="2 2"
            opacity="0.4"
          />

          {/* Connected Network Vectors linking Center to all 5 nodes */}
          {NODES.map((node) => (
            <line
              key={node.id}
              x1="50"
              y1="50"
              x2={node.x}
              y2={node.y}
              stroke={currentTheme.stroke}
              strokeWidth={selectedNodeId === node.id ? '1.2' : '0.6'}
              strokeDasharray={activeMode === 'protected' ? 'none' : '2 2'}
              opacity={selectedNodeId === node.id ? 0.9 : 0.4}
              filter="url(#vectorGlow)"
            />
          ))}

          {/* Sequential Hierarchy Pipeline Vectors: User -> Device -> Network -> Account -> Data */}
          <path
            d="M 50 12 L 18 42 L 82 42 L 30 84 L 70 84"
            fill="none"
            stroke="#334155"
            strokeWidth="0.5"
            strokeDasharray="1 2"
            opacity="0.5"
          />
        </svg>

        {/* Central Protective Security Shield Core */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center"
        >
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-950/95 border-2 flex flex-col items-center justify-center transition-all duration-300 shadow-xl ${currentTheme.border}`}
            style={{ boxShadow: `0 0 20px ${currentTheme.glow}` }}
          >
            {activeMode === 'threat' ? (
              <ShieldAlert className="w-7 h-7 text-rose-400 animate-pulse" />
            ) : activeMode === 'warning' ? (
              <AlertTriangle className="w-7 h-7 text-amber-400" />
            ) : (
              <ShieldCheck className="w-7 h-7 text-cyan-400" />
            )}
            <span className="text-[9px] font-mono font-bold text-white mt-0.5">SHIELD</span>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full mt-1.5 bg-slate-900 border border-slate-700/80 text-slate-300">
            {activeMode.toUpperCase()}
          </span>
        </div>

        {/* 5 Surrounding Interactive Nodes */}
        {NODES.map((node) => {
          const NodeIcon = node.icon;
          const isSelected = selectedNodeId === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedNodeId(node.id)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-xl border transition-all duration-200 flex flex-col items-center gap-1 group cyber-focus-ring ${
                isSelected
                  ? `bg-slate-900/95 ${currentTheme.border} shadow-lg scale-110`
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                boxShadow: isSelected ? `0 0 12px ${currentTheme.glow}` : undefined,
              }}
              aria-label={`Inspect ${node.label} node details`}
            >
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center ${
                  isSelected ? currentTheme.text : 'text-slate-400 group-hover:text-slate-200'
                }`}
              >
                <NodeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-200 leading-none">
                {node.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Node Status Card */}
      <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 text-xs">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className={`p-1 rounded bg-slate-950 border border-slate-800 ${currentTheme.text}`}>
              <SelectedIcon className="w-3.5 h-3.5" />
            </span>
            <span className="font-bold text-white">{selectedNode.label}</span>
            <span className="text-[10px] text-slate-400 font-mono">({selectedNode.role})</span>
          </div>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${currentTheme.badge}`}>
            {currentTheme.label}
          </span>
        </div>

        <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
          {activeMode === 'protected' && selectedNode.protectedState}
          {activeMode === 'warning' && selectedNode.warningState}
          {activeMode === 'threat' && selectedNode.threatState}
        </p>
      </div>
    </div>
  );
};
