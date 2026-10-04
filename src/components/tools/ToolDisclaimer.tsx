'use client';

import { ShieldAlert } from 'lucide-react';

interface ToolDisclaimerProps {
  className?: string;
}

export const ToolDisclaimer: React.FC<ToolDisclaimerProps> = ({ className = '' }) => {
  return (
    <div
      className={`rounded-xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-sm flex items-start gap-3.5 text-xs text-slate-300 ${className}`}
    >
      <ShieldAlert className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
      <div className="leading-relaxed">
        <strong className="text-white block mb-0.5">Educational Utility Disclaimer:</strong>
        CyberAntigravity tools are educational utilities. Results may be incomplete and should not be treated as a guarantee of security. They do not replace formal security audits or enterprise security monitoring.
      </div>
    </div>
  );
};
