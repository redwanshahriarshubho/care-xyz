import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Care.xyz - Trusted Baby Sitting & Elderly Care Services',
  description: 'Professional and reliable care services for children, elderly, and sick people. Book trusted caretakers for your loved ones in Bangladesh.',
  keywords: 'baby sitting, elderly care, caretaker, home care, Bangladesh, Dhaka',
  authors: [{ name: 'Redwan' }],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Navbar />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
