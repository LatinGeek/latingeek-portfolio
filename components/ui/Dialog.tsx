'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  preventCloseOnBackdrop?: boolean;
}

const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open,
      onOpenChange,
      title,
      description,
      size = 'md',
      showCloseButton = true,
      preventCloseOnBackdrop = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    if (!open) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && !preventCloseOnBackdrop) {
        onOpenChange(false);
      }
    };

    const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-full mx-4',
    };

    const dialogContent = (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        
        <div
          ref={ref}
          className={cn(
            'relative z-50 w-full rounded-xl bg-surface border border-border shadow-2xl animate-in fade-in duration-200',
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {/* Header */}
          {(title || description || showCloseButton) && (
            <div className="flex items-center justify-between border-b border-border p-6">
              <div className="flex-1">
                {title && (
                  <h2 className="text-xl font-semibold text-foreground">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mt-1 text-sm text-foreground/70">
                    {description}
                  </p>
                )}
              </div>
              
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenChange(false)}
                  className="ml-4"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    );

    if (typeof window === 'undefined') {
      return dialogContent;
    }

    return createPortal(dialogContent, document.body);
  }
);

Dialog.displayName = 'Dialog';

interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
      {...props}
    >
      {children}
    </div>
  )
);
DialogHeader.displayName = 'DialogHeader';

interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
      {...props}
    >
      {children}
    </div>
  )
);
DialogFooter.displayName = 'DialogFooter';

interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    >
      {children}
    </h2>
  )
);
DialogTitle.displayName = 'DialogTitle';

interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-foreground/70', className)}
      {...props}
    >
      {children}
    </p>
  )
);
DialogDescription.displayName = 'DialogDescription';

export {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};