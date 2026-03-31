'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import projects from '@/content/projects.json';

function getProjectEmoji(projectId: string) {
  const emojiMap: Record<string, string> = {
    'rugdollz': '🦊',
    'glazier-clinics': '🏥',
    'dematic': '🏭',
    'portfolio': '🎨',
    'weather-app': '☀️',
    'task-manager': '✅'
  };
  return emojiMap[projectId] || '🚀';
}

export default function Projects() {
  const t = useTranslations('projects');
  const featuredProjects = projects.filter(project => project.importance === 'primary');

  return (
    <section id="projects" className="section-anchor-offset py-24 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t('title')}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-800/80 bg-gray-900/40 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/15">
                  {/* Project Image */}
                  <div className="relative h-52 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-cyan-500/30" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/50" />
                    <div className="relative w-full h-full">
                      {project.image && project.image !== '/projects/rugdollz.jpg' && project.image !== '/projects/glazier-clinics.jpg' && project.image !== '/projects/dematic.jpg' && project.image !== '/projects/smart-snippet.jpg' && project.image !== '/projects/jl-consultorias.jpg' ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-6xl font-bold text-white/10">{getProjectEmoji(project.id)}</div>
                        </div>
                      )}
                    </div>
                    {project.importance === 'primary' && (
                      <div className="absolute top-4 left-4 flex items-center space-x-1 px-3 py-1 rounded-full bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs font-medium text-yellow-300">{t('featured')}</span>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold leading-tight text-white">{project.title}</h3>
                        <div className="flex items-center space-x-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                              aria-label="GitHub repository"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                              aria-label="Live demo"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <p className="mb-4 text-gray-400">{project.description}</p>
                      
                      {/* Tech Stack */}
                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Highlights */}
                    {project.features && project.features.length > 0 && (
                      <div className="border-t border-gray-800 pt-4">
                        <h4 className="text-sm font-semibold text-gray-300 mb-2">{t('highlights')}</h4>
                        <ul className="space-y-1">
                          {project.features.slice(0, 2).map((feature, i) => (
                            <li key={i} className="flex items-start text-sm text-gray-400">
                              <span className="text-blue-400 mr-2">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="mb-6 text-gray-400">
              {t('viewMore')}
            </p>
            <a
              href="https://github.com/LatinGeek"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl border border-gray-700 bg-gray-900/70 px-6 py-3 font-semibold text-gray-200 transition-all duration-300 hover:border-blue-500 hover:bg-blue-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
            >
              <Github className="w-5 h-5 mr-2" />
              {t('viewAll')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}