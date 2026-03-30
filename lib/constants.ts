export const locales = ['en', 'es'] as const;
export const defaultLocale = 'en' as const;
export type Locale = (typeof locales)[number];

// Navigation
export const navLinks = [
  { href: '/', key: 'home' },
  { href: '#about', key: 'about' },
  { href: '#projects', key: 'projects' },
  { href: '#contact', key: 'contact' },
] as const;

// Social links
export const socialLinks = [
  { platform: 'GitHub', url: 'https://github.com/LatinGeek', icon: 'github' },
  { platform: 'LinkedIn', url: '#', icon: 'linkedin' },
  { platform: 'Twitter', url: '#', icon: 'twitter' },
] as const;

// Skills categories
export const skillCategories = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'tools', label: 'Tools & DevOps' },
  { id: 'languages', label: 'Languages' },
] as const;