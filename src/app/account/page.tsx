import { createClient } from "@/lib/supabase/server";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import type { OrderRow } from "@/types/checkout";

export default async function AccountPage() {
  const supabase = await createClient();
  let orderList: OrderRow[] = [];
  try {
    const { data } = await supabase
      .from("orders")
      .select("*, order_items(*, products(name))")
      .order("created_at", { ascending: false })
      .limit(5);
    orderList = (data ?? []) as OrderRow[];
  } catch {
    orderList = [];
  }

  return (
    <div className="flex flex-col flex-1 bg-cream">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 pt-20 px-6 md:px-12 min-h-[calc(100vh-220px)]">
        <h1 className="font-display text-[56px] leading-tight text-ink italic mb-2">
          Account
        </h1>
        <p className="text-[15px] text-ink/60 mb-10">
          Placeholder dashboard — your orders, addresses, and subscription.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link href="/account/orders" className="rounded-[24px] border border-ink/10 bg-cream-deep p-6 text-left hover:bg-ink/5 transition-colors">
            <p className="text-[11px] uppercase tracking-wider text-ink/50 font-medium mb-2">
              Your orders
            </p>
            <p className="font-display text-[20px] italic text-ink">
              {orderList.length}
            </p>
          </Link>
          <Link href="/account/addresses" className="rounded-[24px] border border-ink/10 bg-cream-deep p-6 text-left hover:bg-ink/5 transition-colors">
            <p className="text-[11px] uppercase tracking-wider text-ink/50 font-medium mb-2">
              Addresses
            </p>
            <p className="font-display text-[20px] italic text-ink">Placeholder</p>
          </Link>
          <Link href="/account/subscription" className="rounded-[24px] border border-ink/10 bg-cream-deep p-6 text-left hover:bg-ink/5 transition-colors">
            <p className="text-[11px] uppercase tracking-wider text-ink/50 font-medium mb-2">
              Subscription
            </p>
            <p className="font-display text-[20px] italic text-ink">Placeholder</p>
          </Link>
        </div>
        {orderList.length > 0 ? (
          <section className="rounded-[30px] border border-ink/10 bg-cream-deep p-8">
            <h3 className="text-[11px] uppercase tracking-wider text-ink/50 font-medium mb-6">
              Recent orders
            </h3>
            <table className="w-full text-left text-[13px] leading-6 text-ink/70">
              <thead>
                <tr className="border-b border-ink/10 pb-4 text-ink uppercase tracking-wider font-medium">
                  <th className="text-left">Order</th>
                  <th className="text-left">Date</th>
                  <th className="text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((o) => (
                  <tr key={o.id} className="border-b border-ink/5 py-4 last:border-0">
                    <td className="font-medium text-ink">
                      #{String(o.id).slice(-6)}
                    </td>
                    <td>
                      {o.created_at ? new Date(o.created_at).toLocaleDateString() : "–"}
                    </td>
                    <td>{formatPrice(o.total_cents ?? 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : (
          <p className="text-[14px] italic text-ink/50">
            No orders yet. Placeholder empty state.
          </p>
        )}
      </main>
    </div>
  );
}
