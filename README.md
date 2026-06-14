# Guardiant Website

Marketing site for [Guardiant](https://github.com/paarthbhatt/Guardiant) — the first security scanner built for AI-generated code.

## What This Is

This is the public-facing website for Guardiant. It documents the detection frameworks (VCVF, CVC, TIEF), showcases the 8-agent architecture, and serves as the primary entry point for users discovering the project.

Live: [guardiant.dev](https://guardiant.dev)

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — agent prompt library, comparison table, 5-phase engine, architecture overview |
| `/product` | Deep dive into features, agents, and detection capabilities |
| `/research` | Full documentation of VCVF, CVC, and TIEF frameworks with code examples |
| `/use-cases` | Real-world scan results from actual codebases (Netflix-DrDO, Agentyc) |

## Architecture

```
app/
├── layout.tsx              # Root layout, metadata, font imports
├── page.tsx                # Landing page — parallax hero, stagger animations, 3D terminal
├── globals.css             # Design tokens, terminal styles, neon glow, reduced-motion
├── product/page.tsx        # Product features page
├── research/page.tsx       # Framework documentation (VCVF/CVC/TIEF)
└── use-cases/page.tsx      # Real scan examples

components/
├── Navigation.tsx          # Fixed nav — Product, Research, Use Cases, GitHub
├── Footer.tsx              # Footer — social links, resources, legal
└── Hero.tsx                # 3D hero element
```

## Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | Static export, App Router, no server runtime |
| React 18 | Component runtime |
| Tailwind CSS | Utility-first styling, design tokens via CSS custom properties |
| Framer Motion | Scroll-triggered animations, stagger effects, page transitions |
| Three.js + React Three Fiber | 3D hero elements |
| Lucide React | Icon set |
| TypeScript | Type safety |

## Design System

The site uses a custom dark-mode design system built on CSS custom properties:

```css
--bg-deep: #030712        /* Deepest background */
--bg-primary: #0a0f1c     /* Main content area */
--bg-secondary: #111827   /* Card backgrounds */
--bg-card: #1a2235        /* Elevated surfaces */
--border-dim: rgba(59, 130, 246, 0.12)    /* Default borders */
--border-glow: rgba(59, 130, 246, 0.4)    /* Hover/active borders */
--cyan: #22d3ee            /* Primary accent */
--blue: #3b82f6            /* Secondary accent */
--green: #22c55e           /* Success/positive states */
```

**Fonts:** Inter (body), Space Grotesk (headings), JetBrains Mono (code/terminal)

**Components:** `.card`, `.card-glow`, `.terminal`, `.badge`, `.btn-primary`, `.btn-secondary` — all defined in `globals.css` with consistent hover states and transitions.

## Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build

# Start production server
npm start
```

## Design Principles

- **Dark Mode OLED** — pure black backgrounds, no gray fallbacks
- **Subtle Glow** — neon text effects and border glows at low opacity, never overwhelming
- **Scroll-Triggered Animations** — elements animate in as they enter viewport via Framer Motion
- **3D Perspective** — terminal and hero elements use CSS `perspective` and `transform3d`
- **Reduced Motion** — all animations respect `prefers-reduced-motion: reduce`
- **Accessibility** — focus-visible outlines, semantic HTML, ARIA labels

## License

MIT
