import { createClient } from "@/lib/supabase/server";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { OrderItem, OrderRow } from "@/types/checkout";

export default async function OrdersPage() {
  const supabase = await createClient();
  let orders: OrderRow[] = [];
  try {
    const { data } = await supabase
      .from("orders")
      .select("*, order_items(quantity, price_cents, products(name))")
      .order("created_at", { ascending: false });
    orders = (data ?? []) as OrderRow[];
  } catch {
    orders = [];
  }

  const content =
    orders.length > 0 ? (
      <table className="w-full text-left text-[13px] leading-6 text-ink/70">
        <thead>
          <tr className="border-b border-ink/10 pb-6 text-ink uppercase tracking-wider font-medium">
            <th className="text-left">Order</th>
            <th className="text-left">Date</th>
            <th className="text-left">Items</th>
            <th className="text-left">Total</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b border-ink/5 py-6 last:border-0">
              <td className="font-medium text-ink">
                #{String(o.id).slice(-6)}
              </td>
              <td>
                {o.created_at ? new Date(o.created_at).toLocaleDateString() : "–"}
              </td>
              <td>
                {(o.order_items as OrderItem[])
                  .map((i) => i.products?.name ?? "Item")
                  .join(", ") || "—"}
              </td>
              <td>{formatPrice(o.total_cents ?? 0)}</td>
              <td className="text-ink/50 uppercase tracking-wider text-[11px] font-medium">
                {o.status ?? "pending"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="rounded-[30px] border border-ink/10 bg-cream-deep p-16 text-center">
        <p className="text-[14px] italic text-ink/50">
          No orders yet. Placeholder empty state.
        </p>
      </div>
    );

  return (
    <div className="flex flex-col flex-1 bg-cream">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 pt-20 px-6 md:px-12 min-h-[calc(100vh-220px)]">
        <h1 className="font-display text-[56px] leading-tight text-ink italic mb-10">
          Your orders
        </h1>
        {content}
      </main>
    </div>
  );
}
