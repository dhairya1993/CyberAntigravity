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
          <rect x="30" y="25" width="60" height="42" rx="4" fill="rgba(30, 41, 59, 0.7)" stroke="#475569" strokeWidth="1.5" />
          <path d="M30 30L60 52L90 30" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
          {/* Threat Fishing Hook dropping down */}
          <path d="M125 15V45C125 62 105 66 100 58C97 53 102 48 107 50" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
          {/* Glowing lure bait */}
          <circle cx="107" cy="50" r="3" fill="#fb7185" className="animate-pulse" />
          {/* Defensive Shield blocking intercept */}
          <path d="M150 25L170 32V50C170 64 150 72 150 72C150 72 130 64 130 50V32L150 25Z" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" strokeWidth="2" />
          <path d="M143 47L148 52L157 43" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'strong-passwords':
      return (
        <svg viewBox="0 0 200 100" fill="none" className="w-full h-full" aria-hidden="true">
          <rect width="200" height="100" rx="8" fill="#090d16" />
          {/* Password credential vault field */}
          <rect x="25" y="32" width="105" height="34" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="#0ea5e9" strokeWidth="1.5" />
          {/* Bullets representing high entropy */}
          <circle cx="42" cy="49" r="4" fill="#38bdf8" />
          <circle cx="56" cy="49" r="4" fill="#38bdf8" />
          <circle cx="70" cy="49" r="4" fill="#38bdf8" />
          <circle cx="84" cy="49" r="4" fill="#38bdf8" />
          <circle cx="98" cy="49" r="4" fill="#38bdf8" />
          <circle cx="112" cy="49" r="4" fill="#22c55e" />
          {/* Cryptographic Key symbol */}
          <circle cx="155" cy="42" r="14" fill="rgba(14, 165, 233, 0.15)" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="155" cy="42" r="5" fill="#07090e" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M155 56V78M155 64H165M155 72H163" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Entropy status */}
          <text x="32" y="24" fill="#64748b" fontSize="8" fontFamily="monospace">entropy: 104 bits [HIGH]</text>
        </svg>
      );
    case 'multi-factor-authentication':
      return (
        <svg viewBox="0 0 200 100" fill="none" className="w-full h-full" aria-hidden="true">
          <rect width="200" height="100" rx="8" fill="#090d16" />
          {/* Mobile phone authenticator device */}
          <rect x="35" y="16" width="46" height="70" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="#10b981" strokeWidth="1.5" />
          <rect x="42" y="28" width="32" height="28" rx="3" fill="#022c22" stroke="#059669" strokeWidth="1" />
          {/* OTP Code display */}
          <text x="46" y="46" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="monospace">849 201</text>
          {/* Sync arrows */}
          <path d="M54 74H62" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          {/* Lock connecting to user */}
          <path d="M96 50H125" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Hardware FIDO Key / Shield */}
          <rect x="135" y="32" width="35" height="36" rx="6" fill="rgba(6, 78, 59, 0.3)" stroke="#10b981" strokeWidth="2" />
          <path d="M146 32V25C146 21 149 18 153 18C157 18 160 21 160 25V32" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
          <circle cx="152.5" cy="48" r="3" fill="#10b981" />
          <path d="M152.5 51V58" stroke="#10b981" strokeWidth="1.5" />
        </svg>
      );
    case 'fake-website-warning-signs':
      return (
        <svg viewBox="0 0 200 100" fill="none" className="w-full h-full" aria-hidden="true">
          <rect width="200" height="100" rx="8" fill="#090d16" />
          {/* Browser Window mockup */}
          <rect x="25" y="20" width="150" height="64" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="#334155" strokeWidth="1.5" />
          <line x1="25" y1="36" x2="175" y2="36" stroke="#334155" strokeWidth="1" />
          <circle cx="34" cy="28" r="2.5" fill="#ef4444" />
          <circle cx="42" cy="28" r="2.5" fill="#f59e0b" />
          <circle cx="50" cy="28" r="2.5" fill="#10b981" />
          {/* Deceptive Address Bar */}
          <rect x="62" y="23" width="105" height="10" rx="3" fill="#020617" stroke="#475569" strokeWidth="0.8" />
          <text x="66" y="31" fill="#f87171" fontSize="7" fontFamily="monospace">paypa1-security.xyz</text>
          {/* Warning Flag overlay */}
          <path d="M75 52L85 68H65L75 52Z" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="75" y1="58" x2="75" y2="62" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="75" cy="65" r="0.8" fill="#fbbf24" />
          <text x="94" y="60" fill="#cbd5e1" fontSize="9" fontWeight="bold">Deceptive Apex</text>
          <text x="94" y="70" fill="#64748b" fontSize="7">Homoglyph / Typosquat</text>
        </svg>
      );
    case 'social-engineering':
      return (
        <svg viewBox="0 0 200 100" fill="none" className="w-full h-full" aria-hidden="true">
          <rect width="200" height="100" rx="8" fill="#090d16" />
          {/* Manipulation Strings / Human Puppet */}
          <circle cx="100" cy="30" r="12" fill="rgba(168, 85, 247, 0.15)" stroke="#a855f7" strokeWidth="2" />
          <path d="M85 64C85 52 92 48 100 48C108 48 115 52 115 64" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
          {/* Urgency pressure needles */}
          <path d="M40 25L82 28" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M40 45L80 34" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="24" y="22" fill="#fb7185" fontSize="7" fontFamily="monospace">URGENCY_INJECT</text>
          <text x="24" y="55" fill="#fb7185" fontSize="7" fontFamily="monospace">FEAR_TRIGGER</text>
          {/* Mental Circuit Breaker Shield */}
          <path d="M145 25L165 32V50C165 62 145 70 145 70C145 70 125 62 125 50V32L145 25Z" fill="rgba(168, 85, 247, 0.2)" stroke="#c084fc" strokeWidth="2" />
          <text x="134" y="48" fill="#e9d5ff" fontSize="8" fontWeight="bold">PAUSE</text>
        </svg>
      );
    case 'https-explained':
    default:
      return (
        <svg viewBox="0 0 200 100" fill="none" className="w-full h-full" aria-hidden="true">
          <rect width="200" height="100" rx="8" fill="#090d16" />
          {/* TLS Encrypted Tunnel */}
          <rect x="25" y="32" width="150" height="36" rx="6" fill="rgba(14, 165, 233, 0.1)" stroke="#0284c7" strokeWidth="1.5" />
          {/* Client Node */}
          <circle cx="48" cy="50" r="10" fill="#0369a1" />
          <text x="44" y="53" fill="#ffffff" fontSize="8" fontWeight="bold">C</text>
          {/* Server Node */}
          <circle cx="152" cy="50" r="10" fill="#0369a1" />
          <text x="148" y="53" fill="#ffffff" fontSize="8" fontWeight="bold">S</text>
          {/* Symmetric Encrypted Stream Lock */}
          <path d="M93 45V41C93 37.5 96 35 100 35C104 35 107 37.5 107 41V45" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          <rect x="90" y="45" width="20" height="16" rx="3" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="100" cy="52" r="2" fill="#ffffff" />
          <text x="68" y="24" fill="#38bdf8" fontSize="8" fontFamily="monospace">TLS 1.3 / AES-GCM</text>
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
