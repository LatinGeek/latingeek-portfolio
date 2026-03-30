# Latingeek Portfolio

A modern, animated portfolio website for German Lamela (Latingeek) built with Next.js 15, featuring bilingual support (English/Spanish) and top-notch design.

## 🚀 Features

- **Bilingual Support**: Full English/Spanish translation with seamless language switching
- **Modern Design**: Clean, animated interface with gradient effects and smooth transitions
- **Responsive**: Mobile-first design that works on all devices
- **Performance**: Optimized for speed with 90+ Lighthouse scores
- **SEO Optimized**: Proper metadata, sitemap, and structured data
- **Interactive**: Animated sections, hover effects, and smooth scrolling
- **Contact Form**: Functional contact form with validation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Internationalization**: next-intl
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📁 Project Structure

```
latingeek-portfolio/
├── app/[locale]/          # Dynamic routes for i18n
│   ├── layout.tsx        # Root layout with i18n provider
│   └── page.tsx          # Homepage with all sections
├── components/           # React components
│   ├── layout/          # Header, Footer, Navigation
│   ├── sections/        # Homepage sections
│   ├── ui/              # Reusable UI components
│   └── animations/      # Animation components
├── content/             # Static content
│   ├── bio.json         # Bio information
│   └── projects.json    # Project data
├── lib/                 # Utilities and constants
├── messages/            # i18n translation files
│   ├── en.json
│   └── es.json
├── public/              # Static assets
└── styles/              # Global styles
```

## 🎨 Design System

### Colors
- Primary: `#2563eb` (Blue)
- Secondary: `#7c3aed` (Purple)
- Accent: `#06b6d4` (Cyan)
- Background: `#0f172a` (Dark blue-gray)

### Typography
- Font: Inter (Google Fonts)
- Scale: Responsive typography with Tailwind

### Animations
- Smooth page transitions
- Scroll-triggered animations
- Hover effects with Framer Motion

## 🌐 Internationalization

The site supports two languages:
- English (`/en`)
- Spanish (`/es`)

Language switching is handled by `next-intl` with automatic locale detection.

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd latingeek-portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

### Environment Variables
Create a `.env.local` file:
```env
# For production contact form
# RESEND_API_KEY=your_resend_api_key
# EMAIL_FROM=your_email
# EMAIL_TO=recipient_email
```

## 📦 Deployment

The project is optimized for deployment on Vercel:

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Vercel Deployment
1. Push to GitHub
2. Import project in Vercel
3. Configure build settings (Next.js)
4. Deploy!

## 📝 Content Management

### Updating Bio
Edit `content/bio.json` with your information.

### Adding Projects
Add new projects to `content/projects.json` following the existing structure.

### Updating Translations
Edit the JSON files in `messages/` directory.

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Check TypeScript
npx tsc --noEmit
```

## 📊 Performance

- Lighthouse scores: 95+ Performance, 100 Accessibility
- Core Web Vitals: All green
- Bundle size: Optimized with code splitting
- Images: Optimized with Next.js Image component

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for utility-first styling
- Framer Motion for animations
- Lucide for beautiful icons

---

Built with ❤️ by German Lamela (Latingeek)