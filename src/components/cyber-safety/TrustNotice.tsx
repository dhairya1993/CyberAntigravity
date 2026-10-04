import React from 'react';
import {
  ShieldCheck,
  Flame,
  ShieldAlert,
  CheckCircle2,
  Info,
  Scale,
} from 'lucide-react';
import { TRUST_TENETS } from '@/data/cyberSafetyHubData';

export const TrustNotice: React.FC = () => {
  const getIcon = (name: string) => {
    const props = { className: 'w-5 h-5 text-cyan-400' };
    switch (name) {
      case 'Flame':
        return <Flame {...props} />;
      case 'ShieldAlert':
        return <ShieldAlert {...props} />;
      case 'CheckCircle2':
        return <CheckCircle2 {...props} />;
      case 'Info':
        return <Info {...props} />;
      default:
        return <ShieldCheck {...props} />;
    }
  };

  return (
    <section className="py-16 md:py-24 relative border-t border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5 text-cyan-400" />
            <span>Our Educational Philosophy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            CyberAntigravity is built to educate, not to create fear.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Effective digital defense comes from clear understanding, habitual digital hygiene, and critical thinking—not sensation, paranoia, or predatory marketing.
          </p>
        </div>

        {/* 4 Tenets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_TENETS.map((tenet, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-lg"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-4">
                  {getIcon(tenet.iconName)}
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {tenet.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {tenet.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Factual Disclaimer Banner */}
        <div className="mt-10 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start gap-3">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-slate-200">Legal & Advisory Boundary:</span>
            <p>
              CyberAntigravity produces educational analyses, checklists, and guides for defensive literacy. Our materials do not constitute legal advice, regulatory compliance certification, or dedicated professional incident-response services. If your organization is undergoing an active network compromise or data breach, immediately retain certified incident response counsel and notify competent legal and statutory authorities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
