"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { recipes } from "../data/recipes";

export default function RecipesPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");

  const filtered = recipes
    .filter(r =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => sort === "time" ? a.time - b.time : 0);

  return (
    <div className="recipes-page">
      <div className="breadcrumb">
        <Link href="/">Home</Link> / <span>Recipes</span>
      </div>

      <div className="page-header">
        <div>
          <h1>All recipes</h1>
          <p>Browse everyday culinary formulas and kitchen staples by cuisine and prep time.</p>
        </div>
        <span className="entry-count">📒 Showing <strong>{filtered.length}</strong> notebook entries</span>
      </div>

      <div className="search-bar">
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search recipes or ingredients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="sort-wrap">
          <label>Sort by:</label>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="recent">Most recent</option>
            <option value="time">Prep time</option>
          </select>
        </div>
      </div>

      <div className="recipe-grid">
        {filtered.map(r => (
          <Link key={r.id} href={`/recipes/${r.slug}`} className="recipe-card-link">
            <div className="recipe-card">
              <div className="card-img-wrap">
                <Image src={r.image} alt={r.title} fill style={{ objectFit: "cover" }} sizes="260px" />
                <span className="card-time">⏱ {r.time} mins</span>
              </div>
              <div className="card-body">
                <div className="card-tags">
                  {r.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <h3 className="card-title">{r.title}</h3>
                <p className="card-desc">{r.description}</p>
                <div className="card-footer">
                  <span className="card-id">{r.id}</span>
                  <span className="view-link">View recipe →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="pagination">
        <span>Page 1 of 1 — {filtered.length} formulas total</span>
        <div className="page-btns">
          <button disabled>Previous</button>
          <button className="active">1</button>
          <button disabled>Next</button>
        </div>
      </div>
    </div>
  );
}
