'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user', { credentials: 'include' })
        if (res.ok) setUser((await res.json()).user)
        else setUser(null)
      } catch (err) { setUser(null) }
    }
    fetchUser()
  }, [pathname])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    setUser(null)
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-xl">Care.xyz</Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className={pathname==='/'?'text-blue-600':'text-gray-700'}>Home</Link>
            {user && <Link href="/my-bookings" className={pathname==='/my-bookings'?'text-blue-600':'text-gray-700'}>My Bookings</Link>}
            {user ? (
              <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-3 py-1 rounded">Login</Link>
            )}
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
            {mobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden space-y-2 py-2">
            <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
            {user && <Link href="/my-bookings" onClick={() => setMobileOpen(false)}>My Bookings</Link>}
            {user ? <button onClick={() => { handleLogout(); setMobileOpen(false) }}>Logout</button> :
              <Link href="/login" onClick={() => setMobileOpen(false)}>Login</Link>}
          </div>
        )}
      </div>
    </nav>
  )
}
