"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Rotate3d, Play, Pause, ZoomIn, ChevronLeft, ChevronRight, Check } from "lucide-react";

interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  desc: string;
  badge: string;
}

interface ProductViewAngle {
  id: string;
  name: string;
  label: string;
  src: string;
  description: string;
  hotspots: Hotspot[];
}

const PRODUCT_ANGLES: ProductViewAngle[] = [
  {
    id: "front",
    name: "Góc 3/4 Chính diện",
    label: "Mặt trước & Ống kính",
    src: "/images/canon-r50/canon-r50-front.jpg",
    description: "Cảm biến APS-C 24.2MP, ngàm RF thế hệ mới kèm lens RF-S 18-45mm IS STM chống rung mượt mà.",
    hotspots: [
      {
        id: "lens",
        x: 52,
        y: 56,
        title: "Ống kính Canon RF-S 18-45mm IS STM",
        desc: "Dải tiêu cự đa dụng chụp từ phong cảnh góc rộng đến chân dung xóa phông nhẹ, tích hợp chống rung IS.",
        badge: "Đã kèm khi thuê",
      },
      {
        id: "sensor",
        x: 62,
        y: 38,
        title: "Cảm biến 24.2MP & Dual Pixel AF II",
        desc: "Bộ xử lý DIGIC X siêu tốc, nhận diện ánh mắt người/động vật chính xác ngay cả khi chủ thể di chuyển.",
        badge: "Chất ảnh sắc nét",
      },
      {
        id: "grip",
        x: 26,
        y: 52,
        title: "Báng cầm công thái học siêu nhẹ 375g",
        desc: "Thiết kế nhỏ gọn bỏ túi, cầm nắm chắc tay cả ngày dài khi đi động Thiên Đường hay suối Moọc.",
        badge: "Trọng lượng 375g",
      },
    ],
  },
  {
    id: "top",
    name: "Góc đỉnh máy",
    label: "Bảng điều khiển & Phím bấm",
    src: "/images/canon-r50/canon-r50-top.jpg",
    description: "Hệ thống vòng xoay chế độ chụp chuyên nghiệp, nút quay video 4K nhanh và chân Hotshoe đa năng.",
    hotspots: [
      {
        id: "dial",
        x: 78,
        y: 55,
        title: "Vòng xoay chế độ (Mode Dial)",
        desc: "Đầy đủ các chế độ P/Av/Tv/M và chế độ Tự động nâng cao A+ giúp người mới bắt đầu có ảnh đẹp ngay.",
        badge: "Dễ làm quen",
      },
      {
        id: "rec",
        x: 71,
        y: 43,
        title: "Nút quay Video 4K 30p riêng biệt",
        desc: "Bấm là quay ngay chuẩn 4K oversampled từ 6K sắc nét, không bị crop góc nhìn rộng.",
        badge: "4K 30p chuẩn",
      },
      {
        id: "hotshoe",
        x: 41,
        y: 58,
        title: "Chân tiếp xúc Hotshoe thế hệ mới",
        desc: "Hỗ trợ gắn micro thu âm không dây DJI Mic 2 hoặc đèn flash trợ sáng chụp đêm tại Quảng Bình.",
        badge: "Tương thích cao",
      },
    ],
  },
  {
    id: "back",
    name: "Góc mặt sau",
    label: "Màn hình & Kính ngắm",
    src: "/images/canon-r50/canon-r50-back.webp",
    description: "Màn hình cảm ứng xoay lật 180 độ hỗ trợ selfie/vlog cùng kính ngắm điện tử OLED 2.36 triệu điểm.",
    hotspots: [
      {
        id: "screen",
        x: 44,
        y: 60,
        title: "Màn hình cảm ứng xoay lật 3.0 inch",
        desc: "Xoay lật linh hoạt 180 độ ra phía trước giúp bạn tự tin canh khung chụp selfie hoặc quay vlog du lịch.",
        badge: "Màn hình xoay lật",
      },
      {
        id: "evf",
        x: 43,
        y: 27,
        title: "Kính ngắm điện tử OLED EVF",
        desc: "Độ phân giải cao 2.36M điểm ảnh, ngắm rõ ràng sắc nét ngay cả dưới trời nắng gắt biển Nhật Lệ.",
        badge: "OLED sắc nét",
      },
      {
        id: "controls",
        x: 77,
        y: 68,
        title: "Cụm phím điều khiển thao tác nhanh",
        desc: "Phím Quick Set (Q), Menu và nút xem lại ảnh được bố trí trực quan, thao tác nhanh trong 1 chạm.",
        badge: "Thao tác 1 tay",
      },
    ],
  },
];

export function React360Viewer({ className = "" }: { className?: string }) {
  const [currentAngleIndex, setCurrentAngleIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number>(0);

  const currentView = PRODUCT_ANGLES[currentAngleIndex];

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentAngleIndex((prev) => (prev + 1) % PRODUCT_ANGLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setMouseTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = e.clientX - dragStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setCurrentAngleIndex((prev) => (prev === 0 ? PRODUCT_ANGLES.length - 1 : prev - 1));
      } else {
        setCurrentAngleIndex((prev) => (prev + 1) % PRODUCT_ANGLES.length);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - dragStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setCurrentAngleIndex((prev) => (prev === 0 ? PRODUCT_ANGLES.length - 1 : prev - 1));
      } else {
        setCurrentAngleIndex((prev) => (prev + 1) % PRODUCT_ANGLES.length);
      }
    }
  };

  return (
    <div className={`relative w-full h-full flex flex-col justify-between select-none ${className}`}>
      {/* Top Controls Bar */}
      <div className="relative z-30 flex items-center justify-between gap-2 p-2.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-md text-white">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-5 h-5 rounded-md bg-accent text-white text-[10px] font-bold">
            <Rotate3d className="w-3 h-3" />
          </span>
          <div>
            <span className="text-[10px] font-mono text-white/70 block uppercase tracking-wider">
              Góc {currentAngleIndex + 1}/{PRODUCT_ANGLES.length}
            </span>
            <h4 className="text-xs font-sans font-semibold text-white tracking-tight leading-none">
              {currentView.name}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className={`p-1.5 rounded-md border border-white/20 transition-all cursor-pointer ${
              isZoomed ? "bg-white text-ink-900 shadow" : "bg-black/30 text-white hover:bg-white/20"
            }`}
            title="Phóng to chi tiết"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-sans font-medium border border-white/20 transition-all cursor-pointer ${
              isAutoPlay ? "bg-accent text-white font-semibold" : "bg-black/30 text-white hover:bg-white/20"
            }`}
            title="Tự động xoay qua các góc"
          >
            {isAutoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
            <span className="hidden sm:inline">{isAutoPlay ? "Dừng" : "Xoay 360°"}</span>
          </button>
        </div>
      </div>

      {/* Turntable Canvas */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative flex-1 min-h-[280px] sm:min-h-[340px] flex items-center justify-center my-2 cursor-grab active:cursor-grabbing group overflow-hidden rounded-xl"
      >
        <div className="absolute bottom-4 w-3/4 h-10 bg-black/40 rounded-full blur-xl pointer-events-none transition-all duration-300 group-hover:scale-105" />

        <div
          className="relative w-full max-w-[400px] aspect-[4/3] flex items-center justify-center transition-transform duration-300 ease-out"
          style={{
            transform: `perspective(1000px) rotateY(${mouseTilt.x}deg) rotateX(${-mouseTilt.y}deg) scale(${isZoomed ? 1.25 : 1})`,
          }}
        >
          <div className="relative w-full h-full p-2 flex items-center justify-center">
            <Image
              src={currentView.src}
              alt={currentView.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] transition-all duration-500 ease-out"
            />
          </div>

          {!isZoomed &&
            currentView.hotspots.map((hotspot) => (
              <div
                key={hotspot.id}
                style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(activeHotspot?.id === hotspot.id ? null : hotspot);
                  }}
                  className="relative group/pin p-2 focus:outline-none cursor-pointer"
                  aria-label={hotspot.title}
                >
                  <span className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-accent animate-ping opacity-75" />
                  <span className="relative flex items-center justify-center w-4 h-4 rounded-full bg-ink-900 text-white border border-white shadow-md text-[9px] font-bold group-hover/pin:scale-125 group-hover/pin:bg-accent transition-all duration-200">
                    +
                  </span>
                </button>
              </div>
            ))}
        </div>

        {/* Arrow controls */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentAngleIndex((prev) => (prev === 0 ? PRODUCT_ANGLES.length - 1 : prev - 1));
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-md z-20 cursor-pointer"
          aria-label="Góc trước"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentAngleIndex((prev) => (prev + 1) % PRODUCT_ANGLES.length);
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-md z-20 cursor-pointer"
          aria-label="Góc sau"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="absolute bottom-2 inset-x-0 mx-auto w-fit pointer-events-none text-[10px] font-mono text-white/70 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10">
          Kéo hoặc bấm mũi tên để đổi góc nhìn
        </div>
      </div>

      {/* Hotspot Popup */}
      {activeHotspot && (
        <div className="relative z-30 mb-2 p-3 bg-white text-ink-900 rounded-lg shadow-xl border border-black/10 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="inline-block px-1.5 py-0.5 rounded bg-accent/10 text-accent text-[10px] font-mono font-medium uppercase mb-0.5">
                {activeHotspot.badge}
              </div>
              <h5 className="text-xs font-sans font-bold text-ink-900 leading-tight">
                {activeHotspot.title}
              </h5>
              <p className="text-[11px] font-sans text-ink-600 mt-0.5 leading-snug">
                {activeHotspot.desc}
              </p>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="p-1 text-ink-400 hover:text-ink-900 rounded text-xs font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Angle Selector Tabs */}
      <div className="relative z-20 grid grid-cols-3 gap-2">
        {PRODUCT_ANGLES.map((angle, idx) => {
          const isActive = currentAngleIndex === idx;
          return (
            <button
              key={angle.id}
              onClick={() => {
                setCurrentAngleIndex(idx);
                setActiveHotspot(null);
              }}
              className={`p-2 rounded-lg text-left transition-all border cursor-pointer ${
                isActive
                  ? "bg-white text-ink-900 border-white shadow-md scale-[1.01]"
                  : "bg-white/10 hover:bg-white/20 text-white/80 border-white/15"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-medium ${isActive ? "text-accent" : "text-white/60"}`}>
                  0{idx + 1}
                </span>
                {isActive && <Check className="w-3 h-3 text-accent" />}
              </div>
              <div className="text-[11px] font-sans font-semibold mt-0.5 truncate leading-tight">
                {angle.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
