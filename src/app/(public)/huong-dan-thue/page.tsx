import React from "react";
import { Metadata } from "next";
import { ArrowUpRight, ShieldCheck, CheckCircle2, FileText } from "lucide-react";
import { getSiteSettings } from "@/lib/services/settings";
import { BreadcrumbJsonLd } from "@/components/public/json-ld";
import { FadeIn } from "@/components/ui/motion";
import { TrackedOutboundLink } from "@/components/analytics/tracked-outbound-link";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Hướng dẫn & Thủ tục thuê máy ảnh tại Quảng Bình, Đồng Hới",
  description:
    "Quy trình thuê máy ảnh du lịch đơn giản tại TP. Đồng Hới, Quảng Bình. Không cần cọc tiền máy, xác minh nhanh qua ảnh CCCD hoặc VNeID.",
  pathname: "/huong-dan-thue",
});

export default async function RentalGuidePage() {
  const settings = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kihocamera.com";

  const faqs = [
    {
      q: "Thuê máy ảnh tại Kiho Camera có cần đặt cọc tiền không?",
      a: "Không. Hiện tại Kiho Camera không yêu cầu cọc tiền máy. Bạn chỉ cần cung cấp ảnh Căn cước công dân (CCCD) gắn chip chính chủ hoặc tài khoản định danh điện tử VNeID để xác minh khi thuê.",
    },
    {
      q: "Shop có hỗ trợ giao máy tận nơi tại Đồng Hới hay khách sạn không?",
      a: "Có! Kiho Camera hỗ trợ giao nhận máy tận nơi tại trung tâm TP. Đồng Hới, ga tàu, sân bay Đồng Hới hoặc các khách sạn/homestay theo yêu cầu của bạn.",
    },
    {
      q: "Thời gian tính 1 ngày thuê như thế nào?",
      a: "1 ngày thuê được tính trọn vẹn 24 giờ kể từ thời điểm nhận máy. Ví dụ nhận máy lúc 08:00 sáng hôm nay thì trả máy trước 08:00 sáng hôm sau. Thuê 1 buổi được tính từ 4 – 5 tiếng.",
    },
    {
      q: "Tôi chưa từng dùng máy ảnh bao giờ, shop có hướng dẫn không?",
      a: "Chắc chắn rồi! Kiho Camera sẽ setup sẵn profile màu đẹp, chế độ chụp da tự nhiên hoặc quay video sắc nét. Tụi mình sẽ hướng dẫn thao tác cơ bản và cách chuyển ảnh qua điện thoại chỉ trong 5 phút.",
    },
    {
      q: "Bộ máy thuê đã có thẻ nhớ và pin chưa?",
      a: "Mỗi bộ máy ảnh cho thuê tại Kiho Camera đều đi kèm trọn bộ: 2 pin dung lượng cao, dock sạc nhanh, thẻ nhớ tốc độ cao, túi chống sốc và đầu đọc thẻ OTG cho iPhone & Type-C để nhận máy là chụp ngay.",
    },
  ];

  return (
    <div className="bg-[#faf8f5] min-h-screen py-10 sm:py-16">
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Hướng dẫn thuê máy", url: "/huong-dan-thue" },
        ]}
        siteUrl={siteUrl}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        {/* Page Header */}
        <FadeIn className="space-y-2 pb-6 border-b border-ink-200">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold tracking-widest text-ink-600 uppercase">
            <FileText className="w-3.5 h-3.5 text-accent" />
            <span>QUY TRÌNH & CHÍNH SÁCH</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-ink-900 tracking-tight">
            Hướng dẫn thuê máy
          </h1>
          <p className="text-sm sm:text-base text-ink-600 font-sans font-normal max-w-xl leading-relaxed">
            Thủ tục thuê máy tại Kiho Camera được thiết kế gọn nhẹ nhất: không cọc tiền máy, chỉ cần ảnh CCCD/VNeID để bạn tập trung trọn vẹn cho chuyến đi.
          </p>
        </FadeIn>

        {/* 3 Steps Section */}
        <FadeIn className="space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight">
            3 bước thuê máy nhanh gọn
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-5 sm:p-6 rounded-xl bg-white border border-ink-200 shadow-xs space-y-2.5">
              <span className="font-mono text-2xl font-bold text-accent">01</span>
              <h3 className="text-base font-sans font-bold text-ink-900">Chọn máy phù hợp</h3>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-sans font-normal">
                Xem 12 dòng máy trên web và chọn chiếc máy hợp chuyến đi. Tụi mình luôn chuẩn bị sẵn trọn bộ 2 pin, sạc và thẻ nhớ.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-white border border-ink-200 shadow-xs space-y-2.5">
              <span className="font-mono text-2xl font-bold text-accent">02</span>
              <h3 className="text-base font-sans font-bold text-ink-900">Gửi ảnh CCCD / VNeID</h3>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-sans font-normal">
                Nhắn qua Messenger/Zalo để giữ máy. Kiho xác minh nhanh qua CCCD/VNeID, hoàn toàn không cần cọc tiền máy.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-white border border-ink-200 shadow-xs space-y-2.5">
              <span className="font-mono text-2xl font-bold text-accent">03</span>
              <h3 className="text-base font-sans font-bold text-ink-900">Nhận máy & đi chụp</h3>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-sans font-normal">
                Nhận máy tại 48 Ngô Quyền hoặc giao tận nơi Đồng Hới. Hướng dẫn test máy và thao tác chuyển ảnh trong 5 phút.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Verification Policy Banner */}
        <FadeIn className="p-5 sm:p-6 rounded-xl bg-canvas-200/80 border border-ink-200 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white text-emerald-700 shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-sans font-bold text-ink-900">
                Chính sách xác minh không cần cọc tiền máy
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 font-sans">
                Kiho Camera mong muốn mang lại trải nghiệm thuê máy thuận tiện và an tâm nhất cho bạn.
              </p>
            </div>
          </div>
          <div className="pt-1 text-xs sm:text-sm text-ink-700 space-y-1.5 font-sans">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>Chỉ cần cung cấp ảnh CCCD gắn chip chính chủ hoặc tài khoản VNeID đã định danh.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>Thủ tục xác minh online hoặc trực tiếp chỉ mất 2 – 3 phút trước khi nhận máy.</span>
            </div>
          </div>
        </FadeIn>

        {/* FAQs */}
        <FadeIn className="space-y-5 border-t border-ink-200 pt-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight">
            Câu hỏi thường gặp
          </h2>
          <div className="divide-y divide-ink-200 text-sm">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4 space-y-1">
                <h3 className="font-sans font-bold text-ink-900 text-sm sm:text-base">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-sans font-normal">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Bottom CTA */}
        <FadeIn className="pt-4 text-center space-y-3">
          <p className="text-xs sm:text-sm text-ink-600 font-sans">
            Bạn cần tư vấn chọn máy cho chuyến đi tới? Nhắn Kiho ngay nhé!
          </p>
          <TrackedOutboundLink
            href={settings.messenger_url || "https://m.me/kihocameradonghoi"}
            eventName="contact_messenger"
            placement="rental_guide"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-ink-900 hover:bg-black text-white font-sans font-semibold text-xs px-6 py-3 rounded-lg transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>Nhắn Kiho Camera</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </TrackedOutboundLink>
        </FadeIn>

      </div>
    </div>
  );
}
