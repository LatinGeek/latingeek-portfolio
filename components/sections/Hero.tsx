'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-1 pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(147,51,234,0.18),transparent_40%)]" />
      
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
                  <div className="absolute inset-4 overflow-hidden rounded-full border-4 border-gray-700/60 shadow-2xl shadow-black/40">
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
                    className="mt-2 text-lg text-gray-400"
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
                className="mb-6 inline-flex items-center space-x-2 rounded-full border border-gray-800/80 bg-gray-900/70 px-4 py-2"
              >
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-lg font-medium text-gray-200">
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
                <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-6 py-3 backdrop-blur-sm">
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
                className="mb-10 max-w-2xl text-2xl leading-relaxed text-gray-300 md:text-3xl lg:mb-12"
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
                  className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
                >
                  {t('viewWork')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-700 bg-gray-900/70 px-8 py-4 font-semibold text-gray-200 transition-all duration-300 hover:border-blue-500 hover:bg-blue-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
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