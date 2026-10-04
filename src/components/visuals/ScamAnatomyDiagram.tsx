'use client';

import React, { useState } from 'react';
import {
  UserX,
  Flame,
  Building2,
  Clock,
  MousePointerClick,
  TrendingDown,
  Package,
  Landmark,
  Briefcase,
  Coins,
  KeyRound,
  Headphones,
  Users,
  HeartHandshake,
  ShieldCheck,
  AlertOctagon
} from 'lucide-react';

interface ScamStage {
  step: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
}

const STAGES: ScamStage[] = [
  {
    step: 1,
    label: 'Scammer Contact',
    icon: UserX,
    color: 'text-rose-400 border-rose-500/50 bg-rose-950/60',
    description: 'Attacker initiates contact via email, SMS, messaging apps, or spoofed phone numbers.',
  },
  {
    step: 2,
    label: 'Emotional Trigger',
    icon: Flame,
    color: 'text-amber-400 border-amber-500/50 bg-amber-950/60',
    description: 'Targets fear, greed, curiosity, or compassion to disrupt rational logical thinking.',
  },
  {
    step: 3,
    label: 'Fake Authority',
    icon: Building2,
    color: 'text-cyan-400 border-cyan-500/50 bg-cyan-950/60',
    description: 'Impersonates trusted brands, government entities, bank fraud units, or courier companies.',
  },
  {
    step: 4,
    label: 'Artificial Urgency',
    icon: Clock,
    color: 'text-rose-400 border-rose-500/50 bg-rose-950/60',
    description: 'Enforces extreme deadlines ("within 15 minutes!") to prevent independent verification.',
  },
  {
    step: 5,
    label: 'Coerced Action',
    icon: MousePointerClick,
    color: 'text-purple-400 border-purple-500/50 bg-purple-950/60',
    description: 'Prompts user to click a phishing portal, reveal a 2FA passcode, or download remote tools.',
  },
  {
    step: 6,
    label: 'Financial Loss',
    icon: TrendingDown,
    color: 'text-red-500 border-red-500/50 bg-red-950/60',
    description: 'Unauthorized fund withdrawals, account takeover, or secondary extortion.',
  },
];

interface ScamArchetype {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  redFlagsCount: number;
  riskLevel: 'High' | 'Critical';
  summary: string;
  stageBreakdown: {
    scammer: string;
    trigger: string;
    authority: string;
    urgency: string;
    action: string;
    loss: string;
  };
  interceptionPoint: string;
}

const ARCHETYPES: ScamArchetype[] = [
  {
    id: 'fake-delivery',
    name: 'Fake Delivery Scam',
    icon: Package,
    redFlagsCount: 3,
    riskLevel: 'High',
    summary: 'SMS notifications claiming a package cannot be delivered until a $1.80 "customs handling fee" is paid online.',
    stageBreakdown: {
      scammer: 'Automated SMS broadcast using spoofed alphanumeric sender',
      trigger: 'Curiosity and anticipation over a parcel you might be expecting',
      authority: 'Impersonates national postal services or major couriers (FedEx, DHL, USPS)',
      urgency: '"Parcel returned to sender in 12 hours if fee remains unpaid"',
      action: 'Entering credit card details on a fraudulent payment portal',
      loss: 'Credit card details harvested; unauthorized recurring monthly charges billed',
    },
    interceptionPoint: 'Track packages exclusively inside official carrier apps using authentic tracking numbers.',
  },
  {
    id: 'fake-bank',
    name: 'Fake Bank Fraud Alert',
    icon: Landmark,
    redFlagsCount: 4,
    riskLevel: 'Critical',
    summary: 'High-pressure alerts claiming $1,400 was debited from your card, prompting immediate phone or link response.',
    stageBreakdown: {
      scammer: 'Direct SMS with spoofed bank name or robocall connection',
      trigger: 'Extreme financial fear of unauthorized theft from checking account',
      authority: 'Claims to be the "Fraud & Anti-Money Laundering Security Desk"',
      urgency: '"Reply STOP now or funds will settle permanently to foreign account"',
      action: 'Connecting to fake representative who instructs user to move funds or share OTP',
      loss: 'Direct wire transfer of entire savings into attacker-controlled "safe" account',
    },
    interceptionPoint: 'Hang up immediately and call the official fraud phone number printed on the back of your physical card.',
  },
  {
    id: 'job-offer',
    name: 'Fake Remote Job Offer',
    icon: Briefcase,
    redFlagsCount: 3,
    riskLevel: 'High',
    summary: 'Lucrative remote work offers with immediate hiring without interview, requiring an upfront "equipment check" or deposit.',
    stageBreakdown: {
      scammer: 'Recruiter reaching out on WhatsApp or Telegram offering $80/hr remote tasks',
      trigger: 'Excitement over flexible, well-paid remote employment opportunities',
      authority: 'Claims affiliation with well-known global tech or marketing agencies',
      urgency: '"Only 2 applicant spots remain for today\'s onboarding cohort"',
      action: 'Depositing a counterfeit check and wire-transferring money for "approved home-office equipment"',
      loss: 'Bank reverses the fake check days later, leaving the victim liable for funds sent',
    },
    interceptionPoint: 'Legitimate employers never require candidates to wire money for hardware or pay onboarding fees.',
  },
  {
    id: 'crypto-investment',
    name: 'Investment & Crypto Scheme',
    icon: Coins,
    redFlagsCount: 5,
    riskLevel: 'Critical',
    summary: 'Fake trading dashboards promising guaranteed daily returns of 5%–15% using proprietary algorithmic AI bots.',
    stageBreakdown: {
      scammer: 'Social media DM, dating app match, or sponsored investment group invite',
      trigger: 'Greed, fear of missing out (FOMO), and financial ambition',
      authority: 'Fake "Senior Wealth Analysts" displaying falsified client testimonials',
      urgency: '"Market window closing tonight; minimum deposit required to lock yield"',
      action: 'Transferring cryptocurrency to an unverified private web wallet platform',
      loss: 'Victim sees fabricated paper profits, but withdrawals are blocked with demands for more "tax fees"',
    },
    interceptionPoint: 'Guaranteed returns do not exist in legitimate financial markets. High return always equals high risk.',
  },
  {
    id: 'otp-interception',
    name: 'OTP & 2FA Bypass Scam',
    icon: KeyRound,
    redFlagsCount: 4,
    riskLevel: 'Critical',
    summary: 'Attackers trigger an authentic password reset on your account, then call or message you to demand the verification code.',
    stageBreakdown: {
      scammer: 'Attacker who already has your email/password from an old credential breach',
      trigger: 'Confusion: you receive a real code while the attacker poses as a verification agent',
      authority: 'Impersonates your cell carrier or bank security agent claiming to "cancel the request"',
      urgency: '"Read back the 6 digits on your screen now to block the hacker"',
      action: 'Verbally reading or typing the two-factor authentication code to the caller',
      loss: 'Attacker enters the code, completes account takeover, and locks you out',
    },
    interceptionPoint: 'One-Time Passwords (OTPs) are for YOUR eyes only. No genuine organization will ever ask for your OTP.',
  },
  {
    id: 'tech-support',
    name: 'Tech Support Impersonation',
    icon: Headphones,
    redFlagsCount: 4,
    riskLevel: 'High',
    summary: 'Loud browser popups claiming your computer is infected with "Trojan Spyware", ordering you to call a toll-free hotline.',
    stageBreakdown: {
      scammer: 'Malicious browser tab locking the screen with fullscreen audio alarms',
      trigger: 'Shock, panic, and technical confusion over system compromise',
      authority: 'Displays Microsoft, Apple, or Windows Defender corporate branding',
      urgency: '"Do not restart computer. Critical system files are deleting. Call 1-800 immediately."',
      action: 'Calling number and installing remote desktop software (AnyDesk, TeamViewer)',
      loss: 'Scammer locks device with SYSKEY, steals personal documents, and charges $499 for fake repair',
    },
    interceptionPoint: 'Real operating systems never display phone numbers in browser popup windows asking you to call support.',
  },
  {
    id: 'social-impersonation',
    name: 'Social Media Impersonation',
    icon: Users,
    redFlagsCount: 3,
    riskLevel: 'High',
    summary: 'Attackers clone a friend or family member\'s profile photo and bio, messaging you with an urgent emergency request.',
    stageBreakdown: {
      scammer: 'Newly created duplicate social media account with stolen photos',
      trigger: 'Empathy, loyalty, and immediate instinct to help a friend in distress',
      authority: 'Pretends to be a close acquaintance whose phone was "stolen or broken"',
      urgency: '"Stranded at the airport; urgent cash transfer needed for boarding pass"',
      action: 'Sending money via peer-to-peer apps (Venmo, Zelle, CashApp, crypto)',
      loss: 'Permanent transfer of non-recoverable funds to an unlinked mule wallet',
    },
    interceptionPoint: 'Contact your friend directly using their known, stored telephone number or a secondary channel before sending funds.',
  },
  {
    id: 'romance-scam',
    name: 'Romance & Confidence Scam',
    icon: HeartHandshake,
    redFlagsCount: 4,
    riskLevel: 'Critical',
    summary: 'Elaborate long-term relationship cultivated online, followed by fabricated medical, customs, or travel emergencies.',
    stageBreakdown: {
      scammer: 'Fake persona pretending to work overseas on oil rigs, military missions, or engineering projects',
      trigger: 'Emotional attachment, trust, affection, and loneliness',
      authority: 'Constructs convincing photos, voice messages, and romantic declarations over months',
      urgency: '"Hospital emergency / customs detention; only you can authorize the release fee"',
      action: 'Wire transfers, gift cards, or crypto sent to assist the supposed romantic partner',
      loss: 'Repeated financial exploitation often draining life savings before ghosting the victim',
    },
    interceptionPoint: 'Never send money to someone you have never met in person, regardless of how long you have communicated online.',
  },
];

export const ScamAnatomyDiagram: React.FC = () => {
  const [selectedArchetype, setSelectedArchetype] = useState<ScamArchetype>(ARCHETYPES[0]);
  const [activeStageStep, setActiveStageStep] = useState<number>(1);

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-8">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold block">
          Visual Threat Framework
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          The Anatomy of an Online Scam
        </h3>
        <p className="text-sm text-slate-300">
          Almost all modern social engineering schemes share an identical psychological progression. Learn to recognize the stages so you can disengage before manipulation occurs.
        </p>
      </div>

      {/* 6-Stage Visual Pipeline Bar */}
      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {STAGES.map((stage) => {
            const Icon = stage.icon;
            const isCurrent = activeStageStep === stage.step;
            return (
              <button
                key={stage.step}
                type="button"
                onClick={() => setActiveStageStep(stage.step)}
                className={`p-3.5 rounded-xl border flex flex-col items-center text-center transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? 'bg-slate-800 border-rose-400 shadow-lg shadow-rose-500/20 scale-105 ring-1 ring-rose-400/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`p-2.5 rounded-lg mb-2 ${stage.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                  Stage {stage.step}
                </span>
                <span className={`text-xs font-bold leading-tight mt-0.5 ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                  {stage.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Callout */}
        <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-left flex items-start gap-3">
          <div className="p-2 rounded-lg bg-rose-950 text-rose-400 border border-rose-800/50 shrink-0 mt-0.5">
            <AlertOctagon className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white">
              Stage {activeStageStep}: {STAGES[activeStageStep - 1].label}
            </span>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              {STAGES[activeStageStep - 1].description}
            </p>
          </div>
        </div>
      </div>

      {/* Archetype Showcase Section */}
      <div className="pt-6 border-t border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-base font-bold text-white">
              8 Real-World Scam Archetypes
            </h4>
            <p className="text-xs text-slate-400">
              Select a scam category below to trace how the 6-stage anatomy applies to it in practice.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 self-start sm:self-center">
            {ARCHETYPES.length} Common Attack Patterns
          </span>
        </div>

        {/* Archetype Selector Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {ARCHETYPES.map((arch) => {
            const Icon = arch.icon;
            const isSelected = selectedArchetype.id === arch.id;
            return (
              <button
                key={arch.id}
                type="button"
                onClick={() => setSelectedArchetype(arch)}
                className={`p-2.5 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-rose-950/60 border-rose-500 text-rose-200 shadow-md shadow-rose-950'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-rose-400' : 'text-slate-400'}`} />
                <span className="text-[11px] font-semibold leading-tight line-clamp-2">
                  {arch.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Archetype Deep Dive Card */}
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-5 sm:p-6 text-left space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-800/60 text-rose-400">
                <selectedArchetype.icon className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-base font-bold text-white">
                  {selectedArchetype.name}
                </h5>
                <p className="text-xs text-slate-400">
                  {selectedArchetype.summary}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {selectedArchetype.redFlagsCount} Red Flags
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40">
                {selectedArchetype.riskLevel} Risk
              </span>
            </div>
          </div>

          {/* Real-world progression */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block mb-1">
                1. Scammer Contact
              </span>
              <p className="text-slate-300">{selectedArchetype.stageBreakdown.scammer}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono text-amber-500 uppercase font-bold block mb-1">
                2. Psychological Trigger
              </span>
              <p className="text-slate-300">{selectedArchetype.stageBreakdown.trigger}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-1">
                3. Fabricated Authority
              </span>
              <p className="text-slate-300">{selectedArchetype.stageBreakdown.authority}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono text-rose-400 uppercase font-bold block mb-1">
                4. High-Pressure Urgency
              </span>
              <p className="text-slate-300">{selectedArchetype.stageBreakdown.urgency}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block mb-1">
                5. Manipulated Action
              </span>
              <p className="text-slate-300">{selectedArchetype.stageBreakdown.action}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono text-red-400 uppercase font-bold block mb-1">
                6. Potential Loss
              </span>
              <p className="text-slate-300">{selectedArchetype.stageBreakdown.loss}</p>
            </div>
          </div>

          {/* Primary Interception Countermeasure */}
          <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-800/50 flex items-start gap-2.5 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-300 font-mono block">
                HOW TO BREAK THIS ATTACK CYCLE:
              </span>
              <p className="text-slate-300 mt-0.5">
                {selectedArchetype.interceptionPoint}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
