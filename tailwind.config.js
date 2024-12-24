/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensures Tailwind applies to all JS/JSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// Dans votre tailwind.config.js, ajoutez ces animations
module.exports = {
  theme: {
    extend: {
      keyframes: {
        slideUp: {
          '0%': { 
            transform: 'translateY(20px)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'translateY(0)', 
            opacity: '1' 
          }
        },
        textFadeOut: {
          '0%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
          '100%': { 
            opacity: '0', 
            transform: 'translateY(-20px)' 
          }
        },
        textFadeIn: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          }
        }
      },
      animation: {
        slideUp: 'slideUp 0.5s ease-out',
        textFadeOut: 'textFadeOut 0.5s ease-out',
        textFadeIn: 'textFadeIn 0.5s ease-out'
      }
    }
  }
}