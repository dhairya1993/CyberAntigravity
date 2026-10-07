'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Landmark,
  Headphones,
  KeyRound,
  Gift,
} from 'lucide-react';

interface ScenarioChoice {
  id: string;
  text: string;
  isSafe: boolean;
  feedback: string;
}

interface Scenario {
  id: string;
  number: number;
  title: string;
  prompt: string;
  context: string;
  icon: React.ComponentType<{ className?: string }>;
  choices: ScenarioChoice[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'scenario-1',
    number: 1,
    title: 'Bank Verification Request',
    prompt: 'Your bank supposedly sends you a message asking you to verify your account through a link.',
    context: 'The message arrives via SMS: "Alert: Unauthorized transaction detected on your debit card. Click https://verify-bank-security.net immediately to prevent account suspension."',
    icon: Landmark,
    choices: [
      {
        id: 'c1',
        text: 'Click the link immediately to prevent your debit card from being locked.',
        isSafe: false,
        feedback: 'Dangerous: The link leads to a cloned credential-harvesting site. Clicking urgent links is the primary tactic used in smishing fraud.',
      },
      {
        id: 'c2',
        text: 'Reply to the SMS asking if the transaction was really cancelled.',
        isSafe: false,
        feedback: 'Risky: Replying confirms your phone number is active and monitored, which invites further aggressive follow-up scam calls.',
      },
      {
        id: 'c3',
        text: 'Do not click the link. Open your bank’s official mobile app or type their verified web address directly into your browser.',
        isSafe: true,
        feedback: 'Safest Action! Always verify account notices out-of-band through official channels you already know and trust.',
      },
      {
        id: 'c4',
        text: 'Call the telephone number listed inside the SMS body.',
        isSafe: false,
        feedback: 'Risky: The phone number inside a fake message connects directly to fraudulent call centers posing as bank agents.',
      },
    ],
  },
  {
    id: 'scenario-2',
    number: 2,
    title: 'Unsolicited Tech Support Call',
    prompt: 'Someone claiming to be technical support asks for remote access.',
    context: 'An incoming caller says: "We detected dangerous malware broadcasting from your Windows IP. Please download AnyDesk or TeamViewer so I can purge the virus."',
    icon: Headphones,
    choices: [
      {
        id: 'c1',
        text: 'Allow access if they mention a recognized brand name like Microsoft or Apple.',
        isSafe: false,
        feedback: 'Dangerous: Microsoft, Apple, and ISPs never place cold phone calls alerting users of device infections.',
      },
      {
        id: 'c2',
        text: 'Refuse immediately, hang up, and never install remote software for unexpected incoming callers.',
        isSafe: true,
        feedback: 'Safest Action! Remote desktop access gives attackers full control over your keyboard, files, and bank transfer sessions.',
      },
      {
        id: 'c3',
        text: 'Grant remote access but watch their mouse movements on your screen.',
        isSafe: false,
        feedback: 'Dangerous: Attackers black out victim screens using fake update windows while draining bank accounts in the background.',
      },
    ],
  },
  {
    id: 'scenario-3',
    number: 3,
    title: 'Unexpected Password Reset',
    prompt: 'You receive an unexpected password-reset notification.',
    context: 'An email arrives from a platform you use: "Password Reset Request for your Account. If this was not you, click here to cancel."',
    icon: KeyRound,
    choices: [
      {
        id: 'c1',
        text: 'Click the "Cancel Reset" link inside the email to see what IP address requested it.',
        isSafe: false,
        feedback: 'Dangerous: Fake reset notifications use malicious "Cancel" buttons that redirect to phishing login forms.',
      },
      {
        id: 'c2',
        text: 'Navigate to the official website independently via bookmarks, log in, verify security activity, and review MFA settings.',
        isSafe: true,
        feedback: 'Safest Action! Checking your account directly without touching email links keeps you immune to spear-phishing.',
      },
      {
        id: 'c3',
        text: 'Ignore it completely without checking if anyone is attempting to brute-force your login.',
        isSafe: false,
        feedback: 'Suboptimal: While better than clicking fake links, ignoring unexpected reset alerts means you might miss an ongoing credential breach.',
      },
    ],
  },
  {
    id: 'scenario-4',
    number: 4,
    title: 'Claiming a Prize with Advance Fee',
    prompt: 'An online offer requires immediate payment to claim a prize.',
    context: 'A pop-up or message proclaims you won a brand-new $1,200 smartphone, requiring only an immediate $4.99 "shipping deposit" by credit card.',
    icon: Gift,
    choices: [
      {
        id: 'c1',
        text: 'Pay the $4.99 since it is a small risk compared to the value of the prize.',
        isSafe: false,
        feedback: 'Dangerous: This is a classic advance-fee scam. The scammer steals your card details and enrolls you in recurring unauthorized charges.',
      },
      {
        id: 'c2',
        text: 'Recognize this as an advance-fee fraud, close the window, and never pay upfront fees for unexpected prizes.',
        isSafe: true,
        feedback: 'Safest Action! Legitimate sweepstakes and contests never demand processing fees to distribute prizes.',
      },
      {
        id: 'c3',
        text: 'Share the link with 5 friends on social media to unlock the prize without paying.',
        isSafe: false,
        feedback: 'Dangerous: Sharing scam links distributes social engineering lures to your family and friends, spreading the threat.',
      },
    ],
  },
];

export const SafetyScenarios: React.FC = () => {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});

  const activeScenario = SCENARIOS[activeScenarioIdx];
  const ScenarioIcon = activeScenario.icon;
  const currentChoiceId = selectedChoices[activeScenario.id];
  const currentChoice = activeScenario.choices.find((c) => c.id === currentChoiceId);

  const handleSelectChoice = (choiceId: string) => {
    setSelectedChoices((prev) => ({
      ...prev,
      [activeScenario.id]: choiceId,
    }));
  };

  const handleReset = () => {
    setSelectedChoices({});
    setActiveScenarioIdx(0);
  };

  const completedCount = Object.keys(selectedChoices).length;

  return (
    <section id="safety-scenarios" className="py-16 md:py-24 relative scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Decision Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Would You Spot the Risk?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Real cyber incidents unfold in seconds. Test your judgment against 4 simulated real-world scenarios and receive immediate educational feedback on your choices.
          </p>
        </div>

        {/* Simulator Container */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-8 backdrop-blur-md shadow-2xl">
          {/* Scenario Tab Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {SCENARIOS.map((sc, idx) => {
                const isSelected = activeScenarioIdx === idx;
                const isDone = Boolean(selectedChoices[sc.id]);
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setActiveScenarioIdx(idx)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cyber-focus-ring ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : isDone
                        ? 'bg-slate-950 text-cyan-300 border border-cyan-800/60'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    <span>Scenario {sc.number}</span>
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span>{completedCount} of 4 Explored</span>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 hover:text-cyan-300 transition-colors"
                title="Restart scenarios"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Active Scenario Card */}
          <div className="py-6 space-y-6">
            {/* Scenario Header & Context */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center text-cyan-400 shrink-0">
                <ScenarioIcon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Scenario 0{activeScenario.number} — {activeScenario.title}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {activeScenario.prompt}
                </h3>
              </div>
            </div>

            {/* Context Box */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1 font-bold">
                Incoming Event:
              </span>
              <p className="italic text-slate-200">{activeScenario.context}</p>
            </div>

            {/* Choices */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block font-mono">
                Select Your Action:
              </span>
              <div className="space-y-2.5">
                {activeScenario.choices.map((choice) => {
                  const isSelected = currentChoiceId === choice.id;
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      onClick={() => handleSelectChoice(choice.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3 cyber-focus-ring ${
                        isSelected
                          ? choice.isSafe
                            ? 'bg-emerald-950/40 border-emerald-500/80 shadow-md shadow-emerald-500/10'
                            : 'bg-rose-950/40 border-rose-500/80 shadow-md shadow-rose-500/10'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isSelected ? (
                          choice.isSafe ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-400" />
                          )
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-slate-700" />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {choice.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Immediate Educational Feedback */}
            {currentChoice && (
              <div
                className={`p-4 sm:p-5 rounded-xl border animate-in fade-in duration-200 ${
                  currentChoice.isSafe
                    ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-200'
                    : 'bg-amber-950/50 border-amber-500/60 text-amber-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  {currentChoice.isSafe ? (
                    <>
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <span className="text-emerald-300">Safe Defensive Decision</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                      <span className="text-amber-300">Exploitation Risk Identified</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-7">
                  {currentChoice.feedback}
                </p>
              </div>
            )}

            {/* Step Navigation Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setActiveScenarioIdx((prev) => Math.max(0, prev - 1))}
                disabled={activeScenarioIdx === 0}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-950 border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
              >
                Previous
              </button>

              <button
                type="button"
                onClick={() => setActiveScenarioIdx((prev) => Math.min(SCENARIOS.length - 1, prev + 1))}
                disabled={activeScenarioIdx === SCENARIOS.length - 1}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cyan-300 transition-colors"
              >
                <span>Next Scenario</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
