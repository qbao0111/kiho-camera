"use client";

import React from "react";
import { CheckCircle2, MessageSquare, ArrowUpRight } from "lucide-react";
import { RentalRequestForm, EquipmentOption } from "@/components/public/rental-request-form";

interface TravelBookingNoteProps {
  equipmentList?: EquipmentOption[];
  messengerUrl?: string;
}

export function TravelBookingNote({
  equipmentList = [],
  messengerUrl = "https://m.me/kihocameradonghoi",
}: TravelBookingNoteProps) {
  return (
    <section id="tu-van-thue" className="py-16 sm:py-24 bg-[#faf8f5] border-t border-ink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT EDITORIAL COLUMN */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Chapter Header */}
            <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-ink-500 uppercase">
              <span className="text-accent font-bold">06 / BOOK YOUR TRIP</span>
              <span className="text-ink-300">·</span>
              <span>TƯ VẤN THUÊ MÁY</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight leading-[1.12]">
                Bạn chưa biết <br />
                <span className="italic text-accent font-normal">nên chọn máy nào?</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-ink-600 font-normal leading-relaxed">
                Để lại lịch trình và số điện thoại. Kiho sẽ xem nhu cầu thực tế và tư vấn chiếc máy ưng ý nhất cho chuyến đi của bạn.
              </p>
            </div>

            {/* 3 Core Trust Notes */}
            <div className="space-y-2.5 pt-1 font-sans text-xs text-ink-700 font-medium">
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-white border border-ink-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Không cần cọc tiền máy</span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-white border border-ink-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Chỉ cần CCCD hoặc VNeID khi nhận máy</span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-white border border-ink-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Kèm trọn bộ 2 pin, sạc đôi và thẻ nhớ 64GB</span>
              </div>
            </div>

            {/* Direct Messenger Link */}
            <div className="pt-2 text-xs font-sans text-ink-500">
              <span>Cần hỗ trợ nhanh? </span>
              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-900 font-semibold underline underline-offset-4 hover:text-accent transition-colors"
              >
                Nhắn trực tiếp qua Messenger ↗
              </a>
            </div>

          </div>

          {/* RIGHT FORM COLUMN (Booking Note Paper Section) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-xl bg-white border border-ink-200 shadow-xs">
              <RentalRequestForm
                equipmentList={equipmentList}
                messengerUrl={messengerUrl}
                source="homepage_v3"
                variant="section"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
