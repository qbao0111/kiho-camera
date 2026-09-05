import type { Metadata } from "next";

export interface PageMetadataOptions {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  robots?: Metadata["robots"];
  publishedTime?: string;
  modifiedTime?: string;
}

export const DEFAULT_OG_IMAGE = "/images/landing/hero-quang-binh.webp";
export const DEFAULT_OG_IMAGE_ALT = "Kiho Camera - Cho thuê máy ảnh du lịch tại Đồng Hới, Quảng Bình";

/**
 * Strips legacy branding suffixes from child page titles
 * so the root template (`%s | Kiho Camera`) does not produce duplicate brand tokens.
 */
export function cleanTitle(title: string): string {
  return title
    .replace(/\s*\|\s*Kiho Camera\s*$/i, "")
    .replace(/\s*—\s*Kiho Camera\s*$/i, "")
    .replace(/\s*-\s*Kiho Camera\s*$/i, "")
    .trim();
}

/**
 * Builds consistent metadata with canonical, OpenGraph, Twitter and robots
 * for any indexable or restricted public route.
 */
export function buildPageMetadata({
  title,
  description,
  pathname,
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  type = "website",
  robots,
  publishedTime,
  modifiedTime,
}: PageMetadataOptions): Metadata {
  const normalizedTitle = cleanTitle(title);
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;

  return {
    title: normalizedTitle,
    description,
    alternates: {
      canonical: normalizedPath,
    },
    openGraph: {
      type,
      locale: "vi_VN",
      url: normalizedPath,
      title: normalizedTitle,
      description,
      siteName: "Kiho Camera",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      ...(type === "article" && (publishedTime || modifiedTime)
        ? {
            publishedTime,
            modifiedTime,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: normalizedTitle,
      description,
      images: [image],
    },
    ...(robots ? { robots } : {}),
  };
}
