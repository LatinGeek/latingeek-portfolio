import { locales } from './constants';

/**
 * Load locale-specific content
 * @param locale - The locale to load content for
 * @param contentType - Type of content ('bio' or 'projects')
 */
export async function loadContent<T>(locale: string, contentType: 'bio' | 'projects'): Promise<T> {
  // Validate locale
  if (!locales.includes(locale as any)) {
    locale = 'en';
  }

  try {
    // Try to load locale-specific file first
    const content = await import(`@/content/${contentType}.${locale}.json`);
    return content.default as T;
  } catch (error) {
    // Fall back to default English content
    console.warn(`No ${contentType} content found for locale "${locale}", falling back to English`);
    const content = await import(`@/content/${contentType}.json`);
    return content.default as T;
  }
}

/**
 * Get bio content for a specific locale
 */
export async function getBio(locale: string): Promise<BioContent> {
  return loadContent<BioContent>(locale, 'bio');
}

/**
 * Get projects content for a specific locale
 */
export async function getProjects(locale: string): Promise<ProjectContent[]> {
  return loadContent<ProjectContent[]>(locale, 'projects');
}

/**
 * Type definitions for content
 */
export interface BioContent {
  name: string;
  alias: string;
  title: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  shortBio: string;
  longBio: string;
  skills: {
    frontend: string[];
    backend: string[];
    tools: string[];
    softSkills: string[];
  };
  philosophy: string;
  interests: string[];
}

export interface ProjectContent {
  id: string;
  title: string;
  description: string;
  category: string;
  year: number;
  status: 'live' | 'in-progress' | 'archived';
  importance: 'primary' | 'secondary' | 'tertiary';
  technologies: string[];
  features: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}