import { useState } from "react";
import { Plus, Search, Clock, Utensils, Edit3, Save, Trash2, Copy, GripVertical, Sparkles, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { foodDatabase, FoodItem } from "@/data/foodDatabase";
import { groqAI } from "@/services/groqAI";

interface DietItem {
  id: string;
  foodId: string;
  food: FoodItem;
  quantity: string;
  notes?: string;
  time?: string;
}

interface MealPlan {
  earlyMorning: DietItem[];
  breakfast: DietItem[];
  midMorning: DietItem[];
  lunch: DietItem[];
  evening: DietItem[];
  dinner: DietItem[];
  bedtime: DietItem[];
}

interface WeeklyDietPlan {
  [key: string]: MealPlan;
}

interface DietPlanEditorProps {
  patientId: string;
  patientName: string;
  patientData?: {
    age: number;
    gender: string;
    prakriti: string;
    doshaBalance: {
      vata: number;
      pitta: number;
      kapha: number;
    };
    height: number;
    weight: number;
    bmi: number;
    healthConditions?: string[];
  };
  initialPlan?: WeeklyDietPlan;
  onSave: (plan: WeeklyDietPlan) => void;
}

const daysOfWeek = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const mealTimes = [
  { key: "earlyMorning", label: "Early Morning", time: "6:00 AM", icon: "🌅" },
  { key: "breakfast", label: "Breakfast", time: "8:00 AM", icon: "🍳" },
  { key: "midMorning", label: "Mid Morning", time: "11:00 AM", icon: "🥤" },
  { key: "lunch", label: "Lunch", time: "1:00 PM", icon: "🍽️" },
  { key: "evening", label: "Evening", time: "4:00 PM", icon: "☕" },
  { key: "dinner", label: "Dinner", time: "7:00 PM", icon: "🍛" },
  { key: "bedtime", label: "Bedtime", time: "9:00 PM", icon: "🌙" }
];

export function DietPlanEditor({ patientId, patientName, patientData, initialPlan, onSave }: DietPlanEditorProps) {
  const [dietPlan, setDietPlan] = useState<WeeklyDietPlan>(() => {
    if (initialPlan) return initialPlan;
    
    const emptyPlan: WeeklyDietPlan = {};
    daysOfWeek.forEach(day => {
      emptyPlan[day] = {
        earlyMorning: [],
        breakfast: [],
        midMorning: [],
        lunch: [],
        evening: [],
        dinner: [],
        bedtime: []
      };
    });
    return emptyPlan;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<DietItem | null>(null);
  const [isAddingFood, setIsAddingFood] = useState(false);
  const [draggedItem, setDraggedItem] = useState<DietItem | null>(null);
  const [dragOverMeal, setDragOverMeal] = useState<string | null>(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);

  const filteredFoods = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    food.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addFoodItem = (food: FoodItem, mealKey: string, quantity: string = "1 serving") => {
    const newItem: DietItem = {
      id: `${Date.now()}_${Math.random()}`,
      foodId: food.id,
      food: food,
      quantity: quantity,
      notes: ""
    };

    setDietPlan(prev => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [mealKey]: [...prev[selectedDay][mealKey as keyof MealPlan], newItem]
      }
    }));
    setIsAddingFood(false);
    setSearchQuery("");
  };

  const updateFoodItem = (dayKey: string, mealKey: string, itemId: string, updates: Partial<DietItem>) => {
    setDietPlan(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [mealKey]: prev[dayKey][mealKey as keyof MealPlan].map(item =>
          item.id === itemId ? { ...item, ...updates } : item
        )
      }
    }));
  };

  const removeFoodItem = (dayKey: string, mealKey: string, itemId: string) => {
    setDietPlan(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [mealKey]: prev[dayKey][mealKey as keyof MealPlan].filter(item => item.id !== itemId)
      }
    }));
  };

  const generateAIDietPlan = async () => {
    if (!patientData) {
      setAiError("Patient data is required for AI generation");
      return;
    }

    setIsGeneratingAI(true);
    setAiError(null);

    try {
      const patientProfile = {
        name: patientName,
        age: patientData.age,
        gender: patientData.gender,
        prakriti: patientData.prakriti,
        doshaBalance: patientData.doshaBalance,
        height: patientData.height,
        weight: patientData.weight,
        bmi: patientData.bmi,
        healthConditions: patientData.healthConditions || []
      };

      const aiDietPlan = await groqAI.generateDietPlan(patientProfile);
      setDietPlan(aiDietPlan);
      onSave(aiDietPlan);
    } catch (error) {
      console.error("AI generation failed:", error);
      setAiError("Failed to generate AI diet plan. Please try again.");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const generateMealSuggestions = async (mealKey: string) => {
    if (!patientData) return;

    setIsGeneratingSuggestions(true);
    
    try {
      const patientProfile = {
        name: patientName,
        age: patientData.age,
        gender: patientData.gender,
        prakriti: patientData.prakriti,
        doshaBalance: patientData.doshaBalance,
        height: patientData.height,
        weight: patientData.weight,
        bmi: patientData.bmi,
        healthConditions: patientData.healthConditions || []
      };

      const mealTime = mealTimes.find(m => m.key === mealKey)?.label || mealKey;
      const suggestions = await groqAI.generateMealSuggestions(patientProfile, mealTime, selectedDay);
      
      setDietPlan(prev => ({
        ...prev,
        [selectedDay]: {
          ...prev[selectedDay],
          [mealKey]: [...prev[selectedDay][mealKey as keyof MealPlan], ...suggestions]
        }
      }));
    } catch (error) {
      console.error("AI suggestions failed:", error);
    } finally {
      setIsGeneratingSuggestions(false);
    }
  };

  const handleDragStart = (item: DietItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent, mealKey: string) => {
    e.preventDefault();
    setDragOverMeal(mealKey);
  };

  const handleDragLeave = () => {
    setDragOverMeal(null);
  };

  const handleDrop = (e: React.DragEvent, targetMealKey: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    let sourceMealKey = "";
    Object.entries(dietPlan[selectedDay]).forEach(([mealKey, mealItems]) => {
      if (mealItems.find(item => item.id === draggedItem.id)) {
        sourceMealKey = mealKey;
      }
    });

    if (sourceMealKey && sourceMealKey !== targetMealKey) {
      removeFoodItem(selectedDay, sourceMealKey, draggedItem.id);
      
      setDietPlan(prev => ({
        ...prev,
        [selectedDay]: {
          ...prev[selectedDay],
          [targetMealKey]: [...prev[selectedDay][targetMealKey as keyof MealPlan], draggedItem]
        }
      }));
    }

    setDraggedItem(null);
    setDragOverMeal(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Diet Plan for {patientName}</h2>
          <p className="text-muted-foreground">Click on any meal to add or edit food items</p>
        </div>
        <div className="flex gap-3">
          {patientData && (
            <Button
              onClick={generateAIDietPlan}
              disabled={isGeneratingAI}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
            >
              {isGeneratingAI ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              {isGeneratingAI ? "Generating..." : "Generate AI Plan"}
            </Button>
          )}
          <Button
            onClick={() => onSave(dietPlan)}
            className="bg-healing text-white hover:bg-primary-dark"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Plan
          </Button>
        </div>
      </div>

      {/* AI Error Alert */}
      {aiError && (
        <Alert variant="destructive">
          <AlertDescription>{aiError}</AlertDescription>
        </Alert>
      )}

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {daysOfWeek.map(day => (
          <Button
            key={day}
            variant={selectedDay === day ? "default" : "outline"}
            onClick={() => setSelectedDay(day)}
            className="min-w-[100px]"
          >
            {day}
          </Button>
        ))}
      </div>

      {/* Diet Plan Grid */}
      <div className="grid gap-4">
        {mealTimes.map(meal => {
          const mealItems = dietPlan[selectedDay]?.[meal.key as keyof MealPlan] || [];
          
          return (
            <Card 
              key={meal.key} 
              className={`bg-card border-border shadow-sm hover:shadow-md transition-shadow ${
                dragOverMeal === meal.key ? 'border-primary bg-primary/5' : ''
              }`}
              onDragOver={(e) => handleDragOver(e, meal.key)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, meal.key)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{meal.icon}</span>
                    <div>
                      <h3 className="font-semibold text-foreground">{meal.label}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {meal.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {patientData && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => generateMealSuggestions(meal.key)}
                        disabled={isGeneratingSuggestions}
                        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                      >
                        {isGeneratingSuggestions ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Sparkles className="w-4 h-4 mr-2" />
                        )}
                        AI Suggest
                      </Button>
                    )}
                    <Dialog open={isAddingFood && selectedMeal === meal.key} onOpenChange={(open) => {
                      setIsAddingFood(open);
                      setSelectedMeal(open ? meal.key : null);
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedMeal(meal.key);
                            setIsAddingFood(true);
                          }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Food
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Add Food to {meal.label}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              placeholder="Search for foods..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                          <ScrollArea className="h-[400px]">
                            <div className="grid gap-2">
                              {filteredFoods.map(food => (
                                <div
                                  key={food.id}
                                  className="p-3 border rounded-lg hover:bg-muted cursor-pointer transition-colors"
                                  onClick={() => addFoodItem(food, meal.key)}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <span className="text-xl">{food.emoji}</span>
                                      <div>
                                        <h4 className="font-medium">{food.name}</h4>
                                        <p className="text-sm text-muted-foreground">{food.category}</p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm font-medium">{food.nutrition.calories} cal</p>
                                      <Badge variant="outline" className="text-xs">
                                        {food.ayurvedicProperties.effect}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {mealItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Utensils className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No foods added yet</p>
                    <p className="text-sm">Click "Add Food" to start building this meal</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {mealItems.map(item => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={() => handleDragStart(item)}
                        className={`flex items-center justify-between p-3 bg-muted/50 rounded-lg border cursor-move hover:bg-muted/70 transition-colors ${
                          draggedItem?.id === item.id ? 'opacity-50' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <GripVertical className="w-4 h-4 text-muted-foreground" />
                          <span className="text-lg">{item.food.emoji}</span>
                          <div>
                            <h4 className="font-medium">{item.food.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.quantity}</p>
                            {item.notes && (
                              <p className="text-xs text-muted-foreground italic">{item.notes}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {item.food.ayurvedicProperties.effect}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {item.food.nutrition.calories} cal
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingItem(item)}
                          >
                            <Edit3 className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFoodItem(selectedDay, meal.key, item.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Item Dialog */}
      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit {editingItem.food.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Quantity</label>
                <Input
                  value={editingItem.quantity}
                  onChange={(e) => setEditingItem({ ...editingItem, quantity: e.target.value })}
                  placeholder="e.g., 1 cup, 2 pieces, 100g"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                  value={editingItem.notes || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, notes: e.target.value })}
                  placeholder="Special instructions, preparation notes..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingItem(null)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    Object.entries(dietPlan).forEach(([dayKey, dayPlan]) => {
                      Object.entries(dayPlan).forEach(([mealKey, mealItems]) => {
                        const itemIndex = mealItems.findIndex(item => item.id === editingItem.id);
                        if (itemIndex !== -1) {
                          updateFoodItem(dayKey, mealKey, editingItem.id, editingItem);
                        }
                      });
                    });
                    setEditingItem(null);
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}