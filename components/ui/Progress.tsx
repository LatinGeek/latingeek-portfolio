import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  showValue?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    value = 0, 
    max = 100, 
    showValue = false,
    variant = 'default',
    size = 'md',
    ...props 
  }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    
    const variantClasses = {
      default: 'bg-primary-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      error: 'bg-error-500',
      gradient: 'bg-gradient-to-r from-primary-500 to-secondary-500',
    };

    const sizeClasses = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    };

    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-1">
          {showValue && (
            <>
              <span className="text-sm font-medium text-foreground">
                Progress
              </span>
              <span className="text-sm font-medium text-foreground">
                {Math.round(percentage)}%
              </span>
            </>
          )}
        </div>
        
        <div
          ref={ref}
          className={cn(
            'relative w-full overflow-hidden rounded-full bg-surface',
            sizeClasses[size],
            className
          )}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          {...props}
        >
          <div
            className={cn(
              'h-full w-full flex-1 transition-all duration-300 rounded-full',
              variantClasses[variant]
            )}
            style={{ transform: `translateX(-${100 - percentage}%)` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };