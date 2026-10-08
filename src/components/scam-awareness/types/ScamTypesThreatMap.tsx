'use client';

import React from 'react';

export const ScamTypesThreatMap: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] max-w-lg mx-auto rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900/90 border border-slate-800 p-3 sm:p-5 shadow-2xl flex items-center justify-center overflow-hidden">
      {/* Background Cyber Glow & Subtle Grid */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.14),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 400 320"
        className="w-full h-full max-h-80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Graphical scam threat map showing central scam node connected to phishing, banking, investment, job, delivery, and social media threat nodes"
      >
        <defs>
          {/* Glowing Filters */}
          <filter id="threatCenterGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="threatNodeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Gradients */}
          <radialGradient id="centerCoreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#7f1d1d" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#18070b" stopOpacity="0.95" />
          </radialGradient>
          <linearGradient id="centerRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* 1. RADAR / TOPOLOGY CIRCLES */}
        <circle cx="200" cy="160" r="130" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
        <circle cx="200" cy="160" r="95" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="200" cy="160" r="60" stroke="#06b6d4" strokeWidth="0.8" opacity="0.3" />

        {/* 2. CONNECTING NETWORK LINES (Center cx=200, cy=160 to 6 nodes) */}
        {/* Line 1 -> Phishing (200, 45) */}
        <line x1="200" y1="160" x2="200" y2="45" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.75" />
        {/* Line 2 -> Banking (315, 95) */}
        <line x1="200" y1="160" x2="315" y2="95" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.75" />
        {/* Line 3 -> Investment (315, 225) */}
        <line x1="200" y1="160" x2="315" y2="225" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.75" />
        {/* Line 4 -> Job (200, 275) */}
        <line x1="200" y1="160" x2="200" y2="275" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.75" />
        {/* Line 5 -> Delivery (85, 225) */}
        <line x1="200" y1="160" x2="85" y2="225" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.75" />
        {/* Line 6 -> Social Media (85, 95) */}
        <line x1="200" y1="160" x2="85" y2="95" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.75" />

        {/* Small Data Packet Flow Indicators along vectors */}
        <circle cx="200" cy="95" r="2" fill="#06b6d4" />
        <circle cx="265" cy="123" r="2" fill="#f43f5e" />
        <circle cx="265" cy="197" r="2" fill="#10b981" />
        <circle cx="200" cy="225" r="2" fill="#a855f7" />
        <circle cx="135" cy="197" r="2" fill="#f97316" />
        <circle cx="135" cy="123" r="2" fill="#38bdf8" />

        {/* 3. CENTER NODE: "SCAM" */}
        <g transform="translate(200, 160)">
          {/* Animated Sonar Halo */}
          <circle cx="0" cy="0" r="42" fill="none" stroke="#f43f5e" strokeWidth="1" opacity="0.4" strokeDasharray="6 4" />
          <circle cx="0" cy="0" r="34" fill="url(#centerCoreGrad)" stroke="url(#centerRingGrad)" strokeWidth="2.5" filter="url(#threatCenterGlow)" />
          
          {/* Center Text */}
          <text x="0" y="-4" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="monospace" letterSpacing="2">
            SCAM
          </text>
          <text x="0" y="10" fill="#fecdd3" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            THREAT HUB
          </text>

          {/* Small Center Warning Triangle Icon */}
          <polygon points="-5,-16 0,-24 5,-16" fill="#f59e0b" />
          <circle cx="0" cy="-18" r="0.8" fill="#000" />
        </g>

        {/* 4. CONNECTED PERIPHERAL NODES */}

        {/* NODE 1: PHISHING (Top-Center: 200, 45) */}
        <g transform="translate(200, 45)">
          <rect x="-44" y="-18" width="88" height="36" rx="10" fill="#0b1728" stroke="#06b6d4" strokeWidth="1.6" filter="url(#threatNodeGlow)" />
          {/* Icon container */}
          <circle cx="-25" cy="0" r="9" fill="#082f49" stroke="#06b6d4" strokeWidth="1" />
          {/* Hook / Mail Icon representation */}
          <path d="M-28 -3 L-22 -3 L-22 3 L-28 3 Z M-28 -3 L-25 0 L-22 -3" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" />
          <text x="5" y="-2" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            PHISHING
          </text>
          <text x="5" y="8" fill="#67e8f9" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            FAKE LINKS
          </text>
        </g>

        {/* NODE 2: BANKING (Top-Right: 315, 95) */}
        <g transform="translate(315, 95)">
          <rect x="-44" y="-18" width="88" height="36" rx="10" fill="#180b15" stroke="#f43f5e" strokeWidth="1.6" filter="url(#threatNodeGlow)" />
          <circle cx="-25" cy="0" r="9" fill="#4c0519" stroke="#f43f5e" strokeWidth="1" />
          {/* Landmark / Bank Icon */}
          <path d="M-28 3 L-22 3 M-27 3 L-27 -1 M-23 3 L-23 -1 M-28 -1 L-22 -1 L-25 -4 Z" stroke="#fda4af" strokeWidth="0.9" />
          <text x="5" y="-2" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            BANKING
          </text>
          <text x="5" y="8" fill="#fca5a5" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            CRITICAL
          </text>
        </g>

        {/* NODE 3: INVESTMENT (Bottom-Right: 315, 225) */}
        <g transform="translate(315, 225)">
          <rect x="-44" y="-18" width="88" height="36" rx="10" fill="#081814" stroke="#10b981" strokeWidth="1.6" filter="url(#threatNodeGlow)" />
          <circle cx="-25" cy="0" r="9" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
          {/* Trending Line Icon */}
          <path d="M-28 3 L-25 0 L-24 1 L-22 -3" stroke="#6ee7b7" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <text x="5" y="-2" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            INVESTMENT
          </text>
          <text x="5" y="8" fill="#a7f3d0" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            FAKE RETURNS
          </text>
        </g>

        {/* NODE 4: JOB (Bottom-Center: 200, 275) */}
        <g transform="translate(200, 275)">
          <rect x="-44" y="-18" width="88" height="36" rx="10" fill="#140c24" stroke="#a855f7" strokeWidth="1.6" filter="url(#threatNodeGlow)" />
          <circle cx="-25" cy="0" r="9" fill="#3b0764" stroke="#a855f7" strokeWidth="1" />
          {/* Briefcase Icon */}
          <rect x="-28" y="-2" width="6" height="5" rx="1" stroke="#d8b4fe" strokeWidth="0.9" />
          <path d="M-26 -2 L-26 -4 L-24 -4 L-24 -2" stroke="#d8b4fe" strokeWidth="0.8" />
          <text x="5" y="-2" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            JOB
          </text>
          <text x="5" y="8" fill="#e9d5ff" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            RECRUITING
          </text>
        </g>

        {/* NODE 5: DELIVERY (Bottom-Left: 85, 225) */}
        <g transform="translate(85, 225)">
          <rect x="-44" y="-18" width="88" height="36" rx="10" fill="#1b1008" stroke="#f97316" strokeWidth="1.6" filter="url(#threatNodeGlow)" />
          <circle cx="-25" cy="0" r="9" fill="#431407" stroke="#f97316" strokeWidth="1" />
          {/* Package Icon */}
          <rect x="-28" y="-3" width="6" height="6" rx="1" stroke="#fdba74" strokeWidth="0.9" />
          <line x1="-28" y1="0" x2="-22" y2="0" stroke="#fdba74" strokeWidth="0.7" />
          <text x="5" y="-2" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            DELIVERY
          </text>
          <text x="5" y="8" fill="#fed7aa" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            PARCEL SMS
          </text>
        </g>

        {/* NODE 6: SOCIAL MEDIA (Top-Left: 85, 95) */}
        <g transform="translate(85, 95)">
          <rect x="-44" y="-18" width="88" height="36" rx="10" fill="#081822" stroke="#38bdf8" strokeWidth="1.6" filter="url(#threatNodeGlow)" />
          <circle cx="-25" cy="0" r="9" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1" />
          {/* Users / Social Icon */}
          <circle cx="-25" cy="-2" r="2" stroke="#7dd3fc" strokeWidth="0.8" />
          <path d="M-28 3 C-28 1 -22 1 -22 3" stroke="#7dd3fc" strokeWidth="0.8" />
          <text x="5" y="-2" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            SOCIAL MEDIA
          </text>
          <text x="5" y="8" fill="#bae6fd" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            CLONED DMs
          </text>
        </g>
      </svg>
    </div>
  );
};
