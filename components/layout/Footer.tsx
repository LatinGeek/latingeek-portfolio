'use client';

import { useTranslations } from 'next-intl';
import { socialLinks } from '@/lib/constants';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
  twitter: <Twitter size={20} />,
  email: <Mail size={20} />,
};

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            {t('copyright', { year })}
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors duration-200"
                aria-label={link.platform}
              >
                {iconMap[link.icon]}
              </a>
            ))}
          </div>

          {/* Built with */}
          <div className="text-gray-500 text-sm">
            {t('builtWith')}
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-xs">
            Designed and developed with ❤️ by German Lamela
          </p>
          <p className="text-gray-600 text-xs mt-1">
            Open to new opportunities and collaborations
          </p>
        </div>
      </div>
    </footer>
  );
}