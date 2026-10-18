import { recipes } from "../../data/recipes";
import { notFound } from "next/navigation";
import RecipeDetailView from "../../components/RecipeDetailView";

export function generateStaticParams() {
  return recipes.map(r => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = recipes.find(r => r.slug === slug);
  return { title: recipe ? `${recipe.title} | Culinary Notebook` : "Recipe Not Found" };
}

export default async function RecipeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = recipes.find(r => r.slug === slug);
  if (!recipe) notFound();

  return <RecipeDetailView recipe={recipe} />;
}
