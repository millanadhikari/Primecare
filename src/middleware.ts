import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/crm", "/clients"];
const publicPaths = ["/login", "/reset-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes through
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get("refreshToken")?.value;
  console.log("Middleware check: pathname =", pathname, "| token =", token);

  const allCookies = request.cookies.getAll();
  console.log("All cookies in middleware:", allCookies);

  if (!token) {
    const loginUrl = new URL("/login", request.url); // Fixed login path
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/crm", "/crm/:path*", "/clients", "/clients/:path*"],
};
