# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 landing page for JAW (Identity-Powered Infrastructure for Web3). It's a marketing/landing page built with React 19, TypeScript, and Tailwind CSS 4, using the App Router architecture.

## Development Commands

### Running the Development Server
```bash
bun dev
# Server runs on http://localhost:3000
```

### Building for Production
```bash
bun run build
```

### Starting Production Server
```bash
bun start
```

**Note**: This project uses Bun as the package manager (see `bun.lock`).

## Architecture Overview

### Component Structure

The project uses a **section-based architecture** where the landing page is composed of self-contained section components:

```
RootLayout (src/app/layout.tsx)
├── Navbar (fixed header with smooth scroll navigation)
├── Home Page (src/app/page.tsx)
│   ├── Hero (client component with CTA buttons)
│   ├── Vision
│   ├── UnderTheHood
│   ├── CoreComponents
│   ├── TrustedPartnetIntegrations
│   ├── Prototype (client component with form)
│   └── Roadmap (placeholder)
└── Footer
```

### Server vs Client Components

- **Default**: All components are Server Components (Next.js 15 App Router default)
- **Client Components**: Only components needing interactivity use `"use client"`:
  - `Hero` (smooth scroll navigation)
  - `Navbar` (navigation handlers)
  - `Footer` (link handlers)
  - `Prototype` (form interactions)

### Directory Organization

- **`src/app/`**: Next.js App Router (layout, pages, global styles)
- **`src/components/sections/`**: Page section components (Hero, Vision, etc.)
- **`src/components/ui/`**: shadcn/ui primitives (Button, etc.)
- **`src/components/card/`** & **`src/components/coreCard/`**: Reusable card components
- **`src/layout/`**: Layout components (Navbar, Footer)
- **`src/lib/`**: Utility functions
- **`src/utils/`**: Icon components
- **`public/sections/`**: Optimized images (WebP format)

### Path Aliases

TypeScript path aliases are configured in `tsconfig.json`:
```typescript
"@/*" → "./src/*"
```

Import examples:
```typescript
import { Hero } from "@/components/sections/hero"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
```

### Reusable Components

**Card Component** (`@/components/card`):
- Generic card with optional icon, title, upperTitle, description
- Used in partner integrations and feature sections
- Props: `className`, `title`, `upperTitle`, `description`, `icon`, `descriptionClassName`

**CoreCard Component** (`@/components/coreCard`):
- Specialized card for core features with heading + description
- Accepts children for nested layouts
- Props: `className`, `title`, `description`

**Button Component** (`@/components/ui/button`):
- shadcn/ui button with Class Variance Authority (CVA) variants
- Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- Sizes: `default`, `sm`, `lg`, `icon`

### Styling System

**Tailwind CSS 4 with CSS Variables**:
- Global styles in `src/app/globals.css`
- Theme colors defined as CSS variables using OKLch color space
- Light and dark mode support via `@media (prefers-color-scheme: dark)`
- Uses Tailwind's `@theme` directive for customization

**Utility Function**:
```typescript
cn(...inputs) // from @/lib/utils
// Combines clsx + tailwind-merge to safely merge Tailwind classes
// Prevents conflicting class overrides
```

### Adding New Sections

1. Create component folder in `src/components/sections/[section-name]/`
2. Create `index.tsx` with the section component
3. Export from `src/components/sections/index.ts`
4. Import and add to `src/app/page.tsx`
5. Add smooth scroll target ID if needed for navigation

Example:
```typescript
// src/components/sections/newSection/index.tsx
export const NewSection = () => {
  return (
    <section id="new-section" className="container">
      {/* content */}
    </section>
  )
}
```

### Image Optimization

- Store images in `public/sections/`
- Use WebP format for optimal performance
- Import and use Next.js `<Image>` component:
```typescript
import Image from "next/image"
import exampleImage from "@/../../public/sections/example.webp"

<Image src={exampleImage} alt="Description" />
```

### shadcn/ui Configuration

This project uses shadcn/ui components (configured in `components.json`):
- **Style**: "new-york"
- **RSC**: React Server Components enabled
- **Icon Library**: lucide-react
- **Base Color**: neutral
- **CSS Variables**: Enabled

To add new shadcn/ui components:
```bash
bunx shadcn@latest add [component-name]
```

### Code Patterns

**Barrel Exports**: Each section/component folder has an `index.ts` for clean imports

**Type Safety**: Full TypeScript with interfaces for all component props

**Responsive Design**: Mobile-first approach using Tailwind breakpoints:
```typescript
className="flex flex-col md:flex-row" // Mobile: column, Desktop: row
```

**Client-Side Navigation**: Smooth scroll using native browser API:
```typescript
const element = document.getElementById("section-id");
element?.scrollIntoView({ behavior: "smooth" });
```

## Configuration Files

- **`next.config.ts`**: Next.js configuration (currently using defaults)
- **`tsconfig.json`**: TypeScript config with strict mode and path aliases
- **`components.json`**: shadcn/ui configuration
- **`postcss.config.mjs`**: PostCSS with Tailwind CSS 4 plugin
- **`package.json`**: Dependencies and scripts (uses Bun)

## No External Dependencies

This is a static landing page with:
- No database connections
- No external API calls
- No environment variables required
- No state management libraries (no Redux, Zustand, Context API)

## Git Workflow

Current branch structure:
- **Main branch**: `main`
- Always create pull requests targeting `main`