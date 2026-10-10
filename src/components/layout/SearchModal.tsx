'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Search,
  X,
  Shield,
  AlertTriangle,
  BookOpen,
  Wrench,
  FileText,
  ArrowRight,
  BrainCircuit,
  Award,
} from 'lucide-react';
import { CYBER_SAFETY_TOPICS } from '@/data/cyberSafetyHubData';
import { SCAM_EXPLORER_CATEGORIES } from '@/data/scamTypesExplorerData';
import { LEARN_TRACKS } from '@/data/learnCourses';
import { ALL_TOOLS } from '@/data/toolsHubData';
import { BLOG_ARTICLES } from '@/data/blogArticles';
import { CYBER_IQ_CATEGORIES } from '@/data/cyberIqQuestions';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setQuery('');
    onClose();
  }, [onClose]);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const trimmedQuery = query.toLowerCase().trim();

  const filteredSafety = trimmedQuery
    ? CYBER_SAFETY_TOPICS.filter(
        (item) =>
          item.title.toLowerCase().includes(trimmedQuery) ||
          item.summary.toLowerCase().includes(trimmedQuery) ||
          item.category.toLowerCase().includes(trimmedQuery)
      )
    : [];

  const filteredScams = trimmedQuery
    ? SCAM_EXPLORER_CATEGORIES.filter(
        (item) =>
          item.title.toLowerCase().includes(trimmedQuery) ||
          item.shortDescription.toLowerCase().includes(trimmedQuery) ||
          item.tags.some((tag) => tag.toLowerCase().includes(trimmedQuery))
      )
    : [];

  const filteredArticles = trimmedQuery
    ? BLOG_ARTICLES.filter(
        (item) =>
          item.status === 'published' &&
          (item.title.toLowerCase().includes(trimmedQuery) ||
            item.excerpt.toLowerCase().includes(trimmedQuery) ||
            item.tags.some((tag) => tag.toLowerCase().includes(trimmedQuery)))
      )
    : [];

  const filteredTools = trimmedQuery
    ? ALL_TOOLS.filter(
        (item) =>
          item.name.toLowerCase().includes(trimmedQuery) ||
          item.shortDescription.toLowerCase().includes(trimmedQuery) ||
          item.category.toLowerCase().includes(trimmedQuery)
      )
    : [];

  const filteredLearn = trimmedQuery
    ? LEARN_TRACKS.filter(
        (item) =>
          item.title.toLowerCase().includes(trimmedQuery) ||
          item.description.toLowerCase().includes(trimmedQuery)
      )
    : [];

  const filteredCyberIq = trimmedQuery
    ? CYBER_IQ_CATEGORIES.filter(
        (item) =>
          item.title.toLowerCase().includes(trimmedQuery) ||
          item.shortDesc.toLowerCase().includes(trimmedQuery) ||
          trimmedQuery.includes('quiz') ||
          trimmedQuery.includes('arena') ||
          trimmedQuery.includes('cyber iq') ||
          trimmedQuery.includes('challenge')
      )
    : [];

  const isProgressMatch =
    trimmedQuery &&
    ['progress', 'xp', 'level', 'streak', 'badge', 'achievement', 'gamification', 'rank'].some(
      (term) => trimmedQuery.includes(term) || term.includes(trimmedQuery)
    );

  const hasResults =
    filteredSafety.length > 0 ||
    filteredScams.length > 0 ||
    filteredArticles.length > 0 ||
    filteredTools.length > 0 ||
    filteredLearn.length > 0 ||
    filteredCyberIq.length > 0 ||
    isProgressMatch;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search CyberAntigravity knowledge base"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md transition-all"
    >
      <div
        className="fixed inset-0"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-cyan-950/40 overflow-hidden z-10 flex flex-col max-h-[82vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/50">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search phishing, passkeys, scams, tools, or guides..."
            autoFocus
            className="w-full bg-transparent px-3 text-slate-100 placeholder-slate-500 focus:outline-none text-sm sm:text-base font-normal"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-200"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={handleClose}
            className="ml-2 px-2 py-1 text-xs font-mono text-slate-400 bg-slate-800 rounded border border-slate-700 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-950/30 border-b border-slate-800/60 overflow-x-auto text-xs text-slate-400">
          <span className="shrink-0">Quick:</span>
          {['Phishing', 'Passkeys', 'Fake Jobs', 'Entropy', 'MFA', 'Security Headers', 'Wi-Fi'].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setQuery(chip)}
              className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 border border-slate-700/60 transition-colors whitespace-nowrap cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-6">
          {/* Student Progress Match */}
          {isProgressMatch && (
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-500/30">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                <Award className="w-3.5 h-3.5" /> Student Progress &amp; Achievements
              </div>
              <Link
                href="/learn/progress"
                onClick={onClose}
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/60 text-slate-200 hover:text-white transition-colors group"
              >
                <div>
                  <p className="text-sm font-medium group-hover:text-cyan-300 transition-colors">
                    Student Progress Dashboard &amp; Streaks
                  </p>
                  <p className="text-xs text-slate-400">
                    Track your total XP, 9-level roadmap progress, 7-day activity streaks, and unlocked badges.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 ml-2" />
              </Link>
            </div>
          )}

          {!hasResults && query && (
            <div className="py-12 text-center text-slate-400">
              <AlertTriangle className="w-10 h-10 text-amber-400/60 mx-auto mb-3" />
              <p className="text-base font-medium text-slate-200">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for keywords like &ldquo;MFA&rdquo;, &ldquo;phishing&rdquo;, &ldquo;passwords&rdquo;, or &ldquo;headers&rdquo;.
              </p>
            </div>
          )}

          {!query && (
            <div className="py-8 text-center text-slate-400 space-y-2">
              <Search className="w-8 h-8 text-cyan-500/50 mx-auto" />
              <p className="text-sm font-medium text-slate-300">Search the CyberAntigravity Knowledge Ecosystem</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore guides on cyber safety, scam threat maps, interactive browser tools, and fundamentals.
              </p>
            </div>
          )}

          {/* Cyber IQ Arena Results */}
          {filteredCyberIq.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                <BrainCircuit className="w-3.5 h-3.5" /> Cyber IQ Quiz Arena ({filteredCyberIq.length})
              </div>
              <div className="space-y-1.5">
                {filteredCyberIq.map((item) => (
                  <Link
                    key={item.id}
                    href="/cyber-iq"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/60 text-slate-200 hover:text-white transition-colors group"
                  >
                    <div>
                      <p className="text-sm font-medium group-hover:text-cyan-300 transition-colors">
                        {item.title} (Quiz Arena)
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-1">{item.shortDesc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tools Results */}
          {filteredTools.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                <Wrench className="w-3.5 h-3.5" /> Interactive Tools ({filteredTools.length})
              </div>
              <div className="space-y-1.5">
                {filteredTools.map((item) => (
                  <Link
                    key={item.id}
                    href={item.status === 'AVAILABLE' ? `/tools/${item.slug}` : '/tools'}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/60 text-slate-200 hover:text-white transition-colors group"
                  >
                    <div>
                      <p className="text-sm font-medium group-hover:text-emerald-300 transition-colors">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-1">{item.shortDescription}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Scam Awareness Results */}
          {filteredScams.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                <AlertTriangle className="w-3.5 h-3.5" /> Scam Awareness Categories ({filteredScams.length})
              </div>
              <div className="space-y-1.5">
                {filteredScams.map((item) => (
                  <Link
                    key={item.slug}
                    href={item.slug === 'phishing' ? '/scam-awareness/types/phishing' : `/scam-awareness/types/${item.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/60 text-slate-200 hover:text-white transition-colors group"
                  >
                    <div>
                      <p className="text-sm font-medium group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-1">{item.shortDescription}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Blog & Guide Results */}
          {filteredArticles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                <FileText className="w-3.5 h-3.5" /> Research Guides & Articles ({filteredArticles.length})
              </div>
              <div className="space-y-1.5">
                {filteredArticles.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/60 text-slate-200 hover:text-white transition-colors group"
                  >
                    <div>
                      <p className="text-sm font-medium group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-1">{item.excerpt}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Cyber Safety Topic Results */}
          {filteredSafety.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400 mb-2">
                <Shield className="w-3.5 h-3.5" /> Cyber Safety Guide Topics ({filteredSafety.length})
              </div>
              <div className="space-y-1.5">
                {filteredSafety.map((item) => (
                  <Link
                    key={item.id}
                    href={`/cyber-safety#${item.id}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/60 text-slate-200 hover:text-white transition-colors group"
                  >
                    <div>
                      <p className="text-sm font-medium group-hover:text-teal-300 transition-colors">{item.title}</p>
                      <p className="text-xs text-slate-400 line-clamp-1">{item.summary}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition-colors shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Learning Tracks */}
          {filteredLearn.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
                <BookOpen className="w-3.5 h-3.5" /> Learning Curriculum ({filteredLearn.length})
              </div>
              <div className="space-y-1.5">
                {filteredLearn.map((item) => (
                  <Link
                    key={item.id}
                    href={item.id === 'fundamentals' ? '/learn/cybersecurity-fundamentals' : '/learn'}
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
        </div>
      </div>
    </div>
  );
};
