'use client';

import React, { useState, useMemo } from 'react';
import { Search, X, Filter, AlertTriangle, Layers, RotateCcw } from 'lucide-react';
import { SCAM_CATEGORIES_DATA } from '@/data/scamAwarenessData';
import { ScamCategoryCard } from './ScamCategoryCard';

type CategoryFilter =
  | 'All'
  | 'Impersonation'
  | 'Financial & Crypto'
  | 'Communication & Social'
  | 'Shopping & Delivery'
  | 'Work & Services';

const CATEGORY_GROUPS: CategoryFilter[] = [
  'All',
  'Impersonation',
  'Financial & Crypto',
  'Communication & Social',
  'Shopping & Delivery',
  'Work & Services',
];

export const ScamCategoryExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<CategoryFilter>('All');

  // Client-side filtering logic
  const filteredCategories = useMemo(() => {
    return SCAM_CATEGORIES_DATA.filter((item) => {
      // Group match
      if (selectedGroup !== 'All' && item.categoryGroup !== selectedGroup) {
        return false;
      }

      // Search query match
      if (!searchQuery.trim()) {
        return true;
      }

      const q = searchQuery.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchOneLiner = item.oneLiner.toLowerCase().includes(q);
      const matchTarget = item.commonTarget.toLowerCase().includes(q);
      const matchWarning = item.mainWarning.toLowerCase().includes(q);
      const matchTactics = item.attackerTactics.some((t) => t.toLowerCase().includes(q));
      const matchRedFlags = item.redFlags.some((rf) => rf.toLowerCase().includes(q));

      return matchName || matchOneLiner || matchTarget || matchWarning || matchTactics || matchRedFlags;
    });
  }, [searchQuery, selectedGroup]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedGroup('All');
  };

  const isFiltered = searchQuery.trim() !== '' || selectedGroup !== 'All';

  return (
    <section id="scam-categories" className="py-16 sm:py-20 relative bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-xs font-mono text-cyan-400 font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Category Explorer</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Common Online Scams & Deception Tactics
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Search or filter 16 major scam variants. Understand the targets, attacker vectors, warning signals, and independent verification procedures.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-4 sm:p-5 mb-8 backdrop-blur-md shadow-lg space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by scam name, keyword, or warning signal (e.g. parcel, crypto, zelle, IRS)..."
                className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                aria-label="Search scam categories"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-md transition-colors"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Results Count & Reset Filter Button */}
            <div className="flex items-center justify-between md:justify-end gap-3 text-xs shrink-0">
              <span className="text-slate-400 font-mono">
                Showing <strong className="text-white font-semibold">{filteredCategories.length}</strong> of{' '}
                {SCAM_CATEGORIES_DATA.length}
              </span>
              {isFiltered && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-colors font-medium text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Group Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5 text-slate-500" /> Filter:
            </span>
            {CATEGORY_GROUPS.map((group) => {
              const active = selectedGroup === group;
              return (
                <button
                  key={group}
                  type="button"
                  onClick={() => setSelectedGroup(group)}
                  className={`px-3 py-1.5 rounded-lg font-medium tracking-wide transition-all shrink-0 ${
                    active
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                      : 'bg-slate-950/60 text-slate-400 border border-slate-800/80 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {group}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white">No Scam Types Found</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              No scam categories match your current search query &quot;{searchQuery}&quot; in the &quot;{selectedGroup}&quot; filter.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Show All 16 Categories</span>
            </button>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <ScamCategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
