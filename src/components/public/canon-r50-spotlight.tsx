"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Zap, Shield, Camera, Layers, Video } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

interface CanonR50SpotlightProps {
  messengerUrl?: string;
}

export function CanonR50Spotlight({ messengerUrl = "https://m.me/kihocameradonghoi" }: CanonR50SpotlightProps) {
  const highlights = [
    {
      icon: Sparkles,
      title: "Cảm biến APS-C 24.2MP & DIGIC X",
      desc: "Màu da người (skin tone) trắng hồng tự nhiên đặc trưng của Canon. Ảnh chụp ra có thể chuyển ngay sang điện thoại để đăng mạng xã hội mà không cần chỉnh sửa.",
    },
    {
      icon: Zap,
      title: "Lấy nét Dual Pixel CMOS AF II",
      desc: "Hệ thống 651 vùng AF thông minh nhận diện ánh mắt người và động vật siêu chuẩn xác. Dù đang chạy nhảy hay tạo dáng chuyển động vẫn bắt nét dính chặt.",
    },
    {
      icon: Video,
      title: "Quay 4K 30p không crop 6K Oversampling",
      desc: "Chất lượng video 4K sắc nét vượt trội, góc quay rộng trọn vẹn kết hợp cùng màn hình cảm ứng xoay lật đa góc 180 độ hỗ trợ quay vlog và selfie dễ dàng.",
    },
    {
      icon: Camera,
      title: "Siêu gọn nhẹ chỉ 375g",
      desc: "Chiếc máy ảnh mirrorless nhỏ gọn nhất của Canon, cầm chụp cả ngày dài khi leo động Thiên Đường, suối Moọc hay dạo bãi biển Nhật Lệ không hề mỏi tay.",
    },
  ];

  const comboPackage = [
    "Body Canon EOS R50 nguyên bản",
    "Lens Canon RF-S 18-45mm IS STM (chống rung quang học)",
    "2 Pin dung lượng cao + Dock sạc đôi nhanh",
    "Thẻ nhớ SanDisk Extreme 64GB / 128GB tốc độ cao",
    "Túi chống sốc thời trang",
    "Dây đeo cổ thao tác nhanh",
    "Đầu đọc thẻ nhớ OTG chuyển ảnh trực tiếp sang iPhone / Android",
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#faf8f5] hairline-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Tâm điểm thiết bị
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-ink-900 tracking-tight leading-tight">
            Tại sao Canon EOS R50 là chiếc máy đáng thuê nhất cho chuyến đi?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-600 leading-relaxed">
            Dù bạn là người lần đầu cầm máy ảnh hay người sáng tạo nội dung chuyên nghiệp, Canon R50 mang lại sự cân bằng hoàn hảo giữa chất ảnh xuất sắc và sự gọn nhẹ tối đa.
          </p>
        </FadeIn>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Bento Item 1: Flagship Preview Card with Rental Price */}
          <FadeIn className="lg:col-span-7 bg-[#f3efe9] rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-[#e4dfd5] relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="text-xs font-mono font-bold text-ink-500 uppercase tracking-widest">
                  CANON RF SYSTEM · APS-C
                </span>
                <span className="px-3 py-1 bg-ink-900 text-white text-xs font-bold rounded-full">
                  Chỉ 320.000đ / ngày
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-ink-900 tracking-tight">
                Bộ Combo Du Lịch Canon EOS R50
              </h3>
              <p className="text-sm text-ink-600 mt-2 max-w-lg">
                Đã kèm sẵn ống kính zoom đa dụng, thẻ nhớ tốc độ cao và đầy đủ phụ kiện. Nhận máy là có thể dùng ngay.
              </p>
            </div>

            {/* Visual Image Showcase */}
            <div className="relative aspect-[16/9] w-full my-6 rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/canon-r50/canon-r50-front.jpg"
                alt="Canon EOS R50 Showcase"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-mono text-white/90">
                  Ảnh chụp thực tế từ Canon EOS R50 tại Đồng Hới
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="relative z-10 pt-2 flex flex-wrap items-center gap-4">
              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-bold px-6 py-3 rounded-md transition-colors shadow-sm"
              >
                <span>Nhắn Kiho giữ máy R50</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/thiet-bi/canon-eos-r50"
                className="text-sm font-bold text-ink-900 hover:text-accent underline transition-colors"
              >
                Xem chi tiết thông số →
              </Link>
            </div>
          </FadeIn>

          {/* Bento Item 2: What's Included Box */}
          <FadeIn delay={0.1} className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-[#e4dfd5] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-widest mb-4">
                <Layers className="w-4 h-4" />
                Gói phụ kiện đi kèm khi thuê
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight mb-4">
                Đầy đủ không phát sinh chi phí
              </h3>

              <ul className="space-y-3">
                {comboPackage.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-6 border-t border-ink-100 bg-[#faf8f5] -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-5 sm:p-6 rounded-b-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-ink-500 block">Thủ tục cọc linh hoạt</span>
                  <span className="text-xs font-bold text-ink-900">CCCD chính chủ hoặc cọc tiền</span>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Giao tận nơi KS
                </span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* 4 Feature Columns */}
        <StaggerContainer className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((h, i) => (
            <StaggerItem
              key={i}
              className="bg-white p-6 rounded-xl border border-[#e4dfd5] shadow-sm hover:border-accent/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#f3efe9] flex items-center justify-center text-accent mb-4">
                <h.icon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-ink-900 tracking-tight mb-2">
                {h.title}
              </h4>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
                {h.desc}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
