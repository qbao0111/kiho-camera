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

function getReferrerHostname(): string {
  if (typeof document === "undefined" || !document.referrer) return "direct";
  try {
    const url = new URL(document.referrer);
    if (typeof window !== "undefined" && url.hostname === window.location.hostname) {
      return "direct";
    }
    return url.hostname || "direct";
  } catch {
    return "direct";
  }
}

function getUtmParams(): { utmSource?: string; utmMedium?: string; utmCampaign?: string } {
  if (typeof window === "undefined") return {};
  try {
    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
    };
  } catch {
    return {};
  }
}

function getCoarseDeviceType(): "mobile" | "tablet" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width <= 1024) return "tablet";
  return "desktop";
}

/**
 * Non-blocking, fire-and-forget notification to Kiho server to record
 * intentional Messenger/Zalo clicks in Google Sheets & send an email.
 */
export function sendContactClickNotification(params: {
  channel: "messenger" | "zalo";
  placement: string;
  cameraSlug?: string;
  cameraName?: string;
}): void {
  if (typeof window === "undefined") return;

  try {
    const utm = getUtmParams();
    const payload = {
      channel: params.channel,
      placement: params.placement,
      pagePath: window.location.pathname,
      cameraSlug: params.cameraSlug,
      cameraName: params.cameraName,
      referrer: getReferrerHostname(),
      utmSource: utm.utmSource,
      utmMedium: utm.utmMedium,
      utmCampaign: utm.utmCampaign,
      deviceType: getCoarseDeviceType(),
    };

    fetch("/api/contact-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Fail silently to never block customer interactions
    });
  } catch {
    // Fail silently
  }
}

/**
 * Safely dispatches a GA4 conversion event and operational notifications.
 * Never throws errors and never blocks navigation if GA or backend is absent.
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

    // 3. Operational Sheets + Email Notification for Messenger and Zalo Clicks
    if (name === "contact_messenger") {
      sendContactClickNotification({
        channel: "messenger",
        placement: params.placement,
        cameraSlug: params.camera_slug,
        cameraName: params.camera_name,
      });
    } else if (name === "contact_zalo") {
      sendContactClickNotification({
        channel: "zalo",
        placement: params.placement,
        cameraSlug: params.camera_slug,
        cameraName: params.camera_name,
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
