import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getEquipmentBySlug, getRelatedEquipment } from "@/lib/services/equipment";
import { getSiteSettings } from "@/lib/services/settings";
import { ProductGallery } from "@/components/public/product-gallery";
import { ProductCard } from "@/components/public/product-card";
import { StickyMessengerBar } from "@/components/public/sticky-messenger-bar";
import { ProductJsonLd } from "@/components/public/json-ld";
import { formatCurrency, buildMessengerUrl } from "@/lib/utils";
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
      title: "Thiết bị không tồn tại | Kiho Camera",
    };
  }

  const title = equipment.seo_title || `${equipment.name} - Cho thuê máy ảnh Quảng Bình`;
  const description =
    equipment.seo_description ||
    equipment.short_description ||
    `Dịch vụ cho thuê ${equipment.name} uy tín giá rẻ tại Đồng Hới, Quảng Bình. Kèm đầy đủ phụ kiện pin sạc thẻ nhớ.`;

  const coverImage =
    equipment.images?.find((img) => img.is_cover)?.image_url ||
    equipment.images?.[0]?.image_url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: coverImage ? [{ url: coverImage }] : [],
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
    getRelatedEquipment(equipment.slug, equipment.category_id, 4),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kihocamera.com";
  const messengerChatUrl = buildMessengerUrl(settings.messenger_url, equipment.name);

  return (
    <div className="bg-[#faf8f5] min-h-screen py-8 pb-28 md:pb-20">
      <ProductJsonLd equipment={equipment} siteUrl={siteUrl} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Minimal Breadcrumb */}
        <FadeIn direction="none" className="flex items-center gap-2 text-xs font-mono text-ink-400">
          <Link href="/" className="hover:text-ink-900 transition-colors">
            TRANG CHỦ
          </Link>
          <span>/</span>
          <Link href="/thiet-bi" className="hover:text-ink-900 transition-colors">
            THIẾT BỊ
          </Link>
          {equipment.category && (
            <>
              <span>/</span>
              <Link
                href={`/thiet-bi?category=${equipment.category.slug}`}
                className="hover:text-ink-900 transition-colors uppercase"
              >
                {equipment.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-ink-900 font-bold truncate max-w-[200px]">
            {equipment.name}
          </span>
        </FadeIn>

        {/* Main Product Layout: Sticky Left Image / Editorial Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: Sticky Image Gallery (6 cols) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 self-start">
            <ProductGallery images={equipment.images} productName={equipment.name} />
          </div>

          {/* Right: Editorial Information & Hairline Dividers (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            {/* Header / Title */}
            <div className="space-y-3 pb-6 hairline-b">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-ink-400 uppercase">
                  {equipment.category?.name || "THIẾT BỊ"}
                </span>
                {equipment.is_featured && (
                  <span className="text-[10px] font-bold tracking-widest uppercase bg-ink-900 text-[#faf8f5] px-2 py-0.5 rounded-sm">
                    Kiho Pick
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink-900 tracking-tight leading-[1.1]">
                {equipment.name}
              </h1>

              {equipment.use_cases?.length > 0 && (
                <div className="text-xs text-ink-500 font-medium">
                  {equipment.use_cases.join(" · ")}
                </div>
              )}

              {/* Price */}
              <div className="pt-2 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-ink-900">
                  {formatCurrency(equipment.price_per_day)}
                </span>
                <span className="text-xs text-ink-400 font-mono">/ 24 giờ thuê</span>
              </div>
            </div>

            {/* Short Description */}
            {equipment.short_description && (
              <p className="text-sm sm:text-base text-ink-700 leading-relaxed font-normal">
                {equipment.short_description}
              </p>
            )}

            {/* Primary Action Button */}
            <div className="space-y-2.5 pt-2">
              <a
                href={messengerChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-ink-900 hover:bg-accent text-[#faf8f5] font-bold py-4 px-6 rounded-sm shadow-sm transition-colors text-sm sm:text-base"
              >
                <span>Nhắn Kiho Camera để thuê máy này</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <div className="flex items-center justify-between text-[11px] font-mono text-ink-400 px-1">
                <span>TƯ VẤN NHANH QUA MESSENGER</span>
                <span>HOTLINE: {settings.phone}</span>
              </div>
            </div>

            {/* Editorial Hairline Sections */}
            <div className="space-y-6 pt-4">
              {/* 1. Included items */}
              {equipment.included_items && equipment.included_items.length > 0 && (
                <div className="space-y-2.5 pt-6 hairline-t">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-ink-400 uppercase block">
                    BỘ THUÊ GỒM
                  </span>
                  <ul className="text-sm text-ink-800 space-y-1.5 list-disc list-inside">
                    {equipment.included_items.map((item, idx) => (
                      <li key={idx} className="leading-snug">{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 2. Specifications */}
              {equipment.specifications && Object.keys(equipment.specifications).length > 0 && (
                <div className="space-y-3 pt-6 hairline-t">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-ink-400 uppercase block">
                    THÔNG SỐ KỸ THUẬT
                  </span>
                  <div className="divide-y divide-[#e7e4dc] text-xs sm:text-sm">
                    {Object.entries(equipment.specifications).map(([key, val], idx) => (
                      <div key={idx} className="py-2 flex justify-between gap-4">
                        <span className="text-ink-500 font-medium capitalize">
                          {key.replace(/_/g, " ")}
                        </span>
                        <span className="text-ink-900 font-semibold text-right max-w-[240px]">
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Detailed Overview */}
              {equipment.description && (
                <div className="space-y-2.5 pt-6 hairline-t">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-ink-400 uppercase block">
                    CHI TIẾT TRẢI NGHIỆM
                  </span>
                  <div className="text-xs sm:text-sm text-ink-700 leading-relaxed space-y-2">
                    {equipment.description.split("\n\n").map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Rental Policy & Deposit */}
              <div className="space-y-2.5 pt-6 hairline-t">
                <span className="text-[11px] font-mono font-bold tracking-widest text-ink-400 uppercase block">
                  LƯU Ý THUÊ & CỌC CCCD
                </span>
                <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
                  {equipment.deposit_note ||
                    "Khách mang theo CCCD gắn chip chính chủ để làm thủ tục nhận máy. Trường hợp không giữ CCCD, bạn có thể đặt cọc theo thoả thuận."}
                </p>
                <div className="pt-1">
                  <Link
                    href="/huong-dan-thue"
                    className="text-xs font-bold text-ink-900 underline underline-offset-4"
                  >
                    Xem chi tiết quy trình thuê máy →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Equipment Section */}
        {relatedEquipment.length > 0 && (
          <div className="pt-16 sm:pt-24 hairline-t space-y-8">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold tracking-widest text-ink-400 uppercase block mb-1">
                  GỢI Ý THÊM
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-ink-900 tracking-tight">
                  Thiết bị tương tự
                </h2>
              </div>
              <Link
                href="/thiet-bi"
                className="text-xs font-bold text-ink-900 link-underline hidden sm:block"
              >
                Xem tất cả thiết bị →
              </Link>
            </div>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
