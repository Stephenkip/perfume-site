"use client";

import * as React from "react";
import { useCartStore } from "@/lib/store/cart";

type CartUIState = {
  open: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const CartUIContext = React.createContext<CartUIState | null>(null);

export function CartUIProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <CartUIContext.Provider value={{ open, openCart: () => setOpen(true), closeCart: () => setOpen(false), toggleCart: () => setOpen((o) => !o) }}>
      {children}
    </CartUIContext.Provider>
  );
}

export function useCartUI() {
  const ctx = React.useContext(CartUIContext);
  if (!ctx) throw new Error("useCartUI must be used within CartUIProvider");
  return ctx;
}

export function useCart() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const clear = useCartStore((state) => state.clear);
  const itemCount = useCartStore((state) => state.itemCount());
  const subtotal = useCartStore((state) => state.subtotal());
  const hasItem = useCartStore((state) => state.hasItem);

  return {
    items,
    addItem,
    removeItem,
    setQuantity,
    clear,
    itemCount,
    subtotal,
    hasItem,
  };
}
