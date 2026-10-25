"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export default function SubscriptionPage() {
  return (
    <div className="flex flex-col flex-1 bg-cream">
      <section className="px-6 md:px-12 py-24 lg:py-32 min-h-[calc(100vh-220px)]">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-[56px] leading-tight text-ink italic mb-10">
            Subscription
          </h1>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Discovery", cadence: "Every 2 months", price: 4800 },
              { name: "Essentials", cadence: "Monthly", price: 14500 },
              { name: "Connoisseur", cadence: "Quarterly", price: 29000 },
            ].map((plan) => (
              <div key={plan.name} className="rounded-[30px] border border-ink/10 bg-cream-deep p-8">
                <p className="font-display text-[24px] italic text-ink mb-4">{plan.name}</p>
                <p className="text-[11px] uppercase tracking-wider text-terracotta font-medium mb-6">
                  {plan.cadence}
                </p>
                <p className="font-display text-[32px] italic text-ink mb-8">
                  {formatPrice(plan.price)}
                </p>
                <Button variant="primary" className="w-full">Subscribe</Button>
              </div>
            ))}
          </div>
          <p className="mt-12 text-[13px] leading-6 text-ink/60 max-w-lg">
            Placeholder subscription copy — receive compositions on a rhythm
            that suits you. Skip or cancel anytime.
          </p>
        </div>
      </section>
    </div>
  );
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(amount / 100);
}
