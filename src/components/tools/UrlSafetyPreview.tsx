'use client';

import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const UrlSafetyPreview: React.FC = () => {
  const [testUrl, setTestUrl] = useState('paypa1-security-verification.com/login');

  const analyzeUrl = (input: string) => {
    const raw = input.trim().toLowerCase();
    const isPunycodeOrTyposquat = raw.includes('paypa1') || raw.includes('goog1e') || raw.includes('micros0ft');
    const isDeceptiveSubdomain = (raw.match(/\./g) || []).length > 2 && (raw.includes('apple.com') || raw.includes('google.com') || raw.includes('bank'));
    const isClean = raw.includes('cyberantigravity.com') || raw.includes('github.com');

    if (isClean) {
      return {
        verdict: 'Standard Domain Structure (Educational Example)',
        status: 'Typical Structure',
        badgeVariant: 'emerald' as const,
        findings: [
          'Canonical domain without obvious homograph character substitution',
          'Standard subdomain depth and conventional web routing structure',
          'Note: This is a structural comparison only, not an endorsement or safety verification of external content',
        ],
      };
    }

    if (isPunycodeOrTyposquat) {
      return {
        verdict: 'Simulated Typosquatting / Character Substitution Pattern',
        status: 'Deceptive Pattern',
        badgeVariant: 'rose' as const,
        findings: [
          'Demonstrates character substitution ("1" replacing letter "l" in a known brand name)',
          'Common tactic used by scammers to trick users into confusing visual inspection',
          'Educational lesson: Always inspect the exact letters in the browser address bar',
        ],
      };
    }

    if (isDeceptiveSubdomain) {
      return {
        verdict: 'Simulated Nested Subdomain Spoofing Structure',
        status: 'Deceptive Structure',
        badgeVariant: 'rose' as const,
        findings: [
          'Demonstrates how a target brand name can be placed as a prefix subdomain rather than the actual root domain',
          'The actual destination is the secondary domain at the end of the host string',
          'Educational lesson: Check the domain immediately before the top-level extension (.com, .net)',
        ],
      };
    }

    return {
      verdict: 'Unfamiliar or Non-Standard Structure Pattern',
      status: 'Caution Pattern',
      badgeVariant: 'amber' as const,
      findings: [
        'Demonstrates an unfamiliar top-level domain or unusual path structure',
        'Scammers frequently register inexpensive novel domains for short-lived campaigns',
        'Educational lesson: Verify unfamiliar domains directly through verified search or official channels',
      ],
    };
  };

  const currentAnalysis = analyzeUrl(testUrl);

  const presets = [
    { label: 'Typosquat Pattern', url: 'https://paypa1-security-verification.com/login' },
    { label: 'Subdomain Spoof Pattern', url: 'https://apple.com.id-verify-alert.net/auth' },
    { label: 'Standard Domain Pattern', url: 'https://cyberantigravity.com' },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md p-6 sm:p-8 cyber-card-glow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="cyan" dot size="sm">Educational Simulation Sandbox</Badge>
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Pattern Demonstration • No External Network Requests
            </span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Deceptive URL Pattern Simulator
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Learn how cyber scammers construct deceptive lookalike addresses and spoofed subdomains. (Educational demonstration only — not a live URL scanner).
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => setTestUrl(p.url)}
              type="button"
              className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="mt-6">
        <label htmlFor="url-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Test URL Pattern:
        </label>
        <div className="relative">
          <input
            id="url-input"
            type="text"
            value={testUrl}
            onChange={(e) => setTestUrl(e.target.value)}
            placeholder="e.g. https://example-suspicious-domain.com"
            className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 font-mono text-sm cyber-focus-ring transition-colors"
          />
        </div>
      </div>

      {/* Inspection Output Card */}
      <div className="mt-6 p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Badge variant={currentAnalysis.badgeVariant} dot size="md">
              {currentAnalysis.status}
            </Badge>
            <span className="text-sm font-semibold text-white">
              {currentAnalysis.verdict}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Educational Simulation</span>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <span className="text-xs font-semibold text-slate-300 block">Deceptive Pattern Analysis:</span>
          {currentAnalysis.findings.map((f, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
              {currentAnalysis.status === 'Safe' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              )}
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
