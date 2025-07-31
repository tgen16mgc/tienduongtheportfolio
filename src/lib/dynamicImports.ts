// Dynamic import utilities for heavy libraries
// This helps reduce initial bundle size by loading libraries only when needed

export const loadGSAP = async () => {
  try {
    const { default: gsap } = await import('gsap');
    return gsap;
  } catch (error) {
    console.error('Failed to load GSAP:', error);
    return null;
  }
};

export const loadFramerMotion = async () => {
  try {
    const { motion, AnimatePresence, useInView } = await import('framer-motion');
    return { motion, AnimatePresence, useInView };
  } catch (error) {
    console.error('Failed to load Framer Motion:', error);
    return null;
  }
};



// Preload critical libraries for better performance
export const preloadCriticalLibraries = () => {
  // Preload GSAP for hero animations
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'script';
    link.href = '/_next/static/chunks/gsap.js';
    document.head.appendChild(link);
  }
}; 