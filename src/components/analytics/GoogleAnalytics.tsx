'use client';

import React, { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * GoogleAnalytics SPA Navigation Tracker
 * 
 * The primary Google tag (gtag.js) script is statically loaded in <head>
 * inside RootLayout for 100% Google Tag Test Installation compliance.
 * 
 * This component listens for client-side route transitions and updates
 * Google Analytics with real-time page views, while preventing duplicate
 * pageview events on initial page load.
 */
function AnalyticsNavigationTracker({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousUrl = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // Skip initial mount: the static <head> script already dispatched the initial pageview
    if (previousUrl.current === null) {
      previousUrl.current = url;
      return;
    }

    // Only dispatch on actual SPA client-side route transitions
    if (previousUrl.current !== url) {
      previousUrl.current = url;
      if (typeof window !== 'undefined' && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('config', gaId, {
          page_path: url,
        });
      }
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

