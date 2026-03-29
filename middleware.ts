import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin" && !req.cookies.get("admin_session")) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (pathname.startsWith("/api/customers/manage") || pathname.startsWith("/api/requests/export")) {
    if (!req.cookies.get("admin_session")) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/api/customers/manage", "/api/requests/export"],
};
