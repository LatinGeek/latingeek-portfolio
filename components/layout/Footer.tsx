import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { socialLinks } from '@/lib/constants';

const iconMap: Record<string, React.ReactNode> = {
  github: <Github className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
};

export default function Footer() {
  const t = useTranslations('footer');
  const navT = useTranslations('navigation');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800/80 bg-gray-900/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4 rounded-2xl border border-gray-800/80 bg-gray-900/50 p-5">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Latingeek
              </span>
            </div>
            <p className="max-w-md text-gray-400">
              {t('description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="rounded-2xl border border-gray-800/80 bg-gray-900/50 p-5">
            <h3 className="text-lg font-semibold text-white mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-gray-400 transition-colors hover:text-white">
                  {navT('about')}
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-gray-400 transition-colors hover:text-white">
                  {navT('projects')}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 transition-colors hover:text-white">
                  {navT('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="rounded-2xl border border-gray-800/80 bg-gray-900/50 p-5">
            <h3 className="text-lg font-semibold text-white mb-4">{t('connect')}</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-gray-700 bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                  aria-label={link.platform}
                >
                  {iconMap[link.icon]}
                </a>
              ))}
            </div>
            <p className="mt-4 text-gray-400">
              {t('workTogether')}{' '}
              <a href="mailto:germanlamela@example.com" className="text-blue-400 hover:text-blue-300">
                germanlamela@example.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>
            © {currentYear} German Lamela (Latingeek). {t('rights')}
          </p>
          <p className="mt-2">
            {t('builtWith')}{' '}
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              Next.js
            </a>
            {t('and')}{' '}
            <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              Tailwind CSS
            </a>
            , {t('and')}{' '}
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              Vercel
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}