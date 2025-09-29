import { FoodItem } from "@/data/foodDatabase";

export interface DietItem {
  id: string;
  foodId: string;
  food: FoodItem;
  quantity: string;
  notes?: string;
  time?: string;
}

export interface MealPlan {
  earlyMorning: DietItem[];
  breakfast: DietItem[];
  midMorning: DietItem[];
  lunch: DietItem[];
  evening: DietItem[];
  dinner: DietItem[];
  bedtime: DietItem[];
}

export interface WeeklyDietPlan {
  [key: string]: MealPlan;
}

// Simplified food items for Priya Sharma's diet plan
const vataPittaFoods = {
  // Early Morning
  warmWater: {
    id: "warm_water",
    name: "Warm Water with Lemon",
    category: "beverages",
    emoji: "🍋",
    ayurvedicProperties: { taste: ["Sour"], effect: "Vata", potency: "Heating" },
    nutrition: { calories: 5, protein: 0, carbs: 1, fiber: 0, keyNutrients: ["Vitamin C"] },
    healthBenefits: ["Detoxifies", "Aids Digestion", "Balances Vata"],
    description: "Start the day with warm water to balance Vata"
  },
  
  // Breakfast
  oatmeal: {
    id: "oatmeal",
    name: "Oatmeal with Dates and Almonds",
    category: "grains",
    emoji: "🥣",
    ayurvedicProperties: { taste: ["Sweet"], effect: "Vata", potency: "Neutral" },
    nutrition: { calories: 350, protein: 12, carbs: 58, fiber: 8, keyNutrients: ["Iron", "Fiber"] },
    healthBenefits: ["Grounding for Vata", "Iron Rich", "Sustained Energy"],
    description: "Warm, nourishing breakfast perfect for Vata-Pitta constitution"
  },
  
  // Mid Morning
  coconutWater: {
    id: "coconut_water",
    name: "Fresh Coconut Water",
    category: "beverages",
    emoji: "🥥",
    ayurvedicProperties: { taste: ["Sweet"], effect: "Pitta", potency: "Cooling" },
    nutrition: { calories: 45, protein: 2, carbs: 9, fiber: 3, keyNutrients: ["Potassium", "Electrolytes"] },
    healthBenefits: ["Cooling for Pitta", "Hydrating", "Natural Electrolytes"],
    description: "Cooling drink to balance Pitta during mid-morning"
  },
  
  // Lunch
  rice: {
    id: "basmati_rice",
    name: "Basmati Rice",
    category: "grains",
    emoji: "🍚",
    ayurvedicProperties: { taste: ["Sweet"], effect: "Vata", potency: "Cooling" },
    nutrition: { calories: 200, protein: 4, carbs: 45, fiber: 1, keyNutrients: ["Carbohydrates"] },
    healthBenefits: ["Easy to Digest", "Grounding", "Energy"],
    description: "Light, easily digestible grain"
  },
  
  dal: {
    id: "moong_dal",
    name: "Yellow Moong Dal",
    category: "legumes",
    emoji: "🫛",
    ayurvedicProperties: { taste: ["Sweet"], effect: "Vata", potency: "Cooling" },
    nutrition: { calories: 150, protein: 12, carbs: 25, fiber: 8, keyNutrients: ["Protein", "Iron"] },
    healthBenefits: ["High Protein", "Easy Digestion", "Balances Vata"],
    description: "Protein-rich dal that's easy on digestion"
  },
  
  vegetables: {
    id: "mixed_vegetables",
    name: "Steamed Seasonal Vegetables",
    category: "vegetables",
    emoji: "🥕",
    ayurvedicProperties: { taste: ["Sweet", "Astringent"], effect: "Vata", potency: "Neutral" },
    nutrition: { calories: 80, protein: 3, carbs: 18, fiber: 5, keyNutrients: ["Vitamins", "Minerals"] },
    healthBenefits: ["Nutrient Dense", "Fiber Rich", "Antioxidants"],
    description: "Mix of seasonal vegetables for balanced nutrition"
  },
  
  // Evening
  herbalTea: {
    id: "ginger_tea",
    name: "Ginger Cardamom Tea",
    category: "beverages",
    emoji: "☕",
    ayurvedicProperties: { taste: ["Pungent", "Sweet"], effect: "Vata", potency: "Heating" },
    nutrition: { calories: 10, protein: 0, carbs: 2, fiber: 0, keyNutrients: ["Antioxidants"] },
    healthBenefits: ["Digestive Aid", "Warming", "Anti-inflammatory"],
    description: "Warming tea to aid digestion and balance Vata"
  },
  
  // Dinner
  khichdi: {
    id: "khichdi",
    name: "Moong Dal Khichdi",
    category: "combination",
    emoji: "🍲",
    ayurvedicProperties: { taste: ["Sweet"], effect: "Vata", potency: "Neutral" },
    nutrition: { calories: 280, protein: 10, carbs: 50, fiber: 6, keyNutrients: ["Complete Protein"] },
    healthBenefits: ["Complete Nutrition", "Easy Digestion", "Comfort Food"],
    description: "Perfect dinner for Vata-Pitta constitution"
  },
  
  // Bedtime
  goldenMilk: {
    id: "golden_milk",
    name: "Turmeric Golden Milk",
    category: "beverages",
    emoji: "🥛",
    ayurvedicProperties: { taste: ["Sweet", "Bitter"], effect: "Vata", potency: "Heating" },
    nutrition: { calories: 120, protein: 6, carbs: 12, fiber: 0, keyNutrients: ["Calcium", "Curcumin"] },
    healthBenefits: ["Anti-inflammatory", "Calming", "Sleep Aid"],
    description: "Soothing bedtime drink with turmeric and warm spices"
  }
};

// Create Priya Sharma's weekly diet plan
export const priyaSharmaDietPlan: WeeklyDietPlan = {
  Monday: {
    earlyMorning: [
      {
        id: "mon_em_1",
        foodId: "warm_water",
        food: vataPittaFoods.warmWater,
        quantity: "1 glass (250ml)",
        notes: "Add 1 tsp lemon juice and a pinch of black salt"
      }
    ],
    breakfast: [
      {
        id: "mon_bf_1",
        foodId: "oatmeal",
        food: vataPittaFoods.oatmeal,
        quantity: "1 bowl",
        notes: "Cook with ghee, add 3-4 chopped dates and 5-6 soaked almonds"
      }
    ],
    midMorning: [
      {
        id: "mon_mm_1",
        foodId: "coconut_water",
        food: vataPittaFoods.coconutWater,
        quantity: "1 glass",
        notes: "Fresh tender coconut water"
      }
    ],
    lunch: [
      {
        id: "mon_l_1",
        foodId: "basmati_rice",
        food: vataPittaFoods.rice,
        quantity: "1 cup",
        notes: "Cook with a little ghee"
      },
      {
        id: "mon_l_2",
        foodId: "moong_dal",
        food: vataPittaFoods.dal,
        quantity: "1/2 cup",
        notes: "Temper with cumin, turmeric, and mild spices"
      },
      {
        id: "mon_l_3",
        foodId: "mixed_vegetables",
        food: vataPittaFoods.vegetables,
        quantity: "1 serving",
        notes: "Bottle gourd, carrot, and green beans - steamed or lightly sautéed"
      }
    ],
    evening: [
      {
        id: "mon_ev_1",
        foodId: "ginger_tea",
        food: vataPittaFoods.herbalTea,
        quantity: "1 cup",
        notes: "Fresh ginger with cardamom and a little jaggery"
      }
    ],
    dinner: [
      {
        id: "mon_d_1",
        foodId: "khichdi",
        food: vataPittaFoods.khichdi,
        quantity: "1 bowl",
        notes: "Made with rice and moong dal, add vegetables and ghee"
      }
    ],
    bedtime: [
      {
        id: "mon_bt_1",
        foodId: "golden_milk",
        food: vataPittaFoods.goldenMilk,
        quantity: "1 glass",
        notes: "Warm milk with turmeric, cardamom, and a pinch of nutmeg"
      }
    ]
  },
  
  Tuesday: {
    earlyMorning: [
      {
        id: "tue_em_1",
        foodId: "warm_water",
        food: vataPittaFoods.warmWater,
        quantity: "1 glass (250ml)",
        notes: "Add 1 tsp lemon juice and a pinch of black salt"
      }
    ],
    breakfast: [
      {
        id: "tue_bf_1",
        foodId: "oatmeal",
        food: { ...vataPittaFoods.oatmeal, name: "Quinoa Porridge with Fruits" },
        quantity: "1 bowl",
        notes: "Cooked quinoa with stewed apples, cinnamon, and chopped walnuts"
      }
    ],
    midMorning: [
      {
        id: "tue_mm_1",
        foodId: "coconut_water",
        food: { ...vataPittaFoods.coconutWater, name: "Mint Cucumber Water" },
        quantity: "1 glass",
        notes: "Infused water with mint and cucumber - cooling for Pitta"
      }
    ],
    lunch: [
      {
        id: "tue_l_1",
        foodId: "basmati_rice",
        food: vataPittaFoods.rice,
        quantity: "1 cup",
        notes: "Cook with a little ghee"
      },
      {
        id: "tue_l_2",
        foodId: "moong_dal",
        food: { ...vataPittaFoods.dal, name: "Toor Dal" },
        quantity: "1/2 cup",
        notes: "Yellow lentil curry with mild spices"
      },
      {
        id: "tue_l_3",
        foodId: "mixed_vegetables",
        food: { ...vataPittaFoods.vegetables, name: "Ridge Gourd and Spinach" },
        quantity: "1 serving",
        notes: "Light sautéed vegetables with minimal oil"
      }
    ],
    evening: [
      {
        id: "tue_ev_1",
        foodId: "ginger_tea",
        food: { ...vataPittaFoods.herbalTea, name: "Fennel Tea" },
        quantity: "1 cup",
        notes: "Fennel seed tea - cooling and digestive"
      }
    ],
    dinner: [
      {
        id: "tue_d_1",
        foodId: "khichdi",
        food: { ...vataPittaFoods.khichdi, name: "Vegetable Soup with Quinoa" },
        quantity: "1 bowl",
        notes: "Light vegetable broth with cooked quinoa"
      }
    ],
    bedtime: [
      {
        id: "tue_bt_1",
        foodId: "golden_milk",
        food: { ...vataPittaFoods.goldenMilk, name: "Almond Milk with Dates" },
        quantity: "1 glass",
        notes: "Warm almond milk with date paste and cardamom"
      }
    ]
  },
  
  // Continue pattern for remaining days
  Wednesday: {
    earlyMorning: [
      {
        id: "wed_em_1",
        foodId: "warm_water",
        food: vataPittaFoods.warmWater,
        quantity: "1 glass (250ml)",
        notes: "Add 1 tsp lemon juice and a pinch of black salt"
      }
    ],
    breakfast: [
      {
        id: "wed_bf_1",
        foodId: "oatmeal",
        food: { ...vataPittaFoods.oatmeal, name: "Poha with Vegetables" },
        quantity: "1 bowl",
        notes: "Flattened rice with curry leaves, peanuts, and vegetables"
      }
    ],
    midMorning: [
      {
        id: "wed_mm_1",
        foodId: "coconut_water",
        food: { ...vataPittaFoods.coconutWater, name: "Rose Water Drink" },
        quantity: "1 glass",
        notes: "Cooling rose water with a little raw sugar"
      }
    ],
    lunch: [
      {
        id: "wed_l_1",
        foodId: "basmati_rice",
        food: vataPittaFoods.rice,
        quantity: "1 cup",
        notes: "Cook with a little ghee"
      },
      {
        id: "wed_l_2",
        foodId: "moong_dal",
        food: { ...vataPittaFoods.dal, name: "Masoor Dal" },
        quantity: "1/2 cup",
        notes: "Red lentil curry - good source of iron"
      },
      {
        id: "wed_l_3",
        foodId: "mixed_vegetables",
        food: { ...vataPittaFoods.vegetables, name: "Drumstick and Okra" },
        quantity: "1 serving",
        notes: "Iron-rich vegetables cooked with minimal spices"
      }
    ],
    evening: [
      {
        id: "wed_ev_1",
        foodId: "ginger_tea",
        food: { ...vataPittaFoods.herbalTea, name: "Coriander Seed Tea" },
        quantity: "1 cup",
        notes: "Cooling and digestive for Pitta balance"
      }
    ],
    dinner: [
      {
        id: "wed_d_1",
        foodId: "khichdi",
        food: { ...vataPittaFoods.khichdi, name: "Millet Khichdi" },
        quantity: "1 bowl",
        notes: "Finger millet with moong dal - high in iron"
      }
    ],
    bedtime: [
      {
        id: "wed_bt_1",
        foodId: "golden_milk",
        food: vataPittaFoods.goldenMilk,
        quantity: "1 glass",
        notes: "Warm milk with turmeric, cardamom, and a pinch of nutmeg"
      }
    ]
  },
  
  Thursday: {
    earlyMorning: [
      {
        id: "thu_em_1",
        foodId: "warm_water",
        food: vataPittaFoods.warmWater,
        quantity: "1 glass (250ml)",
        notes: "Add 1 tsp lemon juice and a pinch of black salt"
      }
    ],
    breakfast: [
      {
        id: "thu_bf_1",
        foodId: "oatmeal",
        food: { ...vataPittaFoods.oatmeal, name: "Upma with Vegetables" },
        quantity: "1 bowl",
        notes: "Semolina upma with carrots, peas, and cashews"
      }
    ],
    midMorning: [
      {
        id: "thu_mm_1",
        foodId: "coconut_water",
        food: { ...vataPittaFoods.coconutWater, name: "Sugarcane Juice" },
        quantity: "1 glass",
        notes: "Fresh sugarcane juice - cooling and energizing"
      }
    ],
    lunch: [
      {
        id: "thu_l_1",
        foodId: "basmati_rice",
        food: { ...vataPittaFoods.rice, name: "Lemon Rice" },
        quantity: "1 cup",
        notes: "Rice with lemon, curry leaves, and peanuts"
      },
      {
        id: "thu_l_2",
        foodId: "moong_dal",
        food: { ...vataPittaFoods.dal, name: "Chana Dal" },
        quantity: "1/2 cup",
        notes: "Split chickpea curry with ginger and turmeric"
      },
      {
        id: "thu_l_3",
        foodId: "mixed_vegetables",
        food: { ...vataPittaFoods.vegetables, name: "Beetroot and Carrot Sabzi" },
        quantity: "1 serving",
        notes: "Iron-rich root vegetables lightly spiced"
      }
    ],
    evening: [
      {
        id: "thu_ev_1",
        foodId: "ginger_tea",
        food: { ...vataPittaFoods.herbalTea, name: "Tulsi Tea" },
        quantity: "1 cup",
        notes: "Holy basil tea with ginger - balancing for both doshas"
      }
    ],
    dinner: [
      {
        id: "thu_d_1",
        foodId: "khichdi",
        food: { ...vataPittaFoods.khichdi, name: "Vegetable Daliya" },
        quantity: "1 bowl",
        notes: "Broken wheat with vegetables and mild spices"
      }
    ],
    bedtime: [
      {
        id: "thu_bt_1",
        foodId: "golden_milk",
        food: { ...vataPittaFoods.goldenMilk, name: "Ashwagandha Milk" },
        quantity: "1 glass",
        notes: "Warm milk with ashwagandha powder - for better iron absorption"
      }
    ]
  },
  
  Friday: {
    earlyMorning: [
      {
        id: "fri_em_1",
        foodId: "warm_water",
        food: vataPittaFoods.warmWater,
        quantity: "1 glass (250ml)",
        notes: "Add 1 tsp lemon juice and a pinch of black salt"
      }
    ],
    breakfast: [
      {
        id: "fri_bf_1",
        foodId: "oatmeal",
        food: { ...vataPittaFoods.oatmeal, name: "Ragi Porridge" },
        quantity: "1 bowl",
        notes: "Finger millet porridge with jaggery and nuts - excellent for iron"
      }
    ],
    midMorning: [
      {
        id: "fri_mm_1",
        foodId: "coconut_water",
        food: { ...vataPittaFoods.coconutWater, name: "Watermelon Juice" },
        quantity: "1 glass",
        notes: "Fresh watermelon juice - cooling and hydrating"
      }
    ],
    lunch: [
      {
        id: "fri_l_1",
        foodId: "basmati_rice",
        food: { ...vataPittaFoods.rice, name: "Jeera Rice" },
        quantity: "1 cup",
        notes: "Cumin flavored rice with ghee"
      },
      {
        id: "fri_l_2",
        foodId: "moong_dal",
        food: { ...vataPittaFoods.dal, name: "Mixed Dal" },
        quantity: "1/2 cup",
        notes: "Combination of moong and masoor dal"
      },
      {
        id: "fri_l_3",
        foodId: "mixed_vegetables",
        food: { ...vataPittaFoods.vegetables, name: "Palak Paneer" },
        quantity: "1 serving",
        notes: "Spinach with cottage cheese - high in iron and protein"
      }
    ],
    evening: [
      {
        id: "fri_ev_1",
        foodId: "ginger_tea",
        food: { ...vataPittaFoods.herbalTea, name: "Chamomile Tea" },
        quantity: "1 cup",
        notes: "Calming herbal tea with honey"
      }
    ],
    dinner: [
      {
        id: "fri_d_1",
        foodId: "khichdi",
        food: { ...vataPittaFoods.khichdi, name: "Quinoa Vegetable Bowl" },
        quantity: "1 bowl",
        notes: "Quinoa with steamed vegetables and light seasoning"
      }
    ],
    bedtime: [
      {
        id: "fri_bt_1",
        foodId: "golden_milk",
        food: vataPittaFoods.goldenMilk,
        quantity: "1 glass",
        notes: "Warm milk with turmeric, cardamom, and a pinch of nutmeg"
      }
    ]
  },
  
  Saturday: {
    earlyMorning: [
      {
        id: "sat_em_1",
        foodId: "warm_water",
        food: vataPittaFoods.warmWater,
        quantity: "1 glass (250ml)",
        notes: "Add 1 tsp lemon juice and a pinch of black salt"
      }
    ],
    breakfast: [
      {
        id: "sat_bf_1",
        foodId: "oatmeal",
        food: { ...vataPittaFoods.oatmeal, name: "Idli with Sambar" },
        quantity: "3 pieces",
        notes: "Steamed rice cakes with lentil curry - easy to digest"
      }
    ],
    midMorning: [
      {
        id: "sat_mm_1",
        foodId: "coconut_water",
        food: { ...vataPittaFoods.coconutWater, name: "Pomegranate Juice" },
        quantity: "1 glass",
        notes: "Fresh pomegranate juice - excellent source of iron"
      }
    ],
    lunch: [
      {
        id: "sat_l_1",
        foodId: "basmati_rice",
        food: { ...vataPittaFoods.rice, name: "Coconut Rice" },
        quantity: "1 cup",
        notes: "Rice cooked with coconut milk - cooling for Pitta"
      },
      {
        id: "sat_l_2",
        foodId: "moong_dal",
        food: { ...vataPittaFoods.dal, name: "Sambar" },
        quantity: "1/2 cup",
        notes: "South Indian lentil curry with vegetables"
      },
      {
        id: "sat_l_3",
        foodId: "mixed_vegetables",
        food: { ...vataPittaFoods.vegetables, name: "Moringa Leaves Curry" },
        quantity: "1 serving",
        notes: "Drumstick leaves - superfood for iron deficiency"
      }
    ],
    evening: [
      {
        id: "sat_ev_1",
        foodId: "ginger_tea",
        food: { ...vataPittaFoods.herbalTea, name: "Cardamom Tea" },
        quantity: "1 cup",
        notes: "Cardamom tea with a little milk and jaggery"
      }
    ],
    dinner: [
      {
        id: "sat_d_1",
        foodId: "khichdi",
        food: { ...vataPittaFoods.khichdi, name: "Barnyard Millet Khichdi" },
        quantity: "1 bowl",
        notes: "Millet khichdi with vegetables - light and nutritious"
      }
    ],
    bedtime: [
      {
        id: "sat_bt_1",
        foodId: "golden_milk",
        food: { ...vataPittaFoods.goldenMilk, name: "Shatavari Milk" },
        quantity: "1 glass",
        notes: "Warm milk with shatavari powder - beneficial for women's health"
      }
    ]
  },
  
  Sunday: {
    earlyMorning: [
      {
        id: "sun_em_1",
        foodId: "warm_water",
        food: vataPittaFoods.warmWater,
        quantity: "1 glass (250ml)",
        notes: "Add 1 tsp lemon juice and a pinch of black salt"
      }
    ],
    breakfast: [
      {
        id: "sun_bf_1",
        foodId: "oatmeal",
        food: { ...vataPittaFoods.oatmeal, name: "Dosa with Coconut Chutney" },
        quantity: "2 pieces",
        notes: "Fermented rice and lentil crepes - probiotic and easily digestible"
      }
    ],
    midMorning: [
      {
        id: "sun_mm_1",
        foodId: "coconut_water",
        food: { ...vataPittaFoods.coconutWater, name: "Fresh Grape Juice" },
        quantity: "1 glass",
        notes: "Sweet grapes juice - cooling and iron-rich"
      }
    ],
    lunch: [
      {
        id: "sun_l_1",
        foodId: "basmati_rice",
        food: { ...vataPittaFoods.rice, name: "Vegetable Pulao" },
        quantity: "1 cup",
        notes: "Basmati rice cooked with mixed vegetables and mild spices"
      },
      {
        id: "sun_l_2",
        foodId: "moong_dal",
        food: { ...vataPittaFoods.dal, name: "Dal Makhani (light version)" },
        quantity: "1/2 cup",
        notes: "Mixed lentils cooked with minimal cream and spices"
      },
      {
        id: "sun_l_3",
        foodId: "mixed_vegetables",
        food: { ...vataPittaFoods.vegetables, name: "Bottle Gourd with Chana Dal" },
        quantity: "1 serving",
        notes: "Cooling vegetable with protein-rich dal"
      }
    ],
    evening: [
      {
        id: "sun_ev_1",
        foodId: "ginger_tea",
        food: { ...vataPittaFoods.herbalTea, name: "Ajwain Tea" },
        quantity: "1 cup",
        notes: "Carom seed tea for digestion"
      }
    ],
    dinner: [
      {
        id: "sun_d_1",
        foodId: "khichdi",
        food: vataPittaFoods.khichdi,
        quantity: "1 bowl",
        notes: "Traditional moong dal khichdi with ghee and mild spices"
      }
    ],
    bedtime: [
      {
        id: "sun_bt_1",
        foodId: "golden_milk",
        food: vataPittaFoods.goldenMilk,
        quantity: "1 glass",
        notes: "Warm milk with turmeric, cardamom, and a pinch of nutmeg"
      }
    ]
  }
};