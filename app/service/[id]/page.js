'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { services } from '@/lib/data'

export default function ServicePage() {
  const { id } = useParams()
  const service = services.find(s => s.id === id)
  const [duration, setDuration] = useState(1)
  const router = useRouter()

  const handleBooking = async () => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceId: service.id, serviceName: service.name, duration, totalCost: duration * service.pricePerDay })
    })
    if (res.ok) router.push('/my-bookings')
  }

  if (!service) return <p>Service not found</p>

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8">
      <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
      <p className="mb-2">{service.description}</p>
      <p className="mb-4">Price per day: {service.pricePerDay} BDT</p>
      <label className="block mb-2">Duration (days)</label>
      <input type="number" min="1" value={duration} onChange={e => setDuration(Number(e.target.value))} className="p-2 rounded bg-gray-800 text-white mb-4"/>
      <button onClick={handleBooking} className="bg-indigo-500 p-2 rounded hover:bg-indigo-600 transition">Book This Service</button>
    </div>
  )
}
