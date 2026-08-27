import { NextRequest, NextResponse } from "next/server";
import {
  getIntegrationSettings,
  saveIntegrationSettings,
  getDecryptedWebhookSecret,
  generateAppsScriptCode,
  testAppsScriptConnection,
  sendTestLeadToAppsScript,
} from "@/lib/services/integrations";
import { generateSecureWebhookSecret, encryptSecret } from "@/lib/encryption";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");

    const settings = await getIntegrationSettings();
    const plainSecret = await getDecryptedWebhookSecret();

    if (action === "reveal_secret") {
      return NextResponse.json({ success: true, secret: plainSecret });
    }

    if (action === "get_script") {
      const scriptCode = generateAppsScriptCode({
        sheetId: settings.google_sheet_id,
        sheetName: settings.google_sheet_name,
        notificationEmail: settings.notification_email,
        secret: plainSecret,
      });
      return NextResponse.json({ success: true, scriptCode });
    }

    // Mask secret for normal view
    const maskedSecret = plainSecret ? `••••••••••••••••${plainSecret.slice(-4)}` : "••••••••••••••••";

    const generatedScript = generateAppsScriptCode({
      sheetId: settings.google_sheet_id,
      sheetName: settings.google_sheet_name,
      notificationEmail: settings.notification_email,
      secret: plainSecret,
    });

    return NextResponse.json({
      success: true,
      data: {
        ...settings,
        masked_secret: maskedSecret,
        generated_script: generatedScript,
      },
    });
  } catch (err: any) {
    console.error("[Admin Integration API] Error GET:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi lấy thông tin cấu hình." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    const currentSettings = await getIntegrationSettings();
    let currentSecret = await getDecryptedWebhookSecret();

    // 1. Action: Save Configuration
    if (action === "save") {
      const {
        enabled,
        google_sheet_id,
        google_sheet_name,
        notification_email,
        apps_script_url,
      } = body;

      const trimmedUrl = String(apps_script_url || "").trim();
      const trimmedEmail = String(notification_email || "").trim();
      const trimmedSheetId = String(google_sheet_id || "").trim();
      const trimmedSheetName = String(google_sheet_name || "Rental Requests").trim();

      // Validate email if provided
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (trimmedEmail && !emailRegex.test(trimmedEmail)) {
        return NextResponse.json(
          { success: false, error: "Địa chỉ email nhận thông báo không hợp lệ." },
          { status: 400 }
        );
      }

      const saveResult = await saveIntegrationSettings({
        enabled: typeof enabled === "boolean" ? enabled : currentSettings.enabled,
        google_sheet_id: trimmedSheetId,
        google_sheet_name: trimmedSheetName,
        notification_email: trimmedEmail,
        apps_script_url: trimmedUrl,
      });

      if (!saveResult.success) {
        return NextResponse.json(
          { success: false, error: saveResult.error },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Đã lưu cấu hình Google Sheets thành công!",
        data: saveResult.data,
      });
    }

    // 2. Action: Generate New Webhook Secret
    if (action === "generate_secret") {
      const newSecret = generateSecureWebhookSecret();
      const encrypted = encryptSecret(newSecret);

      await saveIntegrationSettings({
        encrypted_webhook_secret: encrypted,
        last_test_status: "untested",
      });

      const updatedScript = generateAppsScriptCode({
        sheetId: currentSettings.google_sheet_id,
        sheetName: currentSettings.google_sheet_name,
        notificationEmail: currentSettings.notification_email,
        secret: newSecret,
      });

      return NextResponse.json({
        success: true,
        message: "Đã tạo mã Webhook Secret mới!",
        secret: newSecret,
        masked_secret: `••••••••••••••••${newSecret.slice(-4)}`,
        generated_script: updatedScript,
      });
    }

    // 3. Action: Test Connection (without inserting rows or sending emails)
    if (action === "test_connection") {
      const targetUrl = String(body.apps_script_url || currentSettings.apps_script_url || "").trim();
      const targetEmail = String(body.notification_email || currentSettings.notification_email || "").trim();
      const targetSheetId = String(body.google_sheet_id || currentSettings.google_sheet_id || "").trim();
      const targetSheetName = String(body.google_sheet_name || currentSettings.google_sheet_name || "Rental Requests").trim();
      const isEnabled = typeof body.enabled === "boolean" ? body.enabled : currentSettings.enabled;

      if (!targetUrl) {
        return NextResponse.json(
          { success: false, error: "Vui lòng nhập Apps Script Web App URL trước khi kiểm tra kết nối." },
          { status: 400 }
        );
      }

      const testResult = await testAppsScriptConnection(targetUrl, currentSecret);

      const timestamp = new Date().toISOString();
      const status = testResult.success ? "success" : "error";
      const errorMsg = testResult.success ? undefined : testResult.error;

      // Auto-persist all form values including email when testing connection
      await saveIntegrationSettings({
        enabled: isEnabled,
        google_sheet_id: targetSheetId,
        google_sheet_name: targetSheetName,
        notification_email: targetEmail || currentSettings.notification_email,
        apps_script_url: targetUrl,
        last_tested_at: timestamp,
        last_test_status: status,
        last_test_error: errorMsg,
      });

      if (!testResult.success) {
        return NextResponse.json(
          {
            success: false,
            error: testResult.error,
            last_tested_at: timestamp,
            last_test_status: "error",
          },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: testResult.message || "Kết nối Google Sheets thành công!",
        spreadsheetName: testResult.spreadsheetName,
        sheetName: testResult.sheetName,
        last_tested_at: timestamp,
        last_test_status: "success",
      });
    }

    // 4. Action: Send Test Lead (appends row + sends email to notification_email from Admin)
    if (action === "send_test_lead") {
      const targetUrl = String(body.apps_script_url || currentSettings.apps_script_url || "").trim();
      const targetEmail = String(body.notification_email || currentSettings.notification_email || "").trim();
      const targetSheetId = String(body.google_sheet_id || currentSettings.google_sheet_id || "").trim();
      const targetSheetName = String(body.google_sheet_name || currentSettings.google_sheet_name || "Rental Requests").trim();
      const isEnabled = typeof body.enabled === "boolean" ? body.enabled : currentSettings.enabled;

      if (!targetUrl) {
        return NextResponse.json(
          { success: false, error: "Vui lòng nhập Apps Script Web App URL trước khi gửi lead thử." },
          { status: 400 }
        );
      }

      if (!targetEmail) {
        return NextResponse.json(
          { success: false, error: "Vui lòng cấu hình email nhận thông báo trước khi gửi lead thử." },
          { status: 400 }
        );
      }

      // Automatically persist the tested email and all config to DB/file immediately
      await saveIntegrationSettings({
        enabled: isEnabled,
        google_sheet_id: targetSheetId,
        google_sheet_name: targetSheetName,
        notification_email: targetEmail,
        apps_script_url: targetUrl,
      });

      const leadResult = await sendTestLeadToAppsScript(targetUrl, currentSecret, targetEmail);

      if (!leadResult.success) {
        return NextResponse.json(
          {
            success: false,
            error: leadResult.error,
            sheetSaved: leadResult.sheetSaved,
            emailSent: leadResult.emailSent,
            notificationEmail: targetEmail,
          },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: leadResult.message,
        notificationEmail: leadResult.notificationEmail || targetEmail,
        sheetName: targetSheetName,
      });
    }

    return NextResponse.json(
      { success: false, error: "Action không hợp lệ." },
      { status: 400 }
    );
  } catch (err: any) {
    console.error("[Admin Integration API] Error POST:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi xử lý yêu cầu." },
      { status: 500 }
    );
  }
}
