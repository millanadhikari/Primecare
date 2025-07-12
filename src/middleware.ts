import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = ['/crm', '/clients'];

export function middleware(request: NextRequest) {
  console.log('Middleware triggered for:', request);
  const { pathname } = request.nextUrl;

  // Check if path is protected
  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get('refreshToken')?.value;

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
  matcher: ['/crm/:path*', '/clients/:path*'],
};