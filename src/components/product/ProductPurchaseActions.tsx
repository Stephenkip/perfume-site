"use client";

import * as React from "react";
import { useCartStore } from "@/lib/store/cart";
import { useCartUI } from "@/components/cart/CartContext";
import { Button } from "@/components/ui/Button";

interface ProductPurchaseActionsProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    image: string;
    variantId?: string;
  };
  isDemo: boolean;
}

export function ProductPurchaseActions({
  product,
  isDemo,
}: ProductPurchaseActionsProps) {
  const [quantity, setQuantity] = React.useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const { openCart } = useCartUI();

  const addToCart = () => {
    addItem({
      productId: product.id,
      variantId: product.variantId,
      name: product.name,
      slug: product.slug,
      image: product.image,
      price: product.price,
      quantity,
    });
    openCart();
  };

  return (
    <div className="flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setQuantity((current) => Math.max(1, current - 1))}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span
          className="w-8 text-center text-[13px] font-medium text-ink"
          aria-live="polite"
        >
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => setQuantity((current) => current + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      {isDemo ? (
        <p className="flex-1 text-right text-[11px] uppercase tracking-wider text-ink/50">
          Demo item — checkout is disabled
        </p>
      ) : (
        <Button
          onClick={addToCart}
          variant="primary"
          className="flex-1"
          aria-label={`Add ${quantity} ${product.name} to cart`}
        >
          Add to cart
        </Button>
      )}
    </div>
  );
}
