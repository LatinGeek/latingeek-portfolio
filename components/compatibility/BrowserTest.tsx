'use client';

import { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Grid3x3,
  Filter,
  Image as ImageIcon,
  Eye,
  Cpu,
  Globe,
  RefreshCw
} from 'lucide-react';
import { 
  browserCompatibility,
  useBrowserCompatibility,
  useFeatureDetection 
} from '@/lib/browser-compatibility';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';

export default function BrowserTest() {
  const browserInfo = useBrowserCompatibility();
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});
  const [isTesting, setIsTesting] = useState(false);

  // Feature detection
  const supportsCSSGrid = useFeatureDetection('cssGrid');
  const supportsBackdropFilter = useFeatureDetection('backdropFilter');
  const supportsWebP = useFeatureDetection('webp');
  const supportsAVIF = useFeatureDetection('avif');
  const supportsIntersectionObserver = useFeatureDetection('intersectionObserver');
  const supportsResizeObserver = useFeatureDetection('resizeObserver');
  const supportsWebGL = useFeatureDetection('webGL');
  const supportsWebWorkers = useFeatureDetection('webWorkers');
  const supportsFlexboxGap = useFeatureDetection('flexboxGap');
  const supportsCSSVariables = useFeatureDetection('cssVariables');

  const features = [
    {
      id: 'cssGrid',
      name: 'CSS Grid',
      description: 'Modern layout system',
      icon: <Grid3x3 className="w-5 h-5" />,
      supported: supportsCSSGrid,
      critical: true,
    },
    {
      id: 'backdropFilter',
      name: 'Backdrop Filter',
      description: 'Glass morphism effects',
      icon: <Filter className="w-5 h-5" />,
      supported: supportsBackdropFilter,
      critical: false,
    },
    {
      id: 'webp',
      name: 'WebP Images',
      description: 'Modern image format',
      icon: <ImageIcon className="w-5 h-5" />,
      supported: supportsWebP,
      critical: false,
    },
    {
      id: 'avif',
      name: 'AVIF Images',
      description: 'Next-gen image format',
      icon: <ImageIcon className="w-5 h-5" />,
      supported: supportsAVIF,
      critical: false,
    },
    {
      id: 'intersectionObserver',
      name: 'Intersection Observer',
      description: 'Lazy loading API',
      icon: <Eye className="w-5 h-5" />,
      supported: supportsIntersectionObserver,
      critical: true,
    },
    {
      id: 'resizeObserver',
      name: 'Resize Observer',
      description: 'Element resize detection',
      icon: <Eye className="w-5 h-5" />,
      supported: supportsResizeObserver,
      critical: false,
    },
    {
      id: 'webGL',
      name: 'WebGL',
      description: '3D graphics API',
      icon: <Cpu className="w-5 h-5" />,
      supported: supportsWebGL,
      critical: false,
    },
    {
      id: 'webWorkers',
      name: 'Web Workers',
      description: 'Background processing',
      icon: <Cpu className="w-5 h-5" />,
      supported: supportsWebWorkers,
      critical: false,
    },
    {
      id: 'flexboxGap',
      name: 'Flexbox Gap',
      description: 'Flexbox spacing',
      icon: <Grid3x3 className="w-5 h-5" />,
      supported: supportsFlexboxGap,
      critical: false,
    },
    {
      id: 'cssVariables',
      name: 'CSS Variables',
      description: 'Custom properties',
      icon: <Globe className="w-5 h-5" />,
      supported: supportsCSSVariables,
      critical: true,
    },
  ];

  const runTests = async () => {
    setIsTesting(true);
    const results: Record<string, boolean> = {};

    // Run each test with a delay for visual feedback
    for (const feature of features) {
      await new Promise(resolve => setTimeout(resolve, 100));
      results[feature.id] = feature.supported;
      setTestResults({ ...results });
    }

    setIsTesting(false);
  };

  const resetTests = () => {
    setTestResults({});
  };

  if (!browserInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Loading Browser Info...</CardTitle>
            <CardDescription>
              Detecting your browser capabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { name, version, isModern } = browserInfo;
  const totalFeatures = features.length;
  const supportedFeatures = features.filter(f => f.supported).length;
  const compatibilityScore = Math.round((supportedFeatures / totalFeatures) * 100);
  const criticalFeatures = features.filter(f => f.critical);
  const supportedCriticalFeatures = criticalFeatures.filter(f => f.supported).length;
  const allCriticalSupported = supportedCriticalFeatures === criticalFeatures.length;

  const getBrowserIcon = () => {
    switch (name) {
      case 'chrome': return '🦊';
      case 'firefox': return '🦊';
      case 'safari': return '🦁';
      case 'edge': return '🌊';
      default: return '🌐';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Browser Compatibility Test
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Test your browser's support for modern web features
          </p>
        </div>

        {/* Browser Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{getBrowserIcon()}</div>
                <div>
                  <CardTitle className="text-2xl">
                    {name.charAt(0).toUpperCase() + name.slice(1)} {version}
                  </CardTitle>
                  <CardDescription>
                    {isModern ? 'Modern browser' : 'Legacy browser'}
                  </CardDescription>
                </div>
              </div>
              <Badge
                variant={
                  compatibilityScore >= 90 ? 'success' :
                  compatibilityScore >= 70 ? 'info' :
                  compatibilityScore >= 50 ? 'warning' : 'error'
                }
                size="lg"
              >
                {compatibilityScore}% Compatible
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Compatibility</span>
                  <span className="text-sm text-foreground/60">
                    {supportedFeatures}/{totalFeatures} features
                  </span>
                </div>
                <Progress value={compatibilityScore} className="h-2" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-primary-500/10">
                  <div className="text-2xl font-bold text-primary-400">
                    {supportedFeatures}
                  </div>
                  <div className="text-sm text-foreground/60">Supported</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary-500/10">
                  <div className="text-2xl font-bold text-secondary-400">
                    {totalFeatures - supportedFeatures}
                  </div>
                  <div className="text-sm text-foreground/60">Unsupported</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-success-500/10">
                  <div className="text-2xl font-bold text-success-400">
                    {supportedCriticalFeatures}/{criticalFeatures.length}
                  </div>
                  <div className="text-sm text-foreground/60">Critical</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-warning-500/10">
                  <div className="text-2xl font-bold text-warning-400">
                    {isModern ? 'Yes' : 'No'}
                  </div>
                  <div className="text-sm text-foreground/60">Modern</div>
                </div>
              </div>

              {!allCriticalSupported && (
                <div className="rounded-lg border border-warning-500/30 bg-warning-500/10 p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-warning-500" />
                    <div>
                      <p className="font-medium text-warning-500">
                        Critical features missing
                      </p>
                      <p className="text-sm text-warning-500/70 mt-1">
                        Some essential features are not supported by your browser.
                        The site may not function correctly.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Test Controls */}
        <div className="flex gap-4 mb-8">
          <Button
            onClick={runTests}
            disabled={isTesting}
            size="lg"
            className="flex-1"
            leftIcon={isTesting ? <RefreshCw className="w-5 h-5 animate-spin" /> : undefined}
          >
            {isTesting ? 'Running Tests...' : 'Run Compatibility Tests'}
          </Button>
          <Button
            onClick={resetTests}
            variant="outline"
            size="lg"
          >
            Reset Tests
          </Button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const isTested = feature.id in testResults;
            const isSupported = feature.supported;
            const showResult = isTesting || isTested;

            return (
              <Card
                key={feature.id}
                className={`transition-all duration-300 ${
                  showResult
                    ? isSupported
                      ? 'border-success-500/30 bg-success-500/5'
                      : 'border-error-500/30 bg-error-500/5'
                    : ''
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        showResult
                          ? isSupported
                            ? 'bg-success-500/10 text-success-500'
                            : 'bg-error-500/10 text-error-500'
                          : 'bg-primary-500/10 text-primary-500'
                      }`}>
                        {feature.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {feature.name}
                        </CardTitle>
                        <CardDescription>
                          {feature.description}
                        </CardDescription>
                      </div>
                    </div>
                    {feature.critical && (
                      <Badge variant="outline" size="sm">
                        Critical
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground/60">Status:</span>
                      {showResult ? (
                        isSupported ? (
                          <Badge variant="success" size="sm">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Supported
                          </Badge>
                        ) : (
                          <Badge variant="error" size="sm">
                            <XCircle className="w-3 h-3 mr-1" />
                            Not Supported
                          </Badge>
                        )
                      ) : (
                        <Badge variant="outline" size="sm">
                          Not Tested
                        </Badge>
                      )}
                    </div>

                    {!isSupported && (
                      <div className="text-xs text-foreground/60">
                        This feature may affect: {feature.critical ? 'Core functionality' : 'Visual enhancements'}
                      </div>
                    )}

                    {/* Test progress indicator */}
                    {isTesting && !isTested && (
                      <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 animate-pulse w-1/2"></div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recommendations */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>
              Based on your browser's capabilities
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {!isModern && (
              <div className="rounded-lg border border-warning-500/30 bg-warning-500/10 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-warning-500">
                      Upgrade Your Browser
                    </p>
                    <p className="text-sm text-warning-500/70 mt-1">
                      Consider updating to a modern browser for better performance,
                      security, and compatibility with modern web standards.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Button size="sm" variant="outline" asChild>
                        <a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer">
                          Chrome
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href="https://www.mozilla.org/firefox/" target="_blank" rel="noopener noreferrer">
                          Firefox
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href="https://www.apple.com/safari/" target="_blank" rel="noopener noreferrer">
                          Safari
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href="https://www.microsoft.com/edge" target="_blank" rel="noopener noreferrer">
                          Edge
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!allCriticalSupported && (
              <div className="rounded-lg border border-error-500/30 bg-error-500/10 p-4">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-error-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-error-500">
                      Compatibility Issues Detected
                    </p>
                    <p className="text-sm text-error-500/70 mt-1">
                      Your browser is missing critical features required for this site.
                      Some functionality may be limited or unavailable.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isModern && allCriticalSupported && (
              <div className="rounded-lg border border-success-500/30 bg-success-500/10 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-success-500">
                      Excellent Compatibility
                    </p>
                    <p className="text-sm text-success-500/70 mt-1">
                      Your browser fully supports all modern web features used by this site.
                      You'll experience the best possible performance and user experience.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}