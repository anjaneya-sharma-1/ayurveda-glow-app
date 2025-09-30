import { useState } from "react";
import { ChevronRight, RefreshCw, CheckCircle2, Target, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Question {
  id: string;
  question: string;
  category: "physical" | "mental" | "emotional" | "lifestyle";
  options: {
    text: string;
    dosha: "vata" | "pitta" | "kapha";
    points: number;
  }[];
}

interface DoshaResult {
  vata: number;
  pitta: number;
  kapha: number;
}

const doshaQuestions: Question[] = [
  {
    id: "body_frame",
    question: "How would you describe your body frame?",
    category: "physical",
    options: [
      { text: "Thin, light, difficulty gaining weight", dosha: "vata", points: 3 },
      { text: "Medium build, muscular, athletic", dosha: "pitta", points: 3 },
      { text: "Heavy, broad, tendency to gain weight easily", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: "skin_type",
    question: "What best describes your skin?",
    category: "physical",
    options: [
      { text: "Dry, rough, cool to touch", dosha: "vata", points: 2 },
      { text: "Warm, oily, prone to rashes/acne", dosha: "pitta", points: 2 },
      { text: "Soft, smooth, cool, oily", dosha: "kapha", points: 2 }
    ]
  },
  {
    id: "hair_texture",
    question: "How would you describe your hair?",
    category: "physical",
    options: [
      { text: "Dry, frizzy, thin", dosha: "vata", points: 2 },
      { text: "Fine, straight, early graying/balding", dosha: "pitta", points: 2 },
      { text: "Thick, oily, wavy, lustrous", dosha: "kapha", points: 2 }
    ]
  },
  {
    id: "appetite",
    question: "How is your appetite typically?",
    category: "lifestyle",
    options: [
      { text: "Irregular, sometimes forget to eat", dosha: "vata", points: 3 },
      { text: "Strong, get irritable when hungry", dosha: "pitta", points: 3 },
      { text: "Steady but can skip meals easily", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: "digestion",
    question: "How is your digestion?",
    category: "physical",
    options: [
      { text: "Variable, gas, bloating", dosha: "vata", points: 3 },
      { text: "Strong, quick, sometimes loose stools", dosha: "pitta", points: 3 },
      { text: "Slow, heavy feeling after eating", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: "sleep_pattern",
    question: "What's your sleep pattern like?",
    category: "lifestyle",
    options: [
      { text: "Light sleeper, difficulty falling asleep", dosha: "vata", points: 2 },
      { text: "Moderate sleep, need less than 8 hours", dosha: "pitta", points: 2 },
      { text: "Deep sleeper, need 8+ hours", dosha: "kapha", points: 2 }
    ]
  },
  {
    id: "energy_levels",
    question: "How are your energy levels throughout the day?",
    category: "mental",
    options: [
      { text: "Bursts of energy followed by fatigue", dosha: "vata", points: 3 },
      { text: "Consistent high energy", dosha: "pitta", points: 3 },
      { text: "Steady, slow to start but enduring", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: "stress_response",
    question: "How do you typically respond to stress?",
    category: "emotional",
    options: [
      { text: "Anxious, worried, overwhelmed", dosha: "vata", points: 3 },
      { text: "Irritable, angry, impatient", dosha: "pitta", points: 3 },
      { text: "Withdrawn, sluggish, procrastinate", dosha: "kapha", points: 3 }
    ]
  },
  {
    id: "weather_preference",
    question: "What weather do you prefer?",
    category: "lifestyle",
    options: [
      { text: "Warm, humid weather", dosha: "vata", points: 2 },
      { text: "Cool, dry weather", dosha: "pitta", points: 2 },
      { text: "Warm, dry weather", dosha: "kapha", points: 2 }
    ]
  },
  {
    id: "learning_style",
    question: "How do you learn best?",
    category: "mental",
    options: [
      { text: "Quickly but forget easily", dosha: "vata", points: 2 },
      { text: "Moderate pace with good retention", dosha: "pitta", points: 2 },
      { text: "Slowly but excellent long-term memory", dosha: "kapha", points: 2 }
    ]
  }
];

const doshaDescriptions = {
  vata: {
    name: "Vata",
    elements: "Air & Space",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    characteristics: ["Creative", "Energetic", "Flexible", "Quick thinking"],
    balance: "In balance: Creative, enthusiastic, flexible",
    imbalance: "Out of balance: Anxious, restless, digestive issues"
  },
  pitta: {
    name: "Pitta", 
    elements: "Fire & Water",
    color: "text-red-600",
    bgColor: "bg-red-50", 
    borderColor: "border-red-200",
    characteristics: ["Intelligent", "Focused", "Determined", "Natural leader"],
    balance: "In balance: Intelligent, focused, good digestion",
    imbalance: "Out of balance: Irritable, inflammatory conditions"
  },
  kapha: {
    name: "Kapha",
    elements: "Earth & Water", 
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    characteristics: ["Calm", "Stable", "Compassionate", "Strong immunity"],
    balance: "In balance: Calm, loving, stable, strong immunity",
    imbalance: "Out of balance: Sluggish, weight gain, congestion"
  }
};

export default function DoshaAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleNext = () => {
    if (selectedAnswer) {
      setAnswers({ ...answers, [doshaQuestions[currentQuestion].id]: selectedAnswer });
      setSelectedAnswer("");
      
      if (currentQuestion < doshaQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }
  };

  const calculateResults = (): DoshaResult => {
    const scores = { vata: 0, pitta: 0, kapha: 0 };
    
    Object.entries(answers).forEach(([questionId, optionIndex]) => {
      const question = doshaQuestions.find(q => q.id === questionId);
      if (question) {
        const option = question.options[parseInt(optionIndex)];
        scores[option.dosha] += option.points;
      }
    });

    const total = scores.vata + scores.pitta + scores.kapha;
    return {
      vata: Math.round((scores.vata / total) * 100),
      pitta: Math.round((scores.pitta / total) * 100),
      kapha: Math.round((scores.kapha / total) * 100)
    };
  };

  const getDominantDosha = (results: DoshaResult): keyof DoshaResult => {
    return Object.entries(results).reduce((a, b) => results[a[0] as keyof DoshaResult] > results[b[0] as keyof DoshaResult] ? a : b)[0] as keyof DoshaResult;
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setSelectedAnswer("");
  };

  const progress = ((currentQuestion + 1) / doshaQuestions.length) * 100;
  const results = showResults ? calculateResults() : { vata: 0, pitta: 0, kapha: 0 };
  const dominantDosha = showResults ? getDominantDosha(results) : "vata";

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Dosha Assessment Results</h1>
            <p className="text-lg text-gray-600">Discover your unique Ayurvedic constitution</p>
          </div>

          {/* Results Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-green-600" />
                Your Dominant Dosha: {doshaDescriptions[dominantDosha].name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {(Object.keys(results) as Array<keyof DoshaResult>).map((dosha) => {
                  const desc = doshaDescriptions[dosha];
                  return (
                    <Card key={dosha} className={`${desc.bgColor} ${desc.borderColor} border-2`}>
                      <CardContent className="p-6 text-center">
                        <h3 className={`text-2xl font-bold ${desc.color} mb-2`}>
                          {desc.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">{desc.elements}</p>
                        <div className="relative w-24 h-24 mx-auto mb-4">
                          <div className={`w-full h-full rounded-full ${desc.bgColor} flex items-center justify-center border-4 ${desc.borderColor}`}>
                            <span className={`text-2xl font-bold ${desc.color}`}>
                              {results[dosha]}%
                            </span>
                          </div>
                        </div>
                        <Progress 
                          value={results[dosha]} 
                          className="h-3 mb-4"
                        />
                        <div className="space-y-2">
                          {desc.characteristics.map((char, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {char}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Detailed Description */}
              <Alert className="mb-6">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-base">
                  <strong>Your Primary Dosha: {doshaDescriptions[dominantDosha].name}</strong>
                  <br />
                  {doshaDescriptions[dominantDosha].balance}
                  <br />
                  <em>When imbalanced:</em> {doshaDescriptions[dominantDosha].imbalance}
                </AlertDescription>
              </Alert>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={resetAssessment} variant="outline" className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Retake Assessment
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Get Personalized Diet Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dosha Assessment</h1>
          <p className="text-lg text-gray-600">Discover your unique Ayurvedic constitution through this comprehensive assessment</p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestion + 1} of {doshaQuestions.length}
              </span>
              <Badge variant="outline">
                {doshaQuestions[currentQuestion].category}
              </Badge>
            </div>
            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">
              {doshaQuestions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              {doshaQuestions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <Button 
              onClick={handleNext} 
              disabled={!selectedAnswer}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              {currentQuestion < doshaQuestions.length - 1 ? "Next Question" : "View Results"}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}