import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Leaf,
  Heart,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { ScrollArea } from "./scroll-area";
import { Card } from "./card";
import { Badge } from "./badge";
import { DoctorAvatar } from "./doctor-avatar";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
}

interface ChatbotProps {
  className?: string;
}

// Sample responses for Ayurveda-related queries
const ayurvedaResponses = {
  greeting: [
    "Namaste! 🙏 I'm Dr. Ayurveda, your personal wellness physician. I specialize in holistic health through ancient Ayurvedic wisdom. How can I assist you with your health journey today?",
    "Welcome to your personalized wellness consultation! ✨ I'm Dr. Ayurveda, and I'm here to help you achieve optimal health through time-tested Ayurvedic principles. What health concerns would you like to discuss?",
    "Hello! 🌿 Dr. Ayurveda here, ready to provide you with expert guidance on natural healing and wellness. I combine traditional Ayurvedic medicine with modern understanding. How are you feeling today?",
  ],
  dosha: [
    "Great question about doshas! 🌟 The three doshas - Vata (air), Pitta (fire), and Kapha (earth) - are the fundamental energies that govern our body and mind. Would you like to know more about your dominant dosha?",
    "Doshas are fascinating! ✨ Think of them as your body's unique blueprint. Each person has a unique combination that determines their physical, mental, and emotional characteristics.",
  ],
  diet: [
    "Ayurvedic nutrition is all about eating according to your constitution! 🍃 Different doshas thrive on different foods. Would you like personalized diet recommendations?",
    "Food is medicine in Ayurveda! 🥗 The right foods can balance your doshas and promote healing. Let me help you find the perfect foods for your body type.",
  ],
  default: [
    "That's a wonderful question! 🌺 While I'm still learning, I'd love to help you explore this topic. Can you tell me more about what you're looking for?",
    "Interesting! 💫 Let me think about that from an Ayurvedic perspective. Could you share more details so I can provide better guidance?",
  ],
};

const quickSuggestions = [
  "Assess my dosha constitution",
  "Prescribe healthy meal plan",
  "Natural remedies for stress",
  "Improve my digestion",
  "Better sleep solutions",
  "Boost immunity naturally",
  "Manage weight holistically",
  "Joint pain relief",
];

export function Chatbot({ className }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message when chatbot opens
      setTimeout(() => {
        addBotMessage(
          ayurvedaResponses.greeting[0],
          quickSuggestions.slice(0, 3)
        );
      }, 500);
    }
  }, [isOpen, messages.length]);

  const addBotMessage = (content: string, suggestions?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: true,
      timestamp: new Date(),
      suggestions,
    };
    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(false);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const generateBotResponse = (
    userMessage: string
  ): { response: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase();

    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("namaste")
    ) {
      return {
        response:
          ayurvedaResponses.greeting[
            Math.floor(Math.random() * ayurvedaResponses.greeting.length)
          ],
        suggestions: quickSuggestions.slice(0, 3),
      };
    }

    if (
      message.includes("dosha") ||
      message.includes("constitution") ||
      message.includes("type")
    ) {
      return {
        response:
          ayurvedaResponses.dosha[
            Math.floor(Math.random() * ayurvedaResponses.dosha.length)
          ],
        suggestions: [
          "Take dosha assessment",
          "Vata characteristics",
          "Pitta characteristics",
          "Kapha characteristics",
        ],
      };
    }

    if (
      message.includes("food") ||
      message.includes("diet") ||
      message.includes("eat") ||
      message.includes("nutrition")
    ) {
      return {
        response:
          ayurvedaResponses.diet[
            Math.floor(Math.random() * ayurvedaResponses.diet.length)
          ],
        suggestions: [
          "View food database",
          "Seasonal recipes",
          "Dosha-specific foods",
        ],
      };
    }

    if (
      message.includes("stress") ||
      message.includes("anxiety") ||
      message.includes("worry")
    ) {
      return {
        response:
          "As your Ayurvedic physician, I recommend a holistic approach to stress management! 🧘‍♀️ Based on Ayurvedic principles, stress manifests differently in each dosha. I can prescribe specific therapies: Vata types benefit from warm oil massages (Abhyanga), Pitta types need cooling practices, and Kapha types require energizing treatments. Would you like me to create a personalized stress-relief prescription?",
        suggestions: [
          "Pranayama breathing therapy",
          "Herbal stress remedies",
          "Daily routine for stress relief",
        ],
      };
    }

    if (
      message.includes("yoga") ||
      message.includes("exercise") ||
      message.includes("movement")
    ) {
      return {
        response:
          "Excellent question! As an Ayurvedic doctor, I always prescribe yoga as medicine! 🕉️ Different asanas (poses) have therapeutic effects on specific doshas. I recommend constitutional-specific practices: gentle Vinyasa for Vata, cooling Yin yoga for Pitta, and dynamic Ashtanga for Kapha. What's your current energy and flexibility level?",
        suggestions: [
          "Therapeutic yoga prescription",
          "Morning energizing sequence",
          "Evening restorative poses",
        ],
      };
    }

    if (
      message.includes("pain") ||
      message.includes("ache") ||
      message.includes("hurt")
    ) {
      return {
        response:
          "I understand your concern about pain. In Ayurveda, pain often indicates an imbalance in Vata dosha. 🩺 As your wellness doctor, I'd recommend starting with gentle warm oil massages, anti-inflammatory herbs like turmeric, and specific yoga poses. However, for severe or persistent pain, please consult with a licensed medical professional. What type of pain are you experiencing?",
        suggestions: [
          "Natural pain relief herbs",
          "Therapeutic massage techniques",
          "When to see a doctor",
        ],
      };
    }

    if (
      message.includes("sleep") ||
      message.includes("insomnia") ||
      message.includes("tired")
    ) {
      return {
        response:
          "Sleep disorders are very common and treatable with Ayurvedic methods! 😴 As your doctor, I prescribe a comprehensive sleep hygiene plan: warm milk with nutmeg before bed, regular sleep schedule aligned with your dosha, and calming bedtime rituals. Quality sleep is essential for healing. How many hours are you currently sleeping?",
        suggestions: [
          "Ayurvedic sleep remedies",
          "Bedtime routine prescription",
          "Herbs for better sleep",
        ],
      };
    }

    return {
      response:
        ayurvedaResponses.default[
          Math.floor(Math.random() * ayurvedaResponses.default.length)
        ],
      suggestions: quickSuggestions.slice(0, 3),
    };
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      addUserMessage(inputValue);
      setInputValue("");
      setIsTyping(true);
      setShowSuggestions(false);

      // Simulate bot thinking time
      setTimeout(() => {
        const { response, suggestions } = generateBotResponse(inputValue);
        addBotMessage(response, suggestions);
      }, 1000 + Math.random() * 1000);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div className={`fixed bottom-8 right-8 z-50 ${className}`}>
      {/* Chat window */}
      {isOpen && (
        <Card className="mb-4 w-96 h-[32rem] bg-card/95 backdrop-blur-lg border-primary/20 shadow-floating overflow-hidden animate-in slide-in-from-right-5 duration-300">
          {/* Header */}
          <div className="bg-healing p-4 text-white relative overflow-hidden">
            <div className="absolute inset-0 vedic-pattern opacity-10"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <DoctorAvatar
                    size="lg"
                    className="drop-shadow-lg"
                    isAnimated={true}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Dr. Ayurveda</h3>
                  <p className="text-sm text-white/80 flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    Your Personal Wellness Doctor
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-white/70">Ready to Help</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleChatbot}
                className="text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 h-80">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.isBot ? "" : "flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.isBot
                          ? "bg-white/10 backdrop-blur-sm"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {message.isBot ? (
                        <DoctorAvatar size="sm" isAnimated={false} />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-2xl ${
                        message.isBot
                          ? "bg-muted text-foreground rounded-tl-sm"
                          : "bg-primary text-primary-foreground rounded-tr-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                      {message.suggestions && (
                        <div className="mt-3 space-y-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs h-7 mr-2 mb-1 border-primary/30 hover:bg-primary/10 hover:border-primary/50"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <DoctorAvatar size="sm" isAnimated={true} />
                  </div>
                  <div className="bg-muted p-3 rounded-2xl rounded-tl-sm">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-muted-foreground mr-2">
                        Dr. Ayurveda is thinking
                      </span>
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick suggestions when no messages */}
          {showSuggestions && messages.length <= 1 && (
            <div className="p-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Try asking about:
              </p>
              <div className="space-y-1">
                {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs h-8 w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/5"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border bg-background/50">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Ayurveda..."
                className="flex-1 border-primary/30 focus:border-primary"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-healing hover:bg-primary/90 text-white rounded-full w-10 h-10 p-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Toggle button */}
      <div className="relative">
        <Button
          onClick={toggleChatbot}
          className={`relative w-16 h-16 rounded-full bg-healing hover:scale-110 text-white shadow-floating hover-lift transition-all duration-300 overflow-hidden border-2 border-white/20 z-50 group ${
            isOpen ? "rotate-180 scale-95" : ""
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
          <div className="relative z-10">
            {isOpen ? (
              <X className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" />
            ) : (
              <MessageCircle className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
            )}
          </div>

          {/* Floating notification badge */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center animate-gentle-bounce shadow-lg">
              <Heart className="w-2 h-2 text-white" />
            </div>
          )}
        </Button>

        {/* Enhanced greeting bubble with better positioning */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
            <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-floating border border-primary/30 max-w-[280px] relative">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6">
                  <DoctorAvatar size="sm" isAnimated={true} />
                </div>
                <p className="font-semibold text-sm text-primary">
                  Dr. Ayurveda
                </p>
                <Badge
                  variant="secondary"
                  className="text-xs bg-primary/10 text-primary border-primary/20"
                >
                  Online
                </Badge>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                � Namaste! Ready for your personalized wellness consultation?
                Click to start your healing journey!
              </p>
              <div className="absolute top-full right-8 w-3 h-3 bg-white/95 rotate-45 border-r border-b border-primary/30 -mt-1.5"></div>
            </div>
          </div>
        )}
      </div>

      {/* Doctor greeting bubble */}
      {/* {!isOpen && (
        
      )} */}
    </div>
  );
}
