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
  return useCartStore((state) => ({
    items: state.items,
    addItem: state.addItem,
    removeItem: state.removeItem,
    setQuantity: state.setQuantity,
    clear: state.clear,
    itemCount: state.itemCount(),
    subtotal: state.subtotal(),
    hasItem: state.hasItem,
  }));
}
