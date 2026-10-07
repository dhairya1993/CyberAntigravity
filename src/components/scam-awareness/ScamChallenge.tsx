'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Smartphone,
  Mail,
  Briefcase,
  PhoneCall,
  TrendingUp,
  Info,
} from 'lucide-react';

interface Scenario {
  id: number;
  type: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  channel: string;
  senderFictional: string;
  timestamp: string;
  messageContent: string;
  contextNote: string;
  correctAnswer: 'SCAM' | 'SAFE';
  redFlags: string[];
  defensiveAction: string;
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    type: 'Account Verification',
    icon: Smartphone,
    title: 'Challenge 1: Fake Account Verification Alert',
    channel: 'SMS / Text Notification',
    senderFictional: 'Fictional: "Apex Reserve Cloud Auth"',
    timestamp: 'Today at 09:14 AM',
    messageContent:
      'CRITICAL: Suspicious sign-in detected from IP 185.220.101.4 (Helsinki). Your Apex Cloud wallet will be frozen in 15 minutes unless verified. Secure your credentials immediately at https://apex-reserve-auth.verify-node-check.biz/login?ref=urgent',
    contextNote: 'You receive this out of the blue while working on your computer.',
    correctAnswer: 'SCAM',
    redFlags: [
      'Artificial 15-minute panic deadline to induce irrational compliance.',
      'Unsolicited alert claiming account freeze without any user-initiated activity.',
      'Suspicious lookalike domain (.verify-node-check.biz) not matching the official domain.',
      'Direct link urging immediate credential submission.',
    ],
    defensiveAction:
      'Never tap links in unexpected security alerts. Close the message, open the official app or bookmark in your browser, and review genuine security logs directly.',
    explanation:
      'Scammers impersonate trusted platforms and fabricate alarming security events so panic overrides your normal verification instincts.',
  },
  {
    id: 2,
    type: 'Parcel Delivery',
    icon: Mail,
    title: 'Challenge 2: Fake Parcel Redelivery Notification',
    channel: 'SMS / Text Notification',
    senderFictional: 'Fictional: "GlobalExpress Logistics"',
    timestamp: 'Yesterday at 04:32 PM',
    messageContent:
      'PARCEL EXCEPTION #GE-94183: Courier could not deliver package due to incorrect street number and unpaid customs surcharge ($1.85). Update dispatch address & pay fee within 24h to prevent parcel destruction: http://globalexpress-reschedule-fee.info/pay',
    contextNote: 'You did order a couple of items online last week from different retailers.',
    correctAnswer: 'SCAM',
    redFlags: [
      'Exploits natural expectation that you frequently receive parcels.',
      'Extremely small initial fee ($1.85) designed to make card entry feel trivial and harmless.',
      'Fake domain (.info) impersonating global carriers.',
      'Destruction threat within 24 hours to create artificial pressure.',
    ],
    defensiveAction:
      'Never input payment details via SMS links. Cross-reference the tracking code directly inside your retailer account or courier app.',
    explanation:
      'Delivery phishing targets volume: millions of people await packages daily. The nominal fee is a gateway to harvest credit card numbers and CVV codes.',
  },
  {
    id: 3,
    type: 'Remote Job Offer',
    icon: Briefcase,
    title: 'Challenge 3: High-Pay Unsolicited Job Offer',
    channel: 'Direct Messaging App',
    senderFictional: 'Fictional: "Recruiter Elena — Global Media Partners"',
    timestamp: 'Today at 11:45 AM',
    messageContent:
      'Hello! Our talent recruitment agency reviewed your professional resume and found an ideal match. Role: Remote App Optimization Specialist. Work 30-45 minutes per day from your smartphone. Daily payout: $350 - $650 via USDT or direct wire. No prior experience required. To register your worker portal account and receive starter task credits, send a $50 refundable security bond.',
    contextNote: 'You do not remember applying to this organization or agency.',
    correctAnswer: 'SCAM',
    redFlags: [
      'Unsolicited job offer with no formal interview or verifiable company presence.',
      'Unrealistically inflated earnings ($350-$650/day) for minimal effort (30 mins).',
      'Payment requests (refundable security bond) in order to "start working".',
      'Payouts routed through irreversible crypto wallets or obscure methods.',
    ],
    defensiveAction:
      'Legitimate employers will never demand an upfront fee or deposit to give you work. Block the contact and verify job openings only through official corporate career portals.',
    explanation:
      'Task scams and fake recruiter lures prey on career seekers by promising effortless flexible income before extracting sequential deposits under the guise of "account unlocking".',
  },
  {
    id: 4,
    type: 'Technical Support',
    icon: PhoneCall,
    title: 'Challenge 4: Urgent Technical Support Alert Call',
    channel: 'Simulated Incoming Call / Browser Alert',
    senderFictional: 'Fictional: "OS Diagnostics Security Division"',
    timestamp: 'Today at 02:10 PM',
    messageContent:
      'Incoming Call + Persistent Popup: "SECURITY ALERT: Severe Trojan-Worm detected in registry subkey 0x8849. Your banking tokens and webcam are compromised. Do not restart your computer. Call toll-free 1-800-555-0199 immediately for remote system remediation."',
    contextNote: 'A loud audio chime sounded while browsing a research blog, accompanied by a full-screen browser banner.',
    correctAnswer: 'SCAM',
    redFlags: [
      'Operating systems and hardware vendors never display phone numbers in popups demanding urgent calls.',
      'Browser audio loops and forced full-screen modes designed to induce sensory overload.',
      'Demands that you grant remote desktop software access (AnyDesk, TeamViewer) to strangers.',
      'Exaggerated claims of simultaneous webcam and banking token compromises.',
    ],
    defensiveAction:
      'Force-close the browser tab or task manager. Never call numbers from browser popups and never grant remote desktop control to unsolicited callers.',
    explanation:
      'Tech support fraud relies on panic and sensory disorientation. Once remote access is granted, scammers fabricate errors, steal session cookies, or lock the machine with Syskey.',
  },
  {
    id: 5,
    type: 'Investment Opportunity',
    icon: TrendingUp,
    title: 'Challenge 5: "Guaranteed" AI Crypto Arbitrage Deal',
    channel: 'Social Media Direct Message',
    senderFictional: 'Fictional: "FinTech Maverick Investor"',
    timestamp: 'Today at 03:20 PM',
    messageContent:
      'Hey friend, our quantitative trading desk has cracked automated flash loan arbitrage with zero market risk. Our neural bot yields 22.5% daily compound interest backed 100% by decentralized liquidity vaults. Proof of payouts attached. Private member slots open for next 3 hours only. Send minimum 0.2 ETH to the contract address to lock your tier.',
    contextNote: 'Sent from a profile with stock photos, verified checkmark bought recently, and luxury car imagery.',
    correctAnswer: 'SCAM',
    redFlags: [
      '"Guaranteed risk-free" returns of 22.5% daily—financially impossible under any legitimate market condition.',
      'Artificial countdown ("next 3 hours only") forcing hasty investment decisions.',
      'Irreversible cryptocurrency transactions sent to unverified addresses.',
      'Social proof using manipulated payout screenshots and bought vanity verification.',
    ],
    defensiveAction:
      'Remember the golden rule of finance: any investment offering guaranteed high returns with zero risk is fraudulent. Block, report, and preserve your capital.',
    explanation:
      'High-yield investment scams exploit FOMO (fear of missing out) and greed. Funds sent to fraudulent smart contracts or wallets cannot be reversed.',
  },
];

export function ScamChallenge() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<Record<number, 'SCAM' | 'SAFE' | 'NOT_SURE'>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const scenario = SCENARIOS[currentIndex];
  const userChoice = selectedChoices[scenario.id];
  const isRevealed = revealed[scenario.id];

  const handleSelect = (choice: 'SCAM' | 'SAFE' | 'NOT_SURE') => {
    setSelectedChoices((prev) => ({ ...prev, [scenario.id]: choice }));
    setRevealed((prev) => ({ ...prev, [scenario.id]: true }));
  };

  const handleResetCurrent = () => {
    setSelectedChoices((prev) => {
      const next = { ...prev };
      delete next[scenario.id];
      return next;
    });
    setRevealed((prev) => {
      const next = { ...prev };
      delete next[scenario.id];
      return next;
    });
  };

  const totalAnswered = Object.keys(revealed).length;

  return (
    <section id="scam-challenge" className="py-16 md:py-24 bg-slate-950/70 border-b border-slate-800/80 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium tracking-wide uppercase mb-4">
            <ShieldAlert className="w-3.5 h-3.5" />
            Interactive Training Lab
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Scam Challenge: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-200">Scam or Safe?</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Evaluate 5 realistic simulated scenarios. Test your instinct, examine the subtle coercion patterns, and discover why uncertainty is a superpower when facing social engineering.
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            Educational simulation only. Scenarios use fictional names and addresses for safe learning.
          </div>
        </div>

        {/* Progress & Scenario Selector Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Scenario:</span>
              <span className="text-sm font-semibold text-white">
                {currentIndex + 1} of {SCENARIOS.length}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                Completed: {totalAnswered}/{SCENARIOS.length}
              </span>
            </div>

            {/* Quick Scenario Pills */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {SCENARIOS.map((item, idx) => {
                const isSelected = idx === currentIndex;
                const isItemAnswered = revealed[item.id];

                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 px-3 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/25 ring-2 ring-cyan-400'
                        : isItemAnswered
                        ? 'bg-slate-800 text-slate-200 hover:bg-slate-750 border border-slate-700'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                    aria-label={`Jump to ${item.title}`}
                  >
                    <span>#{item.id}</span>
                    {isItemAnswered && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" title="Completed" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Scenario Card */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
          {/* Card Top Banner */}
          <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <scenario.icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 block">
                  {scenario.type}
                </span>
                <h3 className="text-lg font-bold text-white">{scenario.title}</h3>
              </div>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono">
                SIMULATED ARTIFACT
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* Context Note */}
            <div className="text-xs text-slate-400 flex items-center gap-2 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80">
              <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>
                <strong>Context:</strong> {scenario.contextNote}
              </span>
            </div>

            {/* Simulated Message Mockup */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 font-mono text-sm shadow-inner relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  <span className="font-semibold text-slate-200">{scenario.channel}</span>
                </div>
                <span>{scenario.timestamp}</span>
              </div>
              <div className="text-xs text-slate-400 mb-2">
                From: <span className="text-amber-300 font-semibold">{scenario.senderFictional}</span>
              </div>
              <div className="text-slate-100 whitespace-pre-wrap leading-relaxed text-sm bg-slate-900/60 p-4 rounded-lg border border-slate-800/60">
                {scenario.messageContent}
              </div>
            </div>

            {/* Prompt Question */}
            <div className="text-center pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 block mb-1">
                Evaluation Step
              </span>
              <h4 className="text-xl font-bold text-white">How would you classify this scenario?</h4>
              <p className="text-sm text-slate-400 mt-1">
                Select your assessment below to reveal defensive insights.
              </p>
            </div>

            {/* Option Buttons: SCAM, SAFE, NOT SURE */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* SCAM Option */}
              <button
                onClick={() => handleSelect('SCAM')}
                disabled={isRevealed}
                className={`p-4 rounded-xl border font-semibold text-sm transition-all flex flex-col items-center justify-center gap-2 ${
                  userChoice === 'SCAM'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 ring-2 ring-rose-500/40 shadow-lg shadow-rose-950/40'
                    : 'bg-slate-900/80 border-slate-800 hover:border-rose-500/50 hover:bg-rose-950/20 text-slate-200'
                } ${isRevealed ? 'cursor-default' : 'cursor-pointer hover:scale-[1.01]'}`}
              >
                <ShieldAlert className="w-6 h-6 text-rose-400" />
                <span className="text-base font-bold">SCAM</span>
                <span className="text-xs text-slate-400 font-normal">Likely fraudulent or coercive</span>
              </button>

              {/* SAFE Option */}
              <button
                onClick={() => handleSelect('SAFE')}
                disabled={isRevealed}
                className={`p-4 rounded-xl border font-semibold text-sm transition-all flex flex-col items-center justify-center gap-2 ${
                  userChoice === 'SAFE'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-950/40'
                    : 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-950/20 text-slate-200'
                } ${isRevealed ? 'cursor-default' : 'cursor-pointer hover:scale-[1.01]'}`}
              >
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <span className="text-base font-bold">SAFE</span>
                <span className="text-xs text-slate-400 font-normal">Legitimate communication</span>
              </button>

              {/* NOT SURE Option (Crucial Educational Principle) */}
              <button
                onClick={() => handleSelect('NOT_SURE')}
                disabled={isRevealed}
                className={`p-4 rounded-xl border font-semibold text-sm transition-all flex flex-col items-center justify-center gap-2 ${
                  userChoice === 'NOT_SURE'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-2 ring-amber-500/40 shadow-lg shadow-amber-950/40'
                    : 'bg-slate-900/80 border-slate-800 hover:border-amber-500/50 hover:bg-amber-950/20 text-slate-200'
                } ${isRevealed ? 'cursor-default' : 'cursor-pointer hover:scale-[1.01]'}`}
              >
                <HelpCircle className="w-6 h-6 text-amber-400" />
                <span className="text-base font-bold">NOT SURE</span>
                <span className="text-xs text-amber-400/90 font-normal">Need to pause and verify</span>
              </button>
            </div>

            {/* Revealed Feedback & Educational Explanation */}
            {isRevealed && (
              <div className="mt-8 space-y-5 animate-in fade-in duration-300">
                {/* Specific feedback for user choice */}
                {userChoice === 'NOT_SURE' ? (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                        <HelpCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="text-base font-bold text-amber-200">
                          Good instinct. When something feels suspicious, pause and verify independently.
                        </h5>
                        <p className="mt-1 text-sm text-slate-300 leading-relaxed">
                          Admitting uncertainty is one of the strongest defensive postures in cybersecurity. Scammers rely on pressured quick decisions. By choosing to stop, you remove their psychological advantage.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : userChoice === 'SCAM' ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="text-base font-bold text-emerald-200">
                          Correct Spotting! This is indeed a fraudulent scam lure.
                        </h5>
                        <p className="mt-1 text-sm text-slate-300 leading-relaxed">
                          {scenario.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
                        <XCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="text-base font-bold text-rose-200">
                          Watch out! This scenario is actually a dangerous SCAM.
                        </h5>
                        <p className="mt-1 text-sm text-slate-300 leading-relaxed">
                          It is easy to see why this could seem believable at first glance, but close inspection reveals critical deception tactics.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Red Flags Revealed Breakdown */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Identified Red Flags in this Message:
                  </h5>
                  <ul className="space-y-2">
                    {scenario.redFlags.map((flag, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Defensive Action */}
                <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-xl p-5">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    Recommended Defensive Action:
                  </h5>
                  <p className="text-sm text-slate-200 leading-relaxed font-sans">
                    {scenario.defensiveAction}
                  </p>
                </div>

                {/* Try Again Button for this scenario */}
                <div className="flex justify-end">
                  <button
                    onClick={handleResetCurrent}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset & try this challenge again
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Card Footer: Navigation Arrows */}
          <div className="bg-slate-900/70 border-t border-slate-800 px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Challenge
            </button>

            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Challenge {currentIndex + 1} of {SCENARIOS.length}
            </span>

            <button
              onClick={() => setCurrentIndex((prev) => Math.min(SCENARIOS.length - 1, prev + 1))}
              disabled={currentIndex === SCENARIOS.length - 1}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 border border-cyan-500/30 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              Next Challenge
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
