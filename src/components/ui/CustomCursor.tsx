import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      mixBlendMode: 'difference' as const,
    },
    text: {
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      height: 150,
      width: 150,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      mixBlendMode: 'difference' as const,
    },
  };

  useEffect(() => {
    const textElements = document.querySelectorAll('a, button, [data-cursor="text"]');
    
    const mouseEnter = () => setCursorVariant('text');
    const mouseLeave = () => setCursorVariant('default');

    textElements.forEach((element) => {
      element.addEventListener('mouseenter', mouseEnter);
      element.addEventListener('mouseleave', mouseLeave);
    });

    return () => {
      textElements.forEach((element) => {
        element.removeEventListener('mouseenter', mouseEnter);
        element.removeEventListener('mouseleave', mouseLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className="custom-cursor fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50"
      variants={variants}
      animate={cursorVariant}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    />
  );
};

export default CustomCursor; 