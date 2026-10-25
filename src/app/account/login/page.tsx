"use client";

import * as React from "react";
import { createBrowserClient } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { placeholderImage } from "@/lib/images";

type Mode = "login" | "register";

export default function AuthPage({ mode }: { mode: Mode }) {
  const [supabase] = React.useState(() =>
    typeof window !== "undefined" ? createBrowserClient() : null,
  );
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (!supabase) throw new Error("Supabase client only available in the browser");
      if (mode === "login") {
        const { error: err } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (err) throw err;
      } else {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (err) throw err;
      }
      router.push("/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-cream">
      <section className="px-6 md:px-12 py-20 lg:py-24 min-h-[calc(100vh-220px)]">
        <div className="max-w-lg mx-auto">
          <div className="flex items-baseline gap-2 mb-10">
            <h1 className="font-display text-[48px] leading-tight text-ink tracking-tight italic">
              {mode === "login" ? "Log in" : "Create an account"}
            </h1>
          </div>
          {error && (
            <div className="mb-6 p-4 rounded-[14px] border border-ink/10 bg-ink/5 text-[13px] text-ink/70">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase tracking-wider text-ink/50 font-medium block">
                  Full name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full name"
                  className="rounded-[14px] border border-ink/20 bg-transparent px-4 py-3 text-[14px] text-ink placeholder-ink/30 focus:ring-2 focus:ring-terracotta outline-none"
                  required
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-wider text-ink/50 font-medium block">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="rounded-[14px] border border-ink/20 bg-transparent px-4 py-3 text-[14px] text-ink placeholder-ink/30 focus:ring-2 focus:ring-terracotta outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-wider text-ink/50 font-medium block">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="rounded-[14px] border border-ink/20 bg-transparent px-4 py-3 text-[14px] text-ink placeholder-ink/30 focus:ring-2 focus:ring-terracotta outline-none"
                required
              />
            </div>
            <Button variant="primary" type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing&hellip;" : mode === "login" ? "Log in" : "Create account"}
            </Button>
          </form>
          <p className="mt-8 text-center text-[12px] text-ink/50 uppercase tracking-wider font-medium">
            {mode === "login"
              ? "Don’t have an account? "
              : "Already have an account? "}
            <Link
              href={mode === "login" ? "/account/register" : "/account/login"}
              className="text-terracotta hover:underline"
            >
              {mode === "login" ? "Create one" : "Log in"}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
