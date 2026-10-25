"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HomeScrollEffects() {
  useGSAP(
    () => {
      gsap.from("[data-reveal]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: "[data-reveal]",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from("[data-blur-line]", {
        filter: "blur(16px)",
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.4,
        scrollTrigger: {
          trigger: "[data-blur-line]",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    [],
  );
  return null;
}
