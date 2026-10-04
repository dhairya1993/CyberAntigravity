'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Info,
  CheckCircle2,
  Code2,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface HeaderItem {
  id: string;
  name: string;
  shortName: string;
  recommendedValue: string;
  whatItDoes: string;
  whyItMatters: string;
  typicalPurpose: string;
  commonConsiderations: string[];
}

const HEADERS: HeaderItem[] = [
  {
    id: 'csp',
    name: 'Content-Security-Policy',
    shortName: 'CSP',
    recommendedValue: "default-src 'self'; script-src 'self' https://trusted-cdn.com; object-src 'none';",
    whatItDoes:
      'Specifies which dynamic resources (JavaScript, CSS, images, frames, fonts) the browser is allowed to load and execute for this page.',
    whyItMatters:
      'Provides a powerful browser-enforced defense layer against Cross-Site Scripting (XSS), data injection, and malicious frame hijacking.',
    typicalPurpose:
      'Restricts script execution to approved domains, eliminates unsafe inline scripts, and restricts form action endpoints.',
    commonConsiderations: [
      "Using 'unsafe-inline' or 'unsafe-eval' severely weakens CSP protection against XSS.",
      'Start in Report-Only mode (Content-Security-Policy-Report-Only) during testing to identify broken legitimate scripts before enforcing.',
      "Always set object-src 'none' to block malicious Flash, Java, or legacy plugins.",
    ],
  },
  {
    id: 'hsts',
    name: 'Strict-Transport-Security',
    shortName: 'HSTS',
    recommendedValue: 'max-age=31536000; includeSubDomains; preload',
    whatItDoes:
      'Forces web browsers to communicate with the domain strictly via encrypted HTTPS connections, refusing any insecure HTTP fallbacks.',
    whyItMatters:
      'Prevents SSL-stripping Man-in-the-Middle (MitM) attacks where an attacker on public Wi-Fi silently downgrades connections to unencrypted HTTP.',
    typicalPurpose:
      'Eliminates cleartext traffic between browsers and servers, ensuring session cookies and passwords are never transmitted in cleartext.',
    commonConsiderations: [
      'Ensure all subdomains (including legacy or staging servers) properly support HTTPS before adding includeSubDomains.',
      'Preloading (hstspreload.org) permanently burns HTTPS enforcement into major browser binaries.',
      'A max-age of 31536000 corresponds to 1 year of strict enforcement.',
    ],
  },
  {
    id: 'xcto',
    name: 'X-Content-Type-Options',
    shortName: 'MIME Sniffing',
    recommendedValue: 'nosniff',
    whatItDoes:
      'Instructs the browser to strictly adhere to the declared Content-Type header and never guess or "sniff" the MIME type of a file.',
    whyItMatters:
      'Prevents MIME-confusion attacks where an uploaded image containing executable JavaScript is misinterpreted and executed as active code by the browser.',
    typicalPurpose:
      'Stops attackers from disguising executable scripts as innocent files (e.g. avatar.png containing script payloads).',
    commonConsiderations: [
      'Virtually all modern web applications should include this header unconditionally.',
      'Ensure server MIME-types are properly configured for static files so styles and scripts load without error.',
    ],
  },
  {
    id: 'referrer',
    name: 'Referrer-Policy',
    shortName: 'Referrer Privacy',
    recommendedValue: 'strict-origin-when-cross-origin',
    whatItDoes:
      'Controls how much referral information (the URL of the previous page) is sent in the Referer header when navigating to external destinations.',
    whyItMatters:
      'Protects user privacy and prevents sensitive URL tokens, password reset links, or internal path parameters from leaking to third-party analytics or external links.',
    typicalPurpose:
      'Sends full path info only to same-origin requests, while sending only the domain name (or nothing) to external sites.',
    commonConsiderations: [
      'Avoid unsafe-url, as it exposes the entire query string and path to all outbound destinations.',
      'strict-origin-when-cross-origin is the modern browser default standard.',
    ],
  },
  {
    id: 'permissions',
    name: 'Permissions-Policy',
    shortName: 'Hardware API Control',
    recommendedValue: 'camera=(), microphone=(), geolocation=(), payment=()',
    whatItDoes:
      'Allows web developers to selectively enable, disable, or restrict browser hardware features and APIs (camera, microphone, geolocation, USB).',
    whyItMatters:
      'Limits the attack surface and prevents rogue embedded third-party iframes from accessing sensitive mobile or desktop hardware.',
    typicalPurpose:
      'Locks down camera and microphone access so third-party advertisements or widgets cannot snoop on user surroundings.',
    commonConsiderations: [
      'Replaces the legacy Feature-Policy header with a standardized syntax.',
      'Can be configured per iframe or globally across the document.',
    ],
  },
];

export const SecurityHeadersTool: React.FC = () => {
  const [selectedHeaderId, setSelectedHeaderId] = useState<string>('csp');

  const selected = HEADERS.find((h) => h.id === selectedHeaderId) || HEADERS[0];

  return (
    <div className="space-y-6">
      {/* Educational Notice */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white">Educational reference — this page does not verify the headers of a live website.</strong> This tool explains the defensive architecture and engineering purpose of HTTP security response headers. It does not probe or scan external hosts.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Headers List */}
        <div className="lg:col-span-4 space-y-2">
          {HEADERS.map((item) => {
            const isSelected = item.id === selectedHeaderId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedHeaderId(item.id)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-cyan-500 bg-slate-900 shadow-sm shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div>
                  <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-0.5">
                    {item.shortName}
                  </div>
                  <div className="text-xs font-bold text-white font-mono truncate max-w-[200px]">
                    {item.name}
                  </div>
                </div>

                <Badge variant={isSelected ? 'cyan' : 'outline'} size="sm">
                  {isSelected ? 'Active' : 'Inspect'}
                </Badge>
              </button>
            );
          })}
        </div>

        {/* Right: Header Deep Dive Card */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-md space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-950 border border-cyan-500/30 text-cyan-400 uppercase">
                {selected.shortName}
              </span>
              <span className="text-xs text-slate-500 font-mono">Response Header</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-mono tracking-tight">
              {selected.name}
            </h3>
          </div>

          {/* Recommended Configuration Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-slate-400">
              Recommended Production Value:
            </span>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 font-mono text-xs text-cyan-300 break-all select-all">
              {selected.recommendedValue}
            </div>
          </div>

          {/* What it Does & Why it Matters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" /> What It Does:
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selected.whatItDoes}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Why It Matters:
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selected.whyItMatters}
              </p>
            </div>
          </div>

          {/* Considerations */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Key Engineering Considerations:
            </span>
            <div className="space-y-2">
              {selected.commonConsiderations.map((c, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
