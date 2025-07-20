import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/crm", "/clients"];
const publicPaths = ["/crm/login", "/reset-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes through
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get("refreshToken")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url); // Fixed login path
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Match all sub-paths under crm and clients
export const config = {
  matcher: ["/crm/:path*", "/clients/:path*"],
};
