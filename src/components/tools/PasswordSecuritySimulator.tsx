'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  KeyRound,
  Eye,
  EyeOff,
  RotateCcw,
  Sparkles,
  Info,
  Cpu,
  Lock,
  ArrowRight,
} from 'lucide-react';
import {
  analyzePassword,
  ATTACK_SCENARIOS,
  AttackScenario,
} from '@/lib/passwordAnalysis';

const PRESET_DEMOS = [
  {
    label: 'Short & Predictable',
    value: 'password123',
    tier: 'very_weak',
    desc: 'Common dictionary root + sequential digits',
  },
  {
    label: 'L33t Substitution Trap',
    value: 'P@ssw0rd!2026',
    tier: 'weak',
    desc: 'Predictable letter-for-symbol replacements',
  },
  {
    label: 'Keyboard Walk Pattern',
    value: 'qwerty!@#123',
    tier: 'weak',
    desc: 'Adjacent keyboard keys + symbol row walk',
  },
  {
    label: 'Diceware Passphrase',
    value: 'Solar-Falcon-River-Dancing-92',
    tier: 'very_strong',
    desc: 'High entropy through random word length',
  },
];

export const PasswordSecuritySimulator: React.FC = () => {
  const [password, setPassword] = useState('Solar-Falcon-River-Dancing-92');
  const [showPassword, setShowPassword] = useState(false);
  const [activeScenarioId, setActiveScenarioId] = useState<string>('online-throttled');

  const analysis = useMemo(() => analyzePassword(password), [password]);

  const activeScenario: AttackScenario =
    ATTACK_SCENARIOS.find((s) => s.id === activeScenarioId) || ATTACK_SCENARIOS[0];

  const estimatedTime = analysis.crackTimes[activeScenario.id] || 'Instantly (< 1 second)';

  const handleClear = () => {
    setPassword('');
  };

  const handleGenerateRandomPassphrase = () => {
    const words = [
      'quantum', 'gravity', 'sentinel', 'falcon', 'nebula', 'cipher',
      'aurora', 'matrix', 'summit', 'horizon', 'vanguard', 'glacier',
      'zenith', 'pulsar', 'beacon', 'cortex', 'shield', 'phoenix'
    ];
    if (typeof window !== 'undefined' && window.crypto) {
      const buffer = new Uint32Array(5);
      window.crypto.getRandomValues(buffer);
      const chosen = [
        words[buffer[0] % words.length],
        words[buffer[1] % words.length],
        words[buffer[2] % words.length],
        words[buffer[3] % words.length],
      ];
      const num = (buffer[4] % 90) + 10;
      const capitalized = chosen.map(w => w.charAt(0).toUpperCase() + w.slice(1));
      setPassword(`${capitalized.join('-')}-${num}!`);
    }
  };

  return (
    <div className="space-y-8" id="password-simulator">
      {/* Privacy First Banner */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-start gap-3 shadow-md">
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1">
          <strong className="text-white block">100% Client-Side Evaluation Guarantee:</strong>
          <p className="text-slate-400 leading-relaxed">
            Your password is evaluated entirely inside your web browser using client-side JavaScript. It is never transmitted across the network, never logged, and never stored in cookies, localStorage, or databases.
          </p>
        </div>
      </div>

      {/* Main Interactive Evaluation Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-7 md:p-8 backdrop-blur-md space-y-6 shadow-xl">
        {/* Section Title & Generation Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-cyan-400" aria-hidden="true" />
              <span>Interactive Strength & Attack Simulator</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Test how length, character combinations, and patterns impact hypothetical guessing times.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGenerateRandomPassphrase}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cyber-focus-ring"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
            <span>Generate WebCrypto Passphrase</span>
          </button>
        </div>

        {/* Input Control Area */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label
              htmlFor="simulated-password-input"
              className="block text-sm font-semibold text-white"
            >
              Enter sample password to test:
            </label>
            <span className="text-xs font-mono text-slate-400">
              Length: <strong className="text-white">{analysis.length}</strong> chars • Entropy: <strong className="text-cyan-400">{analysis.entropyBits}</strong> bits
            </span>
          </div>

          <div className="relative">
            <input
              id="simulated-password-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type or paste a test password..."
              autoComplete="off"
              spellCheck="false"
              className="w-full pl-4 pr-24 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-base placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              {password && (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear password input"
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Clear input"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Eye className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Safe Demonstration Presets */}
          <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono text-slate-400 text-[11px]">Safe Fictional Demos:</span>
            {PRESET_DEMOS.map((demo, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPassword(demo.value)}
                className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-[11px] transition-colors cyber-focus-ring"
                title={demo.desc}
              >
                {demo.label}
              </button>
            ))}
          </div>
        </div>

        {/* Strength Rating Meter & Progress Bar */}
        <div
          role="status"
          aria-live="polite"
          className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono uppercase text-slate-400">Calculated Rating:</span>
              <span
                className={`px-3 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wider ${analysis.tierColor}`}
              >
                {analysis.tierLabel}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className={analysis.hasLower ? 'text-emerald-400 font-bold' : 'text-slate-400 line-through opacity-70'} title={analysis.hasLower ? 'Lowercase included' : 'No lowercase'}>a-z</span>
              <span className={analysis.hasUpper ? 'text-emerald-400 font-bold' : 'text-slate-400 line-through opacity-70'} title={analysis.hasUpper ? 'Uppercase included' : 'No uppercase'}>A-Z</span>
              <span className={analysis.hasDigits ? 'text-emerald-400 font-bold' : 'text-slate-400 line-through opacity-70'} title={analysis.hasDigits ? 'Digits included' : 'No digits'}>0-9</span>
              <span className={analysis.hasSymbols ? 'text-emerald-400 font-bold' : 'text-slate-400 line-through opacity-70'} title={analysis.hasSymbols ? 'Symbols included' : 'No symbols'}>!@#</span>
              <span className={analysis.hasWhitespace ? 'text-emerald-400 font-bold' : 'text-slate-400 line-through opacity-70'} title={analysis.hasWhitespace ? 'Spaces included' : 'No spaces'}>space</span>
            </div>
          </div>

          {/* Meter Bar */}
          <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all duration-300 ${
                analysis.tier === 'very_strong'
                  ? 'bg-emerald-500'
                  : analysis.tier === 'strong'
                  ? 'bg-cyan-500'
                  : analysis.tier === 'fair'
                  ? 'bg-amber-500'
                  : analysis.tier === 'weak'
                  ? 'bg-orange-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${analysis.progressPercent}%` }}
            />
          </div>

          {/* Feedback Points */}
          <div className="space-y-1.5 pt-1 text-xs">
            {analysis.reasons.map((r, i) => (
              <div key={i} className="flex items-start gap-2 text-slate-300">
                <span className="text-cyan-400 font-bold">•</span>
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Attack-Time Simulator Workbench */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                Hypothetical Brute-Force Guessing Speed
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Select an attack scenario to recalculate
            </span>
          </div>

          {/* Scenario Selection Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5" role="tablist" aria-label="Attack Scenarios">
            {ATTACK_SCENARIOS.map((scenario) => {
              const isSelected = scenario.id === activeScenarioId;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => setActiveScenarioId(scenario.id)}
                  role="tab"
                  aria-selected={isSelected}
                  className={`p-3 rounded-xl border text-left transition-all cyber-focus-ring ${
                    isSelected
                      ? 'border-cyan-500 bg-cyan-950/40 text-white shadow-sm shadow-cyan-500/20'
                      : 'border-slate-800/80 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <span className="text-xs font-bold block truncate text-slate-200">
                    {scenario.name}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 block mt-0.5">
                    {scenario.category.toUpperCase()} • {scenario.guessesPerSecond >= 1_000_000_000 ? `${scenario.guessesPerSecond / 1_000_000_000}B/s` : `${scenario.guessesPerSecond}/s`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Scenario Evaluation Result */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono text-slate-400 uppercase">
                Hypothetical Time to Guess (50% Probability):
              </span>
              <span className="font-mono text-base sm:text-lg font-extrabold text-cyan-300">
                {estimatedTime}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeScenario.description}
            </p>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2">
              <Lock className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong className="text-white">Active Defense Constraint:</strong> {activeScenario.constraintsNote}
              </span>
            </div>
          </div>

          {/* Illustrative Disclaimer */}
          <p className="text-[11px] text-slate-400 italic leading-relaxed">
            * Note: Crack time estimates are illustrative models assuming random uniform guessing. In reality, cybercriminals prioritize common dictionary lists, breached credential dumps, and custom wordlist mutation rules. No password is fundamentally unbreakable.
          </p>
        </div>
      </div>

      {/* Educational Guidance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <span className="text-xs font-mono uppercase text-cyan-400 font-bold block">
            01. Length Trumps Complexity
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            A 4-word passphrase like <code className="text-cyan-300 font-mono">River-Summit-Falcon-92!</code> has over 70 bits of entropy and is easy to remember, while <code className="text-amber-300 font-mono">Tr0ub4dor&amp;3</code> is hard to remember but easily cracked by rule-based mask attacks.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <span className="text-xs font-mono uppercase text-amber-400 font-bold block">
            02. The Danger of Password Reuse
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            Even an ultra-strong 30-character password is completely useless if you use it on multiple sites. When a single third-party service leaks its database, attackers immediately test that combination across banks and email providers.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <span className="text-xs font-mono uppercase text-emerald-400 font-bold block">
            03. Passkeys &amp; Hardware MFA
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            The ultimate defense is eliminating shared password secrets altogether. Passkeys (FIDO2 / WebAuthn) use cryptographic public-key pairs that are mathematically immune to phishing and cannot be stolen from server databases.
          </p>
        </div>
      </div>

      {/* Cross-Link Action Bar */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-slate-400 font-mono">
          Ready to generate guaranteed random passwords or check forensic badges?
        </span>
        <div className="flex items-center gap-3">
          <Link
            href="/tools/password-generator"
            className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 transition-colors"
          >
            <span>Password Generator</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
          <span className="text-slate-700">|</span>
          <Link
            href="/learn/progress"
            className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 transition-colors"
          >
            <span>Forensic Badges</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};
