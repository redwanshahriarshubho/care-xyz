import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { generateToken } from '@/lib/auth'

export async function POST(req) {
  await connectDB()
  const { email, password } = await req.json()

  const user = await User.findOne({ email })
  if (!user) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })

  const token = generateToken({ id: user._id, email: user.email })
  return new Response(JSON.stringify({ user: { id: user._id, name: user.name, email }, token }), { status: 200 })
}
