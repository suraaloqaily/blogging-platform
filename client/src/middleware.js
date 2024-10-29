import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");

  const protectedPaths = [
    "/blogging-platform/homepage",
    "/blogging-platform/blogs",
    "/blogging-platform/profile",
    "/blogging-platform/create-blog",
    "/blogging-platform/blog/.*",
    "/blogging-platform/edit-blog/.*",
  ];

  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !token) {
    return NextResponse.redirect(
      new URL("/blogging-platform/login", request.url)
    );
  }

  if (token && request.nextUrl.pathname === "/blogging-platform/login") {
    return NextResponse.redirect(
      new URL("/blogging-platform/homepage", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/blogging-platform/homepage",
    "/blogging-platform/login",
    "/blogging-platform/register",
    "/blogging-platform/api/:path*",
  ],
};
