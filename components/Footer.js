import { Heart, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <Heart className="h-8 w-8 text-red-500"/>
            <span className="ml-2 text-2xl font-bold">Care<span className="text-blue-400">.xyz</span></span>
          </div>
          <p className="text-gray-400">Reliable care services for children, elderly, and sick people in Bangladesh.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="text-gray-400 hover:text-white transition">Home</a></li>
            <li><a href="/my-bookings" className="text-gray-400 hover:text-white transition">My Bookings</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-start"><MapPin className="h-5 w-5 mr-2 text-red-500"/><span className="text-gray-400">Level-4, 34, Awal Centre, Banani, Dhaka</span></li>
            <li className="flex items-center"><Mail className="h-5 w-5 mr-2 text-blue-400"/><span className="text-gray-400">support@care.xyz</span></li>
            <li className="flex items-center"><Phone className="h-5 w-5 mr-2 text-green-400"/><span className="text-gray-400">+880 1XXX-XXXXXX</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        © {new Date().getFullYear()} Care.xyz - Developed by T.M.Redwan Shahriar Shubho. All rights reserved.
      </div>
    </footer>
  )
}
