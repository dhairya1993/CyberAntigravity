'use client';

import React from 'react';

export const ScamAnalysisHeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] max-w-lg mx-auto rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900/90 border border-slate-800 p-5 shadow-2xl flex items-center justify-center overflow-hidden">
      {/* Background cyber radial glow & subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* SVG Canvas for Smartphone + Suspicious Message + Warning Indicators + Magnifying Glass + Security Shield */}
      <svg
        viewBox="0 0 320 240"
        className="w-full h-full max-h-80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="heroShieldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="phoneBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* 1. SMARTPHONE CHASSIS */}
        <g transform="translate(60, 20)">
          {/* Phone Outer Shell */}
          <rect
            x="0"
            y="0"
            width="130"
            height="200"
            rx="18"
            fill="url(#phoneBodyGrad)"
            stroke="#334155"
            strokeWidth="2.5"
          />
          {/* Phone Screen Display */}
          <rect
            x="8"
            y="12"
            width="114"
            height="176"
            rx="12"
            fill="#07090e"
            stroke="#1e293b"
            strokeWidth="1"
          />
          {/* Camera Notch */}
          <rect x="48" y="16" width="34" height="4" rx="2" fill="#334155" />
          {/* Speaker dot */}
          <circle cx="42" cy="18" r="1.5" fill="#475569" />

          {/* Incoming Message Header */}
          <rect x="14" y="26" width="102" height="18" rx="4" fill="#0f172a" />
          <circle cx="23" cy="35" r="4" fill="#f59e0b" />
          <text x="32" y="38" fill="#e2e8f0" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
            Alert: (555) 0192
          </text>
          <text x="88" y="38" fill="#64748b" fontSize="6" fontFamily="sans-serif">
            10:42 AM
          </text>

          {/* 2. SUSPICIOUS MESSAGE BUBBLE */}
          <g transform="translate(14, 50)">
            <rect
              x="0"
              y="0"
              width="102"
              height="88"
              rx="8"
              fill="#1e1b2e"
              stroke="#e11d48"
              strokeWidth="1.2"
              strokeDasharray="4 2"
            />
            {/* Urgent Warning Header Line */}
            <rect x="6" y="8" width="62" height="6" rx="2" fill="#f43f5e" />
            <text x="10" y="13" fill="#fff" fontSize="5" fontWeight="bold" fontFamily="sans-serif">
              URGENT NOTICE
            </text>

            {/* Simulated Text Lines */}
            <line x1="6" y1="22" x2="94" y2="22" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="6" y1="30" x2="88" y2="30" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="6" y1="38" x2="68" y2="38" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />

            {/* Suspicious Phishing Link Area */}
            <rect x="6" y="46" width="90" height="16" rx="4" fill="#2d1522" stroke="#f43f5e" strokeWidth="1" />
            <text x="12" y="56" fill="#f43f5e" fontSize="5.5" fontWeight="bold" fontFamily="monospace">
              http://secure-verify.xyz/login
            </text>

            {/* Action Threat Warning Tag */}
            <rect x="6" y="68" width="80" height="12" rx="3" fill="#3b111a" />
            <text x="10" y="76" fill="#fca5a5" fontSize="5" fontWeight="bold" fontFamily="sans-serif">
              * Immediate action required *
            </text>
          </g>

          {/* Home indicator bar */}
          <rect x="45" y="178" width="40" height="3" rx="1.5" fill="#475569" />
        </g>

        {/* 3. WARNING INDICATORS (Flashing Badges & Alert Nodes) */}
        {/* Warning Indicator 1 (Urgency Badge top-right of phone) */}
        <g transform="translate(165, 36)">
          <rect x="0" y="0" width="76" height="22" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
          <polygon points="10,16 16,6 22,16" fill="#f59e0b" />
          <text x="16" y="14" fill="#000" fontSize="7" fontWeight="bold" textAnchor="middle">!</text>
          <text x="27" y="14" fill="#fef08a" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
            URGENCY TRAP
          </text>
        </g>

        {/* Warning Indicator 2 (Spoofed Link Badge lower-left) */}
        <g transform="translate(18, 110)">
          <rect x="0" y="0" width="74" height="22" rx="6" fill="#18181b" stroke="#f43f5e" strokeWidth="1.5" />
          <circle cx="12" cy="11" r="5" fill="#e11d48" />
          <text x="12" y="14" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">✕</text>
          <text x="22" y="14" fill="#fecdd3" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
            FAKE DOMAIN
          </text>
        </g>

        {/* Scanning Radar Wave Vector */}
        <line x1="80" y1="95" x2="200" y2="135" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />

        {/* 4. MAGNIFYING GLASS INSPECTOR */}
        <g transform="translate(145, 95)">
          {/* Glass Handle */}
          <line
            x1="48"
            y1="48"
            x2="72"
            y2="72"
            stroke="#94a3b8"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <line
            x1="48"
            y1="48"
            x2="72"
            y2="72"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Outer Lens Frame */}
          <circle
            cx="26"
            cy="26"
            r="28"
            fill="#082f49"
            fillOpacity="0.4"
            stroke="#00f0ff"
            strokeWidth="3.5"
          />
          {/* Lens Interior Grid / Reticle */}
          <circle cx="26" cy="26" r="22" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
          <line x1="26" y1="8" x2="26" y2="44" stroke="#00f0ff" strokeWidth="0.8" opacity="0.5" />
          <line x1="8" y1="26" x2="44" y2="26" stroke="#00f0ff" strokeWidth="0.8" opacity="0.5" />

          {/* Inspected Flag inside Lens */}
          <polygon points="26,16 32,30 20,30" fill="#f43f5e" />
          <text x="26" y="27" fill="#fff" fontSize="7" fontWeight="bold" textAnchor="middle">!</text>
        </g>

        {/* 5. PROTECTIVE SECURITY SHIELD */}
        <g transform="translate(225, 125)">
          {/* Shield Outer Aura */}
          <path
            d="M32 6L54 14V34C54 48 44 58 32 64C20 58 10 48 10 34V14L32 6Z"
            fill="url(#shieldGrad)"
            stroke="#38bdf8"
            strokeWidth="2.5"
            filter="url(#heroShieldGlow)"
          />
          {/* Shield Inner Inset */}
          <path
            d="M32 12L48 18V33C48 44 40 52 32 57C24 52 16 44 16 33V18L32 12Z"
            fill="#0369a1"
            fillOpacity="0.7"
          />
          {/* Shield Checkmark / Emblem */}
          <path
            d="M24 33L29 38L41 26"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Shield Base Caption */}
          <text x="32" y="73" fill="#38bdf8" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            VERIFIED
          </text>
        </g>
      </svg>
    </div>
  );
};
