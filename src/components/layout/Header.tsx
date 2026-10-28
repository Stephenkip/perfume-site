"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { useCartUI } from "@/components/cart/CartContext";

const navLinks = [
  { href: "/shop", label: "Shop" },
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
      className={`fixed left-4 right-4 sm:left-8 sm:right-8 lg:left-10 lg:right-10 z-40 pointer-events-none transition-all duration-500 ease-out ${
        scrolled
          ? "top-3"
          : "top-12"
      }`}
    >
      <div
        className={`pointer-events-auto relative flex items-center justify-between rounded-full border px-5 py-3 transition-[background-color,border-color,box-shadow] duration-300 sm:px-6 sm:py-3.5 ${
          scrolled
            ? "border-ink/10 bg-cream shadow-[0_8px_30px_rgba(43,15,18,0.12)]"
            : "border-transparent bg-transparent shadow-none"
        }`}
      >
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8 shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] font-medium uppercase tracking-wider text-ink/70 hover:text-terracotta transition-colors focus-visible:ring-2 focus-visible:ring-terracotta rounded-full px-2 py-1 outline-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 shrink-0"
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
              fill="var(--color-ink)"
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
              fill="var(--color-ink)"
              letterSpacing="0.4em"
            >
              alcohol-free fine fragrance
            </text>
          </svg>
        </Link>

        <nav className="ml-auto flex items-center gap-3 lg:gap-4 shrink-0">
          <Link href="/find-us" className="hidden lg:block text-[11px] font-medium uppercase tracking-wider text-ink/70 hover:text-terracotta transition-colors">
            Find Us
          </Link>
          <Link href="/subscription" className="hidden lg:block text-[11px] font-medium uppercase tracking-wider text-ink/70 hover:text-terracotta transition-colors">
            Subscribe
          </Link>
          <Link
            href="/account/login"
            className="hidden lg:block p-1.5 text-ink/60 hover:text-ink transition-colors focus-visible:ring-2 focus-visible:ring-terracotta rounded-full outline-none shrink-0"
            aria-label="Account"
          >
            <User className="h-4 w-4" />
          </Link>
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
            className="lg:hidden p-1.5 text-ink/60 hover:text-ink transition-colors focus-visible:ring-2 focus-visible:ring-terracotta rounded-full outline-none shrink-0"
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {open && (
        <div
          className={`pointer-events-auto fixed inset-x-0 bottom-0 z-45 bg-cream flex flex-col lg:hidden ${
            scrolled ? "top-0" : "top-12"
          }`}
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
                onClick={() => {
                  setOpen(false);
                  document.body.style.overflow = "auto";
                  openCart();
                }}
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
