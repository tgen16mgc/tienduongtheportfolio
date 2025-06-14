'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current && circleRef.current) {
      const heroElement = heroRef.current;
      const circleElement = circleRef.current;
      
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = heroElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const moveX = (clientX - centerX) * 0.02;
        const moveY = (clientY - centerY) * 0.02;
        
        gsap.to(circleElement, {
          x: moveX,
          y: moveY,
          duration: 1,
          ease: 'power2.out',
        });
      };
      
      heroElement.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      ref={heroRef}
    >
      {/* Background animated circle */}
      <div 
        ref={circleRef}
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 blur-[80px]"
      />
      
      <motion.div
        className="container mx-auto px-6 py-24 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex flex-col items-center text-center"
          variants={containerVariants}
        >
          <motion.p 
            className="text-lg md:text-xl mb-4 text-primary font-mono"
            variants={itemVariants}
          >
            Hello, I'm
          </motion.p>
          
          <motion.h1 
            className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
            variants={itemVariants}
          >
            Your Name
          </motion.h1>
          
          <motion.h2 
            className="text-2xl md:text-4xl font-semibold mb-8"
            variants={itemVariants}
          >
            Creative Developer & Designer
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg max-w-xl mb-10 text-gray-700 dark:text-gray-300"
            variants={itemVariants}
          >
            I create stunning digital experiences with beautiful animations and
            intuitive user interfaces. Let's bring your vision to life.
          </motion.p>
          
          <motion.div 
            className="flex space-x-4"
            variants={itemVariants}
          >
            <motion.a
              href="#projects"
              className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/80 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            
            <motion.a
              href="#contact"
              className="px-8 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary/10 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: {
            delay: 1.5,
            duration: 1,
          }
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll Down</span>
          <motion.div 
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2"
            initial={{ opacity: 0.5 }}
            animate={{ 
              opacity: [0.5, 1, 0.5], 
              transition: { 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop" 
              } 
            }}
          >
            <motion.div 
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{ 
                y: [0, 12, 0], 
                transition: { 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatType: "loop" 
                } 
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 