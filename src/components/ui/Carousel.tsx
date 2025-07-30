"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface Artwork {
  id: number
  title: string
  date: string
  quote: string
  medium: string
  dimensions: string
  image: string
}

const artworks: Artwork[] = [
  {
    id: 1,
    title: "Marketing Campaign Vision",
    date: "2024",
    quote: "Great marketing is about telling a story that connects hearts before it reaches minds.",
    medium: "Digital Strategy",
    dimensions: "Multi-platform",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop&crop=center",
  },
  {
    id: 2,
    title: "Brand Identity Design",
    date: "2024",
    quote: "A brand is not what you say it is. It's what they say it is.",
    medium: "Visual Design",
    dimensions: "Complete System",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=600&fit=crop&crop=center",
  },
  {
    id: 3,
    title: "Social Media Strategy",
    date: "2024",
    quote: "Content is fire, social media is gasoline.",
    medium: "Content Marketing",
    dimensions: "360° Campaign",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=600&fit=crop&crop=center",
  },
  {
    id: 4,
    title: "Market Research Insights",
    date: "2024",
    quote: "Data is the new oil, but insights are the refined fuel that powers great decisions.",
    medium: "Market Analysis",
    dimensions: "Comprehensive Study",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop&crop=center",
  },
  {
    id: 5,
    title: "Creative Campaign Launch",
    date: "2024",
    quote: "Creativity is intelligence having fun, and marketing is creativity with purpose.",
    medium: "Integrated Campaign",
    dimensions: "Multi-channel",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=600&fit=crop&crop=center",
  },
]

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showPing, setShowPing] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % artworks.length)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setShowPing(true) // Add this line to trigger ping when clicking side cards
    setCurrentIndex(index)
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 600)
    return () => clearTimeout(timer)
  }, [currentIndex])

  useEffect(() => {
    if (showPing) {
      const timer = setTimeout(() => setShowPing(false), 800)
      return () => clearTimeout(timer)
    }
  }, [showPing])

  // Handle window resize for responsive positioning
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getCardTransform = (index: number) => {
    const diff = index - currentIndex
    const totalItems = artworks.length

    // Normalize the difference to handle wrap-around
    let normalizedDiff = diff
    if (Math.abs(diff) > totalItems / 2) {
      normalizedDiff = diff > 0 ? diff - totalItems : diff + totalItems
    }

    // Responsive positioning based on viewport width - prevent overlaps
    const cardWidth = Math.min(Math.max(windowWidth * 0.4, 250), 500) // Match card width logic
    const baseOffset = Math.max(cardWidth * 0.6, Math.min(Math.max(windowWidth * 0.2, 180), 280))
    const farOffset = Math.max(cardWidth * 1.0, Math.min(Math.max(windowWidth * 0.35, 320), 500))
    const hiddenOffset = Math.max(cardWidth * 1.2, Math.min(Math.max(windowWidth * 0.45, 420), 650))

    if (normalizedDiff === 0) {
      // Active card - center, full size
      return {
        transform: "translateX(0) translateZ(0) rotateY(0deg) scale(1)",
        zIndex: 50,
        opacity: 1,
      }
    } else if (normalizedDiff === 1) {
      // Right card
      return {
        transform: `translateX(${baseOffset}px) translateZ(-200px) rotateY(-30deg) scale(0.70)`,
        zIndex: 30,
        opacity: 0.8,
      }
    } else if (normalizedDiff === -1) {
      // Left card
      return {
        transform: `translateX(-${baseOffset}px) translateZ(-200px) rotateY(30deg) scale(0.70)`,
        zIndex: 30,
        opacity: 0.8,
      }
    } else if (normalizedDiff === 2) {
      // Far right card
      return {
        transform: `translateX(${farOffset}px) translateZ(-400px) rotateY(-45deg) scale(0.6)`,
        zIndex: 20,
        opacity: 0.6,
      }
    } else if (normalizedDiff === -2) {
      // Far left card
      return {
        transform: `translateX(-${farOffset}px) translateZ(-400px) rotateY(45deg) scale(0.6)`,
        zIndex: 20,
        opacity: 0.6,
      }
    } else {
      // Hidden cards
      const direction = normalizedDiff > 0 ? 1 : -1
      return {
        transform: `translateX(${direction * hiddenOffset}px) translateZ(-600px) rotateY(${-direction * 60}deg) scale(0.3)`,
        zIndex: 10,
        opacity: 0,
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center" style={{ padding: 'clamp(1rem, 3vw, 2rem)' }}>

      {/* Main Carousel Container */}
      <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center">
        <div className="relative w-full flex items-center justify-center" style={{ perspective: "1200px" }}>
          {/* Invisible spacer to give container natural height based on card size */}
          <div 
            className="invisible"
            style={{
              width: 'clamp(250px, 40vw, 500px)',
              height: 'clamp(250px, 40vw, 500px)',
              margin: 'clamp(20px, 5vh, 60px) 0'
            }}
          />
          
          {artworks.map((artwork, index) => {
            const style = getCardTransform(index)
            const isActive = index === currentIndex

            return (
              <div
                key={artwork.id}
                className="absolute transition-all duration-600 ease-out cursor-pointer"
                style={{
                  ...style,
                  transformStyle: "preserve-3d",
                }}
                onClick={() => !isActive && goToSlide(index)}
              >
                {/* Square Glassmorphic Card with Split Layout */}
                <div
                  className={`relative rounded-3xl overflow-hidden transition-all duration-600 ${
                    isActive ? "shadow-2xl ring-1 ring-white/30" : "shadow-xl ring-1 ring-white/20"
                  }`}
                  style={{
                    width: 'clamp(250px, 40vw, 500px)',
                    height: 'clamp(250px, 40vw, 500px)',
                    contain: 'layout style paint'
                  }}
                >
                  {/* Full Background - Artwork Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={artwork.image || "/placeholder.svg"}
                      alt={artwork.title}
                      fill
                      className="object-cover transition-transform duration-700"
                      priority={isActive}
                    />
                  </div>

                  {/* Bottom Section - Adaptive Size with Liquid Glass Effect */}
                  <div className="absolute bottom-0 left-0 right-0">
                    {/* Different gradient treatments for active vs inactive cards */}
                    <div
                      className={`absolute inset-0 ${
                        isActive
                          ? "bg-gradient-to-t from-black/40 via-black/20 to-black/5"
                          : "bg-gradient-to-t from-black/80 via-black/60 to-black/40"
                      }`}
                    ></div>

                    {/* Liquid glass effect overlay */}
                    <div
                      className={`absolute inset-0 backdrop-blur-xl border-t border-white/20 transition-all duration-600 ${
                        isActive
                          ? "bg-gradient-to-t from-white/10 via-white/6 to-white/2"
                          : "bg-gradient-to-t from-white/20 via-white/15 to-white/10"
                      }`}
                    >
                      {/* Liquid glass texture */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent ${
                          isActive ? "via-white/3" : "via-white/8"
                        }`}
                      ></div>
                      <div
                        className={`absolute inset-0 bg-gradient-to-tl from-transparent to-transparent ${
                          isActive ? "via-white/2" : "via-white/5"
                        }`}
                      ></div>
                    </div>

                    {/* Content - Auto-sizing based on text */}
                    <div className="relative" style={{ padding: 'clamp(12px, 2.5vw, 24px)' }}>
                      {/* Title and Date */}
                      <div className="space-y-2" style={{ marginBottom: 'clamp(8px, 1.5vw, 16px)' }}>
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <h2
                            className={`font-bold text-white leading-tight transition-all duration-300 drop-shadow-lg line-clamp-2 ${
                              isActive ? "text-2xl lg:text-3xl" : "text-lg lg:text-xl"
                            }`}
                            style={{ 
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical' as const
                            }}
                          >
                            {artwork.title}
                          </h2>
                          <span
                            className={`text-gray-200 font-medium transition-all duration-300 drop-shadow-md ${
                              isActive ? "text-sm lg:text-base" : "text-xs lg:text-sm"
                            }`}
                          >
                            {artwork.date}
                          </span>
                        </div>

                        {/* Quote */}
                        <blockquote
                          className={`text-gray-100 italic leading-relaxed transition-all duration-300 drop-shadow-md ${
                            isActive ? "text-sm lg:text-base opacity-100" : "text-xs lg:text-sm opacity-90"
                          }`}
                          style={{ 
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: isActive ? 4 : 3,
                            WebkitBoxOrient: 'vertical' as const
                          }}
                        >
                          "{artwork.quote}"
                        </blockquote>
                      </div>

                      {/* Medium and Dimensions */}
                      <div className="space-y-1">
                        <p
                          className={`text-purple-200 font-medium transition-all duration-300 drop-shadow-sm truncate ${
                            isActive ? "text-sm lg:text-base" : "text-xs lg:text-sm"
                          }`}
                        >
                          {artwork.medium}
                        </p>
                        <p
                          className={`text-blue-200 transition-all duration-300 drop-shadow-sm truncate ${
                            isActive ? "text-sm lg:text-base" : "text-xs lg:text-sm"
                          }`}
                        >
                          {artwork.dimensions}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Gradient fade for non-active cards */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none"></div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation Dots - Animated Indicators */}
      <div className="flex items-center justify-center space-x-4 mt-8 z-60">
        {/* Active dot with conditional ping animation */}
        <div className="relative">
          <div className="w-3 h-3 bg-white rounded-full shadow-lg transition-all duration-300"></div>
          {showPing && <div className="absolute inset-0 w-3 h-3 bg-white/30 rounded-full animate-ping"></div>}
        </div>

        {/* Remaining items indicator with subtle animation */}
        <div className="relative overflow-hidden">
          <div className="w-12 h-2 bg-white/40 rounded-full transition-all duration-600"></div>
          {/* Animated progress fill */}
          <div
            className="absolute top-0 left-0 h-2 bg-white/60 rounded-full transition-all duration-600 ease-out"
            style={{
              width: `${((currentIndex + 1) / artworks.length) * 100}%`,
            }}
          ></div>
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
} 