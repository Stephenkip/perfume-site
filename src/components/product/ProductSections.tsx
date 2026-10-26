"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { placeholderImage } from "@/lib/images";

interface GalleryProps {
  mainImage: string;
  thumbnails: Array<{ url: string; alt: string }>;
  alt: string;
  priority?: boolean;
}

export function ProductGallery({ mainImage, thumbnails, alt, priority }: GalleryProps) {
  const [selected, setSelected] = React.useState(0);

  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      <div className="relative aspect-square rounded-[28px] overflow-hidden bg-cream-deep">
        <Image
          src={mainImage}
          alt={alt}
          fill
          sizes="(max-width: 768px) 90vw, 45vw"
          className="object-cover scale-100 transition-transform duration-700 ease-out"
          priority={priority}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex flex-col gap-3">
        {thumbnails.map((thumb, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            aria-label={`Thumbnail ${i + 1}`}
            className={`relative aspect-[4/5] rounded-[20px] overflow-hidden border border-ink/10 bg-cream-deep ${
              i === selected ? "border-ink" : "border-transparent hover:border-ink/30"
            } transition-colors`}
          >
            <Image
              src={thumb.url}
              alt={thumb.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />
          </button>
        ))}
      </div>
    </div>
  );
}

interface ScentProfileNote {
  id: string;
  name: string;
  type: "top" | "heart" | "base";
  image?: string;
}

interface ScentProfileProps {
  notes: ScentProfileNote[];
  pairingLine: string;
}

export const NOTE_TYPES = ["top", "heart", "base"] as const;

export function ScentProfile({ notes, pairingLine }: ScentProfileProps) {
  const byType = (t: (typeof NOTE_TYPES)[number]) =>
    notes.filter((n) => n.type === t);

  return (
    <section className="mt-16">
      <div className="flex items-baseline gap-2 mb-10">
        <h2 className="font-display text-[40px] leading-tight text-ink tracking-tight italic">
          Scent profile
        </h2>
        <span className="text-[11px] uppercase tracking-wider text-ink/50 font-medium">
          Notes
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {NOTE_TYPES.map((type) => (
          <div key={type} className="rounded-[24px] border border-ink/10 bg-cream-deep p-6">
            <p className="text-[10px] uppercase tracking-wider text-ink/50 font-medium mb-4">
              {type === "top" ? "Top" : type === "heart" ? "Heart" : "Base"}
            </p>
            <div className="flex flex-wrap gap-3">
              {byType(type).map((note) => (
                <div key={note.id} className="relative aspect-square rounded-[16px] overflow-hidden border border-ink/20 bg-cream">
                  <Image
                    src={note.image || placeholderImage({ text: note.name, width: 300, height: 300 })}
                    alt={note.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              {byType(type).length === 0 && (
                <span className="text-[12px] text-ink/40 italic">—</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-[14px] leading-7 text-ink/70 italic font-display max-w-2xl">
        {pairingLine}
      </p>
    </section>
  );
}

interface NotesItem {
  name: string;
  description: string;
  icon: string;
}

interface NotesAccordionProps {
  items: NotesItem[];
}

export function NotesAccordion({ items }: NotesAccordionProps) {
  return (
    <section className="mt-16 border-y border-ink/10 py-10">
      <div className="flex items-baseline gap-2 mb-10">
        <h2 className="font-display text-[40px] leading-tight text-ink tracking-tight italic">
          Ingredient glossary
        </h2>
        <span className="text-[11px] uppercase tracking-wider text-ink/50 font-medium">
          Notes
        </span>
      </div>
      <div className="space-y-1">
        {items.map((item) => (
          <div key={item.name} className="border-b border-ink/5">
            <button
              className="flex w-full items-center justify-between px-0 py-5 text-left text-ink font-display text-[20px] italic leading-tight hover:text-terracotta transition-colors focus-visible:ring-2 focus-visible:ring-terracotta outline-none"
              aria-expanded={false}
            >
              {item.name}
              <span className="shrink-0 h-3 w-3">
                <svg className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0" />
                </svg>
              </span>
            </button>
            <div className="px-0 pb-5 text-[13px] leading-6 text-ink/60">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

interface Review {
  author: string;
  rating: number;
  title: string;
  body: string;
}

interface ReviewsProps {
  productId: string;
  reviews: Review[];
  averageRating: number;
  count: number;
}

export function ProductReviews({ productId, reviews, averageRating, count }: ReviewsProps) {
  const [all, setAll] = React.useState(false);

  const stars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => i < Math.round(rating));

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-baseline gap-2">
          <h2 className="font-display text-[40px] leading-tight text-ink tracking-tight italic">
            Reviews
          </h2>
          <span className="text-[11px] uppercase tracking-wider text-ink/50 font-medium">
            {count}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[14px] font-medium text-ink">
          {stars(averageRating)}
          <span className="ml-1 text-ink/60">{averageRating.toFixed(1)}</span>
        </div>
      </div>

      <div className="space-y-6">
        {(all ? reviews : reviews.slice(0, 3)).map((review) => (
          <div key={review.title} className="border-b border-ink/10 pb-6 last:border-0 last:pb-0">
            <div className="flex items-center gap-2 mb-2">
              {stars(review.rating)}
              <span className="text-[11px] uppercase tracking-wider text-ink/50 font-medium">
                {review.author}
              </span>
            </div>
            <p className="text-[13px] leading-6 text-ink/70 italic font-display">
              “{review.body}”
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-wider text-ink/40 font-medium">
              {review.title}
            </p>
          </div>
        ))}
      </div>

      {count > 3 && (
        <button
          onClick={() => setAll(!all)}
          className="mt-6 text-[11px] font-medium uppercase tracking-wider text-terracotta hover:text-ink transition-colors focus-visible:underline"
        >
          {all ? "Show fewer" : "All reviews"}
        </button>
      )}
    </section>
  );
}

interface RelatedProps {
  products: Array<{
    id: string;
    slug: string;
    name: string;
    price_cents?: number | null;
    image?: string;
  }>;
}

export function RelatedCarousel({ products }: RelatedProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="flex items-baseline gap-2 mb-8">
        <h2 className="font-display text-[40px] leading-tight text-ink tracking-tight italic">
          You may also like
        </h2>
      </div>
      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="shrink-0 w-[220px] md:w-[260px]"
          >
            <div className="relative aspect-square rounded-[24px] overflow-hidden border border-ink/10 bg-cream-deep mb-4">
              <Image
                src={product.image || placeholderImage({ text: product.name })}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-[15px] font-display italic text-ink leading-tight">{product.name}</p>
            <p className="mt-1 text-[13px] font-medium text-ink">{formatPrice(product.price_cents ?? 0)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

interface StickyMobileBarProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price_cents?: number | null;
    image?: string;
    variantId?: string;
  };
}

export function StickyMobileBar({ product }: StickyMobileBarProps) {
  const addItem = useCartStore((state) => state.addItem);
  const has = useCartStore((state) => state.hasItem);
  const itemAdded = has(product.id, product.variantId);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-cream border-t border-ink/10 px-6 pb-8 pt-4 transition-transform duration-300 ${
        itemAdded ? "translate-y-0" : "translate-y-0"
      }`}
    >
      <div className="flex items-center gap-4 px-4 py-3 rounded-full border border-ink/10 bg-ink text-cream shadow-lg shadow-ink/20 max-w-[560px] mx-auto">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-cream/80 font-medium">Add to cart</p>
          <p className="font-display text-[15px] leading-tight text-cream">{product.name}</p>
          <p className="text-[12px] font-medium text-cream">{formatPrice(product.price_cents ?? 0)}</p>
        </div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            addItem({
              productId: product.id,
              variantId: product.variantId,
              name: product.name,
              slug: product.slug,
              image: product.image,
              price: product.price_cents ?? 0,
              quantity: 1,
            });
          }}
          variant="cream"
          className="shrink-0"
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}
