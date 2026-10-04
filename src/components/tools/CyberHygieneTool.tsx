'use client';

import React, { useState, useMemo, useSyncExternalStore } from 'react';
import {
  RotateCcw,
  Info,
  Printer,
  Copy,
  Check,
} from 'lucide-react';

interface ChecklistQuestion {
  id: string;
  title: string;
  description: string;
  recommendedAction: string;
}

const CHECKLIST_ITEMS: ChecklistQuestion[] = [
  {
    id: 'mfa',
    title: 'Multi-Factor Authentication (MFA) Enabled',
    description: 'Activated on primary email, online banking, password manager, and social media.',
    recommendedAction: 'Use an authenticator app (e.g. Aegis, 2FAS) or hardware FIDO2 key rather than SMS codes where possible.',
  },
  {
    id: 'unique_passwords',
    title: 'Unique Passwords Across All Services',
    description: 'No password is reused between two accounts, eliminating credential stuffing cascades.',
    recommendedAction: 'Install a password manager to generate and autofill 16+ character random passwords.',
  },
  {
    id: 'auto_updates',
    title: 'Automatic OS & Browser Updates Enabled',
    description: 'Operating systems, web browsers, and apps install security patches immediately.',
    recommendedAction: 'Keep automatic background updates turned on to defend against known exploited vulnerabilities (CVEs).',
  },
  {
    id: 'backups',
    title: 'Regular Backups Verified & Available',
    description: 'Critical files and documents are backed up to offline storage or encrypted cloud vaults.',
    recommendedAction: 'Apply the 3-2-1 rule: 3 copies of data, 2 different media types, 1 offsite or disconnected copy.',
  },
  {
    id: 'recovery_methods',
    title: 'Emergency Recovery Methods Configured',
    description: 'Account recovery codes (backup codes) are generated and stored in a secure physical location.',
    recommendedAction: 'Download and print account recovery backup codes before you lose access to your primary phone.',
  },
  {
    id: 'verify_links',
    title: 'Suspicious Links & Senders Verified Before Clicking',
    description: 'Unfamiliar emails, SMS texts, and direct messages are checked for spoofing before opening links.',
    recommendedAction: 'Navigate to websites directly via bookmarked URLs or official apps rather than clicking links in messages.',
  },
  {
    id: 'app_permissions',
    title: 'App & Extension Permissions Reviewed',
    description: 'Unnecessary mobile apps and browser extensions with broad access have been uninstalled.',
    recommendedAction: 'Audit browser extensions quarterly. Remove extensions you do not use daily to reduce attack surface.',
  },
  {
    id: 'screen_lock',
    title: 'Device Screen Lock & Biometrics Activated',
    description: 'Laptops, smartphones, and tablets require PIN, password, or biometric unlock with short timeout.',
    recommendedAction: 'Set auto-lock timeouts to 2-3 minutes or less so unattended devices remain protected.',
  },
  {
    id: 'account_audit',
    title: 'Important Financial & Email Accounts Reviewed',
    description: 'Active login sessions, authorized OAuth apps, and financial transaction alerts checked regularly.',
    recommendedAction: 'Review active device sessions in Google, Apple, and Microsoft account security dashboards monthly.',
  },
];

const STORAGE_KEY = 'cyberantigravity_hygiene_checklist';

function subscribeStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('cyber_hygiene_updated', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('cyber_hygiene_updated', callback);
  };
}

function getStorageSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || '{}';
  } catch {
    return '{}';
  }
}

function getServerSnapshot(): string {
  return '{}';
}

export const CyberHygieneTool: React.FC = () => {
  const snapshot = useSyncExternalStore(subscribeStorage, getStorageSnapshot, getServerSnapshot);
  const checkedItems: Record<string, boolean> = useMemo(() => {
    try {
      return JSON.parse(snapshot);
    } catch {
      return {};
    }
  }, [snapshot]);

  const [copied, setCopied] = useState(false);

  const toggleItem = (id: string) => {
    const updated = { ...checkedItems, [id]: !checkedItems[id] };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('cyber_hygiene_updated'));
    } catch {
      // Storage unavailable
    }
  };

  const handleReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event('cyber_hygiene_updated'));
    } catch {
      // Storage unavailable
    }
  };

  const completedCount = CHECKLIST_ITEMS.filter((item) => checkedItems[item.id]).length;
  const totalCount = CHECKLIST_ITEMS.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const handleCopy = async () => {
    const summary = CHECKLIST_ITEMS.map(
      (item) => `[${checkedItems[item.id] ? 'X' : ' '}] ${item.title}`
    ).join('\n');
    try {
      await navigator.clipboard.writeText(
        `Cyber Hygiene Checklist (${completedCount}/${totalCount} Complete):\n\n${summary}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* Privacy Notice */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white">Local Storage Only:</strong> Your checklist answers are stored strictly in your local browser storage so your progress is saved. No answers or personal information are ever transmitted to CyberAntigravity.
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-md space-y-6">
        {/* Progress Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
                Self-Audit
              </span>
              <span className="text-slate-500 font-mono text-xs">•</span>
              <span className="text-xs text-slate-400 font-mono">Checklist Progress</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Your Cyber Hygiene Checklist
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">
              Completed: <strong className="text-cyan-400">{completedCount}</strong> of {totalCount} Action Items
            </span>
            <span className="text-cyan-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Interactive Checklist Items */}
        <div className="space-y-3 pt-2">
          {CHECKLIST_ITEMS.map((item, index) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                role="checkbox"
                aria-checked={isChecked}
                tabIndex={0}
                onClick={() => toggleItem(item.id)}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    toggleItem(item.id);
                  }
                }}
                className={`p-4 sm:p-5 rounded-xl border text-left cursor-pointer transition-all duration-200 flex items-start gap-4 select-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                  isChecked
                    ? 'border-cyan-500/50 bg-cyan-950/20'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-950/80'
                }`}
              >
                <div className="pt-0.5 shrink-0">
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'border-cyan-400 bg-cyan-500 text-slate-950'
                        : 'border-slate-700 bg-slate-900'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">#{index + 1}</span>
                    <h4
                      className={`text-sm sm:text-base font-bold transition-colors ${
                        isChecked ? 'text-white' : 'text-slate-200'
                      }`}
                    >
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                  <p className="text-[11px] text-cyan-400/90 pt-1 font-mono">
                    <span className="text-slate-500">Action:</span> {item.recommendedAction}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
