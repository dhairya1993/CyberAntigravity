import React from 'react';

interface IllustrationProps {
  className?: string;
}

export const RedFlagIllustrations = {
  Urgency: ({ className = 'w-12 h-12' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor">
      {/* Stopwatch ring */}
      <circle cx="24" cy="26" r="16" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3 2" />
      <path d="M24 10V6M20 6H28" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      {/* Watch hands showing urgent time */}
      <path d="M24 26L24 16" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 26L31 29" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="26" r="2.5" fill="#f43f5e" />
      {/* Alarm pulses */}
      <path d="M35 13L39 9M9 9L13 13" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  UnknownSender: ({ className = 'w-12 h-12' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor">
      {/* Email envelope */}
      <rect x="6" y="12" width="36" height="24" rx="4" stroke="#f59e0b" strokeWidth="2" />
      <path d="M6 16L24 28L42 16" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round" />
      {/* Question mark avatar inside */}
      <circle cx="36" cy="12" r="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
      <text x="36" y="16" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">?</text>
    </svg>
  ),

  SuspiciousLink: ({ className = 'w-12 h-12' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor">
      {/* Disjointed Link chain */}
      <path d="M19 15L15 19C12 22 12 26 15 29L19 33C22 36 26 36 29 33L31 31" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M29 33L33 29C36 26 36 22 33 19L29 15C26 12 22 12 19 15L17 17" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 2" />
      {/* Warning triangle at junction */}
      <polygon points="24,18 29,27 19,27" fill="#f43f5e" />
      <line x1="24" y1="21" x2="24" y2="23" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="24" cy="25.5" r="0.75" fill="#fff" />
    </svg>
  ),

  UnexpectedAttachment: ({ className = 'w-12 h-12' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor">
      {/* File Document */}
      <path d="M14 8H28L36 16V38C36 40.2 34.2 42 32 42H14C11.8 42 10 40.2 10 38V12C10 9.8 11.8 8 14 8Z" stroke="#f59e0b" strokeWidth="2" />
      <path d="M28 8V16H36" stroke="#f59e0b" strokeWidth="2" />
      {/* Dangerous Extension Tag */}
      <rect x="14" y="24" width="18" height="10" rx="2" fill="#881337" stroke="#f43f5e" strokeWidth="1.5" />
      <text x="23" y="31.5" fill="#fecdd3" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">.ZIP</text>
      {/* Danger burst */}
      <circle cx="36" cy="36" r="3" fill="#f43f5e" />
    </svg>
  ),

  PaymentRequest: ({ className = 'w-12 h-12' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor">
      {/* Credit card */}
      <rect x="6" y="14" width="36" height="22" rx="4" stroke="#f59e0b" strokeWidth="2" />
      <line x1="6" y1="20" x2="42" y2="20" stroke="#f59e0b" strokeWidth="2" />
      {/* Extraction arrow */}
      <circle cx="34" cy="27" r="4" fill="#881337" stroke="#f43f5e" strokeWidth="1.5" />
      <path d="M34 29V25M32 27L34 25L36 27" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="12" y="30" fill="#f59e0b" fontSize="9" fontWeight="bold" fontFamily="sans-serif">$</text>
    </svg>
  ),

  PasswordRequest: ({ className = 'w-12 h-12' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor">
      {/* Keyhole shield */}
      <path d="M24 6L38 12V22C38 31 32 38 24 42C16 38 10 31 10 22V12L24 6Z" stroke="#f59e0b" strokeWidth="2" />
      {/* Key and warning */}
      <circle cx="24" cy="20" r="4" stroke="#f43f5e" strokeWidth="2" />
      <path d="M24 24V32M24 28H28" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  TooGoodToBeTrue: ({ className = 'w-12 h-12' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor">
      {/* Gift box with hidden hook */}
      <rect x="12" y="20" width="24" height="20" rx="3" stroke="#f59e0b" strokeWidth="2" />
      <rect x="8" y="14" width="32" height="6" rx="2" stroke="#f59e0b" strokeWidth="2" />
      <line x1="24" y1="14" x2="24" y2="40" stroke="#f59e0b" strokeWidth="2" />
      {/* Sparkles / Hook */}
      <path d="M24 6L24 14" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 10C20 7.8 21.8 6 24 6C26.2 6 28 7.8 28 10" stroke="#f43f5e" strokeWidth="2" />
      <path d="M6 10L10 10M38 10L42 10" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  FakeAuthority: ({ className = 'w-12 h-12' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor">
      {/* Authority Police/Crest Badge with warning slice */}
      <polygon points="24,6 38,14 34,36 24,42 14,36 10,14" stroke="#f59e0b" strokeWidth="2" fill="none" />
      <circle cx="24" cy="22" r="6" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2 2" />
      {/* Fake Stamp */}
      <line x1="16" y1="30" x2="32" y2="18" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  UnusualLoginAlert: ({ className = 'w-12 h-12' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor">
      {/* Smartphone with alert dialogue */}
      <rect x="14" y="6" width="20" height="36" rx="4" stroke="#f59e0b" strokeWidth="2" />
      <rect x="10" y="16" width="28" height="16" rx="3" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
      <text x="24" y="27" fill="#f43f5e" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">NEW IP</text>
      <circle cx="24" cy="38" r="1.5" fill="#f59e0b" />
    </svg>
  ),

  PressureToActQuickly: ({ className = 'w-12 h-12' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor">
      {/* Gauge with needle slammed into red zone */}
      <path d="M10 32A16 16 0 1 1 38 32" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 18A16 16 0 0 1 38 32" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="24" y1="32" x2="34" y2="20" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="32" r="3" fill="#f59e0b" />
      {/* Alert ticks */}
      <line x1="38" y1="18" x2="42" y2="16" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};
