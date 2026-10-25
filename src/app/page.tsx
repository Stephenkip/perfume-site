import { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { HomeHero } from "@/components/home/HomeSections";
import { DarkFeature } from "@/components/home/HomeSections";
import { CollectionRow } from "@/components/home/HomeSections";
import { TrustStrip } from "@/components/home/HomeSections";
import { Testimonials } from "@/components/home/HomeSections";
import { PressCards } from "@/components/home/HomeSections";
import { SubscribeSave } from "@/components/home/HomeSections";
import { SocialGallery } from "@/components/home/HomeSections";
import { HomeScrollEffects } from "@/components/home/HomeScrollEffects";
import { BRAND_NAME, TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${BRAND_NAME} — Alcohol-Free Fine Fragrance`,
  description: TAGLINE,
};

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 relative overflow-x-hidden bg-cream">
        <HomeScrollEffects />
        <HomeHero />
        <DarkFeature
          lines={[
            `The ${TAGLINE.toLowerCase()}.`,
            "Wear it close, wear it bold.",
          ]}
        />
        <CollectionRow />
        <TrustStrip />
        <Testimonials />
        <PressCards />
        <SubscribeSave />
        <SocialGallery />
      </main>
    </div>
  );
}
