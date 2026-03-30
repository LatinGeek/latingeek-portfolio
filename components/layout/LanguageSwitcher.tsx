'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { locales } from '@/lib/constants';
import { Globe } from 'lucide-react';
import { useState } from 'react';

const languageNames: Record<string, string> = {
  en: 'English',
  es: 'Español',
};

const flagEmojis: Record<string, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const switchLanguage = (newLocale: string) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
        aria-label="Change language"
      >
        <Globe size={18} className="text-gray-400" />
        <span className="text-sm font-medium">
          {flagEmojis[locale]} {languageNames[locale]}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800 border border-gray-700 shadow-xl z-50 overflow-hidden">
            {locales.map((lang) => (
              <button
                key={lang}
                onClick={() => switchLanguage(lang)}
                className={`w-full px-4 py-3 text-left flex items-center space-x-3 hover:bg-gray-700 transition-colors ${
                  locale === lang ? 'bg-gray-700' : ''
                }`}
              >
                <span className="text-lg">{flagEmojis[lang]}</span>
                <span className="flex-1 text-sm font-medium">
                  {languageNames[lang]}
                </span>
                {locale === lang && (
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}