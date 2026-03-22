'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, MessageCircle, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-lg shadow-black/5 border-b border-white/40'
          : 'bg-background/80 border-b border-transparent backdrop-blur-sm'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-14 sm:h-16 gap-2">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg sm:text-xl text-primary hover:opacity-80 transition-opacity flex-shrink-0 group"
          >
            <div className="bg-primary text-primary-foreground rounded-xl p-1.5 sm:p-2 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/30 transition-shadow duration-300">
              <Sparkles size={16} className="sm:w-5 sm:h-5" />
            </div>
            <span className="hidden sm:inline tracking-tight">FPT Clubs</span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/clubs"
              className={`relative px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 sm:gap-2 text-sm font-medium ${
                isActive('/clubs')
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'text-foreground hover:bg-secondary hover:text-primary'
              }`}
            >
              <Users size={16} />
              <span className="hidden sm:inline">Câu lạc bộ</span>
            </Link>

            <Link
              href="/chat"
              className={`relative px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 sm:gap-2 text-sm font-medium ${
                isActive('/chat')
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'text-foreground hover:bg-secondary hover:text-primary'
              }`}
            >
              <MessageCircle size={16} />
              <span className="hidden sm:inline">Chat AI</span>
              {/* Live dot */}
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full hidden sm:block animate-pulse" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
