'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { 
  browserCompatibility, 
  useBrowserCompatibility,
  useFeatureDetection 
} from '@/lib/browser-compatibility';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface BrowserCompatibilityProps {
  showWarning?: boolean;
  enablePolyfills?: boolean;
  testFeatures?: boolean;
}

export default function BrowserCompatibility({
  showWarning = true,
  enablePolyfills = true,
  testFeatures = false,
}: BrowserCompatibilityProps) {
  const browserInfo = useBrowserCompatibility();
  const [showDetails, setShowDetails] = useState(false);
  const [polyfillsLoaded, setPolyfillsLoaded] = useState(false);

  // Test specific features
  const supportsCSSGrid = useFeatureDetection('cssGrid');
  const supportsBackdropFilter = useFeatureDetection('backdropFilter');
  const supportsWebP = useFeatureDetection('webp');
  const supportsIntersectionObserver = useFeatureDetection('intersectionObserver');

  useEffect(() => {
    if (enablePolyfills && browserInfo && !browserInfo.isModern) {
      browserCompatibility.loadPolyfills().then(() => {
        setPolyfillsLoaded(true);
      }).catch((error) => {
        console.warn('Polyfill loading failed:', error);
        setPolyfillsLoaded(true); // Mark as loaded anyway to avoid infinite loading
      });
    }
  }, [enablePolyfills, browserInfo]);

  if (!browserInfo) {
    return null;
  }

  const { name, version, isModern, supports } = browserInfo;

  // Calculate compatibility score
  const totalFeatures = Object.keys(supports).length;
  const supportedFeatures = Object.values(supports).filter(Boolean).length;
  const compatibilityScore = Math.round((supportedFeatures / totalFeatures) * 100);

  // Get browser icon
  const getBrowserIcon = () => {
    switch (name) {
      case 'chrome':
        return '🦊';
      case 'firefox':
        return '🦊';
      case 'safari':
        return '🦁';
      case 'edge':
        return '🌊';
      default:
        return '🌐';
    }
  };

  // Get compatibility level
  const getCompatibilityLevel = () => {
    if (compatibilityScore >= 90) return 'excellent';
    if (compatibilityScore >= 70) return 'good';
    if (compatibilityScore >= 50) return 'fair';
    return 'poor';
  };

  const compatibilityLevel = getCompatibilityLevel();

  // Only show warning if browser is not modern
  if (!isModern && showWarning) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50">
        <Card
          variant={compatibilityLevel === 'poor' ? 'error' : 'warning'}
          className="border-yellow-500/30 bg-yellow-500/10 backdrop-blur-sm"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <CardTitle className="text-lg">
                  Browser Compatibility
                </CardTitle>
              </div>
              <Badge
                variant={compatibilityLevel === 'poor' ? 'error' : 'warning'}
              >
                {compatibilityScore}%
              </Badge>
            </div>
            <CardDescription>
              Your browser ({name} {version}) may not support all features of this site.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/70">Recommended browsers:</span>
                <div className="flex gap-2">
                  <Badge variant="outline" size="sm">Chrome 90+</Badge>
                  <Badge variant="outline" size="sm">Firefox 88+</Badge>
                  <Badge variant="outline" size="sm">Safari 15+</Badge>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? 'Hide Details' : 'Show Details'}
              </Button>
            </div>

            {showDetails && (
              <div className="space-y-3 pt-4 border-t border-yellow-500/20">
                <h4 className="font-medium text-sm">Feature Support:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(supports).map(([feature, supported]) => (
                    <div
                      key={feature}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-foreground/60 capitalize">
                        {feature.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </span>
                      {supported ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>

                {enablePolyfills && !polyfillsLoaded && (
                  <div className="pt-2">
                    <div className="flex items-center gap-2 text-xs text-foreground/60">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Preparing compatibility features...
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => window.location.reload()}
              >
                Refresh
              </Button>
              <Button
                size="sm"
                className="flex-1"
                onClick={() => setShowDetails(false)}
              >
                Continue Anyway
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Feature test mode (for development)
  if (testFeatures && process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed top-4 right-4 z-50 hidden md:block">
        <Card className="w-80 backdrop-blur-sm border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              {getBrowserIcon()} Browser Test
            </CardTitle>
            <CardDescription>
              {name} {version} • {isModern ? 'Modern' : 'Legacy'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/60">CSS Grid:</span>
                <Badge
                  variant={supportsCSSGrid ? 'success' : 'error'}
                  size="sm"
                >
                  {supportsCSSGrid ? '✓' : '✗'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/60">Backdrop Filter:</span>
                <Badge
                  variant={supportsBackdropFilter ? 'success' : 'error'}
                  size="sm"
                >
                  {supportsBackdropFilter ? '✓' : '✗'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/60">WebP Images:</span>
                <Badge
                  variant={supportsWebP ? 'success' : 'error'}
                  size="sm"
                >
                  {supportsWebP ? '✓' : '✗'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/60">Intersection Observer:</span>
                <Badge
                  variant={supportsIntersectionObserver ? 'success' : 'error'}
                  size="sm"
                >
                  {supportsIntersectionObserver ? '✓' : '✗'}
                </Badge>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/60">Overall Score:</span>
                <Badge
                  variant={
                    compatibilityLevel === 'excellent' ? 'success' :
                    compatibilityLevel === 'good' ? 'info' :
                    compatibilityLevel === 'fair' ? 'warning' : 'error'
                  }
                >
                  {compatibilityScore}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}

// Component for conditional rendering based on browser support
export function BrowserConditional({
  children,
  fallback,
  feature,
  modernOnly = false,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  feature?: keyof typeof browserCompatibility.supports;
  modernOnly?: boolean;
}) {
  const browserInfo = useBrowserCompatibility();
  
  if (!browserInfo) {
    return <>{fallback || children}</>;
  }

  const shouldRender = modernOnly 
    ? browserInfo.isModern
    : feature
      ? browserInfo.supports[feature]
      : true;

  if (!shouldRender && fallback) {
    return <>{fallback}</>;
  }

  if (!shouldRender && !fallback) {
    return null;
  }

  return <>{children}</>;
}

// Component for progressive enhancement
export function ProgressiveEnhancementWrapper({
  children,
  modernClassName,
  fallbackClassName,
  feature,
}: {
  children: React.ReactNode;
  modernClassName: string;
  fallbackClassName: string;
  feature?: keyof typeof browserCompatibility.supports;
}) {
  const browserInfo = useBrowserCompatibility();
  const [className, setClassName] = useState('');

  useEffect(() => {
    if (!browserInfo) return;

    const shouldUseModern = feature
      ? browserInfo.supports[feature]
      : browserInfo.isModern;

    setClassName(shouldUseModern ? modernClassName : fallbackClassName);
  }, [browserInfo, feature, modernClassName, fallbackClassName]);

  return (
    <div className={className}>
      {children}
    </div>
  );
}

// Hook for browser-specific styling
export function useBrowserClassNames() {
  const browserInfo = useBrowserCompatibility();
  const [classNames, setClassNames] = useState<string[]>([]);

  useEffect(() => {
    if (!browserInfo) return;

    const classes = [];
    
    // Browser-specific classes
    classes.push(`browser-${browserInfo.name}`);
    classes.push(`browser-${browserInfo.name}-v${Math.floor(browserInfo.version / 10)}`);
    
    // Feature-specific classes
    if (browserInfo.supports.cssGrid) classes.push('has-css-grid');
    if (browserInfo.supports.backdropFilter) classes.push('has-backdrop-filter');
    if (browserInfo.supports.webp) classes.push('has-webp');
    
    // Modern vs legacy
    if (browserInfo.isModern) {
      classes.push('browser-modern');
    } else {
      classes.push('browser-legacy');
    }

    setClassNames(classes);
  }, [browserInfo]);

  return classNames.join(' ');
}