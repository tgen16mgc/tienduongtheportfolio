'use client';

import ProfileCard from '@/components/ui/ProfileCard';

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
        <section className="h-screen w-full flex items-center justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">My Portfolio</h1>
            <ProfileCard />
          </div>
        </section>
        <section className="h-screen w-full"></section>
      </div>
    </main>
  );
} 