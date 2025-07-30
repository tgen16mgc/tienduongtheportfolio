'use client';

import GlassmorphicContact from '../../components/ui/GlassmorphicContact';
import FAQSection from '../../components/ui/faq-section';
import { useParallax } from '../../hooks/useParallax';

export default function ContactPage() {
  const parallaxOffset = useParallax(0.2);

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Mesh Background with Parallax */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/15 via-black/90 to-black animate-mesh motion-reduce:animate-none"
        style={{
          transform: `translateY(${parallaxOffset}px)`
        }}
      >
        {/* Essential Mesh Nodes */}
        <div className="absolute inset-0 transform-gpu" style={{ contain: 'layout style paint' }}>
          <div className="absolute w-[800px] md:w-[1000px] h-[800px] md:h-[1000px] -top-1/2 -left-1/2 bg-white/2 md:bg-white/3 rounded-full blur-3xl animate-mesh-node-1 will-change-transform transform-gpu motion-reduce:animate-none" style={{ contain: 'layout' }}></div>
          <div className="absolute w-[900px] md:w-[1200px] h-[900px] md:h-[1200px] -top-1/2 -right-1/2 bg-white/2 md:bg-white/3 rounded-full blur-3xl animate-mesh-node-2 will-change-transform transform-gpu motion-reduce:animate-none" style={{ contain: 'layout' }}></div>
          <div className="absolute w-[1000px] md:w-[1500px] h-[1000px] md:h-[1500px] -bottom-1/2 -left-1/2 bg-white/2 md:bg-white/3 rounded-full blur-3xl animate-mesh-node-3 will-change-transform transform-gpu motion-reduce:animate-none" style={{ contain: 'layout' }}></div>
        </div>

        {/* Content Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60 transform-gpu" style={{ contain: 'layout style paint' }}></div>
      </div>

      {/* Contact Component */}
      <div className="relative z-10">
        <GlassmorphicContact />
      </div>

      {/* Star Divider */}
      <div className="relative z-10 flex justify-center items-center py-8">
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
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 mt-8">
        <FAQSection />
      </div>

      <style jsx>{`
        @keyframes mesh-node-1 {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          33% { transform: translate(-45%, -55%) rotate(120deg); }
          66% { transform: translate(-55%, -45%) rotate(240deg); }
        }
        
        @keyframes mesh-node-2 {
          0%, 100% { transform: translate(50%, -50%) rotate(0deg); }
          33% { transform: translate(55%, -45%) rotate(-120deg); }
          66% { transform: translate(45%, -55%) rotate(-240deg); }
        }
        
        @keyframes mesh-node-3 {
          0%, 100% { transform: translate(-50%, 50%) rotate(0deg); }
          33% { transform: translate(-55%, 45%) rotate(120deg); }
          66% { transform: translate(-45%, 55%) rotate(240deg); }
        }

        .animate-mesh-node-1 { animation: mesh-node-1 20s ease-in-out infinite; }
        .animate-mesh-node-2 { animation: mesh-node-2 25s ease-in-out infinite; }
        .animate-mesh-node-3 { animation: mesh-node-3 30s ease-in-out infinite; }
      `}</style>
    </main>
  );
}
