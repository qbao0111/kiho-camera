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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kihocamera.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kiho Camera - Cho thuê máy ảnh tại Quảng Bình",
    template: "%s | Kiho Camera Quảng Bình",
  },
  description:
    "Dịch vụ cho thuê máy ảnh du lịch Canon, Fujifilm, Sony chính hãng tại TP. Đồng Hới, Quảng Bình. Đầy đủ phụ kiện pin sạc thẻ nhớ, hỗ trợ giao nhận tận nơi, thủ tục nhanh gọn không cần cọc tiền máy.",
  keywords: [
    "thuê máy ảnh Quảng Bình",
    "cho thuê máy ảnh Quảng Bình",
    "thuê máy ảnh Đồng Hới",
    "máy ảnh du lịch Quảng Bình",
    "Canon R50",
    "Canon G7X Mark III",
    "Fujifilm X100V",
    "Fujifilm X100VI",
    "Sony ZV1",
    "Sony ZV1F",
  ],
  authors: [{ name: "Kiho Camera" }],
  creator: "Kiho Camera",
  publisher: "Kiho Camera",
  alternates: {
    canonical: "/",
  },
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
    url: "/",
    title: "Kiho Camera - Cho thuê máy ảnh tại Quảng Bình",
    description:
      "Dịch vụ cho thuê máy ảnh du lịch Canon, Fujifilm, Sony chính hãng tại TP. Đồng Hới, Quảng Bình. Đầy đủ pin, sạc, thẻ nhớ đi kèm.",
    siteName: "Kiho Camera",
    images: [
      {
        url: "/images/landing/hero-quang-binh.webp",
        width: 1200,
        height: 630,
        alt: "Kiho Camera - Cho thuê máy ảnh du lịch tại Đồng Hới, Quảng Bình",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiho Camera - Cho thuê máy ảnh tại Quảng Bình",
    description:
      "Dịch vụ cho thuê máy ảnh du lịch Canon, Fujifilm, Sony chính hãng tại TP. Đồng Hới, Quảng Bình. Đầy đủ pin, sạc, thẻ nhớ đi kèm.",
    images: ["/images/landing/hero-quang-binh.webp"],
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
