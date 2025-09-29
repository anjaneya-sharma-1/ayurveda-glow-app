export interface FoodItem {
  id: string;
  name: string;
  category: string;
  emoji: string;
  ayurvedicProperties: {
    taste: string[];
    effect: string;
    potency: string;
  };
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fiber: number;
    keyNutrients: string[];
  };
  healthBenefits: string[];
  description: string;
}

export const foodDatabase: FoodItem[] = [
  {
    id: "1",
    name: "Drumstick Leaves (Moringa)",
    category: "vegetables",
    emoji: "🌿",
    ayurvedicProperties: {
      taste: ["Bitter", "Pungent"],
      effect: "Vata",
      potency: "Heating"
    },
    nutrition: {
      calories: 64,
      protein: 9.4,
      carbs: 8.3,
      fiber: 2.0,
      keyNutrients: ["Iron", "Calcium", "Vitamin C", "Vitamin A"]
    },
    healthBenefits: ["Rich in Iron", "Combats Anemia", "Boosts Immunity", "Anti-inflammatory"],
    description: "Excellent source of iron and vitamins, helps balance Vata dosha"
  },
  {
    id: "2",
    name: "Jaggery (Gur)",
    category: "sweeteners",
    emoji: "🍯",
    ayurvedicProperties: {
      taste: ["Sweet"],
      effect: "Kapha",
      potency: "Heating"
    },
    nutrition: {
      calories: 383,
      protein: 0.4,
      carbs: 98.0,
      fiber: 0,
      keyNutrients: ["Iron", "Potassium", "Magnesium"]
    },
    healthBenefits: ["Natural Iron Source", "Digestive Aid", "Blood Purifier", "Energy Booster"],
    description: "Natural sweetener rich in iron, helps in treating anemia"
  },
  {
    id: "3",
    name: "Dates (Khajur)",
    category: "fruits",
    emoji: "🗓️",
    ayurvedicProperties: {
      taste: ["Sweet"],
      effect: "Vata",
      potency: "Heating"
    },
    nutrition: {
      calories: 277,
      protein: 1.8,
      carbs: 75.0,
      fiber: 6.7,
      keyNutrients: ["Iron", "Potassium", "Fiber", "Antioxidants"]
    },
    healthBenefits: ["High Iron Content", "Natural Energy", "Digestive Health", "Heart Health"],
    description: "Sweet fruit that balances Vata and provides natural iron"
  },
  {
    id: "4",
    name: "Spinach (Palak)",
    category: "vegetables",
    emoji: "🥬",
    ayurvedicProperties: {
      taste: ["Astringent", "Sweet"],
      effect: "Kapha",
      potency: "Cooling"
    },
    nutrition: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fiber: 2.2,
      keyNutrients: ["Iron", "Folate", "Vitamin K", "Vitamin A"]
    },
    healthBenefits: ["Iron Rich", "Blood Formation", "Eye Health", "Bone Strength"],
    description: "Leafy green vegetable excellent for blood formation and iron deficiency"
  },
  {
    id: "5",
    name: "Turmeric (Haldi)",
    category: "spices",
    emoji: "🧡",
    ayurvedicProperties: {
      taste: ["Bitter", "Pungent"],
      effect: "Kapha",
      potency: "Heating"
    },
    nutrition: {
      calories: 312,
      protein: 9.7,
      carbs: 67.1,
      fiber: 22.7,
      keyNutrients: ["Curcumin", "Iron", "Manganese", "Vitamin B6"]
    },
    healthBenefits: ["Anti-inflammatory", "Antioxidant", "Digestive Aid", "Immune Booster"],
    description: "Golden spice with powerful healing properties, reduces inflammation"
  },
  {
    id: "6",
    name: "Ginger (Adrak)",
    category: "spices",
    emoji: "🫚",
    ayurvedicProperties: {
      taste: ["Pungent", "Sweet"],
      effect: "Vata",
      potency: "Heating"
    },
    nutrition: {
      calories: 80,
      protein: 1.8,
      carbs: 18.0,
      fiber: 2.0,
      keyNutrients: ["Gingerol", "Vitamin C", "Magnesium", "Potassium"]
    },
    healthBenefits: ["Digestive Fire", "Nausea Relief", "Anti-inflammatory", "Circulation"],
    description: "Warming spice that ignites digestive fire and balances Vata"
  },
  {
    id: "7",
    name: "Almonds (Badam)",
    category: "nuts",
    emoji: "🌰",
    ayurvedicProperties: {
      taste: ["Sweet"],
      effect: "Vata",
      potency: "Heating"
    },
    nutrition: {
      calories: 579,
      protein: 21.2,
      carbs: 21.6,
      fiber: 12.5,
      keyNutrients: ["Vitamin E", "Magnesium", "Protein", "Healthy Fats"]
    },
    healthBenefits: ["Brain Health", "Heart Health", "Skin Health", "Energy"],
    description: "Nutrient-dense nuts that nourish the brain and balance Vata"
  },
  {
    id: "8",
    name: "Ghee",
    category: "dairy",
    emoji: "🧈",
    ayurvedicProperties: {
      taste: ["Sweet"],
      effect: "Vata",
      potency: "Cooling"
    },
    nutrition: {
      calories: 902,
      protein: 0.3,
      carbs: 0,
      fiber: 0,
      keyNutrients: ["Vitamin A", "Vitamin E", "Healthy Fats", "Butyric Acid"]
    },
    healthBenefits: ["Digestive Health", "Brain Function", "Immunity", "Nutrient Absorption"],
    description: "Clarified butter that enhances digestion and balances all doshas"
  },
  {
    id: "9",
    name: "Cucumber (Kheera)",
    category: "vegetables",
    emoji: "🥒",
    ayurvedicProperties: {
      taste: ["Sweet", "Astringent"],
      effect: "Pitta",
      potency: "Cooling"
    },
    nutrition: {
      calories: 16,
      protein: 0.7,
      carbs: 4.0,
      fiber: 0.5,
      keyNutrients: ["Vitamin K", "Potassium", "Vitamin C", "Water"]
    },
    healthBenefits: ["Hydration", "Cooling", "Skin Health", "Detox"],
    description: "Cooling vegetable that pacifies Pitta and provides hydration"
  },
  {
    id: "10",
    name: "Coconut Water",
    category: "beverages",
    emoji: "🥥",
    ayurvedicProperties: {
      taste: ["Sweet"],
      effect: "Pitta",
      potency: "Cooling"
    },
    nutrition: {
      calories: 19,
      protein: 0.7,
      carbs: 3.7,
      fiber: 1.1,
      keyNutrients: ["Potassium", "Magnesium", "Sodium", "Electrolytes"]
    },
    healthBenefits: ["Natural Electrolytes", "Hydration", "Cooling", "Energy"],
    description: "Natural isotonic drink that cools the body and balances Pitta"
  },
  {
    id: "11",
    name: "Fennel Seeds (Saunf)",
    category: "spices",
    emoji: "🌾",
    ayurvedicProperties: {
      taste: ["Sweet", "Pungent"],
      effect: "Pitta",
      potency: "Cooling"
    },
    nutrition: {
      calories: 345,
      protein: 15.8,
      carbs: 52.3,
      fiber: 39.8,
      keyNutrients: ["Fiber", "Calcium", "Iron", "Anethole"]
    },
    healthBenefits: ["Digestive Aid", "Breath Freshener", "Anti-inflammatory", "Cooling"],
    description: "Sweet and cooling spice that aids digestion and pacifies Pitta"
  },
  {
    id: "12",
    name: "Sweet Potato (Shakarkand)",
    category: "vegetables",
    emoji: "🍠",
    ayurvedicProperties: {
      taste: ["Sweet"],
      effect: "Vata",
      potency: "Heating"
    },
    nutrition: {
      calories: 86,
      protein: 1.6,
      carbs: 20.1,
      fiber: 3.0,
      keyNutrients: ["Vitamin A", "Potassium", "Vitamin C", "Fiber"]
    },
    healthBenefits: ["Grounding", "Energy", "Eye Health", "Immunity"],
    description: "Naturally sweet root vegetable that grounds Vata and provides sustained energy"
  },
  {
    id: "13",
    name: "Rice",
    category: "grains",
    emoji: "🍚",
    ayurvedicProperties: {
      taste: ["Sweet"],
      effect: "Kapha",
      potency: "Cooling"
    },
    nutrition: {
      calories: 130,
      protein: 2.7,
      carbs: 28,
      fiber: 0.4,
      keyNutrients: ["Carbohydrates", "B Vitamins"]
    },
    healthBenefits: ["Energy", "Easy Digestion", "Grounding"],
    description: "Staple grain that provides sustained energy and is easy to digest"
  },
  {
    id: "14",
    name: "Dal (Lentils)",
    category: "legumes",
    emoji: "🫘",
    ayurvedicProperties: {
      taste: ["Sweet", "Astringent"],
      effect: "Vata",
      potency: "Heating"
    },
    nutrition: {
      calories: 116,
      protein: 9,
      carbs: 20,
      fiber: 8,
      keyNutrients: ["Protein", "Iron", "Folate"]
    },
    healthBenefits: ["Protein Source", "Heart Health", "Blood Sugar Control"],
    description: "Protein-rich legumes essential in Ayurvedic nutrition"
  },
  {
    id: "15",
    name: "Chapati",
    category: "grains",
    emoji: "🫓",
    ayurvedicProperties: {
      taste: ["Sweet"],
      effect: "Kapha",
      potency: "Neutral"
    },
    nutrition: {
      calories: 104,
      protein: 3.1,
      carbs: 18,
      fiber: 3.1,
      keyNutrients: ["Fiber", "B Vitamins", "Iron"]
    },
    healthBenefits: ["Sustained Energy", "Digestive Health"],
    description: "Whole wheat flatbread that provides steady energy"
  },
  {
    id: "16",
    name: "Green Tea",
    category: "beverages",
    emoji: "🍵",
    ayurvedicProperties: {
      taste: ["Bitter", "Astringent"],
      effect: "Pitta",
      potency: "Cooling"
    },
    nutrition: {
      calories: 2,
      protein: 0,
      carbs: 0,
      fiber: 0,
      keyNutrients: ["Antioxidants", "Catechins"]
    },
    healthBenefits: ["Antioxidant", "Metabolism Boost", "Mental Clarity"],
    description: "Antioxidant-rich beverage that promotes mental clarity"
  },
  {
    id: "17",
    name: "Warm Water with Lemon",
    category: "beverages",
    emoji: "🍋",
    ayurvedicProperties: {
      taste: ["Sour"],
      effect: "Pitta",
      potency: "Heating"
    },
    nutrition: {
      calories: 7,
      protein: 0.1,
      carbs: 2.3,
      fiber: 0.5,
      keyNutrients: ["Vitamin C", "Citric Acid"]
    },
    healthBenefits: ["Detoxification", "Digestive Fire", "Vitamin C"],
    description: "Morning detox drink that kindles digestive fire"
  },
  {
    id: "18",
    name: "Oatmeal",
    category: "grains",
    emoji: "🥣",
    ayurvedicProperties: {
      taste: ["Sweet"],
      effect: "Kapha",
      potency: "Heating"
    },
    nutrition: {
      calories: 71,
      protein: 2.5,
      carbs: 12,
      fiber: 1.7,
      keyNutrients: ["Beta-glucan", "B Vitamins", "Iron"]
    },
    healthBenefits: ["Heart Health", "Sustained Energy", "Cholesterol Control"],
    description: "Nutritious breakfast grain that provides sustained energy"
  },
  {
    id: "19",
    name: "Herbal Tea",
    category: "beverages",
    emoji: "🌿",
    ayurvedicProperties: {
      taste: ["Bitter", "Pungent"],
      effect: "Vata",
      potency: "Heating"
    },
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fiber: 0,
      keyNutrients: ["Antioxidants", "Essential Oils"]
    },
    healthBenefits: ["Digestive Aid", "Calming", "Immunity"],
    description: "Soothing herbal blend that aids digestion and relaxation"
  },
  {
    id: "20",
    name: "Warm Milk with Turmeric",
    category: "beverages",
    emoji: "🥛",
    ayurvedicProperties: {
      taste: ["Sweet", "Bitter"],
      effect: "Vata",
      potency: "Heating"
    },
    nutrition: {
      calories: 83,
      protein: 3.4,
      carbs: 5,
      fiber: 0,
      keyNutrients: ["Calcium", "Curcumin", "Protein"]
    },
    healthBenefits: ["Anti-inflammatory", "Sleep Aid", "Bone Health"],
    description: "Golden milk that promotes restful sleep and reduces inflammation"
  },
  {
    id: "21",
    name: "Vegetable Soup",
    category: "soups",
    emoji: "🍲",
    ayurvedicProperties: {
      taste: ["Sweet", "Bitter"],
      effect: "Vata",
      potency: "Heating"
    },
    nutrition: {
      calories: 67,
      protein: 2.1,
      carbs: 13,
      fiber: 3.3,
      keyNutrients: ["Vitamins", "Minerals", "Fiber"]
    },
    healthBenefits: ["Hydration", "Easy Digestion", "Nutrient Dense"],
    description: "Nourishing soup that is easy to digest and hydrating"
  },
  {
    id: "22",
    name: "Khichdi",
    category: "grains",
    emoji: "🍛",
    ayurvedicProperties: {
      taste: ["Sweet"],
      effect: "Vata",
      potency: "Heating"
    },
    nutrition: {
      calories: 120,
      protein: 4.5,
      carbs: 22,
      fiber: 2.5,
      keyNutrients: ["Complete Protein", "B Vitamins", "Iron"]
    },
    healthBenefits: ["Complete Nutrition", "Easy Digestion", "Healing"],
    description: "Perfect healing food combining rice and lentils for complete nutrition"
  },
  {
    id: "23",
    name: "Buttermilk",
    category: "dairy",
    emoji: "🥛",
    ayurvedicProperties: {
      taste: ["Sour", "Astringent"],
      effect: "Pitta",
      potency: "Cooling"
    },
    nutrition: {
      calories: 40,
      protein: 3.3,
      carbs: 4.8,
      fiber: 0,
      keyNutrients: ["Probiotics", "Calcium", "B12"]
    },
    healthBenefits: ["Digestive Health", "Cooling", "Probiotic"],
    description: "Cooling fermented drink that aids digestion and provides probiotics"
  },
  {
    id: "24",
    name: "Idli",
    category: "grains",
    emoji: "⚪",
    ayurvedicProperties: {
      taste: ["Sweet"],
      effect: "Kapha",
      potency: "Cooling"
    },
    nutrition: {
      calories: 58,
      protein: 2,
      carbs: 12,
      fiber: 0.8,
      keyNutrients: ["Probiotics", "B Vitamins"]
    },
    healthBenefits: ["Easy Digestion", "Probiotic", "Light"],
    description: "Steamed fermented rice cakes that are light and easy to digest"
  },
  {
    id: "25",
    name: "Quinoa",
    category: "grains",
    emoji: "🌾",
    ayurvedicProperties: {
      taste: ["Sweet", "Bitter"],
      effect: "Vata",
      potency: "Heating"
    },
    nutrition: {
      calories: 120,
      protein: 4.4,
      carbs: 22,
      fiber: 2.8,
      keyNutrients: ["Complete Protein", "Iron", "Magnesium"]
    },
    healthBenefits: ["Complete Protein", "Gluten-Free", "Mineral Rich"],
    description: "Complete protein grain that's gluten-free and nutrient dense"
  }
];