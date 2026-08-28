import React from "react";
import { getSiteSettings } from "@/lib/services/settings";
import { getEquipmentList } from "@/lib/services/equipment";
import { V3Hero } from "@/components/public/v3/v3-hero";
import { TrustStrip } from "@/components/public/trust-strip";
import { RentalPriceIndex } from "@/components/public/v3/rental-price-index";
import { QuangBinhJourney } from "@/components/public/v3/quang-binh-journey";
import { CameraStorytelling } from "@/components/public/v3/camera-storytelling";
import { CameraStories } from "@/components/public/v3/camera-stories";
import { TravelBookingNote } from "@/components/public/v3/travel-booking-note";
import { PickupAndProcess } from "@/components/public/v3/pickup-and-process";

export default async function HomePage() {
  const [settings, equipmentList] = await Promise.all([
    getSiteSettings(),
    getEquipmentList({ onlyActive: true }),
  ]);

  return (
    <div className="bg-[#faf8f5] text-ink-900 selection:bg-accent/20">
      {/* 01 / ARRIVAL — Immersive 3D Hero */}
      <V3Hero />

      {/* Trust Strip Ticker */}
      <TrustStrip />

      {/* 02 / RENTAL INDEX — Editorial Rental Price Index & Live Preview */}
      <RentalPriceIndex
        equipment={equipmentList}
        messengerUrl={settings.messenger_url}
      />

      {/* 03 / QUẢNG BÌNH, THROUGH A CAMERA — Photographic Travel Story & Subtle Parallax */}
      <QuangBinhJourney />

      {/* 04 / CHOOSE YOUR CAMERA — Storytelling Feature (Một chiếc máy — ba khoảnh khắc) */}
      <CameraStorytelling />

      {/* 05 / CAMERA STORIES — Asymmetric Lifestyle Contact-Sheet Collage */}
      <CameraStories />

      {/* 06 / BOOK YOUR TRIP — Open Travel Booking Lead Note */}
      <TravelBookingNote
        equipmentList={equipmentList}
        messengerUrl={settings.messenger_url}
      />

      {/* 07 / PICKUP & JOURNEY START — 3-Step Process & Journal Transition */}
      <PickupAndProcess messengerUrl={settings.messenger_url} />
    </div>
  );
}
