'use client';

import { useState, useMemo } from 'react';
import { Navigation } from '@/components/Navigation';
import { ClubCard } from '@/components/ClubCard';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Club } from '@/lib/types';
import {
  Search,
  SlidersHorizontal,
  X,
  Users,
  Sparkles,
  Terminal,
} from 'lucide-react';
import Link from 'next/link';
import { MarqueeBanner } from '@/components/MarqueeBanner';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import clubs from '@/public/data/clubs.json';

const categories = [
  'Tất cả',
  'Sports',
  'Volunteer',
  'Arts & Music',
  'Martial Arts',
  'Technology',
  'Language',
  'Business & Marketing',
  'Media & Design',
];

const categoryLabels: Record<string, string> = {
  'Tất cả': 'Tất cả',
  'Sports': 'Thể thao',
  'Volunteer': 'Tình nguyện',
  'Arts & Music': 'Âm nhạc',
  'Martial Arts': 'Võ thuật',
  'Technology': 'Công nghệ',
  'Language': 'Ngôn ngữ',
  'Business & Marketing': 'Kinh doanh',
  'Media & Design': 'Truyền thông',
};

export default function ClubsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClubs = useMemo(() => {
    return (clubs as Club[]).filter((club) => {
      const matchesCategory =
        selectedCategory === 'Tất cả' || club.category === selectedCategory;
      const matchesSearch =
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const isFiltering = selectedCategory !== 'Tất cả' || searchTerm.trim() !== '';

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Page Header */}
      <section className="relative overflow-hidden hero-gradient border-b border-border py-12 sm:py-16 px-4 sm:px-6 lg:px-8 tech-grid scan-overlay">
        {/* Background blobs */}
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-15 pointer-events-none animate-float"
          style={{ background: 'radial-gradient(circle, oklch(0.80 0.21 51.44), transparent 70%)', filter: 'blur(48px)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 pointer-events-none animate-float-reverse"
          style={{ background: 'radial-gradient(circle, oklch(0.72 0.18 51.44), transparent 70%)', filter: 'blur(32px)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="animate-fade-in-down mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Câu lạc bộ</span>
          </div>

          <div className="animate-slide-in-left">
            <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 neon-border backdrop-blur-sm">
              <Terminal size={13} />
              DATABASE_QUERY: CLUBS
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-foreground mb-3 leading-tight tracking-tight text-pop animate-float-text">
              KHO DỮ LIỆU <span className="gradient-text neon-glow">CLB</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
              Hệ thống đang truy xuất <strong className="text-foreground"><AnimatedCounter target={clubs.length} /></strong> thực thể hoạt động.
            </p>
          </div>
        </div>
      </section>

      <MarqueeBanner />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search & Filter box */}
        <AnimatedSection animation="fade-in-up" className="mb-8">
          <div className="bg-card rounded-2xl border border-border p-4 sm:p-5 shadow-sm space-y-4">
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  <X size={16} />
                </button>
              )}
              <input
                type="text"
                placeholder="Tìm tên câu lạc bộ hoặc từ khóa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm sm:text-base transition-shadow"
              />
            </div>

            {/* Category filter */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <SlidersHorizontal size={14} className="text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Lĩnh vực</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-medium transition-all duration-200 text-xs sm:text-sm active:scale-95 ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                        : 'bg-background border border-border text-foreground hover:border-primary/50 hover:text-primary'
                    }`}
                  >
                    {categoryLabels[category] ?? category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Results info */}
        {isFiltering && (
          <AnimatedSection animation="fade-in-down" className="mb-5 flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredClubs.length}</span> câu lạc bộ
              {selectedCategory !== 'Tất cả' && (
                <span> trong <strong className="text-primary">{categoryLabels[selectedCategory]}</strong></span>
              )}
              {searchTerm && (
                <span> khớp với "<strong className="text-foreground">{searchTerm}</strong>"</span>
              )}
            </p>
            <button
              onClick={() => { setSelectedCategory('Tất cả'); setSearchTerm(''); }}
              className="text-xs text-primary hover:opacity-80 font-medium flex items-center gap-1 transition-opacity"
            >
              <X size={12} /> Xóa bộ lọc
            </button>
          </AnimatedSection>
        )}

        {/* Clubs grid */}
        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredClubs.map((club, i) => (
              <ClubCard key={club.id} club={club} index={i} />
            ))}
          </div>
        ) : (
          <AnimatedSection animation="scale-in">
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-secondary rounded-full p-6 mb-4">
                <Search size={32} className="text-muted-foreground" />
              </div>
              <p className="text-base sm:text-lg font-medium text-foreground mb-2">Không tìm thấy câu lạc bộ</p>
              <p className="text-sm text-muted-foreground mb-6">Thử thay đổi từ khóa hoặc bộ lọc lĩnh vực</p>
              <button
                onClick={() => { setSelectedCategory('Tất cả'); setSearchTerm(''); }}
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Xem tất cả
              </button>
            </div>
          </AnimatedSection>
        )}

        {/* Bottom CTA */}
        <AnimatedSection animation="fade-in-up" delay={200} className="mt-16 text-center">
          <div className="bg-secondary/60 rounded-2xl p-8 border border-border">
            <div className="flex justify-center mb-3">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Users size={24} className="text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Chưa tìm được CLB phù hợp?</h3>
            <p className="text-muted-foreground text-sm mb-5">Chat với AI tư vấn để được gợi ý câu lạc bộ dựa trên sở thích của bạn.</p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
            >
              <Sparkles size={16} />
              Chat với AI ngay
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
