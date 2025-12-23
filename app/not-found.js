import Link from 'next/link'

export const metadata = {
  title: '404 - Page Not Found | Care.xyz',
}

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-indigo-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition transform hover:scale-105"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}