import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");

  const protectedPaths = [
    "/homepage",
    "/blogs",
    "/profile",
    "/create-blog",
    "/blog/.*",
    "/edit-blog/.*",
  ];

  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/homepage", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/homepage", "/login", "/register", "/api/:path*"],
};
