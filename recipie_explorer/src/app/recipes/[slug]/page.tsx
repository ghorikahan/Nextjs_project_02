import { recipes } from "../../data/recipes";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return recipes.map(r => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = recipes.find(r => r.slug === slug);
  return { title: recipe ? `${recipe.title} | Everyday Recipes` : "Recipe Not Found" };
}

export default async function RecipeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = recipes.find(r => r.slug === slug);
  if (!recipe) notFound();

  const diffColor = recipe.difficulty === "Easy" ? "#22c55e" : recipe.difficulty === "Medium" ? "#f59e0b" : "#ef4444";

  return (
    <div className="detail-page">
      <div className="breadcrumb">
        <Link href="/">Home</Link> / <Link href="/recipes">Recipes</Link> / <span>{recipe.title}</span>
      </div>

      <div className="detail-hero">
        <div className="detail-img-wrap">
          <Image src={recipe.image} alt={recipe.title} fill style={{ objectFit: "cover" }} sizes="560px" />
          <div className="detail-img-overlay" />
        </div>
        <div className="detail-info">
          <div className="card-tags" style={{ marginBottom: 12 }}>
            {recipe.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
          <h1>{recipe.title}</h1>
          <p className="detail-desc">{recipe.description}</p>
          <div className="detail-meta">
            <div className="meta-item"><span className="meta-label">Prep Time</span><span className="meta-val">⏱ {recipe.time} mins</span></div>
            <div className="meta-item"><span className="meta-label">Servings</span><span className="meta-val">🍽 {recipe.servings}</span></div>
            <div className="meta-item"><span className="meta-label">Difficulty</span><span className="meta-val" style={{ color: diffColor }}>● {recipe.difficulty}</span></div>
            <div className="meta-item"><span className="meta-label">Cuisine</span><span className="meta-val">🌍 {recipe.cuisine}</span></div>
          </div>
          <span className="card-id" style={{ marginTop: 16, display: "block" }}>{recipe.id}</span>
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
          </ul>
        </div>
        <div className="detail-section">
          <h2>Instructions</h2>
          <ol className="steps-list">
            {recipe.steps.map((step, i) => (
              <li key={i}>
                <span className="step-num">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="back-link-wrap">
        <Link href="/recipes" className="back-link">← Back to all recipes</Link>
      </div>
    </div>
  );
}
