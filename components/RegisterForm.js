'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'

  const [formData, setFormData] = useState({ nid:'', name:'', email:'', contact:'', password:'', confirmPassword:'' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validatePassword = pwd => {
    if(pwd.length < 6) return 'Password must be at least 6 characters'
    if(!/[A-Z]/.test(pwd)) return 'Password must contain at least 1 uppercase letter'
    if(!/[a-z]/.test(pwd)) return 'Password must contain at least 1 lowercase letter'
    return ''
  }

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
    setErrors({...errors, [e.target.name]: ''})
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const newErrors = {}
    const pwdError = validatePassword(formData.password)
    if(pwdError) newErrors.password = pwdError
    if(formData.password !== formData.confirmPassword) newErrors.confirmPassword='Passwords do not match'

    if(Object.keys(newErrors).length>0){
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setErrors({})
    try{
      const res = await fetch('/api/auth/register', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if(res.ok){
        router.push(redirect)
        router.refresh()
      } else setErrors({ general: data.error || 'Registration failed' })
    } catch(err){
      setErrors({ general: 'Registration failed. Please try again.' })
    } finally { setLoading(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow rounded">
      {errors.general && <p className="text-red-600 mb-2">{errors.general}</p>}
      {['nid','name','email','contact','password','confirmPassword'].map(f => (
        <div className="mb-4" key={f}>
          <label className="block mb-1 capitalize">{f}</label>
          <input
            type={f.includes('password')?'password':'text'}
            name={f}
            value={formData[f]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          {errors[f] && <p className="text-red-600 text-sm">{errors[f]}</p>}
        </div>
      ))}
      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">
        {loading?'Creating Account...':'Create Account'}
      </button>
    </form>
  )
}
