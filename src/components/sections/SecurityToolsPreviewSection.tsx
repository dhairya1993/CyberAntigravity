import React from 'react';
import Link from 'next/link';
import {
  Wrench,
  ShieldCheck,
  Key,
  ShieldAlert,
  ListChecks,
  ExternalLink,
  Lock,
  ArrowRight,
  Terminal,
} from 'lucide-react';

interface ToolCard {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
  icon: React.ReactNode;
  visualGraphic: React.ReactNode;
}

const TOOLS: ToolCard[] = [
  // 1. Password Generator: key + random characters
  {
    id: 'password-generator',
    title: 'Defensive Passphrase Generator',
    description:
      'Generate high-entropy, cryptographically randomized passphrases and tokens locally inside browser memory.',
    href: '/tools/password-generator',
    category: 'Passwords',
    icon: <Lock className="w-5 h-5 text-cyan-400" />,
    visualGraphic: (
      <div className="w-full h-24 rounded-lg bg-slate-950/80 border border-slate-800/80 p-3 flex items-center justify-center">
        <svg viewBox="0 0 180 70" className="w-full h-full" fill="none" aria-hidden="true">
          {/* Key outline */}
          <circle cx="45" cy="35" r="14" stroke="#00f0ff" strokeWidth="2" fill="rgba(0,240,255,0.1)" />
          <circle cx="45" cy="35" r="5" stroke="#00f0ff" strokeWidth="1.5" />
          <path d="M 59 35 H 105 M 90 35 V 45 M 100 35 V 43" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" />
          {/* Randomized characters block */}
          <rect x="115" y="20" width="55" height="30" rx="4" fill="#090d16" stroke="#334155" strokeWidth="1" />
          <text x="120" y="34" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="bold">k9#X!m7@</text>
          <text x="120" y="44" fill="#10b981" fontSize="7" fontFamily="monospace">entropy: 96b</text>
        </svg>
      </div>
    ),
  },

  // 2. Password Strength: meter + shield
  {
    id: 'password-strength',
    title: 'Password Strength Analyzer',
    description:
      'Evaluate credential entropy, character variety, and common dictionary pattern vulnerability in real time.',
    href: '/tools/password-strength',
    category: 'Passwords',
    icon: <Key className="w-5 h-5 text-cyan-400" />,
    visualGraphic: (
      <div className="w-full h-24 rounded-lg bg-slate-950/80 border border-slate-800/80 p-3 flex items-center justify-center">
        <svg viewBox="0 0 180 70" className="w-full h-full" fill="none" aria-hidden="true">
          {/* Meter Bar */}
          <rect x="20" y="30" width="85" height="12" rx="6" fill="#1e293b" />
          <rect x="20" y="30" width="70" height="12" rx="6" fill="url(#tool_meter_grad)" />
          <text x="22" y="24" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">STRENGTH: VERY HIGH</text>
          <text x="22" y="52" fill="#10b981" fontSize="7" fontFamily="monospace">104.2 bits entropy</text>
          {/* Defensive Shield */}
          <path d="M 140 16 L 160 22 V 42 C 160 54 140 62 140 62 C 140 62 120 54 120 42 V 22 L 140 16 Z" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="2" />
          <path d="M 133 39 L 138 44 L 147 34" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="tool_meter_grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    ),
  },

  // 3. Password Reuse: multiple accounts connected to one password then show risk
  {
    id: 'password-reuse',
    title: 'Password Reuse Risk Calculator',
    description:
      'Understand how reusing a single credential across multiple services creates high blast-radius credential stuffing vulnerabilities.',
    href: '/tools/password-reuse',
    category: 'Risk Modeling',
    icon: <ShieldAlert className="w-5 h-5 text-amber-400" />,
    visualGraphic: (
      <div className="w-full h-24 rounded-lg bg-slate-950/80 border border-slate-800/80 p-3 flex items-center justify-center">
        <svg viewBox="0 0 180 70" className="w-full h-full" fill="none" aria-hidden="true">
          {/* Shared single password in center */}
          <rect x="20" y="26" width="42" height="18" rx="4" fill="#450a0a" stroke="#f43f5e" strokeWidth="1.2" />
          <text x="24" y="38" fill="#fca5a5" fontSize="6.5" fontFamily="monospace">pass123</text>
          {/* Multiple connected accounts */}
          <path d="M 62 35 L 105 18" stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="2 2" />
          <path d="M 62 35 L 105 35" stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="2 2" />
          <path d="M 62 35 L 105 52" stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="2 2" />
          {/* 3 linked accounts with risk indicator */}
          <circle cx="120" cy="18" r="8" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1" />
          <text x="114" y="21" fill="#fbbf24" fontSize="6">Mail</text>
          <circle cx="120" cy="35" r="8" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="1" />
          <text x="113" y="38" fill="#f87171" fontSize="6">Bank</text>
          <circle cx="120" cy="52" r="8" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1" />
          <text x="113" y="55" fill="#fbbf24" fontSize="6">Shop</text>
          <text x="135" y="38" fill="#f43f5e" fontSize="7.5" fontWeight="bold">RISK CASCADE</text>
        </svg>
      </div>
    ),
  },

  // 4. Cyber Hygiene: checklist + shield
  {
    id: 'cyber-hygiene',
    title: 'Personal Cyber Hygiene Checklist',
    description:
      'Interactive audit to baseline your foundational digital defenses across devices, passwords, backups, and privacy configs.',
    href: '/tools/cyber-hygiene',
    category: 'Assessment',
    icon: <ListChecks className="w-5 h-5 text-emerald-400" />,
    visualGraphic: (
      <div className="w-full h-24 rounded-lg bg-slate-950/80 border border-slate-800/80 p-3 flex items-center justify-center">
        <svg viewBox="0 0 180 70" className="w-full h-full" fill="none" aria-hidden="true">
          {/* Checklist pad */}
          <rect x="25" y="14" width="75" height="46" rx="4" fill="#090d16" stroke="#334155" strokeWidth="1.2" />
          <circle cx="36" cy="25" r="3.5" fill="#10b981" />
          <path d="M 34 25 L 35.5 26.5 L 38 23.5" stroke="#000" strokeWidth="1" />
          <line x1="44" y1="25" x2="88" y2="25" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="36" cy="37" r="3.5" fill="#10b981" />
          <path d="M 34 37 L 35.5 38.5 L 38 35.5" stroke="#000" strokeWidth="1" />
          <line x1="44" y1="37" x2="80" y2="37" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="36" cy="49" r="3.5" fill="#10b981" />
          <path d="M 34 49 L 35.5 50.5 L 38 47.5" stroke="#000" strokeWidth="1" />
          <line x1="44" y1="49" x2="84" y2="49" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
          {/* Defensive Shield on right */}
          <path d="M 135 18 L 155 24 V 44 C 155 54 135 62 135 62 C 135 62 115 54 115 44 V 24 L 135 18 Z" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="2" />
          <path d="M 128 40 L 133 45 L 142 35" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
  },

  // 5. URL Explainer: browser URL + magnifying glass
  {
    id: 'url-explainer',
    title: 'URL Anatomy & Deceptive Link Explainer',
    description:
      'Deconstruct URL components—protocol, subdomain, true apex domain, port, and path—to spot deceptive homograph lookalikes.',
    href: '/tools/url-explainer',
    category: 'Web Safety',
    icon: <ExternalLink className="w-5 h-5 text-cyan-400" />,
    visualGraphic: (
      <div className="w-full h-24 rounded-lg bg-slate-950/80 border border-slate-800/80 p-3 flex items-center justify-center">
        <svg viewBox="0 0 180 70" className="w-full h-full" fill="none" aria-hidden="true">
          {/* Browser Address Bar */}
          <rect x="15" y="20" width="130" height="22" rx="4" fill="#090d16" stroke="#334155" strokeWidth="1.2" />
          <text x="22" y="34" fill="#64748b" fontSize="6.5" fontFamily="monospace">https://</text>
          <text x="50" y="34" fill="#f59e0b" fontSize="6.5" fontFamily="monospace">brand.login</text>
          <text x="96" y="34" fill="#f43f5e" fontSize="6.5" fontFamily="monospace" fontWeight="bold">.fake.xyz</text>
          {/* Magnifying Glass highlighting apex domain */}
          <circle cx="120" cy="33" r="14" stroke="#00f0ff" strokeWidth="2" fill="rgba(0,240,255,0.1)" />
          <line x1="130" y1="43" x2="145" y2="58" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" />
          <text x="20" y="56" fill="#00f0ff" fontSize="7" fontFamily="monospace">Apex: fake.xyz (Attacker)</text>
        </svg>
      </div>
    ),
  },

  // 6. Security Headers: website + HTTP response headers
  {
    id: 'security-headers',
    title: 'Web Security Headers Inspector',
    description:
      'Learn how defensive HTTP headers (CSP, HSTS, X-Frame-Options) prevent clickjacking, XSS, and cleartext downgrade interception.',
    href: '/tools/security-headers',
    category: 'Web Security',
    icon: <Terminal className="w-5 h-5 text-purple-400" />,
    visualGraphic: (
      <div className="w-full h-24 rounded-lg bg-slate-950/80 border border-slate-800/80 p-3 flex items-center justify-center">
        <svg viewBox="0 0 180 70" className="w-full h-full" fill="none" aria-hidden="true">
          {/* Website wireframe on left */}
          <rect x="15" y="15" width="50" height="44" rx="3" fill="#090d16" stroke="#334155" strokeWidth="1" />
          <rect x="15" y="15" width="50" height="10" rx="3" fill="#1e293b" />
          <circle cx="21" cy="20" r="1.5" fill="#f43f5e" />
          <circle cx="26" cy="20" r="1.5" fill="#10b981" />
          {/* HTTP Response Headers panel on right */}
          <rect x="75" y="14" width="90" height="46" rx="4" fill="#090d16" stroke="#a855f7" strokeWidth="1" />
          <text x="80" y="25" fill="#c084fc" fontSize="6.5" fontFamily="monospace" fontWeight="bold">HTTP/2 200 OK</text>
          <text x="80" y="35" fill="#34d399" fontSize="6" fontFamily="monospace">Strict-Transport: max-age</text>
          <text x="80" y="44" fill="#38bdf8" fontSize="6" fontFamily="monospace">Content-Security-Policy</text>
          <text x="80" y="53" fill="#fbbf24" fontSize="6" fontFamily="monospace">X-Frame-Options: DENY</text>
        </svg>
      </div>
    ),
  },
];

export const SecurityToolsPreviewSection: React.FC = () => {
  return (
    <section id="practical-tools" className="py-20 md:py-28 relative scroll-mt-20 bg-slate-950/60 border-y border-slate-800/60">
      <div className="cyber-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide uppercase">
              <Wrench className="w-3.5 h-3.5 text-cyan-400" />
              <span>Client-Side Utilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Practical <span className="text-cyan-400">Security Tools</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Hands-on defensive tools built for practical learning. Every calculation runs locally in your browser memory with zero server telemetry.
            </p>
          </div>

          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group shrink-0"
          >
            <span>Explore All 6 Tools & Architecture Roadmap</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TOOLS.map((tool) => (
            <div
              key={tool.id}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20"
            >
              {/* Top Meta */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                      {tool.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        {tool.category}
                      </span>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {tool.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Graphical Preview Card */}
                {tool.visualGraphic}

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Bottom Details & Link */}
              <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between">
                {/* Privacy Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-[11px] font-medium text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Runs locally in browser</span>
                </div>

                <Link
                  href={tool.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group/link transition-colors"
                >
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
