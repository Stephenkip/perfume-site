import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { getProductsAndCategories, type CatalogCategory } from "@/lib/queries/catalog";
import type { Product } from "@/types/supabase";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { placeholderImage } from "@/lib/images";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collection — OEA Perfumery",
  description: "Explore the alcohol-free fine fragrance collection.",
};

export default async function ShopPage() {
  const supabase = await createClient();

  const { products = [], categories = [] } = await getProductsAndCategories(
    supabase,
  );

  const filters = [
    { value: "all", label: "All" },
    ...categories.map((c: CatalogCategory) => ({ value: c.slug, label: c.name })),
  ];

  const mapped: Array<{
    id: string;
    slug: string;
    name: string;
    concentration?: string | null;
    size_ml?: number | null;
    price_cents?: number | null;
    bestseller?: boolean | null;
    preorder?: boolean | null;
    image?: string;
    imageAlt: string;
  }> = products.map((p: Product) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    concentration: p.concentration,
    size_ml: p.size_ml,
    price_cents: p.price_cents,
    bestseller: p.bestseller,
    preorder: p.preorder,
    image: undefined,
    imageAlt: `Placeholder for ${p.name}`,
  }));

  return (
    <div className="flex flex-col flex-1">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 relative overflow-x-hidden bg-cream min-h-[calc(100vh-200px)]">
        <section className="relative px-6 md:px-12 py-24 lg:py-32">
          <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden border border-ink/10 bg-cream-deep mb-12 shadow-lg shadow-ink/10">
            <Image
              src={placeholderImage({
                text: "Collection hero — swap for campaign photography",
                width: 1400,
                height: 1050,
              })}
              alt="Collection hero placeholder"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="max-w-2xl">
            <h1 className="font-display text-[56px] leading-tight text-ink tracking-tight italic mb-6">
              The collection
            </h1>
            <p className="text-[15px] leading-7 text-ink/60 max-w-lg">
              Alcohol-free compositions made to be worn close. Browse the full
              edit below, or filter by concentration.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-12 pb-24 lg:pb-32">
          <ProductGrid
            products={mapped}
            filters={filters}
          />
        </section>
      </main>
    </div>
  );
}
