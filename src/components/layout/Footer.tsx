"use client";

import * as React from "react";
import Link from "next/link";
import { TAGLINE, HASHTAG } from "@/lib/site";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Button } from "@/components/ui/Button";

const storyLinks = [
  { label: "Our Story", href: "/our-story" },
  { label: "Why OEA", href: "/why-us" },
  { label: "Journal", href: "/journal" },
];

const supportLinks = [
  { label: "Log in", href: "/account/login" },
  { label: "Your orders", href: "/account/orders" },
  { label: "Addresses", href: "/account/addresses" },
  { label: "Subscription", href: "/account/subscription" },
  { label: "FAQ", href: "/faq" },
  { label: "Store locator", href: "/find-us" },
];

export function Footer() {
  return (
    <footer className="bg-terracotta text-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-30" />
      <div className="relative px-6 py-12 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4 lg:col-span-3">
            <RevealOnScroll once className="delay-0">
              <div className="flex items-center gap-3 mb-6">
                <Link
                  href="/"
                  aria-label="OEA Perfumery home"
                  className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <svg width="120" height="27" viewBox="0 0 120 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="60" y="19" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="16" fontStyle="italic" fill="#F4EFE4" letterSpacing="0.02em">
                      OEA Perfumery
                    </text>
                  </svg>
                </Link>
                <p className="text-[10px] uppercase tracking-wider opacity-60">{TAGLINE}</p>
              </div>
              <p className="text-[13px] leading-7 opacity-80 mb-8 max-w-xs">
                Alcohol-free fine fragrance built for closeness without excess. Thoughtfully composed, responsibly packed.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-[11px] uppercase tracking-wider opacity-70">Language</span>
                <span
                  aria-label="Current language: English"
                  className="inline-flex h-8 min-w-[88px] items-center justify-center rounded-full border border-white/30 bg-white/5 px-3 text-[11px] text-white uppercase tracking-wider"
                >
                  EN
                </span>
              </div>
            </RevealOnScroll>
          </div>

          <div className="md:col-span-4 lg:col-span-3 border-l border-white/10 md:border-l-0 md:pt-0 pt-8 md:pt-0">
            <RevealOnScroll once delay={100} className="delay-100">
              <h3 className="text-[11px] uppercase tracking-wider text-white mb-6 font-medium">Journal &amp; story</h3>
              <ul className="space-y-3">
                {storyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[13px] leading-7 opacity-80 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>

          <div className="md:col-span-4 lg:col-span-3 border-l border-white/10 md:border-l-0 md:pt-0 pt-8 md:pt-0">
            <RevealOnScroll once delay={200} className="delay-200">
              <h3 className="text-[11px] uppercase tracking-wider text-white mb-6 font-medium">Account &amp; support</h3>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[13px] leading-7 opacity-80 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>

          <div className="md:col-span-12 lg:col-span-3 border-t border-white/10 md:border-t-0 md:border-l border-white/10 md:pl-12 pt-8 md:pt-0">
            <RevealOnScroll once delay={300} className="delay-300">
              <h3 className="text-[11px] uppercase tracking-wider text-white mb-6 font-medium">Join the ritual</h3>
              <p className="max-w-xs text-[13px] leading-6 text-cream/75">
                Discover a more personal way to wear fine fragrance.
              </p>
              <Button variant="cream" asChild className="mt-5">
                <Link href="/subscription">Explore subscriptions</Link>
              </Button>
              <p className="mt-4 text-[11px] uppercase tracking-wider opacity-60">
                {" "}{HASHTAG}
              </p>
            </RevealOnScroll>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex items-center justify-between md:justify-end gap-4">
            <p className="text-[10px] uppercase tracking-wider opacity-50">
              OEA Perfumery &middot; Made in France &middot; Cruelty-free
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 lg:mt-20">
        <div className="relative w-full overflow-hidden">
          <svg
            width="320"
            height="60"
            viewBox="0 0 320 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-[60px] md:h-[90px] lg:h-[120px] xl:h-[150px] 2xl:h-[200px] shrink-0"
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontFamily="Fraunces, serif"
              fontSize="24"
              fontStyle="italic"
              fill="#F4EFE4"
              letterSpacing="0.02em"
            >
              OEA Perfumery
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}
