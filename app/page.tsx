'use client';

import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { AnimatedSection } from '@/components/AnimatedSection';
import { MarqueeBanner } from '@/components/MarqueeBanner';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import {
  MessageCircle,
  Sparkles,
  ArrowRight,
  Users,
  BookOpen,
  Star,
  Terminal,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import clubs from '@/public/data/clubs.json';

// Preview 3 clubs for the landing page teaser
const previewClubs = clubs.slice(0, 3);

const categoryColors: Record<string, string> = {
  'Sports': 'from-orange-500 to-amber-400',
  'Volunteer': 'from-rose-500 to-pink-400',
  'Arts & Music': 'from-violet-500 to-purple-400',
  'Martial Arts': 'from-red-500 to-orange-400',
  'Technology': 'from-blue-500 to-cyan-400',
  'Language': 'from-teal-500 to-emerald-400',
  'Business & Marketing': 'from-yellow-500 to-orange-400',
  'Media & Design': 'from-fuchsia-500 to-pink-400',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* === HERO === */}
      <HeroSection />

      {/* === MARQUEE === */}
      <MarqueeBanner />

      {/* === FEATURES === */}
      <FeaturesSection />

      {/* === CLB PREVIEW TEASER === */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30 tech-grid border-y border-border/50">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-in-up" className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary font-semibold text-xs sm:text-sm px-4 py-2 rounded-full mb-4 border border-primary/20 neon-border">
              CORE_MODULE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight tracking-tight">
              Hệ sinh thái <span className="gradient-text neon-glow">tiêu biểu</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Dữ liệu được trích xuất từ hơn {clubs.length} thực thể hoạt động tại FPTU.
            </p>
          </AnimatedSection>

          {/* Preview cards - horizontal scroll on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {previewClubs.map((club, i) => {
              const gradient = categoryColors[club.category] ?? 'from-primary to-amber-400';
              return (
                <AnimatedSection key={club.id} animation="fade-in-up" delay={i * 100} className="h-full">
                  <Link href={`/club/${club.id}`} className="block group h-full">
                    <div className="h-full bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 tech-card">
                      <div className={`bg-gradient-to-br ${club.themeGradient || gradient} p-6 relative overflow-hidden`}>
                        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10" />
                        <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10" />
                        <span className="relative z-10 text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm">
                          {club.category}
                        </span>
                        <h3 className="relative z-10 mt-3 font-bold text-white text-lg leading-tight">
                          {club.name}
                        </h3>
                      </div>
                      <div className="p-5">
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{club.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                            <Users size={13} className="text-primary" />
                            {club.members}
                          </span>
                          <span className="flex items-center gap-1 text-primary text-xs font-bold group-hover:gap-2 transition-all">
                            DỮ LIỆU <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>

          {/* See all button */}
          <AnimatedSection animation="fade-in-up" delay={300} className="text-center">
            <Link
              href="/clubs"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-sm sm:text-base hover:opacity-90 hover:shadow-xl hover:shadow-primary/25 transition-all duration-200 active:scale-95 neon-border"
            >
              <BookOpen size={18} />
              TRUY XUẤT TẤT CẢ ({clubs.length})
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* === TESTIMONIALS / HIGHLIGHTS === */}
      <AnimatedSection animation="fade-in-up">
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-4xl font-black text-foreground mb-3 tracking-tighter">
                CHỈ SỐ <span className="gradient-text neon-glow">HỆ THỐNG</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Users,    value: 1500, label: 'Thành viên',  suffix: '+', color: 'text-orange-500', bg: 'bg-orange-50/50 border-orange-100' },
                { icon: Zap,      value: 2,    label: 'Giải thưởng', suffix: '',  color: 'text-yellow-600', bg: 'bg-yellow-50/50 border-yellow-100' },
                { icon: Star,     value: 7,    label: 'Lĩnh vực',    suffix: '',  color: 'text-purple-500', bg: 'bg-purple-50/50 border-purple-100' },
                { icon: Terminal, value: 10,   label: 'CLB hoạt động',suffix: '+', color: 'text-blue-500',  bg: 'bg-blue-50/50 border-blue-100' },
              ].map(({ icon: Icon, value, label, suffix, color, bg }, i) => (
                <AnimatedSection key={label} animation="scale-in" delay={i * 80} className="h-full">
                  <div className={`rounded-2xl border p-6 text-center ${bg} h-full flex flex-col items-center justify-center tech-card neon-border`}>
                    <Icon size={24} className={`${color} mb-2 animate-pulse`} />
                    <div className="text-3xl sm:text-4xl font-black text-foreground count-highlight">
                      <AnimatedCounter target={value} suffix={suffix} />
                    </div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-2">{label}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* === CTA SECTION === */}
      <AnimatedSection animation="fade-in-up">
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30 tech-grid border-t border-border/50">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="rounded-3xl p-10 sm:p-14 relative overflow-hidden animate-gradient neon-border"
              style={{
                background: 'linear-gradient(135deg, oklch(0.62 0.21 51.44), oklch(0.72 0.18 51.44), oklch(0.62 0.21 51.44))',
                backgroundSize: '200% 200%',
              }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex justify-center mb-5">
                  <div className="bg-white/20 p-3.5 rounded-2xl backdrop-blur-sm border border-white/30">
                    <Sparkles size={30} className="text-white" />
                  </div>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                  TỐI ƯU HÓA LỰA CHỌN?
                </h2>
                <p className="text-white/85 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
                  Thuật toán AI sẽ phân tích sở thích và đề xuất cộng đồng phù hợp nhất với profile của bạn.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/chat"
                    className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-primary rounded-xl font-bold text-sm sm:text-base hover:shadow-xl hover:shadow-black/10 transition-all duration-200 active:scale-95"
                  >
                    <MessageCircle size={18} />
                    KÍCH HOẠT AI
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/clubs"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/15 border border-white/30 text-white rounded-xl font-bold text-sm sm:text-base hover:bg-white/25 transition-all duration-200 active:scale-95 backdrop-blur-sm"
                  >
                    <BookOpen size={18} />
                    DATABASE CLB
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* === FOOTER === */}
      <footer className="border-t border-border py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Sparkles size={16} />
            <span>FPT Clubs v2.0</span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            © 2024 FPT University Đà Nẵng · Nền tảng khám phá câu lạc bộ
          </p>
          <div className="flex items-center gap-4">
            <Link href="/clubs" className="text-xs text-muted-foreground hover:text-primary transition-colors">DATABASE</Link>
            <Link href="/chat" className="text-xs text-primary hover:opacity-80 transition-opacity font-medium">AI ASSISTANT →</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
