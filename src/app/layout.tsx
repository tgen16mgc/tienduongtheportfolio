import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import MobileFloatingNav from '@/components/ui/MobileFloatingNav'

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
        <link href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-black font-sans antialiased subpixel-antialiased">
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical mobile-first styles */
            .critical-hero { 
              min-height: 100vh; 
              background: black; 
              position: relative; 
              overflow: hidden; 
            }
            .critical-nav { 
              position: fixed; 
              top: 0; 
              width: 100%; 
              z-index: 50; 
              backdrop-filter: blur(8px); 
            }
            .critical-text { 
              color: white; 
              font-family: 'Rethink Sans', system-ui, sans-serif; 
            }
            @media (max-width: 768px) {
              .critical-hero { font-size: clamp(16px, 4vw, 24px); }
              .mesh-bg { opacity: 0.3; }
            }
          `
        }} />
        
        <Navigation />
        <MobileFloatingNav />
        {children}
      </body>
    </html>
  )
} 