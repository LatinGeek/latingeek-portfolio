/**
 * Cross-browser compatibility utilities
 * Detects browser features and provides fallbacks
 */

interface BrowserInfo {
  name: string;
  version: number;
  isModern: boolean;
  supports: {
    cssGrid: boolean;
    flexboxGap: boolean;
    backdropFilter: boolean;
    cssVariables: boolean;
    webp: boolean;
    avif: boolean;
    intersectionObserver: boolean;
    resizeObserver: boolean;
    webGL: boolean;
    webWorkers: boolean;
  };
}

class BrowserCompatibility {
  private static instance: BrowserCompatibility;
  private browserInfo: BrowserInfo | null = null;

  private constructor() {
    this.detectBrowser();
  }

  static getInstance(): BrowserCompatibility {
    if (!BrowserCompatibility.instance) {
      BrowserCompatibility.instance = new BrowserCompatibility();
    }
    return BrowserCompatibility.instance;
  }

  private detectBrowser(): void {
    if (typeof window === 'undefined') return;

    const userAgent = navigator.userAgent;
    let name = 'unknown';
    let version = 0;

    // Detect browser
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
      name = 'chrome';
      const match = userAgent.match(/Chrome\/(\d+)/);
      version = match ? parseInt(match[1], 10) : 0;
    } else if (userAgent.includes('Firefox')) {
      name = 'firefox';
      const match = userAgent.match(/Firefox\/(\d+)/);
      version = match ? parseInt(match[1], 10) : 0;
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      name = 'safari';
      const match = userAgent.match(/Version\/(\d+)/);
      version = match ? parseInt(match[1], 10) : 0;
    } else if (userAgent.includes('Edg')) {
      name = 'edge';
      const match = userAgent.match(/Edg\/(\d+)/);
      version = match ? parseInt(match[1], 10) : 0;
    }

    // Feature detection
    const supports = {
      cssGrid: this.testCSSGrid(),
      flexboxGap: this.testFlexboxGap(),
      backdropFilter: this.testBackdropFilter(),
      cssVariables: this.testCSSVariables(),
      webp: this.testWebP(),
      avif: this.testAVIF(),
      intersectionObserver: 'IntersectionObserver' in window,
      resizeObserver: 'ResizeObserver' in window,
      webGL: this.testWebGL(),
      webWorkers: 'Worker' in window,
    };

    // Consider modern if supports all critical features
    const isModern = Object.values(supports).every(Boolean) && version >= 80;

    this.browserInfo = {
      name,
      version,
      isModern,
      supports,
    };

    this.applyBrowserFixes();
  }

  private testCSSGrid(): boolean {
    if (typeof window === 'undefined') return true;
    const element = document.createElement('div');
    return 'grid' in element.style;
  }

  private testFlexboxGap(): boolean {
    if (typeof window === 'undefined') return true;
    const element = document.createElement('div');
    return 'gap' in element.style;
  }

  private testBackdropFilter(): boolean {
    if (typeof window === 'undefined') return true;
    const element = document.createElement('div');
    return 'backdropFilter' in element.style || 'webkitBackdropFilter' in element.style;
  }

  private testCSSVariables(): boolean {
    if (typeof window === 'undefined') return true;
    const element = document.createElement('div');
    element.style.setProperty('--test-var', 'red');
    return element.style.getPropertyValue('--test-var') === 'red';
  }

  private testWebP(): boolean {
    if (typeof window === 'undefined') return true;
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  }

  private testAVIF(): boolean {
    if (typeof window === 'undefined') return true;
    const avif = new Image();
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    return new Promise((resolve) => {
      avif.onload = () => resolve(true);
      avif.onerror = () => resolve(false);
    }).then(() => false).catch(() => false);
  }

  private testWebGL(): boolean {
    if (typeof window === 'undefined') return true;
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      return false;
    }
  }

  private applyBrowserFixes(): void {
    if (!this.browserInfo) return;

    const { name, version, supports } = this.browserInfo;

    // Apply CSS fixes based on browser
    const style = document.createElement('style');
    style.id = 'browser-compatibility-fixes';

    let css = '';

    // Safari fixes
    if (name === 'safari' && version < 15) {
      css += `
        /* Safari < 15: Fix for backdrop-filter */
        .glass-effect {
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: none !important;
        }
      `;
    }

    // Firefox fixes
    if (name === 'firefox' && version < 70) {
      css += `
        /* Firefox < 70: Fix for scrollbar styling */
        * {
          scrollbar-width: thin;
          scrollbar-color: #4b5563 #1f2937;
        }
      `;
    }

    // Edge fixes
    if (name === 'edge' && version < 79) {
      css += `
        /* Edge Legacy: Fix for CSS Grid */
        .grid-fallback {
          display: flex;
          flex-wrap: wrap;
        }
      `;
    }

    // Fallback for missing backdrop-filter
    if (!supports.backdropFilter) {
      css += `
        .backdrop-blur-md,
        .backdrop-blur-lg,
        .backdrop-blur-xl {
          background: rgba(0, 0, 0, 0.7) !important;
          backdrop-filter: none !important;
        }
      `;
    }

    // Fallback for missing CSS Grid
    if (!supports.cssGrid) {
      css += `
        .grid {
          display: flex !important;
          flex-wrap: wrap !important;
        }
        
        .grid > * {
          flex: 1 1 300px !important;
          margin: 0.5rem !important;
        }
      `;
    }

    // Fallback for missing flexbox gap
    if (!supports.flexboxGap) {
      css += `
        .gap-1 > * + * { margin-left: 0.25rem; }
        .gap-2 > * + * { margin-left: 0.5rem; }
        .gap-3 > * + * { margin-left: 0.75rem; }
        .gap-4 > * + * { margin-left: 1rem; }
        .gap-6 > * + * { margin-left: 1.5rem; }
        .gap-8 > * + * { margin-left: 2rem; }
      `;
    }

    if (css) {
      style.textContent = css;
      document.head.appendChild(style);
    }
  }

  getBrowserInfo(): BrowserInfo | null {
    return this.browserInfo;
  }

  isModernBrowser(): boolean {
    return this.browserInfo?.isModern ?? true;
  }

  supports(feature: keyof BrowserInfo['supports']): boolean {
    return this.browserInfo?.supports[feature] ?? true;
  }

  getBrowserName(): string {
    return this.browserInfo?.name ?? 'unknown';
  }

  getBrowserVersion(): number {
    return this.browserInfo?.version ?? 0;
  }

  // Generate browser-specific class names
  getBrowserClasses(): string {
    if (!this.browserInfo) return '';
    
    const classes = [];
    classes.push(`browser-${this.browserInfo.name}`);
    classes.push(`browser-${this.browserInfo.name}-${Math.floor(this.browserInfo.version / 10)}`);
    
    if (!this.browserInfo.isModern) {
      classes.push('browser-legacy');
    }
    
    return classes.join(' ');
  }

  // Check if we should load polyfills
  shouldLoadPolyfills(): boolean {
    return !this.isModernBrowser();
  }

  // Load necessary polyfills
  async loadPolyfills(): Promise<void> {
    if (typeof window === 'undefined' || this.isModernBrowser()) return;

    const polyfills = [];

    if (!this.supports('intersectionObserver')) {
      polyfills.push(import('intersection-observer'));
    }

    if (!this.supports('resizeObserver')) {
      polyfills.push(import('resize-observer-polyfill'));
    }

    if (!this.supports('cssVariables')) {
      polyfills.push(import('css-vars-ponyfill'));
    }

    if (polyfills.length > 0) {
      await Promise.all(polyfills);
    }
  }
}

// CSS Feature detection utility
export class CSSFeatureDetector {
  static testProperty(property: string): boolean {
    if (typeof window === 'undefined') return true;
    
    const element = document.createElement('div');
    return property in element.style;
  }

  static testValue(property: string, value: string): boolean {
    if (typeof window === 'undefined') return true;
    
    const element = document.createElement('div');
    element.style[property as any] = value;
    return !!element.style[property as any];
  }

  static testSelector(selector: string): boolean {
    if (typeof window === 'undefined') return true;
    
    try {
      document.querySelector(selector);
      return true;
    } catch {
      return false;
    }
  }
}

// Progressive enhancement utilities
export class ProgressiveEnhancement {
  static enhanceElement(element: HTMLElement, modernClass: string, fallbackClass: string): void {
    const browser = BrowserCompatibility.getInstance();
    
    if (browser.isModernBrowser()) {
      element.classList.add(modernClass);
      element.classList.remove(fallbackClass);
    } else {
      element.classList.add(fallbackClass);
      element.classList.remove(modernClass);
    }
  }

  static loadImage(src: string, fallbackSrc?: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => resolve(img);
      img.onerror = () => {
        if (fallbackSrc) {
          img.src = fallbackSrc;
        } else {
          reject(new Error(`Failed to load image: ${src}`));
        }
      };
      
      img.src = src;
    });
  }

  static async loadScript(src: string, condition: boolean = true): Promise<void> {
    if (!condition) return;
    
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      
      document.head.appendChild(script);
    });
  }

  static async loadStyle(href: string, condition: boolean = true): Promise<void> {
    if (!condition) return;
    
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`));
      
      document.head.appendChild(link);
    });
  }
}

// Browser-specific workarounds
export class BrowserWorkarounds {
  static fixSafari100vh(): void {
    if (typeof window === 'undefined') return;
    
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVh();
    window.addEventListener('resize', setVh);
  }

  static fixIOSZoom(): void {
    if (typeof window === 'undefined') return;
    
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  }

  static fixScrollJumping(): void {
    if (typeof window === 'undefined') return;
    
    let scrollPosition = 0;
    
    document.addEventListener('focusin', () => {
      scrollPosition = window.pageYOffset;
    });
    
    document.addEventListener('focusout', () => {
      setTimeout(() => {
        window.scrollTo(0, scrollPosition);
      }, 0);
    });
  }
}

// Export singleton instance
export const browserCompatibility = BrowserCompatibility.getInstance();

// React hook for browser compatibility
export function useBrowserCompatibility() {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);
  
  useEffect(() => {
    const info = browserCompatibility.getBrowserInfo();
    setBrowserInfo(info);
    
    // Load polyfills if needed
    if (info && !info.isModern) {
      browserCompatibility.loadPolyfills();
    }
    
    // Apply browser workarounds
    BrowserWorkarounds.fixSafari100vh();
    BrowserWorkarounds.fixIOSZoom();
  }, []);
  
  return browserInfo;
}

// React hook for feature detection
export function useFeatureDetection(feature: keyof BrowserInfo['supports']) {
  const [supports, setSupports] = useState(true);
  
  useEffect(() => {
    setSupports(browserCompatibility.supports(feature));
  }, [feature]);
  
  return supports;
}

// Import useState for React hooks
import { useState, useEffect } from 'react';