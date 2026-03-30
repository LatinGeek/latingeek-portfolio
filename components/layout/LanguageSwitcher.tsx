'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { locales } from '@/lib/constants';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    if (newLocale === locale) return;
    
    // Remove current locale from pathname and add new one
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {locale === 'en' ? 'EN' : 'ES'}
        </span>
      </button>
      
      <div className="absolute right-0 mt-2 w-32 py-2 bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {locales.map((lang) => (
          <button
            key={lang}
            onClick={() => switchLanguage(lang)}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${
              locale === lang 
                ? 'text-blue-400 font-medium' 
                : 'text-gray-300'
            }`}
          >
            {lang === 'en' ? 'English' : 'Español'}
          </button>
        ))}
      </div>
    </div>
  );
}