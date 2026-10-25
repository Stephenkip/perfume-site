"use client";

import * as React from "react";
import { useState } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { placeholderImage } from "@/lib/images";
import Image from "next/image";

const types = ["All", "Boutique", "Stockist", "Spa"];

export default function FindUsPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setEmpty(false);
    setTimeout(() => {
      setLoading(false);
      setEmpty(query.length === 0);
    }, 600);
  };

  const results = [
    { name: "Placeholder Boutique — Paris", type: "Boutique", distance: "1.2 km" },
    { name: "Placeholder Stockist — Lyon", type: "Stockist", distance: "3.4 km" },
  ];

  return (
    <div className="flex flex-col flex-1 bg-cream">
      <section className="px-6 md:px-12 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <h1 className="font-display text-[56px] leading-tight text-ink tracking-tight italic mb-2">
                Find us
              </h1>
              <p className="text-[15px] leading-7 text-ink/60">
                Placeholder store locator — search stockists by city or type.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <label className="flex flex-col gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-ink/50 font-medium">
                    Location
                  </span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="City, neighborhood"
                    className="rounded-[14px] border border-ink/20 bg-transparent px-4 py-3 text-[14px] text-ink placeholder-ink/30 focus:ring-2 focus:ring-terracotta outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-ink/50 font-medium">
                    Type
                  </span>
                  <div className="flex gap-3">
                    {types.map((t) => (
                      <button
                        key={t}
                        onClick={() => setType(t)}
                        className={`rounded-full border px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all ${
                          type === t
                            ? "border-ink bg-ink text-cream"
                            : "border-ink/20 text-ink hover:bg-ink/5"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </label>
                <Button variant="primary" type="submit" className="w-full">
                  Search
                </Button>
              </form>

              {loading && (
                <p className="text-[13px] text-ink/60 italic">Searching&hellip;</p>
              )}
              {empty && (
                <div className="rounded-[24px] border border-ink/10 bg-cream-deep p-6 text-center">
                  <p className="text-[14px] text-ink/60 italic">
                    No results found for your search.
                  </p>
                </div>
              )}
              {!loading && !empty && (
                <div className="space-y-4">
                  {results.map((r) => (
                    <div key={r.name} className="border-b border-ink/5 pb-4 last:border-0 last:pb-0">
                      <p className="font-medium text-ink">{r.name}</p>
                      <p className="text-[12px] text-ink/50">
                        {r.type} &middot; {r.distance}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-8 relative aspect-[16/10] rounded-[30px] overflow-hidden border border-ink/10 bg-cream-deep flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center text-ink/20 text-[13px] uppercase tracking-wider font-medium">
                Placeholder map — integrate Leaflet or MapLibre here
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
