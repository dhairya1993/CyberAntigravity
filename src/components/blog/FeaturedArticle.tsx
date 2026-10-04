'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { Star, Clock, Calendar, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FeaturedArticleProps {
  article: BlogPost;
}

export const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
  return (
    <section className="py-12 border-b border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/20 p-6 sm:p-10 lg:p-12 shadow-xl shadow-cyan-500/5 relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            <div className="lg:col-span-7 space-y-5">
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500 text-slate-950">
                  <Star className="w-3.5 h-3.5 fill-slate-950" />
                  <span>FEATURED GUIDE</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium uppercase bg-slate-800 text-cyan-300 border border-slate-700">
                  {article.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                <Link href={`/blog/${article.slug}`} className="hover:text-cyan-300 transition-colors">
                  {article.title}
                </Link>
              </h2>

              {/* Excerpt */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {article.excerpt}
              </p>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-xs text-slate-400 font-mono pt-1">
                {article.publishedAt && (
                  <>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{article.publishedAt}</span>
                    </span>
                    <span>•</span>
                  </>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{article.readingTime}</span>
                </span>
                <span>•</span>
                <span className="text-slate-300 font-medium">Level: {article.difficulty}</span>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Button
                  asLink
                  href={`/blog/${article.slug}`}
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Read Full Guide
                </Button>
              </div>
            </div>

            {/* Right: Key Takeaways Card */}
            <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-950/80 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  Key Defensive Takeaways
                </h4>
              </div>

              <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
                {article.keyTakeaways.slice(0, 3).map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Source: {article.author.attributionLabel}</span>
                <span className="text-cyan-400">Defensive Education</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
