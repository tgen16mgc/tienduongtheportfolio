'use client';

import ProfileCard from '../components/ui/ProfileCard';
import HeroIntroduction from '../components/sections/HeroIntroduction';
import SectionDivider from '../components/ui/SectionDivider';
import TitleSection from '../components/ui/TitleSection';
import Carousel from '../components/ui/Carousel';
import { useParallax } from '../hooks/useParallax';

export default function Home() {
  const parallaxOffset = useParallax(0.3) // Slower parallax for background depth
  const contentParallax = useParallax(0.1) // Subtle content parallax

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Mesh Background with Parallax - Mobile-optimized for content prioritization */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-black/80 to-black animate-mesh motion-reduce:animate-none parallax-element"
        style={{
          transform: `translateY(${parallaxOffset}px)`
        }}
      >
        {/* Essential Mesh Nodes - Reduced complexity on mobile */}
        <div className="absolute inset-0 transform-gpu" style={{ contain: 'layout style paint' }}>
          {/* Primary Nodes - Always visible but mobile-optimized */}
          <div className="absolute w-[800px] md:w-[1000px] h-[800px] md:h-[1000px] -top-1/2 -left-1/2 bg-white/2 md:bg-white/3 rounded-full blur-3xl animate-mesh-node-1 will-change-transform transform-gpu motion-reduce:animate-none" style={{ contain: 'layout' }}></div>
          <div className="absolute w-[900px] md:w-[1200px] h-[900px] md:h-[1200px] -top-1/2 -right-1/2 bg-white/2 md:bg-white/3 rounded-full blur-3xl animate-mesh-node-2 will-change-transform transform-gpu motion-reduce:animate-none" style={{ contain: 'layout' }}></div>
          <div className="absolute w-[1000px] md:w-[1500px] h-[1000px] md:h-[1500px] -bottom-1/2 -left-1/2 bg-white/2 md:bg-white/3 rounded-full blur-3xl animate-mesh-node-3 will-change-transform transform-gpu motion-reduce:animate-none" style={{ contain: 'layout' }}></div>
          
          {/* Secondary Nodes - Reduced on mobile for content focus */}
          <div className="hidden sm:block absolute w-[800px] md:w-[1100px] h-[800px] md:h-[1100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/2 md:bg-white/3 rounded-full blur-3xl animate-mesh-node-5 will-change-transform transform-gpu motion-reduce:animate-none" style={{ contain: 'layout' }}></div>
          <div className="hidden md:block absolute w-[700px] lg:w-[900px] h-[700px] lg:h-[900px] top-0 left-1/4 bg-white/2 lg:bg-white/3 rounded-full blur-3xl animate-mesh-node-6 will-change-transform transform-gpu motion-reduce:animate-none" style={{ contain: 'layout' }}></div>
          <div className="hidden md:block absolute w-[500px] lg:w-[700px] h-[500px] lg:h-[700px] bottom-0 right-1/4 bg-white/2 lg:bg-white/3 rounded-full blur-3xl animate-mesh-node-7 will-change-transform transform-gpu motion-reduce:animate-none" style={{ contain: 'layout' }}></div>
          
          {/* Tertiary Nodes - Desktop only to prioritize mobile content readability */}
          <div className="hidden lg:block absolute w-[600px] h-[600px] top-1/4 right-0 bg-white/3 rounded-full blur-3xl animate-mesh-node-8 will-change-transform transform-gpu motion-reduce:animate-none" style={{ contain: 'layout' }}></div>
          <div className="hidden lg:block absolute w-[500px] h-[500px] bottom-1/4 left-0 bg-white/3 rounded-full blur-3xl animate-mesh-node-9 will-change-transform transform-gpu motion-reduce:animate-none" style={{ contain: 'layout' }}></div>
          <div className="hidden lg:block absolute w-[400px] h-[400px] top-0 right-1/3 bg-white/3 rounded-full blur-3xl animate-mesh-node-10 will-change-transform transform-gpu motion-reduce:animate-none" style={{ contain: 'layout' }}></div>
          <div className="hidden xl:block absolute w-[450px] h-[450px] bottom-0 left-1/3 bg-white/3 rounded-full blur-3xl animate-mesh-node-11 will-change-transform transform-gpu motion-reduce:animate-none" style={{ contain: 'layout' }}></div>
          <div className="hidden xl:block absolute w-[550px] h-[550px] top-1/3 -right-1/4 bg-white/3 rounded-full blur-3xl animate-mesh-node-12 will-change-transform transform-gpu motion-reduce:animate-none" style={{ contain: 'layout' }}></div>
          <div className="hidden xl:block absolute w-[650px] h-[650px] -bottom-1/4 left-1/2 bg-white/3 rounded-full blur-3xl animate-mesh-node-13 will-change-transform transform-gpu motion-reduce:animate-none" style={{ contain: 'layout' }}></div>
        </div>
        
        {/* Glow Effects - Reduced on mobile for content focus */}
        <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_70%)] md:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)] mix-blend-overlay transform-gpu motion-reduce:hidden" style={{ contain: 'layout style' }}></div>
        <div className="hidden md:block absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.05),transparent_70%)] mix-blend-overlay transform-gpu motion-reduce:hidden" style={{ contain: 'layout style' }}></div>
        
        {/* Ambient Light Effects - Desktop only for mobile content prioritization */}
        <div className="hidden lg:block absolute inset-0 transform-gpu motion-reduce:hidden" style={{ contain: 'layout style' }}>
          <div className="absolute w-[2000px] h-[2000px] -top-1/2 -left-1/2 bg-gradient-to-br from-white/2 to-transparent rounded-full blur-[100px] animate-ambient-1 will-change-transform transform-gpu motion-reduce:animate-none" style={{ contain: 'layout' }}></div>
          <div className="absolute w-[2000px] h-[2000px] -bottom-1/2 -right-1/2 bg-gradient-to-tl from-white/2 to-transparent rounded-full blur-[100px] animate-ambient-2 will-change-transform transform-gpu motion-reduce:animate-none" style={{ contain: 'layout' }}></div>
        </div>

        {/* Noise Texture - Reduced opacity on mobile */}
        <div className="absolute inset-0 opacity-[0.01] md:opacity-[0.02] mix-blend-overlay transform-gpu">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbXVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
        </div>
        
        {/* Content-Prioritized Overlay Gradient - Enhanced contrast on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 md:via-black/30 to-black transform-gpu" style={{ contain: 'layout style paint' }}></div>
      </div>

      {/* Content Sections with Subtle Parallax */}
      <div 
        className="relative z-10 parallax-element"
        style={{
          transform: `translateY(${contentParallax * -0.5}px)`
        }}
      >
        {/* Responsive container for all sections */}
        <div className="w-full max-w-[1600px] mx-auto px-[3%]">
          <section id="hero" className="w-full" style={{ paddingTop: 'clamp(calc(5vh + 24px), calc(5vh + 32px), calc(5vh + 40px))', paddingBottom: 'clamp(2rem, 4vh, 3rem)' }}>
          {/* Main container - Mobile-first responsive */}
          <div className="w-full">
            {/* Main layout - Progressive responsive breakpoints */}
            <div 
              className="flex flex-col md:flex-row xl:flex-row w-full items-start md:items-start xl:justify-between"
              style={{
                gap: 'clamp(2rem, 6vw, 3rem)'
              }}
            >
              {/* Left side: Content and ProfileCard - Mobile-optimized */}
              <div
                className="flex flex-col items-start w-full md:w-auto md:flex-shrink-0 md:min-w-0"
                style={{
                  maxWidth: 'min(100%, 500px)', // Responsive max-width
                  gap: 'clamp(1.5rem, 4vw, 1.5rem)'
              }}
            >
              {/* Text content box - Mobile-responsive spacing */}
              <div 
                className="flex flex-col items-start self-stretch"
                style={{
                  gap: 'clamp(0.75rem, 3vw, 0.875rem)'
                }}
              >
                {/* Marketer title with (n) */}
                <div 
                  style={{
                    alignSelf: 'stretch',
                    display: 'flex',
                    alignItems: 'baseline'
                  }}
                >
                  <span 
                    style={{
                      color: '#FFF',
                      fontFamily: '"Rethink Sans", sans-serif',
                      fontSize: '44px',
                      fontStyle: 'normal',
                      fontWeight: 600,
                      lineHeight: '105%',
                      letterSpacing: '-1.32px'
                    }}
                  >
                    Marketer.
                  </span>
                  <span 
                    style={{
                      color: '#FFF',
                      fontFamily: '"Rethink Sans", sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 600,
                      lineHeight: '105%',
                      letterSpacing: '-0.42px',
                      marginLeft: '4px'
                    }}
                  >
                    (n)
                  </span>
                </div>

                {/* Qualities list */}
                <div 
                  className="flex flex-col items-start"
                  style={{
                    width: 'clamp(130px, 35vw, 142px)',
                    gap: 'clamp(2px, 1vw, 3px)'
                  }}
                >
                  {['Purposeful', 'Mindful', 'Wild', 'Hungry', 'Relentless', 'Thrive on challenges'].map((quality, index) => (
                    <div 
                      key={index}
                      className="self-stretch text-white font-['Rethink_Sans']"
                      style={{
                        fontSize: 'clamp(14px, 4vw, 16px)',
                        fontWeight: 400,
                        lineHeight: 'clamp(1.1, 1.15, 1.05)',
                        letterSpacing: 'clamp(-0.3px, -0.02em, -0.48px)'
                      }}
                    >
                      {quality}
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile Card - Mobile-responsive positioning */}
              <div className="w-full flex justify-center sm:justify-start">
                <ProfileCard />
              </div>
              </div>

              {/* Right side: Hero Introduction - Mobile-optimized */}
              <div
                className="w-full md:flex-1 flex items-start justify-start md:justify-center xl:justify-end"
                style={{
                  maxWidth: '100%',
                  overflow: 'hidden'
                }}
              >
                <div className="w-full" style={{ maxWidth: 'clamp(100%, 90vw, 900px)' }}>
                  <HeroIntroduction />
                </div>
              </div>
            </div>
          </div>
          </section>
        </div>

        {/* Section Divider - Full width outside container */}
        <div style={{ marginTop: 'clamp(8vh, 12vh, 16vh)' }} className="w-full">
          <SectionDivider />
        </div>

        {/* Responsive container for remaining sections */}
        <div className="w-full max-w-[1600px] mx-auto px-[3%]">
          {/* Interactive Title Section - Proportional spacing */}
          <div style={{ marginTop: 'clamp(6vh, 8vh, 10vh)' }}>
            <TitleSection title="Featured Projects" />
          </div>

          {/* Projects Carousel - Proportional spacing */}
          <section className="w-full" style={{ marginTop: 'clamp(4vh, 6vh, 8vh)' }}>
            <Carousel />
          </section>
        </div>
      </div>
    </main>
  );
} 
