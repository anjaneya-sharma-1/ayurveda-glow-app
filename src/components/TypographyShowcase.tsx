import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Typography Showcase Component
 * Demonstrates the complete typography system for AyurDiet
 */
export function TypographyShowcase() {
  return (
    <div className="p-6 space-y-8 bg-subtle-gradient min-h-screen">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="section-header">Typography System Showcase</h1>
        <p className="card-subtitle">
          Complete demonstration of the AyurDiet typography hierarchy and
          styling
        </p>
      </div>

      {/* Display Typography */}
      <Card className="bg-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="card-title">Display Typography</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h1 className="text-display-lg">Display Large - Hero Titles</h1>
            <p className="form-description">
              Used for: Main landing pages, hero sections
            </p>
          </div>
          <div>
            <h2 className="text-display-md">Display Medium - Page Headers</h2>
            <p className="form-description">Used for: Primary page titles</p>
          </div>
          <div>
            <h3 className="text-display-sm">Display Small - Section Headers</h3>
            <p className="form-description">Used for: Major section dividers</p>
          </div>
        </CardContent>
      </Card>

      {/* Heading Typography */}
      <Card className="bg-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="card-title">Heading Typography</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-heading-lg">Heading Large - Card Titles</h4>
            <p className="form-description">
              Used for: Card headers, major sections
            </p>
          </div>
          <div>
            <h5 className="text-heading-md">Heading Medium - Subsections</h5>
            <p className="form-description">Used for: Content subsections</p>
          </div>
          <div>
            <h6 className="text-heading-sm">Heading Small - Minor Headings</h6>
            <p className="form-description">Used for: Small content groups</p>
          </div>
        </CardContent>
      </Card>

      {/* Healthcare-Specific Typography */}
      <Card className="bg-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="card-title">Healthcare Typography</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h6 className="subsection-header">Patient Information</h6>
              <div className="patient-name">Dr. Rajesh Kumar Sharma</div>
              <div className="diagnosis-text">Chronic Fatigue Syndrome</div>
              <div className="healthcare-text">
                Patient shows signs of Vata imbalance with secondary Pitta
                symptoms. Recommended dietary modifications and lifestyle
                changes.
              </div>
            </div>

            <div className="space-y-3">
              <h6 className="subsection-header">Clinical Metrics</h6>
              <div className="flex items-center gap-4">
                <div>
                  <div className="metric-value">72</div>
                  <div className="metric-label">Heart Rate</div>
                </div>
                <div>
                  <div className="metric-value">120/80</div>
                  <div className="metric-label">Blood Pressure</div>
                </div>
              </div>
              <div className="clinical-data">
                BMI: 24.5 | Weight: 68kg | Height: 170cm
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ayurvedic/Cultural Typography */}
      <Card className="bg-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="card-title">Ayurvedic Typography</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h6 className="subsection-header">Dosha Classification</h6>
            <div className="flex gap-4">
              <Badge className="dosha-label bg-vata text-white">
                वात (Vata)
              </Badge>
              <Badge className="dosha-label bg-pitta text-white">
                पित्त (Pitta)
              </Badge>
              <Badge className="dosha-label bg-kapha text-white">
                कफ (Kapha)
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <h6 className="subsection-header">Traditional Terms</h6>
            <div className="space-y-2">
              <p className="healthcare-text">
                Patient's{" "}
                <span className="ayurvedic-term">प्रकृति (Prakriti)</span> is
                primarily
                <span className="ayurvedic-term ml-2">
                  वात-पित्त (Vata-Pitta)
                </span>
              </p>
              <p className="sanskrit-text">
                आयुर्वेदे सर्वदा प्राणस्य रक्षणं प्रधानम्
              </p>
              <p className="form-description">
                "In Ayurveda, the protection of life is always paramount"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Elements */}
      <Card className="bg-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="card-title">Interactive Typography</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h6 className="subsection-header">Links and Actions</h6>
            <div className="space-y-2">
              <p className="healthcare-text">
                For more information, please{" "}
                <span className="link-text">consult our guidelines</span>
              </p>
              <Button className="button-text">Schedule Consultation</Button>
            </div>
          </div>

          <div className="space-y-3">
            <h6 className="subsection-header">Status Messages</h6>
            <div className="space-y-2">
              <p className="success-text">
                Treatment plan successfully updated
              </p>
              <p className="warning-text">
                Patient requires attention for medication review
              </p>
              <p className="error-text">
                Unable to process request - please try again
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Typography */}
      <Card className="bg-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="card-title">Form Typography</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="form-label">Patient Name</label>
            <p className="form-description">
              Enter the patient's full legal name as it appears on
              identification documents
            </p>
            <p className="form-error">This field is required</p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Typography */}
      <Card className="bg-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="card-title">Navigation Typography</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="nav-section">Main Navigation</div>
            <div className="space-y-1">
              <div className="nav-item">Dashboard</div>
              <div className="nav-item">Patients</div>
              <div className="nav-item">Food Database</div>
              <div className="nav-item">AI Consultant</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
