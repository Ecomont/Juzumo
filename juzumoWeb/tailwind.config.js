// /home/h/Visual Studio Projects/Juzumo/juzumoWeb/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          grafito: '#393E40',
          orange: { 600: '#F5A434', 400: '#F7C23C', 200: '#F8D28A' },
          green: { 600: '#2E7D32' },
        },
        gray: { 700: '#616866', 500: '#A2A6A4', 100: '#EBE9DB' },
        white: '#FFFFFF',
        cream: '#FFF8E1',
      },
      fontSize: {
        h1: ['3rem', { lineHeight: '1.15' }],
        h2: ['2.25rem', { lineHeight: '1.2' }],
        h3: ['1.75rem', { lineHeight: '1.25' }],
        body: ['1rem', { lineHeight: '1.6' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        4: '4px', 8: '8px', 12: '12px',
        16: '16px', 20: '20px', 24: '24px',
        32: '32px', 40: '40px', 48: '48px', 64: '64px',
      },
      borderRadius: { base: '12px', pill: '9999px' },
      boxShadow: { card: '0 6px 24px rgba(0,0,0,.08)', hover: '0 10px 28px rgba(0,0,0,.10)' },
      transitionTimingFunction: { motion: 'cubic-bezier(.22,.61,.36,1)' },
      transitionDuration: { ui: '180ms', long: '240ms' },
    },
  },
  plugins: [],
};
