/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f2',
          100: '#ddf2e1',
          500: '#3FA34D',
          600: '#359940',
          700: '#2F6F39',
          800: '#245530',
          900: '#1d4527',
        },
        secondary: {
          50: '#fefcf8',
          100: '#fef9f1',
          200: '#F6F1E7',
          300: '#f0e8d4',
          400: '#e8ddc1',
          500: '#dfd1ad',
        },
        accent: {
          50: '#fefbf0',
          100: '#fef7e0',
          200: '#fdefc0',
          300: '#F7C948',
          400: '#f5c234',
          500: '#f3bb20',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['12px', '16px'],
        'sm': ['14px', '20px'],
        'base': ['16px', '24px'],
        'lg': ['18px', '28px'],
        'xl': ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['28px', '36px'],
        '4xl': ['32px', '40px'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'DEFAULT': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'soft': '0 6px 18px rgba(31, 41, 55, 0.08)',
        'card': '0 4px 12px rgba(31, 41, 55, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-out',
        'slide-up': 'slideUp 450ms ease-out',
        'scale-in': 'scaleIn 200ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};