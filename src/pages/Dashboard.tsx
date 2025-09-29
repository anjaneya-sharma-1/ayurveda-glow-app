import { useState } from "react";
import { Plus, Users, TrendingUp, AlertTriangle, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PatientCard } from "@/components/dashboard/PatientCard";
import { patientsData } from "@/data/patientsData";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [patients] = useState(patientsData);

  const activePatients = patients.filter(p => p.status === "active").length;
  const attentionPatients = patients.filter(p => p.status === "attention").length;
  const totalConsultations = patients.length * 3; // Mock data
  const avgDoshaBalance = {
    vata: Math.round(patients.reduce((acc, p) => acc + p.doshaBalance.vata, 0) / patients.length),
    pitta: Math.round(patients.reduce((acc, p) => acc + p.doshaBalance.pitta, 0) / patients.length),
    kapha: Math.round(patients.reduce((acc, p) => acc + p.doshaBalance.kapha, 0) / patients.length)
  };

  const handlePatientClick = (patientId: string) => {
    navigate(`/patient/${patientId}`);
  };

  return (
    <div className="p-6 space-y-6 bg-subtle-gradient min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            AI-Powered Ayurvedic Diet Management Overview
          </p>
        </div>
        <Button className="bg-healing text-white hover:bg-primary-dark shadow-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add New Patient
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border shadow-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Patients
            </CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{patients.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-success">+2</span> from last month
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
            <div className="text-2xl font-bold text-foreground">{activePatients}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently under treatment
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Need Attention
            </CardTitle>
            <AlertTriangle className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{attentionPatients}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Require immediate care
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Consultations
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalConsultations}</div>
            <p className="text-xs text-muted-foreground mt-1">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Recent Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {patients.slice(0, 4).map((patient) => (
                <PatientCard
                  key={patient.id}
                  {...patient}
                  onClick={() => handlePatientClick(patient.id)}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Population Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-subtle-gradient rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Iron Deficiency Risk</span>
                <Badge className="bg-warning text-warning-foreground">30%</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Female patients showing early signs of anemia
              </p>
            </div>

            <div className="p-4 bg-subtle-gradient rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Vata Imbalance</span>
                <Badge className="bg-vata text-white">25%</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Patients with elevated Vata requiring grounding foods
              </p>
            </div>

            <div className="p-4 bg-subtle-gradient rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Sleep Quality</span>
                <Badge className="bg-kapha text-white">40%</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Patients reporting poor sleep patterns
              </p>
            </div>

            <div className="p-4 bg-subtle-gradient rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Average Dosha</span>
                <div className="flex gap-2">
                  <Badge className="bg-vata text-white text-xs">V:{avgDoshaBalance.vata}%</Badge>
                  <Badge className="bg-pitta text-white text-xs">P:{avgDoshaBalance.pitta}%</Badge>
                  <Badge className="bg-kapha text-white text-xs">K:{avgDoshaBalance.kapha}%</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Population-wide dosha distribution
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}