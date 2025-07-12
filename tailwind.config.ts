import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif'
        ],
        title: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.7' }],
        'lg': ['1.125rem', { lineHeight: '1.7' }],
        'xl': ['1.25rem', { lineHeight: '1.7' }],
        '2xl': ['1.5rem', { lineHeight: '1.6' }],
        '3xl': ['1.875rem', { lineHeight: '1.5' }],
        '4xl': ['2.25rem', { lineHeight: '1.4' }],
        '5xl': ['3rem', { lineHeight: '1.3' }],
        '6xl': ['3.75rem', { lineHeight: '1.2' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        'hero': ['clamp(2.5rem, 5vw, 4rem)', {
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          fontWeight: '900',
        }],
        'display': ['clamp(2rem, 4vw, 3rem)', {
          lineHeight: '1.2',
          letterSpacing: '-0.01em',
          fontWeight: '800',
        }],
        'headline': ['clamp(1.5rem, 3vw, 2rem)', {
          lineHeight: '1.3',
          letterSpacing: '-0.005em',
          fontWeight: '700',
        }],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764'
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        apple: {
          blue: {
            DEFAULT: '#007AFF',
            50: '#E5F3FF',
            100: '#CCE7FF',
            200: '#99CFFF',
            300: '#66B7FF',
            400: '#339FFF',
            500: '#007AFF',
            600: '#0056CC',
            700: '#003D99',
            800: '#002966',
            900: '#001533',
          },
          gray: {
            DEFAULT: '#1C1C1E',
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#E5E5E5',
            300: '#D4D4D4',
            400: '#A3A3A3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
          },
          red: {
            DEFAULT: '#FF3B30',
            50: '#FFE8E6',
            100: '#FFD1CD',
            200: '#FFA39B',
            300: '#FF7569',
            400: '#FF5347',
            500: '#FF3B30',
            600: '#CC2F26',
            700: '#99231C',
            800: '#661713',
            900: '#330B09',
          },
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'apple': '24px',
        'apple-sm': '16px',
        'apple-xs': '12px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'fast-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }
        },
        'quick-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        'instant-shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '75%': { transform: 'translateX(2px)' }
        },
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        bounceGentle: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-2px)',
          },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
          },
          '50%': {
            boxShadow: '0 6px 24px rgba(59, 130, 246, 0.25)',
          },
        },
        // AI-Enhanced Animations
        'float': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '25%': { transform: 'translateY(-10px) translateX(5px)' },
          '50%': { transform: 'translateY(-5px) translateX(-5px)' },
          '75%': { transform: 'translateY(-15px) translateX(3px)' },
        },
        'morph': {
          '0%, 100%': { 
            transform: 'scale(1) rotate(0deg)',
            borderRadius: '50%',
          },
          '25%': { 
            transform: 'scale(1.2) rotate(90deg)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          },
          '50%': { 
            transform: 'scale(0.8) rotate(180deg)',
            borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
          },
          '75%': { 
            transform: 'scale(1.1) rotate(270deg)',
            borderRadius: '30% 70% 30% 70% / 70% 30% 70% 30%',
          },
        },
        'morph-reverse': {
          '0%, 100%': { 
            transform: 'scale(1) rotate(360deg)',
            borderRadius: '50%',
          },
          '25%': { 
            transform: 'scale(0.9) rotate(270deg)',
            borderRadius: '70% 30% 70% 30% / 30% 70% 30% 70%',
          },
          '50%': { 
            transform: 'scale(1.3) rotate(180deg)',
            borderRadius: '30% 70% 30% 70% / 70% 30% 70% 30%',
          },
          '75%': { 
            transform: 'scale(0.7) rotate(90deg)',
            borderRadius: '70% 30% 70% 30% / 30% 70% 30% 70%',
          },
        },
        'morph-slow': {
          '0%, 100%': { 
            transform: 'scale(1) rotate(0deg)',
            borderRadius: '50%',
          },
          '33%': { 
            transform: 'scale(1.1) rotate(120deg)',
            borderRadius: '60% 40% 60% 40% / 40% 60% 40% 60%',
          },
          '66%': { 
            transform: 'scale(0.9) rotate(240deg)',
            borderRadius: '40% 60% 40% 60% / 60% 40% 60% 40%',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            backgroundSize: '200% 200%',
            backgroundPosition: 'left center',
          },
          '50%': {
            backgroundSize: '200% 200%',
            backgroundPosition: 'right center',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'pulse-slow-ai': {
          '0%, 100%': {
            opacity: '0.3',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)',
          },
        },
        'glow-ai': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(16, 185, 129, 0.3)',
          },
        },
        'shimmer': {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
        'neural-pulse': {
          '0%, 100%': {
            opacity: '0.3',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.1)',
          },
        },
        'circuit-glow': {
          '0%, 100%': {
            borderColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0 0 5px rgba(16, 185, 129, 0.2)',
          },
          '50%': {
            borderColor: 'rgba(16, 185, 129, 0.5)',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-in-left': 'slide-in-left 0.6s ease-out',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'fast-bounce': 'fast-bounce 0.3s ease-in-out',
        'quick-pulse': 'quick-pulse 0.8s ease-in-out infinite',
        'instant-shake': 'instant-shake 0.4s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-up-delay-1': 'fadeInUp 0.6s ease-out 0.1s both',
        'fade-in-up-delay-2': 'fadeInUp 0.6s ease-out 0.2s both',
        'fade-in-up-delay-3': 'fadeInUp 0.6s ease-out 0.3s both',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        // AI-Enhanced Animations
        'float': 'float 6s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'morph-reverse': 'morph-reverse 10s ease-in-out infinite',
        'morph-slow': 'morph-slow 12s ease-in-out infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'fade-in-up-ai': 'fade-in-up 0.8s ease-out forwards',
        'pulse-slow-ai': 'pulse-slow-ai 4s ease-in-out infinite',
        'glow-ai': 'glow-ai 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'neural-pulse': 'neural-pulse 3s ease-in-out infinite',
        'circuit-glow': 'circuit-glow 2s ease-in-out infinite',
      },

      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      transitionDuration: {
        '50': '50ms',
        '75': '75ms',
        '100': '100ms',
      },
      boxShadow: {
        'apple': '0 2px 20px rgba(0, 0, 0, 0.08)',
        'apple-hover': '0 8px 40px rgba(0, 0, 0, 0.12)',
        'apple-button': '0 2px 8px rgba(0, 122, 255, 0.3)',
        'apple-button-hover': '0 4px 12px rgba(0, 122, 255, 0.4)',
        // AI-Enhanced Shadows
        'ai-glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'ai-glow-lg': '0 0 40px rgba(59, 130, 246, 0.4)',
        'ai-glow-xl': '0 0 60px rgba(59, 130, 246, 0.5)',
        'neural-glow': '0 0 30px rgba(16, 185, 129, 0.3)',
        'neural-glow-lg': '0 0 50px rgba(16, 185, 129, 0.4)',
        'circuit-glow': '0 0 15px rgba(168, 85, 247, 0.3)',
        'cyber-glow': '0 0 25px rgba(34, 197, 94, 0.4)',
      },
      backgroundImage: {
        // AI-Enhanced Gradients
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'ai-neural': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'ai-cyber': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'ai-matrix': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'ai-quantum': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'ai-hologram': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'neural-mesh': 'linear-gradient(45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        'cyber-grid': 'linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent), linear-gradient(transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      },
      backgroundSize: {
        'cyber-grid': '50px 50px',
      },
      backdropBlur: {
        xs: '2px',
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        wide: '0.01em',
      },
      lineHeight: {
        '11': '2.75rem',
        '12': '3rem',
        '13': '3.25rem',
        '14': '3.5rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;

export default config;
