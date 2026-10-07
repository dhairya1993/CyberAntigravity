'use client';

import React, { useState } from 'react';
import {
  Brain,
  ShieldAlert,
  ShieldCheck,
  Flame,
  Coins,
  Clock,
  Landmark,
} from 'lucide-react';

interface EmotionNode {
  id: string;
  name: string;
  subtitle: string;
  howScammersUseIt: string;
  whatDefenderShouldDo: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  stroke: string;
}

const EMOTION_NODES: EmotionNode[] = [
  {
    id: 'fear',
    name: 'FEAR',
    subtitle: 'Threats & Legal Panics',
    howScammersUseIt: 'Threatening imminent arrest, bank account termination, or public exposure to paralyze critical logic and force immediate compliance.',
    whatDefenderShouldDo: 'Recognize that fear is an artificial manipulation lever. Law enforcement and tax agencies never telephone targets demanding immediate cryptocurrency payments or gift cards.',
    icon: Flame,
    color: 'text-rose-400',
    stroke: '#f43f5e',
  },
  {
    id: 'greed',
    name: 'GREED',
    subtitle: 'Guaranteed Windfalls',
    howScammersUseIt: 'Promising 100% risk-free double-digit returns, unearned prize windfalls, or exclusive algorithmic trading software to trigger cognitive euphoria.',
    whatDefenderShouldDo: 'Remember the golden rule of online finance: if an investment claims zero risk and extraordinary profit, it is guaranteed fraud. Verify investment companies through national registries.',
    icon: Coins,
    color: 'text-emerald-400',
    stroke: '#10b981',
  },
  {
    id: 'urgency',
    name: 'URGENCY',
    subtitle: 'Manufactured Countdowns',
    howScammersUseIt: 'Creating artificial 10–30 minute deadlines ("Act now or your profile is permanently erased") to prevent the victim from seeking second opinions.',
    whatDefenderShouldDo: 'Deliberately refuse the rush. Step away from the device for 10 minutes. A genuine business or bank will never penalize you for taking reasonable time to verify.',
    icon: Clock,
    color: 'text-amber-400',
    stroke: '#f59e0b',
  },
  {
    id: 'authority',
    name: 'AUTHORITY',
    subtitle: 'Spoofed Institutions',
    howScammersUseIt: 'Exploiting natural human deference to power figures by posing as federal agents, tax directors, bank managers, or senior executives.',
    whatDefenderShouldDo: 'Demand independent credentials. Disconnect the call, find the verified public directory number of the organization independently, and call back directly.',
    icon: Landmark,
    color: 'text-cyan-400',
    stroke: '#00f0ff',
  },
];

export const SocialEngineeringVisual: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('fear');

  const activeNode = EMOTION_NODES.find((n) => n.id === selectedNodeId) || EMOTION_NODES[0];
  const ActiveIcon = activeNode.icon;

  return (
    <section id="psychology-of-scams" className="py-16 sm:py-24 relative bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/80 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Brain className="w-3.5 h-3.5 text-amber-400" />
            <span>Cognitive Vulnerability Mapping</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            The Psychology Behind Many Scams
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Criminals do not hack firewalls—they hack human emotion. Four psychological triggers fuel almost every social engineering attack. Click each node to inspect the manipulation and the defensive antidote.
          </p>
        </div>

        {/* Interactive Diagram & Analysis Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Central Interactive Diagram (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div className="text-center mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                Psychological Vector Network
              </span>
              <p className="text-xs text-slate-400 mt-0.5">Click any emotional node connecting to Social Engineering</p>
            </div>

            {/* Desktop Graphical Diagram (Radial layout) */}
            <div className="relative w-full aspect-[4/3] max-w-md mx-auto hidden sm:block">
              {/* Connecting Vector Lines */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Lines from 4 nodes to center (50, 50) */}
                <line x1="22" y1="24" x2="50" y2="50" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                <line x1="78" y1="24" x2="50" y2="50" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                <line x1="22" y1="76" x2="50" y2="50" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                <line x1="78" y1="76" x2="50" y2="50" stroke="#00f0ff" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                {/* Center Core Circle */}
                <circle cx="50" cy="50" r="16" fill="#0f172a" stroke="#00f0ff" strokeWidth="1.2" opacity="0.8" />
              </svg>

              {/* Central Core: SOCIAL ENGINEERING */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center">
                <div className="w-20 h-20 rounded-2xl bg-slate-950 border-2 border-cyan-400/80 shadow-lg shadow-cyan-500/20 flex flex-col items-center justify-center p-1">
                  <Brain className="w-6 h-6 text-cyan-400 animate-pulse" />
                  <span className="text-[9px] font-mono font-extrabold text-white leading-tight mt-1">
                    SOCIAL<br />ENGINEERING
                  </span>
                </div>
              </div>

              {/* Node 1: FEAR (Top-Left) */}
              <div className="absolute left-[22%] top-[24%] -translate-x-1/2 -translate-y-1/2 z-30">
                <NodeButton
                  node={EMOTION_NODES[0]}
                  isSelected={selectedNodeId === 'fear'}
                  onClick={() => setSelectedNodeId('fear')}
                />
              </div>

              {/* Node 2: GREED (Top-Right) */}
              <div className="absolute left-[78%] top-[24%] -translate-x-1/2 -translate-y-1/2 z-30">
                <NodeButton
                  node={EMOTION_NODES[1]}
                  isSelected={selectedNodeId === 'greed'}
                  onClick={() => setSelectedNodeId('greed')}
                />
              </div>

              {/* Node 3: URGENCY (Bottom-Left) */}
              <div className="absolute left-[22%] top-[76%] -translate-x-1/2 -translate-y-1/2 z-30">
                <NodeButton
                  node={EMOTION_NODES[2]}
                  isSelected={selectedNodeId === 'urgency'}
                  onClick={() => setSelectedNodeId('urgency')}
                />
              </div>

              {/* Node 4: AUTHORITY (Bottom-Right) */}
              <div className="absolute left-[78%] top-[76%] -translate-x-1/2 -translate-y-1/2 z-30">
                <NodeButton
                  node={EMOTION_NODES[3]}
                  isSelected={selectedNodeId === 'authority'}
                  onClick={() => setSelectedNodeId('authority')}
                />
              </div>
            </div>

            {/* Mobile Stacked Flow (No horizontal scroll) */}
            <div className="sm:hidden flex flex-col gap-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-400/60 text-center mb-2">
                <Brain className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
                <span className="font-mono text-xs font-bold text-white block">CENTRAL HUB: SOCIAL ENGINEERING</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {EMOTION_NODES.map((node) => (
                  <NodeButton
                    key={node.id}
                    node={node}
                    isSelected={selectedNodeId === node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    fullWidth
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Active Node Deep Dive Inspector (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-7 backdrop-blur-md shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center ${activeNode.color}`}>
                    <ActiveIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      Trigger Profile
                    </span>
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {activeNode.name}
                    </h3>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                  {activeNode.subtitle}
                </span>
              </div>

              {/* How scammers use it */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
                <span className="font-bold text-amber-300 flex items-center gap-1.5 font-mono uppercase">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  How Scammers Exploit This:
                </span>
                <p className="text-slate-300 pl-5 border-l border-amber-800/60 leading-relaxed">
                  {activeNode.howScammersUseIt}
                </p>
              </div>

              {/* What a defender should do */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/60 space-y-1.5 text-xs">
                <span className="font-bold text-emerald-300 flex items-center gap-1.5 font-mono uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  What a Defender Should Do:
                </span>
                <p className="text-emerald-100/90 pl-5 border-l border-emerald-800/60 leading-relaxed font-medium">
                  {activeNode.whatDefenderShouldDo}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface NodeButtonProps {
  node: EmotionNode;
  isSelected: boolean;
  onClick: () => void;
  fullWidth?: boolean;
}

const NodeButton: React.FC<NodeButtonProps> = ({ node, isSelected, onClick, fullWidth = false }) => {
  const Icon = node.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border transition-all duration-200 flex items-center gap-2 px-3 py-2 text-xs font-semibold cyber-focus-ring ${
        fullWidth ? 'w-full justify-center' : ''
      } ${
        isSelected
          ? 'bg-slate-900 border-white text-white shadow-lg scale-105'
          : 'bg-slate-950/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
      }`}
      aria-label={`Inspect ${node.name}`}
    >
      <Icon className={`w-4 h-4 ${node.color}`} />
      <span className="font-mono">{node.name}</span>
    </button>
  );
};
