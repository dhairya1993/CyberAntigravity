'use client';

import React from 'react';
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
  FileCheck
} from 'lucide-react';

interface ArticleHeroVisualProps {
  slug: string;
  category: string;
  title?: string;
}

export const ArticleHeroVisual: React.FC<ArticleHeroVisualProps> = ({ slug, category }) => {
  // Select contextual visual based on slug / category
  const isPhishing = slug.includes('phishing') || slug.includes('social-engineering');
  const isMfa = slug.includes('multi-factor') || slug.includes('passkeys');
  const isPasswords = slug.includes('password');
  const isNetwork = slug.includes('network') || slug.includes('wifi') || slug.includes('browser');
  const isAi = slug.includes('deepfake') || slug.includes('zero-trust');

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-6 sm:p-10 overflow-hidden shadow-2xl my-6 flex flex-col items-center justify-center text-center">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none -z-10" />

      {/* Central Interactive Vector Graphic */}
      <div className="relative z-10 max-w-lg mx-auto space-y-4">
        {isPhishing && (
          <div className="space-y-3">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-rose-500/20 border border-rose-500/40 animate-pulse" />
              <Mail className="w-12 h-12 text-rose-400 relative z-10" />
              <div className="absolute -top-2 -right-2 p-1.5 rounded-lg bg-slate-950 border border-rose-500 text-rose-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs font-mono">
              <span>Phishing Detection Matrix</span>
            </div>
          </div>
        )}

        {isMfa && (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                <Lock className="w-8 h-8" />
              </div>
              <span className="text-slate-600 font-bold text-xl">+</span>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400">
                <Smartphone className="w-8 h-8" />
              </div>
              <span className="text-slate-600 font-bold text-xl">=</span>
              <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-300">
                <ShieldCheck className="w-8 h-8" />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-mono">
              <span>Multi-Factor Authentication Shield</span>
            </div>
          </div>
        )}

        {isPasswords && (
          <div className="space-y-3">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 animate-pulse" />
              <Key className="w-12 h-12 text-cyan-400 relative z-10" />
              <div className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-slate-950 border border-cyan-500 text-cyan-400">
                <Lock className="w-4 h-4" />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-xs font-mono">
              <span>High-Entropy Cryptographic Defense</span>
            </div>
          </div>
        )}

        {isNetwork && (
          <div className="space-y-3">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-purple-500/20 border border-purple-500/40 animate-pulse" />
              <Wifi className="w-12 h-12 text-purple-400 relative z-10" />
              <div className="absolute -top-2 -right-2 p-1.5 rounded-lg bg-slate-950 border border-purple-500 text-purple-400">
                <Globe className="w-4 h-4" />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/60 text-purple-300 text-xs font-mono">
              <span>Encrypted Network Boundary</span>
            </div>
          </div>
        )}

        {isAi && (
          <div className="space-y-3">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 animate-pulse" />
              <Cpu className="w-12 h-12 text-cyan-400 relative z-10" />
              <div className="absolute -top-2 -right-2 p-1.5 rounded-lg bg-slate-950 border border-cyan-500 text-cyan-400">
                <Fingerprint className="w-4 h-4" />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-xs font-mono">
              <span>Advanced Defense & AI Verification</span>
            </div>
          </div>
        )}

        {!isPhishing && !isMfa && !isPasswords && !isNetwork && !isAi && (
          <div className="space-y-3">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 animate-pulse" />
              <ShieldCheck className="w-12 h-12 text-cyan-400 relative z-10" />
              <div className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-slate-950 border border-cyan-500 text-cyan-400">
                <FileCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-xs font-mono">
              <span>Defensive Architecture Guide</span>
            </div>
          </div>
        )}

        <div className="text-xs text-slate-400 font-mono">
          CyberAntigravity Visual Concept • {category}
        </div>
      </div>
    </div>
  );
};
