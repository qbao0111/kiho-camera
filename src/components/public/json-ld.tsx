import React from "react";
import { SiteSettings, Equipment } from "@/types/database";
import { getEquipmentCoverImage } from "@/lib/equipment-images";

interface LocalBusinessProps {
  settings: SiteSettings;
  siteUrl: string;
}

export function LocalBusinessJsonLd({ settings, siteUrl }: LocalBusinessProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": settings.shop_name || "Kiho Camera",
    "description":
      settings.hero_subtitle ||
      "Dịch vụ cho thuê máy ảnh du lịch Canon, Fujifilm, Sony chính hãng tại TP. Đồng Hới, Quảng Bình. Đầy đủ pin, sạc, thẻ nhớ đi kèm, không cần cọc tiền máy.",
    "url": siteUrl,
    "telephone": settings.phone || "0387 274 669",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": settings.address || "48 Ngô Quyền, TP. Đồng Hới, Tỉnh Quảng Bình",
      "addressLocality": "Đồng Hới",
      "addressRegion": "Quảng Bình",
      "addressCountry": "VN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.4760",
      "longitude": "106.6000",
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        "opens": "07:30",
        "closes": "21:00",
      },
    ],
    "priceRange": "80.000₫ - 450.000₫",
    "image": `${siteUrl}/images/landing/hero-quang-binh.webp`,
    "sameAs": [
      settings.facebook_url,
      settings.tiktok_url,
      settings.instagram_url || "https://www.instagram.com/thuemayanhqbb/",
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductJsonLd({ equipment, siteUrl }: { equipment: Equipment; siteUrl: string }) {
  const coverImage = getEquipmentCoverImage(equipment);

  const fullImageUrl = coverImage.startsWith("http") ? coverImage : `${siteUrl}${coverImage}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": equipment.name,
    "image": fullImageUrl,
    "description":
      equipment.seo_description ||
      equipment.short_description ||
      equipment.description ||
      `Cho thuê máy ảnh ${equipment.name} chính hãng tại TP. Đồng Hới, Quảng Bình.`,
    "brand": {
      "@type": "Brand",
      "name": equipment.brand || "Kiho Camera",
    },
    "offers": {
      "@type": "Offer",
      "url": `${siteUrl}/thiet-bi/${equipment.slug}`,
      "priceCurrency": "VND",
      "price": equipment.price_per_day,
      "seller": {
        "@type": "Organization",
        "name": "Kiho Camera",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
