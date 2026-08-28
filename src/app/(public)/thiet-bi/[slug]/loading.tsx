import React from "react";

export default function ProductDetailLoading() {
  return (
    <div className="bg-[#faf8f5] min-h-screen py-8 pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 animate-pulse">
        
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-16 bg-ink-200/50 rounded-sm" />
          <span className="text-ink-300">/</span>
          <div className="h-3 w-16 bg-ink-200/50 rounded-sm" />
          <span className="text-ink-300">/</span>
          <div className="h-3 w-28 bg-ink-200/70 rounded-sm" />
        </div>

        {/* 2-Column Top Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left: Gallery Skeleton */}
          <div className="lg:col-span-6 space-y-3">
            <div className="aspect-[4/3] w-full rounded-xl bg-canvas-200 border border-ink-200/60" />
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-lg bg-canvas-200 border border-ink-200/50" />
              ))}
            </div>
          </div>

          {/* Right: Info & Pricing Skeleton */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2 pb-5 border-b border-ink-200">
              <div className="h-3.5 w-32 bg-ink-200/60 rounded-sm" />
              <div className="h-10 sm:h-12 w-3/4 bg-ink-200/80 rounded-md" />
              <div className="h-4 w-48 bg-ink-200/40 rounded-sm" />
            </div>

            {/* 3-Tier Price Block Skeleton */}
            <div className="bg-white rounded-xl p-5 border border-ink-200/70 shadow-2xs space-y-3">
              <div className="h-3 w-28 bg-ink-200/50 rounded-sm" />
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 bg-canvas-200/60 rounded-lg text-center space-y-1.5">
                    <div className="h-3 w-12 mx-auto bg-ink-200/40 rounded-sm" />
                    <div className="h-6 w-16 mx-auto bg-ink-200/70 rounded-sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Short Desc Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-ink-200/50 rounded-sm" />
              <div className="h-4 w-5/6 bg-ink-200/40 rounded-sm" />
            </div>

            {/* Action Buttons Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="h-12 bg-ink-900/20 rounded-lg" />
              <div className="h-12 bg-canvas-200 rounded-lg border border-ink-200/60" />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
