"use client";

import React from "react";
import { Sparkles, ShieldCheck, CheckCircle2, PhoneCall, HelpCircle } from "lucide-react";
import { RentalRequestForm, EquipmentOption } from "@/components/public/rental-request-form";

interface RentalRequestSectionProps {
  equipmentList?: EquipmentOption[];
  messengerUrl?: string;
}

export function RentalRequestSection({
  equipmentList = [],
  messengerUrl = "https://m.me/kihocameradonghoi",
}: RentalRequestSectionProps) {
  return (
    <section id="tu-van-thue" className="py-16 sm:py-24 bg-[#faf8f4] hairline-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT EDITORIAL COLUMN */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0eae1] border border-[#e2dbcf] text-xs font-mono font-bold uppercase tracking-wider text-ink-700">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>TƯ VẤN THUÊ MÁY</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-5xl font-black text-ink-900 tracking-tight leading-[1.1] font-mono">
                Không biết <br />
                <span className="text-accent">chọn máy nào?</span>
              </h2>
              <p className="text-sm sm:text-base text-ink-600 font-medium leading-relaxed">
                Để lại lịch đi và số điện thoại. Kiho sẽ xem nhu cầu rồi liên hệ tư vấn chiếc máy phù hợp cho bạn.
              </p>
            </div>

            {/* 3 Core Trust Points */}
            <div className="space-y-3 pt-2 font-mono text-xs text-ink-700 font-medium">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#e8e2d7] shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Không cần cọc tiền máy</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#e8e2d7] shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Chỉ cần CCCD / VNeID khi nhận máy</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#e8e2d7] shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Không thanh toán trên website</span>
              </div>
            </div>

            {/* Secondary Direct Contact Hint */}
            <div className="pt-2 text-xs font-mono text-ink-500">
              <span>Bạn cần tư vấn gấp? </span>
              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-900 font-bold underline underline-offset-4 hover:text-accent transition-colors"
              >
                Nhắn Messenger cho Kiho ngay →
              </a>
            </div>

          </div>

          {/* RIGHT FORM COLUMN */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e8e2d7] shadow-xs">
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
