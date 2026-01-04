'use client'

import { useState, useEffect } from 'react'
import BookingForm from '@/components/BookingForm'
import { useParams } from 'next/navigation'
import { services } from '@/lib/data'

export default function BookingPage() {
  const { id } = useParams()
  const [service, setService] = useState(null)

  useEffect(() => {
    const foundService = services.find(s => s.id === id)
    setService(foundService)
  }, [id])

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-2xl text-white">Loading service...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-10">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-4xl font-bold text-white mb-6">{service.name}</h1>
        <p className="text-gray-300 mb-4">{service.description}</p>
        <p className="text-xl text-white mb-8">Price: ৳{service.pricePerDay}/day</p>
        <BookingForm service={service} />
      </div>
    </div>
  )
}