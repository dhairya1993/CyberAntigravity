'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Menu, X, ArrowRight, ShieldCheck, ChevronRight, User, LogOut, Award, ChevronDown } from 'lucide-react';
import { MAIN_NAV_ITEMS } from '@/data/navigation';
import { Button } from '@/components/ui/Button';
import { CyberAntigravityLogo } from '@/components/ui/CyberAntigravityLogo';
import { SearchModal } from './SearchModal';
import { useAuth } from '@/contexts/AuthContext';

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

  const { user, logout, openAuthModal } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Security Educational Notice */}
      <div className="bg-slate-950 border-b border-cyan-950/80 px-4 py-2 text-xs text-slate-300">
        <div className="max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-8 xl:px-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-cyan-950 text-cyan-300 border border-cyan-800/80">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Educational Notice
            </span>
            <span className="text-slate-300 font-medium truncate">
              Cyber Safety Guide: Learn how to recognize and avoid modern phishing attacks.
            </span>
          </div>
          <a
            href="/cyber-safety"
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
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo & Tagline */}
            <Link
              href="/"
              className="group cyber-focus-ring rounded-lg p-1 transition-opacity hover:opacity-95"
              aria-label="CyberAntigravity Home"
            >
              <CyberAntigravityLogo variant="full" size="md" />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
              {MAIN_NAV_ITEMS.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors cyber-focus-ring"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Actions: Search, Auth & CTA */}
            <div className="hidden sm:flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors cyber-focus-ring"
                aria-label="Open search dialog"
              >
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span>Search...</span>
                <kbd className="font-mono text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                  Ctrl K
                </kbd>
              </button>

              {/* Student Authentication Controls */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-800/80 hover:border-cyan-500 text-xs text-white transition-all cyber-focus-ring"
                    aria-expanded={isUserMenuOpen}
                    aria-label="User account menu"
                  >
                    <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400 font-semibold text-xs">
                      {user.displayName.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium max-w-[120px] truncate">{user.displayName}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-xl shadow-black/60 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-2 border-b border-slate-800 mb-1">
                        <p className="text-xs font-semibold text-white truncate">{user.displayName}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/learn/progress"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:text-cyan-300 hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <Award className="w-4 h-4 text-cyan-400" />
                        <span>My Progress & Badges</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 text-rose-400" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-300 hover:text-white bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-800/80 rounded-lg transition-colors cyber-focus-ring"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}

              <Button
                asLink
                href="/cyber-safety"
                variant="primary"
                size="sm"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Safety Guide
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
            <div className="pb-4 mb-4 border-b border-slate-800/80">
              <CyberAntigravityLogo variant="full" size="sm" />
            </div>
            <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
              {MAIN_NAV_ITEMS.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-base font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-900 rounded-xl transition-colors flex items-center justify-between"
                >
                  <span>{item.title}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col gap-3">
              {user ? (
                <div className="p-3 bg-slate-900 border border-cyan-800/60 rounded-xl mb-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-xs font-bold text-white">{user.displayName}</p>
                      <p className="text-[10px] text-slate-400">{user.email}</p>
                    </div>
                    <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded font-mono">
                      Student
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href="/learn/progress"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 py-1.5 text-center text-xs font-semibold bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 rounded-lg"
                    >
                      My Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        logout();
                      }}
                      className="px-3 py-1.5 text-xs font-medium text-rose-300 hover:bg-rose-950/40 rounded-lg"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="md"
                  className="w-full justify-center text-cyan-300 border-cyan-800 hover:bg-cyan-950/60"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In or Register
                </Button>
              )}

              <Button
                asLink
                href="/cyber-safety"
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
