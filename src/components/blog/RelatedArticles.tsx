'use client';

import React from 'react';
import Link from 'next/link';
import { BLOG_ARTICLES } from '@/data/blogArticles';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';

interface RelatedArticlesProps {
  relatedSlugs?: string[];
  currentSlug: string;
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ relatedSlugs, currentSlug }) => {
  // Resolve related articles
  let articles = (relatedSlugs || [])
    .map((slug) => BLOG_ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => !!a && a.slug !== currentSlug && a.status === 'published');

  // Fallback: pick any other published articles if none specified
  if (articles.length === 0) {
    articles = BLOG_ARTICLES.filter((a) => a.slug !== currentSlug && a.status === 'published').slice(0, 3);
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm space-y-4">
      <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
        <BookOpen className="w-4 h-4 text-cyan-400" />
        <span>Related Guides</span>
      </div>

      <div className="space-y-3">
        {articles.slice(0, 3).map((article) => (
          <Link
            key={article.id}
            href={`/blog/${article.slug}`}
            className="block p-3 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:border-cyan-500/40 hover:bg-slate-950 transition-all space-y-1.5 group"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400">
              <span>{article.category}</span>
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>{article.readingTime}</span>
              </span>
            </div>
            <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h4>
          </Link>
        ))}
      </div>

      <div className="pt-1 border-t border-slate-800/80">
        <Link
          href="/blog"
          className="text-xs font-mono text-slate-400 hover:text-cyan-300 flex items-center justify-between"
        >
          <span>Browse All Articles</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
