import React from "react";
import Image from "@/components/ui/source-image";
import { MapPin, Phone, Navigation, ArrowUpRight } from "lucide-react";
import { SiteSettings, StorefrontImage } from "@/types/database";
import { normalizePhoneNumber } from "@/lib/utils";
import { DEFAULT_MAPS_URL } from "@/lib/constants";
import { TrackedOutboundLink } from "@/components/analytics/tracked-outbound-link";

interface LocalStoreTrustSectionProps {
  settings: SiteSettings;
  storefrontImages: StorefrontImage[];
}

export function LocalStoreTrustSection({
  settings,
  storefrontImages,
}: LocalStoreTrustSectionProps) {
  const address = settings.address || "48 Ngô Quyền, TP. Đồng Hới, Quảng Bình";
  const phone = settings.phone || "0387 274 669";
  const openingHours = settings.opening_hours || "07:30 – 21:00 (Tất cả các ngày trong tuần)";
  const mapUrl = settings.maps_url || DEFAULT_MAPS_URL;

  // Take up to 4 active storefront images
  const displayImages = storefrontImages.slice(0, 4);
  const primaryCover = displayImages.find((img) => img.is_cover) || displayImages[0];
  const secondaryImages = displayImages.filter((img) => img.id !== primaryCover?.id).slice(0, 2);

  return (
    <section
      id="dia-chi-cua-hang"
      aria-labelledby="storefront-trust-heading"
      className="py-12 sm:py-16 bg-[#faf8f5] border-t border-ink-200/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Context Label */}
        <div className="text-xs font-sans font-semibold tracking-wider text-ink-500 uppercase mb-3">
          Cửa hàng tại Đồng Hới
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: Editorial & NAP Context (Answer-first) */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <h2
                id="storefront-trust-heading"
                className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-ink-900 tracking-tight leading-tight"
              >
                Kiho Camera ở đâu tại Quảng Bình?
              </h2>
            </div>

            {/* Answer-first factual paragraph */}
            <p className="font-sans text-sm sm:text-base text-ink-600 leading-relaxed font-normal">
              Kiho Camera là cửa hàng cho thuê máy ảnh tại <strong className="text-ink-900 font-semibold">{address}</strong>. Bạn có thể ghé trực tiếp để nhận máy, kiểm tra thiết bị thực tế và được hướng dẫn sử dụng nhanh trước chuyến đi khám phá biển Nhật Lệ, cồn cát Quang Phú hay động Phong Nha.
            </p>

            {/* Store Information (Clean editorial layout, de-boxed) */}
            <div className="py-3.5 px-4 sm:px-5 rounded-lg bg-canvas-100/80 border border-ink-200/70 space-y-2.5 text-xs sm:text-sm font-sans text-ink-700">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-ink-900 shrink-0">Địa chỉ:</span>
                <span>{address}</span>
              </div>
              <div className="flex items-baseline gap-2 pt-1.5 border-t border-ink-200/50">
                <span className="font-semibold text-ink-900 shrink-0">Mở cửa:</span>
                <span>{openingHours}</span>
              </div>
              <div className="flex items-baseline gap-2 pt-1.5 border-t border-ink-200/50">
                <span className="font-semibold text-ink-900 shrink-0">Hotline:</span>
                <a
                  href={`tel:${normalizePhoneNumber(phone)}`}
                  className="font-mono font-bold text-accent hover:underline"
                >
                  {phone}
                </a>
              </div>
            </div>

            {/* Local Pickup Perks (Clean editorial bullet list) */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-ink-700 pt-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                <span>Test máy trực tiếp trước khi nhận</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                <span>Hỗ trợ giao tận nơi tại Đồng Hới</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                <span>Không giữ tiền cọc máy du lịch</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                <span>Đủ pin sạc, thẻ 64GB tốc độ cao</span>
              </li>
            </ul>

            {/* Local Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink-900 hover:bg-black text-white px-5 py-3 rounded-lg text-xs sm:text-sm font-sans font-semibold transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
              >
                <Navigation className="w-4 h-4 text-accent" />
                <span>Xem vị trí trên Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/70" />
              </a>

              <TrackedOutboundLink
                href={`tel:${normalizePhoneNumber(phone)}`}
                eventName="contact_hotline"
                placement="local_store_section"
                className="inline-flex items-center gap-2 bg-white hover:bg-canvas-200 text-ink-900 hover:text-accent border border-ink-300 px-4 py-3 rounded-lg text-xs sm:text-sm font-sans font-medium transition-colors shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
              >
                <Phone className="w-4 h-4 text-accent" />
                <span>Gọi hỏi đường: <strong className="font-mono">{phone}</strong></span>
              </TrackedOutboundLink>
            </div>
          </div>

          {/* RIGHT: Real Storefront Photos (Desktop 2-column, Mobile scroll-snap) */}
          <div className="lg:col-span-6">
            {primaryCover ? (
              <div className="space-y-3">
                {/* Mobile Snap Rail / Desktop Layout */}
                <div className="flex sm:grid sm:grid-cols-12 gap-3 sm:gap-3.5 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 scrollbar-none snap-x snap-mandatory">
                  
                  {/* Primary Cover Store Photo */}
                  <figure
                    className={`w-[85vw] xs:w-[78vw] sm:w-auto shrink-0 snap-start relative rounded-xl overflow-hidden bg-canvas-200 border border-ink-200/80 shadow-xs ${
                      secondaryImages.length > 0 ? "sm:col-span-12 aspect-[16/10]" : "sm:col-span-12 aspect-[16/10]"
                    }`}
                  >
                    <Image
                      src={primaryCover.image_url}
                      alt={primaryCover.alt_text || `Mặt tiền cửa hàng Kiho Camera tại ${address}`}
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 560px"
                      priority={false}
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 z-10 bg-ink-900/85 backdrop-blur-xs text-white text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-white/20 flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span>CỬA HÀNG THỰC TẾ · 48 NGÔ QUYỀN</span>
                    </div>

                    {primaryCover.caption && (
                      <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/75 via-black/40 to-transparent text-white text-xs font-sans font-normal leading-snug">
                        {primaryCover.caption}
                      </figcaption>
                    )}
                  </figure>

                  {/* Secondary Store Detail Photos */}
                  {secondaryImages.map((secImg, sIdx) => (
                    <figure
                      key={secImg.id || sIdx}
                      className="w-[70vw] xs:w-[60vw] sm:w-auto shrink-0 snap-start sm:col-span-6 relative aspect-[4/3] rounded-xl overflow-hidden bg-canvas-200 border border-ink-200/80 shadow-2xs"
                    >
                      <Image
                        src={secImg.image_url}
                        alt={secImg.alt_text || `Không gian bên trong Kiho Camera Đồng Hới`}
                        fill
                        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 25vw, 270px"
                        className="object-cover"
                      />
                      {secImg.caption && (
                        <figcaption className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/75 via-black/30 to-transparent text-white text-[11px] font-sans font-normal">
                          {secImg.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>

                <p className="text-[11px] font-sans text-ink-500 text-center sm:text-left italic">
                  * Hình ảnh thực tế tại cửa hàng Kiho Camera — 48 Ngô Quyền, TP. Đồng Hới.
                </p>
              </div>
            ) : (
              /* Fallback if no store photos uploaded yet */
              <div className="bg-canvas-100/80 rounded-2xl p-6 sm:p-8 border border-ink-200 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 text-accent flex items-center justify-center mx-auto">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display text-lg font-bold text-ink-900">
                    Điểm nhận máy thuận tiện tại trung tâm Đồng Hới
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-600 max-w-md mx-auto leading-relaxed">
                    Nằm tại mặt tiền số 48 Ngô Quyền, dễ dàng di chuyển từ ga Đồng Hới, sân bay, bến xe hoặc các khách sạn trung tâm.
                  </p>
                </div>
                <div className="pt-2">
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                  >
                    <span>Mở bản đồ dẫn đường trên Google Maps ↗</span>
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
