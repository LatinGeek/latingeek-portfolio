'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, Sparkles, Code, Zap, Globe } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

export default function PremiumHero() {
  const t = useTranslations('hero');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Initialize particles
  useEffect(() => {
    const newParticles: Particle[] = [];
    const colors = [
      'rgba(59, 130, 246, 0.5)', // Blue
      'rgba(168, 85, 247, 0.5)', // Purple
      'rgba(6, 182, 212, 0.5)', // Cyan
      'rgba(34, 197, 94, 0.5)', // Green
    ];

    for (let i = 0; i < 50; i++) {
      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setParticles(newParticles);
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

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(3, 7, 18, 0.8)');
      gradient.addColorStop(1, 'rgba(30, 58, 138, 0.4)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position
        let newX = particle.x + particle.speedX;
        let newY = particle.y + particle.speedY;

        // Mouse interaction
        const dx = mousePosition.x - newX;
        const dy = mousePosition.y - newY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = 100 / distance;
          newX -= (dx / distance) * force * 0.1;
          newY -= (dy / distance) * force * 0.1;
        }

        // Bounce off edges
        if (newX < 0 || newX > canvas.width) particle.speedX *= -1;
        if (newY < 0 || newY > canvas.height) particle.speedY *= -1;

        // Update particle
        const updatedParticles = [...particles];
        updatedParticles[index] = {
          ...particle,
          x: newX,
          y: newY,
        };
        setParticles(updatedParticles);

        // Draw particle
        ctx.beginPath();
        ctx.arc(newX, newY, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
          if (index >= otherIndex) return;
          
          const dx = newX - otherParticle.x;
          const dy = newY - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(newX, newY);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Setup
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [particles, mousePosition]);

  const floatingIcons = [
    { icon: Code, delay: 0, position: 'top-10 left-10' },
    { icon: Zap, delay: 0.2, position: 'top-20 right-20' },
    { icon: Globe, delay: 0.4, position: 'bottom-20 left-20' },
    { icon: Sparkles, delay: 0.6, position: 'bottom-10 right-10' },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-background/0 via-background/50 to-background" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-2"
              >
                <Sparkles className="w-4 h-4 text-primary-400" />
                <span className="text-sm font-medium text-primary-300">
                  Available for new projects
                </span>
              </motion.div>

              {/* Greeting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-4"
              >
                <h1 className="text-5xl md:text-7xl font-bold">
                  <span className="block text-foreground/80">{t('greeting')}</span>
                  <span className="block bg-gradient-to-r from-primary-400 via-secondary-400 to-cyan-400 bg-clip-text text-transparent">
                    {t('name')}
                  </span>
                </h1>
                
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-gradient-to-r from-primary-500 to-transparent" />
                  <span className="text-xl text-foreground/60">{t('aka')}</span>
                </div>
              </motion.div>

              {/* Title & Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  {t('title')}
                </h2>
                
                <p className="text-xl text-foreground/70 max-w-2xl leading-relaxed">
                  {t('description')}
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Button
                  size="lg"
                  variant="gradient"
                  className="group"
                  rightIcon={
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  }
                >
                  {t('viewWork')}
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-500/30 hover:border-primary-500/50"
                >
                  {t('getInTouch')}
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="grid grid-cols-3 gap-4 pt-8"
              >
                {[
                  { value: '5+', label: 'Years Experience' },
                  { value: '50+', label: 'Projects' },
                  { value: '100%', label: 'Satisfaction' },
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-xl glass border border-white/5"
                  >
                    <div className="text-2xl font-bold gradient-text-primary">
                      {stat.value}
                    </div>
                    <div className="text-sm text-foreground/60 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Avatar & Visuals */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Avatar Container */}
              <div className="relative mx-auto lg:mx-0 max-w-md">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-cyan-500/20 rounded-3xl blur-3xl" />
                
                {/* Main avatar */}
                <div className="relative rounded-2xl overflow-hidden border-4 border-white/10 backdrop-blur-sm">
                  <Image
                    src="/images/avatar.webp"
                    alt="German Lamela (Latingeek)"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 p-3 shadow-2xl shadow-primary-500/30"
                >
                  <Code className="w-6 h-6 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 p-3 shadow-2xl shadow-cyan-500/30"
                >
                  <Zap className="w-6 h-6 text-white" />
                </motion.div>
              </div>

              {/* Floating icons in background */}
              {floatingIcons.map(({ icon: Icon, delay, position }) => (
                <motion.div
                  key={position}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  transition={{ duration: 0.5, delay }}
                  className={`absolute ${position} text-primary-400/30`}
                >
                  <Icon className="w-12 h-12" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-foreground/50 mb-2">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-primary-500/30 flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 rounded-full bg-primary-500 mt-2"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}