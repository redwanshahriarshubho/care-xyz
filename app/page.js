'use client'
import { services } from '@/lib/data'
import ServiceCard from '@/components/ServiceCard'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-indigo-400">Care.xyz</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Professional and reliable care services for children, elderly, and sick people in Bangladesh
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 text-center">
          <div className="bg-gray-800 rounded-lg p-8 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Why Choose Care.xyz?</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div>
                <div className="text-4xl mb-2">✓</div>
                <h3 className="font-bold mb-2">Verified Professionals</h3>
                <p className="text-gray-400">All our caretakers are background checked</p>
              </div>
              <div>
                <div className="text-4xl mb-2">💰</div>
                <h3 className="font-bold mb-2">Affordable Rates</h3>
                <p className="text-gray-400">Quality care at reasonable prices</p>
              </div>
              <div>
                <div className="text-4xl mb-2">🕐</div>
                <h3 className="font-bold mb-2">24/7 Support</h3>
                <p className="text-gray-400">We're here whenever you need us</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}