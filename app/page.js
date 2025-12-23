'use client'
import { services } from '@/lib/data'
import ServiceCard from '@/components/ServiceCard'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </main>
  )
}
