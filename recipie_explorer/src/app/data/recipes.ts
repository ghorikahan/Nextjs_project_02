export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  cuisine: string;
  difficulty: "Easy" | "Medium" | "Hard";
  time: number;
  servings: number;
  ingredients: string[];
  steps: string[];
  tags: string[];
}

export const recipes: Recipe[] = [
  {
    id: "REC-01",
    slug: "vegetable-noodles",
    title: "Vegetable Noodles",
    description: "Tender stir-fried ribbons with ginger-tamari glaze, scallions, and toasted sesame.",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&q=80",
    cuisine: "Asian",
    difficulty: "Easy",
    time: 20,
    servings: 2,
    tags: ["Asian", "Easy"],
    ingredients: ["200g rice noodles", "2 tbsp tamari", "1 tbsp sesame oil", "1 tsp fresh ginger", "2 scallions", "1 carrot, julienned", "1 cup bok choy", "Sesame seeds"],
    steps: ["Cook noodles per package. Drain.", "Heat wok, add sesame oil and ginger.", "Stir-fry vegetables 3 mins.", "Add noodles and tamari, toss well.", "Garnish with scallions and sesame seeds."]
  },
  {
    id: "REC-02",
    slug: "rustic-tomato-galette",
    title: "Rustic Tomato Galette",
    description: "Flaky spelt dough folded over slow-roasted heirloom tomatoes, thyme, and aged cheese.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80",
    cuisine: "Mediterranean",
    difficulty: "Medium",
    time: 45,
    servings: 4,
    tags: ["Mediterranean", "Medium"],
    ingredients: ["1.5 cups spelt flour", "6 tbsp cold butter", "3 heirloom tomatoes", "100g gruyère", "Fresh thyme", "1 egg yolk", "Dijon mustard"],
    steps: ["Mix flour and butter to crumb texture. Add 3 tbsp ice water. Chill 30 min.", "Roll dough into circle. Brush with mustard.", "Layer tomatoes and cheese, leaving a border.", "Fold edges over. Brush with egg yolk.", "Bake 35 min at 200°C."]
  },
  {
    id: "REC-03",
    slug: "lemon-herb-roast-chicken",
    title: "Lemon Herb Roast Chicken",
    description: "Crisp skin infused with crushed garlic, lemon peel, cracked pepper, and rosemary.",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c5?w=600&q=80",
    cuisine: "European",
    difficulty: "Medium",
    time: 50,
    servings: 4,
    tags: ["European", "Medium"],
    ingredients: ["1 whole chicken (1.5kg)", "1 lemon, zested", "4 garlic cloves", "2 sprigs rosemary", "3 tbsp olive oil", "Salt & pepper"],
    steps: ["Preheat oven to 220°C.", "Mix oil, lemon zest, garlic, rosemary, salt & pepper.", "Rub mixture all over chicken.", "Roast 20 min, then reduce to 180°C for 30 min.", "Rest 10 min before carving."]
  },
  {
    id: "REC-04",
    slug: "miso-glazed-eggplant",
    title: "Miso Glazed Eggplant",
    description: "Cross-hatched eggplant broiled with red miso, mirin, and a drizzle of sesame.",
    image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=600&q=80",
    cuisine: "Japanese",
    difficulty: "Easy",
    time: 25,
    servings: 2,
    tags: ["Japanese", "Easy"],
    ingredients: ["2 eggplants", "3 tbsp red miso", "2 tbsp mirin", "1 tbsp sake", "1 tbsp sugar", "Sesame oil", "Sesame seeds", "Scallions"],
    steps: ["Halve eggplants, score flesh in crosshatch.", "Mix miso, mirin, sake, sugar into paste.", "Brush paste over cut sides.", "Broil 12–15 min until caramelized.", "Drizzle sesame oil, garnish and serve."]
  },
  {
    id: "REC-05",
    slug: "classic-lentil-dahl",
    title: "Classic Lentil Dahl",
    description: "Yellow split lentils simmered with turmeric and finished with a smoky tarka.",
    image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600&q=80",
    cuisine: "Indian",
    difficulty: "Easy",
    time: 35,
    servings: 4,
    tags: ["Indian", "Easy"],
    ingredients: ["1 cup yellow lentils", "1 onion, diced", "2 tomatoes", "1 tsp turmeric", "1 tsp cumin seeds", "4 garlic cloves", "2 tbsp ghee", "Fresh coriander"],
    steps: ["Rinse lentils. Simmer with turmeric & water 20 min.", "In a pan, heat ghee and fry cumin seeds.", "Add garlic, onion, tomatoes. Cook 8 min.", "Pour tarka over lentils. Mix well.", "Garnish with coriander."]
  },
  {
    id: "REC-06",
    slug: "sourdough-focaccia",
    title: "Sourdough Focaccia",
    description: "High-hydration open crumb focaccia steeped in extra virgin olive oil with sea salt.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
    cuisine: "Italian",
    difficulty: "Hard",
    time: 60,
    servings: 8,
    tags: ["Italian", "Hard"],
    ingredients: ["500g bread flour", "100g sourdough starter", "375ml water", "10g salt", "4 tbsp olive oil", "Flaky sea salt", "Fresh rosemary"],
    steps: ["Mix flour, starter, water. Rest 30 min.", "Add salt. Fold every 30 min for 3 hours.", "Pour into oiled pan. Dimple generously.", "Top with rosemary and sea salt.", "Bake at 230°C for 25 min until golden."]
  },
  {
    id: "REC-07",
    slug: "smoky-black-bean-soup",
    title: "Smoky Black Bean Soup",
    description: "Deep chipotle broth with tender simmered black turtle beans, lime, and cumin.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
    cuisine: "Latin American",
    difficulty: "Easy",
    time: 30,
    servings: 4,
    tags: ["Latin American", "Easy"],
    ingredients: ["2 cans black beans", "1 chipotle in adobo", "1 onion", "4 garlic cloves", "1 tsp cumin", "Lime juice", "Sour cream", "Fresh cilantro"],
    steps: ["Sauté onion and garlic until soft.", "Add chipotle, cumin, and beans with liquid.", "Simmer 15 min. Blend half the soup.", "Stir back together. Add lime juice.", "Serve with sour cream and cilantro."]
  },
  {
    id: "REC-08",
    slug: "sesame-tahini-noodles",
    title: "Sesame Tahini Noodles",
    description: "Cold wheat noodles tossed in roasted sesame paste, garlic-chili oil, and crisp cucumber.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80",
    cuisine: "Middle Eastern",
    difficulty: "Easy",
    time: 15,
    servings: 2,
    tags: ["Middle Eastern", "Easy"],
    ingredients: ["200g wheat noodles", "3 tbsp tahini", "2 tbsp soy sauce", "1 tbsp rice vinegar", "1 tsp chili oil", "1 cucumber, julienned", "2 garlic cloves", "Sesame seeds"],
    steps: ["Cook noodles. Rinse with cold water.", "Whisk tahini, soy, vinegar, garlic, chili oil.", "Toss noodles with sauce.", "Top with cucumber and sesame seeds.", "Serve immediately or chill 10 min."]
  }
];
