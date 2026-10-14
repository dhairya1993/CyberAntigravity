/**
 * Utility functions for Google Analytics 4 (GA4) & Google Tag Manager (GTM)
 * Safe for SSR and client-side execution.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Push custom event directly to window.dataLayer
 */
export function pushDataLayer(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    timestamp: Date.now(),
    ...params,
  });
}

/**
 * Track custom user interactions (e.g. tool usage, quiz completion, learning progress)
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number,
  customParams?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...customParams,
    });
  }

  // Also push to dataLayer for GTM trigger support
  pushDataLayer(action, {
    category,
    label,
    value,
    ...customParams,
  });
}
