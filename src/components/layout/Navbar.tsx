'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Search, Menu, X, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { MAIN_NAV_ITEMS } from '@/data/navigation';
import { Button } from '@/components/ui/Button';
import { SearchModal } from './SearchModal';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Top Security Educational Notice */}
      <div className="bg-slate-950 border-b border-cyan-950/80 px-4 py-2 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-cyan-950 text-cyan-300 border border-cyan-800/80">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Educational Notice
            </span>
            <span className="text-slate-300 font-medium truncate">
              Cyber Safety Guide: Learn how to recognize and avoid modern phishing attacks.
            </span>
          </div>
          <a
            href="#cyber-safety"
            className="hidden sm:inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors shrink-0"
          >
            Explore Safety Guide <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40'
            : 'bg-transparent border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo & Tagline */}
            <a
              href="#"
              className="flex items-center gap-3 group cyber-focus-ring rounded-lg p-1"
              aria-label="CyberAntigravity Home"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-slate-900 border border-cyan-500/40 group-hover:border-cyan-400 transition-colors shadow-sm shadow-cyan-500/20">
                <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-105 transition-transform" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  Cyber<span className="text-cyan-400">Antigravity</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase font-medium hidden sm:inline-block">
                  Rise Above Cyber Threats.
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
              {MAIN_NAV_ITEMS.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors cyber-focus-ring"
                >
                  {item.title}
                </a>
              ))}
            </nav>

            {/* Actions: Search & CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors cyber-focus-ring"
                aria-label="Open search dialog"
              >
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span>Search safety topics...</span>
                <kbd className="font-mono text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                  Ctrl K
                </kbd>
              </button>

              <Button
                asLink
                href="#cyber-safety"
                variant="primary"
                size="sm"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Explore Cyber Safety
              </Button>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cyber-focus-ring"
                aria-label="Open search"
              >
                <Search className="w-5 h-5 text-cyan-400" />
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cyber-focus-ring"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[105px] z-50 bg-slate-950/95 backdrop-blur-lg border-b border-slate-800 p-6 overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
              {MAIN_NAV_ITEMS.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-base font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-900 rounded-xl transition-colors flex items-center justify-between"
                >
                  <span>{item.title}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </a>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col gap-3">
              <Button
                asLink
                href="#cyber-safety"
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore Cyber Safety
              </Button>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Built for defensive security education • Open knowledge</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
