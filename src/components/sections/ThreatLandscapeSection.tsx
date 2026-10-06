'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Bug,
  Lock,
  Users,
  CreditCard,
  Globe2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  X,
  AlertCircle,
  HelpCircle,
  Workflow,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';
import { CyberSecurityIllustration, IllustrationType } from '@/components/visuals/CyberSecurityIllustration';

interface ThreatEducationDetails {
  whatIsIt: string;
  howItWorks: string;
  warningSigns: string;
  howToDefend: string;
}

interface ThreatCardData {
  id: string;
  title: string;
  type: IllustrationType;
  icon: React.ComponentType<{ className?: string }>;
  riskLabel: string;
  riskColor: string;
  accentBorder: string;
  glowColor: string;
  shortDesc: string;
  href: string;
  education: ThreatEducationDetails;
}

const THREAT_CARDS: ThreatCardData[] = [
  {
    id: 'phishing',
    title: 'Phishing',
    type: 'phishing',
    icon: ShieldAlert,
    riskLabel: 'High Risk',
    riskColor: 'bg-rose-950/80 text-rose-300 border-rose-800',
    accentBorder: 'hover:border-rose-500/60 hover:shadow-rose-950/40',
    glowColor: 'group-hover:text-rose-400',
    shortDesc: 'Deceptive messages designed to harvest credentials and trick users into clicking unsafe links.',
    href: '/blog/what-is-phishing',
    education: {
      whatIsIt: 'Fraudulent emails or messages mimicking legitimate organizations to deceive individuals.',
      howItWorks: 'Attackers forge sender branding, generate artificial urgency, and lure victims to enter credentials on cloned pages.',
      warningSigns: 'Generic greetings, domain name typos, urgent threats of account suspension, or unexpected password resets.',
      howToDefend: 'Inspect sender domain headers, verify requests out-of-band via official portals, and enable phishing-resistant MFA.',
    },
  },
  {
    id: 'malware',
    title: 'Malware',
    type: 'malware',
    icon: Bug,
    riskLabel: 'Critical Risk',
    riskColor: 'bg-rose-950/80 text-rose-300 border-rose-800',
    accentBorder: 'hover:border-rose-500/60 hover:shadow-rose-950/40',
    glowColor: 'group-hover:text-rose-400',
    shortDesc: 'Malicious code, trojans, or spyware engineered to breach operating system memory and steal files.',
    href: '/cyber-safety#computer-security',
    education: {
      whatIsIt: 'Hostile software written to damage, disrupt, steal, or gain unauthorized access to computer systems.',
      howItWorks: 'Delivered via weaponized attachments, pirated downloads, or unpatched vulnerabilities to execute stealth code.',
      warningSigns: 'Sudden device slowdown, unexpected pop-ups, unknown background processes, or disabled security tools.',
      howToDefend: 'Keep systems and browsers patched, use modern endpoint security, and never run unverified executables.',
    },
  },
  {
    id: 'ransomware',
    title: 'Ransomware',
    type: 'ransomware',
    icon: Lock,
    riskLabel: 'Critical Risk',
    riskColor: 'bg-amber-950/80 text-amber-300 border-amber-800',
    accentBorder: 'hover:border-amber-500/60 hover:shadow-amber-950/40',
    glowColor: 'group-hover:text-amber-400',
    shortDesc: 'Extortion malware that encrypts files and demands ransom payment for the decryption key.',
    href: '/cyber-safety#computer-security',
    education: {
      whatIsIt: 'Extortion software holding digital data hostage through unbreakable cryptographic locks.',
      howItWorks: 'Scans local and network drives, encrypts high-value documents, and deletes shadow recovery copies.',
      warningSigns: 'Renamed file extensions (e.g. .locked), sudden high disk read/write activity, or ransom notes appearing on screen.',
      howToDefend: 'Maintain isolated offline 3-2-1 backups, disable unused remote desktop ports, and segment network storage.',
    },
  },
  {
    id: 'social-engineering',
    title: 'Social Engineering',
    type: 'social-engineering',
    icon: Users,
    riskLabel: 'High Risk',
    riskColor: 'bg-purple-950/80 text-purple-300 border-purple-800',
    accentBorder: 'hover:border-purple-500/60 hover:shadow-purple-950/40',
    glowColor: 'group-hover:text-purple-400',
    shortDesc: 'Psychological manipulation exploiting trust, urgency, or fear to bypass security barriers.',
    href: '/blog/social-engineering',
    education: {
      whatIsIt: 'Psychological manipulation tricking people into handing over confidential data or granting access.',
      howItWorks: 'Manipulators exploit three primary cognitive triggers—Urgency, Authority, and Emotion—to bypass rational thought.',
      warningSigns: 'Pressure to bypass protocol, emotional panic, requests for secrecy, or impersonation of executives or law enforcement.',
      howToDefend: 'Practice a deliberate cognitive pause. Always independently authenticate callers through established channels.',
    },
  },
  {
    id: 'identity-theft',
    title: 'Identity Theft',
    type: 'identity-theft',
    icon: CreditCard,
    riskLabel: 'Severe Risk',
    riskColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
    accentBorder: 'hover:border-emerald-500/60 hover:shadow-emerald-950/40',
    glowColor: 'group-hover:text-emerald-400',
    shortDesc: 'Illicit acquisition and misuse of personal identifiers to commit fraud or hijack accounts.',
    href: '/cyber-safety#password-security',
    education: {
      whatIsIt: 'The fraudulent acquisition and misuse of private personal identifying data for unauthorized access or fraud.',
      howItWorks: 'Adversaries combine data breach dumps, credential leaks, and public records to impersonate the victim.',
      warningSigns: 'Unexplained credit inquiries, sudden 2FA prompts you did not trigger, or unexpected login notifications.',
      howToDefend: 'Use strong unique passwords stored in a manager, freeze credit reports, and monitor breach alerting services.',
    },
  },
  {
    id: 'fake-websites',
    title: 'Fake Websites',
    type: 'fake-website',
    icon: Globe2,
    riskLabel: 'High Risk',
    riskColor: 'bg-cyan-950/80 text-cyan-300 border-cyan-800',
    accentBorder: 'hover:border-cyan-500/60 hover:shadow-cyan-950/40',
    glowColor: 'group-hover:text-cyan-400',
    shortDesc: 'Cloned web portals hosted on lookalike domains built to harvest passwords and payment details.',
    href: '/tools/url-explainer',
    education: {
      whatIsIt: 'Deceptive web portals visually replicating authentic brands to trick visitors into submitting credentials.',
      howItWorks: 'Attackers register lookalike typosquatted domains, copy authentic brand CSS, and record form submissions.',
      warningSigns: 'Mispelled domain names (e.g. g00gle or secure-bank-login.cc), invalid SSL certificates, or unusual URL paths.',
      howToDefend: 'Verify the browser address bar, use password managers that refuse to autofill on mismatched domains, and bookmark legitimate sites.',
    },
  },
];

export const ThreatLandscapeSection: React.FC = () => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="threat-landscape" className="py-20 md:py-28 relative border-t border-slate-800/80 bg-slate-950/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs font-mono uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>THREAT LANDSCAPE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Know the Threat Before You Face It.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Explore common cyber threats and understand how attackers manipulate technology, information and human behavior.
          </p>
        </div>

        {/* 6 Interactive Threat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {THREAT_CARDS.map((card) => {
            const Icon = card.icon;
            const isExpanded = expandedCardId === card.id;
            const isHovered = hoveredCardId === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={`group rounded-2xl border bg-slate-900/70 p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  isExpanded
                    ? 'border-cyan-400 shadow-2xl shadow-cyan-950/50 ring-1 ring-cyan-500/30'
                    : `border-slate-800 hover:-translate-y-1.5 hover:shadow-2xl ${card.accentBorder}`
                }`}
                onClick={() => toggleExpand(card.id)}
                role="button"
                aria-expanded={isExpanded}
                aria-label={`${card.title} threat briefing card`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(card.id);
                  }
                }}
              >
                <div className="space-y-4">
                  {/* Top Bar: Icon & Threat Severity Indicator */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${card.riskColor}`}
                    >
                      {card.riskLabel}
                    </span>
                  </div>

                  {/* Custom Cybersecurity Vector Illustration */}
                  <div className="pt-2 pb-1">
                    <CyberSecurityIllustration
                      type={card.type}
                      isHovered={isHovered || isExpanded}
                      className="w-full h-36 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Threat Name & One-Line Explanation */}
                  <div className="space-y-2">
                    <h3 className={`text-xl font-bold text-white transition-colors tracking-tight ${card.glowColor}`}>
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {card.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Card Action Controls */}
                <div className="pt-5 mt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    {/* Hover reveal text on desktop, tap trigger on mobile */}
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-all cyber-focus-ring rounded py-1"
                      aria-label={`${isExpanded ? 'Collapse' : 'Understand'} ${card.title} threat panel`}
                    >
                      <span>{isExpanded ? 'Close Briefing' : 'Understand This Threat →'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
                      )}
                    </button>

                    <Link
                      href={card.href}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition-colors py-1"
                      title={`Learn more about ${card.title}`}
                    >
                      <span>Full Guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* EXPANDABLE CONCISE EDUCATIONAL PANEL */}
                  {isExpanded && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="mt-4 pt-4 border-t border-slate-800/90 rounded-xl bg-slate-950/80 p-4 space-y-4 animate-in fade-in zoom-in-95 duration-200"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="text-[11px] font-mono font-bold uppercase text-cyan-400 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-cyan-400" />
                          Educational Briefing
                        </span>
                        <button
                          type="button"
                          onClick={() => setExpandedCardId(null)}
                          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                          aria-label="Close panel"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-3 text-xs leading-relaxed">
                        {/* WHAT IS IT? */}
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] font-bold uppercase text-cyan-300 tracking-wider flex items-center gap-1">
                            <HelpCircle className="w-3 h-3 text-cyan-400" />
                            WHAT IS IT?
                          </span>
                          <p className="text-slate-300 pl-4">{card.education.whatIsIt}</p>
                        </div>

                        {/* HOW DOES IT WORK? */}
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] font-bold uppercase text-amber-300 tracking-wider flex items-center gap-1">
                            <Workflow className="w-3 h-3 text-amber-400" />
                            HOW DOES IT WORK?
                          </span>
                          <p className="text-slate-300 pl-4">{card.education.howItWorks}</p>
                        </div>

                        {/* WARNING SIGNS */}
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] font-bold uppercase text-rose-300 tracking-wider flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-rose-400" />
                            WARNING SIGNS
                          </span>
                          <p className="text-slate-300 pl-4">{card.education.warningSigns}</p>
                        </div>

                        {/* HOW TO DEFEND */}
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] font-bold uppercase text-emerald-300 tracking-wider flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            HOW TO DEFEND
                          </span>
                          <p className="text-slate-300 pl-4">{card.education.howToDefend}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
