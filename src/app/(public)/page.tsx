import React from "react";
import { getSiteSettings } from "@/lib/services/settings";
import { getEquipmentList, toPricingEquipmentDTO, toRentalFormEquipmentDTO } from "@/lib/services/equipment";
import { getStorefrontImages } from "@/lib/services/storefront";
import { LandingHero } from "@/components/public/landing-hero";
import { LocalStoreTrustSection } from "@/components/public/local-store-trust-section";
import { RentalPriceIndex } from "@/components/public/rental-price-index";
import { HomepageMixedSampleGallery } from "@/components/public/homepage-mixed-sample-gallery";
import { CanonR50Spotlight } from "@/components/public/canon-r50-spotlight";
import { Interactive3dAperture } from "@/components/public/interactive-3d-aperture";
import { UseCaseSection } from "@/components/public/use-case-section";
import { RentalRequestSection } from "@/components/public/rental-request-section";
import { RentalProcess } from "@/components/public/rental-process";

export default async function HomePage() {
  const [settings, equipmentList, storefrontImages] = await Promise.all([
    getSiteSettings(),
    getEquipmentList({ onlyActive: true }),
    getStorefrontImages({ onlyActive: true }),
  ]);

  // Project lightweight DTOs for client-hydrated components to minimize RSC serialization payload
  const pricingEquipment = equipmentList.map(toPricingEquipmentDTO);
  const rentalFormEquipment = equipmentList.map(toRentalFormEquipmentDTO);

  return (
    <div className="bg-[#faf8f5] text-ink-900 selection:bg-accent/20">
      {/* 1. EDITORIAL HERO */}
      <LandingHero
        messengerUrl={settings.messenger_url}
        phone={settings.phone}
      />

      {/* 2. ĐỊA CHỈ & HÌNH ẢNH CỬA HÀNG THỰC TẾ (Local Trust & Storefront) */}
      <LocalStoreTrustSection
        settings={settings}
        storefrontImages={storefrontImages}
      />

      {/* 3. ẢNH CHỤP THỰC TẾ (Real customer & travel sample photos gallery) */}
      <HomepageMixedSampleGallery equipmentList={equipmentList} />

      {/* 4. CHỌN THEO GU DU LỊCH & BỐI CẢNH (Visual Vibe Themes) */}
      <UseCaseSection />

      {/* 5. BẢNG GIÁ THUÊ MÁY & KHÁM PHÁ THIẾT BỊ (Interactive Price Index & Camera Explorer) */}
      <RentalPriceIndex
        equipment={pricingEquipment}
        messengerUrl={settings.messenger_url}
      />

      {/* 6. GỢI Ý MÁY ĐIỂN HÌNH: CANON EOS R50 (Humanized Editorial Feature) */}
      <CanonR50Spotlight messengerUrl={settings.messenger_url} />

      {/* 7. HƯỚNG DẪN KHẨU ĐỘ & ĐỘ SÂU TRƯỜNG ẢNH (Aperture Visual Guide) */}
      <Interactive3dAperture />

      {/* 8. THỦ TỤC THUÊ GỌN NHẸ 3 BƯỚC & CÂU HỎI THƯỜNG GẶP */}
      <RentalProcess messengerUrl={settings.messenger_url} />

      {/* 9. ĐẶT LỊCH TƯ VẤN & GIỮ MÁY (Conversion Form) */}
      <RentalRequestSection
        equipmentList={rentalFormEquipment}
        messengerUrl={settings.messenger_url}
      />
    </div>
  );
}

