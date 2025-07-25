'use client';

import ProfileCard from '../components/ui/ProfileCard';
import HeroIntroduction from '../components/sections/HeroIntroduction';

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-black/80 to-black animate-mesh">
        {/* Mesh Nodes */}
        <div className="absolute inset-0 transform-gpu">
          {/* Primary Nodes */}
          <div className="absolute w-[1000px] h-[1000px] -top-1/2 -left-1/2 bg-white/3 rounded-full blur-3xl animate-mesh-node-1 will-change-transform transform-gpu"></div>
          <div className="absolute w-[1200px] h-[1200px] -top-1/2 -right-1/2 bg-white/3 rounded-full blur-3xl animate-mesh-node-2 will-change-transform transform-gpu"></div>
          <div className="absolute w-[1500px] h-[1500px] -bottom-1/2 -left-1/2 bg-white/3 rounded-full blur-3xl animate-mesh-node-3 will-change-transform transform-gpu"></div>
          <div className="absolute w-[800px] h-[800px] -bottom-1/2 -right-1/2 bg-white/3 rounded-full blur-3xl animate-mesh-node-4 will-change-transform transform-gpu"></div>

          {/* Secondary Nodes */}
          <div className="absolute w-[1100px] h-[1100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/3 rounded-full blur-3xl animate-mesh-node-5 will-change-transform transform-gpu"></div>
          <div className="absolute w-[900px] h-[900px] top-0 left-1/4 bg-white/3 rounded-full blur-3xl animate-mesh-node-6 will-change-transform transform-gpu"></div>
          <div className="absolute w-[700px] h-[700px] bottom-0 right-1/4 bg-white/3 rounded-full blur-3xl animate-mesh-node-7 will-change-transform transform-gpu"></div>

          {/* Tertiary Nodes */}
          <div className="absolute w-[600px] h-[600px] top-1/4 right-0 bg-white/3 rounded-full blur-3xl animate-mesh-node-8 will-change-transform transform-gpu"></div>
          <div className="absolute w-[500px] h-[500px] bottom-1/4 left-0 bg-white/3 rounded-full blur-3xl animate-mesh-node-9 will-change-transform transform-gpu"></div>
          <div className="absolute w-[400px] h-[400px] top-0 right-1/3 bg-white/3 rounded-full blur-3xl animate-mesh-node-10 will-change-transform transform-gpu"></div>
          <div className="absolute w-[450px] h-[450px] bottom-0 left-1/3 bg-white/3 rounded-full blur-3xl animate-mesh-node-11 will-change-transform transform-gpu"></div>
          <div className="absolute w-[550px] h-[550px] top-1/3 -right-1/4 bg-white/3 rounded-full blur-3xl animate-mesh-node-12 will-change-transform transform-gpu"></div>
          <div className="absolute w-[650px] h-[650px] -bottom-1/4 left-1/2 bg-white/3 rounded-full blur-3xl animate-mesh-node-13 will-change-transform transform-gpu"></div>
        </div>

        {/* Optimized Glow Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)] mix-blend-overlay transform-gpu"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.05),transparent_70%)] mix-blend-overlay transform-gpu"></div>

        {/* Optimized Ambient Light Effects */}
        <div className="absolute inset-0 transform-gpu">
          <div className="absolute w-[2000px] h-[2000px] -top-1/2 -left-1/2 bg-gradient-to-br from-white/2 to-transparent rounded-full blur-[100px] animate-ambient-1 will-change-transform transform-gpu"></div>
          <div className="absolute w-[2000px] h-[2000px] -bottom-1/2 -right-1/2 bg-gradient-to-tl from-white/2 to-transparent rounded-full blur-[100px] animate-ambient-2 will-change-transform transform-gpu"></div>
        </div>

        {/* Optimized Noise Texture */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay transform-gpu">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
        </div>

        {/* Optimized Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black transform-gpu"></div>
      </div>

      {/* Content Sections */}
      <div className="relative z-10">
        <section className="min-h-screen w-full pt-[calc(5vh+32px)] px-[3%]">
          {/* Main flexbox container with same padding as navigation */}
          <div className="max-w-[1440px] w-full mx-auto">
            {/* Frame 1 - Horizontal layout */}
            <div
              className="flex flex-col lg:flex-row w-full items-start gap-8 lg:gap-12 lg:justify-between"
              style={{
                minHeight: 'calc(100vh - 10vh - 64px)' // Ensure full height minus padding
              }}
            >
              {/* Left side: Existing content group */}
              <div
                className="flex flex-col items-start gap-6 lg:flex-shrink-0 lg:w-auto w-full"
                style={{
                  maxWidth: '500px' // Constrain left side width
                }}
              >
                {/* Text content box */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '13px',
                    alignSelf: 'stretch'
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
                    style={{
                      display: 'flex',
                      width: '142px',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '3px'
                    }}
                  >
                    {['Purposeful', 'Mindful', 'Wild', 'Hungry', 'Relentless', 'Thrive on challenges'].map((quality, index) => (
                      <div
                        key={index}
                        style={{
                          alignSelf: 'stretch',
                          color: '#FFF',
                          fontFamily: '"Rethink Sans", sans-serif',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          lineHeight: '105%',
                          letterSpacing: '-0.48px'
                        }}
                      >
                        {quality}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Profile Card */}
                <ProfileCard />
              </div>

              {/* Right side: Hero Introduction */}
              <div
                className="flex-1 lg:flex-1 w-full lg:w-auto flex items-start justify-start lg:justify-end"
                style={{
                  maxWidth: '100%',
                  overflow: 'hidden' // Prevent horizontal overflow
                }}
              >
                <div className="w-full max-w-[800px] lg:max-w-[900px]"> {/* Responsive max-width */}
                  <HeroIntroduction />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
