import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BlogHero } from '@/components/blog/BlogHero';
import { FeaturedArticle } from '@/components/blog/FeaturedArticle';
import { BlogDirectory } from '@/components/blog/BlogDirectory';
import { BLOG_ARTICLES } from '@/data/blogArticles';

export const metadata: Metadata = {
  title: 'Cybersecurity Knowledge Hub & Practical Guides | CyberAntigravity',
  description:
    'Practical cybersecurity guides, scam awareness explainers, privacy tips, and defensive security knowledge for everyday digital life.',
  alternates: {
    canonical: 'https://cyberantigravity.com/blog',
  },
  openGraph: {
    title: 'Cybersecurity Knowledge Hub & Practical Guides | CyberAntigravity',
    description:
      'Practical cybersecurity guides, scam awareness explainers, privacy tips, and defensive security knowledge for everyday digital life.',
    url: 'https://cyberantigravity.com/blog',
    siteName: 'CyberAntigravity',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybersecurity Knowledge Hub & Practical Guides | CyberAntigravity',
    description:
      'Practical cybersecurity guides, scam awareness explainers, privacy tips, and defensive security knowledge for everyday digital life.',
    creator: '@cyberantigravity',
  },
};

export default function BlogHubPage() {
  const publishedArticles = BLOG_ARTICLES.filter((a) => a.status === 'published');
  const featuredArticle = publishedArticles.find((a) => a.featured) || publishedArticles[0];

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
        name: 'Blog & Research Hub',
        item: 'https://cyberantigravity.com/blog',
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      {/* Structured Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <BlogHero />

        {/* 2. Featured Guide Section */}
        {featuredArticle && <FeaturedArticle article={featuredArticle} />}

        {/* 3. Search & Directory Grid */}
        <BlogDirectory articles={publishedArticles} />
      </main>

      <Footer />
    </div>
  );
}
