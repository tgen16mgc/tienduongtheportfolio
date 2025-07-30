"use client"

import { useState } from "react"

interface SectionDividerProps {
  text?: string
  speed?: number
  className?: string
}

export default function SectionDivider({
  text = "2× revenue growth via marketing campaigns ★ 1,000+ event attendees managed ★ 3.75 GPA demonstrating marketing base excellence ★ Insight-led ★ Deadline-met ★ Contest-tested IMC plan ideas",
  speed = 35,
  className = "",
}: SectionDividerProps) {
  const [isPaused, setIsPaused] = useState(false)

  // Split text by star symbol and add star components
  const textSegments = text.split("★").filter((segment) => segment.trim())

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  // Refined 4-pointed star (diamond) component
  const DiamondStar = () => (
    <div className="relative mx-4 md:mx-6">
      {/* Outer glow effect */}
      <div className="absolute inset-0 w-4 h-4 md:w-5 md:h-5 bg-white/25 rounded-full blur-md" />

      {/* Inner glow */}
      <div className="absolute inset-0 w-3 h-3 md:w-4 md:h-4 bg-white/40 rounded-full blur-sm" />

      {/* 4-pointed star (diamond) shape */}
      <div className="relative w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="w-3 h-3 md:w-4 md:h-4 fill-white/80"
          style={{
            filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))",
          }}
        >
          {/* 4-pointed star path */}
          <path d="M12 2 L16 12 L12 22 L8 12 Z" />
          <path d="M2 12 L12 8 L22 12 L12 16 Z" />
        </svg>
      </div>
    </div>
  )

  // Function to add glow to numbers in text
  const renderTextWithGlowNumbers = (text: string) => {
    // Regex to match numbers (including decimals, commas, and symbols like × + %)
    const numberRegex = /(\d+(?:[,\.]\d+)*[×+%]?)/g;
    const parts = text.split(numberRegex).filter(part => part !== '');
    
    return parts.map((part, index) => {
      // Create new regex for testing to avoid stateful issues
      const testRegex = /^\d+(?:[,\.]\d+)*[×+%]?$/;
      if (testRegex.test(part.trim())) {
        return (
          <span 
            key={index}
            className="text-lg md:text-xl lg:text-2xl font-bold font-['Rethink_Sans'] text-white px-0"
            style={{
              textShadow: `
                0 0 8px rgba(255, 255, 255, 0.9),
                0 0 16px rgba(255, 255, 255, 0.7),
                0 0 24px rgba(255, 255, 255, 0.5),
                0 0 32px rgba(255, 255, 255, 0.3)
              `,
              filter: 'brightness(1.3) contrast(1.1)'
            }}
          >
            {part}
          </span>
        );
      }
      return (
        <span 
          key={index}
          className="text-lg md:text-xl lg:text-2xl font-bold font-['Rethink_Sans'] bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
        >
          {part}
        </span>
      );
    });
  };

  const renderScrollingContent = () => (
    <div className="flex items-center whitespace-nowrap">
      {textSegments.map((segment, index) => (
        <div key={index} className="flex items-center">
          <div className="px-4 md:px-6">
            {renderTextWithGlowNumbers(segment.trim())}
          </div>
          {index < textSegments.length - 1 && <DiamondStar />}
        </div>
      ))}
    </div>
  )

  return (
    <div className={`w-full ${className}`}>
      <div className="relative w-full overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {/* Thinner full-width glassmorphic container */}
        <div className="relative backdrop-blur-lg bg-gradient-to-r from-white/8 via-white/12 to-white/8 shadow-2xl">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* Thinner scrolling text container */}
          <div className="relative py-4 md:py-6 overflow-hidden">
            <div
              className="flex animate-scroll"
              style={{
                width: "max-content",
                animationDuration: `${speed}s`,
                animationPlayState: isPaused ? "paused" : "running",
              }}
            >
              {/* First instance of content */}
              {renderScrollingContent()}

              {/* Duplicate for seamless loop */}
              <div className="ml-8 md:ml-12">{renderScrollingContent()}</div>

              {/* Third instance to ensure smooth looping */}
              <div className="ml-8 md:ml-12">{renderScrollingContent()}</div>

              {/* Fourth instance for extra smooth infinite loop */}
              <div className="ml-8 md:ml-12">{renderScrollingContent()}</div>
            </div>
          </div>

          {/* Fade edges for smooth appearance */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-24 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-24 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }

        .animate-scroll {
          animation: scroll linear infinite;
        }
      `}</style>
    </div>
  )
}