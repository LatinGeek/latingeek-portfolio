import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/constants';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Used when no locale matches
  defaultLocale,
  
  // Locale detection
  localeDetection: true,
  
  // Pathnames configuration (optional)
  // pathnames: {
  //   '/': '/',
  //   '/about': {
  //     en: '/about',
  //     es: '/sobre-mi'
  //   }
  // }
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};