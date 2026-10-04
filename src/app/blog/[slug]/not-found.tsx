import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArticleNotFound } from '@/components/blog/ArticleNotFound';

export default function BlogNotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <ArticleNotFound />
      </main>
      <Footer />
    </div>
  );
}
