import React, { useEffect, useState } from 'react';
import { usePerformance } from '../hooks/usePerformance';

export interface PerformanceMonitorProps {
  enabled?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  enabled = process.env.NODE_ENV === 'development' 
}) => {
  const [metrics, setMetrics] = useState<any>(null);
  const { measurePerformance } = usePerformance();

  useEffect(() => {
    if (!enabled) return;

    const measureAndReport = () => {
      const performanceMetrics = measurePerformance();
      if (performanceMetrics) {
        setMetrics(performanceMetrics);
        
        // Log performance metrics in development
        if (process.env.NODE_ENV === 'development') {
          console.group('🚀 Performance Metrics');
          console.log('Load Time:', `${performanceMetrics.loadTime.toFixed(2)}ms`);
          console.log('Render Time:', `${performanceMetrics.renderTime.toFixed(2)}ms`);
          console.log('Interaction Time:', `${performanceMetrics.interactionTime.toFixed(2)}ms`);
          console.groupEnd();
        }
      }
    };

    // Measure performance after page load
    if (document.readyState === 'complete') {
      setTimeout(measureAndReport, 100);
    } else {
      window.addEventListener('load', () => {
        setTimeout(measureAndReport, 100);
      });
    }

    // Measure Core Web Vitals if available
    if ('web-vital' in window) {
      // This would integrate with web-vitals library if installed
      console.log('Web Vitals monitoring available');
    }
  }, [enabled, measurePerformance]);

  // Don't render anything in production
  if (!enabled || process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-3 rounded-lg text-xs font-mono z-50">
      <div className="mb-2 font-bold">Performance Monitor</div>
      {metrics && (
        <div className="space-y-1">
          <div>Load: {metrics.loadTime.toFixed(0)}ms</div>
          <div>Render: {metrics.renderTime.toFixed(0)}ms</div>
          <div>Interactive: {metrics.interactionTime.toFixed(0)}ms</div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;