"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  width?: string;
  backdrop?: boolean;
}

export function Drawer({
  open,
  onClose,
  children,
  className,
  width = "w-[420px] max-w-full",
  backdrop = true,
}: DrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {backdrop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
            />
          )}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
            className={cn(
              "fixed top-0 right-0 h-full z-50 bg-cream shadow-2xl shadow-ink/20 overflow-y-auto outline-none focus-visible:ring-2 focus-visible:ring-terracotta ring-offset-cream",
              width,
              className,
            )}
            role="dialog"
            aria-modal="true"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function DrawerClose({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="absolute top-6 right-6 z-10 p-1.5 text-ink/60 hover:text-ink transition-colors focus-visible:ring-2 focus-visible:ring-terracotta outline-none"
      aria-label="Close drawer"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
}

export function DrawerContent({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col h-full">{children}</div>;
}

export function DrawerHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="px-8 py-6 border-b border-ink/10">
      <h2 className="font-display text-[32px] leading-tight text-ink tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mt-1 text-[12px] leading-5 text-ink/60 uppercase tracking-wider">{subtitle}</p>
      )}
    </div>
  );
}
