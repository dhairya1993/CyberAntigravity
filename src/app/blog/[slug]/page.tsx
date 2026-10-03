import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, UserCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BLOG_ARTICLES } from '@/data/blogArticles';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <Breadcrumbs
          items={[
            { label: 'Blog & Research', href: '/#blog' },
            { label: article.title },
          ]}
          className="mb-8"
        />

        <article className="space-y-8">
          {/* Header */}
          <div className="space-y-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <Badge variant="cyan" size="sm">
                {article.category}
              </Badge>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" /> {article.readTime}
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {article.publishedAt}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">{article.author.name}</span>
                <span className="text-xs text-slate-400">{article.author.role}</span>
              </div>
            </div>
          </div>

          {/* Excerpt Lead */}
          <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed border-l-2 border-cyan-500 pl-4 py-1">
            {article.excerpt}
          </p>

          {/* Article Body Content */}
          <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed pt-4">
            <h2 className="text-2xl font-bold text-white">Understanding the Core Threat Vector</h2>
            <p>
              In modern cybersecurity, attackers consistently prioritize the path of least resistance. Rather than attempting to break complex encryption ciphers like AES-256 or RSA, threat actors target authentication handshakes, human psychology, and unverified trust assumptions.
            </p>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> Key Defensive Takeaways:
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Never rely on a single channel to authorize sensitive or financial transactions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Migrate from shared secrets (passwords) to asymmetric cryptography (passkeys/FIDO2).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Verify urgent communications through independently verified, out-of-band contact points.</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-white pt-6">Defensive Strategy & Long-Term Habits</h2>
            <p>
              Cyber resilience is built through consistent daily habits rather than complex tools. By adopting password managers, enforcing multi-factor authentication with authenticator apps or security keys, and maintaining a healthy skepticism towards unsolicited urgent messages, you reduce your exposure to over 90% of automated credential and phishing attacks.
            </p>
          </div>

          {/* Footer Back Link */}
          <div className="pt-8 border-t border-slate-800 flex items-center justify-between">
            <Link
              href="/#blog"
              className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Knowledge Base
            </Link>

            <span className="text-xs text-slate-500 font-mono">
              CyberAntigravity Educational Series
            </span>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
