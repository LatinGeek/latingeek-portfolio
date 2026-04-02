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

// Rotate on hover
export const rotateHover = {
  whileHover: { rotate: 5 },
  whileTap: { rotate: -5 },
  transition: { type: "spring", stiffness: 300, damping: 20 }
};

// Glass morphism hover effect
export const glassHover = {
  whileHover: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
  },
  transition: { duration: 0.3 }
};

// Staggered children animation
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    }
  }
};

// Fade in animation
export const fadeIn = {
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

// CSS classes for micro-interactions
export const microInteractionClasses = {
  // Button hover effects
  buttonHover: "transition-all duration-300 hover:shadow-lg",
  
  // Link hover effects
  linkHover: "transition-colors duration-200 hover:text-primary-400",
  
  // Card hover effects
  cardHover: "transition-all duration-300 hover:border-blue-500/30 hover:shadow-xl",
  
  // Input focus effects
  inputFocus: "focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500",
  
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