import Link from "next/link";
import { recipes } from "./data/recipes";
import Image from "next/image";

export default function Home() {
  return (
    <div style={{ padding: "60px 40px", maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: 12 }}>Welcome to Everyday Recipes</h1>
      <p style={{ color: "#666", marginBottom: 32 }}>Browse {recipes.length} culinary formulas from around the world.</p>
      <Link href="/recipes" className="btn-new" style={{ display: "inline-block" }}>Browse All Recipes →</Link>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 20, marginTop: 48 }}>
        {recipes.slice(0, 4).map(r => (
          <Link key={r.id} href={`/recipes/${r.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="recipe-card">
              <div className="card-img-wrap">
                <Image src={r.image} alt={r.title} fill style={{ objectFit: "cover" }} sizes="220px" />
                <span className="card-time">⏱ {r.time} mins</span>
              </div>
              <div className="card-body">
                <div className="card-tags">
                  {r.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <h3 className="card-title">{r.title}</h3>
                <p className="card-desc">{r.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
