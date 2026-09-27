export const PRODUCTS = [
  {
    id: 1,
    name: "Buildiff Gold Standard 100% Whey Isolate",
    category: "whey",
    categoryLabel: "Whey Protein",
    basePrice: 3499,
    originalPrice: 4999,
    discount: "30% OFF",
    rating: 4.9,
    reviews: 1840,
    tag: "100% Pure Isolate",
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80",
    description: "Ultra-pure cross-flow microfiltered whey isolate packed with 27g protein per scoop, 5.8g BCAAs, and zero added sugar for rapid lean muscle synthesis.",
    specs: {
      protein: "27g",
      bcaa: "5.8g",
      sugar: "0g",
      servings: "33 Servings"
    },
    sizes: [
      { label: "1 kg / 1000g", multiplier: 1, price: 3499, originalPrice: 4999 },
      { label: "2 kg / 2000g", multiplier: 1.85, price: 6499, originalPrice: 8999 },
      { label: "4 kg / 4000g", multiplier: 3.5, price: 11999, originalPrice: 15999 }
    ],
    flavors: ["Swiss Chocolate", "Vanilla Cream", "Alphonso Mango", "Cookies & Cream"],
    nutritionFacts: [
      { label: "Calories", value: "116 kcal" },
      { label: "Protein", value: "27g" },
      { label: "Total Carbohydrates", value: "0.8g" },
      { label: "Total Fat", value: "0.4g" },
      { label: "BCAAs", value: "5.8g" },
      { label: "Glutamic Acid", value: "4.5g" }
    ],
    inStock: true
  },
  {
    id: 2,
    name: "Buildiff Creapure® Micronized Creatine Monohydrate",
    category: "creatine",
    categoryLabel: "Creatine",
    basePrice: 999,
    originalPrice: 1499,
    discount: "33% OFF",
    rating: 4.9,
    reviews: 1250,
    tag: "German Creapure",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80",
    description: "100% Authentic German Creapure® micronized creatine. Increases ATP re-synthesis, explosive muscle strength, and intracellular cell volumization.",
    specs: {
      protein: "0g",
      bcaa: "0g",
      sugar: "0g",
      servings: "83 Servings"
    },
    sizes: [
      { label: "250g", multiplier: 1, price: 999, originalPrice: 1499 },
      { label: "500g", multiplier: 1.8, price: 1799, originalPrice: 2699 }
    ],
    flavors: ["Unflavored", "Fruit Punch", "Green Apple Burst"],
    nutritionFacts: [
      { label: "Serving Size", value: "3g (1 scoop)" },
      { label: "Pure Creapure Creatine", value: "3000 mg" },
      { label: "Fillers / Additives", value: "0%" },
      { label: "Solubility", value: "100% Instantized" }
    ],
    inStock: true
  },
  {
    id: 3,
    name: "Buildiff Inferno Extreme Pre-Workout Matrix",
    category: "preworkout",
    categoryLabel: "Pre-Workout",
    basePrice: 1799,
    originalPrice: 2499,
    discount: "28% OFF",
    rating: 4.8,
    reviews: 890,
    tag: "High Energy & Pump",
    image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=800&q=80",
    description: "Explosive pre-workout formula engineered with 300mg Anhydrous Caffeine, 3.2g Beta-Alanine for laser focus, intense vascularity and zero crash.",
    specs: {
      protein: "0g",
      bcaa: "1g",
      sugar: "0g",
      servings: "30 Servings"
    },
    sizes: [
      { label: "300g (30 Servings)", multiplier: 1, price: 1799, originalPrice: 2499 },
      { label: "600g (60 Servings)", multiplier: 1.8, price: 3199, originalPrice: 4499 }
    ],
    flavors: ["Electric Blue Raspberry", "Sour Watermelon", "Citrus Punch"],
    nutritionFacts: [
      { label: "Caffeine Anhydrous", value: "300 mg" },
      { label: "L-Citrulline Malate (2:1)", value: "6000 mg" },
      { label: "Beta-Alanine", value: "3200 mg" },
      { label: "L-Tyrosine", value: "1000 mg" },
      { label: "Electrolyte Blend", value: "500 mg" }
    ],
    inStock: true
  },
  {
    id: 4,
    name: "Buildiff Anabolic Mass Gainer XXL (1250 High Calories)",
    category: "gainer",
    categoryLabel: "Mass Gainer",
    basePrice: 3299,
    originalPrice: 4599,
    discount: "28% OFF",
    rating: 4.8,
    reviews: 670,
    tag: "Extreme Bulk Formula",
    image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=800&q=80",
    description: "Heavy-duty hyper-caloric formula providing 1250 Calories, 50g Premium Protein Blend, and 250g Complex Carbs to pack on dense muscle mass fast.",
    specs: {
      protein: "50g",
      bcaa: "10.5g",
      sugar: "4g",
      servings: "16 Big Servings"
    },
    sizes: [
      { label: "3 kg / 3000g", multiplier: 1, price: 3299, originalPrice: 4599 },
      { label: "5 kg / 5000g", multiplier: 1.6, price: 5299, originalPrice: 7299 }
    ],
    flavors: ["Triple Chocolate Fudge", "Cookies & Cream", "Banana Shake"],
    nutritionFacts: [
      { label: "Calories per Serving", value: "1250 kcal" },
      { label: "Protein Matrix", value: "50g" },
      { label: "Complex Carbohydrates", value: "252g" },
      { label: "MCT Oils & Healthy Fats", value: "4.5g" },
      { label: "Digestive Enzymes (DigeZyme)", value: "150 mg" }
    ],
    inStock: true
  },
  {
    id: 5,
    name: "Buildiff Essential BCAA 2:1:1 + Hydration Electrolytes",
    category: "recovery",
    categoryLabel: "Recovery & Aminos",
    basePrice: 1299,
    originalPrice: 1899,
    discount: "31% OFF",
    rating: 4.7,
    reviews: 540,
    tag: "Intra-Workout Hydration",
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=800&q=80",
    description: "Fermented vegan BCAAs in optimal 2:1:1 ratio infused with Himalayan pink salt & Coconut water powder to eliminate cramping & muscle soreness.",
    specs: {
      protein: "7g Aminos",
      bcaa: "7.0g",
      sugar: "0g",
      servings: "30 Servings"
    },
    sizes: [
      { label: "300g (30 Servings)", multiplier: 1, price: 1299, originalPrice: 1899 },
      { label: "600g (60 Servings)", multiplier: 1.8, price: 2299, originalPrice: 3299 }
    ],
    flavors: ["Tangy Orange Splash", "Watermelon Breeze", "Lemon Ice Tea"],
    nutritionFacts: [
      { label: "L-Leucine", value: "3500 mg" },
      { label: "L-Isoleucine", value: "1750 mg" },
      { label: "L-Valine", value: "1750 mg" },
      { label: "Coconut Water Powder", value: "500 mg" },
      { label: "Sodium & Potassium", value: "320 mg" }
    ],
    inStock: true
  },
  {
    id: 6,
    name: "Buildiff Hydro-Whey Platinum Peptide Isolate",
    category: "whey",
    categoryLabel: "Whey Protein",
    basePrice: 4299,
    originalPrice: 5999,
    discount: "28% OFF",
    rating: 5.0,
    reviews: 430,
    tag: "Ultra-Fast Absorption",
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
    description: "Pre-digested hydrolyzed whey peptides. Absorbs directly into bloodstream within 15 minutes post-workout for immediate anabolic recovery.",
    specs: {
      protein: "30g",
      bcaa: "6.6g",
      sugar: "0g",
      servings: "30 Servings"
    },
    sizes: [
      { label: "1 kg / 1000g", multiplier: 1, price: 4299, originalPrice: 5999 },
      { label: "2 kg / 2000g", multiplier: 1.85, price: 7899, originalPrice: 10999 }
    ],
    flavors: ["Rich Belgian Cocoa", "Unflavored Hydro"],
    nutritionFacts: [
      { label: "Hydrolyzed Whey Peptides", value: "30g" },
      { label: "Lactose Content", value: "0.0%" },
      { label: "Fat", value: "0.2g" },
      { label: "Digestion Speed", value: "< 15 Mins" }
    ],
    inStock: true
  },
  {
    id: 7,
    name: "Buildiff Pure L-Glutamine Recovery Powder",
    category: "recovery",
    categoryLabel: "Recovery & Aminos",
    basePrice: 899,
    originalPrice: 1299,
    discount: "30% OFF",
    rating: 4.8,
    reviews: 310,
    tag: "Gut & Muscle Repair",
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80",
    description: "Pharmaceutical-grade unflavored L-Glutamine powder. Restores depleted muscle glycogen, prevents muscle breakdown, and strengthens immunity.",
    specs: {
      protein: "5g Glutamine",
      bcaa: "0g",
      sugar: "0g",
      servings: "50 Servings"
    },
    sizes: [
      { label: "250g (50 Servings)", multiplier: 1, price: 899, originalPrice: 1299 },
      { label: "500g (100 Servings)", multiplier: 1.75, price: 1549, originalPrice: 2299 }
    ],
    flavors: ["Unflavored Pure"],
    nutritionFacts: [
      { label: "L-Glutamine", value: "5000 mg" },
      { label: "Purity Grade", value: "99.9%" },
      { label: "Sugar / Carbs", value: "0g" }
    ],
    inStock: true
  },
  {
    id: 8,
    name: "Buildiff Vita-Test High-Potency Vitamin & Mineral Stack",
    category: "vitamins",
    categoryLabel: "Vitamins & Health",
    basePrice: 799,
    originalPrice: 1199,
    discount: "33% OFF",
    rating: 4.9,
    reviews: 780,
    tag: "Daily Vitality Boost",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
    description: "Complete athletic multivitamin fortified with 25 essential micronutrients, Ashwagandha KSM-66, Tribulus, and Zinc for peak energy & hormonal support.",
    specs: {
      protein: "0g",
      bcaa: "0g",
      sugar: "0g",
      servings: "60 Tablets"
    },
    sizes: [
      { label: "60 Tablets (1 Month)", multiplier: 1, price: 799, originalPrice: 1199 },
      { label: "120 Tablets (2 Months)", multiplier: 1.75, price: 1399, originalPrice: 2199 }
    ],
    flavors: ["Coated Tablets"],
    nutritionFacts: [
      { label: "Ashwagandha KSM-66", value: "300 mg" },
      { label: "Vitamin D3 (2000 IU)", value: "50 mcg" },
      { label: "Zinc Picolinate", value: "15 mg" },
      { label: "Magnesium Glycinate", value: "200 mg" }
    ],
    inStock: true
  }
];

export const CATEGORIES = [
  { id: "all", label: "All Nutrition" },
  { id: "whey", label: "Whey Protein" },
  { id: "creatine", label: "Creatine" },
  { id: "preworkout", label: "Pre-Workout" },
  { id: "gainer", label: "Mass Gainer" },
  { id: "recovery", label: "BCAA & Recovery" },
  { id: "vitamins", label: "Vitamins & Stack" }
];
