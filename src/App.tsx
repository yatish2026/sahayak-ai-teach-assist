import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { StoryGenerator } from "./pages/features/StoryGenerator";
import { WorksheetGenerator } from "./pages/features/WorksheetGenerator";
import { SpeakingCoach } from "./pages/features/SpeakingCoach";
import { TeacherLogin } from "./pages/auth/TeacherLogin";
import { StudentLogin } from "./pages/auth/StudentLogin";
import { TeacherDashboard } from "./pages/dashboards/TeacherDashboard";
import { StudentDashboard } from "./pages/dashboards/StudentDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Feature Pages */}
          <Route path="/features/story-generator" element={<StoryGenerator />} />
          <Route path="/features/worksheet-generator" element={<WorksheetGenerator />} />
          <Route path="/features/speaking-coach" element={<SpeakingCoach />} />
          
          {/* Auth Pages */}
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/student-login" element={<StudentLogin />} />
          
          {/* Dashboard Pages */}
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
