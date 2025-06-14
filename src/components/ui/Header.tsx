'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const headerVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
  };

  const navItemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-all duration-300 ${
        scrolled ? 'bg-white/80 dark:bg-dark/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
      initial="initial"
      animate="animate"
      variants={headerVariants}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          className="text-2xl font-bold text-primary"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">Portfolio</Link>
        </motion.div>
        
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item, i) => (
            <motion.div
              key={item.name}
              custom={i}
              variants={navItemVariants}
              initial="initial"
              animate="animate"
            >
              <Link 
                href={item.href}
                className="text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>
        
        <motion.button
          className="md:hidden text-gray-800 dark:text-gray-200"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header; 