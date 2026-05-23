import {
  NextRequest,
  NextResponse,
} from "next/server";

export function middleware(
  request: NextRequest
) {

  const token =
    request.cookies.get(
      "token"
    )?.value;

  const pathname =
    request.nextUrl.pathname;

  // ADMIN ROUTES
  const isAdminRoute =
    pathname.startsWith(
      "/admin"
    );

  // ADMIN LOGIN PAGE
  const isAdminLogin =
    pathname ===
    "/admin/login";

  // NORMAL LOGIN PAGE
  const isLoginPage =
    pathname === "/login";

  // =====================
  // ADMIN LOGIN OPEN
  // =====================

  if (isAdminLogin) {

    if (token) {

      return NextResponse.redirect(
        new URL(
          "/admin",
          request.url
        )
      );
    }

    return NextResponse.next();
  }

  // =====================
  // ADMIN PROTECT
  // =====================

  if (
    isAdminRoute &&
    !token
  ) {

    return NextResponse.redirect(
      new URL(
        "/admin/login",
        request.url
      )
    );
  }

  // =====================
  // LOGIN PAGE REDIRECT
  // =====================

  if (
    isLoginPage &&
    token
  ) {

    return NextResponse.redirect(
      new URL(
        "/admin",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {

  matcher: [
    "/admin/:path*",
    "/login",
  ],

};