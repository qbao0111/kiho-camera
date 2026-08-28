# KIHO CAMERA — DỊCH VỤ CHO THUÊ MÁY ẢNH TẠI QUẢNG BÌNH

Website chính thức của **Kiho Camera** — Dịch vụ cho thuê máy ảnh du lịch tại TP. Đồng Hới, Quảng Bình.

- **Website chính thức**: [https://kihocamera.com](https://kihocamera.com)
- **Địa chỉ**: 48 Ngô Quyền, TP. Đồng Hới, Tỉnh Quảng Bình
- **Hotline / Zalo**: 0387 274 669
- **Instagram**: [@thuemayanhqbb](https://www.instagram.com/thuemayanhqbb/)

---

## 🌟 1. Phạm vi kinh doanh & Dịch vụ

- **Chuyên cho thuê máy ảnh**: 12 dòng máy du lịch chọn lọc thuộc 3 thương hiệu chính hãng (**Canon, Fujifilm, Sony**).
- **Trọn bộ phụ kiện đi kèm**: Mỗi máy thuê luôn đi kèm 2 pin, sạc đôi/dây sạc, thẻ nhớ tốc độ cao, túi chống sốc và đầu đọc thẻ OTG.
- **Thủ tục gọn nhẹ**: Không yêu cầu cọc tiền máy — xác minh nhanh chóng qua ảnh CCCD gắn chip hoặc định danh VNeID khi nhận máy.
- **Kênh chuyển đổi khách hàng**: Form gửi yêu cầu thuê máy trực tiếp trên website kết hợp tư vấn trực tiếp qua Facebook Messenger.

---

## 🚀 2. Kiến trúc công nghệ (Tech Stack)

- **Frontend & Backend**: Next.js 14+ (App Router, Server Components & Server Actions, TypeScript)
- **Styling**: Tailwind CSS + Lucide Icons + Framer Motion
- **Database & Auth**: Supabase PostgreSQL (Row Level Security RLS, Server-side Auth, Storage)
- **Lead Capture & Notifications**:
  - Form đặt thuê máy bảo vệ bằng Rate Limiting lưu DB và Honeypot chống spam.
  - Tích hợp bảo mật 2 chiều qua Google Apps Script Webhook để tự động đẩy lead vào **Google Sheets** và gửi **Email thông báo tức thì**.
- **Hosting & Infrastructure**:
  - **Vercel**: Serverless Edge / Node.js runtime
  - **Cloudflare**: Quản lý DNS & SSL/TLS Full (Strict) cho tên miền `kihocamera.com`

---

## 📁 3. Cấu trúc thư mục

```text
kiho-camera/
├── src/
│   ├── app/
│   │   ├── (public)/                       # Layout & các trang công khai
│   │   │   ├── page.tsx                    # Trang chủ (Hero, Bảng giá, Featured, Use-cases, Form thuê máy, Quy trình)
│   │   │   ├── thiet-bi/
│   │   │   │   ├── page.tsx                # Danh mục 12 dòng máy ảnh (Lọc theo hãng, tìm kiếm, sắp xếp)
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx            # Chi tiết máy ảnh (Gallery, Thông số, Dual-CTA, Ảnh thực tế)
│   │   │   ├── huong-dan-thue/             # Hướng dẫn quy trình 3 bước & FAQ thủ tục
│   │   │   ├── lien-he/                    # Thông tin liên hệ, hotline & địa chỉ 48 Ngô Quyền
│   │   │   └── feedback/                   # Lưu trữ feedback (noindex robots)
│   │   ├── admin/                          # Cổng quản trị phân quyền Supabase Auth
│   │   │   ├── login/                      # Trang đăng nhập quản trị
│   │   │   └── (dashboard)/                # Quản lý thiết bị, cấu hình Google Sheets & cài đặt
│   │   ├── api/                            # Next.js API Routes (rental-request, admin integrations)
│   │   ├── sitemap.ts                      # Dynamic XML Sitemap cho SEO
│   │   └── robots.ts                       # Cấu hình robots.txt
│   ├── components/
│   │   ├── public/                         # Header, Footer, Slider, ProductCard, RentalForm, Lightbox...
│   │   └── admin/                          # Form quản trị thiết bị, sidebar, bảng dữ liệu
│   ├── lib/
│   │   ├── supabase/                       # Supabase client & server-side helpers
│   │   ├── services/                       # Data fetching layer (Equipment, Settings, Feedback)
│   │   ├── integrations/                   # Mã hóa và xử lý Google Sheets webhook
│   │   └── mock-data.ts                    # Dữ liệu fallback chuẩn 12 máy ảnh
│   └── types/                              # TypeScript database interfaces
├── supabase/
│   ├── schema.sql                          # Schema PostgreSQL, Tables, Indexes, RPC & RLS Policies
│   └── seed.sql                            # Dữ liệu seed 12 dòng máy ảnh chuẩn
├── docs/                                   # Hướng dẫn kỹ thuật (Google Sheets integration...)
├── .env.example                            # Mẫu biến môi trường
└── package.json
```

---

## 🛠️ 4. Biến môi trường (Environment Variables)

Các biến môi trường bắt buộc cấu hình trên Vercel Production:

```env
# URL website production
NEXT_PUBLIC_SITE_URL=https://kihocamera.com

# Supabase Credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Server-only encryption key cho Google Sheets Webhook Secret
INTEGRATION_ENCRYPTION_KEY=your-32-byte-base64-encryption-key

# Production safety flags
ALLOW_LOCAL_DATA_FALLBACK=false
ALLOW_INSECURE_DEV_ENCRYPTION_FALLBACK=false
```

> **Bảo mật**: Tuyệt đối không commit file `.env.local` hoặc để lộ `SUPABASE_SERVICE_ROLE_KEY` và `INTEGRATION_ENCRYPTION_KEY`.

---

## 🔒 5. Bảo mật & Vận hành Production

1. **Row Level Security (RLS)**: Bật trên toàn bộ các bảng trong Supabase. Khách truy cập chỉ có quyền `SELECT` thiết bị đang hoạt động (`is_active = true`).
2. **API Authorization**: Tất cả các route trong `/api/admin/*` bắt buộc xác thực phiên đăng nhập admin qua server-side Supabase Auth.
3. **Mã hóa cấu hình**: Webhook secret của Google Apps Script được mã hóa bằng thuật toán `AES-256-GCM` trước khi lưu vào database.
4. **Rate Limiting**: Form đặt thuê máy giới hạn số lượt gửi theo IP và thời gian qua PostgreSQL RPC function `check_rental_request_rate_limit`.
