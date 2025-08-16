import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';
import Navigation from './Navigation';

export interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      } ${className}`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 cursor-pointer touch-optimized min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
            onClick={() => {
              document.getElementById('hero')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
            aria-label="Go to top of page"
            type="button"
          >
            <div className={`p-2 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'bg-blue-600' : 'bg-white/10 backdrop-blur-sm'
            }`}>
              <User className={`w-5 h-5 sm:w-6 sm:h-6 ${
                isScrolled ? 'text-white' : 'text-blue-600'
              }`} />
            </div>
            <div className="hidden xs:block">
              <h1 className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                Sarah Johnson
              </h1>
              <p className={`text-xs sm:text-sm transition-colors duration-300 ${
                isScrolled ? 'text-gray-600' : 'text-white/80'
              }`}>
                Product Manager
              </p>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <Navigation 
              variant={isScrolled ? 'light' : 'dark'} 
              className="flex items-center space-x-6 xl:space-x-8"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className={`lg:hidden p-3 rounded-lg transition-colors duration-300 touch-optimized min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isScrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-gray-200/20 bg-white/95 backdrop-blur-md"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="px-4 py-6">
              <Navigation 
                variant="light" 
                className="flex flex-col space-y-2"
                onItemClick={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;