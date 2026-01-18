'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    contact: '', 
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // IMPORTANT: Include credentials for cookies
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          contact: form.contact,
          password: form.password
        })
      })
      
      const data = await res.json()
      
      if (res.ok) {
        // Don't store token in localStorage - it's already in httpOnly cookie
        router.push('/')
        router.refresh()
      } else {
        setError(data.error || 'Registration failed')
      }
    } catch (err) {
      console.error('Registration error:', err)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
      <div className="bg-gray-900 p-10 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Join Care<span className="text-indigo-400">.xyz</span>
          </h1>
          <p className="text-gray-400">Create your account</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={form.name}
              onChange={handleChange} 
              required
              disabled={loading}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Email</label>
            <input 
              type="email" 
              name="email" 
              value={form.email}
              onChange={handleChange} 
              required
              disabled={loading}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Contact Number</label>
            <input 
              type="tel" 
              name="contact" 
              value={form.contact}
              onChange={handleChange} 
              required
              disabled={loading}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Password</label>
            <input 
              type="password" 
              name="password" 
              value={form.password}
              onChange={handleChange} 
              required
              disabled={loading}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-gray-400 mt-1">At least 6 characters</p>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              value={form.confirmPassword}
              onChange={handleChange} 
              required
              disabled={loading}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 p-4 rounded-lg font-bold text-xl text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}