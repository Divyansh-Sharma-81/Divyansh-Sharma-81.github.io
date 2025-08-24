/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector', // Enable proper dark mode support
  theme: {
    extend: {
      // Proportional layout utilities preserving logical sizing
      width: {
        'chat-input': '33.333vw',     // --chat-input-width 
        'modal': '45vw',              // chat-modal-section width
        'four-fifths': '80%',         // me-content-container 
        'avatar': 'calc(33.333vw / 3)', // --avatar-size
        'one-fourth': '30%',          // me-photo width
      },
      height: {
        'modal': '96vh',              // chat-modal-section height
        'avatar': 'calc(33.333vw / 3)', // --avatar-size
      },
      // Theme-aware colors for glass effects
      backgroundColor: {
        'glass-light': 'rgb(255 255 255 / 0.2)',
        'glass-dark': 'rgb(17 24 39 / 0.4)',
        'glass-modal-light': 'rgb(255 255 255 / 0.1)', 
        'glass-modal-dark': 'rgb(17 24 39 / 0.3)',
        'glass-chat-light': 'rgb(255 255 255 / 0.3)',
        'glass-chat-dark': 'rgb(31 41 55 / 0.5)',
      },
      borderColor: {
        'glass-light': 'rgb(255 255 255 / 0.3)',
        'glass-dark': 'rgb(156 163 175 / 0.3)',
      },
      // Spacing system matching current proportions
      spacing: {
        'xs': '0.5rem',    // --spacing-xs
        'sm': '1rem',      // --spacing-sm
        'md': '1.5rem',    // --spacing-md  
        'lg': '2rem',      // --spacing-lg
        'xl': '3rem',      // --spacing-xl
      },
      // Glass effect border radius
      borderRadius: {
        'glass': '16px',
        'glass-modal': '24px',
        'pill': '50px',
      },
      // Grid background sizing
      backgroundSize: {
        'grid': '40px 40px',
        'grid-tablet': '30px 30px', 
        'grid-mobile': '25px 25px',
      },
      // Animation utilities
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1', 
            transform: 'translateY(0)'
          }
        },
        'bounce-dots': {
          '0%, 80%, 100%': {
            transform: 'scale(0)',
            opacity: '0.5'
          },
          '40%': {
            transform: 'scale(1)',
            opacity: '1'
          }
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'bounce-dots': 'bounce-dots 1.4s infinite ease-in-out both',
      },
    },
  },
}