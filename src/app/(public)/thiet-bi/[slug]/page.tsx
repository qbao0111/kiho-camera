import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Calendar, Tag } from "lucide-react";
import { getEquipmentBySlug, getRelatedEquipment } from "@/lib/services/equipment";
import { getSiteSettings } from "@/lib/services/settings";
import { ProductGallery } from "@/components/public/product-gallery";
import { SamplePhotoGallery } from "@/components/public/sample-photo-gallery";
import { EquipmentDetails } from "@/components/public/equipment-details";
import { ProductRentalAction } from "@/components/public/product-rental-action";
import { ProductCard } from "@/components/public/product-card";
import { StickyMessengerBar } from "@/components/public/sticky-messenger-bar";
import { ProductJsonLd } from "@/components/public/json-ld";
import { buildMessengerUrl } from "@/lib/utils";
import { getEquipmentCoverImage } from "@/lib/equipment-images";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const equipment = await getEquipmentBySlug(params.slug);
  if (!equipment) {
    return {
      title: "Máy ảnh không tồn tại",
    };
  }

  const title =
    equipment.seo_title ||
    `Thuê máy ảnh ${equipment.name} tại Quảng Bình`;

  const description =
    equipment.seo_description ||
    equipment.short_description ||
    `Dịch vụ cho thuê máy ảnh ${equipment.brand} ${equipment.name} chính hãng tại TP. Đồng Hới, Quảng Bình. Đầy đủ trọn bộ 2 pin, sạc đôi, thẻ nhớ và túi chống sốc.`;

  const coverImage = getEquipmentCoverImage(equipment);

  return {
    title,
    description,
    alternates: {
      canonical: `/thiet-bi/${equipment.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/thiet-bi/${equipment.slug}`,
      images: coverImage
        ? [
            {
              url: coverImage,
              alt: `Thuê máy ảnh ${equipment.name} tại Quảng Bình`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: coverImage ? [coverImage] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const equipment = await getEquipmentBySlug(params.slug);

  if (!equipment) {
    notFound();
  }

  const [settings, relatedEquipment] = await Promise.all([
    getSiteSettings(),
    getRelatedEquipment(equipment.slug, equipment.brand, 4),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kihocamera.com";
  const messengerChatUrl = buildMessengerUrl(settings.messenger_url, equipment.name);

  const formatK = (price: number) => {
    if (!price) return "---";
    return `${Math.round(price / 1000)}K`;
  };

  const hasSampleImages = equipment.sample_images && equipment.sample_images.length > 0;

  return (
    <div className="bg-[#faf8f4] min-h-screen py-8 pb-28 md:pb-20">
      <ProductJsonLd equipment={equipment} siteUrl={siteUrl} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Minimal Breadcrumb */}
        <FadeIn direction="none" className="flex items-center gap-2 text-xs font-mono text-ink-400">
          <Link href="/" className="hover:text-ink-900 transition-colors">
            TRANG CHỦ
          </Link>
          <span>/</span>
          <Link href="/thiet-bi" className="hover:text-ink-900 transition-colors">
            MÁY ẢNH
          </Link>
          <span>/</span>
          <span className="text-ink-900 font-bold uppercase truncate max-w-[200px]">
            {equipment.name}
          </span>
        </FadeIn>

        {/* 1. TOP HERO SECTION: Compact 2-Column Grid (Product Image + Essential Conversion Information) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left: Product Gallery (No Price Poster) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 self-start">
            <ProductGallery
              images={equipment.images}
              productName={equipment.name}
            />
          </div>

          {/* Right: Essential Decision & Conversion Information */}
          <div className="lg:col-span-6 space-y-7">
            
            {/* Header / Title */}
            <div className="space-y-3 pb-6 hairline-b">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-ink-400 uppercase">
                  {equipment.brand} · MÁY ẢNH CHO THUÊ
                </span>
                {equipment.is_featured && (
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-ink-900 text-[#faf8f4] px-2.5 py-0.5 rounded-full">
                    ★ Kiho Pick
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink-900 tracking-tight leading-[1.1] font-mono uppercase">
                {equipment.name}
              </h1>

              {equipment.use_cases?.length > 0 && (
                <div className="text-xs text-ink-500 font-mono font-semibold uppercase tracking-wider">
                  Phù hợp: {equipment.use_cases.join(" · ")}
                </div>
              )}
            </div>

            {/* 3-Tier Price Block (1 Buổi | 1 Ngày | 3 Ngày) */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e8e2d7] shadow-xs space-y-4">
              <span className="text-[10px] font-mono font-bold tracking-widest text-ink-400 uppercase block">
                BẢNG GIÁ THUÊ NIÊM YẾT
              </span>

              <div className="grid grid-cols-3 gap-2 text-center divide-x divide-[#f0eae1] font-mono">
                {/* Tier 1: 1 Buổi */}
                <div className="px-2">
                  <span className="text-[11px] text-ink-500 font-semibold block mb-1 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3 text-ink-400" />
                    1 BUỔI
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-ink-900">
                    {formatK(equipment.price_session)}
                  </span>
                  <span className="text-[10px] text-ink-400 block mt-0.5">4 - 5 tiếng</span>
                </div>

                {/* Tier 2: 1 Ngày */}
                <div className="px-2">
                  <span className="text-[11px] text-ink-500 font-semibold block mb-1 flex items-center justify-center gap-1">
                    <Calendar className="w-3 h-3 text-ink-400" />
                    1 NGÀY
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-ink-900">
                    {formatK(equipment.price_per_day)}
                  </span>
                  <span className="text-[10px] text-ink-400 block mt-0.5">24 tiếng</span>
                </div>

                {/* Tier 3: 3 Ngày + */}
                <div className="px-2 bg-[#fef2f2] rounded-2xl py-1 text-[#dc2626]">
                  <span className="text-[11px] font-bold block mb-1 flex items-center justify-center gap-1">
                    <Tag className="w-3 h-3" />
                    3 NGÀY+
                  </span>
                  <span className="text-xl sm:text-2xl font-black">
                    {formatK(equipment.price_three_days)}
                  </span>
                  <span className="text-[10px] block mt-0.5 font-bold">/ ngày</span>
                </div>
              </div>
            </div>

            {/* Short Description */}
            {equipment.short_description && (
              <p className="text-sm sm:text-base text-ink-700 leading-relaxed font-medium">
                {equipment.short_description}
              </p>
            )}

            {/* Action Buttons: Primary Lead Form Request + Secondary Messenger Link */}
            <ProductRentalAction
              equipment={equipment}
              messengerChatUrl={messengerChatUrl}
              hasSampleImages={hasSampleImages}
              sampleImagesCount={equipment.sample_images?.length}
            />

          </div>
        </div>

        {/* 2. REAL SAMPLE PHOTOS GALLERY (Immediately following Hero) */}
        <SamplePhotoGallery cameraName={equipment.name} sampleImages={equipment.sample_images} />

        {/* 3. PRODUCT DETAILS SECTION (Structured 2-column on desktop, collapsible on mobile) */}
        <EquipmentDetails equipment={equipment} messengerChatUrl={messengerChatUrl} />

        {/* 4. RELATED CAMERAS SECTION */}
        {relatedEquipment.length > 0 && (
          <div className="pt-16 sm:pt-24 hairline-t space-y-8">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold tracking-widest text-ink-400 uppercase block mb-1">
                  GỢI Ý THÊM
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-ink-900 tracking-tight font-mono">
                  Máy tương tự bạn có thể thích
                </h2>
              </div>
              <Link
                href="/thiet-bi"
                className="text-xs font-mono font-bold text-ink-900 hover:text-accent hidden sm:block uppercase tracking-wider"
              >
                Xem tất cả 12 máy →
              </Link>
            </div>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {relatedEquipment.map((item) => (
                <StaggerItem key={item.id}>
                  <ProductCard key={item.id} equipment={item} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}
      </div>

      {/* Sticky Mobile Messenger Bar */}
      <StickyMessengerBar
        productName={equipment.name}
        pricePerDay={equipment.price_per_day}
        messengerUrl={settings.messenger_url}
        phone={settings.phone}
      />
    </div>
  );
}
