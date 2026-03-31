/**
 * Performance monitoring and optimization utilities
 */

// Performance metrics tracking
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();
  private marks: Map<string, number> = new Map();

  private constructor() {
    if (typeof window !== 'undefined') {
      this.setupPerformanceObserver();
    }
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Mark a performance point
  mark(name: string): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(name);
      this.marks.set(name, performance.now());
    }
  }

  // Measure between two marks
  measure(measureName: string, startMark: string, endMark: string): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      try {
        performance.measure(measureName, startMark, endMark);
        const entries = performance.getEntriesByName(measureName);
        if (entries.length > 0) {
          this.metrics.set(measureName, entries[0].duration);
          this.logMetric(measureName, entries[0].duration);
        }
      } catch (error) {
        console.warn(`Failed to measure ${measureName}:`, error);
      }
    }
  }

  // Log a metric
  logMetric(name: string, value: number): void {
    console.log(`📊 Performance Metric: ${name} = ${value.toFixed(2)}ms`);
    
    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      // You can send to your analytics service here
      // Example: sendToAnalytics(name, value);
    }
  }

  // Get all metrics
  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  // Clear all marks and measures
  clear(): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.clearMarks();
      performance.clearMeasures();
    }
    this.marks.clear();
    this.metrics.clear();
  }

  // Setup Performance Observer for Core Web Vitals
  private setupPerformanceObserver(): void {
    if ('PerformanceObserver' in window) {
      // Observe Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.logMetric('LCP', lastEntry.startTime);
      });

      // Observe First Input Delay
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          const fid = entry.processingStart - entry.startTime;
          this.logMetric('FID', fid);
        });
      });

      // Observe Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((entryList) => {
        let clsValue = 0;
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        });
        this.logMetric('CLS', clsValue);
      });

      try {
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
        fidObserver.observe({ type: 'first-input', buffered: true });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (error) {
        console.warn('Performance Observer not supported:', error);
      }
    }
  }
}

// Image optimization utilities
export class ImageOptimizer {
  // Generate optimized image src
  static getOptimizedSrc(
    src: string,
    options: {
      width?: number;
      height?: number;
      quality?: number;
      format?: 'webp' | 'avif' | 'jpg' | 'png';
    } = {}
  ): string {
    const { width, height, quality = 75, format = 'webp' } = options;
    
    // For external images, return as-is (consider using a CDN in production)
    if (src.startsWith('http')) {
      return src;
    }
    
    // For local images, Next.js Image component handles optimization
    return src;
  }

  // Lazy loading configuration
  static getLazyLoadingConfig() {
    return {
      loading: 'lazy' as const,
      decoding: 'async' as const,
    };
  }

  // Generate srcset for responsive images
  static generateSrcSet(
    src: string,
    sizes: number[] = [640, 750, 828, 1080, 1200, 1920]
  ): string {
    return sizes
      .map((size) => `${src}?w=${size} ${size}w`)
      .join(', ');
  }
}

// Resource preloading
export class ResourcePreloader {
  private preloaded = new Set<string>();

  // Preload critical resources
  preloadResource(url: string, as: string): void {
    if (this.preloaded.has(url)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = as;
    
    if (as === 'font') {
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    } else if (as === 'image') {
      link.type = 'image/webp';
    }

    document.head.appendChild(link);
    this.preloaded.add(url);
  }

  // Preload critical fonts
  preloadFonts(): void {
    this.preloadResource('/fonts/inter-var.woff2', 'font');
    // Add other critical fonts here
  }

  // Preload critical images
  preloadImages(): void {
    this.preloadResource('/images/avatar.webp', 'image');
    // Add other critical images here
  }
}

// Code splitting utilities
export class CodeSplitter {
  // Dynamic import with loading state
  static async dynamicImport<T>(
    importFn: () => Promise<T>,
    fallback?: React.ReactNode
  ): Promise<{ default: T }> {
    try {
      return await importFn();
    } catch (error) {
      console.error('Dynamic import failed:', error);
      throw error;
    }
  }

  // Check if component is above the fold
  static isAboveTheFold(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight;
  }
}

// Memory management
export class MemoryManager {
  private static cleanupCallbacks: (() => void)[] = [];

  // Register cleanup callback
  static registerCleanup(callback: () => void): void {
    this.cleanupCallbacks.push(callback);
  }

  // Clean up resources
  static cleanup(): void {
    this.cleanupCallbacks.forEach(callback => callback());
    this.cleanupCallbacks = [];
  }

  // Check memory usage (browser only)
  static checkMemoryUsage(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      console.log('Memory usage:', {
        usedJSHeapSize: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        totalJSHeapSize: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        jsHeapSizeLimit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`,
      });
    }
  }
}

// Debounce utility for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Intersection Observer for lazy loading
export class LazyLoader {
  private observer: IntersectionObserver | null = null;
  private observedElements = new Map<Element, () => void>();

  constructor(options: IntersectionObserverInit = {}) {
    if (typeof window !== 'undefined') {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const callback = this.observedElements.get(entry.target);
            if (callback) {
              callback();
              this.observer?.unobserve(entry.target);
              this.observedElements.delete(entry.target);
            }
          }
        });
      }, {
        rootMargin: '50px',
        threshold: 0.1,
        ...options,
      });
    }
  }

  observe(element: Element, callback: () => void): void {
    if (this.observer) {
      this.observedElements.set(element, callback);
      this.observer.observe(element);
    } else {
      // Fallback: execute immediately
      callback();
    }
  }

  disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observedElements.clear();
    }
  }
}

// Performance budget checker
export class PerformanceBudget {
  private budgets: Record<string, number> = {
    lcp: 2500, // 2.5 seconds
    fid: 100,  // 100 milliseconds
    cls: 0.1,  // 0.1
    tti: 3800, // 3.8 seconds
  };

  checkBudget(metric: string, value: number): boolean {
    const budget = this.budgets[metric.toLowerCase()];
    if (!budget) return true;
    
    const withinBudget = value <= budget;
    if (!withinBudget) {
      console.warn(`⚠️ Performance budget exceeded: ${metric} = ${value}ms (budget: ${budget}ms)`);
    }
    return withinBudget;
  }

  getBudgets(): Record<string, number> {
    return { ...this.budgets };
  }
}

// Export singleton instances
export const performanceMonitor = PerformanceMonitor.getInstance();
export const imageOptimizer = new ImageOptimizer();
export const resourcePreloader = new ResourcePreloader();
export const codeSplitter = new CodeSplitter();
export const memoryManager = new MemoryManager();
export const lazyLoader = new LazyLoader();
export const performanceBudget = new PerformanceBudget();