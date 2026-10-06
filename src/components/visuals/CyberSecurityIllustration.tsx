'use client';

import React from 'react';

export type IllustrationType =
  | 'phishing'
  | 'malware'
  | 'ransomware'
  | 'social-engineering'
  | 'identity-theft'
  | 'fake-website'
  | 'scam'
  | 'credential-theft'
  | 'privacy'
  | 'mfa-shield'
  | 'book-learn'
  | 'quiz-practice'
  | 'defense-armor';

interface CyberSecurityIllustrationProps {
  type: IllustrationType;
  className?: string;
  isHovered?: boolean;
}

export const CyberSecurityIllustration: React.FC<CyberSecurityIllustrationProps> = ({
  type,
  className = 'w-full h-36',
  isHovered = false,
}) => {
  switch (type) {
    /* -------------------------------------------------------------------------
       1. PHISHING: email + suspicious link + warning symbol + shield
       Animation: suspicious link slowly pulses.
       ------------------------------------------------------------------------- */
    case 'phishing':
      return (
        <div className={`relative flex items-center justify-center select-none ${className}`}>
          <svg viewBox="0 0 240 140" className="w-full h-full overflow-visible" fill="none">
            <defs>
              <linearGradient id="phish_grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#fb7185" />
              </linearGradient>
            </defs>

            {/* Email Container Window */}
            <rect x="22" y="20" width="124" height="82" rx="8" fill="#090d16" stroke="#334155" strokeWidth="1.5" />
            <rect x="22" y="20" width="124" height="18" rx="8" fill="#1e293b" />
            <circle cx="32" cy="29" r="2.5" fill="#f43f5e" />
            <circle cx="40" cy="29" r="2.5" fill="#f59e0b" />
            <circle cx="48" cy="29" r="2.5" fill="#10b981" />
            <text x="58" y="32" fill="#64748b" fontSize="7" fontFamily="monospace">INBOX // URGENT_NOTICE</text>

            {/* Email Header & Subject Lines */}
            <line x1="34" y1="48" x2="96" y2="48" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            <line x1="34" y1="56" x2="132" y2="56" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />

            {/* Suspicious Link Button (Slowly Pulses) */}
            <g className="animate-link-pulse">
              <rect x="34" y="66" width="100" height="22" rx="4" fill="#450a0a" stroke="#f43f5e" strokeWidth="1.2" />
              <text x="40" y="80" fill="#fca5a5" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                verify-account-portal.xyz
              </text>
            </g>

            {/* Hook / Attacker Line */}
            <path
              d="M 175 14 C 175 52, 158 76, 138 77 C 126 77, 126 62, 134 62 C 139 62, 142 67, 139 71"
              stroke="url(#phish_grad)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <polygon points="139,71 133,65 143,64" fill="#f43f5e" />

            {/* Warning Symbol */}
            <g transform="translate(142, 28)">
              <polygon points="16,0 32,28 0,28" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" strokeWidth="1.5" />
              <line x1="16" y1="9" x2="16" y2="19" stroke="#fca5a5" strokeWidth="2" strokeLinecap="round" />
              <circle cx="16" cy="24" r="1.5" fill="#fca5a5" />
            </g>

            {/* Defensive Shield (intercepting lure) */}
            <path
              d="M 195 44 L 218 52 V 76 C 218 94 195 106 195 106 C 195 106 172 94 172 76 V 52 L 195 44 Z"
              fill="rgba(6, 182, 212, 0.2)"
              stroke="#06b6d4"
              strokeWidth="2"
              className={isHovered ? 'filter drop-shadow-[0_0_8px_#00f0ff]' : ''}
            />
            <path d="M 187 72 L 193 78 L 204 66" stroke="#22d3ee" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Concept Tag */}
            <g transform="translate(22, 112)">
              <rect x="0" y="0" width="108" height="18" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
              <text x="8" y="12" fill="#c7d2fe" fontSize="8" fontFamily="monospace" fontWeight="bold">DECEPTIVE LURE</text>
            </g>
          </svg>
        </div>
      );

    /* -------------------------------------------------------------------------
       2. MALWARE: laptop + malicious code + file + defensive shield
       Animation: malicious code approaches the shield and is blocked.
       ------------------------------------------------------------------------- */
    case 'malware':
      return (
        <div className={`relative flex items-center justify-center select-none ${className}`}>
          <svg viewBox="0 0 240 140" className="w-full h-full overflow-visible" fill="none">
            {/* Laptop Base & Screen */}
            <rect x="25" y="26" width="90" height="56" rx="4" fill="#090d16" stroke="#334155" strokeWidth="1.5" />
            <rect x="32" y="32" width="76" height="44" rx="2" fill="#020617" />
            <path d="M 15 82 L 125 82 L 132 88 L 8 88 Z" fill="#1e293b" stroke="#475569" strokeWidth="1.2" />

            {/* Malicious File Inside Screen */}
            <rect x="42" y="42" width="22" height="26" rx="3" fill="#450a0a" stroke="#f43f5e" strokeWidth="1.2" />
            <text x="46" y="58" fill="#fca5a5" fontSize="7" fontFamily="monospace" fontWeight="bold">.exe</text>

            {/* Defensive Shield (Blocking Point) */}
            <path
              d="M 175 28 L 202 36 V 64 C 202 84 175 98 175 98 C 175 98 148 84 148 64 V 36 L 175 28 Z"
              fill="rgba(6, 182, 212, 0.2)"
              stroke="#06b6d4"
              strokeWidth="2.2"
              className={isHovered ? 'filter drop-shadow-[0_0_10px_#00f0ff]' : ''}
            />
            <path d="M 165 60 L 172 67 L 186 52" stroke="#22d3ee" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

            {/* Malicious Code Particles Approaching and Blocked by Shield */}
            <g className="animate-malware-block">
              <path d="M 75 54 L 105 54" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
              <circle cx="82" cy="46" r="2.5" fill="#f43f5e" />
              <circle cx="95" cy="54" r="3" fill="#fb7185" />
              <circle cx="88" cy="62" r="2" fill="#f43f5e" />
              <text x="98" y="48" fill="#fca5a5" fontSize="6" fontFamily="monospace">&lt;/&gt;</text>
            </g>

            {/* Concept Tag */}
            <g transform="translate(25, 112)">
              <rect x="0" y="0" width="115" height="18" rx="4" fill="#450a0a" stroke="#f43f5e" strokeWidth="1" />
              <text x="8" y="12" fill="#fca5a5" fontSize="8" fontFamily="monospace" fontWeight="bold">PAYLOAD BLOCKED</text>
            </g>
          </svg>
        </div>
      );

    /* -------------------------------------------------------------------------
       3. RANSOMWARE: locked files + digital lock + warning signal
       Animation: lock briefly pulses.
       ------------------------------------------------------------------------- */
    case 'ransomware':
      return (
        <div className={`relative flex items-center justify-center select-none ${className}`}>
          <svg viewBox="0 0 240 140" className="w-full h-full overflow-visible" fill="none">
            {/* Stack of Locked Files (Background Files) */}
            <g opacity="0.6">
              <rect x="36" y="22" width="55" height="65" rx="5" fill="#090d16" stroke="#475569" strokeWidth="1.2" />
              <line x1="44" y1="34" x2="76" y2="34" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
              <line x1="44" y1="44" x2="82" y2="44" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
            </g>
            <g>
              <rect x="48" y="28" width="60" height="70" rx="5" fill="#090d16" stroke="#64748b" strokeWidth="1.5" />
              <line x1="58" y1="42" x2="94" y2="42" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
              <line x1="58" y1="52" x2="100" y2="52" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="58" y1="62" x2="90" y2="62" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
              <text x="58" y="82" fill="#f87171" fontSize="7.5" fontFamily="monospace" fontWeight="bold">.LOCKED</text>
            </g>

            {/* Digital Lock with Pulse Animation */}
            <g transform="translate(125, 30)" className="animate-lock-pulse">
              {/* Lock Shackle */}
              <path
                d="M 24 22 V 12 C 24 5.37 29.37 0 36 0 C 42.63 0 48 5.37 48 12 V 22"
                stroke="#f59e0b"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              {/* Lock Body */}
              <rect x="14" y="20" width="44" height="40" rx="6" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="2" />
              {/* Keyhole */}
              <circle cx="36" cy="36" r="3.5" fill="#fbbf24" />
              <polygon points="34,38 38,38 39,46 33,46" fill="#fbbf24" />
            </g>

            {/* Warning Signal Broadcast Waves */}
            <g transform="translate(185, 20)">
              <polygon points="18,4 36,36 0,36" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1.8" />
              <line x1="18" y1="14" x2="18" y2="24" stroke="#fbbf24" strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="18" cy="30" r="1.5" fill="#fbbf24" />
              {/* Signal waves */}
              <path d="M 38 12 A 20 20 0 0 1 38 32" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
              <path d="M 43 7 A 28 28 0 0 1 43 37" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
            </g>

            {/* Concept Tag */}
            <g transform="translate(48, 112)">
              <rect x="0" y="0" width="126" height="18" rx="4" fill="#451a03" stroke="#f59e0b" strokeWidth="1" />
              <text x="8" y="12" fill="#fde68a" fontSize="8" fontFamily="monospace" fontWeight="bold">ENCRYPTION EXTORTION</text>
            </g>
          </svg>
        </div>
      );

    /* -------------------------------------------------------------------------
       4. SOCIAL ENGINEERING: message + human silhouette + urgency indicator + manipulation arrows
       Highlight: Urgency, Authority, Emotion
       ------------------------------------------------------------------------- */
    case 'social-engineering':
      return (
        <div className={`relative flex items-center justify-center select-none ${className}`}>
          <svg viewBox="0 0 240 140" className="w-full h-full overflow-visible" fill="none">
            {/* Human Silhouette Target */}
            <circle cx="55" cy="40" r="14" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
            <path d="M 35 76 C 35 60 44 56 55 56 C 66 56 75 60 75 76" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />

            {/* Manipulative Message Window */}
            <rect x="125" y="16" width="95" height="52" rx="6" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1.5" />
            <rect x="125" y="16" width="95" height="14" rx="6" fill="#3b0764" />
            <text x="132" y="26" fill="#e9d5ff" fontSize="7" fontWeight="bold" fontFamily="monospace">URGENT DISPATCH</text>
            <text x="132" y="40" fill="#fca5a5" fontSize="6.5">Immediate wire required</text>
            <text x="132" y="52" fill="#c084fc" fontSize="6">Under executive order</text>

            {/* 3 Manipulation Arrows Highlighting: Urgency, Authority, Emotion */}
            <g>
              {/* Urgency Arrow */}
              <path d="M 125 32 L 82 38" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="2 2" />
              <polygon points="82,38 90,34 89,42" fill="#f43f5e" />
              <text x="88" y="32" fill="#fca5a5" fontSize="6" fontFamily="monospace" fontWeight="bold">URGENCY</text>

              {/* Authority Arrow */}
              <path d="M 125 46 L 80 50" stroke="#a855f7" strokeWidth="1.8" strokeDasharray="2 2" />
              <polygon points="80,50 88,46 87,54" fill="#a855f7" />
              <text x="86" y="46" fill="#d8b4fe" fontSize="6" fontFamily="monospace" fontWeight="bold">AUTHORITY</text>

              {/* Emotion Arrow */}
              <path d="M 125 60 L 78 64" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="2 2" />
              <polygon points="78,64 86,60 85,68" fill="#f59e0b" />
              <text x="86" y="62" fill="#fde68a" fontSize="6" fontFamily="monospace" fontWeight="bold">EMOTION</text>
            </g>

            {/* Urgency Indicator Pill */}
            <g transform="translate(130, 76)">
              <rect x="0" y="0" width="85" height="16" rx="4" fill="#450a0a" stroke="#f43f5e" strokeWidth="1" />
              <circle cx="8" cy="8" r="2.5" fill="#f43f5e" />
              <text x="16" y="11" fill="#fca5a5" fontSize="6.5" fontFamily="monospace" fontWeight="bold">CLOCK TICKING</text>
            </g>

            {/* Concept Tag */}
            <g transform="translate(35, 112)">
              <rect x="0" y="0" width="130" height="18" rx="4" fill="#3b0764" stroke="#a855f7" strokeWidth="1" />
              <text x="8" y="12" fill="#e9d5ff" fontSize="8" fontFamily="monospace" fontWeight="bold">PSYCHOLOGICAL TRAP</text>
            </g>
          </svg>
        </div>
      );

    /* -------------------------------------------------------------------------
       5. IDENTITY THEFT: digital identity card + user profile + warning indicator + Defense shield protects identity
       ------------------------------------------------------------------------- */
    case 'identity-theft':
      return (
        <div className={`relative flex items-center justify-center select-none ${className}`}>
          <svg viewBox="0 0 240 140" className="w-full h-full overflow-visible" fill="none">
            {/* Digital Identity Card */}
            <rect x="25" y="24" width="105" height="68" rx="7" fill="#090d16" stroke="#334155" strokeWidth="1.5" />
            {/* Header chip */}
            <rect x="34" y="32" width="16" height="12" rx="2" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
            <circle cx="88" cy="38" r="7" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" />
            {/* Identity details */}
            <line x1="34" y1="52" x2="72" y2="52" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
            <line x1="34" y1="60" x2="64" y2="60" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="34" y1="68" x2="88" y2="68" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
            <text x="34" y="82" fill="#38bdf8" fontSize="6" fontFamily="monospace">ID // 984-210-PASS</text>

            {/* Warning indicator (Impersonation attempt) */}
            <g transform="translate(112, 16)">
              <circle cx="10" cy="10" r="10" fill="#450a0a" stroke="#f43f5e" strokeWidth="1.5" />
              <line x1="10" y1="5" x2="10" y2="11" stroke="#fca5a5" strokeWidth="2" strokeLinecap="round" />
              <circle cx="10" cy="14" r="1.2" fill="#fca5a5" />
            </g>

            {/* Defensive Shield Protecting Identity */}
            <path
              d="M 175 30 L 202 38 V 66 C 202 86 175 100 175 100 C 175 100 148 86 148 66 V 38 L 175 30 Z"
              fill="rgba(16, 185, 129, 0.2)"
              stroke="#10b981"
              strokeWidth="2.2"
              className={isHovered ? 'filter drop-shadow-[0_0_10px_#10b981]' : ''}
            />
            <path d="M 165 62 L 172 69 L 186 54" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Protection line connecting Shield to ID */}
            <path d="M 148 64 L 130 64" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 2" />

            {/* Concept Tag */}
            <g transform="translate(25, 112)">
              <rect x="0" y="0" width="120" height="18" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
              <text x="8" y="12" fill="#a7f3d0" fontSize="8" fontFamily="monospace" fontWeight="bold">CREDENTIAL SHIELD</text>
            </g>
          </svg>
        </div>
      );

    /* -------------------------------------------------------------------------
       6. FAKE WEBSITES: browser window + fake login page + suspicious URL + magnifying glass
       ------------------------------------------------------------------------- */
    case 'fake-website':
      return (
        <div className={`relative flex items-center justify-center select-none ${className}`}>
          <svg viewBox="0 0 240 140" className="w-full h-full overflow-visible" fill="none">
            {/* Browser Window Frame */}
            <rect x="24" y="18" width="130" height="84" rx="7" fill="#090d16" stroke="#334155" strokeWidth="1.5" />
            {/* Window bar */}
            <rect x="24" y="18" width="130" height="16" rx="7" fill="#1e293b" />
            <circle cx="33" cy="26" r="2.5" fill="#f43f5e" />
            <circle cx="41" cy="26" r="2.5" fill="#f59e0b" />
            <circle cx="49" cy="26" r="2.5" fill="#10b981" />

            {/* Address Bar with Suspicious URL */}
            <rect x="58" y="21" width="90" height="10" rx="3" fill="#020617" stroke="#f43f5e" strokeWidth="0.8" />
            <text x="62" y="29" fill="#fca5a5" fontSize="5.5" fontFamily="monospace">
              http://secure-bank-login.cc
            </text>

            {/* Cloned Login Page Interface */}
            <rect x="42" y="42" width="94" height="14" rx="3" fill="#1e293b" />
            <text x="48" y="52" fill="#94a3b8" fontSize="6.5" fontFamily="monospace">username / email</text>
            <rect x="42" y="60" width="94" height="14" rx="3" fill="#020617" stroke="#475569" strokeWidth="0.8" />
            <circle cx="50" cy="67" r="1.5" fill="#64748b" />
            <circle cx="56" cy="67" r="1.5" fill="#64748b" />
            <circle cx="62" cy="67" r="1.5" fill="#64748b" />
            <circle cx="68" cy="67" r="1.5" fill="#64748b" />

            {/* Sign in button */}
            <rect x="42" y="78" width="40" height="12" rx="3" fill="#f43f5e" />
            <text x="48" y="87" fill="#fff" fontSize="6" fontWeight="bold">Sign In</text>

            {/* Magnifying Glass Inspecting URL Flaw */}
            <g transform="translate(145, 20)">
              {/* Glass Circle */}
              <circle cx="28" cy="28" r="20" fill="rgba(6, 182, 212, 0.15)" stroke="#00f0ff" strokeWidth="2.5" />
              {/* Internal reticle */}
              <circle cx="28" cy="28" r="12" stroke="#00f0ff" strokeWidth="1" strokeDasharray="3 3" />
              {/* Handle */}
              <line x1="42" y1="42" x2="60" y2="60" stroke="#00f0ff" strokeWidth="3.5" strokeLinecap="round" />
              {/* Warning inside inspector */}
              <text x="18" y="31" fill="#f43f5e" fontSize="9" fontWeight="bold" fontFamily="monospace">! FAKE</text>
            </g>

            {/* Concept Tag */}
            <g transform="translate(24, 112)">
              <rect x="0" y="0" width="124" height="18" rx="4" fill="#450a0a" stroke="#f43f5e" strokeWidth="1" />
              <text x="8" y="12" fill="#fca5a5" fontSize="8" fontFamily="monospace" fontWeight="bold">LOOKALIKE CLONE</text>
            </g>
          </svg>
        </div>
      );

    /* Compatibility fallbacks */
    case 'scam':
      return <CyberSecurityIllustration type="social-engineering" className={className} isHovered={isHovered} />;
    case 'credential-theft':
      return <CyberSecurityIllustration type="identity-theft" className={className} isHovered={isHovered} />;
    case 'privacy':
      return (
        <div className={`relative flex items-center justify-center select-none ${className}`}>
          <svg viewBox="0 0 240 140" className="w-full h-full overflow-visible" fill="none">
            <rect x="25" y="46" width="190" height="20" rx="10" fill="#090d16" stroke="#1e293b" strokeWidth="1.5" />
            <path d="M 35 56 L 205 56" stroke="#00f0ff" strokeWidth="2" strokeDasharray="6 4" className="animate-cyber-flow" />
            <circle cx="55" cy="56" r="4" fill="#38bdf8" />
            <circle cx="85" cy="56" r="4" fill="#38bdf8" />
            <g transform="translate(110, 15)">
              <path d="M 0 10 Q 15 -2 30 10 Q 15 22 0 10 Z" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="1.5" />
              <circle cx="15" cy="10" r="4" fill="#f43f5e" />
            </g>
            <path
              d="M 125 40 L 140 45 V 65 C 140 76 125 84 125 84 C 125 84 110 76 110 65 V 45 L 125 40 Z"
              fill="rgba(16, 185, 129, 0.25)"
              stroke="#10b981"
              strokeWidth="2"
            />
          </svg>
        </div>
      );

    case 'book-learn':
      return (
        <div className={`relative flex items-center justify-center select-none ${className}`}>
          <svg viewBox="0 0 160 100" className="w-full h-full overflow-visible" fill="none">
            <rect x="30" y="20" width="100" height="60" rx="6" fill="#090d16" stroke="#00f0ff" strokeWidth="1.5" />
            <line x1="80" y1="20" x2="80" y2="80" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="42" y1="36" x2="70" y2="36" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="42" y1="46" x2="65" y2="46" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="42" y1="56" x2="68" y2="56" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="90" y1="36" x2="118" y2="36" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="90" y1="46" x2="114" y2="46" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'quiz-practice':
      return (
        <div className={`relative flex items-center justify-center select-none ${className}`}>
          <svg viewBox="0 0 160 100" className="w-full h-full overflow-visible" fill="none">
            <rect x="35" y="15" width="90" height="70" rx="8" fill="#090d16" stroke="#f59e0b" strokeWidth="1.5" />
            <line x1="48" y1="30" x2="102" y2="30" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
            <circle cx="52" cy="46" r="3.5" fill="#f59e0b" />
            <line x1="62" y1="46" x2="98" y2="46" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="52" cy="62" r="3.5" fill="#10b981" />
            <line x1="62" y1="62" x2="108" y2="62" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'defense-armor':
    case 'mfa-shield':
    default:
      return (
        <div className={`relative flex items-center justify-center select-none ${className}`}>
          <svg viewBox="0 0 160 100" className="w-full h-full overflow-visible" fill="none">
            <path
              d="M 80 15 L 115 26 V 55 C 115 75 80 90 80 90 C 80 90 45 75 45 55 V 26 L 80 15 Z"
              fill="rgba(16, 185, 129, 0.15)"
              stroke="#10b981"
              strokeWidth="2.2"
            />
            <path d="M 68 50 L 76 58 L 94 42" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
  }
};
