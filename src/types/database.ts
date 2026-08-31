export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface EquipmentImage {
  id: string;
  equipment_id: string;
  image_url: string;
  alt_text: string | null;
  is_cover: boolean;
  sort_order: number;
  created_at?: string;
}

export interface EquipmentSampleImage {
  id: string;
  equipment_id: string;
  image_url: string;
  caption: string | null;
  alt_text: string | null;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Equipment {
  id: string;
  category_id: string | null;
  category?: Category | null;
  brand: "Fujifilm" | "Canon" | "Sony" | string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price_session: number;       // Giá 1 buổi
  price_per_day: number;       // Giá 1 ngày
  price_three_days: number;    // Giá / ngày khi thuê từ 3 ngày
  price_poster_url?: string | null;
  deposit_note: string | null;
  specifications: Record<string, string>;
  included_items: string[];
  use_cases: string[];
  badges: string[];
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  images?: EquipmentImage[];
  sample_images?: EquipmentSampleImage[];
  created_at?: string;
  updated_at?: string;
}

export interface PricingEquipmentDTO {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price_session: number;
  price_per_day: number;
  price_three_days: number;
  short_description?: string | null;
  use_cases?: string[];
  is_featured?: boolean;
  cover_image: string;
}

export interface RentalFormEquipmentDTO {
  id: string;
  slug: string;
  name: string;
  brand: string;
}


export interface Feedback {
  id: string;
  customer_name: string;
  content: string;
  image_url: string | null;
  equipment_id: string | null;
  equipment?: Equipment | null;
  feedback_date: string;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface StorefrontImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  caption: string | null;
  sort_order: number;
  is_cover: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SiteSettings {
  id?: number;
  shop_name: string;
  tagline: string;
  address: string;
  phone: string;
  facebook_url: string;
  messenger_url: string;
  tiktok_url: string;
  instagram_url: string;
  maps_url: string;
  maps_embed_url?: string;
  opening_hours: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image: string;
  about_text: string;
  footer_text: string;
  updated_at?: string;
}


