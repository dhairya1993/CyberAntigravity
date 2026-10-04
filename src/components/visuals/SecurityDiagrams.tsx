'use client';

import React, { useState } from 'react';
import {
  Lock,
  FileCheck,
  Server,
  Key,
  Smartphone,
  ShieldCheck,
  Info
} from 'lucide-react';

/* =========================================================================
   1. CIA TRIAD DIAGRAM (Section 12)
   ========================================================================= */
export const CiaTriadDiagram: React.FC = () => {
  const [activePillar, setActivePillar] = useState<'confidentiality' | 'integrity' | 'availability'>('confidentiality');

  const pillars = {
    confidentiality: {
      title: 'Confidentiality',
      icon: Lock,
      color: 'text-cyan-400 border-cyan-500/50 bg-cyan-950/40',
      tagline: 'Only authorized individuals can access sensitive information.',
      explanation: 'Ensures data is kept hidden from unauthorized users through encryption, strict role-based access control, and secure credential storage.',
      example: 'End-to-end encryption in messaging applications ensures only the sender and intended recipient can read communication plaintext.',
      countermeasure: 'AES-256 encryption, Multi-Factor Authentication, principle of least privilege.',
    },
    integrity: {
      title: 'Integrity',
      icon: FileCheck,
      color: 'text-emerald-400 border-emerald-500/50 bg-emerald-950/40',
      tagline: 'Data remains accurate, uncorrupted, and unaltered by unauthorized parties.',
      explanation: 'Guarantees that information has not been tampered with in transit or storage, verifying authenticity through cryptographic hashes and digital signatures.',
      example: 'Cryptographic SHA-256 checksums verify that a downloaded software installer has not been infected with malware during distribution.',
      countermeasure: 'Digital signatures, cryptographic hash verification, versioned immutable audit logs.',
    },
    availability: {
      title: 'Availability',
      icon: Server,
      color: 'text-purple-400 border-purple-500/50 bg-purple-950/40',
      tagline: 'Authorized users have timely, reliable access to systems and data.',
      explanation: 'Ensures services, databases, and networks remain operational during hardware faults, natural disasters, or Distributed Denial of Service (DDoS) attacks.',
      example: 'Redundant power supplies, geo-distributed servers, and automated failover systems keep hospital patient records accessible during localized outages.',
      countermeasure: 'Load balancers, off-site encrypted backups, DDoS mitigation proxies, disaster recovery playbooks.',
    },
  };

  const current = pillars[activePillar];

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 backdrop-blur-xl relative overflow-hidden shadow-2xl">
      <div className="text-center max-w-xl mx-auto mb-6 space-y-1">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
          Foundational Security Model
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-white">
          The CIA Triad
        </h3>
        <p className="text-xs text-slate-300">
          The international benchmark for designing, evaluating, and operating secure information systems.
        </p>
      </div>

      {/* Interactive Visual Triangular Layout */}
      <div className="relative max-w-md mx-auto my-4 py-4">
        {/* SVG Triangle connecting lines */}
        <svg className="w-full h-44 sm:h-52" viewBox="0 0 300 200" fill="none" aria-hidden="true">
          <polygon
            points="150,25 40,175 260,175"
            stroke="rgba(6, 182, 212, 0.25)"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="rgba(6, 182, 212, 0.02)"
          />
          {/* Central Shield Icon Badge */}
          <circle cx="150" cy="125" r="26" fill="#0b1120" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="1.5" />
        </svg>

        {/* Top: Confidentiality */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
          <button
            type="button"
            onClick={() => setActivePillar('confidentiality')}
            className={`p-3 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
              activePillar === 'confidentiality'
                ? 'bg-cyan-950 border-cyan-400 text-cyan-300 ring-2 ring-cyan-500/50 scale-105 shadow-lg shadow-cyan-950'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <Lock className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold font-mono">Confidentiality</span>
          </button>
        </div>

        {/* Bottom Left: Integrity */}
        <div className="absolute bottom-0 left-0">
          <button
            type="button"
            onClick={() => setActivePillar('integrity')}
            className={`p-3 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
              activePillar === 'integrity'
                ? 'bg-emerald-950 border-emerald-400 text-emerald-300 ring-2 ring-emerald-500/50 scale-105 shadow-lg shadow-emerald-950'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold font-mono">Integrity</span>
          </button>
        </div>

        {/* Bottom Right: Availability */}
        <div className="absolute bottom-0 right-0">
          <button
            type="button"
            onClick={() => setActivePillar('availability')}
            className={`p-3 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
              activePillar === 'availability'
                ? 'bg-purple-950 border-purple-400 text-purple-300 ring-2 ring-purple-500/50 scale-105 shadow-lg shadow-purple-950'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <Server className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold font-mono">Availability</span>
          </button>
        </div>
      </div>

      {/* Selected Pillar Inspection Box */}
      <div className="mt-4 p-5 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${current.color}`}>
              <current.icon className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">
              {current.title}
            </h4>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {current.tagline}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {current.explanation}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase block mb-1">
              REAL-WORLD EXAMPLE:
            </span>
            <p className="text-slate-300">{current.example}</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase block mb-1">
              PRIMARY COUNTERMEASURES:
            </span>
            <p className="text-slate-300">{current.countermeasure}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   2. MULTI-FACTOR AUTHENTICATION VISUAL (Section 13)
   ========================================================================= */
export const MfaAuthDiagram: React.FC = () => {
  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-1">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block">
          Defense in Depth
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-white">
          How Multi-Factor Authentication Works
        </h3>
        <p className="text-xs text-slate-300">
          MFA combines two or more independent factors so a stolen password alone is insufficient to compromise an account.
        </p>
      </div>

      {/* Visual Formula: Factor 1 + Factor 2 + Factor 3 => Verified */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center text-center">
        {/* Factor 1: Knowledge */}
        <div className="md:col-span-2 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 flex items-center justify-center mx-auto">
            <Key className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">
            Factor 1: Knowledge
          </span>
          <h4 className="text-sm font-bold text-white">Something You Know</h4>
          <p className="text-[11px] text-slate-400">
            Password, passphrase, PIN code, or secret security question.
          </p>
        </div>

        <div className="text-slate-500 font-bold text-xl md:col-span-1 hidden md:block">
          +
        </div>

        {/* Factor 2: Possession */}
        <div className="md:col-span-2 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 flex items-center justify-center mx-auto">
            <Smartphone className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
            Factor 2: Possession
          </span>
          <h4 className="text-sm font-bold text-white">Something You Have</h4>
          <p className="text-[11px] text-slate-400">
            Authenticator app (TOTP), hardware key (YubiKey), or trusted device.
          </p>
        </div>

        <div className="text-slate-500 font-bold text-xl md:col-span-1 hidden md:block">
          =
        </div>

        {/* Verified Shield Outcome */}
        <div className="md:col-span-1 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase block">
            Result
          </span>
          <h4 className="text-xs font-bold text-white">Verified</h4>
        </div>
      </div>

      {/* Explanatory callout */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed text-left flex items-start gap-3">
        <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-white">Why SMS is weaker than Authenticator Apps:</strong> SMS codes can be intercepted via SIM swapping or SS7 cellular routing exploits. Dedicated authenticator apps generate rotating 30-second cryptographic tokens locally on your hardware without transmitting codes over the cellular carrier network.
        </p>
      </div>
    </div>
  );
};

/* =========================================================================
   3. PASSWORD SECURITY VISUAL (Section 14)
   ========================================================================= */
export const PasswordSecurityDiagram: React.FC = () => {
  const levels = [
    {
      label: 'Weak Password',
      example: 'P@ssword123',
      length: '11 chars',
      entropy: '~35 bits',
      crackTime: 'Seconds to minutes on modern GPUs',
      strengthClass: 'bg-rose-500',
      barPercent: '25%',
      assessment: 'Contains common dictionary substitutions easily cracked by wordlist rules.',
    },
    {
      label: 'Moderate Password',
      example: 'Tr0ub4dor&3',
      length: '11 chars',
      entropy: '~48 bits',
      crackTime: 'Several days to weeks',
      strengthClass: 'bg-amber-400',
      barPercent: '50%',
      assessment: 'Harder for casual guessing, but vulnerable to high-speed hash dictionary scans.',
    },
    {
      label: 'Strong Password',
      example: 'kX9#mQ2$vL7!wZ4',
      length: '15 chars',
      entropy: '~85 bits',
      crackTime: 'Thousands of years',
      strengthClass: 'bg-cyan-400',
      barPercent: '80%',
      assessment: 'High random entropy across uppercase, lowercase, numbers, and symbols.',
    },
    {
      label: 'Very Strong Passphrase',
      example: 'correct-horse-battery-staple-galaxy',
      length: '36 chars',
      entropy: '~115 bits',
      crackTime: 'Trillions of years',
      strengthClass: 'bg-emerald-400',
      barPercent: '100%',
      assessment: '4+ unrelated words provide massive character length and high entropy while remaining memorable.',
    },
  ];

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-1">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
          Credential Defense Theory
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-white">
          Password Complexity vs. Length
        </h3>
        <p className="text-xs text-slate-300">
          Length provides exponentially more brute-force resistance than short passwords filled with complex character substitutions.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="space-y-3">
        {levels.map((lvl, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-left space-y-2"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{lvl.label}</span>
                <code className="text-xs font-mono text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {lvl.example}
                </code>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span>{lvl.length}</span>
                <span className="text-cyan-400">{lvl.entropy}</span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
              <div
                style={{ width: lvl.barPercent }}
                className={`h-full rounded-full transition-all duration-500 ${lvl.strengthClass}`}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
              <span className="text-slate-300">{lvl.assessment}</span>
              <span className="font-mono text-slate-400">Estimated offline crack time: <strong className="text-slate-200">{lvl.crackTime}</strong></span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 text-center text-xs text-slate-500 font-mono">
        Fictional educational examples. Never use these illustrative passwords for real accounts.
      </div>
    </div>
  );
};
