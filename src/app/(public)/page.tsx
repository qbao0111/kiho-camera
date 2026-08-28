import React from "react";
import { getSiteSettings } from "@/lib/services/settings";
import { getEquipmentList } from "@/lib/services/equipment";
import { LandingHero } from "@/components/public/landing-hero";
import { TrustStrip } from "@/components/public/trust-strip";
import { RentalPriceIndex } from "@/components/public/rental-price-index";
import { FeaturedCameras } from "@/components/public/featured-cameras";
import { CanonR50Spotlight } from "@/components/public/canon-r50-spotlight";
import { UseCaseSection } from "@/components/public/use-case-section";
import { RentalRequestSection } from "@/components/public/rental-request-section";
import { RentalProcess } from "@/components/public/rental-process";

export default async function HomePage() {
  const [settings, equipmentList] = await Promise.all([
    getSiteSettings(),
    getEquipmentList({ onlyActive: true }),
  ]);

  return (
    <div className="bg-[#faf8f5] text-ink-900 selection:bg-accent/20">
      {/* 1. EDITORIAL HERO (Balanced typography, refined camera hierarchy & magazine caption) */}
      <LandingHero
        messengerUrl={settings.messenger_url}
        phone={settings.phone}
      />

      {/* 2. TRUST STRIP (Marquee ticker with key guarantees) */}
      <TrustStrip />

      {/* 3. BẢNG GIÁ THUÊ MÁY ẢNH KIHO (Approved Editorial Price Index & Live Side Preview) */}
      <RentalPriceIndex
        equipment={equipmentList}
        messengerUrl={settings.messenger_url}
      />

      {/* 4. MÁY ĐANG CÓ TẠI KIHO (Curated camera cards preview) */}
      <FeaturedCameras equipment={equipmentList} />

      {/* 5. CANON R50 SPOTLIGHT (Editorial Feature Band) */}
      <CanonR50Spotlight messengerUrl={settings.messenger_url} />

      {/* 6. CHỌN VIBE CHUYẾN ĐI (High-Sharpness Native 4:5 Photographic Grid) */}
      <UseCaseSection />

      {/* 7. LEAD CONVERSION FORM ("Không biết chọn máy nào?" - Direct lead capture) */}
      <RentalRequestSection
        equipmentList={equipmentList}
        messengerUrl={settings.messenger_url}
      />

      {/* 8. RENTAL PROCESS (3-step clean workflow & FAQ reassurance) */}
      <RentalProcess messengerUrl={settings.messenger_url} />
    </div>
  );
}
