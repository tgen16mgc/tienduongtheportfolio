'use client';

import { useState } from 'react';
import FullScreenMenu from './FullScreenMenu';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-6 w-6 flex-col justify-between"
        aria-label="Open menu"
      >
        <span className="h-0.5 w-full bg-white"></span>
        <span className="h-0.5 w-full bg-white"></span>
        <span className="h-0.5 w-full bg-white"></span>
      </button>

      <FullScreenMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default HamburgerMenu; 