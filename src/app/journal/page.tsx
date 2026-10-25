import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { placeholderImage } from "@/lib/images";
import type { JournalArticle } from "@/types/supabase";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Journal — OEA Perfumery",
    description: "Guides on layering and how to wear alcohol-free fragrance.",
  };
}

export default async function JournalPage() {
  const supabase = await createClient();
  let articles: JournalArticle[] = [];
  try {
    const { data } = await supabase
      .from("journal_articles")
      .select("*, product_images!left(*)")
      .eq("active", true)
      .order("published_at", { ascending: false });
    articles = data ?? [];
  } catch {
    articles = [];
  }

  return (
    <div className="flex flex-col flex-1 bg-cream">
      <main className="flex-1 relative overflow-x-hidden bg-cream min-h-[calc(100vh-200px)]">
        <section className="px-6 md:px-12 py-24 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="font-display text-[56px] leading-tight text-ink tracking-tight italic mb-6">
              Journal
            </h1>
            <p className="text-[15px] leading-7 text-ink/60">
              Placeholder guides — layering, how to wear, and the notes behind
              the collection.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-12 pb-24 lg:pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(articles).map((article) => (
              <article
                key={article.slug}
                className="rounded-[30px] border border-ink/10 bg-cream-deep overflow-hidden flex flex-col h-full"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={
                      article.cover_image ||
                      placeholderImage({ text: `Article: ${article.title}` })
                    }
                    alt={`Placeholder cover for ${article.title}`}
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1280px) 35vw, 25vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-[11px] uppercase tracking-wider text-terracotta font-medium mb-3">
                    Placeholder guide
                  </p>
                  <Link
                    href={`/journal/${article.slug}`}
                    className="font-display text-[22px] leading-tight text-ink italic mb-3 hover:text-terracotta transition-colors"
                  >
                    {article.title}
                  </Link>
                  <p className="text-[14px] leading-6 text-ink/60 mb-4 flex-1">
                    {article.excerpt ?? "Placeholder excerpt — swap with real editorial copy."}
                  </p>
                    <span className="text-[11px] uppercase tracking-wider text-ink/40 font-medium">
                      {article.published_at
                        ? new Date(article.published_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                        : "–"}
                    </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
