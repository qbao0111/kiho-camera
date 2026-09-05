import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Tạo khung ảnh Photobooth Online",
  description:
    "Trải nghiệm tạo ảnh phong cách Photobooth kỷ niệm du lịch Quảng Bình cùng Kiho Camera.",
  pathname: "/photobooth",
  robots: {
    index: false,
    follow: true,
  },
});

export default function PhotoboothLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
