'use client';

import React from 'react';

export interface CyberAntigravityLogoProps {
  variant?: 'full' | 'compact' | 'symbol' | 'monochrome';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  glow?: boolean;
  className?: string;
}

export const CyberAntigravityLogo: React.FC<CyberAntigravityLogoProps> = ({
  variant = 'full',
  theme = 'dark',
  size = 'md',
  showTagline,
  glow = true,
  className = '',
}) => {
  // Sizing tokens
  const symbolSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const titleSizes = {
    sm: 'text-base font-bold',
    md: 'text-lg sm:text-xl font-bold tracking-tight',
    lg: 'text-xl sm:text-2xl font-extrabold tracking-tight',
    xl: 'text-2xl sm:text-3xl font-extrabold tracking-tight',
  };

  const taglineSizes = {
    sm: 'text-[8px] tracking-[0.18em]',
    md: 'text-[9px] sm:text-[10px] tracking-[0.2em]',
    lg: 'text-[10px] sm:text-[11px] tracking-[0.22em]',
    xl: 'text-xs tracking-[0.25em]',
  };

  const isLight = theme === 'light';
  const isMono = variant === 'monochrome';

  // Tagline visibility
  const shouldRenderTagline =
    variant === 'full' && (showTagline !== undefined ? showTagline : true);

  return (
    <div
      className={`inline-flex items-center gap-3 select-none ${className}`}
      role="img"
      aria-label="CyberAntigravity - Rise Above Cyber Threats"
    >
      {/* 
        =======================================================================
        CYBER SHIELD + C + A PROPRIETARY SYMBOL MARK
        =======================================================================
      */}
      <div
        className={`relative shrink-0 flex items-center justify-center ${symbolSizes[size]} transition-transform duration-200 group-hover:scale-105`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible drop-shadow-sm"
          aria-hidden="true"
        >
          <defs>
            {/* Primary Cyan to Blue Gradient */}
            <linearGradient
              id="caCmp_cyan"
              x1="8"
              y1="6"
              x2="24"
              y2="42"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="60%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>

            {/* Secondary Tech Blue Gradient */}
            <linearGradient
              id="caCmp_blue"
              x1="24"
              y1="6"
              x2="40"
              y2="42"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            {/* Ambient Cyan Glow Filter */}
            <filter id="caCmp_glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Subtle Ambient Shield Glow */}
          {glow && !isMono && (
            <path
              d="M24 4 L40 10 L40 25 C40 34.5 24 44 24 44 C24 44 8 34.5 8 25 L8 10 Z"
              fill="#00F0FF"
              opacity="0.16"
              filter="url(#caCmp_glow)"
            />
          )}

          {/* Micro Telemetry Wireframe Shield Outline */}
          <path
            d="M24 5 L39 10.5 L39 24.5 C39 33.5 24 42.5 24 42.5 C24 42.5 9 33.5 9 24.5 L9 10.5 Z"
            stroke={isMono ? (isLight ? '#0F172A' : '#FFFFFF') : '#00F0FF'}
            strokeWidth="0.8"
            strokeOpacity={isMono ? 0.3 : 0.35}
            strokeDasharray="2 1.5"
            fill="none"
          />

          {/* 
            THE "C" ELEMENT (Left Flank, Top Sweep & Bottom Return)
          */}
          <path
            d="M 22 8
               L 11 12
               L 11 25.5
               C 11 33.5, 17.5 38.5, 22.5 41
               L 22.5 35.5
               C 19 33.5, 15.5 29.5, 15.5 24
               L 15.5 15.5
               L 22 13
               Z"
            fill={
              isMono
                ? isLight
                  ? '#0F172A'
                  : '#FFFFFF'
                : 'url(#caCmp_cyan)'
            }
          />

          {/* 
            THE "A" ELEMENT (Right Flank & Outer Wing)
          */}
          <path
            d="M 25.5 7
               L 29.5 7
               L 37 25.5
               C 37 33.5, 30.5 38.5, 25.5 41
               L 25.5 35.5
               C 29 33.5, 32.5 29.5, 32.5 24
               L 28 13.5
               L 25.5 13.5
               Z"
            fill={
              isMono
                ? isLight
                  ? 'rgba(15, 23, 42, 0.85)'
                  : 'rgba(255, 255, 255, 0.85)'
                : 'url(#caCmp_blue)'
            }
          />

          {/* 
            THE "A" ASCENDING CHEVRON (Arrowhead - "Rise")
          */}
          <path
            d="M 24 7.5
               L 30 20
               L 26.5 20
               L 24 14.5
               L 21.5 20
               L 18 20
               Z"
            fill={
              isMono
                ? isLight
                  ? '#0F172A'
                  : '#FFFFFF'
                : 'url(#caCmp_cyan)'
            }
          />

          {/* 
            HORIZONTAL CYBER CROSSBAR OF "A"
          */}
          <path
            d="M 19.5 22.5
               L 28.5 22.5
               L 27.5 25.5
               L 20.5 25.5
               Z"
            fill={isMono ? (isLight ? '#0F172A' : '#FFFFFF') : '#00F0FF'}
          />

          {/* 
            CENTRAL VERIFIED ZERO-TRUST NODE (Emerald Accent)
          */}
          <circle
            cx="24"
            cy="18"
            r="1.5"
            fill={isMono ? (isLight ? '#0F172A' : '#FFFFFF') : '#10B981'}
          />
        </svg>
      </div>

      {/* 
        =======================================================================
        WORDMARK & TAGLINE
        =======================================================================
      */}
      {variant !== 'symbol' && (
        <div className="flex flex-col text-left leading-none">
          <div className={`${titleSizes[size]} transition-colors`}>
            {isMono ? (
              <span className={isLight ? 'text-slate-900' : 'text-white'}>
                CyberAntigravity
              </span>
            ) : (
              <>
                <span className={isLight ? 'text-slate-900' : 'text-white'}>
                  Cyber
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">
                  Antigravity
                </span>
              </>
            )}
          </div>

          {shouldRenderTagline && (
            <span
              className={`font-mono uppercase font-bold mt-1 ${taglineSizes[size]} ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              } ${showTagline === undefined ? 'hidden sm:inline-block' : ''}`}
            >
              RISE ABOVE CYBER THREATS.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
