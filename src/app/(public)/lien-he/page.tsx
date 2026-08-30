import React from "react";
import { Metadata } from "next";
import { ArrowUpRight, MapPin, Phone, Clock, MessageSquare, MessageCircle } from "lucide-react";
import { getSiteSettings } from "@/lib/services/settings";
import { BreadcrumbJsonLd } from "@/components/public/json-ld";
import { FadeIn } from "@/components/ui/motion";
import { normalizePhoneNumber, buildZaloUrl } from "@/lib/utils";
import { TrackedOutboundLink } from "@/components/analytics/tracked-outbound-link";

export const metadata: Metadata = {
  title: "Liên hệ & Địa chỉ cửa hàng tại Đồng Hới",
  description:
    "Thông tin liên hệ cửa hàng Kiho Camera tại TP. Đồng Hới, Quảng Bình. Hotline tư vấn thuê máy ảnh, fanpage và chỉ đường Google Maps.",
  alternates: {
    canonical: "/lien-he",
  },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kihocamera.com";

  // 1. External Google Maps URL (for the button)
  const externalMapUrl =
    settings.maps_url?.trim() ||
    (settings.address?.trim()
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address.trim())}`
      : "https://www.google.com/maps");

  // 2. Embedded Google Maps URL (for the iframe)
  const rawEmbedUrl = settings.maps_embed_url?.trim();
  let mapEmbedUrl: string;

  if (rawEmbedUrl) {
    // If user pasted a full <iframe src="..." ...> embed code, extract the URL inside src
    const iframeSrcMatch = rawEmbedUrl.match(/src=["']([^"']+)["']/i);
    mapEmbedUrl = iframeSrcMatch ? iframeSrcMatch[1] : rawEmbedUrl;
  } else {
    // Fallback to address search embed only if maps_embed_url is empty
    const mapAddress = settings.address?.trim() || "Đồng Hới, Quảng Bình";
    mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapAddress)}&output=embed`;
  }

  return (
    <div className="bg-[#faf8f5] min-h-screen py-10 sm:py-16">
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Liên hệ", url: "/lien-he" },
        ]}
        siteUrl={siteUrl}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        {/* Page Header */}
        <FadeIn className="space-y-2 pb-6 border-b border-ink-200">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold tracking-widest text-ink-600 uppercase">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            <span>LIÊN HỆ & ĐỊA CHỈ</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-ink-900 tracking-tight">
            Ghé thăm Kiho Camera
          </h1>
          <p className="text-sm sm:text-base text-ink-600 font-sans font-normal max-w-xl leading-relaxed">
            Hỗ trợ tư vấn thiết bị và giao nhận máy ảnh nhanh chóng trong khu vực TP. Đồng Hới và lân cận.
          </p>
        </FadeIn>

        {/* Contact Info & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14">
          {/* Left: Store Details */}
          <FadeIn className="lg:col-span-5 space-y-6">
            <div className="space-y-5">
              <div className="space-y-1 pt-3 border-t border-ink-200">
                <span className="text-[11px] font-mono font-semibold tracking-widest text-ink-600 uppercase">
                  ĐỊA CHỈ CỬA HÀNG
                </span>
                <p className="text-base font-sans font-bold text-ink-900 leading-snug">
                  {settings.address}
                </p>
                <span className="text-xs text-ink-600 font-sans block">
                  Hỗ trợ giao máy tại ga tàu, sân bay Đồng Hới & homestay
                </span>
              </div>

              <div className="space-y-1 pt-3 border-t border-ink-200">
                <span className="text-[11px] font-mono font-semibold tracking-widest text-ink-600 uppercase">
                  HOTLINE / ZALO
                </span>
                <TrackedOutboundLink
                  href={`tel:${normalizePhoneNumber(settings.phone)}`}
                  eventName="contact_hotline"
                  placement="contact_page"
                  className="text-xl font-bold font-mono text-ink-900 hover:text-accent transition-colors block"
                >
                  {settings.phone}
                </TrackedOutboundLink>
              </div>

              <div className="space-y-1 pt-3 border-t border-ink-200">
                <span className="text-[11px] font-mono font-semibold tracking-widest text-ink-600 uppercase">
                  GIỜ MỞ CỬA
                </span>
                <p className="text-sm font-sans font-semibold text-ink-900">
                  {settings.opening_hours}
                </p>
              </div>
            </div>

            {/* Direct Link CTAs */}
            <div className="pt-2 space-y-2.5">
              <TrackedOutboundLink
                href={settings.messenger_url}
                eventName="contact_messenger"
                placement="contact_page"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between py-3.5 px-5 bg-ink-900 hover:bg-black text-white font-sans font-semibold text-sm rounded-lg transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-accent shrink-0" />
                  <span>Nhắn tin tư vấn qua Messenger</span>
                </div>
                <ArrowUpRight className="w-4 h-4" />
              </TrackedOutboundLink>

              <TrackedOutboundLink
                href={buildZaloUrl(settings.phone)}
                eventName="contact_zalo"
                placement="contact_page"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between py-3 px-5 bg-white hover:bg-canvas-200 border border-ink-300 hover:border-accent text-ink-900 hover:text-accent font-sans font-semibold text-xs rounded-lg transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-accent shrink-0" />
                  <span>Chat tư vấn qua Zalo</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-ink-400 group-hover:text-accent" />
              </TrackedOutboundLink>

              <a
                href={settings.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between py-3 px-5 bg-white hover:bg-canvas-200 border border-ink-300 text-ink-900 hover:text-accent font-sans font-medium text-xs rounded-lg transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>Ghé thăm Facebook Fanpage</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-ink-600 group-hover:text-accent" />
              </a>
            </div>
          </FadeIn>

          {/* Right: Map Embed */}
          <FadeIn delay={0.2} className="lg:col-span-7 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold tracking-widest text-ink-600 uppercase">
                BẢN ĐỒ GOOGLE MAPS
              </span>
              <a
                href={externalMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-sans font-semibold text-ink-900 hover:text-accent flex items-center gap-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>Mở trong Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>


            <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden bg-canvas-200 border border-ink-200 shadow-xs">
              <iframe
                title="Google Maps Kiho Camera"
                src={mapEmbedUrl}
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
