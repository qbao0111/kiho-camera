/**
 * ============================================================================
 * KIHO CAMERA - GOOGLE APPS SCRIPT WEBHOOK FOR RENTAL REQUESTS / LEADS
 * ============================================================================
 *
 * HƯỚNG DẪN CÀI ĐẶT:
 * 1. Mở Google Sheets mới (Đặt tên: "Kiho Camera - Danh Sách Yêu Cầu Thuê").
 * 2. Đổi tên sheet đầu tiên thành: "Rental Requests".
 * 3. Vào Tiện ích mở rộng (Extensions) -> Apps Script.
 * 4. Dán toàn bộ đoạn code này vào file Code.gs.
 * 5. Cài đặt Script Properties (Cài đặt dự án -> Thuộc tính tập lệnh):
 *    - RENTAL_REQUEST_WEBHOOK_SECRET: mã bí mật lấy từ Admin Kiho Camera (ví dụ: kiho_sec_...)
 *    (LƯU Ý: Email nhận thông báo được điều khiển 100% từ Admin Kiho Camera mà không cần sửa code).
 * 6. Bấm Triển khai (Deploy) -> Tùy chọn triển khai mới (New deployment):
 *    - Loại: Ứng dụng web (Web App)
 *    - Thực thi dưới dạng: Tôi (Me)
 *    - Ai có quyền truy cập: Bất kỳ ai (Anyone)
 * 7. Sao chép URL Web App và dán vào Admin Kiho Camera -> Tích hợp -> Google Sheets.
 */

function doPost(e) {
  try {
    // 1. Kiểm tra dữ liệu đầu vào
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({ success: false, code: "INVALID_PAYLOAD", error: "Empty request body" });
    }

    var data = JSON.parse(e.postData.contents);

    // 2. Xác thực Shared Secret (Bảo mật webhook)
    var scriptProperties = PropertiesService.getScriptProperties();
    var expectedSecret = scriptProperties.getProperty("RENTAL_REQUEST_WEBHOOK_SECRET");
    
    if (!expectedSecret || data.secret !== expectedSecret) {
      return createJsonResponse({ success: false, code: "INVALID_SECRET", error: "Mã bảo mật secret không khớp." });
    }

    // 3. Mở Google Spreadsheet & Sheet "Rental Requests"
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("Rental Requests");

    if (!sheet) {
      sheet = spreadsheet.insertSheet("Rental Requests");
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

    // 4. Xử lý Connection Test từ Admin
    if (data.type === "connection_test") {
      return createJsonResponse({
        success: true,
        message: "Kết nối thành công tới Google Sheets!",
        spreadsheetName: spreadsheet.getName(),
        sheetName: sheet.getName(),
        testedAt: Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss")
      });
    }

    // 5. Lấy Email nhận thông báo từ Server Payload (Admin là Single Source of Truth)
    var notificationEmail = (data.notificationEmail || "").trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!notificationEmail || !emailRegex.test(notificationEmail)) {
      return createJsonResponse({
        success: false,
        code: "INVALID_NOTIFICATION_EMAIL",
        error: "Email nhận thông báo (" + notificationEmail + ") không hợp lệ."
      });
    }

    // 6. Xử lý Lead thuê máy
    var timestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
    var customerName = data.customerName || "Khách thuê";
    var phone = data.phone || "";
    var equipmentName = data.equipmentName || "Chưa chọn dòng máy";
    var rentalDate = data.rentalDate || "";
    var returnDate = data.returnDate || "";
    var note = data.note || "";
    var source = data.source || "Website";
    var status = data.status || "Mới";

    // Format ngày hiển thị dd/MM/yyyy
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

    // Ghi hàng mới vào Google Sheet
    var sheetSaved = false;
    try {
      sheet.appendRow([
        timestamp,
        sanitizeSheetCell(customerName),
        "'" + sanitizeSheetCell(phone), // Giữ số 0 đầu và chặn công thức
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

    // 7. Gửi Email thông báo tức thì cho Kiho Camera
    var isTest = data.isTest ? "[TEST TỪ ADMIN] " : "";
    var emailSubject = isTest + "📸 Lead mới — " + equipmentName + " — " + customerName;
    var safeCustomerName = escapeHtml(customerName);
    var safePhone = escapeHtml(phone);
    var safeEquipmentName = escapeHtml(equipmentName);
    var safeNote = escapeHtml(note);
    var safeSource = escapeHtml(source);

    var emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #faf8f4; border: 1px solid #e8e2d7; border-radius: 16px; padding: 24px; color: #171716;">
        <div style="text-align: center; border-bottom: 1px solid #e8e2d7; padding-bottom: 16px; margin-bottom: 20px;">
          <span style="font-size: 11px; font-weight: bold; color: #b45309; text-transform: uppercase; letter-spacing: 1px;">KIHO CAMERA · ĐỒNG HỚI</span>
          <h2 style="margin: 6px 0 0 0; font-size: 20px; font-weight: 900;">${data.isTest ? "YÊU CẦU THỬ NGHIỆM TỪ ADMIN" : "YÊU CẦU THUÊ MÁY MỚI"}</h2>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #78716c; width: 130px;">Họ tên khách:</td>
            <td style="padding: 8px 0; font-weight: bold; font-size: 15px; color: #171716;">${safeCustomerName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Số điện thoại:</td>
            <td style="padding: 8px 0; font-weight: bold; font-size: 18px;">
              <a href="tel:${safePhone}" style="color: #b45309; text-decoration: none;">📞 ${safePhone}</a>
              <a href="https://zalo.me/${safePhone}" target="_blank" style="margin-left: 10px; font-size: 12px; color: #0284c7; text-decoration: none;">[Mở Zalo]</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Dòng máy chọn:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #171716; text-transform: uppercase;">📷 ${safeEquipmentName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Lịch thuê:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #171716;">${rentalDateVn} &rarr; ${returnDateVn}</td>
          </tr>
          ${note ? `
          <tr>
            <td style="padding: 8px 0; color: #78716c; vertical-align: top;">Ghi chú của khách:</td>
            <td style="padding: 8px 0; color: #44403c; font-style: italic;">"${safeNote}"</td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Thời gian gửi:</td>
            <td style="padding: 8px 0; color: #78716c; font-size: 12px;">${timestamp} (${safeSource})</td>
          </tr>
        </table>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e8e2d7; text-align: center;">
          <a href="tel:${safePhone}" style="display: inline-block; background: #171716; color: #ffffff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 13px;">
            GỌI LẠI CHO KHÁCH NGAY
          </a>
        </div>
      </div>
    `;

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

  } catch (error) {
    return createJsonResponse({ success: false, code: "UNKNOWN_ERROR", error: "Apps Script gặp lỗi không xác định." });
  }
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
