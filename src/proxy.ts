import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login"];
const PROTECTED_ROUTES = ["/", "/mcq", "/result"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  );

  // No token + protected route → go to login
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Has token + public route → go to home
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Only match these specific routes — NOT all routes
    "/",
    "/login",
    "/mcq",
    "/mcq/:path*",
    "/result",
    "/result/:path*",
  ],
};
