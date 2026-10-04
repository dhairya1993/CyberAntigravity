'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { Clock, Calendar, ArrowRight, ShieldCheck, Tag, Lock, ShieldAlert, Key, Globe, Eye, Cpu } from 'lucide-react';

interface BlogCardProps {
  article: BlogPost;
}

const BlogCategoryIcon: React.FC<{ slug: string; className?: string }> = ({ slug, className }) => {
  if (slug.includes('phishing') || slug.includes('social-engineering')) return <ShieldAlert className={className} />;
  if (slug.includes('password')) return <Key className={className} />;
  if (slug.includes('multi-factor') || slug.includes('passkeys')) return <Lock className={className} />;
  if (slug.includes('privacy') || slug.includes('browser')) return <Eye className={className} />;
  if (slug.includes('deepfake') || slug.includes('zero-trust')) return <Cpu className={className} />;
  if (slug.includes('network') || slug.includes('wifi')) return <Globe className={className} />;
  return <ShieldCheck className={className} />;
};

export const BlogCard: React.FC<BlogCardProps> = ({ article }) => {
  const authorLabel = article.author?.attributionLabel || 'CyberAntigravity Guide';

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm p-6 sm:p-7 flex flex-col justify-between group shadow-sm hover:shadow-cyan-500/10 relative overflow-hidden">
      <div>
        {/* Visual Topic Card Banner */}
        <div className="w-full h-20 mb-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between px-4 relative overflow-hidden group-hover:border-cyan-500/40 transition-colors">
          <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="p-2.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
              <BlogCategoryIcon slug={article.slug} className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                {article.difficulty || 'Defensive Guide'}
              </span>
              <span className="text-xs font-mono text-slate-300">
                {article.category}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-800 hidden sm:inline">
            Interactive
          </span>
        </div>

        {/* Category & Metadata Header */}
        <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium uppercase bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
            {article.category}
          </span>

          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            {article.publishedAt && (
              <>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{article.publishedAt}</span>
                </span>
                <span>•</span>
              </>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{article.readingTime || article.readTime}</span>
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors mb-3 leading-snug">
          <Link href={`/blog/${article.slug}`} className="hover:underline focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded">
            {article.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400"
              >
                <Tag className="w-2.5 h-2.5 text-slate-500" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-slate-200 font-medium font-mono text-[11px] block">
              {authorLabel}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              Level: {article.difficulty}
            </span>
          </div>
        </div>

        <Link
          href={`/blog/${article.slug}`}
          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-mono font-semibold transition-colors group-hover:translate-x-0.5"
          aria-label={`Read guide: ${article.title}`}
        >
          <span>Read Guide</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
