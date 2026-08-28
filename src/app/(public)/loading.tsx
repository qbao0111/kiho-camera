import React from "react";

export default function PublicLoading() {
  return (
    <div className="bg-[#faf8f5] min-h-[70vh] py-12 sm:py-20 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3 max-w-xl">
          <div className="h-3.5 w-28 bg-ink-200/60 rounded-sm" />
          <div className="h-9 w-3/4 bg-ink-200/80 rounded-md" />
          <div className="h-4 w-full bg-ink-200/50 rounded-sm" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-64 rounded-xl bg-white border border-ink-200/60 p-4 space-y-3"
            >
              <div className="h-40 w-full bg-canvas-200/80 rounded-lg" />
              <div className="h-4 w-2/3 bg-ink-200/60 rounded-sm" />
              <div className="h-4 w-1/3 bg-ink-200/40 rounded-sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
