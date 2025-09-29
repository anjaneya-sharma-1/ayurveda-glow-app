import { useState } from "react";
import { Send, Bot, User, Lightbulb, BookOpen, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  category?: string;
}

const sampleQueries = [
  "Suggest foods for anemia in Vata-Pitta constitution",
  "Daily diet for Kapha prakriti with diabetes",
  "Best foods to improve sleep quality",
  "Cooling foods for excessive Pitta symptoms",
  "Weight loss diet for Kapha imbalance",
];

const hardcodedResponses = {
  anemia: {
    content:
      "For anemia, especially in **वात-पित्त प्रकृति** (Vata-Pitta constitution), I recommend:\n\n🌿 **Drumstick Leaves (Moringa)** - Rich in iron, balances Vata\n🍯 **गुड़ (Jaggery)** - Natural iron source, heating potency\n🗓️ **खजूर (Dates)** - High iron content, sweet taste balances Vata\n🥬 **Spinach** - Excellent for blood formation\n\n**आयुर्वेदिक सिद्धांत (Ayurvedic Rationale):** These foods have **मधुर रस** (sweet taste) and **उष्ण वीर्य** (heating potency) that balance Vata while providing bioavailable iron.\n\n**Modern Science:** These foods provide heme and non-heme iron along with vitamin C for better absorption.",
    category: "Nutrition",
  },
  "kapha diabetes": {
    content:
      "For Kapha constitution with diabetes:\n\n🫚 **Ginger** - Ignites digestive fire, reduces Kapha\n🧡 **Turmeric** - Anti-inflammatory, helps with insulin sensitivity\n🥒 **Bitter Gourd** - Natural blood sugar regulator\n🌿 **Fenugreek** - Controls glucose levels\n\n**Diet Guidelines:**\n- Avoid cold, heavy, oily foods\n- Eat warm, light, spiced foods\n- Include bitter and pungent tastes\n- Regular meal timing\n\n**Ayurvedic Principle:** Diabetes is often Kapha-related disorder. Warm, light foods with pungent and bitter tastes help reduce Kapha and improve metabolism.",
    category: "Diabetes Management",
  },
  sleep: {
    content:
      "For better sleep quality:\n\n🥛 **Warm Milk with Nutmeg** - Calms Vata, promotes sleep\n🌰 **Almonds** - Rich in magnesium, calms nervous system\n🍯 **Dates** - Natural tryptophan source\n🫖 **Chamomile Tea** - Cooling and calming\n\n**Evening Routine:**\n- Avoid heavy meals 3 hours before bed\n- Warm, light dinner\n- Herbal teas 1 hour before sleep\n\n**Ayurvedic Wisdom:** Poor sleep is often due to Vata imbalance. Sweet, grounding foods and warm drinks help calm the nervous system.",
    category: "Sleep Health",
  },
  "pitta cooling": {
    content:
      "For excessive Pitta symptoms, focus on cooling foods:\n\n🥒 **Cucumber** - Cooling, hydrating, sweet taste\n🥥 **Coconut Water** - Natural coolant, balances electrolytes\n🌾 **Fennel Seeds** - Sweet, cooling, digestive aid\n🍈 **Melons** - Sweet, cooling, high water content\n\n**Foods to Avoid:**\n- Spicy, hot, oily foods\n- Citrus fruits in excess\n- Fermented foods\n- Alcohol and caffeine\n\n**Ayurvedic Approach:** Pitta is hot and sharp by nature. Sweet, bitter, and astringent tastes with cooling potency help balance excess Pitta.",
    category: "Dosha Balance",
  },
  "weight loss kapha": {
    content:
      "For Kapha weight management:\n\n🫚 **Ginger Tea** - Boosts metabolism, reduces Kapha\n🌶️ **Black Pepper** - Thermogenic, improves digestion\n🥗 **Leafy Greens** - Light, bitter taste reduces Kapha\n🌾 **Barley** - Light grain, good for weight management\n\n**Lifestyle Guidelines:**\n- Eat largest meal at midday\n- Skip dinner or have very light meal\n- Include regular vigorous exercise\n- Wake up early (before 6 AM)\n\n**Ayurvedic Principle:** Kapha types gain weight easily due to slow metabolism. Warm, light foods with pungent taste stimulate metabolism.",
    category: "Weight Management",
  },
};

export default function AiConsultant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Namaste! I'm your AI Ayurvedic Consultant. I can help you with personalized food recommendations, lifestyle suggestions, and dosha-specific guidance. What would you like to know about?",
      timestamp: new Date(),
      category: "Greeting",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getResponseForQuery = (
    query: string
  ): { content: string; category: string } => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("anemia") || lowerQuery.includes("iron")) {
      return hardcodedResponses["anemia"];
    } else if (
      lowerQuery.includes("kapha") &&
      lowerQuery.includes("diabetes")
    ) {
      return hardcodedResponses["kapha diabetes"];
    } else if (lowerQuery.includes("sleep")) {
      return hardcodedResponses["sleep"];
    } else if (
      lowerQuery.includes("pitta") &&
      (lowerQuery.includes("cool") || lowerQuery.includes("heat"))
    ) {
      return hardcodedResponses["pitta cooling"];
    } else if (lowerQuery.includes("weight") && lowerQuery.includes("kapha")) {
      return hardcodedResponses["weight loss kapha"];
    } else {
      return {
        content:
          "Thank you for your question! Based on Ayurvedic principles, I'd recommend consulting with a qualified practitioner for personalized advice. In the meantime, focus on:\n\n• Eating according to your constitution (Prakriti)\n• Following seasonal dietary guidelines\n• Maintaining regular meal times\n• Including all six tastes in your meals\n\nWould you like specific guidance on any particular health concern or dosha balance?",
        category: "General Guidance",
      };
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getResponseForQuery(inputMessage);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response.content,
        timestamp: new Date(),
        category: response.category,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSampleQuery = (query: string) => {
    setInputMessage(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-6 space-y-6 bg-subtle-gradient min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-header">AI Ayurveda Consultant</h1>
          <p className="card-subtitle mt-1">
            Get personalized food and lifestyle recommendations based on
            <span className="sanskrit-text ml-1">आयुर्वेदिक ज्ञान</span>{" "}
            (Ayurvedic wisdom)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sample Queries Sidebar */}
        <Card className="lg:col-span-1 bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="card-title flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Sample Queries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sampleQueries.map((query, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="w-full text-left justify-start h-auto p-3 hover-lift"
                onClick={() => handleSampleQuery(query)}
              >
                <div className="text-xs text-muted-foreground text-left">
                  {query}
                </div>
              </Button>
            ))}

            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="form-label">Quick Tips</span>
              </div>
              <div className="space-y-2 form-description">
                <p>💡 Ask about specific health conditions</p>
                <p>
                  🌱 Inquire about <span className="dosha-label">dosha</span>
                  -specific foods
                </p>
                <p>🍽️ Request daily diet plans</p>
                <p>⚖️ Get lifestyle recommendations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-3 bg-card border-border shadow-card">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              Ayurvedic AI Assistant
              <Badge className="bg-success text-success-foreground ml-auto">
                Online
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            {/* Messages Area */}
            <ScrollArea className="h-[500px] p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.type === "assistant" && (
                      <div className="w-8 h-8 bg-healing rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] ${
                        message.type === "user" ? "order-1" : ""
                      }`}
                    >
                      <div
                        className={`p-4 rounded-lg ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground ml-auto"
                            : "bg-subtle-gradient border border-border"
                        }`}
                      >
                        {message.category && message.type === "assistant" && (
                          <Badge variant="outline" className="mb-2 text-xs">
                            {message.category}
                          </Badge>
                        )}
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 px-2">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>

                    {message.type === "user" && (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-healing rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-subtle-gradient border border-border p-4 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t border-border p-4">
              <div className="flex gap-3">
                <Input
                  placeholder="Ask about foods for health conditions, dosha-specific diets, or lifestyle recommendations..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-healing text-white hover:bg-primary-dark shadow-primary"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <Heart className="w-3 h-3" />
                <span>
                  Powered by traditional Ayurvedic wisdom and modern AI
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
