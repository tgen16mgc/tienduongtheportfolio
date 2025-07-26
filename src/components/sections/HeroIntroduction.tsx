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
    <div className="flex w-full flex-col items-center gap-6 lg:gap-10 shrink-0 relative px-4 lg:px-0">
      {/* Main Introduction Section */}
      <div className="flex flex-col items-start gap-4 lg:gap-7 self-stretch relative">
        {/* Title and Cards Section */}
        <div className="flex w-full flex-col items-start gap-4 lg:gap-[18px] relative">
          {/* First Line: "Hi there! I am" + Name Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-[18px] relative">
            {/* "Hi there! I am" text */}
            <div className="text-white font-['Rethink_Sans'] text-[32px] sm:text-[48px] lg:text-[64px] font-bold leading-[105%] tracking-[-1.92px] relative">
              <span className="font-sans font-bold text-[32px] sm:text-[48px] lg:text-[64px] text-white">Hi there! I am</span>
            </div>
            
            {/* Tien Duong Card - Clean version */}
            <div className="w-[180px] sm:w-[200px] lg:w-[241px] h-[44px] sm:h-[50px] lg:h-[59px] relative">
              {/* Clean Card Body with Glassmorphism */}
              <div className="w-full h-full rounded-[30px] border border-white/[0.09] bg-[rgba(137,137,137,0.05)] backdrop-blur-[75px] shadow-sm relative overflow-hidden">
                {/* Subtle background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(114,114,114,0.08)] via-transparent to-[rgba(114,114,114,0.05)] rounded-[30px]"></div>
              </div>
              
              {/* Card Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-['Rethink_Sans'] text-[20px] sm:text-[26px] lg:text-[31px] font-normal leading-[105%] tracking-[-0.933px]">Tien Duong</span>
              </div>
            </div>
          </div>
          
          {/* Second Line: "a Marketer (& Planner) intern." - All on one line */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 relative" style={{ whiteSpace: 'nowrap' }}>
            {/* "a" text */}
            <div className="text-white font-['Rethink_Sans'] text-[32px] sm:text-[48px] lg:text-[64px] font-bold leading-[105%] tracking-[-1.92px] relative flex-shrink-0">
              <span className="font-sans font-bold text-[32px] sm:text-[48px] lg:text-[64px] text-white">a</span>
            </div>
            
            {/* Marketer Card - Clean version with glow animation */}
            <div className="w-auto min-w-[320px] sm:min-w-[380px] lg:w-[438px] h-[50px] sm:h-[58px] lg:h-[67px] relative flex-shrink-0">
              {/* Clean Card Body with Glassmorphism and Ethereal Glow Animation */}
              <div className="w-full h-full rounded-[32px] border border-white/[0.12] bg-[rgba(255,255,255,0.03)] backdrop-blur-[75px] shadow-sm relative overflow-hidden animate-card-glow">
                {/* Ethereal background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(200,230,255,0.06)] via-[rgba(255,255,255,0.04)] to-[rgba(180,220,255,0.05)] rounded-[32px]"></div>
                {/* Additional luminous layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,255,255,0.08)] via-transparent to-[rgba(200,230,255,0.04)] rounded-[32px] opacity-60"></div>
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent rounded-[32px] opacity-50 transform -skew-x-12 animate-pulse"></div>
              </div>
              
              {/* Card Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-['Rethink_Sans'] text-[24px] sm:text-[32px] lg:text-[42px] font-normal leading-[105%] tracking-[-1.268px]">Marketer (& Planner)</span>
              </div>
            </div>
            
            {/* "intern." text */}
            <div className="text-white font-['Rethink_Sans'] text-[32px] sm:text-[48px] lg:text-[64px] font-bold leading-[105%] tracking-[-1.92px] relative flex-shrink-0">
              <span className="font-sans font-bold text-[32px] sm:text-[48px] lg:text-[64px] text-white">intern.</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mission Statement Section */}
      <div className="flex flex-col items-start gap-[1px] self-stretch relative">
        {/* Main statement line */}
        <div className="flex py-[10px] px-0 items-center self-stretch relative">
          <div className="text-white font-['Rethink_Sans'] text-[28px] sm:text-[42px] lg:text-[63px] font-bold leading-[105%] tracking-[-1.89px] w-full" style={{ whiteSpace: 'nowrap' }}>
            <span className="font-sans font-bold text-[28px] sm:text-[42px] lg:text-[63px] text-white">driven by desire to brilliantly make  </span>
          </div>
        </div>
        
        {/* Quality Cards and Impact */}
        <div className="flex flex-wrap items-center gap-3 lg:gap-[18px] relative">
          {/* Real Card - Clean version */}
          <div className="w-[80px] lg:w-[105px] h-[40px] lg:h-[52px] relative">
            {/* Clean Card Body */}
            <div className="w-full h-full rounded-[26px] border border-white/[0.09] bg-[rgba(137,137,137,0.05)] backdrop-blur-[65px] shadow-sm"></div>
            
            {/* Card Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-['Rethink_Sans'] text-[18px] lg:text-[27px] font-normal leading-[105%] tracking-[-0.819px]">Real</span>
            </div>
          </div>
          
          {/* Meaningful Card - Clean version */}
          <div className="w-[140px] lg:w-[196px] h-[40px] lg:h-[52px] relative">
            {/* Clean Card Body */}
            <div className="w-full h-full rounded-[26px] border border-white/[0.09] bg-[rgba(137,137,137,0.05)] backdrop-blur-[65px] shadow-sm"></div>
            
            {/* Card Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-['Rethink_Sans'] text-[18px] lg:text-[27px] font-normal leading-[105%] tracking-[-0.819px]">Meaningful</span>
            </div>
          </div>
          
          {/* Powerful Card - Clean version */}
          <div className="w-[120px] lg:w-[160px] h-[40px] lg:h-[52px] relative">
            {/* Clean Card Body */}
            <div className="w-full h-full rounded-[26px] border border-white/[0.09] bg-[rgba(137,137,137,0.05)] backdrop-blur-[65px] shadow-sm"></div>
            
            {/* Card Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-['Rethink_Sans'] text-[18px] lg:text-[27px] font-normal leading-[105%] tracking-[-0.819px]">Powerful</span>
            </div>
          </div>
          
          {/* "impact." with gradient */}
          <div className="font-['Rethink_Sans'] text-[32px] sm:text-[48px] lg:text-[64px] font-bold leading-[105%] tracking-[-1.92px] bg-gradient-to-r from-white to-[#838383] bg-clip-text text-transparent relative">
            <span className="font-sans font-bold text-[32px] sm:text-[48px] lg:text-[64px]">impact.</span>
          </div>
        </div>
      </div>
      
      {/* Description and CTA Section */}
      <div className="flex w-full flex-col items-start gap-6 lg:gap-9 relative">
        {/* Description with Arrow - Circle at top, arrow at bottom */}
        <div className="flex items-start gap-3 self-stretch relative">
          {/* Line with circle and arrow - Glass effect - Aligned with text */}
          <div className="flex flex-col items-center flex-shrink-0 mt-2">
            {/* Circle at top - Glass effect */}
            <div className="w-[6px] h-[6px] rounded-full bg-white/20 backdrop-blur-sm border border-white/10 shadow-sm"></div>
            {/* Vertical line - Glass effect */}
            <div className="w-0.5 h-16 bg-gradient-to-b from-white/30 via-white/20 to-white/30 backdrop-blur-sm shadow-sm"></div>
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
          <div className="flex flex-col gap-4 flex-1">
            <div className="text-[#9F9F9F] font-['Rethink_Sans'] text-[14px] sm:text-[16px] lg:text-[20px] leading-[140%] tracking-[-0.03em]">
              I stand ready to turn your next campaign into a memorable, positivity-driven impact that doesn't just check boxes but sparks genuine connection.
            </div>
            <div className="text-[#9F9F9F] font-['Rethink_Sans'] text-[14px] sm:text-[16px] lg:text-[20px] leading-[140%] tracking-[-0.03em]">
              Interested? Scroll down, or...
            </div>
          </div>
        </div>
        
        {/* CTA Button with Dynamic Glow */}
        <Link 
          href="#projects"
          ref={buttonRef}
          className="relative w-full max-w-[180px] lg:w-[221px] h-[35px] lg:h-[41px] px-4 py-2 flex justify-center items-center rounded-[31.2px] bg-gradient-to-b from-black/50 to-[#181818]/50 shadow-[0px_0px_1.956px_0.098px_rgba(255,255,255,0.50)_inset] backdrop-blur-[48px] group cursor-pointer overflow-hidden transition-all duration-300 border border-white/[0.09]"
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
          
          {/* Button Text */}
          <span className="text-white font-['Rethink_Sans'] text-[16px] lg:text-[20px] font-normal leading-[105%] tracking-[-0.6px] relative z-10">
            See what I do
          </span>
        </Link>
      </div>
    </div>
  );
};

export default HeroIntroduction;
