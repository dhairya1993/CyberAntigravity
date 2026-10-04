import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

interface TrustDisclaimerProps {
  className?: string;
  variant?: 'banner' | 'card';
}

export const TrustDisclaimer: React.FC<TrustDisclaimerProps> = ({
  className = '',
  variant = 'card',
}) => {
  if (variant === 'banner') {
    return (
      <div className={`bg-amber-950/40 border-y border-amber-900/60 px-4 py-3 text-amber-200/90 text-xs ${className}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Educational Resource Only:</strong> CyberAntigravity provides educational scam-awareness information. No checklist or quiz can guarantee that a message, person, website, or transaction is safe.
            </span>
          </div>
          <span className="hidden md:inline-block font-semibold text-amber-400 text-[11px] shrink-0">
            Always independently verify important requests through official channels.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-amber-900/50 bg-gradient-to-r from-amber-950/30 via-slate-950/70 to-slate-950/90 p-5 sm:p-6 backdrop-blur-sm ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800/80 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 font-mono">
              Educational Trust Notice
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-amber-800/60 bg-amber-950/50 text-amber-300">
              No Personal Data Required &bull; Runs in Browser
            </span>
          </div>
          <h3 className="text-base font-bold text-white">
            Educational Guidance &bull; Independent Verification Mandatory
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            CyberAntigravity provides educational scam-awareness information. No checklist or quiz can guarantee that a message, person, website, or transaction is safe.
          </p>
          <p className="text-xs sm:text-sm text-amber-300/90 font-medium pt-1">
            Always independently verify important requests through official channels, public directories, or known phone numbers before transmitting funds or sensitive information.
          </p>
        </div>
      </div>
    </div>
  );
};
