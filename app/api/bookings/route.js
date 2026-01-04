import { connectDB } from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { verifyAuth } from '@/lib/auth'

// GET user's bookings
export async function GET(req) {
  try {
    await connectDB()
    const cookie = req.cookies.get('token')?.value
    if (!cookie) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 })
    }

    const user = await verifyAuth(cookie)
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 })
    }

    const bookings = await Booking.find({ userId: user.id }).sort({ createdAt: -1 })
    return new Response(JSON.stringify({ bookings }), { status: 200 })
  } catch (err) {
    console.error('Get bookings error:', err)
    return new Response(JSON.stringify({ error: 'Failed to fetch bookings' }), { status: 500 })
  }
}

// POST create new booking
export async function POST(req) {
  try {
    await connectDB()
    const cookie = req.cookies.get('token')?.value
    if (!cookie) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 })
    }

    const user = await verifyAuth(cookie)
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 })
    }

    const { serviceId, serviceName, duration, location, totalCost } = await req.json()

    if (!serviceId || !serviceName || !duration || !location || !totalCost) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
    }

    const booking = await Booking.create({
      userId: user.id,
      serviceId,
      serviceName,
      duration,
      location,
      totalCost,
      status: 'Pending'
    })

    return new Response(JSON.stringify({ booking }), { status: 201 })
  } catch (err) {
    console.error('Create booking error:', err)
    return new Response(JSON.stringify({ error: 'Failed to create booking' }), { status: 500 })
  }
}