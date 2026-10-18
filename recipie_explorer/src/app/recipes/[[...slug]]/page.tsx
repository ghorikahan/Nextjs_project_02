"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { recipes, categories, Recipe } from "../../data/recipes";
import { notFound } from "next/navigation";
import RecipeDetailView from "../../components/RecipeDetailView";

// ── helpers ──────────────────────────────────────────────────────────────────
const diffColor = (d: string) =>
  d === "Easy" ? "#22c55e" : d === "Medium" ? "#f59e0b" : d === "Hard" ? "#ef4444" : "#8b5cf6";

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipes/${recipe.slug}`} className="cat-card-link">
      <div className="cat-card">
        <div className="cat-card-img">
          <Image src={recipe.image} alt={recipe.title} fill style={{ objectFit: "cover" }} sizes="280px" />
          <div className="cat-card-overlay" />
          <div className="cat-card-badges">
            <span className="cat-badge cuisine">{recipe.cuisine}</span>
          </div>
          <div className="cat-card-meta-bottom">
            <span className="cat-time">{recipe.time} mins</span>
            <span className="cat-diff" style={{ color: diffColor(recipe.difficulty) }}>• {recipe.difficulty}</span>
          </div>
        </div>
        <div className="cat-card-body">
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <div className="cat-card-foot">
            <span className="yield-label">Yield: {recipe.yield ?? `${recipe.servings} servings`}</span>
            <span className="cat-view-link">View recipe →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Recipe Detail ─────────────────────────────────────────────────────────────
function RecipeDetail({ recipe }: { recipe: Recipe }) {
  return <RecipeDetailView recipe={recipe} />;
}

// ── Catalog Page ──────────────────────────────────────────────────────────────
function CatalogPage({ activeCat }: { activeCat: string | null }) {
  const [search, setSearch] = useState("");

  // Unique recipes per category (no duplicates in "All" tab)
  const uniqueRecipes = [...new Map(recipes.map(r => [r.id, r])).values()];

  const visibleCategories = activeCat
    ? categories.filter(c => c.key === activeCat)
    : categories;

  const recipesForCategory = (catKey: string) =>
    uniqueRecipes.filter(r =>
      r.categories.includes(catKey) &&
      (search === "" ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(search.toLowerCase()))
    );

  const totalCount = uniqueRecipes.filter(r =>
    search === "" ||
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(search.toLowerCase())
  ).length;

  return (
    <div className="catalog-page">
      {/* Header */}
      <div className="breadcrumb">
        <Link href="/">Home</Link> /
        {activeCat ? (
          <><Link href="/recipes"> All Categories</Link> / <span>{categories.find(c => c.key === activeCat)?.label}</span></>
        ) : (
          <span> All Categories</span>
        )}
      </div>

      <div className="catalog-header">
        <div>
          <h1>Recipe Catalog Index</h1>
          <p>Complete taxonomy index of all catalogued everyday dishes. Displaying all recipes when no specific category or path segment is provided.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="cat-tabs">
        <Link href="/recipes" className={`cat-tab ${!activeCat ? "active" : ""}`}>
          All <span className="tab-count">{uniqueRecipes.length}</span>
        </Link>
        {categories.map(c => (
          <Link key={c.key} href={`/recipes/${c.key}`} className={`cat-tab ${activeCat === c.key ? "active" : ""}`}>
            {c.label} <span className="tab-count">{uniqueRecipes.filter(r => r.categories.includes(c.key)).length}</span>
          </Link>
        ))}
      </div>


      {/* Search */}
      <div className="catalog-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search recipes or ingredients..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && <button className="search-clear" onClick={() => setSearch("")}>✕</button>}
        <span className="search-count">{totalCount} results</span>
      </div>

      {/* Category sections */}
      {visibleCategories.map(cat => {
        const catRecipes = recipesForCategory(cat.key);
        if (catRecipes.length === 0) return null;
        return (
          <section key={cat.key} className="cat-section">
            <div className="cat-section-header">
              <div>
                <h2>{cat.label}</h2>
                <span className="cat-entry-count">{catRecipes.length} entries</span>
              </div>
              <Link href={`/recipes/${cat.key}`} className="cat-view-segment">
                View segment [{cat.key}] →
              </Link>
            </div>
            <div className="cat-grid">
              {catRecipes.slice(0, 3).map(r => (
                <RecipeCard key={r.id} recipe={r} />
              ))}
            </div>
            {catRecipes.length > 3 && (
              <div className="cat-show-more">
                <Link href={`/recipes/${cat.key}`}>Show all {catRecipes.length} in {cat.label} →</Link>
              </div>
            )}
          </section>
        );
      })}


    </div>
  );
}

// ── Inner component (uses useParams — must be inside Suspense) ───────────────
function RecipePageInner() {
  const params = useParams();
  const slugArr = params.slug as string[] | undefined;
  const segments = slugArr ?? [];

  // No segments → catalog index
  if (segments.length === 0) return <CatalogPage activeCat={null} />;

  const first = segments[0];

  // Matches a category key → filtered catalog
  if (categories.some(c => c.key === first)) return <CatalogPage activeCat={first} />;

  // Matches a recipe slug → detail view
  const recipe = recipes.find(r => r.slug === first);
  if (recipe) return <RecipeDetail recipe={recipe} />;

  // Nothing matched
  return notFound();
}

// ── Main export (prerender-safe) ──────────────────────────────────────────────
export default function RecipePage() {
  return (
    <Suspense fallback={<div style={{ padding: "60px 28px", color: "#6b6866" }}>Loading recipes…</div>}>
      <RecipePageInner />
    </Suspense>
  );
}
