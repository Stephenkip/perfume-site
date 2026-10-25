"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
  className?: string;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, children }, ref) => (
    <div ref={ref} className={cn("space-y-1", className)} />
  ),
);
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionItemProps
>(({ value, children, trigger, className }, ref) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("border-b border-ink/10", className)}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`accordion-panel-${value}`}
        className="flex w-full items-center justify-between py-4 text-left text-ink uppercase tracking-wider text-[10px] font-medium transition-colors hover:text-terracotta focus-visible:ring-2 focus-visible:ring-terracotta outline-none"
      >
        {trigger}
        <span className="ml-2 shrink-0 transition-transform duration-300 ease-out">
          {open ? (
            <ChevronDown className="h-3 w-3 rotate-180" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )}
        </span>
      </button>
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink/10 pt-4 pb-6 text-[14px] leading-relaxed text-ink/70"
            id={`accordion-panel-${value}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
AccordionItem.displayName = "AccordionItem";

export { Accordion, AccordionItem };
