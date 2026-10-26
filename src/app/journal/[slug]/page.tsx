import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { placeholderImage } from "@/lib/images";
import type { JournalArticle } from "@/types/supabase";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const supabase = await createClient();
  try {
    const { data } = await supabase
      .from("journal_articles")
      .select("*")
      .eq("slug", (await params).slug)
      .eq("active", true)
      .single();
    const article = data as JournalArticle | null;
    return {
      title: article ? `${article.title} — OEA Perfumery` : "Article — OEA Perfumery",
      description: article?.excerpt ?? "Placeholder journal article.",
    };
  } catch {
    return { title: "Article — OEA Perfumery", description: "Placeholder journal article." };
  }
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  let article: JournalArticle | null = null;
  try {
    const { data } = await supabase
      .from("journal_articles")
      .select("*")
      .eq("slug", slug)
      .eq("active", true)
      .single();
    article = data as JournalArticle | null;
  } catch {
    article = null;
  }

  if (!article) {
    return (
      <div className="flex flex-col flex-1">
        <main className="flex-1 pt-20 px-6 md:px-12 min-h-[calc(100vh-200px)]">
        <h1 className="font-display text-[56px] text-ink italic">Not found</h1>
      </main>
    </div>
  );
}

  const related = [
    { title: "Placeholder related article 1", href: "#" },
    { title: "Placeholder related article 2", href: "#" },
  ];

  return (
    <div className="flex flex-col flex-1 bg-cream">
      <main className="flex-1 relative overflow-x-hidden bg-cream min-h-[calc(100vh-200px)]">
        <section className="px-6 md:px-12 py-10 lg:py-16">
          <div className="relative aspect-[3/2] rounded-[32px] overflow-hidden border border-ink/10 bg-cream-deep mb-10">
            <Image
              src={article.cover_image || placeholderImage({ text: `Article: ${article.title}` })}
              alt={`Placeholder cover for ${article.title}`}
              fill
              sizes="100vw"
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          <nav className="mt-6 flex gap-4 text-[10px] uppercase tracking-wider font-medium text-ink/50">
            <Link href="/journal" className="hover:text-terracotta transition-colors">
              Journal
            </Link>
            <span className="text-ink/20">/</span>
            <span className="text-ink">{article.title}</span>
          </nav>
        </section>

        <section className="px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-[48px] leading-tight text-ink tracking-tight italic mb-8">
              {article.title}
            </h1>
            <div
              className="text-[16px] leading-8 text-ink/70 space-y-6"
              dangerouslySetInnerHTML={{ __html: article.body || "<p>Placeholder body — swap with real editorial copy.</p>" }}
            />
          </div>
        </section>

        <section className="px-6 md:px-12 py-24 lg:py-32">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-[40px] leading-tight text-ink tracking-tight italic mb-8">
              You’ll also love
            </h2>
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
              {related.map((r) => (
                <a
                  key={r.title}
                  href={r.href}
                  className="shrink-0 w-72"
                >
                  <div className="aspect-square rounded-[24px] overflow-hidden border border-ink/10 bg-cream-deep mb-4">
                    <Image
                      src={placeholderImage({ text: r.title, width: 500, height: 500 })}
                      alt={`Placeholder: ${r.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-display text-[16px] leading-tight text-ink italic">{r.title}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
