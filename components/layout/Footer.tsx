import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { socialLinks } from '@/lib/constants';

const iconMap: Record<string, React.ReactNode> = {
  github: <Github className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Latingeek
              </span>
            </div>
            <p className="text-gray-400 max-w-md">
              Full stack developer building exceptional digital experiences that are fast, accessible, and visually appealing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-gray-400 hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                  aria-label={link.platform}
                >
                  {iconMap[link.icon]}
                </a>
              ))}
            </div>
            <p className="mt-4 text-gray-400">
              Want to work together?{' '}
              <a href="mailto:germanlamela@example.com" className="text-blue-400 hover:text-blue-300">
                germanlamela@example.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>
            © {currentYear} German Lamela (Latingeek). All rights reserved.
          </p>
          <p className="mt-2">
            Built with{' '}
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              Next.js
            </a>
            ,{' '}
            <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              Tailwind CSS
            </a>
            , and{' '}
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              Vercel
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}