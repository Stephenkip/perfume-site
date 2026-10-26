"use server";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";
import { revalidatePath } from "next/cache";

type CartItemInput = {
  productId: string;
  variantId?: string | null;
  quantity: number;
};

export async function createOrderAction(
  items: CartItemInput[],
  email: string,
) {
  const normalizedEmail = email.trim();
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) ||
    normalizedEmail.length > 320
  ) {
    return { error: "Enter a valid email address." };
  }
  if (
    items.length < 1 ||
    items.length > 30 ||
    items.some(
      (item) =>
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 20,
    )
  ) {
    return { error: "Your cart contains an invalid item or quantity." };
  }

  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return { error: "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local." };
  }

  // Re-validate prices server-side — never trust client prices.
  const productIds = items.map((i) => i.productId);
  const variantIds = items.filter((i) => i.variantId).map((i) => i.variantId!);

  const [productsResult, variantsResult] = await Promise.all([
    supabase.from("products").select("id, price_cents, active").in("id", productIds),
    supabase
      .from("product_variants")
      .select("id, product_id, price_cents, active, stock_qty")
      .in("id", variantIds),
  ]);

  const products = (productsResult.data ?? []) as Array<{ id: string; price_cents: number | null; active: boolean | null }>;
  const variants = (variantsResult.data ?? []) as Array<{ id: string; product_id: string; price_cents: number | null; active: boolean | null; stock_qty: number | null }>;

  const byProductId = new Map(products.map((p) => [p.id, p]));
  const byVariantId = new Map(variants.map((v) => [v.id, v]));

  const serverItems: { product_id: string; variant_id: string | null; quantity: number }[] = [];

  for (const item of items) {
    const product = byProductId.get(item.productId);
    if (!product || !product.active) {
      return { error: `Product ${item.productId} is unavailable.` };
    }
    const variant = item.variantId ? byVariantId.get(item.variantId) : null;
    if (item.variantId && (!variant || variant.product_id !== product.id)) {
      return { error: `The selected option for ${product.id} is unavailable.` };
    }
    if (
      variant &&
      (!variant.active ||
        (variant.stock_qty !== null && variant.stock_qty < item.quantity))
    ) {
      return { error: `Insufficient stock for ${product.id}.` };
    }
    serverItems.push({ product_id: item.productId, variant_id: variant?.id ?? null, quantity: item.quantity });
  }

  const { data, error } = await supabase.rpc("create_order", {
    items: serverItems,
    email: normalizedEmail,
  });

  if (error) return { error: error.message };

  revalidatePath("/account");
  revalidatePath("/cart");
  return { ok: true, order: data as Database["public"]["Functions"]["create_order"]["Returns"] };
}
