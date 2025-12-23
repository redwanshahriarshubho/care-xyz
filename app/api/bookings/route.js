import { connectDB } from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { verifyAuth } from '@/lib/auth'

export async function POST(req) {
  await connectDB()
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  const user = await verifyAuth(token)
  if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

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
}
