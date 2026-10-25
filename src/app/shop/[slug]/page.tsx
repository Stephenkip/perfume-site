import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getProductBySlug } from "@/lib/queries/catalog";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGallery } from "@/components/product/ProductSections";
import { ScentProfile } from "@/components/product/ProductSections";
import { NotesAccordion } from "@/components/product/ProductSections";
import { ProductReviews } from "@/components/product/ProductSections";
import { RelatedCarousel } from "@/components/product/ProductSections";
import { StickyMobileBar } from "@/components/product/ProductSections";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { placeholderImage } from "@/lib/images";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { product } = await getProductBySlug(supabase, slug);
  if (!product) {
    return { title: "Product not found — OEA Perfumery" };
  }
  return {
    title: `${product.name} — OEA Perfumery`,
    description: product.description ?? "Alcohol-free fine fragrance.",
    openGraph: {
      images: product.id ? [{ url: placeholderImage({ text: product.name }) }] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { product, images, variants } = await getProductBySlug(supabase, slug);

  if (!product) {
    return (
      <div className="flex flex-col flex-1">
        <AnnouncementBar />
        <Header />
        <main className="flex-1 pt-20 px-6 md:px-12">
          <h1 className="font-display text-[56px] text-ink italic">Not found</h1>
          <p>That fragrance isn’t in the collection.</p>
        </main>
      </div>
    );
  }

  const primary =
    images.find((i) => i.is_primary === true) ?? images[0] ?? null;
  const mainImage = primary?.url ?? placeholderImage({ text: product.name });
  const thumbs = images
    .filter((i: { url: string }) => i.url !== primary?.url)
    .slice(0, 4)
    .map((i: { url: string; alt_text: string | null }) => ({
      url: i.url,
      alt: i.alt_text ?? product.name,
    }));

  const defaultVariant = variants[0];
  const notes = [
    { id: "n1", name: "Bergamot", type: "top" as const, image: undefined },
    { id: "n2", name: "Neroli", type: "top" as const, image: undefined },
    { id: "n3", name: "Jasmine", type: "heart" as const, image: undefined },
    { id: "n4", name: "Mimosa", type: "heart" as const, image: undefined },
    { id: "n5", name: "Sandalwood", type: "base" as const, image: undefined },
    { id: "n6", name: "Musk", type: "base" as const, image: undefined },
  ];

  const related = [
    {
      id: "rel-1",
      slug: "discovery-set",
      name: "Discovery set",
      price_cents: 6500,
      image: undefined,
    },
  ];

  return (
    <div className="flex flex-col flex-1">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 relative overflow-x-hidden bg-cream">
        <section className="px-6 md:px-12 py-10 lg:py-16">
          <nav className="flex gap-4 text-[10px] uppercase tracking-wider font-medium text-ink/50">
            <Link href="/" className="hover:text-terracotta transition-colors">
              Home
            </Link>
            <span className="text-ink/20">/</span>
            <Link href="/shop" className="hover:text-terracotta transition-colors">
              Collection
            </Link>
            <span className="text-ink/20">/</span>
            <span className="text-ink">{product.name}</span>
          </nav>
        </section>

        <section className="px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <ProductGallery
                mainImage={mainImage}
                thumbnails={thumbs}
                alt={`Placeholder for ${product.name}`}
                priority
              />
            </div>

            <div className="lg:col-span-5 space-y-10">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-terracotta font-medium mb-2">
                  {product.concentration ?? "Fine fragrance"}
                </p>
                <h1 className="font-display text-[40px] leading-tight text-ink tracking-tight italic mb-4">
                  {product.name}
                </h1>
                <p className="text-[14px] leading-6 text-ink/60 mb-6">
                  {product.description ?? "Placeholder description — an alcohol-free composition developed for closeness without excess."}
                </p>

                <div className="space-y-4">
                  <div className="flex items-end gap-3">
                    <span className="font-display text-[28px] leading-tight text-ink italic">
                      {formatPrice(
                        (defaultVariant?.price_cents ?? product.price_cents) ||
                          0,
                      )}
                    </span>
                    {product.preorder && (
                      <span className="text-[11px] uppercase tracking-wider text-terracotta font-medium">
                        Pre-order
                      </span>
                    )}
                  </div>

                  <div className="border-t border-ink/10 pt-6 flex flex-col gap-4">
                    <p className="text-[11px] uppercase tracking-wider text-ink/50 font-medium">
                      Size
                    </p>
                    <div className="flex gap-3">
                      {variants.map((v: { id: string; size_label: string | null; size_ml: number | null }) => (
                        <button
                          key={v.id}
                          className={`rounded-full border px-5 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all ${
                            v.id === defaultVariant?.id
                              ? "border-ink bg-ink text-cream"
                              : "border-ink/20 text-ink hover:bg-ink/5"
                          }`}
                        >
                          {v.size_label ?? `${v.size_ml ?? 0} ml`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
                    <div className="flex items-center gap-3">
                      <button className="w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:bg-ink hover:text-cream transition-colors focus-visible:ring-2 focus-visible:ring-terracotta outline-none" aria-label="Decrease quantity">–</button>
                      <span className="w-8 text-center text-[13px] font-medium text-ink">1</span>
                      <button className="w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:bg-ink hover:text-cream transition-colors focus-visible:ring-2 focus-visible:ring-terracotta outline-none" aria-label="Increase quantity">+</button>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => {}}
                        variant="primary"
                        className="flex-1"
                      >
                        Add to cart
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Buy now
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-wider text-ink/50 font-medium">
                    <span className="flex items-center gap-1">⟳</span>
                    Free delivery on orders over 100
                  </div>
                </div>
              </div>

              <ScentProfile
                notes={notes}
                pairingLine="Wear it close. Pairs well with linen, evening light, and stillness."
              />

              <NotesAccordion
                items={[
                  {
                    name: "Bergamot",
                    description:
                      "Placeholder note description — citrus top note with a fresh, sparkling opening.",
                    icon: "sun",
                  },
                  {
                    name: "Sandalwood",
                    description:
                      "Placeholder note description — warm, creamy woody base with lasting power.",
                    icon: "tree",
                  },
                ]}
              />

              <ProductReviews
                productId={product.id}
                reviews={[]}
                averageRating={0}
                count={0}
              />

              <RelatedCarousel products={related} />
            </div>
          </div>
        </section>
      </main>
          <StickyMobileBar product={{ ...product, variantId: defaultVariant?.id }} />
    </div>
  );
}
