"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ProductCard } from "@/components/shop/ProductCard";
import { placeholderImage } from "@/lib/images";
import { formatPrice } from "@/lib/utils";
import { BRAND_NAME, TAGLINE, HASHTAG } from "@/lib/site";

const heroProducts = [
  {
    id: "hp1",
    slug: "eau-de-parfum-30ml",
    name: "First Light",
    concentration: "Eau de parfum",
    size_ml: 30,
    price_cents: 14500,
    bestseller: true,
    image: placeholderImage({ text: "First Light — 30 ml" }),
    imageAlt: "Placeholder: First Light eau de parfum bottle",
  },
  {
    id: "hp2",
    slug: "cedar-amber-30ml",
    name: "Cedar & Amber",
    concentration: "Eau de parfum",
    size_ml: 30,
    price_cents: 14500,
    image: placeholderImage({ text: "Cedar & Amber — 30 ml" }),
    imageAlt: "Placeholder: Cedar & Amber bottle",
  },
];

export function HomeHero() {
  return (
    <section className="relative px-6 md:px-12 py-24 lg:py-36 min-h-[85vh] flex items-center">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-6">
          <div className="flex items-baseline gap-2">
            <span className="text-[11px] uppercase tracking-wider text-terracotta font-medium">
              New
            </span>
          </div>
          <motion.h1
            className="font-display text-[56px] leading-tight text-ink tracking-tight italic"
            data-reveal
          >
            <span className="block">A fragrance</span>
            <span className="block">without alcohol.</span>
          </motion.h1>
          <p className="text-[15px] leading-7 text-ink/60 max-w-lg">
            {TAGLINE}. Composed to be worn close — on skin, on fabric, in
            stillness.
          </p>
          <div className="mt-10 flex gap-4">
            <Button variant="primary" asChild>
              <Link href="/shop">Explore the collection</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/why-us">Our story</Link>
            </Button>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-amber/40 rounded-[32px] blur-3xl" />
          <div className="relative aspect-square rounded-[32px] overflow-hidden border border-ink/10 bg-cream-deep shadow-2xl shadow-ink/10">
            <Image
              src={heroProducts[0].image}
              alt={heroProducts[0].imageAlt}
              fill
              sizes="(max-width: 1280px) 50vw, 600px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="lg:hidden relative aspect-square rounded-[30px] overflow-hidden border border-ink/10 bg-cream-deep mx-auto max-w-xs">
          <Image
            src={heroProducts[0].image}
            alt={heroProducts[0].imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
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
    <section className="relative bg-ink py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMSIgZmlsbD0iIzIbwP9LIiBvcGFjaXR5PSIwLjAyIi8+Cjwvc3ZnPg==')] opacity-40" />
      <div className="relative px-6 md:px-12 max-w-3xl mx-auto">
        {lines.map((line, i) => (
          <div key={i} className="mt-10 first:mt-0">
            <p className="font-display text-[34px] leading-tight text-cream italic tracking-tight" data-blur-line>
              {line}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CollectionRow() {
  return (
    <section className="px-6 md:px-12 py-24 lg:py-32">
      <div className="flex items-baseline justify-between mb-12">
        <div>
          <h2 className="font-display text-[40px] leading-tight text-ink tracking-tight italic mb-2">
            Our collection
          </h2>
          <p className="text-[11px] uppercase tracking-wider text-ink/50 font-medium">
            Alcohol-free fine fragrance
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {heroProducts.map((p) => (
          <ProductCard key={p.id} product={p} isHome />
        ))}
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

const testimonials = [
  {
    author: "Élise R.",
    body: "Placeholder testimonial — the scent stays close without ever overwhelming. Exactly what I was looking for.",
    rating: 5,
  },
  {
    author: "Maya T.",
    body: "Placeholder testimonial — alcohol-free means I can layer it through the day without headache.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="px-6 md:px-12 py-24 lg:py-32">
      <div className="max-w-4xl mx-auto space-y-10">
        {testimonials.map((t) => (
          <div key={t.author} className="relative rounded-[30px] border border-ink/10 bg-cream-deep p-8 md:p-12">
            <p className="text-[17px] leading-8 text-ink/80 italic font-display mb-6">
              “{t.body}”
            </p>
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-ink">{t.author}</span>
              <div className="flex gap-1 text-amber">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const pressCards = [
  { name: "Elle Decoration", role: "Placeholder portrait" },
  { name: "Kinfolk", role: "Placeholder portrait" },
  { name: "Céréal Magazine", role: "Placeholder portrait" },
];

export function PressCards() {
  return (
    <section className="px-6 md:px-12 py-24 lg:py-32 border-y border-ink/10">
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="font-display text-[40px] leading-tight text-ink tracking-tight italic">
          They chose us
        </h2>
        <p className="text-[11px] uppercase tracking-wider text-ink/50 font-medium">
          Press &amp; people
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {pressCards.map((p) => (
          <div key={p.name} className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-ink/20 bg-cream-deep flex items-center justify-center">
              <span className="text-[11px] uppercase tracking-wider text-ink/40 font-medium">
                {p.name.charAt(0)}
              </span>
            </div>
            <p className="text-[13px] font-medium text-ink">{p.name}</p>
            <p className="text-[11px] uppercase tracking-wider text-ink/40 font-medium">
              {p.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SubscribeSave() {
  return (
    <section className="relative px-6 md:px-12 py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-terracotta/10 rounded-[40px] -z-10 blur-2xl" />
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="space-y-6">
          <h2 className="font-display text-[40px] leading-tight text-ink tracking-tight italic">
            Subscribe and save
          </h2>
          <p className="text-[15px] leading-7 text-ink/60">
            Placeholder panel — receive your favorite composition on a rhythm
            that suits you. Skip or cancel anytime.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-sm" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 rounded-full border border-ink/20 bg-transparent px-5 py-3 text-[13px] text-ink placeholder-ink/40 focus:ring-2 focus:ring-terracotta outline-none"
            />
            <Button variant="terracotta">Subscribe</Button>
          </form>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-[32px] overflow-hidden border border-ink/10 bg-cream-deep">
            <Image
              src={placeholderImage({ text: "Floating imagery — swap later" })}
              alt="Placeholder: floating product imagery"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SocialGallery() {
  const posts = Array.from({ length: 8 }, (_, i) => i + 1);
  return (
    <section className="px-6 md:px-12 py-24 lg:py-32">
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="font-display text-[40px] leading-tight text-ink tracking-tight italic">
          {HASHTAG}
        </h2>
        <p className="text-[11px] uppercase tracking-wider text-ink/50 font-medium">
          Social gallery
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {posts.map((i) => (
          <div
            key={i}
            className="aspect-square rounded-[20px] overflow-hidden border border-ink/10 bg-cream-deep group"
          >
            <Image
              src={placeholderImage({ text: `Post ${i}`, width: 400, height: 400 })}
              alt={`Placeholder social post ${i}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
