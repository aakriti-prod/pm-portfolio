import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Github,
  ExternalLink,
  Heart
} from 'lucide-react';
import type { Profile } from '../types';

export interface FooterProps {
  profile: Profile;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ profile, className = '' }) => {
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'github':
        return <Github className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={`bg-gray-900 text-white ${className}`} style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} role="contentinfo" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="sm:col-span-2 lg:col-span-2 text-center sm:text-left"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{profile.name}</h3>
            <p className="text-blue-400 text-base sm:text-lg mb-3 sm:mb-4">{profile.title}</p>
            <p className="text-gray-300 mb-4 sm:mb-6 max-w-md leading-relaxed text-sm sm:text-base">
              {profile.summary.split('.')[0]}.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 text-gray-300 hover:text-white transition-colors duration-300 touch-optimized min-h-[44px]"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span className="text-sm sm:text-base">{profile.email}</span>
              </a>
              
              {profile.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 text-gray-300 hover:text-white transition-colors duration-300 touch-optimized min-h-[44px]"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  <span className="text-sm sm:text-base">{profile.phone}</span>
                </a>
              )}
              
              <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 text-gray-300 min-h-[44px]">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span className="text-sm sm:text-base">{profile.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center sm:text-left"
          >
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
            <nav className="space-y-1 sm:space-y-2" aria-label="Footer navigation">
              {[
                { label: 'About', href: '#about' },
                { label: 'Case Studies', href: '#case-studies' },
                { label: 'Skills', href: '#skills' },
                { label: 'Experience', href: '#experience' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    const element = document.getElementById(link.href.substring(1));
                    if (element) {
                      const headerHeight = 80;
                      const elementPosition = element.offsetTop - headerHeight;
                      window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="block text-gray-300 hover:text-white transition-colors duration-300 touch-optimized min-h-[44px] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  aria-label={`Navigate to ${link.label} section`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Social Links & Resume */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center sm:text-left"
          >
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Connect</h4>
            
            {/* Social Links */}
            <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
              {profile.socialLinks.map((social) => (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 sm:p-3 bg-gray-800 rounded-lg text-gray-300 hover:text-white hover:bg-blue-600 transition-all duration-300 btn-touch touch-optimized"
                  aria-label={`Visit ${social.platform} profile`}
                >
                  {getSocialIcon(social.platform)}
                </motion.a>
              ))}
            </div>

            {/* Resume Download */}
            {profile.resumeUrl && (
              <motion.a
                href={profile.resumeUrl}
                download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 btn-touch touch-optimized text-sm sm:text-base"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Download Resume</span>
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              <span>© {new Date().getFullYear()} {profile.name}. Made with</span>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-current" />
              <span>and React</span>
            </div>
            
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-white transition-colors duration-300 touch-optimized text-xs sm:text-sm min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
              aria-label="Scroll back to top of page"
            >
              Back to top ↑
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;