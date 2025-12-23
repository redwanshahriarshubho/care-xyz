'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('token', data.token)
      router.push('/')
    } else {
      setError(data.error || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
      <div className="bg-gray-900 p-10 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-white mb-6">Care<span className="text-indigo-400">.xyz</span></h1>
        <p className="text-gray-400 mb-8">Reliable care services for children, elderly, and sick people</p>
        <form onSubmit={handleLogin} className="space-y-6 text-left">
          <div>
            <label className="text-gray-300 font-semibold text-lg">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full p-3 mt-2 rounded-lg bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          </div>
          <div>
            <label className="text-gray-300 font-semibold text-lg">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full p-3 mt-2 rounded-lg bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 p-4 rounded-lg font-bold text-xl text-white transition-all">Login</button>
        </form>
      </div>
    </div>
  )
}
