'use client'

import { useState } from 'react'
import React from 'react'

export default function CancelBookingButton({ bookingId, onCancel }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this booking?')) return

    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/bookings/' + bookingId, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to cancel booking')
      } else {
        if (onCancel) onCancel()
      }
    } catch (err) {
      setError('Failed to cancel booking')
    } finally {
      setLoading(false)
    }
  }

  return React.createElement(
    'div',
    null,
    error && React.createElement('p', { className: 'text-red-500 text-sm mb-1' }, error),
    React.createElement(
      'button',
      {
        onClick: handleCancel,
        disabled: loading,
        className: 'bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition disabled:opacity-50'
      },
      loading ? 'Cancelling...' : 'Cancel Booking'
    )
  )
}
