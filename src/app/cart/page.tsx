"use client";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { CartPanel } from "@/components/cart/CartDrawer";
import { useCartUI } from "@/components/cart/CartContext";

export default function CartPage() {
  const { open, closeCart } = useCartUI();

  return (
    <div className="flex flex-col flex-1">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 pt-20 px-6 md:px-12 min-h-[calc(100vh-200px)]">
        <h1 className="font-display text-[56px] leading-tight text-ink italic mb-6">
          Your cart
        </h1>
        <CartPanel onClose={closeCart} />
        {open && null}
      </main>
    </div>
  );
}
