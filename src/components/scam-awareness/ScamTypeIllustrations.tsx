import React from 'react';

interface IllustrationProps {
  className?: string;
}

export const ScamTypeIllustrations = {
  Phishing: ({ className = 'w-10 h-10' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path d="M24 6V26" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 2" className="animate-cyber-flow" />
      <circle r="1.8" fill="#00f0ff">
        <animateMotion dur="1.8s" repeatCount="indefinite" path="M24 6 V26" />
      </circle>
      <path d="M24 26C24 33 30 33 30 28C30 25 28 24 26 24" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" />
      <rect x="6" y="16" width="22" height="16" rx="3" stroke="#f59e0b" strokeWidth="2" fill="#0f172a" />
      <path d="M6 19L17 26L28 19" stroke="#f59e0b" strokeWidth="1.5" />
      <circle cx="36" cy="14" r="3" fill="#f43f5e" className="animate-pulse" />
      <circle cx="36" cy="14" r="6" stroke="#f43f5e" strokeWidth="0.8" strokeDasharray="2 2" className="animate-spin" style={{ animationDuration: '4s' }} />
    </svg>
  ),

  JobScam: ({ className = 'w-10 h-10' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="8" y="14" width="32" height="26" rx="4" stroke="#00f0ff" strokeWidth="2" fill="#0f172a" />
      <path d="M18 14V10C18 7.8 19.8 6 22 6H26C28.2 6 30 7.8 30 10V14" stroke="#00f0ff" strokeWidth="2" />
      <circle cx="24" cy="27" r="6" stroke="#f59e0b" strokeWidth="2" />
      <text x="24" y="30.5" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif" className="animate-pulse">$</text>
      <line x1="16" y1="36" x2="32" y2="20" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="28" r="8" stroke="#f43f5e" strokeWidth="0.8" strokeDasharray="2 2" className="animate-ping" opacity="0.4" />
    </svg>
  ),

  InvestmentScam: ({ className = 'w-10 h-10' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path d="M6 38L18 24L28 32L42 12" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 2" className="animate-cyber-flow" />
      <path d="M34 12H42V20" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Phantom drop line with falling packet */}
      <path d="M42 12L42 38" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" className="animate-cyber-flow" />
      <circle r="2" fill="#f43f5e">
        <animateMotion dur="1.5s" repeatCount="indefinite" path="M42 12 L 42 38" />
      </circle>
      <circle cx="42" cy="38" r="4" fill="#f43f5e" className="animate-pulse" />
      <circle cx="42" cy="38" r="6" stroke="#f43f5e" strokeWidth="0.8" className="animate-ping" opacity="0.6" />
    </svg>
  ),

  BankingScam: ({ className = 'w-10 h-10' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <polygon points="24,6 40,16 8,16" stroke="#00f0ff" strokeWidth="2" fill="#0f172a" />
      {/* Scanning line across bank facade */}
      <line x1="10" y1="20" x2="10" y2="34" stroke="#00f0ff" strokeWidth="1.2" opacity="0.7">
        <animate attributeName="x1" values="10;36;10" dur="2s" repeatCount="indefinite" />
        <animate attributeName="x2" values="10;36;10" dur="2s" repeatCount="indefinite" />
      </line>
      <rect x="12" y="16" width="4" height="18" fill="#38bdf8" />
      <rect x="22" y="16" width="4" height="18" fill="#38bdf8" />
      <rect x="32" y="16" width="4" height="18" fill="#38bdf8" />
      <rect x="6" y="34" width="36" height="6" rx="2" stroke="#00f0ff" strokeWidth="2" />
      <circle cx="36" cy="14" r="5" fill="#f43f5e" className="animate-pulse" />
      <text x="36" y="17" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">!</text>
    </svg>
  ),

  DeliveryScam: ({ className = 'w-10 h-10' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path d="M8 16L24 8L40 16L24 24L8 16Z" stroke="#00f0ff" strokeWidth="2" strokeLinejoin="round" />
      <path d="M8 16V34L24 42V24" stroke="#00f0ff" strokeWidth="2" strokeLinejoin="round" />
      <path d="M40 16V34L24 42" stroke="#00f0ff" strokeWidth="2" strokeLinejoin="round" />
      {/* Laser scan on parcel */}
      <line x1="12" y1="16" x2="28" y2="24" stroke="#38bdf8" strokeWidth="1" opacity="0.8">
        <animate attributeName="opacity" values="0.2;1;0.2" dur="1.8s" repeatCount="indefinite" />
      </line>
      <circle cx="36" cy="36" r="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
      <circle cx="36" cy="36" r="8" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="2 2" className="animate-spin" style={{ animationDuration: '4s' }} />
      <text x="36" y="39.5" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">?</text>
    </svg>
  ),

  TechSupportScam: ({ className = 'w-10 h-10' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path d="M8 24C8 15.2 15.2 8 24 8C32.8 8 40 15.2 40 24V34C40 37.3 37.3 40 34 40H28" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" />
      <rect x="6" y="24" width="6" height="12" rx="2" fill="#38bdf8" />
      <rect x="36" y="24" width="6" height="12" rx="2" fill="#38bdf8" />
      <circle cx="28" cy="40" r="3" fill="#f43f5e" className="animate-ping" />
      <circle cx="28" cy="40" r="3" fill="#f43f5e" />
    </svg>
  ),

  RomanceScam: ({ className = 'w-10 h-10' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path d="M24 14C20 8 10 10 10 18C10 26 24 36 24 36C24 36 38 26 38 18C38 10 28 8 24 14Z" stroke="#f43f5e" strokeWidth="2" fill="#4c0519" />
      {/* Broken fracture line with cyber spark */}
      <path d="M24 14L22 22L27 26L24 36" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" className="animate-cyber-flow" />
      <circle r="1.8" fill="#fbbf24">
        <animateMotion dur="2s" repeatCount="indefinite" path="M24 14 L 22 22 L 27 26 L 24 36" />
      </circle>
      <circle cx="36" cy="12" r="3" fill="#f59e0b" className="animate-pulse" />
    </svg>
  ),

  FakeCustomerSupport: ({ className = 'w-10 h-10' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="8" y="10" width="32" height="24" rx="4" stroke="#00f0ff" strokeWidth="2" fill="#0f172a" />
      <circle cx="24" cy="20" r="4" stroke="#f59e0b" strokeWidth="1.5" />
      <path d="M16 28C16 25 19 24 24 24C29 24 32 25 32 28" stroke="#f59e0b" strokeWidth="1.5" />
      {/* Spoofing mask badge with live pulse */}
      <circle cx="38" cy="10" r="5" fill="#f43f5e" className="animate-pulse" />
      <text x="38" y="13" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">✕</text>
    </svg>
  ),

  QRCodeScam: ({ className = 'w-10 h-10' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="8" y="8" width="12" height="12" rx="2" stroke="#00f0ff" strokeWidth="2" />
      <rect x="11" y="11" width="6" height="6" fill="#00f0ff" />
      <rect x="28" y="8" width="12" height="12" rx="2" stroke="#00f0ff" strokeWidth="2" />
      <rect x="31" y="11" width="6" height="6" fill="#00f0ff" />
      <rect x="8" y="28" width="12" height="12" rx="2" stroke="#00f0ff" strokeWidth="2" />
      <rect x="11" y="31" width="6" height="6" fill="#00f0ff" />
      
      {/* Scanning laser beam vertically down QR code */}
      <line x1="8" y1="10" x2="40" y2="10" stroke="#00f0ff" strokeWidth="1.2" opacity="0.8">
        <animate attributeName="y1" values="8;40;8" dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="y2" values="8;40;8" dur="2.2s" repeatCount="indefinite" />
      </line>

      {/* Malicious overlay patch */}
      <rect x="26" y="26" width="14" height="14" rx="2" fill="#7f1d1d" stroke="#f43f5e" strokeWidth="2" />
      <text x="33" y="37" fill="#fecdd3" fontSize="10" fontWeight="bold" textAnchor="middle" className="animate-pulse">!</text>
    </svg>
  ),

  ImpersonationScam: ({ className = 'w-10 h-10' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <polygon points="24,6 38,14 34,36 24,42 14,36 10,14" stroke="#00f0ff" strokeWidth="2" fill="#0f172a" />
      <circle cx="24" cy="22" r="5" stroke="#f59e0b" strokeWidth="2" />
      {/* Scanning beam on shield */}
      <line x1="16" y1="30" x2="32" y2="18" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 2" className="animate-cyber-flow" />
      <circle cx="24" cy="22" r="8" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="2 2" className="animate-spin" style={{ animationDuration: '5s' }} />
    </svg>
  ),

  LotteryPrizeScam: ({ className = 'w-10 h-10' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path d="M14 10H34V22C34 27.5 29.5 32 24 32C18.5 32 14 27.5 14 22V10Z" stroke="#f59e0b" strokeWidth="2" fill="#18181b" />
      <path d="M14 14H8C8 18 11 20 14 20" stroke="#f59e0b" strokeWidth="2" />
      <path d="M34 14H40C40 18 37 20 34 20" stroke="#f59e0b" strokeWidth="2" />
      <path d="M24 32V38M16 38H32" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      {/* Advance fee hook with ping */}
      <circle cx="24" cy="18" r="3" fill="#f43f5e" className="animate-pulse" />
      <circle cx="24" cy="18" r="5" stroke="#f43f5e" strokeWidth="0.8" className="animate-ping" opacity="0.6" />
    </svg>
  ),

  SocialMediaScam: ({ className = 'w-10 h-10' }: IllustrationProps) => (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <circle cx="16" cy="18" r="6" stroke="#00f0ff" strokeWidth="2" fill="#0f172a" />
      <circle cx="32" cy="18" r="6" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" className="animate-cyber-flow" fill="#0f172a" />
      <path d="M10 36C10 32 12.5 30 16 30C19.5 30 22 32 22 36" stroke="#00f0ff" strokeWidth="2" />
      <path d="M26 36C26 32 28.5 30 32 30C35.5 30 38 32 38 36" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" className="animate-cyber-flow" />
      {/* Impersonation cloning particle */}
      <circle r="1.5" fill="#f43f5e">
        <animateMotion dur="1.8s" repeatCount="indefinite" path="M 16 18 L 32 18" />
      </circle>
    </svg>
  ),
};
