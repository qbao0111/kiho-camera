import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { getEquipmentList } from "@/lib/services/equipment";
import { ProductCard } from "@/components/public/product-card";
import { CatalogFilterBar } from "@/components/public/catalog-filter-bar";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Danh sách máy ảnh cho thuê tại Quảng Bình | Kiho Camera",
  description:
    "Bảng giá cho thuê 12 dòng máy ảnh du lịch Canon, Fujifilm, Sony chính hãng tại TP. Đồng Hới, Quảng Bình. Đầy đủ pin, sạc, thẻ nhớ, nhận máy chụp đẹp ngay.",
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

  // Fetch all equipment to calculate real brand counts
  const allEquipment = await getEquipmentList({ onlyActive: true });

  const totalCount = allEquipment.length;
  const fujiCount = allEquipment.filter((e) => e.brand.toLowerCase() === "fujifilm").length;
  const canonCount = allEquipment.filter((e) => e.brand.toLowerCase() === "canon").length;
  const sonyCount = allEquipment.filter((e) => e.brand.toLowerCase() === "sony").length;

  // Filtered list
  const filteredList = await getEquipmentList({
    brand: currentBrand === "all" ? undefined : currentBrand,
    useCase: currentUseCase,
    searchQuery: currentSearch,
    sortBy: currentSort,
    onlyActive: true,
  });

  const brands = [
    { key: "all", label: `Tất cả (${totalCount})` },
    { key: "fujifilm", label: `Fujifilm (${fujiCount})` },
    { key: "canon", label: `Canon (${canonCount})` },
    { key: "sony", label: `Sony (${sonyCount})` },
  ];

  return (
    <div className="bg-[#faf8f4] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Editorial Heading */}
        <FadeIn className="space-y-3 pb-8 hairline-b">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0eae1] border border-[#e2dbcf] text-xs font-mono font-bold uppercase tracking-wider text-ink-700">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>MÁY ẢNH KIHO</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-ink-900 tracking-tight">
                Chọn chiếc máy hợp chuyến đi
              </h1>
              <p className="mt-2 text-sm sm:text-base text-ink-600 font-medium max-w-2xl">
                12 dòng máy cho du lịch, check-in, couple, vlog và những hôm chỉ muốn mang về thật nhiều ảnh đẹp.
              </p>
            </div>
            <span className="text-xs sm:text-sm font-mono text-ink-500 shrink-0">
              {filteredList.length} máy sẵn sàng tại 48 Ngô Quyền
            </span>
          </div>
        </FadeIn>

        {/* Filter & Search Bar Client Component */}
        <CatalogFilterBar
          currentBrand={currentBrand}
          currentUseCase={currentUseCase}
          currentSearch={currentSearch}
          currentSort={currentSort}
          brands={brands}
        />

        {/* Product Grid (4 columns) */}
        {filteredList.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pt-4">
            {filteredList.map((item, idx) => (
              <StaggerItem key={item.id}>
                <ProductCard equipment={item} priority={idx < 4} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="py-20 text-center space-y-4 bg-white rounded-3xl p-12 border border-[#e8e2d7]">
            <h3 className="text-xl font-bold text-ink-900 font-mono">Không tìm thấy máy ảnh phù hợp</h3>
            <p className="text-xs sm:text-sm text-ink-500 font-medium">
              Hãy thử tìm với từ khoá khác hoặc xoá bộ lọc đang chọn.
            </p>
            <Link
              href="/thiet-bi"
              className="inline-block text-xs font-mono font-bold text-ink-900 underline underline-offset-4"
            >
              Xem toàn bộ 12 dòng máy →
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
