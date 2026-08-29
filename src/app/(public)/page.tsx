import React from "react";
import { getSiteSettings } from "@/lib/services/settings";
import { getEquipmentList, toPricingEquipmentDTO, toRentalFormEquipmentDTO } from "@/lib/services/equipment";
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

  // Project lightweight DTOs for client-hydrated components to minimize RSC serialization payload
  const pricingEquipment = equipmentList.map(toPricingEquipmentDTO);
  const rentalFormEquipment = equipmentList.map(toRentalFormEquipmentDTO);

  return (
    <div className="bg-[#faf8f5] text-ink-900 selection:bg-accent/20">
      {/* 1. EDITORIAL HERO (Server component + lightweight client showcase) */}
      <LandingHero
        messengerUrl={settings.messenger_url}
        phone={settings.phone}
      />

      {/* 2. TRUST STRIP (Marquee ticker with key guarantees) */}
      <TrustStrip />

      {/* 3. BẢNG GIÁ THUÊ MÁY ẢNH KIHO (Client component with projected lightweight DTO) */}
      <RentalPriceIndex
        equipment={pricingEquipment}
        messengerUrl={settings.messenger_url}
      />

      {/* 4. MÁY ĐANG CÓ TẠI KIHO (Server-rendered camera cards preview) */}
      <FeaturedCameras equipment={equipmentList} />

      {/* 5. CANON R50 SPOTLIGHT (Server-rendered Editorial Feature Band) */}
      <CanonR50Spotlight messengerUrl={settings.messenger_url} />

      {/* 6. CHỌN VIBE CHUYẾN ĐI (Server-rendered High-Sharpness 4:5 Photographic Grid) */}
      <UseCaseSection />

      {/* 7. LEAD CONVERSION FORM (Server wrapper + lightweight form client component) */}
      <RentalRequestSection
        equipmentList={rentalFormEquipment}
        messengerUrl={settings.messenger_url}
      />

      {/* 8. RENTAL PROCESS (Server-rendered 3-step clean workflow & FAQ reassurance) */}
      <RentalProcess messengerUrl={settings.messenger_url} />
    </div>
  );
}

