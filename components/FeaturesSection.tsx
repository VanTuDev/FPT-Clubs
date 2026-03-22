'use client';

import { Search, MessageCircle, LayoutGrid, Trophy, Calendar, Zap } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

const features = [
  {
    icon: Search,
    title: 'Khám phá câu lạc bộ',
    description:
      'Dễ dàng tìm kiếm và lọc theo sở thích — thể thao, âm nhạc, lập trình, tình nguyện và hơn thế nữa.',
    color: 'from-orange-400 to-amber-400',
    bgLight: 'bg-orange-50 border-orange-100',
    iconColor: 'text-orange-500',
  },
  {
    icon: MessageCircle,
    title: 'Chat AI tư vấn',
    description:
      'AI tư vấn thông minh hiểu đam mê của bạn và đề xuất câu lạc bộ phù hợp nhất theo thời gian thực.',
    color: 'from-rose-400 to-pink-400',
    bgLight: 'bg-rose-50 border-rose-100',
    iconColor: 'text-rose-500',
  },
  {
    icon: LayoutGrid,
    title: 'Đa dạng lựa chọn',
    description:
      'Hơn 10 câu lạc bộ thuộc 7 lĩnh vực khác nhau, đủ để mọi sinh viên FPT tìm thấy nơi thuộc về.',
    color: 'from-violet-400 to-purple-400',
    bgLight: 'bg-violet-50 border-violet-100',
    iconColor: 'text-violet-500',
  },
  {
    icon: Trophy,
    title: 'Thành tích nổi bật',
    description:
      'Các câu lạc bộ đã đạt nhiều giải thưởng cấp trường và thành phố, tạo nền tảng vững chắc cho sinh viên.',
    color: 'from-yellow-400 to-orange-400',
    bgLight: 'bg-yellow-50 border-yellow-100',
    iconColor: 'text-yellow-600',
  },
  {
    icon: Calendar,
    title: 'Sự kiện thường xuyên',
    description:
      'Từ workshop, camping đến liveshow — lịch hoạt động dày đặc giúp bạn luôn bận rộn và phát triển.',
    color: 'from-teal-400 to-cyan-400',
    bgLight: 'bg-teal-50 border-teal-100',
    iconColor: 'text-teal-500',
  },
  {
    icon: Zap,
    title: 'Tham gia miễn phí',
    description:
      'Tất cả thông tin câu lạc bộ đều miễn phí. Chỉ cần đam mê và nhiệt huyết là đủ để bắt đầu!',
    color: 'from-blue-400 to-indigo-400',
    bgLight: 'bg-blue-50 border-blue-100',
    iconColor: 'text-blue-500',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <AnimatedSection animation="fade-in-up" className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-primary/10 text-primary font-semibold text-xs sm:text-sm px-4 py-2 rounded-full mb-4 border border-primary/20">
            Tại sao chọn FPT Clubs?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            Mọi thứ bạn cần để
            <br />
            <span className="gradient-text">tìm đúng nơi</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Nền tảng giúp sinh viên FPT Đà Nẵng kết nối với cộng đồng phù hợp, phát triển kỹ năng và tạo ra những kỷ niệm đáng nhớ.
          </p>
        </AnimatedSection>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map(({ icon: Icon, title, description, bgLight, iconColor }, i) => (
            <AnimatedSection
              key={title}
              animation="fade-in-up"
              delay={i * 80}
              className="h-full"
            >
              <div
                className={`group h-full rounded-2xl border p-6 ${bgLight} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-default`}
              >
                <div className="mb-4">
                  <div className="inline-flex p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    <Icon size={24} className={iconColor} />
                  </div>
                </div>
                <h3 className="font-bold text-foreground text-base sm:text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
