"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { placeholderImage } from "@/lib/images";
import { formatPrice } from "@/lib/utils";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/lib/store/cart";

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    name: string;
    concentration?: string | null;
    size_ml?: number | null;
    price_cents?: number | null;
    bestseller?: boolean | null;
    preorder?: boolean | null;
    image?: string;
    imageAlt?: string;
    isDemo?: boolean;
  };
  variantId?: string;
  isHome?: boolean;
  isDemo?: boolean;
}

export function ProductCard({
  product,
  variantId,
  isHome,
  isDemo = product.isDemo,
}: ProductCardProps) {
  const [hovered, setHovered] = React.useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const price = product.price_cents ?? 0;
  const image = product.image || placeholderImage({ text: product.name });

  const handleAdd = () => {
    addItem({
      productId: product.id,
      variantId,
      name: product.name,
      slug: product.slug,
      image,
      price,
      quantity: 1,
    });
  };

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-pointer"
    >
      <CardWrapper>
        <div className="relative overflow-hidden rounded-[28px] bg-cream-deep aspect-[1/1]">
          <Link
            href={`/shop/${product.slug}`}
            aria-label={`View ${product.name}`}
            className="absolute inset-0"
          >
            <Image
              src={image}
              alt={product.imageAlt || `Placeholder for ${product.name}`}
              fill
              sizes="(max-width: 768px) 45vw, (max-width: 1280px) 30vw, 22vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              priority={isHome}
              unoptimized
            />
          </Link>
          {isDemo && (
            <Pill variant="terracotta" className="absolute top-4 right-4 z-10 text-[10px]">
              Demo
            </Pill>
          )}
          {product.bestseller && !isDemo && (
            <Pill variant="terracotta" className="absolute top-4 left-4 text-[10px]">
              Bestseller
            </Pill>
          )}
          {product.preorder && (
            <Pill variant="ghost" className="absolute top-4 left-4 text-[10px]">
              Pre-order
            </Pill>
          )}
        </div>

        <div className="flex flex-col gap-1 px-5 pb-5 pt-4">
          <Link
            href={`/shop/${product.slug}`}
            className="font-display text-[17px] leading-tight text-ink hover:text-terracotta transition-colors"
          >
            {product.name}
          </Link>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-ink/50 font-medium">
            {product.concentration && <span>{product.concentration}</span>}
            {product.size_ml && <span>· {product.size_ml} ml</span>}
          </div>
          <div className="mt-2 text-[14px] font-medium text-ink">
            {formatPrice(price)}
          </div>
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute inset-0 z-20 flex items-end bg-cream/95 backdrop-blur rounded-[28px] p-5"
            >
              {isDemo ? (
                <Button asChild variant="primary" className="w-full">
                  <Link href={`/shop/${product.slug}`}>
                    View demo product
                  </Link>
                </Button>
              ) : (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAdd();
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Add to cart <Plus className="h-3 w-3 ml-1" />
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardWrapper>
    </article>
  );
}

function CardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative overflow-hidden rounded-[30px] border border-ink/10 bg-cream-deep shadow-sm shadow-ink/5 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-ink/10"
    >
      {children}
    </div>
  );
}
