'use client';

import { useState, useRef, useEffect, RefObject } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FullScreenMenu from './FullScreenMenu';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const contactButtonRef = useRef<HTMLAnchorElement>(null);
  const animationFrameRef = useRef<number>();
  const lastPositionRef = useRef({ x: 0, y: 0 });

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (contactButtonRef.current && isHovering) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const rect = contactButtonRef.current!.getBoundingClientRect();
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
      if (contactButtonRef.current) {
        const rect = contactButtonRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        lastPositionRef.current = { x: centerX, y: centerY };
        setMousePosition({ x: centerX, y: centerY });
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      if (contactButtonRef.current) {
        const rect = contactButtonRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        lastPositionRef.current = { x: centerX, y: centerY };
        setMousePosition({ x: centerX, y: centerY });
      }
    };

    const button = contactButtonRef.current;
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

  const iconVariants = {
    closed: {
      d: "M0 2h20M0 9h20M0 16h20",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    open: {
      d: "M2 2l16 16M2 18l16-16",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full h-[98px] px-4 md:px-8 lg:px-[52px] py-[23px] bg-transparent backdrop-blur-sm flex flex-col items-start gap-[10px] z-50">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center w-full">
          {/* Logo */}
          <Link href="/" className="text-[#FFF] font-jakarta-sans text-[20px] md:text-[23.537px] font-semibold leading-[105%] tracking-[-0.706px] whitespace-nowrap">
            Tien Duong Ngoc
          </Link>

          {/* Right Frame */}
          <div className="flex items-center gap-4 md:gap-[42px]">
            {/* Glass Box with Dynamic Glow */}
            <Link 
              href="/contact"
              ref={contactButtonRef}
              className="relative min-w-[100px] md:min-w-[126.1px] h-[52px] px-4 md:px-[26px] py-[15px] flex justify-center items-center rounded-[31.2px] bg-gradient-to-b from-black/50 to-[#181818]/50 shadow-[0px_0px_1.956px_0.098px_rgba(255,255,255,0.50)_inset] backdrop-blur-[5.868px] group cursor-pointer overflow-hidden transition-all duration-300"
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
              <span className="text-white font-jakarta-sans text-sm md:text-base relative z-10">Contact</span>
            </Link>

            {/* Hamburger Icon */}
            <motion.button
              onClick={() => setIsMenuOpen(true)}
              className="w-[20px] h-[20px] flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Toggle menu"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <motion.path
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={iconVariants}
                  initial="closed"
                  animate={isMenuOpen ? "open" : "closed"}
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </nav>

      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Navigation; 