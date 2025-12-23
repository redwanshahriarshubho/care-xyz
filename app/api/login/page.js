'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) setError(data.error)
      else router.push('/')
    } catch (err) {
      setError('Login failed')
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-900 text-white p-8 rounded-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 rounded bg-gray-800"/>
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 rounded bg-gray-800"/>
        <button type="submit" className="w-full bg-indigo-500 p-2 rounded hover:bg-indigo-600 transition">Login</button>
      </form>
    </div>
  )
}
