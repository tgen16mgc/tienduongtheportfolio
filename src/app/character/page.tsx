"use client";

import React from 'react';
import CharacterCustomization from '../../components/ui/CharacterCustomization';

export default function CharacterPage() {
  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-black/80 to-black">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Character Customization Demo</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              This demonstrates the STYLE OPTIONS and Color variants functionality. 
              Color variants only appear when the corresponding assets are available.
            </p>
          </div>
          
          <CharacterCustomization />
        </div>
      </div>
    </main>
  );
}