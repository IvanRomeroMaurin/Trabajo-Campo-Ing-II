import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Navbar } from '@/shared/components/layout'
import { Footer } from '@/shared/components/layout'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MiTienda',
  description: 'Tu tienda online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${geist.className} bg-background text-foreground antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
