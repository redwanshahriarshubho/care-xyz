'use client'

export default function ServiceCard({ service }) {
  return (
    <div className={`p-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all bg-gradient-to-r ${service.color} text-white`}>
      <div className="text-5xl mb-4">{service.icon}</div>
      <h2 className="text-2xl font-bold mb-2">{service.name}</h2>
      <p className="text-gray-100 mb-4">{service.description}</p>
      <ul className="mb-4 space-y-1">
        {service.features.map((feat, i) => (
          <li key={i} className="flex items-center">
            <span className="mr-2 text-green-400">✔</span>{feat}
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl">৳{service.pricePerDay}/day</span>
        <a href={`/booking/${service.id}`} className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">Book Now</a>
      </div>
    </div>
  )
}
