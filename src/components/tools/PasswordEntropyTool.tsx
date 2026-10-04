'use client';

import React, { useState, useMemo } from 'react';
import { ShieldCheck, Eye, EyeOff, CheckCircle2, XCircle, Sparkles, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const PasswordEntropyTool: React.FC = () => {
  const [password, setPassword] = useState('Cyber-Saf3ty-2026!');
  const [showPassword, setShowPassword] = useState(false);

  // Calculate entropy and crack metrics
  const analysis = useMemo(() => {
    const length = password.length;
    let poolSize = 0;

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);

    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasDigit) poolSize += 10;
    if (hasSpecial) poolSize += 33;

    // Shannon Entropy in bits = length * log2(poolSize)
    const entropy = length > 0 && poolSize > 0 ? Math.round(length * (Math.log(poolSize) / Math.log(2))) : 0;

    let strengthLabel = 'Very Weak';
    let strengthColor = 'rose';
    let scorePercent = 10;

    if (entropy >= 80 && length >= 14) {
      strengthLabel = 'Cryptographically Excellent';
      strengthColor = 'emerald';
      scorePercent = 100;
    } else if (entropy >= 60 && length >= 12) {
      strengthLabel = 'Strong & Resilient';
      strengthColor = 'cyan';
      scorePercent = 75;
    } else if (entropy >= 45 && length >= 9) {
      strengthLabel = 'Moderate';
      strengthColor = 'amber';
      scorePercent = 50;
    } else if (entropy >= 28) {
      strengthLabel = 'Weak';
      strengthColor = 'rose';
      scorePercent = 25;
    }

    // Educational structural complexity estimation (non-guaranteed heuristic)
    let complexityTier = 'Very Low';
    if (entropy > 80) complexityTier = 'Exceptional';
    else if (entropy > 65) complexityTier = 'High';
    else if (entropy > 50) complexityTier = 'Moderate';
    else if (entropy > 35) complexityTier = 'Basic';

    return {
      length,
      hasLower,
      hasUpper,
      hasDigit,
      hasSpecial,
      poolSize,
      entropy,
      strengthLabel,
      strengthColor,
      scorePercent,
      complexityTier,
    };
  }, [password]);

  const generatePassphrase = () => {
    const wordList = [
      'quantum', 'gravity', 'shield', 'falcon', 'nebula', 'cipher',
      'sentinel', 'beacon', 'aurora', 'matrix', 'summit', 'horizon',
      'cortex', 'vanguard', 'glacier', 'zenith', 'pulsar', 'bastion'
    ];
    const specials = ['!', '@', '#', '$', '%', '&'];

    if (typeof window !== 'undefined' && window.crypto) {
      const buffer = new Uint32Array(6);
      window.crypto.getRandomValues(buffer);
      const words = [
        wordList[buffer[0] % wordList.length],
        wordList[buffer[1] % wordList.length],
        wordList[buffer[2] % wordList.length],
        wordList[buffer[3] % wordList.length],
      ];
      const num = (buffer[4] % 90) + 10;
      const spec = specials[buffer[5] % specials.length];
      const formatted = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-') + '-' + num + spec;
      setPassword(formatted);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md p-6 sm:p-8 cyber-card-glow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="cyan" dot size="sm">Educational Demonstration</Badge>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Client-Side Memory Only • No Data Transmitted
            </span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Password Entropy & Strength Calculator
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Calculates mathematical Shannon entropy based on password length and character pool diversity. For educational demonstration only.
          </p>
        </div>

        <button
          onClick={generatePassphrase}
          type="button"
          className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800/80 hover:bg-cyan-900/60 transition-colors shrink-0 cyber-focus-ring"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Generate Sample Passphrase
        </button>
      </div>

      {/* Input Field */}
      <div className="mt-6">
        <label htmlFor="password-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Test Candidate Password or Passphrase:
        </label>
        <div className="relative">
          <input
            id="password-input"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type a password to test entropy..."
            className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 rounded-xl px-4 py-3.5 pr-12 text-slate-100 placeholder-slate-500 font-mono text-sm sm:text-base cyber-focus-ring transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Strength Meter Bar */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Cryptographic Strength:</span>
          <span className={`font-semibold ${
            analysis.strengthColor === 'emerald' ? 'text-emerald-400' :
            analysis.strengthColor === 'cyan' ? 'text-cyan-400' :
            analysis.strengthColor === 'amber' ? 'text-amber-400' : 'text-rose-400'
          }`}>
            {analysis.strengthLabel} ({analysis.entropy} bits)
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              analysis.strengthColor === 'emerald' ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-sm shadow-emerald-400/50' :
              analysis.strengthColor === 'cyan' ? 'bg-cyan-400 shadow-sm shadow-cyan-400/50' :
              analysis.strengthColor === 'amber' ? 'bg-amber-400' : 'bg-rose-500'
            }`}
            style={{ width: `${analysis.scorePercent}%` }}
          />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Length</span>
          <span className="text-lg font-bold text-white font-mono">{analysis.length} chars</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Shannon Entropy</span>
          <span className="text-lg font-bold text-cyan-400 font-mono">{analysis.entropy} bits</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Charset Pool</span>
          <span className="text-lg font-bold text-purple-400 font-mono">{analysis.poolSize} symbols</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Educational Tier</span>
          <span className="text-sm font-bold text-emerald-400 font-mono truncate block mt-0.5" title={analysis.complexityTier}>
            {analysis.complexityTier}
          </span>
        </div>
      </div>

      {/* Character Requirements Checkers */}
      <div className="mt-6 flex flex-wrap gap-3">
        <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border ${
          analysis.hasLower ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
        }`}>
          {analysis.hasLower ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5" />}
          Lowercase (a-z)
        </span>
        <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border ${
          analysis.hasUpper ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
        }`}>
          {analysis.hasUpper ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5" />}
          Uppercase (A-Z)
        </span>
        <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border ${
          analysis.hasDigit ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
        }`}>
          {analysis.hasDigit ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5" />}
          Numbers (0-9)
        </span>
        <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border ${
          analysis.hasSpecial ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
        }`}>
          {analysis.hasSpecial ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5" />}
          Symbols (!@#$%)
        </span>
        <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border ${
          analysis.length >= 14 ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
        }`}>
          {analysis.length >= 14 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5" />}
          Length &ge; 14 chars
        </span>
      </div>

      {/* CyberAntigravity Recommendation Note */}
      <div className="mt-6 p-4 rounded-xl bg-cyan-950/20 border border-cyan-900/40 flex items-start gap-3 text-xs text-slate-300">
        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold text-cyan-300 block">Educational Insight & Hygiene Rule:</span>
          <p>
            Length beats complexity. A 4-word random passphrase like <code className="text-cyan-200 bg-slate-950 px-1 py-0.5 rounded">Correct-Horse-Battery-Staple</code> provides ~70+ bits of entropy and is easier to remember.
          </p>
          <p className="text-[11px] text-slate-400">
            Note: Mathematical entropy models brute-force search space only. Always pair strong passwords with a password manager and multi-factor authentication (MFA) to protect against database breaches and phishing.
          </p>
        </div>
      </div>
    </div>
  );
};
