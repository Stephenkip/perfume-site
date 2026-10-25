"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, User, Search } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { useCartUI } from "@/components/cart/CartContext";

const navLinks = [
  { href: "/", label: "Shop" },
  { href: "/our-story", label: "Our Story" },
  { href: "/why-us", label: "Why OEA" },
  { href: "/journal", label: "Journal" },
];

const rightLinks = [
  { href: "/find-us", label: "Find Us" },
  { href: "/subscription", label: "Subscribe" },
];

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { openCart } = useCartUI();

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const count = useCartStore.getState().itemCount();

  const toggleMenu = () => {
    setOpen((o) => !o);
    document.body.style.overflow = open ? "auto" : "hidden";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 pointer-events-none transition-all duration-500 ease-out ${
        scrolled
          ? "bg-cream/80 backdrop-blur-md border-b border-ink/5"
          : "bg-transparent"
      }`}
    >
      <div className="pointer-events-auto flex items-center justify-between px-6 py-5">
        <nav className="flex items-center gap-8 shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] font-medium uppercase tracking-wider text-ink/70 hover:text-terracotta transition-colors focus-visible:ring-2 focus-visible:ring-terracotta rounded-full px-2 py-1 outline-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="mx-auto shrink-0"
          aria-label="OEA Perfumery home"
        >
          <svg
            width="150"
            height="34"
            viewBox="0 0 150 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="75"
              y="24"
              textAnchor="middle"
              fontFamily="Fraunces, serif"
              fontSize="20"
              fontStyle="italic"
              fill="var(--ink)"
              letterSpacing="0.02em"
            >
              OEA Perfumery
            </text>
            <text
              x="75"
              y="30"
              textAnchor="middle"
              fontFamily="DM Sans, sans-serif"
              fontSize="7"
              fill="var(--ink)"
              letterSpacing="0.4em"
            >
              alcohol-free fine fragrance
            </text>
          </svg>
        </Link>

        <nav className="flex items-center gap-4 shrink-0">
          <Link href="/find-us" className="text-[10px] font-medium uppercase tracking-wider text-ink/70 hover:text-terracotta transition-colors">
            Find Us
          </Link>
          <Link href="/subscription" className="text-[10px] font-medium uppercase tracking-wider text-ink/70 hover:text-terracotta transition-colors">
            Subscribe
          </Link>
          <button
            className="p-1.5 text-ink/60 hover:text-ink transition-colors focus-visible:ring-2 focus-visible:ring-terracotta rounded-full outline-none shrink-0"
            aria-label="Account"
          >
            <User className="h-4 w-4" />
          </button>
          <button
            onClick={openCart}
            className="relative p-1.5 text-ink/60 hover:text-ink transition-colors focus-visible:ring-2 focus-visible:ring-terracotta rounded-full outline-none shrink-0"
            aria-label={`Cart (${count} items)`}
          >
            <ShoppingCart className="h-4 w-4" />
            {count > 0 && (
              <span
                className="absolute top-1 right-1 z-10 h-4 w-4 rounded-full bg-terracotta text-[10px] font-bold text-cream flex items-center justify-center"
                aria-hidden="true"
              >
                {count}
              </span>
            )}
          </button>
          <button
            onClick={toggleMenu}
            className="md:hidden p-1.5 text-ink/60 hover:text-ink transition-colors focus-visible:ring-2 focus-visible:ring-terracotta rounded-full outline-none shrink-0"
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-45 bg-cream flex flex-col md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="px-6 py-4 border-b border-ink/10 flex items-center justify-between">
            <span className="font-display text-[20px] italic text-ink">OEA</span>
            <button
              onClick={toggleMenu}
              className="p-1 text-ink/60 hover:text-ink"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 px-6 py-8 space-y-6 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={toggleMenu}
                className="block text-[16px] font-display italic text-ink hover:text-terracotta transition-colors border-b border-ink/5 pb-3"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-ink/10 pt-6 space-y-4">
              {rightLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={toggleMenu}
                  className="block text-[14px] uppercase tracking-wider font-medium text-ink/70 hover:text-terracotta transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/account/login"
                onClick={toggleMenu}
                className="block text-[14px] uppercase tracking-wider font-medium text-ink/70 hover:text-terracotta transition-colors"
              >
                Account
              </a>
              <button
                onClick={toggleMenu}
                className="flex items-center gap-2 text-[14px] uppercase tracking-wider font-medium text-ink/70 hover:text-terracotta transition-colors"
              >
                <ShoppingCart className="h-4 w-4" /> Cart <span className="ml-auto">{count}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
