"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { placeholderImage } from "@/lib/images";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function OurStoryPage() {
  useGSAP(
    () => {
      gsap.from(".story-parallax", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".story-parallax",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    [],
  );

  return (
    <div className="flex flex-col flex-1 bg-cream">
      <section className="px-6 md:px-12 py-24 lg:py-40">
        <RevealOnScroll once className="mb-12">
          <div className="flex items-baseline gap-2 mb-8">
            <h1 className="font-display text-[64px] leading-tight text-ink tracking-tight italic">
              Our story
            </h1>
          </div>
          <p className="text-[16px] leading-8 text-ink/60 max-w-2xl">
            Placeholder editorial copy. OEA was founded on the belief that
            fragrance should be worn close — without alcohol, without excess,
            without compromise.
          </p>
        </RevealOnScroll>
      </section>

      <section className="relative py-24 border-y border-ink/10">
        <div className="px-6 md:px-12 max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="relative aspect-square rounded-[32px] overflow-hidden border border-ink/10 bg-cream-deep story-parallax">
                <Image
                  src={placeholderImage({ text: "Offset image pair — placeholder", width: 900, height: 900 })}
                  alt="Placeholder: editorial image pair"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <RevealOnScroll once className="mb-8">
                <h2 className="font-display text-[48px] leading-tight text-ink tracking-tight italic mb-6">
                  Composed for closeness
                </h2>
              </RevealOnScroll>
              <p className="text-[15px] leading-7 text-ink/60 mb-6">
                Placeholder body copy. Each composition is developed without
                alcohol, so the scent lives on the skin rather than in the air.
              </p>
              <p className="text-[15px] leading-7 text-ink/60 mb-8">
                Placeholder body copy continued. The ritual is slow, personal,
                and intentional — made to be worn close.
              </p>
              <Button variant="primary" asChild>
                <Link href="/journal">Read the journal</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="px-6 md:px-12 max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <RevealOnScroll once className="mb-8">
                <h2 className="font-display text-[48px] leading-tight text-ink tracking-tight italic mb-6">
                  Made to last
                </h2>
              </RevealOnScroll>
              <p className="text-[15px] leading-7 text-ink/60 mb-6">
                Placeholder body copy about packaging, ingredients, and the
                alcohol-free distinction.
              </p>
            </div>
            <div className="relative aspect-square rounded-[32px] overflow-hidden border border-ink/10 bg-cream-deep story-parallax">
              <Image
                src={placeholderImage({ text: "Second offset image — placeholder", width: 900, height: 900 })}
                alt="Placeholder: second editorial image"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-y border-ink/10">
        <div className="px-6 md:px-12 max-w-3xl mx-auto text-center">
          <p className="font-display text-[40px] leading-tight text-ink italic tracking-tight mb-6">
            “Placeholder serif statement — large, editorial, intimate.”
          </p>
          <p className="text-[15px] leading-7 text-ink/60">
            Placeholder closing copy for the story page.
          </p>
        </div>
      </section>
    </div>
  );
}
