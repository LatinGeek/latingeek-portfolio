import { forwardRef, HTMLAttributes } from 'react';
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
        '2xl': 'h-24 w-24',
        '3xl': 'h-32 w-32',
      },
      variant: {
        default: 'border-2 border-border',
        glass: 'glass border-2 border-white/20',
        gradient: 'border-2 border-transparent bg-gradient-to-br from-primary-500 to-secondary-500',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

export interface AvatarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size,
      variant,
      src,
      alt = 'Avatar',
      fallback,
      status,
      children,
      ...props
    },
    ref
  ) => {
    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    const renderFallback = () => {
      if (fallback) {
        return (
          <div className="flex h-full w-full items-center justify-center bg-primary-500 text-white font-semibold">
            {getInitials(fallback)}
          </div>
        );
      }
      return (
        <div className="flex h-full w-full items-center justify-center bg-neutral-200 dark:bg-neutral-800">
          <svg
            className="h-2/3 w-2/3 text-neutral-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn('relative', className)}
        {...props}
      >
        <div className={cn(avatarVariants({ size, variant }))}>
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes={`${size === 'xs' ? '24px' : size === 'sm' ? '32px' : size === 'md' ? '40px' : size === 'lg' ? '48px' : size === 'xl' ? '64px' : size === '2xl' ? '96px' : '128px'}`}
            />
          ) : (
            renderFallback()
          )}
          {children}
        </div>
        
        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background',
              {
                'bg-success-500': status === 'online',
                'bg-error-500': status === 'offline',
                'bg-warning-500': status === 'away',
                'bg-neutral-500': status === 'busy',
              }
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

const AvatarGroup = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex -space-x-2', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export { Avatar, AvatarGroup, avatarVariants };