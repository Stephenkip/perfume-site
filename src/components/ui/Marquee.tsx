"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  speed = 40,
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden h-full",
        pauseOnHover ? "group" : "",
        className,
      )}
      style={({
        "--marquee-speed": `${speed}s`,
      } as unknown as React.CSSProperties)}
    >
      <div className="flex items-center gap-12 shrink-0 will-change-transform animate-marquee">
        <div className="flex items-center gap-12 shrink-0">{children}</div>
        <div className="flex items-center gap-12 shrink-0">{children}</div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
          animation-duration: var(--marquee-speed, 40s);
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
        @property --marquee-speed { syntax: "<time>"; inherits: false; initial-value: 40s; }
      `}</style>
    </div>
  );
}
