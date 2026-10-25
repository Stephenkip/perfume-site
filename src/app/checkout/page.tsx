"use client";

import * as React from "react";
import { useCart } from "@/components/cart/CartContext";
import { createOrderAction } from "@/app/checkout/actions";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, subtotal, itemCount, clear } = useCart();
  const router = useRouter();
  const [step, setStep] = React.useState<"form" | "success" | "error">("form");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");

  if (typeof window !== "undefined" && itemCount === 0 && step === "form") {
    router.replace("/cart");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await createOrderAction(
      items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId ?? undefined,
        quantity: i.quantity,
      })),
      email,
    );
    setLoading(false);
    if (result.error) {
      setStep("error");
      setError(result.error);
      return;
    }
    clear();
    setStep("success");
    router.push("/checkout/success");
  };

  if (step === "success") {
    return (
      <div className="flex flex-col flex-1 bg-cream min-h-[calc(100vh-220px)]">
        <section className="px-6 md:px-12 py-24 lg:py-32">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-terracotta flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8 text-cream" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="font-display text-[48px] leading-tight text-ink tracking-tight italic mb-6">
              Order confirmed
            </h1>
            <p className="text-[15px] leading-7 text-ink/60 mb-10">
              Thank you. Your order has been placed — a confirmation has been
              sent to {email}.
            </p>
            <Button variant="primary" asChild>
              <Link href="/">Back to shop</Link>
            </Button>
          </div>
        </section>
      </div>
    );
  }

  if (step === "error") {
    return (
      <div className="flex flex-col flex-1 bg-cream min-h-[calc(100vh-220px)]">
        <section className="px-6 md:px-12 py-24 lg:py-32">
          <div className="max-w-xl mx-auto">
            <h1 className="font-display text-[48px] leading-tight text-ink italic mb-6">
              Something went wrong
            </h1>
            <p className="text-[13px] text-ink/60 mb-6">{error}</p>
            <Button variant="outline" onClick={() => setStep("form")}>
              Try again
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-cream min-h-[calc(100vh-220px)]">
      <section className="px-6 md:px-12 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-[48px] leading-tight text-ink italic mb-12">
            Checkout
          </h1>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-10">
              <section className="rounded-[30px] border border-ink/10 bg-cream-deep p-8">
                <h2 className="text-[11px] uppercase tracking-wider text-ink/50 font-medium mb-6">
                  Contact
                </h2>
                <div className="space-y-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-wider text-ink/50 font-medium block">
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      required
                      className="rounded-[14px] border border-ink/20 bg-transparent px-4 py-3 text-[14px] text-ink placeholder-ink/30 focus:ring-2 focus:ring-terracotta outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-wider text-ink/50 font-medium block">
                      Full name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="rounded-[14px] border border-ink/20 bg-transparent px-4 py-3 text-[14px] text-ink placeholder-ink/30 focus:ring-2 focus:ring-terracotta outline-none"
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-[30px] border border-ink/10 bg-cream-deep p-8">
                <h2 className="text-[11px] uppercase tracking-wider text-ink/50 font-medium mb-6">
                  Shipping address
                </h2>
                <div className="space-y-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-wider text-ink/50 font-medium block">
                      Address
                    </label>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="rounded-[14px] border border-ink/20 bg-transparent px-4 py-3 text-[14px] text-ink placeholder-ink/30 focus:ring-2 focus:ring-terracotta outline-none"
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-[30px] border border-ink/10 bg-cream-deep p-8">
                <h2 className="text-[11px] uppercase tracking-wider text-ink/50 font-medium mb-6">
                  Shipping method
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 rounded-[18px] border border-ink/10 cursor-pointer hover:bg-ink/5 transition-colors">
                    <input type="radio" name="shipping" defaultChecked className="shrink-0" />
                    <span className="text-[13px] text-ink">Standard delivery — 3–5 business days</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 rounded-[18px] border border-ink/10 cursor-pointer hover:bg-ink/5 transition-colors">
                    <input type="radio" name="shipping" className="shrink-0" />
                    <span className="text-[13px] text-ink">Express delivery — 1–2 business days</span>
                  </label>
                </div>
              </section>

              <section className="rounded-[30px] border border-ink/10 bg-cream-deep p-8">
                <h2 className="text-[11px] uppercase tracking-wider text-ink/50 font-medium mb-6">
                  Discount code
                </h2>
                <div className="flex gap-3">
                  <input
                    placeholder="CODE"
                    className="flex-1 rounded-[14px] border border-ink/20 bg-transparent px-4 py-3 text-[13px] text-ink placeholder-ink/30 focus:ring-2 focus:ring-terracotta outline-none uppercase tracking-wider"
                  />
                  <Button variant="outline">Apply</Button>
                </div>
              </section>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[30px] border border-ink/10 bg-cream-deep p-8 sticky top-6">
                <h2 className="text-[11px] uppercase tracking-wider text-ink/50 font-medium mb-6">
                  Order summary
                </h2>
                <div className="space-y-4 mb-8">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-[13px] leading-5 text-ink/70">
                      <span className="text-ink/50">{item.quantity}×</span>
                      <span className="font-medium text-ink">{item.name}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-ink/10 pt-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-[13px] text-ink/50">Subtotal</span>
                    <span className="font-medium text-ink">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[13px] text-ink/50">Shipping</span>
                    <span className="font-medium text-ink">Calculated at checkout</span>
                  </div>
                </div>
                <div className="border-t border-ink/10 pt-8">
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="text-[13px] uppercase tracking-wider text-ink/50 font-medium">
                      Total
                    </span>
                    <span className="font-display text-[20px] italic text-ink">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <Button variant="primary" type="submit" className="w-full" disabled={loading}>
                    {loading ? "Processing order&hellip;" : "Complete order"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
