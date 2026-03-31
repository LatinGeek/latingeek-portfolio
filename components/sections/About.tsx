'use client';

import { motion } from 'framer-motion';
import { Code, Globe, Zap, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import bio from '@/content/bio.json';

const skills = [
  { icon: Code, key: 'frontend' },
  { icon: Globe, key: 'backend' },
  { icon: Zap, key: 'tools' },
  { icon: Users, key: 'softSkills' },
];

export default function About() {
  const t = useTranslations('about');
  
  return (
    <section id="about" className="section-anchor-offset bg-gray-900/40 py-24 sm:py-28">
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

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
            {/* Bio with Avatar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6 rounded-2xl border border-gray-800/80 bg-gray-900/30 p-6 shadow-xl shadow-black/20 sm:p-8"
            >
              {/* Avatar in About section */}
              <div className="flex items-center space-x-6 mb-8">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500/30">
                  <Image
                    src="/images/avatar.webp"
                    alt="German Lamela (Latingeek)"
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{bio.name}</h3>
                  <p className="text-gray-400">{bio.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{bio.location}</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white">{t('journey')}</h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                {bio.longBio.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="rounded-xl border border-gray-700/80 bg-gray-800/50 p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400">5+</div>
                  <div className="text-gray-400 mt-2">{t('stats.yearsExperience')}</div>
                </div>
                <div className="rounded-xl border border-gray-700/80 bg-gray-800/50 p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400">50+</div>
                  <div className="text-gray-400 mt-2">{t('stats.projectsCompleted')}</div>
                </div>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8 rounded-2xl border border-gray-800/80 bg-gray-900/30 p-6 shadow-xl shadow-black/20 sm:p-8"
            >
              <h3 className="text-2xl font-bold text-white">{t('skills')}</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group rounded-xl border border-gray-700/80 bg-gray-800/30 p-6 transition-all hover:-translate-y-0.5 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/10"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-colors">
                        <skill.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">{t(`skillCategories.${skill.key}`)}</h4>
                        <p className="text-gray-400 text-sm">{t(`skillDescriptions.${skill.key}`)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Philosophy */}
              <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6">
                <h4 className="text-lg font-semibold text-white mb-3">{t('philosophy')}</h4>
                <p className="text-gray-300">
                  {t('philosophyText')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}