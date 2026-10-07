'use client';

import React from 'react';
import {
  GraduationCap,
  Users,
  Briefcase,
  HeartHandshake,
  Store,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface AudienceCardData {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  illustration: React.ReactNode;
  recommendations: {
    title: string;
    detail: string;
  }[];
}

const AUDIENCE_CARDS: AudienceCardData[] = [
  {
    id: 'students',
    title: 'Students',
    tagline: 'Campus & Career Safety',
    badge: 'Education',
    icon: GraduationCap,
    illustration: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <path d="M24 8L6 18L24 28L42 18L24 8Z" stroke="#00f0ff" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 21.5V32C12 37 17 40 24 40C31 40 36 37 36 32V21.5" stroke="#00f0ff" strokeWidth="2" />
        <path d="M42 18V30" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="24" r="3" fill="#00f0ff" />
      </svg>
    ),
    recommendations: [
      {
        title: 'Protect social accounts',
        detail: 'Lock down profile privacy settings and audit connected third-party campus apps.',
      },
      {
        title: 'Avoid fake job/internship scams',
        detail: 'Never pay upfront fees for work supplies or deposit checks with requests to wire money back.',
      },
      {
        title: 'Use MFA',
        detail: 'Turn on authenticator app verification across student portals and primary email.',
      },
    ],
  },
  {
    id: 'parents',
    title: 'Parents',
    tagline: 'Household & Family Protection',
    badge: 'Family',
    icon: Users,
    illustration: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <path d="M24 6L38 12V22C38 31 32 38 24 42C16 38 10 31 10 22V12L24 6Z" stroke="#00f0ff" strokeWidth="2" />
        <circle cx="20" cy="20" r="4" stroke="#10b981" strokeWidth="2" />
        <circle cx="28" cy="22" r="3" stroke="#10b981" strokeWidth="2" />
        <path d="M14 32C14 28 17 26 20 26C22 26 23.5 27 24.5 28.5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
        <path d="M25 32C25 29 27 28 28 28C30.5 28 33 29.5 33 32" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    recommendations: [
      {
        title: 'Verify financial requests',
        detail: 'Always call relatives directly if you receive urgent messages pleading for wire transfers.',
      },
      {
        title: 'Watch impersonation scams',
        detail: 'Beware of AI voice clones and fraudulent school tuition payment links sent via text.',
      },
      {
        title: 'Protect family devices',
        detail: 'Enforce screen locks and safe DNS filtering across all home tablets and gaming consoles.',
      },
    ],
  },
  {
    id: 'employees',
    title: 'Employees',
    tagline: 'Workplace & Remote Defense',
    badge: 'Workplace',
    icon: Briefcase,
    illustration: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <rect x="8" y="14" width="32" height="26" rx="4" stroke="#00f0ff" strokeWidth="2" />
        <path d="M18 14V10C18 7.8 19.8 6 22 6H26C28.2 6 30 7.8 30 10V14" stroke="#00f0ff" strokeWidth="2" />
        <line x1="8" y1="24" x2="40" y2="24" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="24" cy="24" r="3.5" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
      </svg>
    ),
    recommendations: [
      {
        title: 'Verify email senders',
        detail: 'Scrutinize unexpected executive requests demanding rapid gift cards or vendor bank changes.',
      },
      {
        title: 'Protect work credentials',
        detail: 'Never reuse corporate network passwords on external websites or personal social accounts.',
      },
      {
        title: 'Report security anomalies',
        detail: 'Notify IT security immediately if you encounter a suspicious email rather than ignoring it.',
      },
    ],
  },
  {
    id: 'seniors',
    title: 'Seniors',
    tagline: 'Accessible Safety Habits',
    badge: 'Guidance',
    icon: HeartHandshake,
    illustration: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <circle cx="24" cy="24" r="16" stroke="#00f0ff" strokeWidth="2" />
        <circle cx="24" cy="24" r="8" stroke="#10b981" strokeWidth="2" strokeDasharray="2 2" />
        <path d="M24 16V24L28 28" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="24" r="2" fill="#00f0ff" />
      </svg>
    ),
    recommendations: [
      {
        title: 'Beware urgent tech support calls',
        detail: 'Hang up immediately if an unprompted caller says your computer has viruses or errors.',
      },
      {
        title: 'Verify unexpected bills/deliveries',
        detail: 'Never click parcel tracking links or pay surprise fees for packages you did not order.',
      },
      {
        title: 'Never share bank codes',
        detail: 'Legitimate bank employees will never call to ask for one-time verification SMS codes.',
      },
    ],
  },
  {
    id: 'small-businesses',
    title: 'Small Businesses',
    tagline: 'Merchant & Operational Resiliency',
    badge: 'Commercial',
    icon: Store,
    illustration: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <path d="M8 18L10 6H38L40 18" stroke="#00f0ff" strokeWidth="2" />
        <path d="M6 18H42L40 30C40 32.2 38.2 34 36 34H12C9.8 34 8 32.2 8 30L6 18Z" stroke="#00f0ff" strokeWidth="2" />
        <rect x="18" y="34" width="12" height="8" stroke="#10b981" strokeWidth="2" />
        <circle cx="24" cy="26" r="3" fill="#f59e0b" />
      </svg>
    ),
    recommendations: [
      {
        title: 'Segment customer data',
        detail: 'Isolate point-of-sale machines and sensitive databases from general employee web access.',
      },
      {
        title: 'Implement multi-factor authentication',
        detail: 'Require MFA across every company mailbox, accounting suite, and cloud hosting dashboard.',
      },
      {
        title: 'Maintain encrypted offline backups',
        detail: 'Keep weekly air-gapped snapshots disconnected from your local network to defeat ransomware.',
      },
    ],
  },
];

export const AudienceSafetyCards: React.FC = () => {
  return (
    <section id="audience-safety" className="py-16 md:py-24 relative scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tailored Security Guidance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Cyber Safety for Different Users
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Different digital environments carry unique exposure profiles. Explore prioritized recommendations tailored specifically to your daily digital footprint.
          </p>
        </div>

        {/* 5 Audience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AUDIENCE_CARDS.map((aud) => {
            const AudIcon = aud.icon;
            return (
              <div
                key={aud.id}
                className="rounded-2xl border border-slate-800/90 bg-gradient-to-b from-slate-900/70 to-slate-950 p-6 flex flex-col justify-between hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all duration-300 shadow-xl group cyber-card-glow"
              >
                <div>
                  {/* Card Header with Icon, Illustration & Badge */}
                  <div className="flex items-start justify-between gap-3 mb-5 pb-4 border-b border-slate-800/80">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center text-cyan-400">
                        <AudIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white leading-tight group-hover:text-cyan-300 transition-colors">
                          {aud.title}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">{aud.tagline}</p>
                      </div>
                    </div>

                    <div className="p-1 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                      {aud.illustration}
                    </div>
                  </div>

                  {/* 3 Key Recommendations */}
                  <div className="space-y-3 pt-1">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold block">
                      3 Recommended Actions:
                    </span>
                    <div className="space-y-2.5">
                      {aud.recommendations.map((rec, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs"
                        >
                          <div className="flex items-center gap-1.5 font-bold text-slate-200 mb-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{rec.title}</span>
                          </div>
                          <p className="text-slate-400 pl-5 leading-relaxed text-[11px] sm:text-xs">
                            {rec.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Chip */}
                <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Profile Tier</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {aud.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
