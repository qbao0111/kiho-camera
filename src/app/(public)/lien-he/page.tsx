import React from "react";
import { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getSiteSettings } from "@/lib/services/settings";
import { FadeIn } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Liên hệ & Địa chỉ cửa hàng | Kiho Camera Quảng Bình",
  description:
    "Thông tin liên hệ cửa hàng Kiho Camera tại TP. Đồng Hới, Quảng Bình. Hotline tư vấn thuê máy ảnh, fanpage và chỉ đường Google Maps.",
  alternates: {
    canonical: "/lien-he",
  },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="bg-[#faf8f5] min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <FadeIn className="space-y-3 pb-8 hairline-b">
          <span className="text-[11px] font-mono font-semibold tracking-widest text-ink-400 uppercase">
            LIÊN HỆ & ĐỊA CHỈ
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-ink-900 tracking-tight">
            Ghé thăm Kiho Camera
          </h1>
          <p className="text-sm sm:text-base text-ink-600 max-w-xl leading-relaxed">
            Hỗ trợ tư vấn thiết bị và giao nhận máy ảnh nhanh chóng trong khu vực TP. Đồng Hới và lân cận.
          </p>
        </FadeIn>

        {/* Contact Info & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
          {/* Left: Store Details (5 cols) */}
          <FadeIn className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <div className="space-y-1 hairline-t pt-4">
                <span className="text-[11px] font-mono font-bold tracking-widest text-ink-400 uppercase">
                  ĐỊA CHỈ CỬA HÀNG
                </span>
                <p className="text-base font-bold text-ink-900 leading-snug">
                  {settings.address}
                </p>
                <span className="text-xs text-ink-500 block">
                  Hỗ trợ giao máy tại ga tàu, sân bay Đồng Hới & homestay
                </span>
              </div>

              <div className="space-y-1 hairline-t pt-4">
                <span className="text-[11px] font-mono font-bold tracking-widest text-ink-400 uppercase">
                  HOTLINE / ZALO
                </span>
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                  className="text-xl font-black text-ink-900 hover:text-accent transition-colors block"
                >
                  {settings.phone}
                </a>
              </div>

              <div className="space-y-1 hairline-t pt-4">
                <span className="text-[11px] font-mono font-bold tracking-widest text-ink-400 uppercase">
                  GIỜ MỞ CỬA
                </span>
                <p className="text-sm font-semibold text-ink-900">
                  {settings.opening_hours}
                </p>
              </div>
            </div>

            {/* Direct Link CTAs */}
            <div className="pt-2 space-y-3">
              <a
                href={settings.messenger_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between py-3.5 px-5 bg-ink-900 hover:bg-accent text-[#faf8f5] font-bold text-sm rounded-sm transition-colors"
              >
                <span>Nhắn tin tư vấn qua Messenger</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={settings.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between py-3 px-5 bg-[#f3efe9] hover:bg-[#eae4d9] text-ink-900 font-semibold text-xs rounded-sm transition-colors"
              >
                <span>Ghé thăm Facebook Fanpage</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-ink-400" />
              </a>
            </div>
          </FadeIn>

          {/* Right: Map Embed (7 cols) */}
          <FadeIn delay={0.2} className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold tracking-widest text-ink-400 uppercase">
                BẢN ĐỒ GOOGLE MAPS
              </span>
              <a
                href={settings.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-ink-900 link-underline flex items-center gap-1"
              >
                <span>Mở trong app</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="relative aspect-[16/11] w-full rounded-md overflow-hidden bg-[#f3efe9] border border-[#e7e4dc]">
              <iframe
                title="Google Maps Kiho Camera"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121731.42512966567!2d106.54929853926017!3d17.47248107936173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3147570498b58fa7%3A0x6b44747db5aa025a!2zxJDhu5NuZyBI4bubaSwgUXXhuqNuZyBCw6xuaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
