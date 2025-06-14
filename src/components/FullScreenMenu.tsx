'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const FullScreenMenu = ({ isOpen, onClose }: FullScreenMenuProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigation = (path: string) => {
    onClose();
    router.push(path);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      window.location.href = href;
    }
  };

  const handleHomeClick = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    onClose();
    setTimeout(() => {
      router.push('/');
      setIsNavigating(false);
    }, 100);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const menuVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 1
      }
    }
  };

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

  const menuBarVariants = {
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

  const menuBarVariants2 = {
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

  const menuBarVariants3 = {
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

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-50 flex flex-col items-center bg-gradient-to-b from-black to-[rgba(62,62,62,0.2)]"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          {/* Nav bar with close button */}
          <motion.div 
            className="fixed top-0 left-0 right-0 w-full h-[98px] px-4 md:px-8 lg:px-[52px] py-[23px] flex justify-end items-center"
          >
            <motion.button
              onClick={onClose}
              className="w-[20px] h-[20px] flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Close menu"
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
                  animate="open"
                  exit="closed"
                />
              </svg>
            </motion.button>
          </motion.div>

          {/* Main content */}
          <div className="flex justify-center items-start gap-[90px] mt-[65px]">
            {/* Left section */}
            <motion.div
              className="flex flex-col items-end gap-3 self-stretch"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ delay: 0.8 }}
            >
              <div className="flex w-[158px] flex-col items-end gap-1">
                <span className="text-[#C8C8C8] text-right text-[13px] font-medium leading-[105%] tracking-[-0.39px]">LOCATION</span>
                <span className="text-white text-right text-[13px] font-medium leading-[130%] tracking-[-0.39px]">
                  Thanh Xuan, Hanoi<br />Vietnam
                </span>
              </div>
              <div className="flex w-[159px] flex-col items-end gap-1">
                <span className="text-[#C8C8C8] text-[13px] font-medium leading-[105%] tracking-[-0.39px]">EMAIL</span>
                <span className="text-white text-right text-[13px] font-medium leading-[130%] tracking-[-0.39px]">
                  tiendn.fw@gmail.com
                </span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[#C8C8C8] text-[13px] font-medium leading-[105%] tracking-[-0.39px]">LINKEDIN</span>
                <span className="text-white text-right text-[13px] font-medium leading-[130%] tracking-[-0.39px]">
                  linkedin.com/in/tienduongngoc/
                </span>
              </div>
            </motion.div>

            {/* Center section */}
            <motion.div
              className="flex flex-col items-center gap-8 relative z-[10001]"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ delay: 0.2 }}
            >
              <div className="flex w-[289.5px] px-[82px] justify-center items-center gap-[10px] border-x border-[#434343]">
                <div className="flex w-[123px] flex-col items-center gap-6">
                  <motion.div className="flex flex-col items-center gap-[21px]">
                    <motion.button 
                      onClick={handleHomeClick}
                      disabled={isNavigating}
                      className={`block text-center text-[26.397px] font-extrabold leading-[105%] tracking-[-0.792px] transition-opacity ${pathname === '/' ? 'text-white' : 'text-[#666666]'} ${isNavigating ? 'pointer-events-none opacity-50' : ''} relative z-[10002]`}
                      style={{ pointerEvents: 'auto' }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      HOME
                    </motion.button>
                    <Link 
                      href="/about"
                      onClick={handleClick}
                      className={`block text-center text-[26.397px] font-extrabold leading-[105%] tracking-[-0.792px] transition-opacity ${pathname === '/about' ? 'text-white' : 'text-[#666666]'}`}
                    >
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="inline-block"
                      >
                        ABOUT
                      </motion.span>
                    </Link>
                    <Link 
                      href="/projects"
                      onClick={handleClick}
                      className={`block text-center text-[26.397px] font-extrabold leading-[105%] tracking-[-0.792px] transition-opacity ${pathname === '/projects' ? 'text-white' : 'text-[#666666]'}`}
                    >
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="inline-block"
                      >
                        PROJECTS
                      </motion.span>
                    </Link>
                    <Link 
                      href="/contact"
                      onClick={handleClick}
                      className={`block text-center text-[26.397px] font-extrabold leading-[105%] tracking-[-0.792px] transition-opacity ${pathname === '/contact' ? 'text-white' : 'text-[#666666]'}`}
                    >
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="inline-block"
                      >
                        CONTACT
                      </motion.span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right section */}
            <motion.div
              className="flex flex-col items-start gap-[21px] self-stretch"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ delay: 0.8 }}
            >
              <div className="flex w-[158px] flex-col items-start gap-[15px]">
                <span className="text-[#C8C8C8] text-[20px] font-medium leading-[105%] tracking-[-0.6px]">
                  Open to new<br />collaboration<br />opportunities
                </span>
                <Link 
                  href="/contact"
                  onClick={handleClick}
                  className="relative w-[110px] h-[52px] flex justify-center items-center rounded-[31.2px] bg-gradient-to-b from-black/50 to-[#181818]/50 shadow-[0px_0px_1.956px_0.098px_rgba(255,255,255,0.50)_inset] backdrop-blur-[5.868px] group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0px_0px_3.912px_0.196px_rgba(255,255,255,0.50)_inset]"
                >
                  <span className="text-white font-jakarta-sans text-base relative z-10">Contact</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenMenu; 