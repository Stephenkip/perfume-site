import { Metadata } from "next";
import {
  createClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import { getProductsAndCategories } from "@/lib/queries/catalog";
import { HomeHero } from "@/components/home/HomeSections";
import { DarkFeature } from "@/components/home/HomeSections";
import { CollectionRow } from "@/components/home/HomeSections";
import { BrandPrinciples } from "@/components/home/HomeSections";
import { TrustStrip } from "@/components/home/HomeSections";
import { HomeScrollEffects } from "@/components/home/HomeScrollEffects";
import { BRAND_NAME, TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${BRAND_NAME} — Alcohol-Free Fine Fragrance`,
  description: TAGLINE,
};

export default async function HomePage() {
  const catalog = isSupabaseConfigured()
    ? await getProductsAndCategories(await createClient())
    : { products: [], images: [] };
  const images = catalog.images ?? [];
  const homeProducts = catalog.products.slice(0, 3).map((product) => {
    const primaryImage =
      images.find(
        (image) => image.product_id === product.id && image.is_primary,
      ) ??
      images.find((image) => image.product_id === product.id);

    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      concentration: product.concentration,
      size_ml: product.size_ml,
      price_cents: product.price_cents,
      bestseller: product.bestseller,
      preorder: product.preorder,
      image: primaryImage?.url,
      imageAlt: primaryImage?.alt_text ?? `Fragrance bottle: ${product.name}`,
    };
  });

  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 relative overflow-x-hidden bg-cream">
        <HomeScrollEffects />
        <HomeHero image={homeProducts[0]?.image} />
        <DarkFeature
          lines={[
            `The ${TAGLINE.toLowerCase()}.`,
            "Wear it close, wear it bold.",
          ]}
        />
        <CollectionRow products={homeProducts} />
        <BrandPrinciples />
        <TrustStrip />
      </main>
    </div>
  );
}
