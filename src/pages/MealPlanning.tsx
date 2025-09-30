import { useState } from "react";
import { Clock, Utensils, Target, Plus, ChefHat, Calendar, Filter, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface MealPlan {
  id: string;
  name: string;
  dosha: "vata" | "pitta" | "kapha" | "balanced";
  duration: string;
  meals: {
    time: string;
    name: string;
    foods: string[];
    benefits: string;
    prep_time: string;
  }[];
  benefits: string[];
  restrictions: string[];
}

const sampleMealPlans: MealPlan[] = [
  {
    id: "vata-balance",
    name: "Vata Balancing Plan",
    dosha: "vata",
    duration: "7 days",
    meals: [
      {
        time: "6:00 AM",
        name: "Early Morning",
        foods: ["Warm water with ginger", "Soaked almonds (5-6)"],
        benefits: "Ignites digestive fire, grounds Vata energy",
        prep_time: "5 mins"
      },
      {
        time: "8:00 AM", 
        name: "Breakfast",
        foods: ["Oatmeal with ghee and dates", "Warm milk with cardamom", "Stewed apples with cinnamon"],
        benefits: "Provides sustained energy, calms nervous system",
        prep_time: "15 mins"
      },
      {
        time: "12:30 PM",
        name: "Lunch",
        foods: ["Kitchari with vegetables", "Steamed root vegetables", "Buttermilk with cumin"],
        benefits: "Easy to digest, deeply nourishing",
        prep_time: "30 mins"
      },
      {
        time: "4:00 PM",
        name: "Snack",
        foods: ["Warm herbal tea", "Dates with ghee", "Handful of walnuts"],
        benefits: "Maintains steady energy, prevents afternoon fatigue",
        prep_time: "5 mins"
      },
      {
        time: "7:00 PM",
        name: "Dinner",
        foods: ["Mung dal soup", "Steamed vegetables", "Rice with ghee"],
        benefits: "Light but satisfying, promotes good sleep",
        prep_time: "25 mins"
      }
    ],
    benefits: [
      "Grounds excess Vata energy",
      "Improves digestion and absorption",
      "Calms anxiety and restlessness",
      "Promotes better sleep quality",
      "Increases physical strength"
    ],
    restrictions: [
      "Avoid cold and raw foods",
      "Minimize caffeine and stimulants", 
      "Reduce dry and light foods",
      "Limit irregular meal timings"
    ]
  },
  {
    id: "pitta-cooling",
    name: "Pitta Cooling Plan",
    dosha: "pitta",
    duration: "7 days",
    meals: [
      {
        time: "6:00 AM",
        name: "Early Morning",
        foods: ["Cool water", "Fresh coconut water", "Soaked raisins"],
        benefits: "Cools internal heat, hydrates system",
        prep_time: "3 mins"
      },
      {
        time: "8:00 AM",
        name: "Breakfast", 
        foods: ["Fresh fruit salad", "Coconut milk smoothie", "Cooling herbs tea"],
        benefits: "Provides natural sugars without heating",
        prep_time: "10 mins"
      },
      {
        time: "12:30 PM",
        name: "Lunch",
        foods: ["Basmati rice", "Cucumber raita", "Steamed leafy greens", "Fennel tea"],
        benefits: "Cooling and satisfying, reduces acidity",
        prep_time: "25 mins"
      },
      {
        time: "4:00 PM",
        name: "Snack",
        foods: ["Sweet lassi", "Fresh melon", "Rose water"],
        benefits: "Cooling snack, balances afternoon heat",
        prep_time: "5 mins"
      },
      {
        time: "7:00 PM",
        name: "Dinner",
        foods: ["Quinoa salad", "Steamed vegetables", "Cilantro chutney"],
        benefits: "Light and cooling, aids digestion",
        prep_time: "20 mins"
      }
    ],
    benefits: [
      "Reduces excess heat and inflammation",
      "Calms irritability and anger",
      "Improves skin complexion",
      "Balances digestive fire",
      "Promotes mental clarity"
    ],
    restrictions: [
      "Avoid spicy and hot foods",
      "Limit citrus fruits",
      "Reduce fermented foods",
      "Minimize alcohol and caffeine"
    ]
  },
  {
    id: "kapha-energizing",
    name: "Kapha Energizing Plan", 
    dosha: "kapha",
    duration: "7 days",
    meals: [
      {
        time: "6:00 AM",
        name: "Early Morning",
        foods: ["Warm water with lemon and honey", "Ginger tea"],
        benefits: "Stimulates metabolism, reduces mucus",
        prep_time: "5 mins"
      },
      {
        time: "8:00 AM",
        name: "Breakfast",
        foods: ["Light vegetable soup", "Herbal tea with spices", "Handful of sunflower seeds"],
        benefits: "Light but energizing, kickstarts digestion",
        prep_time: "15 mins"
      },
      {
        time: "12:30 PM",
        name: "Lunch",
        foods: ["Spiced lentil curry", "Steamed vegetables with ginger", "Barley or millet"],
        benefits: "Warming spices boost metabolism",
        prep_time: "30 mins"
      },
      {
        time: "4:00 PM",
        name: "Snack",
        foods: ["Spiced tea", "Small portion of nuts", "Honey if needed"],
        benefits: "Maintains energy without heaviness",
        prep_time: "5 mins"
      },
      {
        time: "7:00 PM",
        name: "Dinner",
        foods: ["Light vegetable broth", "Steamed greens", "Small portion of grains"],
        benefits: "Light dinner prevents morning sluggishness",
        prep_time: "20 mins"
      }
    ],
    benefits: [
      "Stimulates slow metabolism",
      "Reduces excess mucus and congestion",
      "Increases energy and motivation",
      "Supports healthy weight management",
      "Improves mental alertness"
    ],
    restrictions: [
      "Avoid heavy and oily foods",
      "Limit dairy products",
      "Reduce sweet and salty foods",
      "Minimize cold foods and drinks"
    ]
  }
];

const doshaColors = {
  vata: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", badge: "bg-purple-100" },
  pitta: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", badge: "bg-red-100" },
  kapha: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", badge: "bg-blue-100" },
  balanced: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", badge: "bg-green-100" }
};

export default function MealPlanning() {
  const [selectedDosha, setSelectedDosha] = useState<string>("all");
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);

  const filteredPlans = selectedDosha === "all" 
    ? sampleMealPlans 
    : sampleMealPlans.filter(plan => plan.dosha === selectedDosha);

  if (selectedPlan) {
    const colors = doshaColors[selectedPlan.dosha];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{selectedPlan.name}</h1>
              <p className="text-lg text-gray-600">Detailed meal plan for {selectedPlan.duration}</p>
            </div>
            <Button variant="outline" onClick={() => setSelectedPlan(null)}>
              ← Back to Plans
            </Button>
          </div>

          {/* Plan Overview */}
          <Card className={`${colors.bg} ${colors.border} border-2 mb-8`}>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Benefits</h3>
                  <ul className="space-y-1">
                    {selectedPlan.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <Star className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What to Avoid</h3>
                  <ul className="space-y-1">
                    {selectedPlan.restrictions.map((restriction, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full mt-1 flex-shrink-0" />
                        {restriction}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col justify-center">
                  <Badge className={`${colors.badge} ${colors.text} text-lg py-2 px-4 mb-4`}>
                    {selectedPlan.dosha.charAt(0).toUpperCase() + selectedPlan.dosha.slice(1)} Balancing
                  </Badge>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Add to My Calendar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Meal Schedule */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Daily Meal Schedule</h2>
            {selectedPlan.meals.map((meal, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-lg">{meal.time}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{meal.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        <ChefHat className="w-3 h-3 mr-1" />
                        {meal.prep_time}
                      </Badge>
                    </div>
                    
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold text-gray-900 mb-3">Foods to Include:</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {meal.foods.map((food, foodIndex) => (
                          <Badge key={foodIndex} variant="secondary" className="text-sm">
                            {food}
                          </Badge>
                        ))}
                      </div>
                      <Alert>
                        <Target className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          <strong>Benefits:</strong> {meal.benefits}
                        </AlertDescription>
                      </Alert>
                    </div>

                    <div className="lg:col-span-1 flex items-center justify-center">
                      <Button variant="outline" className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add to My Plan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ayurvedic Meal Planning</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Personalized meal plans designed according to your dosha constitution. 
            Each plan is carefully crafted to balance your unique needs and promote optimal health.
          </p>
        </div>

        {/* Filter Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Meal Plans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Select value={selectedDosha} onValueChange={setSelectedDosha}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Dosha Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Doshas</SelectItem>
                  <SelectItem value="vata">Vata (Air & Space)</SelectItem>
                  <SelectItem value="pitta">Pitta (Fire & Water)</SelectItem>
                  <SelectItem value="kapha">Kapha (Earth & Water)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Meal Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlans.map((plan) => {
            const colors = doshaColors[plan.dosha];
            return (
              <Card key={plan.id} className={`${colors.bg} ${colors.border} border-2 hover:shadow-xl transition-all cursor-pointer`}
                    onClick={() => setSelectedPlan(plan)}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`${colors.badge} ${colors.text}`}>
                      {plan.dosha.charAt(0).toUpperCase() + plan.dosha.slice(1)}
                    </Badge>
                    <Badge variant="outline">{plan.duration}</Badge>
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                      <ul className="space-y-1">
                        {plan.benefits.slice(0, 3).map((benefit, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                            <Star className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                        {plan.benefits.length > 3 && (
                          <li className="text-sm text-gray-500">
                            +{plan.benefits.length - 3} more benefits
                          </li>
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Sample Meals:</h4>
                      <div className="flex flex-wrap gap-1">
                        {plan.meals.slice(0, 2).map((meal, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {meal.name}
                          </Badge>
                        ))}
                        <Badge variant="outline" className="text-xs">
                          +{plan.meals.length - 2} more
                        </Badge>
                      </div>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Utensils className="w-4 h-4 mr-2" />
                      View Full Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need a Custom Meal Plan?</h2>
            <p className="text-lg mb-6 text-green-100">
              Get a personalized meal plan based on your specific needs, health conditions, and lifestyle.
            </p>
            <Button variant="secondary" size="lg">
              <Target className="w-5 h-5 mr-2" />
              Create Custom Plan
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}