'use client';

import React, { useState, useSyncExternalStore, useMemo } from 'react';
import Link from 'next/link';
import {
  Award,
  ShieldCheck,
  ShieldAlert,
  Search,
  Flame,
  CheckCircle2,
  Lock,
  ExternalLink,
  Sparkles,
  Info,
  FileCode,
  Image as ImageIcon,
} from 'lucide-react';
import {
  getStorageSnapshot,
  calculateForensicBadges,
  ForensicBadge,
} from '@/lib/badgeCalculator';
import { downloadBadgeAsSvg, downloadBadgeAsPng } from '@/lib/badgeSvgGenerator';

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('cyberantigravity_progress_update', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('cyberantigravity_progress_update', callback);
  };
}

function getSnapshot() {
  if (typeof window === 'undefined') return '';
  const p = window.localStorage.getItem('cyberantigravity_phishing_lab_v1') || '';
  const u = window.localStorage.getItem('cyberantigravity_url_lab_v1') || '';
  const c = window.localStorage.getItem('cyberantigravity_daily_challenge_v1') || '';
  return `${p}:::${u}:::${c}`;
}

function getServerSnapshot() {
  return '';
}

export function ForensicCompletionBadges() {
  // Client-side storage subscription
  const storageHash = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [recipientName, setRecipientName] = useState('Cyber Defender');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const badges = useMemo(() => {
    // storageHash is used as dependency to recalculate whenever local storage changes
    void storageHash;
    const snapshot = getStorageSnapshot();
    return calculateForensicBadges(snapshot);
  }, [storageHash]);

  const handleDownloadSvg = (badge: ForensicBadge) => {
    downloadBadgeAsSvg(badge, recipientName.trim() || 'Cyber Defender');
    setDownloadSuccess(`Downloaded ${badge.title} SVG vector!`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleDownloadPng = (badge: ForensicBadge) => {
    downloadBadgeAsPng(badge, recipientName.trim() || 'Cyber Defender', () => {
      setDownloadSuccess(`Downloaded ${badge.title} (Vector fallback)`);
    });
    setDownloadSuccess(`Exported high-res PNG for ${badge.title}!`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const unlockedCount = badges.filter((b) => b.criteria.isUnlocked).length;

  return (
    <section
      id="forensic-badges"
      aria-labelledby="forensic-badges-heading"
      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden"
    >
      {/* Background glow accent */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Lab Credentials</span>
          </div>
          <h2
            id="forensic-badges-heading"
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
          >
            Forensic Completion Badges
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-slate-400 max-w-2xl">
            Complete hands-on cybersecurity triage labs to earn high-resolution, vector-rendered
            completion credentials. Generated 100% in your browser with zero registration required.
          </p>
        </div>

        {/* Global Stats Badge */}
        <div className="flex items-center gap-3 bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3 shrink-0">
          <div className="p-2.5 rounded-lg bg-cyan-950/40 text-cyan-400 border border-cyan-500/20">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Badges Unlocked
            </div>
            <div className="text-xl font-mono font-bold text-white">
              <span className={unlockedCount > 0 ? 'text-cyan-400' : 'text-slate-400'}>
                {unlockedCount}
              </span>
              <span className="text-slate-500"> / {badges.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recipient Customization Bar */}
      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/50 border border-slate-800">
        <div className="flex-1">
          <label
            htmlFor="badge-recipient-name"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1"
          >
            Recipient Name on Badges (Max 32 chars)
          </label>
          <input
            id="badge-recipient-name"
            type="text"
            maxLength={32}
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="e.g. Alex Chen, Cyber Defender, Analyst"
            className="w-full sm:max-w-md px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-1.5 self-start sm:self-center">
          <Info className="w-4 h-4 text-slate-500 shrink-0" />
          <span>Names are rendered locally on your device and never sent to any server.</span>
        </div>
      </div>

      {/* Success Notification */}
      {downloadSuccess && (
        <div
          role="status"
          aria-live="polite"
          className="mt-4 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fade-in"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Badges Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {badges.map((badge) => {
          const isUnlocked = badge.criteria.isUnlocked;
          const progressPercent = Math.min(
            100,
            Math.round((badge.criteria.current / badge.criteria.required) * 100)
          );

          const borderStyle = isUnlocked
            ? badge.accentColor === 'rose'
              ? 'border-rose-500/40 bg-gradient-to-b from-rose-950/20 to-slate-950/80 shadow-rose-950/20'
              : badge.accentColor === 'amber'
              ? 'border-amber-500/40 bg-gradient-to-b from-amber-950/20 to-slate-950/80 shadow-amber-950/20'
              : badge.accentColor === 'emerald'
              ? 'border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 to-slate-950/80 shadow-emerald-950/20'
              : 'border-cyan-500/40 bg-gradient-to-b from-cyan-950/20 to-slate-950/80 shadow-cyan-950/20'
            : 'border-slate-800 bg-slate-950/40 opacity-90';

          const accentBadgeClass =
            badge.accentColor === 'rose'
              ? 'bg-rose-950/40 text-rose-400 border-rose-500/30'
              : badge.accentColor === 'amber'
              ? 'bg-amber-950/40 text-amber-400 border-amber-500/30'
              : badge.accentColor === 'emerald'
              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
              : 'bg-cyan-950/40 text-cyan-400 border-cyan-500/30';

          const progressBarColor =
            badge.accentColor === 'rose'
              ? 'bg-rose-500'
              : badge.accentColor === 'amber'
              ? 'bg-amber-500'
              : badge.accentColor === 'emerald'
              ? 'bg-emerald-500'
              : 'bg-cyan-500';

          return (
            <div
              key={badge.id}
              className={`flex flex-col justify-between rounded-xl border p-5 sm:p-6 transition-all duration-200 shadow-lg ${borderStyle}`}
            >
              <div>
                {/* Badge Card Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-xl border flex items-center justify-center shrink-0 ${accentBadgeClass}`}
                    >
                      {badge.iconName === 'ShieldAlert' && (
                        <ShieldAlert className="w-6 h-6" />
                      )}
                      {badge.iconName === 'Search' && <Search className="w-6 h-6" />}
                      {badge.iconName === 'Flame' && <Flame className="w-6 h-6" />}
                      {badge.iconName === 'Award' && <Award className="w-6 h-6" />}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono tracking-wider font-semibold uppercase text-slate-400">
                        {badge.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                        {badge.title}
                      </h3>
                    </div>
                  </div>

                  {/* Verification Status Pill */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      isUnlocked
                        ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Unlocked</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5 text-slate-500" />
                        <span>Locked</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {badge.summary}
                </p>

                {/* Criteria & Progress Bar */}
                <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800/80 mb-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400 font-medium">Requirement</span>
                    <span className="font-mono font-bold text-slate-200">
                      {badge.criteria.current} / {badge.criteria.required}{' '}
                      <span className="text-slate-400 font-normal">
                        ({progressPercent}%)
                      </span>
                    </span>
                  </div>
                  <div
                    className="w-full h-2 rounded-full bg-slate-800 overflow-hidden"
                    role="progressbar"
                    aria-valuenow={progressPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${badge.title} completion progress`}
                  >
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${progressBarColor}`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400">
                    {badge.criteria.description}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-800/60">
                {isUnlocked ? (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleDownloadSvg(badge)}
                      aria-label={`Download ${badge.title} vector badge as SVG`}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-md shadow-cyan-950/50"
                    >
                      <FileCode className="w-4 h-4 shrink-0" />
                      <span>Download SVG</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadPng(badge)}
                      aria-label={`Export ${badge.title} badge as high-resolution PNG`}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                      <ImageIcon className="w-4 h-4 shrink-0 text-cyan-400" />
                      <span>Export PNG</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href={badge.criteria.linkHref}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <span>{badge.criteria.linkLabel}</span>
                    <ExternalLink className="w-4 h-4 text-cyan-400" />
                  </Link>
                )}

                {/* Verification ID footnote */}
                <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>CODE: {badge.verificationCode}</span>
                  {badge.earnedDate && <span>EARNED: {badge.earnedDate}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Educational Notice */}
      <div className="mt-8 p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
        <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-400 leading-relaxed">
          <span className="font-semibold text-slate-300">Motivational Educational Credentials:</span>{' '}
          These badges recognize completion of defensive cybersecurity investigations inside CyberAntigravity.
          Progress is evaluated locally in your browser session without tracking or server accounts. Badges are
          intended for educational recognition and personal portfolios; they do not represent government clearance or
          formal industry certification.
        </div>
      </div>
    </section>
  );
}
