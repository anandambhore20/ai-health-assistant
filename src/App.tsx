
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProjectProvider } from "@/contexts/ProjectContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import SymptomChecker from "./pages/SymptomChecker";
import SyndromeChecker from "./pages/SyndromeChecker";
import DiseaseDetector from "./pages/DiseaseDetector";
import MRIAnalysis from "./pages/MRIAnalysis";
import EyeDetection from "./pages/EyeDetection";
import Prevention from "./pages/Prevention";
import Treatment from "./pages/Treatment";
import Emergency from "./pages/Emergency";
import ProjectManagement from "./pages/ProjectManagement";
import ProjectDetails from "./pages/ProjectDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ProjectProvider>
        <BrowserRouter>
          <TooltipProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/projects" 
                element={
                  <ProtectedRoute>
                    <ProjectManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/projects/:id" 
                element={
                  <ProtectedRoute>
                    <ProjectDetails />
                  </ProtectedRoute>
                } 
              />
              <Route path="/symptom-checker" element={<SymptomChecker />} />
              <Route path="/syndrome-checker" element={<SyndromeChecker />} />
              <Route path="/disease-detector" element={<DiseaseDetector />} />
              <Route path="/mri-analysis" element={<MRIAnalysis />} />
              <Route path="/eye-detection" element={<EyeDetection />} />
              <Route path="/prevention" element={<Prevention />} />
              <Route path="/treatment" element={<Treatment />} />
              <Route path="/emergency" element={<Emergency />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </BrowserRouter>
      </ProjectProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
