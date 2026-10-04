import React from 'react';
import {
  AlertOctagon,
  Hourglass,
  Shield,
  Coins,
  HelpCircle,
  UserCheck,
  Briefcase,
  GitCommit,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { SCAM_ANATOMY_PHASES, PSYCHOLOGICAL_TRIGGERS } from '@/data/scamAwarenessData';

export const ScamAnatomy: React.FC = () => {
  const renderTriggerIcon = (iconName: string) => {
    const className = 'w-5 h-5 text-amber-400';
    switch (iconName) {
      case 'AlertOctagon':
        return <AlertOctagon className={className} />;
      case 'Hourglass':
        return <Hourglass className={className} />;
      case 'Shield':
        return <Shield className={className} />;
      case 'Coins':
        return <Coins className={className} />;
      case 'HelpCircle':
        return <HelpCircle className={className} />;
      case 'UserCheck':
        return <UserCheck className={className} />;
      case 'Briefcase':
        return <Briefcase className={className} />;
      default:
        return <Lock className={className} />;
    }
  };

  return (
    <section id="scam-anatomy" className="py-16 sm:py-20 relative bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Part 1: Inside a Typical Scam (6 Phases) */}
        <div>
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-xs font-mono text-cyan-400 font-semibold mb-3">
              <GitCommit className="w-3.5 h-3.5" />
              <span>Attack Progression</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Inside a Typical Scam: The 6 Progression Phases
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Every social engineering operation follows an orderly behavioral progression. Understanding the timeline allows you to intervene before harm occurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCAM_ANATOMY_PHASES.map((phase) => (
              <div
                key={phase.number}
                className="rounded-2xl border border-slate-800/90 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center">
                      0{phase.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-slate-800 text-slate-400">
                      Phase {phase.number}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">{phase.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{phase.description}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono text-amber-400/90 font-semibold block uppercase tracking-wider mb-1">
                    Attacker Vector:
                  </span>
                  <p className="text-xs text-slate-400 leading-normal">{phase.tactic}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: Psychological Triggers Explored */}
        <div className="pt-8 border-t border-slate-800/80">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-xs font-mono text-amber-400 font-semibold mb-3">
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>Cognitive Biases</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              7 Psychological Triggers Exploited by Scammers
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Criminals do not attack your firewall; they attack your psychology. Here is how each emotional button is pushed and how to neutralize it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PSYCHOLOGICAL_TRIGGERS.map((trigger) => (
              <div
                key={trigger.name}
                className="rounded-2xl border border-slate-800/90 bg-slate-900/50 p-6 flex flex-col justify-between space-y-4 hover:border-amber-900/50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                      {renderTriggerIcon(trigger.iconName)}
                    </div>
                    <h3 className="text-base font-bold text-white">{trigger.name}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{trigger.explanation}</p>
                </div>

                {/* Example Quote */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs font-mono text-amber-300/90 italic">
                  {trigger.example}
                </div>

                {/* Counter Action */}
                <div className="pt-2 border-t border-slate-800/80 text-xs">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5 mb-1 font-mono uppercase tracking-wider text-[10px]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Defensive Response:
                  </span>
                  <p className="text-slate-300 leading-relaxed">{trigger.counterAction}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
