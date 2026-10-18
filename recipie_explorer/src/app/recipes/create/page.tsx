"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IngredientRow {
  id: string;
  qty: string;
  name: string;
}

interface StepRow {
  id: string;
  text: string;
}

interface Draft {
  id: string;
  title: string;
  cuisine: string;
  prepTime: string;
  difficulty: string;
  description: string;
  ingredients: IngredientRow[];
  steps: StepRow[];
  savedAt: string;
}

const INITIAL_DRAFTS: Draft[] = [
  {
    id: "draft-1",
    title: "Sesame Ginger Tofu Rice Bowl",
    cuisine: "East Asian",
    prepTime: "25",
    difficulty: "Easy",
    description: "Crispy pan-seared tofu tossed in a savory ginger-tamari glaze, served over jasmine rice with quick-pickled cucumbers.",
    ingredients: [
      { id: "ing-1", qty: "400g", name: "Extra-firm tofu, drained and pressed" },
      { id: "ing-2", qty: "2 tbsp", name: "Toasted sesame oil" },
      { id: "ing-3", qty: "1 tbsp", name: "Fresh grated ginger root" },
    ],
    steps: [
      { id: "step-1", text: "Press and cube tofu into 1-inch squares. Pat thoroughly dry with kitchen towels." },
      { id: "step-2", text: "Pan-fry tofu in sesame oil over medium-high heat until golden on all sides, roughly 8 minutes." },
      { id: "step-3", text: "Whisk ginger, tamari, and maple syrup; pour over crispy tofu to glaze. Serve over warm rice." }
    ],
    savedAt: "2m ago"
  },
  {
    id: "draft-2",
    title: "Charred Poblano & Sweet Corn Enchiladas",
    cuisine: "Mexican",
    prepTime: "35",
    difficulty: "Medium",
    description: "Roasted poblano peppers folded with sweet summer corn and queso Oaxaca, wrapped in corn tortillas with salsa verde.",
    ingredients: [
      { id: "ing-4", qty: "3 large", name: "Poblano peppers, flame charred and peeled" },
      { id: "ing-5", qty: "2 ears", name: "Sweet corn, kernels sliced off the cob" },
      { id: "ing-6", qty: "200g", name: "Queso Oaxaca or Monterey Jack, shredded" }
    ],
    steps: [
      { id: "step-4", text: "Roast poblanos under broiler or over open flame until charred. Steam in bowl 10 min, peel and slice." },
      { id: "step-5", text: "Sauté sweet corn in butter until slightly caramelized. Mix with poblano strips and cheese." },
      { id: "step-6", text: "Roll filling into lightly toasted corn tortillas, submerge in salsa verde, and bake at 200°C for 18 min." }
    ],
    savedAt: "1h ago"
  },
  {
    id: "draft-3",
    title: "Brown Butter Crispy Sage Gnocchi",
    cuisine: "Italian",
    prepTime: "20",
    difficulty: "Easy",
    description: "Tender potato gnocchi seared golden brown and coated in hazelnut-scented brown butter, crispy garden sage, and aged parmesan.",
    ingredients: [
      { id: "ing-7", qty: "500g", name: "Fresh potato gnocchi" },
      { id: "ing-8", qty: "4 tbsp", name: "Unsalted European-style butter" },
      { id: "ing-9", qty: "12 leaves", name: "Fresh whole sage leaves" }
    ],
    steps: [
      { id: "step-7", text: "Cook gnocchi in salted water until they float, then drain immediately." },
      { id: "step-8", text: "Melt butter in wide skillet until foaming and nutty; fry sage leaves until crisp, then set sage aside." },
      { id: "step-9", text: "Add gnocchi to brown butter to form a delicate golden crust; toss with parmesan and top with fried sage." }
    ],
    savedAt: "Yesterday"
  }
];

export default function CreateRecipePage() {
  const router = useRouter();

  // Form state
  const [title, setTitle] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [description, setDescription] = useState("");
  
  // Ingredients list
  const [ingredients, setIngredients] = useState<IngredientRow[]>([
    { id: "1", qty: "400g", name: "Extra-firm tofu, drained and pressed" },
    { id: "2", qty: "2 tbsp", name: "Toasted sesame oil" },
    { id: "3", qty: "1 tbsp", name: "Fresh grated ginger root" },
  ]);

  // Steps list
  const [steps, setSteps] = useState<StepRow[]>([
    { id: "s1", text: "Press and cube tofu into 1-inch squares. Pat thoroughly dry with kitchen towels." },
    { id: "s2", text: "Pan-fry tofu in sesame oil over medium-high heat until golden on all sides, roughly 8 minutes." },
    { id: "s3", text: "Whisk ginger, tamari, and maple syrup; pour over crispy tofu to glaze. Serve over warm rice." }
  ]);

  // UI state
  const [statusMessage, setStatusMessage] = useState("Auto-saved locally 2m ago");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(true);
  const [draftsModalOpen, setDraftsModalOpen] = useState(false);
  const [draftsList, setDraftsList] = useState<Draft[]>(INITIAL_DRAFTS);
  const [activeTab, setActiveTab] = useState<"editor" | "drafts" | "settings">("editor");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [publishedModalOpen, setPublishedModalOpen] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Auto-save simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatusMessage("Auto-saved locally just now");
    }, 1500);
    return () => clearTimeout(timer);
  }, [title, cuisine, prepTime, difficulty, description, ingredients, steps]);

  // Ingredients handlers
  const addIngredientRow = () => {
    const newId = Date.now().toString();
    setIngredients(prev => [...prev, { id: newId, qty: "", name: "" }]);
    setHasUnsavedChanges(true);
  };

  const updateIngredient = (id: string, field: "qty" | "name", value: string) => {
    setIngredients(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    setHasUnsavedChanges(true);
  };

  const removeIngredient = (id: string) => {
    if (ingredients.length <= 1) {
      setIngredients([{ id: Date.now().toString(), qty: "", name: "" }]);
      return;
    }
    setIngredients(prev => prev.filter(item => item.id !== id));
    setHasUnsavedChanges(true);
  };

  // Steps handlers
  const addStepRow = () => {
    const newId = Date.now().toString();
    setSteps(prev => [...prev, { id: newId, text: "" }]);
    setHasUnsavedChanges(true);
  };

  const updateStep = (id: string, text: string) => {
    setSteps(prev => prev.map(s => s.id === id ? { ...s, text } : s));
    setHasUnsavedChanges(true);
  };

  const removeStep = (id: string) => {
    if (steps.length <= 1) {
      setSteps([{ id: Date.now().toString(), text: "" }]);
      return;
    }
    setSteps(prev => prev.filter(s => s.id !== id));
    setHasUnsavedChanges(true);
  };

  // Load Draft
  const loadDraft = (draft: Draft) => {
    setTitle(draft.title);
    setCuisine(draft.cuisine);
    setPrepTime(draft.prepTime);
    setDifficulty(draft.difficulty);
    setDescription(draft.description);
    setIngredients(draft.ingredients);
    setSteps(draft.steps);
    setDraftsModalOpen(false);
    setActiveTab("editor");
    setHasUnsavedChanges(false);
    setStatusMessage(`Loaded "${draft.title}" draft`);
    triggerToast(`Loaded draft: "${draft.title}"`);
  };

  // Save Draft
  const handleSaveDraft = () => {
    const draftName = title.trim() || "Untitled Recipe Draft";
    const newDraft: Draft = {
      id: "draft-" + Date.now(),
      title: draftName,
      cuisine: cuisine || "Unspecified",
      prepTime: prepTime || "20",
      difficulty,
      description,
      ingredients,
      steps,
      savedAt: "Just now"
    };

    setDraftsList(prev => [newDraft, ...prev]);
    setHasUnsavedChanges(false);
    setStatusMessage("Draft saved locally just now");
    triggerToast(`Draft "${draftName}" saved to Studio!`);
  };

  // Publish Recipe
  const handlePublish = () => {
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      alert("Please enter a Recipe Title before publishing.");
      return;
    }

    const cleanCuisine = cuisine || "Pan-Asian";
    const cleanTime = parseInt(prepTime) || 20;
    const cleanIngredients = ingredients
      .filter(i => i.name.trim() || i.qty.trim())
      .map(i => `${i.qty ? i.qty + " " : ""}${i.name}`.trim());

    const cleanSteps = steps
      .filter(s => s.text.trim())
      .map(s => s.text.trim());

    const slug = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newRecipe = {
      id: "USER-" + Date.now().toString().slice(-4),
      slug,
      title: cleanTitle,
      description: description || `Handcrafted ${cleanCuisine} dish ready in ${cleanTime} minutes.`,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
      cuisine: cleanCuisine,
      difficulty,
      time: cleanTime,
      servings: 2,
      yield: "2 servings",
      tags: [cleanCuisine, difficulty, "Handmade"],
      categories: ["quick-meals"],
      ingredients: cleanIngredients.length > 0 ? cleanIngredients : ["Fresh market ingredients"],
      steps: cleanSteps.length > 0 ? cleanSteps : ["Prepare ingredients according to kitchen staples and enjoy."]
    };

    // Store in localStorage
    if (typeof window !== "undefined") {
      try {
        const existing = JSON.parse(localStorage.getItem("custom_recipes") || "[]");
        localStorage.setItem("custom_recipes", JSON.stringify([newRecipe, ...existing]));
      } catch (err) {
        console.error("Failed to store custom recipe", err);
      }
    }

    setPublishedSlug(slug);
    setPublishedModalOpen(true);
    setHasUnsavedChanges(false);
  };

  return (
    <div className="studio-layout">
      {/* ── LEFT SIDEBAR ──────────────────────────────────────────────────────── */}
      <aside className="studio-sidebar">
        {/* Brand Header */}
        <div className="studio-brand">
          <div className="studio-logo-box">ER</div>
          <div className="studio-brand-text">
            <span className="studio-brand-title">Recipe Studio</span>
            <span className="studio-brand-sub">v1.0 Editor Mode</span>
          </div>
        </div>

        <div className="studio-sidebar-divider" />

        {/* Navigation list */}
        <nav className="studio-nav">
          <button 
            className={`studio-nav-item ${activeTab === "editor" ? "active" : ""}`}
            onClick={() => setActiveTab("editor")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
            <span>Editor</span>
          </button>

          <button 
            className={`studio-nav-item ${activeTab === "drafts" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("drafts");
              setDraftsModalOpen(true);
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            <span>Drafts</span>
            <span className="studio-badge-pill">{draftsList.length}</span>
          </button>

          <button 
            className={`studio-nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => {
              triggerToast("Recipe Studio Preferences are configured to standard notebook mode.");
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14"/>
              <line x1="4" y1="10" x2="4" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12" y2="3"/>
              <line x1="20" y1="21" x2="20" y2="16"/>
              <line x1="20" y1="12" x2="20" y2="3"/>
              <line x1="1" y1="14" x2="7" y2="14"/>
              <line x1="9" y1="8" x2="15" y2="8"/>
              <line x1="17" y1="16" x2="23" y2="16"/>
            </svg>
            <span>Settings</span>
          </button>
        </nav>

        <div className="studio-sidebar-divider" />

        <Link href="/recipes" className="studio-back-link">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          <span>Back to Explorer</span>
        </Link>

        {/* Sidebar Footer */}
        <div className="studio-sidebar-footer">
          <div className="studio-sidebar-divider" />
          <a href="#doc" onClick={(e) => { e.preventDefault(); triggerToast("Everyday Recipes Studio Guidelines v1.0"); }} className="studio-doc-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            <span>Documentation</span>
          </a>
          <p className="studio-copyright">© 2025 Everyday Recipes</p>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ─────────────────────────────────────────────────── */}
      <main className="studio-main">
        <div className="studio-content-wrap">
          
          {/* Breadcrumb */}
          <div className="studio-breadcrumb">
            <span className="studio-bc-root">Studio</span>
            <span className="studio-bc-sep">/</span>
            <span className="studio-bc-active">New Recipe Draft</span>
          </div>

          {/* Heading Row */}
          <div className="studio-header">
            <div className="studio-header-title-row">
              <h1 className="studio-title">Create Recipe</h1>
              {hasUnsavedChanges && (
                <span className="studio-unsaved-badge">Unsaved Changes</span>
              )}
            </div>
            <p className="studio-subtitle">
              Enter recipe parameters, ingredients, and sequential preparation instructions for the culinary index.
            </p>
          </div>

          <div className="studio-page-divider" />

          {/* ── CARD 1: RECIPE PARAMETERS ─────────────────────────────────────── */}
          <section className="studio-card">
            <h2 className="studio-card-title">Recipe Parameters</h2>
            <div className="studio-card-divider" />

            <div className="studio-grid-2">
              {/* Recipe Title */}
              <div className="studio-field">
                <label className="studio-label">
                  Recipe Title <span className="req">*</span>
                </label>
                <input
                  type="text"
                  className="studio-input"
                  placeholder="e.g. Sesame Ginger Tofu Rice Bowl"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setHasUnsavedChanges(true);
                  }}
                />
              </div>

              {/* Cuisine */}
              <div className="studio-field">
                <label className="studio-label">
                  Cuisine <span className="req">*</span>
                </label>
                <div className="studio-select-wrap">
                  <select
                    className="studio-select"
                    value={cuisine}
                    onChange={(e) => {
                      setCuisine(e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                  >
                    <option value="">Select regional style</option>
                    <option value="East Asian">East Asian (Japanese, Korean, Chinese)</option>
                    <option value="Pan-Asian">Pan-Asian</option>
                    <option value="Italian">Italian (Tuscan, Neapolitan, Roman)</option>
                    <option value="Mexican">Mexican (Oaxacan, Yucatecan)</option>
                    <option value="Levantine">Levantine & Middle Eastern</option>
                    <option value="South Asian">South Asian & Indian</option>
                    <option value="French">French Classic</option>
                    <option value="American">American Heritage</option>
                    <option value="Mediterranean">Mediterranean Coastal</option>
                  </select>
                  <span className="studio-select-arrow">▾</span>
                </div>
              </div>

              {/* Prep Time */}
              <div className="studio-field">
                <label className="studio-label">
                  Prep Time (minutes) <span className="req">*</span>
                </label>
                <div className="studio-input-suffix-wrap">
                  <input
                    type="number"
                    min="1"
                    className="studio-input"
                    placeholder="e.g. 25"
                    value={prepTime}
                    onChange={(e) => {
                      setPrepTime(e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                  />
                  <span className="studio-input-suffix">min</span>
                </div>
              </div>

              {/* Difficulty Level */}
              <div className="studio-field">
                <label className="studio-label">
                  Difficulty Level <span className="req">*</span>
                </label>
                <div className="studio-select-wrap">
                  <select
                    className="studio-select"
                    value={difficulty}
                    onChange={(e) => {
                      setDifficulty(e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  <span className="studio-select-arrow">▾</span>
                </div>
              </div>
            </div>

            {/* Short Description */}
            <div className="studio-field" style={{ marginTop: "16px" }}>
              <label className="studio-label">Short Description</label>
              <textarea
                className="studio-textarea"
                rows={3}
                placeholder="Brief summary of flavor profile and key technique..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setHasUnsavedChanges(true);
                }}
              />
              <span className="studio-field-hint">
                Recommended 100-140 characters for indexing notebooks.
              </span>
            </div>
          </section>

          {/* ── CARD 2: INGREDIENTS LIST ──────────────────────────────────────── */}
          <section className="studio-card">
            <div className="studio-card-header-flex">
              <div>
                <h2 className="studio-card-title">Ingredients List</h2>
                <p className="studio-card-subtitle">
                  Define quantities, units, and ingredient naming.
                </p>
              </div>
              <span className="studio-item-count">
                {ingredients.filter(i => i.name.trim() || i.qty.trim()).length} Items Added
              </span>
            </div>

            <div className="studio-card-divider" />

            {/* List of Ingredient rows */}
            <div className="studio-ingredient-rows">
              {ingredients.map((item, index) => (
                <div key={item.id} className="studio-ingredient-row">
                  {/* Drag Handle */}
                  <div className="studio-drag-handle" title="Drag to reorder">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="8" cy="6" r="2"/>
                      <circle cx="16" cy="6" r="2"/>
                      <circle cx="8" cy="12" r="2"/>
                      <circle cx="16" cy="12" r="2"/>
                      <circle cx="8" cy="18" r="2"/>
                      <circle cx="16" cy="18" r="2"/>
                    </svg>
                  </div>

                  {/* Quantity Input */}
                  <input
                    type="text"
                    className="studio-input studio-qty-input"
                    placeholder="Quantity & Unit (e.g. 400g)"
                    value={item.qty}
                    onChange={(e) => updateIngredient(item.id, "qty", e.target.value)}
                  />

                  {/* Ingredient Name Input */}
                  <input
                    type="text"
                    className="studio-input studio-name-input"
                    placeholder="Ingredient name and prep details (e.g. Extra-firm tofu, drained and pressed)"
                    value={item.name}
                    onChange={(e) => updateIngredient(item.id, "name", e.target.value)}
                  />

                  {/* Delete Button */}
                  <button
                    type="button"
                    className="studio-row-delete"
                    onClick={() => removeIngredient(item.id)}
                    title="Remove ingredient"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Add Row Button */}
            <button
              type="button"
              className="studio-add-row-btn"
              onClick={addIngredientRow}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              <span>Add Row</span>
            </button>
          </section>

          {/* ── CARD 3: SEQUENTIAL PREPARATION INSTRUCTIONS ──────────────────── */}
          <section className="studio-card">
            <div className="studio-card-header-flex">
              <div>
                <h2 className="studio-card-title">Preparation Instructions</h2>
                <p className="studio-card-subtitle">
                  Sequential culinary steps from mis en place to table plating.
                </p>
              </div>
              <span className="studio-item-count">{steps.length} Steps</span>
            </div>

            <div className="studio-card-divider" />

            <div className="studio-step-rows">
              {steps.map((step, idx) => (
                <div key={step.id} className="studio-step-row">
                  <div className="studio-step-badge">Step {idx + 1}</div>
                  <textarea
                    className="studio-textarea studio-step-textarea"
                    rows={2}
                    placeholder={`Describe technique, flame level, and timing for Step ${idx + 1}...`}
                    value={step.text}
                    onChange={(e) => updateStep(step.id, e.target.value)}
                  />
                  <button
                    type="button"
                    className="studio-row-delete"
                    onClick={() => removeStep(step.id)}
                    title="Remove step"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="studio-add-row-btn"
              onClick={addStepRow}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              <span>Add Step</span>
            </button>
          </section>

        </div>
      </main>

      {/* ── BOTTOM STICKY BAR ─────────────────────────────────────────────────── */}
      <footer className="studio-bottom-bar">
        <div className="studio-auto-save-status">
          <span className="studio-save-dot" />
          <span>{statusMessage}</span>
        </div>

        <div className="studio-bottom-actions">
          <button
            type="button"
            className="studio-btn-draft"
            onClick={handleSaveDraft}
          >
            Save Draft
          </button>

          <button
            type="button"
            className="studio-btn-publish"
            onClick={handlePublish}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"/>
              <polyline points="5 12 12 5 19 12"/>
            </svg>
            <span>Publish Recipe</span>
          </button>
        </div>
      </footer>

      {/* ── DRAFTS MODAL / DRAWER ────────────────────────────────────────────── */}
      {draftsModalOpen && (
        <div className="studio-modal-overlay" onClick={() => setDraftsModalOpen(false)}>
          <div className="studio-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="studio-modal-header">
              <div>
                <h3 className="studio-modal-title">Saved Recipe Drafts</h3>
                <p className="studio-modal-sub">Select any previously staged recipe formula to load into the Studio.</p>
              </div>
              <button className="studio-modal-close" onClick={() => setDraftsModalOpen(false)}>✕</button>
            </div>

            <div className="studio-drafts-list">
              {draftsList.map((d) => (
                <div key={d.id} className="studio-draft-item">
                  <div className="studio-draft-info">
                    <h4>{d.title}</h4>
                    <div className="studio-draft-meta">
                      <span className="studio-tag-sm">{d.cuisine}</span>
                      <span>⏱ {d.prepTime} min</span>
                      <span>• {d.difficulty}</span>
                      <span className="studio-draft-time">• Saved {d.savedAt}</span>
                    </div>
                    <p className="studio-draft-desc">{d.description}</p>
                  </div>
                  <button 
                    className="studio-btn-load-draft"
                    onClick={() => loadDraft(d)}
                  >
                    Load into Editor →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── PUBLISHED SUCCESS MODAL ──────────────────────────────────────────── */}
      {publishedModalOpen && (
        <div className="studio-modal-overlay">
          <div className="studio-modal-dialog" style={{ maxWidth: "480px", textAlign: "center", padding: "36px 28px" }}>
            <div className="studio-success-icon">✓</div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "16px 0 8px", color: "#1c1917" }}>
              Recipe Successfully Published!
            </h3>
            <p style={{ color: "#78716c", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "24px" }}>
              <strong>&ldquo;{title}&rdquo;</strong> has been recorded to the Everyday Recipes index notebook with all {ingredients.length} ingredients and instructions.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                className="studio-btn-draft"
                onClick={() => {
                  setPublishedModalOpen(false);
                  setTitle("");
                  setDescription("");
                  setCuisine("");
                  setPrepTime("");
                }}
              >
                Create Another
              </button>
              <Link
                href="/recipes"
                className="studio-btn-publish"
                style={{ textDecoration: "none" }}
              >
                Go to Recipe Catalog →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST NOTIFICATION ──────────────────────────────────────────────── */}
      {toastMessage && (
        <div className="studio-toast">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
