import React from "react";
import { Metadata } from "next";
import { ArrowUpRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { getSiteSettings } from "@/lib/services/settings";
import { FadeIn } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Hướng dẫn & Thủ tục thuê máy ảnh tại Kiho Camera Quảng Bình",
  description:
    "Quy trình thuê máy ảnh du lịch đơn giản tại TP. Đồng Hới Quảng Bình. Không cần cọc tiền máy, xác minh nhanh qua ảnh CCCD hoặc VNeID.",
  alternates: {
    canonical: "/huong-dan-thue",
  },
};

export default async function RentalGuidePage() {
  const settings = await getSiteSettings();

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
      a: "1 ngày thuê được tính trọn vẹn 24 giờ kể từ thời điểm nhận máy. Ví dụ nhận máy lúc 08:00 sáng hôm nay thì trả máy trước 08:00 sáng hôm sau. Thuê 1 buổi được tính từ 4 - 5 tiếng.",
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
    <div className="bg-[#faf8f5] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <FadeIn className="space-y-3 pb-8 hairline-b">
          <span className="text-[11px] font-mono font-semibold tracking-widest text-ink-400 uppercase">
            QUY TRÌNH & CHÍNH SÁCH
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-ink-900 tracking-tight">
            Hướng dẫn thuê máy
          </h1>
          <p className="text-sm sm:text-base text-ink-600 max-w-xl leading-relaxed">
            Thủ tục thuê máy tại Kiho Camera được thiết kế gọn nhẹ nhất: không cọc tiền máy, chỉ cần ảnh CCCD/VNeID để bạn tập trung trọn vẹn cho chuyến đi.
          </p>
        </FadeIn>

        {/* 3 Steps Section */}
        <FadeIn className="space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight font-mono">
            3 bước thuê máy nhanh gọn
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 rounded-3xl bg-white border border-[#e8e2d7] space-y-3">
              <span className="font-mono text-2xl font-black text-accent">01</span>
              <h3 className="text-base font-bold text-ink-900 font-mono">CHỌN MÁY PHÙ HỢP</h3>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-medium">
                Xem 12 dòng máy trên web và chọn chiếc máy hợp chuyến đi. Tụi mình luôn chuẩn bị sẵn trọn bộ 2 pin, sạc và thẻ nhớ.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#e8e2d7] space-y-3">
              <span className="font-mono text-2xl font-black text-accent">02</span>
              <h3 className="text-base font-bold text-ink-900 font-mono">GỬI ẢNH CCCD / VNEID</h3>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-medium">
                Nhắn qua Messenger/Zalo để giữ máy. Kiho xác minh nhanh qua CCCD/VNeID, hoàn toàn không cần cọc tiền máy.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#e8e2d7] space-y-3">
              <span className="font-mono text-2xl font-black text-accent">03</span>
              <h3 className="text-base font-bold text-ink-900 font-mono">NHẬN MÁY & ĐI CHỤP</h3>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-medium">
                Nhận máy tại 48 Ngô Quyền hoặc giao tận nơi Đồng Hới. Hướng dẫn test máy và thao tác chuyển ảnh trong 5 phút.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Verification Policy Banner */}
        <FadeIn className="p-6 sm:p-8 rounded-3xl bg-[#f0eae1] border border-[#e2dbcf] space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white text-emerald-700 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-ink-900 font-mono">
                Chính sách xác minh không cần cọc tiền máy
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 font-medium">
                Kiho Camera tin tưởng và mong muốn mang lại trải nghiệm thuê máy thoải mái nhất cho bạn.
              </p>
            </div>
          </div>
          <div className="pt-2 text-xs sm:text-sm text-ink-700 space-y-2 font-medium">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>Chỉ cần cung cấp ảnh CCCD gắn chip chính chủ hoặc tài khoản VNeID đã định danh.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>Thủ tục xác minh online hoặc trực tiếp chỉ mất 2 - 3 phút trước khi nhận máy.</span>
            </div>
          </div>
        </FadeIn>

        {/* FAQs */}
        <FadeIn className="space-y-6 hairline-t pt-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight font-mono">
            Câu hỏi thường gặp
          </h2>
          <div className="divide-y divide-[#e7e4dc] text-sm">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-5 space-y-1.5">
                <h3 className="font-bold text-ink-900 text-base font-mono">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-medium">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Bottom CTA */}
        <FadeIn className="pt-8 text-center space-y-4">
          <p className="text-xs sm:text-sm text-ink-500 font-mono">
            Bạn cần tư vấn chọn máy cho chuyến đi tới? Nhắn Kiho ngay nhé!
          </p>
          <a
            href={settings.messenger_url || "https://m.me/kihocameradonghoi"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ink-900 hover:bg-accent text-white font-mono font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-colors shadow-sm"
          >
            <span>Nhắn Kiho Camera</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </FadeIn>
      </div>
    </div>
  );
}
