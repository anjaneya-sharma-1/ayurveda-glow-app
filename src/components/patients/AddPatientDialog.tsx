import { useState } from "react";
import { Plus, X, User, Calendar, Ruler, Weight, Activity } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { type Patient } from "@/data/patientsData";

interface AddPatientDialogProps {
  onAddPatient: (patient: Patient) => void;
  children: React.ReactNode;
}

export function AddPatientDialog({
  onAddPatient,
  children,
}: AddPatientDialogProps) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    location: "",
    address: "",
    emergencyContact: "",

    // Health Information
    height: "",
    weight: "",
    prakriti: "",
    healthHistory: "",
    currentMedications: "",
    allergies: "",
    dietaryRestrictions: "",

    // Dosha Balance
    vata: [35],
    pitta: [35],
    kapha: [30],

    // Status
    status: "active" as const,
  });

  const calculateBMI = (height: number, weight: number): number => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10;
    }
    return 0;
  };

  const generatePatientId = (): string => {
    return (Date.now() + Math.random()).toString();
  };

  const handleSubmit = () => {
    const height = parseFloat(formData.height);
    const weight = parseFloat(formData.weight);
    const bmi = calculateBMI(height, weight);

    const newPatient: Patient = {
      id: generatePatientId(),
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender as "Male" | "Female",
      prakriti: formData.prakriti,
      lastConsultation: new Date().toLocaleDateString(),
      doshaBalance: {
        vata: formData.vata[0],
        pitta: formData.pitta[0],
        kapha: formData.kapha[0],
      },
      status: formData.status,
      location: formData.location,
      phone: formData.phone,
      email: formData.email,
      height,
      weight,
      bmi,
      medicalHistory: formData.healthHistory ? [formData.healthHistory] : [],
      currentMedications: formData.currentMedications
        ? [formData.currentMedications]
        : [],
      allergies: formData.allergies ? [formData.allergies] : [],
      lifestyle: {
        activityLevel: "moderate",
        sleepHours: 7,
        stressLevel: "low",
        dietType: formData.dietaryRestrictions || "mixed",
      },
      wearableData: {
        steps: 0,
        heartRate: 72,
        sleepHours: 7,
        lastSync: new Date().toISOString(),
      },
      riskFlags: [],
    };

    onAddPatient(newPatient);
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      name: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
      location: "",
      address: "",
      emergencyContact: "",
      height: "",
      weight: "",
      prakriti: "",
      healthHistory: "",
      currentMedications: "",
      allergies: "",
      dietaryRestrictions: "",
      vata: [35],
      pitta: [35],
      kapha: [30],
      status: "active",
    });
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return (
          formData.name.trim() !== "" &&
          formData.age !== "" &&
          formData.gender !== ""
        );
      case 2:
        return (
          formData.height !== "" &&
          formData.weight !== "" &&
          formData.prakriti !== ""
        );
      case 3:
        return true; // Dosha balance is optional with defaults
      case 4:
        return true; // Additional info is optional
      default:
        return false;
    }
  };

  const steps = [
    { number: 1, title: "Basic Information", icon: User },
    { number: 2, title: "Health Metrics", icon: Activity },
    { number: 3, title: "Dosha Balance", icon: Ruler },
    { number: 4, title: "Additional Details", icon: Calendar },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Add New Patient
          </DialogTitle>
          <p className="text-muted-foreground">
            Complete patient information for comprehensive Ayurvedic care
          </p>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number
                    ? "bg-primary border-primary text-white"
                    : "border-muted text-muted-foreground"
                }`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <div className="ml-3 hidden sm:block">
                <p
                  className={`text-sm font-medium ${
                    currentStep >= step.number
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  Step {step.number}
                </p>
                <p className="text-xs text-muted-foreground">{step.title}</p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-12 mx-4 ${
                    currentStep > step.number ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter patient's full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      placeholder="Enter age"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        setFormData({ ...formData, gender: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="City, State"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Enter complete address"
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        emergencyContact: e.target.value,
                      })
                    }
                    placeholder="Emergency contact name and phone"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Health Metrics */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Health Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="height">Height (cm) *</Label>
                    <Input
                      id="height"
                      type="number"
                      value={formData.height}
                      onChange={(e) =>
                        setFormData({ ...formData, height: e.target.value })
                      }
                      placeholder="Enter height in cm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight (kg) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) =>
                        setFormData({ ...formData, weight: e.target.value })
                      }
                      placeholder="Enter weight in kg"
                    />
                  </div>
                  <div>
                    <Label>BMI</Label>
                    <div className="p-2 bg-muted rounded text-center font-medium">
                      {formData.height && formData.weight
                        ? calculateBMI(
                            parseFloat(formData.height),
                            parseFloat(formData.weight)
                          )
                        : "—"}
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="prakriti">Prakriti (Constitution) *</Label>
                  <Select
                    value={formData.prakriti}
                    onValueChange={(value) =>
                      setFormData({ ...formData, prakriti: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient's constitution" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vata">Vata</SelectItem>
                      <SelectItem value="Pitta">Pitta</SelectItem>
                      <SelectItem value="Kapha">Kapha</SelectItem>
                      <SelectItem value="Vata-Pitta">Vata-Pitta</SelectItem>
                      <SelectItem value="Pitta-Kapha">Pitta-Kapha</SelectItem>
                      <SelectItem value="Vata-Kapha">Vata-Kapha</SelectItem>
                      <SelectItem value="Tridoshic">Tridoshic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="healthHistory">Health History</Label>
                  <Textarea
                    id="healthHistory"
                    value={formData.healthHistory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        healthHistory: e.target.value,
                      })
                    }
                    placeholder="Previous health conditions, surgeries, family history..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="currentMedications">
                    Current Medications
                  </Label>
                  <Textarea
                    id="currentMedications"
                    value={formData.currentMedications}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currentMedications: e.target.value,
                      })
                    }
                    placeholder="List current medications, supplements, herbs..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Dosha Balance */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="w-5 h-5" />
                  Dosha Balance Assessment
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Adjust the sliders to reflect the patient's current dosha
                  balance
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-vata font-medium">Vata</Label>
                      <Badge
                        variant="outline"
                        className="text-vata border-vata"
                      >
                        {formData.vata[0]}%
                      </Badge>
                    </div>
                    <Slider
                      value={formData.vata}
                      onValueChange={(value) =>
                        setFormData({ ...formData, vata: value })
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Air & Space - Movement, Creativity, Nervous System
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-pitta font-medium">Pitta</Label>
                      <Badge
                        variant="outline"
                        className="text-pitta border-pitta"
                      >
                        {formData.pitta[0]}%
                      </Badge>
                    </div>
                    <Slider
                      value={formData.pitta}
                      onValueChange={(value) =>
                        setFormData({ ...formData, pitta: value })
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Fire & Water - Transformation, Metabolism, Digestion
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-kapha font-medium">Kapha</Label>
                      <Badge
                        variant="outline"
                        className="text-kapha border-kapha"
                      >
                        {formData.kapha[0]}%
                      </Badge>
                    </div>
                    <Slider
                      value={formData.kapha}
                      onValueChange={(value) =>
                        setFormData({ ...formData, kapha: value })
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Earth & Water - Structure, Stability, Immunity
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">
                    Total:{" "}
                    {formData.vata[0] + formData.pitta[0] + formData.kapha[0]}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Note: Total should ideally be 100%. Adjust sliders
                    accordingly.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Additional Details */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Additional Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="allergies">Known Allergies</Label>
                  <Textarea
                    id="allergies"
                    value={formData.allergies}
                    onChange={(e) =>
                      setFormData({ ...formData, allergies: e.target.value })
                    }
                    placeholder="Food allergies, environmental allergies, drug allergies..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="dietaryRestrictions">
                    Dietary Restrictions
                  </Label>
                  <Textarea
                    id="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dietaryRestrictions: e.target.value,
                      })
                    }
                    placeholder="Vegetarian, vegan, religious restrictions, food preferences..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Patient Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "active" | "inactive") =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="attention">Needs Attention</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <div>
            {currentStep > 1 && (
              <Button variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
                className="bg-primary text-white hover:bg-primary-dark"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid(currentStep)}
                className="bg-healing text-white hover:bg-primary-dark"
              >
                Add Patient
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
