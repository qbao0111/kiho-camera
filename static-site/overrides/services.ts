import data from "@/data/public-catalog.json";
import type { Equipment, SiteSettings, StorefrontImage, Category, Feedback } from "@/types/database";
export const getSiteSettings = async (): Promise<SiteSettings> => data.settings as SiteSettings;
export const getStorefrontImages = async (_options?: { onlyActive?: boolean }): Promise<StorefrontImage[]> => data.storefront as StorefrontImage[];
export const getCategories = async (_onlyActive?: boolean): Promise<Category[]> => data.categories as Category[];
export const getCategoryBySlug = async (slug: string) => data.categories.find(c=>c.slug===slug) || null;
export const getFeedbackList = async (_onlyActive?: boolean): Promise<Feedback[]> => [];
export const getFeaturedFeedback = async (): Promise<Feedback[]> => [];
