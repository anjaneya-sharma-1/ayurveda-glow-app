export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  prakriti: string;
  lastConsultation: string;
  doshaBalance: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  status: "active" | "inactive" | "attention";
  location?: string;
  // Detailed profile data
  email?: string;
  phone?: string;
  height?: number;
  weight?: number;
  bmi?: number;
  medicalHistory?: string[];
  currentMedications?: string[];
  allergies?: string[];
  lifestyle?: {
    activityLevel: string;
    sleepHours: number;
    stressLevel: string;
    dietType: string;
  };
  wearableData?: {
    steps: number;
    heartRate: number;
    sleepHours: number;
    lastSync: string;
  };
  recentLogs?: {
    date: string;
    entry: string;
    mood: string;
    energy: string;
  }[];
  aiRecommendations?: {
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
    category: string;
  }[];
  riskFlags?: {
    condition: string;
    risk: "high" | "medium" | "low";
    description: string;
  }[];
}

export const patientsData: Patient[] = [
  {
    id: "1",
    name: "Priya Sharma",
    age: 32,
    gender: "Female",
    prakriti: "Vata-Pitta",
    lastConsultation: "09/25/2025",
    doshaBalance: { vata: 45, pitta: 35, kapha: 20 },
    status: "attention",
    location: "Mumbai, MH",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    height: 165,
    weight: 58,
    bmi: 21.3,
    medicalHistory: ["Anemia", "Migraine"],
    currentMedications: ["Iron supplements", "Vitamin D"],
    allergies: ["Shellfish", "Peanuts"],
    lifestyle: {
      activityLevel: "Moderate",
      sleepHours: 6,
      stressLevel: "High",
      dietType: "Vegetarian"
    },
    wearableData: {
      steps: 8000,
      heartRate: 72,
      sleepHours: 6,
      lastSync: "2 hours ago"
    },
    recentLogs: [
      {
        date: "Today",
        entry: "Drank 4 glasses of water, ate rice and dal, felt tired, slept 5 hours",
        mood: "Tired",
        energy: "Low"
      },
      {
        date: "Yesterday", 
        entry: "Had green tea, oats breakfast, felt energetic in morning",
        mood: "Good",
        energy: "Medium"
      }
    ],
    aiRecommendations: [
      {
        title: "Increase Iron-Rich Foods",
        description: "Add drumstick leaves, jaggery, and dates to combat anemia. These foods balance Vata and provide essential iron.",
        priority: "high",
        category: "Nutrition"
      },
      {
        title: "Improve Sleep Quality",
        description: "Avoid heavy dinner and add warm milk with nutmeg for better sleep. Current 5-6 hours is insufficient.",
        priority: "high",
        category: "Lifestyle"
      }
    ],
    riskFlags: [
      {
        condition: "Iron Deficiency Risk",
        risk: "high",
        description: "Current symptoms and dietary pattern indicate iron deficiency anemia risk"
      },
      {
        condition: "Sleep Deprivation",
        risk: "medium", 
        description: "Consistently low sleep hours affecting energy levels"
      }
    ]
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    age: 45,
    gender: "Male",
    prakriti: "Kapha-Pitta",
    lastConsultation: "09/20/2025",
    doshaBalance: { vata: 20, pitta: 40, kapha: 40 },
    status: "active",
    location: "Delhi, DL",
    email: "rajesh.kumar@email.com",
    phone: "+91 87654 32109",
    height: 175,
    weight: 78,
    bmi: 25.4,
    medicalHistory: ["Diabetes Type 2", "Hypertension"],
    currentMedications: ["Metformin", "Lisinopril"],
    allergies: ["Dairy"],
    lifestyle: {
      activityLevel: "Low",
      sleepHours: 7,
      stressLevel: "Medium",
      dietType: "Mixed"
    },
    wearableData: {
      steps: 5200,
      heartRate: 78,
      sleepHours: 7,
      lastSync: "1 hour ago"
    },
    recentLogs: [
      {
        date: "Today",
        entry: "Morning walk 30 minutes, avoided sweets, had bitter gourd curry",
        mood: "Good",
        energy: "Medium"
      }
    ],
    aiRecommendations: [
      {
        title: "Kapha-Reducing Diet",
        description: "Focus on warm, light foods. Avoid cold, heavy, oily foods that increase Kapha dosha.",
        priority: "high",
        category: "Nutrition"
      },
      {
        title: "Increase Physical Activity",
        description: "Current activity level is too low for Kapha constitution. Aim for 45 minutes daily exercise.",
        priority: "medium",
        category: "Exercise"
      }
    ],
    riskFlags: [
      {
        condition: "Obesity Risk",
        risk: "medium",
        description: "Sedentary lifestyle combined with Kapha constitution increases weight gain risk"
      }
    ]
  },
  {
    id: "3",
    name: "Anita Patel",
    age: 28,
    gender: "Female",
    prakriti: "Vata",
    lastConsultation: "09/28/2025",
    doshaBalance: { vata: 60, pitta: 25, kapha: 15 },
    status: "active",
    location: "Ahmedabad, GJ",
    email: "anita.patel@email.com",
    phone: "+91 76543 21098",
    height: 160,
    weight: 52,
    bmi: 20.3,
    medicalHistory: ["Anxiety", "IBS"],
    currentMedications: ["Probiotics"],
    allergies: ["Gluten"],
    lifestyle: {
      activityLevel: "High",
      sleepHours: 8,
      stressLevel: "Medium",
      dietType: "Vegan"
    },
    wearableData: {
      steps: 12000,
      heartRate: 68,
      sleepHours: 8,
      lastSync: "30 minutes ago"
    },
    recentLogs: [
      {
        date: "Today",
        entry: "Yoga session, quinoa salad, herbal tea, feeling calm and balanced",
        mood: "Calm",
        energy: "High"
      }
    ],
    aiRecommendations: [
      {
        title: "Vata-Pacifying Foods",
        description: "Include warm, grounding foods like sweet potatoes and ghee to balance excess Vata.",
        priority: "medium",
        category: "Nutrition"
      }
    ],
    riskFlags: []
  },
  {
    id: "4",
    name: "Suresh Reddy",
    age: 38,
    gender: "Male",
    prakriti: "Pitta-Vata",
    lastConsultation: "09/15/2025",
    doshaBalance: { vata: 35, pitta: 50, kapha: 15 },
    status: "inactive",
    location: "Bangalore, KA",
    email: "suresh.reddy@email.com",
    phone: "+91 65432 10987",
    height: 172,
    weight: 70,
    bmi: 23.7,
    medicalHistory: ["Acidity", "Stress-related disorders"],
    currentMedications: ["Antacids"],
    allergies: ["Spicy foods"],
    lifestyle: {
      activityLevel: "Moderate",
      sleepHours: 6,
      stressLevel: "High",
      dietType: "Mixed"
    },
    recentLogs: [
      {
        date: "3 days ago",
        entry: "Work stress high, skipped meals, had late dinner with spicy food",
        mood: "Stressed",
        energy: "Low"
      }
    ],
    aiRecommendations: [
      {
        title: "Pitta-Cooling Foods",
        description: "Avoid spicy, oily foods. Include cooling foods like cucumber, coconut water, and fennel.",
        priority: "high",
        category: "Nutrition"
      }
    ],
    riskFlags: [
      {
        condition: "Chronic Stress",
        risk: "high",
        description: "High stress levels affecting digestive health and overall wellbeing"
      }
    ]
  },
  {
    id: "5",
    name: "Meera Iyer",
    age: 52,
    gender: "Female",
    prakriti: "Kapha",
    lastConsultation: "09/22/2025",
    doshaBalance: { vata: 15, pitta: 25, kapha: 60 },
    status: "attention",
    location: "Chennai, TN",
    email: "meera.iyer@email.com",
    phone: "+91 54321 09876",
    height: 158,
    weight: 65,
    bmi: 26.0,
    medicalHistory: ["Hypothyroidism", "Joint pain"],
    currentMedications: ["Levothyroxine", "Calcium"],
    allergies: ["Iodine"],
    lifestyle: {
      activityLevel: "Low",
      sleepHours: 8,
      stressLevel: "Low",
      dietType: "Vegetarian"
    },
    wearableData: {
      steps: 3500,
      heartRate: 75,
      sleepHours: 8,
      lastSync: "4 hours ago"
    },
    recentLogs: [
      {
        date: "Today",
        entry: "Joint stiffness in morning, had warm turmeric milk, gentle stretching",
        mood: "Okay",
        energy: "Low"
      }
    ],
    aiRecommendations: [
      {
        title: "Increase Movement",
        description: "Joint stiffness indicates need for regular gentle exercise. Start with 20-minute walks.",
        priority: "high",
        category: "Exercise"
      },
      {
        title: "Metabolism-Boosting Foods",
        description: "Include ginger, black pepper, and warm spices to support thyroid function and reduce Kapha.",
        priority: "medium",
        category: "Nutrition"
      }
    ],
    riskFlags: [
      {
        condition: "Metabolic Slowdown",
        risk: "medium",
        description: "Low activity combined with hypothyroidism may lead to further weight gain"
      }
    ]
  }
];