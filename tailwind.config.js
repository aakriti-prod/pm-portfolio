/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Colors
    'bg-blue-50', 'bg-blue-100', 'bg-blue-400', 'bg-blue-500', 'bg-blue-600', 'bg-blue-700', 'bg-blue-800',
    'bg-indigo-100', 'bg-indigo-600', 'bg-indigo-800',
    'bg-gray-50', 'bg-gray-100', 'bg-gray-200', 'bg-gray-300', 'bg-gray-600', 'bg-gray-700', 'bg-gray-800', 'bg-gray-900',
    'bg-white', 'bg-black', 'bg-green-400', 'bg-green-500', 'bg-yellow-400', 'bg-red-500',
    'text-blue-50', 'text-blue-100', 'text-blue-600', 'text-blue-700',
    'text-gray-400', 'text-gray-600', 'text-gray-700', 'text-gray-800', 'text-gray-900',
    'text-white', 'text-black',
    'border-blue-600', 'border-gray-200', 'border-gray-300', 'border-white',
    // Hover states
    'hover:bg-blue-50', 'hover:bg-blue-600', 'hover:bg-blue-700', 'hover:bg-white', 'hover:bg-gray-50',
    'hover:text-blue-600', 'hover:text-white', 'hover:text-gray-400',
    'hover:border-blue-700', 'hover:shadow-lg', 'hover:-translate-y-1',
    // Focus states
    'focus:ring-blue-500', 'focus:ring-white', 'focus:ring-gray-500',
    'focus:border-transparent', 'focus:outline-none',
    // Gradients
    'from-blue-50', 'to-indigo-100', 'from-blue-600', 'via-blue-700', 'to-indigo-800',
    'from-blue-400', 'to-indigo-600', 'from-blue-100', 'to-indigo-100',
    // Sizes and spacing
    'w-4', 'w-5', 'w-6', 'w-8', 'w-48', 'w-72', 'w-80',
    'h-4', 'h-5', 'h-6', 'h-8', 'h-48', 'h-72', 'h-80',
    'p-3', 'p-4', 'p-6', 'p-8', 'px-3', 'px-4', 'px-6', 'py-2', 'py-3',
    'mb-2', 'mb-4', 'mb-6', 'mb-8', 'mr-1', 'mr-2', 'ml-1',
    // Layout
    'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'gap-4', 'gap-6',
    'max-w-2xl', 'max-w-3xl', 'max-w-7xl',
    // Responsive
    'sm:text-xl', 'sm:text-2xl', 'sm:text-4xl', 'sm:text-5xl', 'md:text-5xl', 'md:text-6xl',
    'sm:w-auto', 'sm:mb-4', 'sm:mb-8', 'sm:mb-16', 'sm:py-16', 'md:py-20',
    'lg:text-left', 'lg:mx-0', 'lg:grid-cols-3',
    // Animations and effects
    'backdrop-blur-sm', 'mix-blend-multiply', 'filter', 'blur-xl',
    'transition-all', 'transition-colors', 'transition-shadow', 'duration-200', 'duration-300',
    'animate-pulse', 'animate-spin',
    // Opacity and visibility
    'opacity-0', 'opacity-50', 'opacity-80', 'opacity-100',
    'bg-white/10', 'bg-white/20', 'bg-black/50',
  ],
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
  plugins: [],
}