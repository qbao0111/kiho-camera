import React from "react";
import { getSiteSettings } from "@/lib/services/settings";
import { getFeaturedFeedback } from "@/lib/services/feedback";
import { LandingHero } from "@/components/public/landing-hero";
import { TrustStrip } from "@/components/public/trust-strip";
import { CameraPricingSlider } from "@/components/public/camera-pricing-slider";
import { CanonR50Spotlight } from "@/components/public/canon-r50-spotlight";
import { UseCaseSection } from "@/components/public/use-case-section";
import { EditorialFeedback } from "@/components/public/editorial-feedback";
import { RentalProcess } from "@/components/public/rental-process";
import { FinalCta } from "@/components/public/final-cta";

export default async function HomePage() {
  const [settings, feedbacks] = await Promise.all([
    getSiteSettings(),
    getFeaturedFeedback(),
  ]);

  return (
    <div className="bg-[#faf8f4]">
      {/* 1. NEW EDITORIAL HERO (Multilayer depth with real camera cutouts & asymmetric composition) */}
      <LandingHero
        messengerUrl={settings.messenger_url}
        phone={settings.phone}
      />

      {/* 2. TRUST STRIP (Marquee bar with key guarantees) */}
      <TrustStrip />

      {/* 3. CAMERA PRICING SLIDER (12 models from official price flyer with seamless auto-scroll) */}
      <CameraPricingSlider messengerUrl={settings.messenger_url} />

      {/* 4. CANON R50 SPOTLIGHT (Editorial Feature Band) */}
      <CanonR50Spotlight messengerUrl={settings.messenger_url} />

      {/* 5. USE CASES ("Bạn định mang máy đi đâu?" - 4 visual storytelling photo tiles) */}
      <UseCaseSection />

      {/* 6. SOCIAL PROOF / FEEDBACK ("Người ta mang Kiho đi đâu rồi?" - Contact sheet layout) */}
      <EditorialFeedback feedbacks={feedbacks} />

      {/* 7. RENTAL PROCESS (3-step clean typography workflow) */}
      <RentalProcess messengerUrl={settings.messenger_url} />

      {/* 8. FINAL LIFESTYLE CTA (Editorial dark warm backdrop with direct contact) */}
      <FinalCta
        messengerUrl={settings.messenger_url}
        phone={settings.phone}
        address={settings.address}
      />
    </div>
  );
}
