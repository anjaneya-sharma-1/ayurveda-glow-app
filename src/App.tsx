import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
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
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Dashboard />} />
            <Route path="/patient/:id" element={<PatientProfile />} />
            <Route path="/food-database" element={<FoodDatabase />} />
            <Route path="/ai-consultant" element={<AiConsultant />} />
            <Route path="/population-insights" element={<PopulationInsights />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
