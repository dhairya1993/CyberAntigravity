'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, Shield, AlertTriangle, BookOpen, Wrench, ArrowRight } from 'lucide-react';
import { SAFETY_PILLARS } from '@/data/safetyTopics';
import { SCAM_CATEGORIES } from '@/data/scamCategories';
import { LEARN_TRACKS } from '@/data/learnCourses';
import { CYBER_TOOLS } from '@/data/toolsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmedQuery = query.toLowerCase().trim();

  const filteredSafety = SAFETY_PILLARS.filter(
    (item) =>
      item.title.toLowerCase().includes(trimmedQuery) ||
      item.shortDesc.toLowerCase().includes(trimmedQuery)
  );

  const filteredScams = SCAM_CATEGORIES.filter(
    (item) =>
      item.title.toLowerCase().includes(trimmedQuery) ||
      item.summary.toLowerCase().includes(trimmedQuery)
  );

  const filteredLearn = LEARN_TRACKS.filter(
    (item) =>
      item.title.toLowerCase().includes(trimmedQuery) ||
      item.description.toLowerCase().includes(trimmedQuery)
  );

  const filteredTools = CYBER_TOOLS.filter(
    (item) =>
      item.name.toLowerCase().includes(trimmedQuery) ||
      item.description.toLowerCase().includes(trimmedQuery)
  );

  const hasResults =
    filteredSafety.length > 0 ||
    filteredScams.length > 0 ||
    filteredLearn.length > 0 ||
    filteredTools.length > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search CyberAntigravity knowledge base"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md transition-all"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-cyan-950/40 overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/50">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search phishing, passkeys, scams, tools, or courses..."
            autoFocus
            className="w-full bg-transparent px-3 text-slate-100 placeholder-slate-500 focus:outline-none text-sm sm:text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-200"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 px-2 py-1 text-xs font-mono text-slate-400 bg-slate-800 rounded border border-slate-700 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-950/30 border-b border-slate-800/60 overflow-x-auto text-xs text-slate-400">
          <span>Quick:</span>
          {['Phishing', 'Passkeys', 'Fake Jobs', 'Password Entropy', 'OWASP'].map((chip) => (
            <button
              key={chip}
              onClick={() => setQuery(chip)}
              className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 border border-slate-700/60 transition-colors whitespace-nowrap"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-6">
          {!hasResults && query && (
            <div className="py-12 text-center text-slate-400">
              <AlertTriangle className="w-10 h-10 text-amber-400/60 mx-auto mb-3" />
              <p className="text-base font-medium text-slate-200">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for keywords like &ldquo;MFA&rdquo;, &ldquo;scams&rdquo;, &ldquo;passwords&rdquo;, or &ldquo;tools&rdquo;.</p>
            </div>
          )}

          {filteredSafety.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                <Shield className="w-3.5 h-3.5" /> Cyber Safety Guides
              </div>
              <div className="space-y-1.5">
                {filteredSafety.map((item) => (
                  <Link
                    key={item.id}
                    href="/cyber-safety"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/60 text-slate-200 hover:text-white transition-colors group"
                  >
                    <div>
                      <p className="text-sm font-medium group-hover:text-cyan-300 transition-colors">{item.title}</p>
                      <p className="text-xs text-slate-400 line-clamp-1">{item.shortDesc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {filteredScams.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                <AlertTriangle className="w-3.5 h-3.5" /> Scam Awareness
              </div>
              <div className="space-y-1.5">
                {filteredScams.map((item) => (
                  <Link
                    key={item.id}
                    href="/scam-awareness"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/60 text-slate-200 hover:text-white transition-colors group"
                  >
                    <div>
                      <p className="text-sm font-medium group-hover:text-amber-300 transition-colors">{item.title}</p>
                      <p className="text-xs text-slate-400 line-clamp-1">{item.summary}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {filteredLearn.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
                <BookOpen className="w-3.5 h-3.5" /> Learn Curriculum
              </div>
              <div className="space-y-1.5">
                {filteredLearn.map((item) => (
                  <Link
                    key={item.id}
                    href="/#learn"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/60 text-slate-200 hover:text-white transition-colors group"
                  >
                    <div>
                      <p className="text-sm font-medium group-hover:text-purple-300 transition-colors">{item.title}</p>
                      <p className="text-xs text-slate-400 line-clamp-1">{item.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {filteredTools.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                <Wrench className="w-3.5 h-3.5" /> Defensive Tools
              </div>
              <div className="space-y-1.5">
                {filteredTools.map((item) => (
                  <Link
                    key={item.id}
                    href="/#tools"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/60 text-slate-200 hover:text-white transition-colors group"
                  >
                    <div>
                      <p className="text-sm font-medium group-hover:text-emerald-300 transition-colors">{item.name}</p>
                      <p className="text-xs text-slate-400 line-clamp-1">{item.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
