'use client';

import React from 'react';
import { BlogPost } from '@/types';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Calendar, Clock, ShieldCheck, Tag } from 'lucide-react';

interface ArticleHeaderProps {
  article: BlogPost;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article }) => {
  const authorLabel = article.author?.attributionLabel || 'CyberAntigravity Guide';

  return (
    <header className="space-y-6 pb-8 border-b border-slate-800">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Blog & Research', href: '/blog' },
          { label: article.category, href: `/blog#blog-directory` },
          { label: article.title },
        ]}
      />

      {/* Category & Metadata Top Strip */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="px-3 py-1 rounded-full text-xs font-mono font-medium uppercase bg-cyan-950/70 border border-cyan-500/40 text-cyan-300">
          {article.category}
        </span>
        <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
          Difficulty: {article.difficulty}
        </span>
      </div>

      {/* Main H1 Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18]">
        {article.title}
      </h1>

      {/* Lead Paragraph / Description */}
      <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
        {article.description || article.excerpt}
      </p>

      {/* Author, Publishing & Reading Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/60 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-slate-200 font-semibold block">{authorLabel}</span>
            <span className="text-[11px] text-slate-500">Defensive Education</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {article.publishedAt && (
            <>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Published: {article.publishedAt}</span>
              </span>
              {article.updatedAt && (
                <span className="text-slate-500 hidden sm:inline">
                  (Updated: {article.updatedAt})
                </span>
              )}
              <span>•</span>
            </>
          )}
          {article.reviewedAt && (
            <>
              <span className="text-slate-400 hidden sm:inline">
                Last reviewed: {article.reviewedAt}
              </span>
              <span>•</span>
            </>
          )}
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{article.readingTime || article.readTime}</span>
          </span>
        </div>
      </div>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-xs font-mono text-slate-500">Tags:</span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
            >
              <Tag className="w-2.5 h-2.5 text-cyan-400" />
              <span>{tag}</span>
            </span>
          ))}
        </div>
      )}
    </header>
  );
};
