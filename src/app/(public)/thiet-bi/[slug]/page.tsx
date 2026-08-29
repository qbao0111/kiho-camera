import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Calendar, Tag } from "lucide-react";
import { getEquipmentBySlug, getRelatedEquipment } from "@/lib/services/equipment";
import { getSiteSettings } from "@/lib/services/settings";
import { getCameraSeoContent } from "@/lib/content/camera-seo-content";
import { ProductGallery } from "@/components/public/product-gallery";
import { SamplePhotoGallery } from "@/components/public/sample-photo-gallery";
import { EquipmentDetails } from "@/components/public/equipment-details";
import { CameraEditorialGuide } from "@/components/public/camera-editorial-guide";
import { ProductRentalAction } from "@/components/public/product-rental-action";
import { ProductCard } from "@/components/public/product-card";
import { StickyMessengerBar } from "@/components/public/sticky-messenger-bar";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/public/json-ld";
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

  const editorialContent = getCameraSeoContent(params.slug);

  const title =
    editorialContent?.seoTitle ||
    equipment.seo_title ||
    `Thuê máy ảnh ${equipment.name} tại Quảng Bình, Đồng Hới`;

  const description =
    editorialContent?.seoDescription ||
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
  const [equipment, settings] = await Promise.all([
    getEquipmentBySlug(params.slug),
    getSiteSettings(),
  ]);

  if (!equipment) {
    notFound();
  }

  const editorialContent = getCameraSeoContent(params.slug);
  const relatedEquipment = await getRelatedEquipment(equipment.slug, equipment.brand, 4);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kihocamera.com";
  const messengerChatUrl = buildMessengerUrl(settings.messenger_url, equipment.name);

  const formatK = (price: number) => {
    if (!price) return "---";
    return `${Math.round(price / 1000)}K`;
  };

  const hasSampleImages = equipment.sample_images && equipment.sample_images.length > 0;

  return (
    <div className="bg-[#faf8f5] min-h-screen py-8 pb-24 md:pb-16">
      <ProductJsonLd equipment={equipment} siteUrl={siteUrl} />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Máy ảnh", url: "/thiet-bi" },
          { name: equipment.name, url: `/thiet-bi/${equipment.slug}` },
        ]}
        siteUrl={siteUrl}
      />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Minimal Breadcrumb */}
        <FadeIn direction="none" className="flex items-center gap-2 text-xs font-sans text-ink-400">
          <Link href="/" className="hover:text-ink-900 transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href="/thiet-bi" className="hover:text-ink-900 transition-colors">
            Máy ảnh
          </Link>
          <span>/</span>
          <span className="text-ink-900 font-semibold truncate max-w-[200px]">
            {equipment.name}
          </span>
        </FadeIn>

        {/* TOP HERO SECTION: 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left: Product Gallery */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 self-start">
            <ProductGallery
              images={equipment.images}
              productName={equipment.name}
            />
          </div>

          {/* Right: Essential Decision & Conversion Information */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header / Title */}
            <div className="space-y-2 pb-5 border-b border-ink-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium tracking-widest text-ink-500 uppercase">
                  {equipment.brand} · MÁY ẢNH CHO THUÊ
                </span>
                {equipment.is_featured && (
                  <span className="text-[10px] font-mono font-medium uppercase bg-ink-900 text-white px-2 py-0.5 rounded-sm">
                    KIHO PICK
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight leading-tight">
                {equipment.name}
              </h1>

              {equipment.use_cases?.length > 0 && (
                <div className="text-xs text-ink-500 font-sans font-medium">
                  Phù hợp: {equipment.use_cases.join(" · ")}
                </div>
              )}
            </div>

            {/* 3-Tier Price Block */}
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-ink-200 shadow-xs space-y-3">
              <span className="text-[10px] font-mono font-medium tracking-widest text-ink-400 uppercase block">
                BẢNG GIÁ THUÊ NIÊM YẾT
              </span>

              <div className="grid grid-cols-3 gap-2 text-center divide-x divide-ink-200 font-mono">
                {/* Tier 1: 1 Buổi */}
                <div className="px-2">
                  <span className="text-[11px] text-ink-500 font-sans block mb-1 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3 text-ink-400" />
                    1 buổi
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-ink-900 font-mono">
                    {formatK(equipment.price_session)}
                  </span>
                  <span className="text-[10px] text-ink-400 font-sans block mt-0.5">4 – 5 tiếng</span>
                </div>

                {/* Tier 2: 1 Ngày */}
                <div className="px-2">
                  <span className="text-[11px] text-ink-500 font-sans block mb-1 flex items-center justify-center gap-1">
                    <Calendar className="w-3 h-3 text-ink-400" />
                    1 ngày
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-accent font-mono">
                    {formatK(equipment.price_per_day)}
                  </span>
                  <span className="text-[10px] text-ink-400 font-sans block mt-0.5">24 tiếng</span>
                </div>

                {/* Tier 3: 3 Ngày + */}
                <div className="px-2 bg-rose-50/60 rounded-lg py-1 text-rose-700">
                  <span className="text-[11px] font-sans font-medium block mb-1 flex items-center justify-center gap-1">
                    <Tag className="w-3 h-3" />
                    Từ 3 ngày
                  </span>
                  <span className="text-xl sm:text-2xl font-bold font-mono">
                    {formatK(equipment.price_three_days)}
                  </span>
                  <span className="text-[10px] font-sans block mt-0.5">/ ngày</span>
                </div>
              </div>
            </div>

            {/* Short Description */}
            {equipment.short_description && (
              <p className="text-sm sm:text-base text-ink-600 leading-relaxed font-sans font-normal">
                {equipment.short_description}
              </p>
            )}

            {/* Action Buttons */}
            <ProductRentalAction
              equipment={equipment}
              messengerChatUrl={messengerChatUrl}
              hasSampleImages={hasSampleImages}
              sampleImagesCount={equipment.sample_images?.length}
            />

          </div>
        </div>

        {/* 2. REAL SAMPLE PHOTOS GALLERY */}
        <SamplePhotoGallery cameraName={equipment.name} sampleImages={equipment.sample_images} />

        {/* 3. PRODUCT DETAILS SECTION (Included accessories & technical specifications) */}
        <EquipmentDetails equipment={equipment} messengerChatUrl={messengerChatUrl} />

        {/* 4. UNIQUE EDITORIAL ON-PAGE SEO GUIDE & FAQS */}
        {editorialContent && (
          <CameraEditorialGuide content={editorialContent} />
        )}

        {/* 5. RELATED CAMERAS SECTION */}
        {relatedEquipment.length > 0 && (
          <div className="pt-12 sm:pt-16 border-t border-ink-200 space-y-6">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[11px] font-mono font-medium tracking-widest text-ink-400 uppercase block mb-0.5">
                  GỢI Ý THÊM
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight">
                  Máy tương tự bạn có thể thích
                </h2>
              </div>
              <Link
                href="/thiet-bi"
                className="text-xs font-sans font-semibold text-ink-900 hover:text-accent hidden sm:block"
              >
                Xem tất cả 12 máy →
              </Link>
            </div>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
