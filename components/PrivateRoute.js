'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/user')
        if (res.ok) {
          setIsLoggedIn(true)
        } else {
          router.push('/login')
        }
      } catch (err) {
        console.error('Auth check failed:', err)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        Checking authentication...
      </div>
    )
  }

  return isLoggedIn ? children : null
}
