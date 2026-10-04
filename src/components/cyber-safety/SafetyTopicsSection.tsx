'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Layers, BookOpen, ShieldAlert } from 'lucide-react';
import { CYBER_SAFETY_TOPICS } from '@/data/cyberSafetyHubData';
import { SafetyTopicCard } from './SafetyTopicCard';

const CATEGORY_FILTERS = [
  'All Topics',
  'Access & Authentication',
  'Deception & Social Engineering',
  'Account Defense',
  'Mobile Devices',
  'Endpoint Protection',
  'Online Communities',
  'E-Commerce Defense',
  'Financial Protection',
  'Privacy & Data Rights',
  'Network Security',
];

export const SafetyTopicsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Topics');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = useMemo(() => {
    return CYBER_SAFETY_TOPICS.filter((topic) => {
      const matchesCategory =
        selectedCategory === 'All Topics' || topic.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.coreConcepts.some(
          (c) =>
            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="safety-topics" className="py-16 md:py-24 relative scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Knowledge Base</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Cyber Safety Topics
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            10 foundational educational categories covering passwords, deception vectors, endpoint hardening, payment safety, and digital privacy.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl mb-8 space-y-4 shadow-lg">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (e.g., passkeys, smishing, QR codes, public Wi-Fi)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 cyber-focus-ring"
              />
            </div>

            {/* Results Counter */}
            <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0 font-mono px-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>
                Showing <strong className="text-white">{filteredTopics.length}</strong> of{' '}
                {CYBER_SAFETY_TOPICS.length} topics
              </span>
            </div>
          </div>

          {/* Category Chips Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
            <span className="text-slate-500 font-semibold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-cyan-400" /> Category:
            </span>
            {CATEGORY_FILTERS.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Topics List Grid */}
        {filteredTopics.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredTopics.map((topic, index) => (
              <SafetyTopicCard
                key={topic.id}
                topic={topic}
                initiallyExpanded={index === 0}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
            <ShieldAlert className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No matching topics found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or select &ldquo;All Topics&rdquo; to browse the full guide.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All Topics');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
