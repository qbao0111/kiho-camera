"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "@/components/ui/source-image";
import Link from "next/link";
import {
  Camera,
  Download,
  Sparkles,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Upload,
  Eye,
  Check,
  Compass,
  Sun,
  Coffee,
  Zap,
  RefreshCw,
  Info,
  Maximize2,
  Share2,
} from "lucide-react";

type ConceptKey = "phong-nha" | "dong-hoi-sunset" | "cafe-chill" | "y2k-flash";
type AspectRatio = "9x16" | "4x5";
type ViewMode = "mockup" | "transparent" | "interactive";

interface ConceptData {
  id: ConceptKey;
  name: string;
  vietnameseTitle: string;
  tagline: string;
  vibe: string;
  icon: React.ElementType;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  sampleImage: string;
  recommendedCamera: string;
  targetAudience: string;
  palette: { name: string; hex: string; role: string }[];
  typography: string;
  keyElements: string[];
  story: string;
}

const CONCEPTS: Record<ConceptKey, ConceptData> = {
  "phong-nha": {
    id: "phong-nha",
    name: "Phong Nha Adventure",
    vietnameseTitle: "Hành Trình Di Sản Triệu Năm",
    tagline: "Khám phá hang động, dòng sông Son xanh ngọc & núi đá vôi kỳ vĩ",
    vibe: "Outdoorsy, phiêu lưu, postcard scrapbook, tem thám hiểm di sản UNESCO",
    icon: Compass,
    accentColor: "#1B3B2B",
    badgeBg: "bg-[#1B3B2B]/10 text-[#1B3B2B] border-[#1B3B2B]/20",
    badgeText: "Di Sản UNESCO • Nhóm Bạn",
    sampleImage: "/images/samples/sample-fuji-2.webp",
    recommendedCamera: "Fujifilm X-T30 II / Sony A6400",
    targetAudience: "Nhóm bạn trẻ, phượt khám phá, dã ngoại sông Son & Vườn Quốc Gia",
    palette: [
      { name: "Forest Pine", hex: "#1B3B2B", role: "Màu chủ đạo / Khung viền" },
      { name: "Warm Parchment", hex: "#F8F5EE", role: "Nền giấy mỹ thuật xúc giác" },
      { name: "Terracotta Accent", hex: "#D95D39", role: "Điểm nhấn tem & chữ phụ" },
      { name: "Son River Teal", hex: "#2E7D73", role: "Huy hiệu dòng sông xanh ngọc" },
      { name: "Karst Ochre", hex: "#E5A93C", role: "Chỉ viền vàng nắng" },
    ],
    typography: "Playfair Display 900 (Headline) + JetBrains Mono 700 (Tọa độ) + Be Vietnam Pro (Mô tả)",
    keyElements: [
      "Con dấu thám hiểm tròn KIHO EXPEDITION xoay nghiêng 12°",
      "Đường đồng mức địa hình (topographic contours) đá vôi Phong Nha",
      "Góc cài ảnh cổ điển (corner photo tabs) màu cam đất",
      "3 thẻ điểm nhấn: Sông Son xanh biếc • Kỳ quan động • Dấu ấn bạn bè",
      "Tọa độ thực địa 17°32'N 106°17'E & mã vé du lịch KIHO-PN-2026",
    ],
    story:
      "Lấy cảm hứng từ những chuyến đi thuyền trên sông Son tiến vào hang động tráng lệ. Thiết kế thay thế cách xếp chữ dày đặc của tờ rơi du lịch bằng bố cục bưu thiếp dã ngoại thanh lịch, tôn vinh hình ảnh nhóm bạn check-in giữa thiên nhiên Quảng Bình.",
  },
  "dong-hoi-sunset": {
    id: "dong-hoi-sunset",
    name: "Đồng Hới Beach & Sunset",
    vietnameseTitle: "Hoàng Hôn Biển Nhật Lệ",
    tagline: "Nắng chiều nhuộm vàng sóng biển Bảo Ninh & những khoảnh khắc dịu êm",
    vibe: "Warm, breezy, lãng mạn, hơi thở điện ảnh nhẹ nhàng, hoài niệm",
    icon: Sun,
    accentColor: "#D95D39",
    badgeBg: "bg-[#D95D39]/10 text-[#D95D39] border-[#D95D39]/20",
    badgeText: "Hoàng Hôn • Cặp Đôi & Solo",
    sampleImage: "/images/samples/sample-r50-1.webp",
    recommendedCamera: "Canon EOS R50 / Sony ZV-E10",
    targetAudience: "Cặp đôi du lịch, ảnh chân dung hoàng hôn, check-in bãi biển",
    palette: [
      { name: "Sunset Terracotta", hex: "#D95D39", role: "Màu chủ đạo hoàng hôn Kiho" },
      { name: "Golden Cream", hex: "#FDF8F4", role: "Nền trời nắng nhạt dịu mắt" },
      { name: "Sunlit Amber", hex: "#F29C38", role: "Tia nắng & đường viền kép" },
      { name: "Sea Mist Slate", hex: "#3D7068", role: "Sóng biển viền nhạt" },
      { name: "Deep Dusk Ink", hex: "#1C1917", role: "Typography tương phản" },
    ],
    typography: "Playfair Display Serif Italic (Sunset & Sea Breeze) + JetBrains Mono (Film Roll)",
    keyElements: [
      "Huy hiệu mặt trời lặn 17:45 cùng tia nắng tỏa nhẹ",
      "Họa tiết sóng biển tối giản vẽ tay uốn lượn ở góc",
      "Đường viền kép thanh mảnh với 4 điểm ngắm chữ thập (+) tại góc ảnh",
      "Thông số cuộn phim film roll: CANON R50 • 35MM F/1.8 • GOLDEN HOUR",
      "Dòng thơ cảm xúc về sóng biển và thanh xuân ven bờ Nhật Lệ",
    ],
    story:
      "Tái hiện trọn vẹn không khí hoàng hôn vàng rực rỡ bên bờ biển Đồng Hới. Bố cục rộng rãi, sang trọng như một trang tạp chí du lịch biển cao cấp, biến mỗi bức ảnh chụp đôi hay chân dung thành một tấm thiệp kỷ niệm ngọt ngào.",
  },
  "cafe-chill": {
    id: "cafe-chill",
    name: "Cafe Check-in / City Chill",
    vietnameseTitle: "Góc Phố Đồng Hới & Cà Phê Chiều",
    tagline: "Không gian thường nhật nhẹ nhàng, tách cà phê thơm và phố phường Đồng Hới",
    vibe: "Minimal editorial, lifestyle, phong cách tạp chí nghệ thuật đương đại",
    icon: Coffee,
    accentColor: "#141414",
    badgeBg: "bg-ink-900/10 text-ink-900 border-ink-900/20",
    badgeText: "Lifestyle • Chân Dung & Phố",
    sampleImage: "/images/samples/sample-g7x-1.webp",
    recommendedCamera: "Fujifilm X100V / Ricoh GR III",
    targetAudience: "Chân dung cà phê, phong cách OOTD, dạo phố Đồng Hới cuối tuần",
    palette: [
      { name: "Gallery Linen", hex: "#F8F7F4", role: "Nền giấy mỹ thuật triển lãm" },
      { name: "Charcoal Ink", hex: "#141414", role: "Kiểu chữ biên tập tối giản" },
      { name: "Warm Latte", hex: "#A88B74", role: "Chỉ dẫn cà phê & viền mỏng" },
      { name: "Washi Tape Beige", hex: "#E5DCCE", role: "Miếng băng keo dán góc" },
      { name: "Kiho Terracotta", hex: "#D95D39", role: "Nút phát thanh âm nhạc" },
    ],
    typography: "Plus Jakarta Sans ExtraBold + Playfair Display Italic + JetBrains Mono",
    keyElements: [
      "Sticker băng keo giấy Washi Tape dán nghiêng 4°: KIHO / CHECK-IN ☕",
      "Thanh phát nhạc acoustic: 'Đồng Hới Chiều Mưa Bay — 02:14 / 03:45'",
      "Ký hiệu tâm ngắm máy ảnh tối giản [ • ] ở trung tâm",
      "Ô đóng dấu ghi ngày tháng DATE / MEMORY: 2026 . 08 . 29",
      "Lưới viền biên tập tinh tế chuẩn phong cách Art Journal",
    ],
    story:
      "Dành riêng cho những buổi chiều thảnh thơi la cà quán xá Đồng Hới. Bố cục mang tinh thần Kinfolk / Cereal Magazine hiện đại, điểm xuyết thanh phát nhạc trendy giúp bức ảnh sống động như một khoảnh khắc quay chậm.",
  },
  "y2k-flash": {
    id: "y2k-flash",
    name: "Y2K / Flash Memory",
    vietnameseTitle: "Flash Máy Kỹ Thuật Số 2000s",
    tagline: "Đèn flash bừng sáng, ngôi sao chrome kim loại và năng lượng thanh xuân Gen Z",
    vibe: "Early-digital digicam HUD, cyber pop, chrome glitter, vui tươi, phá cách",
    icon: Zap,
    accentColor: "#38BDF8",
    badgeBg: "bg-[#38BDF8]/10 text-[#0284C7] border-[#38BDF8]/30",
    badgeText: "Y2K Digicam • Check-in Trendy",
    sampleImage: "/images/samples/sample-y2k-1.webp",
    recommendedCamera: "Canon PowerShot G7X Mark III / Máy ảnh số Retro",
    targetAudience: "Giới trẻ Gen Z, chụp flash tiệc tối, check-in Instagram/TikTok cá tính",
    palette: [
      { name: "Cyber Titanium", hex: "#0E1017", role: "Nền màn hình máy ảnh số ban đêm" },
      { name: "Liquid Chrome", hex: "#E2E8F0", role: "Ngôi sao kim loại & viền sáng" },
      { name: "Electric Cyan", hex: "#38BDF8", role: "HUD máy ảnh & tâm ngắm AF" },
      { name: "Flash Orange", hex: "#FF6B00", role: "Dấu ngày điện tử 7 đoạn cổ điển" },
      { name: "Hologram Violet", hex: "#C084FC", role: "Gradient sticker chuyển màu" },
    ],
    typography: "Plus Jakarta Sans 900 + JetBrains Mono 800 (Digital HUD & OSD)",
    keyElements: [
      "Thanh trạng thái máy ảnh số OSD: ● REC [SP] 00:24:18 • Pin 95% • Flash ON ⚡",
      "Dấu ngày tháng cam điện tử 7-segment huyền thoại: ’26 08 29",
      "Họa tiết ngôi sao bốn cánh Chrome lấp lánh (✦ ✧ ⋆)",
      "Khung ngắm lấy nét tự động [ + ] kèm thông số ISO 400 • F/2.8 • 1/125s",
      "Bộ tem nhãn ba chiều Holographic: ★ PURE MEMORY ★ & SMILE & FLASH 📸",
    ],
    story:
      "Tái hiện cơn sốt máy ảnh kỹ thuật số đầu những năm 2000 đang làm mưa làm gió trong giới trẻ. Khung hình mang phong cách kính ngắm LCD đêm, tôn bật những bức ảnh chụp flash rực rỡ và nụ cười rạng rỡ của bạn bè.",
  },
};

const PRESET_PHOTOS = [
  { id: "sample-fuji-2", name: "Dã ngoại sông Son", path: "/images/samples/sample-fuji-2.webp" },
  { id: "sample-r50-1", name: "Hoàng hôn biển", path: "/images/samples/sample-r50-1.webp" },
  { id: "sample-g7x-1", name: "Quán cà phê phố", path: "/images/samples/sample-g7x-1.webp" },
  { id: "sample-y2k-1", name: "Flash đêm năng động", path: "/images/samples/sample-y2k-1.webp" },
  { id: "sample-sony-1", name: "Chân dung ngoài trời", path: "/images/samples/sample-sony-1.webp" },
  { id: "sample-fuji-1", name: "Cặp đôi du lịch", path: "/images/samples/sample-fuji-1.webp" },
];

export default function PhotoboothPage() {
  const [selectedConcept, setSelectedConcept] = useState<ConceptKey>("phong-nha");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("9x16");
  const [viewMode, setViewMode] = useState<ViewMode>("mockup");

  // Interactive Live Studio States
  const [customPhoto, setCustomPhoto] = useState<string>("/images/samples/sample-fuji-2.webp");
  const [zoom, setZoom] = useState<number>(100);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentConcept = CONCEPTS[selectedConcept];
  const framePngPath = `/photobooth/frames/${selectedConcept}-${aspectRatio}.png`;
  const frameSvgPath = `/photobooth/frames/${selectedConcept}-${aspectRatio}.svg`;
  const mockupPath = `/photobooth/mockups/${selectedConcept}-${aspectRatio}-mockup.webp`;

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomPhoto(event.target.result as string);
          setZoom(100);
          setPanX(0);
          setPanY(0);
          setRotation(0);
          setViewMode("interactive");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset Adjustments
  const handleResetAdjustments = () => {
    setZoom(100);
    setPanX(0);
    setPanY(0);
    setRotation(0);
  };

  // Dragging / Panning handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (viewMode !== "interactive") return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || viewMode !== "interactive") return;
    setPanX(e.clientX - dragStart.x);
    setPanY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Export Composite High-Res Image
  const handleDownloadComposite = async () => {
    setIsExporting(true);
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const is9x16 = aspectRatio === "9x16";
      canvas.width = 1080;
      canvas.height = is9x16 ? 1920 : 1350;

      // Cutout coordinates
      const cx = 70;
      const cy = is9x16 ? 360 : 230;
      const cw = 940;
      const ch = is9x16 ? 1150 : 810;

      // 1. Draw user photo in cutout window
      const userImg = new window.Image();
      userImg.crossOrigin = "anonymous";
      await new Promise((resolve, reject) => {
        userImg.onload = resolve;
        userImg.onerror = reject;
        userImg.src = customPhoto;
      });

      ctx.save();
      // Clip to cutout area
      ctx.beginPath();
      const radius = selectedConcept === "cafe-chill" ? 14 : 22;
      ctx.roundRect(cx, cy, cw, ch, radius);
      ctx.clip();

      // Transform photo
      const photoCenterX = cx + cw / 2 + panX * 2;
      const photoCenterY = cy + ch / 2 + panY * 2;
      ctx.translate(photoCenterX, photoCenterY);
      ctx.rotate((rotation * Math.PI) / 180);
      const scaleFactor = (zoom / 100) * Math.max(cw / userImg.width, ch / userImg.height);
      const drawW = userImg.width * scaleFactor;
      const drawH = userImg.height * scaleFactor;
      ctx.drawImage(userImg, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();

      // 2. Draw Frame Overlay PNG on top
      const frameImg = new window.Image();
      frameImg.crossOrigin = "anonymous";
      await new Promise((resolve, reject) => {
        frameImg.onload = resolve;
        frameImg.onerror = reject;
        frameImg.src = framePngPath;
      });

      ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

      // Download
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `kiho-photobooth-${selectedConcept}-${aspectRatio}.png`;
      a.click();
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-ink-900 selection:bg-accent/20">
      {/* ================= HERO HEADER ================= */}
      <section className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-ink-200/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Kiho Photobooth Design System
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-ink-900 tracking-tight">
              Bộ Khung Ảnh Du Lịch Độc Quyền
            </h1>
            <p className="mt-2 text-base sm:text-lg text-ink-600 max-w-2xl font-sans font-normal">
              Được thiết kế nguyên bản cho thương hiệu{" "}
              <strong className="text-ink-900 font-semibold">Kiho Camera (Đồng Hới, Quảng Bình)</strong>. Mang
              tinh thần sổ tay du lịch (Travel Journal), năng lượng check-in trẻ trung và màu sắc nhiếp ảnh hoài
              niệm.
            </p>
          </div>

          {/* Quick Stats / Specs */}
          <div className="flex items-center gap-3 self-start md:self-auto bg-white border border-ink-200 rounded-xl p-3 shadow-sm">
            <div className="px-3 border-r border-ink-100 text-center">
              <div className="font-mono text-xl font-bold text-accent">04</div>
              <div className="text-[11px] text-ink-500 font-medium">Khái Niệm</div>
            </div>
            <div className="px-3 border-r border-ink-100 text-center">
              <div className="font-mono text-xl font-bold text-ink-900">02</div>
              <div className="text-[11px] text-ink-500 font-medium">Tỷ Lệ (9:16 & 4:5)</div>
            </div>
            <div className="px-3 text-center">
              <div className="font-mono text-xl font-bold text-emerald-600">32-bit</div>
              <div className="text-[11px] text-ink-500 font-medium">PNG Trong Suốt</div>
            </div>
          </div>
        </div>

        {/* ================= CONCEPT TABS ================= */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(Object.keys(CONCEPTS) as ConceptKey[]).map((key) => {
            const concept = CONCEPTS[key];
            const isSelected = selectedConcept === key;
            const Icon = concept.icon;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedConcept(key);
                  setCustomPhoto(concept.sampleImage);
                  handleResetAdjustments();
                }}
                className={`relative flex flex-col p-4 rounded-xl text-left transition-all border ${
                  isSelected
                    ? "bg-white border-accent shadow-md ring-2 ring-accent/15"
                    : "bg-white/60 hover:bg-white border-ink-200/80 hover:border-ink-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isSelected ? "bg-accent text-white" : "bg-ink-100 text-ink-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                  )}
                </div>
                <div className="font-display font-bold text-sm text-ink-900 line-clamp-1">{concept.name}</div>
                <div className="text-[11px] text-ink-500 font-sans mt-0.5 line-clamp-1">
                  {concept.vietnameseTitle}
                </div>
                <div className="mt-2 text-[10px] font-mono px-2 py-0.5 rounded-md self-start border bg-canvas-100 border-ink-200 text-ink-700">
                  {concept.badgeText.split("•")[0]}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ================= MAIN STUDIO WORKSPACE ================= */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: FRAME PREVIEW STAGE (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Viewport Control Bar */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 bg-white border border-ink-200 rounded-xl p-2.5 shadow-sm mb-5">
              {/* Aspect Ratio Selector */}
              <div className="flex items-center gap-1 bg-canvas-100 p-1 rounded-lg border border-ink-200/60">
                <button
                  onClick={() => setAspectRatio("9x16")}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all ${
                    aspectRatio === "9x16"
                      ? "bg-white text-ink-900 shadow-sm border border-ink-200"
                      : "text-ink-500 hover:text-ink-900"
                  }`}
                >
                  9:16 Story (1080×1920)
                </button>
                <button
                  onClick={() => setAspectRatio("4x5")}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all ${
                    aspectRatio === "4x5"
                      ? "bg-white text-ink-900 shadow-sm border border-ink-200"
                      : "text-ink-500 hover:text-ink-900"
                  }`}
                >
                  4:5 Feed (1080×1350)
                </button>
              </div>

              {/* View Mode Selector */}
              <div className="flex items-center gap-1 bg-canvas-100 p-1 rounded-lg border border-ink-200/60">
                <button
                  onClick={() => setViewMode("mockup")}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    viewMode === "mockup"
                      ? "bg-ink-900 text-white shadow-sm"
                      : "text-ink-600 hover:text-ink-900"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Ảnh Mẫu
                </button>
                <button
                  onClick={() => setViewMode("transparent")}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    viewMode === "transparent"
                      ? "bg-ink-900 text-white shadow-sm"
                      : "text-ink-600 hover:text-ink-900"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Khung Trong Suốt
                </button>
                <button
                  onClick={() => setViewMode("interactive")}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    viewMode === "interactive"
                      ? "bg-accent text-white shadow-sm"
                      : "text-ink-600 hover:text-ink-900"
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  Thử Ảnh Riêng
                </button>
              </div>
            </div>

            {/* Canvas Stage Frame Container */}
            <div className="relative w-full max-w-[440px] flex justify-center items-center">
              <div
                className={`relative w-full overflow-hidden rounded-2xl border-2 border-ink-800 shadow-2xl transition-all duration-300 ${
                  aspectRatio === "9x16" ? "aspect-[9/16]" : "aspect-[4/5]"
                }`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {/* 1. Transparent Grid Background for Overlay mode */}
                {viewMode === "transparent" && (
                  <div
                    className="absolute inset-0 z-0 bg-white"
                    style={{
                      backgroundImage: `
                        linear-gradient(45deg, #e5e5e5 25%, transparent 25%),
                        linear-gradient(-45deg, #e5e5e5 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #e5e5e5 75%),
                        linear-gradient(-45deg, transparent 75%, #e5e5e5 75%)
                      `,
                      backgroundSize: "20px 20px",
                      backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                    }}
                  />
                )}

                {/* 2. Interactive Photo Layer (Behind Frame) */}
                {viewMode === "interactive" && (
                  <div className="absolute inset-0 z-0 overflow-hidden bg-ink-900 flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
                    <div
                      className="absolute transition-transform duration-75"
                      style={{
                        transform: `translate(${panX}px, ${panY}px) scale(${zoom / 100}) rotate(${rotation}deg)`,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={customPhoto}
                        alt="User composite test"
                        className="max-w-none pointer-events-none"
                        style={{ width: "440px", height: "auto" }}
                      />
                    </div>
                  </div>
                )}

                {/* 3. Static Pre-rendered Mockup View */}
                {viewMode === "mockup" && (
                  <div className="absolute inset-0 z-10">
                    <Image
                      src={mockupPath}
                      alt={`${currentConcept.name} Mockup`}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 440px"
                    />
                  </div>
                )}

                {/* 4. Frame Overlay Layer (Used in Transparent and Interactive modes) */}
                {(viewMode === "transparent" || viewMode === "interactive") && (
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    <Image
                      src={framePngPath}
                      alt={`${currentConcept.name} Frame Overlay`}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 440px"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Mode Tool Controls */}
            {viewMode === "interactive" && (
              <div className="w-full max-w-[440px] mt-4 bg-white border border-ink-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between text-xs font-semibold text-ink-700 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-accent" />
                    Căn chỉnh ảnh sau khung:
                  </span>
                  <button
                    onClick={handleResetAdjustments}
                    className="flex items-center gap-1 text-[11px] text-ink-500 hover:text-accent font-mono transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" /> Đặt lại
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Zoom Slider */}
                  <div className="flex items-center gap-3">
                    <ZoomOut className="w-4 h-4 text-ink-400 shrink-0" />
                    <input
                      type="range"
                      min="70"
                      max="250"
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="w-full accent-accent cursor-pointer"
                    />
                    <ZoomIn className="w-4 h-4 text-ink-400 shrink-0" />
                    <span className="text-xs font-mono font-semibold w-12 text-right">{zoom}%</span>
                  </div>

                  {/* Rotation Slider */}
                  <div className="flex items-center gap-3">
                    <RotateCw className="w-4 h-4 text-ink-400 shrink-0" />
                    <input
                      type="range"
                      min="-30"
                      max="30"
                      value={rotation}
                      onChange={(e) => setRotation(Number(e.target.value))}
                      className="w-full accent-accent cursor-pointer"
                    />
                    <span className="text-xs font-mono font-semibold w-12 text-right">{rotation}°</span>
                  </div>

                  <p className="text-[11px] text-ink-400 italic">
                    💡 Mẹo: Bấm giữ và kéo chuột trên khung hình để di chuyển ảnh (pan) theo ý muốn.
                  </p>
                </div>
              </div>
            )}

            {/* Quick Action Download Buttons Bar */}
            <div className="w-full max-w-[440px] mt-4 flex flex-col sm:flex-row gap-2.5">
              {viewMode === "interactive" ? (
                <button
                  onClick={handleDownloadComposite}
                  disabled={isExporting}
                  className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white rounded-lg px-4 py-3 font-sans font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <Download className="w-4 h-4" />
                  {isExporting ? "Đang xuất ảnh 1080p..." : "Tải Ảnh Ghép Hoàn Chỉnh (PNG)"}
                </button>
              ) : (
                <a
                  href={framePngPath}
                  download={`kiho-${selectedConcept}-${aspectRatio}.png`}
                  className="flex-1 flex items-center justify-center gap-2 bg-ink-900 hover:bg-black text-white rounded-lg px-4 py-3 font-sans font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <Download className="w-4 h-4" />
                  Tải Khung PNG Trong Suốt (1080p)
                </a>
              )}

              <a
                href={frameSvgPath}
                download={`kiho-${selectedConcept}-${aspectRatio}.svg`}
                className="flex items-center justify-center gap-1.5 border border-ink-300 text-ink-800 bg-white hover:bg-ink-50 rounded-lg px-4 py-3 font-sans font-medium text-sm transition-all"
                title="Tải file vector SVG gốc"
              >
                <Layers className="w-4 h-4" />
                SVG
              </a>
            </div>
          </div>

          {/* RIGHT: DESIGN SPECIFICATION & PHOTO PICKER (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Concept Dossier Card */}
            <div className="bg-white border border-ink-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${currentConcept.badgeBg}`}
                  >
                    {currentConcept.badgeText}
                  </span>
                  <h2 className="text-2xl font-display font-bold text-ink-900 mt-2">
                    {currentConcept.name}
                  </h2>
                  <div className="text-sm font-sans font-medium text-accent">
                    {currentConcept.vietnameseTitle}
                  </div>
                </div>
              </div>

              <p className="mt-3 text-sm text-ink-600 leading-relaxed font-sans">
                {currentConcept.story}
              </p>

              {/* Design Elements Breakdown */}
              <div className="mt-5 pt-5 border-t border-ink-100">
                <h3 className="text-xs font-mono font-bold text-ink-900 uppercase tracking-wider mb-3">
                  Chi Tiết Thiết Kế Đặc Trưng
                </h3>
                <ul className="space-y-2">
                  {currentConcept.keyElements.map((elem, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-ink-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{elem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Typography Specs */}
              <div className="mt-5 pt-5 border-t border-ink-100">
                <h3 className="text-xs font-mono font-bold text-ink-900 uppercase tracking-wider mb-2">
                  Hệ Thống Typography
                </h3>
                <div className="text-xs font-mono text-ink-700 bg-canvas-100 p-2.5 rounded-lg border border-ink-200/70">
                  {currentConcept.typography}
                </div>
              </div>

              {/* Color Palette Tokens */}
              <div className="mt-5 pt-5 border-t border-ink-100">
                <h3 className="text-xs font-mono font-bold text-ink-900 uppercase tracking-wider mb-3">
                  Bảng Màu Thương Hiệu (Brand Palette)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {currentConcept.palette.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-1.5 rounded-lg border border-ink-100 bg-canvas-50"
                    >
                      <div
                        className="w-6 h-6 rounded-md border border-black/10 shrink-0 shadow-xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div className="min-w-0">
                        <div className="text-[11px] font-medium text-ink-900 truncate">{c.name}</div>
                        <div className="text-[10px] font-mono text-ink-400">{c.hex}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Gear */}
              <div className="mt-5 pt-4 border-t border-ink-100 flex items-center justify-between text-xs">
                <span className="text-ink-500">Máy ảnh đề xuất tại Kiho:</span>
                <span className="font-mono font-bold text-ink-900 bg-ink-50 px-2.5 py-1 rounded border border-ink-200">
                  {currentConcept.recommendedCamera}
                </span>
              </div>
            </div>

            {/* Sample Photo Chooser & Custom Upload */}
            <div className="bg-white border border-ink-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-base text-ink-900">
                  Thử Nghiệm Với Ảnh Mẫu
                </h3>
                <span className="text-xs font-mono text-ink-500">Preset Gallery</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 mb-4">
                {PRESET_PHOTOS.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => {
                      setCustomPhoto(photo.path);
                      setViewMode("interactive");
                    }}
                    className={`group relative aspect-[4/5] rounded-lg overflow-hidden border-2 transition-all ${
                      customPhoto === photo.path && viewMode === "interactive"
                        ? "border-accent ring-2 ring-accent/20"
                        : "border-ink-200 hover:border-ink-400"
                    }`}
                  >
                    <Image
                      src={photo.path}
                      alt={photo.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="120px"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-1.5 text-left">
                      <div className="text-[10px] font-semibold text-white truncate">{photo.name}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Upload Your Own Button */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-ink-300 hover:border-accent bg-canvas-50 hover:bg-accent/5 text-ink-700 hover:text-accent rounded-xl p-3.5 font-sans font-medium text-xs transition-all"
                >
                  <Upload className="w-4 h-4" />
                  Tải Ảnh Cá Nhân Để Ghép Khung Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ALL 4 CONCEPTS SHOWCASE GRID ================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-ink-200/80">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink-900">
            Tổng Hợp 4 Concept Khung Ảnh Kiho
          </h2>
          <p className="mt-2 text-sm text-ink-600 font-sans">
            Mỗi khung hình mang một phong cách riêng biệt, sẵn sàng triển khai thành tính năng chụp ảnh online
            trực tiếp trên website Kiho Camera.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(Object.keys(CONCEPTS) as ConceptKey[]).map((key) => {
            const c = CONCEPTS[key];
            const isCurrent = selectedConcept === key;
            return (
              <div
                key={key}
                className={`bg-white rounded-2xl border transition-all overflow-hidden flex flex-col ${
                  isCurrent ? "border-accent shadow-lg" : "border-ink-200 hover:border-ink-300 shadow-sm"
                }`}
              >
                {/* Visual Preview */}
                <div
                  className="relative aspect-[9/16] bg-canvas-100 cursor-pointer overflow-hidden group"
                  onClick={() => {
                    setSelectedConcept(key);
                    setAspectRatio("9x16");
                    setViewMode("mockup");
                    window.scrollTo({ top: 120, behavior: "smooth" });
                  }}
                >
                  <Image
                    src={`/photobooth/mockups/${key}-9x16-mockup.webp`}
                    alt={c.name}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/30 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-ink-900 px-3 py-1.5 rounded-full font-mono text-xs font-bold shadow-lg">
                      Xem Chi Tiết ↗
                    </span>
                  </div>
                </div>

                {/* Card Meta */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-mono font-bold text-accent uppercase tracking-wider">
                      Concept #{key === "phong-nha" ? "01" : key === "dong-hoi-sunset" ? "02" : key === "cafe-chill" ? "03" : "04"}
                    </div>
                    <h3 className="font-display font-bold text-base text-ink-900 mt-1">{c.name}</h3>
                    <p className="text-xs text-ink-500 mt-1 font-sans line-clamp-2">{c.tagline}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-ink-100 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-ink-400">9:16 + 4:5 Ready</span>
                    <button
                      onClick={() => {
                        setSelectedConcept(key);
                        window.scrollTo({ top: 120, behavior: "smooth" });
                      }}
                      className="text-xs font-semibold text-accent hover:text-accent-hover"
                    >
                      Chọn Khung →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= BOTTOM CTA / TRAVEL CALLOUT ================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-12">
        <div className="bg-canvas-900 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-accent font-mono text-xs font-bold tracking-widest uppercase mb-3">
              <Camera className="w-4 h-4" />
              Boutique Camera Rental • Quảng Bình
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Sẵn Sàng Ghi Lại Chuyến Đi Cùng Kiho Camera?
            </h2>
            <p className="mt-3 text-sm text-ink-300 leading-relaxed font-sans">
              Thuê máy ảnh du lịch chất lượng cao tại Đồng Hới (Canon R50, Fujifilm, Sony, Digicam Y2K),
              nhận máy nhanh chóng và lưu giữ từng thước ảnh đẹp nhất cùng bộ khung Photobooth độc quyền.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/thiet-bi"
                className="bg-accent hover:bg-accent-hover text-white rounded-lg px-6 py-3 font-sans font-semibold text-sm transition-all shadow-md"
              >
                Xem Danh Sách Máy Ảnh
              </Link>
              <Link
                href="/lien-he"
                className="border border-ink-700 text-white hover:bg-white/10 rounded-lg px-6 py-3 font-sans font-medium text-sm transition-all"
              >
                Liên Hệ Đặt Thuê Máy
              </Link>
            </div>
          </div>

          {/* Decorative Aperture Ring in Background */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full border-8 border-white/5 pointer-events-none flex items-center justify-center">
            <div className="w-56 h-56 rounded-full border-4 border-white/5 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-2 border-accent/20" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
