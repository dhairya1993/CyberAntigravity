'use client';

import React, { useState } from 'react';
import {
  Skull,
  MailWarning,
  MousePointerClick,
  KeyRound,
  AlertOctagon,
  ShieldAlert,
  PauseCircle,
  CheckCircle2,
  Smartphone,
  ShieldCheck,
  Play,
  RotateCcw,
  ArrowRight,
  Info,
  Sparkles,
} from 'lucide-react';

interface SimulationStep {
  step: number;
  threatTitle: string;
  threatSubtitle: string;
  defenseTitle: string;
  defenseSubtitle: string;
  whatIsHappening: string;
  pauseVerifyText?: string;
  isDefenseSuccessful?: boolean;
}

const SIMULATION_STEPS: SimulationStep[] = [
  {
    step: 1,
    threatTitle: 'Attacker',
    threatSubtitle: 'Lure Prepared & Dispatched',
    defenseTitle: 'Suspicious Message',
    defenseSubtitle: 'Anomalous Communication Arrives',
    whatIsHappening:
      'An attacker sends a deceptive message designed to create urgency, mimicking a legitimate bank or digital service.',
  },
  {
    step: 2,
    threatTitle: 'Fake Message',
    threatSubtitle: 'Urgent Threat Lure Delivered',
    defenseTitle: 'Pause',
    defenseSubtitle: 'Deliberate Cognitive Breath',
    whatIsHappening:
      'The deceptive message demands action within 30 minutes. Rather than reacting in panic, the defender takes a conscious pause.',
    pauseVerifyText:
      'PAUSE: A deliberate 10-second cognitive pause disrupts the psychological trigger of manufactured panic.',
  },
  {
    step: 3,
    threatTitle: 'User Click',
    threatSubtitle: 'Deceptive Link Followed',
    defenseTitle: 'Verify',
    defenseSubtitle: 'Independent Channel Validation',
    whatIsHappening:
      'Instead of clicking the suspicious link embedded in the message, the defender navigates directly to the official portal in a clean browser tab.',
    pauseVerifyText:
      'PAUSE + VERIFY: Independent verification can prevent the attacker from controlling the decision.',
  },
  {
    step: 4,
    threatTitle: 'Credential Theft',
    threatSubtitle: 'Cloned Form Interception',
    defenseTitle: 'MFA',
    defenseSubtitle: 'Multi-Factor Challenge Triggered',
    whatIsHappening:
      'Even if a password were compromised, multi-factor authentication (MFA) requires physical device confirmation that the remote attacker cannot supply.',
  },
  {
    step: 5,
    threatTitle: 'Account Compromise',
    threatSubtitle: 'Unauthorized Breach & Hijack',
    defenseTitle: 'Protected Account',
    defenseSubtitle: 'Session Intact & Assets Secure',
    whatIsHappening:
      'DEFENSE SUCCESSFUL — By pausing, verifying independently, and requiring multi-factor authentication, the entire attack chain has been stopped.',
    isDefenseSuccessful: true,
  },
];

export const AttackDefensePath: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 = not started

  const handleNextStep = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCurrentStep(1); // loop / restart
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  const activeStepData = currentStep > 0 ? SIMULATION_STEPS[currentStep - 1] : null;

  const threatIcons = [Skull, MailWarning, MousePointerClick, KeyRound, AlertOctagon];
  const defenseIcons = [ShieldAlert, PauseCircle, CheckCircle2, Smartphone, ShieldCheck];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Simulation Advisory Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-slate-400 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
        <span className="flex items-center gap-2 text-cyan-400 font-bold">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Educational Attack Simulation</span>
        </span>
        <span className="text-[11px] text-slate-400">
          Simulated educational visualization • Safe & non-destructive practice
        </span>
      </div>

      {/* Simulator Control Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-center sm:justify-start gap-2">
            <span>Simulation Step Control</span>
            {currentStep > 0 && (
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] font-bold">
                Stage {currentStep} of 5
              </span>
            )}
          </div>
          <div className="text-sm font-bold text-white">
            {currentStep === 0
              ? 'Ready to Begin — Start the interactive comparison'
              : currentStep === 5
              ? 'Simulation Complete: Defense Successful'
              : `Step ${currentStep}: ${activeStepData?.defenseTitle} vs. ${activeStepData?.threatTitle}`}
          </div>
        </div>

        {/* Step Progression Buttons */}
        <div className="flex items-center gap-3">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer cyber-focus-ring"
              aria-label="Reset attack simulation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleNextStep}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer cyber-focus-ring ${
              currentStep === 0
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25 scale-105'
                : currentStep === 5
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
            }`}
          >
            {currentStep === 0 ? (
              <>
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Start Simulation</span>
              </>
            ) : currentStep === 5 ? (
              <>
                <RotateCcw className="w-4 h-4" />
                <span>Replay Simulation ↺</span>
              </>
            ) : (
              <>
                <span>Next Step →</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* DUAL VISUAL PATHS (Path A: Threat Path vs. Path B: Defense Path) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* =========================================================================
            PATH A: THREAT PATH (Red / Orange Threat Styling)
            Attacker -> Fake Message -> User Click -> Credential Theft -> Account Compromise
            ========================================================================= */}
        <div className="rounded-2xl border border-rose-900/60 bg-slate-950/90 p-5 sm:p-6 space-y-5 relative overflow-hidden shadow-xl shadow-rose-950/20">
          <div className="flex items-center justify-between border-b border-rose-950/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <h3 className="text-sm font-mono font-bold tracking-wider uppercase text-rose-400">
                PATH A: THREAT PATH
              </h3>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
              Unchecked Attack Vector
            </span>
          </div>

          {/* Steps Sequence */}
          <div className="space-y-3 relative">
            {/* Visual connecting flow line */}
            <div className="absolute left-[21px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-rose-500 via-amber-500 to-rose-600 pointer-events-none opacity-40" />

            {SIMULATION_STEPS.map((s, idx) => {
              const Icon = threatIcons[idx];
              const isActive = currentStep === s.step;
              const isPast = currentStep > s.step;

              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setCurrentStep(s.step)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 relative z-10 cursor-pointer cyber-focus-ring ${
                    isActive
                      ? 'bg-rose-950/90 border-rose-500 text-white shadow-xl shadow-rose-950/50 scale-[1.02]'
                      : isPast
                      ? 'bg-rose-950/30 border-rose-900/50 text-rose-200 opacity-90'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-rose-900/80'
                  }`}
                  aria-label={`Inspect Threat Step ${s.step}: ${s.threatTitle}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-mono text-xs font-bold border transition-colors ${
                        isActive
                          ? 'bg-rose-500 text-slate-950 border-rose-400 shadow-md shadow-rose-500/40'
                          : isPast
                          ? 'bg-rose-950 text-rose-400 border-rose-800'
                          : 'bg-slate-950 text-slate-500 border-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold tracking-wider flex items-center gap-2">
                        <span className={isActive ? 'text-white' : isPast ? 'text-rose-300' : 'text-slate-300'}>
                          {s.threatTitle}
                        </span>
                        <span className="text-[10px] font-normal text-slate-500">
                          (Step 0{s.step})
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">{s.threatSubtitle}</div>
                    </div>
                  </div>

                  <span className="text-xs text-rose-400 font-mono font-bold">↓</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            PATH B: DEFENSE PATH (Cyan / Green Defensive Styling)
            Suspicious Message -> Pause -> Verify -> MFA -> Protected Account
            ========================================================================= */}
        <div className="rounded-2xl border border-cyan-900/60 bg-slate-950/90 p-5 sm:p-6 space-y-5 relative overflow-hidden shadow-xl shadow-cyan-950/20">
          <div className="flex items-center justify-between border-b border-cyan-950/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <h3 className="text-sm font-mono font-bold tracking-wider uppercase text-cyan-300">
                PATH B: DEFENSE PATH
              </h3>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Proactive Defensive Mindset
            </span>
          </div>

          {/* Steps Sequence */}
          <div className="space-y-3 relative">
            {/* Visual connecting flow line */}
            <div className="absolute left-[21px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-cyan-400 via-emerald-400 to-emerald-500 pointer-events-none opacity-40" />

            {SIMULATION_STEPS.map((s, idx) => {
              const Icon = defenseIcons[idx];
              const isActive = currentStep === s.step;
              const isPast = currentStep > s.step;

              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setCurrentStep(s.step)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 relative z-10 cursor-pointer cyber-focus-ring ${
                    isActive
                      ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-xl shadow-cyan-950/50 scale-[1.02]'
                      : isPast
                      ? 'bg-cyan-950/30 border-cyan-900/50 text-cyan-200 opacity-90'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-cyan-900/80'
                  }`}
                  aria-label={`Inspect Defense Step ${s.step}: ${s.defenseTitle}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-mono text-xs font-bold border transition-colors ${
                        isActive
                          ? 'bg-cyan-400 text-slate-950 border-cyan-300 shadow-md shadow-cyan-400/40'
                          : isPast
                          ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                          : 'bg-slate-950 text-slate-500 border-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold tracking-wider flex items-center gap-2">
                        <span className={isActive ? 'text-white' : isPast ? 'text-cyan-300' : 'text-slate-300'}>
                          {s.defenseTitle}
                        </span>
                        <span className="text-[10px] font-normal text-slate-500">
                          (Step 0{s.step})
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">{s.defenseSubtitle}</div>
                    </div>
                  </div>

                  <span className="text-xs text-cyan-400 font-mono font-bold">✓</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================================
          DYNAMIC STEP EXPLANATION PANEL ("WHAT IS HAPPENING?")
          ========================================================================= */}
      {currentStep > 0 && activeStepData && (
        <div
          className={`p-6 rounded-2xl border transition-all duration-300 space-y-4 animate-in fade-in duration-200 ${
            activeStepData.isDefenseSuccessful
              ? 'bg-emerald-950/40 border-emerald-500/50 shadow-2xl shadow-emerald-950/30'
              : 'bg-slate-900/90 border-cyan-500/40'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono uppercase font-bold px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Step 0{activeStepData.step} Analysis
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {activeStepData.defenseTitle} <span className="text-slate-500 font-normal">vs.</span> {activeStepData.threatTitle}
              </h4>
            </div>

            {activeStepData.isDefenseSuccessful && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-mono font-extrabold uppercase shadow-lg shadow-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DEFENSE SUCCESSFUL</span>
              </div>
            )}
          </div>

          {/* WHAT IS HAPPENING? Section */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase font-bold text-cyan-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>WHAT IS HAPPENING?</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed pl-4 font-medium">
              {activeStepData.whatIsHappening}
            </p>
          </div>

          {/* PAUSE + VERIFY Intercept Highlight */}
          {activeStepData.pauseVerifyText && (
            <div className="p-4 rounded-xl bg-cyan-950/60 border border-cyan-500/40 space-y-1">
              <div className="text-xs font-mono uppercase font-bold text-amber-300 flex items-center gap-1.5">
                <PauseCircle className="w-4 h-4 text-amber-400" />
                <span>DECISION POINT • PAUSE + VERIFY</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                {activeStepData.pauseVerifyText}
              </p>
            </div>
          )}

          {/* Final Defense Successful Banner */}
          {activeStepData.isDefenseSuccessful && (
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 space-y-1">
              <div className="text-xs font-mono uppercase font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>DEFENSE SUCCESSFUL</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                By maintaining a defensive mindset—pausing upon receipt, independently verifying the URL, and activating hardware or app-based MFA—the attacker&apos;s breach was halted before any harm occurred.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
