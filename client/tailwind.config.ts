import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'navbar-border' : '#ECEEEE',
        'navbar-button' : '#5823F5',
        'visions-bg' : '#F9F9F9',
        'category-desc' : '#C8C8C8',
        'movie-desc' : '#5C5C5C',
      },
      fontFamily: {
      },
    },
  },
  plugins: [],
}
export default config
