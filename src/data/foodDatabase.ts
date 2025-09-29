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
  }
];