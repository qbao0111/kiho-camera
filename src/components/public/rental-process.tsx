"use client";

import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

export function RentalProcess({ messengerUrl = "https://m.me/kihocameradonghoi" }: { messengerUrl?: string }) {
  const steps = [
    {
      num: "01",
      title: "CHỌN MÁY PHÙ HỢP",
      desc: "Xem bảng giá và các dòng máy trên web. Tụi mình luôn chuẩn bị sẵn trọn bộ 2 pin, sạc đôi và thẻ nhớ.",
    },
    {
      num: "02",
      title: "GỬI ẢNH CCCD / VNEID",
      desc: "Kiho xác minh nhanh qua ảnh CCCD hoặc VNeID. Hoàn toàn không cần cọc tiền máy, không thủ tục phức tạp.",
    },
    {
      num: "03",
      title: "NHẬN MÁY & ĐI CHỤP",
      desc: "Nhận máy tại 48 Ngô Quyền hoặc giao tận nơi tại Đồng Hới. Chỉ vài bước là bạn có thể tự tin mang máy đi chụp.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#faf8f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0eae1] border border-[#e2dbcf] text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>QUY TRÌNH TINH GỌN</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-ink-900 tracking-tight leading-tight">
              Thủ tục gọn nhẹ trong 3 bước
            </h2>
            <p className="mt-2 text-sm sm:text-base text-ink-600 font-medium max-w-xl">
              Không cần cọc tiền máy. Xác minh nhanh qua CCCD/VNeID, hướng dẫn 5 phút rồi tự tin lên đường.
            </p>
          </div>

          <a
            href={messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ink-900 hover:bg-accent text-white text-xs font-mono font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-colors shadow-sm shrink-0"
          >
            <span>Nhắn đặt lịch trước</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 3 Large Typography Step Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="relative p-6 sm:p-8 rounded-3xl bg-white border border-[#e8e2d7] shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <span className="text-4xl sm:text-5xl font-black font-mono text-accent/80 block">
                  {step.num}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-ink-900 tracking-tight uppercase font-mono">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>

              {/* Bottom Subtle Step Status */}
              <div className="pt-4 border-t border-[#f0eae1] flex items-center justify-between text-[11px] font-mono text-ink-400">
                <span>BƯỚC {idx + 1} / 3</span>
                <span>✦ NHANH CHÓNG</span>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ / Rental Notes (Clean Editorial Box) */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-white border border-[#e8e2d7] shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            <div className="space-y-2">
              <h4 className="text-sm sm:text-base font-bold text-ink-900 font-mono flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Thuê máy có cần cọc tiền không?</span>
              </h4>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-medium">
                <strong className="text-ink-900 font-semibold">Không.</strong> Hiện tại Kiho Camera không yêu cầu cọc tiền máy. Bạn chỉ cần cung cấp ảnh CCCD gắn chip hoặc tài khoản định danh VNeID để xác minh khi thuê.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm sm:text-base font-bold text-ink-900 font-mono flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-accent" />
                <span>Khi nhận máy có được hướng dẫn không?</span>
              </h4>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-medium">
                <strong className="text-ink-900 font-semibold">Có.</strong> Kiho sẽ hướng dẫn nhanh các nút chụp, góc quay và cách chuyển ảnh sang điện thoại trước khi bạn mang máy đi.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
