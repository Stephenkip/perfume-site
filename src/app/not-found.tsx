import { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Not found — OEA Perfumery",
};

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 bg-cream min-h-[calc(100vh-220px)]">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 pt-20 px-6 md:px-12 flex-1">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="font-display text-[80px] leading-tight text-ink italic tracking-tighter mb-6">
            404
          </h1>
          <p className="text-[15px] leading-7 text-ink/60 mb-10">
            This page isn’t in the collection. Everything else is.
          </p>
          <Button variant="primary" asChild>
            <Link href="/shop">Return to the shop</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
