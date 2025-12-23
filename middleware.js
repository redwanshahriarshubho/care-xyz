import { NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth'

export async function middleware(req) {
  const protectedRoutes = ['/booking', '/my-bookings']
  const isProtected = protectedRoutes.some(path => req.nextUrl.pathname.startsWith(path))
  const token = req.cookies.get('token')?.value

  if (isProtected && !token) {
    const url = new URL('/login', req.url)
    url.searchParams.set('redirect', req.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  if (token && isProtected) {
    const user = await verifyAuth(token)
    if (!user) {
      const url = new URL('/login', req.url)
      url.searchParams.set('redirect', req.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = { matcher: ['/booking/:path*', '/my-bookings/:path*'] }
