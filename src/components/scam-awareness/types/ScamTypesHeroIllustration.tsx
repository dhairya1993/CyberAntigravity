'use client';

import React from 'react';

export const ScamTypesHeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] max-w-md mx-auto rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900/90 border border-slate-800 p-4 shadow-2xl flex items-center justify-center overflow-hidden">
      {/* Background Cyber Glow & Subtle Grid */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.12),transparent_70%)] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" 
        aria-hidden="true" 
      />

      <svg
        viewBox="0 0 320 240"
        className="w-full h-full max-h-72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Defensive cyber illustration displaying smartphone threat analysis, phishing link detection, and security verification shield"
      >
        <defs>
          <filter id="typesShieldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="typesShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="typesPhoneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* 1. THREAT NETWORK NODES & INTERCONNECT LINES */}
        <g opacity="0.6">
          <line x1="30" y1="40" x2="80" y2="70" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="280" y1="50" x2="220" y2="90" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="40" y1="200" x2="90" y2="170" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="290" y1="190" x2="230" y2="160" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" />

          {/* Node 1: Top-Left Threat Sensor */}
          <circle cx="30" cy="40" r="4" fill="#082f49" stroke="#06b6d4" strokeWidth="1.5" />
          <circle cx="30" cy="40" r="1.5" fill="#38bdf8" />

          {/* Node 2: Top-Right Threat Sensor */}
          <circle cx="280" cy="50" r="4" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
          <circle cx="280" cy="50" r="1.5" fill="#fbbf24" />

          {/* Node 3: Bottom-Left Phishing Beacon */}
          <circle cx="40" cy="200" r="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
          <circle cx="40" cy="200" r="1.5" fill="#f87171" />

          {/* Node 4: Bottom-Right Secure Terminal */}
          <circle cx="290" cy="190" r="4" fill="#082f49" stroke="#06b6d4" strokeWidth="1.5" />
          <circle cx="290" cy="190" r="1.5" fill="#38bdf8" />
        </g>

        {/* 2. SMARTPHONE DEVICE */}
        <g transform="translate(65, 20)">
          {/* Phone Body */}
          <rect
            x="0"
            y="0"
            width="120"
            height="195"
            rx="16"
            fill="url(#typesPhoneGrad)"
            stroke="#334155"
            strokeWidth="2"
          />
          {/* Inner Screen */}
          <rect
            x="6"
            y="10"
            width="108"
            height="175"
            rx="10"
            fill="#07090e"
            stroke="#1e293b"
            strokeWidth="1"
          />
          {/* Speaker notch */}
          <rect x="44" y="14" width="32" height="3" rx="1.5" fill="#475569" />

          {/* Top Status Header */}
          <rect x="12" y="24" width="96" height="16" rx="4" fill="#0f172a" />
          <circle cx="20" cy="32" r="3.5" fill="#ef4444" />
          <text x="28" y="35" fill="#e2e8f0" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">
            Unknown Sender
          </text>
          <text x="82" y="35" fill="#64748b" fontSize="5.5" fontFamily="sans-serif">
            10:48 AM
          </text>

          {/* Suspicious Message Bubble */}
          <g transform="translate(12, 46)">
            <rect
              x="0"
              y="0"
              width="96"
              height="82"
              rx="6"
              fill="#181324"
              stroke="#f43f5e"
              strokeWidth="1"
              strokeDasharray="4 2"
            />
            {/* Header Flag */}
            <rect x="6" y="7" width="56" height="6" rx="2" fill="#e11d48" />
            <text x="10" y="12" fill="#fff" fontSize="4.5" fontWeight="bold" fontFamily="sans-serif">
              SECURITY WARNING
            </text>

            {/* Simulated text lines */}
            <line x1="6" y1="20" x2="88" y2="20" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
            <line x1="6" y1="27" x2="80" y2="27" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
            <line x1="6" y1="34" x2="62" y2="34" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />

            {/* Phishing Hook Link Indicator Container */}
            <rect x="6" y="42" width="84" height="16" rx="3" fill="#2d121c" stroke="#f43f5e" strokeWidth="0.8" />
            <text x="10" y="52" fill="#fb7185" fontSize="5" fontWeight="bold" fontFamily="monospace">
              http://verify-login.xyz
            </text>

            {/* Threat Urgency Tag */}
            <rect x="6" y="63" width="70" height="11" rx="2" fill="#38101a" />
            <text x="9" y="71" fill="#fca5a5" fontSize="4.5" fontWeight="bold" fontFamily="sans-serif">
              * Action Required in 1 Hr *
            </text>
          </g>

          {/* Home bar */}
          <rect x="42" y="176" width="36" height="3" rx="1.5" fill="#475569" />
        </g>

        {/* 3. WARNING TRIANGLE INDICATOR (Top Right of Phone) */}
        <g transform="translate(165, 32)">
          <rect x="0" y="0" width="76" height="24" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
          <polygon points="10,18 16,7 22,18" fill="#f59e0b" />
          <text x="16" y="16" fill="#000" fontSize="7.5" fontWeight="bold" textAnchor="middle">!</text>
          <text x="28" y="15.5" fill="#fef08a" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
            RED FLAG
          </text>
        </g>

        {/* 4. PHISHING HOOK / LINK INDICATOR NODE (Left of Phone) */}
        <g transform="translate(18, 98)">
          <rect x="0" y="0" width="72" height="26" rx="6" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" />
          {/* Stylized Phishing Hook Icon */}
          <path
            d="M14 6V14C14 17 11 19 8 19C5 19 4 17 4 15"
            stroke="#ef4444"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <polygon points="4,15 2,12 6,13" fill="#ef4444" />
          <text x="24" y="16.5" fill="#fecaca" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">
            FAKE LINK
          </text>
        </g>

        {/* 5. PROTECTIVE SECURITY SHIELD (Lower Right) */}
        <g transform="translate(205, 115)">
          <path
            d="M32 6L54 14V34C54 48 44 58 32 64C20 58 10 48 10 34V14L32 6Z"
            fill="url(#typesShieldGrad)"
            stroke="#38bdf8"
            strokeWidth="2"
            filter="url(#typesShieldGlow)"
          />
          <path
            d="M32 12L48 18V33C48 44 40 52 32 57C24 52 16 44 16 33V18L32 12Z"
            fill="#0369a1"
            fillOpacity="0.75"
          />
          {/* Checkmark */}
          <path
            d="M24 33L29 38L41 26"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="32" y="74" fill="#38bdf8" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            PROTECTED
          </text>
        </g>
      </svg>
    </div>
  );
};
