import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/constants';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import PerformanceOptimizer from '@/components/performance/PerformanceOptimizer';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const metadata = messages.metadata as any;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://latingeek-portfolio.vercel.app';
  const canonicalUrl = `${baseUrl}/${locale}`;
  const siteName = 'German Lamela | Latingeek';
  
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: [
      'full stack developer',
      'web developer',
      'React developer',
      'Next.js developer',
      'TypeScript',
      'portfolio',
      locale === 'es' ? 'desarrollador full stack' : '',
      locale === 'es' ? 'desarrollador web' : '',
      locale === 'es' ? 'portafolio' : '',
    ].filter(Boolean),
    authors: [{ name: 'German Lamela' }],
    creator: 'German Lamela',
    publisher: 'German Lamela',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en`,
        'es': `${baseUrl}/es`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      url: canonicalUrl,
      title: metadata.ogTitle || metadata.title,
      description: metadata.ogDescription || metadata.description,
      siteName,
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'German Lamela | Latingeek Portfolio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.ogTitle || metadata.title,
      description: metadata.ogDescription || metadata.description,
      images: [`${baseUrl}/og-image.png`],
      creator: '@latingeek',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
  };
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  
  // Validate that the incoming locale is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Load messages for the current locale
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.className} bg-background text-foreground antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <PerformanceOptimizer>
            <ThemeProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </ThemeProvider>
          </PerformanceOptimizer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}