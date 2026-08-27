"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ArrowUpDown, X } from "lucide-react";
import { USE_CASE_LIST } from "@/lib/mock-data";

interface CatalogFilterBarProps {
  currentBrand: string;
  currentUseCase?: string;
  currentSearch?: string;
  currentSort?: string;
  brands: { key: string; label: string }[];
}

export function CatalogFilterBar({
  currentBrand,
  currentUseCase,
  currentSearch,
  currentSort = "featured",
  brands,
}: CatalogFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    router.push(`/thiet-bi?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Brand Tabs */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none font-mono">
        {brands.map((b) => {
          const isSelected = currentBrand === b.key;
          const params = new URLSearchParams(searchParams.toString());
          if (b.key === "all") {
            params.delete("brand");
          } else {
            params.set("brand", b.key);
          }

          return (
            <Link
              key={b.key}
              href={`/thiet-bi?${params.toString()}`}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? "bg-ink-900 text-white shadow-sm"
                  : "bg-[#f0eae1] text-ink-700 hover:bg-[#e6dfd3] hover:text-ink-900"
              }`}
            >
              {b.label}
            </Link>
          );
        })}
      </div>

      {/* Use Case Tags & Search & Sort */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 hairline-t">
        {/* Use Case Tags */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs text-ink-500 w-full md:w-auto font-mono">
          <span className="font-bold text-ink-900 shrink-0">Nhu cầu:</span>
          {USE_CASE_LIST.map((uc, idx) => {
            const isSelected = currentUseCase === uc.tag;
            const params = new URLSearchParams(searchParams.toString());
            if (isSelected) {
              params.delete("useCase");
            } else {
              params.set("useCase", uc.tag);
            }

            return (
              <Link
                key={idx}
                href={`/thiet-bi?${params.toString()}`}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-bold ${
                  isSelected
                    ? "bg-accent text-white"
                    : "bg-[#f0eae1] text-ink-700 hover:bg-[#e4ddcf]"
                }`}
              >
                {uc.title}
              </Link>
            );
          })}

          {(currentBrand !== "all" || currentUseCase || currentSearch) && (
            <Link
              href="/thiet-bi"
              className="inline-flex items-center gap-1 text-xs text-accent font-bold hover:underline shrink-0 ml-2"
            >
              <X className="w-3.5 h-3.5" />
              <span>Xoá lọc</span>
            </Link>
          )}
        </div>

        {/* Search Input & Sort Menu */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <form action="/thiet-bi" method="GET" className="relative flex-grow sm:flex-grow-0 sm:w-64 font-mono">
            <input
              type="text"
              name="search"
              defaultValue={currentSearch || ""}
              placeholder="Tìm Canon R50, X100V..."
              className="w-full pl-8 pr-3 py-2 bg-[#f0eae1] border-none rounded-xl text-xs text-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900 transition-all placeholder:text-ink-400"
            />
            <Search className="w-3.5 h-3.5 text-ink-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            {currentBrand !== "all" && <input type="hidden" name="brand" value={currentBrand} />}
            {currentUseCase && <input type="hidden" name="useCase" value={currentUseCase} />}
            {currentSort && <input type="hidden" name="sort" value={currentSort} />}
          </form>

          {/* Sort Selection */}
          <div className="flex items-center gap-1.5 text-xs text-ink-600 shrink-0 font-mono font-bold">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <select
              value={currentSort}
              onChange={(e) => handleSortChange(e.target.value)}
              aria-label="Sắp xếp danh sách máy ảnh"
              className="bg-[#f0eae1] border-none rounded-xl px-2.5 py-2 text-xs text-ink-900 focus:outline-none cursor-pointer"
            >
              <option value="featured">Kiho đề xuất</option>
              <option value="price_asc">Giá: Thấp → Cao</option>
              <option value="price_desc">Giá: Cao → Thấp</option>
              <option value="name_asc">Tên A–Z</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
