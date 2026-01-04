import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import { verifyAuth } from '@/lib/auth'

export async function GET(req) {
  try {
    await connectDB()
    const cookie = req.cookies.get('token')?.value
    if (!cookie) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const userData = await verifyAuth(cookie)
    if (!userData) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const user = await User.findById(userData.id).lean()
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })
    }

    return new Response(
      JSON.stringify({ 
        user: { 
          id: user._id, 
          name: user.name, 
          email: user.email 
        } 
      }), 
      { status: 200 }
    )
  } catch (err) {
    console.error('Get user error:', err)
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}