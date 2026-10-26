import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldAlert, Home, BookOpen, Wrench, Search, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The requested cybersecurity guide or defensive resource could not be found.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const quickLinks = [
    {
      title: 'Interactive Learning Hub',
      desc: 'Explore hands-on lessons on phishing, malware defense, and digital privacy.',
      href: '/learn',
      icon: BookOpen,
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40',
    },
    {
      title: 'Scam Spotter & Red Flags',
      desc: 'Learn how to detect deceptive communications, urgency lures, and social engineering.',
      href: '/scam-awareness',
      icon: ShieldAlert,
      color: 'text-rose-400 border-rose-500/30 bg-rose-950/40',
    },
    {
      title: 'Defensive Security Tools',
      desc: 'Free browser-based password strength testers, passphrase generators, and URL inspectors.',
      href: '/tools',
      icon: Wrench,
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
    },
    {
      title: 'Cyber IQ Challenge',
      desc: 'Test your threat detection instincts with real-world interactive scenarios.',
      href: '/cyber-iq',
      icon: ShieldCheck,
      color: 'text-amber-400 border-amber-500/30 bg-amber-950/40',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-900 border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
            <ShieldAlert className="w-10 h-10 text-cyan-400 animate-pulse" />
          </div>

          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60">
              Error 404 • Resource Not Located
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Defensive Signal Lost
            </h1>
            <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto leading-relaxed">
              The page you are attempting to access does not exist, has been relocated, or was deprecated during a platform update.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-4">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg border shrink-0 ${item.color}`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all shadow-md shadow-cyan-500/20"
            >
              <Home className="w-4 h-4" />
              Return to Homepage
            </Link>
            <Link
              href="/blog"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-900 text-slate-300 font-semibold text-sm transition-all"
            >
              <Search className="w-4 h-4" />
              Search Research Library
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
