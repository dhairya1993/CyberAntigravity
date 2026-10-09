import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { ThreatLandscapeSection } from '@/components/sections/ThreatLandscapeSection';
import { VisualStorytellingTransitions } from '@/components/visuals/VisualStorytellingTransitions';
import { AttackPathSection } from '@/components/sections/AttackPathSection';
import { CyberIQPreviewSection } from '@/components/sections/CyberIQPreviewSection';
import { DigitalDefenseSection } from '@/components/sections/DigitalDefenseSection';
import { CyberLabPreviewSection } from '@/components/sections/CyberLabPreviewSection';
import { LearningRoadmapPreviewSection } from '@/components/sections/LearningRoadmapPreviewSection';
import { ScamSpotterPreviewSection } from '@/components/sections/ScamSpotterPreviewSection';
import { StudentExperienceSection } from '@/components/sections/StudentExperienceSection';
import { SecurityToolsPreviewSection } from '@/components/sections/SecurityToolsPreviewSection';
import { WhyCyberAntigravitySection } from '@/components/sections/WhyCyberAntigravitySection';
import { MissionSection } from '@/components/sections/MissionSection';
import { LatestGuidesSection } from '@/components/sections/LatestGuidesSection';
import { AiCyberFutureSection } from '@/components/sections/AiCyberFutureSection';
import { TrustNoticeSection } from '@/components/sections/TrustNoticeSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      {/* Global Navigation */}
      <Navbar />

      {/* Main Content Sections:
          SEE A THREAT → UNDERSTAND THE ATTACK → MAKE A DECISION → LEARN THE DEFENSE → BUILD SECURITY SKILLS
      */}
      <main className="flex-1">
        {/* 1. Hero Section & Cyber Defense Command Center */}
        <HeroSection />

        {/* 2. SEE A THREAT — Section 1: Cyber Threat Gallery (6 Custom Interactive Vector Cards) */}
        <ThreatLandscapeSection />

        {/* 3. VISUAL STORYTELLING — Section 8: Graphical Transitions (Threat -> Decision -> Defense) */}
        <VisualStorytellingTransitions />

        {/* 4. UNDERSTAND THE ATTACK — Section 2: Attack → Defense Simulator (Path A vs Path B) */}
        <AttackPathSection />

        {/* 5. MAKE A DECISION — Section 6: Cyber IQ Challenge & Section 7: Security Skill Meter */}
        <CyberIQPreviewSection />

        {/* 6. LEARN THE DEFENSE — Section 3: Cyber Defense Shield (Central Shield & 8 Layers) */}
        <DigitalDefenseSection />

        {/* 7. PRACTICE IN SANDBOX — Section 5: Cyber Lab Preview (Laptop + Terminal + Nodes) */}
        <CyberLabPreviewSection />

        {/* 8. BUILD SECURITY SKILLS — Section 4: Student Cybersecurity Roadmap (8 Progressive Stages) */}
        <LearningRoadmapPreviewSection />

        {/* 9. Scam Spotter Interactive Sandbox */}
        <ScamSpotterPreviewSection />

        {/* 10. Student Interactive Experience Pillars */}
        <StudentExperienceSection />

        {/* 11. Practical Security Tools Preview */}
        <SecurityToolsPreviewSection />

        {/* 12. Why Learn With CyberAntigravity */}
        <WhyCyberAntigravitySection />

        {/* 12.5. Mission & Trust Mandate (About Anchor) */}
        <MissionSection />

        {/* 13. Latest Cybersecurity Guides */}
        <LatestGuidesSection />

        {/* 14. Where Cybersecurity Is Going (AI + Defense Future) */}
        <AiCyberFutureSection />

        {/* 15. Trust & Educational Disclaimer Notice */}
        <TrustNoticeSection />

        {/* 16. Final Call to Action */}
        <FinalCtaSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
