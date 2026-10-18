"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link href="/" className="nav-brand"><span className="dot">●</span> Everyday Recipes</Link>
        <div className="nav-links">
          <Link href="/recipes" className={path.startsWith("/recipes") ? "nav-link active" : "nav-link"}>Recipes</Link>
          <Link href="#" className="nav-link">Cuisines</Link>
          <Link href="#" className="nav-link">About</Link>
        </div>
        <Link href="#" className="btn-new">+ New Recipe</Link>
      </div>
    </nav>
  );
}
