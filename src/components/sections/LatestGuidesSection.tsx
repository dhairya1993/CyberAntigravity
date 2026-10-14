import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Clock,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { BLOG_ARTICLES } from '@/data/blogArticles';

// Custom SVG contextual illustrations for each article
function renderArticleGraphic(slug: string) {
  switch (slug) {
    case 'what-is-phishing':
      return (
        <svg viewBox="0 0 200 100" fill="none" className="w-full h-full" aria-hidden="true">
          <rect width="200" height="100" rx="8" fill="#090d16" />
          {/* Subtle grid lines */}
          <line x1="20" y1="0" x2="20" y2="100" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="100" y1="0" x2="100" y2="100" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="180" y1="0" x2="180" y2="100" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3 3" />

          {/* Fake email envelope */}
          <rect x="25" y="25" width="60" height="42" rx="4" fill="rgba(30, 41, 59, 0.7)" stroke="#475569" strokeWidth="1.5" />
          <path d="M25 30L55 52L85 30" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Email laser scanning line */}
          <line x1="26" y1="35" x2="84" y2="35" stroke="#f43f5e" strokeWidth="1.5" opacity="0.8">
            <animate attributeName="y1" values="27;64;27" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="y2" values="27;64;27" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.4s" repeatCount="indefinite" />
          </line>

          {/* Threat Fishing Hook dropping down */}
          <path
            id="phish_hook_path"
            d="M125 15V45C125 62 105 66 100 58C97 53 102 48 107 50"
            stroke="#f43f5e"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="4 2"
            className="animate-cyber-flow"
          />

          {/* Malicious lure packet traveling down the hook */}
          <circle r="3" fill="#f43f5e">
            <animateMotion dur="2s" repeatCount="indefinite" path="M125 15V45C125 62 105 66 100 58C97 53 102 48 107 50" />
          </circle>

          {/* Glowing lure bait */}
          <circle cx="107" cy="50" r="3.5" fill="#fb7185" className="animate-pulse" />
          <circle cx="107" cy="50" r="8" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" className="animate-spin" style={{ animationDuration: '4s' }} />

          {/* Intercept line from shield to bait */}
          <line x1="130" y1="50" x2="112" y2="50" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="3 2" className="animate-cyber-flow" />
          <circle r="2" fill="#00f0ff">
            <animateMotion dur="1.2s" repeatCount="indefinite" path="M130 50 L 112 50" />
          </circle>

          {/* Defensive Shield blocking intercept */}
          <path d="M150 25L170 32V50C170 64 150 72 150 72C150 72 130 64 130 50V32L150 25Z" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2" />
          <path d="M143 47L148 52L157 43" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="150" cy="48" r="18" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" className="animate-spin" style={{ animationDuration: '8s' }} />
        </svg>
      );
    case 'strong-passwords':
      return (
        <svg viewBox="0 0 200 100" fill="none" className="w-full h-full" aria-hidden="true">
          <rect width="200" height="100" rx="8" fill="#090d16" />
          
          {/* Password credential vault field */}
          <rect x="20" y="32" width="105" height="34" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="#0ea5e9" strokeWidth="1.5" />
          
          {/* Scanning sweep across password box */}
          <line x1="22" y1="33" x2="22" y2="65" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6">
            <animate attributeName="x1" values="22;123;22" dur="3s" repeatCount="indefinite" />
            <animate attributeName="x2" values="22;123;22" dur="3s" repeatCount="indefinite" />
          </line>

          {/* Bullets representing high entropy with pulsing glow */}
          <circle cx="36" cy="49" r="4" fill="#38bdf8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0s" />
          </circle>
          <circle cx="50" cy="49" r="4" fill="#38bdf8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.3s" />
          </circle>
          <circle cx="64" cy="49" r="4" fill="#38bdf8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.6s" />
          </circle>
          <circle cx="78" cy="49" r="4" fill="#38bdf8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.9s" />
          </circle>
          <circle cx="92" cy="49" r="4" fill="#38bdf8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="1.2s" />
          </circle>
          <circle cx="106" cy="49" r="4" fill="#22c55e" className="animate-pulse" />

          {/* Connecting vector from vault to key */}
          <line x1="125" y1="49" x2="145" y2="49" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="3 3" className="animate-cyber-flow" />
          <circle r="2.5" fill="#00f0ff">
            <animateMotion dur="1.5s" repeatCount="indefinite" path="M 125 49 L 145 49" />
          </circle>

          {/* Cryptographic Key symbol */}
          <circle cx="160" cy="42" r="14" fill="rgba(14, 165, 233, 0.2)" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="160" cy="42" r="6" fill="#07090e" stroke="#00f0ff" strokeWidth="1.5" />
          <circle cx="160" cy="42" r="18" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.5" className="animate-spin" style={{ animationDuration: '6s' }} />
          <path d="M160 56V78M160 64H170M160 72H168" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Entropy status */}
          <text x="24" y="24" fill="#38bdf8" fontSize="8" fontFamily="monospace">entropy: 104 bits [HIGH]</text>
          <circle cx="118" cy="21" r="2" fill="#22c55e" className="animate-ping" />
        </svg>
      );
    case 'multi-factor-authentication':
      return (
        <svg viewBox="0 0 200 100" fill="none" className="w-full h-full" aria-hidden="true">
          <rect width="200" height="100" rx="8" fill="#090d16" />
          
          {/* Mobile phone authenticator device */}
          <rect x="30" y="16" width="46" height="70" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="#10b981" strokeWidth="1.5" />
          <rect x="37" y="28" width="32" height="28" rx="3" fill="#022c22" stroke="#059669" strokeWidth="1" />
          
          {/* OTP Code display with glow */}
          <text x="40" y="46" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="monospace">849 201</text>
          
          {/* Scanning line over OTP */}
          <line x1="38" y1="30" x2="38" y2="54" stroke="#34d399" strokeWidth="1" opacity="0.7">
            <animate attributeName="x1" values="38;68;38" dur="2s" repeatCount="indefinite" />
            <animate attributeName="x2" values="38;68;38" dur="2s" repeatCount="indefinite" />
          </line>

          {/* Sync status */}
          <path d="M49 74H57" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          <circle cx="53" cy="22" r="1.5" fill="#10b981" className="animate-pulse" />

          {/* Live Auth Flow Stream to Hardware Key */}
          <path d="M85 50H130" stroke="#10b981" strokeWidth="2" strokeDasharray="4 3" className="animate-cyber-flow" />
          
          {/* Traveling Auth Token Packets */}
          <circle r="3" fill="#10b981">
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M 85 50 L 130 50" />
          </circle>
          <circle r="2" fill="#34d399">
            <animateMotion dur="1.8s" begin="0.9s" repeatCount="indefinite" path="M 85 50 L 130 50" />
          </circle>

          {/* Hardware FIDO Key / Shield */}
          <rect x="135" y="32" width="36" height="36" rx="6" fill="rgba(6, 78, 59, 0.35)" stroke="#10b981" strokeWidth="2" />
          <path d="M147 32V25C147 21 150 18 153 18C156 18 159 21 159 25V32" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
          <circle cx="153" cy="48" r="3.5" fill="#10b981" />
          <path d="M153 51.5V58" stroke="#10b981" strokeWidth="1.5" />
          
          {/* Verified rotating halo */}
          <circle cx="153" cy="50" r="22" stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" className="animate-spin" style={{ animationDuration: '6s' }} />
        </svg>
      );
    case 'fake-website-warning-signs':
      return (
        <svg viewBox="0 0 200 100" fill="none" className="w-full h-full" aria-hidden="true">
          <rect width="200" height="100" rx="8" fill="#090d16" />
          
          {/* Browser Window mockup */}
          <rect x="20" y="20" width="160" height="64" rx="6" fill="rgba(15, 23, 42, 0.95)" stroke="#334155" strokeWidth="1.5" />
          <line x1="20" y1="36" x2="180" y2="36" stroke="#334155" strokeWidth="1" />
          <circle cx="30" cy="28" r="2.5" fill="#ef4444" />
          <circle cx="38" cy="28" r="2.5" fill="#f59e0b" />
          <circle cx="46" cy="28" r="2.5" fill="#10b981" />

          {/* Deceptive Address Bar */}
          <rect x="58" y="23" width="116" height="10" rx="3" fill="#020617" stroke="#475569" strokeWidth="0.8" />
          
          {/* Scanning laser beam along address bar */}
          <line x1="60" y1="23" x2="60" y2="33" stroke="#f43f5e" strokeWidth="1.5" opacity="0.8">
            <animate attributeName="x1" values="60;170;60" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="x2" values="60;170;60" dur="2.5s" repeatCount="indefinite" />
          </line>

          <text x="62" y="31" fill="#f87171" fontSize="7" fontFamily="monospace">paypa1-security.xyz</text>
          
          {/* Warning Flag overlay */}
          <path d="M70 52L80 68H60L70 52Z" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="70" y1="58" x2="70" y2="62" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="70" cy="65" r="0.8" fill="#fbbf24" />
          
          {/* Live warning radar pulse */}
          <circle cx="70" cy="60" r="14" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" className="animate-spin" style={{ animationDuration: '5s' }} />

          <text x="90" y="58" fill="#cbd5e1" fontSize="9" fontWeight="bold">Deceptive Apex</text>
          <text x="90" y="68" fill="#f43f5e" fontSize="7" fontFamily="monospace">Homoglyph [1 != l]</text>
          
          {/* Live alert blinking dot */}
          <circle cx="168" cy="56" r="3" fill="#f43f5e" className="animate-ping" />
        </svg>
      );
    case 'social-engineering':
      return (
        <svg viewBox="0 0 200 100" fill="none" className="w-full h-full" aria-hidden="true">
          <rect width="200" height="100" rx="8" fill="#090d16" />
          
          {/* Central Mind / Human Node */}
          <circle cx="95" cy="30" r="13" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth="2" />
          <circle cx="95" cy="30" r="18" stroke="#c084fc" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" className="animate-spin" style={{ animationDuration: '6s' }} />
          <path d="M80 64C80 52 87 48 95 48C103 48 110 52 110 64" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />

          {/* Urgency pressure needles with live flow streams */}
          <path d="M30 25L82 28" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="4 2" className="animate-cyber-flow" />
          <circle r="2.5" fill="#f43f5e">
            <animateMotion dur="1.6s" repeatCount="indefinite" path="M 30 25 L 82 28" />
          </circle>

          <path d="M30 48L78 34" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="4 2" className="animate-cyber-flow" />
          <circle r="2.5" fill="#f43f5e">
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M 30 48 L 78 34" />
          </circle>

          <text x="20" y="21" fill="#fb7185" fontSize="7" fontFamily="monospace">URGENCY_INJECT</text>
          <text x="20" y="58" fill="#fb7185" fontSize="7" fontFamily="monospace">FEAR_TRIGGER</text>

          {/* Mental Circuit Breaker Shield */}
          <path d="M142 25L165 32V50C165 62 142 70 142 70C142 70 120 62 120 50V32L142 25Z" fill="rgba(168, 85, 247, 0.25)" stroke="#c084fc" strokeWidth="2" />
          <text x="131" y="48" fill="#e9d5ff" fontSize="8" fontWeight="bold">PAUSE</text>
          <circle cx="142" cy="46" r="18" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" className="animate-spin" style={{ animationDuration: '7s' }} />
        </svg>
      );
    case 'https-explained':
    default:
      return (
        <svg viewBox="0 0 200 100" fill="none" className="w-full h-full" aria-hidden="true">
          <rect width="200" height="100" rx="8" fill="#090d16" />
          
          {/* TLS Encrypted Tunnel */}
          <rect x="25" y="32" width="150" height="36" rx="6" fill="rgba(14, 165, 233, 0.12)" stroke="#0284c7" strokeWidth="1.5" />
          
          {/* Animated Tunnel Stream borders */}
          <line x1="28" y1="34" x2="172" y2="34" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" className="animate-cyber-flow" opacity="0.7" />
          <line x1="28" y1="66" x2="172" y2="66" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" className="animate-cyber-flow" opacity="0.7" />

          {/* Client Node */}
          <circle cx="48" cy="50" r="11" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="44" y="53" fill="#ffffff" fontSize="8" fontWeight="bold">C</text>

          {/* Server Node */}
          <circle cx="152" cy="50" r="11" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="148" y="53" fill="#ffffff" fontSize="8" fontWeight="bold">S</text>

          {/* Symmetric Encrypted Stream Lock */}
          <path d="M93 45V41C93 37.5 96 35 100 35C104 35 107 37.5 107 41V45" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          <rect x="90" y="45" width="20" height="16" rx="3" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="100" cy="52" r="2.5" fill="#ffffff" className="animate-pulse" />
          <circle cx="100" cy="48" r="16" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" className="animate-spin" style={{ animationDuration: '6s' }} />

          {/* Encrypted Packets flowing Bidirectionally */}
          {/* Client -> Server Packet */}
          <circle r="3" fill="#00f0ff">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 48 50 L 152 50" />
          </circle>
          {/* Server -> Client Packet */}
          <circle r="2.5" fill="#10b981">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 152 50 L 48 50" />
          </circle>

          {/* Cipher Label */}
          <text x="66" y="24" fill="#38bdf8" fontSize="8" fontFamily="monospace">TLS 1.3 / AES-GCM</text>
          <circle cx="145" cy="21" r="2" fill="#10b981" className="animate-ping" />
        </svg>
      );
  }
}

export const LatestGuidesSection: React.FC = () => {
  // Use first 6 real articles from BLOG_ARTICLES
  const articles = BLOG_ARTICLES.slice(0, 6);

  return (
    <section id="guides" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="cyber-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide uppercase">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Knowledge Base & Tutorials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Latest Cybersecurity <span className="text-cyan-400">Guides</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              In-depth defensive explainers, vulnerability breakdowns, and step-by-step security hardening guides designed for real learners.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group shrink-0"
          >
            <span>Explore All Guides in Cyber Blog</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group flex flex-col justify-between rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-cyan-950/20"
            >
              {/* Graphical Top Image Illustration */}
              <div className="h-44 w-full bg-slate-950 border-b border-slate-800 p-3 flex items-center justify-center relative overflow-hidden group-hover:border-cyan-500/30 transition-colors">
                {renderArticleGraphic(article.slug)}
                {/* Category Pill on top right */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/80 text-[10px] font-mono uppercase font-semibold text-cyan-300 shadow">
                  {article.category}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {article.readingTime || '5 min read'}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-medium text-slate-300">
                      {article.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {article.excerpt || article.description}
                  </p>
                </div>

                {/* Card Footer CTA */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                    <Shield className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Defensive Guide</span>
                  </div>

                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group/link transition-colors"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
