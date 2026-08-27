import { NextRequest, NextResponse } from "next/server";
import { saveLocalRentalRequest, RentalRequestLead } from "@/lib/local-storage";
import {
  getIntegrationSettings,
  getDecryptedWebhookSecret,
} from "@/lib/services/integrations";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      customerName,
      phone,
      equipmentId,
      equipmentName,
      rentalDate,
      returnDate,
      note = "",
      source = "website",
      hp_website = "",
      // Note: We deliberately ignore any client-supplied notificationEmail for security
    } = body;

    // 1. Honeypot check (Bot protection)
    if (hp_website && hp_website.trim() !== "") {
      // Silently return success to confuse bots
      return NextResponse.json({ success: true, message: "OK" });
    }

    // 2. Server-side Validation
    const trimmedName = String(customerName || "").trim();
    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập họ và tên hợp lệ (tối thiểu 2 ký tự)." },
        { status: 400 }
      );
    }

    // Normalize phone number (remove spaces, dots, dashes)
    const rawPhone = String(phone || "").replace(/[\s.-]/g, "");
    const vietnamesePhoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    if (!vietnamesePhoneRegex.test(rawPhone)) {
      return NextResponse.json(
        { success: false, error: "Kiho cần số điện thoại hợp lệ (10 số) để liên hệ bạn nha." },
        { status: 400 }
      );
    }

    // Date validation
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(rentalDate) || !dateRegex.test(returnDate)) {
      return NextResponse.json(
        { success: false, error: "Vui lòng chọn ngày thuê và ngày trả hợp lệ." },
        { status: 400 }
      );
    }

    if (returnDate < rentalDate) {
      return NextResponse.json(
        { success: false, error: "Ngày trả không thể trước ngày nhận máy." },
        { status: 400 }
      );
    }

    const trimmedEquipment = String(equipmentName || "Chưa biết — nhờ Kiho tư vấn").trim();
    const trimmedNote = String(note || "").trim().slice(0, 500);

    // 3. Format Date & Time for Vietnam (GMT+7)
    const now = new Date();
    const formattedSubmittedAt = new Intl.DateTimeFormat("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(now);

    const leadData: RentalRequestLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      customerName: trimmedName,
      phone: rawPhone,
      equipmentId: equipmentId || undefined,
      equipmentName: trimmedEquipment,
      rentalDate,
      returnDate,
      note: trimmedNote,
      source,
      submittedAt: formattedSubmittedAt,
      status: "new",
    };

    // 4. Always save to local lead storage (Zero data loss)
    await saveLocalRentalRequest(leadData);

    // 5. Forward to Google Apps Script Webhook (Dynamic Settings with Env fallback)
    try {
      const integration = await getIntegrationSettings();
      let webhookUrl = "";
      let webhookSecret = "";
      let notificationEmail = "";

      if (integration.enabled && integration.apps_script_url?.startsWith("http")) {
        webhookUrl = integration.apps_script_url;
        webhookSecret = await getDecryptedWebhookSecret();
        notificationEmail = (integration.notification_email || "").trim();
      } else if (process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL?.startsWith("http")) {
        webhookUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
        webhookSecret = process.env.RENTAL_REQUEST_WEBHOOK_SECRET || "";
        notificationEmail = (integration.notification_email || process.env.NOTIFICATION_EMAIL || "").trim();
      }

      if (webhookUrl) {
        const gasPayload = {
          secret: webhookSecret,
          timestamp: formattedSubmittedAt,
          customerName: leadData.customerName,
          phone: leadData.phone,
          equipmentName: leadData.equipmentName,
          rentalDate: leadData.rentalDate,
          returnDate: leadData.returnDate,
          note: leadData.note || "",
          source: leadData.source || "Website",
          status: "Mới",
          notificationEmail: notificationEmail, // Injected dynamically from server configuration
        };

        console.log(`[RentalRequest] Forwarding lead to Google Apps Script (${webhookUrl.slice(0, 45)}...) with notificationEmail: "${notificationEmail}"`);

        const gasResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(gasPayload),
          signal: AbortSignal.timeout(8000),
        });

        if (!gasResponse.ok) {
          console.warn("[RentalRequest] Google Apps Script returned status:", gasResponse.status);
        } else {
          const gasResult = await gasResponse.json().catch(() => null);
          console.log("[RentalRequest] Google Apps Script response:", gasResult);
          if (gasResult && !gasResult.success) {
            console.warn("[RentalRequest] Google Apps Script returned warning/error:", gasResult);
          }
        }
      }
    } catch (gasErr) {
      console.error("[RentalRequest] Failed to forward to Google Apps Script:", gasErr);
      // We still return success to customer because lead is safely stored locally
    }

    return NextResponse.json({
      success: true,
      message: "Yêu cầu đã được gửi thành công!",
      data: {
        id: leadData.id,
        customerName: leadData.customerName,
        equipmentName: leadData.equipmentName,
        rentalDate: leadData.rentalDate,
        returnDate: leadData.returnDate,
      },
    });
  } catch (error) {
    console.error("[RentalRequest] Error handling request:", error);
    return NextResponse.json(
      { success: false, error: "Chưa gửi được yêu cầu. Bạn thử lại một lần nữa nha." },
      { status: 500 }
    );
  }
}
