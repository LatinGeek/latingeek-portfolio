/**
 * Micro-interactions and hover effects for enhanced UX
 * These utilities add subtle animations and feedback throughout the site
 */

import { motion } from 'framer-motion';

// Hover lift effect for cards and buttons
export const hoverLift = {
  whileHover: { y: -4 },
  whileTap: { y: 0 },
  transition: { type: "spring", stiffness: 400, damping: 25 }
};

// Scale on hover for interactive elements
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 400, damping: 25 }
};

// Gentle shake for attention
export const attentionShake = {
  animate: {
    x: [0, -5, 5, -5, 5, 0],
    transition: {
      duration: 0.5,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    }
  }
};

// Pulse animation for notifications
export const pulseGlow = {
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(59, 130, 246, 0.4)",
      "0 0 0 10px rgba(59, 130, 246, 0)",
    ],
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    repeatType: "loop" as const,
  }
};

// Floating animation for decorative elements
export const floatingAnimation = (delay: number = 0) => ({
  animate: {
    y: [0, -10, 0],
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
    delay,
  }
});

// Text gradient on hover
export const textGradientHover = {
  initial: { backgroundPosition: "0% 50%" },
  whileHover: { backgroundPosition: "100% 50%" },
  transition: { duration: 0.5, ease: "easeInOut" }
};

// Border glow effect
export const borderGlow = {
  initial: { borderColor: "rgba(255, 255, 255, 0.1)" },
  whileHover: { borderColor: "rgba(59, 130, 246, 0.5)" },
  transition: { duration: 0.3 }
};

// Ripple effect for buttons
export const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
};

// Stagger children animation
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

// Fade in up animation
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// Typewriter effect
export const typewriter = (text: string, delay: number = 0) => ({
  hidden: { width: 0 },
  show: {
    width: "100%",
    transition: {
      duration: text.length * 0.05,
      delay,
      ease: "linear"
    }
  }
});

// Parallax scroll effect
export const parallaxScroll = (yOffset: number = 50) => ({
  initial: { y: yOffset, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
});

// Glass morphism hover
export const glassHover = {
  initial: { backdropFilter: "blur(8px)" },
  whileHover: { backdropFilter: "blur(12px)" },
  transition: { duration: 0.3 }
};

// Color shift on hover
export const colorShift = (fromColor: string, toColor: string) => ({
  initial: { color: fromColor },
  whileHover: { color: toColor },
  transition: { duration: 0.3 }
});

// Rotate on hover
export const rotateHover = {
  whileHover: { rotate: 5 },
  whileTap: { rotate: -5 },
  transition: { type: "spring", stiffness: 300, damping: 20 }
};

// Bounce animation
export const bounce = {
  animate: {
    y: [0, -10, 0],
  },
  transition: {
    duration: 0.6,
    repeat: Infinity,
    repeatType: "reverse" as const,
  }
};

// Gradient border animation
export const gradientBorderAnimation = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "linear",
  }
};

// Tooltip reveal animation
export const tooltipReveal = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.2 }
};

// Loading spinner animation
export const loadingSpinner = {
  animate: { rotate: 360 },
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: "linear",
  }
};

// Page transition animations
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

// Scroll progress indicator
export const scrollProgress = (progress: number) => ({
  scaleX: progress,
  transition: { duration: 0.1 }
});

// Magnetic pull effect
export const magneticPull = {
  whileHover: {
    x: [0, 5, -5, 0],
    y: [0, -5, 5, 0],
    transition: {
      duration: 0.5,
      times: [0, 0.25, 0.75, 1],
    }
  }
};

// Utility component for hover effects
export const HoverEffect: React.FC<{
  children: React.ReactNode;
  effect?: keyof typeof effects;
  className?: string;
}> = ({ children, effect = 'lift', className = '' }) => {
  const effects = {
    lift: hoverLift,
    scale: hoverScale,
    rotate: rotateHover,
    glass: glassHover,
  };

  return (
    <motion.div
      {...effects[effect]}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// CSS classes for micro-interactions
export const microInteractionClasses = {
  // Button hover effects
  buttonHover: "transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20",
  
  // Link hover effects
  linkHover: "transition-colors duration-200 hover:text-primary-400",
  
  // Card hover effects
  cardHover: "transition-all duration-300 hover:border-primary-500/30 hover:shadow-xl",
  
  // Input focus effects
  inputFocus: "focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500",
  
  // Image hover effects
  imageHover: "transition-transform duration-500 hover:scale-105",
  
  // Text gradient
  textGradient: "bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent",
  
  // Glass effect
  glass: "backdrop-blur-md bg-white/5 border border-white/10",
  
  // Subtle shadow
  subtleShadow: "shadow-lg shadow-black/10",
};

// Pre-configured motion components
export const MotionDiv = motion.div;
export const MotionButton = motion.button;
export const MotionSpan = motion.span;
export const MotionP = motion.p;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionH3 = motion.h3;
export const MotionH4 = motion.h4;
export const MotionUl = motion.ul;
export const MotionLi = motion.li;
export const MotionA = motion.a;