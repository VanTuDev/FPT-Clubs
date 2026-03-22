'use client';

import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import clubs from '@/public/data/clubs.json';

export function MarqueeBanner() {
  return (
    <div className="w-full overflow-hidden bg-primary py-3 border-y border-primary/20 relative z-20">
      <div
        className="flex gap-0 w-max"
        style={{
          animation: 'marquee 60s linear infinite',
        }}
      >
        {[...clubs, ...clubs].map((club, i) => (
          <Link
            key={i}
            href={`/club/${club.id}`}
            className="group flex items-center gap-3 text-primary-foreground text-xs sm:text-sm font-bold whitespace-nowrap px-10 hover:bg-white/10 transition-colors py-1 rounded-full mx-2"
          >
            <Sparkles size={14} className="opacity-80 shrink-0 group-hover:scale-125 transition-transform" />
            <span className="uppercase tracking-widest">{club.name}</span>
            <span className="mx-4 opacity-30">|</span>
          </Link>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
