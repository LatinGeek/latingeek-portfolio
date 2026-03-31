'use client';

import { useTheme } from '@/components/providers/ThemeProvider';

export default function TestCard() {
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  return (
    <div className="p-6 rounded-xl bg-surface border border-border shadow-lg">
      <h3 className="text-xl font-semibold mb-4 gradient-text-primary">
        Design System Test Card
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-foreground/80">Current Theme:</span>
          <span className="font-medium text-primary-600 dark:text-primary-400">
            {theme} ({resolvedTheme})
          </span>
        </div>

        <button
          onClick={toggleTheme}
          className="w-full py-2 px-4 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
        >
          Toggle Theme
        </button>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="h-8 rounded bg-primary-500"></div>
          <div className="h-8 rounded bg-secondary-500"></div>
          <div className="h-8 rounded bg-neutral-500"></div>
        </div>

        <div className="mt-6 p-4 rounded-lg glass border border-white/10">
          <p className="text-sm text-foreground/70">
            This card demonstrates glassmorphism effects, gradient text, and theme-aware colors.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-sm text-foreground/60">
          <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse"></div>
          <span>Design tokens are working correctly</span>
        </div>
      </div>
    </div>
  );
}