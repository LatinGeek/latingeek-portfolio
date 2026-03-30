'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left column: Avatar and personal info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-2/5"
            >
              <div className="relative">
                {/* Avatar container with gradient border */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-full blur-xl opacity-30 animate-pulse" />
                  <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-gray-800/50">
                    <Image
                      src="/images/avatar.webp"
                      alt="German Lamela (Latingeek)"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-yellow-500/20 border border-yellow-500/30 blur-sm" />
                  <div className="absolute -bottom-2 -left-2 w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/30 blur-sm" />
                </div>

                {/* Name and title below avatar */}
                <div className="mt-8 text-center">
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold text-white"
                  >
                    {t('name')}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-lg text-gray-400 mt-2"
                  >
                    {t('aka')}
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Right column: Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-3/5 text-center lg:text-left"
            >
              {/* Greeting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 mb-6"
              >
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-lg font-medium text-gray-300">
                  {t('greeting')}
                </span>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8 inline-block"
              >
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse mr-3" />
                  <span className="text-xl font-medium text-gray-200">
                    {t('title')}
                  </span>
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl md:text-3xl text-gray-300 mb-12 leading-relaxed"
              >
                {t('description')}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  href="#projects"
                  className="group inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {t('viewWork')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-gray-700 text-gray-300 font-semibold hover:border-blue-500 hover:text-white hover:bg-blue-500/10 transition-all duration-300"
                >
                  {t('getInTouch')}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}