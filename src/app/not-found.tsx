'use client';

import Link from 'next/link';
import { useParallax } from '../hooks/useParallax';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const parallaxOffset = useParallax(0.2);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
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

        {/* Interactive mouse tracking element */}
        <div 
          className="absolute w-[600px] h-[600px] bg-white/1 rounded-full blur-3xl pointer-events-none transition-all duration-700 ease-out"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Content Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60 transform-gpu" style={{ contain: 'layout style paint' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-[3%] max-w-4xl mx-auto">
        {/* Large 404 Number */}
        <div className="relative mb-8 md:mb-12">
          <h1 
            className="font-['Rethink_Sans'] font-extrabold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-[0.8]"
            style={{ 
              fontSize: 'clamp(120px, 25vw, 300px)',
              textShadow: '0 0 40px rgba(255, 255, 255, 0.3)'
            }}
          >
            404
          </h1>
          
          {/* Glowing accent line */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
        </div>

        {/* Error Message */}
        <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
          <h2 
            className="font-['Rethink_Sans'] font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}
          >
            Page Not Found
          </h2>
          
          <p 
            className="text-gray-300 font-['Rethink_Sans'] leading-relaxed max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(16px, 2.5vw, 20px)' }}
          >
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry though, every great journey has a few detours.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          {/* Primary CTA - Go Home */}
          <Link 
            href="/"
            className="group relative flex justify-center items-center bg-gradient-to-b from-white/10 to-white/5 shadow-[0px_0px_1.956px_0.098px_rgba(255,255,255,0.30)_inset] backdrop-blur-[5.868px] hover:shadow-[0px_0px_3.912px_0.196px_rgba(255,255,255,0.50)_inset] transition-all duration-300 overflow-hidden"
            style={{ 
              minWidth: 'clamp(140px, 20vw, 200px)',
              height: 'clamp(48px, 8vh, 64px)',
              padding: 'clamp(12px, 2vh, 20px) clamp(20px, 3vw, 40px)',
              borderRadius: 'clamp(24px, 5vw, 32px)'
            }}
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-white/5 via-white/10 to-white/5 pointer-events-none"></div>
            
            <span 
              className="text-white relative z-10 font-['Rethink_Sans'] font-medium"
              style={{ fontSize: 'clamp(14px, 2vw, 18px)' }}
            >
              Take Me Home
            </span>
          </Link>

          {/* Secondary CTA - Go Back */}
          <button 
            onClick={() => window.history.back()}
            className="group relative flex justify-center items-center bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            style={{ 
              minWidth: 'clamp(120px, 18vw, 180px)',
              height: 'clamp(48px, 8vh, 64px)',
              padding: 'clamp(12px, 2vh, 20px) clamp(20px, 3vw, 40px)',
              borderRadius: 'clamp(24px, 5vw, 32px)'
            }}
          >
            <span 
              className="text-white/80 group-hover:text-white relative z-10 font-['Rethink_Sans'] font-medium transition-colors duration-300"
              style={{ fontSize: 'clamp(14px, 2vw, 18px)' }}
            >
              Go Back
            </span>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 md:mt-16 flex items-center justify-center space-x-8 opacity-40">
          {/* Animated dots */}
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-2 h-2 bg-white rounded-full animate-pulse"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
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