"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Recipe } from "../data/recipes";

// Helper to split step into Title and Instruction
function parseStep(step: string, index: number) {
  if (step.includes(":")) {
    const parts = step.split(":");
    return {
      title: parts[0].trim(),
      instruction: parts.slice(1).join(":").trim(),
    };
  }

  const dotIdx = step.indexOf(". ");
  if (dotIdx > 0 && dotIdx < 40) {
    return {
      title: step.slice(0, dotIdx).trim(),
      instruction: step.slice(dotIdx + 2).trim(),
    };
  }

  const defaultTitles = [
    "Prep & Mis-en-place",
    "Heat & Aromatics",
    "Incorporate & Simmer",
    "Combine & Glaze",
    "Finish & Plate",
    "Rest & Garnish",
    "Bake & Golden Crust",
  ];

  return {
    title: defaultTitles[index] || `Phase ${index + 1}`,
    instruction: step,
  };
}

// Helper to bold quantity/measurement part of ingredient
function renderIngredientText(ing: string) {
  // Matches quantities like: 200g, 1 tbsp, 1 small, 2 cups, 100g, 4 tbsp, 1 can, 2 sprigs, 1 lemon, 30g, etc.
  const regex = /^(\d+[\/\d\.]*\s*(?:g|kg|ml|tbsp|tsp|cups?|cans?|pinch|small|large|medium|cloves?|sprigs?|bunch|slices?|handful|whole)?)\s*(.*)/i;
  const match = ing.match(regex);
  if (match && match[1] && match[2]) {
    return (
      <>
        <strong>{match[1].trim()}</strong> {match[2].trim()}
      </>
    );
  }
  return ing;
}

export default function RecipeDetailView({ recipe }: { recipe: Recipe }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setChecked(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Entry number formatting (e.g., REC-05 -> Entry #042 or Entry #005)
  const entryNum = recipe.id === "REC-05" || recipe.id === "REC-042" 
    ? "042" 
    : recipe.id.replace("REC-", "").padStart(3, "0");

  return (
    <div className="notebook-detail-page">
      {/* Top Bar with Navigation */}
      <div className="notebook-top-bar">
        <nav className="notebook-breadcrumb">
          <Link href="/recipes" className="nb-crumb-link">Recipes</Link>
          <span className="nb-crumb-sep">/</span>
          <span className="nb-crumb-link">{recipe.cuisine}</span>
          <span className="nb-crumb-sep">/</span>
          <span className="nb-crumb-active">{recipe.title}</span>
        </nav>
        <Link href="/recipes" className="nb-back-link">
          ← Back to recipes
        </Link>
      </div>

      {/* Entry Header: Text info on left, Fig plated prep on right */}
      <div className="notebook-header-grid">
        <div className="notebook-info-col">
          <div className="notebook-entry-row">
            <span className="notebook-entry-tag">Entry #{entryNum}</span>
            <span className="notebook-classification">CULINARY NOTEBOOK</span>
          </div>

          <h1 className="notebook-title">{recipe.title}</h1>
          <p className="notebook-description">{recipe.description}</p>

          <div className="notebook-specs-divider" />

          <div className="notebook-specs-row">
            <span className="spec-item">
              <span className="spec-label">Cuisine:</span> {recipe.cuisine}
            </span>
            <span className="spec-bullet">·</span>
            <span className="spec-item">
              <span className="spec-label">Prep time:</span> {recipe.time} mins
            </span>
            <span className="spec-bullet">·</span>
            <span className="spec-item">
              <span className="spec-label">Difficulty:</span> {recipe.difficulty}
            </span>
            <span className="spec-bullet">·</span>
            <span className="spec-item">
              <span className="spec-label">Servings:</span> {recipe.servings} portions
            </span>
          </div>
        </div>

        {/* Plated Photo Frame */}
        <div className="notebook-photo-col">
          <div className="notebook-photo-frame">
            <div className="notebook-photo-wrap">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                priority
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 420px"
                className="notebook-img"
              />
            </div>
            <div className="notebook-photo-caption">
              <span className="caption-fig">FIG 1.0 — Plated Prep</span>
              <span className="caption-dim">1080×810</span>
            </div>
          </div>
        </div>
      </div>

      <div className="notebook-body-divider" />

      {/* Two Column Layout: Ingredients & Execution */}
      <div className="notebook-body-grid">
        {/* Left Column: Ingredients Card */}
        <div className="notebook-ingredients-card">
          <div className="card-header-row">
            <h2>Ingredients</h2>
            <span className="item-count-pill">{recipe.ingredients.length} Items</span>
          </div>

          <div className="yield-scale-bar">
            <span>Yield: {recipe.yield ?? `${recipe.servings} portions`}</span>
            <span>Scale: 1.0x</span>
          </div>

          <ul className="notebook-checklist">
            {recipe.ingredients.map((ing, i) => {
              const isChecked = !!checked[i];
              return (
                <li
                  key={i}
                  className={`checklist-item ${isChecked ? "checked" : ""}`}
                  onClick={() => toggleCheck(i)}
                >
                  <div className={`custom-checkbox ${isChecked ? "checked" : ""}`}>
                    {isChecked && <span className="check-mark">✓</span>}
                  </div>
                  <span className="ingredient-text">
                    {renderIngredientText(ing)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="ingredients-bottom-divider" />
          <p className="ingredients-tip">
            Tip: Check off items as you mis-en-place.
          </p>
        </div>

        {/* Right Column: Methodology & Execution Card */}
        <div className="notebook-execution-card">
          <div className="card-header-row">
            <h2>Methodology & Execution</h2>
            <span className="item-count-pill">{recipe.steps.length} Sequential Steps</span>
          </div>

          <div className="execution-header-divider" />

          <ol className="notebook-steps-list">
            {recipe.steps.map((rawStep, i) => {
              const parsed = parseStep(rawStep, i);
              return (
                <li key={i} className="notebook-step-item">
                  <div className="step-num-badge">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="step-content">
                    <h3 className="step-title">{parsed.title}</h3>
                    <p className="step-instruction">{parsed.instruction}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="execution-footer-row">
            <div className="verified-note">
              <span className="status-dot">●</span>
              <span>Execution verified in home test kitchen</span>
            </div>
            <button
              type="button"
              className="edit-formulation-btn"
              onClick={() => alert("Formulation calibrated for kitchen execution.")}
            >
              Edit formulation →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
