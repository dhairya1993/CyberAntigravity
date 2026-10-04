import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { CyberSafetySection } from '@/components/sections/CyberSafetySection';
import { ScamAwarenessSection } from '@/components/sections/ScamAwarenessSection';
import { LearnSection } from '@/components/sections/LearnSection';
import { ToolsSection } from '@/components/sections/ToolsSection';
import { BlogSection } from '@/components/sections/BlogSection';
import { MissionSection } from '@/components/sections/MissionSection';
import { CyberScoreCard } from '@/components/visuals/CyberScoreCard';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      {/* Global Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Cyber Safety Section */}
        <CyberSafetySection />

        {/* 3. Scam Awareness Section */}
        <ScamAwarenessSection />

        {/* 4. Learn Section */}
        <LearnSection />

        {/* 4.5. Practice Your Cyber IQ - Visual Score Card */}
        <section className="py-16 md:py-24 border-y border-slate-800/80 bg-slate-950/60 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                Interactive Skill Verification
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Practice Your Cyber IQ
              </h2>
              <p className="text-sm text-slate-300">
                Measure your defensive judgment across simulated phishing, credential hygiene, and fraud detection scenarios.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <CyberScoreCard />
            </div>
          </div>
        </section>

        {/* 5. Tools Section */}
        <ToolsSection />

        {/* 6. Latest Cyber Knowledge / Blog Section */}
        <BlogSection />

        {/* 7. Trust / Mission Section */}
        <MissionSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
