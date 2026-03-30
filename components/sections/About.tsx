'use client';

import { motion } from 'framer-motion';
import { Code, Globe, Zap, Users } from 'lucide-react';
import bio from '@/content/bio.json';

const skills = [
  { icon: Code, label: 'Frontend', description: 'React, Next.js, TypeScript, Tailwind CSS' },
  { icon: Globe, label: 'Backend', description: 'Node.js, Python, Firebase, PostgreSQL' },
  { icon: Zap, label: 'Tools', description: 'Git, Docker, AWS, CI/CD, Figma' },
  { icon: Users, label: 'Soft Skills', description: 'Team Leadership, Agile, Communication, Problem Solving' },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-900/50">
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
                About Me
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Get to know the person behind the code
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white">My Journey</h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                {bio.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700">
                  <div className="text-3xl font-bold text-blue-400">5+</div>
                  <div className="text-gray-400 mt-2">Years Experience</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700">
                  <div className="text-3xl font-bold text-purple-400">50+</div>
                  <div className="text-gray-400 mt-2">Projects Completed</div>
                </div>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold text-white">What I Bring</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-colors group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-colors">
                        <skill.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">{skill.label}</h4>
                        <p className="text-gray-400 text-sm">{skill.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Philosophy */}
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
                <h4 className="text-lg font-semibold text-white mb-3">My Philosophy</h4>
                <p className="text-gray-300">
                  I believe in building software that not only works flawlessly but also delivers 
                  exceptional user experiences. Clean code, thoughtful design, and continuous 
                  learning are at the core of everything I do.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}