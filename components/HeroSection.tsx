'use client';

import Link from 'next/link';
import {
  Sparkles,
  ChevronDown,
  Users,
  BookOpen,
  Zap,
  Star,
  ArrowRight,
  MessageCircle,
  Terminal,
} from 'lucide-react';
import { TypewriterText } from './TypewriterText';
import { AnimatedCounter } from './AnimatedCounter';

const stats = [
  { icon: BookOpen, value: '10+', label: 'Câu lạc bộ' },
  { icon: Users,    value: '1500+', label: 'Thành viên' },
  { icon: Star,     value: '7',     label: 'Lĩnh vực' },
  { icon: Zap,      value: '100%',  label: 'Miễn phí' },
];

export function HeroSection() {
  return (
    <section className="relative hero-gradient overflow-hidden min-h-[92vh] flex flex-col justify-center tech-grid scan-overlay">
      {/* Decorative floating blobs */}
      <div
        className="absolute top-16 right-8 w-64 h-64 rounded-full opacity-20 animate-float pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, oklch(0.62 0.21 51.44), transparent 70%)',
          filter: 'blur(32px)',
        }}
      />
      <div
        className="absolute bottom-24 left-4 w-48 h-48 rounded-full opacity-15 animate-float-reverse pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, oklch(0.62 0.21 51.44), transparent 70%)',
          filter: 'blur(28px)',
        }}
      />

      {/* Decorative Lucide icons floating */}
      <div className="absolute top-20 right-12 opacity-10 animate-float delay-200 pointer-events-none">
        <Users size={56} className="text-primary" strokeWidth={1} />
      </div>
      <div className="absolute top-1/3 right-6 opacity-8 animate-float-reverse delay-500 pointer-events-none">
        <Star size={36} className="text-primary" strokeWidth={1} />
      </div>
      <div className="absolute bottom-32 right-16 opacity-10 animate-float delay-700 pointer-events-none">
        <Sparkles size={44} className="text-primary" strokeWidth={1} />
      </div>
      <div className="absolute top-28 left-8 opacity-8 animate-float-reverse delay-400 pointer-events-none hidden sm:block">
        <BookOpen size={40} className="text-primary" strokeWidth={1} />
      </div>

      {/* Main content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 max-w-4xl mx-auto w-full">
        {/* Badge */}
        <div className="animate-fade-in-down delay-100 mb-6 flex justify-center sm:justify-start">
          <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary font-semibold text-xs sm:text-sm px-4 py-2 rounded-full backdrop-blur-md neon-border">
            <Terminal size={14} className="animate-pulse" />
            <span className="tracking-widest">SYSTEM_VERSION: 2.0.24</span>
          </span>
        </div>

        {/* Heading */}
        <h1 className="animate-slide-in-left delay-200 text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6 text-foreground tracking-tighter text-pop animate-float-text">
          Khám phá{' '}
          <TypewriterText 
            texts={['đam mê', 'cộng đồng', 'sức trẻ', 'tài năng']} 
            className="gradient-text neon-glow"
            speed={80}
          />
          <br /> của bạn
        </h1>

        {/* Subheading */}
        <p className="animate-fade-in-up delay-300 text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed font-medium drop-shadow-sm">
          Hơn <strong className="text-foreground word-highlight">10 câu lạc bộ</strong> đang chờ bạn tham gia. 
          Khám phá hệ sinh thái cộng đồng sinh viên năng động nhất tại FPT University Đà Nẵng.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row gap-3 mb-12">
          <Link
            href="/clubs"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-sm sm:text-base hover:opacity-90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,140,66,0.5)] active:scale-95 relative overflow-hidden"
          >
            <Users size={18} />
            Khám phá ngay
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-30deg]" />
          </Link>
          <Link
            href="/chat"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-card border border-border text-foreground rounded-xl font-bold text-sm sm:text-base hover:border-primary hover:text-primary hover:bg-secondary/50 transition-all duration-300 active:scale-95 neon-border"
          >
            <MessageCircle size={18} />
            AI Assistant
          </Link>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up delay-500 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, value, label }, i) => {
            const num = parseInt(value);
            const isPercent = value.includes('%');
            return (
              <div
                key={label}
                className="tech-card rounded-2xl p-4 text-center group hover:border-primary/50 transition-all duration-300 shadow-sm"
                style={{ animationDelay: `${600 + i * 80}ms` }}
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon size={20} className="text-primary animate-pulse" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-foreground count-highlight">
                  <AnimatedCounter target={num} suffix={isPercent ? '%' : '+'} />
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-1">{label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 animate-bounce-arrow">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mr-[-0.2em]">Scroll</span>
        <ChevronDown size={18} className="text-muted-foreground" />
      </div>

      {/* Bottom border fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
