'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BookingForm({ service }) {
  const router = useRouter()
  const [duration, setDuration] = useState(1)
  const [division, setDivision] = useState('')
  const [district, setDistrict] = useState('')
  const [area, setArea] = useState('')
  const [address, setAddress] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const totalCost = service.pricePerDay * duration

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          serviceId: service.id,
          serviceName: service.name,
          duration,
          location: { division, district, area, address },
          totalCost
        })
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess('Booking successful! Redirecting...')
        setTimeout(() => router.push('/my-bookings'), 1500)
      } else {
        setError(data.error || 'Booking failed. Please try again.')
      }
    } catch (err) {
      console.error('Booking error:', err)
      setError('Failed to create booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-white mb-2">Duration (days)</label>
        <input 
          type="number" 
          min="1" 
          value={duration} 
          onChange={e => setDuration(Number(e.target.value))}
          className="w-full p-2 rounded text-black"
          required
        />
      </div>
      
      <div>
        <label className="block text-white mb-2">Division</label>
        <input 
          type="text" 
          value={division} 
          onChange={e => setDivision(e.target.value)}
          className="w-full p-2 rounded text-black"
          required
        />
      </div>
      
      <div>
        <label className="block text-white mb-2">District</label>
        <input 
          type="text" 
          value={district} 
          onChange={e => setDistrict(e.target.value)}
          className="w-full p-2 rounded text-black"
          required
        />
      </div>
      
      <div>
        <label className="block text-white mb-2">Area</label>
        <input 
          type="text" 
          value={area} 
          onChange={e => setArea(e.target.value)}
          className="w-full p-2 rounded text-black"
          required
        />
      </div>
      
      <div>
        <label className="block text-white mb-2">Address</label>
        <input 
          type="text" 
          value={address} 
          onChange={e => setAddress(e.target.value)}
          className="w-full p-2 rounded text-black"
          required
        />
      </div>
      
      <div className="font-bold text-lg text-white">Total Cost: ৳{totalCost}</div>
      
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-indigo-500 hover:bg-indigo-600 p-2 rounded font-semibold text-white disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Book Service'}
      </button>
      
      {success && <div className="mt-2 text-green-400">{success}</div>}
      {error && <div className="mt-2 text-red-400">{error}</div>}
    </form>
  )
}