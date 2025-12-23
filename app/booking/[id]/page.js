'use client'

import { useState, useEffect } from 'react'
import BookingForm from '@/components/BookingForm'
import { useParams } from 'next/navigation'

export default function BookingPage() {
  const { id } = useParams()
  const [service, setService] = useState(null)

  useEffect(() => {
    const fetchService = async () => {
      const res = await fetch('/api/services')
      const data = await res.json()
      setService(data.services.find(s => s.id === id))
    }
    fetchService()
  }, [id])

  if (!service) return <div className="text-center text-2xl text-white mt-10">Loading service...</div>

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-4xl font-bold text-white mb-6">{service.name}</h1>
      <BookingForm service={service} />
    </div>
  )
}
