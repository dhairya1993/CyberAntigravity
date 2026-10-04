'use client';

import React from 'react';
import Link from 'next/link';
import { BLOG_ARTICLES } from '@/data/blogArticles';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ArticleNavigationProps {
  currentSlug: string;
}

export const ArticleNavigation: React.FC<ArticleNavigationProps> = ({ currentSlug }) => {
  const publishedArticles = BLOG_ARTICLES.filter((a) => a.status === 'published');
  const currentIndex = publishedArticles.findIndex((a) => a.slug === currentSlug);

  if (currentIndex === -1) return null;

  const prevArticle = currentIndex > 0 ? publishedArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < publishedArticles.length - 1 ? publishedArticles[currentIndex + 1] : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-10 border-t border-slate-800">
      {prevArticle ? (
        <Link
          href={`/blog/${prevArticle.slug}`}
          className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-cyan-500/40 transition-all space-y-1 group"
        >
          <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1 group-hover:text-cyan-400">
            <ArrowLeft className="w-3.5 h-3.5" /> Previous Guide
          </span>
          <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 line-clamp-1 transition-colors">
            {prevArticle.title}
          </h4>
        </Link>
      ) : (
        <div />
      )}

      {nextArticle && (
        <Link
          href={`/blog/${nextArticle.slug}`}
          className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-cyan-500/40 transition-all space-y-1 text-right sm:text-right group"
        >
          <span className="text-[11px] font-mono text-slate-500 flex items-center justify-end gap-1 group-hover:text-cyan-400">
            Next Guide <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 line-clamp-1 transition-colors">
            {nextArticle.title}
          </h4>
        </Link>
      )}
    </div>
  );
};
