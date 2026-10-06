import React from 'react';
import {
  Sparkles,
  Bot,
  Radio,
  Zap,
  Brain,
  Shield,
  Info,
} from 'lucide-react';

export const AiCyberFutureSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative border-t border-slate-800/80 bg-slate-950/70 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-purple-950/20 via-cyan-950/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Forward-Looking Technology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Where Cybersecurity <span className="text-cyan-400">Is Going</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            The next era of defensive security unites machine intelligence, telemetry automation, and irreplaceable human analytical discernment into an adaptive defense ecosystem.
          </p>
        </div>

        {/* Graphical Formula Architecture Illustration (Specification 13) */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle Cyber Grid */}
          <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

          {/* Graphical Circuit Equation */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
            {/* Component 1: AI */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/30 flex flex-col items-center text-center space-y-3 group hover:border-purple-400 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/50 flex items-center justify-center text-purple-300">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-mono font-bold text-white uppercase">AI Intelligence</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Heuristic anomaly detection & pattern modeling
                </p>
              </div>
            </div>

            {/* Component 2: Threat Intelligence */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 flex flex-col items-center text-center space-y-3 group hover:border-cyan-400 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-300">
                <Radio className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-mono font-bold text-white uppercase">Threat Feeds</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Global telemetry on fresh malicious domains & kits
                </p>
              </div>
            </div>

            {/* Component 3: Automation */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/30 flex flex-col items-center text-center space-y-3 group hover:border-amber-400 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-500/50 flex items-center justify-center text-amber-300">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-mono font-bold text-white uppercase">Automation</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Zero-delay containment & origin quarantine
                </p>
              </div>
            </div>

            {/* Component 4: Human Awareness */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 flex flex-col items-center text-center space-y-3 group hover:border-emerald-400 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-300">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-mono font-bold text-white uppercase">Human Awareness</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Skeptical pause, critical scrutiny & verified decisions
                </p>
              </div>
            </div>

            {/* Result: Future Cyber Defense Shield */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-cyan-950/60 to-slate-900 border border-cyan-400 flex flex-col items-center text-center space-y-3 shadow-xl shadow-cyan-950/40">
              <div className="w-12 h-12 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center font-bold">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-widest block">
                  THE FORMULA
                </span>
                <h4 className="text-sm font-mono font-black text-white uppercase mt-0.5">
                  Future Cyber Defense
                </h4>
              </div>
            </div>
          </div>

          {/* Connecting SVG Circuit Flow Line underneath */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              Educational Concept Preview: Building literacy for tomorrow&apos;s security landscape.
            </span>
            <span>Ethical Defensive Focus</span>
          </div>
        </div>
      </div>
    </section>
  );
};
