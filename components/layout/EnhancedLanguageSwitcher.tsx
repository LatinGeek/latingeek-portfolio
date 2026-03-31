'use client';

import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { ChevronDown, Globe, Check } from 'lucide-react';
import { locales } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languageOptions: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸'
  }
];

export default function EnhancedLanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languageOptions.find(lang => lang.code === locale) || languageOptions[0];

  const switchLanguage = (newLocale: string) => {
    if (newLocale === locale) return;
    
    // Remove current locale from pathname and add new one
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev < languageOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : languageOptions.length - 1
        );
        break;
      case 'Enter':
      case ' ':
        if (focusedIndex >= 0) {
          e.preventDefault();
          switchLanguage(languageOptions[focusedIndex].code);
        }
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && menuRef.current && focusedIndex >= 0) {
      const menuItems = menuRef.current.querySelectorAll('button');
      if (menuItems[focusedIndex]) {
        menuItems[focusedIndex].focus();
      }
    }
  }, [focusedIndex, isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setFocusedIndex(-1);
  }, [pathname]);

  return (
    <div 
      ref={containerRef} 
      className="relative"
      onKeyDown={handleKeyDown}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          setIsOpen(prev => !prev);
          setFocusedIndex(languageOptions.findIndex(lang => lang.code === locale));
        }}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`Current language: ${currentLanguage.name}. Click to change language.`}
        className="group inline-flex items-center gap-2 rounded-xl border border-gray-700/80 bg-gray-900/90 px-4 py-2.5 text-sm font-medium text-gray-200 transition-all hover:border-blue-500/50 hover:bg-gray-800/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
      >
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 transition-transform group-hover:rotate-12" />
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="font-medium">{currentLanguage.code.toUpperCase()}</span>
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            role="menu"
            aria-label="Language selection menu"
            className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-gray-700/80 bg-gray-900/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl"
          >
            <div className="space-y-1">
              {languageOptions.map((lang, index) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => switchLanguage(lang.code)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-all ${
                    locale === lang.code
                      ? 'bg-blue-500/10 text-blue-300'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  } ${
                    focusedIndex === index ? 'ring-2 ring-blue-500/30' : ''
                  }`}
                  role="menuitem"
                  aria-current={locale === lang.code ? 'true' : 'false'}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{lang.flag}</span>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-xs text-gray-400">{lang.nativeName}</span>
                    </div>
                  </div>
                  {locale === lang.code && (
                    <Check className="h-4 w-4 text-blue-400" aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>

            {/* Keyboard shortcut hint */}
            <div className="mt-2 border-t border-gray-800/50 pt-2 px-3">
              <p className="text-xs text-gray-500">
                Use <kbd className="px-1 py-0.5 bg-gray-800 rounded text-xs">↑</kbd>{' '}
                <kbd className="px-1 py-0.5 bg-gray-800 rounded text-xs">↓</kbd> to navigate,{' '}
                <kbd className="px-1 py-0.5 bg-gray-800 rounded text-xs">Enter</kbd> to select,{' '}
                <kbd className="px-1 py-0.5 bg-gray-800 rounded text-xs">Esc</kbd> to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}