import { recipes, Recipe } from "./recipes";

export interface CuisineEntry {
  fullPath: string;        // e.g. "asian/east-asian" — used as lookup key
  label: string;           // display name
  description: string;
  image: string;           // rich food imagery
  parentPath?: string;     // parent's fullPath
  recipeCount: number;
  focus?: string;          // e.g. "Primary base: Kombu"
  tag: string;             // e.g. "REGIONAL DOMAIN"
  featuredSlugs?: string[];
  pantryStandard?: { label: string; title: string; description: string };
}

export const cuisineList: CuisineEntry[] = [
  // ── Root Continental ───────────────────────────────────────────────────────
  {
    fullPath: "asian",
    label: "Asian Cuisines",
    tag: "CONTINENTAL DOMAIN",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&q=80",
    description: "A sweeping collection of cooking traditions spanning East, South, and Southeast Asia — united by fermentation, umami depth, and precision heat.",
    recipeCount: 48,
    pantryStandard: {
      label: "PANTRY STANDARD",
      title: "Universal Asian Pantry Index",
      description: "All Asian recipes adhere to verified soy, fish sauce, and miso ratios — tested across regional kitchens for balanced depth and umami clarity.",
    },
    featuredSlugs: ["brown-butter-garlic-noodles", "vegetable-noodles", "sesame-tahini-noodles"],
  },
  {
    fullPath: "european",
    label: "European Cuisines",
    tag: "CONTINENTAL DOMAIN",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    description: "Classic and modern European cooking traditions — from French bistro technique to Italian larder-driven simplicity and Nordic minimalism.",
    recipeCount: 36,
    pantryStandard: {
      label: "PANTRY STANDARD",
      title: "European Larder Principles",
      description: "Rooted in slow fond development, cold-pressed olive oils, cultured dairy, and time-tested preservation methods.",
    },
    featuredSlugs: ["ligurian-olive-oil-focaccia", "warm-french-lentil-herb-salad", "french-onion-soup"],
  },
  {
    fullPath: "middle-eastern",
    label: "Middle Eastern Cuisines",
    tag: "CONTINENTAL DOMAIN",
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=800&q=80",
    description: "Aromatic spice blends, legume traditions, and wood-fired cooking techniques spanning the Levant, the Gulf, and North Africa.",
    recipeCount: 22,
    pantryStandard: {
      label: "PANTRY STANDARD",
      title: "Levantine Spice Architecture",
      description: "Balanced interplay of za'atar, sumac acidity, stone-ground tahini fat, and fresh herb finishing.",
    },
    featuredSlugs: ["skillet-shakshuka-feta", "roasted-carrots-lemon-tahini", "sesame-tahini-noodles"],
  },
  {
    fullPath: "latin-american",
    label: "Latin American Cuisines",
    tag: "CONTINENTAL DOMAIN",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
    description: "Bold, vibrant cuisines rooted in indigenous traditions, ancient corn varieties, and a deep love for chili, smoke, and citrus brightness.",
    recipeCount: 18,
    pantryStandard: {
      label: "PANTRY STANDARD",
      title: "Chili & Masa Calibration",
      description: "Distinct dry chili rehydration techniques and stone-ground nixtamalization ratios.",
    },
    featuredSlugs: ["roasted-tomato-bisque", "vegetable-noodles", "white-bean-kale-soup"],
  },
  {
    fullPath: "south-asian",
    label: "South Asian Cuisines",
    tag: "CONTINENTAL DOMAIN",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80",
    description: "Spice-layered traditions from the Indian subcontinent — dals, curries, flatbreads, and fermented preparations with ancient roots.",
    recipeCount: 30,
    pantryStandard: {
      label: "PANTRY STANDARD",
      title: "Tadka & Blooming Standards",
      description: "Whole spice temperings calibrated in hot ghee or mustard oil to extract maximum essential aromatics.",
    },
    featuredSlugs: ["vegetable-noodles", "toasted-farro-wild-mushrooms", "roasted-carrots-lemon-tahini"],
  },

  // ── Asian children ────────────────────────────────────────────────────────
  {
    fullPath: "asian/east-asian",
    parentPath: "asian",
    label: "East Asian Cuisines",
    tag: "REGIONAL DOMAIN",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80",
    description: "Traditional cooking traditions and foundational flavor profiles originating from East Asia, centered on fermented seasonings, umami broths, and quick heat techniques.",
    recipeCount: 55,
    pantryStandard: {
      label: "PANTRY STANDARD",
      title: "Foundational Umami Index",
      description: "All East Asian recipes in Everyday Recipes adhere to pure unadulterated shoyu weights (15ml / 1 tbsp = ~900mg sodium) and natural fermentation without artificial caramel coloring.",
    },
    featuredSlugs: ["brown-butter-garlic-noodles", "miso-glazed-eggplant", "vegetable-noodles"],
  },
  {
    fullPath: "asian/south-asian",
    parentPath: "asian",
    label: "South Asian Traditions",
    tag: "REGIONAL DOMAIN",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
    description: "Spice-forward traditions from India, Sri Lanka, Nepal, and Bangladesh — layered dals, tandoor-fired breads, and slow-simmered curries.",
    recipeCount: 30,
    focus: "Spice architecture",
    featuredSlugs: ["vegetable-noodles", "warm-french-lentil-herb-salad"],
  },
  {
    fullPath: "asian/southeast-asian",
    parentPath: "asian",
    label: "Southeast Asian Cuisines",
    tag: "REGIONAL DOMAIN",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",
    description: "Bright, herbaceous, and intensely fragrant cooking styles from Thailand, Vietnam, Indonesia, and Malaysia.",
    recipeCount: 24,
    focus: "Fresh herb balance",
    featuredSlugs: ["sesame-tahini-noodles", "brown-butter-garlic-noodles"],
  },

  // ── East Asian children ───────────────────────────────────────────────────
  {
    fullPath: "asian/east-asian/japanese",
    parentPath: "asian/east-asian",
    label: "Japanese Cuisine",
    tag: "TRADITION",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
    description: "Dashi bases, mirin, miso, and seasonal preservation techniques.",
    recipeCount: 14,
    focus: "Primary base: Kombu",
    featuredSlugs: ["miso-glazed-eggplant", "silken-tofu-wakame-miso", "vegetable-noodles"],
  },
  {
    fullPath: "asian/east-asian/chinese",
    parentPath: "asian/east-asian",
    label: "Chinese Regional Styles",
    tag: "TRADITION",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=800&q=80",
    description: "Wok aromatics, Sichuan peppercorn, and delicate dim sum techniques.",
    recipeCount: 22,
    focus: "Focus: Wok Hei",
    featuredSlugs: ["brown-butter-garlic-noodles", "vegetable-noodles", "sesame-tahini-noodles"],
  },
  {
    fullPath: "asian/east-asian/korean",
    parentPath: "asian/east-asian",
    label: "Korean Traditions",
    tag: "TRADITION",
    image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800&q=80",
    description: "Gochujang ferments, toasted sesame oil, and balanced banchan side dishes.",
    recipeCount: 11,
    focus: "Focus: Fermentation",
    featuredSlugs: ["skillet-shakshuka-feta", "miso-glazed-eggplant"],
  },
  {
    fullPath: "asian/east-asian/taiwanese",
    parentPath: "asian/east-asian",
    label: "Taiwanese Night Market",
    tag: "TRADITION",
    image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=800&q=80",
    description: "Braised broths, scallion crisps, and fragrant five-spice oil infusions.",
    recipeCount: 8,
    focus: "Base: Five-Spice",
    featuredSlugs: ["sesame-tahini-noodles", "brown-butter-garlic-noodles"],
  },

  // ── European children ─────────────────────────────────────────────────────
  {
    fullPath: "european/french",
    parentPath: "european",
    label: "French Cuisine",
    tag: "REGIONAL DOMAIN",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=80",
    description: "Classical technique, butter-enriched sauces, and the bistro tradition of simple but precise cooking.",
    recipeCount: 14,
    focus: "Technique: Mise en Place",
    featuredSlugs: ["warm-french-lentil-herb-salad", "french-onion-soup", "green-herb-omelette"],
  },
  {
    fullPath: "european/italian",
    parentPath: "european",
    label: "Italian Cuisine",
    tag: "REGIONAL DOMAIN",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80",
    description: "Larder-driven simplicity — great olive oil, aged cheeses, and slow-built pasta traditions.",
    recipeCount: 16,
    focus: "Focus: Terroir",
    featuredSlugs: ["ligurian-olive-oil-focaccia", "sourdough-focaccia", "white-bean-kale-soup"],
  },
  {
    fullPath: "european/nordic",
    parentPath: "european",
    label: "Nordic Cuisine",
    tag: "REGIONAL DOMAIN",
    image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&q=80",
    description: "Preservation, foraged ingredients, and austere winter flavours from Scandinavia.",
    recipeCount: 8,
    focus: "Focus: Preservation",
    featuredSlugs: ["honey-oat-porridge", "toasted-farro-wild-mushrooms"],
  },

  // ── Middle Eastern children ───────────────────────────────────────────────
  {
    fullPath: "middle-eastern/levantine",
    parentPath: "middle-eastern",
    label: "Levantine Cuisines",
    tag: "REGIONAL DOMAIN",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80",
    description: "Mezze culture, olive oil-drenched salads, and wood-fired flatbreads from Lebanon, Syria, and Palestine.",
    recipeCount: 12,
    focus: "Focus: Mezze",
    featuredSlugs: ["roasted-carrots-lemon-tahini", "sesame-tahini-noodles", "skillet-shakshuka-feta"],
  },
  {
    fullPath: "middle-eastern/north-african",
    parentPath: "middle-eastern",
    label: "North African Cuisines",
    tag: "REGIONAL DOMAIN",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&q=80",
    description: "Slow-braised tagines, preserved lemons, harissa heat, and couscous traditions.",
    recipeCount: 10,
    focus: "Focus: Slow-braise",
    featuredSlugs: ["roasted-tomato-bisque", "white-bean-kale-soup"],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────
export function getCuisine(path: string): CuisineEntry | undefined {
  return cuisineList.find(c => c.fullPath === path);
}

export function getChildren(parentPath: string): CuisineEntry[] {
  return cuisineList.filter(c => c.parentPath === parentPath);
}

export function getAncestors(fullPath: string): CuisineEntry[] {
  const ancestors: CuisineEntry[] = [];
  const parts = fullPath.split("/");
  for (let i = 1; i < parts.length; i++) {
    const ancestorPath = parts.slice(0, i).join("/");
    const found = getCuisine(ancestorPath);
    if (found) ancestors.push(found);
  }
  return ancestors;
}

export function getFeaturedRecipes(entry: CuisineEntry): Recipe[] {
  if (entry.featuredSlugs && entry.featuredSlugs.length > 0) {
    const found = entry.featuredSlugs.map(s => recipes.find(r => r.slug === s)).filter(Boolean) as Recipe[];
    if (found.length > 0) return found;
  }
  const children = getChildren(entry.fullPath);
  const childSlugs = children.flatMap(c => c.featuredSlugs || []);
  const fromChildren = childSlugs.map(s => recipes.find(r => r.slug === s)).filter(Boolean) as Recipe[];
  if (fromChildren.length > 0) {
    const unique = Array.from(new Set(fromChildren));
    return unique.slice(0, 3);
  }
  const matching = recipes.filter(r =>
    r.cuisine.toLowerCase().includes(entry.label.toLowerCase().replace(" cuisines", "").replace(" cuisine", "")) ||
    entry.label.toLowerCase().includes(r.cuisine.toLowerCase())
  );
  if (matching.length > 0) return matching.slice(0, 3);
  return recipes.slice(0, 3);
}
