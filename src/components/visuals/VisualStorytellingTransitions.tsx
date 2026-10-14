'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Pause,
  ShieldCheck,
  Send,
  Filter,
  CheckCircle2,
  Globe,
  Search,
  ExternalLink,
} from 'lucide-react';

export const VisualStorytellingTransitions: React.FC = () => {
  const [activeStory, setActiveStory] = useState<number>(0);

  const stories = [
    {
      title: 'THREAT TO DEFENSE CYCLE',
      subtitle: 'How an analytical mindset defuses deception',
      steps: [
        { label: 'Threat Lure', icon: ShieldAlert, color: 'text-rose-400 border-rose-800 bg-rose-950/60' },
        { label: 'Early Warning', icon: AlertTriangle, color: 'text-amber-400 border-amber-800 bg-amber-950/60' },
        { label: 'Conscious Decision', icon: Pause, color: 'text-cyan-400 border-cyan-800 bg-cyan-950/60' },
        { label: 'Shield Verified', icon: ShieldCheck, color: 'text-emerald-400 border-emerald-800 bg-emerald-950/60' },
      ],
      desc: 'Spotting the threat triggers early warnings, enabling a cognitive pause before executing decisive defense.',
    },
    {
      title: 'TRAFFIC INSPECTION PIPELINE',
      subtitle: 'From incoming network packet to validated payload',
      steps: [
        { label: 'Raw Packet', icon: Send, color: 'text-slate-300 border-slate-700 bg-slate-900/60' },
        { label: 'Inspection Filter', icon: Filter, color: 'text-cyan-400 border-cyan-800 bg-cyan-950/60' },
        { label: 'Threat Signature Check', icon: AlertTriangle, color: 'text-amber-400 border-amber-800 bg-amber-950/60' },
        { label: 'Verified Traffic', icon: CheckCircle2, color: 'text-emerald-400 border-emerald-800 bg-emerald-950/60' },
      ],
      desc: 'Inbound network payloads pass through defensive checkpoints, filtering out malicious markers before reaching systems.',
    },
    {
      title: 'URL INTEGRITY VERIFICATION',
      subtitle: 'Deconstructing deceptive addresses',
      steps: [
        { label: 'Suspicious URL', icon: Globe, color: 'text-rose-400 border-rose-800 bg-rose-950/60' },
        { label: 'Magnifying Inspection', icon: Search, color: 'text-cyan-400 border-cyan-800 bg-cyan-950/60' },
        { label: 'Typosquat Warning', icon: AlertTriangle, color: 'text-amber-400 border-amber-800 bg-amber-950/60' },
        { label: 'Safe Browsing', icon: ExternalLink, color: 'text-emerald-400 border-emerald-800 bg-emerald-950/60' },
      ],
      desc: 'Looking past visual brand mimicry to inspect domain mechanics keeps confidential logins protected.',
    },
  ];

  const current = stories[activeStory];

  return (
    <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
      <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 shadow-xl space-y-5">
        {/* Top Story Navigator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>VISUAL STORYTELLING • SECURITY TRANSITIONS</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {stories.map((s, idx) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setActiveStory(idx)}
                className={`px-3 py-1 rounded-lg text-[10px] font-mono uppercase font-bold transition-all cursor-pointer ${
                  activeStory === idx
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Story 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Transition Sequence Graphic with Live SVG Stream */}
        <div className="space-y-4 relative">
          {/* Connecting SVG Flow Stream on Desktop */}
          <div className="hidden md:block absolute top-[28px] left-[12%] right-[12%] h-4 pointer-events-none select-none z-0">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 16">
              <line x1="0" y1="8" x2="400" y2="8" stroke="#00f0ff" strokeWidth="2" strokeDasharray="6 4" className="animate-cyber-flow" opacity="0.65" />
              <circle r="3.2" fill="#00f0ff" opacity="0.95">
                <animateMotion dur="2.4s" repeatCount="indefinite" path="M 0 8 L 400 8" />
              </circle>
              <circle r="2" fill="#10b981" opacity="0.9">
                <animateMotion dur="1.7s" repeatCount="indefinite" path="M 0 8 L 400 8" />
              </circle>
            </svg>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
            {current.steps.map((st) => {
              const Icon = st.icon;
              return (
                <div key={st.label} className="relative flex flex-col items-center text-center space-y-2 p-3 rounded-xl border border-slate-800/80 bg-slate-900/80 backdrop-blur-sm shadow-md hover:border-slate-700 transition-all">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${st.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-mono font-bold text-white tracking-tight">
                    {st.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center sm:text-left text-xs text-slate-300 font-medium bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
            <span className="font-mono text-cyan-400 font-bold uppercase mr-2">{current.title}:</span>
            <span>{current.desc}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
