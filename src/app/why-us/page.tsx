"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { placeholderImage } from "@/lib/images";
import { Marquee } from "@/components/ui/Marquee";
import { Pill } from "@/components/ui/Pill";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Button } from "@/components/ui/Button";

const noteWords = [
  "Amber",
  "Bergamot",
  "Musk",
  "Neroli",
  "Sandalwood",
  "Jasmine",
  "Mimosa",
  "Vetiver",
  "Iris",
  "Cedar",
];

export default function WhyUsPage() {
  return (
    <div className="flex flex-col flex-1 bg-cream">
      <section className="px-6 md:px-12 py-24 lg:py-40 overflow-hidden">
        <div className="relative rounded-[40px] border border-ink/10 bg-ink overflow-hidden">
          <div className="absolute inset-0 bg-amber/20" />
          <div className="relative px-6 md:px-12 py-24 lg:py-32 z-10">
            <div className="flex items-baseline gap-2 mb-10">
                <h1 className="font-display text-[64px] leading-tight text-cream tracking-tight italic">
                  Why OEA
                </h1>
            </div>
            <p className="text-[16px] leading-8 text-cream/80 max-w-xl mb-12 font-display italic">
              Placeholder statement — conviviality without excess. Fragrance
              worn close, never imposed.
            </p>
            <Marquee speed={24}>
              {noteWords.map((w) => (
                <span key={w} className="font-display text-[56px] italic text-cream/20">
                  {w}
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-baseline gap-2 mb-12">
            <h2 className="font-display text-[48px] leading-tight text-ink tracking-tight italic">
              Scent note glossary
            </h2>
            <p className="text-[11px] uppercase tracking-wider text-ink/50 font-medium">
              Ingredients
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            {["All", "Top", "Heart", "Base"].map((t) => (
              <Pill key={t} variant={t === "All" ? "primary" : "secondary"}>
                {t}
              </Pill>
            ))}
          </div>

          <Accordion>
            {[
              {
                value: "bergamot",
                trigger: "Bergamot — Top note",
                children: (
                  <p className="text-[14px] leading-6 text-ink/70">
                    Placeholder description: citrus top note, fresh and
                    sparkling opening.
                  </p>
                ),
              },
              {
                value: "neroli",
                trigger: "Neroli — Top note",
                children: (
                  <p className="text-[14px] leading-6 text-ink/70">
                    Placeholder description: bitter orange blossom, green and
                    luminous.
                  </p>
                ),
              },
              {
                value: "jasmine",
                trigger: "Jasmine — Heart note",
                children: (
                  <p className="text-[14px] leading-6 text-ink/70">
                    Placeholder description: white floral heart, indolic and
                    warm.
                  </p>
                ),
              },
              {
                value: "sandalwood",
                trigger: "Sandalwood — Base note",
                children: (
                  <p className="text-[14px] leading-6 text-ink/70">
                    Placeholder description: creamy woody base with lasting
                    power.
                  </p>
                ),
              },
            ].map((item) => (
              <AccordionItem key={item.value} {...item} />
            ))}
          </Accordion>
        </div>
      </section>

      <section className="border-y border-ink/10 py-24">
        <div className="px-6 md:px-12 max-w-3xl mx-auto">
          <p className="font-display text-[40px] leading-tight text-ink italic tracking-tight mb-8 text-center">
            “Placeholder statement — conviviality without excess.”
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 lg:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/3">
              <div className="aspect-square rounded-[30px] overflow-hidden border border-ink/10 bg-cream-deep">
                <Image
                  src={placeholderImage({ text: "Bottle — placeholder", width: 600, height: 600 })}
                  alt="Placeholder: bottle"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-6 text-[11px] uppercase tracking-wider text-ink/50 font-medium">
                Bottle
              </p>
            </div>
            <div className="lg:w-1/3">
              <div className="aspect-square rounded-[30px] overflow-hidden border border-ink/10 bg-cream-deep">
                <Image
                  src={placeholderImage({ text: "Box — placeholder", width: 600, height: 600 })}
                  alt="Placeholder: box"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-6 text-[11px] uppercase tracking-wider text-ink/50 font-medium">
                Box
              </p>
            </div>
            <div className="lg:w-1/3">
              <div className="aspect-square rounded-[30px] overflow-hidden border border-ink/10 bg-cream-deep">
                <Image
                  src={placeholderImage({ text: "Label — placeholder", width: 600, height: 600 })}
                  alt="Placeholder: label"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-6 text-[11px] uppercase tracking-wider text-ink/50 font-medium">
                Label
              </p>
            </div>
          </div>
          <p className="mt-12 text-[14px] leading-7 text-ink/60 max-w-xl">
            Placeholder eco/packaging copy — recyclable materials, minimal
            secondary packaging, alcohol-free concentrate.
          </p>
        </div>
      </section>
    </div>
  );
}
