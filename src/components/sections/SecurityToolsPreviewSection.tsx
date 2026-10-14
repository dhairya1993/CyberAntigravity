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
      <div className="w-full h-24 rounded-lg bg-slate-950/80 border border-slate-800/80 p-3 flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 180 70" className="w-full h-full" fill="none" aria-hidden="true">
          {/* Key outline with glowing aura */}
          <circle cx="38" cy="35" r="13" stroke="#00f0ff" strokeWidth="2" fill="rgba(0,240,255,0.15)" />
          <circle cx="38" cy="35" r="5" stroke="#00f0ff" strokeWidth="1.5" />
          <circle cx="38" cy="35" r="17" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" className="animate-spin" style={{ animationDuration: '6s' }} />

          {/* Key shaft connecting to token box with animated cyber flow */}
          <path d="M 51 35 H 110 M 82 35 V 44 M 94 35 V 42" stroke="#00f0ff" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="5 3" className="animate-cyber-flow" />
          
          {/* Traveling cryptographic packet along key */}
          <circle r="2.5" fill="#00f0ff">
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M 38 35 H 112" />
          </circle>

          {/* Randomized characters block */}
          <rect x="112" y="18" width="60" height="34" rx="5" fill="#090d16" stroke="#334155" strokeWidth="1.2" />
          
          {/* Scanning line across generated password */}
          <line x1="114" y1="20" x2="114" y2="50" stroke="#38bdf8" strokeWidth="1" opacity="0.7">
            <animate attributeName="x1" values="114;170;114" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="x2" values="114;170;114" dur="2.2s" repeatCount="indefinite" />
          </line>

          <text x="117" y="32" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="bold">k9#X!m7@</text>
          <text x="117" y="44" fill="#10b981" fontSize="7" fontFamily="monospace">entropy: 96b</text>
          <circle cx="164" cy="24" r="2" fill="#10b981" className="animate-ping" />
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
      <div className="w-full h-24 rounded-lg bg-slate-950/80 border border-slate-800/80 p-3 flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 180 70" className="w-full h-full" fill="none" aria-hidden="true">
          {/* Meter Background */}
          <rect x="16" y="28" width="85" height="12" rx="6" fill="#1e293b" />
          <rect x="16" y="28" width="76" height="12" rx="6" fill="url(#tool_meter_grad)">
            <animate attributeName="width" values="64;78;64" dur="3s" repeatCount="indefinite" />
          </rect>
          
          <text x="18" y="22" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">STRENGTH: VERY HIGH</text>
          <text x="18" y="52" fill="#10b981" fontSize="7" fontFamily="monospace">104.2 bits entropy</text>

          {/* Connection stream to shield */}
          <line x1="95" y1="34" x2="120" y2="34" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" className="animate-cyber-flow" />
          <circle r="2.5" fill="#10b981">
            <animateMotion dur="1.5s" repeatCount="indefinite" path="M 95 34 L 122 34" />
          </circle>

          {/* Defensive Shield */}
          <path d="M 142 16 L 162 22 V 42 C 162 54 142 62 142 62 C 142 62 122 54 122 42 V 22 L 142 16 Z" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="2" />
          <path d="M 135 39 L 140 44 L 149 34" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="142" cy="38" r="18" stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" className="animate-spin" style={{ animationDuration: '7s' }} />

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
      <div className="w-full h-24 rounded-lg bg-slate-950/80 border border-slate-800/80 p-3 flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 180 70" className="w-full h-full" fill="none" aria-hidden="true">
          {/* Shared single password in center */}
          <rect x="15" y="26" width="46" height="18" rx="4" fill="#450a0a" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="19" y="38" fill="#fca5a5" fontSize="6.5" fontFamily="monospace">pass123</text>
          
          {/* Multiple connected accounts with live cyber streams */}
          <path d="M 61 35 L 105 18" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 2" className="animate-cyber-flow" />
          <path d="M 61 35 L 105 35" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 2" className="animate-cyber-flow" />
          <path d="M 61 35 L 105 52" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 2" className="animate-cyber-flow" />

          {/* Traveling threat packets cascading into each service */}
          <circle r="2.2" fill="#f43f5e">
            <animateMotion dur="1.6s" repeatCount="indefinite" path="M 61 35 L 105 18" />
          </circle>
          <circle r="2.5" fill="#f43f5e">
            <animateMotion dur="1.4s" repeatCount="indefinite" path="M 61 35 L 105 35" />
          </circle>
          <circle r="2.2" fill="#f43f5e">
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M 61 35 L 105 52" />
          </circle>

          {/* 3 linked accounts with risk indicator */}
          <circle cx="116" cy="18" r="8" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1.2" />
          <text x="110" y="21" fill="#fbbf24" fontSize="6">Mail</text>

          <circle cx="116" cy="35" r="8" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="109" y="38" fill="#f87171" fontSize="6" fontWeight="bold">Bank</text>
          <circle cx="116" cy="35" r="12" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" className="animate-spin" style={{ animationDuration: '4s' }} />

          <circle cx="116" cy="52" r="8" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1.2" />
          <text x="109" y="55" fill="#fbbf24" fontSize="6">Shop</text>

          <text x="132" y="38" fill="#f43f5e" fontSize="7" fontWeight="bold" fontFamily="monospace">BLAST RADIUS</text>
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
      <div className="w-full h-24 rounded-lg bg-slate-950/80 border border-slate-800/80 p-3 flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 180 70" className="w-full h-full" fill="none" aria-hidden="true">
          {/* Checklist pad */}
          <rect x="20" y="14" width="75" height="46" rx="4" fill="#090d16" stroke="#334155" strokeWidth="1.2" />
          
          {/* Scanning check line */}
          <line x1="22" y1="16" x2="93" y2="16" stroke="#10b981" strokeWidth="1.2" opacity="0.7">
            <animate attributeName="y1" values="16;56;16" dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="y2" values="16;56;16" dur="2.8s" repeatCount="indefinite" />
          </line>

          <circle cx="32" cy="25" r="3.5" fill="#10b981" />
          <path d="M 30 25 L 31.5 26.5 L 34 23.5" stroke="#000" strokeWidth="1" />
          <line x1="40" y1="25" x2="84" y2="25" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />

          <circle cx="32" cy="37" r="3.5" fill="#10b981" />
          <path d="M 30 37 L 31.5 38.5 L 34 35.5" stroke="#000" strokeWidth="1" />
          <line x1="40" y1="37" x2="76" y2="37" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />

          <circle cx="32" cy="49" r="3.5" fill="#10b981" />
          <path d="M 30 49 L 31.5 50.5 L 34 47.5" stroke="#000" strokeWidth="1" />
          <line x1="40" y1="49" x2="80" y2="49" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />

          {/* Connection stream to shield */}
          <line x1="95" y1="37" x2="124" y2="37" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" className="animate-cyber-flow" />
          <circle r="2.5" fill="#10b981">
            <animateMotion dur="1.4s" repeatCount="indefinite" path="M 95 37 L 126 37" />
          </circle>

          {/* Defensive Shield on right */}
          <path d="M 142 16 L 162 22 V 42 C 162 54 142 62 142 62 C 142 62 122 54 122 42 V 22 L 142 16 Z" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="2" />
          <path d="M 135 39 L 140 44 L 149 34" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="142" cy="38" r="18" stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" className="animate-spin" style={{ animationDuration: '7s' }} />
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
      <div className="w-full h-24 rounded-lg bg-slate-950/80 border border-slate-800/80 p-3 flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 180 70" className="w-full h-full" fill="none" aria-hidden="true">
          {/* Browser Address Bar */}
          <rect x="12" y="18" width="134" height="24" rx="4" fill="#090d16" stroke="#334155" strokeWidth="1.2" />
          
          {/* Scanning laser beam along URL */}
          <line x1="14" y1="19" x2="14" y2="41" stroke="#00f0ff" strokeWidth="1.2" opacity="0.8">
            <animate attributeName="x1" values="14;142;14" dur="2.6s" repeatCount="indefinite" />
            <animate attributeName="x2" values="14;142;14" dur="2.6s" repeatCount="indefinite" />
          </line>

          <text x="18" y="33" fill="#64748b" fontSize="6.5" fontFamily="monospace">https://</text>
          <text x="46" y="33" fill="#f59e0b" fontSize="6.5" fontFamily="monospace">brand.login</text>
          <text x="92" y="33" fill="#f43f5e" fontSize="6.5" fontFamily="monospace" fontWeight="bold">.fake.xyz</text>
          
          {/* Magnifying Glass highlighting apex domain */}
          <circle cx="125" cy="30" r="14" stroke="#00f0ff" strokeWidth="2" fill="rgba(0,240,255,0.15)" />
          <circle cx="125" cy="30" r="18" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" className="animate-spin" style={{ animationDuration: '6s' }} />
          <line x1="135" y1="40" x2="152" y2="57" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" />
          
          <text x="16" y="56" fill="#00f0ff" fontSize="7" fontFamily="monospace">Apex: fake.xyz (Attacker)</text>
          <circle cx="125" cy="30" r="3" fill="#f43f5e" className="animate-ping" />
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
      <div className="w-full h-24 rounded-lg bg-slate-950/80 border border-slate-800/80 p-3 flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 180 70" className="w-full h-full" fill="none" aria-hidden="true">
          {/* Website wireframe on left */}
          <rect x="12" y="15" width="48" height="44" rx="3" fill="#090d16" stroke="#334155" strokeWidth="1" />
          <rect x="12" y="15" width="48" height="10" rx="3" fill="#1e293b" />
          <circle cx="18" cy="20" r="1.5" fill="#f43f5e" />
          <circle cx="23" cy="20" r="1.5" fill="#10b981" />

          {/* Connecting cyber stream */}
          <line x1="60" y1="37" x2="78" y2="37" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 2" className="animate-cyber-flow" />
          <circle r="2" fill="#a855f7">
            <animateMotion dur="1.2s" repeatCount="indefinite" path="M 60 37 L 78 37" />
          </circle>

          {/* HTTP Response Headers panel on right */}
          <rect x="76" y="13" width="94" height="48" rx="4" fill="#090d16" stroke="#a855f7" strokeWidth="1.2" />
          <text x="81" y="24" fill="#c084fc" fontSize="6.5" fontFamily="monospace" fontWeight="bold">HTTP/2 200 OK</text>
          <circle cx="158" cy="22" r="2" fill="#10b981" className="animate-ping" />
          <text x="81" y="34" fill="#34d399" fontSize="6" fontFamily="monospace">Strict-Transport: max-age</text>
          <text x="81" y="43" fill="#38bdf8" fontSize="6" fontFamily="monospace">Content-Security-Policy</text>
          <text x="81" y="52" fill="#fbbf24" fontSize="6" fontFamily="monospace">X-Frame-Options: DENY</text>
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
