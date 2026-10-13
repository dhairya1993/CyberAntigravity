'use client';

import React, { useState } from 'react';
import {
  Key,
  ShieldCheck,
  Globe,
  Server,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Database
} from 'lucide-react';

/* =========================================================================
   1. PASSWORD REUSE CREDENTIAL STUFFING ATTACK FLOW
   ========================================================================= */
export const PasswordReuseVisual: React.FC = () => {
  return (
    <div className="rounded-xl bg-slate-950 border border-slate-800 p-5 space-y-4 text-left relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold">
          <AlertTriangle className="w-4 h-4 animate-pulse" />
          <span>ATTACK VECTOR: CREDENTIAL STUFFING CASCADE</span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
          BREACH REPLAY LIVE
        </span>
      </div>

      <div className="relative">
        {/* Live SVG Connecting Flow Streams between the 3 steps */}
        <div className="hidden md:block absolute inset-0 pointer-events-none select-none z-0">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 100">
            {/* Step 1 to Step 2 */}
            <line x1="170" y1="50" x2="250" y2="50" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5 3" className="animate-cyber-flow" />
            <circle r="3" fill="#f43f5e" opacity="0.95">
              <animateMotion dur="1.8s" repeatCount="indefinite" path="M 170 50 L 250 50" />
            </circle>

            {/* Step 2 to Step 3 */}
            <line x1="430" y1="50" x2="510" y2="50" stroke="#f43f5e" strokeWidth="2.2" strokeDasharray="5 3" className="animate-cyber-flow" />
            <circle r="3.2" fill="#ef4444" opacity="1">
              <animateMotion dur="1.8s" repeatCount="indefinite" path="M 430 50 L 510 50" />
            </circle>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-center text-xs relative z-10">
          {/* Step 1: Low-security forum breach */}
          <div className="md:col-span-2 p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div className="p-2 rounded bg-rose-950 text-rose-400 w-8 h-8 mx-auto flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <span className="font-bold text-white block">1. Forum Breach</span>
            <p className="text-[11px] text-slate-400">An old hobby website database is compromised.</p>
          </div>

          <div className="hidden md:flex justify-center text-rose-400 md:col-span-1">
            <span className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-rose-400 text-xs font-mono">→</span>
          </div>

          {/* Step 2: Stolen Credential Pair */}
          <div className="md:col-span-2 p-3.5 rounded-xl bg-rose-950/30 border border-rose-900/50 space-y-1.5">
            <div className="p-2 rounded bg-rose-900/50 text-rose-300 w-8 h-8 mx-auto flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
            <span className="font-bold text-rose-200 block">2. Leaked Password</span>
            <code className="text-[10px] font-mono text-slate-300 block truncate">
              user@email.com:Winter2024!
            </code>
          </div>
        </div>

        {/* Step 3: Cascading Multi-Account Takeover */}
        <div className="mt-3 p-3.5 rounded-xl bg-slate-900/90 border border-rose-900/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-red-950 text-red-400 w-8 h-8 shrink-0 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="font-bold text-red-300 block">3. Multi-Account Hijack Cascade</span>
              <p className="text-[11px] text-slate-400">Automated bot attempts identical stolen login on Bank, Email, Cloud, and Gaming portals.</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 shrink-0">
            Automated Credential Stuffing
          </span>
        </div>
      </div>

      <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-xs text-slate-300 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          <strong>The Solution:</strong> Unique passwords ensure a leak on one non-critical website never compromises your core identity or financial accounts.
        </span>
      </div>
    </div>
  );
};

/* =========================================================================
   2. URL ANATOMY DIAGRAM
   ========================================================================= */
export const UrlExplainerVisual: React.FC = () => {
  const [activePart, setActivePart] = useState<'protocol' | 'subdomain' | 'domain' | 'tld' | 'path'>('domain');

  const parts = {
    protocol: {
      name: 'Protocol (HTTPS)',
      desc: 'Hypertext Transfer Protocol Secure. Encrypts data in transit between browser and server.',
      status: 'Essential (Protects against eavesdropping)',
    },
    subdomain: {
      name: 'Subdomain (auth)',
      desc: 'A prefix used by domain owners to route traffic to specific internal services or applications.',
      status: 'Controlled entirely by the registered root domain owner',
    },
    domain: {
      name: 'Second-Level Domain (example-bank)',
      desc: 'The registered organizational identity. Attackers use typosquatting or hyphens to mimic authentic brands.',
      status: 'The critical part to verify before entering any credentials',
    },
    tld: {
      name: 'Top-Level Domain (.com)',
      desc: 'The domain extension. Beware of unusual or low-cost extensions used in rapid scam campaigns.',
      status: 'e.g. .com, .org, .edu, or foreign/novel TLDs',
    },
    path: {
      name: 'Resource Path (/login/verify)',
      desc: 'Directs the server to a specific script, webpage, or file located behind the verified domain.',
      status: 'Does NOT define who owns the server',
    },
  };

  return (
    <div className="rounded-xl bg-slate-950 border border-slate-800 p-5 space-y-4 text-left relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
          <Globe className="w-4 h-4 animate-pulse" />
          <span>BROWSER URL ANATOMY BREAKDOWN</span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          ACTIVE DOMAIN SCANNER
        </span>
      </div>

      {/* Interactive URL Address Bar with Pulse Beam */}
      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs sm:text-sm flex flex-wrap items-center gap-1 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
        <button
          type="button"
          onClick={() => setActivePart('protocol')}
          className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
            activePart === 'protocol' ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/50' : 'text-emerald-400 hover:bg-slate-800'
          }`}
        >
          https://
        </button>
        <button
          type="button"
          onClick={() => setActivePart('subdomain')}
          className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
            activePart === 'subdomain' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/50' : 'text-cyan-400 hover:bg-slate-800'
          }`}
        >
          auth.
        </button>
        <button
          type="button"
          onClick={() => setActivePart('domain')}
          className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
            activePart === 'domain' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/50' : 'text-amber-300 font-bold hover:bg-slate-800'
          }`}
        >
          example-bank
        </button>
        <button
          type="button"
          onClick={() => setActivePart('tld')}
          className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
            activePart === 'tld' ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/50' : 'text-purple-400 hover:bg-slate-800'
          }`}
        >
          .com
        </button>
        <button
          type="button"
          onClick={() => setActivePart('path')}
          className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
            activePart === 'path' ? 'bg-blue-500/20 text-blue-300 font-bold border border-blue-500/50' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          /login/verify?token=xyz
        </button>
      </div>

      {/* Part Details Box */}
      <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-1">
        <span className="font-bold text-white font-mono block">
          {parts[activePart].name}
        </span>
        <p className="text-slate-300">{parts[activePart].desc}</p>
        <span className="text-[11px] text-cyan-400 font-mono block pt-1">
          Security Note: {parts[activePart].status}
        </span>
      </div>
    </div>
  );
};

/* =========================================================================
   3. SECURITY HEADERS HANDSHAKE VISUAL
   ========================================================================= */
export const SecurityHeadersVisual: React.FC = () => {
  return (
    <div className="rounded-xl bg-slate-950 border border-slate-800 p-5 space-y-4 text-left relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
          <Server className="w-4 h-4 animate-pulse" />
          <span>HTTP RESPONSE HEADER DEFENSE HANDSHAKE</span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          ACTIVE TLS HANDSHAKE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Strict-Transport-Security</span>
          </div>
          <p className="text-slate-300 text-[11px]">
            Enforces HTTPS exclusively, blocking SSL-stripping and man-in-the-middle downgrade attacks.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Content-Security-Policy</span>
          </div>
          <p className="text-slate-300 text-[11px]">
            Restricts the origins of executable scripts, preventing unauthorized cross-site scripting (XSS).
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-purple-400 font-mono font-bold text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>X-Frame-Options</span>
          </div>
          <p className="text-slate-300 text-[11px]">
            Prevents embedding inside malicious third-party iframes, neutralizing clickjacking attacks.
          </p>
        </div>
      </div>
    </div>
  );
};
