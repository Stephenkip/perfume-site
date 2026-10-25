import { createClient } from "@/lib/supabase/server";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import type { Database } from "@/types/supabase";

export default async function AddressesPage() {
  const supabase = await createClient();
  type AddressRow = Database["public"]["Tables"]["addresses"]["Row"];
  let addresses: AddressRow[] = [];
  try {
    const { data } = await supabase
      .from("addresses")
      .select("*")
      .order("created_at", { ascending: false });
    addresses = (data ?? []) as AddressRow[];
  } catch {
    addresses = [];
  }

  const content =
    addresses.length > 0 ? (
      <div className="space-y-4">
        {addresses.map((a) => (
          <div key={a.id} className="rounded-[24px] border border-ink/10 bg-cream-deep p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-ink">{a.label ?? "Address"}</p>
              <p className="text-[13px] text-ink/60">
                {a.line1} {a.line2 ?? ""}, {a.city}, {a.postal_code}, {a.country}
              </p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="rounded-[30px] border border-ink/10 bg-cream-deep p-16 text-center">
        <p className="text-[14px] italic text-ink/50">
          No addresses yet. Placeholder empty state.
        </p>
      </div>
    );

  return (
    <div className="flex flex-col flex-1 bg-cream">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 pt-20 px-6 md:px-12 min-h-[calc(100vh-220px)]">
        <div className="flex items-baseline justify-between mb-10">
          <h1 className="font-display text-[56px] leading-tight text-ink italic">
            Addresses
          </h1>
          <Button variant="primary" asChild>
            <Link href="/account/addresses/new">Add address</Link>
          </Button>
        </div>
        {content}
      </main>
    </div>
  );
}
