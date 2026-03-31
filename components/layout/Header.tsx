'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/lib/constants';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-gray-800/80 bg-gray-950/75 backdrop-blur-xl supports-[backdrop-filter]:bg-gray-950/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2 rounded-lg p-1 transition-colors hover:bg-gray-900/70">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Latingeek
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-2 rounded-2xl border border-gray-800/80 bg-gray-900/70 px-2 py-1.5 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.href === '/' ? '' : link.href}`}
                className="group relative rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors duration-200 hover:bg-gray-800/80 hover:text-white"
              >
                {t(link.key)}
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
            <LanguageSwitcher />
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg border border-gray-800 p-2 text-gray-300 transition-colors hover:border-gray-700 hover:bg-gray-900 hover:text-white md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-gray-800 py-4 md:hidden">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={`/${locale}${link.href === '/' ? '' : link.href}`}
                  className="rounded-lg px-4 py-2 text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(link.key)}
                </Link>
              ))}
              <div className="px-4 pt-1">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}