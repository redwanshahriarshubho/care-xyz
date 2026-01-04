'use client'

import { useEffect, useState } from 'react'
import PrivateRoute from '@/components/PrivateRoute'
import CancelBookingButton from '@/components/CancelBookingButton'

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings', {
        credentials: 'include'
      })
      const data = await res.json()
      
      if (res.ok) {
        setBookings(data.bookings || [])
      } else {
        setError(data.error || 'Failed to fetch bookings')
      }
    } catch (err) {
      console.error('Fetch bookings error:', err)
      setError('Failed to fetch bookings')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">My Bookings</h2>
          
          {loading && (
            <p className="text-white text-center">Loading bookings...</p>
          )}
          
          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}
          
          {!loading && !error && bookings.length === 0 && (
            <div className="text-center text-white">
              <p className="text-xl mb-4">No bookings yet.</p>
              <a href="/" className="text-indigo-400 hover:text-indigo-300">
                Browse services to make your first booking
              </a>
            </div>
          )}
          
          {!loading && bookings.length > 0 && (
            <div className="space-y-4">
              {bookings.map(b => (
                <div key={b._id} className="p-6 border border-gray-700 rounded-lg bg-gray-800 text-white">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{b.serviceName}</h3>
                      <div className="space-y-1 text-gray-300">
                        <p><strong>Duration:</strong> {b.duration} day(s)</p>
                        <p><strong>Status:</strong> 
                          <span className={`ml-2 px-2 py-1 rounded text-sm ${
                            b.status === 'Pending' ? 'bg-yellow-600' : 
                            b.status === 'Confirmed' ? 'bg-green-600' : 
                            'bg-red-600'
                          }`}>
                            {b.status}
                          </span>
                        </p>
                        <p><strong>Total Cost:</strong> ৳{b.totalCost}</p>
                        {b.location && (
                          <p><strong>Location:</strong> {b.location.area}, {b.location.district}, {b.location.division}</p>
                        )}
                        <p className="text-sm text-gray-400">
                          Booked on: {new Date(b.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {b.status === 'Pending' && (
                      <CancelBookingButton 
                        bookingId={b._id} 
                        onCancel={() => setBookings(bookings.filter(x => x._id !== b._id))}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  )
}