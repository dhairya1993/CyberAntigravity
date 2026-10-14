'use client';

import React, { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * GoogleAnalytics SPA Navigation Tracker
 * 
 * The primary Google tag (gtag.js) script is statically loaded in <head>
 * inside RootLayout for 100% Google Tag Test Installation compliance.
 * 
 * This component listens for client-side route transitions and updates
 * Google Analytics with real-time page views.
 */
function AnalyticsNavigationTracker({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    if (typeof window !== 'undefined' && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('config', gaId, {
        page_path: url,
      });
    }
  }, [pathname, searchParams, gaId]);

  return null;
}

export const GoogleAnalytics: React.FC = () => {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-C24569XYGB';

  return (
    <Suspense fallback={null}>
      <AnalyticsNavigationTracker gaId={gaId} />
    </Suspense>
  );
};

