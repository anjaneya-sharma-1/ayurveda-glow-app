import { useState } from "react";
import { Search, Leaf, Info, Clock, AlertCircle, Filter, Heart, Brain, Zap, Shield, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Herb {
  id: string;
  name: string;
  sanskrit: string;
  category: "digestive" | "respiratory" | "nervous" | "circulatory" | "immune" | "metabolic";
  dosha_effects: {
    vata: "increase" | "decrease" | "neutral";
    pitta: "increase" | "decrease" | "neutral";
    kapha: "increase" | "decrease" | "neutral";
  };
  properties: {
    rasa: string[];
    virya: "hot" | "cold";
    vipaka: string;
    guna: string[];
  };
  benefits: string[];
  usage: {
    dosage: string;
    preparation: string[];
    timing: string;
    duration: string;
  };
  precautions: string[];
  contraindications: string[];
  common_uses: string[];
  image_emoji: string;
}

const herbDatabase: Herb[] = [
  {
    id: "ashwagandha",
    name: "Ashwagandha",
    sanskrit: "अश्वगन्धा (Withania somnifera)",
    category: "nervous",
    dosha_effects: {
      vata: "decrease",
      pitta: "neutral", 
      kapha: "increase"
    },
    properties: {
      rasa: ["Bitter", "Astringent", "Sweet"],
      virya: "hot",
      vipaka: "Sweet",
      guna: ["Heavy", "Oily"]
    },
    benefits: [
      "Reduces stress and anxiety",
      "Improves strength and vitality",
      "Enhances immune function",
      "Supports healthy sleep",
      "Balances cortisol levels",
      "Improves muscle mass and strength"
    ],
    usage: {
      dosage: "1-3 grams daily",
      preparation: ["Powder with warm milk", "Capsules", "Decoction"],
      timing: "Evening before bed",
      duration: "3-6 months for best results"
    },
    precautions: [
      "Avoid during pregnancy",
      "May interact with thyroid medications",
      "Start with small doses"
    ],
    contraindications: [
      "Hyperthyroidism",
      "Autoimmune disorders",
      "Pregnancy and breastfeeding"
    ],
    common_uses: [
      "Chronic fatigue",
      "Anxiety and stress",
      "Insomnia",
      "Low immunity",
      "Physical weakness"
    ],
    image_emoji: "🌿"
  },
  {
    id: "turmeric",
    name: "Turmeric",
    sanskrit: "हरिद्रा (Curcuma longa)",
    category: "immune",
    dosha_effects: {
      vata: "neutral",
      pitta: "decrease",
      kapha: "decrease"
    },
    properties: {
      rasa: ["Bitter", "Astringent", "Pungent"],
      virya: "hot",
      vipaka: "Pungent",
      guna: ["Light", "Dry"]
    },
    benefits: [
      "Powerful anti-inflammatory",
      "Supports liver detoxification",
      "Boosts immune system",
      "Improves skin health",
      "Aids wound healing",
      "Supports joint health"
    ],
    usage: {
      dosage: "1-3 grams daily",
      preparation: ["Golden milk", "Powder in food", "Fresh root juice"],
      timing: "With meals",
      duration: "Can be used long-term"
    },
    precautions: [
      "May increase bleeding risk",
      "Can aggravate gallstones",
      "High doses may cause stomach upset"
    ],
    contraindications: [
      "Gallbladder disease",
      "Blood thinning medications",
      "Before surgery"
    ],
    common_uses: [
      "Inflammation",
      "Joint pain",
      "Skin conditions",
      "Digestive issues",
      "Immune support"
    ],
    image_emoji: "🧡"
  },
  {
    id: "ginger",
    name: "Ginger",
    sanskrit: "आर्द्रक (Zingiber officinale)",
    category: "digestive",
    dosha_effects: {
      vata: "decrease",
      pitta: "increase",
      kapha: "decrease"
    },
    properties: {
      rasa: ["Pungent", "Sweet"],
      virya: "hot",
      vipaka: "Sweet",
      guna: ["Light", "Oily"]
    },
    benefits: [
      "Improves digestion",
      "Reduces nausea",
      "Anti-inflammatory properties",
      "Boosts circulation",
      "Supports respiratory health",
      "Enhances absorption of nutrients"
    ],
    usage: {
      dosage: "1-3 grams daily",
      preparation: ["Fresh juice", "Tea", "Powder", "Fresh slices"],
      timing: "Before meals",
      duration: "As needed"
    },
    precautions: [
      "Avoid in high Pitta conditions",
      "May increase bleeding",
      "Can cause heartburn in sensitive individuals"
    ],
    contraindications: [
      "Gallstones",
      "Blood thinning medications",
      "High Pitta constitution in excess"
    ],
    common_uses: [
      "Poor digestion",
      "Nausea and vomiting",
      "Cold and flu",
      "Motion sickness",
      "Respiratory congestion"
    ],
    image_emoji: "🫚"
  },
  {
    id: "brahmi",
    name: "Brahmi",
    sanskrit: "ब्राह्मी (Bacopa monnieri)",
    category: "nervous",
    dosha_effects: {
      vata: "decrease",
      pitta: "decrease",
      kapha: "neutral"
    },
    properties: {
      rasa: ["Bitter", "Sweet", "Astringent"],
      virya: "cold",
      vipaka: "Sweet",
      guna: ["Light", "Oily"]
    },
    benefits: [
      "Enhances memory and cognition",
      "Reduces anxiety and stress",
      "Improves focus and concentration",
      "Supports nervous system health",
      "Promotes mental clarity",
      "Aids in learning and retention"
    ],
    usage: {
      dosage: "500mg - 1 gram daily",
      preparation: ["Powder with ghee", "Fresh juice", "Capsules"],
      timing: "Morning on empty stomach",
      duration: "3-6 months for cognitive benefits"
    },
    precautions: [
      "May cause drowsiness initially",
      "Start with low doses",
      "Monitor blood sugar levels"
    ],
    contraindications: [
      "Hypoglycemia",
      "Severe depression without supervision",
      "Pregnancy (consult practitioner)"
    ],
    common_uses: [
      "Memory problems",
      "Anxiety and stress",
      "ADHD support",
      "Mental fatigue",
      "Learning difficulties"
    ],
    image_emoji: "🧠"
  },
  {
    id: "amla",
    name: "Amla",
    sanskrit: "आमलकी (Emblica officinalis)",
    category: "immune",
    dosha_effects: {
      vata: "neutral",
      pitta: "decrease",
      kapha: "neutral"
    },
    properties: {
      rasa: ["Sour", "Sweet", "Bitter", "Astringent", "Pungent"],
      virya: "cold",
      vipaka: "Sweet",
      guna: ["Light", "Dry"]
    },
    benefits: [
      "Rich source of Vitamin C",
      "Powerful antioxidant",
      "Supports immune system",
      "Promotes healthy aging",
      "Improves hair and skin health",
      "Supports liver function"
    ],
    usage: {
      dosage: "1-2 fruits daily or 3-6 grams powder",
      preparation: ["Fresh fruit", "Juice", "Powder", "Chyawanprash"],
      timing: "Morning on empty stomach",
      duration: "Daily use beneficial"
    },
    precautions: [
      "May interact with diabetes medications",
      "Can cause loose stools in high doses",
      "Avoid with iron supplements"
    ],
    contraindications: [
      "Severe acidity (in large amounts)",
      "Iron absorption disorders",
      "Certain diabetes medications"
    ],
    common_uses: [
      "Low immunity",
      "Premature aging",
      "Hair loss",
      "Skin problems",
      "Digestive weakness"
    ],
    image_emoji: "🟢"
  },
  {
    id: "neem",
    name: "Neem",
    sanskrit: "निम्ब (Azadirachta indica)",
    category: "immune",
    dosha_effects: {
      vata: "increase",
      pitta: "decrease",
      kapha: "decrease"
    },
    properties: {
      rasa: ["Bitter", "Astringent"],
      virya: "cold",
      vipaka: "Pungent",
      guna: ["Light", "Dry"]
    },
    benefits: [
      "Natural antibiotic properties",
      "Purifies blood",
      "Supports skin health",
      "Boosts immune function",
      "Anti-parasitic properties",
      "Supports oral health"
    ],
    usage: {
      dosage: "2-4 grams powder or 2-4 leaves",
      preparation: ["Fresh leaves", "Powder", "Oil for external use"],
      timing: "Morning on empty stomach",
      duration: "Short courses (2-4 weeks)"
    },
    precautions: [
      "Very bitter taste",
      "Can aggravate Vata in excess",
      "Avoid long-term internal use"
    ],
    contraindications: [
      "Pregnancy and breastfeeding",
      "Children under 12",
      "Severe Vata imbalance"
    ],
    common_uses: [
      "Skin infections",
      "Diabetes support",
      "Dental problems",
      "Blood purification",
      "Parasite cleansing"
    ],
    image_emoji: "🍃"
  }
];

const categoryIcons = {
  digestive: Zap,
  respiratory: Heart,
  nervous: Brain, 
  circulatory: Heart,
  immune: Shield,
  metabolic: Zap
};

const doshaColors = {
  decrease: { bg: "bg-green-100", text: "text-green-800", symbol: "↓" },
  increase: { bg: "bg-red-100", text: "text-red-800", symbol: "↑" },
  neutral: { bg: "bg-gray-100", text: "text-gray-800", symbol: "=" }
};

export default function HerbsRemedies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDosha, setSelectedDosha] = useState<string>("all");
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);

  const filteredHerbs = herbDatabase.filter(herb => {
    const matchesSearch = herb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         herb.sanskrit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         herb.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || herb.category === selectedCategory;
    
    const matchesDosha = selectedDosha === "all" || 
                        herb.dosha_effects[selectedDosha as keyof typeof herb.dosha_effects] === "decrease";

    return matchesSearch && matchesCategory && matchesDosha;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ayurvedic Herbs & Remedies</h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Explore our comprehensive database of traditional Ayurvedic herbs. Each herb is detailed with its properties, 
            benefits, usage guidelines, and dosha effects to help you make informed choices for your health journey.
          </p>
        </div>

        {/* Search and Filter Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Search & Filter Herbs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search herbs, benefits, or Sanskrit names..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="digestive">Digestive</SelectItem>
                  <SelectItem value="respiratory">Respiratory</SelectItem>
                  <SelectItem value="nervous">Nervous System</SelectItem>
                  <SelectItem value="circulatory">Circulatory</SelectItem>
                  <SelectItem value="immune">Immune Support</SelectItem>
                  <SelectItem value="metabolic">Metabolic</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDosha} onValueChange={setSelectedDosha}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Dosha Balance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Doshas</SelectItem>
                  <SelectItem value="vata">Good for Vata</SelectItem>
                  <SelectItem value="pitta">Good for Pitta</SelectItem>
                  <SelectItem value="kapha">Good for Kapha</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Herbs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHerbs.map((herb) => {
            const CategoryIcon = categoryIcons[herb.category];
            return (
              <Card key={herb.id} className="hover:shadow-lg transition-all cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{herb.image_emoji}</span>
                      <div>
                        <CardTitle className="text-lg">{herb.name}</CardTitle>
                        <p className="text-sm text-gray-600">{herb.sanskrit}</p>
                      </div>
                    </div>
                    <CategoryIcon className="w-5 h-5 text-green-600" />
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Dosha Effects */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Dosha Effects:</h4>
                    <div className="flex gap-2">
                      {Object.entries(herb.dosha_effects).map(([dosha, effect]) => {
                        const colorInfo = doshaColors[effect];
                        return (
                          <Badge key={dosha} className={`${colorInfo.bg} ${colorInfo.text} text-xs`}>
                            {dosha.charAt(0).toUpperCase() + dosha.slice(1)} {colorInfo.symbol}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  {/* Key Benefits */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Key Benefits:</h4>
                    <ul className="space-y-1">
                      {herb.benefits.slice(0, 3).map((benefit, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <Leaf className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                      {herb.benefits.length > 3 && (
                        <li className="text-sm text-gray-500">
                          +{herb.benefits.length - 3} more benefits
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Properties */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">Rasa:</span>
                      <div className="flex gap-1">
                        {herb.properties.rasa.slice(0, 2).map((rasa, index) => (
                          <Badge key={index} variant="outline" className="text-xs py-0">
                            {rasa}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">Virya:</span>
                      <Badge variant="outline" className={`text-xs py-0 ${
                        herb.properties.virya === 'hot' ? 'border-red-300 text-red-700' : 'border-blue-300 text-blue-700'
                      }`}>
                        {herb.properties.virya}
                      </Badge>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Info className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                          <span className="text-2xl">{herb.image_emoji}</span>
                          <div>
                            <h2 className="text-2xl">{herb.name}</h2>
                            <p className="text-lg text-gray-600">{herb.sanskrit}</p>
                          </div>
                        </DialogTitle>
                      </DialogHeader>
                      
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="properties">Properties</TabsTrigger>
                          <TabsTrigger value="usage">Usage</TabsTrigger>
                          <TabsTrigger value="precautions">Safety</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="overview" className="space-y-4">
                          <div>
                            <h3 className="font-semibold mb-2">Health Benefits:</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {herb.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <Leaf className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold mb-2">Common Uses:</h3>
                            <div className="flex flex-wrap gap-2">
                              {herb.common_uses.map((use, index) => (
                                <Badge key={index} variant="secondary">
                                  {use}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="properties" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="font-semibold mb-3">Ayurvedic Properties:</h3>
                              <div className="space-y-3">
                                <div>
                                  <span className="font-medium">Rasa (Taste):</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {herb.properties.rasa.map((rasa, index) => (
                                      <Badge key={index} variant="outline">
                                        {rasa}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <span className="font-medium">Virya (Potency):</span>
                                  <Badge className={`ml-2 ${
                                    herb.properties.virya === 'hot' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {herb.properties.virya}
                                  </Badge>
                                </div>
                                <div>
                                  <span className="font-medium">Vipaka (Post-digestive effect):</span>
                                  <Badge variant="outline" className="ml-2">
                                    {herb.properties.vipaka}
                                  </Badge>
                                </div>
                                <div>
                                  <span className="font-medium">Guna (Qualities):</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {herb.properties.guna.map((guna, index) => (
                                      <Badge key={index} variant="outline">
                                        {guna}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-semibold mb-3">Dosha Effects:</h3>
                              <div className="space-y-2">
                                {Object.entries(herb.dosha_effects).map(([dosha, effect]) => {
                                  const colorInfo = doshaColors[effect];
                                  return (
                                    <div key={dosha} className="flex items-center justify-between p-3 rounded-lg border">
                                      <span className="font-medium capitalize">{dosha}</span>
                                      <Badge className={`${colorInfo.bg} ${colorInfo.text}`}>
                                        {effect === 'decrease' ? 'Decreases' : effect === 'increase' ? 'Increases' : 'Neutral'} {colorInfo.symbol}
                                      </Badge>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="usage" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="font-semibold mb-3">Dosage & Timing:</h3>
                              <div className="space-y-3">
                                <div className="p-3 bg-green-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Zap className="w-4 h-4 text-green-600" />
                                    <span className="font-medium">Recommended Dosage</span>
                                  </div>
                                  <p className="text-sm">{herb.usage.dosage}</p>
                                </div>
                                <div className="p-3 bg-blue-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Clock className="w-4 h-4 text-blue-600" />
                                    <span className="font-medium">Best Timing</span>
                                  </div>
                                  <p className="text-sm">{herb.usage.timing}</p>
                                </div>
                                <div className="p-3 bg-purple-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-4 h-4 text-purple-600" />
                                    <span className="font-medium">Duration</span>
                                  </div>
                                  <p className="text-sm">{herb.usage.duration}</p>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-semibold mb-3">Preparation Methods:</h3>
                              <ul className="space-y-2">
                                {herb.usage.preparation.map((method, index) => (
                                  <li key={index} className="flex items-start gap-2 p-2 rounded border">
                                    <Leaf className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm">{method}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="precautions" className="space-y-4">
                          <Alert className="border-yellow-200 bg-yellow-50">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                            <AlertDescription className="text-yellow-800">
                              <strong>Important:</strong> Always consult with a qualified Ayurvedic practitioner before starting any herbal regimen, especially if you have existing health conditions or are taking medications.
                            </AlertDescription>
                          </Alert>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="font-semibold mb-3 text-orange-700">Precautions:</h3>
                              <ul className="space-y-2">
                                {herb.precautions.map((precaution, index) => (
                                  <li key={index} className="flex items-start gap-2 p-2 rounded border border-orange-200 bg-orange-50">
                                    <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-orange-800">{precaution}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h3 className="font-semibold mb-3 text-red-700">Contraindications:</h3>
                              <ul className="space-y-2">
                                {herb.contraindications.map((contraindication, index) => (
                                  <li key={index} className="flex items-start gap-2 p-2 rounded border border-red-200 bg-red-50">
                                    <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-red-800">{contraindication}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredHerbs.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Leaf className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No herbs found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters to find the herbs you're looking for.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedDosha("all");
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Disclaimer */}
        <Alert className="mt-12 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Disclaimer:</strong> This information is for educational purposes only and is not intended to replace professional medical advice. 
            Always consult with a qualified healthcare practitioner before using any herbs or supplements, especially if you are pregnant, 
            nursing, or have any medical conditions.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}