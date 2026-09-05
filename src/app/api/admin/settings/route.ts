import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import { getSiteSettings, updateSiteSettings } from "@/lib/services/settings";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { isRecord, isSameOriginRequest, InvalidRequestBodyError, RequestBodyLimitError, readJsonBody } from "@/lib/security/request";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const settings = await getSiteSettings();
  return NextResponse.json({ success: true, settings }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!isSameOriginRequest(req)) {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await readJsonBody<unknown>(req, 64 * 1024);
    if (!isRecord(body)) {
      return NextResponse.json({ success: false, error: "Dữ liệu cài đặt không hợp lệ." }, { status: 400 });
    }
    const result = await updateSiteSettings(body);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    // Invalidate site-settings cache and refresh public layout
    try {
      revalidateTag("site-settings");
      revalidatePath("/", "layout");
    } catch (cacheErr) {
      console.warn("Revalidation warning:", cacheErr);
    }

    return NextResponse.json({
      success: true,
      message: result.warning || "Đã lưu cài đặt website thành công!",
      warning: result.warning,
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof RequestBodyLimitError) {
      return NextResponse.json({ success: false, error: "Dữ liệu gửi lên quá lớn." }, { status: 413 });
    }
    if (err instanceof InvalidRequestBodyError) {
      return NextResponse.json({ success: false, error: "Dữ liệu JSON không hợp lệ." }, { status: 400 });
    }
    console.error("[Admin Settings API] POST failed:", err instanceof Error ? err.message : "Unknown error");
    return NextResponse.json({ success: false, error: "Không thể lưu cài đặt website." }, { status: 500 });
  }
}
