'use client'
import { useState } from 'react'

export default function BookingForm({ service }) {
  const [duration, setDuration] = useState(1)
  const [division, setDivision] = useState('')
  const [district, setDistrict] = useState('')
  const [area, setArea] = useState('')
  const [address, setAddress] = useState('')
  const [success, setSuccess] = useState('')

  const totalCost = service.pricePerDay * duration

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        serviceId: service.id,
        serviceName: service.name,
        duration,
        location: { division, district, area, address },
        totalCost
      })
    })
    if (res.ok) setSuccess('Booking successful! Check My Bookings.')
    else setSuccess('Booking failed.')
  }

  return (
    <form className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4" onSubmit={handleSubmit}>
      <div>
        <label>Duration (days)</label>
        <input type="number" min="1" value={duration} onChange={e => setDuration(Number(e.target.value))}
          className="w-full p-2 rounded text-black"/>
      </div>
      <div>
        <label>Division</label>
        <input type="text" value={division} onChange={e => setDivision(e.target.value)}
          className="w-full p-2 rounded text-black"/>
      </div>
      <div>
        <label>District</label>
        <input type="text" value={district} onChange={e => setDistrict(e.target.value)}
          className="w-full p-2 rounded text-black"/>
      </div>
      <div>
        <label>Area</label>
        <input type="text" value={area} onChange={e => setArea(e.target.value)}
          className="w-full p-2 rounded text-black"/>
      </div>
      <div>
        <label>Address</label>
        <input type="text" value={address} onChange={e => setAddress(e.target.value)}
          className="w-full p-2 rounded text-black"/>
      </div>
      <div className="font-bold text-lg">Total Cost: ৳{totalCost}</div>
      <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 p-2 rounded font-semibold">Book Service</button>
      {success && <div className="mt-2 text-green-400">{success}</div>}
    </form>
  )
}
