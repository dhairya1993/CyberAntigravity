import React from 'react';
import Link from 'next/link';
import { Clock, Calendar, ArrowRight, UserCheck } from 'lucide-react';
import { BLOG_ARTICLES } from '@/data/blogArticles';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';

export const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Cyber Knowledge & Research"
          badgeVariant="cyan"
          title="Latest Threat Research & Defense Guides"
          description="In-depth technical investigations, security advisories, and step-by-step guides crafted by cybersecurity practitioners to keep you informed of emerging threat vectors."
        />

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_ARTICLES.map((article) => (
            <Card
              key={article.id}
              variant="interactive"
              className="flex flex-col justify-between"
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="cyan" size="sm">
                    {article.category}
                  </Badge>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {article.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" /> {article.readTime}
                    </span>
                  </div>
                </div>

                <CardTitle className="text-xl sm:text-2xl text-white group-hover:text-cyan-300 transition-colors">
                  {article.title}
                </CardTitle>

                <CardDescription className="text-slate-300 line-clamp-3 text-sm">
                  {article.excerpt}
                </CardDescription>
              </CardHeader>

              <CardFooter className="pt-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-200 font-medium block">{article.author.name}</span>
                    <span className="text-slate-500 text-[11px]">{article.author.role}</span>
                  </div>
                </div>

                <Link
                  href={`/blog/${article.slug}`}
                  className="text-cyan-400 font-semibold flex items-center gap-1 hover:text-cyan-300 transition-colors"
                >
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
