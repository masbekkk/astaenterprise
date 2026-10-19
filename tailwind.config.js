/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        editorial: ['"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        zinc: { 50: '#FFFFFF', 100: '#F0F4EF', 200: '#DFE5DD', 300: '#B5C2B9', 400: '#64766B', 500: '#526259', 600: '#526259', 700: '#526259', 800: '#182923', 900: '#182923', 950: '#182923' },
        brand: { 50: '#F0F5F1', 100: '#E7F1EC', 200: '#DFE5DD', 300: '#B5D2C1', 400: '#33795F', 500: '#075E46', 600: '#064B39', 700: '#075E46', 800: '#064B39', 900: '#182923', 950: '#102D23' },
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
          300: '#E0C788',
          400: '#D4B35D',
          500: '#D4AF37',
          600: '#B8860B',
          700: '#8C6608',
          800: '#5F4506',
          900: '#332503',
          DEFAULT: '#D4AF37',
          light: '#E5C07B',
          dark: '#B8860B',
          accent: '#C5A059',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA771C 100%)',
        'gold-gradient-hover': 'linear-gradient(135deg, #FFF0C2 0%, #E5C07B 50%, #C5A059 100%)',
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
