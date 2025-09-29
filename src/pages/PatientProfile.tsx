import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Activity, 
  Heart, 
  Moon, 
  Footprints, 
  AlertTriangle,
  Download,
  Edit3,
  Plus,
  Languages,
  Smartphone
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DoshaWheel } from "@/components/dashboard/DoshaWheel";
import { patientsData } from "@/data/patientsData";

export default function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"en" | "hi">("en");
  
  const patient = patientsData.find(p => p.id === id);
  
  if (!patient) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Patient Not Found</h1>
        <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
      </div>
    );
  }

  const text = {
    en: {
      patientProfile: "Patient Profile",
      overview: "Overview",
      logs: "Daily Logs",
      recommendations: "AI Recommendations",
      dietPlan: "Diet Plan",
      wearableData: "Wearable Data",
      predictiveAnalysis: "Predictive Analysis",
      riskFlags: "Risk Flags",
      generateDietPlan: "Generate AI Diet Plan",
      exportPDF: "Export PDF",
      editProfile: "Edit Profile",
      logsSubmitted: "Logs submitted today",
      notSynced: "Patient has not synced wearable today"
    },
    hi: {
      patientProfile: "मरीज़ की प्रोफाइल",
      overview: "सिंहावलोकन",
      logs: "दैनिक लॉग",
      recommendations: "AI सुझाव",
      dietPlan: "आहार योजना",
      wearableData: "पहनने योग्य डेटा",
      predictiveAnalysis: "भविष्यवाणी विश्लेषण",
      riskFlags: "जोखिम संकेत",
      generateDietPlan: "AI आहार योजना बनाएं",
      exportPDF: "PDF निर्यात करें",
      editProfile: "प्रोफाइल संपादित करें",
      logsSubmitted: "आज लॉग जमा किए गए",
      notSynced: "मरीज़ ने आज पहनने योग्य डिवाइस सिंक नहीं किया है"
    }
  };

  const t = text[language];

  const riskLevelColors = {
    high: "bg-destructive text-destructive-foreground",
    medium: "bg-warning text-warning-foreground", 
    low: "bg-success text-success-foreground"
  };

  const priorityColors = {
    high: "bg-destructive text-destructive-foreground",
    medium: "bg-warning text-warning-foreground",
    low: "bg-success text-success-foreground"
  };

  return (
    <div className="p-6 space-y-6 bg-subtle-gradient min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/")}
            className="hover-lift"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t.patientProfile}</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive health and diet management
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="hover-lift"
          >
            <Languages className="w-4 h-4 mr-2" />
            {language === "en" ? "हिंदी" : "English"}
          </Button>
          <Button variant="outline" size="sm" className="hover-lift">
            <Edit3 className="w-4 h-4 mr-2" />
            {t.editProfile}
          </Button>
          <Button className="bg-healing text-white hover:bg-primary-dark shadow-primary">
            <Download className="w-4 h-4 mr-2" />
            {t.exportPDF}
          </Button>
        </div>
      </div>

      {/* Patient Header */}
      <Card className="bg-card border-border shadow-card">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-healing rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-primary">
                  {patient.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{patient.name}</h2>
                  <div className="flex items-center gap-4 text-muted-foreground mt-1">
                    <span>{patient.age} years</span>
                    <span>•</span>
                    <span>{patient.gender}</span>
                    <span>•</span>
                    <span className="text-primary font-medium">Prakriti: {patient.prakriti}</span>
                  </div>
                  {patient.location && (
                    <p className="text-sm text-muted-foreground mt-1">{patient.location}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Height:</span>
                  <p className="font-medium text-foreground">{patient.height} cm</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Weight:</span>
                  <p className="font-medium text-foreground">{patient.weight} kg</p>
                </div>
                <div>
                  <span className="text-muted-foreground">BMI:</span>
                  <p className="font-medium text-foreground">{patient.bmi}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Visit:</span>
                  <p className="font-medium text-foreground">{patient.lastConsultation}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <DoshaWheel 
                vata={patient.doshaBalance.vata}
                pitta={patient.doshaBalance.pitta}
                kapha={patient.doshaBalance.kapha}
                size="lg"
                interactive={true}
              />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-xs text-muted-foreground">
                  V:{patient.doshaBalance.vata}% P:{patient.doshaBalance.pitta}% K:{patient.doshaBalance.kapha}%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 bg-muted">
          <TabsTrigger value="overview">{t.overview}</TabsTrigger>
          <TabsTrigger value="logs">{t.logs}</TabsTrigger>
          <TabsTrigger value="recommendations">{t.recommendations}</TabsTrigger>
          <TabsTrigger value="diet-plan">{t.dietPlan}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Wearable Data */}
            <Card className="bg-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-primary" />
                  {t.wearableData}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {patient.wearableData ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-subtle-gradient rounded-lg">
                        <Footprints className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-2xl font-bold text-foreground">{patient.wearableData.steps.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Steps</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-subtle-gradient rounded-lg">
                        <Heart className="w-5 h-5 text-destructive" />
                        <div>
                          <p className="text-2xl font-bold text-foreground">{patient.wearableData.heartRate}</p>
                          <p className="text-xs text-muted-foreground">BPM</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-subtle-gradient rounded-lg">
                      <Moon className="w-5 h-5 text-kapha" />
                      <div>
                        <p className="text-xl font-bold text-foreground">{patient.wearableData.sleepHours}h</p>
                        <p className="text-xs text-muted-foreground">Sleep Duration</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Last sync: {patient.wearableData.lastSync}</p>
                  </>
                ) : (
                  <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                    <p className="text-sm text-warning">{t.notSynced}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Risk Flags */}
            <Card className="bg-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  {t.riskFlags}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {patient.riskFlags && patient.riskFlags.length > 0 ? (
                  patient.riskFlags.map((risk, index) => (
                    <div key={index} className="p-3 bg-subtle-gradient rounded-lg border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground text-sm">{risk.condition}</span>
                        <Badge className={`text-xs ${riskLevelColors[risk.risk]}`}>
                          {risk.risk.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{risk.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <p className="text-sm text-success">No risk flags detected</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-3 bg-subtle-gradient rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Activity Level</span>
                      <span className="text-sm font-medium text-foreground">{patient.lifestyle?.activityLevel}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-subtle-gradient rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Diet Type</span>
                      <span className="text-sm font-medium text-foreground">{patient.lifestyle?.dietType}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-subtle-gradient rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Stress Level</span>
                      <span className="text-sm font-medium text-foreground">{patient.lifestyle?.stressLevel}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          {/* Weekly Analytics Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <Card className="bg-card border-border shadow-card hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Water Intake</p>
                    <p className="text-2xl font-bold text-foreground">6.2L</p>
                    <p className="text-xs text-success">+15% this week</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-primary"></div>
                  </div>
                </div>
                <div className="mt-3 h-2 bg-muted rounded-full">
                  <div className="h-2 bg-primary rounded-full" style={{ width: '75%' }}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-card hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Sleep Quality</p>
                    <p className="text-2xl font-bold text-foreground">7.2h</p>
                    <p className="text-xs text-warning">-5% this week</p>
                  </div>
                  <Moon className="w-8 h-8 text-kapha" />
                </div>
                <div className="mt-3 h-2 bg-muted rounded-full">
                  <div className="h-2 bg-kapha rounded-full" style={{ width: '80%' }}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-card hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Energy Levels</p>
                    <p className="text-2xl font-bold text-foreground">8.1/10</p>
                    <p className="text-xs text-success">+12% this week</p>
                  </div>
                  <Activity className="w-8 h-8 text-pitta" />
                </div>
                <div className="mt-3 h-2 bg-muted rounded-full">
                  <div className="h-2 bg-pitta rounded-full" style={{ width: '81%' }}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-card hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Diet Compliance</p>
                    <p className="text-2xl font-bold text-foreground">85%</p>
                    <p className="text-xs text-success">+8% this week</p>
                  </div>
                  <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-success rounded-full"></div>
                  </div>
                </div>
                <div className="mt-3 h-2 bg-muted rounded-full">
                  <div className="h-2 bg-success rounded-full" style={{ width: '85%' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Logs */}
          <Card className="bg-card border-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">{t.logs}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Natural language entries analyzed by AI</p>
              </div>
              <Badge className="bg-success text-success-foreground">
                {t.logsSubmitted}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {patient.recentLogs && patient.recentLogs.length > 0 ? (
                patient.recentLogs.map((log, index) => (
                  <div key={index} className="p-4 bg-subtle-gradient rounded-lg border border-border hover-lift transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-foreground">{log.date}</span>
                      <div className="flex gap-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            log.mood === 'Good' ? 'border-success text-success' :
                            log.mood === 'Average' ? 'border-warning text-warning' :
                            'border-muted text-muted-foreground'
                          }`}
                        >
                          Mood: {log.mood}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            log.energy === 'High' ? 'border-pitta text-pitta' :
                            log.energy === 'Medium' ? 'border-vata text-vata' :
                            'border-kapha text-kapha'
                          }`}
                        >
                          Energy: {log.energy}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{log.entry}</p>
                    
                    {/* AI Insights from log */}
                    <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-xs font-medium text-primary mb-1">AI Analysis:</p>
                      <p className="text-xs text-muted-foreground">
                        {index === 0 && "Good hydration levels noted. Consider adding warming spices to balance Vata."}
                        {index === 1 && "Sleep quality improving. Morning energy indicates balanced Agni (digestive fire)."}
                        {index === 2 && "Low energy may indicate Kapha imbalance. Recommend light, warm foods."}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">No recent logs available</p>
                  <p className="text-sm text-muted-foreground">Patient logs are submitted via mobile app in natural language</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card className="bg-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">{t.recommendations}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {patient.aiRecommendations && patient.aiRecommendations.length > 0 ? (
                patient.aiRecommendations.map((rec, index) => (
                  <div key={index} className="p-4 bg-subtle-gradient rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-foreground">{rec.title}</h4>
                      <div className="flex gap-2">
                        <Badge className={`text-xs ${priorityColors[rec.priority]}`}>
                          {rec.priority.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs">{rec.category}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">No recommendations available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diet-plan" className="space-y-6">
          <Card className="bg-card border-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">{t.dietPlan}</CardTitle>
              <Button className="bg-healing text-white hover:bg-primary-dark shadow-primary">
                <Plus className="w-4 h-4 mr-2" />
                {t.generateDietPlan}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No diet plan generated yet</p>
                <p className="text-sm text-muted-foreground">
                  Click "Generate AI Diet Plan" to create a personalized Ayurvedic diet plan based on the patient's dosha balance and health profile.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}