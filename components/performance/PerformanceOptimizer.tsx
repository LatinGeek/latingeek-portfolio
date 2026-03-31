'use client';

import { useEffect, useRef } from 'react';
import { 
  performanceMonitor, 
  resourcePreloader, 
  memoryManager,
  lazyLoader,
  performanceBudget 
} from '@/lib/performance';

interface PerformanceOptimizerProps {
  children?: React.ReactNode;
  preloadFonts?: boolean;
  preloadImages?: boolean;
  enableMonitoring?: boolean;
  enableMemoryCheck?: boolean;
}

export default function PerformanceOptimizer({
  children,
  preloadFonts = true,
  preloadImages = true,
  enableMonitoring = true,
  enableMemoryCheck = false,
}: PerformanceOptimizerProps) {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Mark initial load
    performanceMonitor.mark('page-load-start');

    // Preload critical resources
    if (preloadFonts) {
      resourcePreloader.preloadFonts();
    }

    if (preloadImages) {
      resourcePreloader.preloadImages();
    }

    // Setup performance monitoring
    if (enableMonitoring && typeof window !== 'undefined') {
      // Monitor page load performance
      const handleLoad = () => {
        performanceMonitor.mark('page-load-end');
        performanceMonitor.measure('page-load-total', 'page-load-start', 'page-load-end');
        
        // Measure First Contentful Paint
        if ('performance' in window) {
          const paintEntries = performance.getEntriesByType('paint');
          paintEntries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              performanceMonitor.logMetric('FCP', entry.startTime);
              performanceBudget.checkBudget('fcp', entry.startTime);
            }
          });
        }
      };

      // Monitor largest contentful paint
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcp = lastEntry.startTime;
        performanceMonitor.logMetric('LCP', lcp);
        performanceBudget.checkBudget('lcp', lcp);
      });

      // Monitor first input delay
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          const fid = entry.processingStart - entry.startTime;
          performanceMonitor.logMetric('FID', fid);
          performanceBudget.checkBudget('fid', fid);
        });
      });

      // Monitor cumulative layout shift
      const clsObserver = new PerformanceObserver((entryList) => {
        let clsValue = 0;
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        });
        performanceMonitor.logMetric('CLS', clsValue);
        performanceBudget.checkBudget('cls', clsValue);
      });

      try {
        window.addEventListener('load', handleLoad, { once: true });
        
        if ('PerformanceObserver' in window) {
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
          fidObserver.observe({ type: 'first-input', buffered: true });
          clsObserver.observe({ type: 'layout-shift', buffered: true });
        }
      } catch (error) {
        console.warn('Performance monitoring setup failed:', error);
      }

      // Memory usage monitoring
      if (enableMemoryCheck && 'memory' in performance) {
        const checkMemory = () => {
          memoryManager.checkMemoryUsage();
        };
        
        // Check memory every 30 seconds
        const memoryInterval = setInterval(checkMemory, 30000);
        
        return () => {
          window.removeEventListener('load', handleLoad);
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
          clearInterval(memoryInterval);
          memoryManager.cleanup();
          lazyLoader.disconnect();
        };
      }

      return () => {
        window.removeEventListener('load', handleLoad);
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
        memoryManager.cleanup();
        lazyLoader.disconnect();
      };
    }

    return () => {
      memoryManager.cleanup();
      lazyLoader.disconnect();
    };
  }, [preloadFonts, preloadImages, enableMonitoring, enableMemoryCheck]);

  // Component for measuring render performance
  const MeasureRender = ({ name, children }: { name: string; children: React.ReactNode }) => {
    useEffect(() => {
      performanceMonitor.mark(`${name}-render-start`);
      return () => {
        performanceMonitor.mark(`${name}-render-end`);
        performanceMonitor.measure(`${name}-render-time`, `${name}-render-start`, `${name}-render-end`);
      };
    }, []);

    return <>{children}</>;
  };

  return (
    <>
      {/* Preload hints for critical resources */}
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
        crossOrigin="anonymous"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="https://github.com" />
      <link rel="dns-prefetch" href="https://linkedin.com" />
      <link rel="dns-prefetch" href="https://twitter.com" />

      {/* Measure critical sections */}
      <MeasureRender name="performance-optimizer">
        {children}
      </MeasureRender>

      {/* Performance budget display (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 z-50 hidden md:block">
          <div className="rounded-lg bg-gray-900/90 backdrop-blur-sm border border-gray-700 p-3 text-xs">
            <div className="font-medium text-gray-300 mb-2">Performance Budgets</div>
            <div className="space-y-1">
              {Object.entries(performanceBudget.getBudgets()).map(([metric, budget]) => (
                <div key={metric} className="flex justify-between">
                  <span className="text-gray-400">{metric.toUpperCase()}:</span>
                  <span className="text-gray-300">{budget}ms</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Hook for measuring component performance
export function usePerformanceMeasure(name: string) {
  useEffect(() => {
    performanceMonitor.mark(`${name}-mount-start`);
    return () => {
      performanceMonitor.mark(`${name}-mount-end`);
      performanceMonitor.measure(`${name}-mount-time`, `${name}-mount-start`, `${name}-mount-end`);
    };
  }, [name]);
}

// Hook for lazy loading with intersection observer
export function useLazyLoad<T extends HTMLElement>(
  callback: () => void,
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      lazyLoader.observe(ref.current, callback);
    }
  }, [callback]);

  return ref;
}

// Hook for debounced callbacks
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => callback(...args), delay);
  };
}

// Hook for throttled callbacks
export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  limit: number
) {
  const lastRun = useRef(Date.now());

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastRun.current >= limit) {
      callback(...args);
      lastRun.current = now;
    }
  };
}