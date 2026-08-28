"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, MapPin } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const TRAVEL_MOMENTS = [
  {
    id: "nhat-le",
    frame: "FRAME 01",
    time: "17:42",
    location: "Biển Nhật Lệ, Đồng Hới",
    title: "Buổi chiều vàng bên bờ biển",
    story:
      "Gió biển thổi nhẹ, nắng hoàng hôn phủ vàng lên bãi cát. Một chiếc máy compact hay mirrorless nhỏ gọn là đủ để lưu lại trọn vẹn từng khoảnh khắc tự nhiên.",
    camera: "Gợi ý: Canon R50 · G7X Mark III",
    image: "/images/landing/themes/theme-01-sunset-beach.webp",
    aspect: "aspect-[16/10]",
    href: "/thiet-bi/canon-eos-r50",
  },
  {
    id: "cafe-pho",
    frame: "FRAME 02",
    time: "06:30",
    location: "Phố nhỏ bên sông Nhật Lệ",
    title: "Tách cafe sớm và góc phố quen",
    story:
      "Không khí trong lành buổi sớm ở Đồng Hới. Ánh sáng dịu nhẹ xuyên qua tán cây, những góc quán mộc mạc và tone màu film ấm áp.",
    camera: "Gợi ý: Fujifilm X100VI · X100V",
    image: "/images/landing/themes/theme-02-cafe-street.webp",
    aspect: "aspect-[4/5]",
    href: "/thiet-bi/fujifilm-x100vi",
  },
  {
    id: "phong-nha",
    frame: "FRAME 03",
    time: "14:10",
    location: "Sông Son & Phong Nha — Kẻ Bàng",
    title: "Màu xanh ngọc bích của thiên nhiên",
    story:
      "Dòng sông uốn lượn giữa những dãy núi đá vôi triệu năm. Sắc xanh trong vắt của nước và mây trời tạo nên khung cảnh tráng lệ khó quên.",
    camera: "Gợi ý: Canon RP · Fujifilm XS10",
    image: "/images/landing/hero-quang-binh.webp",
    aspect: "aspect-[16/9]",
    href: "/thiet-bi?brand=Canon",
  },
  {
    id: "night-out",
    frame: "FRAME 04",
    time: "20:15",
    location: "Một quán nhỏ lên đèn tại Đồng Hới",
    title: "Khoảnh khắc hẹn hò & ánh đèn đêm",
    story:
      "Khi phố lên đèn, những cuộc trò chuyện kéo dài bên bàn tiệc nhỏ. Bắt trọn nụ cười và tone da rạng rỡ dưới ánh sáng vàng lung linh.",
    camera: "Gợi ý: Canon G7X III · Sony ZV1 II",
    image: "/images/landing/themes/theme-03-couple-dating.webp",
    aspect: "aspect-[4/3]",
    href: "/thiet-bi/canon-g7x-mark-iii",
  },
];

export function QuangBinhJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const subtleY1 = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const subtleY2 = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-28 bg-[#f5f1eb] border-t border-ink-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-ink-500 uppercase">
              <span className="text-accent font-bold">03 / QUẢNG BÌNH, THROUGH A CAMERA</span>
              <span className="text-ink-300">·</span>
              <span>NHẬT KÝ HÌNH ẢNH</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight leading-tight">
              Quảng Bình qua ống kính máy ảnh
            </h2>

            <p className="font-sans text-sm sm:text-base text-ink-600 font-normal leading-relaxed">
              Từ biển Nhật Lệ chiều lộng gió, quán cafe sớm ven sông đến những dãy núi đá vôi Phong Nha kỳ vĩ — chiếc máy ảnh sẽ theo bạn giữ lại những kỷ niệm đẹp nhất.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-ink-500 self-start md:self-end">
            <Compass className="w-3.5 h-3.5 text-accent" />
            <span>4 KHOẢNH KHẮC · 1 CHUYẾN ĐI</span>
          </div>
        </div>

        {/* ASYMMETRICAL EDITORIAL PHOTO NARRATIVE */}
        <div className="space-y-16 sm:space-y-24">
          
          {/* ROW 1: Large Sunset Beach + Side Cafe Story */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Story 1 (7 cols) */}
            <motion.div
              style={{ y: subtleY1 }}
              className="lg:col-span-7 space-y-4 group"
            >
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-canvas-200 border border-ink-200 shadow-xs">
                <Image
                  src={TRAVEL_MOMENTS[0].image}
                  alt={TRAVEL_MOMENTS[0].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3.5 left-3.5 bg-ink-900/80 text-white font-mono text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  {TRAVEL_MOMENTS[0].frame} · {TRAVEL_MOMENTS[0].time}
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-accent">
                  <MapPin className="w-3 h-3" />
                  <span>{TRAVEL_MOMENTS[0].location}</span>
                </div>
                <h3 className="font-sans text-xl sm:text-2xl font-bold text-ink-900 tracking-tight">
                  {TRAVEL_MOMENTS[0].title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink-600 leading-relaxed max-w-xl">
                  {TRAVEL_MOMENTS[0].story}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs border-t border-ink-200/80">
                  <span className="font-mono text-ink-500 text-[11px]">{TRAVEL_MOMENTS[0].camera}</span>
                  <Link
                    href={TRAVEL_MOMENTS[0].href}
                    className="inline-flex items-center gap-1 font-sans font-semibold text-ink-900 hover:text-accent transition-colors"
                  >
                    <span>Xem máy này</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Story 2 (5 cols) */}
            <motion.div
              style={{ y: subtleY2 }}
              className="lg:col-span-5 space-y-4 group"
            >
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-canvas-200 border border-ink-200 shadow-xs">
                <Image
                  src={TRAVEL_MOMENTS[1].image}
                  alt={TRAVEL_MOMENTS[1].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3.5 left-3.5 bg-ink-900/80 text-white font-mono text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  {TRAVEL_MOMENTS[1].frame} · {TRAVEL_MOMENTS[1].time}
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-accent">
                  <MapPin className="w-3 h-3" />
                  <span>{TRAVEL_MOMENTS[1].location}</span>
                </div>
                <h3 className="font-sans text-lg sm:text-xl font-bold text-ink-900 tracking-tight">
                  {TRAVEL_MOMENTS[1].title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink-600 leading-relaxed">
                  {TRAVEL_MOMENTS[1].story}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs border-t border-ink-200/80">
                  <span className="font-mono text-ink-500 text-[11px]">{TRAVEL_MOMENTS[1].camera}</span>
                  <Link
                    href={TRAVEL_MOMENTS[1].href}
                    className="inline-flex items-center gap-1 font-sans font-semibold text-ink-900 hover:text-accent transition-colors"
                  >
                    <span>Xem máy này</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ROW 2: Wide Nature Heritage + Intimate Evening Story */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Story 4 (5 cols) */}
            <motion.div
              style={{ y: subtleY1 }}
              className="lg:col-span-5 space-y-4 group order-2 lg:order-1"
            >
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-canvas-200 border border-ink-200 shadow-xs">
                <Image
                  src={TRAVEL_MOMENTS[3].image}
                  alt={TRAVEL_MOMENTS[3].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3.5 left-3.5 bg-ink-900/80 text-white font-mono text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  {TRAVEL_MOMENTS[3].frame} · {TRAVEL_MOMENTS[3].time}
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-accent">
                  <MapPin className="w-3 h-3" />
                  <span>{TRAVEL_MOMENTS[3].location}</span>
                </div>
                <h3 className="font-sans text-lg sm:text-xl font-bold text-ink-900 tracking-tight">
                  {TRAVEL_MOMENTS[3].title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink-600 leading-relaxed">
                  {TRAVEL_MOMENTS[3].story}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs border-t border-ink-200/80">
                  <span className="font-mono text-ink-500 text-[11px]">{TRAVEL_MOMENTS[3].camera}</span>
                  <Link
                    href={TRAVEL_MOMENTS[3].href}
                    className="inline-flex items-center gap-1 font-sans font-semibold text-ink-900 hover:text-accent transition-colors"
                  >
                    <span>Xem máy này</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Story 3 (7 cols) */}
            <motion.div
              style={{ y: subtleY2 }}
              className="lg:col-span-7 space-y-4 group order-1 lg:order-2"
            >
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-canvas-200 border border-ink-200 shadow-xs">
                <Image
                  src={TRAVEL_MOMENTS[2].image}
                  alt={TRAVEL_MOMENTS[2].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3.5 left-3.5 bg-ink-900/80 text-white font-mono text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  {TRAVEL_MOMENTS[2].frame} · {TRAVEL_MOMENTS[2].time}
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-accent">
                  <MapPin className="w-3 h-3" />
                  <span>{TRAVEL_MOMENTS[2].location}</span>
                </div>
                <h3 className="font-sans text-xl sm:text-2xl font-bold text-ink-900 tracking-tight">
                  {TRAVEL_MOMENTS[2].title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink-600 leading-relaxed max-w-xl">
                  {TRAVEL_MOMENTS[2].story}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs border-t border-ink-200/80">
                  <span className="font-mono text-ink-500 text-[11px]">{TRAVEL_MOMENTS[2].camera}</span>
                  <Link
                    href={TRAVEL_MOMENTS[2].href}
                    className="inline-flex items-center gap-1 font-sans font-semibold text-ink-900 hover:text-accent transition-colors"
                  >
                    <span>Xem máy này</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
