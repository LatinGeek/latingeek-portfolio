'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('errors.404');
  
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="text-center px-4">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-8">
          <div className="text-4xl">🔍</div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            404
          </span>
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {t('title')}
        </h2>
        
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          {t('description')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300"
          >
            <Home className="w-5 h-5 mr-2" />
            {t('backToHome')}
          </Link>
          
          <button
            onClick={handleGoBack}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-gray-700 text-gray-300 font-semibold hover:border-blue-500 hover:text-white hover:bg-blue-500/10 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('goBack')}
          </button>
        </div>
      </div>
    </div>
  );
}