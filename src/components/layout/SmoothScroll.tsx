"use client";

import * as React from "react";
import Lenis from "lenis";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useGSAP(() => {
    if (prefersReduced) return undefined;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      orientation: "vertical",
      touchMultiplier: 2,
    });

    lenis.on("scroll", () => ScrollTrigger.update());

    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time: number) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  useGSAP(
    () => {
      if (prefersReduced) return undefined;
      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    [],
  );

  return <>{children}</>;
}
