"use client";

import * as React from "react";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";

type FaqGroup = {
  title: string;
  items: Array<{ value: string; question: string; answer: string }>;
};

const groups: FaqGroup[] = [
  {
    title: "Account",
    items: [
      {
        value: "acc-1",
        question: "How do I create an account?",
        answer: "Placeholder answer — go to Account, enter your email, and set a password.",
      },
      {
        value: "acc-2",
        question: "Can I edit my addresses?",
        answer: "Placeholder answer — yes, in Account > Addresses.",
      },
    ],
  },
  {
    title: "Order",
    items: [
      {
        value: "ord-1",
        question: "How do I track my order?",
        answer: "Placeholder answer — tracking is sent by email once the order ships.",
      },
    ],
  },
  {
    title: "Delivery",
    items: [
      {
        value: "del-1",
        question: "Where do you ship?",
        answer: "Placeholder answer — shipping destinations and times vary by country.",
      },
    ],
  },
  {
    title: "Product",
    items: [
      {
        value: "prod-1",
        question: "Are your fragrances alcohol-free?",
        answer: "Placeholder answer — yes, all compositions are alcohol-free.",
      },
    ],
  },
  {
    title: "Subscription",
    items: [
      {
        value: "sub-1",
        question: "How do I pause my subscription?",
        answer: "Placeholder answer — manage it in Account > Subscription.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="flex flex-col flex-1 bg-cream">
      <section className="px-6 md:px-12 py-24 lg:py-40">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-baseline gap-2 mb-12">
            <h1 className="font-display text-[64px] leading-tight text-ink tracking-tight italic">
              FAQ
            </h1>
          </div>
          <p className="text-[15px] leading-7 text-ink/60">
            Placeholder help copy. Can’t find what you’re looking for? Get in
            touch.
          </p>
        </div>
      </section>

      <section className="py-24 border-y border-ink/10">
        <div className="px-6 md:px-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-[11px] uppercase tracking-wider text-terracotta font-medium mb-8">
                  {group.title}
                </h3>
                <Accordion>
                  {group.items.map((item) => (
                    <AccordionItem
                      key={item.value}
                      value={item.value}
                      trigger={item.question}
                    >
                      <p className="text-[14px] leading-6 text-ink/70">
                        {item.answer}
                      </p>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
