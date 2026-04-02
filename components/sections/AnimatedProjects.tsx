'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, ChevronRight, Sparkles, Zap, Layers } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ProjectContent } from '@/lib/content-loader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface AnimatedProjectsProps {
  projects: ProjectContent[];
}

interface TiltCardProps {
  project: ProjectContent;
  index: number;
}

function TiltCard({ project, index }: TiltCardProps) {
  const t = useTranslations('projects');
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), springConfig);
  
  // Glow effect
  const glowX = useSpring(useTransform(x, [-100, 100], [-20, 20]), springConfig);
  const glowY = useSpring(useTransform(y, [-100, 100], [-20, 20]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'live':
      case 'en vivo':
        return 'success';
      case 'in progress':
      case 'en desarrollo':
        return 'warning';
      case 'completed':
      case 'completado':
        return 'info';
      default:
        return 'default';
    }
  };

  const getCategoryColor = (category: string): 'default' | 'secondary' | 'outline' | 'glass' | 'gradient' | 'success' | 'info' | 'warning' => {
    const categoryMap: Record<string, 'default' | 'secondary' | 'outline' | 'glass' | 'gradient' | 'success' | 'info' | 'warning'> = {
      'web3': 'gradient',
      'gaming': 'secondary',
      'healthcare': 'success',
      'saas': 'info',
      'portfolio': 'default',
      'ecommerce': 'warning',
      'tools': 'outline',
    };
    
    const key = Object.keys(categoryMap).find(key => 
      category.toLowerCase().includes(key)
    );
    
    return categoryMap[key || 'default'] || 'default';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Glow effect */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
        }}
        className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Main card */}
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative cursor-pointer group"
      >
        <Card
          variant="glass"
          padding="none"
          className="overflow-hidden border-white/10 backdrop-blur-sm"
          hoverable
        >
          {/* Project image with overlay */}
          <div className="relative h-64 overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
            
            {/* Animated background */}
            <motion.div
              animate={{ 
                backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%"
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-cyan-500/10"
              style={{ backgroundSize: "200% 200%" }}
            />
            
            {/* Project image or placeholder */}
            {project.image && !project.image.includes('placeholder') ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl opacity-10">
                  {project.category.includes('Web3') ? '🦊' : 
                   project.category.includes('Health') ? '🏥' :
                   project.category.includes('Portfolio') ? '🎨' : '🚀'}
                </div>
              </div>
            )}

            {/* Featured badge */}
            {project.importance === 'primary' && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: index * 0.2 }}
                className="absolute top-4 left-4 z-20"
              >
                <Badge
                  variant="gradient"
                  className="backdrop-blur-sm border-white/20"
                  dot
                  dotColor="#fbbf24"
                >
                  <Star className="w-3 h-3 mr-1" />
                  {t('featured')}
                </Badge>
              </motion.div>
            )}

            {/* Status badge */}
            <div className="absolute top-4 right-4 z-20">
              <Badge
                variant={getStatusColor(project.status)}
                size="sm"
                className="backdrop-blur-sm border-white/20"
              >
                {project.status}
              </Badge>
            </div>

            {/* Hover overlay */}
            <motion.div
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent z-10"
            />

            {/* View buttons on hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2"
            >
              {project.liveUrl && (
                <Button
                  size="sm"
                  variant="glass"
                  className="backdrop-blur-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.liveUrl, '_blank');
                  }}
                  leftIcon={<ExternalLink className="w-3 h-3" />}
                >
                  {t('viewLive')}
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 backdrop-blur-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.githubUrl, '_blank');
                  }}
                  leftIcon={<Github className="w-3 h-3" />}
                >
                  {t('viewCode')}
                </Button>
              )}
            </motion.div>
          </div>

          {/* Card content */}
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <CardTitle className="text-xl mb-2 group-hover:gradient-text-primary transition-all">
                  {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </div>
              
              <motion.div
                animate={{ rotate: isHovered ? 45 : 0 }}
                className="p-2 rounded-lg bg-primary-500/10 text-primary-400"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.div>
            </div>

            {/* Category and year */}
            <div className="flex items-center justify-between mb-4">
              <Badge variant={getCategoryColor(project.category)}>
                {project.category}
              </Badge>
              <span className="text-sm text-foreground/60">
                {t('year')}: {project.year}
              </span>
            </div>

            {/* Technologies */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-primary-400" />
                <span className="text-sm font-medium text-foreground/80">
                  Technologies
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs rounded-lg bg-primary-500/10 text-primary-300 border border-primary-500/20"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2 py-1 text-xs rounded-lg bg-surface text-foreground/60">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Expandable features */}
            <AnimatePresence>
              {isExpanded && project.features && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-4 h-4 text-secondary-400" />
                      <span className="text-sm font-medium text-foreground/80">
                        {t('highlights')}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {project.features.slice(0, 3).map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start text-sm text-foreground/70"
                        >
                          <Sparkles className="w-3 h-3 text-primary-400 mr-2 mt-0.5 flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>

          {/* Card footer */}
          <CardFooter className="p-6 pt-0">
            <div className="w-full flex items-center justify-between">
              <span className="text-sm text-foreground/60">
                Click to {isExpanded ? 'collapse' : 'expand'} details
              </span>
              
              <motion.div
                animate={{ scale: isHovered ? 1.1 : 1 }}
                className="text-primary-400"
              >
                <ChevronRight className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </motion.div>
            </div>
          </CardFooter>
        </Card>

        {/* 3D shadow effect */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-500/30 to-secondary-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        />
      </motion.div>
    </motion.div>
  );
}

export default function AnimatedProjects({ projects }: AnimatedProjectsProps) {
  const t = useTranslations('projects');
  const featuredProjects = projects.filter(project => project.importance === 'primary');
  const otherProjects = projects.filter(project => project.importance !== 'primary');

  return (
    <section id="projects" className="section-anchor-offset py-24 sm:py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/60" />
      
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_1px,transparent_1px),linear-gradient(0deg,transparent_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] opacity-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-medium text-primary-300">
                Featured Work
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-cyan-400 bg-clip-text text-transparent">
                {t('title')}
              </span>
            </h2>
            
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Featured Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <TiltCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <h3 className="text-2xl font-bold mb-8 text-center">
                <span className="gradient-text-secondary">Other Notable Projects</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Card
                      variant="glass"
                      className="h-full border-white/10 backdrop-blur-sm"
                      hoverable
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg group-hover:gradient-text-primary">
                            {project.title}
                          </CardTitle>
                          <Badge variant="outline" size="sm">
                            {project.year}
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pb-4">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs rounded-lg bg-primary-500/10 text-primary-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                      
                      <CardFooter>
                        <div className="w-full flex items-center justify-between">
                          <Badge variant={getCategoryColor(project.category)}>
                            {project.category}
                          </Badge>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            className="group"
                            onClick={() => setIsExpanded(!isExpanded)}
                          >
                            Details
                            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* View All Projects CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <div className="inline-block rounded-2xl glass border border-white/10 p-8 max-w-2xl mx-auto">
              <Sparkles className="w-12 h-12 text-primary-400 mx-auto mb-4" />
              
              <h3 className="text-2xl font-bold mb-4">
                {t('viewMore')}
              </h3>
              
              <p className="text-foreground/70 mb-6">
                Explore more projects, contributions, and open-source work on my GitHub profile.
              </p>
              
              <Button
                size="lg"
                variant="gradient"
                className="group"
                onClick={() => window.open('https://github.com/LatinGeek', '_blank')}
                rightIcon={
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.div>
                }
              >
                <Github className="w-5 h-5 mr-2" />
                {t('viewAll')}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Helper function needs to be accessible
function getCategoryColor(category: string): 'default' | 'secondary' | 'outline' | 'glass' | 'gradient' | 'success' | 'info' | 'warning' {
  const categoryMap: Record<string, 'default' | 'secondary' | 'outline' | 'glass' | 'gradient' | 'success' | 'info' | 'warning'> = {
    'web3': 'gradient',
    'gaming': 'secondary',
    'healthcare': 'success',
    'saas': 'info',
    'portfolio': 'default',
    'ecommerce': 'warning',
    'tools': 'outline',
  };
  
  const key = Object.keys(categoryMap).find(key => 
    category.toLowerCase().includes(key)
  );
  
  return categoryMap[key || 'default'] || 'default';
}
