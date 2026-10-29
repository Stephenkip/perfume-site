import type { Product } from "@/types/supabase";

export const DEMO_PRODUCT = {
  id: "demo-oea-product",
  slug: "demo-neroli-cedar",
  name: "Neroli & Cedar",
  description:
    "A demo alcohol-free fragrance with bright neroli softened by warm cedar. Product details and price are for preview only.",
  concentration: "Alcohol-free fine fragrance",
  size_ml: 50,
  price_cents: 6800,
  bestseller: false,
  preorder: false,
  active: true,
  created_at: null,
  updated_at: null,
} satisfies Product;
