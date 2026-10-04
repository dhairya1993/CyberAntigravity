import React from 'react';
import { Info, Lightbulb, AlertTriangle, ShieldAlert } from 'lucide-react';

interface ArticleCalloutProps {
  type: 'note' | 'tip' | 'warning' | 'danger';
  title: string;
  text: string;
}

export const ArticleCallout: React.FC<ArticleCalloutProps> = ({ type, title, text }) => {
  const config = {
    note: {
      border: 'border-blue-500/40',
      bg: 'bg-blue-950/20',
      text: 'text-blue-300',
      titleColor: 'text-blue-200',
      icon: <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />,
    },
    tip: {
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-950/20',
      text: 'text-emerald-300',
      titleColor: 'text-emerald-200',
      icon: <Lightbulb className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />,
    },
    warning: {
      border: 'border-amber-500/40',
      bg: 'bg-amber-950/20',
      text: 'text-amber-300',
      titleColor: 'text-amber-200',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
    },
    danger: {
      border: 'border-red-500/40',
      bg: 'bg-red-950/20',
      text: 'text-red-300',
      titleColor: 'text-red-200',
      icon: <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />,
    },
  }[type];

  return (
    <div className={`p-4 sm:p-5 rounded-xl border ${config.border} ${config.bg} flex items-start gap-3.5 my-6`}>
      {config.icon}
      <div className="space-y-1 text-xs sm:text-sm">
        <h4 className={`font-bold ${config.titleColor} tracking-wide`}>{title}</h4>
        <p className={`${config.text} leading-relaxed`}>{text}</p>
      </div>
    </div>
  );
};
