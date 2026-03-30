# Latingeek Portfolio - Branding & Design System

## Color Scheme
**Primary Palette:**
- Primary: `#2563eb` (Blue - Professional, tech)
- Secondary: `#7c3aed` (Purple - Creative, innovative)
- Accent: `#06b6d4` (Cyan - Modern, energetic)

**Neutrals:**
- Background: `#0f172a` (Dark blue-gray)
- Surface: `#1e293b` (Card backgrounds)
- Text: `#f8fafc` (Light)
- Muted: `#94a3b8` (Secondary text)

**Gradients:**
- Hero gradient: `linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #06b6d4 100%)`
- Card gradient: `linear-gradient(145deg, #1e293b 0%, #0f172a 100%)`

## Typography
**Font Family:** Inter (Google Fonts)
- Headings: Inter 700-900
- Body: Inter 400-500
- Code: JetBrains Mono

**Scale:**
- h1: 3.5rem (56px)
- h2: 2.5rem (40px)
- h3: 2rem (32px)
- h4: 1.5rem (24px)
- Body: 1rem (16px)
- Small: 0.875rem (14px)

## Animation System
**Timing:**
- Fast: 150ms
- Medium: 300ms
- Slow: 500ms

**Easing:**
- Default: `cubic-bezier(0.4, 0, 0.2, 1)`
- Bounce: `cubic-bezier(0.68, -0.55, 0.265, 1.55)`

**Transitions:**
- Fade in: opacity + translateY
- Scale on hover: scale(1.02)
- Border glow: box-shadow animation

## Components Design
**Buttons:**
- Primary: Gradient background, rounded-lg, hover:scale
- Secondary: Transparent with border, hover:bg-opacity-10
- Text: Underline on hover

**Cards:**
- Rounded-xl, shadow-2xl, hover:shadow-3xl
- Glassmorphism effect: backdrop-blur-sm
- Border: subtle gradient border

**Navigation:**
- Fixed header with blur backdrop
- Active link indicator (animated underline)
- Language switcher: flag icons + dropdown

## Layout Principles
1. **Mobile-first:** Responsive breakpoints
2. **Whitespace:** Generous padding/margin
3. **Grid:** Consistent 12-column grid
4. **Alignment:** Visual balance
5. **Hierarchy:** Clear visual importance

## Visual Elements
**Shapes:**
- Rounded corners (consistent radius)
- Geometric accents (triangles, circles)
- Gradient overlays

**Icons:**
- Lucide React icons
- Animated on hover
- Consistent stroke width

**Images:**
- Rounded corners
- Shadow effects
- Lazy loading with blur placeholder

## Accessibility
- WCAG 2.1 AA compliant
- Sufficient color contrast
- Focus indicators
- Screen reader support
- Reduced motion preference