'use client';

import React from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, Scale } from 'lucide-react';

interface SafePracticeNoticeProps {
  className?: string;
}

export const SafePracticeNotice: React.FC<SafePracticeNoticeProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-slate-900/90 to-slate-950 p-6 md:p-8 backdrop-blur-md relative overflow-hidden ${className}`}
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start gap-5 relative">
        <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-400 shrink-0">
          <ShieldAlert className="w-6 h-6" />
        </div>

        <div className="space-y-3 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium tracking-wide uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Ethical Standard
            </span>
            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
              Practice Responsibly
            </h3>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Cybersecurity principles and testing methodologies taught on CyberAntigravity are designed
            strictly for defensive education, vulnerability remediation, and authorized security auditing.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Explicit Authorization:</strong> Only test systems, networks, or applications you own or have formal written consent to evaluate.
              </span>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Controlled Environments:</strong> Always practice inside authorized labs, local virtualization, or dedicated simulation sandboxes.
              </span>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Zero Unauthorized Access:</strong> Never intercept, scan, probe, or attempt unauthorized access against real-world external targets.
              </span>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <Scale className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Legal Compliance & Disclosure:</strong> Abide by local and international cyber legislation (CFAA, Computer Misuse Act) and follow responsible disclosure standards.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
