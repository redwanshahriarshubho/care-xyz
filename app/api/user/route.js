import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import { verifyAuth } from '@/lib/auth'

export async function GET(req) {
  await connectDB()
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  const userData = await verifyAuth(token)
  if (!userData) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

  const user = await User.findById(userData.id).lean()
  return new Response(JSON.stringify({ user: { id: user._id, name: user.name, email: user.email } }), { status: 200 })
}