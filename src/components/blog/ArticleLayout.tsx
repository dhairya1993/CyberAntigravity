'use client';

import React from 'react';
import { BlogPost } from '@/types';
import { ArticleHeader } from './ArticleHeader';
import { ArticleHeroVisual } from '@/components/visuals/ArticleHeroVisual';
import { ArticleKeyTakeaways } from './ArticleKeyTakeaways';
import { ArticleContent } from './ArticleContent';
import { ArticleTableOfContents } from './ArticleTableOfContents';
import { RelatedTools } from './RelatedTools';
import { RelatedLearning } from './RelatedLearning';
import { RelatedArticles } from './RelatedArticles';
import { ArticleNavigation } from './ArticleNavigation';
import { ArticleDisclaimer } from './ArticleDisclaimer';

interface ArticleLayoutProps {
  article: BlogPost;
}

export const ArticleLayout: React.FC<ArticleLayoutProps> = ({ article }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Article Header */}
      <ArticleHeader article={article} />

      {/* Article Hero Visual */}
      <ArticleHeroVisual slug={article.slug} category={article.category} title={article.title} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mt-8 items-start">
        {/* Main Content Column */}
        <main className="lg:col-span-8 space-y-8 min-w-0">
          {/* Key Takeaways */}
          <ArticleKeyTakeaways takeaways={article.keyTakeaways} />

          {/* Core Article Body */}
          <ArticleContent article={article} />

          {/* Educational Disclaimer */}
          <ArticleDisclaimer />

          {/* Prev / Next Article Navigation */}
          <ArticleNavigation currentSlug={article.slug} />
        </main>

        {/* Sidebar Column */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          {/* Table of Contents */}
          <ArticleTableOfContents article={article} />

          {/* Related Tools */}
          <RelatedTools toolSlugs={article.relatedTools} />

          {/* Related Learning Paths */}
          <RelatedLearning relatedLearning={article.relatedLearning} />

          {/* Related Articles */}
          <RelatedArticles relatedSlugs={article.relatedArticles} currentSlug={article.slug} />
        </aside>
      </div>
    </div>
  );
};
