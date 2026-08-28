"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronDown, ChevronUp, Package, Sliders, FileText, ShieldCheck, ArrowRight } from "lucide-react";
import { Equipment } from "@/types/database";

interface EquipmentDetailsProps {
  equipment: Equipment;
  messengerChatUrl?: string;
}

export function EquipmentDetails({ equipment, messengerChatUrl }: EquipmentDetailsProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    included: true,
    specs: true,
    description: false,
    policy: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const hasIncluded = equipment.included_items && equipment.included_items.length > 0;
  const hasSpecs = equipment.specifications && Object.keys(equipment.specifications).length > 0;
  const hasDesc = !!equipment.description;

  return (
    <section className="pt-10 sm:pt-14 border-t border-ink-200 space-y-6">
      {/* Section Header */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-widest text-ink-500 uppercase">
          <Package className="w-3.5 h-3.5 text-accent" />
          <span>CHI TIẾT MÁY & DỊCH VỤ</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight">
          Thông tin về máy
        </h2>
        <p className="text-xs sm:text-sm text-ink-600 font-sans font-normal max-w-2xl">
          Trọn bộ thiết bị sẵn sàng sử dụng, thông số kỹ thuật hữu ích và chính sách thuê máy tại Kiho Camera.
        </p>
      </div>

      {/* DESKTOP 2-COLUMN GRID */}
      <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8">
        
        {/* Column 1 */}
        <div className="space-y-6">
          {hasIncluded && (
            <div className="p-5 sm:p-6 rounded-xl bg-white border border-ink-200 shadow-xs space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-ink-900 uppercase">
                <Package className="w-4 h-4 text-accent" />
                <span>BỘ THUÊ ĐÃ BAO GỒM (NHẬN MÁY LÀ CHỤP)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-ink-800 font-sans font-medium">
                {equipment.included_items!.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasDesc && (
            <div className="p-5 sm:p-6 rounded-xl bg-white border border-ink-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-ink-900 uppercase">
                <FileText className="w-4 h-4 text-accent" />
                <span>CHI TIẾT TRẢI NGHIỆM</span>
              </div>
              <div className="text-xs sm:text-sm text-ink-600 leading-relaxed space-y-2 font-sans font-normal">
                {equipment.description!.split("\n\n").map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          {hasSpecs && (
            <div className="p-5 sm:p-6 rounded-xl bg-white border border-ink-200 shadow-xs space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-ink-900 uppercase">
                <Sliders className="w-4 h-4 text-accent" />
                <span>THÔNG SỐ KỸ THUẬT HỮU ÍCH</span>
              </div>
              <div className="divide-y divide-ink-200 text-xs">
                {Object.entries(equipment.specifications!).map(([key, val], idx) => (
                  <div key={idx} className="py-2 flex justify-between gap-4">
                    <span className="text-ink-500 font-normal capitalize font-sans">
                      {key.replace(/_/g, " ")}
                    </span>
                    <span className="text-ink-900 font-semibold text-right font-mono">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rental Policy */}
          <div className="p-5 sm:p-6 rounded-xl bg-canvas-200/80 border border-ink-200 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-ink-900 uppercase">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>THỦ TỤC XÁC MINH & NHẬN MÁY</span>
            </div>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed font-sans font-normal">
              {equipment.deposit_note ||
                "Kiho Camera không yêu cầu cọc tiền máy. Bạn chỉ cần cung cấp ảnh CCCD gắn chip chính chủ hoặc tài khoản VNeID để xác minh khi nhận máy tại 48 Ngô Quyền hoặc giao tận nơi khách sạn."}
            </p>
            <div className="pt-1">
              <Link
                href="/huong-dan-thue"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-ink-900 hover:text-accent transition-colors underline underline-offset-4"
              >
                <span>Xem chi tiết quy trình thuê máy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* MOBILE ACCORDIONS */}
      <div className="md:hidden space-y-2.5">
        {hasIncluded && (
          <div className="rounded-lg bg-white border border-ink-200 overflow-hidden">
            <button
              onClick={() => toggleSection("included")}
              className="w-full p-3.5 flex items-center justify-between text-left font-sans font-semibold text-xs text-ink-900"
            >
              <span className="flex items-center gap-2">
                <Package className="w-4 h-4 text-accent" />
                Bộ thuê đã bao gồm
              </span>
              {openSections.included ? <ChevronUp className="w-4 h-4 text-ink-400" /> : <ChevronDown className="w-4 h-4 text-ink-400" />}
            </button>
            {openSections.included && (
              <div className="p-3.5 pt-0 border-t border-ink-200 grid grid-cols-1 gap-2 text-xs text-ink-800 font-sans">
                {equipment.included_items!.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {hasSpecs && (
          <div className="rounded-lg bg-white border border-ink-200 overflow-hidden">
            <button
              onClick={() => toggleSection("specs")}
              className="w-full p-3.5 flex items-center justify-between text-left font-sans font-semibold text-xs text-ink-900"
            >
              <span className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-accent" />
                Thông số kỹ thuật
              </span>
              {openSections.specs ? <ChevronUp className="w-4 h-4 text-ink-400" /> : <ChevronDown className="w-4 h-4 text-ink-400" />}
            </button>
            {openSections.specs && (
              <div className="p-3.5 pt-0 border-t border-ink-200 divide-y divide-ink-200 text-xs">
                {Object.entries(equipment.specifications!).map(([key, val], idx) => (
                  <div key={idx} className="py-2 flex justify-between gap-4">
                    <span className="text-ink-500 font-sans capitalize">
                      {key.replace(/_/g, " ")}
                    </span>
                    <span className="text-ink-900 font-semibold font-mono text-right">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {hasDesc && (
          <div className="rounded-lg bg-white border border-ink-200 overflow-hidden">
            <button
              onClick={() => toggleSection("description")}
              className="w-full p-3.5 flex items-center justify-between text-left font-sans font-semibold text-xs text-ink-900"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent" />
                Chi tiết trải nghiệm
              </span>
              {openSections.description ? <ChevronUp className="w-4 h-4 text-ink-400" /> : <ChevronDown className="w-4 h-4 text-ink-400" />}
            </button>
            {openSections.description && (
              <div className="p-3.5 pt-0 border-t border-ink-200 text-xs text-ink-600 leading-relaxed space-y-2 font-sans">
                {equipment.description!.split("\n\n").map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Policy */}
        <div className="rounded-lg bg-canvas-200/80 border border-ink-200 overflow-hidden">
          <button
            onClick={() => toggleSection("policy")}
            className="w-full p-3.5 flex items-center justify-between text-left font-sans font-semibold text-xs text-ink-900"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Thủ tục xác minh & nhận máy
            </span>
            {openSections.policy ? <ChevronUp className="w-4 h-4 text-ink-400" /> : <ChevronDown className="w-4 h-4 text-ink-400" />}
          </button>
          {openSections.policy && (
            <div className="p-3.5 pt-0 border-t border-ink-200 space-y-2 text-xs text-ink-700 font-sans">
              <p className="leading-relaxed">
                {equipment.deposit_note ||
                  "Kiho Camera không yêu cầu cọc tiền máy. Bạn chỉ cần cung cấp ảnh CCCD gắn chip chính chủ hoặc tài khoản VNeID để xác minh khi nhận máy tại 48 Ngô Quyền hoặc giao tận nơi khách sạn."}
              </p>
              <div className="pt-1">
                <Link
                  href="/huong-dan-thue"
                  className="text-xs font-sans font-semibold text-ink-900 underline underline-offset-4"
                >
                  Xem chi tiết quy trình thuê máy →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mid-Page Conversion Card */}
      {messengerChatUrl && (
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-ink-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-bold font-sans text-ink-900">
              Ưng chiếc {equipment.name} này cho chuyến đi?
            </h4>
            <p className="text-xs text-ink-500 font-sans">
              Nhắn Kiho trước để giữ máy và được cài đặt profile màu chụp đẹp nhất.
            </p>
          </div>

          <a
            href={messengerChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ink-900 hover:bg-black text-white text-xs font-sans font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-xs shrink-0 cursor-pointer"
          >
            <span>Nhắn Kiho giữ máy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </section>
  );
}
