// app/api/services/[id]/route.js
import { NextResponse } from 'next/server'
import { services } from '@/lib/data'

export async function GET(request, { params }) {
  const { id } = params
  const service = services.find(s => s.id === id)
  if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 })
  return NextResponse.json(service, { status: 200 })
}
