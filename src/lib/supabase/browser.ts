import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./config";

let browserClient: ReturnType<typeof createClient> | undefined;

export function createBrowserClient() {
  if (typeof window === "undefined") {
    throw new Error("createBrowserClient must only be called in the browser");
  }

  if (browserClient) return browserClient;

  const config = getSupabaseConfig();
  if (!config) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local.",
    );
  }

  browserClient = createClient(config.url, config.key);
  return browserClient;
}
