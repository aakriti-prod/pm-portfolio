import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../utils/animations';

export interface NavigationProps {
  variant?: 'light' | 'dark';
  className?: string;
  onItemClick?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'case-studies', label: 'Case Studies', href: '#case-studies' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

const Navigation: React.FC<NavigationProps> = ({ 
  variant = 'light', 
  className = '',
  onItemClick 
}) => {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100; // Offset for header height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    
    setActiveSection(id);
    onItemClick?.();
  };

  const baseClasses = variant === 'light' 
    ? 'text-gray-700 hover:text-blue-600' 
    : 'text-white/90 hover:text-white';

  const activeClasses = variant === 'light'
    ? 'text-blue-600 font-semibold'
    : 'text-white font-semibold';

  return (
    <motion.nav 
      className={className} 
      role="navigation" 
      aria-label="Main navigation"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {navItems.map((item, index) => {
        const isActive = activeSection === item.id;
        
        return (
          <motion.button
            key={item.id}
            variants={staggerItem}
            whileHover={{ 
              scale: 1.05,
              y: -2,
              backgroundColor: variant === 'light' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.1)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick(item.id)}
            className={`
              relative px-3 py-3 sm:px-4 sm:py-2 text-sm sm:text-base font-medium transition-all duration-300 rounded-lg
              min-h-[44px] min-w-[44px] touch-optimized focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${isActive ? activeClasses : baseClasses}
            `}
            aria-current={isActive ? 'page' : undefined}
            aria-label={`Navigate to ${item.label} section`}
            role="button"
            tabIndex={0}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {item.label}
            </motion.span>
            
            {/* Active indicator with enhanced animation */}
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                  variant === 'light' ? 'bg-blue-600' : 'bg-white'
                }`}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 500, 
                  damping: 30,
                  duration: 0.3
                }}
              />
            )}
            
            {/* Hover glow effect */}
            <motion.div
              className={`absolute inset-0 rounded-lg ${
                variant === 'light' ? 'bg-blue-600' : 'bg-white'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 0.1, scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        );
      })}
    </motion.nav>
  );
};

export default Navigation;