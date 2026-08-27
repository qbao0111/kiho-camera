# Hướng Dẫn Cài Đặt Tích Hợp Google Sheets & Thông Báo Email Cho Kiho Camera

Tài liệu này hướng dẫn cách kết nối hệ thống **Lead / Yêu Cầu Thuê Máy** của website Kiho Camera trực tiếp vào **Google Sheets** và **tự động gửi email thông báo tức thì** cho nhân viên tư vấn.

---

## 1. Cơ Chế Hoạt Động

```
[Khách điền form trên website]
             ↓
[Next.js Server API: /api/rental-request]
(Lưu dự phòng vào src/data/rental-requests.json)
             ↓
[Google Apps Script Webhook]
       ↙            ↘
[Ghi dòng mới vào        [Gửi Email thông báo tức thì
 Google Sheets]           kèm link gọi / Zalo]
```

- **Bảo mật tuyệt đối:** Khách hàng không nhìn thấy Google Sheets hay Apps Script endpoint.
- **Không phụ thuộc vào Google Forms:** Giao diện hoàn toàn đồng bộ với thiết kế thương hiệu Kiho Camera.
- **Không mất dữ liệu (Zero Data Loss):** Hệ thống luôn lưu một bản sao cục bộ trên server trước khi đẩy sang Google Sheets.

---

## 2. Các Bước Cài Đặt

### Bước 1: Tạo Google Sheet
1. Mở [Google Sheets](https://sheets.new) và tạo một bảng tính mới.
2. Đổi tên bảng tính thành: `Kiho Camera - Danh Sách Yêu Cầu Thuê`.
3. Đổi tên trang tính đầu tiên thành: `Rental Requests`.
4. (Tùy chọn) Điền hàng đầu tiên các cột:
   - Cột A: `Thời gian`
   - Cột B: `Họ tên`
   - Cột C: `Số điện thoại`
   - Cột D: `Dòng máy`
   - Cột E: `Ngày thuê`
   - Cột F: `Ngày trả`
   - Cột G: `Ghi chú`
   - Cột H: `Nguồn`
   - Cột I: `Trạng thái`

---

### Bước 2: Dán Code Google Apps Script
1. Trên Google Sheets, nhấn menu **Tiện ích mở rộng** (Extensions) -> **Apps Script**.
2. Xóa hết code mặc định trong file `Code.gs` và dán toàn bộ nội dung từ file [`src/data/google-apps-script.js`](file:///c:/Users/THIS%20PC/Desktop/Kiho/kiho-camera/src/data/google-apps-script.js) vào.
3. Nhấn nút **Lưu** (biểu tượng Save hoặc `Ctrl + S`).

---

### Bước 3: Cài Đặt Thuộc Tính Tập Lệnh (Script Properties)
1. Trong màn hình Apps Script, nhấn vào biểu tượng **Cài đặt dự án** (bánh răng bên trái).
2. Cuộn xuống phần **Thuộc tính tập lệnh** (Script Properties) -> bấm **Thêm thuộc tính tập lệnh**:
   - Thuộc tính 1:
     - Tên (Property): `NOTIFICATION_EMAIL`
     - Giá trị (Value): Email nhận thông báo của Kiho (Ví dụ: `kihocameradonghoi@gmail.com`).
   - Thuộc tính 2:
     - Tên (Property): `RENTAL_REQUEST_WEBHOOK_SECRET`
     - Giá trị (Value): Chuỗi ký tự bí mật bất kỳ do bạn tự đặt (Ví dụ: `kiho_lead_secret_2026_xyz`).
3. Bấm **Lưu thuộc tính tập lệnh**.

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

### Bước 5: Cấu Hình Biến Môi Trường Trên Website
Thêm 2 biến môi trường vào file `.env.local` (khi chạy ở máy cá nhân) hoặc cài đặt trên Dashboard của hosting (Vercel / Cloudflare Pages / Railway):

```bash
GOOGLE_APPS_SCRIPT_WEBHOOK_URL="https://script.google.com/macros/s/AKfycb.../exec"
RENTAL_REQUEST_WEBHOOK_SECRET="kiho_lead_secret_2026_xyz"
```

---

## 3. Kiểm Tra (Testing)
1. Mở trang chủ hoặc trang chi tiết một máy bất kỳ (ví dụ `/thiet-bi/canon-eos-r50`).
2. Điền form yêu cầu thuê và bấm **Gửi yêu cầu thuê**.
3. Kiểm tra Google Sheets: Dòng mới sẽ xuất hiện ngay lập tức trong sheet `Rental Requests`.
4. Kiểm tra Email: Hòm thư `NOTIFICATION_EMAIL` sẽ nhận được email thông báo có định dạng đẹp mắt kèm số điện thoại có thể bấm gọi ngay.
