# Latingeek Portfolio - Project Plan

## Overview
Professional bilingual portfolio for German Lamela (Latingeek) showcasing development work with top-notch animated design.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Framer Motion
- **Internationalization:** next-intl
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics, Google Search Console
- **Forms:** React Hook Form + Resend

## Core Features
1. **Bilingual Support**
   - English/Spanish language switching
   - Persistent language preference
   - SEO-friendly URL structure (/en, /es)

2. **Design System**
   - Clean, modern aesthetic
   - Smooth animations (scroll, hover, transitions)
   - Responsive (mobile-first)
   - Optional dark/light mode

3. **Content Sections**
   - Hero with animated intro
   - About section (bio, skills)
   - Projects showcase (filterable grid)
   - Contact form with validation
   - Footer with social links

4. **SEO Optimization**
   - Meta tags per page/language
   - Open Graph images
   - XML sitemap
   - Robots.txt
   - Structured data (JSON-LD)

## Project Structure
```
latingeek-portfolio/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Root layout with i18n
│   │   ├── page.tsx           # Homepage
│   │   ├── about/page.tsx
│   │   ├── projects/page.tsx
│   │   └── contact/page.tsx
│   └── api/
│       └── contact/route.ts   # Contact form API
├── components/
│   ├── layout/               # Header, Footer, Navigation
│   ├── ui/                   # Buttons, Cards, etc.
│   ├── sections/             # Homepage sections
│   └── animations/           # Reusable animations
├── lib/
│   ├── i18n/                 # i18n configuration
│   ├── utils/                # Helper functions
│   └── constants/            # Project data
├── messages/                 # i18n JSON files
│   ├── en.json
│   └── es.json
├── public/                   # Static assets
│   ├── images/
│   └── favicon/
└── content/                  # Content management
    ├── projects.json         # Project data
    └── bio.json             # Bio information
```

## Development Phases

### Phase 1: Foundation (Day 1)
- [ ] Initialize Next.js project with TypeScript
- [ ] Configure Tailwind CSS + Framer Motion
- [ ] Set up next-intl for i18n
- [ ] Create base layout structure
- [ ] Implement language switcher

### Phase 2: Content & Design (Day 2)
- [ ] Create design system (colors, typography)
- [ ] Implement homepage sections
- [ ] Add animations and transitions
- [ ] Create project showcase component
- [ ] Build contact form

### Phase 3: Polish & SEO (Day 3)
- [ ] Add SEO metadata
- [ ] Implement sitemap and robots.txt
- [ ] Add analytics
- [ ] Performance optimization
- [ ] Cross-browser testing

### Phase 4: Deployment (Day 4)
- [ ] Deploy to Vercel
- [ ] Configure custom domain (if provided)
- [ ] Set up Google Search Console
- [ ] Final testing

## Content Requirements
Need from German:
1. **Bio Information**
   - Short bio (1-2 sentences)
   - Long bio (paragraph)
   - Professional photo
   - Skills/technologies list

2. **Projects**
   - Title, description, tech stack
   - Live URL, GitHub URL
   - Screenshot/image
   - Key features

3. **Contact**
   - Email address
   - Social media links (GitHub, LinkedIn, etc.)
   - Optional: Phone number

## Success Metrics
- Lighthouse scores >90
- Mobile responsive
- Fast loading (<3s)
- SEO optimized
- Accessible (WCAG 2.1 AA)

## Timeline
- **Research & Planning:** 1 day
- **Development:** 3 days
- **Testing & Deployment:** 1 day
- **Total:** 5 days

## Notes
- Will use placeholder content during development
- Can iterate based on feedback
- Focus on quality over speed