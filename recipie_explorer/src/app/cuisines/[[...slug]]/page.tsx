"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  cuisineList,
  getCuisine,
  getChildren,
  getAncestors,
  getFeaturedRecipes,
  CuisineEntry,
} from "../../data/cuisines";
import { Recipe } from "../../data/recipes";
import { notFound } from "next/navigation";

// ── Root Continental listing (no slug) ─────────────────────────────────────────
function CuisinesRoot() {
  const roots = cuisineList.filter(c => !c.parentPath);
  return (
    <div className="cuisine-page">
      {/* Top bar */}
      <div className="cuisine-top-bar">
        <nav className="breadcrumb">
          <Link href="/" className="bc-home">Home</Link>
          <span className="bc-sep">/</span>
          <span className="bc-current">Cuisines</span>
        </nav>
        <div className="path-badge">
          <span className="badge-dot" />
          <code>/cuisines</code>
        </div>
      </div>

      {/* Hero */}
      <div className="cuisine-hero-card">
        <div className="cuisine-hero-bg">
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80"
            alt="World Culinary Traditions"
            fill
            priority
            style={{ objectFit: "cover" }}
            sizes="1100px"
            className="hero-backdrop-img"
          />
          <div className="cuisine-hero-backdrop-gradient" />
        </div>

        <div className="hero-content">
          <div className="domain-badge-row">
            <span className="domain-badge">GLOBAL GASTRONOMY</span>
            <span className="formula-count">{cuisineList.length} Catalogued Regional Domains</span>
          </div>
          <h1>World Culinary Traditions</h1>
          <p className="cuisine-desc">
            Explore authentic flavor architectures, foundational pantry ratios, and regional cooking techniques across world continents and specialized culinary heritage.
          </p>
        </div>
      </div>

      {/* Continental Traditions */}
      <div className="sub-traditions-section">
        <div className="sub-traditions-header">
          <div>
            <h2>Continental Classifications</h2>
            <p className="sub-header-desc">Foundational culinary roots organized by continental origin.</p>
          </div>
          <span className="active-count">{roots.length} Continental Domains</span>
        </div>

        <div className="tradition-grid">
          {roots.map(c => (
            <Link key={c.fullPath} href={`/cuisines/${c.fullPath}`} className="tradition-card-link">
              <div className="tradition-card">
                <div className="tradition-card-media">
                  <Image
                    src={c.image}
                    alt={c.label}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="tradition-card-img"
                  />
                  <div className="tradition-card-overlay" />
                  <span className="recipe-count-badge">
                    <span className="count-dot" /> {c.recipeCount} RECIPES
                  </span>
                  <span className="tradition-arrow">↗</span>
                </div>
                <div className="tradition-card-content">
                  <div className="tradition-domain-tag">{c.tag}</div>
                  <h3>{c.label}</h3>
                  <p>{c.description}</p>
                  <div className="tradition-card-foot">
                    {c.focus ? <span className="tradition-focus">{c.focus}</span> : <span className="tradition-focus">Foundational Domain</span>}
                    <span className="explore-link">Explore Domain →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Featured Recipe Card Component ────────────────────────────────────────────
function FeaturedRecipeCard({ recipe, label }: { recipe: Recipe; label: string }) {
  return (
    <Link href={`/recipes/${recipe.slug}`} className="feat-card-link">
      <div className="feat-card">
        <div className="feat-card-img">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 360px"
            className="feat-img"
          />
          <div className="feat-card-img-overlay" />
          <span className="feat-card-tag">{label}</span>
          <span className="feat-card-difficulty">{recipe.difficulty}</span>
        </div>
        <div className="feat-card-body">
          <div className="feat-card-meta">
            <span className="feat-cuisine-badge">{recipe.cuisine.toUpperCase()} TRADITION</span>
            <span className="meta-divider">•</span>
            <span className="feat-time">⏱ {recipe.time} MIN</span>
          </div>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <div className="feat-card-foot">
            <div className="feat-card-stats">
              <span>👥 {recipe.servings} Servings</span>
              <span>{recipe.ingredients.length} Ingredients</span>
            </div>
            <span className="feat-view">View Formula →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Nested Cuisine Detail Page ────────────────────────────────────────────────
function CuisineDetail({ entry, slugPath }: { entry: CuisineEntry; slugPath: string }) {
  const children = getChildren(entry.fullPath);
  const ancestors = getAncestors(entry.fullPath);
  const featured = getFeaturedRecipes(entry);

  const featLabels = ["Signature Formula", "Essential Technique", "Pantry Classic", "Lab Highlight"];

  const breadcrumbParts = [
    { label: "Cuisines", href: "/cuisines" },
    ...ancestors.map(a => ({ label: a.label, href: `/cuisines/${a.fullPath}` })),
    { label: entry.label, href: null },
  ];

  const parentEntry = entry.parentPath ? getCuisine(entry.parentPath) : null;

  return (
    <div className="cuisine-page">
      {/* Top bar with breadcrumb and routing pill */}
      <div className="cuisine-top-bar">
        <nav className="breadcrumb">
          {breadcrumbParts.map((part, i) => (
            <span key={i} className="bc-item">
              {i > 0 && <span className="bc-sep">/</span>}
              {part.href ? (
                <Link href={part.href} className="bc-link">{part.label}</Link>
              ) : (
                <span className="bc-current">{part.label}</span>
              )}
            </span>
          ))}
        </nav>
        <div className="path-badge">
          <span className="badge-dot" />
          <code>/cuisines/{slugPath}</code>
        </div>
      </div>

      {/* Hero with rich culinary backdrop */}
      <div className="cuisine-hero-card">
        <div className="cuisine-hero-bg">
          <Image
            src={entry.image}
            alt={entry.label}
            fill
            priority
            style={{ objectFit: "cover" }}
            sizes="1100px"
            className="hero-backdrop-img"
          />
          <div className="cuisine-hero-backdrop-gradient" />
        </div>

        <div className="hero-content">
          <div className="domain-badge-row">
            <span className="domain-badge">{entry.tag}</span>
            <span className="formula-count">
              <span className="count-num">{entry.recipeCount}</span> Catalogued Formulas
            </span>
          </div>

          <div className="cuisine-title-row">
            <h1>{entry.label}</h1>
            <div className="parent-nav-btns">
              {parentEntry && (
                <Link href={`/cuisines/${parentEntry.fullPath}`} className="parent-btn">
                  <span className="btn-icon">↑</span>
                  <span>Parent: {parentEntry.label}</span>
                </Link>
              )}
              <Link href="/cuisines" className="root-btn">
                <span>Root: All Cuisines</span>
              </Link>
            </div>
          </div>

          <p className="cuisine-desc">{entry.description}</p>
        </div>
      </div>

      {/* Sub-regional traditions grid */}
      {children.length > 0 && (
        <div className="sub-traditions-section">
          <div className="sub-traditions-header">
            <div>
              <h2>Sub-Regional Traditions</h2>
              <p className="sub-header-desc">Specialized regional practices and distinct culinary philosophies.</p>
            </div>
            <span className="active-count">{children.length} Active Classifications</span>
          </div>

          <div className="tradition-grid">
            {children.map(child => (
              <Link key={child.fullPath} href={`/cuisines/${child.fullPath}`} className="tradition-card-link">
                <div className="tradition-card">
                  <div className="tradition-card-media">
                    <Image
                      src={child.image}
                      alt={child.label}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="tradition-card-img"
                    />
                    <div className="tradition-card-overlay" />
                    <span className="recipe-count-badge">
                      <span className="count-dot" /> {child.recipeCount} RECIPES
                    </span>
                    <span className="tradition-arrow">↗</span>
                  </div>

                  <div className="tradition-card-content">
                    <div className="tradition-domain-tag">{child.tag}</div>
                    <h3>{child.label}</h3>
                    <p>{child.description}</p>

                    <div className="tradition-card-foot">
                      {child.focus && (
                        <span className="tradition-focus" title={child.focus}>
                          {child.focus}
                        </span>
                      )}
                      <span className="explore-link">Explore →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Featured recipes section */}
      {featured.length > 0 && (
        <div className="featured-section">
          <div className="featured-section-header">
            <div>
              <h2>Featured {entry.label} Formulas</h2>
              <p>Calibrated kitchen entries tested for domestic stoves and consistent flavor balance.</p>
            </div>
            <div className="featured-filter-pill">
              <span>Sorted by: <strong>Foundational Technique</strong></span>
            </div>
          </div>
          <div className="featured-grid">
            {featured.slice(0, 3).map((r, i) => (
              <FeaturedRecipeCard key={r.slug} recipe={r} label={featLabels[i] ?? "Feature"} />
            ))}
          </div>
        </div>
      )}

      {/* Pantry Standard / Culinary Reference */}
      {entry.pantryStandard && (
        <div className="pantry-box">
          <div className="pantry-decor-icon">✦</div>
          <div className="pantry-box-inner">
            <div className="pantry-text-col">
              <span className="pantry-label">{entry.pantryStandard.label}</span>
              <h3>{entry.pantryStandard.title}</h3>
              <p>{entry.pantryStandard.description}</p>
            </div>
            <button className="pantry-btn">
              <span>Read Pantry Guide</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Inner (useParams) ─────────────────────────────────────────────────────────
function CuisinesPageInner() {
  const params = useParams();
  const slugArr = params.slug as string[] | undefined;

  if (!slugArr || slugArr.length === 0) return <CuisinesRoot />;

  const slugPath = slugArr.join("/");
  const entry = getCuisine(slugPath);
  if (!entry) return notFound();

  return <CuisineDetail entry={entry} slugPath={slugPath} />;
}

// ── Export ────────────────────────────────────────────────────────────────────
export default function CuisinesPage() {
  return (
    <Suspense fallback={<div className="cuisine-page-loading">Calibrating culinary domains…</div>}>
      <CuisinesPageInner />
    </Suspense>
  );
}
