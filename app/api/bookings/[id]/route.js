import { connectDB } from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { verifyAuth } from '@/lib/auth'

export async function DELETE(req, { params }) {
  try {
    await connectDB()
    const cookie = req.cookies.get('token')?.value
    if (!cookie) return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 })

    const user = await verifyAuth(cookie)
    if (!user) return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 })

    const booking = await Booking.findOne({ _id: params.id, userId: user.id })
    if (!booking) return new Response(JSON.stringify({ error: 'Booking not found' }), { status: 404 })
    if (booking.status !== 'Pending') return new Response(JSON.stringify({ error: 'Cannot cancel this booking' }), { status: 400 })

    await Booking.deleteOne({ _id: params.id })
    return new Response(JSON.stringify({ message: 'Booking cancelled' }), { status: 200 })
  } catch (err) {
    console.error('Cancel booking error:', err)
    return new Response(JSON.stringify({ error: 'Failed to cancel booking' }), { status: 500 })
  }
}
