import { useState } from "react";
import { Search, Plus, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { foodDatabase } from "@/data/foodDatabase";

export default function FoodDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const categories = ["all", "grains", "vegetables", "fruits", "legumes", "spices", "herbs", "dairy", "nuts"];
  
  const filteredFoods = foodDatabase.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         food.ayurvedicProperties.taste.some(taste => taste.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         food.healthBenefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || food.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getDoshaColor = (dosha: string) => {
    switch (dosha.toLowerCase()) {
      case "vata": return "bg-vata text-white";
      case "pitta": return "bg-pitta text-white";
      case "kapha": return "bg-kapha text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-subtle-gradient min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Food Database</h1>
          <p className="text-muted-foreground mt-1">
            Ayurvedic and modern nutrition information
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-card border-border shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search foods, nutrients, health goals, or Ayurvedic properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-primary text-primary-foreground" : ""}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {filteredFoods.map((food) => (
          <Card key={food.id} className="bg-card border-border shadow-card hover-lift group cursor-pointer h-full flex flex-col overflow-hidden">
            {/* Food Header with Image */}
            <div className="relative">
              <div className="h-32 sm:h-40 bg-healing bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-b border-border">
                <div className="text-4xl sm:text-5xl filter drop-shadow-lg">
                  {food.emoji}
                </div>
              </div>
              <div className="absolute top-2 right-2">
                <Badge className="text-xs capitalize bg-card text-card-foreground border border-border">
                  {food.category}
                </Badge>
              </div>
            </div>

            <CardContent className="p-4 flex-1 flex flex-col space-y-3">
              {/* Food Name */}
              <div className="text-center mb-2">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-smooth">
                  {food.name}
                </h3>
              </div>

              {/* Ayurvedic Properties - Compact */}
              <div className="bg-subtle-gradient p-3 rounded-lg border border-border">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  🕉️ Ayurvedic Properties
                </h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rasa:</span>
                    <div className="flex gap-1 flex-wrap">
                      {food.ayurvedicProperties.taste.slice(0, 2).map((taste, index) => (
                        <Badge key={index} variant="outline" className="text-xs px-1.5 py-0.5">
                          {taste}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Effect:</span>
                    <Badge className={`text-xs px-2 py-0.5 ${getDoshaColor(food.ayurvedicProperties.effect)}`}>
                      {food.ayurvedicProperties.effect}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Virya:</span>
                    <span className="text-xs font-medium text-foreground">{food.ayurvedicProperties.potency}</span>
                  </div>
                </div>
              </div>

              {/* Modern Nutrition - Compact Grid */}
              <div className="bg-card border border-border p-3 rounded-lg">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  🧬 Nutrition (per 100g)
                </h4>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cal:</span>
                    <span className="font-medium text-foreground">{food.nutrition.calories}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Protein:</span>
                    <span className="font-medium text-foreground">{food.nutrition.protein}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Carbs:</span>
                    <span className="font-medium text-foreground">{food.nutrition.carbs}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fiber:</span>
                    <span className="font-medium text-foreground">{food.nutrition.fiber}g</span>
                  </div>
                </div>
              </div>

              {/* Key Nutrients & Benefits - Combined */}
              <div className="space-y-2">
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-1">Key Nutrients</h4>
                  <div className="flex gap-1 flex-wrap">
                    {food.nutrition.keyNutrients.slice(0, 3).map((nutrient, index) => (
                      <Badge key={index} className="text-xs bg-primary/10 text-primary border-primary/20 px-1.5 py-0.5">
                        {nutrient}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-1">Health Benefits</h4>
                  <div className="flex gap-1 flex-wrap">
                    {food.healthBenefits.slice(0, 2).map((benefit, index) => (
                      <Badge key={index} variant="outline" className="text-xs px-1.5 py-0.5">
                        {benefit.length > 20 ? benefit.substring(0, 20) + '...' : benefit}
                      </Badge>
                    ))}
                    {food.healthBenefits.length > 2 && (
                      <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                        +{food.healthBenefits.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                size="sm" 
                className="w-full mt-auto bg-healing text-white hover:bg-primary-dark shadow-primary transition-smooth"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Diet Plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground text-lg">No foods found matching your search criteria</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your search terms or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}