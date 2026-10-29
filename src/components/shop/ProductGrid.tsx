"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/shop/ProductCard";

interface ProductGridProps {
  products: Array<{
    id: string;
    slug: string;
    name: string;
    concentration?: string | null;
    size_ml?: number | null;
    price_cents?: number | null;
    bestseller?: boolean | null;
    preorder?: boolean | null;
    categoryIds: string[];
    image?: string;
    imageAlt?: string;
    isDemo?: boolean;
  }>;
  filters: Array<{ value: string; label: string }>;
}

export function ProductGrid({
  products,
  filters,
}: ProductGridProps) {
  const [activeFilter, setActiveFilter] = React.useState("all");
  const filtered =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.categoryIds.includes(activeFilter));

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <motion.button
            key={filter.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setActiveFilter(filter.value);
            }}
            className={cnPill(
              activeFilter === filter.value
                ? "bg-ink text-cream"
                : "border border-ink/20 text-ink hover:bg-ink/5",
            )}
            layoutId={`pill-${filter.value}`}
            layout
          >
            {filter.label}
          </motion.button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isHome={false}
            isDemo={product.isDemo}
          />
        ))}
      </div>
    </div>
  );
}

function cnPill(base: string) {
  return `inline-flex items-center justify-center rounded-full border px-5 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-300 ${base}`;
}
