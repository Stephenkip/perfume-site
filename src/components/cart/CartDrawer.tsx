"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store/cart";
import { useCart, useCartUI } from "@/components/cart/CartContext";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { placeholderImage } from "@/lib/images";
import { X, ChevronUp, ChevronDown } from "lucide-react";

export function CartBackdrop({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.45 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
      onClick={onClose}
    />
  );
}

export function CartPanel({ onClose }: { onClose: () => void }) {
  const { items, removeItem, setQuantity, subtotal, itemCount } = useCart();

  const freeShippingThreshold = 10000;
  const missing = Math.max(0, freeShippingThreshold - subtotal);
  const progress = Math.min(subtotal / freeShippingThreshold, 1);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
      className="fixed top-0 right-0 h-full z-50 bg-cream shadow-2xl shadow-ink/20 overflow-y-auto outline-none"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex flex-col h-full">
        <div className="px-8 py-6 border-b border-ink/10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-[32px] leading-tight text-ink tracking-tight">
              Your cart
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 text-ink/60 hover:text-ink transition-colors focus-visible:ring-2 focus-visible:ring-terracotta outline-none"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-1 text-[12px] leading-5 text-ink/60 uppercase tracking-wider">
            {itemCount} item{itemCount !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-8">
          <div className="space-y-5 py-4">
            {items.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-[14px] leading-6 text-ink/60 italic font-display">
                  Your cart is empty.
                </p>
                <p className="mt-3 text-[12px] uppercase tracking-wider text-ink/40 font-medium">
                  Browse the collection
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.productId} className="flex gap-5">
                  <div className="relative shrink-0 aspect-square rounded-[20px] overflow-hidden border border-ink/10 bg-cream-deep">
                    <img
                      src={item.image || placeholderImage({ text: item.name })}
                      alt={item.name}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-between min-w-0">
                    <div>
                      <a
                        href={`/shop/${item.slug}`}
                        className="font-display text-[16px] leading-tight text-ink hover:text-terracotta transition-colors"
                      >
                        {item.name}
                      </a>
                      <p className="mt-1 text-[12px] text-ink/50">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() =>
                          setQuantity(item.productId, item.quantity - 1, item.variantId)
                        }
                        className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:bg-ink hover:text-cream transition-colors focus-visible:ring-2 focus-visible:ring-terracotta outline-none"
                        aria-label="Decrease quantity"
                      >
                        <ChevronDown className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-[13px] font-medium text-ink">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantity(item.productId, item.quantity + 1, item.variantId)
                        }
                        className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:bg-ink hover:text-cream transition-colors focus-visible:ring-2 focus-visible:ring-terracotta outline-none"
                        aria-label="Increase quantity"
                      >
                        <ChevronUp className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="text-[11px] uppercase tracking-wider text-ink/40 hover:text-terracotta transition-colors focus-visible:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="border-t border-ink/10 px-8 py-6">
          <div className="mb-4">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[12px] uppercase tracking-wider text-ink/50 font-medium">
                Subtotal
              </span>
              <span className="text-[16px] font-medium text-ink">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="w-full bg-ink/5 rounded-full h-2 overflow-hidden mb-2">
              <div
                className="h-full bg-terracotta transition-all duration-700 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <p className="text-[11px] uppercase tracking-wider text-ink/50 font-medium text-center">
              {progress >= 1
                ? "Free shipping unlocked"
                : `Spend ${formatPrice(missing)} more for free shipping`}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-wider text-ink/50 font-medium mb-2">
              Complete your set
            </p>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {[
                { name: "Discovery set", price: 6500 },
                { name: "Travel spray", price: 3200 },
              ].map((u) => (
                <div key={u.name} className="shrink-0 flex flex-col gap-2">
                  <div className="w-16 h-16 rounded-[16px] border border-ink/10 bg-cream-deep" />
                  <p className="text-[12px] font-medium text-ink">{u.name}</p>
                  <p className="text-[11px] text-ink/50">{formatPrice(u.price)}</p>
                </div>
              ))}
            </div>
          </div>

          <Button variant="primary" className="w-full" disabled={items.length === 0} onClick={() => {}}>
            Checkout ({formatPrice(subtotal)})
          </Button>
          {items.length === 0 && (
            <p className="mt-3 text-center text-[11px] uppercase tracking-wider text-ink/40 font-medium">
              Browse the collection
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function CartButton() {
  const { openCart } = useCartUI();
  const count = useCartStore.getState().itemCount();

  return (
    <button
      onClick={openCart}
      className="relative p-1.5 text-ink/60 hover:text-ink transition-colors focus-visible:ring-2 focus-visible:ring-terracotta rounded-full outline-none shrink-0"
      aria-label={`Cart (${count} items)`}
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M3 6h18M17 6v8a2 2 0 01-2 2H7a2 2 0 01-2-2V6M17 6l1 3M7 6l-1 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {count > 0 && (
        <span className="absolute top-1 right-1 z-10 h-4 w-4 rounded-full bg-terracotta text-[10px] font-bold text-cream flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}
