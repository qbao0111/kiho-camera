"use client";

import React from "react";
import { ShieldCheck, HelpCircle, FileCheck, ArrowRight } from "lucide-react";

interface PickupAndProcessProps {
  messengerUrl?: string;
}

export function PickupAndProcess({}: PickupAndProcessProps = {}) {
  const steps = [
    {
      num: "01",
      title: "Chọn máy phù hợp",
      desc: "Xem bảng giá và 12 dòng máy có sẵn. Kiho chuẩn bị sẵn trọn bộ 2 pin, sạc đôi, thẻ 64GB và túi chống sốc.",
    },
    {
      num: "02",
      title: "Gửi ảnh CCCD / VNeID",
      desc: "Kiho xác minh nhanh qua ảnh CCCD hoặc tài khoản VNeID khi liên hệ. Hoàn toàn không cần cọc tiền máy.",
    },
    {
      num: "03",
      title: "Nhận máy & khởi hành",
      desc: "Nhận máy tại 48 Ngô Quyền hoặc giao tận nơi tại Đồng Hới. Hướng dẫn 5 phút thao tác chụp và chuyển ảnh sang điện thoại.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#fbf9f6] border-t border-ink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Chapter Header */}
        <div className="mb-10 sm:mb-14 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-ink-500 uppercase mb-2">
            <span className="text-accent font-bold">07 / PICKUP & START</span>
            <span className="text-ink-300">·</span>
            <span>QUY TRÌNH TINH GỌN</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight leading-tight">
            Thủ tục gọn nhẹ trong 3 bước
          </h2>
          <p className="mt-2 text-sm sm:text-base text-ink-600 font-sans font-normal leading-relaxed">
            Không cần cọc tiền máy. Xác minh nhanh qua CCCD/VNeID, hướng dẫn 5 phút rồi tự tin lên đường.
          </p>
        </div>

        {/* Continuous 3-Step Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="relative p-6 sm:p-7 rounded-xl bg-white border border-ink-200 shadow-2xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-accent">
                    {step.num}
                  </span>
                  <span className="font-mono text-[10px] text-ink-400 uppercase">
                    BƯỚC {idx + 1} / 3
                  </span>
                </div>
                <h3 className="font-sans text-lg font-bold text-ink-900 tracking-tight">
                  {step.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink-600 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-ink-100 flex items-center text-[11px] font-sans font-medium text-emerald-700">
                <span>Nhanh chóng · Không cọc tiền</span>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Reassurance Block */}
        <div className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-xl bg-white border border-ink-200 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            <div className="space-y-1.5">
              <h4 className="font-sans text-sm sm:text-base font-bold text-ink-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                <span>Thuê máy có cần cọc tiền không?</span>
              </h4>
              <p className="font-sans text-xs sm:text-sm text-ink-600 leading-relaxed font-normal">
                <strong className="text-ink-900 font-semibold">Không.</strong> Hiện tại Kiho Camera không yêu cầu cọc tiền máy. Bạn chỉ cần cung cấp ảnh CCCD gắn chip hoặc tài khoản định danh VNeID để xác minh khi thuê.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-sans text-sm sm:text-base font-bold text-ink-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-accent shrink-0" />
                <span>Khi nhận máy có được hướng dẫn sử dụng không?</span>
              </h4>
              <p className="font-sans text-xs sm:text-sm text-ink-600 leading-relaxed font-normal">
                <strong className="text-ink-900 font-semibold">Có.</strong> Kiho sẽ hướng dẫn nhanh các nút chụp, góc quay và cách chuyển ảnh sang điện thoại trước khi bạn mang máy đi.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
