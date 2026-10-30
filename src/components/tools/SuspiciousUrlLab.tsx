'use client';

import React, { useState, useMemo, useSyncExternalStore } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Terminal,
  Layers,
  Lock,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import {
  URL_INVESTIGATION_CASES,
  UrlInvestigationCase,
  UrlRiskClassification,
} from '@/data/suspiciousUrlLabData';

const STORAGE_KEY = 'cyberantigravity_url_lab_v1';

const KNOWN_SHORTENERS = new Set([
  'bit.ly',
  'tinyurl.com',
  't.co',
  'goo.gl',
  'ow.ly',
  'is.gd',
  'buff.ly',
  'adf.ly',
  'bitly.com',
  'cutt.ly',
]);

const SUSPICIOUS_TLDS = new Set([
  'xyz',
  'top',
  'buzz',
  'club',
  'work',
  'click',
  'gq',
  'cf',
  'ml',
  'biz',
  'country',
  'stream',
]);

interface UrlLabProgress {
  completedCases: Record<string, { choice: UrlRiskClassification; isCorrect: boolean }>;
  score: number;
}

const DEFAULT_URL_PROGRESS: UrlLabProgress = { completedCases: {}, score: 0 };
let urlLabListeners: Array<() => void> = [];
let cachedUrlRaw: string | null = null;
let cachedUrlProgress: UrlLabProgress = DEFAULT_URL_PROGRESS;

function subscribeUrlLab(listener: () => void) {
  urlLabListeners.push(listener);
  return () => {
    urlLabListeners = urlLabListeners.filter((l) => l !== listener);
  };
}

function emitUrlLabChange() {
  for (const listener of urlLabListeners) {
    try {
      listener();
    } catch {
      // safe fallback
    }
  }
}

function getUrlLabSnapshot(): UrlLabProgress {
  if (typeof window === 'undefined') return DEFAULT_URL_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw !== cachedUrlRaw) {
      cachedUrlRaw = raw;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          cachedUrlProgress = {
            completedCases: parsed.completedCases || {},
            score: typeof parsed.score === 'number' ? parsed.score : 0,
          };
        } else {
          cachedUrlProgress = DEFAULT_URL_PROGRESS;
        }
      } else {
        cachedUrlProgress = DEFAULT_URL_PROGRESS;
      }
    }
    return cachedUrlProgress;
  } catch {
    return DEFAULT_URL_PROGRESS;
  }
}

function getUrlLabServerSnapshot(): UrlLabProgress {
  return DEFAULT_URL_PROGRESS;
}

export const SuspiciousUrlLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'guided-lab' | 'custom-inspector'>('guided-lab');

  // Guided Lab State
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [selectedClassification, setSelectedClassification] = useState<UrlRiskClassification | null>(null);

  const labProgress = useSyncExternalStore(
    subscribeUrlLab,
    getUrlLabSnapshot,
    getUrlLabServerSnapshot
  );
  const { completedCases, score } = labProgress;

  // Custom Inspector State
  const [customUrlInput, setCustomUrlInput] = useState('https://login.example.com/account?id=123#security');

  const currentCase: UrlInvestigationCase = URL_INVESTIGATION_CASES[activeCaseIndex];
  const caseId = currentCase.id;
  const isCaseAnswered = Boolean(completedCases[caseId]) || selectedClassification !== null;
  const userSubmission = completedCases[caseId] || (selectedClassification ? {
    choice: selectedClassification,
    isCorrect: selectedClassification === currentCase.expectedClassification,
  } : null);

  const handleSelectClassification = (choice: UrlRiskClassification) => {
    if (isCaseAnswered) return;
    const isCorrect = choice === currentCase.expectedClassification;

    setSelectedClassification(choice);
    const updated = {
      ...completedCases,
      [caseId]: { choice, isCorrect },
    };
    const newScore = score + (isCorrect ? 1 : 0);

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ completedCases: updated, score: newScore }));
      emitUrlLabChange();
    } catch {
      // Safe fallback
    }
  };

  const handleNextCase = () => {
    if (activeCaseIndex < URL_INVESTIGATION_CASES.length - 1) {
      setActiveCaseIndex((prev) => prev + 1);
      setSelectedClassification(null);
    }
  };

  const handlePrevCase = () => {
    if (activeCaseIndex > 0) {
      setActiveCaseIndex((prev) => prev - 1);
      setSelectedClassification(null);
    }
  };

  const handleResetLab = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      emitUrlLabChange();
    } catch {
      // Safe fallback
    }
    setSelectedClassification(null);
    setActiveCaseIndex(0);
  };

  // Safe client-side heuristic dissection for custom input
  const customParsed = useMemo(() => {
    let raw = customUrlInput.trim();
    if (!raw) return null;

    if (!/^https?:\/\//i.test(raw)) {
      raw = 'https://' + raw;
    }

    try {
      const parsed = new URL(raw);
      const hostname = parsed.hostname;
      const parts = hostname.split('.');

      let subdomain = '(none)';
      let registrableDomain = hostname;
      let tld = 'unknown';

      if (parts.length > 2) {
        tld = parts[parts.length - 1];
        registrableDomain = parts.slice(-2).join('.');
        subdomain = parts.slice(0, -2).join('.');
      } else if (parts.length === 2) {
        tld = parts[1];
        registrableDomain = hostname;
      }

      // Local heuristic warning scanner
      const heuristics: { title: string; desc: string; severity: 'high' | 'medium' | 'info' }[] = [];

      // 1. Embedded userinfo check (@ symbol)
      if (raw.includes('@')) {
        heuristics.push({
          title: 'RFC 3986 Userinfo Ambiguity (@ Symbol Detected)',
          desc: 'An "@" symbol is present. Web browsers will navigate to the domain AFTER the "@", ignoring the brand name placed before it.',
          severity: 'high',
        });
      }

      // 2. IP address as hostname
      if (/^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
        heuristics.push({
          title: 'Direct IP Address Hostname',
          desc: 'The URL connects directly to an IP address instead of a registered domain. Legitimate commercial platforms rarely present raw IP addresses.',
          severity: 'high',
        });
      }

      // 3. Known URL shortener
      if (KNOWN_SHORTENERS.has(hostname.toLowerCase())) {
        heuristics.push({
          title: 'URL Shortener Gateway',
          desc: 'This service obscures the destination server via HTTP 301/302 redirects. Inspect the true endpoint before connecting.',
          severity: 'medium',
        });
      }

      // 4. Suspicious / Disreputable TLD
      if (SUSPICIOUS_TLDS.has(tld.toLowerCase())) {
        heuristics.push({
          title: `High-Spam Top Level Domain (.${tld})`,
          desc: `The .${tld} TLD has elevated statistical correlation with disposable phishing infrastructure.`,
          severity: 'medium',
        });
      }

      // 5. Deep subdomain depth
      if (parts.length > 4) {
        heuristics.push({
          title: 'Excessive Subdomain Depth (>4 Segments)',
          desc: 'Deep multi-label subdomain structures are frequently used to prepend recognizable brand names ahead of an attacker domain.',
          severity: 'medium',
        });
      }

      // 6. Lookalike digit/letter pattern
      if (/[0-9]/.test(registrableDomain) && /(micros0ft|paypa1|app1e|g00gle|amaz0n|c1oud)/i.test(registrableDomain)) {
        heuristics.push({
          title: 'Potential Typosquatting Character Substitution',
          desc: 'The domain contains numbers substituting for letters in recognized brand sequences (e.g. 0 for o, 1 for l).',
          severity: 'high',
        });
      }

      return {
        isValid: true,
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        port: parsed.port || (parsed.protocol === 'https:' ? '443 (default)' : '80 (default)'),
        pathname: parsed.pathname || '/',
        search: parsed.search || '(none)',
        hash: parsed.hash || '(none)',
        subdomain,
        registrableDomain,
        tld,
        heuristics,
      };
    } catch {
      return { isValid: false };
    }
  }, [customUrlInput]);

  return (
    <div className="space-y-6">
      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-2" role="tablist" aria-label="URL Tool Modes">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'guided-lab'}
            onClick={() => setActiveTab('guided-lab')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cyber-focus-ring ${
              activeTab === 'guided-lab'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-950 text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>Forensic Investigation Lab (6 Cases)</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'custom-inspector'}
            onClick={() => setActiveTab('custom-inspector')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cyber-focus-ring ${
              activeTab === 'custom-inspector'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-950 text-slate-300 hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" aria-hidden="true" />
            <span>Safe Local URL Dissector</span>
          </button>
        </div>

        {activeTab === 'guided-lab' && (
          <div className="flex items-center gap-3 pr-2">
            <span className="text-xs font-mono text-slate-300">
              Score: <strong className="text-cyan-400">{score}</strong> / {Object.keys(completedCases).length}
            </span>
            {Object.keys(completedCases).length > 0 && (
              <button
                type="button"
                onClick={handleResetLab}
                className="text-xs font-mono text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1"
                title="Reset lab exercises"
              >
                <RotateCcw className="w-3 h-3" aria-hidden="true" />
                <span>Reset</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* ================= MODE 1: GUIDED INVESTIGATION LAB ================= */}
      {activeTab === 'guided-lab' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Case Navigation Pills */}
          <div className="flex flex-wrap items-center gap-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            {URL_INVESTIGATION_CASES.map((c, idx) => {
              const status = completedCases[c.id];
              const isActive = idx === activeCaseIndex;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveCaseIndex(idx);
                    setSelectedClassification(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cyber-focus-ring ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>Case #{c.caseNumber}</span>
                  {status && (
                    status.isCorrect ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-label="Solved" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-amber-400" aria-label="Incorrect" />
                    )
                  )}
                </button>
              );
            })}
          </div>

          {/* Workbench Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Forensic Inspection of Case URL (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Target Concept Header */}
              <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="cyan" size="sm">
                    {currentCase.targetConcept}
                  </Badge>
                  <span className="text-xs font-mono text-slate-400">
                    Case {currentCase.caseNumber} of {URL_INVESTIGATION_CASES.length}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {currentCase.title}
                </h3>

                {/* Raw URL Display Card */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono uppercase text-slate-400 block">
                    Suspicious Candidate URL (Safe in Memory — Never Navigated):
                  </span>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-cyan-300 break-all select-all">
                    {currentCase.testUrl}
                  </div>
                </div>

                {/* Deconstructed Anatomy Pill Bar */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-mono uppercase text-slate-400 block">
                    Structural Breakdown:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-purple-400 block uppercase">Protocol</span>
                      <span className="text-white font-bold">{currentCase.protocol}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-amber-400 block uppercase">Subdomain</span>
                      <span className="text-white font-bold truncate block">{currentCase.subdomain}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-cyan-400 block uppercase">Registrable</span>
                      <span className="text-white font-bold truncate block">{currentCase.registrableDomain}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">TLD</span>
                      <span className="text-white font-bold">.{currentCase.tld}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Classification Action Card */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                  What is your structural evaluation of this URL?
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={isCaseAnswered}
                    onClick={() => handleSelectClassification('suspicious')}
                    className={`p-3.5 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all cyber-focus-ring ${
                      userSubmission?.choice === 'suspicious'
                        ? 'border-amber-500 bg-amber-950/60 text-amber-200 shadow-md shadow-amber-950/40'
                        : 'border-slate-800 bg-slate-950 hover:border-amber-500/60 hover:bg-amber-950/20 text-slate-200'
                    } disabled:cursor-not-allowed`}
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-400" aria-hidden="true" />
                    <span>Suspicious / Deceptive Structure</span>
                  </button>

                  <button
                    type="button"
                    disabled={isCaseAnswered}
                    onClick={() => handleSelectClassification('authentic')}
                    className={`p-3.5 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all cyber-focus-ring ${
                      userSubmission?.choice === 'authentic'
                        ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200 shadow-md shadow-emerald-950/40'
                        : 'border-slate-800 bg-slate-950 hover:border-emerald-500/60 hover:bg-emerald-950/20 text-slate-200'
                    } disabled:cursor-not-allowed`}
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                    <span>Authentic Domain Structure</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Forensic Breakdown & Evaluation (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Forensic Markers in Case */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                  Technical Analysis Points:
                </span>

                <div className="space-y-2.5">
                  {currentCase.forensicBreakdown.map((ind, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-slate-300 font-semibold">
                        <span>{ind.name}</span>
                        <span className="text-[10px] font-mono text-cyan-400 uppercase">[{ind.type}]</span>
                      </div>
                      <p className="text-amber-300/90 font-mono text-[11px]">{ind.detail}</p>
                      <p className="text-slate-400 text-[11px] leading-relaxed">{ind.whyItMatters}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback and Outcome */}
              {userSubmission && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`p-5 rounded-2xl border space-y-3 animate-in fade-in duration-300 ${
                    userSubmission.isCorrect
                      ? 'border-emerald-500/40 bg-emerald-950/30'
                      : 'border-amber-500/40 bg-amber-950/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {userSubmission.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
                        <span className="font-bold text-emerald-300 text-sm sm:text-base">
                          Accurate Forensic Assessment (+1 Point)
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                        <span className="font-bold text-amber-300 text-sm sm:text-base">
                          Classification Mismatch
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {currentCase.classificationExplanation}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-mono text-cyan-400 uppercase font-bold text-[10px] block">
                      Defensive Inspection Rule:
                    </span>
                    <p>{currentCase.educationalRule}</p>
                  </div>

                  {/* Step Buttons */}
                  <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-800/60">
                    <button
                      type="button"
                      onClick={handlePrevCase}
                      disabled={activeCaseIndex === 0}
                      className="px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Previous</span>
                    </button>

                    {activeCaseIndex < URL_INVESTIGATION_CASES.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleNextCase}
                        className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors shadow-md shadow-cyan-500/20"
                      >
                        <span>Next Case</span>
                        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    ) : (
                      <span className="text-xs font-mono text-cyan-300 font-bold">
                        Completed All 6 Forensic Cases!
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODE 2: SAFE LOCAL URL DISSECTOR ================= */}
      {activeTab === 'custom-inspector' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-md space-y-6 animate-in fade-in duration-200">
          <div>
            <label htmlFor="custom-url-input" className="block text-sm font-semibold text-white mb-2">
              Enter any URL to safely inspect its structure:
            </label>
            <input
              id="custom-url-input"
              type="text"
              value={customUrlInput}
              onChange={(e) => setCustomUrlInput(e.target.value)}
              placeholder="e.g. https://login.example.com/account?token=xyz"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              100% Client-Side. Input is parsed locally in browser memory and is never transmitted over the network.
            </span>
          </div>

          {/* Parsed Structure Results */}
          {customParsed && customParsed.isValid ? (
            <div className="space-y-6 pt-2 border-t border-slate-800">
              {/* Highlighted Inline Structure */}
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                  Visual Component Anatomy:
                </span>
                <div className="mt-2.5 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 break-all leading-loose">
                  <span className="text-purple-400 font-bold bg-purple-950/40 px-1 py-0.5 rounded border border-purple-500/30">
                    {customParsed.protocol}{'//'}
                  </span>
                  {customParsed.subdomain !== '(none)' && (
                    <span className="text-amber-400 font-bold bg-amber-950/40 px-1 py-0.5 rounded border border-amber-500/30">
                      {customParsed.subdomain}.
                    </span>
                  )}
                  <span className="text-cyan-400 font-bold bg-cyan-950/40 px-1 py-0.5 rounded border border-cyan-500/30">
                    {customParsed.registrableDomain}
                  </span>
                  <span className="text-slate-300 bg-slate-900 px-1 py-0.5 rounded border border-slate-800">
                    {customParsed.pathname}
                  </span>
                  {customParsed.search !== '(none)' && (
                    <span className="text-emerald-400 font-bold bg-emerald-950/40 px-1 py-0.5 rounded border border-emerald-500/30">
                      {customParsed.search}
                    </span>
                  )}
                  {customParsed.hash !== '(none)' && (
                    <span className="text-rose-400 font-bold bg-rose-950/40 px-1 py-0.5 rounded border border-rose-500/30">
                      {customParsed.hash}
                    </span>
                  )}
                </div>
              </div>

              {/* Individual Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-purple-400">Protocol</span>
                  <div className="font-mono font-bold text-white text-sm">{customParsed.protocol}</div>
                  <p className="text-[11px] text-slate-400">
                    {customParsed.protocol === 'https:' ? 'Encrypted transmission via TLS' : 'Plaintext unencrypted HTTP'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-cyan-400">Registrable Domain</span>
                  <div className="font-mono font-bold text-white text-sm">{customParsed.registrableDomain}</div>
                  <p className="text-[11px] text-slate-400">Primary legal entity registered with registrar.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-amber-400">Subdomain Prefix</span>
                  <div className="font-mono font-bold text-white text-sm truncate">{customParsed.subdomain}</div>
                  <p className="text-[11px] text-slate-400">Sub-routing managed by the domain owner.</p>
                </div>
              </div>

              {/* Automated Heuristic Warnings */}
              {customParsed.heuristics && customParsed.heuristics.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-2">
                  <span className="text-xs font-mono font-bold uppercase text-amber-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" aria-hidden="true" />
                    Automated Heuristic Observations ({customParsed.heuristics.length}):
                  </span>
                  <div className="space-y-2 pt-1">
                    {customParsed.heuristics.map((h, i) => (
                      <div key={i} className="text-xs text-slate-300 space-y-0.5">
                        <strong className="text-white block">• {h.title}</strong>
                        <p className="text-slate-400 pl-3">{h.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Static Analysis Limitation Notice */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                  Limits of Static URL Inspection:
                </span>
                <p>
                  Static URL analysis examines structural syntax only. It cannot prove that a website is safe. Compromised legitimate websites, open redirects, and benign-looking domains can still host malicious code. Always exercise caution and never submit sensitive credentials unless you independently verified the portal.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
              Please enter a valid web address (e.g. <code className="text-cyan-300 font-mono">https://example.com/login</code>) to inspect components.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
