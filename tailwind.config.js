/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Marcellus"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        editorial: ['"Marcellus"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        zinc: { 50: '#FFFDF8', 100: '#F0ECE2', 200: '#E4DDCE', 300: '#C7C2B5', 400: '#748397', 500: '#56667A', 600: '#56667A', 700: '#344A63', 800: '#172C44', 900: '#172C44', 950: '#0E2037' },
        brand: { 50: '#F0F3F7', 100: '#E9EEF4', 200: '#E4DDCE', 300: '#BAC8D8', 400: '#456889', 500: '#102D50', 600: '#102D50', 700: '#0A1E36', 800: '#102D50', 900: '#172C44', 950: '#0A1E36' },
        ivory: '#F8F5ED',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        surface: 'hsl(var(--surface))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        maroon: {
          DEFAULT: '#5A0F1B',
          light: '#7A1A28',
          dark: '#3B0911',
        },
        gold: {
          50: '#FBF8F0',
          100: '#F5EED9',
          200: '#EBDCB4',
          300: '#E0CAA0',
          400: '#D7BD87',
          500: '#C6A15B',
          600: '#A8813F',
          700: '#80601F',
          800: '#604819',
          900: '#382B16',
          DEFAULT: '#C6A15B',
          light: '#D9BD88',
          dark: '#A8813F',
          accent: '#C6A15B',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #EBDCB4 0%, #C6A15B 50%, #A8813F 100%)',
        'gold-gradient-hover': 'linear-gradient(135deg, #F5EED9 0%, #D9BD88 50%, #C6A15B 100%)',
        'dark-card': 'linear-gradient(180deg, rgba(26,26,30,0.7) 0%, rgba(14,14,16,0.9) 100%)',
        'dark-surface': 'linear-gradient(180deg, #121215 0%, #0A0A0C 100%)',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'fade-up': { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'float-slow': { '0%,100%': { transform: 'translateY(-6px)' }, '50%': { transform: 'translateY(6px)' } },
        'pulse-subtle': { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.7' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
