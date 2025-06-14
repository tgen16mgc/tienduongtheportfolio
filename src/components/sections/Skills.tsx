'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  icon?: string;
}

const frontendSkills: Skill[] = [
  { name: 'HTML/CSS', level: 90 },
  { name: 'JavaScript', level: 85 },
  { name: 'React', level: 85 },
  { name: 'TypeScript', level: 80 },
  { name: 'Next.js', level: 75 },
  { name: 'Tailwind CSS', level: 90 },
];

const designSkills: Skill[] = [
  { name: 'UI/UX Design', level: 85 },
  { name: 'Figma', level: 90 },
  { name: 'Adobe XD', level: 75 },
  { name: 'Photoshop', level: 70 },
  { name: 'Illustrator', level: 65 },
  { name: 'Motion Design', level: 80 },
];

const otherSkills: Skill[] = [
  { name: 'Node.js', level: 70 },
  { name: 'Express', level: 65 },
  { name: 'MongoDB', level: 60 },
  { name: 'GraphQL', level: 55 },
  { name: 'Git', level: 80 },
  { name: 'Responsive Design', level: 95 },
];

const Skills: React.FC = () => {
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
    <section id="skills" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block py-1 px-3 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Skills
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            My <span className="text-primary">Expertise</span>
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I specialize in creating beautiful and functional websites with modern technologies and frameworks.
          </motion.p>
        </div>
        
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Frontend Skills */}
          <motion.div 
            className="bg-white dark:bg-dark rounded-xl p-8 shadow-md"
            variants={itemVariants}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Frontend</h3>
              <p className="text-gray-700 dark:text-gray-300">Modern frontend development with focus on performance and animations.</p>
            </div>
            
            <div className="space-y-4">
              {frontendSkills.map((skill, index) => (
                <SkillBar key={index} skill={skill} delay={index * 0.1} />
              ))}
            </div>
          </motion.div>
          
          {/* Design Skills */}
          <motion.div 
            className="bg-white dark:bg-dark rounded-xl p-8 shadow-md"
            variants={itemVariants}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Design</h3>
              <p className="text-gray-700 dark:text-gray-300">UI/UX design with attention to detail and user experience.</p>
            </div>
            
            <div className="space-y-4">
              {designSkills.map((skill, index) => (
                <SkillBar key={index} skill={skill} delay={index * 0.1} />
              ))}
            </div>
          </motion.div>
          
          {/* Other Skills */}
          <motion.div 
            className="bg-white dark:bg-dark rounded-xl p-8 shadow-md"
            variants={itemVariants}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Other</h3>
              <p className="text-gray-700 dark:text-gray-300">Additional skills that complement my development process.</p>
            </div>
            
            <div className="space-y-4">
              {otherSkills.map((skill, index) => (
                <SkillBar key={index} skill={skill} delay={index * 0.1} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

interface SkillBarProps {
  skill: Skill;
  delay: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, delay }) => {
  const barRef = useRef(null);
  const isInView = useInView(barRef, { once: true });
  
  return (
    <div ref={barRef} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium">{skill.name}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default Skills; 