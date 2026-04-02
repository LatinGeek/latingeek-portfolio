'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, Sparkles, Code, Zap, Globe, Cpu, Database, Cloud, Shield, Rocket } from 'lucide-react';
import { Button } from '@/components/ui';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
}

interface FloatingIcon {
  x: number;
  y: number;
  icon: React.ReactNode;
  size: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
}

export default function PremiumHeroEnhanced() {
  const t = useTranslations('hero');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeTech, setActiveTech] = useState(0);

  // Tech stack icons for floating animation
  const techIcons = [
    { icon: <Code className="w-full h-full" />, color: 'text-blue-400' },
    { icon: <Database className="w-full h-full" />, color: 'text-purple-400' },
    { icon: <Cpu className="w-full h-full" />, color: 'text-cyan-400' },
    { icon: <Cloud className="w-full h-full" />, color: 'text-green-400' },
    { icon: <Shield className="w-full h-full" />, color: 'text-yellow-400' },
    { icon: <Rocket className="w-full h-full" />, color: 'text-pink-400' },
  ];

  // Tech stack items for the animated list
  const techStack = [
    { name: 'Next.js 15', color: 'from-blue-500 to-cyan-500' },
    { name: 'TypeScript', color: 'from-blue-600 to-blue-400' },
    { name: 'Tailwind CSS', color: 'from-cyan-500 to-teal-500' },
    { name: 'Framer Motion', color: 'from-purple-500 to-pink-500' },
    { name: 'React 19', color: 'from-cyan-400 to-blue-400' },
    { name: 'Node.js', color: 'from-green-500 to-emerald-500' },
  ];

  // Initialize particles with enhanced effects
  useEffect(() => {
    const newParticles: Particle[] = [];
    const colors = [
      'rgba(59, 130, 246, 0.7)', // Blue
      'rgba(168, 85, 247, 0.7)', // Purple
      'rgba(6, 182, 212, 0.7)', // Cyan
      'rgba(34, 197, 94, 0.7)', // Green
      'rgba(245, 158, 11, 0.7)', // Yellow
      'rgba(239, 68, 68, 0.7)', // Red
    ];

    for (let i = 0; i < 80; i++) {
      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.3,
        life: Math.random() * 100,
        maxLife: 100,
      });
    }

    setParticles(newParticles);

    // Initialize floating icons
    const newIcons: FloatingIcon[] = [];
    for (let i = 0; i < 6; i++) {
      newIcons.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        icon: techIcons[i].icon,
        size: Math.random() * 40 + 20,
        speed: Math.random() * 0.5 + 0.2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
      });
    }
    setFloatingIcons(newIcons);

    // Cycle through tech stack
    const interval = setInterval(() => {
      setActiveTech((prev) => (prev + 1) % techStack.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw enhanced gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, 'rgba(3, 7, 18, 0.95)');
      gradient.addColorStop(0.3, 'rgba(30, 58, 138, 0.6)');
      gradient.addColorStop(0.6, 'rgba(168, 85, 247, 0.4)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0.2)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid pattern
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update and draw particles with enhanced effects
      particles.forEach((particle, index) => {
        // Update position with more natural movement
        let newX = particle.x + particle.speedX + Math.sin(particle.life * 0.1) * 0.5;
        let newY = particle.y + particle.speedY + Math.cos(particle.life * 0.1) * 0.5;

        // Enhanced mouse interaction
        const dx = mousePosition.x - newX;
        const dy = mousePosition.y - newY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = 150 / distance;
          const angle = Math.atan2(dy, dx);
          newX += Math.cos(angle) * force * 0.2;
          newY += Math.sin(angle) * force * 0.2;
        }

        // Bounce with damping
        if (newX < 0 || newX > canvas.width) {
          particle.speedX *= -0.9;
          newX = newX < 0 ? 0 : canvas.width;
        }
        if (newY < 0 || newY > canvas.height) {
          particle.speedY *= -0.9;
          newY = newY < 0 ? 0 : canvas.height;
        }

        // Update life and opacity
        const newLife = (particle.life + 1) % particle.maxLife;
        const pulse = Math.sin(newLife * 0.1) * 0.2 + 0.8;
        const currentOpacity = particle.opacity * pulse;

        // Draw particle with glow effect
        ctx.beginPath();
        ctx.arc(newX, newY, particle.size, 0, Math.PI * 2);
        
        // Inner glow
        const particleGradient = ctx.createRadialGradient(
          newX, newY, 0,
          newX, newY, particle.size * 2
        );
        particleGradient.addColorStop(0, particle.color.replace('0.7', '1'));
        particleGradient.addColorStop(0.5, particle.color);
        particleGradient.addColorStop(1, particle.color.replace('0.7', '0'));
        
        ctx.fillStyle = particleGradient;
        ctx.fill();

        // Update particle
        const updatedParticles = [...particles];
        updatedParticles[index] = {
          ...particle,
          x: newX,
          y: newY,
          life: newLife,
        };
        setParticles(updatedParticles);
      });

      // Draw connection lines between particles
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particles, mousePosition]);

  // Update floating icons
  useEffect(() => {
    const updateIcons = () => {
      setFloatingIcons(prev => prev.map(icon => ({
        ...icon,
        y: (icon.y + icon.speed) % window.innerHeight,
        rotation: icon.rotation + icon.rotationSpeed,
      })));
    };

    const interval = setInterval(updateIcons, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Enhanced Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 mb-8"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.div
              animate={{ rotate: isHovering ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
            </motion.div>
            <span className="text-sm font-medium text-blue-300">
              {t('premiumBadge')}
            </span>
          </motion.div>

          {/* Main heading with gradient text */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="block">Full-Stack Developer &</span>
            <span className="block mt-2">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                UI/UX Specialist
              </span>
            </span>
          </motion.h1>

          {/* Animated subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
          >
            {t('subtitle')}
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block ml-2"
            >
              ✨
            </motion.span>
          </motion.p>

          {/* Animated tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <AnimatePresence mode="wait">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: index === activeTech ? 1 : 0.3,
                    scale: index === activeTech ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`px-4 py-2 rounded-lg bg-gradient-to-r ${tech.color} bg-opacity-10 border border-white/10 backdrop-blur-sm`}
                >
                  <span className="text-sm font-medium text-white">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              variant="premium"
              className="group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('ctaPrimary')}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white/20 hover:border-white/40 hover:bg-white/5"
            >
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {t('ctaSecondary')}
              </span>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-2xl mx-auto"
          >
            {[
              { value: '50+', label: 'Projects', icon: <Code className="w-5 h-5" /> },
              { value: '5+', label: 'Years Experience', icon: <Zap className="w-5 h-5" /> },
              { value: '100%', label: 'Satisfaction', icon: <Sparkles className="w-5 h-5" /> },
              { value: '24/7', label: 'Availability', icon: <Globe className="w-5 h-5" /> },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-colors"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((icon, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${icon.x}px`,
              top: `${icon.y}px`,
              width: `${icon.size}px`,
              height: `${icon.size}px`,
            }}
            animate={{
              rotate: icon.rotation,
              y: [0, -20, 0],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              y: { duration: 3 + index, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <div className={`w-full h-full ${techIcons[index % techIcons.length].color} opacity-20`}>
              {icon.icon}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}