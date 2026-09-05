import { NextRequest, NextResponse } from "next/server";
import {
  getIntegrationSettings,
  saveIntegrationSettings,
  getDecryptedWebhookSecret,
  generateAppsScriptCode,
  testAppsScriptConnection,
  sendTestLeadToAppsScript,
  isValidAppsScriptUrl,
  type GoogleSheetsIntegrationConfig,
} from "@/lib/services/integrations";
import { generateSecureWebhookSecret, encryptSecret } from "@/lib/encryption";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { isRecord, isSameOriginRequest, InvalidRequestBodyError, RequestBodyLimitError, readJsonBody } from "@/lib/security/request";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function unauthorized() {
  return NextResponse.json(
    { success: false, error: "Unauthorized" },
    { status: 401 }
  );
}

function toSafeSettings(settings: GoogleSheetsIntegrationConfig) {
  const { encrypted_webhook_secret: _secret, ...safeSettings } = settings;
  return safeSettings;
}

function validateConfigFields(email: string, sheetId: string, sheetName: string) {
  if (email.length > 254 || /[\u0000-\u001f\u007f\u2028\u2029]/.test(email) || email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Địa chỉ email nhận thông báo không hợp lệ.";
  }
  if (sheetId && !/^[A-Za-z0-9_-]{10,200}$/.test(sheetId)) {
    return "Google Sheet ID không hợp lệ.";
  }
  if (!sheetName || sheetName.length > 100 || /[\u0000-\u001f\u007f\u2028\u2029]/.test(sheetName)) {
    return "Tên sheet phải có từ 1 đến 100 ký tự.";
  }
  return null;
}

export async function GET(req: NextRequest) {
  if (!(await getAuthenticatedAdmin())) return unauthorized();

  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");

    // Revealing (or lazily generating) the webhook secret is a sensitive
    // operation. Keep it same-origin so a cross-site request cannot trigger
    // the side effect even though the response is protected by SOP.
    if (action === "reveal_secret" && !isSameOriginRequest(req)) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const settings = await getIntegrationSettings();

    if (action === "reveal_secret") {
      const plainSecret = await getDecryptedWebhookSecret();
      return NextResponse.json(
        { success: true, secret: plainSecret },
        { headers: { "Cache-Control": "no-store, max-age=0" } }
      );
    }

    if (action === "get_script") {
      const scriptCode = generateAppsScriptCode({
        sheetId: settings.google_sheet_id,
        sheetName: settings.google_sheet_name,
      });
      return NextResponse.json({ success: true, scriptCode });
    }

    const generatedScript = generateAppsScriptCode({
      sheetId: settings.google_sheet_id,
      sheetName: settings.google_sheet_name,
    });

    return NextResponse.json({
      success: true,
      data: {
        ...toSafeSettings(settings),
        masked_secret: "••••••••••••••••",
        generated_script: generatedScript,
      },
    });
  } catch (err) {
    if (err instanceof RequestBodyLimitError) {
      return NextResponse.json({ success: false, error: "Dữ liệu gửi lên quá lớn." }, { status: 413 });
    }
    if (err instanceof InvalidRequestBodyError) {
      return NextResponse.json({ success: false, error: "Dữ liệu JSON không hợp lệ." }, { status: 400 });
    }
    console.error(
      "[Admin Integration API] GET failed:",
      err instanceof Error ? err.message : "Unknown error"
    );
    return NextResponse.json(
      { success: false, error: "Lỗi lấy thông tin cấu hình." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!(await getAuthenticatedAdmin())) return unauthorized();

  if (!isSameOriginRequest(req)) {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await readJsonBody<unknown>(req, 64 * 1024);
    if (!isRecord(body)) throw new InvalidRequestBodyError();
    const { action } = body;
    if (typeof action !== "string") {
      return NextResponse.json({ success: false, error: "Action khÃ´ng há»£p lá»‡." }, { status: 400 });
    }

    const configStringFields = [
      "google_sheet_id",
      "google_sheet_name",
      "notification_email",
      "apps_script_url",
    ] as const;
    if (
      configStringFields.some((field) => body[field] !== undefined && typeof body[field] !== "string") ||
      (body.enabled !== undefined && typeof body.enabled !== "boolean")
    ) {
      return NextResponse.json({ success: false, error: "Dá»¯ liá»‡u cáº¥u hÃ¬nh khÃ´ng há»£p lá»‡." }, { status: 400 });
    }

    const currentSettings = await getIntegrationSettings();

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

      const configError = validateConfigFields(
        trimmedEmail,
        trimmedSheetId,
        trimmedSheetName
      );
      if (configError) {
        return NextResponse.json(
          { success: false, error: configError },
          { status: 400 }
        );
      }

      if (trimmedUrl && !isValidAppsScriptUrl(trimmedUrl)) {
        return NextResponse.json(
          { success: false, error: "Apps Script URL không hợp lệ." },
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
        data: saveResult.data ? toSafeSettings(saveResult.data) : undefined,
      });
    }

    // 2. Action: Generate New Webhook Secret
    if (action === "generate_secret") {
      const newSecret = generateSecureWebhookSecret();
      const encrypted = encryptSecret(newSecret);

      const saveResult = await saveIntegrationSettings({
        encrypted_webhook_secret: encrypted,
        last_test_status: "untested",
      });

      if (!saveResult.success) {
        return NextResponse.json(
          { success: false, error: saveResult.error },
          { status: 500 }
        );
      }

      const updatedScript = generateAppsScriptCode({
        sheetId: currentSettings.google_sheet_id,
        sheetName: currentSettings.google_sheet_name,
      });

      return NextResponse.json({
        success: true,
        message: "Đã tạo mã Webhook Secret mới!",
        secret: newSecret,
        masked_secret: `••••••••••••••••${newSecret.slice(-4)}`,
        generated_script: updatedScript,
      }, { headers: { "Cache-Control": "no-store, max-age=0" } });
    }

    // 3. Action: Test Connection (without inserting rows or sending emails)
    if (action === "test_connection") {
      const targetUrl = String(body.apps_script_url || currentSettings.apps_script_url || "").trim();
      const targetEmail = String(body.notification_email || currentSettings.notification_email || "").trim();
      const targetSheetId = String(body.google_sheet_id || currentSettings.google_sheet_id || "").trim();
      const targetSheetName = String(body.google_sheet_name || currentSettings.google_sheet_name || "Rental Requests").trim();
      const isEnabled = typeof body.enabled === "boolean" ? body.enabled : currentSettings.enabled;

      const configError = validateConfigFields(
        targetEmail,
        targetSheetId,
        targetSheetName
      );
      if (configError) {
        return NextResponse.json(
          { success: false, error: configError },
          { status: 400 }
        );
      }

      if (!targetUrl) {
        return NextResponse.json(
          { success: false, error: "Vui lòng nhập Apps Script Web App URL trước khi kiểm tra kết nối." },
          { status: 400 }
        );
      }

      if (!isValidAppsScriptUrl(targetUrl)) {
        return NextResponse.json(
          { success: false, error: "Apps Script URL không hợp lệ." },
          { status: 400 }
        );
      }

      const currentSecret = await getDecryptedWebhookSecret();
      const testResult = await testAppsScriptConnection(targetUrl, currentSecret);

      const timestamp = new Date().toISOString();
      const status = testResult.success ? "success" : "error";
      const errorMsg = testResult.success ? undefined : testResult.error;

      // Auto-persist all form values including email when testing connection
      const saveResult = await saveIntegrationSettings({
        enabled: isEnabled,
        google_sheet_id: targetSheetId,
        google_sheet_name: targetSheetName,
        notification_email: targetEmail || currentSettings.notification_email,
        apps_script_url: targetUrl,
        last_tested_at: timestamp,
        last_test_status: status,
        last_test_error: errorMsg,
      });

      if (!saveResult.success) {
        return NextResponse.json(
          { success: false, error: saveResult.error },
          { status: 500 }
        );
      }

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

      const configError = validateConfigFields(
        targetEmail,
        targetSheetId,
        targetSheetName
      );
      if (configError) {
        return NextResponse.json(
          { success: false, error: configError },
          { status: 400 }
        );
      }

      if (!targetUrl) {
        return NextResponse.json(
          { success: false, error: "Vui lòng nhập Apps Script Web App URL trước khi gửi lead thử." },
          { status: 400 }
        );
      }

      if (!isValidAppsScriptUrl(targetUrl)) {
        return NextResponse.json(
          { success: false, error: "Apps Script URL không hợp lệ." },
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
      const saveResult = await saveIntegrationSettings({
        enabled: isEnabled,
        google_sheet_id: targetSheetId,
        google_sheet_name: targetSheetName,
        notification_email: targetEmail,
        apps_script_url: targetUrl,
      });

      if (!saveResult.success) {
        return NextResponse.json(
          { success: false, error: saveResult.error },
          { status: 500 }
        );
      }

      const currentSecret = await getDecryptedWebhookSecret();
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
  } catch (err) {
    console.error(
      "[Admin Integration API] POST failed:",
      err instanceof Error ? err.message : "Unknown error"
    );
    return NextResponse.json(
      { success: false, error: "Lỗi xử lý yêu cầu." },
      { status: 500 }
    );
  }
}
