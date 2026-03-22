# PWA Setup - FPT Clubs App

## Overview

FPT Clubs is now a fully-featured Progressive Web App (PWA) that can be installed on mobile devices and desktop. Users can access the app offline and enjoy a native app-like experience.

## Features Implemented

### 1. **Service Worker** (`public/sw.js`)
- Network-first caching strategy
- Offline support with fallback
- Auto-updates checking
- Cache management

### 2. **Web App Manifest** (`public/manifest.json`)
- App metadata (name, description, colors)
- App icons (multiple sizes for different devices)
- Display mode: `fullscreen` (hides URL bar on mobile)
- Maskable icons for adaptive displays
- Shortcuts for quick access to key pages
- Screenshots for app store listings

### 3. **Mobile & Desktop Optimization**
- Fully responsive design (mobile-first approach)
- Viewport configuration for proper scaling
- Safe area padding for notched devices
- Native app-like navigation

### 4. **Icons Generated**
- `icon-192.png` - Standard 192x192 icon
- `icon-512.png` - Standard 512x512 icon
- `icon-192-maskable.png` - Maskable icon for adaptive displays
- `icon-512-maskable.png` - Large maskable icon

### 5. **PWA Provider Component** (`components/PwaProvider.tsx`)
- Registers service worker
- Handles install prompts
- Checks for updates
- Manages auto-reload on updates

## Installation Instructions

### On Mobile (iOS & Android)

**iOS:**
1. Open the app in Safari
2. Tap the Share button (square with arrow)
3. Select "Add to Home Screen"
4. Name the app and tap "Add"

**Android:**
1. Open the app in Chrome (or other Chromium browser)
2. Tap the menu (three dots)
3. Select "Install app" or "Add to Home Screen"
4. Follow the prompts

### On Desktop (PWA Capable Browsers)

**Chrome/Edge:**
1. Open the app URL
2. Look for the install icon in the address bar (or menu)
3. Click "Install"
4. The app will open in a window without the browser UI

## Display Modes

The app is configured with `display: fullscreen` which:
- ✅ Hides the URL bar completely on mobile
- ✅ Provides a native app experience
- ✅ Maximizes screen real estate
- ✅ Shows app name and icon in system tray

## Offline Functionality

The service worker caches essential files:
- Home page and all static assets
- Manifest and icons
- Subsequent pages are cached on first visit

Users can continue using cached content offline and sync when reconnected.

## Color Scheme

- **Theme Color**: `#FF8C42` (Orange)
- **Background Color**: `#FAFAFA` (Light)
- Status bar adapts based on theme preference

## Testing the PWA

1. **Service Worker Status**: Open DevTools → Application → Service Workers
2. **Manifest**: Application → Manifest file
3. **Offline Mode**: DevTools → Network → Offline
4. **Install Prompt**: Look for install icon/button in address bar

## Responsive Breakpoints

- **Mobile**: < 640px (1 column, compact UI)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (3-4 columns)

All components use Tailwind's responsive utilities (sm:, md:, lg:) for proper scaling.

## Icons Reference

The app uses **shadcn/ui icons** (lucide-react) instead of emoji:
- `Users` - Members count
- `Clock` - Frequency
- `MapPin` - Location
- `Facebook` - Social media link
- `Send` - Chat send button
- `Sparkles` - AI indicator
- `ArrowRight` - Navigation

All icons are scalable and properly colored with the design system.

## Configuration Files

- **manifest.json**: PWA metadata and configuration
- **sw.js**: Service worker for offline caching
- **PwaProvider.tsx**: Service worker registration
- **layout.tsx**: Meta tags and viewport configuration
- **globals.css**: Design tokens and color system

## Next Steps

1. Deploy to Vercel (automatic PWA detection)
2. Monitor lighthouse PWA audit score
3. Gather user feedback on mobile experience
4. Optional: Add push notifications for events
5. Optional: Add offline-first database (IndexedDB)

## Browser Support

✅ Chrome/Edge 45+
✅ Firefox 44+
✅ Safari 11.1+ (iOS & macOS)
✅ Samsung Internet
✅ Opera 32+

## Performance Tips

1. Icons are cached after first load
2. Service worker checks for updates every 60 seconds
3. Network requests try online first, then cache
4. Minimize bundle size for faster first load
5. Use lighthouse to audit and improve scores

---

**Note**: The app is fully functional offline. Users can access previously visited pages without an internet connection.
