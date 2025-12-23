// app/api/services/route.js
import { NextResponse } from 'next/server'
import { services } from '@/lib/data'

export async function GET() {
  return NextResponse.json(services, { status: 200 })
}
