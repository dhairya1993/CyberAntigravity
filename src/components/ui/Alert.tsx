import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, ShieldAlert } from 'lucide-react';

export interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'warning' | 'danger' | 'success' | 'threat';
  title?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  title,
  icon,
  className = '',
}) => {
  const styles = {
    info: 'bg-cyan-950/40 border-cyan-800/60 text-cyan-300',
    warning: 'bg-amber-950/40 border-amber-800/60 text-amber-300',
    danger: 'bg-rose-950/40 border-rose-800/60 text-rose-300',
    success: 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300',
    threat: 'bg-gradient-to-r from-red-950/50 via-slate-900/60 to-slate-900/50 border-red-800/60 text-red-200',
  };

  const defaultIcons = {
    info: <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
    danger: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />,
    threat: <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5 animate-pulse" />,
  };

  return (
    <div
      role="alert"
      className={`rounded-xl border p-4 flex items-start gap-3.5 backdrop-blur-sm ${styles[variant]} ${className}`}
    >
      {icon || defaultIcons[variant]}
      <div className="flex-1">
        {title && <h4 className="font-semibold text-sm mb-1 text-white">{title}</h4>}
        <div className="text-sm opacity-90 leading-relaxed">{children}</div>
      </div>
    </div>
  );
};
