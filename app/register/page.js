'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', contact: '', password: '' })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleRegister = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('token', data.token)
      router.push('/')
    } else {
      setError(data.error || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
      <div className="bg-gray-900 p-10 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-white mb-6">Register to Care<span className="text-indigo-400">.xyz</span></h1>
        <form onSubmit={handleRegister} className="space-y-6 text-left">
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required
            className="w-full p-3 rounded-lg bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required
            className="w-full p-3 rounded-lg bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <input type="text" name="contact" placeholder="Contact Number" onChange={handleChange} required
            className="w-full p-3 rounded-lg bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required
            className="w-full p-3 rounded-lg bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 p-4 rounded-lg font-bold text-xl text-white transition-all">Register</button>
        </form>
      </div>
    </div>
  )
}
