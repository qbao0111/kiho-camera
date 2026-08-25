import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Search, ArrowUpDown, X } from "lucide-react";
import { getEquipmentList } from "@/lib/services/equipment";
import { getCategories } from "@/lib/services/categories";
import { ProductCard } from "@/components/public/product-card";
import { USE_CASE_LIST } from "@/lib/mock-data";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Danh sách máy ảnh & thiết bị cho thuê tại Quảng Bình",
  description:
    "Bảng giá cho thuê máy ảnh Canon, Sony, Fujifilm, DJI Pocket 3, ống kính lens và gimbal chống rung tại TP. Đồng Hới, Quảng Bình. Cập nhật mới nhất.",
};

interface EquipmentPageProps {
  searchParams: {
    category?: string;
    useCase?: string;
    search?: string;
    sort?: "price_asc" | "price_desc" | "newest" | "featured";
  };
}

export default async function EquipmentListPage({ searchParams }: EquipmentPageProps) {
  const currentCategory = searchParams.category;
  const currentUseCase = searchParams.useCase;
  const currentSearch = searchParams.search;
  const currentSort = searchParams.sort || "featured";

  const [categories, equipmentList] = await Promise.all([
    getCategories(true),
    getEquipmentList({
      categorySlug: currentCategory,
      useCase: currentUseCase,
      searchQuery: currentSearch,
      sortBy: currentSort,
      onlyActive: true,
    }),
  ]);

  return (
    <div className="bg-[#faf8f5] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Title & Count Header */}
        <FadeIn className="space-y-3 pb-8 hairline-b">
          <span className="text-[11px] font-mono font-semibold tracking-widest text-ink-400 uppercase">
            KIHO CAMERA CATALOG
          </span>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <h1 className="text-4xl sm:text-6xl font-black text-ink-900 tracking-tight">
              Thiết bị
            </h1>
            <span className="text-sm font-mono text-ink-500">
              {equipmentList.length} thiết bị sẵn sàng tại Đồng Hới
            </span>
          </div>
        </FadeIn>

        {/* Minimalist Filter Bar */}
        <div className="space-y-6">
          {/* Category Text Tabs */}
          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto pb-2 scrollbar-none text-xs sm:text-sm font-semibold tracking-wide">
            <Link
              href={`/thiet-bi?${new URLSearchParams({
                ...(currentUseCase && { useCase: currentUseCase }),
                ...(currentSearch && { search: currentSearch }),
                ...(currentSort && { sort: currentSort }),
              }).toString()}`}
              className={`whitespace-nowrap transition-colors link-underline ${
                !currentCategory ? "text-ink-900 font-black" : "text-ink-400 hover:text-ink-800"
              }`}
            >
              Tất cả ({equipmentList.length})
            </Link>

            {categories.map((cat) => {
              const isSelected = currentCategory === cat.slug;
              return (
                <Link
                  key={cat.id}
                  href={`/thiet-bi?${new URLSearchParams({
                    category: cat.slug,
                    ...(currentUseCase && { useCase: currentUseCase }),
                    ...(currentSearch && { search: currentSearch }),
                    ...(currentSort && { sort: currentSort }),
                  }).toString()}`}
                  className={`whitespace-nowrap transition-colors link-underline ${
                    isSelected ? "text-ink-900 font-black" : "text-ink-400 hover:text-ink-800"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>

          {/* Search, Use-case Tags & Sort Controls */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 hairline-t">
            {/* Use Case Minimalist Text Badges */}
            <div className="flex items-center gap-2 overflow-x-auto text-xs text-ink-500 w-full md:w-auto">
              <span className="font-semibold text-ink-900 shrink-0">Nhu cầu:</span>
              {USE_CASE_LIST.map((uc, idx) => {
                const isSelected = currentUseCase === uc.tag;
                return (
                  <Link
                    key={idx}
                    href={`/thiet-bi?${new URLSearchParams({
                      ...(currentCategory && { category: currentCategory }),
                      ...(isSelected ? {} : { useCase: uc.tag }),
                      ...(currentSearch && { search: currentSearch }),
                      ...(currentSort && { sort: currentSort }),
                    }).toString()}`}
                    className={`px-2.5 py-1 rounded-sm whitespace-nowrap transition-colors ${
                      isSelected
                        ? "bg-ink-900 text-white font-bold"
                        : "bg-[#f3efe9] text-ink-700 hover:bg-[#eae4d9]"
                    }`}
                  >
                    {uc.tag}
                  </Link>
                );
              })}

              {(currentCategory || currentUseCase || currentSearch) && (
                <Link
                  href="/thiet-bi"
                  className="inline-flex items-center gap-1 text-xs text-accent font-semibold hover:underline shrink-0 ml-2"
                >
                  <X className="w-3 h-3" />
                  <span>Xoá lọc</span>
                </Link>
              )}
            </div>

            {/* Search Input & Sort Form */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <form action="/thiet-bi" method="GET" className="relative flex-grow sm:flex-grow-0 sm:w-56">
                <input
                  type="text"
                  name="search"
                  defaultValue={currentSearch || ""}
                  placeholder="Tìm máy ảnh..."
                  className="w-full pl-8 pr-3 py-1.5 bg-[#f3efe9] border-none rounded-sm text-xs text-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900 transition-all placeholder:text-ink-400"
                />
                <Search className="w-3.5 h-3.5 text-ink-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                {currentCategory && <input type="hidden" name="category" value={currentCategory} />}
                {currentUseCase && <input type="hidden" name="useCase" value={currentUseCase} />}
              </form>

              {/* Sort Menu */}
              <div className="flex items-center gap-1.5 text-xs text-ink-500 shrink-0 font-medium">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <Link
                  href={`/thiet-bi?${new URLSearchParams({
                    ...(currentCategory && { category: currentCategory }),
                    ...(currentUseCase && { useCase: currentUseCase }),
                    ...(currentSearch && { search: currentSearch }),
                    sort: currentSort === "price_asc" ? "price_desc" : "price_asc",
                  }).toString()}`}
                  className="hover:text-ink-900 underline underline-offset-4"
                >
                  {currentSort === "price_asc" ? "Giá: Thấp → Cao" : currentSort === "price_desc" ? "Giá: Cao → Thấp" : "Sắp xếp giá"}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {equipmentList.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pt-4">
            {equipmentList.map((item, idx) => (
              <StaggerItem key={item.id}>
                <ProductCard equipment={item} priority={idx < 4} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="py-20 text-center space-y-4">
            <h3 className="text-xl font-bold text-ink-900">Không tìm thấy thiết bị phù hợp</h3>
            <p className="text-xs sm:text-sm text-ink-500">
              Hãy thử tìm với từ khoá khác hoặc xoá bộ lọc đang chọn.
            </p>
            <Link
              href="/thiet-bi"
              className="inline-block text-xs font-bold text-ink-900 underline underline-offset-4"
            >
              Xem toàn bộ danh mục →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
