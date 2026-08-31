import React from "react";
import { SiteSettings, Equipment, StorefrontImage } from "@/types/database";
import { getEquipmentCoverImage } from "@/lib/equipment-images";
import { DEFAULT_MAPS_URL } from "@/lib/constants";

interface LocalBusinessProps {
  settings: SiteSettings;
  siteUrl: string;
  storefrontImages?: StorefrontImage[];
}

export function LocalBusinessJsonLd({ settings, siteUrl, storefrontImages = [] }: LocalBusinessProps) {
  // Collect genuine images for the business (primary storefront images first)
  const imagesList = [
    ...storefrontImages.map((img) => img.image_url),
    `${siteUrl}/images/landing/hero-quang-binh.webp`,
    `${siteUrl}/brand/kiho-logo-social.webp`,
  ].filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    "name": settings.shop_name || "Kiho Camera",
    "description":
      settings.hero_subtitle ||
      "Dịch vụ cho thuê máy ảnh du lịch Canon, Fujifilm, Sony chính hãng tại TP. Đồng Hới, Quảng Bình. Đầy đủ pin sạc, thẻ nhớ, hỗ trợ giao nhận tận nơi.",
    "url": siteUrl,
    "telephone": settings.phone || "0387 274 669",
    "hasMap": settings.maps_url || DEFAULT_MAPS_URL,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": settings.address || "48 Ngô Quyền, TP. Đồng Hới, Tỉnh Quảng Bình",
      "addressLocality": "Đồng Hới",
      "addressRegion": "Quảng Bình",
      "addressCountry": "VN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.4747472",
      "longitude": "106.6183251",
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Đồng Hới" },
      { "@type": "AdministrativeArea", "name": "Quảng Bình" },
      { "@type": "AdministrativeArea", "name": "Phong Nha" },
    ],
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
    "logo": `${siteUrl}/brand/kiho-logo-social.webp`,
    "image": imagesList.length > 0 ? (imagesList.length === 1 ? imagesList[0] : imagesList) : `${siteUrl}/brand/kiho-logo-social.webp`,
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

export function WebSiteJsonLd({ siteUrl }: { siteUrl: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "url": `${siteUrl}/`,
    "name": "Kiho Camera",
    "description": "Dịch vụ cho thuê máy ảnh du lịch tại Đồng Hới, Quảng Bình",
    "publisher": {
      "@id": `${siteUrl}/#business`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
  siteUrl,
}: {
  items: { name: string; url: string }[];
  siteUrl: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
    })),
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
    "@id": `${siteUrl}/thiet-bi/${equipment.slug}#product`,
    "name": equipment.name,
    "image": fullImageUrl,
    "category": "Cameras & Camcorders > Digital Cameras",
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
        "@id": `${siteUrl}/#business`,
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

export function ArticleJsonLd({
  title,
  description,
  url,
  siteUrl,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  siteUrl: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const fullUrl = url.startsWith("http") ? url : `${siteUrl}${url}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    "headline": title,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": "Kiho Camera",
      "url": siteUrl,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kiho Camera",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/brand/kiho-logo-social.webp`,
      },
    },
    ...(datePublished ? { "datePublished": datePublished } : {}),
    ...(dateModified ? { "dateModified": dateModified } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function AboutPageJsonLd({
  siteUrl,
  name = "Giới thiệu Kiho Camera — Cửa hàng thuê máy ảnh tại Đồng Hới",
  description = "Kiho Camera là dịch vụ cho thuê máy ảnh du lịch tại 48 Ngô Quyền, Đồng Hới, Quảng Bình. Cung cấp Canon, Fujifilm, Sony kèm 2 pin, sạc và thẻ nhớ 64GB.",
}: {
  siteUrl: string;
  name?: string;
  description?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteUrl}/gioi-thieu#webpage`,
    "url": `${siteUrl}/gioi-thieu`,
    "name": name,
    "description": description,
    "isPartOf": {
      "@id": `${siteUrl}/#website`,
    },
    "about": {
      "@id": `${siteUrl}/#business`,
    },
    "mainEntity": {
      "@id": `${siteUrl}/#business`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

