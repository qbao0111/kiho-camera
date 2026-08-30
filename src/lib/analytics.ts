import { sendGAEvent } from "@next/third-parties/google";

export type GAEventName =
  | "contact_messenger"
  | "contact_zalo"
  | "contact_hotline"
  | "rental_request_open"
  | "rental_request_submit";

/**
 * Common event parameters for Kiho Camera GA4 conversions.
 * STRICT PRIVACY: NEVER include customer names, phone numbers, emails, CCCD, VNeID or free-form notes.
 */
export interface GAEventParams {
  placement: string;
  page_path?: string;
  camera_slug?: string;
  camera_name?: string;
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    dataLayer?: Object[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Safely dispatches a GA4 conversion event.
 * Never throws errors and never blocks navigation if GA is absent or blocked.
 */
export function trackEvent(name: GAEventName, params: GAEventParams): void {
  if (typeof window === "undefined") return;

  try {
    const payload = {
      ...params,
      page_path: params.page_path || window.location.pathname,
    };

    // 1. Try @next/third-parties sendGAEvent
    try {
      sendGAEvent("event", name, payload);
    } catch {
      // Fallback below
    }

    // 2. Direct gtag fallback
    if (typeof window.gtag === "function") {
      window.gtag("event", name, payload);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: name,
        ...payload,
      });
    }
  } catch (err) {
    // Fail silently in production to protect user interactions
    if (process.env.NODE_ENV === "development") {
      console.warn(`[GA4 Track Error] ${name}:`, err);
    }
  }
}

export function trackMessengerContact(params: GAEventParams): void {
  trackEvent("contact_messenger", params);
}

export function trackZaloContact(params: GAEventParams): void {
  trackEvent("contact_zalo", params);
}

export function trackHotlineContact(params: GAEventParams): void {
  trackEvent("contact_hotline", params);
}

export function trackRentalRequestOpen(params: GAEventParams): void {
  trackEvent("rental_request_open", params);
}

export function trackRentalRequestSubmit(params: GAEventParams): void {
  trackEvent("rental_request_submit", params);
}
