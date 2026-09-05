import type { SiteSettings } from "@/types/database";

const CONTROL_CHARS = /[\u0000-\u001f\u007f\u2028\u2029]/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export const SITE_SETTING_KEYS: (keyof SiteSettings)[] = [
  "shop_name",
  "tagline",
  "address",
  "phone",
  "facebook_url",
  "messenger_url",
  "tiktok_url",
  "instagram_url",
  "maps_url",
  "maps_embed_url",
  "opening_hours",
  "hero_title",
  "hero_subtitle",
  "hero_image",
  "about_text",
  "footer_text",
];

const SITE_SETTING_LIMITS: Record<string, number> = {
  shop_name: 255,
  tagline: 255,
  address: 255,
  phone: 50,
  facebook_url: 500,
  messenger_url: 500,
  tiktok_url: 500,
  instagram_url: 500,
  maps_url: 1000,
  maps_embed_url: 1000,
  opening_hours: 255,
  hero_title: 255,
  hero_subtitle: 2000,
  hero_image: 2000,
  about_text: 5000,
  footer_text: 2000,
};

export function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID.test(value);
}

export function boundedText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const clean = value.trim();
  if (!clean || clean.length > maxLength || CONTROL_CHARS.test(clean)) return null;
  return clean;
}

export function optionalText(value: unknown, maxLength: number): string | null | undefined {
  if (value === null || value === undefined) return null;
  if (typeof value !== "string" || value.length > maxLength || CONTROL_CHARS.test(value)) return undefined;
  return value.trim() || null;
}

function parseHttpsUrl(value: string): URL | null {
  try {
    const url = new URL(value);
    // Only ordinary HTTPS endpoints are accepted. Reject credentials and
    // custom ports so URL-consuming components cannot be turned into a
    // credential leak or an unexpected internal-network fetch.
    if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
    try {
      const decodedPath = decodeURIComponent(url.pathname);
      if (decodedPath.includes("..") || decodedPath.includes("\\") || /[\u0000-\u001f\u007f]/.test(decodedPath)) return null;
    } catch {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

function hostIs(url: URL, hosts: readonly string[]): boolean {
  const host = url.hostname.toLowerCase();
  return hosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
}

export function isSafeExternalUrl(value: unknown, hosts?: readonly string[]): value is string {
  if (typeof value !== "string" || value.length > 2000 || CONTROL_CHARS.test(value)) return false;
  const url = parseHttpsUrl(value.trim());
  return Boolean(url && (!hosts || hostIs(url, hosts)));
}

/** URLs accepted for admin-managed image fields and public image rendering. */
export function isSafeImageUrl(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 2048 || CONTROL_CHARS.test(value)) return false;
  const clean = value.trim();
  if ((clean.startsWith("/images/") || clean.startsWith("/uploads/")) && !/%2e|%5c|\.\.|\\/i.test(clean)) return true;

  const url = parseHttpsUrl(clean);
  if (!url) return false;
  const host = url.hostname.toLowerCase();
  return (
    host === "images.unsplash.com" ||
    host === "images.pexels.com" ||
    (host.endsWith(".supabase.co") && url.pathname.startsWith("/storage/v1/object/public/")) ||
    host.endsWith(".googleusercontent.com")
  );
}

export function normalizeMapEmbedUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  let candidate = value.trim();
  if (!candidate) return "";

  // Admins sometimes paste the full iframe snippet. Store only its src URL.
  if (candidate.startsWith("<")) {
    const match = candidate.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    candidate = match?.[1] || "";
  }

  const url = parseHttpsUrl(candidate);
  if (!url) return null;
  const host = url.hostname.toLowerCase();
  const allowedHost = host === "maps.google.com" || host === "www.google.com";
  const allowedPath = host === "www.google.com" ? url.pathname.startsWith("/maps") : url.pathname.startsWith("/maps");
  return allowedHost && allowedPath ? url.toString() : null;
}

export function validateSiteSettingsInput(
  input: unknown
): { success: true; data: Partial<SiteSettings> } | { success: false; error: string } {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { success: false, error: "Dữ liệu cài đặt không hợp lệ." };
  }

  const data: Partial<SiteSettings> = {};
  for (const key of SITE_SETTING_KEYS) {
    const value = (input as Record<string, unknown>)[key];
    if (value === undefined) continue;
    if (value === null) {
      (data as Record<string, string>)[key] = "";
      continue;
    }
    const limit = SITE_SETTING_LIMITS[key];
    if (typeof value !== "string" || value.length > limit || CONTROL_CHARS.test(value)) {
      return { success: false, error: `Trường ${key} vượt quá giới hạn hoặc không hợp lệ.` };
    }
    const clean = value.trim();

    if (["facebook_url", "messenger_url", "tiktok_url", "instagram_url"].includes(key) && clean) {
      const hosts = key === "messenger_url"
        ? ["m.me", "messenger.com", "facebook.com"]
        : key === "facebook_url"
          ? ["facebook.com"]
          : key === "tiktok_url"
            ? ["tiktok.com"]
            : ["instagram.com"];
      if (!isSafeExternalUrl(clean, hosts)) {
        return { success: false, error: `URL ${key} không hợp lệ.` };
      }
    }
    if (key === "maps_url" && clean && !isSafeExternalUrl(clean, ["maps.app.goo.gl", "maps.google.com", "google.com"])) {
      return { success: false, error: "URL bản đồ không hợp lệ." };
    }
    if (key === "maps_embed_url") {
      const normalized = normalizeMapEmbedUrl(clean);
      if (normalized === null) return { success: false, error: "URL bản đồ nhúng không hợp lệ." };
      data[key] = normalized;
      continue;
    }
    if (key === "hero_image" && clean && !isSafeImageUrl(clean)) {
      return { success: false, error: "URL ảnh Hero không hợp lệ." };
    }
    if (key === "phone" && clean && !/^(?:0|\+84)[0-9 .-]{8,18}$/.test(clean)) {
      return { success: false, error: "Số điện thoại không hợp lệ." };
    }

    (data as Record<string, string>)[key] = clean;
  }

  return { success: true, data };
}

export function isSafeStoragePath(value: unknown, allowedFolders: readonly string[] = ["product", "sample", "poster", "feedback", "storefront", "uploads"]): value is string {
  if (typeof value !== "string" || value.length > 512 || value.includes("..") || value.startsWith("/") || value.includes("\\")) return false;
  const [folder, ...rest] = value.split("/");
  return Boolean(folder && rest.length > 0 && allowedFolders.includes(folder) && rest.every((part) => /^[A-Za-z0-9][A-Za-z0-9._-]{0,180}$/.test(part)));
}

export interface ValidatedEquipmentSave {
  id?: string;
  payload: Record<string, unknown>;
  productImages: Array<{ url: string; isCover: boolean }>;
  samplePhotos: Array<{ image_url: string; caption: string | null; is_active: boolean }>;
}

export function validateEquipmentSaveInput(input: unknown): { success: true; data: ValidatedEquipmentSave } | { success: false; error: string } {
  if (!isRecord(input) || !isRecord(input.payload)) return { success: false, error: "Dữ liệu máy ảnh không hợp lệ." };
  if (input.id !== undefined && input.id !== null && !isUuid(input.id)) return { success: false, error: "ID máy ảnh không hợp lệ." };

  const raw = input.payload;
  const stringFields: Record<string, number> = {
    name: 255,
    slug: 255,
    brand: 100,
    short_description: 2000,
    description: 10000,
    deposit_note: 500,
    seo_title: 255,
    seo_description: 2000,
  };
  const payload: Record<string, unknown> = {};
  for (const [key, max] of Object.entries(stringFields)) {
    const value = raw[key];
    if (typeof value !== "string" || value.length > max || CONTROL_CHARS.test(value)) return { success: false, error: `Trường ${key} không hợp lệ.` };
    payload[key] = value.trim();
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(payload.slug as string)) return { success: false, error: "Slug máy ảnh không hợp lệ." };
  if (raw.category_id !== null && raw.category_id !== undefined && !isUuid(raw.category_id)) return { success: false, error: "Danh mục không hợp lệ." };
  payload.category_id = raw.category_id ?? null;

  for (const key of ["price_session", "price_per_day", "price_three_days", "sort_order"]) {
    const value = raw[key];
    const max = key === "sort_order" ? 10000 : 1_000_000_000;
    if (typeof value !== "number" || !Number.isInteger(value) || value < 0 || value > max) return { success: false, error: `Giá trị ${key} không hợp lệ.` };
    payload[key] = value;
  }
  for (const key of ["is_featured", "is_active"]) {
    if (typeof raw[key] !== "boolean") return { success: false, error: `Trạng thái ${key} không hợp lệ.` };
    payload[key] = raw[key];
  }
  if (raw.price_poster_url !== null && raw.price_poster_url !== undefined && raw.price_poster_url !== "" && !isSafeImageUrl(raw.price_poster_url)) return { success: false, error: "URL poster không hợp lệ." };
  payload.price_poster_url = typeof raw.price_poster_url === "string" && raw.price_poster_url.trim() ? raw.price_poster_url.trim() : null;

  for (const key of ["use_cases", "badges", "included_items"] as const) {
    const values = raw[key];
    if (!Array.isArray(values) || values.length > 50 || values.some((value) => typeof value !== "string" || value.length > 255 || CONTROL_CHARS.test(value))) return { success: false, error: `Danh sách ${key} không hợp lệ.` };
    payload[key] = values.map((value) => value.trim()).filter(Boolean);
  }
  if (!isRecord(raw.specifications) || Object.keys(raw.specifications).length > 50) return { success: false, error: "Thông số kỹ thuật không hợp lệ." };
  const specs: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw.specifications)) {
    if (!key || key.length > 100 || typeof value !== "string" || value.length > 500 || CONTROL_CHARS.test(key) || CONTROL_CHARS.test(value)) return { success: false, error: "Thông số kỹ thuật không hợp lệ." };
    specs[key.trim()] = value.trim();
  }
  payload.specifications = specs;

  const rawProductImages = input.productImages === undefined ? [] : input.productImages;
  if (!Array.isArray(rawProductImages) || rawProductImages.length > 30) return { success: false, error: "Danh sách ảnh sản phẩm không hợp lệ." };
  const productImages: Array<{ url: string; isCover: boolean }> = [];
  for (const image of rawProductImages) {
    if (!isRecord(image) || !isSafeImageUrl(image.url) || typeof image.isCover !== "boolean") return { success: false, error: "Ảnh sản phẩm không hợp lệ." };
    productImages.push({ url: image.url.trim(), isCover: image.isCover });
  }

  const rawSamples = input.samplePhotos === undefined ? [] : input.samplePhotos;
  if (!Array.isArray(rawSamples) || rawSamples.length > 50) return { success: false, error: "Danh sách ảnh mẫu không hợp lệ." };
  const samplePhotos: Array<{ image_url: string; caption: string | null; is_active: boolean }> = [];
  for (const sample of rawSamples) {
    if (!isRecord(sample) || !isSafeImageUrl(sample.image_url) || (sample.caption !== undefined && sample.caption !== null && (typeof sample.caption !== "string" || sample.caption.length > 1000 || CONTROL_CHARS.test(sample.caption))) || (sample.is_active !== undefined && typeof sample.is_active !== "boolean")) return { success: false, error: "Ảnh mẫu không hợp lệ." };
    samplePhotos.push({ image_url: sample.image_url.trim(), caption: typeof sample.caption === "string" && sample.caption.trim() ? sample.caption.trim() : null, is_active: sample.is_active !== false });
  }

  return { success: true, data: { id: typeof input.id === "string" ? input.id : undefined, payload, productImages, samplePhotos } };
}
