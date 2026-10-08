'use client';

import React, { useState } from 'react';
import {
  Link2,
  ShieldAlert,
  Lock,
  Globe,
  FolderTree,
} from 'lucide-react';

interface UrlSegment {
  id: 'protocol' | 'subdomain' | 'tld' | 'path';
  token: string;
  name: string;
  explanation: string;
  verdict: 'warning' | 'caution' | 'info';
  icon: React.ComponentType<{ className?: string }>;
}

const URL_SEGMENTS: UrlSegment[] = [
  {
    id: 'protocol',
    token: 'https://',
    name: 'Protocol / Transport Layer',
    explanation:
      'Encryption protects data in transit, but HTTPS alone does NOT prove that a website is legitimate. Anyone, including attackers, can obtain a free SSL/TLS certificate for a malicious website in minutes.',
    verdict: 'caution',
    icon: Lock,
  },
  {
    id: 'subdomain',
    token: 'securebank-verify',
    name: 'Domain Name / SLD',
    explanation:
      'Check the actual domain carefully. Attackers may use deceptive names such as "securebank-verify" to simulate legitimate brand names while operating an entirely hostile infrastructure.',
    verdict: 'warning',
    icon: Globe,
  },
  {
    id: 'tld',
    token: '.example',
    name: 'Top-Level Domain (TLD)',
    explanation:
      '.example is an IANA-reserved special-use domain. In the wild, attackers frequently register unfamiliar or cheap TLDs (e.g. .xyz, .top, .live) to clone legitimate enterprise portals.',
    verdict: 'warning',
    icon: Globe,
  },
  {
    id: 'path',
    token: '/login',
    name: 'Resource Path',
    explanation:
      '"/login" is only a resource path on the server and does not establish trust or authenticity. It is easily fabricated to mimic real authentication endpoints.',
    verdict: 'info',
    icon: FolderTree,
  },
];

export const UrlInspectionMiniLab: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<UrlSegment>(URL_SEGMENTS[0]);

  return (
    <section id="url-lab-section" className="py-16 bg-[#07090e] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-800/80 bg-cyan-950/40 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <Link2 className="w-3.5 h-3.5 text-cyan-400" aria-hidden={true} />
            URL DECONSTRUCTION LAB
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Inspect the Link
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Deceptive links are the core weapon of credential harvesting. Click each segment of the simulated URL below to understand how threat actors manipulate web addresses.
          </p>
        </div>

        {/* Visual URL Deconstruction Bar */}
        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 sm:p-8 backdrop-blur-sm space-y-6">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>TARGET SIMULATED URL:</span>
            <span className="text-cyan-400">Click any block to inspect</span>
          </div>

          {/* Interactive URL Segment Blocks */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono text-sm sm:text-lg">
            {URL_SEGMENTS.map((seg) => {
              const isSelected = selectedSegment.id === seg.id;
              return (
                <button
                  key={seg.id}
                  type="button"
                  onClick={() => setSelectedSegment(seg)}
                  className={`px-3 sm:px-4 py-2.5 rounded-xl border transition-all duration-200 cyber-focus-ring ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/80 text-cyan-300 shadow-lg shadow-cyan-950/60 scale-105'
                      : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span className="font-bold">{seg.token}</span>
                  <span className="block text-[10px] font-mono text-slate-400 font-normal pt-1">
                    {seg.name.split('/')[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Segment Explanation Inspector */}
          <div className="p-5 sm:p-6 rounded-2xl border border-slate-800 bg-[#0a0f1d] space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-800 text-cyan-400">
                  <selectedSegment.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {selectedSegment.name}
                  </h3>
                  <span className="font-mono text-xs text-cyan-400">
                    Token: &quot;{selectedSegment.token}&quot;
                  </span>
                </div>
              </div>

              <span
                className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-md border font-bold ${
                  selectedSegment.verdict === 'warning'
                    ? 'border-rose-800 bg-rose-950/80 text-rose-300'
                    : selectedSegment.verdict === 'caution'
                    ? 'border-amber-800 bg-amber-950/80 text-amber-300'
                    : 'border-cyan-800 bg-cyan-950/80 text-cyan-300'
                }`}
              >
                {selectedSegment.verdict === 'warning'
                  ? 'HIGH SPOOF RISK'
                  : selectedSegment.verdict === 'caution'
                  ? 'CAUTION REQUIRED'
                  : 'STRUCTURAL CONTEXT'}
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {selectedSegment.explanation}
            </p>
          </div>

          {/* Prominent Educational Warning: HTTPS != Automatically Safe */}
          <div className="p-5 sm:p-6 rounded-2xl border-2 border-amber-500/60 bg-gradient-to-r from-amber-950/40 via-slate-950 to-amber-950/30 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-amber-500/80 flex items-center justify-center shrink-0 text-amber-400">
              <ShieldAlert className="w-7 h-7" />
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-amber-900/60 text-amber-200 border border-amber-700/60">
                CRITICAL CYBERSECURITY TRUTH
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                HTTPS ≠ Automatically Safe
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                A green padlock or <code>https://</code> simply verifies that traffic between your browser and the server is encrypted. <strong>Over 80% of modern phishing websites use HTTPS</strong>. The padlock does not mean the website owner is reputable or trustworthy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
