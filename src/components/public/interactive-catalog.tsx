"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, Sparkles } from "lucide-react";
import { Equipment } from "@/types/database";
import { ProductCard } from "@/components/public/product-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

interface InteractiveCatalogProps {
  initialEquipment: Equipment[];
  categories: { id: string; name: string; slug: string }[];
}

export function InteractiveCatalog({ initialEquipment, categories }: InteractiveCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredEquipment = useMemo(() => {
    return initialEquipment.filter((item) => {
      // Category match
      let matchCat = true;
      if (selectedCategory !== "all") {
        if (selectedCategory === "may-anh") {
          matchCat = item.category_id?.includes("c1111111") ?? false;
        } else if (selectedCategory === "lens") {
          matchCat = item.category_id?.includes("c2222222") ?? false;
        } else if (selectedCategory === "may-quay") {
          matchCat = item.category_id?.includes("c3333333") ?? false;
        } else if (selectedCategory === "gimbal") {
          matchCat = item.category_id?.includes("c4444444") ?? false;
        } else if (selectedCategory === "phu-kien") {
          matchCat = item.category_id?.includes("c5555555") ?? false;
        }
      }

      // Search query match
      let matchSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        matchSearch =
          item.name.toLowerCase().includes(q) ||
          (item.short_description?.toLowerCase().includes(q) ?? false) ||
          item.badges.some((b) => b.toLowerCase().includes(q)) ||
          item.use_cases.some((u) => u.toLowerCase().includes(q));
      }

      return matchCat && matchSearch;
    });
  }, [initialEquipment, selectedCategory, searchQuery]);

  return (
    <section id="thiet-bi-catalog" className="py-20 sm:py-28 bg-[#faf8f5] hairline-t scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <span className="text-[11px] font-bold text-ink-400 uppercase tracking-widest block mb-2">
              DANH SÁCH THIẾT BỊ SẴN CÓ
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-ink-900 tracking-tight">
              Những chiếc máy hay được mang đi nhất.
            </h2>
          </div>

          {/* Quick Search inside Catalog */}
          <div className="relative w-full lg:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm nhanh theo tên máy..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#e4dfd5] rounded-md text-xs font-medium text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-ink-900 shadow-sm"
            />
            <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Category Filter Pills */}
        <FadeIn className="flex flex-wrap items-center gap-2 pb-8 sm:pb-10 border-b border-[#e4dfd5] mb-10">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCategory === "all"
                ? "bg-ink-900 text-white shadow-sm"
                : "bg-white text-ink-600 hover:bg-[#f3efe9] border border-[#e4dfd5]"
            }`}
          >
            Tất cả thiết bị ({initialEquipment.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat.slug
                  ? "bg-ink-900 text-white shadow-sm"
                  : "bg-white text-ink-600 hover:bg-[#f3efe9] border border-[#e4dfd5]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </FadeIn>

        {/* Products Grid */}
        {filteredEquipment.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {filteredEquipment.map((item, idx) => (
              <StaggerItem key={item.id}>
                <ProductCard equipment={item} priority={idx === 0} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-[#e4dfd5] p-8">
            <Sparkles className="w-8 h-8 text-ink-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-ink-900 mb-1">
              Không tìm thấy thiết bị phù hợp
            </h3>
            <p className="text-xs text-ink-500 max-w-sm mx-auto mb-4">
              Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc để xem toàn bộ danh mục của Kiho Camera.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="text-xs font-bold text-accent hover:underline"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}

        {/* View All CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/thiet-bi"
            className="inline-flex items-center gap-2 bg-ink-900 hover:bg-accent text-white text-xs font-bold px-8 py-3.5 rounded-sm transition-colors shadow-sm"
          >
            <span>Xem đầy đủ bảng giá chi tiết 30+ thiết bị</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
