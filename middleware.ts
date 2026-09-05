import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { User } from "@supabase/supabase-js";
import { isAdminUser } from "@/lib/auth/roles";

const PROTECTED_MUTATION_ROUTES = new Set(["/api/equipment", "/api/upload"]);
type CookieToSet = { name: string; value: string; options: CookieOptions };

function unauthorized() {
  return NextResponse.json(
    { success: false, error: "Unauthorized" },
    { status: 401, headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}

function noStore(response: NextResponse) {
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  return response;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isLogin = pathname === "/admin/login";
  const isAdminPage = pathname.startsWith("/admin") && !isLogin;
  const isAdminApi = pathname.startsWith("/api/admin/");
  const isProtectedMutation = PROTECTED_MUTATION_ROUTES.has(pathname);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    if (isAdminApi || isProtectedMutation) return unauthorized();
    if (isAdminPage) {
      return noStore(NextResponse.redirect(new URL("/admin/login", request.url)));
    }
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet: CookieToSet[]) => {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  let user: User | null = null;
  try {
    const result = await supabase.auth.getUser();
    user = result.data.user;
  } catch {
    // Fail closed when Auth is unavailable.
    user = null;
  }

  const isAdmin = isAdminUser(user);

  if ((!user || !isAdmin) && (isAdminApi || isProtectedMutation)) return unauthorized();
  if ((!user || !isAdmin) && isAdminPage) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return noStore(NextResponse.redirect(loginUrl));
  }
  if (isAdmin && isLogin) {
    return noStore(NextResponse.redirect(new URL("/admin", request.url)));
  }

  return isAdminPage || isLogin ? noStore(response) : response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/equipment",
    "/api/upload",
  ],
};
