'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { ChevronDown, Globe } from 'lucide-react';
import { locales } from '@/lib/constants';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const switchLanguage = (newLocale: string) => {
    if (newLocale === locale) return;
    
    // Remove current locale from pathname and add new one
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="inline-flex items-center gap-2 rounded-xl border border-gray-700/80 bg-gray-900/90 px-3 py-2 text-sm font-medium text-gray-200 transition-all hover:border-blue-500/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
      >
        <Globe className="w-4 h-4" />
        <span>{locale === 'en' ? 'EN' : 'ES'}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      <div
        role="menu"
        className={`absolute right-0 z-50 mt-2 w-36 rounded-xl border border-gray-700/80 bg-gray-900/95 p-1.5 shadow-2xl shadow-black/30 transition-all duration-150 ${isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}
      >
        {locales.map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => switchLanguage(lang)}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              locale === lang 
                ? 'bg-blue-500/10 font-semibold text-blue-300'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            {lang === 'en' ? 'English' : 'Español'}
          </button>
        ))}
      </div>
    </div>
  );
}