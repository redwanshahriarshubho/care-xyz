'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'

  const [form, setForm] = useState({ email:'', password:'' })
  const [message, setMessage] = useState('')

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value})

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch('/api/auth/login',{
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      credentials:'include',
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if(res.ok){
      router.push(redirect)
      router.refresh()
    } else setMessage(data.error || 'Login failed')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <div className="mb-4">
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" required/>
      </div>
      <div className="mb-4">
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full border p-2 rounded" required/>
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      {message && <p className="text-red-600 mt-2">{message}</p>}
    </form>
  )
}
