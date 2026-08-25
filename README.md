# KIHO CAMERA - CHO THUÊ MÁY ẢNH QUẢNG BÌNH

Website production-ready dành cho dịch vụ **Cho thuê máy ảnh, lens và thiết bị quay chụp tại Đồng Hới, Quảng Bình**.

---

## 🌟 1. Giới thiệu dự án

- **Mục tiêu**: Giới thiệu thiết bị, bảng giá công khai, xem feedback, tối ưu Local SEO Quảng Bình để khách hàng dễ dàng tìm thấy trên Google và kết nối tư vấn/chốt đơn qua **Facebook Messenger / Fanpage**.
- **Không có booking rườm rà**: Quy trình chốt đơn diễn ra 100% qua Messenger và tư vấn thực tế.
- **Admin Portal**: Quản lý toàn bộ thiết bị, bảng giá, danh mục, feedback và nội dung website.

---

## 🚀 2. Tech Stack

- **Frontend & Backend**: Next.js 14+ (App Router, Server Components & Actions, TypeScript)
- **Styling**: Tailwind CSS + Lucide Icons
- **Database**: Supabase PostgreSQL (Kèm RLS bảo mật & Storage)
- **SEO & Social**: Next.js Metadata API, JSON-LD Structured Data (`LocalBusiness`, `Product`, `BreadcrumbList`), Dynamic `sitemap.xml` và `robots.txt`.
- **Deploy**: Vercel & Supabase

---

## 📁 3. Cấu trúc thư mục

```
Kiho/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx                    # Trang chủ (Hero SEO, Featured, Use-case, Feedback)
│   │   │   ├── thiet-bi/
│   │   │   │   ├── page.tsx                # Danh sách thiết bị (Search, Filter, Sort)
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx            # Chi tiết thiết bị (Gallery, Specs, Messenger CTA)
│   │   │   ├── feedback/                   # Feedback & ảnh thực tế khách hàng
│   │   │   ├── huong-dan-thue/             # Quy trình 4 bước thuê máy, CCCD, cọc & FAQ
│   │   │   ├── lien-he/                    # Thông tin liên hệ & bản đồ Google Maps Đồng Hới
│   │   │   ├── sitemap.ts                  # Dynamic XML sitemap
│   │   │   └── robots.ts                   # robots.txt
│   │   ├── admin/
│   │   │   ├── login/                      # Trang đăng nhập Supabase Auth
│   │   │   └── (dashboard)/
│   │   │       ├── page.tsx                # Tổng quan & Thống kê
│   │   │       ├── equipment/              # CRUD Thiết bị & Bảng giá
│   │   │       ├── categories/             # CRUD Danh mục
│   │   │       ├── feedback/               # CRUD Feedback
│   │   │       └── settings/               # Cài đặt website, Hotline, Messenger Link
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── public/                         # Header, Footer, ProductCard, Gallery, UseCases...
│   │   └── admin/                          # Sidebar, EquipmentForm...
│   ├── lib/
│   │   ├── supabase/                       # Supabase client/server
│   │   ├── services/                       # Data fetching layer
│   │   ├── mock-data.ts                    # Fallback demo seed data
│   │   └── utils.ts                        # Format tiền tệ, slugify, Messenger builder
│   └── types/                              # TypeScript interfaces
├── supabase/
│   ├── schema.sql                          # Schema PostgreSQL, Indexes, RLS Policies
│   └── seed.sql                            # Dữ liệu seed demo các dòng máy hot
├── track_log.md                            # Milestone tracking log
├── .env.example
└── package.json
```

---

## 🛠️ 4. Hướng dẫn cài đặt & Chạy trên máy cá nhân

### Bước 1: Cài đặt dependencies
```bash
npm install
```

### Bước 2: Cấu hình biến môi trường
Tạo file `.env.local` từ file `.env.example`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_MESSENGER_URL=https://m.me/kihocameradonghoi
NEXT_PUBLIC_DEFAULT_FACEBOOK_URL=https://facebook.com/kihocameradonghoi
NEXT_PUBLIC_DEFAULT_PHONE=0912345678
```
> *Lưu ý: Nếu chưa nhập thông tin Supabase, website sẽ tự động sử dụng bộ Mock Data chất lượng cao được thiết kế sẵn để bạn có thể xem và trải nghiệm đầy đủ giao diện.*

### Bước 3: Chạy Development Server
```bash
npm run dev
```
Truy cập: `http://localhost:3000`

---

## 🗄️ 5. Hướng dẫn thiết lập Supabase Database

1. Đăng nhập vào [https://supabase.com](https://supabase.com) và tạo một Project mới.
2. Mở mục **SQL Editor** trong bảng điều khiển Supabase.
3. Sao chép toàn bộ nội dung từ file `supabase/schema.sql` và nhấn **Run** để tạo bảng và RLS policies.
4. Sao chép toàn bộ nội dung từ file `supabase/seed.sql` và nhấn **Run** để nạp dữ liệu mẫu ban đầu.
5. Vào **Project Settings -> API** để lấy `URL` và `anon key` rồi dán vào `.env.local` hoặc Vercel Environment Variables.
6. Tạo một Admin User trong mục **Authentication -> Users** để đăng nhập vào `/admin/login`.

---

## ☁️ 6. Hướng dẫn Deploy lên Vercel

1. Đẩy mã nguồn lên GitHub/GitLab.
2. Truy cập [https://vercel.com](https://vercel.com) và chọn **Add New Project**.
3. Import repository **Kiho**.
4. Thiết lập các biến môi trường trong mục **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (ví dụ: `https://kihocamera.com`)
5. Nhấn **Deploy**. Vercel sẽ tự động build và cung cấp website hoàn chỉnh.

---

## 🔒 7. Bảo mật & Quản trị

- Mọi API public chỉ được quyền `SELECT` các thiết bị có `is_active = true`.
- Quyền thêm/sửa/xoá được bảo vệ tuyệt đối bằng Supabase RLS và Supabase Auth.
- Không để lộ `SUPABASE_SERVICE_ROLE_KEY` trên client-side.
