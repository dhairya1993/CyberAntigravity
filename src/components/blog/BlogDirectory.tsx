'use client';

import React, { useState, useMemo } from 'react';
import { BlogPost, BlogCategory } from '@/types';
import { BlogCard } from './BlogCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Search, X, BookOpen, Filter } from 'lucide-react';

interface FilterCategoryOption {
  id: string;
  label: string;
  categoryMatch: BlogCategory | 'All';
}

const CATEGORY_FILTERS: FilterCategoryOption[] = [
  { id: 'all', label: 'All', categoryMatch: 'All' },
  { id: 'cyber-safety', label: 'Cyber Safety', categoryMatch: 'Cyber Safety' },
  { id: 'scam-awareness', label: 'Scam Awareness', categoryMatch: 'Scam Awareness' },
  { id: 'privacy', label: 'Privacy', categoryMatch: 'Privacy' },
  { id: 'passwords', label: 'Passwords', categoryMatch: 'Passwords & Accounts' },
  { id: 'phishing', label: 'Phishing', categoryMatch: 'Phishing' },
  { id: 'web-security', label: 'Web Security', categoryMatch: 'Web Security' },
  { id: 'networking', label: 'Networking', categoryMatch: 'Networking' },
  { id: 'ethical-hacking', label: 'Ethical Hacking', categoryMatch: 'Ethical Hacking' },
  { id: 'soc', label: 'SOC', categoryMatch: 'SOC & Security Operations' },
  { id: 'forensics', label: 'Forensics', categoryMatch: 'Digital Forensics' },
  { id: 'ai-security', label: 'AI Security', categoryMatch: 'AI Security' },
  { id: 'basics', label: 'Basics', categoryMatch: 'Cybersecurity Basics' },
];

interface BlogDirectoryProps {
  articles: BlogPost[];
}

export const BlogDirectory: React.FC<BlogDirectoryProps> = ({ articles }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterId, setSelectedFilterId] = useState('all');

  const selectedFilter = CATEGORY_FILTERS.find((c) => c.id === selectedFilterId) || CATEGORY_FILTERS[0];

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Must be published
      if (article.status !== 'published') return false;

      // Filter by category
      if (selectedFilter.categoryMatch !== 'All') {
        if (article.category !== selectedFilter.categoryMatch) {
          return false;
        }
      }

      // Filter by search query
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inTitle = article.title.toLowerCase().includes(q);
      const inDesc = article.description.toLowerCase().includes(q);
      const inExcerpt = article.excerpt.toLowerCase().includes(q);
      const inCat = article.category.toLowerCase().includes(q);
      const inTags = (article.tags || []).some((t) => t.toLowerCase().includes(q));
      const inContent =
        article.content.introduction.toLowerCase().includes(q) ||
        article.content.sections.some(
          (s) => s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q)
        );

      return inTitle || inDesc || inExcerpt || inCat || inTags || inContent;
    });
  }, [articles, selectedFilter, searchQuery]);

  return (
    <section id="blog-directory" className="py-16 md:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Defensive Knowledge Directory"
          badgeVariant="cyan"
          title="Explore All Cybersecurity Guides"
          description="Browse practical, educational articles across phishing, password hygiene, web security, and emerging digital threat vectors."
        />

        {/* Search Bar & Category Controls */}
        <div className="my-10 space-y-5">
          {/* Search Input */}
          <div className="relative max-w-2xl mx-auto">
            <label htmlFor="blog-search" className="sr-only">
              Search cybersecurity articles
            </label>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              id="blog-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides by keyword, topic, or tag (e.g. phishing, MFA, passkeys, CIA triad)..."
              className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Horizontal Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1 shrink-0 pl-1">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <span>Category:</span>
            </span>

            {CATEGORY_FILTERS.map((cat) => {
              const isSelected = cat.id === selectedFilterId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedFilterId(cat.id)}
                  aria-pressed={isSelected}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Counter and Active Filter Feedback */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 mb-8 font-mono">
          <div>
            Showing <strong className="text-cyan-400">{filteredArticles.length}</strong>{' '}
            {filteredArticles.length === 1 ? 'Article' : 'Articles'}
            {selectedFilter.label !== 'All' && (
              <span>
                {' '}
                in <strong className="text-slate-200">{selectedFilter.label}</strong>
              </span>
            )}
          </div>

          {(searchQuery || selectedFilterId !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedFilterId('all');
              }}
              className="text-cyan-400 hover:text-cyan-300 underline"
            >
              Reset search & filters
            </button>
          )}
        </div>

        {/* Article Cards Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-4">
            <BookOpen className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No guides found for this search.</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              We couldn&apos;t find any guides matching &quot;{searchQuery}&quot;. Try adjusting your keywords or selecting &quot;All&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedFilterId('all');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-400 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
