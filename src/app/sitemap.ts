import { MetadataRoute } from "next";
import { getEquipmentList } from "@/lib/services/equipment";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kihocamera.com";

  // Public static customer routes (omit lastModified when no genuine timestamp exists)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/thiet-bi`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gia-thue-may-anh-dong-hoi`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gioi-thieu`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/chinh-sach-thue`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/thue-may-anh-phong-nha`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/so-sanh/canon-r50-vs-canon-g7x-mark-iii`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/so-sanh/fujifilm-x100v-vs-x100vi`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/huong-dan-thue`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/lien-he`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic camera detail routes (use genuine database item.updated_at if present)
  const equipmentList = await getEquipmentList({ onlyActive: true });
  const equipmentRoutes: MetadataRoute.Sitemap = equipmentList.map((item) => ({
    url: `${baseUrl}/thiet-bi/${item.slug}`,
    ...(item.updated_at ? { lastModified: new Date(item.updated_at) } : {}),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...equipmentRoutes];
}
