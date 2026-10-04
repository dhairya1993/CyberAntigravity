'use client';

import React, { useState } from 'react';
import { Lock, Hash, Server, CheckCircle2 } from 'lucide-react';

export const CIATriadVisual: React.FC = () => {
  const [activePillar, setActivePillar] = useState<'C' | 'I' | 'A'>('C');

  const pillars = {
    C: {
      letter: 'C',
      name: 'Confidentiality',
      tagline: 'Keeping Unauthorized Eyes Out',
      icon: <Lock className="w-6 h-6 text-cyan-400" />,
      color: 'border-cyan-500/60 bg-cyan-950/20 text-cyan-400',
      definition:
        'Ensures that sensitive data is accessible solely to authorized individuals, entities, or processes. Confidentiality prevents unauthorized disclosure or data leakage.',
      primaryDefenses: [
        'End-to-End Encryption & Storage Encryption (AES-256)',
        'Granular Access Control Lists (ACLs) & Least Privilege',
        'Multi-Factor Authentication (MFA) on All Portals',
        'Data Classification (Public, Internal, Confidential, Restricted)',
      ],
      realWorldFailure:
        'A misconfigured cloud storage bucket left open to the internet exposes 500,000 unencrypted customer records to anyone with a web browser.',
    },
    I: {
      letter: 'I',
      name: 'Integrity',
      tagline: 'Ensuring Data Cannot Be Secretly Altered',
      icon: <Hash className="w-6 h-6 text-emerald-400" />,
      color: 'border-emerald-500/60 bg-emerald-950/20 text-emerald-400',
      definition:
        'Guarantees the precision, consistency, and trustworthiness of information over its entire lifecycle. Data must not be altered, forged, or deleted by unauthorized actors or accidental system corruption.',
      primaryDefenses: [
        'Cryptographic Hashing (SHA-256 / SHA-3 checksums)',
        'Digital Signatures (PKI) on Software & Communications',
        'Immutable, Append-Only Audit Logging',
        'Version Control & File Integrity Monitoring (FIM)',
      ],
      realWorldFailure:
        'An attacker intercepts an unencrypted HTTP financial payload and secretly modifies the destination bank account number before it reaches the settlement clearinghouse.',
    },
    A: {
      letter: 'A',
      name: 'Availability',
      tagline: 'Keeping Systems Ready When Needed',
      icon: <Server className="w-6 h-6 text-purple-400" />,
      color: 'border-purple-500/60 bg-purple-950/20 text-purple-400',
      definition:
        'Ensures that authorized users have continuous, reliable access to critical systems, hardware, networks, and datasets whenever required for operational tasks.',
      primaryDefenses: [
        'Geographic Hardware Redundancy & Automated Failover',
        'Distributed Denial-of-Service (DDoS) Mitigation',
        'Verified, Regularly Tested Offline Backups',
        'Proactive Uptime & Resource Consumption Monitoring',
      ],
      realWorldFailure:
        'A volumetric Distributed Denial-of-Service attack saturates an emergency 911 dispatch network, causing dispatchers to be unable to route ambulances.',
    },
  };

  const selected = pillars[activePillar];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-8 backdrop-blur-md space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
            Defensive Mental Model
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            The CIA Triad Visual Model
          </h3>
        </div>
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
          {(['C', 'I', 'A'] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActivePillar(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                activePillar === key
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {key === 'C' ? 'Confidentiality' : key === 'I' ? 'Integrity' : 'Availability'}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Triad Diagram / 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['C', 'I', 'A'] as const).map((key) => {
          const item = pillars[key];
          const isCurrent = activePillar === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActivePillar(key)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isCurrent
                  ? item.color + ' ring-1 ring-cyan-500/40 shadow-md'
                  : 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-black font-mono">{item.letter}</span>
                {item.icon}
              </div>
              <h4 className="text-base font-bold text-white mb-0.5">{item.name}</h4>
              <p className="text-xs text-slate-400">{item.tagline}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Pillar Deep Dive */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 md:p-6 space-y-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 mb-1">Pillar Breakdown</div>
          <h4 className="text-lg font-bold text-white mb-2">{selected.name}</h4>
          <p className="text-sm text-slate-300 leading-relaxed">{selected.definition}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-800/80">
          {/* Primary Defenses */}
          <div>
            <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Primary Defensive Controls:
            </h5>
            <div className="space-y-1.5">
              {selected.primaryDefenses.map((defense, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{defense}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Real-World Scenario Failure */}
          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
            <h5 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1.5">
              Example Breach Scenario:
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selected.realWorldFailure}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
