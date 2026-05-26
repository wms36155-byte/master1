import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/login";
  const isAdminLogin = pathname === "/admin/login";

  // =========================
  // ADMIN LOGIN PAGE
  // =========================
  if (isAdminLogin) {
    if (token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // =========================
  // LOGIN PAGE (USER LOGIN)
  // =========================
  if (isLoginPage) {
    // ❗ user login page should NOT redirect to /admin
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // =========================
  // ADMIN PROTECT ROUTES
  // =========================
  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/admin/login"],
};