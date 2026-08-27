import React from "react";
import { getSiteSettings } from "@/lib/services/settings";
import { getEquipmentList } from "@/lib/services/equipment";
import { LandingHero } from "@/components/public/landing-hero";
import { TrustStrip } from "@/components/public/trust-strip";
import { CameraPricingSlider } from "@/components/public/camera-pricing-slider";
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
    <div className="bg-[#faf8f4]">
      {/* 1. EDITORIAL HERO (Multilayer depth with real camera cutouts & dynamic showcase) */}
      <LandingHero
        messengerUrl={settings.messenger_url}
        phone={settings.phone}
      />

      {/* 2. TRUST STRIP (Marquee bar with key guarantees) */}
      <TrustStrip />

      {/* 3. CAMERA PRICING SLIDER (12 models reading directly from database) */}
      <CameraPricingSlider
        equipment={equipmentList}
        messengerUrl={settings.messenger_url}
      />

      {/* 4. MÁY ĐANG CÓ TẠI KIHO (Curated camera cards preview) */}
      <FeaturedCameras equipment={equipmentList} />

      {/* 5. CANON R50 SPOTLIGHT (Editorial Feature Band) */}
      <CanonR50Spotlight messengerUrl={settings.messenger_url} />

      {/* 6. USE CASES ("Chọn vibe chuyến đi" - 4 authentic travel photo cards) */}
      <UseCaseSection />

      {/* 7. LEAD CONVERSION FORM ("Không biết chọn máy nào?" - Direct lead capture) */}
      <RentalRequestSection
        equipmentList={equipmentList}
        messengerUrl={settings.messenger_url}
      />

      {/* 8. RENTAL PROCESS (3-step clean typography workflow) */}
      <RentalProcess messengerUrl={settings.messenger_url} />
    </div>
  );
}
