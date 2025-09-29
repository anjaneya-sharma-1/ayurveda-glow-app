import { foodDatabase } from "@/data/foodDatabase";
import { WeeklyDietPlan, DietItem } from "@/data/priyaSharmaDietPlan";

const GROQ_API_KEY = "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";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export interface PatientProfile {
  name?: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  activityLevel: string;
  dosha: string;
  prakriti?: string;
  bmi?: number;
  doshaBalance?: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  healthConditions?: string[];
  allergies?: string[];
  preferences?: string[];
}

interface Message {
  role: string;
  content: string;
}

interface AIFoodItem {
  foodName: string;
  quantity?: string;
  benefits?: string;
  notes?: string;
  [key: string]: unknown;
}

export class GroqAIService {
  private async callGroqAPI(messages: Message[]) {
    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: messages,
          temperature: 0.7,
          max_tokens: 1500,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Groq API error details:", errorText);
        throw new Error(`Groq API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "";
    } catch (error) {
      console.error("Groq API call failed:", error);
      throw error;
    }
  }

  private createDietPrompt(patient: PatientProfile): string {
    // Get exact food names from our database
    const availableFoods = foodDatabase.map((food) => food.name).join(", ");

    return `Create a 7-day Ayurvedic diet plan for ${patient.name} (${patient.age}yo ${patient.gender}, Prakriti: ${patient.prakriti}, Dosha: V${patient.doshaBalance.vata}% P${patient.doshaBalance.pitta}% K${patient.doshaBalance.kapha}%, BMI: ${patient.bmi}).

IMPORTANT: Use ONLY these exact food names from our database:
${availableFoods}

Create a varied 7-day plan using different combinations of these foods. Respond with ONLY a valid JSON object, no other text.

{
  "Monday": {
    "earlyMorning": [{"foodName": "Warm Water with Lemon", "quantity": "1 glass", "notes": "cleansing"}],
    "breakfast": [{"foodName": "Oatmeal", "quantity": "1 bowl", "notes": "with ghee"}],
    "midMorning": [{"foodName": "Green Tea", "quantity": "1 cup", "notes": "antioxidants"}],
    "lunch": [{"foodName": "Rice", "quantity": "1 cup", "notes": "with dal"}, {"foodName": "Dal (Lentils)", "quantity": "1 bowl", "notes": "protein"}],
    "evening": [{"foodName": "Herbal Tea", "quantity": "1 cup", "notes": "digestion"}],
    "dinner": [{"foodName": "Vegetable Soup", "quantity": "1 bowl", "notes": "light"}],
    "bedtime": [{"foodName": "Warm Milk with Turmeric", "quantity": "1 glass", "notes": "golden milk"}]
  },
  "Tuesday": {
    "earlyMorning": [{"foodName": "Coconut Water", "quantity": "1 glass", "notes": "electrolytes"}],
    "breakfast": [{"foodName": "Idli", "quantity": "3 pieces", "notes": "steamed"}],
    "midMorning": [{"foodName": "Buttermilk", "quantity": "1 glass", "notes": "cooling"}],
    "lunch": [{"foodName": "Khichdi", "quantity": "1 bowl", "notes": "complete nutrition"}],
    "evening": [{"foodName": "Ginger (Adrak)", "quantity": "1 tsp", "notes": "with warm water"}],
    "dinner": [{"foodName": "Chapati", "quantity": "2 pieces", "notes": "with vegetables"}],
    "bedtime": [{"foodName": "Almonds (Badam)", "quantity": "5 pieces", "notes": "soaked"}]
  },
  "Wednesday": {
    "earlyMorning": [{"foodName": "Fennel Seeds (Saunf)", "quantity": "1 tsp", "notes": "soaked water"}],
    "breakfast": [{"foodName": "Quinoa", "quantity": "1 cup", "notes": "protein bowl"}],
    "midMorning": [{"foodName": "Dates (Khajur)", "quantity": "2 pieces", "notes": "energy"}],
    "lunch": [{"foodName": "Rice", "quantity": "1 cup", "notes": "with spinach"}, {"foodName": "Spinach (Palak)", "quantity": "1 cup", "notes": "iron rich"}],
    "evening": [{"foodName": "Green Tea", "quantity": "1 cup", "notes": "metabolism"}],
    "dinner": [{"foodName": "Sweet Potato (Shakarkand)", "quantity": "1 medium", "notes": "roasted"}],
    "bedtime": [{"foodName": "Warm Milk with Turmeric", "quantity": "1 glass", "notes": "anti-inflammatory"}]
  },
  "Thursday": {
    "earlyMorning": [{"foodName": "Warm Water with Lemon", "quantity": "1 glass", "notes": "detox"}],
    "breakfast": [{"foodName": "Oatmeal", "quantity": "1 bowl", "notes": "with dates"}],
    "midMorning": [{"foodName": "Coconut Water", "quantity": "1 glass", "notes": "hydration"}],
    "lunch": [{"foodName": "Dal (Lentils)", "quantity": "1 bowl", "notes": "protein"}, {"foodName": "Chapati", "quantity": "2 pieces", "notes": "whole wheat"}],
    "evening": [{"foodName": "Herbal Tea", "quantity": "1 cup", "notes": "calming"}],
    "dinner": [{"foodName": "Vegetable Soup", "quantity": "1 bowl", "notes": "with turmeric"}],
    "bedtime": [{"foodName": "Ghee", "quantity": "1 tsp", "notes": "with warm milk"}]
  },
  "Friday": {
    "earlyMorning": [{"foodName": "Ginger (Adrak)", "quantity": "1 tsp", "notes": "with honey water"}],
    "breakfast": [{"foodName": "Idli", "quantity": "4 pieces", "notes": "fermented"}],
    "midMorning": [{"foodName": "Almonds (Badam)", "quantity": "6 pieces", "notes": "soaked overnight"}],
    "lunch": [{"foodName": "Quinoa", "quantity": "1 cup", "notes": "mixed vegetables"}],
    "evening": [{"foodName": "Buttermilk", "quantity": "1 glass", "notes": "digestive"}],
    "dinner": [{"foodName": "Khichdi", "quantity": "1 bowl", "notes": "easy digest"}],
    "bedtime": [{"foodName": "Fennel Seeds (Saunf)", "quantity": "1 tsp", "notes": "digestive tea"}]
  },
  "Saturday": {
    "earlyMorning": [{"foodName": "Coconut Water", "quantity": "1 glass", "notes": "natural"}],
    "breakfast": [{"foodName": "Sweet Potato (Shakarkand)", "quantity": "1 medium", "notes": "boiled"}],
    "midMorning": [{"foodName": "Green Tea", "quantity": "1 cup", "notes": "antioxidants"}],
    "lunch": [{"foodName": "Rice", "quantity": "1 cup", "notes": "with cucumber"}, {"foodName": "Cucumber (Kheera)", "quantity": "1 cup", "notes": "cooling"}],
    "evening": [{"foodName": "Dates (Khajur)", "quantity": "3 pieces", "notes": "natural sugar"}],
    "dinner": [{"foodName": "Vegetable Soup", "quantity": "1 bowl", "notes": "mixed vegetables"}],
    "bedtime": [{"foodName": "Warm Milk with Turmeric", "quantity": "1 glass", "notes": "sleep aid"}]
  },
  "Sunday": {
    "earlyMorning": [{"foodName": "Warm Water with Lemon", "quantity": "1 glass", "notes": "vitamin C"}],
    "breakfast": [{"foodName": "Oatmeal", "quantity": "1 bowl", "notes": "with almonds"}],
    "midMorning": [{"foodName": "Herbal Tea", "quantity": "1 cup", "notes": "relaxing"}],
    "lunch": [{"foodName": "Chapati", "quantity": "3 pieces", "notes": "with dal"}, {"foodName": "Dal (Lentils)", "quantity": "1 bowl", "notes": "protein rich"}],
    "evening": [{"foodName": "Buttermilk", "quantity": "1 glass", "notes": "probiotic"}],
    "dinner": [{"foodName": "Khichdi", "quantity": "1 bowl", "notes": "comfort food"}],
    "bedtime": [{"foodName": "Ghee", "quantity": "1 tsp", "notes": "nourishing"}]
  }
}`;
  }

  private convertAIResponseToDietPlan(
    aiResponse: string,
    patient: PatientProfile
  ): WeeklyDietPlan {
    try {
      console.log("Raw AI Response:", aiResponse);

      // Try to extract JSON from the response
      let jsonResponse = aiResponse.trim();

      // If response contains markdown code blocks, extract the JSON
      const jsonMatch = jsonResponse.match(
        /```(?:json)?\s*(\{[\s\S]*\})\s*```/
      );
      if (jsonMatch) {
        jsonResponse = jsonMatch[1];
      }

      // If response starts/ends with extra text, try to find the JSON object
      const startIndex = jsonResponse.indexOf("{");
      const lastIndex = jsonResponse.lastIndexOf("}");
      if (startIndex !== -1 && lastIndex !== -1) {
        jsonResponse = jsonResponse.slice(startIndex, lastIndex + 1);
      }

      console.log("Cleaned JSON:", jsonResponse);

      const parsedResponse = JSON.parse(jsonResponse);
      const dietPlan: WeeklyDietPlan = {};

      const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      const mealTimes = [
        "earlyMorning",
        "breakfast",
        "midMorning",
        "lunch",
        "evening",
        "dinner",
        "bedtime",
      ];

      daysOfWeek.forEach((day) => {
        if (parsedResponse[day]) {
          dietPlan[day] = {
            earlyMorning: [],
            breakfast: [],
            midMorning: [],
            lunch: [],
            evening: [],
            dinner: [],
            bedtime: [],
          };

          mealTimes.forEach((mealTime) => {
            if (parsedResponse[day][mealTime]) {
              parsedResponse[day][mealTime].forEach(
                (item: AIFoodItem, index: number) => {
                  // Find matching food in database
                  const food = foodDatabase.find(
                    (f) =>
                      f.name
                        .toLowerCase()
                        .includes(item.foodName.toLowerCase()) ||
                      item.foodName.toLowerCase().includes(f.name.toLowerCase())
                  );

                  if (food) {
                    const dietItem: DietItem = {
                      id: `ai_${day}_${mealTime}_${index}_${Date.now()}`,
                      foodId: food.id,
                      food: food,
                      quantity: item.quantity || "1 serving",
                      notes: item.notes || "",
                    };
                    dietPlan[day][
                      mealTime as keyof (typeof dietPlan)[typeof day]
                    ].push(dietItem);
                  } else {
                    // If food not found, create a fallback with a generic food item
                    console.warn(
                      `Food not found in database: ${item.foodName}`
                    );
                    const fallbackFood = foodDatabase[0]; // Use first food as fallback
                    const dietItem: DietItem = {
                      id: `ai_${day}_${mealTime}_${index}_${Date.now()}`,
                      foodId: fallbackFood.id,
                      food: fallbackFood,
                      quantity: item.quantity || "1 serving",
                      notes: `${item.foodName} - ${item.notes || ""}`,
                    };
                    dietPlan[day][
                      mealTime as keyof (typeof dietPlan)[typeof day]
                    ].push(dietItem);
                  }
                }
              );
            }
          });
        }
      });

      // If parsing resulted in empty plan, return a basic fallback
      if (Object.keys(dietPlan).length === 0) {
        return this.generateFallbackPlan();
      }

      return dietPlan;
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      console.log("Falling back to default plan");
      return this.generateFallbackPlan();
    }
  }

  private generateFallbackPlan(): WeeklyDietPlan {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const dietPlan: WeeklyDietPlan = {};

    // Basic fallback foods for each meal
    const fallbackMeals = {
      earlyMorning: [{ name: "Warm Water with Lemon", quantity: "1 glass" }],
      breakfast: [{ name: "Oatmeal", quantity: "1 bowl" }],
      midMorning: [{ name: "Green Tea", quantity: "1 cup" }],
      lunch: [
        { name: "Rice", quantity: "1 cup" },
        { name: "Dal", quantity: "1 bowl" },
      ],
      evening: [{ name: "Herbal Tea", quantity: "1 cup" }],
      dinner: [{ name: "Vegetable Soup", quantity: "1 bowl" }],
      bedtime: [{ name: "Warm Milk with Turmeric", quantity: "1 glass" }],
    };

    daysOfWeek.forEach((day) => {
      dietPlan[day] = {
        earlyMorning: [],
        breakfast: [],
        midMorning: [],
        lunch: [],
        evening: [],
        dinner: [],
        bedtime: [],
      };

      Object.entries(fallbackMeals).forEach(([mealKey, mealItems]) => {
        mealItems.forEach((item, index) => {
          const food =
            foodDatabase.find(
              (f) =>
                f.name.toLowerCase().includes(item.name.toLowerCase()) ||
                item.name.toLowerCase().includes(f.name.toLowerCase())
            ) || foodDatabase[0]; // Fallback to first food if not found

          const dietItem: DietItem = {
            id: `fallback_${day}_${mealKey}_${index}_${Date.now()}`,
            foodId: food.id,
            food: food,
            quantity: item.quantity,
            notes: "AI-suggested meal",
          };
          dietPlan[day][mealKey as keyof (typeof dietPlan)[typeof day]].push(
            dietItem
          );
        });
      });
    });

    return dietPlan;
  }

  async generateDietPlan(patient: PatientProfile): Promise<WeeklyDietPlan> {
    try {
      const prompt = this.createDietPrompt(patient);

      const messages = [
        {
          role: "system",
          content:
            "You are an expert Ayurvedic nutritionist with deep knowledge of traditional Indian medicine and nutrition. You create personalized diet plans based on dosha constitution and health conditions.",
        },
        {
          role: "user",
          content: prompt,
        },
      ];

      const aiResponse = await this.callGroqAPI(messages);
      return this.convertAIResponseToDietPlan(aiResponse, patient);
    } catch (error) {
      console.error("AI diet plan generation failed:", error);
      throw error;
    }
  }

  async generateMealSuggestions(
    patient: PatientProfile,
    mealTime: string,
    currentDay: string
  ): Promise<DietItem[]> {
    try {
      const prompt = `Suggest 2-3 appropriate Ayurvedic foods for ${mealTime} for a patient with:
- Constitution: ${patient.prakriti}  
- Dosha Balance: Vata ${patient.doshaBalance.vata}%, Pitta ${patient.doshaBalance.pitta}%, Kapha ${patient.doshaBalance.kapha}%

Include common Ayurvedic foods like rice, dal, vegetables, fruits, spices, herbal teas.

Respond with JSON array only:
[{"foodName": "Rice", "quantity": "1 cup", "notes": "good for digestion"}]`;

      const messages = [
        {
          role: "system",
          content:
            "You are an Ayurvedic nutritionist. Suggest appropriate foods based on patient constitution.",
        },
        {
          role: "user",
          content: prompt,
        },
      ];

      const aiResponse = await this.callGroqAPI(messages);
      const suggestions = JSON.parse(aiResponse);

      return suggestions
        .map((item: AIFoodItem, index: number) => {
          const food = foodDatabase.find(
            (f) =>
              f.name.toLowerCase().includes(item.foodName.toLowerCase()) ||
              item.foodName.toLowerCase().includes(f.name.toLowerCase())
          );

          if (food) {
            return {
              id: `suggestion_${Date.now()}_${index}`,
              foodId: food.id,
              food: food,
              quantity: item.quantity || "1 serving",
              notes: item.notes || "",
            };
          }
          return null;
        })
        .filter(Boolean);
    } catch (error) {
      console.error("AI meal suggestions failed:", error);
      return [];
    }
  }
}

export const groqAI = new GroqAIService();
