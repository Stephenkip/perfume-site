"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, padded = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-[30px] border border-ink/10 bg-cream-deep shadow-sm shadow-ink/5",
        padded && "p-6",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export { Card };
