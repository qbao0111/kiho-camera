import React from "react";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/public/json-ld";
import { getSiteSettings } from "@/lib/services/settings";
import { getStorefrontImages } from "@/lib/services/storefront";
import { PageTransition } from "@/components/ui/motion";

export const revalidate = 120;
// Workers Free has no persistent ISR cache configured; always read current public data.
export const dynamic = "force-dynamic";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, storefrontImages] = await Promise.all([
    getSiteSettings(),
    getStorefrontImages({ onlyActive: true }),
  ]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kihocamera.com";

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#faf8f5]">
      {/* Accessible Skip-to-content Link for Keyboard & Screen Reader Users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:bg-ink-900 focus:text-white focus:rounded-md focus:shadow-md focus:outline-hidden focus:ring-2 focus:ring-accent text-xs font-sans font-semibold"
      >
        Chuyển đến nội dung chính
      </a>

      <LocalBusinessJsonLd settings={settings} siteUrl={siteUrl} storefrontImages={storefrontImages} />
      <WebSiteJsonLd siteUrl={siteUrl} />
      <Header settings={settings} />
      <main id="main-content" className="flex-grow">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer settings={settings} />
    </div>
  );
}

