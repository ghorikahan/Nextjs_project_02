# 🍳 Everyday Recipes — Recipe Explorer

> **A modern, editorial culinary notebook and world gastronomy exploration platform built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.**

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![App Router](https://img.shields.io/badge/Next.js-App_Router-blueviolet?style=for-the-badge)](https://nextjs.org/docs/app)

---

## 📖 Overview

**Everyday Recipes** is a culinary formulation platform and gastronomic atlas created for home chefs, culinary enthusiasts, and food researchers. Instead of standard blog-style recipes, dishes are catalogued as structured **culinary formulations**—complete with verified pantry ratios, interactive *mise-en-place* checklists, sequential preparation methodologies, and an expansive multi-tier world cuisine classification system.

The application serves as a comprehensive showcase of modern **Next.js App Router** patterns, demonstrating advanced dynamic routing, optional catch-all segments, static site generation (SSG), prerendered dynamic metadata, and resilient 404 diagnostics.

---

## 🧭 Complete Routing Architecture & Navigation System

The application leverages the full spectrum of Next.js App Router routing conventions:

### 🗺️ Master Route Directory

| Route URL | App Router Path | Pattern Type | Rendering Strategy | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | Static Root | Server Component | Homepage featuring hero intro and curated dish highlights |
| `/recipes` | `src/app/recipes/[[...slug]]/page.tsx` | Optional Catch-All (`0 segments`) | Client Component (Suspense) | Master recipe catalog index with search and category tabs |
| `/recipes/[category]` | `src/app/recipes/[[...slug]]/page.tsx` | Optional Catch-All (`1 segment = category`) | Client Component (Suspense) | Filtered category view (e.g. `/recipes/quick-meals`, `/recipes/plant-based`) |
| `/recipes/[slug]` | `src/app/recipes/[slug]/page.tsx` | Dynamic Route (`[slug]`) | Static Site Generation (SSG) + Client View | Dedicated recipe detail notebook with prerendered metadata |
| `/recipes/create` | `src/app/recipes/create/page.tsx` | Nested Static Route | Client Component | Recipe Studio: formulation workbench, draft manager, and publisher |
| `/create` | `src/app/create/page.tsx` | Static Route | Server Redirect (`redirect()`) | Seamless programmatic redirect to `/recipes/create` |
| `/cuisines` | `src/app/cuisines/[[...slug]]/page.tsx` | Optional Catch-All (`0 segments`) | Client Component (Suspense) | Continental culinary domains overview (Asian, European, Levantine, etc.) |
| `/cuisines/[...slug]` | `src/app/cuisines/[[...slug]]/page.tsx` | Optional Catch-All (`1..N segments`) | Client Component (Suspense) | Multi-tier nested cuisine explorer (e.g. `/cuisines/asian/east-asian`) |
| `/*` (Unmatched) | `src/app/not-found.tsx` | 404 Not Found Boundary | Client Component (`NotFoundView`) | Custom 404 page featuring live router diagnostic trace & suggestions |

---

### 🔀 Route Mechanics & Next.js Patterns in Detail

#### 1. Optional Catch-All Routing (`[[...slug]]`)
Implemented in both `/recipes/[[...slug]]` and `/cuisines/[[...slug]]`:
- **Syntax**: Double square brackets `[[...slug]]` match zero, one, or multiple path segments.
- **In `/recipes/[[...slug]]`**:
  - `params.slug === undefined` ➔ Renders the master **Catalog Index** with live search and all category cards.
  - `params.slug === ['quick-meals']` ➔ Matches a valid category key and filters the catalog specifically to that category segment.
  - `params.slug === ['garlic-noodles']` ➔ Fallback resolution matching individual recipe slugs.
  - Non-matching slug ➔ Triggers Next.js `notFound()`.
- **In `/cuisines/[[...slug]]`**:
  - `params.slug === undefined` ➔ Renders the **Root Continental Gastronomy Atlas** (all root culinary traditions).
  - `params.slug === ['asian']` ➔ Traverses to the **Asian Continental Domain**, showing sub-traditions, pantry benchmarks, and featured formulas.
  - `params.slug === ['asian', 'east-asian']` ➔ Drills down into the **East Asian Regional Tradition**, calculating hierarchical breadcrumbs and ancestor relationships dynamically.

#### 2. Static Site Generation (SSG) with `generateStaticParams`
In `src/app/recipes/[slug]/page.tsx`:
```typescript
// Pre-renders every catalogued recipe page at build time
export function generateStaticParams() {
  return recipes.map(r => ({ slug: r.slug }));
}
```
- **Performance**: Pre-renders HTML for every recipe at build time, resulting in near-instant load times and zero runtime database overhead.
- **Dynamic SEO Metadata**: Uses `generateMetadata()` to resolve recipe parameters asynchronously and generate custom document titles:
  ```typescript
  export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const recipe = recipes.find(r => r.slug === slug);
    return { title: recipe ? `${recipe.title} | Culinary Notebook` : "Recipe Not Found" };
  }
  ```

#### 3. Programmatic Navigation & Server Redirects
In `src/app/create/page.tsx`:
```typescript
import { redirect } from "next/navigation";

export default function CreateRedirect() {
  redirect("/recipes/create");
}
```
- Visitors navigating to the friendly `/create` URL are automatically redirected by Next.js server-side to the dedicated studio route `/recipes/create`.

#### 4. Resilient Suspense Boundaries & Client Routing Hooks
Client components that read query parameters or URL segments (`useParams()`, `usePathname()`) are wrapped in React `<Suspense>` boundaries to guarantee safe static rendering during build:
```tsx
export default function RecipePage() {
  return (
    <Suspense fallback={<div className="loading-state">Loading recipes…</div>}>
      <RecipePageInner />
    </Suspense>
  );
}
```

#### 5. Custom 404 & Diagnostic Router Trace (`NotFoundView`)
When `notFound()` is invoked or an unmatched path is entered, `NotFoundView` provides active route diagnostics:
- Derives the expected route pattern (`/recipes/[id]`, `/cuisines/[...slug]`).
- Extracts the exact unmatched slug.
- Provides immediate recovery actions (*Return to Recipes*, *Browse Cuisines*).
- Displays contextual alternative recipe cards indexed from the notebook.

---

## 🗺️ Visual Route Flow

```text
                               ┌──────────────────────────┐
                               │        App Layout        │
                               │   (Navbar, Geist, CSS)   │
                               └─────────────┬────────────┘
                                             │
      ┌──────────────────┬───────────────────┼───────────────────┬──────────────────┐
      │                  │                   │                   │                  │
      ▼                  ▼                   ▼                   ▼                  ▼
┌───────────┐   ┌─────────────────┐   ┌───────────────┐   ┌─────────────┐   ┌──────────────┐
│     /     │   │    /recipes     │   │   /cuisines   │   │   /create   │   │  Unmatched   │
│ (Landing) │   │  ([[...slug]])  │   │ ([[...slug]]) │   │  (Redirect) │   │ (not-found)  │
└───────────┘   └────────┬────────┘   └───────┬───────┘   └──────┬──────┘   └──────────────┘
                         │                    │                  │
         ┌───────────────┼──────────────┐     │                  ▼
         ▼               ▼              ▼     │         ┌─────────────────┐
    /recipes     /recipes/[cat]  /recipes/[s] │         │ /recipes/create │
    (Catalog)     (Filtering)      (SSG Fall) │         │ (Recipe Studio) │
                                              │         └─────────────────┘
                             ┌────────────────┴──────────────┐
                             ▼                               ▼
                      /cuisines                    /cuisines/[...slug]
                   (Continental Atlas)             (Regional Hierarchy)
```

---

## ✨ Application Features

### 🗂️ 1. Recipe Catalog Index
- **Category Taxonomy**: Filter dishes by *Quick Meals (<25m)*, *Plant-Based*, *Baking & Grains*, and *Soups & Stews*.
- **Real-Time Client Search**: Instant query matching against recipe titles, regional styles, and ingredient lists.
- **Yield & Time Badges**: Clear visual badges for preparation time, difficulty rating, and portion yield.

### 📓 2. Culinary Notebook (Recipe Detail)
- **Archival Design System**: Editorial card layout styled as a professional kitchen notebook.
- **Fig 1.0 Plated Prep**: High-definition framed food photography with responsive Next.js Image optimization.
- **Interactive Mise-en-place Checklist**: Strikethrough checklist with bold ingredient quantities and units.
- **Sequential Methodology Phases**: Instructions automatically parsed into distinct phases (*Prep & Mise-en-place*, *Heat & Aromatics*, *Incorporate & Simmer*, *Combine & Glaze*, *Finish & Plate*).

### 🌍 3. World Gastronomy Atlas
- **Continental Domains**: Explore Asian, European, Middle Eastern, Latin American, and African culinary traditions.
- **Hierarchical Regional Drilldown**: Navigate from continental roots into specialized regional philosophies.
- **Pantry Standards**: Calibrated ratios and essential flavor bases (e.g. Universal Asian Umami Ratios, Levantine Spice Architecture).
- **Interactive Breadcrumb Backtracking**: Easily ascend back up the regional hierarchy.

### ✍️ 4. Recipe Studio — Formulation Workbench
- **Full-featured Creator**: Formulate new recipes with title, cuisine, prep time, difficulty, and descriptions.
- **Dynamic Rows**: Add, reorder, and remove ingredient rows (with separate quantity and item fields) and step instructions.
- **Drafts Staging Drawer**: Staged drafts preloaded with sample formulas (*Sesame Ginger Tofu Rice Bowl*, *Charred Poblano Enchiladas*, *Brown Butter Sage Gnocchi*).
- **Auto-Save & LocalStorage**: Automatic draft saving simulation and local storage persistence.

---

## 📂 Project Structure

```text
recipie_explorer/
├── public/                     # Static icons and assets
├── src/
│   └── app/
│       ├── layout.tsx          # Root HTML layout with Geist font & global shell
│       ├── page.tsx            # Landing page (Welcome banner & featured recipes)
│       ├── globals.css         # Complete design system & custom CSS utilities
│       ├── not-found.tsx       # Root 404 handler triggering NotFoundView
│       │
│       ├── components/         # Shared presentation components
│       │   ├── Navbar.tsx      # Top bar with active link tracking & "+ New Recipe"
│       │   ├── NotFoundView.tsx# Diagnostics-enabled 404 view with trace log
│       │   └── RecipeDetailView.tsx # Editorial notebook detail view with checklist
│       │
│       ├── data/               # Type models & dataset
│       │   ├── recipes.ts      # Recipe interface, categories & catalog data
│       │   └── cuisines.ts     # Multi-tier continental & regional cuisine hierarchy
│       │
│       ├── recipes/            # Recipe routing domain
│       │   ├── page.tsx        # Fallback catalog entry
│       │   ├── [slug]/         # SSG static detail route (generateStaticParams)
│       │   │   └── page.tsx
│       │   ├── [[...slug]]/    # Optional catch-all catalog & category handler
│       │   │   └── page.tsx
│       │   └── create/         # Recipe Studio formulation workbench
│       │       └── page.tsx
│       │
│       ├── cuisines/           # Cuisine routing domain
│       │   └── [[...slug]]/    # Hierarchical gastronomy explorer
│       │       └── page.tsx
│       │
│       └── create/             # Shortcut route
│           └── page.tsx        # Redirects to /recipes/create
│
├── package.json                # Project dependencies and script definitions
├── tsconfig.json               # TypeScript compiler configuration
└── next.config.ts              # Next.js build and image optimization settings
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Next.js** | `16.4.2` | App Router, Server/Client components, dynamic metadata, SSG |
| **React** | `19.3.0` | Core UI library, Suspense boundaries, hooks (`useState`, `useEffect`) |
| **TypeScript** | `5.x` | Strict type definitions for recipes, taxonomy, and UI props |
| **Tailwind CSS** | `v4` | Contemporary utility styling and theme configuration |
| **Geist Font** | Via `next/font` | Zero-layout-shift typography optimization |
| **Next Image** | Built-in | Responsive modern image formats (AVIF/WebP) and sizing |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `18.18.0` or later
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### 2. Setup Instructions

```bash
# Navigate to the Next.js app directory
cd recipie_explorer

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Runs the development server with Turbopack fast refresh |
| **Build** | `npm run build` | Compiles the production build, runs typechecks, and generates static pages |
| **Production Start**| `npm run start` | Runs the compiled production server locally |
| **Lint** | `npm run lint` | Runs ESLint to check for code formatting and rule compliance |

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
