'use client';

import React from 'react';
import { ShieldAlert, ArrowRight } from 'lucide-react';
import { RedFlagCard, ThreatRedFlag } from './RedFlagCard';
import { RedFlagIllustrations } from './RedFlagIllustrations';

const TEN_THREAT_RED_FLAGS: ThreatRedFlag[] = [
  {
    number: 1,
    title: 'Urgency',
    summary: 'Demanding immediate action within minutes or claiming your account will be deleted.',
    whySuspicious: 'Artificial deadlines intentionally trigger panic, clouding rational thinking to force quick errors.',
    whatToDoInstead: 'Deliberately slow down. Legitimate organizations provide reasonable notice to resolve issues.',
    illustration: <RedFlagIllustrations.Urgency className="w-10 h-10" />,
  },
  {
    number: 2,
    title: 'Unknown Sender',
    summary: 'Receiving unexpected messages from unrecognized email addresses, phone numbers, or profiles.',
    whySuspicious: 'Attackers purchase scraped contact lists or send mass automated spam looking for vulnerable targets.',
    whatToDoInstead: 'Do not reply, click links, or open files. Verify the sender through a trusted separate directory.',
    illustration: <RedFlagIllustrations.UnknownSender className="w-10 h-10" />,
  },
  {
    number: 3,
    title: 'Suspicious Link',
    summary: 'Web addresses featuring misspelled brands, odd subdomains, or uncharacteristic URL shorteners.',
    whySuspicious: 'Typosquatting domains lead to fraudulent clone portals designed to capture credentials and cards.',
    whatToDoInstead: 'Read URLs carefully from right to left, or navigate directly to the verified website via bookmarks.',
    illustration: <RedFlagIllustrations.SuspiciousLink className="w-10 h-10" />,
  },
  {
    number: 4,
    title: 'Unexpected Attachment',
    summary: 'Unsolicited emails containing archive formats (.zip, .rar), executables (.exe), or invoice files.',
    whySuspicious: 'Compressed files and macro documents are primary delivery mechanisms for infostealer trojans.',
    whatToDoInstead: 'Never download or extract unverified attachments. Contact the sender via voice or out-of-band chat.',
    illustration: <RedFlagIllustrations.UnexpectedAttachment className="w-10 h-10" />,
  },
  {
    number: 5,
    title: 'Payment Request',
    summary: 'Demands for payments via gift cards, wire transfers, cryptocurrency, or peer-to-peer cash apps.',
    whySuspicious: 'Scammers insist on irreversible payment rails with zero consumer fraud protection or chargebacks.',
    whatToDoInstead: 'Refuse payment. Government agencies and legitimate businesses never demand payment in gift cards.',
    illustration: <RedFlagIllustrations.PaymentRequest className="w-10 h-10" />,
  },
  {
    number: 6,
    title: 'Password Request',
    summary: 'Anyone asking you to disclose your password, PIN, or one-time verification passcode (OTP).',
    whySuspicious: 'OTPs and passwords are authentication secrets. Handing them over grants instant access to your account.',
    whatToDoInstead: 'Never disclose passwords or OTPs under any circumstances. Support staff will never ask for them.',
    illustration: <RedFlagIllustrations.PasswordRequest className="w-10 h-10" />,
  },
  {
    number: 7,
    title: 'Too-Good-To-Be-True Offer',
    summary: 'Unrealistic prizes, free luxury smartphones, lottery jackpots, or risk-free investment returns.',
    whySuspicious: 'Enticing windfalls trigger excitement, blinding victims to advance upfront fees and credential theft.',
    whatToDoInstead: 'If you did not enter a verified contest, you did not win. Disregard and delete unsolicited prizes.',
    illustration: <RedFlagIllustrations.TooGoodToBeTrue className="w-10 h-10" />,
  },
  {
    number: 8,
    title: 'Fake Authority',
    summary: 'Impersonating law enforcement, tax agents, bank security fraud desks, or high-level executives.',
    whySuspicious: 'Impersonating power figures exploits human deference to authority to intimidate targets into compliance.',
    whatToDoInstead: 'Do not be intimidated. Hang up and call the agency back on their publicly published telephone number.',
    illustration: <RedFlagIllustrations.FakeAuthority className="w-10 h-10" />,
  },
  {
    number: 9,
    title: 'Unusual Login Alert',
    summary: 'Alerts claiming a login from an unfamiliar country that demand clicking a button to "secure" it.',
    whySuspicious: 'Phishers send fake security warnings that point to malicious login pages rather than genuine portals.',
    whatToDoInstead: 'Do not click the button. Open your browser independently, log in directly, and inspect recent sessions.',
    illustration: <RedFlagIllustrations.UnusualLoginAlert className="w-10 h-10" />,
  },
  {
    number: 10,
    title: 'Pressure to Act Quickly',
    summary: 'Aggressive insistence to make decisions without consulting family members, coworkers, or advisors.',
    whySuspicious: 'Isolating you from second opinions ensures you cannot sanity-check the fraudulent premise.',
    whatToDoInstead: 'Insist on stepping away and discussing the matter with a trusted friend, family member, or IT support.',
    illustration: <RedFlagIllustrations.PressureToActQuickly className="w-10 h-10" />,
  },
];

export const RedFlagsSection: React.FC = () => {
  return (
    <section id="red-flags" className="py-16 md:py-24 relative scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/80 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Deception Recognition Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              10 Red Flags You Should Never Ignore
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Cyber deception manipulates human psychology rather than exploiting software vulnerabilities. Hover or tap each indicator below to uncover why it is suspicious and the exact safe response to protect yourself.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="#emergency-response"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-300 hover:text-white hover:bg-rose-900 text-xs font-semibold transition-colors cyber-focus-ring"
            >
              <span>Being targeted right now? View Emergency Flow</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 10 Visual Red Flags Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEN_THREAT_RED_FLAGS.map((flag) => (
            <RedFlagCard key={flag.number} flag={flag} />
          ))}
        </div>
      </div>
    </section>
  );
};
