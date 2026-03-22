# FPT Clubs - Web App Hướng dẫn

## 📱 Giới thiệu

Đây là một ứng dụng web/app giúp sinh viên FPT khám phá và tìm câu lạc bộ phù hợp với đam mê của mình. Ứng dụng sử dụng thiết kế căn bản màu cam và trắng, fully responsive cho mobile, tablet, và desktop.

## 🎨 Thiết kế

### Màu sắc (Orange & White Theme)
- **Primary**: Cam (#FF8C42) - Dùng cho nút, header, link
- **Background**: Trắng (#FFFFFF)
- **Text**: Đen (#1a1a1a)
- **Borders/Dividers**: Xám nhẹ (#e5e5e5)

Tất cả các màu được định nghĩa trong `app/globals.css` dưới dạng CSS Variables (design tokens).

## 📁 Cấu trúc thư mục

```
/vercel/share/v0-project/
├── app/
│   ├── page.tsx              # Trang chủ - Danh sách câu lạc bộ
│   ├── layout.tsx            # Layout gốc
│   ├── globals.css           # Kiểu toàn cục & design tokens
│   ├── chat/
│   │   └── page.tsx          # Trang Chat AI
│   └── club/
│       └── [id]/
│           └── page.tsx      # Trang chi tiết câu lạc bộ
├── components/
│   ├── Navigation.tsx        # Navigation bar
│   └── ClubCard.tsx          # Card component hiển thị câu lạc bộ
├── lib/
│   └── types.ts              # TypeScript interfaces
├── public/
│   └── data/
│       └── clubs.json        # Dữ liệu các câu lạc bộ
└── hooks/
    └── useClubs.ts           # Hook để fetch dữ liệu clubs
```

## 🛠️ Công nghệ

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Data Storage**: JSON (Public folder)
- **Language**: TypeScript

## 📄 Các trang chính

### 1. Trang chủ (`/`)
- Hiển thị danh sách tất cả câu lạc bộ dạng card grid
- Tìm kiếm theo từ khóa
- Lọc theo danh mục (Categories)
- Responsive: 1 cột (mobile), 2 cột (tablet), 3 cột (desktop)

**Features:**
- Search bar với icon
- Category filter buttons
- Club cards với thông tin tóm tắt
- Link tới trang chi tiết
- Link đến Facebook club

### 2. Trang Chi tiết Câu lạc bộ (`/club/[id]`)
- Hiển thị thông tin đầy đủ của một câu lạc bộ
- Thống kê: Số thành viên, tần suất hoạt động, địa điểm
- Mô tả đầy đủ
- Danh sách lợi ích khi tham gia
- Link Facebook
- CTA (Call-to-action) liên hệ

### 3. Trang Chat AI (`/chat`)
- Chat interface placeholder để tích hợp AI sau
- Hiển thị các câu hỏi được gợi ý
- Có thể gửi câu hỏi của riêng mình
- Hỗ trợ responsive design
- Mock AI response (placeholder)

**Cấu trúc sẵn sàng cho AI integration:**
```javascript
// Khi bạn kết nối AI provider (OpenAI, Groq, v.v.), chỉ cần:
// 1. Thêm API key vào environment variables
// 2. Thay thế hàm xử lý message bằng AI SDK call
// 3. Cập nhật system prompt cho AI
```

## 📊 Dữ liệu Clubs

File `public/data/clubs.json` chứa thông tin 6 câu lạc bộ:

```typescript
interface Club {
  id: string;                // ID duy nhất
  name: string;              // Tên câu lạc bộ
  category: string;          // Danh mục (Sports, Volunteer, etc.)
  description: string;       // Mô tả ngắn
  fullDescription: string;   // Mô tả đầy đủ
  members: string;           // Số thành viên (~)
  frequency: string;         // Tần suất hoạt động
  benefits: string[];        // Danh sách lợi ích
  location: string;          // Địa điểm hoạt động
  facebookUrl: string;       // Link Facebook
  icon: string;              // Emoji icon
}
```

## 🚀 Cách sử dụng

### Development
```bash
# Cài đặt dependencies
pnpm install

# Chạy dev server
pnpm dev

# Truy cập http://localhost:3000
```

### Thêm/ Chỉnh sửa Câu lạc bộ
1. Mở file `public/data/clubs.json`
2. Thêm/chỉnh sửa các object club
3. Thay đổi sẽ tự động được phản ánh trong app

### Tùy chỉnh Màu sắc
1. Mở file `app/globals.css`
2. Chỉnh sửa CSS variables trong `:root` selector
3. Ví dụ: `--primary: oklch(0.62 0.21 51.44);` (Cam)

### Cấu hình AI Chat

**Bước 1:** Thêm AI Provider
```
// Vào Settings > Vars, thêm:
OPENAI_API_KEY=sk-... (hoặc API key từ provider khác)
```

**Bước 2:** Cập nhật `app/chat/page.tsx`
```typescript
// Thay thế hàm handleSendMessage
import { generateText } from 'ai';

const assistantMessage = await generateText({
  model: 'gpt-4', // hoặc model khác
  system: `Bạn là AI tư vấn câu lạc bộ FPT. Giúp sinh viên tìm câu lạc bộ phù hợp dựa trên sở thích của họ. Dữ liệu clubs: ${JSON.stringify(clubs)}`,
  prompt: text,
});
```

## 🎯 Responsive Design

- **Mobile** (< 768px): 1 cột grid, navigation simplified
- **Tablet** (768px - 1024px): 2 cột grid
- **Desktop** (> 1024px): 3-4 cột grid

Tất cả đều sử dụng Tailwind's responsive prefixes: `md:`, `lg:`

## 📝 Ghi chú

- App hiện chưa có authentication, tất cả dữ liệu là public
- Chat AI là placeholder - cần cấu hình AI provider để hoạt động thực tế
- Dữ liệu clubs được lưu trong JSON, không cần database

## 🔄 Cải thiện trong tương lai

- [ ] Authentication & User accounts
- [ ] Database integration (Supabase/Neon)
- [ ] Real AI chat advisement
- [ ] User reviews/ratings
- [ ] Club member management
- [ ] Event calendar
- [ ] Dark mode toggle
- [ ] Multilingual support

---

**Bất kỳ câu hỏi nào, hãy liên hệ hoặc mở issue!** 😊
