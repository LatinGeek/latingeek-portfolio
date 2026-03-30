'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import projects from '@/content/projects.json';

export default function Projects() {
  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="py-20">
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
                Featured Projects
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A selection of my recent work that I'm particularly proud of
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col">
                  {/* Project Image/Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-bold text-white/20">{project.emoji}</div>
                    </div>
                    {project.featured && (
                      <div className="absolute top-4 left-4 flex items-center space-x-1 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs font-medium text-yellow-300">Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                        <div className="flex items-center space-x-2">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
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
                              className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                              aria-label="Live demo"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-400 mb-4">{project.description}</p>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Highlights */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div className="pt-4 border-t border-gray-800">
                        <h4 className="text-sm font-semibold text-gray-300 mb-2">Highlights</h4>
                        <ul className="space-y-1">
                          {project.highlights.slice(0, 2).map((highlight, i) => (
                            <li key={i} className="text-sm text-gray-400 flex items-start">
                              <span className="text-blue-400 mr-2">•</span>
                              {highlight}
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
            <p className="text-gray-400 mb-6">
              Want to see more? Check out my GitHub for additional projects and contributions.
            </p>
            <a
              href="https://github.com/LatinGeek"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-xl border-2 border-gray-700 text-gray-300 font-semibold hover:border-blue-500 hover:text-white hover:bg-blue-500/10 transition-all duration-300"
            >
              <Github className="w-5 h-5 mr-2" />
              View All Projects on GitHub
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}