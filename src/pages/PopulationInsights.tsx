import { TrendingUp, Users, AlertTriangle, Activity, PieChart, BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const populationData = {
  totalPatients: 248,
  activePatients: 186,
  demographics: {
    ageGroups: [
      { range: "18-30", count: 62, percentage: 25 },
      { range: "31-45", count: 89, percentage: 36 },
      { range: "46-60", count: 74, percentage: 30 },
      { range: "60+", count: 23, percentage: 9 }
    ],
    genderDistribution: {
      female: 148,
      male: 100
    },
    prakritis: [
      { type: "Vata", count: 83, percentage: 33 },
      { type: "Pitta", count: 71, percentage: 29 },
      { type: "Kapha", count: 58, percentage: 23 },
      { type: "Vata-Pitta", count: 22, percentage: 9 },
      { type: "Pitta-Kapha", count: 10, percentage: 4 },
      { type: "Vata-Kapha", count: 4, percentage: 2 }
    ]
  },
  healthConditions: [
    { condition: "Iron Deficiency Risk", count: 74, percentage: 30, severity: "high", trend: "increasing" },
    { condition: "Sleep Quality Issues", count: 99, percentage: 40, severity: "medium", trend: "stable" },
    { condition: "Digestive Problems", count: 62, percentage: 25, severity: "medium", trend: "decreasing" },
    { condition: "Stress-Related Disorders", count: 81, percentage: 33, severity: "high", trend: "increasing" },
    { condition: "Obesity Risk", count: 45, percentage: 18, severity: "medium", trend: "stable" }
  ],
  doshaImbalances: [
    { dosha: "Vata", affected: 62, percentage: 25, commonIssues: ["Anxiety", "Sleep Issues", "Digestive Problems"] },
    { dosha: "Pitta", affected: 54, percentage: 22, commonIssues: ["Acidity", "Stress", "Skin Problems"] },
    { dosha: "Kapha", affected: 37, percentage: 15, commonIssues: ["Weight Gain", "Lethargy", "Respiratory Issues"] }
  ],
  dietaryPatterns: [
    { pattern: "Vegetarian", count: 186, percentage: 75 },
    { pattern: "Mixed Diet", count: 49, percentage: 20 },
    { pattern: "Vegan", count: 13, percentage: 5 }
  ],
  commonDeficiencies: [
    { nutrient: "Iron", affected: 74, percentage: 30, demographics: "Women 18-45" },
    { nutrient: "Vitamin D", affected: 112, percentage: 45, demographics: "All ages" },
    { nutrient: "Vitamin B12", affected: 67, percentage: 27, demographics: "Vegetarians" },
    { nutrient: "Calcium", affected: 89, percentage: 36, demographics: "Women 45+" }
  ]
};

export default function PopulationInsights() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing": return "↗️";
      case "decreasing": return "↘️";
      case "stable": return "➡️";
      default: return "➡️";
    }
  };

  const getDoshaColor = (dosha: string) => {
    switch (dosha) {
      case "Vata": return "text-vata";
      case "Pitta": return "text-pitta";
      case "Kapha": return "text-kapha";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-subtle-gradient min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Population Insights</h1>
          <p className="text-muted-foreground mt-1">
            Community health trends and patterns analysis
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border shadow-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Patients
            </CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{populationData.totalPatients}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-success">+12</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Cases
            </CardTitle>
            <Activity className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{populationData.activePatients}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((populationData.activePatients / populationData.totalPatients) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Female Patients
            </CardTitle>
            <Users className="h-5 w-5 text-pitta" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{populationData.demographics.genderDistribution.female}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((populationData.demographics.genderDistribution.female / populationData.totalPatients) * 100)}% of population
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Risk Conditions
            </CardTitle>
            <AlertTriangle className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {populationData.healthConditions.filter(c => c.severity === "high").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              High severity conditions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Conditions */}
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Common Health Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {populationData.healthConditions.map((condition, index) => (
              <div key={index} className="p-4 bg-subtle-gradient rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{condition.condition}</span>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${getSeverityColor(condition.severity)}`}>
                      {condition.severity.toUpperCase()}
                    </Badge>
                    <span className="text-sm">{getTrendIcon(condition.trend)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{condition.count} patients affected</span>
                  <span>{condition.percentage}% of population</span>
                </div>
                <Progress value={condition.percentage} className="mt-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Dosha Distribution */}
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              Prakriti Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {populationData.demographics.prakritis.map((prakriti, index) => (
              <div key={index} className="p-3 bg-subtle-gradient rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${getDoshaColor(prakriti.type.split('-')[0])}`}>
                    {prakriti.type}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {prakriti.count} patients ({prakriti.percentage}%)
                  </span>
                </div>
                <Progress value={prakriti.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Dosha Imbalances */}
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <BarChart className="w-5 h-5 text-primary" />
              Dosha Imbalances
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {populationData.doshaImbalances.map((imbalance, index) => (
              <div key={index} className="p-4 bg-subtle-gradient rounded-lg border border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-semibold text-lg ${getDoshaColor(imbalance.dosha)}`}>
                    {imbalance.dosha} Imbalance
                  </span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{imbalance.affected} patients</div>
                    <div className="text-xs text-muted-foreground">{imbalance.percentage}% affected</div>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground">Common Issues:</span>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {imbalance.commonIssues.map((issue, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {issue}
                    </Badge>
                  ))}
                </div>
                <Progress value={imbalance.percentage} className="mt-3" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Nutritional Deficiencies */}
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-warning" />
              Common Deficiencies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {populationData.commonDeficiencies.map((deficiency, index) => (
              <div key={index} className="p-4 bg-subtle-gradient rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{deficiency.nutrient} Deficiency</span>
                  <span className="text-sm text-muted-foreground">
                    {deficiency.affected} patients ({deficiency.percentage}%)
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  Most affected: {deficiency.demographics}
                </div>
                <Progress value={deficiency.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Age Demographics */}
      <Card className="bg-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Age Demographics & Dietary Patterns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Age Groups */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Age Distribution</h4>
              {populationData.demographics.ageGroups.map((group, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-subtle-gradient rounded-lg">
                  <span className="font-medium text-foreground">{group.range} years</span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{group.count} patients</div>
                    <div className="text-xs text-muted-foreground">{group.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dietary Patterns */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Dietary Preferences</h4>
              {populationData.dietaryPatterns.map((pattern, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-subtle-gradient rounded-lg">
                  <span className="font-medium text-foreground">{pattern.pattern}</span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{pattern.count} patients</div>
                    <div className="text-xs text-muted-foreground">{pattern.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}