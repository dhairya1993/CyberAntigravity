'use client';

import React, { useState, useMemo } from 'react';
import { LEARNING_LEVELS } from '@/data/learningHubData';
import { LearningCategoryCard } from './LearningCategoryCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Search, Filter, X, BookOpen } from 'lucide-react';

export const LearningRoadmap: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Client-side filtering across Level Title, Description, and Topics
  const filteredLevels = useMemo(() => {
    return LEARNING_LEVELS.filter((level) => {
      const matchesDifficulty =
        selectedDifficulty === 'All' || level.difficulty === selectedDifficulty;

      if (!matchesDifficulty) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase().trim();
      const inTitle = level.title.toLowerCase().includes(query);
      const inDescription = level.shortDescription.toLowerCase().includes(query);
      const inTopics = level.topics.some((t) => t.toLowerCase().includes(query));

      return inTitle || inDescription || inTopics;
    });
  }, [searchQuery, selectedDifficulty]);

  return (
    <section id="roadmap" className="py-16 md:py-24 border-b border-slate-800/80 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Curriculum Architecture"
          badgeVariant="purple"
          title="The 9-Stage Cybersecurity Learning Roadmap"
          description="Explore the complete progression from foundational defensive theory to operating system hardening, web exploitation defense, security operations, and AI risk engineering."
        />

        {/* Search & Filter Controls */}
        <div className="mt-10 mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g., phishing, networking, linux, web security, ethical hacking, SOC, forensics, AI)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              aria-label="Search learning topics and categories"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Difficulty Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0" role="tablist" aria-label="Filter by difficulty">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs font-mono text-slate-400 mr-1 hidden sm:inline-flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Difficulty:
              </span>
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  type="button"
                  role="tab"
                  aria-selected={selectedDifficulty === diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    selectedDifficulty === diff
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                      : 'bg-slate-950/70 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter & Active Filter Indicators */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6 font-mono">
          <span>
            Showing <strong className="text-cyan-400">{filteredLevels.length}</strong> of{' '}
            {LEARNING_LEVELS.length} Learning Levels
          </span>
          {(searchQuery || selectedDifficulty !== 'All') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('All');
              }}
              className="text-cyan-400 hover:text-cyan-300 underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Level Cards Grid */}
        {filteredLevels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLevels.map((level) => (
              <LearningCategoryCard key={level.level} levelItem={level} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-4">
            <BookOpen className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Matching Learning Modules Found</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              We couldn&apos;t find any modules matching &quot;{searchQuery}&quot;. Try adjusting your search keywords or switching the difficulty filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('All');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-400"
            >
              Clear Search Query
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
