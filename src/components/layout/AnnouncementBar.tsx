"use client";

import * as React from "react";

export function AnnouncementBar() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-announcement-bar
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-3 text-center text-[10px] uppercase tracking-wider font-medium bg-terracotta text-cream transition-all duration-400 ease-out will-change-transform ${
        scrolled ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      Free shipping on all orders &mdash; no code required
    </div>
  );
}
