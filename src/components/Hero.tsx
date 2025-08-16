import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Download, Eye, Github, Linkedin, Twitter } from 'lucide-react';
import { Button, LazyImage } from './';
import type { Profile } from '../types';

export interface HeroProps {
  profile: Profile;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ profile, className = '' }) => {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedRole, setDisplayedRole] = useState('');
  const [titleComplete, setTitleComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Parallax scroll effects
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);

  // Animated typing effect
  useEffect(() => {
    const titleText = profile.name;
    const roleText = profile.title;
    
    let titleIndex = 0;
    let roleIndex = 0;

    // Type the name first
    const titleTimer = setInterval(() => {
      if (titleIndex < titleText.length) {
        setDisplayedTitle(titleText.slice(0, titleIndex + 1));
        titleIndex++;
      } else {
        clearInterval(titleTimer);
        setTitleComplete(true);
        
        // Start typing the role after a brief pause
        setTimeout(() => {
          const roleTimer = setInterval(() => {
            if (roleIndex < roleText.length) {
              setDisplayedRole(roleText.slice(0, roleIndex + 1));
              roleIndex++;
            } else {
              clearInterval(roleTimer);
              // Show the rest of the content after typing is complete
              setTimeout(() => setShowContent(true), 500);
            }
          }, 100);
        }, 300);
      }
    }, 150);

    return () => clearInterval(titleTimer);
  }, [profile.name, profile.title]);

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'github':
        return <Github className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const scrollToWork = () => {
    document.getElementById('case-studies')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const downloadResume = () => {
    if (profile.resumeUrl) {
      window.open(profile.resumeUrl, '_blank');
    }
  };

  return (
    <section 
      id="hero" 
      className={`min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white flex items-center relative overflow-hidden safe-area-top ${className}`}
      role="banner"
      aria-label="Hero section with profile introduction"
    >
      {/* Background Pattern with Parallax */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ y: backgroundY }}
      >
        <motion.div 
          className="absolute top-10 sm:top-20 left-4 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-white rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute top-20 sm:top-40 right-4 sm:right-20 w-48 sm:w-72 h-48 sm:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-10 sm:bottom-20 left-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
      </motion.div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative z-10"
        style={{ y: contentY }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            {/* Professional Headshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8 lg:hidden flex justify-center"
            >
              <div className="relative">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 p-1">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {profile.profileImage ? (
                      <LazyImage 
                        src={profile.profileImage} 
                        alt={profile.name}
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-blue-600">
                          {profile.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Floating elements around the image */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full opacity-80"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-400 rounded-full opacity-80"
                />
              </div>
            </motion.div>

            {/* Animated Title */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4 leading-tight">
                {displayedTitle}
                {!titleComplete && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-0.5 sm:w-1 h-8 sm:h-12 bg-white ml-1"
                  />
                )}
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 min-h-[2rem] sm:min-h-[2.5rem]">
                {displayedRole}
                {titleComplete && displayedRole.length < profile.title.length && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-0.5 sm:w-1 h-5 sm:h-6 bg-blue-100 ml-1"
                  />
                )}
              </p>
            </div>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-blue-50 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {profile.summary}
            </motion.p>

            {/* Call-to-Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8"
            >
              <Button 
                variant="secondary" 
                size="lg"
                onClick={scrollToWork}
                className="bg-white text-blue-600 hover:bg-blue-50 focus:ring-white touch-optimized w-full sm:w-auto"
              >
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                View My Work
              </Button>
              {profile.resumeUrl && (
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={downloadResume}
                  className="border-white text-white hover:bg-white hover:text-blue-600 focus:ring-white touch-optimized w-full sm:w-auto"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Download Resume
                </Button>
              )}
            </motion.div>

            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center lg:justify-start space-x-3 sm:space-x-4"
            >
              {profile.socialLinks.map((social, index) => (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 group touch-optimized min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  aria-label={`Visit ${social.platform} profile`}
                >
                  <div className="text-white group-hover:text-blue-100 transition-colors duration-300">
                    {getSocialIcon(social.platform)}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Column - Desktop Only */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 p-2">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  {profile.profileImage ? (
                    <LazyImage 
                      src={profile.profileImage} 
                      alt={profile.name}
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-6xl font-bold text-blue-600">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {/* Floating elements around the image */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full opacity-80"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-4 -left-4 w-8 h-8 bg-green-400 rounded-full opacity-80"
              />
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 -right-8 w-6 h-6 bg-pink-400 rounded-full opacity-80"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded-lg p-2"
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
            aria-label="Scroll to about section"
            type="button"
          >
            <span className="text-sm text-blue-100 mb-2" aria-hidden="true">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 text-white" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;