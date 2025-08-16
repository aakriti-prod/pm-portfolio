import { useEffect, useCallback } from 'react';

export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
}

export const usePerformance = () => {
  // Preload critical resources
  const preloadImage = useCallback((src: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  }, []);

  // Preload critical fonts
  const preloadFont = useCallback((href: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = href;
    document.head.appendChild(link);
  }, []);

  // Optimize images for WebP support
  const getOptimizedImageSrc = useCallback((src: string): string => {
    if (!src) return src;
    
    // Check if browser supports WebP
    const supportsWebP = (() => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const dataUrl = canvas.toDataURL('image/webp');
        return dataUrl && dataUrl.indexOf('data:image/webp') === 0;
      } catch {
        return false;
      }
    })();

    if (supportsWebP && !src.includes('.webp')) {
      // Convert common image extensions to WebP
      return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    
    return src;
  }, []);

  // Measure performance metrics
  const measurePerformance = useCallback((): PerformanceMetrics | null => {
    if (!window.performance) return null;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    const loadTime = navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0;
    const renderTime = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
    const interactionTime = navigation ? navigation.domInteractive - navigation.fetchStart : 0;

    return {
      loadTime,
      renderTime,
      interactionTime
    };
  }, []);

  // Report performance metrics (in production, this could send to analytics)
  const reportPerformance = useCallback(() => {
    const metrics = measurePerformance();
    if (metrics && process.env.NODE_ENV === 'development') {
      console.log('Performance Metrics:', metrics);
    }
  }, [measurePerformance]);

  // Initialize performance monitoring
  useEffect(() => {
    // Report performance after page load
    if (document.readyState === 'complete') {
      setTimeout(reportPerformance, 0);
    } else {
      window.addEventListener('load', reportPerformance);
    }

    return () => {
      window.removeEventListener('load', reportPerformance);
    };
  }, [reportPerformance]);

  return {
    preloadImage,
    preloadFont,
    getOptimizedImageSrc,
    measurePerformance,
    reportPerformance
  };
};

export default usePerformance;