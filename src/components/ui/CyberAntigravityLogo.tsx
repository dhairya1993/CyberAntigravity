'use client';

import React from 'react';

export interface CyberAntigravityLogoProps {
  variant?: 'full' | 'compact' | 'symbol' | 'monochrome';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  glow?: boolean;
  priority?: boolean;
  className?: string;
}

export const CyberAntigravityLogo: React.FC<CyberAntigravityLogoProps> = ({
  variant = 'full',
  theme = 'dark',
  size = 'md',
  glow = true,
  priority = true,
  className = '',
}) => {
  const isLight = theme === 'light';

  // Determine which asset source to load based on variant and theme
  let src = '/brand/cyberantigravity-logo.png';
  let alt = 'CyberAntigravity — Rise Above Cyber Threats';

  if (variant === 'symbol') {
    src = '/brand/cyberantigravity-symbol.png';
    alt = 'CyberAntigravity Shield Emblem';
  } else if (variant === 'compact') {
    src = '/brand/cyberantigravity-logo-compact.png';
    alt = 'CyberAntigravity Compact Logo';
  } else if (variant === 'monochrome') {
    if (isLight) {
      src = '/brand/cyberantigravity-logo-dark.png';
      alt = 'CyberAntigravity Logo - Dark Monochrome';
    } else {
      src = '/brand/cyberantigravity-logo-white.png';
      alt = 'CyberAntigravity Logo - White Monochrome';
    }
  }

  // Size styling tokens
  const fullSizeClasses = {
    sm: 'h-7 sm:h-8 w-auto max-w-[170px]',
    md: 'h-9 sm:h-10 w-auto max-w-[220px]',
    lg: 'h-11 sm:h-12 w-auto max-w-[270px]',
    xl: 'h-14 sm:h-16 w-auto max-w-[360px]',
  };

  const symbolSizeClasses = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
    xl: 'w-16 h-16 sm:w-20 sm:h-20',
  };

  const compactSizeClasses = {
    sm: 'w-24 sm:w-28 h-auto',
    md: 'w-32 sm:w-36 h-auto',
    lg: 'w-40 sm:w-44 h-auto',
    xl: 'w-48 sm:w-56 h-auto',
  };

  const sizeClass =
    variant === 'symbol'
      ? symbolSizeClasses[size]
      : variant === 'compact' || variant === 'monochrome'
      ? compactSizeClasses[size]
      : fullSizeClasses[size];

  const glowStyle =
    glow && variant !== 'monochrome'
      ? 'drop-shadow-[0_0_12px_rgba(0,240,255,0.28)] hover:drop-shadow-[0_0_18px_rgba(0,240,255,0.45)]'
      : '';

  return (
    <div
      className={`relative inline-flex items-center select-none transition-all duration-200 ${className}`}
      role="img"
      aria-label={alt}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`object-contain transition-transform duration-200 group-hover:scale-[1.02] ${sizeClass} ${glowStyle}`}
      />
    </div>
  );
};
