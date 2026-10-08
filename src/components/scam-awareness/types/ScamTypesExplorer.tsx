'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  X,
  ArrowRight,
  MailWarning,
  Landmark,
  TrendingUp,
  Briefcase,
  Package,
  Headphones,
  HeartHandshake,
  Users,
  Trophy,
  QrCode,
  KeyRound,
  PhoneCall,
  ShieldAlert,
  AlertTriangle,
} from 'lucide-react';
import {
  SCAM_EXPLORER_CATEGORIES,
  FILTER_CHIPS,
  ScamFilterCategory,
  RiskLevel,
  ScamCategoryDetail,
} from '@/data/scamTypesExplorerData';

const getCategoryIcon = (iconName: string) => {
  const iconProps = { className: 'w-7 h-7', 'aria-hidden': true };
  switch (iconName) {
    case 'MailWarning':
      return <MailWarning {...iconProps} />;
    case 'Landmark':
      return <Landmark {...iconProps} />;
    case 'TrendingUp':
      return <TrendingUp {...iconProps} />;
    case 'Briefcase':
      return <Briefcase {...iconProps} />;
    case 'Package':
      return <Package {...iconProps} />;
    case 'Headphones':
      return <Headphones {...iconProps} />;
    case 'HeartHandshake':
      return <HeartHandshake {...iconProps} />;
    case 'Users':
      return <Users {...iconProps} />;
    case 'Trophy':
      return <Trophy {...iconProps} />;
    case 'QrCode':
      return <QrCode {...iconProps} />;
    case 'KeyRound':
      return <KeyRound {...iconProps} />;
    case 'PhoneCall':
      return <PhoneCall {...iconProps} />;
    default:
      return <ShieldAlert {...iconProps} />;
  }
};

const getRiskBadge = (risk: RiskLevel) => {
  if (risk === 'CRITICAL') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border border-rose-800/80 bg-rose-950/70 text-rose-300">
        <ShieldAlert className="w-3 h-3 text-rose-400" aria-hidden={true} />
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" aria-hidden={true} />
        CRITICAL RISK
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border border-amber-800/80 bg-amber-950/70 text-amber-300">
      <AlertTriangle className="w-3 h-3 text-amber-400" aria-hidden={true} />
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden={true} />
      HIGH RISK
    </span>
  );
};

export const ScamTypesExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<ScamFilterCategory>('ALL');

  // Client-side filtering by title, description, and tags
  const filteredCategories = useMemo(() => {
    return SCAM_EXPLORER_CATEGORIES.filter((item: ScamCategoryDetail) => {
      // Filter Chip match
      const matchesFilter =
        selectedFilter === 'ALL' || item.categories.includes(selectedFilter);

      if (!matchesFilter) return false;

      // Search match
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const titleMatch = item.title.toLowerCase().includes(q);
      const descMatch = item.shortDescription.toLowerCase().includes(q);
      const tagMatch = item.tags.some((tag) => tag.toLowerCase().includes(q));

      return titleMatch || descMatch || tagMatch;
    });
  }, [searchQuery, selectedFilter]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <section className="py-12 sm:py-16 bg-[#07090e]" aria-label="Scam Types Explorer Catalog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. LARGE SEARCH PANEL */}
        <div className="rounded-2xl border border-slate-800/90 bg-slate-950/80 p-6 sm:p-8 backdrop-blur-md shadow-xl mb-10 sm:mb-14 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/80 pb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Explore Scam Categories
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Filter by vector, search by warning signals, or inspect individual attack patterns.
              </p>
            </div>
            {/* Dynamic Result Counter */}
            <div className="flex items-center gap-2 self-start md:self-auto px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" aria-hidden={true} />
              <span className="text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
                {`${filteredCategories.length} ${filteredCategories.length === 1 ? 'scam category' : 'scam categories'}`}
              </span>
            </div>
          </div>

          {/* Search Box Input */}
          <div className="relative w-full">
            <label htmlFor="scam-search" className="sr-only">
              Search by scam name, category, or warning sign
            </label>
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
                aria-hidden={true}
              />
              <input
                id="scam-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by scam name, category, or warning sign..."
                className="w-full pl-12 pr-11 py-3.5 rounded-xl border border-slate-800 bg-slate-900/90 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/80 transition-all shadow-inner cyber-focus-ring"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* 3. HORIZONTALLY SCROLLABLE FILTER CHIPS */}
          <div className="relative pt-1">
            <div
              className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs"
              role="tablist"
              aria-label="Filter scam categories by threat vector"
            >
              {FILTER_CHIPS.map((chip) => {
                const isSelected = selectedFilter === chip;
                return (
                  <button
                    key={chip}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedFilter(chip)}
                    className={`px-3.5 py-1.5 rounded-lg font-mono font-semibold text-xs tracking-wider uppercase whitespace-nowrap transition-all duration-200 cyber-focus-ring ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 shadow-sm shadow-cyan-950'
                        : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. VISUAL SCAM CATEGORY CARDS (3-column desktop grid) */}
        {filteredCategories.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-12 text-center space-y-4 max-w-xl mx-auto my-8">
            <ShieldAlert className="w-10 h-10 text-amber-400 mx-auto" aria-hidden={true} />
            <h3 className="text-lg font-bold text-white">No Matching Scam Types Found</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              No categories match &quot;{searchQuery}&quot; under the &quot;{selectedFilter}&quot; filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('ALL');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold uppercase tracking-wider pt-2"
            >
              Reset Filters & Search &rarr;
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredCategories.map((card) => (
              <Link
                key={card.slug}
                href={card.route}
                className={`group relative flex flex-col justify-between rounded-2xl border ${card.theme.border} bg-slate-950/85 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-[5px] hover:bg-slate-900/90 ${card.theme.hoverBorder} ${card.theme.glow} cyber-focus-ring`}
              >
                <div>
                  {/* TOP: Category Number (Top Left) & Risk Badge (Top Right) */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="text-xs font-mono font-bold text-slate-400 tracking-wider px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800">
                      {card.number}
                    </span>
                    <div>{getRiskBadge(card.risk)}</div>
                  </div>

                  {/* CENTER: Large Graphical Icon */}
                  <div className="flex justify-center my-4">
                    <div
                      className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${card.theme.iconBg} ${card.theme.iconColor}`}
                    >
                      {getCategoryIcon(card.iconName)}
                    </div>
                  </div>

                  {/* TITLE */}
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2 text-center group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </h3>

                  {/* Short Explanation */}
                  <p className="text-sm text-slate-300 leading-relaxed font-normal text-center mb-5">
                    {card.shortDescription}
                  </p>

                  {/* WARNING SIGNALS & 3 Small Tags */}
                  <div className="pt-4 border-t border-slate-800/80 mb-4">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                      WARNING SIGNALS
                    </p>
                    <div className="flex flex-wrap gap-1.5" aria-label="Warning signal tags">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wide uppercase border transition-colors ${card.theme.tagBg}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BOTTOM: "Learn More →" */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    LEARNING MODULE
                  </span>
                  <span className="text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1.5 transition-colors">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden={true} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
