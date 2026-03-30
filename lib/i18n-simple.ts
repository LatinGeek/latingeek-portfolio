import { locales } from './constants';

export function getMessages(locale: string) {
  if (!locales.includes(locale as any)) {
    throw new Error(`Invalid locale: ${locale}`);
  }
  
  // Dynamic import based on locale
  if (locale === 'es') {
    return import('../messages/es.json').then(m => m.default);
  }
  
  // Default to English
  return import('../messages/en.json').then(m => m.default);
}