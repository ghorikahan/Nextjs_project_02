# 🍳 Everyday Recipes (Recipe Explorer)

> **A modern, editorial culinary notebook & world gastronomy explorer built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.**

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## 📖 Overview

**Everyday Recipes** is a culinary formulation platform and gastronomic atlas designed for cooking enthusiasts, home chefs, and food researchers. Moving beyond generic recipe blogs, it presents recipes as structured **culinary formulations**—calibrated with precise pantry ratios, interactive *mise-en-place* checklists, sequential preparation methodologies, and an expansive multi-tier world cuisine classification system.

---

## ✨ Key Features

### 🗂️ 1. Recipe Catalog & Taxonomy Index (`/recipes`, `/recipes/[[...slug]]`)
- **Category Segments**: Instant filtering across curated tags: *Quick Meals (<25m)*, *Plant-Based*, *Baking & Grains*, and *Soups & Stews*.
- **Real-Time Search**: High-performance client search across recipe titles, cuisines, and ingredients with instant result counters.
- **Next.js Optional Catch-All Routing**: Unified routing logic supporting `/recipes`, category path segments (e.g. `/recipes/quick-meals`), and fallback resolution with zero layout shifts.

### 📓 2. Editorial Culinary Notebook (`/recipes/[slug]`)
- **Editorial Aesthetic**: Framed "Fig 1.0 Plated Prep" photography alongside catalog classification badges (e.g., `Entry #042`).
- **Interactive Mise-en-place**: Interactive checklist where users can check off ingredients as they prep, with automatic quantity/measurement parsing (bold unit recognition).
- **Phased Execution Steps**: Preparation steps automatically parsed into structured culinary phases (*Prep & Mise-en-place*, *Heat & Aromatics*, *Incorporate & Simmer*, *Combine & Glaze*, *Finish & Plate*).
- **SEO & Static Optimization**: Fully prerendered with `generateStaticParams` and dynamic title/description metadata via `generateMetadata`.

### 🌍 3. World Cuisines & Gastronomic Atlas (`/cuisines`, `/cuisines/[[...slug]]`)
- **Continental Domains**: Explore foundational gastronomic roots spanning Asian, European, Middle Eastern, Latin American, and more.
- **Hierarchical Regional Classification**: Multi-level routing allows deep exploration from continental roots down into micro-regional traditions (e.g., `/cuisines/asian/east-asian`).
- **Pantry Standards & Ratios**: Verified benchmark ratios (e.g., Universal Asian Umami Ratios, Levantine Spice Architectures, European Larder Principles).
- **Dynamic Breadcrumbs**: Interactive hierarchical breadcrumbs with parent-path backtracking.

### ✍️ 4. Recipe Studio — Formulation Workbench (`/recipes/create`, `/create`)
- **Live Formulator**: Create custom dishes with title, regional style, cook times, and difficulty calibrations.
- **Dynamic Ingredient & Step Manager**: Add, reorder, or remove ingredient rows (with unit/quantity separation) and sequential instructions.
- **Auto-Save Engine**: Simulated debounce auto-save with live status indicators.
- **Drafts Drawer**: Staged drafts system loaded with pre-configured culinary formulas (*Sesame Ginger Tofu Rice Bowl*, *Charred Poblano Enchiladas*, *Brown Butter Sage Gnocchi*).
- **Client Persistence**: New formulations are committed to `localStorage` and seamlessly indexed into the active catalog.

### 🔍 5. Resilient 404 & Diagnostic Router Trace (`/not-found`)
- **Smart Route Diagnostics**: Custom `NotFoundView` with live route pattern debugging and unmatched slug extraction.
- **Curated Recommendations**: Displays contextual alternative suggestions from the notebook whenever an invalid route is visited.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16.4.2](https://nextjs.org/) | App Router, Server Components, Static Route Generation |
| **UI Library** | [React 19.3.0](https://react.dev/) | Modern hooks, Suspense boundaries, client interactivity |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict type definitions for recipes, cuisines, and drafts |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + CSS | Editorial culinary typography, responsive grids, sleek micro-interactions |
| **Typography** | [Geist](https://vercel.com/font) via `next/font` | Clean, modern sans-serif optimized for legibility |
| **Image Pipeline** | `next/image` | Responsive image optimization with Unsplash food imagery |

---

## 📂 Project Structure

```text
recipie_explorer/
├── public/                     # Static assets & favicons
├── src/
│   └── app/
│       ├── layout.tsx          # Root layout with Geist font, navigation & footer
│       ├── page.tsx            # Homepage with welcome banner & featured formulas
│       ├── globals.css         # Design tokens, typography & component stylesheets
│       ├── not-found.tsx       # Global 404 handler wrapping NotFoundView
│       ├── components/
│       │   ├── Navbar.tsx      # Sticky top navigation with active route highlighting
│       │   ├── NotFoundView.tsx# Diagnostics-enabled 404 canvas with recommendations
│       │   └── RecipeDetailView.tsx # Culinary notebook detail card with interactive checklist
│       ├── data/
│       │   ├── recipes.ts      # Recipe interface, categories taxonomy & initial dataset
│       │   └── cuisines.ts     # Multi-tier continental & regional cuisine hierarchy
│       ├── recipes/
│       │   ├── page.tsx        # (Optional) Static route points
│       │   ├── [slug]/         # Static recipe view with generateStaticParams & metadata
│       │   │   └── page.tsx
│       │   ├── [[...slug]]/    # Dynamic catch-all catalog & category filtering view
│       │   │   └── page.tsx
│       │   └── create/         # Recipe Studio formulation workbench
│       │       └── page.tsx
│       ├── cuisines/
│       │   └── [[...slug]]/    # Hierarchical multi-level gastronomy explorer
│       │       └── page.tsx
│       └── create/
│           └── page.tsx        # Convenient redirect route to /recipes/create
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 🚦 Available Routes

| Route | Type | Description |
| :--- | :--- | :--- |
| `/` | Server Component | Landing page highlighting top culinary formulas |
| `/recipes` | Client Component | Full recipe index with search & category tabs |
| `/recipes/[category]` | Client Component | Filtered recipe list (e.g., `/recipes/quick-meals`) |
| `/recipes/[slug]` | Hybrid (SSG + Client) | Recipe detail notebook with interactive checklist |
| `/recipes/create` | Client Component | Recipe Studio: formulator, draft loader, and publisher |
| `/create` | Server Redirect | Quick redirect to `/recipes/create` |
| `/cuisines` | Client Component | Continental culinary domains overview |
| `/cuisines/[...slug]` | Client Component | Deep-dive regional cuisine pages with pantry standards |
| `/*` (Unmatched) | Client Component | Custom 404 page with route diagnostics & suggestions |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have installed:
- [Node.js](https://nodejs.org/) (version **18.18.0** or higher recommended)
- `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/Recipie_explorer.git
   cd Recipie_explorer/Nextjs_project_02/recipie_explorer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🛠️ Available Scripts

In the project root, you can run:

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with hot-module replacement |
| `npm run build` | Builds an optimized production bundle with typechecking |
| `npm run start` | Runs the compiled production build locally |
| `npm run lint` | Runs ESLint to check for code quality and style violations |

---

## 🎨 Design System & Philosophy

- **Editorial Culinary Notebook**: Styled to resemble an archival cooking notebook with high-contrast text, warm sepia touches, and clean divider rules.
- **Interactive Utility**: Checklists and step badges allow cooks to use the application actively on a kitchen counter or tablet.
- **Thoughtful Feedback**: Non-destructive interactions—drafts can be saved locally, and actions are confirmed via non-intrusive toast notifications.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-recipe`)
3. Commit your changes (`git commit -m 'feat: Add Szechuan peppercorn ratio'`)
4. Push to the branch (`git push origin feature/amazing-recipe`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
