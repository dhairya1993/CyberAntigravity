/**
 * Dependency-Free SVG & PNG Badge Generation Engine
 * Generates high-resolution vector credentials directly in the browser.
 * Privacy-Preserving: Contains ZERO email addresses, passwords, or authentication secrets.
 */

import type { ForensicBadge } from './badgeCalculator';

export function generateBadgeSvg(badge: ForensicBadge, recipientName: string = 'Cyber Defender'): string {
  const safeDate = (badge.earnedDate || new Date().toISOString().split('T')[0])
    .trim()
    .slice(0, 20)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const primaryColor =
    badge.accentColor === 'rose'
      ? '#f43f5e'
      : badge.accentColor === 'amber'
      ? '#f59e0b'
      : badge.accentColor === 'emerald'
      ? '#10b981'
      : '#00f0ff';

  const secondaryColor =
    badge.accentColor === 'rose'
      ? '#881337'
      : badge.accentColor === 'amber'
      ? '#78350f'
      : badge.accentColor === 'emerald'
      ? '#064e3b'
      : '#083344';

  // Sanitize recipientName to prevent SVG/XML injection
  const safeRecipient = recipientName
    .trim()
    .slice(0, 32)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const safeTitle = badge.title
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520" style="background:#07090e;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0e17" />
      <stop offset="50%" stop-color="#07090e" />
      <stop offset="100%" stop-color="${secondaryColor}" stop-opacity="0.5" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${primaryColor}" />
      <stop offset="100%" stop-color="#00f0ff" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Base -->
  <rect x="0" y="0" width="800" height="520" fill="url(#bgGrad)" />

  <!-- Outer Cyber Frame -->
  <rect x="20" y="20" width="760" height="480" rx="16" fill="none" stroke="${primaryColor}" stroke-opacity="0.4" stroke-width="2" />
  <rect x="28" y="28" width="744" height="464" rx="12" fill="none" stroke="#1e293b" stroke-width="1" stroke-dasharray="8 6" />

  <!-- Corner Brackets -->
  <path d="M 20 50 L 20 20 L 50 20" fill="none" stroke="${primaryColor}" stroke-width="4" />
  <path d="M 750 20 L 780 20 L 780 50" fill="none" stroke="${primaryColor}" stroke-width="4" />
  <path d="M 20 470 L 20 500 L 50 500" fill="none" stroke="${primaryColor}" stroke-width="4" />
  <path d="M 750 500 L 780 500 L 780 470" fill="none" stroke="${primaryColor}" stroke-width="4" />

  <!-- Top Brand Header -->
  <text x="50" y="65" fill="#64748b" font-size="12" font-weight="700" letter-spacing="3">CYBERANTIGRAVITY // OPEN DEFENSE INITIATIVE</text>
  <text x="750" y="65" fill="${primaryColor}" font-size="11" font-weight="700" text-anchor="end" letter-spacing="2">REF: ${badge.verificationCode}</text>

  <!-- Center Shield Iconography -->
  <g transform="translate(400, 155)" filter="url(#glow)">
    <circle cx="0" cy="0" r="48" fill="#0b1220" stroke="${primaryColor}" stroke-width="3" />
    <path d="M -18 -18 L 0 -26 L 18 -18 L 18 6 C 18 18 0 28 0 28 C 0 28 -18 18 -18 6 Z" fill="none" stroke="${primaryColor}" stroke-width="3" stroke-linejoin="round" />
    <path d="M -7 3 L -1 9 L 9 -3" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  </g>

  <!-- Badge Award Category -->
  <text x="400" y="240" fill="${primaryColor}" font-size="12" font-weight="700" text-anchor="middle" letter-spacing="4">★ ${badge.category.toUpperCase()} COMPLETION BADGE ★</text>

  <!-- Main Badge Title -->
  <text x="400" y="278" fill="#ffffff" font-size="24" font-weight="800" text-anchor="middle" letter-spacing="1">${safeTitle}</text>

  <!-- Awarded Recipient -->
  <text x="400" y="318" fill="#94a3b8" font-size="13" text-anchor="middle">AWARDED TO</text>
  <text x="400" y="344" fill="url(#accentGrad)" font-size="18" font-weight="700" text-anchor="middle" letter-spacing="1">${safeRecipient}</text>

  <!-- Divider Line -->
  <line x1="220" y1="365" x2="580" y2="365" stroke="#334155" stroke-width="1" />

  <!-- Summary Description -->
  <text x="400" y="392" fill="#cbd5e1" font-size="12" text-anchor="middle">Completed all required forensic investigations and defensive criteria.</text>
  <text x="400" y="412" fill="#94a3b8" font-size="11" text-anchor="middle">Verified client-side via CyberAntigravity Interactive Laboratory.</text>

  <!-- Bottom Footer Metadata -->
  <text x="50" y="475" fill="#64748b" font-size="11">DATE: <tspan fill="#e2e8f0" font-weight="700">${safeDate}</tspan></text>
  <text x="400" y="475" fill="#94a3b8" font-size="9" text-anchor="middle">MOTIVATIONAL EDUCATIONAL BADGE • NOT AN ACCREDITED CERTIFICATION</text>
  <text x="750" y="475" fill="#64748b" font-size="11" text-anchor="end">STATUS: <tspan fill="#10b981" font-weight="700">UNLOCKED (SIMULATION)</tspan></text>
</svg>`;
}

/**
 * Downloads the badge as an SVG vector file.
 */
export function downloadBadgeAsSvg(badge: ForensicBadge, recipientName: string = 'Cyber Defender'): void {
  if (typeof window === 'undefined') return;

  const svgContent = generateBadgeSvg(badge, recipientName);
  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `CyberAntigravity-${badge.id}-Badge.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Renders the SVG onto a high-DPI canvas and exports as a PNG file.
 */
export function downloadBadgeAsPng(
  badge: ForensicBadge,
  recipientName: string = 'Cyber Defender',
  onFallback?: () => void
): void {
  if (typeof window === 'undefined') return;

  try {
    const svgContent = generateBadgeSvg(badge, recipientName);
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        // Render at 2x resolution (1600x1040) for crisp retina display
        canvas.width = 1600;
        canvas.height = 1040;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          URL.revokeObjectURL(url);
          downloadBadgeAsSvg(badge, recipientName);
          return;
        }

        ctx.drawImage(img, 0, 0, 1600, 1040);
        URL.revokeObjectURL(url);

        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = `CyberAntigravity-${badge.id}-Badge.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch {
        URL.revokeObjectURL(url);
        // Fallback to SVG if canvas security or export throws
        if (onFallback) onFallback();
        downloadBadgeAsSvg(badge, recipientName);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      if (onFallback) onFallback();
      downloadBadgeAsSvg(badge, recipientName);
    };

    img.src = url;
  } catch {
    downloadBadgeAsSvg(badge, recipientName);
  }
}
