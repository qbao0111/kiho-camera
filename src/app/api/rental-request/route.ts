import { NextRequest, NextResponse } from "next/server";
import {
  getIntegrationSettings,
  getDecryptedWebhookSecret,
} from "@/lib/services/integrations";
import {
  getActiveEquipmentForRental,
  saveRentalRequest,
  updateRentalIntegrationStatus,
} from "@/lib/services/rental-requests";
import { checkRentalRequestRateLimit } from "@/lib/rate-limit";
import { getClientIp, isRecord, isSameOriginRequest, InvalidRequestBodyError, RequestBodyLimitError, readJsonBody } from "@/lib/security/request";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const VIETNAMESE_PHONE = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function isValidIsoDate(value: string) {
  if (!ISO_DATE.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function todayInHoChiMinh() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

async function recordIntegrationStatus(
  id: string,
  status: "sent" | "failed" | "disabled",
  errorMessage?: string
) {
  try {
    await updateRentalIntegrationStatus(id, status, errorMessage);
  } catch (error) {
    console.error(
      "[RentalRequest] Failed to update delivery status:",
      error instanceof Error ? error.message : "Unknown error"
    );
  }
}

export async function POST(req: NextRequest) {
  if (!isSameOriginRequest(req)) {
    return NextResponse.json(
      { success: false, error: "Yêu cầu không hợp lệ." },
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
      { success: false, error: "Dữ liệu gửi lên không hợp lệ." },
      { status, headers: { "Cache-Control": "no-store" } }
    );
  }

  if (typeof body.hp_website === "string" && body.hp_website.trim()) {
    return NextResponse.json(
      { success: true, message: "OK" },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }

  if (
    typeof body.customerName !== "string" ||
    typeof body.phone !== "string" ||
    typeof body.rentalDate !== "string" ||
    typeof body.returnDate !== "string" ||
    (body.note !== undefined && typeof body.note !== "string") ||
    (body.source !== undefined && typeof body.source !== "string") ||
    (body.equipmentId !== undefined && body.equipmentId !== null && typeof body.equipmentId !== "string")
  ) {
    return NextResponse.json(
      { success: false, error: "Dá»¯ liá»‡u yÃªu cáº§u khÃ´ng há»£p lá»‡." },
      { status: 400 }
    );
  }

  const customerName = body.customerName
    .trim()
    .replace(/\s+/g, " ");
  const phone = body.phone.replace(/[\s.-]/g, "");
  const rentalDate = body.rentalDate;
  const returnDate = body.returnDate;
  const note = (body.note || "").trim();
  const source = (body.source || "website").trim().slice(0, 100);
  const equipmentId = (body.equipmentId || "").trim() || null;

  if (equipmentId && equipmentId.length > 64) {
    return NextResponse.json(
      { success: false, error: "Thiết bị được chọn không hợp lệ." },
      { status: 400 }
    );
  }

  if (customerName.length < 2 || customerName.length > 100 || /[\u0000-\u001f\u007f\u2028\u2029]/.test(customerName)) {
    return NextResponse.json(
      { success: false, error: "Vui lòng nhập họ và tên từ 2 đến 100 ký tự." },
      { status: 400 }
    );
  }
  if (!VIETNAMESE_PHONE.test(phone)) {
    return NextResponse.json(
      { success: false, error: "Kiho cần số điện thoại Việt Nam hợp lệ để liên hệ bạn nha." },
      { status: 400 }
    );
  }
  if (!isValidIsoDate(rentalDate) || !isValidIsoDate(returnDate)) {
    return NextResponse.json(
      { success: false, error: "Vui lòng chọn ngày thuê và ngày trả hợp lệ." },
      { status: 400 }
    );
  }
  if (rentalDate < todayInHoChiMinh()) {
    return NextResponse.json(
      { success: false, error: "Ngày nhận máy không thể là ngày đã qua." },
      { status: 400 }
    );
  }
  if (returnDate < rentalDate) {
    return NextResponse.json(
      { success: false, error: "Ngày trả không thể trước ngày nhận máy." },
      { status: 400 }
    );
  }
  if (note.length > 500 || /[\u0000-\u001f\u007f\u2028\u2029]/.test(note) || /[\u0000-\u001f\u007f\u2028\u2029]/.test(source)) {
    return NextResponse.json(
      { success: false, error: "Ghi chú không được vượt quá 500 ký tự." },
      { status: 400 }
    );
  }

  try {
    if (!(await checkRentalRequestRateLimit(getClientIp(req), { scope: "rental" }))) {
      return NextResponse.json(
        { success: false, error: "Bạn gửi hơi nhanh. Vui lòng thử lại sau 10 phút nha." },
        { status: 429, headers: { "Retry-After": "600" } }
      );
    }

    let equipmentName = "Chưa biết — nhờ Kiho tư vấn";
    let equipmentBrand: string | null = null;
    if (equipmentId) {
      const equipment = await getActiveEquipmentForRental(equipmentId);
      if (!equipment) {
        return NextResponse.json(
          { success: false, error: "Thiết bị đã chọn không tồn tại hoặc đang ngừng cho thuê." },
          { status: 400 }
        );
      }
      equipmentName = equipment.name;
      equipmentBrand = equipment.brand;
    }

    const lead = await saveRentalRequest({
      customerName,
      phone,
      equipmentId,
      equipmentName,
      equipmentBrand,
      rentalDate,
      returnDate,
      note,
      source,
    });

    try {
      const integration = await getIntegrationSettings();
      if (!integration.enabled || !integration.apps_script_url) {
        await recordIntegrationStatus(lead.id, "disabled");
      } else {
        const secret = await getDecryptedWebhookSecret();
        const submittedAt = new Intl.DateTimeFormat("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
          dateStyle: "short",
          timeStyle: "medium",
        }).format(new Date(lead.submittedAt));

        const response = await fetch(integration.apps_script_url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret,
            timestamp: submittedAt,
            customerName,
            phone,
            equipmentName,
            rentalDate,
            returnDate,
            note,
            source,
            status: "Mới",
            notificationEmail: integration.notification_email,
          }),
          signal: AbortSignal.timeout(8000),
        });

        const result = await response.json().catch(() => null);
        if (!response.ok || !result?.success) {
          throw new Error(`Apps Script delivery failed with HTTP ${response.status}.`);
        }
        await recordIntegrationStatus(lead.id, "sent");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Integration delivery failed.";
      console.error("[RentalRequest] Integration delivery failed:", message);
      await recordIntegrationStatus(lead.id, "failed", message);
    }

    return NextResponse.json({
      success: true,
      message: "Yêu cầu đã được gửi thành công!",
      data: {
        id: lead.id,
        customerName,
        equipmentName,
        rentalDate,
        returnDate,
      },
    }, { headers: { "Cache-Control": "no-store, max-age=0" } });
  } catch (error) {
    console.error(
      "[RentalRequest] Request failed:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { success: false, error: "Hệ thống chưa lưu được yêu cầu. Bạn vui lòng thử lại sau nha." },
      { status: 503 }
    );
  }
}
