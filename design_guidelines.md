# ScamShield+ (守骗者) Design Guidelines

## Design Approach
**Accessibility-First Design System** - Drawing from Material Design principles with enhanced accessibility for elderly users. This is a safety-critical educational tool requiring maximum clarity, predictability, and ease of use.

## Core Design Principles
1. **Touch-First Interface**: All interactive elements optimized for finger touch, not mouse precision
2. **Predictable Patterns**: Consistent layouts across all modules to reduce cognitive load
3. **Visual Clarity**: High information density without clutter, clear visual hierarchy
4. **Audio-Visual Redundancy**: Every important element has both visual and audio feedback options

---

## Typography System

**Primary Font**: Noto Sans (supports English, Chinese, Malay with excellent readability)
**Fallback**: System fonts (Arial, sans-serif)

**Type Scale** (Mobile-first, scales up for tablet/desktop):
- **Headings (H1)**: 32px/40px (mobile/desktop) - semibold - page titles
- **Headings (H2)**: 24px/28px - semibold - section headers
- **Module Buttons**: 22px/24px - bold - primary navigation
- **Body Text**: 18px/20px - regular - descriptions, content
- **Labels**: 16px/18px - medium - form labels, secondary info
- **Caption**: 14px/16px - regular - metadata, timestamps

**Line Height**: 1.6 for body text, 1.3 for headings (improved readability)
**Letter Spacing**: +0.02em for Chinese characters, normal for English

---

## Layout System

**Spacing Units**: Use Tailwind units of **4, 6, 8, 12, 16** consistently
- Component padding: p-6 to p-8
- Section spacing: py-12 to py-16
- Button padding: px-8 py-4
- Card gaps: gap-6 to gap-8

**Container Strategy**:
- Max-width: 1200px for main content
- Padding: px-4 (mobile), px-6 (tablet), px-8 (desktop)
- Single-column layouts on mobile, 2-column maximum on desktop for comparison views

**Grid Patterns**:
- Home modules: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Learn cards: 1 column (mobile), 2 columns (desktop)
- Video grid: 1 column (mobile), 2 columns (desktop)
- Always maintain generous spacing between cards (gap-6 to gap-8)

---

## Component Library

### Navigation & Structure

**Language Selection Modal** (Startup):
- Centered overlay with backdrop blur
- Three large language cards (stacked vertically on mobile)
- Each card: 200px width, 120px height minimum
- Icon + language name + audio icon
- Cards have hover/focus states with subtle scale

**Header Bar** (All Pages):
- Height: 80px (mobile), 96px (desktop)
- Left: Logo + App name
- Right: Accessibility toolbar (4 icon buttons in horizontal row)
- Sticky positioning on scroll

**Accessibility Toolbar**:
- 4 icon buttons: 🔊 Narration, 🌗 Font Size, 🎨 Contrast, 🐢 Animation
- Each button: 48px × 48px minimum touch target
- Toggle states clearly indicated with icons that change
- Grouped with gap-4

### Primary Components

**Module Buttons** (Home Page):
- Card-based design, not flat buttons
- Minimum height: 120px (mobile), 140px (desktop)
- Layout: Icon (60px) + Title + Subtitle stacked vertically, centered
- Rounded corners (rounded-2xl)
- Shadow for depth (shadow-lg on hover)
- Active/pressed state with subtle transform

**Content Cards** (Learn, Videos):
- Aspect ratio: 16:9 for video thumbnails, flexible for text cards
- Structure: Image/thumbnail → Title → Description → Action buttons
- Action buttons: Full-width on mobile, inline on desktop
- Card padding: p-6
- Border or shadow for definition

**Audio Play Buttons**:
- Distinctive visual style (always visible, not icon-only)
- Format: "🔊 Play Voice / 播放语音 / Main Suara" with icon
- Size: Large (px-6 py-3), standalone buttons not embedded in text
- State indicators: Playing (animated icon), Paused, Error

**Call-to-Action Buttons**:
- Primary: Extra large (px-10 py-5), bold text, rounded-xl
- Secondary: Large (px-8 py-4), medium text, rounded-lg
- Emergency (999): Distinctive treatment, prominent placement
- All buttons minimum 60px height for easy tapping

### Interactive Modules

**Simulation Panels**:
- Full-screen or near-full-screen cards (max-w-4xl centered)
- Step counter at top (Step 1 of 8)
- Large illustration/screenshot area (60% of viewport height)
- Explanation text below (18px-20px)
- Navigation: Previous/Next buttons at bottom, 80px wide each
- Progress bar at very top (thin, 4px height)

**Quiz Interface**:
- Question card: Large text (24px), clear numbering (1/10)
- Answer options: Stacked vertically, minimum 80px height each
- Radio button + full text label (both clickable)
- Immediate feedback: Checkmark/X icon + explanation panel appears
- Results screen: Large score display, badge/icon, share buttons

**Help Lines Page**:
- Emergency buttons: Extra prominent, 160px height minimum
- Layout: Phone icon (left) + Number + Description + Tap to Call
- Checklist: Large checkboxes (40px), generous spacing
- WhatsApp share button: Distinct green-themed treatment

### Forms & Input

**All Input Fields**:
- Height: 60px minimum
- Large text (18px)
- Clear labels above (not floating)
- High-contrast borders
- Focus states: Thicker border (3px), not just color change

---

## Animation Guidelines

**Minimal Animation Strategy** - Only for essential feedback:
- **Page Transitions**: Simple fade (200ms), no slides or complex motion
- **Button Feedback**: Subtle scale (0.98) on press, 100ms duration
- **Loading States**: Simple spinner or pulse, no elaborate animations
- **Toggle States**: Instant change for accessibility controls, no transitions
- **Modal Open/Close**: Fade + slight scale (300ms max)

**Slow Animation Mode**: When toggled, all durations double, easing becomes linear

---

## Accessibility Requirements

**Touch Targets**:
- Minimum: 60px × 60px for all interactive elements
- Preferred: 80px × 80px for primary actions
- Spacing: Minimum 12px between adjacent touch targets

**Focus Indicators**:
- All interactive elements must have visible focus states
- Focus ring: 3px solid, offset by 2px
- Keyboard navigation fully supported throughout

**Audio Narration**:
- Every page title, button label, and content block has narration available
- Narration triggered automatically on page load if enabled
- Manual play buttons for all narrated content
- Visual feedback when narration is playing (animated icon)

**Visual Hierarchy**:
- Clear heading structure (H1 → H2 → H3)
- Consistent iconography (choose Material Icons or Heroicons)
- Icon + Text labels always paired, never icon-only buttons

---

## Images

**Hero Sections**: No traditional hero images - This app prioritizes immediate functionality over aesthetics

**Content Images**:
- **Learn Module Cards**: Illustrative icons (150px × 150px) showing scam scenarios - use simple, clear illustrations not photos
- **Video Thumbnails**: 16:9 aspect ratio, clear preview frames
- **Simulation**: Mock phone screenshots (blurred appropriately), interface mockups
- **A-Xin Assistant**: Friendly avatar/mascot illustration (circular, 80px) appears in chat interface
- **Quiz Results**: Badge/certificate graphics (300px × 300px) for achievement levels

**Image Treatment**: All images have alt text in all three languages, lazy loading enabled

---

## Page-Specific Layouts

**Home Page**: 
- Header + Language indicator + Accessibility toolbar
- Grid of 7 module cards (responsive columns)
- Each card: Icon + Title + Subtitle + Arrow indicator
- Footer: A-Xin assistant launcher button (floating, bottom-right)

**Learn/Videos/Tips Pages**:
- Header + Back button
- Page title with narration button
- Card grid (responsive)
- Footer with related links

**Simulation Page**:
- Minimal header (Back + Progress)
- Full-screen panel area
- Fixed navigation controls at bottom
- No footer during simulation

**Quiz Page**:
- Header + Question counter
- Single question card (centered)
- Results overlay (full-screen modal)

**HelpLines Page**:
- Emergency buttons section (top, prominent)
- Checklist section (middle)
- Resources links section (bottom)

This design prioritizes elderly users' needs: clarity, accessibility, and safety above visual trends.