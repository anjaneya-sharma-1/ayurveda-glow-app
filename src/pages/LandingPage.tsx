import { Link } from "react-router-dom";
import {
  Leaf,
  Users,
  Brain,
  Heart,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Sun,
  Waves,
  Zap,
  Star,
  Shield,
  Calendar,
  BookOpen,
  MessageSquare,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Scene3D } from "@/components/Scene3D"; // Uncomment when ready to use 3D model

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/logo.jpg"
                  alt="AyurDiet Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-800 dark:text-green-200">
                  AyurDiet
                </h1>
                <p className="text-sm text-muted-foreground">
                  AI-Powered Ayurvedic Wellness
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Link to="/ai-consultant">
                <Button className="bg-green-600 hover:bg-green-700">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
                🔬 Evidence-Based Nutrition + Traditional Wisdom
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                End-to-End Ayurvedic
                <span className="text-green-600 block">
                  Diet Management Platform
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                The world's first cloud platform merging modern nutrition
                science with Ayurvedic dietary principles. AI-driven
                personalized diets tracking nutrients while honoring Dosha,
                Rasa, Guna, Virya, and Prakriti.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link to="/ai-consultant">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8"
                  >
                    AI Diet Assistant <Sparkles className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/food-database">
                  <Button size="lg" variant="outline" className="px-8">
                    8,000+ Food Database <BookOpen className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column - 3D Balance of Elements Model */}
            <div className="relative">
              <div className="aspect-square w-full max-w-lg mx-auto">
                {/* 3D Model Container */}
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 shadow-2xl overflow-hidden">
                  {/* Sketchfab 3D Model Embed - Balance of Elements */}
                  <div className="w-full h-full">
                    <iframe
                      title="Balance of Elements"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; fullscreen; xr-spatial-tracking"
                      src="https://sketchfab.com/models/b2d3dcc597f144568d562cfdb020cb9e/embed?autospin=1&camera=0&preload=1&transparent=1"
                      className="w-full h-full rounded-2xl"
                      style={{ border: 'none' }}
                    />
                  </div>
                </div>

                {/* Floating elements around the 3D model */}
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div className="absolute top-1/2 -left-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
                  <Brain className="w-6 h-6 text-purple-500" />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
                  <Leaf className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader className="text-center">
                <Search className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-2xl">8,000+</CardTitle>
                <CardDescription>Food Items Mapped</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader className="text-center">
                <Brain className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-2xl">Multilingual</CardTitle>
                <CardDescription>AI Assistant</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-2xl">ABDM</CardTitle>
                <CardDescription>Compliant Platform</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Dosha Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              AI-Driven Personalized Nutrition
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform analyzes your unique Prakriti (constitution) and
              applies Dosha, Rasa (taste), Guna (qualities), and Virya (potency)
              principles alongside modern nutrient tracking for optimal health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vata */}
            <Card className="relative overflow-hidden border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all">
              <CardHeader className="text-center">
                <Zap className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                <CardTitle className="text-2xl text-purple-600">Vata</CardTitle>
                <CardDescription className="text-lg">
                  Air & Space
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Creative, energetic, and quick-thinking. AI analyzes your
                  lifestyle, digestion patterns, and water intake for precise
                  Vata-balancing nutrition.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">
                      Warm Virya foods (heating potency)
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Sweet & Sour Rasa priority</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">
                      Heavy Guna foods for grounding
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Pitta */}
            <Card className="relative overflow-hidden border-orange-200 dark:border-orange-800 hover:shadow-xl transition-all">
              <CardHeader className="text-center">
                <Sun className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                <CardTitle className="text-2xl text-orange-600">
                  Pitta
                </CardTitle>
                <CardDescription className="text-lg">
                  Fire & Water
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Ambitious, focused, and determined. Platform tracks your bowel
                  patterns and metabolic fire for precise Pitta-cooling
                  nutrition strategies.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">
                      Cool Virya foods (cooling potency)
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Sweet & Bitter Rasa focus</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Soft Guna foods for balance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Kapha */}
            <Card className="relative overflow-hidden border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all">
              <CardHeader className="text-center">
                <Waves className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-2xl text-blue-600">Kapha</CardTitle>
                <CardDescription className="text-lg">
                  Earth & Water
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Calm, steady, and nurturing. AI considers your age, gender,
                  and lifestyle patterns to recommend Kapha-stimulating
                  nutrition protocols.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">
                      Hot Virya foods (stimulating)
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Pungent & Astringent Rasa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Light & Rough Guna foods</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/dosha-assessment">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Take Dosha Assessment <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              World's First Hybrid Platform
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Breakthrough technology merging evidence-based nutrition science
              with traditional Ayurvedic wisdom. Future-ready with EHR/HIS
              integration and ABDM compliance for seamless healthcare ecosystem
              integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-green-600 mb-2" />
                <CardTitle>Multilingual AI Assistant</CardTitle>
                <CardDescription>
                  Multimodal AI consultant for dietitians & patients with
                  multilingual support
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-green-600 mb-2" />
                <CardTitle>Dynamic Food Knowledge Base</CardTitle>
                <CardDescription>
                  8,000+ food items mapped with both Ayurvedic & nutritional
                  attributes
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mb-2" />
                <CardTitle>Holistic Patient Records</CardTitle>
                <CardDescription>
                  Comprehensive profiling: age, gender, lifestyle, bowel,
                  digestion, water intake
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="h-12 w-12 text-green-600 mb-2" />
                <CardTitle>Nutrient + Ayurveda Tracking</CardTitle>
                <CardDescription>
                  First platform to blend modern nutrition science with Dosha
                  principles
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mb-2" />
                <CardTitle>EHR/HIS Integration</CardTitle>
                <CardDescription>
                  ABDM compliant platform ready for healthcare ecosystem
                  integration
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-12 w-12 text-green-600 mb-2" />
                <CardTitle>Cloud + Mobile Platform</CardTitle>
                <CardDescription>
                  End-to-end web and mobile solution for dietitians and patients
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-green-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-900">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "The platform's unique blend of modern nutrition tracking with
                  Ayurvedic principles is revolutionary. It considers my
                  Prakriti, lifestyle, and even bowel patterns for precise
                  recommendations!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">P</span>
                  </div>
                  <div>
                    <p className="font-semibold">Priya Sharma</p>
                    <p className="text-sm text-gray-500">Nutritionist</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-900">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "Finally, a platform that bridges evidence-based nutrition
                  with traditional Ayurveda! The 8,000+ food database with Rasa,
                  Guna, Virya mapping is a game-changer for practitioners."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">D</span>
                  </div>
                  <div>
                    <p className="font-semibold">Dr. Rajesh Kumar</p>
                    <p className="text-sm text-gray-500">
                      Ayurvedic Practitioner
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-900">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "The multilingual AI assistant understands both my patients'
                  cultural context and their biomarkers. ABDM compliance makes
                  it perfect for integration with our hospital systems!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">A</span>
                  </div>
                  <div>
                    <p className="font-semibold">Dr. Anita Patel</p>
                    <p className="text-sm text-gray-500">
                      Hospital Administrator
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Experience the Future of Ayurvedic Medicine
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Be among the first to use the world's only platform that
            scientifically merges evidence-based nutrition with 5,000-year-old
            Ayurvedic wisdom. ABDM-ready for India's digital health ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ai-consultant">
              <Button size="lg" variant="secondary" className="px-8">
                Try AI Diet Assistant <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 px-8"
              >
                Explore Platform <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg overflow-hidden">
                  <img
                    src="/logo.jpg"
                    alt="AyurDiet Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">AyurDiet</h3>
              </div>
              <p className="text-gray-400">
                Bridging ancient Ayurvedic wisdom with modern AI technology for
                personalized wellness.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/ai-consultant" className="hover:text-white">
                    AI Consultant
                  </Link>
                </li>
                <li>
                  <Link to="/food-database" className="hover:text-white">
                    Food Database
                  </Link>
                </li>
                <li>
                  <Link to="/population-insights" className="hover:text-white">
                    Insights
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ayurveda</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/dosha-assessment" className="hover:text-white">
                    Dosha Assessment
                  </Link>
                </li>
                <li>
                  <Link to="/meal-planning" className="hover:text-white">
                    Meal Planning
                  </Link>
                </li>
                <li>
                  <Link to="/herbs-remedies" className="hover:text-white">
                    Herbs & Remedies
                  </Link>
                </li>
                <li>
                  <Link to="/library" className="hover:text-white">
                    Library
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 AyurDiet. All rights reserved. Made with ❤️ for your
              wellness journey.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
