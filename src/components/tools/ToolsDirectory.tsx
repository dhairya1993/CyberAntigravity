'use client';

import React, { useState, useMemo } from 'react';
import { ALL_TOOLS, TOOL_CATEGORIES } from '@/data/toolsHubData';
import { ToolCategory } from '@/types';
import { ToolCard } from './ToolCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Search, X, Wrench } from 'lucide-react';

export const ToolsDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'All'>('All');

  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'All' || tool.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase().trim();
      const inName = tool.name.toLowerCase().includes(query);
      const inDescription = tool.shortDescription.toLowerCase().includes(query);
      const inCategory = tool.category.toLowerCase().includes(query);
      const inSlug = tool.slug.toLowerCase().includes(query);

      return inName || inDescription || inCategory || inSlug;
    });
  }, [searchQuery, selectedCategory]);

  const availableCount = filteredTools.filter((t) => t.status === 'AVAILABLE').length;
  const comingSoonCount = filteredTools.filter((t) => t.status === 'COMING SOON').length;

  return (
    <section id="tools-directory" className="py-16 md:py-24 border-b border-slate-800/80 relative scroll-mt-20">
      <div className="cyber-container">
        <SectionHeader
          badgeText="Utility Directory"
          badgeVariant="cyan"
          title="Cybersecurity Utility Catalog"
          description="Access browser-based security calculators, credential entropy estimators, URL structure parsers, and view roadmaps for future threat intelligence tools."
        />

        {/* Search & Category Filter Controls */}
        <div className="mt-10 mb-8 space-y-4">
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools by keyword (e.g. password, URL, privacy, headers, scam, network, security)..."
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors shadow-inner"
              aria-label="Search tools by keyword"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-md"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills (Scrollable on Mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Filter by category">
            {TOOL_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all shrink-0 ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Counter & Active Indicators */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 mb-8 font-mono">
          <div>
            Showing <strong className="text-cyan-400">{filteredTools.length}</strong> Tools:{' '}
            <span className="text-emerald-400 font-bold">{availableCount} Available</span> •{' '}
            <span className="text-slate-400">{comingSoonCount} Coming Soon</span>
          </div>

          {(searchQuery || selectedCategory !== 'All') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-cyan-400 hover:text-cyan-300 underline"
            >
              Reset search & filters
            </button>
          )}
        </div>

        {/* Tools Cards Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-4">
            <Wrench className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Matching Security Tools Found</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              We couldn&apos;t find any utilities matching &quot;{searchQuery}&quot;. Try adjusting your keywords or selecting &quot;All Tools&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-400"
            >
              View All Tools
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
