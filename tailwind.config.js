/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)'],
        'jakarta-sans': ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        light: '#F5F5F5',
        dark: '#0A0A0A',
      },
      keyframes: {
        meshMove: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.6' },
          '50%': { transform: 'translate(5%, 5%) scale(1.1)', opacity: '0.5' },
          '100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.6' },
        },
        meshNode1: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
          '50%': { transform: 'translate(-10%, -10%) scale(1.1)', opacity: '0.15' },
          '100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
        },
        meshNode2: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
          '50%': { transform: 'translate(10%, -10%) scale(1.1)', opacity: '0.15' },
          '100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
        },
        meshNode3: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
          '50%': { transform: 'translate(-15%, 15%) scale(1.1)', opacity: '0.15' },
          '100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
        },
        meshNode4: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
          '50%': { transform: 'translate(15%, 15%) scale(1.1)', opacity: '0.15' },
          '100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
        },
        meshNode5: {
          '0%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '0.2' },
          '50%': { transform: 'translate(-55%, -45%) scale(1.1)', opacity: '0.15' },
          '100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '0.2' },
        },
        meshNode6: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
          '50%': { transform: 'translate(-5%, -5%) scale(1.1)', opacity: '0.15' },
          '100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
        },
        meshNode7: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
          '50%': { transform: 'translate(5%, 5%) scale(1.1)', opacity: '0.15' },
          '100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
        },
        meshNode8: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
          '50%': { transform: 'translate(8%, -8%) scale(1.1)', opacity: '0.15' },
          '100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
        },
        meshNode9: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
          '50%': { transform: 'translate(-8%, 8%) scale(1.1)', opacity: '0.15' },
          '100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
        },
        meshNode10: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
          '50%': { transform: 'translate(12%, -12%) scale(1.1)', opacity: '0.15' },
          '100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
        },
        meshNode11: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
          '50%': { transform: 'translate(-12%, 12%) scale(1.1)', opacity: '0.15' },
          '100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
        },
        meshNode12: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
          '50%': { transform: 'translate(15%, -15%) scale(1.1)', opacity: '0.15' },
          '100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
        },
        meshNode13: {
          '0%': { transform: 'translate(-50%, 0) scale(1)', opacity: '0.2' },
          '50%': { transform: 'translate(-55%, 15%) scale(1.1)', opacity: '0.15' },
          '100%': { transform: 'translate(-50%, 0) scale(1)', opacity: '0.2' },
        },
        ambient1: {
          '0%': { transform: 'rotate(0deg) scale(1)', opacity: '0.02' },
          '50%': { transform: 'rotate(180deg) scale(1.1)', opacity: '0.03' },
          '100%': { transform: 'rotate(360deg) scale(1)', opacity: '0.02' },
        },
        ambient2: {
          '0%': { transform: 'rotate(0deg) scale(1)', opacity: '0.02' },
          '50%': { transform: 'rotate(-180deg) scale(1.1)', opacity: '0.03' },
          '100%': { transform: 'rotate(-360deg) scale(1)', opacity: '0.02' },
        },
      },
      animation: {
        mesh: 'meshMove 40s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'mesh-node-1': 'meshNode1 45s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'mesh-node-2': 'meshNode2 50s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'mesh-node-3': 'meshNode3 55s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'mesh-node-4': 'meshNode4 48s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'mesh-node-5': 'meshNode5 52s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'mesh-node-6': 'meshNode6 46s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'mesh-node-7': 'meshNode7 49s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'mesh-node-8': 'meshNode8 43s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'mesh-node-9': 'meshNode9 47s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'mesh-node-10': 'meshNode10 51s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'mesh-node-11': 'meshNode11 44s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'mesh-node-12': 'meshNode12 53s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'mesh-node-13': 'meshNode13 56s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'ambient-1': 'ambient1 80s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'ambient-2': 'ambient2 75s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
} 