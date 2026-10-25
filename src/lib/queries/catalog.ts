import { createClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

type CatalogProduct = Database["public"]["Tables"]["products"]["Row"];
type CatalogImage = Database["public"]["Tables"]["product_images"]["Row"];
type CatalogVariant = Database["public"]["Tables"]["product_variants"]["Row"];
type CatalogCategory = Database["public"]["Tables"]["categories"]["Row"];
type CatalogProductCategory =
  Database["public"]["Tables"]["product_categories"]["Row"];

export type {
  CatalogProduct,
  CatalogImage,
  CatalogVariant,
  CatalogCategory,
  CatalogProductCategory,
};

type SupabaseResponse<T> = { data: T[] | null; error: unknown };

async function safe<T>(input: T | Promise<T>): Promise<T | undefined> {
  try {
    return await Promise.resolve(input);
  } catch {
    return undefined;
  }
}

export async function getProductsAndCategories(
  supabase: SupabaseClient,
) {
  const result = await safe(
    Promise.all([
      supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: false }),
      supabase.from("categories").select("*").order("name"),
    ]),
  ) as
    | [
        SupabaseResponse<CatalogProduct>,
        SupabaseResponse<CatalogCategory>,
      ]
    | undefined;

  if (!result) return { products: [], categories: [] };
  const [productsResult, categoriesResult] = result;
  const products = (productsResult.data ?? []) as CatalogProduct[];
  const productIds = products.map((product) => product.id);

  const relatedData = productIds.length
    ? await Promise.all([
        safe(
          supabase
            .from("product_images")
            .select("*")
            .in("product_id", productIds)
            .order("position", { ascending: true }),
        ),
        safe(
          supabase
            .from("product_categories")
            .select("*")
            .in("product_id", productIds),
        ),
      ])
    : [];

  const [imagesResult, productCategoriesResult] = relatedData;
  return {
    products,
    categories: (categoriesResult.data ?? []) as CatalogCategory[],
    images: (imagesResult?.data ?? []) as CatalogImage[],
    productCategories: (productCategoriesResult?.data ??
      []) as CatalogProductCategory[],
  };
}

export async function getCatalogImages(
  supabase: SupabaseClient,
  productId: string,
) {
  const result = await safe(
    supabase
      .from("product_images")
      .select("*")
      .eq("product_id", productId)
      .order("position", { ascending: true }),
  ) as SupabaseResponse<CatalogImage> | undefined;
  return (result?.data ?? []) as CatalogImage[];
}

export async function getCatalogVariants(
  supabase: SupabaseClient,
  productId: string,
) {
  const result = await safe(
    supabase
      .from("product_variants")
      .select("*")
      .eq("product_id", productId)
      .eq("active", true),
  ) as SupabaseResponse<CatalogVariant> | undefined;
  return (result?.data ?? []) as CatalogVariant[];
}

export async function getProductBySlug(
  supabase: SupabaseClient,
  slug: string,
) {
  const result = await safe(
    supabase.from("products").select("*").eq("slug", slug).eq("active", true),
  ) as { data: CatalogProduct[] | null; error: unknown } | undefined;
  const product = result?.data?.[0] ?? null;
  if (!product) return { product: null, images: [], variants: [] };

  const [images, variants] = await Promise.all([
    getCatalogImages(supabase, product.id),
    getCatalogVariants(supabase, product.id),
  ]);
  return { product, images, variants };
}
