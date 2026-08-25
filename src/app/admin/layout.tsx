import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal - Kiho Camera Quảng Bình",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-slate-100 text-slate-900">{children}</div>;
}
