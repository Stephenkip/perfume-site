"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pillVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full border text-[10px] font-medium uppercase tracking-wider transition-colors duration-200",
  {
    variants: {
      variant: {
        primary: "bg-ink text-cream border-ink",
        secondary: "border border-ink/20 text-ink hover:bg-ink/5",
        outline: "border border-ink/30 text-ink",
        terracotta: "bg-terracotta text-cream border-terracotta",
        ghost: "bg-transparent text-ink/60 hover:bg-ink/10",
      },
      size: {
        sm: "h-6 px-2",
        default: "h-8 px-3",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "default",
    },
  },
);

interface PillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pillVariants> {}

const Pill = React.forwardRef<HTMLSpanElement, PillProps>(
  ({ className, variant, size, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(pillVariants({ variant, size, className }))}
      {...props}
    />
  ),
);
Pill.displayName = "Pill";

export { Pill, pillVariants };
