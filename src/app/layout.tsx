import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#faf8f5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kihocamera.com"),
  title: {
    default: "Kiho Camera - Cho thuê máy ảnh tại Quảng Bình",
    template: "%s | Kiho Camera Quảng Bình",
  },
  description:
    "Dịch vụ cho thuê máy ảnh Canon, Sony, Fujifilm, máy quay DJI Pocket 3 và lens chụp ảnh du lịch tại TP. Đồng Hới, Quảng Bình. Bảng giá rõ ràng, thủ tục nhanh gọn.",
  keywords: [
    "thuê máy ảnh Quảng Bình",
    "cho thuê máy ảnh Quảng Bình",
    "thuê camera Quảng Bình",
    "thuê máy ảnh Đồng Hới",
    "thuê Canon G7X Quảng Bình",
    "thuê Sony A7 Quảng Bình",
    "thuê Fujifilm màu film Quảng Bình",
    "thuê DJI Pocket 3 Quảng Bình",
    "thuê máy ảnh du lịch Phong Nha",
  ],
  authors: [{ name: "Kiho Camera" }],
  creator: "Kiho Camera",
  publisher: "Kiho Camera",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://kihocamera.com",
    title: "Kiho Camera - Cho thuê máy ảnh tại Quảng Bình",
    description:
      "Dịch vụ cho thuê máy ảnh, lens và thiết bị du lịch chất lượng cao tại Đồng Hới, Quảng Bình.",
    siteName: "Kiho Camera",
    images: [
      {
        url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Kiho Camera - Cho thuê máy ảnh tại Quảng Bình",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiho Camera - Cho thuê máy ảnh Quảng Bình",
    description:
      "Dịch vụ cho thuê máy ảnh, lens và thiết bị du lịch chất lượng cao tại Đồng Hới, Quảng Bình.",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&h=630&q=80",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${plusJakartaSans.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#faf8f5] text-ink-900 antialiased selection:bg-ink-900 selection:text-[#faf8f5]">
        {children}
      </body>
    </html>
  );
}
