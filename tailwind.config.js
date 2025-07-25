module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'powder-left': {
          '0%': { transform: 'translateX(-100%) scale(0.7)', opacity: '0' },
          '60%': { opacity: '1' },
          '100%': { transform: 'translateX(120%) scale(1.1)', opacity: '0.1' },
        },
        'powder-right': {
          '0%': { transform: 'translateX(100%) scale(0.7)', opacity: '0' },
          '60%': { opacity: '1' },
          '100%': { transform: 'translateX(-120%) scale(1.1)', opacity: '0.1' },
        },
      },
      animation: {
        'powder-left': 'powder-left 2.5s cubic-bezier(0.4,0,0.2,1) infinite',
        'powder-right': 'powder-right 2.5s cubic-bezier(0.4,0,0.2,1) infinite',
      },
    },
  },
  plugins: [],
}; 