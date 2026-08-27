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
 *    - NOTIFICATION_EMAIL: email của Kiho (ví dụ: kihocameradonghoi@gmail.com)
 *    - RENTAL_REQUEST_WEBHOOK_SECRET: một chuỗi bí mật bất kỳ (ví dụ: kiho_secret_lead_2026_xyz)
 * 6. Bấm Triển khai (Deploy) -> Tùy chọn triển khai mới (New deployment):
 *    - Loại: Ứng dụng web (Web App)
 *    - Thực thi dưới dạng: Tôi (Me)
 *    - Ai có quyền truy cập: Bất kỳ ai (Anyone)
 * 7. Sao chép URL Web App và dán vào file .env trên hosting / Vercel:
 *    GOOGLE_APPS_SCRIPT_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
 *    RENTAL_REQUEST_WEBHOOK_SECRET=kiho_secret_lead_2026_xyz
 */

function doPost(e) {
  try {
    // 1. Kiểm tra dữ liệu đầu vào
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: "Empty payload" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(e.postData.contents);

    // 2. Xác thực Shared Secret (Bảo mật webhook)
    var scriptProperties = PropertiesService.getScriptProperties();
    var expectedSecret = scriptProperties.getProperty("RENTAL_REQUEST_WEBHOOK_SECRET");
    
    if (expectedSecret && data.secret !== expectedSecret) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: "Unauthorized" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // 3. Mở Google Sheet "Rental Requests"
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("Rental Requests");

    if (!sheet) {
      sheet = spreadsheet.insertSheet("Rental Requests");
      // Tạo tiêu đề nếu sheet mới
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
      // Format header
      sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#f0eae1");
    }

    // Lấy thông tin lead
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

    var rentalDateVn = formatVnDate(rentalDate);
    var returnDateVn = formatVnDate(returnDate);

    // 4. Ghi hàng mới vào Google Sheet
    sheet.appendRow([
      timestamp,
      customerName,
      "'" + phone, // Thêm dấu ' để giữ số 0 đầu
      equipmentName,
      rentalDateVn,
      returnDateVn,
      note,
      source,
      status
    ]);

    // 5. Gửi Email thông báo tức thì cho Kiho Camera
    var notificationEmail = scriptProperties.getProperty("NOTIFICATION_EMAIL");

    if (notificationEmail) {
      var emailSubject = "📸 Lead mới — " + equipmentName + " — " + customerName;

      var emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #faf8f4; border: 1px solid #e8e2d7; border-radius: 16px; padding: 24px; color: #171716;">
          <div style="text-align: center; border-bottom: 1px solid #e8e2d7; padding-bottom: 16px; margin-bottom: 20px;">
            <span style="font-size: 11px; font-weight: bold; color: #b45309; text-transform: uppercase; letter-spacing: 1px;">KIHO CAMERA · ĐỒNG HỚI</span>
            <h2 style="margin: 6px 0 0 0; font-size: 20px; font-weight: 900;">YÊU CẦU THUÊ MÁY MỚI</h2>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #78716c; width: 130px;">Họ tên khách:</td>
              <td style="padding: 8px 0; font-weight: bold; font-size: 15px; color: #171716;">${customerName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Số điện thoại:</td>
              <td style="padding: 8px 0; font-weight: bold; font-size: 18px;">
                <a href="tel:${phone}" style="color: #b45309; text-decoration: none;">📞 ${phone}</a>
                <a href="https://zalo.me/${phone}" target="_blank" style="margin-left: 10px; font-size: 12px; color: #0284c7; text-decoration: none;">[Mở Zalo]</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Dòng máy chọn:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #171716; text-transform: uppercase;">📷 ${equipmentName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Lịch thuê:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #171716;">${rentalDateVn} &rarr; ${returnDateVn}</td>
            </tr>
            ${note ? `
            <tr>
              <td style="padding: 8px 0; color: #78716c; vertical-align: top;">Ghi chú của khách:</td>
              <td style="padding: 8px 0; color: #44403c; font-style: italic;">"${note}"</td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Thời gian gửi:</td>
              <td style="padding: 8px 0; color: #78716c; font-size: 12px;">${timestamp} (${source})</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e8e2d7; text-align: center;">
            <a href="tel:${phone}" style="display: inline-block; background: #171716; color: #ffffff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 13px;">
              GỌI LẠI CHO KHÁCH NGAY
            </a>
          </div>
        </div>
      `;

      MailApp.sendEmail({
        to: notificationEmail,
        subject: emailSubject,
        htmlBody: emailHtml
      });
    }

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Lead saved successfully" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
