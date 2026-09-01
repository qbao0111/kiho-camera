import React from "react";
import { RentalRequestForm, EquipmentOption } from "@/components/public/rental-request-form";
import { TrackedOutboundLink } from "@/components/analytics/tracked-outbound-link";

interface RentalRequestSectionProps {
  equipmentList?: EquipmentOption[];
  messengerUrl?: string;
}


export function RentalRequestSection({
  equipmentList = [],
  messengerUrl = "https://m.me/kihocameradonghoi",
}: RentalRequestSectionProps) {
  return (
    <section id="tu-van-thue" className="py-16 sm:py-24 bg-[#faf8f5] border-t border-ink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT EDITORIAL COLUMN */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Context Label */}
            <span className="text-xs font-sans font-semibold text-accent uppercase tracking-wider">
              Tư vấn giữ máy
            </span>

            {/* Main Headline */}
            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight leading-[1.12]">
                Bạn chưa biết <br />
                <span className="italic text-accent font-normal">nên chọn máy nào?</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-ink-600 font-normal leading-relaxed">
                Để lại lịch trình và số điện thoại, Kiho sẽ tư vấn dòng máy phù hợp nhất với chuyến đi của bạn tại Quảng Bình.
              </p>
            </div>

            {/* Reassurance list without boxing */}
            <ul className="space-y-3 pt-1 font-sans text-xs sm:text-sm text-ink-700">
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                <span>Không cần cọc tiền máy</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                <span>Chỉ cần ảnh CCCD hoặc định danh VNeID</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                <span>Kèm trọn bộ 2 pin, sạc đôi, thẻ nhớ 64GB và túi chống sốc</span>
              </li>
            </ul>

            {/* Secondary Direct Contact Hint */}
            <div className="pt-2 text-xs font-sans text-ink-600">
              <span>Cần hỗ trợ gấp? </span>
              <TrackedOutboundLink
                href={messengerUrl}
                eventName="contact_messenger"
                placement="rental_section"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-900 font-semibold underline underline-offset-4 hover:text-accent transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
              >
                Nhắn trực tiếp qua Messenger ↗
              </TrackedOutboundLink>
            </div>

          </div>


          {/* RIGHT FORM COLUMN */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-xl bg-white border border-ink-200 shadow-xs">
              <RentalRequestForm
                equipmentList={equipmentList}
                messengerUrl={messengerUrl}
                source="homepage_section"
                variant="section"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
