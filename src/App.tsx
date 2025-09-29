import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import PatientProfile from "./pages/PatientProfile";
import FoodDatabase from "./pages/FoodDatabase";
import AiConsultant from "./pages/AiConsultant";
import PopulationInsights from "./pages/PopulationInsights";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page - Standalone without AppLayout */}
          <Route path="/" element={<LandingPage />} />

          {/* App Routes with Layout */}
          <Route
            path="/dashboard"
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            }
          />
          <Route
            path="/patients"
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            }
          />
          <Route
            path="/patient/:id"
            element={
              <AppLayout>
                <PatientProfile />
              </AppLayout>
            }
          />
          <Route
            path="/food-database"
            element={
              <AppLayout>
                <FoodDatabase />
              </AppLayout>
            }
          />
          <Route
            path="/ai-consultant"
            element={
              <AppLayout>
                <AiConsultant />
              </AppLayout>
            }
          />
          <Route
            path="/population-insights"
            element={
              <AppLayout>
                <PopulationInsights />
              </AppLayout>
            }
          />

          {/* Placeholder routes for new Ayurveda sections */}
          <Route
            path="/dosha-assessment"
            element={
              <AppLayout>
                <div className="p-8 text-center">
                  <h1 className="text-3xl font-bold mb-4">Dosha Assessment</h1>
                  <p>
                    Coming soon... This will be your personalized dosha
                    assessment tool.
                  </p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/meal-planning"
            element={
              <AppLayout>
                <div className="p-8 text-center">
                  <h1 className="text-3xl font-bold mb-4">Meal Planning</h1>
                  <p>
                    Coming soon... Personalized meal planning based on your
                    dosha.
                  </p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/herbs-remedies"
            element={
              <AppLayout>
                <div className="p-8 text-center">
                  <h1 className="text-3xl font-bold mb-4">Herbs & Remedies</h1>
                  <p>
                    Coming soon... Natural remedies and herbal recommendations.
                  </p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/library"
            element={
              <AppLayout>
                <div className="p-8 text-center">
                  <h1 className="text-3xl font-bold mb-4">Ayurvedic Library</h1>
                  <p>
                    Coming soon... Educational resources and traditional
                    knowledge.
                  </p>
                </div>
              </AppLayout>
            }
          />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
