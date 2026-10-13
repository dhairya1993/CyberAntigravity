'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Key,
  Globe,
  Wifi,
  Mail,
  Smartphone,
  Cpu,
  Fingerprint,
  FileCheck,
  Radio,
  Server,
  Database,
  Terminal,
  Activity,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

interface ArticleHeroVisualProps {
  slug: string;
  category: string;
  title?: string;
}

export const ArticleHeroVisual: React.FC<ArticleHeroVisualProps> = ({ slug, category, title }) => {
  const [activeNode, setActiveNode] = useState<string>('filter');

  // Select contextual visual based on slug / category
  const isPhishing = slug.includes('phishing') || slug.includes('social-engineering');
  const isMfa = slug.includes('multi-factor') || slug.includes('passkeys');
  const isPasswords = slug.includes('password');
  const isNetwork = slug.includes('network') || slug.includes('wifi') || slug.includes('browser');
  const isAi = slug.includes('deepfake') || slug.includes('zero-trust');

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-br from-slate-950 via-[#070b14] to-slate-950 border border-slate-800/90 shadow-2xl my-6 overflow-hidden backdrop-blur-xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

      {/* Top Header HUD Bar with Live Telemetry Badge */}
      <div className="px-4 sm:px-6 py-3 border-b border-slate-800/80 bg-slate-900/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase text-slate-200">
            LIVE ARCHITECTURE GRAPH // {category.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-700/60">
            <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-400" />
            TELEMETRY ACTIVE
          </span>
        </div>
      </div>

      {/* Interactive Main Graph Canvas */}
      <div className="p-4 sm:p-8 relative flex flex-col items-center">
        {/* =========================================================================
            1. PHISHING & SOCIAL ENGINEERING TOPOLOGY
            Attacker Node -> Malicious Ingress -> AI Heuristic Shield -> User Mailbox
            ========================================================================= */}
        {isPhishing && (
          <div className="w-full max-w-2xl space-y-4">
            <div className="relative w-full aspect-[520/240] rounded-xl bg-slate-950/80 border border-slate-800/90 overflow-hidden shadow-inner flex items-center justify-center">
              {/* Animated SVG Stream Lines with Traveling Packets */}
              <svg viewBox="0 0 520 240" className="absolute inset-0 w-full h-full pointer-events-none select-none">
                <defs>
                  <linearGradient id="art_phish_grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="art_defense_grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                <line x1="80" y1="120" x2="260" y2="120" stroke="#f43f5e" strokeWidth="1" strokeOpacity="0.2" />
                <line x1="260" y1="120" x2="440" y2="120" stroke="#10b981" strokeWidth="1" strokeOpacity="0.2" />
                <line x1="260" y1="120" x2="260" y2="200" stroke="#f43f5e" strokeWidth="1" strokeOpacity="0.2" />

                {/* Live Animated Flow Streams */}
                <line x1="80" y1="120" x2="260" y2="120" stroke="#f43f5e" strokeWidth="2" strokeDasharray="6 4" className="animate-cyber-flow" strokeLinecap="round" />
                <line x1="260" y1="120" x2="440" y2="120" stroke="#10b981" strokeWidth="2" strokeDasharray="6 4" className="animate-cyber-flow" strokeLinecap="round" />
                <line x1="260" y1="120" x2="260" y2="200" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="4 4" className="animate-cyber-flow" strokeLinecap="round" opacity="0.7" />

                {/* Deflected Threat Stream Packet */}
                <circle r="3" fill="#f43f5e" opacity="0.95">
                  <animateMotion dur="2s" repeatCount="indefinite" path="M 80 120 L 260 120" />
                </circle>
                <circle r="2.5" fill="#f43f5e" opacity="0.85">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path="M 260 120 L 260 200" />
                </circle>
                {/* Verified Clean Stream Packet */}
                <circle r="3" fill="#10b981" opacity="0.95">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 260 120 L 440 120" />
                </circle>

                {/* Pulse Aura around Central Shield Node */}
                <circle cx="260" cy="120" r="32" fill="none" stroke="#00f0ff" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" className="animate-spin" style={{ animationDuration: '20s' }} />
              </svg>

              {/* Node 1: Attacker Lure Node */}
              <button
                type="button"
                onClick={() => setActiveNode('attacker')}
                className={`absolute left-[40px] sm:left-[60px] top-[95px] p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-1 z-10 ${
                  activeNode === 'attacker'
                    ? 'bg-rose-950 border-rose-400 text-white shadow-lg shadow-rose-950 scale-105 ring-1 ring-rose-400'
                    : 'bg-slate-900/90 border-slate-800 text-rose-400 hover:border-rose-700'
                }`}
              >
                <Mail className="w-5 h-5 text-rose-400" />
                <span className="text-[10px] font-mono font-bold tracking-tight">ATTACKER</span>
                <span className="text-[9px] text-rose-300/80 font-mono">Spoofed Domain</span>
              </button>

              {/* Node 2: Central Defensive Filter Shield */}
              <button
                type="button"
                onClick={() => setActiveNode('filter')}
                className={`absolute left-1/2 -translate-x-1/2 top-[90px] p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-1 z-10 ${
                  activeNode === 'filter'
                    ? 'bg-cyan-950 border-cyan-400 text-white shadow-xl shadow-cyan-950 scale-110 ring-2 ring-cyan-400'
                    : 'bg-slate-900/90 border-slate-800 text-cyan-400 hover:border-cyan-600'
                }`}
              >
                <ShieldCheck className="w-6 h-6 text-cyan-400 animate-pulse" />
                <span className="text-[10px] font-mono font-bold tracking-tight">DEFENSE GATE</span>
                <span className="text-[9px] text-emerald-400 font-mono">Heuristic Filter</span>
              </button>

              {/* Node 3: Deflected / Quarantined Sandbox Node */}
              <button
                type="button"
                onClick={() => setActiveNode('quarantine')}
                className={`absolute left-1/2 -translate-x-1/2 top-[175px] px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 z-10 ${
                  activeNode === 'quarantine'
                    ? 'bg-rose-950 border-rose-500 text-white ring-1 ring-rose-500'
                    : 'bg-slate-950/90 border-slate-800 text-rose-400 hover:border-rose-800'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-[9px] font-mono font-bold">THREAT DEFLECTED // QUARANTINE</span>
              </button>

              {/* Node 4: Clean Protected User Mailbox */}
              <button
                type="button"
                onClick={() => setActiveNode('inbox')}
                className={`absolute right-[40px] sm:right-[60px] top-[95px] p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-1 z-10 ${
                  activeNode === 'inbox'
                    ? 'bg-emerald-950 border-emerald-400 text-white shadow-lg shadow-emerald-950 scale-105 ring-1 ring-emerald-400'
                    : 'bg-slate-900/90 border-slate-800 text-emerald-400 hover:border-emerald-700'
                }`}
              >
                <FileCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-[10px] font-mono font-bold tracking-tight">VERIFIED INBOX</span>
                <span className="text-[9px] text-emerald-300/80 font-mono">User Protected</span>
              </button>
            </div>

            {/* Interactive Inspector Explainer */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-300 font-mono">
                  {activeNode === 'attacker' && 'Attacker broadcasts deceptive messages mimicking authoritative banks or accounts.'}
                  {activeNode === 'filter' && 'Defensive Gateway intercepts URLs, evaluates SPF/DKIM records, and checks known lookalike hashes.'}
                  {activeNode === 'quarantine' && 'Suspicious lure links and payload scripts are isolated in a sandbox without user harm.'}
                  {activeNode === 'inbox' && 'Only verified authentic communications reach the user with clear safety attestations.'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold shrink-0 hidden sm:inline">
                CLICK NODES TO INSPECT 👆
              </span>
            </div>
          </div>
        )}

        {/* =========================================================================
            2. MULTI-FACTOR AUTHENTICATION & PASSKEYS TOPOLOGY
            Factor 1 (Password) + Factor 2 (TOTP Token) -> MFA Gateway -> Protected Account
            ========================================================================= */}
        {isMfa && (
          <div className="w-full max-w-2xl space-y-4">
            <div className="relative w-full aspect-[520/240] rounded-xl bg-slate-950/80 border border-slate-800/90 overflow-hidden shadow-inner flex items-center justify-center">
              <svg viewBox="0 0 520 240" className="absolute inset-0 w-full h-full pointer-events-none select-none">
                {/* Dual Input Flow Streams meeting at MFA Gateway */}
                <path d="M 120 70 C 200 70, 210 120, 260 120" fill="none" stroke="#00f0ff" strokeWidth="2" strokeDasharray="6 4" className="animate-cyber-flow" />
                <path d="M 120 170 C 200 170, 210 120, 260 120" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="6 4" className="animate-cyber-flow" />
                <line x1="260" y1="120" x2="420" y2="120" stroke="#10b981" strokeWidth="2.4" strokeDasharray="6 4" className="animate-cyber-flow" />

                {/* Live Packets flowing into gate */}
                <circle r="3" fill="#00f0ff" opacity="0.95">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 120 70 C 200 70, 210 120, 260 120" />
                </circle>
                <circle r="3" fill="#10b981" opacity="0.95">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 120 170 C 200 170, 210 120, 260 120" />
                </circle>
                <circle r="3.2" fill="#10b981" opacity="1">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path="M 260 120 L 420 120" />
                </circle>

                <circle cx="260" cy="120" r="28" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" className="animate-spin" style={{ animationDuration: '16s' }} />
              </svg>

              {/* Factor 1: Knowledge (Password/Key) */}
              <button
                type="button"
                onClick={() => setActiveNode('password')}
                className={`absolute left-[50px] sm:left-[70px] top-[40px] p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-2 z-10 ${
                  activeNode === 'password'
                    ? 'bg-cyan-950 border-cyan-400 text-white shadow-lg ring-1 ring-cyan-400'
                    : 'bg-slate-900/90 border-slate-800 text-cyan-400 hover:border-cyan-700'
                }`}
              >
                <Key className="w-5 h-5 text-cyan-400" />
                <div className="text-left">
                  <span className="text-[10px] font-mono font-bold block">FACTOR 1</span>
                  <span className="text-[9px] text-slate-400 font-mono">Password / Passphrase</span>
                </div>
              </button>

              {/* Factor 2: Possession (Authenticator / Token) */}
              <button
                type="button"
                onClick={() => setActiveNode('totp')}
                className={`absolute left-[50px] sm:left-[70px] top-[145px] p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-2 z-10 ${
                  activeNode === 'totp'
                    ? 'bg-emerald-950 border-emerald-400 text-white shadow-lg ring-1 ring-emerald-400'
                    : 'bg-slate-900/90 border-slate-800 text-emerald-400 hover:border-emerald-700'
                }`}
              >
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <div className="text-left">
                  <span className="text-[10px] font-mono font-bold block">FACTOR 2</span>
                  <span className="text-[9px] text-slate-400 font-mono">Authenticator (TOTP)</span>
                </div>
              </button>

              {/* Central MFA Verification Node */}
              <button
                type="button"
                onClick={() => setActiveNode('mfa_gate')}
                className={`absolute left-1/2 -translate-x-1/2 top-[92px] p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-1 z-10 ${
                  activeNode === 'mfa_gate'
                    ? 'bg-emerald-950 border-emerald-400 text-white shadow-xl scale-110 ring-2 ring-emerald-400'
                    : 'bg-slate-900/90 border-slate-800 text-emerald-400 hover:border-emerald-600'
                }`}
              >
                <Fingerprint className="w-6 h-6 text-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono font-bold">MFA CHALLENGE</span>
                <span className="text-[9px] text-cyan-400 font-mono">2-Layer Gate</span>
              </button>

              {/* Result: Secured Session */}
              <button
                type="button"
                onClick={() => setActiveNode('vault')}
                className={`absolute right-[50px] sm:right-[70px] top-[92px] p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-1 z-10 ${
                  activeNode === 'vault'
                    ? 'bg-emerald-950 border-emerald-400 text-white shadow-lg ring-1 ring-emerald-400 scale-105'
                    : 'bg-slate-900/90 border-slate-800 text-emerald-400 hover:border-emerald-700'
                }`}
              >
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <span className="text-[10px] font-mono font-bold">SECURE ACCOUNT</span>
                <span className="text-[9px] text-emerald-300/80 font-mono">Breach Proof</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300 font-mono">
                  {activeNode === 'password' && 'Password verification satisfies the knowledge factor, but remains vulnerable to remote breaches alone.'}
                  {activeNode === 'totp' && 'Hardware or authenticator app creates rotating cryptographic time-tokens independent of cellular networks.'}
                  {activeNode === 'mfa_gate' && 'The MFA gate requires simultaneous cryptographic agreement from both independent channels.'}
                  {activeNode === 'vault' && 'Account access is granted with full session integrity. Stolen passwords alone cannot breach this gate.'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            3. CRYPTOGRAPHIC PASSWORD & PASSPHRASE HYGIENE
            High-Entropy Passphrase -> SHA-256 Hash Engine -> Encrypted Password Vault
            ========================================================================= */}
        {isPasswords && (
          <div className="w-full max-w-2xl space-y-4">
            <div className="relative w-full aspect-[520/240] rounded-xl bg-slate-950/80 border border-slate-800/90 overflow-hidden shadow-inner flex items-center justify-center">
              <svg viewBox="0 0 520 240" className="absolute inset-0 w-full h-full pointer-events-none select-none">
                <line x1="110" y1="120" x2="260" y2="120" stroke="#00f0ff" strokeWidth="2" strokeDasharray="6 4" className="animate-cyber-flow" />
                <line x1="260" y1="120" x2="410" y2="120" stroke="#10b981" strokeWidth="2" strokeDasharray="6 4" className="animate-cyber-flow" />

                <circle r="3" fill="#00f0ff" opacity="0.95">
                  <animateMotion dur="2s" repeatCount="indefinite" path="M 110 120 L 260 120" />
                </circle>
                <circle r="3" fill="#10b981" opacity="0.95">
                  <animateMotion dur="2s" repeatCount="indefinite" path="M 260 120 L 410 120" />
                </circle>

                <circle cx="260" cy="120" r="30" fill="none" stroke="#00f0ff" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" className="animate-spin" style={{ animationDuration: '24s' }} />
              </svg>

              <button
                type="button"
                onClick={() => setActiveNode('entropy')}
                className={`absolute left-[50px] sm:left-[70px] top-[92px] p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-1 z-10 ${
                  activeNode === 'entropy'
                    ? 'bg-cyan-950 border-cyan-400 text-white shadow-lg ring-1 ring-cyan-400'
                    : 'bg-slate-900/90 border-slate-800 text-cyan-400 hover:border-cyan-700'
                }`}
              >
                <Key className="w-5 h-5 text-cyan-400" />
                <span className="text-[10px] font-mono font-bold">4-WORD PASSPHRASE</span>
                <span className="text-[9px] text-cyan-300/80 font-mono">80+ Bits Entropy</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNode('hash')}
                className={`absolute left-1/2 -translate-x-1/2 top-[88px] p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-1 z-10 ${
                  activeNode === 'hash'
                    ? 'bg-cyan-950 border-cyan-400 text-white shadow-xl scale-110 ring-2 ring-cyan-400'
                    : 'bg-slate-900/90 border-slate-800 text-cyan-400 hover:border-cyan-600'
                }`}
              >
                <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
                <span className="text-[10px] font-mono font-bold">ARGON2 / SHA-256</span>
                <span className="text-[9px] text-emerald-400 font-mono">Salted Cryptographic Hash</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNode('vault')}
                className={`absolute right-[50px] sm:right-[70px] top-[92px] p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-1 z-10 ${
                  activeNode === 'vault'
                    ? 'bg-emerald-950 border-emerald-400 text-white shadow-lg ring-1 ring-emerald-400'
                    : 'bg-slate-900/90 border-slate-800 text-emerald-400 hover:border-emerald-700'
                }`}
              >
                <Lock className="w-5 h-5 text-emerald-400" />
                <span className="text-[10px] font-mono font-bold">ZERO-KNOWLEDGE VAULT</span>
                <span className="text-[9px] text-emerald-300/80 font-mono">AES-256 Encrypted</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-slate-300 font-mono">
                {activeNode === 'entropy' && 'Long passphrases (e.g. "correct-horse-battery-staple") defeat GPU brute-force computers that crack short passwords in seconds.'}
                {activeNode === 'hash' && 'Modern slow hashing functions (Argon2id, PBKDF2) with random salts make offline dictionary attacks computationally unfeasible.'}
                {activeNode === 'vault' && 'End-to-end encrypted password vaults store distinct passwords for every login, preventing credential reuse cascades.'}
              </span>
            </div>
          </div>
        )}

        {/* =========================================================================
            4. NETWORK, BROWSER & WI-FI DEFENSE
            Endpoint Device -> Encrypted WireGuard/TLS Tunnel -> Secure Cloud (Hostile Sniffer Blocked)
            ========================================================================= */}
        {isNetwork && (
          <div className="w-full max-w-2xl space-y-4">
            <div className="relative w-full aspect-[520/240] rounded-xl bg-slate-950/80 border border-slate-800/90 overflow-hidden shadow-inner flex items-center justify-center">
              <svg viewBox="0 0 520 240" className="absolute inset-0 w-full h-full pointer-events-none select-none">
                {/* Encrypted Tunnel Channel */}
                <rect x="150" y="102" width="220" height="36" rx="18" fill="rgba(6, 182, 212, 0.08)" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="80" y1="120" x2="440" y2="120" stroke="#00f0ff" strokeWidth="2.4" strokeDasharray="6 4" className="animate-cyber-flow" />

                {/* Packet Stream through Tunnel */}
                <circle r="3.2" fill="#00f0ff" opacity="1">
                  <animateMotion dur="2.4s" repeatCount="indefinite" path="M 80 120 L 440 120" />
                </circle>

                {/* Blocked hostile eavesdropper attempt */}
                <line x1="260" y1="40" x2="260" y2="102" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="3 3" className="animate-cyber-flow" opacity="0.6" />
                <circle r="2.5" fill="#f43f5e" opacity="0.8">
                  <animateMotion dur="1.5s" repeatCount="indefinite" path="M 260 40 L 260 102" />
                </circle>
              </svg>

              <button
                type="button"
                onClick={() => setActiveNode('endpoint')}
                className={`absolute left-[40px] sm:left-[60px] top-[92px] p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-1 z-10 ${
                  activeNode === 'endpoint'
                    ? 'bg-cyan-950 border-cyan-400 text-white shadow-lg ring-1 ring-cyan-400'
                    : 'bg-slate-900/90 border-slate-800 text-cyan-400 hover:border-cyan-700'
                }`}
              >
                <Smartphone className="w-5 h-5 text-cyan-400" />
                <span className="text-[10px] font-mono font-bold">CLIENT DEVICE</span>
                <span className="text-[9px] text-cyan-300/80 font-mono">Local Endpoint</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNode('sniffer')}
                className={`absolute left-1/2 -translate-x-1/2 top-[20px] px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 z-10 ${
                  activeNode === 'sniffer'
                    ? 'bg-rose-950 border-rose-400 text-white ring-1 ring-rose-400'
                    : 'bg-slate-950 border-slate-800 text-rose-400 hover:border-rose-800'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-[9px] font-mono font-bold">ROGUE WI-FI SNIFFER // DEFLECTED</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNode('tunnel')}
                className={`absolute left-1/2 -translate-x-1/2 top-[98px] px-4 py-2 rounded-xl border transition-all cursor-pointer flex items-center gap-2 z-10 ${
                  activeNode === 'tunnel'
                    ? 'bg-cyan-950 border-cyan-400 text-white shadow-xl ring-2 ring-cyan-400 scale-105'
                    : 'bg-slate-900/90 border-slate-800 text-cyan-400 hover:border-cyan-600'
                }`}
              >
                <Lock className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-mono font-bold">ENCRYPTED TLS / VPN TUNNEL</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNode('server')}
                className={`absolute right-[40px] sm:right-[60px] top-[92px] p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-1 z-10 ${
                  activeNode === 'server'
                    ? 'bg-emerald-950 border-emerald-400 text-white shadow-lg ring-1 ring-emerald-400'
                    : 'bg-slate-900/90 border-slate-800 text-emerald-400 hover:border-emerald-700'
                }`}
              >
                <Globe className="w-5 h-5 text-emerald-400" />
                <span className="text-[10px] font-mono font-bold">SECURE INTERNET</span>
                <span className="text-[9px] text-emerald-300/80 font-mono">HTTPS Verified</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-slate-300 font-mono">
                {activeNode === 'endpoint' && 'Your endpoint enforces HTTPS-Only mode and DNS-over-HTTPS (DoH) to prevent eavesdropping.'}
                {activeNode === 'sniffer' && 'Untrusted public Wi-Fi networks allow attackers to capture unencrypted packets, but cryptographic tunnels render payload streams unreadable.'}
                {activeNode === 'tunnel' && 'TLS 1.3 encryption encapsulates all data inside an opaque cryptographic envelope with forward secrecy.'}
                {activeNode === 'server' && 'Connection establishes verified trust via valid CA certificate signatures and strict HSTS policy.'}
              </span>
            </div>
          </div>
        )}

        {/* =========================================================================
            5. AI & ZERO-TRUST ARCHITECTURE
            Continuous Behavioral Verification Mesh
            ========================================================================= */}
        {isAi && (
          <div className="w-full max-w-2xl space-y-4">
            <div className="relative w-full aspect-[520/240] rounded-xl bg-slate-950/80 border border-slate-800/90 overflow-hidden shadow-inner flex items-center justify-center">
              <svg viewBox="0 0 520 240" className="absolute inset-0 w-full h-full pointer-events-none select-none">
                <line x1="100" y1="80" x2="260" y2="120" stroke="#00f0ff" strokeWidth="1.8" strokeDasharray="5 4" className="animate-cyber-flow" />
                <line x1="100" y1="160" x2="260" y2="120" stroke="#a855f7" strokeWidth="1.8" strokeDasharray="5 4" className="animate-cyber-flow" />
                <line x1="260" y1="120" x2="420" y2="120" stroke="#10b981" strokeWidth="2.2" strokeDasharray="6 4" className="animate-cyber-flow" />

                <circle r="3" fill="#00f0ff" opacity="0.95">
                  <animateMotion dur="2.1s" repeatCount="indefinite" path="M 100 80 L 260 120" />
                </circle>
                <circle r="3" fill="#a855f7" opacity="0.95">
                  <animateMotion dur="2.1s" repeatCount="indefinite" path="M 100 160 L 260 120" />
                </circle>
                <circle r="3.2" fill="#10b981" opacity="1">
                  <animateMotion dur="1.9s" repeatCount="indefinite" path="M 260 120 L 420 120" />
                </circle>
              </svg>

              <button
                type="button"
                onClick={() => setActiveNode('input')}
                className={`absolute left-[50px] sm:left-[70px] top-[50px] p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2 z-10 ${
                  activeNode === 'input'
                    ? 'bg-cyan-950 border-cyan-400 text-white shadow-lg ring-1 ring-cyan-400'
                    : 'bg-slate-900/90 border-slate-800 text-cyan-400 hover:border-cyan-700'
                }`}
              >
                <Activity className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-mono font-bold">TELEMETRY STREAM</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNode('behavior')}
                className={`absolute left-[50px] sm:left-[70px] top-[140px] p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2 z-10 ${
                  activeNode === 'behavior'
                    ? 'bg-purple-950 border-purple-400 text-white shadow-lg ring-1 ring-purple-400'
                    : 'bg-slate-900/90 border-slate-800 text-purple-400 hover:border-purple-700'
                }`}
              >
                <Cpu className="w-4 h-4 text-purple-400" />
                <span className="text-[10px] font-mono font-bold">AI INFERENCE ENGINE</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNode('zerotrust')}
                className={`absolute left-1/2 -translate-x-1/2 top-[92px] p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-1 z-10 ${
                  activeNode === 'zerotrust'
                    ? 'bg-cyan-950 border-cyan-400 text-white shadow-xl scale-110 ring-2 ring-cyan-400'
                    : 'bg-slate-900/90 border-slate-800 text-cyan-400 hover:border-cyan-600'
                }`}
              >
                <Fingerprint className="w-6 h-6 text-cyan-400 animate-pulse" />
                <span className="text-[10px] font-mono font-bold">ZERO-TRUST BROKER</span>
                <span className="text-[9px] text-emerald-400 font-mono">Continuous Auth</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNode('verified')}
                className={`absolute right-[50px] sm:right-[70px] top-[92px] p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-1 z-10 ${
                  activeNode === 'verified'
                    ? 'bg-emerald-950 border-emerald-400 text-white shadow-lg ring-1 ring-emerald-400'
                    : 'bg-slate-900/90 border-slate-800 text-emerald-400 hover:border-emerald-700'
                }`}
              >
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-[10px] font-mono font-bold">DYNAMIC PRIVILEGE</span>
                <span className="text-[9px] text-emerald-300/80 font-mono">Least Privilege Granted</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-slate-300 font-mono">
                {activeNode === 'input' && 'Device health, geolocation, and keystroke dynamics provide contextual authentication cues.'}
                {activeNode === 'behavior' && 'Deep learning models distinguish human interaction from automated bot credential stuffing.'}
                {activeNode === 'zerotrust' && 'Zero Trust principle: "Never trust, always verify". Every transaction re-checks authorization in real time.'}
                {activeNode === 'verified' && 'Fine-grained access tokens expire within minutes, preventing persistent session hijacking.'}
              </span>
            </div>
          </div>
        )}

        {/* =========================================================================
            6. DEFAULT / GENERAL ARCHITECTURE DEFENSE GRAPH
            ========================================================================= */}
        {!isPhishing && !isMfa && !isPasswords && !isNetwork && !isAi && (
          <div className="w-full max-w-2xl space-y-4">
            <div className="relative w-full aspect-[520/240] rounded-xl bg-slate-950/80 border border-slate-800/90 overflow-hidden shadow-inner flex items-center justify-center">
              <svg viewBox="0 0 520 240" className="absolute inset-0 w-full h-full pointer-events-none select-none">
                <line x1="80" y1="120" x2="260" y2="120" stroke="#00f0ff" strokeWidth="2" strokeDasharray="6 4" className="animate-cyber-flow" />
                <line x1="260" y1="120" x2="440" y2="120" stroke="#10b981" strokeWidth="2" strokeDasharray="6 4" className="animate-cyber-flow" />
                <circle r="3" fill="#00f0ff" opacity="0.95">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 80 120 L 260 120" />
                </circle>
                <circle r="3" fill="#10b981" opacity="0.95">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 260 120 L 440 120" />
                </circle>
                <circle cx="260" cy="120" r="32" fill="none" stroke="#00f0ff" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" className="animate-spin" style={{ animationDuration: '25s' }} />
              </svg>

              <button
                type="button"
                onClick={() => setActiveNode('threat')}
                className={`absolute left-[50px] sm:left-[70px] top-[92px] p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-1 z-10 ${
                  activeNode === 'threat'
                    ? 'bg-rose-950 border-rose-400 text-white shadow-lg ring-1 ring-rose-400'
                    : 'bg-slate-900/90 border-slate-800 text-rose-400 hover:border-rose-700'
                }`}
              >
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <span className="text-[10px] font-mono font-bold">THREAT SURFACE</span>
                <span className="text-[9px] text-rose-300/80 font-mono">External Vectors</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNode('core')}
                className={`absolute left-1/2 -translate-x-1/2 top-[88px] p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-1 z-10 ${
                  activeNode === 'core'
                    ? 'bg-cyan-950 border-cyan-400 text-white shadow-xl scale-110 ring-2 ring-cyan-400'
                    : 'bg-slate-900/90 border-slate-800 text-cyan-400 hover:border-cyan-600'
                }`}
              >
                <ShieldCheck className="w-6 h-6 text-cyan-400 animate-pulse" />
                <span className="text-[10px] font-mono font-bold">DEFENSIVE SHIELD</span>
                <span className="text-[9px] text-emerald-400 font-mono">Active Countermeasures</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNode('resilience')}
                className={`absolute right-[50px] sm:right-[70px] top-[92px] p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-1 z-10 ${
                  activeNode === 'resilience'
                    ? 'bg-emerald-950 border-emerald-400 text-white shadow-lg ring-1 ring-emerald-400'
                    : 'bg-slate-900/90 border-slate-800 text-emerald-400 hover:border-emerald-700'
                }`}
              >
                <FileCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-[10px] font-mono font-bold">RESILIENT ASSET</span>
                <span className="text-[9px] text-emerald-300/80 font-mono">Secured & Monitored</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-slate-300 font-mono">
                CyberAntigravity Defense Architecture: Continuous telemetry, zero-trust evaluation, and actionable security education.
              </span>
            </div>
          </div>
        )}

        <div className="pt-2 text-center">
          <span className="text-[11px] text-slate-400 font-mono">
            CyberAntigravity Live Visual Model • {category} • Interactive Node Telemetry
          </span>
        </div>
      </div>
    </div>
  );
};

