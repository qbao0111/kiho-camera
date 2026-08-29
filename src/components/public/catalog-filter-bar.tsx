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
    <div className="space-y-4">
      {/* Brand Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none font-sans text-xs">
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
              className={`px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? "bg-ink-900 text-white shadow-xs"
                  : "bg-white border border-ink-200 text-ink-700 hover:bg-canvas-200 hover:text-ink-900"
              }`}
            >
              {b.label}
            </Link>
          );
        })}
      </div>

      {/* Use Case Tags & Search & Sort */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-3 border-t border-ink-200">
        {/* Use Case Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs text-ink-600 w-full md:w-auto font-sans">
          <span className="font-semibold text-ink-900 shrink-0">Nhu cầu:</span>
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
                className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors font-medium focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent ${
                  isSelected
                    ? "bg-accent text-white font-semibold shadow-xs"
                    : "bg-white border border-ink-200 text-ink-700 hover:bg-canvas-200 hover:text-ink-900"
                }`}
              >
                {uc.title}
              </Link>
            );
          })}

          {(currentBrand !== "all" || currentUseCase || currentSearch) && (
            <Link
              href="/thiet-bi"
              className="inline-flex items-center gap-1 text-xs text-accent font-semibold hover:underline shrink-0 ml-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              <X className="w-3 h-3" />
              <span>Xoá lọc</span>
            </Link>
          )}
        </div>

        {/* Search Input & Sort Menu */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
          <form action="/thiet-bi" method="GET" className="relative flex-grow sm:flex-grow-0 sm:w-60">
            <input
              type="text"
              name="search"
              defaultValue={currentSearch || ""}
              placeholder="Tìm Canon R50, X100V..."
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-ink-200 rounded-lg text-base sm:text-xs text-ink-900 focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-ink-500 font-sans"
            />
            <Search className="w-3.5 h-3.5 text-ink-600 absolute left-2.5 top-1/2 -translate-y-1/2" />
            {currentBrand !== "all" && <input type="hidden" name="brand" value={currentBrand} />}
            {currentUseCase && <input type="hidden" name="useCase" value={currentUseCase} />}
            {currentSort && <input type="hidden" name="sort" value={currentSort} />}
          </form>

          {/* Sort Selection */}
          <div className="flex items-center gap-1.5 text-xs text-ink-700 shrink-0 font-sans">
            <ArrowUpDown className="w-3.5 h-3.5 text-ink-600" />
            <select
              value={currentSort}
              onChange={(e) => handleSortChange(e.target.value)}
              aria-label="Sắp xếp danh sách máy ảnh"
              className="bg-white border border-ink-200 rounded-lg px-2.5 py-1.5 text-base sm:text-xs text-ink-900 focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent cursor-pointer font-sans"
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
