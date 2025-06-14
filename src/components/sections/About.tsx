'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <section id="about" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Image with animation */}
          <motion.div 
            className="relative h-[500px] overflow-hidden rounded-2xl"
            variants={itemVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl z-10" />
            <div className="relative h-full w-full">
              {/* Replace with your image */}
              <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">Your Image Here</span>
              </div>
            </div>
            
            {/* Animated shapes */}
            <motion.div 
              className="absolute w-40 h-40 rounded-full bg-primary/20 top-10 -left-10 z-0"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div 
              className="absolute w-24 h-24 rounded-full bg-secondary/20 bottom-10 -right-10 z-0"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>
          
          {/* Content */}
          <motion.div variants={containerVariants}>
            <motion.span 
              className="inline-block py-1 px-3 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4"
              variants={itemVariants}
            >
              About Me
            </motion.span>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              variants={itemVariants}
            >
              Passionate about creating <span className="text-primary">beautiful experiences</span>
            </motion.h2>
            
            <motion.p 
              className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6"
              variants={itemVariants}
            >
              I'm a creative developer with a passion for designing and building exceptional digital experiences. With a background in both design and development, I bring a unique perspective to every project.
            </motion.p>
            
            <motion.p 
              className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-8"
              variants={itemVariants}
            >
              My goal is to create websites and applications that are not only visually stunning but also intuitive and accessible. I love working with animations and interactive elements to bring designs to life.
            </motion.p>
            
            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8"
              variants={itemVariants}
            >
              <div className="text-center p-4 bg-white dark:bg-dark rounded-lg shadow-sm">
                <h3 className="text-3xl font-bold text-primary mb-1">3+</h3>
                <p className="text-gray-600 dark:text-gray-400">Years Experience</p>
              </div>
              
              <div className="text-center p-4 bg-white dark:bg-dark rounded-lg shadow-sm">
                <h3 className="text-3xl font-bold text-primary mb-1">50+</h3>
                <p className="text-gray-600 dark:text-gray-400">Projects Completed</p>
              </div>
              
              <div className="text-center p-4 bg-white dark:bg-dark rounded-lg shadow-sm col-span-2 md:col-span-1">
                <h3 className="text-3xl font-bold text-primary mb-1">30+</h3>
                <p className="text-gray-600 dark:text-gray-400">Happy Clients</p>
              </div>
            </motion.div>
            
            <motion.a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/80 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Work Together
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 