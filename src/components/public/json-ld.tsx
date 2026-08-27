import React from "react";
import { SiteSettings, Equipment } from "@/types/database";

interface LocalBusinessProps {
  settings: SiteSettings;
  siteUrl: string;
}

export function LocalBusinessJsonLd({ settings, siteUrl }: LocalBusinessProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": settings.shop_name,
    "description": settings.hero_subtitle || settings.tagline,
    "url": siteUrl,
    "telephone": settings.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": settings.address,
      "addressLocality": "Đồng Hới",
      "addressRegion": "Quảng Bình",
      "addressCountry": "VN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.4760",
      "longitude": "106.6000"
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
          "Sunday"
        ],
        "opens": "07:30",
        "closes": "21:00"
      }
    ],
    "priceRange": "150.000đ - 600.000đ",
    "image": settings.hero_image,
    "sameAs": [
      settings.facebook_url,
      settings.tiktok_url,
      settings.instagram_url
    ].filter(Boolean)
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductJsonLd({ equipment, siteUrl }: { equipment: Equipment; siteUrl: string }) {
  const coverImage = equipment.images?.find((i) => i.is_cover)?.image_url || equipment.images?.[0]?.image_url;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": equipment.name,
    "image": coverImage,
    "description": equipment.short_description || equipment.description,
    "brand": {
      "@type": "Brand",
      "name": equipment.brand || "Kiho Camera"
    },
    "offers": {
      "@type": "Offer",
      "url": `${siteUrl}/thiet-bi/${equipment.slug}`,
      "priceCurrency": "VND",
      "price": equipment.price_per_day,
      "priceValidUntil": "2027-12-31",
      "seller": {
        "@type": "Organization",
        "name": "Kiho Camera"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
