/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom colors to match existing glass design
      colors: {
        glass: {
          bg: 'rgba(255, 255, 255, 0.15)',
          border: 'rgba(255, 255, 255, 0.3)',
          hover: 'rgba(211, 211, 211, 0.18)',
        }
      },
      // Custom spacing to match existing CSS custom properties
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)', 
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
      },
      // Custom backdrop blur utilities
      backdropBlur: {
        'glass': '30px',
        'glass-modal': '40px',
      },
      // Custom border radius for glass panels
      borderRadius: {
        'glass': '16px',
        'glass-modal': '24px',
        'pill': '50px',
      }
    },
  },
}