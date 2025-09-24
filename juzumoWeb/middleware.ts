import { NextResponse } from 'next/server';

export function middleware(request) {
  // Example middleware logic: Redirect to a specific page if the user is not authenticated
  const isAuthenticated = request.cookies.get('auth') !== undefined;

  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // Apply this middleware only to dashboard routes
};