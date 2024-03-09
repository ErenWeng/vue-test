/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {  
        'box-flash' : 'box-flash 0.5s linear infinite',
        'ball-scroll': 'ball-scroll 1.5s cubic-bezier(.25,.25,.5,1) infinite',
      },
      keyframes: {
        'box-flash': {
          '0%,100%': { opacity: '100%' },
          '50%': { opacity: '60%' },
        },
        'ball-scroll': {
          '0%': { 
            transform: 'translate(0)',
          },
          '100%': { 
            transform: 'translate(calc((100vw - 33vw) - 0.5rem))',
          }
        }
      }
    },
  },
  plugins: [],
}

