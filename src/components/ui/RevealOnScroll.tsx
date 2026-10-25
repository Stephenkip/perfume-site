"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function RevealOnScroll({
  children,
  className,
  once = true,
  threshold = 0.15,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  threshold?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !visible.current)) {
          visible.current = true;
          el.classList.add("reveal-active");
          if (once) observer.unobserve(el);
        } else if (!once && !entry.isIntersecting) {
          el.classList.remove("reveal-active");
          visible.current = false;
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once, delay]);

  return (
    <div
      ref={ref}
      className={cn(
        "reveal-wrapper transition-all duration-700 ease-out",
        className,
        once ? "reveal-once" : "",
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
