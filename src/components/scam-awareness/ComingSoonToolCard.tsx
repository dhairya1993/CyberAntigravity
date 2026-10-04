import React from 'react';
import { Link2, MessageSquareText, Clock, Wrench } from 'lucide-react';

export interface ComingSoonToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  statusBadge?: string;
  specLabel: string;
  specContent: string;
  roadmapStatus: string;
  accentColor?: 'cyan' | 'purple';
}

export const ComingSoonToolCard: React.FC<ComingSoonToolCardProps> = ({
  title,
  description,
  icon,
  statusBadge = 'Coming Soon',
  specLabel,
  specContent,
  roadmapStatus,
  accentColor = 'cyan',
}) => {
  const isPurple = accentColor === 'purple';

  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-950 to-slate-950 p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isPurple
                ? 'bg-purple-950/60 border border-purple-800/80 text-purple-400'
                : 'bg-cyan-950/60 border border-cyan-800/80 text-cyan-400'
            }`}
          >
            {icon}
          </div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-semibold ${
              isPurple
                ? 'border-purple-800 bg-purple-950/60 text-purple-300'
                : 'border-cyan-800 bg-cyan-950/60 text-cyan-300'
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> {statusBadge}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-400 space-y-1.5 font-mono">
          <strong className="text-slate-300 block">{specLabel}:</strong>
          <p>{specContent}</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-mono">Status: {roadmapStatus}</span>
        <span
          className={`text-xs font-semibold cursor-default ${
            isPurple ? 'text-purple-400/80' : 'text-cyan-400/80'
          }`}
        >
          Preview Roadmap &rarr;
        </span>
      </div>
    </div>
  );
};

export const ComingSoonToolsSection: React.FC = () => {
  return (
    <section id="future-tools" className="py-16 sm:py-20 relative bg-slate-950/70 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-xs font-mono text-cyan-400 font-semibold mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>Planned Security Utilities</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Upcoming Defensive Tools
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            We believe in honest cybersecurity tooling. We will never build fake scanners or claim instant AI detection without verified server-side threat intelligence. Here is what our engineering roadmap holds:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tool 1: Suspicious Link Checker */}
          <ComingSoonToolCard
            title="Suspicious Link Checker"
            description="Learn how to examine a suspicious URL before opening it. Future releases will explore integration with domain age registries, TLS certificate transparency logs, and threat intelligence databases."
            icon={<Link2 className="w-6 h-6" />}
            statusBadge="Coming Soon"
            specLabel="Design Principle"
            specContent="No automated guesswork or fake safety meters. Planned to guide users through structural URL checks before opening unfamiliar links."
            roadmapStatus="Architecture Design"
            accentColor="cyan"
          />

          {/* Tool 2: Scam Message Analyzer */}
          <ComingSoonToolCard
            title="Scam Message Analyzer"
            description="Future educational tool for analyzing suspicious messages for common social-engineering warning signs, linguistic manipulation patterns, and artificial urgency heuristics."
            icon={<MessageSquareText className="w-6 h-6" />}
            statusBadge="Coming Soon"
            specLabel="Privacy Principle"
            specContent="Planned with client-side analysis principles. Input text will not be stored, retained for model training, or shared with third parties."
            roadmapStatus="Heuristic Specification"
            accentColor="purple"
          />
        </div>
      </div>
    </section>
  );
};
