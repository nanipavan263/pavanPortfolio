# Pavan Kalyan — Award-Winning Dark-Luxury Portfolio

An elite, handcrafted, production-ready portfolio built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lenis Smooth Scroll**.

## 🌟 Features

- **Content-Driven Architecture**: Every section renders dynamically from JSON files inside `src/content/`. Edit data without touching React code!
- **Dark-Luxury Aesthetics**: Dark color palette (`#07070b`), Aurora animated background blobs, glassmorphic cards (`.glass`, `.glass-strong`), and Space Grotesk display typography.
- **Micro-Animations & Motion**: 60 FPS scroll-triggered reveals, dual-layer magnetic cursor, interactive timeline, animated counter stats, and filterable skill grid.
- **Interactive Features**: Command palette modal (`Cmd + K`), video project lightbox, mobile glass navigation dock, and validated contact form with Zod & React Hook Form.
- **Production SEO & Performance**: OpenGraph tags, JSON-LD Person schema, dynamic `sitemap.ts`, `robots.ts`, and web app manifest.

## 📁 Content Management (JSON Files)

To edit any text or add items, simply modify the corresponding file in `src/content/`:

- `portfolio.json` - Hero headline, bio, contact details, socials.
- `experience.json` - Work experience roles at The Vivid View, BIG TV, and Grid Agency.
- `skills.json` - Technical tools, proficiency levels, and categories.
- `services.json` - Offerings (Video Editing, Motion Graphics, Color Grading, AI Workflows).
- `projects.json` - Work showcase, video thumbnails, client tags.
- `stats.json` - Counter metrics (Clients served, Creatives delivered).
- `education.json` - Academic diplomas and degrees.
- `testimonials.json` - Client quotes and director reviews.
- `navigation.json` - Anchor header links.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 24+

### Installation

```bash
# Install dependencies
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build

```bash
npm run build
npm run start
```
