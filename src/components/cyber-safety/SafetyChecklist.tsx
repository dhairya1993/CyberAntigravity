'use client';

import React, { useState } from 'react';
import {
  KeyRound,
  ShieldCheck,
  RefreshCw,
  MailWarning,
  Link2Off,
  Wifi,
  Database,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  Circle,
  HelpCircle,
  Zap,
} from 'lucide-react';

interface ChecklistPractice {
  id: string;
  number: number;
  title: string;
  shortExplanation: string;
  whyItMatters: string;
  simpleAction: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CHECKLIST_PRACTICES: ChecklistPractice[] = [
  {
    id: 'passwords',
    number: 1,
    title: 'Use Strong Unique Passwords',
    shortExplanation: 'Generate separate, long passphrases for every single service so one breach never cascades.',
    whyItMatters: 'Over 80% of hacking-related breaches stem from stolen, weak, or reused passwords across accounts.',
    simpleAction: 'Adopt a password manager and ensure passwords are at least 16 characters or 4 random words.',
    icon: KeyRound,
  },
  {
    id: 'mfa',
    number: 2,
    title: 'Enable MFA',
    shortExplanation: 'Adds another verification layer even if your password is compromised.',
    whyItMatters: 'Multi-factor authentication stops automated credential stuffers and brute-force bots in their tracks.',
    simpleAction: 'Switch on an authenticator app (such as Google Authenticator or 2FAS) or passkeys on email & banking.',
    icon: ShieldCheck,
  },
  {
    id: 'updates',
    number: 3,
    title: 'Keep Software Updated',
    shortExplanation: 'Install system and browser security patches immediately to close published vulnerabilities.',
    whyItMatters: 'Cybercriminals routinely scan networks for unpatched flaws with known exploits (CVEs).',
    simpleAction: 'Enable automatic updates on your OS (Windows, macOS, iOS, Android) and browsers.',
    icon: RefreshCw,
  },
  {
    id: 'messages',
    number: 4,
    title: 'Verify Suspicious Messages',
    shortExplanation: 'Treat urgent or emotional requests for money, codes, or credentials with immediate skepticism.',
    whyItMatters: 'Social engineering manipulates trust and panic to bypass all technical defenses.',
    simpleAction: 'Contact the alleged sender out-of-band using an official, independently found phone number.',
    icon: MailWarning,
  },
  {
    id: 'links',
    number: 5,
    title: 'Avoid Unknown Links',
    shortExplanation: 'Inspect actual destination URLs before clicking links in SMS, emails, or direct messages.',
    whyItMatters: 'Phishing websites look virtually identical to legitimate banks, parcel trackers, and login portals.',
    simpleAction: 'Hover over links to inspect the true root domain, or navigate to official portals via bookmarks.',
    icon: Link2Off,
  },
  {
    id: 'wifi',
    number: 6,
    title: 'Secure Your Wi-Fi',
    shortExplanation: 'Enforce strong WPA2/WPA3 encryption at home and exercise caution on unencrypted public networks.',
    whyItMatters: 'Unsecured wireless connections allow local attackers to intercept unencrypted traffic and inject malicious redirects.',
    simpleAction: 'Change the default router administrative password and never conduct banking on open public Wi-Fi without VPN.',
    icon: Wifi,
  },
  {
    id: 'backups',
    number: 7,
    title: 'Back Up Important Data',
    shortExplanation: 'Maintain redundant offline and cloud copies of vital documents, photos, and project files.',
    whyItMatters: 'Hardware failures, accidental deletions, and ransomware can destroy data permanently.',
    simpleAction: 'Implement the 3-2-1 rule: 3 copies of data, across 2 different media, with 1 copy stored securely off-site.',
    icon: Database,
  },
  {
    id: 'privacy',
    number: 8,
    title: 'Review Privacy Settings',
    shortExplanation: 'Audit app permissions and restrict background location, contacts, and microphone access.',
    whyItMatters: 'Excessive permissions enable commercial trackers and compromised apps to harvest personal telemetry.',
    simpleAction: 'Open your mobile settings every quarter and revoke unnecessary permissions from dormant apps.',
    icon: SlidersHorizontal,
  },
];

export const SafetyChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const checkedCount = Object.values(checkedIds).filter(Boolean).length;
  const totalCount = CHECKLIST_PRACTICES.length;
  const progressPercent = Math.round((checkedCount / totalCount) * 100);

  const handleCheckAll = () => {
    const all: Record<string, boolean> = {};
    CHECKLIST_PRACTICES.forEach((p) => {
      all[p.id] = true;
    });
    setCheckedIds(all);
  };

  const handleReset = () => {
    setCheckedIds({});
  };

  return (
    <section id="safety-checklist" className="py-16 md:py-24 relative scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Baseline Hygiene</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Your Everyday Cyber Safety Checklist
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Consistently practicing these 8 foundational cyber safety habits neutralizes the vast majority of automated credential attacks, ransomware infections, and opportunistic social engineering scams.
          </p>
        </div>

        {/* Interactive Progress Tracking Banner */}
        <div className="max-w-4xl mx-auto mb-10 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 backdrop-blur-md shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Defensive Readiness Meter
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {checkedCount} / {totalCount}
                </span>
                <span className="text-xs sm:text-sm text-slate-400">Habits Active</span>
                {checkedCount === totalCount && (
                  <span className="ml-2 text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Fully Fortified!
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={handleCheckAll}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-950/70 border border-cyan-800/80 hover:bg-cyan-900/60 transition-colors cyber-focus-ring"
              >
                Mark All Practiced
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 bg-slate-950 border border-slate-800 hover:text-white hover:bg-slate-800 transition-colors cyber-focus-ring"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
            <span>Click any card to expand action guidance</span>
            <span>{progressPercent}% Complete</span>
          </div>
        </div>

        {/* 8 Practices Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CHECKLIST_PRACTICES.map((item) => {
            const isChecked = Boolean(checkedIds[item.id]);
            const isExpanded = expandedId === item.id;
            const ItemIcon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => toggleExpand(item.id)}
                className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer group select-none ${
                  isChecked
                    ? 'bg-slate-900/90 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                    : isExpanded
                    ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div className="p-5 sm:p-6">
                  {/* Top Bar with Number, Icon & Checkbox */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${
                          isChecked
                            ? 'bg-emerald-950/80 border-emerald-800 text-emerald-400'
                            : 'bg-slate-950 border-slate-800 text-cyan-400 group-hover:border-cyan-500/40'
                        }`}
                      >
                        <ItemIcon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800/90 text-slate-400 border border-slate-700/60">
                        0{item.number}
                      </span>
                    </div>

                    {/* Interactive Checkbox Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleCheck(item.id, e)}
                      aria-label={`Mark "${item.title}" as ${isChecked ? 'uncompleted' : 'completed'}`}
                      className={`p-1.5 rounded-lg border transition-all cyber-focus-ring ${
                        isChecked
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 hover:bg-emerald-400'
                          : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-cyan-400 hover:border-slate-700'
                      }`}
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Title & Short Explanation */}
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.shortExplanation}
                  </p>

                  {/* Status Indicator Chip */}
                  <div className="mt-3.5 flex items-center gap-1.5 text-[11px] font-mono">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isChecked ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'
                      }`}
                    />
                    <span className={isChecked ? 'text-emerald-300 font-semibold' : 'text-slate-400'}>
                      {isChecked ? 'Habit Practiced' : 'Pending Verification'}
                    </span>
                  </div>

                  {/* Expandable Educational Explanation */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3 text-xs leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 animate-in fade-in duration-200">
                      <div>
                        <div className="flex items-center gap-1 text-cyan-300 font-semibold mb-1">
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>Why it matters:</span>
                        </div>
                        <p className="text-slate-300 pl-4.5 border-l border-cyan-800/50">
                          {item.whyItMatters}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/60">
                        <div className="flex items-center gap-1 text-emerald-300 font-semibold mb-1">
                          <Zap className="w-3.5 h-3.5" />
                          <span>Simple action:</span>
                        </div>
                        <p className="text-slate-300 pl-4.5 border-l border-emerald-800/50">
                          {item.simpleAction}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Expand Button */}
                <div className="px-5 pb-5 pt-0">
                  <div className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs font-medium text-slate-300 bg-slate-950/60 group-hover:bg-slate-800 border border-slate-800/80 transition-colors">
                    <span>{isExpanded ? 'Hide breakdown' : 'Why it matters & Simple action'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
