# Hướng Dẫn Cài Đặt Tích Hợp Google Sheets & Thông Báo Email Cho Kiho Camera

Tài liệu này hướng dẫn cách kết nối hệ thống **Lead / Yêu Cầu Thuê Máy** của website Kiho Camera trực tiếp vào **Google Sheets** và **tự động gửi email thông báo tức thì** cho nhân viên tư vấn.

---

## 1. Cơ Chế Hoạt Động (Admin là Nguồn Chân Lý Duy Nhất)

```
[Khách điền form trên website]
             ↓
[Next.js Server API: /api/rental-request]
(Đọc email nhận tin & secret từ Cấu hình Admin)
             ↓
[Google Apps Script Web App]
       ↙            ↘
[Ghi dòng mới vào        [Gửi Email thông báo tức thì
 Google Sheets]           tới Email cấu hình trong Admin]
```

- **Quản lý tập trung:** Địa chỉ email nhận thông báo được điều khiển 100% từ giao diện Admin Kiho (`/admin/integrations/google-sheets`). Thay đổi email trong Admin sẽ có hiệu lực ngay mà không cần sửa code hay triển khai lại Apps Script.
- **Bảo mật tuyệt đối:** Khách hàng không nhìn thấy Google Sheets hay Apps Script endpoint. Mã bảo mật webhook được mã hóa AES-256-GCM trên server.
- **Lưu bền vững trước:** Hệ thống lưu lead vào Supabase trước khi thử gửi sang Google Sheets. Nếu Apps Script tạm thời lỗi, lead vẫn còn trong `rental_requests` để admin xử lý.

---

## 2. Các Bước Cài Đặt

### Bước 1: Tạo Google Sheet
1. Mở [Google Sheets](https://sheets.new) và tạo một bảng tính mới.
2. Đổi tên bảng tính thành: `Kiho Camera - Danh Sách Yêu Cầu Thuê`.
3. Đổi tên trang tính đầu tiên thành: `Rental Requests`.
4. Copy `Sheet ID` từ đường link trên thanh địa chỉ trình duyệt:
   `https://docs.google.com/spreadsheets/d/`**`[SHEET_ID]`**`/edit`

---

### Bước 2: Dán Code Google Apps Script
1. Trên Google Sheets, nhấn menu **Tiện ích mở rộng** (Extensions) -> **Apps Script**.
2. Xóa hết code mặc định trong file `Code.gs` và dán toàn bộ mã nguồn được sinh trong trang **Admin Kiho Camera** (hoặc file [`src/data/google-apps-script.js`](file:///c:/Users/THIS%20PC/Desktop/Kiho/kiho-camera/src/data/google-apps-script.js)).
3. Nhấn nút **Lưu** (biểu tượng Save hoặc `Ctrl + S`).

---

### Bước 3: Cài Đặt Thuộc Tính Tập Lệnh (Script Properties)
1. Trong màn hình Apps Script, nhấn vào biểu tượng **Cài đặt dự án** (bánh răng bên trái).
2. Cuộn xuống phần **Thuộc tính tập lệnh** (Script Properties) -> bấm **Thêm thuộc tính tập lệnh**:
   - Tên (Property): `RENTAL_REQUEST_WEBHOOK_SECRET`
   - Giá trị (Value): Mã bí mật Webhook lấy từ Admin Kiho Camera (Ví dụ: `kiho_sec_...`).
3. Bấm **Lưu thuộc tính tập lệnh**.
*(Lưu ý: Bạn không cần cấu hình `NOTIFICATION_EMAIL` tại đây vì hệ thống tự động truyền email từ cấu hình Admin).*

---

### Bước 4: Triển Khai Dưới Dạng Web App
1. Nhấn nút **Triển khai** (Deploy) màu xanh ở góc trên bên phải -> chọn **Tùy chọn triển khai mới** (New deployment).
2. Chọn loại triển khai: **Ứng dụng web** (Web app).
3. Điền cấu hình:
   - Mô tả: `Kiho Camera Lead Webhook v1`
   - Thực thi dưới dạng (Execute as): **Tôi** (Me - email của bạn).
   - Ai có quyền truy cập (Who has access): **Bất kỳ ai** (Anyone).
4. Bấm **Triển khai** (Deploy).
5. (Nếu có popup yêu cầu cấp quyền truy cập tài khoản Google, chọn *Xem lại quyền* -> *Nâng cao* -> *Đi tới dự án (không an toàn)* -> *Cho phép*).
6. Sau khi triển khai xong, sao chép **URL ứng dụng web** (có dạng `https://script.google.com/macros/s/AKfycb.../exec`).

---

### Bước 5: Cấu Hình Trong Admin Kiho Camera
1. Mở trang quản trị: `http://localhost:3000/admin/integrations/google-sheets`.
2. Dán **Google Sheet ID**, **Apps Script Web App URL** và nhập **Email nhận thông báo**.
3. Bấm **Lưu tất cả cấu hình**.
4. Bấm **Kiểm tra kết nối** và **Gửi lead thử nghiệm** để xác nhận email thông báo được nhận chính xác!
