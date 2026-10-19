"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

interface NotFoundProps {
  forcedSlug?: string;
  forcedPattern?: string;
}

function NotFoundContent({ forcedSlug, forcedPattern }: NotFoundProps) {
  const pathname = usePathname() || "";

  // Derive route diagnostics
  let routePattern = forcedPattern || "/recipes/[id]";
  let unmatchedSlug = forcedSlug || "unknown-recipe-slug";
  let sectionName = "Recipes";
  let sectionHref = "/recipes";

  if (!forcedPattern && pathname) {
    if (pathname.startsWith("/recipes/")) {
      const slug = pathname.replace(/^\/recipes\//, "").replace(/\/$/, "");
      routePattern = "/recipes/[id]";
      unmatchedSlug = slug || "unknown-recipe-slug";
      sectionName = "Recipes";
      sectionHref = "/recipes";
    } else if (pathname.startsWith("/cuisines/")) {
      const slug = pathname.replace(/^\/cuisines\//, "").replace(/\/$/, "");
      routePattern = "/cuisines/[...slug]";
      unmatchedSlug = slug || "unknown-cuisine-slug";
      sectionName = "Cuisines";
      sectionHref = "/cuisines";
    } else if (pathname.startsWith("/cuisines")) {
      sectionName = "Cuisines";
      sectionHref = "/cuisines";
      routePattern = "/cuisines";
      unmatchedSlug = "unknown-cuisine";
    } else {
      const segments = pathname.split("/").filter(Boolean);
      unmatchedSlug = segments[segments.length - 1] || "unknown-route";
      routePattern = pathname || "/recipes/[id]";
      sectionName = "Recipes";
      sectionHref = "/recipes";
    }
  }

  return (
    <div className="nf-wrapper">
      {/* Subnav Breadcrumb Strip */}
      <div className="nf-subnav">
        <div className="nf-subnav-inner">
          <nav className="nf-breadcrumb">
            <Link href={sectionHref} className="nf-bc-link">{sectionName}</Link>
            <span className="nf-bc-sep">/</span>
            <Link href={sectionHref} className="nf-bc-link">Index</Link>
            <span className="nf-bc-sep">/</span>
            <span className="nf-bc-active">Not Found</span>
          </nav>
        </div>
      </div>

      {/* Main Container */}
      <div className="nf-canvas">
        <div className="nf-card">
          {/* Status Badge */}
          <div className="nf-badge-wrap">
            <span className="nf-badge">
              <span className="nf-badge-dot" />
              404 · Recipe or Cuisine Not Found
            </span>
          </div>

          {/* Heading */}
          <h1 className="nf-title">Recipe not found</h1>

          {/* Subtitle / Description */}
          <p className="nf-desc">
            The requested recipe path or cuisine category identifier could not be located in the Everyday Recipes index. The slug may have changed or the recipe has not been cataloged yet.
          </p>

          {/* Action Buttons */}
          <div className="nf-actions">
            <Link href="/recipes" className="nf-btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              <span>Return to All Recipes</span>
            </Link>

            <Link href="/cuisines" className="nf-btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="M12 7v5" />
                <path d="M5 12h14" />
                <path d="M5 12v3" />
                <path d="M19 12v3" />
                <rect x="2" y="15" width="6" height="4" rx="1" />
                <rect x="16" y="15" width="6" height="4" rx="1" />
              </svg>
              <span>Browse Cuisines Directory</span>
            </Link>
          </div>

          {/* Divider */}
          <div className="nf-divider" />

          {/* Suggested Alternatives Header */}
          <div className="nf-section-header">
            <span className="nf-section-title">Suggested Alternatives From The Notebook</span>
            <span className="nf-section-meta">Indexed recently</span>
          </div>

          {/* Suggested Cards Grid */}
          <div className="nf-grid">
            {/* Card 1 */}
            <Link href="/recipes/vegetable-noodles" className="nf-card-item">
              <div className="nf-card-top">
                <span className="nf-pill nf-pill-warm">Quick Prep</span>
                <span className="nf-arrow">→</span>
              </div>
              <h3 className="nf-card-title">Vegetable Noodles</h3>
              <p className="nf-card-desc">
                Sesame-scallion reduction with charred...
              </p>
              <div className="nf-card-foot">
                <span>20 mins</span>
                <span>2 servings</span>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/recipes/rustic-tomato-galette" className="nf-card-item">
              <div className="nf-card-top">
                <span className="nf-pill nf-pill-neutral">Baking</span>
                <span className="nf-arrow">→</span>
              </div>
              <h3 className="nf-card-title">Rustic Tomato Galette</h3>
              <p className="nf-card-desc">
                Flaky spelt crust, herbed ricotta, heirloom...
              </p>
              <div className="nf-card-foot">
                <span>55 mins</span>
                <span>4 servings</span>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="/recipes/miso-glazed-eggplant" className="nf-card-item">
              <div className="nf-card-top">
                <span className="nf-pill nf-pill-warm">Japanese</span>
                <span className="nf-arrow">→</span>
              </div>
              <h3 className="nf-card-title">Miso Glazed Eggplant</h3>
              <p className="nf-card-desc">
                Caramelized red miso, mirin, toasted sesame...
              </p>
              <div className="nf-card-foot">
                <span>30 mins</span>
                <span>2 servings</span>
              </div>
            </Link>
          </div>

          {/* Divider */}
          <div className="nf-divider" />

          {/* Diagnostic Router Trace Header */}
          <div className="nf-trace-header">
            <div className="nf-trace-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="m7 8 4 4-4 4" />
                <path d="M13 16h4" />
              </svg>
              <span>Diagnostic Router Trace</span>
            </div>
            <span className="nf-trace-status">HTTP 404 handled gracefully</span>
          </div>

          {/* Trace Terminal Box */}
          <div className="nf-trace-terminal">
            <div className="nf-trace-line">
              <span className="nf-trace-prefix">&gt;</span> Route pattern:{" "}
              <span className="nf-trace-pattern">{routePattern}</span>{" "}
              (unmatched slug:{" "}
              <code className="nf-trace-slug">&apos;{unmatchedSlug}&apos;</code>)
            </div>
            <div className="nf-trace-line">
              <span className="nf-trace-prefix">&gt;</span> Next.js status:{" "}
              <strong className="nf-trace-highlight">notFound()</strong> triggered inside page.tsx
            </div>
            <div className="nf-trace-line nf-trace-dim">
              <span className="nf-trace-prefix">&gt;</span> HTTP 404 handled gracefully
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NotFoundView(props: NotFoundProps) {
  return (
    <Suspense
      fallback={
        <div className="nf-canvas" style={{ padding: "60px 20px", textAlign: "center", color: "#6b7280" }}>
          Loading 404 status...
        </div>
      }
    >
      <NotFoundContent {...props} />
    </Suspense>
  );
}
