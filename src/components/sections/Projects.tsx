'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Website',
    category: 'Web Development',
    description: 'A modern e-commerce platform with animations and smooth transitions.',
    imageUrl: undefined,
    link: '#',
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    category: 'UI/UX Design',
    description: 'Intuitive mobile banking application with clean interface and animations.',
    imageUrl: undefined,
    link: '#',
  },
  {
    id: 3,
    title: 'Portfolio Website',
    category: 'Web Development',
    description: 'Creative portfolio website with 3D elements and interactive animations.',
    imageUrl: undefined,
    link: '#',
  },
  {
    id: 4,
    title: 'Fitness Tracking App',
    category: 'Mobile Development',
    description: 'Track your fitness journey with this beautiful and animated mobile app.',
    imageUrl: undefined,
    link: '#',
  },
  {
    id: 5,
    title: 'Restaurant Booking System',
    category: 'Web Application',
    description: 'Online booking system with interactive calendar and real-time updates.',
    imageUrl: undefined,
    link: '#',
  },
  {
    id: 6,
    title: 'Travel Blog',
    category: 'Web Development',
    description: 'Travel blog with stunning animations and visual storytelling.',
    imageUrl: undefined,
    link: '#',
  },
];

const Projects: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block py-1 px-3 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Work
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Featured <span className="text-primary">Projects</span>
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore my latest work showcasing creative design and development skills with beautiful animations and interactions.
          </motion.p>
        </div>
        
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} variants={itemVariants} />
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/80 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  variants: any;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, variants }) => {
  return (
    <motion.div
      className="group bg-white dark:bg-dark rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      variants={variants}
      whileHover={{ y: -10 }}
    >
      <div className="relative h-60 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        {project.imageUrl ? (
          <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">Project Image</span>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">Project Image</span>
          </div>
        )}
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <a 
            href={project.link}
            className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition-all duration-300"
          >
            View Project
          </a>
        </motion.div>
      </div>
      
      <div className="p-6">
        <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-2 py-1">
          {project.category}
        </span>
        
        <h3 className="text-xl font-bold mt-3 mb-2">
          {project.title}
        </h3>
        
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

export default Projects; 