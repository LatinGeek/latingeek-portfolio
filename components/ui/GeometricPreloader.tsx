'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  shape: 'triangle' | 'hexagon' | 'diamond' | 'circle';
  rotation: number;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface GeometricPreloaderProps {
  isLoading?: boolean;
  onComplete?: () => void;
  duration?: number; // in milliseconds
}

export default function GeometricPreloader({ 
  isLoading = true, 
  onComplete,
  duration = 2000 
}: GeometricPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Geometric shape definitions
  const shapes: Array<Particle['shape']> = ['triangle', 'hexagon', 'diamond', 'circle'];
  const colors = [
    'var(--geometric-blue)',
    'var(--geometric-purple)', 
    'var(--geometric-cyan)',
    'var(--geometric-green)'
  ];

  // Initialize particles
  useEffect(() => {
    if (!isLoading) return;

    const newParticles: Particle[] = [];
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.1,
        life: Math.random() * 100,
        maxLife: 100,
      });
    }

    setParticles(newParticles);
  }, [isLoading]);

  // Animate progress
  useEffect(() => {
    if (!isLoading) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 500);
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [isLoading, duration, onComplete]);

  // Canvas animation for particles
  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position with subtle movement
        const newX = (particle.x + particle.speedX) % 100;
        const newY = (particle.y + particle.speedY) % 100;
        
        // Update life for pulsing effect
        const newLife = (particle.life + 1) % particle.maxLife;
        const pulse = Math.sin(newLife * 0.05) * 0.3 + 0.7;
        const currentOpacity = particle.opacity * pulse;

        // Calculate canvas coordinates
        const canvasX = (newX / 100) * canvas.width;
        const canvasY = (newY / 100) * canvas.height;

        // Set color with opacity
        ctx.fillStyle = particle.color.replace(')', `, ${currentOpacity})`).replace('rgb', 'rgba');
        ctx.strokeStyle = particle.color.replace(')', `, ${currentOpacity * 0.8})`).replace('rgb', 'rgba');
        ctx.lineWidth = 1;

        // Save context for rotation
        ctx.save();
        ctx.translate(canvasX, canvasY);
        ctx.rotate((particle.rotation * Math.PI) / 180);

        // Draw different shapes
        ctx.beginPath();
        switch (particle.shape) {
          case 'triangle':
            // Equilateral triangle
            const triangleSize = particle.size * 2;
            for (let i = 0; i < 3; i++) {
              const angle = (i * 2 * Math.PI) / 3;
              const x = triangleSize * Math.cos(angle);
              const y = triangleSize * Math.sin(angle);
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            break;
          
          case 'hexagon':
            // Hexagon
            const hexSize = particle.size * 1.5;
            for (let i = 0; i < 6; i++) {
              const angle = (i * 2 * Math.PI) / 6;
              const x = hexSize * Math.cos(angle);
              const y = hexSize * Math.sin(angle);
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            break;
          
          case 'diamond':
            // Diamond/Rhombus
            const diamondSize = particle.size * 2;
            ctx.moveTo(0, -diamondSize);
            ctx.lineTo(diamondSize, 0);
            ctx.lineTo(0, diamondSize);
            ctx.lineTo(-diamondSize, 0);
            break;
          
          case 'circle':
          default:
            // Circle
            ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
            break;
        }

        ctx.closePath();
        
        // Fill with slight stroke for definition
        ctx.fill();
        ctx.stroke();
        
        // Restore context
        ctx.restore();

        // Update particle
        const updatedParticles = [...particles];
        updatedParticles[index] = {
          ...particle,
          x: newX,
          y: newY,
          life: newLife,
          rotation: particle.rotation + 0.5,
        };
        setParticles(updatedParticles);
      });

      // Draw connection lines between nearby particles
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 15) {
            const x1 = (particles[i].x / 100) * canvas.width;
            const y1 = (particles[i].y / 100) * canvas.height;
            const x2 = (particles[j].x / 100) * canvas.width;
            const y2 = (particles[j].y / 100) * canvas.height;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Set canvas size
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.clientWidth;
        canvasRef.current.height = canvasRef.current.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-geometric-bg overflow-hidden"
        style={{ 
          backgroundColor: 'var(--geometric-bg)',
          fontFamily: 'var(--font-mono, monospace)'
        }}
      >
        {/* Background canvas for particles */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Geometric overlay pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute top-1/4 left-1/4 w-64 h-64"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%, 
                var(--geometric-blue) 0deg 90deg, 
                var(--geometric-purple) 90deg 180deg,
                var(--geometric-cyan) 180deg 270deg,
                var(--geometric-green) 270deg 360deg)`,
              clipPath: 'var(--particle-hexagon)',
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-48 h-48"
            style={{
              background: `conic-gradient(from 180deg at 50% 50%, 
                var(--geometric-cyan) 0deg 120deg, 
                var(--geometric-green) 120deg 240deg,
                var(--geometric-blue) 240deg 360deg)`,
              clipPath: 'var(--particle-triangle)',
            }}
          />
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center">
          {/* Animated geometric logo */}
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="mx-auto mb-8 w-32 h-32"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))'
              }}
            >
              {/* Outer hexagon */}
              <polygon
                points="50,5 95,25 95,75 50,95 5,75 5,25"
                fill="none"
                stroke="var(--geometric-blue)"
                strokeWidth="2"
                strokeDasharray="5,5"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="100"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </polygon>
              
              {/* Inner triangle */}
              <polygon
                points="50,30 70,70 30,70"
                fill="none"
                stroke="var(--geometric-purple)"
                strokeWidth="1.5"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 50 50"
                  to="360 50 50"
                  dur="15s"
                  repeatCount="indefinite"
                />
              </polygon>
              
              {/* Center point */}
              <circle
                cx="50"
                cy="50"
                r="3"
                fill="var(--geometric-cyan)"
              >
                <animate
                  attributeName="r"
                  values="3;5;3"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </motion.div>

          {/* Loading text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <h2 
              className="text-2xl font-bold tracking-tight mb-2"
              style={{
                color: 'var(--color-foreground)',
                fontFamily: 'var(--font-mono, monospace)',
                letterSpacing: '0.1em'
              }}
            >
              LATINGEEK
            </h2>
            <p 
              className="text-sm opacity-70"
              style={{
                color: 'var(--color-muted-foreground)',
                fontFamily: 'var(--font-mono, monospace)'
              }}
            >
              Creative Developer Portfolio
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
            className="relative h-1 w-64 mx-auto mb-2 overflow-hidden rounded-full"
            style={{
              background: 'linear-gradient(90deg, var(--geometric-blue), var(--geometric-cyan))'
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                animation: 'shimmer 2s infinite'
              }}
            />
          </motion.div>

          {/* Progress percentage */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs opacity-50"
            style={{
              color: 'var(--color-muted-foreground)',
              fontFamily: 'var(--font-mono, monospace)'
            }}
          >
            {Math.round(progress)}%
          </motion.p>

          {/* Loading message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-sm max-w-md mx-auto px-4"
            style={{
              color: 'var(--color-muted-foreground)',
              fontFamily: 'var(--font-mono, monospace)'
            }}
          >
            Initializing geometric particle system...
          </motion.p>
        </div>

        {/* Style for shimmer animation */}
        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}