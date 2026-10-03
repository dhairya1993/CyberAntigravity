import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { CyberSafetySection } from '@/components/sections/CyberSafetySection';
import { ScamAwarenessSection } from '@/components/sections/ScamAwarenessSection';
import { LearnSection } from '@/components/sections/LearnSection';
import { ToolsSection } from '@/components/sections/ToolsSection';
import { BlogSection } from '@/components/sections/BlogSection';
import { MissionSection } from '@/components/sections/MissionSection';
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
