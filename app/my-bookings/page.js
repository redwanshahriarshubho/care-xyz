'use client'

import { useEffect, useState } from 'react'
import PrivateRoute from '@/components/PrivateRoute'
import CancelBookingButton from '@/components/CancelBookingButton'

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch('/api/bookings')
      const data = await res.json()
      if (res.ok) setBookings(data.bookings)
    }
    fetchBookings()
  }, [])

  return (
    <PrivateRoute>
      <div className="min-h-[calc(100vh-4rem)] p-8">
        <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map(b => (
              <div key={b._id} className="p-4 border rounded bg-gray-800 text-white flex justify-between items-center">
                <div>
                  <p><strong>Service:</strong> {b.serviceName}</p>
                  <p><strong>Status:</strong> {b.status}</p>
                  <p><strong>Total:</strong> {b.totalCost} BDT</p>
                </div>
                {b.status === 'Pending' && <CancelBookingButton bookingId={b._id} onCancel={() => setBookings(bookings.filter(x => x._id !== b._id))}/>}
              </div>
            ))}
          </div>
        )}
      </div>
    </PrivateRoute>
  )
}
