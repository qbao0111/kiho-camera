import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { createAdminClient } from "@/lib/supabase/admin";
import { isLocalDataFallbackEnabled } from "@/lib/environment";
import {
  encryptSecret,
  decryptSecret,
  generateSecureWebhookSecret,
} from "@/lib/encryption";

const SETTINGS_FILE = path.join(
  process.cwd(),
  "src",
  "data",
  "integration-settings.json"
);

export interface GoogleSheetsIntegrationConfig {
  provider: "google_sheets";
  enabled: boolean;
  google_sheet_id: string;
  google_sheet_name: string;
  notification_email: string;
  apps_script_url: string;
  encrypted_webhook_secret?: string;
  last_tested_at?: string;
  last_test_status?: "success" | "error" | "untested";
  last_test_error?: string;
  updated_at?: string;
}

const DEFAULT_SETTINGS: GoogleSheetsIntegrationConfig = {
  provider: "google_sheets",
  enabled: false,
  google_sheet_id: "",
  google_sheet_name: "Rental Requests",
  notification_email: "kihocameradonghoi@gmail.com",
  apps_script_url: "",
  last_test_status: "untested",
  updated_at: new Date().toISOString(),
};

/**
 * Read integration settings from Supabase. Local JSON is opt-in development only.
 */
export async function getIntegrationSettings(): Promise<GoogleSheetsIntegrationConfig> {
  const supabase = createAdminClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("integration_settings")
      .select("*")
      .eq("provider", "google_sheets")
      .maybeSingle();

    if (error) {
      throw new Error("Unable to read integration settings from Supabase.");
    }

    return data
      ? { ...DEFAULT_SETTINGS, ...data, enabled: Boolean(data.enabled) }
      : { ...DEFAULT_SETTINGS };
  }

  if (isLocalDataFallbackEnabled()) {
    if (existsSync(SETTINGS_FILE)) {
      const content = await readFile(SETTINGS_FILE, "utf-8");
      const parsed = JSON.parse(content) as GoogleSheetsIntegrationConfig;
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
        enabled: Boolean(parsed.enabled),
      };
    }

    return { ...DEFAULT_SETTINGS };
  }

  throw new Error("Supabase integration settings storage is not configured.");
}

/**
 * Save integration settings to Supabase. Local JSON is opt-in development only.
 */
export async function saveIntegrationSettings(
  settings: Partial<GoogleSheetsIntegrationConfig>
): Promise<{ success: boolean; data?: GoogleSheetsIntegrationConfig; error?: string }> {
  try {
    const current = await getIntegrationSettings();

    const updated: GoogleSheetsIntegrationConfig = {
      ...current,
      ...settings,
      provider: "google_sheets",
      updated_at: new Date().toISOString(),
    };

    const supabase = createAdminClient();
    if (supabase) {
      const { error } = await supabase
        .from("integration_settings")
        .upsert(updated, { onConflict: "provider" });

      if (error) {
        throw new Error("Unable to save integration settings to Supabase.");
      }
      return { success: true, data: updated };
    }

    if (isLocalDataFallbackEnabled()) {
      const dir = path.dirname(SETTINGS_FILE);
      await mkdir(dir, { recursive: true });
      await writeFile(SETTINGS_FILE, JSON.stringify(updated, null, 2), "utf-8");
      return { success: true, data: updated };
    }

    throw new Error("Supabase integration settings storage is not configured.");
  } catch (err) {
    console.error(
      "[Integrations] Failed to save settings:",
      err instanceof Error ? err.message : "Unknown error"
    );
    return { success: false, error: "Không thể lưu cấu hình tích hợp." };
  }
}

export function isValidAppsScriptUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "script.google.com" &&
      url.pathname.startsWith("/macros/s/") &&
      url.pathname.endsWith("/exec")
    );
  } catch {
    return false;
  }
}

/**
 * Get decrypted plain-text secret for authorized internal execution
 */
export async function getDecryptedWebhookSecret(): Promise<string> {
  const settings = await getIntegrationSettings();
  if (!settings.encrypted_webhook_secret) {
    const newSecret = generateSecureWebhookSecret();
    const encrypted = encryptSecret(newSecret);
    await saveIntegrationSettings({ encrypted_webhook_secret: encrypted });
    return newSecret;
  }

  return decryptSecret(settings.encrypted_webhook_secret);
}

/**
 * Generate Google Apps Script Source Code with dynamic parameters
 * Note: Admin configuration is the single source of truth for notification_email!
 */
export function generateAppsScriptCode(params: {
  sheetId?: string;
  sheetName?: string;
}): string {
  const sheetName = JSON.stringify(params.sheetName || "Rental Requests");
  const sheetId = JSON.stringify(params.sheetId || "");

  return `/**
 * ============================================================================
 * KIHO CAMERA - GOOGLE APPS SCRIPT WEBHOOK FOR RENTAL REQUESTS & LEADS
 * ============================================================================
 * 
 * HƯỚNG DẪN CÀI ĐẶT:
 * 1. Mở Google Sheets của bạn.
 * 2. Vào Tiện ích mở rộng (Extensions) -> Apps Script.
 * 3. Xóa code cũ và dán toàn bộ đoạn mã này vào.
 * 4. Vào Cài đặt dự án (Bánh răng) -> Thuộc tính tập lệnh (Script Properties) -> Thêm:
 *    - RENTAL_REQUEST_WEBHOOK_SECRET = "Dán secret từ Admin Kiho Camera"
 *    (Lưu ý: Email nhận thông báo được điều khiển 100% từ Admin Kiho Camera)
 * 5. Bấm Triển khai (Deploy) -> Tùy chọn triển khai mới (New deployment):
 *    - Loại: Ứng dụng web (Web App)
 *    - Thực thi dưới dạng: Tôi (Me)
 *    - Ai có quyền truy cập: Bất kỳ ai (Anyone)
 * 6. Copy URL Web App dán vào Admin Kiho Camera.
 */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({ success: false, code: "INVALID_PAYLOAD", error: "Empty request body" });
    }

    var data = JSON.parse(e.postData.contents);
    var scriptProperties = PropertiesService.getScriptProperties();
    var expectedSecret = scriptProperties.getProperty("RENTAL_REQUEST_WEBHOOK_SECRET");

    // 1. Xác thực Shared Secret (Bắt buộc xác thực trước khi làm bất kỳ thao tác nào)
    if (!expectedSecret || data.secret !== expectedSecret) {
      return createJsonResponse({ success: false, code: "INVALID_SECRET", error: "Mã bảo mật secret không khớp." });
    }

    // 2. Mở Spreadsheet & Sheet
    var spreadsheet;
    var targetSheetId = ${sheetId};
    if (targetSheetId && targetSheetId.trim() !== "") {
      try {
        spreadsheet = SpreadsheetApp.openById(targetSheetId.trim());
      } catch (err) {
        spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      }
    } else {
      spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    }

    if (!spreadsheet) {
      return createJsonResponse({ success: false, code: "SPREADSHEET_ERROR", error: "Không thể mở Google Spreadsheet (Kiểm tra lại Sheet ID)." });
    }

    var sheetName = ${sheetName} || "Rental Requests";
    var sheet = spreadsheet.getSheetByName(sheetName);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
    }

    // Đảm bảo hàng Header có sẵn
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Thời gian",
        "Họ tên",
        "Số điện thoại",
        "Dòng máy",
        "Ngày thuê",
        "Ngày trả",
        "Ghi chú",
        "Nguồn",
        "Trạng thái"
      ]);
      sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#f0eae1");
    }

    // 3. Xử lý Connection Test từ Admin (Không gửi mail, không ghi dòng)
    if (data.type === "connection_test") {
      return createJsonResponse({
        success: true,
        message: "Kết nối thành công tới Google Sheets!",
        spreadsheetName: spreadsheet.getName(),
        sheetName: sheet.getName(),
        testedAt: Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss")
      });
    }

    // 4. Lấy Email nhận thông báo từ Server Payload (Admin là Single Source of Truth)
    var notificationEmail = (data.notificationEmail || "").trim();
    var emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!notificationEmail || !emailRegex.test(notificationEmail)) {
      return createJsonResponse({
        success: false,
        code: "INVALID_NOTIFICATION_EMAIL",
        error: "Email nhận thông báo (" + notificationEmail + ") không hợp lệ."
      });
    }

    // 5. Xử lý Lead thuê máy thực tế
    var timestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
    var customerName = data.customerName || "Khách thuê";
    var phone = data.phone || "";
    var equipmentName = data.equipmentName || "Chưa chọn dòng máy";
    var rentalDate = data.rentalDate || "";
    var returnDate = data.returnDate || "";
    var note = data.note || "";
    var source = data.source || "Website";
    var status = data.status || "Mới";

    function formatVnDate(dStr) {
      if (!dStr) return "";
      var parts = dStr.split("-");
      if (parts.length === 3) return parts[2] + "/" + parts[1] + "/" + parts[0];
      return dStr;
    }

    function sanitizeSheetCell(value) {
      var text = String(value == null ? "" : value);
      return /^[=+\-@]/.test(text) ? "'" + text : text;
    }

    function escapeHtml(value) {
      return String(value == null ? "" : value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    var rentalDateVn = formatVnDate(rentalDate);
    var returnDateVn = formatVnDate(returnDate);

    // Ghi hàng mới vào Sheet
    var sheetSaved = false;
    try {
      sheet.appendRow([
        timestamp,
        sanitizeSheetCell(customerName),
        "'" + sanitizeSheetCell(phone),
        sanitizeSheetCell(equipmentName),
        rentalDateVn,
        returnDateVn,
        sanitizeSheetCell(note),
        sanitizeSheetCell(source),
        status
      ]);
      sheetSaved = true;
    } catch (sheetErr) {
      return createJsonResponse({
        success: false,
        code: "SHEET_APPEND_ERROR",
        error: "Không thể ghi dữ liệu vào Google Sheet."
      });
    }

    // 6. Gửi Email thông báo tức thì tới email được cấu hình trong Admin
    var isTest = data.isTest ? "[TEST TỪ ADMIN] " : "";
    var emailSubject = isTest + "📸 Lead mới — " + equipmentName + " — " + customerName;
    var safeCustomerName = escapeHtml(customerName);
    var safePhone = escapeHtml(phone);
    var safeEquipmentName = escapeHtml(equipmentName);
    var safeNote = escapeHtml(note);
    var safeSource = escapeHtml(source);

    var emailHtml = \`
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #faf8f4; border: 1px solid #e8e2d7; border-radius: 16px; padding: 24px; color: #171716;">
        <div style="text-align: center; border-bottom: 1px solid #e8e2d7; padding-bottom: 16px; margin-bottom: 20px;">
          <span style="font-size: 11px; font-weight: bold; color: #b45309; text-transform: uppercase; letter-spacing: 1px;">KIHO CAMERA · ĐỒNG HỚI</span>
          <h2 style="margin: 6px 0 0 0; font-size: 20px; font-weight: 900;">\${data.isTest ? "YÊU CẦU THỬ NGHIỆM TỪ ADMIN" : "YÊU CẦU THUÊ MÁY MỚI"}</h2>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #78716c; width: 130px;">Họ tên khách:</td>
            <td style="padding: 8px 0; font-weight: bold; font-size: 15px; color: #171716;">\${safeCustomerName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Số điện thoại:</td>
            <td style="padding: 8px 0; font-weight: bold; font-size: 18px;">
              <a href="tel:\${safePhone}" style="color: #b45309; text-decoration: none;">📞 \${safePhone}</a>
              <a href="https://zalo.me/\${safePhone}" target="_blank" style="margin-left: 10px; font-size: 12px; color: #0284c7; text-decoration: none;">[Mở Zalo]</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Dòng máy chọn:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #171716; text-transform: uppercase;">📷 \${safeEquipmentName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Lịch thuê:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #171716;">\${rentalDateVn} &rarr; \${returnDateVn}</td>
          </tr>
          \${note ? \`
          <tr>
            <td style="padding: 8px 0; color: #78716c; vertical-align: top;">Ghi chú của khách:</td>
            <td style="padding: 8px 0; color: #44403c; font-style: italic;">"\${safeNote}"</td>
          </tr>
          \` : ""}
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Thời gian gửi:</td>
            <td style="padding: 8px 0; color: #78716c; font-size: 12px;">\${timestamp} (\${safeSource})</td>
          </tr>
        </table>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e8e2d7; text-align: center;">
          <a href="tel:\${safePhone}" style="display: inline-block; background: #171716; color: #ffffff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 13px;">
            GỌI LẠI CHO KHÁCH NGAY
          </a>
        </div>
      </div>
    \`;

    var emailSent = false;
    try {
      MailApp.sendEmail({
        to: notificationEmail,
        subject: emailSubject,
        htmlBody: emailHtml
      });
      emailSent = true;
    } catch (mailErr) {
      return createJsonResponse({
        success: false,
        partialSuccess: true,
        sheetSaved: true,
        emailSent: false,
        code: "EMAIL_ERROR",
        error: "Đã lưu vào Sheet nhưng gửi email thất bại.",
        notificationEmail: notificationEmail
      });
    }

    return createJsonResponse({
      success: true,
      sheetSaved: true,
      emailSent: true,
      notificationEmail: notificationEmail,
      message: "Lead đã được lưu vào Google Sheet và gửi email thành công!"
    });

  } catch (err) {
    return createJsonResponse({ success: false, code: "UNKNOWN_ERROR", error: "Apps Script gặp lỗi không xác định." });
  }
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
`;
}

/**
 * Execute a Connection Test to Google Apps Script (No rows added, no emails sent)
 */
export async function testAppsScriptConnection(
  appsScriptUrl: string,
  secret: string
): Promise<{ success: boolean; spreadsheetName?: string; sheetName?: string; message?: string; error?: string }> {
  if (!isValidAppsScriptUrl(appsScriptUrl)) {
    return { success: false, error: "Vui lòng nhập URL Web App hợp lệ (bắt đầu bằng https://script.google.com/...)." };
  }

  try {
    const payload = {
      type: "connection_test",
      secret: secret,
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(9000),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Apps Script phản hồi mã lỗi HTTP ${response.status}. Vui lòng kiểm tra quyền truy cập (Chọn 'Anyone').`,
      };
    }

    const data = await response.json();

    if (!data.success) {
      const errorMap: Record<string, string> = {
        INVALID_SECRET: "Mã bí mật Webhook Secret không khớp với cài đặt trong Apps Script.",
        SPREADSHEET_ERROR: "Không thể mở Google Spreadsheet (Kiểm tra lại Sheet ID hoặc quyền chia sẻ).",
        SHEET_NOT_FOUND: "Không tìm thấy Sheet được yêu cầu.",
      };
      return {
        success: false,
        error: errorMap[data.code] || data.error || "Kết nối thất bại.",
      };
    }

    return {
      success: true,
      spreadsheetName: data.spreadsheetName || "Google Spreadsheet",
      sheetName: data.sheetName || "Rental Requests",
      message: "Kết nối thành công tới Google Sheets!",
    };
  } catch (err: any) {
    if (err.name === "TimeoutError" || err.message?.includes("timeout")) {
      return { success: false, error: "Hết thời gian chờ phản hồi từ Google Apps Script (Timeout 9s)." };
    }
    return { success: false, error: err?.message || "Không thể gửi yêu cầu kiểm tra kết nối." };
  }
}

/**
 * Send a Test Lead to Google Apps Script (Appends row + sends test email to notificationEmail)
 */
export async function sendTestLeadToAppsScript(
  appsScriptUrl: string,
  secret: string,
  notificationEmail: string
): Promise<{
  success: boolean;
  message?: string;
  notificationEmail?: string;
  sheetSaved?: boolean;
  emailSent?: boolean;
  error?: string;
}> {
  if (!isValidAppsScriptUrl(appsScriptUrl)) {
    return { success: false, error: "Vui lòng nhập URL Web App hợp lệ." };
  }

  const cleanEmail = (notificationEmail || "").trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    return {
      success: false,
      error: `Email nhận thông báo ("${cleanEmail}") không hợp lệ. Vui lòng nhập email chính xác.`,
    };
  }

  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);

    const formatYMD = (d: Date) => d.toISOString().split("T")[0];

    const testPayload = {
      secret,
      isTest: true,
      customerName: "Khách test Kiho (Admin)",
      phone: "0900000000",
      equipmentName: "Canon EOS R50",
      rentalDate: formatYMD(tomorrow),
      returnDate: formatYMD(dayAfter),
      note: "Yêu cầu kiểm tra lead thực tế gửi từ Admin Kiho Camera",
      source: "Admin Test",
      status: "Mới",
      notificationEmail: cleanEmail, // Injected by server as Single Source of Truth
    };

    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testPayload),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return { success: false, error: `Apps Script trả về lỗi HTTP ${response.status}.` };
    }

    const data = await response.json();
    if (!data.success) {
      return {
        success: false,
        notificationEmail: cleanEmail,
        sheetSaved: data.sheetSaved,
        emailSent: false,
        error: data.error || "Gửi lead thử nghiệm thất bại.",
      };
    }

    return {
      success: true,
      sheetSaved: true,
      emailSent: true,
      notificationEmail: data.notificationEmail || cleanEmail,
      message: `Đã gửi lead thử thành công! Dòng mới đã được thêm vào Sheet và email thông báo đã gửi tới "${data.notificationEmail || cleanEmail}".`,
    };
  } catch (err: any) {
    return { success: false, error: err?.message || "Lỗi khi gửi lead thử nghiệm." };
  }
}
