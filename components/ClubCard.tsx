'use client';

import Link from 'next/link';
import { Club } from '@/lib/types';
import {
  Facebook,
  ArrowRight,
  Users,
  Clock,
  Dumbbell,
  Heart,
  Music,
  Sword,
  Code2,
  Languages,
  TrendingUp,
  Camera,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

interface ClubCardProps {
  club: Club;
  index?: number;
}

const categoryConfig: Record<
  string,
  { icon: React.ElementType; gradient: string; badge: string; badgeBg: string }
> = {
  'Sports': {
    icon: Dumbbell,
    gradient: 'from-orange-500 to-amber-400',
    badge: 'Thể thao',
    badgeBg: 'bg-orange-100 text-orange-700 border-orange-200',
  },
  'Volunteer': {
    icon: Heart,
    gradient: 'from-rose-500 to-pink-400',
    badge: 'Tình nguyện',
    badgeBg: 'bg-rose-100 text-rose-700 border-rose-200',
  },
  'Arts & Music': {
    icon: Music,
    gradient: 'from-violet-500 to-purple-400',
    badge: 'Âm nhạc',
    badgeBg: 'bg-violet-100 text-violet-700 border-violet-200',
  },
  'Martial Arts': {
    icon: Sword,
    gradient: 'from-red-500 to-orange-400',
    badge: 'Võ thuật',
    badgeBg: 'bg-red-100 text-red-700 border-red-200',
  },
  'Technology': {
    icon: Code2,
    gradient: 'from-blue-500 to-cyan-400',
    badge: 'Công nghệ',
    badgeBg: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  'Language': {
    icon: Languages,
    gradient: 'from-teal-500 to-emerald-400',
    badge: 'Ngôn ngữ',
    badgeBg: 'bg-teal-100 text-teal-700 border-teal-200',
  },
  'Business & Marketing': {
    icon: TrendingUp,
    gradient: 'from-yellow-500 to-orange-400',
    badge: 'Kinh doanh',
    badgeBg: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  },
  'Media & Design': {
    icon: Camera,
    gradient: 'from-fuchsia-500 to-pink-400',
    badge: 'Truyền thông',
    badgeBg: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
  },
};



const defaultConfig = {
  icon: ShieldCheck,
  gradient: 'from-orange-600 to-red-800',
  badge: 'Câu lạc bộ',
  badgeBg: 'bg-orange-100 text-orange-700 border-orange-200',
};

export function ClubCard({ club, index = 0 }: ClubCardProps) {
  const config = categoryConfig[club.category] ?? defaultConfig;
  const { icon: CategoryIcon, gradient, badge, badgeBg } = config;

  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <Link href={`/club/${club.id}`} className="block h-full">
        <div className="group h-full bg-card border border-border rounded-2xl overflow-hidden card-glow transition-all duration-300 cursor-pointer tech-card neon-border">
          {/* Gradient Header */}
          <div className={`relative bg-gradient-to-br ${club.themeGradient || gradient} p-5 sm:p-6 overflow-hidden h-32 sm:h-40 flex flex-col justify-end`}>
            {/* Tech Overlays */}
            <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
            <div className="absolute inset-0 scan-overlay opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />

            {/* Icon */}
            <div className="relative z-10 flex items-start justify-between">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2.5 border border-white/30 group-hover:bg-white/30 transition-colors duration-300">
                <CategoryIcon size={22} className="text-white" />
              </div>
              {/* Category badge */}
              <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-sm">
                {badge}
              </span>
            </div>

            {/* Club Name */}
            <div className="relative z-10 mt-4">
              <div className="text-[10px] font-mono text-white/70 mb-1 tracking-tighter">ID: {club.id.toUpperCase()}</div>
              <h3 className="text-base sm:text-lg font-black text-white leading-tight line-clamp-2 drop-shadow-md">
                {club.name}
              </h3>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-5 flex flex-col gap-3">
            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {club.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-2 border border-border/50">
                <Users size={13} className="text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[9px] text-muted-foreground leading-none mb-1 uppercase tracking-tighter">ENTITY_COUNT</p>
                  <p className="font-bold text-foreground text-xs truncate font-mono">{club.members}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-2 border border-border/50">
                <Clock size={13} className="text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[9px] text-muted-foreground leading-none mb-1 uppercase tracking-tighter">STATUS</p>
                  <p className="font-bold text-foreground text-xs truncate font-mono">ACTIVE</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-border mt-1">
              <div className="flex items-center gap-1 text-primary font-semibold text-xs sm:text-sm group-hover:gap-2 transition-all duration-200">
                Xem chi tiết
                <ArrowRight size={14} className="shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <button
                type="button"
                className="text-muted-foreground hover:text-primary transition-colors p-1.5 hover:bg-secondary rounded-lg shrink-0"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(club.facebookUrl, '_blank', 'noopener,noreferrer');
                }}
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
