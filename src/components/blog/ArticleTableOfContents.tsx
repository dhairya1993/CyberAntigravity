'use client';

import React from 'react';
import { BlogPost } from '@/types';
import { ListFilter } from 'lucide-react';

interface ArticleTableOfContentsProps {
  article: BlogPost;
}

export const ArticleTableOfContents: React.FC<ArticleTableOfContentsProps> = ({ article }) => {
  const sections = article.content.sections || [];
  const hasFaqs = article.content.faqs && article.content.faqs.length > 0;

  if (sections.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm space-y-3">
      <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
        <ListFilter className="w-4 h-4 text-cyan-400" />
        <span>Table of Contents</span>
      </div>

      <nav aria-label="Table of contents">
        <ul className="space-y-1.5 text-xs font-mono">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-slate-400 hover:text-cyan-400 transition-colors block py-1 hover:translate-x-0.5 transform"
              >
                {section.title}
              </a>
            </li>
          ))}

          {hasFaqs && (
            <li>
              <a
                href="#faqs"
                className="text-slate-400 hover:text-cyan-400 transition-colors block py-1 hover:translate-x-0.5 transform"
              >
                Frequently Asked Questions
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
