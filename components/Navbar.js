'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    fetchUser()
  }, [pathname])

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/user', { 
        credentials: 'include',
        cache: 'no-store' // Prevent caching issues
      })
      
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (err) {
      console.error('Fetch user error:', err)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { 
        method: 'POST', 
        credentials: 'include' 
      })
      
      setUser(null)
      setMobileOpen(false)
      router.push('/')
      router.refresh()
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-2xl text-indigo-600 hover:text-indigo-700">
            Care.xyz
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`font-medium ${pathname === '/' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'}`}
            >
              Home
            </Link>
            
            {user && (
              <Link 
                href="/my-bookings" 
                className={`font-medium ${pathname === '/my-bookings' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'}`}
              >
                My Bookings
              </Link>
            )}
            
            {loading ? (
              <div className="w-20 h-9 bg-gray-200 animate-pulse rounded"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Hi, {user.name}</span>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  href="/login" 
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="md:hidden text-gray-700 hover:text-indigo-600 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">
            <Link 
              href="/" 
              onClick={() => setMobileOpen(false)}
              className="block text-gray-700 hover:text-indigo-600 font-medium py-2"
            >
              Home
            </Link>
            
            {user && (
              <Link 
                href="/my-bookings" 
                onClick={() => setMobileOpen(false)}
                className="block text-gray-700 hover:text-indigo-600 font-medium py-2"
              >
                My Bookings
              </Link>
            )}
            
            {loading ? (
              <div className="w-full h-10 bg-gray-200 animate-pulse rounded"></div>
            ) : user ? (
              <>
                <div className="text-gray-700 py-2">Hi, {user.name}</div>
                <button 
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition font-medium text-left px-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Link 
                  href="/login" 
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition font-medium"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}