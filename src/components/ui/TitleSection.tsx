"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface TitleSectionProps {
  title?: string
  className?: string
}

export default function TitleSection({
  title = "Feature Projects",
  className = "",
}: TitleSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false)
  
  // Button animation states
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const animationFrameRef = useRef<number>();
  const lastPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      const container = canvas.parentElement
      if (container) {
        // Canvas is expanded by 120px in both dimensions for particle overflow
        canvas.width = container.offsetWidth + 120
        canvas.height = container.offsetHeight + 120
      } else {
        canvas.width = window.innerWidth
        // Calculate responsive height based on clamp(160px, 20vh, 240px)
        const vh = window.innerHeight / 100
        canvas.height = Math.max(160, Math.min(20 * vh, 240)) + 120
      }
      setIsMobile(window.innerWidth < 768) // Set mobile breakpoint
      setIsTabletOrMobile(window.innerWidth <= 1024) // Set tablet/mobile breakpoint
    }

    updateCanvasSize()

    let particles: {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      color: string
      scatteredColor: string
      life: number
      isAWS: boolean
    }[] = []

    let textImageData: ImageData | null = null

    function createTextImage() {
      if (!ctx || !canvas) return 0

      ctx.fillStyle = "white"
      ctx.save()

      const fontSize = isMobile ? 72 : 96
      // Use Rethink Sans font in BOLD to match global theme
      ctx.font = `bold ${fontSize}px "Rethink Sans", Arial, sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Text is centered in the expanded canvas (which is centered over the container)
      const x = canvas.width / 2
      const y = canvas.height / 2

      // Break into 2 lines on mobile/tablet (md breakpoint and below)      
      if (isTabletOrMobile && title === "Featured Projects") {
        const lineHeight = fontSize * 0.8  // Smaller gap between lines
        const line1 = "Featured"
        const line2 = "Projects"
        
        ctx.fillText(line1, x, y - lineHeight / 2)
        ctx.fillText(line2, x, y + lineHeight / 2)
      } else {
        ctx.fillText(title, x, y)
      }
      
      ctx.restore()

      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      return fontSize / 96 // Return scale factor adjusted for even larger font sizes
    }

    function createParticle(scale: number) {
      if (!ctx || !canvas || !textImageData) return null

      const data = textImageData.data

      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * canvas.width)
        const y = Math.floor(Math.random() * canvas.height)

        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          return {
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            size: Math.random() * 0.8 + 0.3,
            color: "white",
            scatteredColor: "#FFFFFF",
            isAWS: false,
            life: Math.random() * 100 + 50,
          }
        }
      }

      return null
    }

    function createInitialParticles(scale: number) {
      if (!canvas) return
      const baseParticleCount = 20000 // 2x denser for crystal clear text
      const particleCount = Math.floor(baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)))
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle(scale)
        if (particle) particles.push(particle)
      }
    }

    let animationFrameId: number

    function animate(scale: number) {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Remove black background to use global background

      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const maxDistance = 240

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance && (isTouchingRef.current || !("ontouchstart" in window))) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          const moveX = Math.cos(angle) * force * 60
          const moveY = Math.sin(angle) * force * 60
          p.x = p.baseX - moveX
          p.y = p.baseY - moveY

          // Save canvas state and add glowing effect
          ctx.save()
          ctx.shadowColor = "#FFFFFF"
          ctx.shadowBlur = 15
          ctx.fillStyle = "#FFFFFF"
          ctx.fillRect(p.x, p.y, p.size, p.size)
          ctx.restore()
        } else {
          p.x += (p.baseX - p.x) * 0.1
          p.y += (p.baseY - p.y) * 0.1
          // Normal particles without glow
          ctx.save()
          ctx.shadowColor = "transparent"
          ctx.shadowBlur = 0
          ctx.fillStyle = "white"
          ctx.fillRect(p.x, p.y, p.size, p.size)
          ctx.restore()
        }

        p.life--
        if (p.life <= 0) {
          const newParticle = createParticle(scale)
          if (newParticle) {
            particles[i] = newParticle
          } else {
            particles.splice(i, 1)
            i--
          }
        }
      }

      if (!canvas) return
      const baseParticleCount = 20000
      const targetParticleCount = Math.floor(
        baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)),
      )
      while (particles.length < targetParticleCount) {
        const newParticle = createParticle(scale)
        if (newParticle) particles.push(newParticle)
      }

      animationFrameId = requestAnimationFrame(() => animate(scale))
    }

    const scale = createTextImage()
    createInitialParticles(scale)
    animate(scale)

    const handleResize = () => {
      updateCanvasSize()
      const newScale = createTextImage()
      particles = []
      createInitialParticles(newScale)
    }

    const handleMove = (x: number, y: number) => {
      mousePositionRef.current = { x, y }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      handleMove(e.clientX - rect.left, e.clientY - rect.top)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!canvas) return
      if (e.touches.length > 0) {
        e.preventDefault()
        const rect = canvas.getBoundingClientRect()
        handleMove(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top)
      }
    }

    const handleTouchStart = () => {
      isTouchingRef.current = true
    }

    const handleTouchEnd = () => {
      isTouchingRef.current = false
      mousePositionRef.current = { x: 0, y: 0 }
    }

    const handleMouseLeave = () => {
      if (!("ontouchstart" in window)) {
        mousePositionRef.current = { x: 0, y: 0 }
      }
    }

    window.addEventListener("resize", handleResize)
    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove)
      canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
      canvas.addEventListener("mouseleave", handleMouseLeave)
      canvas.addEventListener("touchstart", handleTouchStart)
      canvas.addEventListener("touchend", handleTouchEnd)
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove)
        canvas.removeEventListener("touchmove", handleTouchMove)
        canvas.removeEventListener("mouseleave", handleMouseLeave)
        canvas.removeEventListener("touchstart", handleTouchStart)
        canvas.removeEventListener("touchend", handleTouchEnd)
      }
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile, isTabletOrMobile, title])

  // Button animation logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (buttonRef.current && isHovering) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const rect = buttonRef.current!.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Smooth interpolation between last position and new position
          const lastPos = lastPositionRef.current;
          const newX = lastPos.x + (x - lastPos.x) * 0.3;
          const newY = lastPos.y + (y - lastPos.y) * 0.3;

          lastPositionRef.current = { x: newX, y: newY };
          setMousePosition({ x: newX, y: newY });
        });
      }
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        lastPositionRef.current = { x: centerX, y: centerY };
        setMousePosition({ x: centerX, y: centerY });
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        lastPositionRef.current = { x: centerX, y: centerY };
        setMousePosition({ x: centerX, y: centerY });
      }
    };

    const button = buttonRef.current;
    if (button) {
      button.addEventListener('mousemove', handleMouseMove);
      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        button.removeEventListener('mousemove', handleMouseMove);
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [isHovering]);

  // Button animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };

  // DiamondStar component from SectionDivider
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

  return (
    <div className={`relative w-full flex flex-col items-center justify-center ${className}`}>
      {/* Interactive Title Canvas - Overflow for particle effects */}
      <div 
        className="relative w-full flex flex-col items-center justify-center"
        style={{ 
          height: 'clamp(160px, 20vh, 240px)',
          overflow: 'visible'
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 touch-none bg-transparent"
          style={{ 
            backgroundColor: 'transparent',
            width: 'calc(100% + 120px)',
            height: 'calc(100% + 120px)'
          }}
          aria-label={`Interactive particle effect with ${title}`}
        />
      </div>
      
      {/* Plain Text Subtitle - Responsive spacing */}
      <div style={{ marginTop: 'clamp(0.5rem, 1.5vh, 1rem)' }} className="text-center">
        <p className="text-white/80 font-['Rethink_Sans'] font-normal" style={{ fontSize: 'clamp(14px, 2vw, 18px)' }}>
          Some works picked for showcase
        </p>
      </div>
      
      {/* DiamondStar - Responsive spacing */}
      <div 
        style={{ 
          marginTop: 'clamp(1.5rem, 3vh, 2.5rem)',
          marginBottom: 'clamp(1rem, 2vh, 1.5rem)'
        }} 
        className="flex items-center justify-center"
      >
        <DiamondStar />
      </div>

      {/* View all projects button */}
      <div 
        style={{ 
          marginTop: 'clamp(1rem, 2vh, 1.5rem)'
        }} 
        className="flex items-center justify-center"
      >
        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <Link 
            href="/projects"
            ref={buttonRef}
            className="relative flex justify-center items-center bg-gradient-to-b from-black/50 to-[#181818]/50 shadow-[0px_0px_1.956px_0.098px_rgba(255,255,255,0.50)_inset] backdrop-blur-[5.868px] group cursor-pointer overflow-hidden transition-all duration-300 whitespace-nowrap"
            style={{ 
              minWidth: 'clamp(180px, 20vw, 221px)',
              height: 'clamp(35px, 5vh, 41px)',
              padding: 'clamp(8px, 1.5vh, 12px) clamp(16px, 2vw, 24px)',
              borderRadius: 'clamp(16px, 3.2vw, 26px)'
            }}
          >
            {/* Dynamic Glow Effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none will-change-transform z-0"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.25) 0%, transparent 80%)`,
                transform: 'translate(-50%, -50%)',
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                width: '300%',
                height: '300%',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            
            {/* Button Text */}
            <span className="text-white relative z-10 font-['Rethink_Sans'] whitespace-nowrap" style={{ fontSize: 'clamp(14px, 1.6vw, 18px)' }}>
              or... View all projects?
            </span>
            
            {/* Arrow Icon */}
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 relative z-10 flex-shrink-0"
            >
              <path 
                d="M6 12L10 8L6 4" 
                stroke="white" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}