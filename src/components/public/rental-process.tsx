"use client";

import React from "react";
import { Sparkles, ShieldCheck, HelpCircle } from "lucide-react";

interface RentalProcessProps {
  messengerUrl?: string;
}

export function RentalProcess({}: RentalProcessProps = {}) {
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
    <section className="py-20 sm:py-28 bg-[#faf8f4] border-t border-[#e8e2d7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Purely Informational & Clean) */}
        <div className="mb-12 sm:mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0eae1] border border-[#e2dbcf] text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>QUY TRÌNH TINH GỌN</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-ink-900 tracking-tight leading-tight font-mono">
            Thủ tục gọn nhẹ trong 3 bước
          </h2>
          <p className="mt-2 text-sm sm:text-base text-ink-600 font-medium leading-relaxed">
            Không cần cọc tiền máy. Xác minh nhanh qua CCCD/VNeID, hướng dẫn 5 phút rồi tự tin lên đường.
          </p>
        </div>

        {/* 3 Large Typography Step Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
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
