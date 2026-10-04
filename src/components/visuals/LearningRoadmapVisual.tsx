'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  Network,
  Globe,
  Lock,
  Database,
  Radio,
  Terminal,
  Cpu,
  Sparkles,
  ArrowRight,
  Clock,
  HelpCircle,
  Play
} from 'lucide-react';

interface LearningLevel {
  level: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  estimatedTime: string;
  progressPercent: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  topicsCount: number;
  questionsCount: number;
  scenariosCount: number;
  description: string;
  keyConcepts: string[];
  route: string;
  status: 'available' | 'in-progress' | 'roadmap';
}

const LEARNING_LEVELS: LearningLevel[] = [
  {
    level: 1,
    title: 'Cybersecurity Fundamentals',
    icon: Shield,
    estimatedTime: '25 min',
    progressPercent: 80,
    difficulty: 'Beginner',
    topicsCount: 6,
    questionsCount: 5,
    scenariosCount: 3,
    description: 'Foundational defensive principles, the CIA Triad, threat actor types, and the human element in digital defense.',
    keyConcepts: ['CIA Triad', 'Threat Actor Typologies', 'Defense in Depth', 'Attack Surface Analysis'],
    route: '/learn/cybersecurity-fundamentals',
    status: 'available',
  },
  {
    level: 2,
    title: 'Networking Basics for Defense',
    icon: Network,
    estimatedTime: '30 min',
    progressPercent: 40,
    difficulty: 'Beginner',
    topicsCount: 5,
    questionsCount: 6,
    scenariosCount: 3,
    description: 'IP addresses, ports, protocols, DNS fundamentals, firewalls, and how network packets travel securely.',
    keyConcepts: ['TCP/IP & OSI Layers', 'DNS & DNSSEC', 'NAT & Subnets', 'Firewall Rulesets'],
    route: '/blog/home-network-security',
    status: 'available',
  },
  {
    level: 3,
    title: 'Web & Browser Security',
    icon: Globe,
    estimatedTime: '35 min',
    progressPercent: 0,
    difficulty: 'Beginner',
    topicsCount: 7,
    questionsCount: 6,
    scenariosCount: 4,
    description: 'How the web works, HTTPS encryption, TLS certificates, cookie security, and cross-site scripting (XSS) awareness.',
    keyConcepts: ['HTTPS & TLS Handshakes', 'Security Headers (CSP, HSTS)', 'Cookie Flags (Secure, HttpOnly)', 'Same-Origin Policy'],
    route: '/tools/security-headers',
    status: 'available',
  },
  {
    level: 4,
    title: 'Authentication & Access Controls',
    icon: Lock,
    estimatedTime: '30 min',
    progressPercent: 0,
    difficulty: 'Intermediate',
    topicsCount: 6,
    questionsCount: 5,
    scenariosCount: 3,
    description: 'Cryptographic hashing, multi-factor authentication methods, passkeys (FIDO2/WebAuthn), and zero-knowledge storage.',
    keyConcepts: ['Password Hashing & Salting', 'Time-Based OTP (TOTP)', 'FIDO2 / WebAuthn Passkeys', 'Brute-Force Protection'],
    route: '/blog/multi-factor-authentication',
    status: 'available',
  },
  {
    level: 5,
    title: 'Privacy & Data Protection',
    icon: Database,
    estimatedTime: '25 min',
    progressPercent: 0,
    difficulty: 'Intermediate',
    topicsCount: 5,
    questionsCount: 5,
    scenariosCount: 2,
    description: 'Telemetry reduction, metadata awareness, digital footprint management, and regulatory compliance concepts (GDPR/CCPA).',
    keyConcepts: ['Data Minimization', 'Zero-Knowledge Encryption', 'Metadata Trails', 'Audited Privacy Controls'],
    route: '/blog/browser-privacy-settings',
    status: 'available',
  },
  {
    level: 6,
    title: 'Threat Awareness & Phishing Defense',
    icon: Radio,
    estimatedTime: '35 min',
    progressPercent: 0,
    difficulty: 'Intermediate',
    topicsCount: 8,
    questionsCount: 8,
    scenariosCount: 5,
    description: 'Spear phishing, voice clones (vishing), deceptive lookalike domains, and social engineering manipulation psychology.',
    keyConcepts: ['Header Analysis', 'Psychological Pretexts', 'Lookalike Typosquatting', 'Incident Reporting Protocols'],
    route: '/scam-awareness',
    status: 'available',
  },
  {
    level: 7,
    title: 'Security Operations & Incident Response',
    icon: Terminal,
    estimatedTime: '45 min',
    progressPercent: 0,
    difficulty: 'Advanced',
    topicsCount: 7,
    questionsCount: 6,
    scenariosCount: 4,
    description: 'Detecting anomalies, analyzing event logs, triage procedures, containment strategies, and recovery plans.',
    keyConcepts: ['SIEM & Telemetry Logs', 'Containment Strategies', 'Forensic Preservation', 'Incident Playbooks'],
    route: '/blog/understanding-data-breaches',
    status: 'available',
  },
  {
    level: 8,
    title: 'Ethical Security Concepts',
    icon: Cpu,
    estimatedTime: '40 min',
    progressPercent: 0,
    difficulty: 'Advanced',
    topicsCount: 6,
    questionsCount: 6,
    scenariosCount: 3,
    description: 'Vulnerability disclosure, responsible bug bounties, authorization boundaries, and ethical defensive assessments.',
    keyConcepts: ['Rules of Engagement', 'Coordinated Disclosure', 'CVSS Scoring', 'Defensive Hardening'],
    route: '/learn',
    status: 'available',
  },
  {
    level: 9,
    title: 'Advanced Defensive & AI Security',
    icon: Sparkles,
    estimatedTime: '50 min',
    progressPercent: 0,
    difficulty: 'Advanced',
    topicsCount: 8,
    questionsCount: 6,
    scenariosCount: 4,
    description: 'Zero Trust architecture, machine learning in threat detection, prompt injection risks, and synthetic identity defense.',
    keyConcepts: ['Zero Trust Verification', 'Model Inversion & Poisoning', 'Synthetic Media Analysis', 'Autonomous Defense'],
    route: '/blog/zero-trust-for-beginners',
    status: 'available',
  },
];

export const LearningRoadmapVisual: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<LearningLevel>(LEARNING_LEVELS[0]);

  return (
    <div className="space-y-8">
      {/* Roadmap Overview Bar */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-7 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
              9-Stage Curriculum
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Cybersecurity Educational Roadmap
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Structured progressive path from everyday defensive fundamentals to advanced security operations and ethical concepts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 font-mono text-xs font-bold">
              9 Structured Levels
            </span>
            <span className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 font-mono text-xs font-bold">
              100% Free
            </span>
          </div>
        </div>

        {/* Visual Level Nodes Horizontal/Vertical Track */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 my-6">
          {LEARNING_LEVELS.map((lvl) => {
            const Icon = lvl.icon;
            const isSelected = selectedLevel.level === lvl.level;
            return (
              <button
                key={lvl.level}
                type="button"
                onClick={() => setSelectedLevel(lvl)}
                className={`p-3 rounded-xl border flex flex-col items-center text-center transition-all duration-200 cursor-pointer relative group ${
                  isSelected
                    ? 'bg-slate-800 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105 ring-1 ring-cyan-400/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div
                  className={`p-2 rounded-lg mb-1.5 transition-transform group-hover:scale-110 ${
                    isSelected ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/50' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">
                  Lvl {lvl.level}
                </span>
                <span className={`text-[11px] font-bold leading-tight line-clamp-1 mt-0.5 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {lvl.title.split(' ')[0]}
                </span>

                {/* Progress dot */}
                {lvl.progressPercent > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Level Interactive Spotlight Card */}
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-5 sm:p-6 text-left space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
                <selectedLevel.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                  LEVEL {selectedLevel.level} • {selectedLevel.difficulty}
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  {selectedLevel.title}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {selectedLevel.estimatedTime}
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                {selectedLevel.topicsCount} Topics
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {selectedLevel.description}
          </p>

          {/* Key Learning Concepts */}
          <div className="space-y-1.5">
            <span className="text-xs font-mono text-slate-400 font-semibold block">
              CORE CURRICULUM TOPICS:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedLevel.keyConcepts.map((concept, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-medium"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics & Action Bar */}
          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                {selectedLevel.questionsCount} Knowledge Checks
              </span>
              <span className="flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                {selectedLevel.scenariosCount} Scenarios
              </span>
            </div>

            <Link
              href={selectedLevel.route}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-950"
            >
              <span>{selectedLevel.level === 1 ? 'Start Fundamentals' : 'Explore Learning Guide'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
