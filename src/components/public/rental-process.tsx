import React from "react";
import { ShieldCheck, HelpCircle, FileCheck } from "lucide-react";

interface RentalProcessProps {
  messengerUrl?: string;
}


export function RentalProcess({}: RentalProcessProps = {}) {
  const steps = [
    {
      num: "01",
      title: "Chọn máy phù hợp",
      desc: "Xem bảng giá và các dòng máy trên website. Kiho chuẩn bị sẵn trọn bộ 2 pin, sạc đôi, thẻ nhớ 64GB và túi chống sốc.",
    },
    {
      num: "02",
      title: "Gửi ảnh CCCD / VNeID",
      desc: "Kiho xác minh nhanh qua ảnh CCCD hoặc tài khoản định danh VNeID. Hoàn toàn không cần cọc tiền máy.",
    },
    {
      num: "03",
      title: "Nhận máy & khởi hành",
      desc: "Nhận máy tại 48 Ngô Quyền hoặc giao tận nơi tại Đồng Hới. Hướng dẫn 5 phút thao tác và chuyển ảnh sang điện thoại.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#faf8f5] border-t border-ink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 max-w-2xl">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold tracking-widest text-ink-600 uppercase mb-2">
            <FileCheck className="w-3.5 h-3.5 text-accent" />
            <span>QUY TRÌNH TINH GỌN</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight leading-tight">
            Thủ tục gọn nhẹ trong 3 bước
          </h2>
          <p className="mt-2 text-sm sm:text-base text-ink-600 font-sans font-normal leading-relaxed">
            Không cần cọc tiền máy. Xác minh nhanh qua CCCD/VNeID, hướng dẫn 5 phút rồi tự tin lên đường.
          </p>
        </div>

        {/* 3 Step Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="relative p-6 sm:p-7 rounded-xl bg-white border border-ink-200 shadow-xs flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <span className="font-mono text-3xl sm:text-4xl font-bold text-accent block">
                  {step.num}
                </span>
                <h3 className="font-sans text-lg font-bold text-ink-900 tracking-tight">
                  {step.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink-600 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>

              {/* Bottom Step Status */}
              <div className="pt-3 border-t border-ink-200 flex items-center justify-between text-[11px] font-mono text-ink-600 font-semibold">
                <span>BƯỚC {idx + 1} / 3</span>
                <span>NHANH GỌN</span>
              </div>
            </div>
          ))}
        </div>


        {/* FAQ / Rental Notes */}
        <div className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-xl bg-white border border-ink-200 shadow-xs">
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

        {/* Contextual Link to Phong Nha Guide */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-xl bg-forest-50/70 border border-forest-200/80">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-semibold uppercase px-2.5 py-1 rounded bg-forest-100 text-forest-800 tracking-wide shrink-0">
              Điểm đến
            </span>
            <p className="font-sans text-xs sm:text-sm text-forest-900 font-medium">
              Bạn đang lên lịch trình khám phá Động Thiên Đường, Sông Son hay Suối Moọc?
            </p>
          </div>
          <a
            href="/thue-may-anh-phong-nha"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-forest-700 hover:text-forest-900 transition-colors whitespace-nowrap"
          >
            <span>Xem cẩm nang thuê máy đi Phong Nha</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
}

