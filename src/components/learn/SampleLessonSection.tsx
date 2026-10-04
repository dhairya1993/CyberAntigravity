'use client';

import React from 'react';
import { CIATriadVisual } from './CIATriadVisual';
import { MfaAuthDiagram, PasswordSecurityDiagram } from '@/components/visuals/SecurityDiagrams';
import {
  Shield,
  KeyRound,
  UserCheck,
  FileText,
  Flame,
  Bug,
  Globe,
  Users,
} from 'lucide-react';

export const SampleLessonSection: React.FC = () => {
  return (
    <article className="space-y-12">
      {/* 1. Definition & Introduction */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Shield className="w-3.5 h-3.5" />
          <span>LESSON 1: THE FOUNDATION</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          What Is Cybersecurity?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          <strong>Cybersecurity</strong> is the collective practice of protecting computers, servers,
          mobile devices, electronic systems, networks, and data from malicious attacks, unauthorized
          access, unintended damage, or unexpected disruption.
        </p>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-300 leading-relaxed space-y-2">
          <p>
            In the physical world, security involves deadbolts on doors, security guards at checkpoints,
            and fire suppression systems. In the digital domain, assets consist of software code,
            databases, network connections, and user identities.
          </p>
          <p className="text-slate-400 text-xs">
            Cybersecurity ensures that only trusted people can read your records, that no attacker can
            silently alter financial ledgers, and that critical systems remain online when emergencies occur.
          </p>
        </div>
      </section>

      {/* 2. Why Cybersecurity Matters */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-white tracking-tight">
          Why Cybersecurity Matters in the Modern Era
        </h3>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Society is deeply interconnected. From hospital intensive care units and power grids to online banking
          and communication networks, modern infrastructure relies completely on digital integrity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">
              01
            </div>
            <h4 className="text-base font-bold text-white">Protecting Privacy & Rights</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Preserving personal identity, health history, and private communications from surveillance, identity theft, and extortion.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
              02
            </div>
            <h4 className="text-base font-bold text-white">Economic & Business Stability</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Safeguarding intellectual property, commercial operations, and consumer transactions from ransomware interruptions and fraud.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-sm">
              03
            </div>
            <h4 className="text-base font-bold text-white">Critical Infrastructure Resilience</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Preventing disruptions to power grids, municipal water treatment, aviation navigation, and emergency response dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Visual CIA Triad Explanation */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-white tracking-tight">
          The Core Anchor: The CIA Triad
        </h3>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Every security policy, firewall rule, and cryptographic algorithm is measured against three fundamental
          pillars known as the <strong>CIA Triad</strong>.
        </p>

        {/* Embedded Interactive CIA Triad Visual */}
        <CIATriadVisual />
      </section>

      {/* 4. The AAA Framework: Authentication, Authorization & Accountability */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            The AAA Framework: Identity & Access Control
          </h3>
          <span className="text-xs font-mono text-cyan-400">AuthN • AuthZ • Accounting</span>
        </div>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          When a user or machine interacts with a secured system, security engineers rely on the{' '}
          <strong>AAA Model</strong> to determine who is acting, what they may do, and what records are kept.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Authentication */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="p-2.5 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400 w-fit">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                Step 1: Verification
              </span>
              <h4 className="text-lg font-bold text-white">Authentication (AuthN)</h4>
              <p className="text-xs font-mono text-slate-400 mb-2">
                &ldquo;Who are you?&rdquo;
              </p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Verifies that an entity is who they claim to be. Done using credentials, security keys, or biometrics.
            </p>
            <div className="p-2.5 rounded bg-slate-950 text-[11px] text-slate-400 border border-slate-800/80">
              <strong className="text-slate-300">Analogy:</strong> Showing a government passport at an airport terminal checkpoint.
            </div>
          </div>

          {/* Authorization */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="p-2.5 rounded-lg bg-purple-950 border border-purple-500/30 text-purple-400 w-fit">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider">
                Step 2: Permissions
              </span>
              <h4 className="text-lg font-bold text-white">Authorization (AuthZ)</h4>
              <p className="text-xs font-mono text-slate-400 mb-2">
                &ldquo;What are you permitted to do?&rdquo;
              </p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Decides what resources an authenticated identity can view, create, edit, or delete based on roles and policies.
            </p>
            <div className="p-2.5 rounded bg-slate-950 text-[11px] text-slate-400 border border-slate-800/80">
              <strong className="text-slate-300">Analogy:</strong> Your boarding pass granting access to Flight 412, Seat 14B, but not the cockpit.
            </div>
          </div>

          {/* Accountability */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="p-2.5 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400 w-fit">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                Step 3: Audit Trail
              </span>
              <h4 className="text-lg font-bold text-white">Accountability (Accounting)</h4>
              <p className="text-xs font-mono text-slate-400 mb-2">
                &ldquo;What actions did you take?&rdquo;
              </p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Maintains an immutable record of system events, logins, and file access so actions can be audited and traced during investigations.
            </p>
            <div className="p-2.5 rounded bg-slate-950 text-[11px] text-slate-400 border border-slate-800/80">
              <strong className="text-slate-300">Analogy:</strong> The aircraft black box recording flight telemetry and cockpit communications.
            </div>
          </div>
        </div>

        {/* Section 4.5: Visual Authentication Model */}
        <div className="pt-4">
          <MfaAuthDiagram />
        </div>
      </section>

      {/* 5. Common Threat Categories */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-white tracking-tight">
          Common Threat Categories Every Defender Must Know
        </h3>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Cyber threats come from diverse motivations—financial theft, industrial espionage, state conflict, or opportunism.
          Defenders categorize these threats into distinct operational types:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-red-950/70 border border-red-500/30 text-red-400 shrink-0">
              <Bug className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">Malware (Malicious Software)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Viruses, worms, spyware, trojans, and ransomware designed to damage, hijack, or steal data from endpoints.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-amber-950/70 border border-amber-500/30 text-amber-400 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">Social Engineering & Phishing</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Manipulating human psychology through urgency, fear, or impersonation to induce users into revealing credentials or sending wire transfers.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-purple-950/70 border border-purple-500/30 text-purple-400 shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">Denial of Service (DoS / DDoS)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Overwhelming servers, routers, or applications with floods of junk traffic to render legitimate services unavailable to authorized users.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">Security Misconfigurations</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Default passwords, exposed public storage buckets, unpatched software vulnerabilities, and overly broad administrative access grants.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5.5: Visual Credential Defense */}
        <div className="pt-6">
          <PasswordSecurityDiagram />
        </div>
      </section>
    </article>
  );
};
