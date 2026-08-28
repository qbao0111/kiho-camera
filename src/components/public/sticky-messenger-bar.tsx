"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { formatCurrency, buildMessengerUrl } from "@/lib/utils";

interface StickyMessengerBarProps {
  productName?: string;
  pricePerDay?: number;
  messengerUrl?: string;
  phone?: string;
}

export function StickyMessengerBar({
  productName,
  pricePerDay,
  messengerUrl = "https://m.me/kihocameradonghoi",
}: StickyMessengerBarProps) {
  const targetUrl = buildMessengerUrl(messengerUrl, productName);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-t border-ink-200 px-4 py-3 pb-safe shadow-md">
      <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
        {pricePerDay ? (
          <div>
            <span className="text-[10px] text-ink-400 block uppercase font-mono">Giá thuê</span>
            <span className="text-base font-bold font-mono text-ink-900">
              {formatCurrency(pricePerDay)}
              <span className="text-[10px] font-normal text-ink-500 font-sans">/ngày</span>
            </span>
          </div>
        ) : null}

        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-grow inline-flex items-center justify-center gap-1.5 bg-ink-900 active:bg-black text-white font-sans font-semibold py-3 px-5 rounded-lg transition-colors text-xs"
        >
          <span>Nhắn để thuê máy này</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
