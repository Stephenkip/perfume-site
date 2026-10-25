"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-200 active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-cream hover:bg-terracotta shadow-lg shadow-ink/20",
        secondary:
          "border border-ink/20 bg-transparent text-ink hover:bg-ink hover:text-cream",
        outline:
          "border border-ink/30 bg-transparent text-ink hover:bg-ink hover:text-cream",
        ghost: "text-ink/60 hover:bg-ink/10",
        terracotta:
          "bg-terracotta text-cream hover:bg-amber shadow-lg shadow-terracotta/30",
        cream: "bg-cream text-ink hover:bg-ink hover:text-cream",
      },
      size: {
        sm: "h-8 px-3 text-[10px]",
        default: "h-10 px-4 py-2 text-[11px]",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const base = buttonVariants({ variant, size, className });
    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<{
        className?: string;
      }>;
      return React.cloneElement(child, {
        className: cn(base, child.props.className),
        ...props,
        ref,
      } as unknown as React.ReactElement<{ className?: string }>);
    }
    return (
      <button ref={ref} className={base} {...props}>
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
