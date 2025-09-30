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
import DoshaAssessment from "./pages/DoshaAssessment";
import MealPlanning from "./pages/MealPlanning";
import HerbsRemedies from "./pages/HerbsRemedies";
import AyurvedicLibrary from "./pages/AyurvedicLibrary";
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

          {/* Ayurvedic Tools Routes */}
          <Route
            path="/dosha-assessment"
            element={
              <AppLayout>
                <DoshaAssessment />
              </AppLayout>
            }
          />
          <Route
            path="/meal-planning"
            element={
              <AppLayout>
                <MealPlanning />
              </AppLayout>
            }
          />
          <Route
            path="/herbs-remedies"
            element={
              <AppLayout>
                <HerbsRemedies />
              </AppLayout>
            }
          />
          <Route
            path="/library"
            element={
              <AppLayout>
                <AyurvedicLibrary />
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
