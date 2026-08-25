import React from "react";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { LocalBusinessJsonLd } from "@/components/public/json-ld";
import { getSiteSettings } from "@/lib/services/settings";
import { PageTransition } from "@/components/ui/motion";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kihocamera.com";

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#faf8f5]">
      <LocalBusinessJsonLd settings={settings} siteUrl={siteUrl} />
      <Header settings={settings} />
      <main className="flex-grow">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer settings={settings} />
    </div>
  );
}
