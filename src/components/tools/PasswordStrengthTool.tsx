'use client';

import React, { useState, useMemo } from 'react';
import {
  Key,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldAlert,
  Info,
  RotateCcw,
} from 'lucide-react';

export const PasswordStrengthTool: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Client-side heuristics
  const analysis = useMemo(() => {
    const length = password.length;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);

    // Repeated characters check (e.g. "aaa", "111")
    const hasRepeated = /(.)\1{2,}/.test(password);

    // Sequential patterns check (e.g. "123", "abc", "qwe")
    const sequentialPatterns = [
      '123',
      '234',
      '345',
      '456',
      '567',
      '678',
      '789',
      'abc',
      'bcd',
      'cde',
      'def',
      'efg',
      'fgh',
      'ghi',
      'qwe',
      'wer',
      'ert',
      'rty',
      'tyu',
      'yui',
      'uio',
      'iop',
      'asd',
      'sdf',
      'dfg',
      'fgh',
      'ghj',
      'hjk',
      'jkl',
      'zxc',
      'xcv',
      'cvb',
    ];
    const lowerPwd = password.toLowerCase();
    const hasSequential = sequentialPatterns.some((pattern) => lowerPwd.includes(pattern));

    // Common weak patterns
    const commonPatterns = [
      'password',
      '123456',
      'qwerty',
      'admin',
      'welcome',
      'login',
      'iloveyou',
      'letmein',
      'secret',
      'football',
      'monkey',
    ];
    const hasCommonPattern = commonPatterns.some((w) => lowerPwd.includes(w));

    // Score calculation
    let score = 0;
    if (length >= 8) score += 1;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;
    if (hasLower && hasUpper) score += 1;
    if (hasDigit) score += 1;
    if (hasSymbol) score += 1;

    // Penalties
    if (hasRepeated) score -= 1;
    if (hasSequential) score -= 1;
    if (hasCommonPattern) score -= 2;

    // Clamp score
    const clampedScore = Math.max(0, Math.min(score, 5));

    // Rating
    let tier: 'Very Weak' | 'Weak' | 'Moderate' | 'Strong' | 'Very Strong' = 'Very Weak';
    let tierColor = 'text-red-400 border-red-500/30 bg-red-950/20';
    let barColor = 'bg-red-500';
    let progressPercent = 15;

    if (length === 0) {
      tier = 'Very Weak';
      progressPercent = 0;
    } else if (clampedScore <= 1 || length < 8 || hasCommonPattern) {
      tier = 'Very Weak';
      tierColor = 'text-red-400 border-red-500/30 bg-red-950/20';
      barColor = 'bg-red-500';
      progressPercent = 20;
    } else if (clampedScore === 2 || length < 10) {
      tier = 'Weak';
      tierColor = 'text-orange-400 border-orange-500/30 bg-orange-950/20';
      barColor = 'bg-orange-500';
      progressPercent = 40;
    } else if (clampedScore === 3 || length < 14) {
      tier = 'Moderate';
      tierColor = 'text-amber-400 border-amber-500/30 bg-amber-950/20';
      barColor = 'bg-amber-500';
      progressPercent = 65;
    } else if (clampedScore === 4 || length < 16) {
      tier = 'Strong';
      tierColor = 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20';
      barColor = 'bg-cyan-500';
      progressPercent = 85;
    } else {
      tier = 'Very Strong';
      tierColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20';
      barColor = 'bg-emerald-500';
      progressPercent = 100;
    }

    return {
      length,
      hasLower,
      hasUpper,
      hasDigit,
      hasSymbol,
      hasRepeated,
      hasSequential,
      hasCommonPattern,
      tier,
      tierColor,
      barColor,
      progressPercent,
    };
  }, [password]);

  return (
    <div className="space-y-6">
      {/* 100% Client-Side Privacy Notice */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white">Client-Side Evaluation:</strong> Your password is analyzed locally in this browser and is not sent to CyberAntigravity. It is never logged, stored, transmitted, or included in any URL query parameters.
        </div>
      </div>

      {/* Input Field Area */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-md space-y-6">
        <div>
          <label
            htmlFor="password-input"
            className="block text-sm font-semibold text-white mb-2"
          >
            Enter a sample password to test:
          </label>
          <div className="relative">
            <input
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type or paste a password here..."
              autoComplete="off"
              spellCheck="false"
              className="w-full pl-4 pr-24 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-base placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              {password && (
                <button
                  type="button"
                  onClick={() => setPassword('')}
                  aria-label="Clear input"
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Strength Meter Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono" aria-live="polite">
            <span className="text-slate-400">Educational Strength Rating:</span>
            <span
              className={`px-2.5 py-0.5 rounded-full font-bold border ${analysis.tierColor}`}
            >
              {password ? analysis.tier : 'Awaiting Input'}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all duration-300 ${analysis.barColor}`}
              style={{ width: `${password ? analysis.progressPercent : 0}%` }}
            />
          </div>
        </div>

        {/* Breakdown of Structural Characteristics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
            <span className="text-slate-400">Length</span>
            <span className="font-mono font-bold text-white">
              {analysis.length} chars
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
            <span className="text-slate-400">Uppercase</span>
            {analysis.hasUpper ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <XCircle className="w-4 h-4 text-slate-600" />
            )}
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
            <span className="text-slate-400">Numbers</span>
            {analysis.hasDigit ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <XCircle className="w-4 h-4 text-slate-600" />
            )}
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
            <span className="text-slate-400">Symbols</span>
            {analysis.hasSymbol ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <XCircle className="w-4 h-4 text-slate-600" />
            )}
          </div>
        </div>

        {/* Pattern & Weakness Flags */}
        {password && (
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Pattern Heuristics:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div
                className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                  analysis.hasRepeated
                    ? 'border-amber-500/40 bg-amber-950/20 text-amber-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                {analysis.hasRepeated ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                <span>Repeated Characters</span>
              </div>

              <div
                className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                  analysis.hasSequential
                    ? 'border-amber-500/40 bg-amber-950/20 text-amber-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                {analysis.hasSequential ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                <span>Sequential (123 / abc)</span>
              </div>

              <div
                className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                  analysis.hasCommonPattern
                    ? 'border-red-500/40 bg-red-950/20 text-red-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                {analysis.hasCommonPattern ? (
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                <span>Common Dictionary Word</span>
              </div>
            </div>
          </div>
        )}

        {/* Educational Advice Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
          <div className="font-bold text-white flex items-center gap-1.5">
            <Key className="w-4 h-4 text-cyan-400" />
            <span>Essential Credential Defense Principles:</span>
          </div>
          <ul className="space-y-1 list-disc list-inside text-slate-400">
            <li>
              <strong className="text-slate-200">Use Unique Passwords:</strong> Never reuse the same credential across services. If one website suffers a breach, attackers will immediately test that password everywhere.
            </li>
            <li>
              <strong className="text-slate-200">Prefer Long Passphrases:</strong> A phrase like <code className="text-cyan-300 font-mono">correct-horse-battery-staple</code> has more entropy than <code className="text-cyan-300 font-mono">P@ssw0rd!</code> and is harder for automated tools to crack.
            </li>
            <li>
              <strong className="text-slate-200">Use a Reputable Password Manager:</strong> Bitwarden, 1Password, or built-in OS keychains let you generate and autofill unique 20-character strings effortlessly.
            </li>
            <li>
              <strong className="text-slate-200">Enable Multi-Factor Authentication (MFA):</strong> An authenticator app or hardware security key stops over 99% of automated credential attacks even if your password leaks.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
