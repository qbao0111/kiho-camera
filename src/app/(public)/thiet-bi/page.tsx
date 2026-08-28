import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Camera } from "lucide-react";
import { getEquipmentList } from "@/lib/services/equipment";
import { ProductCard } from "@/components/public/product-card";
import { CatalogFilterBar } from "@/components/public/catalog-filter-bar";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Danh sách máy ảnh cho thuê tại Quảng Bình",
  description:
    "Bảng giá cho thuê 12 dòng máy ảnh du lịch Canon, Fujifilm, Sony chính hãng tại TP. Đồng Hới, Quảng Bình. Đầy đủ pin, sạc, thẻ nhớ, nhận máy chụp đẹp ngay.",
  alternates: {
    canonical: "/thiet-bi",
  },
};

interface EquipmentPageProps {
  searchParams: {
    brand?: string;
    useCase?: string;
    search?: string;
    sort?: "price_asc" | "price_desc" | "name_asc" | "newest" | "featured";
  };
}

export default async function EquipmentListPage({ searchParams }: EquipmentPageProps) {
  const currentBrand = searchParams.brand || "all";
  const currentUseCase = searchParams.useCase;
  const currentSearch = searchParams.search;
  const currentSort = searchParams.sort || "featured";

  const allEquipment = await getEquipmentList({ onlyActive: true });

  const totalCount = allEquipment.length;
  const fujiCount = allEquipment.filter((e) => e.brand.toLowerCase() === "fujifilm").length;
  const canonCount = allEquipment.filter((e) => e.brand.toLowerCase() === "canon").length;
  const sonyCount = allEquipment.filter((e) => e.brand.toLowerCase() === "sony").length;

  let filteredList = allEquipment;

  if (currentBrand && currentBrand !== "all") {
    const b = currentBrand.toLowerCase();
    filteredList = filteredList.filter((e) => e.brand.toLowerCase() === b);
  }

  if (currentUseCase) {
    const uc = currentUseCase.toLowerCase();
    filteredList = filteredList.filter((e) =>
      e.use_cases?.some((u) => u.toLowerCase() === uc)
    );
  }

  if (currentSearch) {
    const q = currentSearch.toLowerCase().trim();
    filteredList = filteredList.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.brand.toLowerCase().includes(q) ||
        e.short_description?.toLowerCase().includes(q) ||
        e.badges?.some((b) => b.toLowerCase().includes(q))
    );
  }

  if (currentSort === "price_asc") {
    filteredList = [...filteredList].sort((a, b) => a.price_per_day - b.price_per_day);
  } else if (currentSort === "price_desc") {
    filteredList = [...filteredList].sort((a, b) => b.price_per_day - a.price_per_day);
  } else if (currentSort === "name_asc") {
    filteredList = [...filteredList].sort((a, b) => a.name.localeCompare(b.name));
  } else {
    filteredList = [...filteredList].sort((a, b) => a.sort_order - b.sort_order);
  }

  const brands = [
    { key: "all", label: `Tất cả (${totalCount})` },
    { key: "fujifilm", label: `Fujifilm (${fujiCount})` },
    { key: "canon", label: `Canon (${canonCount})` },
    { key: "sony", label: `Sony (${sonyCount})` },
  ];


  return (
    <div className="bg-[#faf8f5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Editorial Heading */}
        <FadeIn className="space-y-2 pb-6 border-b border-ink-200">
          <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-wider text-ink-500 uppercase">
            <Camera className="w-3.5 h-3.5 text-accent" />
            <span>MÁY ẢNH KIHO</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-5xl font-bold text-ink-900 tracking-tight">
                Chọn chiếc máy hợp chuyến đi
              </h1>
              <p className="mt-1 text-sm sm:text-base text-ink-600 font-sans font-normal max-w-2xl">
                12 dòng máy cho du lịch, check-in, couple, vlog và những hôm chỉ muốn mang về thật nhiều ảnh đẹp.
              </p>
            </div>
            <span className="text-xs sm:text-sm font-sans text-ink-500 shrink-0">
              <strong className="font-mono font-bold text-ink-900">{filteredList.length}</strong> máy sẵn sàng tại 48 Ngô Quyền
            </span>
          </div>
        </FadeIn>

        {/* Filter & Search Bar */}
        <CatalogFilterBar
          currentBrand={currentBrand}
          currentUseCase={currentUseCase}
          currentSearch={currentSearch}
          currentSort={currentSort}
          brands={brands}
        />

        {/* Product Grid */}
        {filteredList.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
            {filteredList.map((item, idx) => (
              <StaggerItem key={item.id}>
                <ProductCard equipment={item} priority={idx < 4} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="py-16 text-center space-y-3 bg-white rounded-xl p-10 border border-ink-200">
            <h3 className="text-lg font-sans font-bold text-ink-900">Không tìm thấy máy ảnh phù hợp</h3>
            <p className="text-xs sm:text-sm text-ink-500 font-sans">
              Hãy thử tìm với từ khoá khác hoặc xoá bộ lọc đang chọn.
            </p>
            <Link
              href="/thiet-bi"
              className="inline-block text-xs font-sans font-semibold text-ink-900 underline underline-offset-4 hover:text-accent"
            >
              Xem toàn bộ 12 dòng máy →
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
