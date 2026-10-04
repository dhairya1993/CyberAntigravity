import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArticleLayout } from '@/components/blog/ArticleLayout';
import { BLOG_ARTICLES } from '@/data/blogArticles';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_ARTICLES.filter((a) => a.status === 'published').map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: 'Article Not Found | CyberAntigravity',
      description: 'The requested cybersecurity guide could not be located in our research library.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const isPublished = article.status === 'published';

  return {
    title: `${article.title} | CyberAntigravity`,
    description: article.description || article.excerpt,
    alternates: {
      canonical: `https://cyberantigravity.com/blog/${article.slug}`,
    },
    robots: {
      index: isPublished,
      follow: isPublished,
    },
    openGraph: {
      title: article.title,
      description: article.description || article.excerpt,
      url: `https://cyberantigravity.com/blog/${article.slug}`,
      siteName: 'CyberAntigravity',
      locale: 'en_US',
      type: 'article',
      ...(article.publishedAt ? { publishedTime: article.publishedAt } : {}),
      ...(article.updatedAt ? { modifiedTime: article.updatedAt } : article.publishedAt ? { modifiedTime: article.publishedAt } : {}),
      authors: ['CyberAntigravity Guide'],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description || article.excerpt,
      creator: '@cyberantigravity',
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article || article.status !== 'published') {
    notFound();
  }

  // 1. Article / BlogPosting Schema
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description || article.excerpt,
    ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
    ...(article.updatedAt ? { dateModified: article.updatedAt } : article.publishedAt ? { dateModified: article.publishedAt } : {}),
    author: {
      '@type': 'Organization',
      name: 'CyberAntigravity Guide',
      url: 'https://cyberantigravity.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CyberAntigravity',
      url: 'https://cyberantigravity.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cyberantigravity.com/icon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://cyberantigravity.com/blog/${article.slug}`,
    },
  };

  // 2. Breadcrumbs Schema
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cyberantigravity.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog & Research',
        item: 'https://cyberantigravity.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://cyberantigravity.com/blog/${article.slug}`,
      },
    ],
  };

  // 3. Optional FAQPage Schema (only if visible FAQs exist)
  const hasFaqs = article.content.faqs && article.content.faqs.length > 0;
  const faqJsonLd = hasFaqs
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.content.faqs!.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Navbar />

      <main className="flex-1">
        <ArticleLayout article={article} />
      </main>

      <Footer />
    </div>
  );
}
