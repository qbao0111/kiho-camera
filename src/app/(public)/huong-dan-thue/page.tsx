import React from "react";
import { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getSiteSettings } from "@/lib/services/settings";
import { FadeIn } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Hướng dẫn & Thủ tục thuê máy ảnh tại Kiho Camera Quảng Bình",
  description:
    "Quy trình thuê máy ảnh, lens và thiết bị du lịch đơn giản tại TP. Đồng Hới Quảng Bình. Thủ tục CCCD nhanh gọn, hỗ trợ giao máy tận nơi.",
};

export default async function RentalGuidePage() {
  const settings = await getSiteSettings();

  const faqs = [
    {
      q: "Thuê máy ảnh tại Kiho Camera cần những giấy tờ gì?",
      a: "Bạn chỉ cần mang theo Căn cước công dân (CCCD) gắn chip chính chủ. Tụi mình giữ lại CCCD trong thời gian thuê máy. Nếu bạn không muốn để lại giấy tờ, có thể đặt cọc bằng tiền mặt hoặc chuyển khoản theo giá trị thiết bị.",
    },
    {
      q: "Shop có hỗ trợ giao máy tận nơi tại Đồng Hới hay khách sạn không?",
      a: "Có! Kiho Camera hỗ trợ giao nhận máy tận nơi tại trung tâm TP. Đồng Hới, ga tàu, sân bay Đồng Hới hoặc các khách sạn/homestay theo yêu cầu.",
    },
    {
      q: "Thời gian tính 1 ngày thuê như thế nào?",
      a: "1 ngày thuê được tính trọn vẹn 24 giờ kể từ thời điểm nhận máy. Ví dụ nhận máy lúc 08:00 sáng hôm nay thì trả máy trước 08:00 sáng hôm sau.",
    },
    {
      q: "Tôi chưa từng dùng máy ảnh bao giờ, shop có hướng dẫn không?",
      a: "Chắc chắn rồi! Kiho Camera sẽ setup sẵn chế độ chụp da đẹp, màu film tự nhiên hoặc quay video mượt mà. Tụi mình sẽ hướng dẫn bạn thao tác cơ bản và cách chuyển ảnh qua điện thoại chỉ trong 5 phút.",
    },
    {
      q: "Bộ máy thuê đã có thẻ nhớ và pin chưa?",
      a: "Mỗi bộ máy ảnh cho thuê tại Kiho Camera đều đi kèm đầy đủ 2 viên pin, dock sạc, thẻ nhớ dung lượng lớn (64GB - 128GB), túi chống sốc và đầu đọc thẻ tiện lợi để bạn cắm sang điện thoại ngay tại chỗ.",
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
            Thủ tục thuê máy tại Kiho Camera được thiết kế gọn nhẹ nhất để bạn tập trung trọn vẹn cho chuyến đi.
          </p>
        </FadeIn>

        {/* 4 Steps Section */}
        <FadeIn className="space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight">
            Quy trình thuê máy
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
            <div className="space-y-2 hairline-t pt-4">
              <span className="font-mono text-xs font-bold text-accent">01</span>
              <h3 className="text-lg font-bold text-ink-900">Chọn thiết bị</h3>
              <p className="text-xs sm:text-sm text-ink-500 leading-relaxed">
                Xem danh sách máy và phụ kiện trên website. Mỗi dòng máy đều có gợi ý combo và thông số rõ ràng.
              </p>
            </div>

            <div className="space-y-2 hairline-t pt-4">
              <span className="font-mono text-xs font-bold text-accent">02</span>
              <h3 className="text-lg font-bold text-ink-900">Nhắn tin chốt lịch</h3>
              <p className="text-xs sm:text-sm text-ink-500 leading-relaxed">
                Nhắn qua Messenger để báo ngày nhận và trả. Kiho sẽ giữ máy và setup sẵn thông số trước khi giao.
              </p>
            </div>

            <div className="space-y-2 hairline-t pt-4">
              <span className="font-mono text-xs font-bold text-accent">03</span>
              <h3 className="text-lg font-bold text-ink-900">Nhận máy & Kiểm tra</h3>
              <p className="text-xs sm:text-sm text-ink-500 leading-relaxed">
                Nhận máy tại cửa hàng hoặc giao tận nơi Đồng Hới. Tụi mình sẽ cùng bạn test máy và hướng dẫn sử dụng.
              </p>
            </div>

            <div className="space-y-2 hairline-t pt-4">
              <span className="font-mono text-xs font-bold text-accent">04</span>
              <h3 className="text-lg font-bold text-ink-900">Trả máy & Hoàn cọc</h3>
              <p className="text-xs sm:text-sm text-ink-500 leading-relaxed">
                Sau chuyến đi, bạn bàn giao lại máy và nhận lại CCCD hoặc tiền cọc ngay lập tức.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Deposit Policy */}
        <FadeIn className="space-y-6 hairline-t pt-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight">
            Chính sách đặt cọc
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs sm:text-sm text-ink-700">
            <div className="space-y-1.5">
              <h4 className="font-bold text-ink-900 text-base">Phương án 1: Giữ CCCD</h4>
              <p className="leading-relaxed text-ink-500">
                Để lại Căn cước công dân (CCCD) gắn chip chính chủ. Không cần đặt thêm tiền cọc với hầu hết các dòng máy.
              </p>
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-ink-900 text-base">Phương án 2: Cọc tiền mặt</h4>
              <p className="leading-relaxed text-ink-500">
                Trường hợp không muốn giữ giấy tờ cá nhân, bạn đặt cọc từ 30% - 70% giá trị thiết bị và nhận lại 100% khi trả máy.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* FAQs */}
        <FadeIn className="space-y-6 hairline-t pt-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight">
            Câu hỏi thường gặp
          </h2>
          <div className="divide-y divide-[#e7e4dc] text-sm">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-5 space-y-1.5">
                <h3 className="font-bold text-ink-900 text-base">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Bottom CTA */}
        <FadeIn className="pt-8 text-center space-y-4">
          <p className="text-xs sm:text-sm text-ink-500">
            Bạn còn thắc mắc nào khác? Nhắn tụi mình bất cứ lúc nào!
          </p>
          <a
            href={settings.messenger_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ink-900 hover:bg-accent text-[#faf8f5] font-bold text-sm px-7 py-3 rounded-sm transition-colors"
          >
            <span>Nhắn Kiho Camera</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </FadeIn>
      </div>
    </div>
  );
}
