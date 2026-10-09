import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Heart, Mail, Lock, AlertCircle } from 'lucide-react';
import { FOOTER_SECTIONS } from '@/data/navigation';
import { CyberAntigravityLogo } from '@/components/ui/CyberAntigravityLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 pb-12 border-b border-slate-800/60">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="group inline-flex transition-opacity hover:opacity-95"
              aria-label="CyberAntigravity Home"
            >
              <CyberAntigravityLogo variant="full" size="lg" showTagline={true} />
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              CyberAntigravity is an independent global cybersecurity education and online safety platform dedicated to empowering individuals, families, and organizations with proactive digital defense and scam awareness.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-300">Contact:</span>
                <a
                  href="mailto:contact@cyberantigravity.com"
                  className="text-cyan-400 hover:underline"
                >
                  contact@cyberantigravity.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Built for defensive security education • Free & open learning</span>
              </div>
            </div>
          </div>

          {/* Links Column: Cyber Safety */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Cyber Safety
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_SECTIONS.safety.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="hover:text-cyan-400 transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column: Scam Awareness */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Scam Awareness
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_SECTIONS.scams.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="hover:text-cyan-400 transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column: Learn */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Learn
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_SECTIONS.education.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="hover:text-cyan-400 transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column: Blog & Knowledge */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Blog & Guides
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_SECTIONS.blog.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="hover:text-cyan-400 transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column: Tools & Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Tools & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_SECTIONS.tools.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="hover:text-cyan-400 transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-slate-800/80">
                <Link href="/#about" className="text-slate-300 hover:text-cyan-400 transition-colors">
                  About Platform
                </Link>
              </li>
              {FOOTER_SECTIONS.legal.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="text-slate-400 hover:text-cyan-400 transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer & Mandatory Educational Notice */}
        <div className="my-8 p-4 rounded-xl bg-slate-900/60 border border-slate-800/70 text-xs text-slate-400 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-slate-300">Educational & Defensive Purpose Mandate:</span>
            <p>
              CyberAntigravity is designed solely for defensive cybersecurity education, ethical literacy, and digital fraud prevention.
              All learning tracks, simulated tools, and methodologies are strictly intended to assist users and organizations in protecting digital assets.
              Unauthorized access or offensive exploitation against third-party systems is illegal and strictly contrary to our code of ethics.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} CyberAntigravity (cyberantigravity.com). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for global online safety
            </span>
            <a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              Back to top <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
