'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const MobileFloatingNav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Navigation items for quick mobile access
  const navItems = [
    { name: 'About', href: '#about', icon: '👤' },
    { name: 'Projects', href: '#projects', icon: '💼' },
    { name: 'Skills', href: '#skills', icon: '⚡' },
    { name: 'Contact', href: '#contact', icon: '📧' },
  ];

  // Touch device detection
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    
    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  // Show floating nav after scrolling past hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > window.innerHeight * 0.3;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only show on touch devices
  if (!isTouchDevice) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40"
        >
          <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-3 shadow-xl">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="min-w-[44px] min-h-[44px] flex flex-col items-center justify-center rounded-full transition-all duration-200 active:scale-95 active:bg-white/10"
                onClick={() => {
                  // Smooth scroll to section
                  const element = document.querySelector(item.href);
                  if (element) {
                    element.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center gap-1"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-white text-[10px] font-medium leading-none">
                    {item.name}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileFloatingNav; 