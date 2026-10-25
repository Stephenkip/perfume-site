import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSupabaseConfig } from "./lib/supabase/config";

export async function proxy(request: NextRequest) {
  const config = getSupabaseConfig();
  if (!config) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  try {
    const supabase = createServerClient(
      config.url,
      config.key,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({ name, value: "", ...options });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set({ name, value: "", ...options });
          },
        },
      },
    );

    await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;

    const protectedRoutes = ["/account"];
    const publicAccountRoutes = [
      "/account/login",
      "/account/register",
      "/account/forgot-password",
      "/account/reset-password",
    ];
    const isProtected = protectedRoutes.some((p) =>
      pathname === p || pathname.startsWith(`${p}/`),
    );
    const isPublicAccountRoute = publicAccountRoutes.includes(pathname);

    const { data } = await supabase.auth.getUser();

    if (isProtected && !isPublicAccountRoute && !data.user) {
      const url = request.nextUrl.clone();
      url.pathname = "/account/login";
      url.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(url);
    }
  } catch {
    // If something goes wrong, continue without blocking.
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
