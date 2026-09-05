import { NextRequest, NextResponse } from "next/server";
import {
  getIntegrationSettings,
  getDecryptedWebhookSecret,
  sendContactClickToAppsScript,
  ContactClickPayload,
} from "@/lib/services/integrations";
import { checkRentalRequestRateLimit } from "@/lib/rate-limit";
import { getClientIp, isRecord, isSameOriginRequest, InvalidRequestBodyError, RequestBodyLimitError, readJsonBody } from "@/lib/security/request";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ALLOWED_CHANNELS = new Set(["messenger", "zalo"]);
const LOCAL_PATH_REGEX = /^\/[a-zA-Z0-9/_.-]*$/;
const SLUG_REGEX = /^[a-z0-9-]+$/;

function sanitizeString(value: unknown, maxLength = 100): string | undefined {
  if (typeof value !== "string") return undefined;
  const clean = value.trim().slice(0, maxLength);
  return clean && !/[\u0000-\u001f\u007f\u2028\u2029]/.test(clean) ? clean : undefined;
}

export async function POST(req: NextRequest) {
  if (!isSameOriginRequest(req)) {
    return NextResponse.json(
      { success: false, error: "YÃªu cáº§u khÃ´ng há»£p lá»‡." },
      { status: 403, headers: { "Cache-Control": "no-store" } }
    );
  }

  let body: Record<string, unknown>;
  try {
    const parsed = await readJsonBody<unknown>(req);
    if (!isRecord(parsed)) throw new InvalidRequestBodyError();
    body = parsed;
  } catch (error) {
    const status = error instanceof RequestBodyLimitError ? 413 : 400;
    return NextResponse.json(
      { success: false, error: "Dữ liệu JSON không hợp lệ." },
      { status, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    if (!(await checkRentalRequestRateLimit(getClientIp(req), { scope: "contact", maxRequests: 30 }))) {
      return NextResponse.json(
        { success: false, error: "Bạn gửi hơi nhanh. Vui lòng thử lại sau." },
        { status: 429, headers: { "Retry-After": "600", "Cache-Control": "no-store" } }
      );
    }
  } catch (error) {
    console.error("[ContactClick] Rate limiter failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { success: false, error: "Hệ thống chưa sẵn sàng. Vui lòng thử lại sau." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  // 1. Channel Validation (Only messenger or zalo)
  const channel = typeof body.channel === "string" ? body.channel.toLowerCase().trim() : "";
  if (!ALLOWED_CHANNELS.has(channel)) {
    return NextResponse.json(
      { success: false, error: "Kênh liên hệ không hợp lệ (chỉ chấp nhận 'messenger' hoặc 'zalo')." },
      { status: 400 }
    );
  }

  // 2. Placement Validation
  const placement = sanitizeString(body.placement, 100);
  if (!placement) {
    return NextResponse.json(
      { success: false, error: "Vị trí nút (placement) là bắt buộc." },
      { status: 400 }
    );
  }

  // 3. Page Path Validation (Must be a safe local path)
  let pagePath = sanitizeString(body.pagePath, 200) || "/";
  if (!pagePath.startsWith("/") || !LOCAL_PATH_REGEX.test(pagePath)) {
    pagePath = "/";
  }

  // 4. Optional Context Validation (Strictly Non-PII)
  const rawCameraSlug = sanitizeString(body.cameraSlug, 100);
  const cameraSlug = rawCameraSlug && SLUG_REGEX.test(rawCameraSlug) ? rawCameraSlug : undefined;
  const cameraName = sanitizeString(body.cameraName, 100);
  const referrer = sanitizeString(body.referrer, 100) || "direct";
  const utmSource = sanitizeString(body.utmSource, 100);
  const utmMedium = sanitizeString(body.utmMedium, 100);
  const utmCampaign = sanitizeString(body.utmCampaign, 100);

  const rawDevice = typeof body.deviceType === "string" ? body.deviceType.toLowerCase().trim() : "";
  const deviceType = rawDevice === "mobile" || rawDevice === "tablet" || rawDevice === "desktop"
    ? (rawDevice as "mobile" | "desktop" | "tablet")
    : undefined;

  const payload: ContactClickPayload = {
    channel: channel as "messenger" | "zalo",
    placement,
    pagePath,
    cameraSlug,
    cameraName,
    referrer,
    utmSource,
    utmMedium,
    utmCampaign,
    deviceType,
  };

  // 5. Forward asynchronously to Google Apps Script (Fail-safe)
  try {
    const integration = await getIntegrationSettings();
    if (integration.enabled && integration.apps_script_url) {
      const secret = await getDecryptedWebhookSecret();
      const result = await sendContactClickToAppsScript(
        integration.apps_script_url,
        secret,
        integration.notification_email,
        payload
      );

      if (!result.success) {
        console.warn("[ContactClick] Delivery warning:", result.error);
      }
    }
  } catch (err: any) {
    // Fail silently to never block client response
    console.error("[ContactClick] Background forward error:", err?.message || err);
  }

  return NextResponse.json({
    success: true,
    message: "Contact click recorded",
  }, { headers: { "Cache-Control": "no-store" } });
}
