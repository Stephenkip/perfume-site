import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

export default async function SubscriptionPage() {
  const supabase = await createClient();
  type SubscriptionRow = Database["public"]["Tables"]["subscriptions"]["Row"];
  let subscriptions: SubscriptionRow[] = [];
  try {
    const { data } = await supabase
      .from("subscriptions")
      .select("*, products(name), product_variants(size_label)")
      .order("created_at", { ascending: false });
    subscriptions = (data ?? []) as SubscriptionRow[];
  } catch {
    subscriptions = [];
  }

  const content =
    subscriptions.length > 0 ? (
      <div className="space-y-6">
        {subscriptions.map((s) => (
          <div key={s.id} className="rounded-[30px] border border-ink/10 bg-cream-deep p-8">
            <p className="font-display text-[20px] italic text-ink mb-2">
              {(s as unknown as { products: { name: string | null } | null }).products
                ?.name ?? "Subscription"}
            </p>
            <p className="text-[13px] text-ink/60">
              Cadence: {(s as { cadence: string | null }).cadence ??
                "placeholder"} &middot;
              Status: {(s as { status: string | null }).status ?? "active"}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <div className="rounded-[30px] border border-ink/10 bg-cream-deep p-16 text-center">
        <p className="text-[14px] italic text-ink/50">
          No active subscription. Placeholder empty state.
        </p>
      </div>
    );

  return (
    <div className="flex flex-col flex-1 bg-cream">
      <main className="flex-1 pt-20 px-6 md:px-12 min-h-[calc(100vh-220px)]">
        <h1 className="font-display text-[56px] leading-tight text-ink italic mb-10">
          Subscription
        </h1>
        {content}
      </main>
    </div>
  );
}
