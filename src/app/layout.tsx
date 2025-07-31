import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'My portfolio website',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap" />
        <link href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap" rel="stylesheet" />
        {/* Critical image preloading for hero section via CDN */}
        <link rel="preload" as="image" href="https://cdn.statically.io/gh/tgen16mgc/tienduongtheportfolio/main/public/images/Card.webp" />
        <link rel="preload" as="image" href="https://cdn.statically.io/gh/tgen16mgc/tienduongtheportfolio/main/public/images/Card-sm.webp" media="(max-width: 640px)" />
        <link rel="preload" as="image" href="https://cdn.statically.io/gh/tgen16mgc/tienduongtheportfolio/main/public/images/Card-md.webp" media="(min-width: 641px) and (max-width: 1024px)" />
        <link rel="preload" as="image" href="https://cdn.statically.io/gh/tgen16mgc/tienduongtheportfolio/main/public/images/Card-lg.webp" media="(min-width: 1025px)" />
      </head>
      <body className="bg-black font-sans antialiased subpixel-antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  )
} 