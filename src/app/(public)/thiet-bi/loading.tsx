import React from "react";

export default function EquipmentListLoading() {
  return (
    <div className="bg-[#faf8f5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 animate-pulse">
        
        {/* Editorial Heading Skeleton */}
        <div className="space-y-2 pb-6 border-b border-ink-200">
          <div className="h-3.5 w-24 bg-ink-200/60 rounded-sm" />
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <div className="space-y-2">
              <div className="h-9 sm:h-12 w-80 bg-ink-200/80 rounded-md" />
              <div className="h-4 w-96 max-w-full bg-ink-200/50 rounded-sm" />
            </div>
            <div className="h-4 w-32 bg-ink-200/40 rounded-sm shrink-0" />
          </div>
        </div>

        {/* Filter Bar Skeleton */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-ink-200/70">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-20 bg-canvas-200 rounded-md border border-ink-200/50" />
            ))}
          </div>
          <div className="h-8 w-44 bg-canvas-200 rounded-md border border-ink-200/50" />
        </div>

        {/* Product Card Grid Skeleton (4 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="rounded-xl bg-white border border-ink-200/70 p-4 shadow-2xs space-y-3.5 flex flex-col justify-between"
            >
              <div className="relative aspect-square w-full rounded-lg bg-canvas-200/70 p-4" />
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-16 bg-ink-200/60 rounded-sm" />
                  <div className="h-3 w-12 bg-ink-200/40 rounded-sm" />
                </div>
                <div className="h-5 w-3/4 bg-ink-200/80 rounded-sm" />
                <div className="h-3 w-full bg-ink-200/40 rounded-sm" />
              </div>
              <div className="pt-2 border-t border-ink-100 flex items-center justify-between">
                <div className="h-5 w-20 bg-ink-200/70 rounded-sm" />
                <div className="h-7 w-20 bg-ink-900/20 rounded-md" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
