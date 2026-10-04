import React from 'react';
import {
  AlertOctagon,
  ShieldCheck,
  PhoneOff,
  KeyRound,
  Lock,
  Landmark,
  FileCheck2,
  AlertTriangle,
  Globe2,
} from 'lucide-react';
import { EMERGENCY_STEPS } from '@/data/cyberSafetyHubData';
import { EmergencyStepItem } from '@/types';

export const EmergencySteps: React.FC = () => {
  const getStepIcon = (num: number) => {
    const props = { className: 'w-5 h-5 text-rose-400' };
    switch (num) {
      case 1:
        return <PhoneOff {...props} />;
      case 2:
        return <AlertOctagon {...props} />;
      case 3:
        return <KeyRound {...props} />;
      case 4:
        return <Lock {...props} />;
      case 5:
        return <Landmark {...props} />;
      case 6:
        return <FileCheck2 {...props} />;
      default:
        return <ShieldCheck {...props} />;
    }
  };

  return (
    <section id="emergency-steps" className="py-16 md:py-24 relative scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-800/80 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            <span>Immediate Incident Protocol</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            What to Do If You Think You Are Being Scammed
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            If you suspect you are currently in contact with a scammer or inadvertently surrendered sensitive information, follow this step-by-step triage checklist immediately.
          </p>
        </div>

        {/* Steps Flow (1 to 6) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EMERGENCY_STEPS.map((step: EmergencyStepItem) => (
            <div
              key={step.stepNumber}
              className="rounded-2xl border border-slate-800/90 bg-slate-900/70 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-lg"
            >
              <div>
                {/* Step Indicator Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                      {getStepIcon(step.stepNumber)}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-rose-400 font-bold uppercase tracking-wider">
                        STEP {step.stepNumber}
                      </span>
                      <h3 className="text-base font-bold text-white leading-tight">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Primary Action Statement */}
                <p className="text-xs sm:text-sm font-semibold text-rose-200/90 mb-3 bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/50">
                  {step.action}
                </p>

                {/* Detailed Action Steps */}
                <ul className="space-y-2 text-xs text-slate-300 leading-relaxed mb-4">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Critical Warning if present */}
              {step.criticalWarning && (
                <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-800/70 text-[11px] text-amber-300 flex items-start gap-2 mt-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                  <span className="leading-snug">{step.criticalWarning}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Global Incident Reporting Guidance & Future Placeholder */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-800/40 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Global Citizen Official Reporting Framework
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Official Cybercrime Reporting Authority
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Because CyberAntigravity serves users worldwide, always contact and submit your report to{' '}
                <strong className="text-white font-semibold">
                  your country’s official national cybercrime or fraud reporting authority
                </strong>{' '}
                (such as your national computer emergency response team, national consumer protection agency, or local cybercrime police bureau).
              </p>
            </div>

            {/* Country Directory Placeholder */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 shrink-0 md:max-w-xs w-full">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-300">Jurisdiction Directory</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                  Expanding Soon
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                A curated international directory of verified governmental cybercrime portals across 150+ countries is currently being cataloged.
              </p>
              <div className="text-[11px] text-slate-500 italic">
                Always verify portals carry authentic government domains (.gov, .gov.uk, .gov.au, etc.).
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
