'use client';

import React, { useState } from 'react';
import {
  ArrowDown,
  Layers,
  Sparkles,
  UserCheck,
  Zap,
  Building2,
  ExternalLink,
  KeyRound,
  AlertOctagon,
  CheckCircle2,
} from 'lucide-react';

interface AnatomyNode {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  explanation: string;
  defenseKey: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const NODES: AnatomyNode[] = [
  {
    id: 'impersonation',
    number: '01',
    title: 'IMPERSONATION',
    subtitle: 'Brand & Identity Masking',
    explanation:
      'Attackers disguise their headers, emails, and display names as trusted brands, banks, employers, or government departments.',
    defenseKey: 'Verify sender identity independently through official directories.',
    icon: UserCheck,
    accentColor: 'border-cyan-500/70 text-cyan-300 bg-cyan-950/40',
  },
  {
    id: 'urgency',
    number: '02',
    title: 'URGENCY',
    subtitle: 'Speed & Time Crunch',
    explanation:
      'Imposing an immediate deadline (15–30 minutes) creates synthetic panic designed to bypass critical analytical reasoning.',
    defenseKey: 'Pause and take 5 minutes. Legitimate institutions do not demand split-second verification.',
    icon: Zap,
    accentColor: 'border-rose-500/70 text-rose-300 bg-rose-950/40',
  },
  {
    id: 'authority',
    number: '03',
    title: 'AUTHORITY',
    subtitle: 'Institutional Pressure',
    explanation:
      'Leveraging legal, regulatory, or corporate authority to intimidate the victim into compliance without question.',
    defenseKey: 'Question claims of immediate enforcement; always seek official written notices.',
    icon: Building2,
    accentColor: 'border-purple-500/70 text-purple-300 bg-purple-950/40',
  },
  {
    id: 'suspicious-link',
    number: '04',
    title: 'SUSPICIOUS LINK',
    subtitle: 'Deceptive Hyperlinks',
    explanation:
      'Links that subtly alter character order, use alternative TLDs, or hide behind URL shorteners to obscure the malicious endpoint.',
    defenseKey: 'Inspect full URLs manually; do not click unverified links from unexpected messages.',
    icon: ExternalLink,
    accentColor: 'border-amber-500/70 text-amber-300 bg-amber-950/40',
  },
  {
    id: 'info-request',
    number: '05',
    title: 'INFORMATION REQUEST',
    subtitle: 'Credential Exfiltration',
    explanation:
      'The phishing form directly prompts for usernames, passwords, card PINs, or Multi-Factor Authentication (MFA) codes.',
    defenseKey: 'Never enter passwords or MFA one-time codes on forms accessed from message links.',
    icon: KeyRound,
    accentColor: 'border-emerald-500/70 text-emerald-300 bg-emerald-950/40',
  },
  {
    id: 'consequence-threat',
    number: '06',
    title: 'CONSEQUENCE THREAT',
    subtitle: 'Fear of Account Loss',
    explanation:
      'Threatening account deletion, legal penalties, frozen payrolls, or police action if the victim fails to respond immediately.',
    defenseKey: 'Recognize catastrophic threats as a hallmark of social engineering manipulation.',
    icon: AlertOctagon,
    accentColor: 'border-rose-600/70 text-rose-300 bg-rose-950/40',
  },
];

const FLOW_STEPS = [
  { id: '1', label: 'MESSAGE', desc: 'Inbound lure arrives' },
  { id: '2', label: 'EMOTIONAL TRIGGER', desc: 'Panic or curiosity evoked' },
  { id: '3', label: 'CLICK', desc: 'Victim engages with deceptive link' },
  { id: '4', label: 'FAKE DESTINATION', desc: 'Cloned phishing form displayed' },
  { id: '5', label: 'DATA / MONEY / ACCOUNT RISK', desc: 'Credentials or funds exfiltrated' },
];

export const PhishingAnatomyVisual: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<AnatomyNode>(NODES[0]);

  return (
    <section id="anatomy-section" className="py-16 sm:py-20 bg-[#07090e] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-800/80 bg-purple-950/40 text-purple-300 text-xs font-mono uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-purple-400" aria-hidden={true} />
            ATTACK ARCHITECTURE
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Anatomy of a Phishing Attack
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Every phishing attack follows a structured exploitation sequence. Click on the surrounding tactical nodes to inspect each component.
          </p>
        </div>

        {/* Central Visual Sequence: MESSAGE -> TRIGGER -> CLICK -> DESTINATION -> RISK */}
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 sm:p-8 backdrop-blur-sm space-y-6">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest text-center">
            LINEAR EXPLOITATION PIPELINE
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {FLOW_STEPS.map((step, idx) => (
              <div key={step.id} className="relative flex flex-col items-center">
                <div className="w-full p-4 rounded-xl border border-slate-800 bg-slate-900/70 text-center space-y-1.5 hover:border-cyan-500/50 transition-colors">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">
                    STEP 0{idx + 1}
                  </span>
                  <div className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                    {step.label}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {step.desc}
                  </div>
                </div>

                {/* Arrow to next item (Desktop right arrow / Mobile down arrow) */}
                {idx < FLOW_STEPS.length - 1 && (
                  <div
                    className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-cyan-500 font-mono text-xs"
                    aria-hidden={true}
                  >
                    →
                  </div>
                )}
                {idx < FLOW_STEPS.length - 1 && (
                  <div
                    className="md:hidden flex justify-center py-1 text-cyan-500"
                    aria-hidden={true}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tactical Nodes: 6 Radial Nodes with Active Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 6 Clickable Nodes Grid (7 Cols on LG) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {NODES.map((node) => {
              const isSelected = selectedNode.id === node.id;
              const Icon = node.icon;

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between space-y-3 cyber-focus-ring group ${
                    isSelected
                      ? `border-cyan-400 bg-cyan-950/60 shadow-lg shadow-cyan-950/50 scale-[1.02]`
                      : `border-slate-800/90 bg-slate-950/80 hover:border-slate-700 hover:bg-slate-900/60`
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {node.number}
                    </span>
                    <div
                      className={`p-2 rounded-lg border ${
                        isSelected ? node.accentColor : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {node.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {node.subtitle}
                    </p>
                  </div>

                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                    Click to inspect &rarr;
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed Inspector Card (5 Cols on LG) */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-800 bg-slate-950/90 p-6 space-y-5 backdrop-blur-sm sticky top-36">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                TACTICAL MECHANIC DECONSTRUCTION
              </div>
              <span className="text-xs font-mono text-slate-400">
                NODE {selectedNode.number}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${selectedNode.accentColor}`}>
                  <selectedNode.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedNode.title}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {selectedNode.subtitle}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/70 text-sm text-slate-200 leading-relaxed">
                {selectedNode.explanation}
              </div>

              <div className="p-4 rounded-xl border border-emerald-900/50 bg-emerald-950/30 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  DEFENSIVE MITIGATION
                </div>
                <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
                  {selectedNode.defenseKey}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
