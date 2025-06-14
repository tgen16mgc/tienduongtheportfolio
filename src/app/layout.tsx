import './globals.css'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import Navigation from '@/components/Navigation'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'My portfolio website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <body className="bg-black font-sans antialiased subpixel-antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  )
} 