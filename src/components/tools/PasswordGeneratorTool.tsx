'use client';

import React, { useState } from 'react';
import {
  RefreshCw,
  Copy,
  Check,
  Info,
} from 'lucide-react';

const PASSPHRASE_DICTIONARY = [
  'anchor', 'beacon', 'boulder', 'breeze', 'canyon', 'cascade', 'cipher', 'comet',
  'compass', 'crystal', 'delta', 'falcon', 'feather', 'forest', 'galaxy', 'glacier',
  'granite', 'harbor', 'horizon', 'island', 'jupiter', 'lagoon', 'meadow', 'meteor',
  'monolith', 'nebula', 'oasis', 'ocean', 'orbit', 'pebble', 'pinnacle', 'planet',
  'prism', 'quantum', 'quartz', 'radar', 'radiant', 'rainbow', 'ravine', 'reef',
  'ridge', 'river', 'saturn', 'shadow', 'signal', 'silver', 'solstice', 'summit',
  'timber', 'topaz', 'torrent', 'tundra', 'vector', 'vortex', 'whisper', 'zenith',
];

interface GenOptions {
  mode: 'password' | 'passphrase';
  length: number;
  wordCount: number;
  passphraseSeparator: string;
  includeUpper: boolean;
  includeLower: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

function runCryptoGeneration(opts: GenOptions): string {
  if (typeof window === 'undefined' || !window.crypto) {
    return 'Loading-Secured-2026';
  }

  if (opts.mode === 'passphrase') {
    const words: string[] = [];
    const array = new Uint32Array(opts.wordCount);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < opts.wordCount; i++) {
      const index = array[i] % PASSPHRASE_DICTIONARY.length;
      words.push(PASSPHRASE_DICTIONARY[index]);
    }

    return words.join(opts.passphraseSeparator);
  }

  let charset = '';
  if (opts.includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (opts.includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (opts.includeNumbers) charset += '0123456789';
  if (opts.includeSymbols) charset += '!@#$%^&*()-_=+[]{}|;:,.<>?';

  if (!charset) {
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  }

  const randomBuffer = new Uint32Array(opts.length);
  window.crypto.getRandomValues(randomBuffer);

  let result = '';
  for (let i = 0; i < opts.length; i++) {
    result += charset[randomBuffer[i] % charset.length];
  }

  return result;
}

export const PasswordGeneratorTool: React.FC = () => {
  const [mode, setMode] = useState<'password' | 'passphrase'>('password');
  const [length, setLength] = useState(16);
  const [wordCount, setWordCount] = useState(4);
  const [passphraseSeparator, setPassphraseSeparator] = useState('-');
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedResult, setGeneratedResult] = useState<string>(() =>
    runCryptoGeneration({
      mode: 'password',
      length: 16,
      wordCount: 4,
      passphraseSeparator: '-',
      includeUpper: true,
      includeLower: true,
      includeNumbers: true,
      includeSymbols: true,
    })
  );
  const [copied, setCopied] = useState(false);

  const handleGenerate = (customOpts?: Partial<GenOptions>) => {
    const opts: GenOptions = {
      mode: customOpts?.mode ?? mode,
      length: customOpts?.length ?? length,
      wordCount: customOpts?.wordCount ?? wordCount,
      passphraseSeparator: customOpts?.passphraseSeparator ?? passphraseSeparator,
      includeUpper: customOpts?.includeUpper ?? includeUpper,
      includeLower: customOpts?.includeLower ?? includeLower,
      includeNumbers: customOpts?.includeNumbers ?? includeNumbers,
      includeSymbols: customOpts?.includeSymbols ?? includeSymbols,
    };
    setGeneratedResult(runCryptoGeneration(opts));
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!generatedResult) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(generatedResult);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        return;
      }
    } catch {
      // Fall through to fallback
    }

    try {
      const textArea = document.createElement('textarea');
      textArea.value = generatedResult;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Graceful error handling
    }
  };

  return (
    <div className="space-y-6">
      {/* Privacy Notice */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white">Generated locally in your browser.</strong> This tool uses the browser&apos;s cryptographically secure <code className="text-cyan-300 font-mono">crypto.getRandomValues()</code> API. Passwords are never sent across the network, logged, or saved to any database.
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-md space-y-6">
        {/* Mode Selector */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800 w-fit">
          <button
            type="button"
            onClick={() => {
              setMode('password');
              handleGenerate({ mode: 'password' });
            }}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
              mode === 'password'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Random Characters
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('passphrase');
              handleGenerate({ mode: 'passphrase' });
            }}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
              mode === 'passphrase'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Multi-Word Passphrase
          </button>
        </div>

        {/* Output Box */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="font-mono text-base sm:text-xl text-white break-all tracking-wide select-all flex-1 py-1">
            {generatedResult || 'Generating...'}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy generated password to clipboard"
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                copied
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span aria-live="polite">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleGenerate()}
              aria-label="Generate new password"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Configuration Controls */}
        {mode === 'password' ? (
          <div className="space-y-5 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <label htmlFor="password-length-slider" className="text-slate-400 cursor-pointer">
                  Password Length:
                </label>
                <span className="text-cyan-400 font-bold">{length} characters</span>
              </div>
              <input
                id="password-length-slider"
                type="range"
                aria-label="Password length in characters"
                min="8"
                max="64"
                value={length}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setLength(val);
                  handleGenerate({ length: val });
                }}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-500 border border-slate-800"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>8 chars</span>
                <span>16 chars (recommended)</span>
                <span>32 chars</span>
                <span>64 chars</span>
              </div>
            </div>

            {/* Checkbox Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={includeUpper}
                  onChange={(e) => {
                    setIncludeUpper(e.target.checked);
                    handleGenerate({ includeUpper: e.target.checked });
                  }}
                  className="rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-cyan-500/20"
                />
                <span>Uppercase (A-Z)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={includeLower}
                  onChange={(e) => {
                    setIncludeLower(e.target.checked);
                    handleGenerate({ includeLower: e.target.checked });
                  }}
                  className="rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-cyan-500/20"
                />
                <span>Lowercase (a-z)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => {
                    setIncludeNumbers(e.target.checked);
                    handleGenerate({ includeNumbers: e.target.checked });
                  }}
                  className="rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-cyan-500/20"
                />
                <span>Numbers (0-9)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => {
                    setIncludeSymbols(e.target.checked);
                    handleGenerate({ includeSymbols: e.target.checked });
                  }}
                  className="rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-cyan-500/20"
                />
                <span>Symbols (!@#$)</span>
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-5 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <label htmlFor="word-count-slider" className="text-slate-400 cursor-pointer">
                  Word Count:
                </label>
                <span className="text-cyan-400 font-bold">{wordCount} random words</span>
              </div>
              <input
                id="word-count-slider"
                type="range"
                aria-label="Passphrase word count"
                min="3"
                max="8"
                value={wordCount}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setWordCount(val);
                  handleGenerate({ wordCount: val });
                }}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-500 border border-slate-800"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>3 words</span>
                <span>4 words (common)</span>
                <span>6 words</span>
                <span>8 words</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2">
                Word Separator:
              </label>
              <div className="flex gap-2">
                {['-', '.', '_', ' '].map((sep) => (
                  <button
                    key={sep}
                    type="button"
                    onClick={() => {
                      setPassphraseSeparator(sep);
                      handleGenerate({ passphraseSeparator: sep });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border ${
                      passphraseSeparator === sep
                        ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    {sep === ' ' ? 'Space' : sep}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Educational Note */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed">
          <strong className="text-slate-200">Defense Tip:</strong> Save newly generated credentials immediately inside a trusted password manager (e.g. Bitwarden or 1Password). CyberAntigravity does not maintain copies of generated secrets.
        </div>
      </div>
    </div>
  );
};
