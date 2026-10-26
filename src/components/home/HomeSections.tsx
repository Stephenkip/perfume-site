"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { ProductCard } from "@/components/shop/ProductCard";
import { TAGLINE } from "@/lib/site";

interface HomeProduct {
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
}

export function HomeHero({ image }: { image?: string }) {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-36 md:px-12 md:pb-24 md:pt-40 lg:min-h-[760px] lg:py-28">
      <div className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-amber/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 md:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="relative z-10 space-y-7">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-terracotta" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-terracotta">
              OEA Perfumery · France
            </span>
          </div>
          <motion.h1
            className="max-w-[740px] font-display text-[clamp(3.25rem,7vw,6.5rem)] leading-[0.96] tracking-[-0.045em] text-ink italic"
            data-reveal
          >
            A fragrance
            <span className="block text-terracotta">without alcohol.</span>
          </motion.h1>
          <p className="max-w-md text-[15px] leading-7 text-ink/65 md:text-[16px]">
            {TAGLINE}. Composed to be worn close — on skin, on fabric, in
            stillness.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="primary" asChild>
              <Link href="/shop">Explore the collection</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/why-us">Our story</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] md:max-w-none">
          <div className="absolute -inset-5 rounded-[40px] bg-terracotta/10 blur-2xl" />
          <div className="relative aspect-[4/4.6] overflow-hidden rounded-[220px_220px_28px_28px] border border-ink/10 bg-cream-deep shadow-2xl shadow-ink/10">
            {image ? (
              <Image
                src={image}
                alt="OEA fragrance bottle"
                fill
                sizes="(max-width: 767px) 90vw, (max-width: 1280px) 45vw, 560px"
                className="object-cover"
                priority
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_68%_24%,#f5e9d9_0%,transparent_28%),linear-gradient(145deg,#d9bca3_0%,#c88d71_48%,#7f3c36_100%)]">
                <div className="absolute -right-[18%] top-[8%] aspect-square w-[92%] rounded-full border border-cream/35" />
                <div className="absolute -right-[6%] top-[20%] aspect-square w-[68%] rounded-full border border-cream/30" />
                <div className="absolute left-[12%] top-[16%] font-display text-[clamp(6rem,17vw,13rem)] italic leading-none tracking-[-0.1em] text-cream/90">
                  OEA
                </div>
                <div className="absolute bottom-[24%] left-[13%] h-px w-[54%] bg-cream/55" />
                <p className="absolute bottom-[17%] left-[13%] text-[9px] font-medium uppercase tracking-[0.25em] text-cream/85">
                  Alcohol-free fine fragrance
                </p>
                <p className="absolute bottom-[12%] left-[13%] text-[9px] uppercase tracking-[0.2em] text-cream/65">
                  Composed in France
                </p>
              </div>
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/30 to-transparent" />
            <div className="absolute bottom-6 left-6 text-cream">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-cream/75">
                A quieter kind of fragrance
              </p>
              <p className="mt-2 font-display text-2xl italic">Wear it close.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface DarkFeatureProps {
  lines: string[];
}

export function DarkFeature({ lines }: DarkFeatureProps) {
  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-24 lg:py-28">
      <div className="pointer-events-none absolute -right-24 -top-40 h-[480px] w-[480px] rounded-full border border-cream/10" />
      <div className="pointer-events-none absolute -right-6 -top-20 h-[320px] w-[320px] rounded-full border border-cream/10" />
      <div className="relative mx-auto grid max-w-[1440px] gap-8 px-6 md:grid-cols-[1fr_0.6fr] md:items-end md:px-12 lg:gap-20">
        <div>
          <p className="mb-8 text-[10px] font-medium uppercase tracking-[0.2em] text-amber">
            A different way to wear fragrance
          </p>
          {lines.map((line, i) => (
            <p
              key={line}
              className={`font-display leading-[1.04] text-cream italic tracking-tight ${
                i === 0
                  ? "text-[clamp(2.75rem,6vw,5.5rem)]"
                  : "mt-2 text-[clamp(2rem,4.5vw,4rem)] text-cream/55"
              }`}
            >
              {line}
            </p>
          ))}
        </div>
        <p className="max-w-sm border-l border-cream/25 pl-6 text-[14px] leading-7 text-cream/70 md:justify-self-end">
          No alcohol. No excess. Just a considered composition, made to live
          close to you.
        </p>
      </div>
    </section>
  );
}

export function CollectionRow({ products }: { products: HomeProduct[] }) {
  return (
    <section className="px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1440px]">
      <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-terracotta">
            A personal ritual
          </p>
          <h2 className="font-display text-[42px] leading-tight text-ink tracking-tight italic md:text-[56px]">
            Our collection
          </h2>
          <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-ink/50 font-medium">
            Alcohol-free fine fragrance
          </p>
        </div>
        <Link href="/shop" className="hidden text-[11px] font-medium uppercase tracking-[0.14em] text-terracotta transition-colors hover:text-ink sm:inline-flex">
          View the collection <span className="ml-2" aria-hidden="true">↗</span>
        </Link>
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} isHome />
          ))}
        </div>
      ) : (
        <Link
          href="/shop"
          className="group relative block overflow-hidden rounded-[28px] border border-ink/10 bg-cream-deep p-8 transition-shadow hover:shadow-xl hover:shadow-ink/10 md:p-14"
        >
          <div className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full border border-terracotta/20 transition-transform duration-700 group-hover:scale-110" />
          <div className="pointer-events-none absolute -right-2 -top-14 h-52 w-52 rounded-full border border-terracotta/20 transition-transform duration-700 group-hover:scale-110" />
          <div className="relative max-w-2xl">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-terracotta">
              Discover OEA
            </p>
            <p className="font-display text-[32px] leading-tight text-ink italic md:text-[44px]">
              Fragrance, composed to be worn close.
            </p>
            <p className="mt-4 max-w-lg text-[14px] leading-7 text-ink/60">
              Explore alcohol-free fine fragrance, made in France.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-terracotta">
              Explore the collection <span aria-hidden="true">↗</span>
            </span>
          </div>
        </Link>
      )}
      </div>
    </section>
  );
}

export function BrandPrinciples() {
  const principles = [
    {
      number: "01",
      title: "Alcohol-free",
      description: "Fine fragrance, composed without alcohol.",
    },
    {
      number: "02",
      title: "Worn close",
      description: "A personal scent ritual for skin, fabric, and stillness.",
    },
    {
      number: "03",
      title: "Made in France",
      description: "Thoughtfully composed and responsibly packed.",
    },
  ];

  return (
    <section className="px-6 py-20 md:px-12 md:py-28 bg-cream-deep">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.16em] text-terracotta">
            The OEA approach
          </p>
          <h2 className="font-display text-[42px] leading-tight italic tracking-tight text-ink md:text-[52px]">
            Composed for closeness
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-7 text-ink/65">
            {TAGLINE}. Composed to be worn close — on skin, on fabric, in
            stillness.
          </p>
          <Button variant="outline" asChild className="mt-8">
            <Link href="/why-us">Discover why OEA</Link>
          </Button>
        </div>

        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {principles.map((principle) => (
            <div
              key={principle.number}
              className="grid grid-cols-[48px_1fr] gap-5 py-7 md:grid-cols-[64px_1fr]"
            >
              <span className="pt-1 text-[11px] font-medium tracking-wider text-terracotta">
                {principle.number}
              </span>
              <div>
                <h3 className="font-display text-[24px] italic text-ink">
                  {principle.title}
                </h3>
                <p className="mt-2 text-[14px] leading-6 text-ink/60">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const trustItems = [
  "100% alcohol-free",
  "Made in France",
  "Cruelty-free",
  "Vegan formulas",
  "Recyclable packaging",
  "Sensitive skin tested",
];

export function TrustStrip() {
  return (
    <section className="px-6 md:px-12 py-10 border-y border-ink/10 bg-cream-deep">
      <div className="relative overflow-hidden">
        <Marquee speed={20}>
          <span className="text-[13px] font-medium text-ink uppercase tracking-wider">
            {trustItems.join("  ·  ")}
          </span>
        </Marquee>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-cream pointer-events-none" />
      </div>
    </section>
  );
}
