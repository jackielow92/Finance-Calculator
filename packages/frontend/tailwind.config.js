/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#e0e5ec',
        'text-main': '#4d5b7c',
        'text-sec': '#65718a',
        primary: '#6d5dfc',
        'primary-dark': '#5b4bc4',
        'shadow-light': '#ffffff',
        'shadow-dark': '#a3b1c6',
        // DSR status colors
        'dsr-good': '#4CAF50',
        'dsr-moderate': '#FFC107',
        'dsr-high': '#FF9800',
        'dsr-danger': '#F44336',
      },
      fontFamily: {
        sans: ['Nunito', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      boxShadow: {
        'neu-out': '9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff',
        'neu-in': 'inset 6px 6px 10px #a3b1c6, inset -6px -6px 10px #ffffff',
        'neu-flat': '5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff',
        'neu-pressed': 'inset 4px 4px 8px #a3b1c6, inset -4px -4px 8px #ffffff',
      },
      borderRadius: {
        neu: '15px',
        'neu-lg': '20px',
        'neu-pill': '50px',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.neu-card': {
          backgroundColor: '#e0e5ec',
          borderRadius: '20px',
          boxShadow: '9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff',
          padding: '1.5rem',
        },
        '.neu-input': {
          backgroundColor: '#e0e5ec',
          borderRadius: '12px',
          boxShadow: 'inset 6px 6px 10px #a3b1c6, inset -6px -6px 10px #ffffff',
          border: 'none',
          padding: '0.75rem 1rem',
          width: '100%',
          outline: 'none',
          color: '#4d5b7c',
          fontWeight: '600',
          '&:focus': {
            boxShadow: 'inset 8px 8px 12px #a3b1c6, inset -8px -8px 12px #ffffff',
          },
        },
        '.neu-btn': {
          backgroundColor: '#e0e5ec',
          borderRadius: '50px',
          boxShadow: '9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff',
          padding: '0.75rem 2rem',
          fontWeight: '700',
          color: '#65718a',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          border: 'none',
          '&:hover': {
            transform: 'translateY(-2px)',
            color: '#6d5dfc',
          },
          '&:active': {
            boxShadow: 'inset 6px 6px 10px #a3b1c6, inset -6px -6px 10px #ffffff',
            transform: 'translateY(2px)',
          },
        },
        '.neu-btn-active': {
          boxShadow: 'inset 6px 6px 10px #a3b1c6, inset -6px -6px 10px #ffffff',
          color: '#6d5dfc',
          fontWeight: '800',
        },
        '.neu-select': {
          backgroundColor: '#e0e5ec',
          borderRadius: '12px',
          boxShadow: 'inset 6px 6px 10px #a3b1c6, inset -6px -6px 10px #ffffff',
          border: 'none',
          padding: '0.75rem 1rem',
          width: '100%',
          outline: 'none',
          color: '#4d5b7c',
          fontWeight: '600',
          cursor: 'pointer',
          appearance: 'none',
        },
      })
    },
  ],
}
