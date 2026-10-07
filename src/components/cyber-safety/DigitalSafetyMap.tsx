'use client';

import React, { useState } from 'react';
import {
  Smartphone,
  KeyRound,
  Wifi,
  Database,
  UserCheck,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  Layers,
} from 'lucide-react';

interface DigitalMapNode {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  practices: string[];
  whyImportant: string;
}

const NODES_DATA: Record<string, DigitalMapNode> = {
  data: {
    id: 'data',
    name: 'YOUR DATA',
    subtitle: 'Core Asset',
    category: 'Central Digital Core',
    icon: Database,
    practices: [
      'Backups (Follow the 3-2-1 rule)',
      'Encryption (At rest & in transit)',
      'Safe sharing (Revoke link permissions)',
    ],
    whyImportant: 'All digital attacks ultimately target your confidential data, documents, and financial assets.',
  },
  account: {
    id: 'account',
    name: 'ACCOUNT',
    subtitle: 'Access Gateway',
    category: 'Credential Security',
    icon: KeyRound,
    practices: [
      'MFA (Authenticator app or passkeys)',
      'Unique passwords (16+ chars via password manager)',
      'Recovery options (Keep backup codes secure)',
    ],
    whyImportant: 'Accounts are the keys to your digital identity; securing credentials prevents cascading takeovers.',
  },
  device: {
    id: 'device',
    name: 'DEVICE',
    subtitle: 'Hardware Endpoint',
    category: 'Physical & OS Defense',
    icon: Smartphone,
    practices: [
      'Update OS (Patch known vulnerabilities)',
      'Use screen lock (Biometrics or PIN)',
      'Install trusted software (Official stores only)',
      'Review permissions (Disable unused sensors)',
    ],
    whyImportant: 'Your phone and laptop store session tokens and cached files; hardening endpoints stops malware.',
  },
  network: {
    id: 'network',
    name: 'NETWORK',
    subtitle: 'Transmission Layer',
    category: 'Connectivity Defense',
    icon: Wifi,
    practices: [
      'Secure Wi-Fi (WPA2/WPA3 encryption)',
      'Avoid unknown public networks (Or use encrypted VPN)',
      'Use HTTPS (Ensure secure padlock on all sites)',
    ],
    whyImportant: 'Data in transit can be monitored or redirected if transferred across unencrypted channels.',
  },
  identity: {
    id: 'identity',
    name: 'IDENTITY',
    subtitle: 'Legal & Digital Persona',
    category: 'Impersonation Defense',
    icon: UserCheck,
    practices: [
      'Protect personal information (Guard SSN/Tax ID)',
      'Verify requests (Confirm out-of-band)',
    ],
    whyImportant: 'Criminals use stolen identity fragments to open fraudulent credit lines and execute SIM swaps.',
  },
  privacy: {
    id: 'privacy',
    name: 'PRIVACY',
    subtitle: 'Data Minimization',
    category: 'Footprint Control',
    icon: EyeOff,
    practices: [
      'Review permissions (Quarterly privacy audits)',
      'Limit unnecessary sharing (Avoid public location tagging)',
    ],
    whyImportant: 'Minimizing your digital footprint leaves fewer data points for threat actors to harvest.',
  },
};

export const DigitalSafetyMap: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('data');

  const selectedNode = NODES_DATA[selectedNodeId] || NODES_DATA.data;
  const SelectedIcon = selectedNode.icon;

  return (
    <section id="digital-safety-map" className="py-16 md:py-24 relative scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Defense Topology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Digital Safety Map: Your Digital Life
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Every component of your digital existence connects back to your core data. Click any node in the topology below to reveal its practical security practices.
          </p>
        </div>

        {/* Interactive Layout: Graph Visual Left/Center, Practice Inspector Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Topology Canvas (Desktop: Cross Diagram, Mobile: Vertical Flow) */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800/90 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div className="text-center mb-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
                Topological Cross Architecture
              </span>
              <p className="text-xs text-slate-400 mt-0.5">Click any domain node to inspect security practices</p>
            </div>

            {/* Desktop Cross Topology (Hidden on mobile) */}
            <div className="hidden sm:block relative w-full aspect-[4/3] max-w-md mx-auto">
              {/* Connecting Vector Lines */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="50" y1="20" x2="50" y2="48" stroke="#00f0ff" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                <line x1="20" y1="48" x2="50" y2="48" stroke="#00f0ff" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                <line x1="80" y1="48" x2="50" y2="48" stroke="#00f0ff" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                <line x1="50" y1="48" x2="50" y2="72" stroke="#00f0ff" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                <line x1="50" y1="72" x2="50" y2="92" stroke="#00f0ff" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
              </svg>

              {/* Node 1: ACCOUNT (Top) */}
              <div className="absolute left-1/2 top-[12%] -translate-x-1/2 -translate-y-1/2 z-10">
                <NodeButton
                  node={NODES_DATA.account}
                  isSelected={selectedNodeId === 'account'}
                  onClick={() => setSelectedNodeId('account')}
                />
              </div>

              {/* Node 2: DEVICE (Left) */}
              <div className="absolute left-[15%] top-[48%] -translate-x-1/2 -translate-y-1/2 z-10">
                <NodeButton
                  node={NODES_DATA.device}
                  isSelected={selectedNodeId === 'device'}
                  onClick={() => setSelectedNodeId('device')}
                />
              </div>

              {/* Node 3: YOUR DATA (Center Core) */}
              <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 z-20">
                <NodeButton
                  node={NODES_DATA.data}
                  isSelected={selectedNodeId === 'data'}
                  onClick={() => setSelectedNodeId('data')}
                  isCenter
                />
              </div>

              {/* Node 4: NETWORK (Right) */}
              <div className="absolute left-[85%] top-[48%] -translate-x-1/2 -translate-y-1/2 z-10">
                <NodeButton
                  node={NODES_DATA.network}
                  isSelected={selectedNodeId === 'network'}
                  onClick={() => setSelectedNodeId('network')}
                />
              </div>

              {/* Node 5: IDENTITY (Bottom 1) */}
              <div className="absolute left-1/2 top-[72%] -translate-x-1/2 -translate-y-1/2 z-10">
                <NodeButton
                  node={NODES_DATA.identity}
                  isSelected={selectedNodeId === 'identity'}
                  onClick={() => setSelectedNodeId('identity')}
                />
              </div>

              {/* Node 6: PRIVACY (Bottom 2) */}
              <div className="absolute left-1/2 top-[92%] -translate-x-1/2 -translate-y-1/2 z-10">
                <NodeButton
                  node={NODES_DATA.privacy}
                  isSelected={selectedNodeId === 'privacy'}
                  onClick={() => setSelectedNodeId('privacy')}
                />
              </div>
            </div>

            {/* Mobile Stacked Topology (No horizontal scroll, purely vertical) */}
            <div className="sm:hidden flex flex-col items-center gap-3 py-2">
              <NodeButton
                node={NODES_DATA.account}
                isSelected={selectedNodeId === 'account'}
                onClick={() => setSelectedNodeId('account')}
                fullWidth
              />
              <div className="w-0.5 h-4 bg-cyan-500/40" />
              <div className="grid grid-cols-2 gap-2 w-full">
                <NodeButton
                  node={NODES_DATA.device}
                  isSelected={selectedNodeId === 'device'}
                  onClick={() => setSelectedNodeId('device')}
                />
                <NodeButton
                  node={NODES_DATA.network}
                  isSelected={selectedNodeId === 'network'}
                  onClick={() => setSelectedNodeId('network')}
                />
              </div>
              <div className="w-0.5 h-4 bg-cyan-500/40" />
              <NodeButton
                node={NODES_DATA.data}
                isSelected={selectedNodeId === 'data'}
                onClick={() => setSelectedNodeId('data')}
                isCenter
                fullWidth
              />
              <div className="w-0.5 h-4 bg-cyan-500/40" />
              <NodeButton
                node={NODES_DATA.identity}
                isSelected={selectedNodeId === 'identity'}
                onClick={() => setSelectedNodeId('identity')}
                fullWidth
              />
              <div className="w-0.5 h-4 bg-cyan-500/40" />
              <NodeButton
                node={NODES_DATA.privacy}
                isSelected={selectedNodeId === 'privacy'}
                onClick={() => setSelectedNodeId('privacy')}
                fullWidth
              />
            </div>
          </div>

          {/* Node Security Practices Panel (Right) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-7 backdrop-blur-md shadow-2xl relative cyber-card-glow">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/90 border border-cyan-700/60 flex items-center justify-center text-cyan-400">
                    <SelectedIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                      {selectedNode.category}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {selectedNode.name}
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Active Focus
                </span>
              </div>

              {/* Why Important Note */}
              <p className="text-xs sm:text-sm text-slate-300 my-4 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                {selectedNode.whyImportant}
              </p>

              {/* Recommended Security Practices */}
              <div className="space-y-3 pt-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Essential Security Practices:</span>
                </span>
                <div className="space-y-2">
                  {selectedNode.practices.map((practice, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{practice}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation hint */}
              <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                <p className="text-[11px] text-slate-400 font-mono">
                  Select other nodes on the map to compare defense layers
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
  node: DigitalMapNode;
  isSelected: boolean;
  onClick: () => void;
  isCenter?: boolean;
  fullWidth?: boolean;
}

const NodeButton: React.FC<NodeButtonProps> = ({
  node,
  isSelected,
  onClick,
  isCenter = false,
  fullWidth = false,
}) => {
  const Icon = node.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border transition-all duration-200 flex items-center gap-2 px-3 py-2 text-xs font-semibold cyber-focus-ring ${
        fullWidth ? 'w-full justify-center' : ''
      } ${
        isSelected
          ? isCenter
            ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-lg shadow-cyan-500/30 scale-105'
            : 'bg-slate-900 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-400/20 scale-105'
          : isCenter
          ? 'bg-cyan-950/80 border-cyan-700/80 text-cyan-300 hover:border-cyan-400'
          : 'bg-slate-950/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
      }`}
    >
      <Icon className={`w-4 h-4 ${isSelected && isCenter ? 'text-slate-950' : isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
      <span className="font-mono">{node.name}</span>
    </button>
  );
};
