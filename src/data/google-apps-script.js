/**
 * ============================================================================
 * KIHO CAMERA - GOOGLE APPS SCRIPT WEBHOOK FOR RENTAL REQUESTS & CONTACT CLICKS
 * ============================================================================
 *
 * HƯỚNG DẪN CÀI ĐẶT / CẬP NHẬT:
 * 1. Mở Google Sheets của bạn ("Kiho Camera - Danh Sách Yêu Cầu Thuê").
 * 2. Vào Tiện ích mở rộng (Extensions) -> Apps Script.
 * 3. Xóa code cũ và dán toàn bộ đoạn code này vào file Code.gs.
 * 4. Vào Cài đặt dự án (Bánh răng) -> Thuộc tính tập lệnh (Script Properties):
 *    - RENTAL_REQUEST_WEBHOOK_SECRET = "Mã bí mật lấy từ Admin Kiho Camera"
 *    (LƯU Ý: Email nhận thông báo được điều khiển 100% từ Admin Kiho Camera mà không cần sửa code).
 * 5. Bấm Triển khai (Deploy) -> Quản lý các bản triển khai (Manage deployments):
 *    - Chọn bản triển khai Web App hiện tại -> bấm biểu tượng Chỉnh sửa (Edit / Bút chì)
 *    - Phiên bản (Version): Chọn "Phiên bản mới" (New version)
 *    - Bấm "Triển khai" (Deploy) để cập nhật.
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

    // Shared sanitization helpers
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

    // 3. Mở Google Spreadsheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      return createJsonResponse({ success: false, code: "SPREADSHEET_ERROR", error: "Không thể mở Google Spreadsheet." });
    }

    // 4. Xử lý Connection Test từ Admin
    if (data.type === "connection_test") {
      var testSheet = spreadsheet.getSheetByName("Rental Requests") || spreadsheet.getSheets()[0];
      return createJsonResponse({
        success: true,
        message: "Kết nối thành công tới Google Sheets!",
        spreadsheetName: spreadsheet.getName(),
        sheetName: testSheet ? testSheet.getName() : "Rental Requests",
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

    // ========================================================================
    // 6. XỬ LÝ SỰ KIỆN: KHÁCH BẤM MỞ MESSENGER / ZALO (Contact Click Intent)
    // ========================================================================
    if (data.type === "contact_click") {
      var clickSheetName = "Contact Clicks";
      var clickSheet = spreadsheet.getSheetByName(clickSheetName);
      if (!clickSheet) {
        clickSheet = spreadsheet.insertSheet(clickSheetName);
      }

      if (clickSheet.getLastRow() === 0) {
        clickSheet.appendRow([
          "Thời gian",
          "Kênh",
          "Vị trí nút",
          "Trang",
          "Dòng máy",
          "Nguồn giới thiệu",
          "UTM Source",
          "UTM Medium",
          "UTM Campaign"
        ]);
        clickSheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#f0eae1");
      }

      var clickTimestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
      var channelRaw = String(data.channel || "").toLowerCase();
      var channelDisplay = channelRaw === "zalo" ? "Zalo" : "Messenger";
      var placement = String(data.placement || "unknown");
      var pagePath = String(data.pagePath || "/");
      var cameraSlug = String(data.cameraSlug || "");
      var cameraName = String(data.cameraName || "");
      var referrer = String(data.referrer || "direct");
      var utmSource = String(data.utmSource || "");
      var utmMedium = String(data.utmMedium || "");
      var utmCampaign = String(data.utmCampaign || "");

      var clickSaved = false;
      try {
        clickSheet.appendRow([
          clickTimestamp,
          channelDisplay,
          sanitizeSheetCell(placement),
          sanitizeSheetCell(pagePath),
          sanitizeSheetCell(cameraName),
          sanitizeSheetCell(referrer),
          sanitizeSheetCell(utmSource),
          sanitizeSheetCell(utmMedium),
          sanitizeSheetCell(utmCampaign)
        ]);
        clickSaved = true;
      } catch (clickErr) {
        return createJsonResponse({
          success: false,
          code: "SHEET_APPEND_ERROR",
          error: "Không thể ghi click vào Google Sheet: " + clickErr.message
        });
      }

      // Gửi Email thông báo Click Intent
      var isTestClick = data.isTest ? "[TEST TỪ ADMIN] " : "";
      var emailSubject = isTestClick + "💬 Khách vừa bấm " + channelDisplay + (cameraName ? " — " + cameraName : " — Kiho Camera");
      var safeChannel = escapeHtml(channelDisplay);
      var safePlacement = escapeHtml(placement);
      var safePagePath = escapeHtml(pagePath);
      var safeCameraName = escapeHtml(cameraName);
      var safeReferrer = escapeHtml(referrer);
      var safeUtm = [utmSource, utmMedium, utmCampaign].filter(Boolean).map(escapeHtml).join(" / ");
      var fullPageUrl = "https://kihocamera.com" + (pagePath.indexOf("/") === 0 ? pagePath : "/" + pagePath);

      var clickEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #faf8f4; border: 1px solid #e8e2d7; border-radius: 16px; padding: 24px; color: #171716;">
          <div style="text-align: center; border-bottom: 1px solid #e8e2d7; padding-bottom: 16px; margin-bottom: 20px;">
            <span style="font-size: 11px; font-weight: bold; color: #0284c7; text-transform: uppercase; letter-spacing: 1px;">KIHO CAMERA · CONTACT INTENT</span>
            <h2 style="margin: 6px 0 0 0; font-size: 20px; font-weight: 900;">Khách vừa bấm mở ${safeChannel}</h2>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #78716c; width: 140px;">Kênh liên hệ:</td>
              <td style="padding: 8px 0; font-weight: bold; font-size: 15px; color: #0284c7;">${safeChannel}</td>
            </tr>
            ${cameraName ? `
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Dòng máy đang xem:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #171716; text-transform: uppercase;">📷 ${safeCameraName}</td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Trang thực hiện:</td>
              <td style="padding: 8px 0; color: #171716;">
                <a href="${escapeHtml(fullPageUrl)}" target="_blank" style="color: #0284c7; text-decoration: none;">${safePagePath} &nearr;</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Vị trí nút (CTA):</td>
              <td style="padding: 8px 0; font-family: monospace; font-size: 13px; color: #44403c;">${safePlacement}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Nguồn giới thiệu:</td>
              <td style="padding: 8px 0; color: #171716;">${safeReferrer}</td>
            </tr>
            ${safeUtm ? `
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Chiến dịch UTM:</td>
              <td style="padding: 8px 0; font-family: monospace; font-size: 13px; color: #171716;">${safeUtm}</td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Thời gian:</td>
              <td style="padding: 8px 0; color: #78716c; font-size: 12px;">${clickTimestamp}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 12px 16px; background: #f1f5f9; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 12px; color: #475569; line-height: 1.5;">
            ℹ️ <strong>Lưu ý:</strong> Đây là lượt bấm mở kênh liên hệ từ website, không đồng nghĩa khách đã gửi tin nhắn.
          </div>
        </div>
      `;

      var clickEmailSent = false;
      try {
        MailApp.sendEmail({
          to: notificationEmail,
          subject: emailSubject,
          htmlBody: clickEmailHtml
        });
        clickEmailSent = true;
      } catch (mailErr) {
        return createJsonResponse({
          success: false,
          partialSuccess: true,
          sheetSaved: true,
          emailSent: false,
          code: "EMAIL_ERROR",
          error: "Đã lưu vào Sheet Contact Clicks nhưng gửi email thất bại: " + mailErr.message,
          notificationEmail: notificationEmail
        });
      }

      return createJsonResponse({
        success: true,
        sheetSaved: true,
        emailSent: true,
        notificationEmail: notificationEmail,
        message: "Lượt bấm " + channelDisplay + " đã được ghi vào Sheet Contact Clicks và gửi email thành công!"
      });
    }

    // ========================================================================
    // 7. XỬ LÝ LEAD THUÊ MÁY (Rental Request Lead)
    // ========================================================================
    var sheet = spreadsheet.getSheetByName("Rental Requests");
    if (!sheet) {
      sheet = spreadsheet.insertSheet("Rental Requests");
    }

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

    var rentalDateVn = formatVnDate(rentalDate);
    var returnDateVn = formatVnDate(returnDate);

    // Ghi hàng mới vào Google Sheet
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

    // Gửi Email thông báo tức thì cho Kiho Camera
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
        error: "Đã lưu vào Sheet nhưng gửi email thất bại: " + mailErr.message,
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
    return createJsonResponse({ success: false, code: "UNKNOWN_ERROR", error: "Apps Script gặp lỗi không xác định: " + error.message });
  }
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
