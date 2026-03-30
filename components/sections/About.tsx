'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Code, Server, Cloud, Terminal, CheckCircle } from 'lucide-react';
import bio from '@/content/bio.json';

const skillIcons: Record<string, React.ReactNode> = {
  frontend: <Code className="w-6 h-6 text-blue-400" />,
  backend: <Server className="w-6 h-6 text-purple-400" />,
  devops: <Cloud className="w-6 h-6 text-cyan-400" />,
  tools: <Terminal className="w-6 h-6 text-green-400" />,
};

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('title')}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">
                {bio.name} <span className="text-blue-400">({bio.alias})</span>
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {bio.longBio}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-gray-300">
                    <span className="font-semibold">Location:</span> {bio.location}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-gray-300">
                    <span className="font-semibold">Focus:</span> Full Stack Development, Web3, SaaS
                  </span>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <h4 className="text-xl font-bold mb-6 text-white">
                {t('experience')}
              </h4>
              <div className="space-y-6">
                {bio.experience.map((exp, index) => (
                  <div key={index} className="relative pl-8">
                    <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-blue-500" />
                    <div className="absolute left-1.5 top-2.5 w-0.5 h-full bg-gray-700" />
                    <div>
                      <h5 className="font-bold text-lg text-white">{exp.role}</h5>
                      <p className="text-blue-400 font-medium">{exp.company}</p>
                      <p className="text-gray-400 text-sm mb-2">{exp.period}</p>
                      <p className="text-gray-300">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <h4 className="text-xl font-bold mb-6 text-white">
                {t('skills')}
              </h4>
              
              <div className="grid gap-6">
                {Object.entries(bio.skills).map(([category, skills]) => (
                  <div key={category} className="space-y-3">
                    <div className="flex items-center space-x-3">
                      {skillIcons[category]}
                      <h5 className="font-bold text-lg text-white capitalize">
                        {category}
                      </h5>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-700/50 border border-gray-600"
                        >
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-200 text-sm">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <h4 className="text-xl font-bold mb-6 text-white">
                Interests & Activities
              </h4>
              <div className="flex flex-wrap gap-3">
                {bio.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <h4 className="text-xl font-bold mb-6 text-white">
                Education
              </h4>
              <div className="space-y-4">
                {bio.education.map((edu, index) => (
                  <div key={index} className="space-y-1">
                    <h5 className="font-bold text-white">{edu.degree}</h5>
                    <p className="text-blue-400">{edu.institution}</p>
                    <p className="text-gray-400 text-sm">{edu.period}</p>
                    {edu.description && (
                      <p className="text-gray-300 text-sm">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}