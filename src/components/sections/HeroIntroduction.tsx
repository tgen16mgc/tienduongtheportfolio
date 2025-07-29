"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const HeroIntroduction: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const animationFrameRef = useRef<number>();
  const lastPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (buttonRef.current && isHovering) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const rect = buttonRef.current!.getBoundingClientRect();
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
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        lastPositionRef.current = { x: centerX, y: centerY };
        setMousePosition({ x: centerX, y: centerY });
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        lastPositionRef.current = { x: centerX, y: centerY };
        setMousePosition({ x: centerX, y: centerY });
      }
    };

    const button = buttonRef.current;
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

  return (
    <div className="flex w-full flex-col items-center shrink-0 relative px-4 lg:px-0" style={{ gap: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
      {/* Main Introduction Section - Mobile-first hierarchy */}
      <div className="flex flex-col items-start self-stretch relative" style={{ gap: 'clamp(1rem, 3vw, 1.75rem)' }}>
        {/* Title and Cards Section - Mobile-optimized spacing */}
        <div className="flex w-full flex-col items-start relative" style={{ gap: 'clamp(1rem, 3vw, 1.125rem)' }}>
          {/* First Line: "Hi there! I am" + Name Card - Mobile-first layout */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center relative" style={{ gap: 'clamp(1rem, 3vw, 1.125rem)' }}>
            {/* "Hi there! I am" text - Enhanced mobile readability */}
            <div className="text-white font-['Rethink_Sans'] font-bold relative" style={{ fontSize: 'clamp(24px, 8vw, 64px)', lineHeight: 'clamp(1.1, 1.15, 1.05)', letterSpacing: 'clamp(-1px, -0.03em, -1.92px)' }}>
              <span className="font-sans font-bold text-white">Hi there! I am</span>
            </div>
            
            {/* Tien Duong Card - Responsive with mobile-first approach */}
            <div className="w-full max-w-[180px] sm:max-w-[200px] lg:max-w-[241px] h-[44px] sm:h-[50px] lg:h-[59px] relative min-w-0">
              {/* Clean Card Body with Glassmorphism */}
              <div className="w-full h-full rounded-[30px] border border-white/[0.09] bg-[rgba(137,137,137,0.05)] backdrop-blur-[75px] shadow-sm relative overflow-hidden">
                {/* Subtle background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(114,114,114,0.08)] via-transparent to-[rgba(114,114,114,0.05)] rounded-[30px]"></div>
              </div>
              
              {/* Card Text - Enhanced mobile readability */}
              <div className="absolute inset-0 flex items-center justify-center px-2">
                <span className="text-white font-['Rethink_Sans'] font-normal text-center" style={{ fontSize: 'clamp(16px, 5vw, 31px)', lineHeight: 'clamp(1.1, 1.15, 1.05)', letterSpacing: 'clamp(-0.5px, -0.02em, -0.933px)' }}>Tien Duong</span>
              </div>
            </div>
          </div>
          
          {/* Second Line: "a Marketer (& Planner) intern." - Mobile-responsive wrapping */}
          <div className="flex flex-wrap items-center relative" style={{ gap: 'clamp(0.75rem, 3vw, 1.25rem)' }}>
            {/* "a" text - Enhanced mobile readability */}
            <div className="text-white font-['Rethink_Sans'] font-bold relative flex-shrink-0" style={{ fontSize: 'clamp(24px, 8vw, 64px)', lineHeight: 'clamp(1.1, 1.15, 1.05)', letterSpacing: 'clamp(-1px, -0.03em, -1.92px)' }}>
              <span className="font-sans font-bold text-white">a</span>
            </div>
            
            {/* Marketer Card - Mobile content-focused design */}
            <div className="w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[438px] h-[50px] sm:h-[58px] lg:h-[67px] relative min-w-0">
              {/* Clean Card Body - Simplified on mobile for content focus */}
              <div className="w-full h-full rounded-[32px] border border-white/[0.12] bg-[rgba(255,255,255,0.03)] backdrop-blur-[75px] shadow-sm relative overflow-hidden md:animate-card-glow">
                {/* Ethereal background gradient - Reduced on mobile */}
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(200,230,255,0.04)] md:from-[rgba(200,230,255,0.06)] via-[rgba(255,255,255,0.03)] md:via-[rgba(255,255,255,0.04)] to-[rgba(180,220,255,0.03)] md:to-[rgba(180,220,255,0.05)] rounded-[32px]"></div>
                {/* Additional luminous layer - Desktop only for mobile content priority */}
                <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-[rgba(255,255,255,0.08)] via-transparent to-[rgba(200,230,255,0.04)] rounded-[32px] opacity-60"></div>
                {/* Shimmer effect - Desktop only to avoid mobile distraction */}
                <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent rounded-[32px] opacity-50 transform -skew-x-12 animate-pulse"></div>
              </div>
              
              {/* Card Text - Enhanced mobile readability */}
              <div className="absolute inset-0 flex items-center justify-center px-3">
                <span className="text-white font-['Rethink_Sans'] font-normal text-center" style={{ fontSize: 'clamp(18px, 6vw, 42px)', lineHeight: 'clamp(1.1, 1.15, 1.05)', letterSpacing: 'clamp(-0.7px, -0.02em, -1.268px)' }}>Marketer (& Planner)</span>
              </div>
            </div>
            
            {/* "intern." text - Enhanced mobile readability */}
            <div className="text-white font-['Rethink_Sans'] font-bold relative flex-shrink-0" style={{ fontSize: 'clamp(24px, 8vw, 64px)', lineHeight: 'clamp(1.1, 1.15, 1.05)', letterSpacing: 'clamp(-1px, -0.03em, -1.92px)' }}>
              <span className="font-sans font-bold text-white">intern.</span>
          </div>
          </div>
        </div>
      </div>
      
      {/* Mission Statement Section - Mobile-optimized hierarchy */}
      <div className="flex flex-col items-start self-stretch relative" style={{ gap: 'clamp(0.5rem, 2vw, 1rem)' }}>
        {/* Main statement line - Mobile-responsive with better spacing */}
        <div className="flex items-center self-stretch relative" style={{ paddingTop: 'clamp(0.5rem, 2vw, 0.625rem)', paddingBottom: 'clamp(0.5rem, 2vw, 0.625rem)' }}>
          <div className="text-white font-['Rethink_Sans'] font-bold w-full" style={{ fontSize: 'clamp(24px, 7vw, 63px)', lineHeight: 'clamp(1.1, 1.15, 1.05)', letterSpacing: 'clamp(-1px, -0.03em, -1.89px)' }}>
            <span className="font-sans font-bold text-white">driven by desire to brilliantly make  </span>
          </div>
        </div>
        
        {/* Quality Cards and Impact - Mobile-first spacing */}
        <div className="flex flex-wrap items-center relative" style={{ gap: 'clamp(0.75rem, 3vw, 1.125rem)' }}>
          {/* Real Card - Mobile-responsive */}
          <div className="w-auto max-w-[80px] lg:max-w-[105px] h-[40px] lg:h-[52px] relative min-w-0">
            {/* Clean Card Body */}
            <div className="w-full h-full rounded-[26px] border border-white/[0.09] bg-[rgba(137,137,137,0.05)] backdrop-blur-[65px] shadow-sm"></div>
            
            {/* Card Text - Enhanced mobile readability */}
            <div className="absolute inset-0 flex items-center justify-center px-2">
              <span className="text-white font-['Rethink_Sans'] font-normal text-center" style={{ fontSize: 'clamp(16px, 4vw, 27px)', lineHeight: 'clamp(1.1, 1.2, 1.1)', letterSpacing: 'clamp(-0.4px, -0.02em, -0.819px)' }}>Real</span>
            </div>
          </div>
          
          {/* Meaningful Card - Mobile-responsive */}
          <div className="w-auto max-w-[140px] lg:max-w-[196px] h-[40px] lg:h-[52px] relative min-w-0">
            {/* Clean Card Body */}
            <div className="w-full h-full rounded-[26px] border border-white/[0.09] bg-[rgba(137,137,137,0.05)] backdrop-blur-[65px] shadow-sm"></div>
            
            {/* Card Text - Enhanced mobile readability */}
            <div className="absolute inset-0 flex items-center justify-center px-2">
              <span className="text-white font-['Rethink_Sans'] font-normal text-center" style={{ fontSize: 'clamp(16px, 4vw, 27px)', lineHeight: 'clamp(1.1, 1.2, 1.1)', letterSpacing: 'clamp(-0.4px, -0.02em, -0.819px)' }}>Meaningful</span>
            </div>
          </div>
          
          {/* Powerful Card - Mobile-responsive */}
          <div className="w-auto max-w-[120px] lg:max-w-[160px] h-[40px] lg:h-[52px] relative min-w-0">
            {/* Clean Card Body */}
            <div className="w-full h-full rounded-[26px] border border-white/[0.09] bg-[rgba(137,137,137,0.05)] backdrop-blur-[65px] shadow-sm"></div>
            
            {/* Card Text - Enhanced mobile readability */}
            <div className="absolute inset-0 flex items-center justify-center px-2">
              <span className="text-white font-['Rethink_Sans'] font-normal text-center" style={{ fontSize: 'clamp(16px, 4vw, 27px)', lineHeight: 'clamp(1.1, 1.2, 1.1)', letterSpacing: 'clamp(-0.4px, -0.02em, -0.819px)' }}>Powerful</span>
            </div>
          </div>
          
          {/* "impact." with gradient - Enhanced mobile readability */}
          <div className="font-['Rethink_Sans'] font-bold bg-gradient-to-r from-white to-[#838383] bg-clip-text text-transparent relative" style={{ fontSize: 'clamp(24px, 8vw, 64px)', lineHeight: 'clamp(1.1, 1.15, 1.05)', letterSpacing: 'clamp(-1px, -0.03em, -1.92px)' }}>
            <span className="font-sans font-bold">impact.</span>
          </div>
        </div>
      </div>
      
      {/* Description and CTA Section - Mobile-optimized hierarchy */}
      <div className="flex w-full flex-col items-start relative" style={{ gap: 'clamp(1.5rem, 4vw, 2.25rem)' }}>
        {/* Description with Arrow - Mobile-optimized decorative element */}
        <div className="flex items-start self-stretch relative" style={{ gap: 'clamp(0.75rem, 2.5vw, 0.75rem)' }}>
          {/* Line with circle and arrow - Mobile-responsive sizing */}
          <div className="flex flex-col items-center flex-shrink-0" style={{ marginTop: 'clamp(0.25rem, 1vw, 0.5rem)' }}>
            {/* Circle at top - Mobile-responsive glass effect */}
            <div className="rounded-full bg-white/20 backdrop-blur-sm border border-white/10 shadow-sm" style={{ width: 'clamp(4px, 1.5vw, 6px)', height: 'clamp(4px, 1.5vw, 6px)' }}></div>
            {/* Vertical line - Mobile-responsive height */}
            <div className="w-0.5 bg-gradient-to-b from-white/30 via-white/20 to-white/30 backdrop-blur-sm shadow-sm" style={{ height: 'clamp(3rem, 8vw, 4rem)' }}></div>
            {/* Arrow at bottom - Glass effect */}
            <div className="relative">
              <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0 drop-shadow-sm">
                <defs>
                  <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: 'rgba(255,255,255,0.3)', stopOpacity: 1}} />
                    <stop offset="50%" style={{stopColor: 'rgba(255,255,255,0.2)', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: 'rgba(255,255,255,0.3)', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                <path d="M6.5 10L1.30385 1L11.6962 1L6.5 10Z" fill="url(#arrowGradient)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
        </svg>
            </div>
          </div>
          <div className="flex flex-col flex-1" style={{ gap: 'clamp(1rem, 3vw, 1rem)' }}>
            <div className="text-[#C5C5C5] font-['Rethink_Sans'] tracking-[-0.02em]" style={{ fontSize: 'clamp(16px, 3.5vw, 20px)', lineHeight: 'clamp(1.4, 1.6, 1.5)' }}>
              I stand ready to turn your next campaign into a memorable, positivity-driven impact that doesn't just check boxes but sparks genuine connection.
            </div>
            <div className="text-[#C5C5C5] font-['Rethink_Sans'] tracking-[-0.02em]" style={{ fontSize: 'clamp(16px, 3.5vw, 20px)', lineHeight: 'clamp(1.4, 1.6, 1.5)' }}>
              Interested? Scroll down, or...
            </div>
          </div>
        </div>
            
        {/* CTA Button - Mobile-optimized for content priority */}
        <Link 
          href="#projects"
          ref={buttonRef}
          className="relative w-full max-w-[180px] lg:w-[221px] min-h-[44px] h-auto lg:h-[48px] px-4 py-3 flex justify-center items-center rounded-[31.2px] bg-gradient-to-b from-black/50 to-[#181818]/50 shadow-[0px_0px_1.956px_0.098px_rgba(255,255,255,0.50)_inset] backdrop-blur-[48px] group cursor-pointer overflow-hidden transition-all duration-300 border border-white/[0.09] active:scale-95 md:active:scale-100"
        >
          {/* Dynamic Glow Effect - Desktop only for mobile content focus */}
          <div 
            className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none will-change-transform z-0"
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
          
          {/* Mobile Touch Feedback - Simple and focused */}
          <div className="md:hidden absolute inset-0 bg-white/5 opacity-0 group-active:opacity-100 transition-opacity duration-150 rounded-[31.2px] z-0"></div>
          
          {/* Button Text - Enhanced mobile readability */}
          <span className="text-white font-['Rethink_Sans'] font-normal relative z-10" style={{ fontSize: 'clamp(16px, 3.5vw, 20px)', lineHeight: 'clamp(1.2, 1.3, 1.1)', letterSpacing: 'clamp(-0.3px, -0.02em, -0.6px)' }}>
            See what I do
          </span>
          </Link>
      </div>
    </div>
  );
};

export default HeroIntroduction;
