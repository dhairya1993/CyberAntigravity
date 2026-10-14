'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Compass,
  ArrowRight,
  Sparkles,
  BookOpen,
  Lock,
  Layers,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const LearningHero: React.FC = () => {
  const [activeTier, setActiveTier] = useState<1 | 2 | 3>(1);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-slate-800/80">
      {/* Background Cyber Glow & Grid */}
      <div className="absolute inset-0 bg-[#07090e] -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[22rem] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[24rem] h-[18rem] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>CYBERSECURITY LEARNING</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
            Learn Cybersecurity.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-200">
              Build Real-World Awareness.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Follow a structured path from cybersecurity fundamentals to advanced defensive security concepts and ethical hacking.
          </p>

          {/* Factual Educational Note (No Certification Claim) */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              Designed for defensive education and responsible security learning.
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              asLink
              href="/learn/cybersecurity-fundamentals"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="w-full sm:w-auto shadow-lg shadow-cyan-500/20"
            >
              Start With the Basics
            </Button>

            <Button
              asLink
              href="#roadmap"
              variant="outline"
              size="lg"
              icon={<Compass className="w-4 h-4" />}
              iconPosition="left"
              className="w-full sm:w-auto border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/60"
            >
              View Learning Roadmap
            </Button>

            <Button
              asLink
              href="/learn/progress"
              variant="outline"
              size="lg"
              icon={<Award className="w-4 h-4 text-amber-400" />}
              iconPosition="left"
              className="w-full sm:w-auto border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-950/20 text-amber-300"
            >
              My Progress &amp; Badges
            </Button>
          </div>

          {/* Interactive Tier Progression Showcase (Basic to Advanced) */}
          <div className="pt-8 text-left max-w-4xl mx-auto">
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider block">
                    Curriculum Progression Engine
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Explore Skills: From Everyday Defense to Advanced Security
                  </h3>
                </div>

                {/* 3 Tier Selector Tabs */}
                <div className="flex gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setActiveTier(1)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeTier === 1
                        ? 'bg-emerald-950 border border-emerald-500/50 text-emerald-300 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    1. Beginner
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTier(2)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeTier === 2
                        ? 'bg-cyan-950 border border-cyan-500/50 text-cyan-300 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    2. Intermediate
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTier(3)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeTier === 3
                        ? 'bg-purple-950 border border-purple-500/50 text-purple-300 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    3. Advanced
                  </button>
                </div>
              </div>

              {/* Dynamic Tier Visual and Description */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center pt-4">
                {/* Visual SVG Left */}
                <div className="md:col-span-7 h-44 rounded-xl bg-slate-950/80 border border-slate-800/90 p-2 relative flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 440 120" className="w-full h-full select-none" aria-hidden="true">
                    {activeTier === 1 && (
                      <>
                        {/* Tier 1: Client -> Firewall -> Encrypted HTTPS Web Server */}
                        <g transform="translate(20, 35)">
                          <rect width="60" height="50" rx="6" fill="#020617" stroke="#38bdf8" strokeWidth="1" />
                          <text x="30" y="24" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">CLIENT</text>
                          <text x="30" y="38" fill="#94a3b8" fontSize="7" textAnchor="middle" fontFamily="sans-serif">Student</text>
                        </g>

                        <line x1="80" y1="60" x2="190" y2="60" stroke="#10b981" strokeWidth="2" strokeDasharray="5 3" className="animate-cyber-flow" />
                        <circle r="4" fill="#34d399">
                          <animateMotion dur="2s" repeatCount="indefinite" path="M 80 60 L 190 60" />
                        </circle>

                        {/* Firewall Center */}
                        <g transform="translate(190, 25)">
                          <rect width="65" height="70" rx="8" fill="#020617" stroke="#10b981" strokeWidth="1.5" />
                          <circle cx="32" cy="22" r="12" fill="#064e3b" />
                          <text x="32" y="26" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">FILTER</text>
                          <text x="32" y="48" fill="#e2e8f0" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">FIREWALL</text>
                          <text x="32" y="60" fill="#6ee7b7" fontSize="6.5" textAnchor="middle" fontFamily="monospace">PORT 443 ✓</text>
                        </g>

                        <line x1="255" y1="60" x2="360" y2="60" stroke="#10b981" strokeWidth="2" strokeDasharray="5 3" className="animate-cyber-flow" />
                        <circle r="4" fill="#10b981">
                          <animateMotion dur="2s" repeatCount="indefinite" path="M 255 60 L 360 60" />
                        </circle>

                        {/* Verified HTTPS Server */}
                        <g transform="translate(360, 35)">
                          <rect width="60" height="50" rx="6" fill="#020617" stroke="#10b981" strokeWidth="1.2" />
                          <text x="30" y="22" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">HTTPS</text>
                          <text x="30" y="36" fill="#94a3b8" fontSize="7" textAnchor="middle" fontFamily="sans-serif">🔒 Bank/School</text>
                        </g>
                      </>
                    )}

                    {activeTier === 2 && (
                      <>
                        {/* Tier 2: Phishing Hook Intercepted by MFA Gate */}
                        <g transform="translate(20, 35)">
                          <rect width="70" height="50" rx="6" fill="#1e1014" stroke="#f43f5e" strokeWidth="1" />
                          <text x="35" y="22" fill="#f43f5e" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">PHISHING</text>
                          <text x="35" y="36" fill="#f87171" fontSize="7" textAnchor="middle" fontFamily="sans-serif">Fake Link</text>
                        </g>

                        <line x1="90" y1="60" x2="200" y2="60" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="4 3" className="animate-cyber-flow" />

                        {/* MFA Shield Gate */}
                        <g transform="translate(220, 60)">
                          <circle r="30" fill="#082f49" fillOpacity="0.5" stroke="#00f0ff" strokeWidth="2" className="animate-pulse" />
                          <circle r="36" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" className="animate-spin origin-center" style={{ animationDuration: '9s' }} />
                          <text x="0" y="-4" fill="#00f0ff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">MFA GATE</text>
                          <text x="0" y="8" fill="#38bdf8" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">2FA PUSH</text>
                          <text x="0" y="18" fill="#a5f3fc" fontSize="6.5" textAnchor="middle" fontFamily="sans-serif">Denied ✖</text>
                        </g>

                        {/* User Safe Device */}
                        <g transform="translate(340, 35)">
                          <rect width="80" height="50" rx="6" fill="#020617" stroke="#00f0ff" strokeWidth="1.2" />
                          <text x="40" y="22" fill="#00f0ff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">YOUR PHONE</text>
                          <text x="40" y="36" fill="#94a3b8" fontSize="7" textAnchor="middle" fontFamily="sans-serif">Code: 849 201</text>
                        </g>
                      </>
                    )}

                    {activeTier === 3 && (
                      <>
                        {/* Tier 3: Zero Trust AI Sentinel Engine */}
                        <g transform="translate(220, 60)">
                          <circle r="34" fill="#3b0764" fillOpacity="0.4" stroke="#c084fc" strokeWidth="2" className="animate-pulse" />
                          <circle r="42" stroke="#e879f9" strokeWidth="0.8" strokeDasharray="4 3" className="animate-spin origin-center" style={{ animationDuration: '12s' }} />
                          <text x="0" y="-6" fill="#c084fc" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">ZERO TRUST</text>
                          <text x="0" y="6" fill="#e879f9" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">AI SENTINEL</text>
                          <text x="0" y="17" fill="#cbd5e1" fontSize="6.5" textAnchor="middle" fontFamily="sans-serif">Continuous Check</text>
                        </g>

                        {/* 3 Telemetry Streams Ingress */}
                        <path d="M 40 25 L 180 50" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="4 3" className="animate-cyber-flow" />
                        <path d="M 40 60 L 180 60" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" className="animate-cyber-flow" />
                        <path d="M 40 95 L 180 70" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 3" className="animate-cyber-flow" />

                        <text x="80" y="22" fill="#00f0ff" fontSize="7" fontFamily="monospace">1. Passkey ID</text>
                        <text x="80" y="55" fill="#10b981" fontSize="7" fontFamily="monospace">2. Device Health</text>
                        <text x="80" y="105" fill="#a855f7" fontSize="7" fontFamily="monospace">3. Context Radar</text>

                        {/* Verified Fortified Output */}
                        <line x1="265" y1="60" x2="360" y2="60" stroke="#10b981" strokeWidth="2" strokeDasharray="5 3" className="animate-cyber-flow" />
                        <g transform="translate(360, 35)">
                          <rect width="65" height="50" rx="6" fill="#020617" stroke="#10b981" strokeWidth="1.5" />
                          <text x="32" y="24" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">APPROVED</text>
                          <text x="32" y="38" fill="#6ee7b7" fontSize="6.5" textAnchor="middle" fontFamily="sans-serif">Least Privilege</text>
                        </g>
                      </>
                    )}
                  </svg>
                </div>

                {/* Details Right */}
                <div className="md:col-span-5 space-y-2 text-xs">
                  {activeTier === 1 && (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold">
                          LEVELS 01 – 03
                        </span>
                        <span className="font-bold text-white text-sm">Beginner Foundation</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        Master the CIA Triad, understand how network packets travel through routers, and inspect HTTPS cryptographic locks.
                      </p>
                      <div className="space-y-1 pt-1 text-[11px] text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Understand IP packets and firewalls</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Verify browser security &amp; SSL certificates</span>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTier === 2 && (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] font-mono font-bold">
                          LEVELS 04 – 06
                        </span>
                        <span className="font-bold text-white text-sm">Intermediate Guardian</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        Activate Multi-Factor Authentication, build high-entropy passphrases, deflect data profiling trackers, and dismantle phishing lures.
                      </p>
                      <div className="space-y-1 pt-1 text-[11px] text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>FIDO2 Passkeys and TOTP authenticator setups</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>Spotting deceptive typosquatted domains</span>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTier === 3 && (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-mono font-bold">
                          LEVELS 07 – 09
                        </span>
                        <span className="font-bold text-white text-sm">Advanced Sentinel</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        Analyze SIEM event logs in real-time, understand ethical vulnerability disclosure, and enforce Zero Trust AI access policies.
                      </p>
                      <div className="space-y-1 pt-1 text-[11px] text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>Security Operations &amp; Incident Triage</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>Zero Trust continuous validation</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Micro Trust & Educational Badges */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-400">
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Self-Paced Architecture</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Defensive Focus</span>
            </div>
            <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>9 Comprehensive Levels</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
