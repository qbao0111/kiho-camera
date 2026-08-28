"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Layers } from "lucide-react";

interface StoryCamera {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  priceSession: string;
  priceDay: string;
  priceThreeDays: string;
  cutoutImage: string;
  slug: string;
  specs: string[];
  moments: Array<{
    title: string;
    sub: string;
    image: string;
  }>;
}

const FEATURED_STORIES: StoryCamera[] = [
  {
    id: "r50",
    name: "Canon EOS R50",
    brand: "Canon Mirrorless",
    tagline: "Chiếc máy đa năng nhất cho chuyến đi biển & check-in",
    description:
      "Trọng lượng chỉ 375g, cảm biến 24.2MP và hệ thống lấy nét Dual Pixel AF II nhận diện mắt cực nhạy. Tone da Canon trắng hồng nịnh mắt, chụp là ưng ngay không cần chỉnh sửa cầu kỳ.",
    priceSession: "150K",
    priceDay: "250K",
    priceThreeDays: "220K",
    cutoutImage: "/images/landing/cutouts/canon-r50.png",
    slug: "canon-eos-r50",
    specs: ["24.2 Megapixel", "375g Siêu nhẹ", "Lấy nét mắt AI", "Kèm Lens 18-45mm"],
    moments: [
      {
        title: "Biển Chiều Nhật Lệ",
        sub: "Bắt sáng trong trẻo, màu cát và biển tự nhiên",
        image: "/images/samples/sample-r50-1.webp",
      },
      {
        title: "Chân Dung Nịnh Da",
        sub: "Tone da sáng mịn, tách phông nhẹ nhàng",
        image: "/images/samples/sample-r50-2.webp",
      },
      {
        title: "Cafe & Hoàng Hôn",
        sub: "Màu ảnh ấm áp, tương phản êm dịu",
        image: "/images/samples/sample-r50-3.webp",
      },
    ],
  },
  {
    id: "x100vi",
    name: "Fujifilm X100VI",
    brand: "Fujifilm Premium",
    tagline: "Đậm chất màu film retro cho những bức ảnh có gu",
    description:
      "Cảm biến 40.2MP kết hợp hệ thống 20 giả lập film kinh điển (Classic Chrome, Reala ACE). Thiết kế hoài cổ sang trọng, ống kính 23mm F/2 sắc nét ghi lại cảm xúc sâu lắng trên từng con phố.",
    priceSession: "350K",
    priceDay: "450K",
    priceThreeDays: "420K",
    cutoutImage: "/images/landing/cutouts/fujifilm-x100v.png",
    slug: "fujifilm-x100vi",
    specs: ["40.2 Megapixel", "20 Giả lập Film", "Chống rung IBIS", "Ống kính 23mm F/2"],
    moments: [
      {
        title: "Góc Phố Mộc Mạc",
        sub: "Màu Film Classic Chrome sâu lắng và nghệ thuật",
        image: "/images/samples/sample-fuji-1.webp",
      },
      {
        title: "Hẹn Hò Cafe",
        sub: "Ánh sáng tự nhiên và chi tiết sắc nét",
        image: "/images/samples/sample-fuji-2.webp",
      },
      {
        title: "Đêm Lên Đèn",
        sub: "Bắt sáng ấm áp, hạt grain cổ điển",
        image: "/images/samples/sample-fuji-3.webp",
      },
    ],
  },
  {
    id: "g7x3",
    name: "Canon G7X Mark III",
    brand: "Canon Compact",
    tagline: "Bỏ túi gọn gàng, màn hình lật chụp selfie & vlog tiện lợi",
    description:
      "Chiếc máy nhỏ gọn trong lòng bàn tay với ống kính khẩu độ lớn F/1.8-2.8 xóa phông mịn màng. Màn hình cảm ứng lật 180° và khả năng truyền ảnh trực tiếp về điện thoại trong tích tắc.",
    priceSession: "120K",
    priceDay: "200K",
    priceThreeDays: "180K",
    cutoutImage: "/images/landing/cutouts/canon-g7x-mark3.png",
    slug: "canon-g7x-mark-iii",
    specs: ["20.1MP 1-inch", "Khẩu độ F/1.8-2.8", "Màn lật Selfie 180°", "Chỉ nặng 304g"],
    moments: [
      {
        title: "Check-in Ăn Uống",
        sub: "Nhỏ gọn cầm tay chụp mọi lúc mọi nơi",
        image: "/images/samples/sample-g7x-1.webp",
      },
      {
        title: "Selfie & Đời Thường",
        sub: "Màn hình lật căn góc dễ dàng",
        image: "/images/samples/sample-g7x-2.webp",
      },
      {
        title: "Outfit Đi Chơi",
        sub: "Màu da tươi tắn, lấy nét khuôn mặt nhanh",
        image: "/images/samples/sample-r50-4.webp",
      },
    ],
  },
];

export function CameraStorytelling() {
  const [selectedId, setSelectedId] = useState("r50");
  const activeCamera =
    FEATURED_STORIES.find((c) => c.id === selectedId) || FEATURED_STORIES[0];

  return (
    <section className="py-16 sm:py-24 bg-[#faf8f5] border-t border-ink-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-ink-500 uppercase">
              <span className="text-accent font-bold">04 / CHOOSE YOUR CAMERA</span>
              <span className="text-ink-300">·</span>
              <span>MỘT CHIẾC MÁY — BA KHOẢNH KHẮC</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight leading-tight">
              Chọn máy theo phong cách của bạn
            </h2>

            <p className="font-sans text-sm sm:text-base text-ink-600 font-normal leading-relaxed">
              Mỗi dòng máy mang một cá tính riêng. Xem ảnh chụp thực tế để chọn chiếc máy ăn ý nhất với hành trình sắp tới.
            </p>
          </div>

          {/* Camera Tab Switcher */}
          <div className="flex items-center gap-1.5 bg-canvas-200 p-1.5 rounded-lg border border-ink-200 self-start md:self-end">
            {FEATURED_STORIES.map((cam, idx) => {
              const isSelected = cam.id === selectedId;
              return (
                <button
                  key={cam.id}
                  onClick={() => setSelectedId(cam.id)}
                  className={`px-3.5 py-2 rounded-md text-xs font-sans transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-white text-ink-900 shadow-xs font-bold"
                      : "text-ink-600 hover:text-ink-900 font-medium"
                  }`}
                >
                  <span className="font-mono text-[10px] text-accent">0{idx + 1}</span>
                  <span>{cam.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FEATURED STORY SHOWCASE CONTAINER */}
        <div className="bg-white rounded-xl border border-ink-200 p-6 sm:p-10 shadow-xs space-y-10">
          
          {/* TOP SECTION: Camera Spotlight Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-8 border-b border-ink-200">
            
            {/* Cutout Photo Viewport */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[380px] bg-canvas-100 rounded-xl p-6 border border-ink-100 flex items-center justify-center">
                <Image
                  src={activeCamera.cutoutImage}
                  alt={activeCamera.name}
                  fill
                  sizes="380px"
                  className="object-contain p-4 filter drop-shadow-[0_16px_28px_rgba(20,15,10,0.2)] hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-3 left-3 bg-ink-900 text-white text-[10px] font-mono px-2 py-0.5 rounded-sm">
                  {activeCamera.brand}
                </div>
              </div>
            </div>

            {/* Profile Info & Specs */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-accent">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{activeCamera.tagline}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-4xl font-bold text-ink-900 tracking-tight">
                  {activeCamera.name}
                </h3>
              </div>

              <p className="font-sans text-sm sm:text-base text-ink-600 leading-relaxed font-normal">
                {activeCamera.description}
              </p>

              {/* 4 Feature Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 font-sans text-xs">
                {activeCamera.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-canvas-100 rounded-md border border-ink-200 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span className="font-medium text-ink-800 text-[11px]">{spec}</span>
                  </div>
                ))}
              </div>

              {/* Pricing & Link */}
              <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-ink-200/80">
                <div className="flex items-baseline gap-2 font-mono text-xs text-ink-600">
                  <span>Giá thuê:</span>
                  <strong className="text-xl font-bold text-ink-900 font-mono">
                    {activeCamera.priceDay}
                  </strong>
                  <span>/ngày</span>
                  <span className="text-ink-300">·</span>
                  <span className="text-ink-700">{activeCamera.priceSession} /buổi</span>
                  <span className="text-ink-300">·</span>
                  <span className="text-accent font-bold">{activeCamera.priceThreeDays} /3N+</span>
                </div>

                <Link
                  href={`/thiet-bi/${activeCamera.slug}`}
                  className="inline-flex items-center gap-1.5 bg-ink-900 hover:bg-black text-white text-xs font-sans font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-xs"
                >
                  <span>Xem chi tiết máy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

          {/* BOTTOM SECTION: 3 Real-World Output Moments */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-ink-500 uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-accent" />
                <span>3 KHOẢNH KHẮC THỰC TẾ CÙNG {activeCamera.name.toUpperCase()}</span>
              </div>
              <span className="text-[11px] font-sans text-ink-400">Ảnh chụp thực tế</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {activeCamera.moments.map((m, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-lg overflow-hidden bg-canvas-200 border border-ink-200 shadow-2xs flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={m.image}
                      alt={m.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-ink-900/80 text-white font-mono text-[9px] px-2 py-0.5 rounded-sm uppercase">
                      0{idx + 1}
                    </div>
                  </div>

                  <div className="p-3.5 bg-white space-y-0.5 border-t border-ink-100">
                    <h4 className="font-sans text-sm font-bold text-ink-900 group-hover:text-accent transition-colors">
                      {m.title}
                    </h4>
                    <p className="font-sans text-xs text-ink-500 font-normal line-clamp-1">
                      {m.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
