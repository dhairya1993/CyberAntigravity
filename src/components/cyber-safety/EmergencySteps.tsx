'use client';

import React, { useState } from 'react';
import {
  AlertOctagon,
  WifiOff,
  Search,
  Lock,
  KeyRound,
  Headphones,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  Circle,
  ArrowRight,
} from 'lucide-react';

interface EmergencyFlowStep {
  step: number;
  label: string;
  actionTitle: string;
  summary: string;
  details: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const EMERGENCY_FLOW: EmergencyFlowStep[] = [
  {
    step: 1,
    label: 'STOP',
    actionTitle: 'Halt all communication immediately',
    summary: 'Sever interaction with the caller, sender, or website right now.',
    details: [
      'Hang up the phone immediately; do not say goodbye or argue.',
      'Close suspicious chat threads and browser windows.',
      'Refuse any further transfer of funds, codes, or remote software.',
    ],
    icon: AlertOctagon,
  },
  {
    step: 2,
    label: 'DISCONNECT',
    actionTitle: 'Isolate your compromised device',
    summary: 'Cut the network path to halt background data extraction or remote access.',
    details: [
      'Turn off Wi-Fi or unplug your Ethernet network cable immediately.',
      'Uninstall any remote-access tools (e.g. AnyDesk, TeamViewer) if installed.',
      'Power down the device if you suspect active ransomware encryption.',
    ],
    icon: WifiOff,
  },
  {
    step: 3,
    label: 'VERIFY',
    actionTitle: 'Assess what occurred from a secure device',
    summary: 'Use a separate, known-clean device to audit recent account activity.',
    details: [
      'Log into your bank via a known-clean phone or trusted computer.',
      'Audit pending transactions and recent account transfer logs.',
      'Check if any unexpected recovery emails or phone numbers were added.',
    ],
    icon: Search,
  },
  {
    step: 4,
    label: 'SECURE ACCOUNTS',
    actionTitle: 'Lock affected financial instruments',
    summary: 'Restrict debit and credit cards before unauthorized charges finalize.',
    details: [
      'Use your official banking app to freeze compromised cards instantly.',
      'Request temporary transaction holds if wire transfers were initiated.',
      'Log out of all active web sessions across all devices.',
    ],
    icon: Lock,
  },
  {
    step: 5,
    label: 'CHANGE COMPROMISED PASSWORDS',
    actionTitle: 'Reset credentials from an uninfected device',
    summary: 'Replace passwords for any account accessed or targeted during the incident.',
    details: [
      'Prioritize your primary email account first, as it controls password resets.',
      'Create long, unique passphrases (16+ characters) via a password manager.',
      'Verify that multi-factor authentication (MFA) is active and uncompromised.',
    ],
    icon: KeyRound,
  },
  {
    step: 6,
    label: 'CONTACT OFFICIAL SUPPORT',
    actionTitle: 'Engage verified customer fraud desks',
    summary: 'Reach out exclusively through verified telephone numbers found on your card.',
    details: [
      'Dial the 24/7 fraud number printed physically on the back of your bank card.',
      'Explain precisely what occurred, including any disclosed card numbers or codes.',
      'Record the incident reference number and agent name for future tracking.',
    ],
    icon: Headphones,
  },
  {
    step: 7,
    label: 'REPORT IF NECESSARY',
    actionTitle: 'Notify relevant consumer protection bodies',
    summary: 'Submit formal reports to national cybercrime agencies to create an official audit trail.',
    details: [
      'File a complaint with official registries (e.g. IC3/FTC in the US, Report Cyber in Australia, Action Fraud in the UK).',
      'Provide logs, phone numbers, and fraudulent web links to assist investigators.',
      'Keep copies of all filed documentation for your financial records.',
    ],
    icon: FileCheck2,
  },
];

export const EmergencySteps: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  const toggleStepDone = (stepNum: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNum]: !prev[stepNum],
    }));
  };

  const currentStep = EMERGENCY_FLOW[activeStepIdx];
  const StepIcon = currentStep.icon;

  return (
    <section id="emergency-response" className="py-16 md:py-24 relative scroll-mt-20 border-t border-slate-800/80">
      <div id="emergency-steps" className="scroll-mt-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-800/80 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            <span>Emergency Incident Protocol</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Think You May Have Been Scammed?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Follow this clear 7-step defensive triage protocol to contain exposure, protect your finances, and regain control of your accounts.
          </p>

          {/* Mandate Notice Banner */}
          <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-rose-900/60 max-w-2xl mx-auto text-left sm:text-center text-xs text-slate-300 flex items-start sm:items-center justify-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong className="text-white">Do not panic. Act quickly and verify through official channels.</strong> Timely containment minimizes financial and credential risk.
            </span>
          </div>
        </div>

        {/* 7-Step Visual Flow Progression Pipeline */}
        <div className="max-w-6xl mx-auto mb-10">
          {/* Desktop Horizontal Step Track */}
          <div className="hidden lg:grid grid-cols-7 gap-2 pb-4">
            {EMERGENCY_FLOW.map((st, idx) => {
              const isSelected = activeStepIdx === idx;
              const isDone = Boolean(completedSteps[st.step]);
              const Icon = st.icon;

              return (
                <button
                  key={st.step}
                  type="button"
                  onClick={() => setActiveStepIdx(idx)}
                  className={`p-3 rounded-xl border text-center transition-all duration-200 flex flex-col items-center gap-1.5 cyber-focus-ring ${
                    isSelected
                      ? 'bg-rose-950/60 border-rose-500 shadow-lg shadow-rose-950/40 scale-105'
                      : isDone
                      ? 'bg-emerald-950/40 border-emerald-700/80'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full text-[10px] font-mono text-slate-400">
                    <span>0{st.step}</span>
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    )}
                  </div>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected
                        ? 'bg-rose-900/80 text-rose-200'
                        : isDone
                        ? 'bg-emerald-900/80 text-emerald-200'
                        : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider leading-none">
                    {st.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Step Detail Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-rose-950/80 border border-rose-800/80 flex items-center justify-center text-rose-400 shrink-0">
                  <StepIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest">
                      Step {currentStep.step} of 7 &rarr; {currentStep.label}
                    </span>
                    {completedSteps[currentStep.step] && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        Action Marked Completed
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight mt-0.5">
                    {currentStep.actionTitle}
                  </h3>
                </div>
              </div>

              {/* Action Checkbox */}
              <button
                type="button"
                onClick={(e) => toggleStepDone(currentStep.step, e)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cyber-focus-ring self-start sm:self-auto ${
                  completedSteps[currentStep.step]
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-700 hover:bg-emerald-900'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {completedSteps[currentStep.step] ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Completed</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 text-slate-500" />
                    <span>Mark as Done</span>
                  </>
                )}
              </button>
            </div>

            {/* Summary & Specific Actions */}
            <div className="py-6 space-y-4">
              <p className="text-sm text-slate-200 leading-relaxed font-medium bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                {currentStep.summary}
              </p>

              <div className="space-y-2.5 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  Detailed Execution Instructions:
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {currentStep.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80"
                    >
                      <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Step Selector Controls */}
            <div className="flex items-center justify-between pt-5 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setActiveStepIdx((prev) => Math.max(0, prev - 1))}
                disabled={activeStepIdx === 0}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-950 border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
              >
                Previous Step
              </button>

              <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                {Object.keys(completedSteps).length} of 7 Steps Completed
              </span>

              <button
                type="button"
                onClick={() => setActiveStepIdx((prev) => Math.min(EMERGENCY_FLOW.length - 1, prev + 1))}
                disabled={activeStepIdx === EMERGENCY_FLOW.length - 1}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-rose-500 transition-colors"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
