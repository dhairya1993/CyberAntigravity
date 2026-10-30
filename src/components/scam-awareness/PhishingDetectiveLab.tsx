'use client';

import React, { useState, useSyncExternalStore } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Mail,
  Smartphone,
  FileCode,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Search,
  Sparkles,
  Info,
  Award,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import {
  PHISHING_CASES,
  PhishingCase,
  CaseVerdict,
} from '@/data/phishingDetectiveData';

const STORAGE_KEY = 'cyberantigravity_phishing_lab_v1';

interface LabProgress {
  completedCases: Record<string, { verdictChosen: CaseVerdict; isCorrect: boolean }>;
  score: number;
}

const DEFAULT_PROGRESS: LabProgress = { completedCases: {}, score: 0 };
let labListeners: Array<() => void> = [];
let cachedLabRaw: string | null = null;
let cachedLabProgress: LabProgress = DEFAULT_PROGRESS;

function subscribeLab(listener: () => void) {
  labListeners.push(listener);
  return () => {
    labListeners = labListeners.filter((l) => l !== listener);
  };
}

function emitLabChange() {
  for (const listener of labListeners) {
    try {
      listener();
    } catch {
      // safe fallback
    }
  }
}

function getPhishingLabSnapshot(): LabProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw !== cachedLabRaw) {
      cachedLabRaw = raw;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && parsed.completedCases) {
          cachedLabProgress = parsed;
        } else {
          cachedLabProgress = DEFAULT_PROGRESS;
        }
      } else {
        cachedLabProgress = DEFAULT_PROGRESS;
      }
    }
    return cachedLabProgress;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function getPhishingLabServerSnapshot(): LabProgress {
  return DEFAULT_PROGRESS;
}

export const PhishingDetectiveLab: React.FC = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [selectedVerdict, setSelectedVerdict] = useState<CaseVerdict | null>(null);
  const [revealedIndicators, setRevealedIndicators] = useState<Set<string>>(new Set());
  const [hoveredLink, setHoveredLink] = useState(false);

  const progress = useSyncExternalStore(
    subscribeLab,
    getPhishingLabSnapshot,
    getPhishingLabServerSnapshot
  );

  const currentCase: PhishingCase = PHISHING_CASES[activeCaseIndex];
  const caseId = currentCase.id;
  const isCaseAnswered = Boolean(progress.completedCases[caseId]) || selectedVerdict !== null;
  const userSubmission = progress.completedCases[caseId] || (selectedVerdict ? {
    verdictChosen: selectedVerdict,
    isCorrect: selectedVerdict === currentCase.verdict,
  } : null);

  const handleSelectVerdict = (verdict: CaseVerdict) => {
    if (isCaseAnswered) return;
    const isCorrect = verdict === currentCase.verdict;

    setSelectedVerdict(verdict);
    setRevealedIndicators(new Set(currentCase.indicators.map((i) => i.id)));

    const updated: LabProgress = {
      completedCases: {
        ...progress.completedCases,
        [caseId]: { verdictChosen: verdict, isCorrect },
      },
      score: progress.score + (isCorrect ? 1 : 0),
    };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      emitLabChange();
    } catch {
      // Safe fallback
    }
  };

  const toggleIndicator = (id: string) => {
    setRevealedIndicators((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleNextCase = () => {
    if (activeCaseIndex < PHISHING_CASES.length - 1) {
      setActiveCaseIndex((prev) => prev + 1);
      setSelectedVerdict(null);
      setRevealedIndicators(new Set());
      setHoveredLink(false);
    }
  };

  const handlePrevCase = () => {
    if (activeCaseIndex > 0) {
      setActiveCaseIndex((prev) => prev - 1);
      setSelectedVerdict(null);
      setRevealedIndicators(new Set());
      setHoveredLink(false);
    }
  };

  const handleResetLab = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      emitLabChange();
    } catch {
      // Safe fallback
    }
    setSelectedVerdict(null);
    setRevealedIndicators(new Set());
    setActiveCaseIndex(0);
  };

  const completedCount = Object.keys(progress.completedCases).length;
  const isLabFinished = completedCount === PHISHING_CASES.length;

  return (
    <section
      id="phishing-detective-lab"
      className="py-16 sm:py-24 relative bg-[#06080e] border-t border-slate-800/80 scroll-mt-20"
      aria-labelledby="phishing-lab-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Lab Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Search className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
            <span>Interactive Forensic Simulation</span>
          </div>

          <h2
            id="phishing-lab-title"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight"
          >
            Phishing Detective <span className="text-cyan-400">Forensics Lab.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Analyze realistic simulated communications without exposure to real malicious infrastructure. Inspect sender headers, disguised links, emotional triggers, and identify authentic vs fraudulent patterns.
          </p>
        </div>

        {/* Holistic Security Principle Banner */}
        <div className="max-w-4xl mx-auto mb-8 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-start gap-3 shadow-lg">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <strong className="text-white block">Core Forensic Principle:</strong>
            <p className="text-slate-400 leading-relaxed">
              No single indicator proves a message is malicious. Attackers mix legitimate details with fraudulent links, and authentic organizations occasionally send urgent notices. Evaluate the totality of evidence: verified sender domain, context, requested actions, and independent out-of-band channels.
            </p>
          </div>
        </div>

        {/* Case Navigation Tabs & Score Bar */}
        <div className="max-w-5xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
          {/* Case Pills */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Investigation Cases">
            {PHISHING_CASES.map((c, idx) => {
              const status = progress.completedCases[c.id];
              const isActive = idx === activeCaseIndex;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveCaseIndex(idx);
                    setSelectedVerdict(null);
                    setRevealedIndicators(new Set());
                  }}
                  role="tab"
                  aria-selected={isActive}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cyber-focus-ring ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-950/80 border border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>Case #{c.caseNumber}</span>
                  {status && (
                    status.isCorrect ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-label="Solved correctly" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-amber-400" aria-label="Incorrect verdict" />
                    )
                  )}
                </button>
              );
            })}
          </div>

          {/* Progress / Score Pill */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300">
              <Award className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <span>
                Score: <strong className="text-white">{progress.score}</strong> / {completedCount}
              </span>
            </div>

            {completedCount > 0 && (
              <button
                type="button"
                onClick={handleResetLab}
                className="text-xs font-mono text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1"
                title="Reset lab progress"
              >
                <RotateCcw className="w-3 h-3" aria-hidden="true" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Forensic Investigation Workbench */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Simulated Communication Inspector (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Simulation Trust Warning */}
            <div className="flex items-center justify-between p-2.5 px-3.5 rounded-xl border border-amber-800/80 bg-amber-950/30 text-amber-300 text-xs font-mono font-semibold">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                <span>SAFE LAB ENVIRONMENT — NO EXTERNAL NETWORK CALLS</span>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:inline">Reserved .test / .xyz domains</span>
            </div>

            {/* Email / SMS Client Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 sm:p-6 shadow-2xl space-y-5">
              {/* Client Top Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  {currentCase.channel === 'email' ? (
                    <Mail className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                  ) : (
                    <Smartphone className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                  )}
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                    {currentCase.channel === 'email' ? 'Secured Webmail Inbox' : 'Mobile SMS Messenger'}
                  </span>
                </div>
                <Badge variant={currentCase.difficulty === 'Beginner' ? 'cyan' : 'purple'} size="sm">
                  {currentCase.difficulty}
                </Badge>
              </div>

              {/* Message Header Inspection Fields */}
              <div className="space-y-2 text-xs font-mono bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-slate-500 w-16">From:</span>
                  <span className="text-white font-semibold">{currentCase.senderDisplay}</span>
                  <span className="text-amber-300/90">&lt;{currentCase.senderAddress}&gt;</span>
                </div>

                {currentCase.replyToAddress && (
                  <div className="flex flex-wrap items-baseline gap-2 pt-1 border-t border-slate-800/50">
                    <span className="text-slate-500 w-16">Reply-To:</span>
                    <span className="text-rose-400 font-bold">{currentCase.replyToAddress}</span>
                  </div>
                )}

                <div className="flex flex-wrap items-baseline gap-2 pt-1 border-t border-slate-800/50">
                  <span className="text-slate-500 w-16">To:</span>
                  <span className="text-slate-300">{currentCase.recipient}</span>
                  <span className="text-slate-500 ml-auto text-[11px]">{currentCase.dateSent}</span>
                </div>

                {currentCase.subject && (
                  <div className="flex flex-wrap items-baseline gap-2 pt-1 border-t border-slate-800/50">
                    <span className="text-slate-500 w-16">Subject:</span>
                    <span className="text-cyan-300 font-medium">{currentCase.subject}</span>
                  </div>
                )}
              </div>

              {/* Message Content Body */}
              <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800 text-sm sm:text-base text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                {currentCase.bodyText}
              </div>

              {/* Interactive Link Inspector (if present) */}
              {currentCase.displayLinkText && currentCase.hoverLinkTarget && (
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400 flex items-center gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                      Hyperlinked Destination:
                    </span>
                    <button
                      type="button"
                      onClick={() => setHoveredLink(!hoveredLink)}
                      className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 underline"
                    >
                      {hoveredLink ? 'Hide Inspection' : 'Hover / Inspect Link'}
                    </button>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs break-all">
                    <span className="text-slate-400 block text-[10px] uppercase">Displayed Anchor Text:</span>
                    <span className="text-cyan-300">{currentCase.displayLinkText}</span>
                  </div>

                  {hoveredLink && (
                    <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/40 font-mono text-xs break-all animate-in fade-in duration-200">
                      <span className="text-amber-400 font-bold block text-[10px] uppercase flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-400" aria-hidden="true" />
                        True Destination (Target URL):
                      </span>
                      <span className="text-amber-200">{currentCase.hoverLinkTarget}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Attachment Preview (if present) */}
              {currentCase.attachmentName && (
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <FileCode className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                    <div>
                      <span className="font-mono font-bold text-white block">{currentCase.attachmentName}</span>
                      <span className="text-slate-400 text-[11px]">{currentCase.attachmentType}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-mono text-[10px]">
                    Quarantined
                  </span>
                </div>
              )}
            </div>

            {/* Decision Action Buttons */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                Your Investigative Verdict:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={isCaseAnswered}
                  onClick={() => handleSelectVerdict('phishing')}
                  className={`p-3.5 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all cyber-focus-ring ${
                    userSubmission?.verdictChosen === 'phishing'
                      ? 'border-rose-500 bg-rose-950/60 text-rose-200 shadow-md shadow-rose-950/40'
                      : 'border-slate-800 bg-slate-950 hover:border-rose-500/60 hover:bg-rose-950/20 text-slate-200'
                  } disabled:cursor-not-allowed`}
                >
                  <ShieldAlert className="w-4 h-4 text-rose-400" aria-hidden="true" />
                  <span>Report as Phishing / Scam</span>
                </button>

                <button
                  type="button"
                  disabled={isCaseAnswered}
                  onClick={() => handleSelectVerdict('legitimate')}
                  className={`p-3.5 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all cyber-focus-ring ${
                    userSubmission?.verdictChosen === 'legitimate'
                      ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200 shadow-md shadow-emerald-950/40'
                      : 'border-slate-800 bg-slate-950 hover:border-emerald-500/60 hover:bg-emerald-950/20 text-slate-200'
                  } disabled:cursor-not-allowed`}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  <span>Mark as Legitimate Alert</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Forensic Evidence & Debriefing Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Forensic Indicators Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  Forensic Markers ({currentCase.indicators.length})
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Click markers to analyze
                </span>
              </div>

              <div className="space-y-2.5">
                {currentCase.indicators.map((ind) => {
                  const isRevealed = revealedIndicators.has(ind.id);
                  return (
                    <div
                      key={ind.id}
                      className="rounded-xl border border-slate-800/80 bg-slate-950/70 overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleIndicator(ind.id)}
                        className="w-full p-3 text-left flex items-center justify-between gap-2 text-xs font-semibold text-slate-200 hover:text-cyan-300 cyber-focus-ring"
                        aria-expanded={isRevealed}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyan-400" />
                          <span>{ind.label}</span>
                        </div>
                        <span className="text-slate-500 text-[11px] font-mono">
                          {isRevealed ? '▲ Close' : '▼ Details'}
                        </span>
                      </button>

                      {isRevealed && (
                        <div className="p-3 pt-0 border-t border-slate-800/60 space-y-2 text-xs text-slate-300 animate-in fade-in duration-200">
                          <div className="p-2 rounded bg-slate-900/90 font-mono text-[11px] text-amber-300">
                            {ind.evidenceText}
                          </div>
                          <p>{ind.explanation}</p>
                          <p className="text-slate-400 italic text-[11px]">
                            <strong>Why it matters:</strong> {ind.whyItMatters}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Immediate Verdict Evaluation Card (when submitted) */}
            {userSubmission && (
              <div
                role="status"
                aria-live="polite"
                className={`p-5 rounded-2xl border space-y-3.5 animate-in fade-in duration-300 ${
                  userSubmission.isCorrect
                    ? 'border-emerald-500/40 bg-emerald-950/30'
                    : 'border-amber-500/40 bg-amber-950/30'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {userSubmission.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
                      <span className="font-bold text-emerald-300 text-base">
                        Forensic Assessment Confirmed! (+1 Point)
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                      <span className="font-bold text-amber-300 text-base">
                        Investigative Risk Identified
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentCase.verdictExplanation}
                </p>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="font-mono text-cyan-400 uppercase font-bold text-[10px] block">
                    Defensive Key Takeaway:
                  </span>
                  <p>{currentCase.holisticTakeaway}</p>
                </div>

                {/* Case Step Buttons */}
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

                  {activeCaseIndex < PHISHING_CASES.length - 1 ? (
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
                      {isLabFinished ? 'All Cases Completed!' : 'Last Case in Lab'}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
