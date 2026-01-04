import { NextResponse } from 'next/server';

export async function proxy(request) {
  // Placeholder for auth: Later, add NextAuth token check to protect /booking and /my-bookings
  // e.g., if (!token && request.nextUrl.pathname.startsWith('/booking')) return NextResponse.redirect('/login');
  return NextResponse.next();
}

export const config = { matcher: ['/booking/:path*', '/my-bookings'] };