/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body:    ['var(--font-body)'],
      },
      colors: {
        // ── Core ──
        primary:   '#3B82F6',
        secondary: '#22D3EE',
        accent:    '#A7F3D0',

        // ── Surface ──
        bg:     '#F4F8FB',
        card:   '#FFFFFF',
        border: '#E2E8F0',

        // ── Text ──
        text:  '#0F172A',
        muted: '#64748B',
        faint: '#94A3B8',

        // ── Sidebar (accessed as sidebar-bg etc via CSS var, kept here for ref) ──
        'sidebar-dark': '#0F172A',
        'sidebar-mid':  '#1E293B',
        'sidebar-blue': '#1E3A5F',
      },
      borderRadius: {
        xl:  '16px',
        '2xl': '20px',
      },
      boxShadow: {
        soft:  '0 4px 24px rgba(59, 130, 246, 0.08)',
        hover: '0 8px 32px rgba(59, 130, 246, 0.15)',
        glow:  '0 0 0 3px rgba(59, 130, 246, 0.18)',
      },
      backgroundImage: {
        // ── The ONE gradient, used everywhere ──
        'brand': 'linear-gradient(135deg, #3B82F6, #22D3EE)',
        'sidebar': 'linear-gradient(175deg, #0F172A 0%, #1E293B 60%, #1E3A5F 100%)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        DEFAULT: '220ms',
      },
      animation: {
        'fade-in':    'fadeIn 0.3s ease-out',
        'slide-up':   'slideUp 0.22s cubic-bezier(0.4,0,0.2,1)',
        'fade-up':    'fadeUpIn 0.4s cubic-bezier(0.4,0,0.2,1) both',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUpIn: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 3px rgba(59,130,246,0.25)' },
          '50%':      { boxShadow: '0 0 0 6px rgba(59,130,246,0.08)' },
        },
      },
    },
  },
  plugins: [],
}
