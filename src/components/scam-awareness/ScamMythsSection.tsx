'use client';

import React from 'react';
import { CheckCircle2, XCircle, Sparkles, Shield } from 'lucide-react';

interface MythCard {
  id: number;
  myth: string;
  reality: string;
  category: string;
  takeaway: string;
}

const MYTHS: MythCard[] = [
  {
    id: 1,
    myth: 'Scams only target older or non-tech-savvy people.',
    reality: 'Anyone can be targeted, regardless of age, technical skill, or education.',
    category: 'Demographics & Vulnerability',
    takeaway: 'Younger digital natives are disproportionately targeted by remote task scams, collegiate financial aid lures, and social media crypto traps.',
  },
  {
    id: 2,
    myth: 'Bad spelling and broken grammar always give scams away.',
    reality: 'Professional-looking scams can be grammatically flawless.',
    category: 'Content Quality',
    takeaway: 'Modern cybercrime syndicates and generative AI generate impeccably written messages that faithfully mimic corporate brand voice and legal terms.',
  },
  {
    id: 3,
    myth: 'If a message contains my real name or phone number, it must be genuine.',
    reality: 'Personal identifiers are easily harvested from commercial data breaches.',
    category: 'Personalization & OSINT',
    takeaway: 'Attackers purchase leaked databases containing names, street addresses, and partial account digits to manufacture convincing spear-phishing messages.',
  },
  {
    id: 4,
    myth: 'Having good antivirus software installed makes me immune to scams.',
    reality: 'Antivirus stops malicious files, not psychological manipulation.',
    category: 'Technical Safeguards',
    takeaway: 'Social engineering bypasses firewalls by convincing you to voluntarily enter credentials, approve 2FA prompts, or wire money yourself.',
  },
  {
    id: 5,
    myth: 'If I don’t send money, clicking a strange link cannot do any real harm.',
    reality: 'Clicking a link can fingerprint your device or steal session tokens.',
    category: 'Link Mechanics',
    takeaway: 'Visiting a malicious page validates that your phone or email is live, fingerprints your browser environment, and can expose active authentication cookies.',
  },
];

export function ScamMythsSection() {
  return (
    <section id="scam-myths" className="py-16 md:py-24 bg-slate-900/30 border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Debunking Misconceptions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Scam Myths vs. Reality: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-300">5 False Assumptions</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Overconfidence is a scammer’s greatest ally. Dispel these common cybersecurity misconceptions to strengthen your day-to-day defense.
          </p>
        </div>

        {/* 5 Myth Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MYTHS.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-[#0b0f19] border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all duration-200 shadow-xl flex flex-col justify-between relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

                <div>
                  {/* Category Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/60">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Myth #0{item.id}
                    </span>
                  </div>

                  {/* Myth Statement */}
                  <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-2.5">
                      <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold block mb-1">
                          Common Myth
                        </span>
                        <p className="text-sm font-semibold text-rose-200 leading-snug">
                          &ldquo;{item.myth}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Reality Statement */}
                  <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                          Cyber Reality
                        </span>
                        <p className="text-sm font-bold text-emerald-200 leading-snug">
                          {item.reality}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Educational Takeaway */}
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800/60">
                    <strong className="text-cyan-400 block mb-1">Why This Matters:</strong>
                    {item.takeaway}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-[11px] font-mono text-cyan-400">
                    <Shield className="w-3.5 h-3.5" />
                    Defensive Awareness
                  </span>
                  <span className="text-[11px] text-slate-400">Verify independently</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
