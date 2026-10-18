"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

function NavLinks() {
  const path = usePathname();
  return (
    <div className="nav-links">
      <Link href="/recipes" className={path.startsWith("/recipes") ? "nav-link active" : "nav-link"}>Recipes</Link>
      <Link href="/cuisines" className={path.startsWith("/cuisines") ? "nav-link active" : "nav-link"}>Cuisines</Link>
      <Link href="#" className="nav-link">About</Link>
    </div>
  );
}

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link href="/" className="nav-brand">
          <span className="nav-brand-box">ER</span>
          Everyday Recipes
        </Link>
        <Suspense fallback={
          <div className="nav-links">
            <Link href="/recipes" className="nav-link">Recipes</Link>
            <Link href="/cuisines" className="nav-link">Cuisines</Link>
            <Link href="#" className="nav-link">About</Link>
          </div>
        }>
          <NavLinks />
        </Suspense>
        <Link href="#" className="btn-new">+ New Recipe</Link>
      </div>
    </nav>
  );
}
