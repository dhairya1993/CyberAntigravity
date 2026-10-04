'use client';

import React from 'react';
import { LearningTopicItem } from '@/types';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SafePracticeNotice } from './SafePracticeNotice';
import { SampleLessonSection } from './SampleLessonSection';
import { KnowledgeCheckQuiz } from './KnowledgeCheckQuiz';
import {
  Clock,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

interface TopicPageLayoutProps {
  topic: LearningTopicItem;
}

export const TopicPageLayout: React.FC<TopicPageLayoutProps> = ({ topic }) => {
  return (
    <div className="relative pt-24 pb-20 md:pt-28 md:pb-28">
      {/* Background Gradient & Grid */}
      <div className="absolute inset-0 bg-[#07090e] -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[22rem] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Learn', href: '/learn' },
            { label: topic.levelTitle, href: '/learn#roadmap' },
            { label: topic.title },
          ]}
        />

        {/* 2. Header Area */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
              Level {topic.levelNumber}
            </span>
            <Badge variant="cyan" size="sm">
              {topic.difficulty}
            </Badge>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono ml-auto">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Est. {topic.estimatedMinutes}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {topic.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {topic.overview}
          </p>

          {/* Quick Jump Links */}
          <div className="flex flex-wrap gap-2 pt-2">
            <a
              href="#lesson-content"
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 font-mono transition-colors"
            >
              Lesson Content ↓
            </a>
            <a
              href="#key-concepts"
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 font-mono transition-colors"
            >
              Key Concepts ↓
            </a>
            <a
              href="#practical-examples"
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 font-mono transition-colors"
            >
              Real Scenarios ↓
            </a>
            <a
              href="#knowledge-check"
              className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 hover:bg-cyan-900/40 text-xs text-cyan-300 font-mono font-semibold transition-colors"
            >
              Knowledge Check (5 Qs) ↓
            </a>
          </div>
        </div>

        {/* 3. Learning Objectives Checklist */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 backdrop-blur-sm space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Learning Objectives</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            What You Will Master in This Topic
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {topic.learningObjectives.map((obj, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs sm:text-sm text-slate-300"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Lesson Navigation Table of Contents */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" /> Topic Curriculum & Lessons
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {topic.lessons.length} Modules
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topic.lessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                className={`p-4 rounded-xl border text-left transition-all ${
                  idx === 0
                    ? 'border-cyan-500/50 bg-slate-900 ring-1 ring-cyan-500/30'
                    : 'border-slate-800 bg-slate-950/50 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                  <span className={idx === 0 ? 'text-cyan-400 font-bold' : 'text-slate-400'}>
                    Lesson {idx + 1} {idx === 0 ? '• Active' : '• Coming Soon'}
                  </span>
                  <span className="text-slate-400">{lesson.duration}</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{lesson.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{lesson.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Main Sample Lesson Section */}
        <div id="lesson-content" className="pt-4 scroll-mt-20">
          <SampleLessonSection />
        </div>

        {/* 6. Key Concepts Reference Cards */}
        <section id="key-concepts" className="space-y-6 pt-4 scroll-mt-20">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
              Quick Reference
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
              Core Security Concepts & Principles
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Definitions and architectural principles you will encounter continuously in cybersecurity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topic.keyConcepts.map((concept, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-white">{concept.title}</h4>
                  {concept.tag && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-cyan-300 border border-slate-700">
                      {concept.tag}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {concept.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Practical Defensive Examples */}
        <section id="practical-examples" className="space-y-6 pt-4 scroll-mt-20">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
              Applied Security
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
              Real-World Defensive Scenarios
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              How theoretical principles translate into concrete technical decisions during operations.
            </p>
          </div>

          <div className="space-y-4">
            {topic.practicalExamples.map((example, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 space-y-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 text-xs font-bold flex items-center justify-center font-mono">
                    {i + 1}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    {example.title}
                  </h4>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs sm:text-sm text-slate-300">
                  <strong className="text-slate-200 block mb-1">Scenario Challenge:</strong>
                  {example.scenario}
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="text-slate-300 leading-relaxed">
                    <strong className="text-cyan-400 font-semibold block mb-1">
                      Defensive Strategy:
                    </strong>
                    {example.defensiveStrategy}
                  </div>

                  <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Key Principle:</strong> {example.keyTakeaway}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Safe Practice Notice Trust Component */}
        <SafePracticeNotice />

        {/* 9. Knowledge Check Quiz */}
        <KnowledgeCheckQuiz questions={topic.knowledgeCheck} topicTitle={topic.title} />

        {/* 10. Next Topic Navigation */}
        {topic.nextTopic && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Next in Roadmap
              </span>
              <h4 className="text-xl font-bold text-white tracking-tight">
                Level {topic.nextTopic.levelNumber}: {topic.nextTopic.title}
              </h4>
              <p className="text-xs text-slate-400">
                Continue building your defensive stack with password managers, MFA, and safe browsing.
              </p>
            </div>

            <Button
              asLink
              href="/learn#roadmap"
              variant="outline"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="shrink-0"
            >
              Explore Next Track in Roadmap
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
