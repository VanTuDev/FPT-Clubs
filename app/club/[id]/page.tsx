'use client';

import { useParams, useRouter } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { AnimatedSection } from '@/components/AnimatedSection';
import { TypewriterText } from '@/components/TypewriterText';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Club } from '@/lib/types';
import clubs from '@/public/data/clubs.json';
import {
  ArrowLeft,
  MapPin,
  Users,
  Clock,
  Share2,
  Facebook,
  CheckCircle2,
  Dumbbell,
  Heart,
  Music,
  Sword,
  Code2,
  Languages,
  TrendingUp,
  Camera,
  ShieldCheck,
  ChevronRight,
  MessageCircle,
  Sparkles,
  ExternalLink,
  Calendar,
  Mail,
  Zap,
  Terminal,
  Activity,
  Trophy,
  Cpu,
} from 'lucide-react';
import Link from 'next/link';

const categoryConfig: Record<string, {
  icon: React.ElementType;
  gradient: string;
  label: string;
  bg: string;
  text: string;
}> = {
  'Sports':              { icon: Dumbbell,    gradient: 'from-orange-600 via-amber-500 to-orange-400', label: 'THE_SPORTS',     bg: 'bg-orange-50 border-orange-200',  text: 'text-orange-700' },
  'Volunteer':           { icon: Heart,        gradient: 'from-rose-600 via-pink-500 to-rose-400',   label: 'THE_VOLUNTEER',  bg: 'bg-rose-50 border-rose-200',      text: 'text-rose-700' },
  'Arts & Music':        { icon: Music,        gradient: 'from-violet-600 via-purple-500 to-indigo-400',label: 'THE_MUSIC',      bg: 'bg-violet-50 border-violet-200',  text: 'text-violet-700' },
  'Martial Arts':        { icon: Sword,        gradient: 'from-red-600 via-orange-500 to-red-400',    label: 'THE_MARTIAL',    bg: 'bg-red-50 border-red-200',        text: 'text-red-700' },
  'Technology':          { icon: Code2,        gradient: 'from-blue-600 via-cyan-500 to-sky-400',       label: 'THE_TECH',       bg: 'bg-blue-50 border-blue-200',      text: 'text-blue-700' },
  'Language':            { icon: Languages,    gradient: 'from-teal-600 via-emerald-500 to-green-400',  label: 'THE_LANGUAGE',   bg: 'bg-teal-50 border-teal-200',      text: 'text-teal-700' },
  'Business & Marketing':{ icon: TrendingUp,   gradient: 'from-yellow-600 via-orange-500 to-amber-400', label: 'THE_BUSINESS',   bg: 'bg-yellow-50 border-yellow-200',  text: 'text-yellow-700' },
  'Media & Design':      { icon: Camera,       gradient: 'from-fuchsia-600 via-pink-500 to-rose-400',   label: 'THE_MEDIA',     bg: 'bg-fuchsia-50 border-fuchsia-200',text: 'text-fuchsia-700' },
};



const defaultConfig = {
  icon: ShieldCheck,
  gradient: 'from-orange-600 to-red-800',
  label: 'ENTITY',
  bg: 'bg-orange-50 border-orange-200',
  text: 'text-orange-700',
};

export default function ClubDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clubId = params.id as string;
  const club = (clubs as Club[]).find((c) => c.id === clubId);

  if (!club) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <div className="bg-secondary rounded-full p-6 mb-4 tech-grid">
            <ShieldCheck size={36} className="text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-black text-foreground mb-2">404: ENTITY_NOT_FOUND</h1>
          <p className="text-muted-foreground text-sm mb-6">Không tìm thấy thực thể dữ liệu trong hệ thống.</p>
          <Link
            href="/clubs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity font-bold text-sm neon-border"
          >
            <ArrowLeft size={16} />
            BACK_TO_DATABASE
          </Link>
        </div>
      </div>
    );
  }

  const config = categoryConfig[club.category] ?? defaultConfig;
  const { icon: CategoryIcon, gradient, label, bg, text } = config;

  const handleShare = async () => {
    try {
      await navigator.share({ title: club.name, url: window.location.href });
    } catch {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />

      {/* ── HERO ── */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${club.themeGradient || gradient}`}>
        {/* Tech Overlays */}
        <div className="absolute inset-0 tech-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 scan-overlay opacity-30 pointer-events-none" />
        {/* Dark overlay for maximum text contrast */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* Top bar: back + actions */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-0 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            RETURN
          </button>

          <div className="flex items-center gap-2">
            <a
              href={club.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-xl backdrop-blur-md transition-all uppercase"
            >
              <Facebook size={14} />
              <span className="hidden sm:inline">FACEBOOK_SYNC</span>
            </a>
            <button
              onClick={handleShare}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white p-2 rounded-xl backdrop-blur-md transition-all"
              title="SHARE_ENTITY"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-16 sm:pb-24">
          {/* Category badge */}
          <div className="animate-fade-in-down mb-6">
            <span className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white text-[10px] font-black tracking-[0.2em] px-4 py-2 rounded-full backdrop-blur-md uppercase">
              <Terminal size={12} className="animate-pulse" />
              {label}
            </span>
          </div>

          {/* Club name */}
          <div className="animate-slide-in-left mb-6">
            <div className="text-white/60 font-mono text-xs mb-2 tracking-widest">ID: {club.id.toUpperCase()} // STATUS: ACTIVE</div>
            <h1 className="text-3xl sm:text-6xl font-black text-white leading-tight drop-shadow-xl max-w-4xl tracking-tighter text-pop animate-float-text">
              <TypewriterText texts={[club.name]} speed={50} cursor={false} />
            </h1>
          </div>

          {/* Short description */}
          <p className="animate-fade-in-up delay-200 text-white/90 text-sm sm:text-lg max-w-2xl leading-relaxed italic border-l-2 border-white/30 pl-4">
            "{club.description}"
          </p>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ── STATS ROW ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-10 relative z-20 mb-12">
        <AnimatedSection animation="scale-in">
          <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl shadow-2xl p-6 sm:p-8 tech-card neon-border">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-border">
              {[
                { icon: Users,    label: 'MEMBERS',   value: club.members, counter: club.memberCount ?? 0, suffix: '+' },
                { icon: Calendar, label: 'FOUNDED',   value: club.founded ?? '2020', counter: 0, suffix: '' },
                { icon: Clock,    label: 'CYCLE',     value: club.frequency, counter: 0, suffix: '' },
                { icon: MapPin,   label: 'LOCATION',  value: club.location, counter: 0, suffix: '' },
              ].map(({ icon: Icon, label, value, counter, suffix }, i) => (
                <div key={label} className="px-4 text-center lg:first:pl-0 lg:last:pr-0 pt-4 lg:pt-0">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon size={18} className="text-primary" />
                    </div>
                  </div>
                  <p className="text-[9px] font-black tracking-widest text-muted-foreground mb-1 uppercase">{label}</p>
                  <div className="font-black text-foreground text-sm sm:text-base leading-tight font-mono">
                    {counter > 0 ? <AnimatedCounter target={counter} suffix={suffix} /> : value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* About */}
          <AnimatedSection animation="fade-in-up" className="h-full">
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 tech-grid h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <CategoryIcon size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2.5 rounded-2xl ${bg} border shadow-sm`}>
                    <Sparkles size={18} className={text} />
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black text-foreground tracking-tight uppercase">Thông tin chi tiết</h2>
                </div>
                <p className="text-foreground/90 leading-relaxed text-base sm:text-lg text-pretty font-medium mb-6">
                  {club.fullDescription}
                </p>
                {club.contact && (
                  <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-2xl border border-border w-fit">
                    <Mail size={16} className="text-primary" />
                    <span className="text-xs font-mono font-bold">{club.contact}</span>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Highlights Section */}
          {club.highlights && club.highlights.length > 0 && (
            <AnimatedSection animation="fade-in-up" delay={100}>
              <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`p-2.5 rounded-2xl ${bg} border shadow-sm`}>
                    <Trophy size={18} className={text} />
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black text-foreground tracking-tight uppercase">Thành tựu nổi bật</h2>
                </div>
                <div className="space-y-4">
                  {club.highlights.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors border border-transparent hover:border-border group">
                      <div className="mt-1">
                        <Zap size={16} className="text-primary animate-pulse" />
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-foreground leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Activities Section */}
          {club.activities && club.activities.length > 0 && (
            <AnimatedSection animation="fade-in-up" delay={200}>
              <div className="bg-card border border-border rounded-3xl p-6 sm:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`p-2.5 rounded-2xl ${bg} border shadow-sm`}>
                    <Activity size={18} className={text} />
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black text-foreground tracking-tight uppercase">Hoạt động chính</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {club.activities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-background hover:neon-border transition-all">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm font-bold text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          
          {/* Benefits Sticky */}
          <div className="sticky top-24 space-y-6">
            <AnimatedSection animation="fade-in-up" delay={150}>
              <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 neon-border shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2.5 rounded-2xl ${bg} border shadow-sm`}>
                    <CheckCircle2 size={18} className={text} />
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-foreground tracking-tight uppercase">Quyền lợi</h2>
                </div>
                <div className="space-y-3">
                  {club.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 rounded-xl p-3.5 border ${bg} transition-all hover:scale-[1.02]`}
                    >
                      <CheckCircle2 size={14} className={`${text} mt-0.5 shrink-0`} />
                      <p className={`font-bold text-xs sm:text-sm ${text} tracking-tight`}>{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Tech Specs / Extra Meta */}
            <AnimatedSection animation="fade-in-up" delay={250}>
              <div className="bg-black/95 text-white rounded-3xl p-6 sm:p-8 scan-overlay relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <Cpu size={24} className="text-primary/40" />
                </div>
                <h3 className="text-xs font-black tracking-[0.3em] text-primary mb-6 uppercase italic">Entity_Specs</h3>
                <div className="space-y-4 font-mono text-[10px]">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/50">SYSTEM_ID</span>
                    <span className="text-white">{clubId.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/50">CATEGORY_TAG</span>
                    <span className="text-white">{club.category}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/50">VALIDATION</span>
                    <span className="text-green-400">VERIFIED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">UI_MODE</span>
                    <span className="text-primary">TECH_V2.0</span>
                  </div>
                </div>
                
                <div className="mt-8 space-y-3">
                  <Link
                    href="/chat"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-xs hover:bg-primary/90 transition-all active:scale-95 shadow-[0_0_15px_rgba(255,140,66,0.5)]"
                  >
                    <MessageCircle size={16} />
                    INITIALIZE_AI_CHAT
                  </Link>
                  <a
                    href={club.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-black text-xs hover:bg-white/20 transition-all active:scale-95"
                  >
                    <Facebook size={16} />
                    EXTERNAL_VISIT
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </div>
  );
}
